/**
 * ==============================================================================
 * SAVY GREENTECH - GOOGLE APPS SCRIPT WEB APP
 * Target Spreadsheet ID: 1KRqMTf087SlI9Rx5wKy4grXSmDLLwl2R78yfGSzwaWg
 *
 * FEATURES:
 * 1. Form Submissions across 4 Tabs: Careers, Become a Dealer, Get in Touch, Quote Request
 * 2. Dedicated "Resume Drive Link" column for Careers & Job Applications
 * 3. Secure Google Drive Resume Upload (Max 5 MB, PDF/DOC/DOCX, Private Recruiter Access)
 * 4. Automatic header migration: ensures "Resume Drive Link" is present in existing sheets
 *
 * HOW TO DEPLOY:
 * 1. Open your Google Spreadsheet (ID: 1KRqMTf087SlI9Rx5wKy4grXSmDLLwl2R78yfGSzwaWg).
 * 2. In the top menu, go to Extensions > Apps Script.
 * 3. Replace all existing code in Code.gs with this entire script.
 * 4. Click "Save" (disk icon).
 * 5. Click "Deploy" > "Manage deployments".
 * 6. Click the Pencil (Edit) icon on your active Web App deployment.
 * 7. In the "Version" dropdown, select "New version".
 * 8. CRITICAL: Under "Who has access", select "Anyone" (Anonymous web visitors).
 *    (If left as "Only myself", browser uploads will fail with HTTP 401).
 * 9. Click "Deploy".
 *
 * OPTIONAL ONE-CLICK HEADER CLEANUP:
 * - In the Apps Script toolbar, select the function "resetAllTabHeadersToCanonical"
 *   from the dropdown and click "Run". This immediately writes the clean canonical
 *   headers across all tabs including "Resume Drive Link".
 * ==============================================================================
 */

// 1. CANONICAL TAB SCHEMAS
// Column 1 is ALWAYS "Date", followed by actual form fields in exact visual order.
var TAB_SCHEMAS = {
  'Careers': [
    'Date',
    'Application Type',
    'Position',
    'Full Name',
    'Email Address',
    'Phone Number',
    'LinkedIn / Portfolio',
    'Resume File',
    'Resume Drive Link',
    'Cover Note / Experience',
    'Job Slug'
  ],
  'Career Applications': [
    'Date',
    'Application Type',
    'Position',
    'Full Name',
    'Email Address',
    'Phone Number',
    'LinkedIn / Portfolio',
    'Resume File',
    'Resume Drive Link',
    'Cover Note / Experience',
    'Job Slug'
  ],
  'Job Role Applications': [
    'Date',
    'Application Type',
    'Position',
    'Full Name',
    'Email Address',
    'Phone Number',
    'LinkedIn / Portfolio',
    'Resume File',
    'Resume Drive Link',
    'Cover Note / Experience',
    'Job Slug'
  ],
  'Become a Dealer': [
    'Date',
    'Applicant Name',
    'Company Name',
    'Phone Number',
    'Email Address',
    'City',
    'State',
    'Target Territory',
    'Business Background',
    'Facility Details & Notes'
  ],
  'Get in Touch': [
    'Date',
    'User Type',
    'Full Name',
    'Company / Organisation',
    'Email Address',
    'Phone Number',
    'Vehicle of Interest',
    'Message'
  ],
  'Quote Request': [
    'Date',
    'Request Type',
    'Full Name',
    'Company / Institution',
    'Phone Number',
    'Work Email',
    'Vehicle Model',
    'Fleet Quantity',
    'Requirements / Notes'
  ]
};

// Field aliases to ensure compatibility if any payload key has slight variations
var FIELD_ALIASES = {
  'Position': ['Position', 'Position / Role', 'role', 'jobTitle'],
  'Cover Note / Experience': ['Cover Note / Experience', 'Experience / Cover Note', 'Tell Us About Your Experience', 'message', 'coverNote'],
  'Resume File': ['Resume File', 'Resume Filename', 'resumeFileName', 'resume', 'fileName'],
  'Resume Drive Link': ['Resume Drive Link', 'Resume URL', 'resumeUrl', 'fileUrl', 'resumeDriveLink', 'driveUrl', 'Resume Link', 'driveLink'],
  'LinkedIn / Portfolio': ['LinkedIn / Portfolio', 'Portfolio / LinkedIn', 'LinkedIn Profile / Portfolio Link', 'portfolio'],
  'Vehicle of Interest': ['Vehicle of Interest', 'Vehicle / Requirement', 'requirement', 'vehicle'],
  'Requirements / Notes': ['Requirements / Notes', 'Operational Requirements / Notes', 'Operational Requirements / Custom Notes', 'message']
};

/**
 * Escapes leading formula characters (=, +, -, @) to prevent formula injection.
 */
function sanitizeCellValue(val) {
  if (val === null || val === undefined) return '';
  var str = String(val).trim();
  if (str.length > 0 && (str.charAt(0) === '=' || str.charAt(0) === '+' || str.charAt(0) === '-' || str.charAt(0) === '@')) {
    return "'" + str;
  }
  return str;
}

/**
 * Handles dedicated resume uploads to Google Drive.
 * Files are saved in "SAVY Candidate Resumes" folder with private access restricted to recruiters.
 */
function handleResumeUpload(data) {
  try {
    var fileName = String(data.fileName || 'candidate_resume.pdf').trim();
    var mimeType = String(data.mimeType || 'application/pdf').trim();
    var base64 = data.base64;

    if (!base64) {
      return createJsonResponse({ success: false, error: 'No resume file content received.' }, 400);
    }

    // 1. Extension Validation (PDF, DOC, DOCX only)
    var extMatch = fileName.match(/\.([a-zA-Z0-9]+)$/);
    var ext = extMatch ? extMatch[1].toLowerCase() : '';
    if (['pdf', 'doc', 'docx'].indexOf(ext) === -1) {
      return createJsonResponse({
        success: false,
        error: 'Invalid file format (.' + ext + '). Only PDF, DOC, and DOCX files are allowed.'
      }, 400);
    }

    // 2. Decode base64
    var decoded = Utilities.base64Decode(base64);

    // 3. File Size Validation (Max 5 MB = 5,242,880 bytes)
    var MAX_SIZE = 5 * 1024 * 1024;
    if (decoded.length > MAX_SIZE) {
      return createJsonResponse({
        success: false,
        error: 'File size (' + (decoded.length / (1024 * 1024)).toFixed(2) + ' MB) exceeds 5 MB limit.'
      }, 400);
    }

    // 4. Sanitize file name
    var safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
    var blob = Utilities.newBlob(decoded, mimeType, safeName);

    // 5. Save to private "SAVY Candidate Resumes" Drive folder
    var folderName = 'SAVY Candidate Resumes';
    var folders = DriveApp.getFoldersByName(folderName);
    var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);

    var file = folder.createFile(blob);

    // 6. Security: Keep file PRIVATE to authorized recruiters (NOT public)
    file.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.NONE);

    return createJsonResponse({
      success: true,
      fileName: file.getName(),
      fileId: file.getId(),
      fileUrl: file.getUrl()
    });
  } catch (uploadErr) {
    return createJsonResponse({
      success: false,
      error: 'Google Drive file upload failed: ' + uploadErr.toString()
    }, 500);
  }
}

/**
 * Main POST handler called by the React website.
 * Supports both standard Form Submissions and Resume File Uploads.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Wait up to 30 seconds for concurrent write locks
    lock.waitLock(30000);

    if (!e) {
      return createJsonResponse({ success: false, error: 'Missing request payload' }, 400);
    }

    // --------------------------------------------------------------------------
    // A. Parse incoming payload from either JSON text/plain or form-urlencoded
    // --------------------------------------------------------------------------
    var parsedJson = null;
    if (e.postData && e.postData.contents) {
      try {
        parsedJson = JSON.parse(e.postData.contents);
      } catch (err) {
        // Not a JSON string
      }
    }

    var params = e.parameter || {};

    // --------------------------------------------------------------------------
    // B. Detect Resume Upload Action
    // --------------------------------------------------------------------------
    if (
      (parsedJson && (parsedJson.base64 || parsedJson.action === 'uploadResume')) ||
      (params && (params.base64 || params.action === 'uploadResume'))
    ) {
      var uploadData = parsedJson || params;
      return handleResumeUpload(uploadData);
    }

    // --------------------------------------------------------------------------
    // C. Handle Standard Form Submissions (Careers, Dealer, Contact, Quote)
    // --------------------------------------------------------------------------
    var formType = (params.formType || (parsedJson && parsedJson.formType) || '').trim();
    if (!TAB_SCHEMAS.hasOwnProperty(formType)) {
      return createJsonResponse({
        success: false,
        error: 'Invalid formType: "' + formType + '". Allowed tabs: ' + Object.keys(TAB_SCHEMAS).join(', ')
      }, 400);
    }

    var rawPayload = params.payload;
    var payload = {};
    if (rawPayload) {
      try {
        payload = JSON.parse(rawPayload);
      } catch (err) {
        return createJsonResponse({ success: false, error: 'Invalid JSON payload' }, 400);
      }
    } else if (parsedJson && parsedJson.payload) {
      payload = parsedJson.payload;
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(formType);
    if (!sheet) {
      sheet = ss.insertSheet(formType);
    }

    var schema = TAB_SCHEMAS[formType];
    ensureSheetHeaders(sheet, schema);

    var lastCol = sheet.getLastColumn();
    var currentHeaders = sheet.getRange(1, 1, 1, lastCol).getValues()[0];

    // Authoritative Server-Side Date in Asia/Kolkata timezone (e.g., "15-Oct-2026")
    var submissionDate = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd-MMM-yyyy');

    var rowData = [];
    for (var i = 0; i < currentHeaders.length; i++) {
      var header = String(currentHeaders[i]).trim();
      if (header === 'Date') {
        rowData.push(submissionDate);
      } else {
        var value = resolveFieldValue(payload, header);
        rowData.push(sanitizeCellValue(value));
      }
    }

    sheet.appendRow(rowData);

    return createJsonResponse({ success: true, formType: formType });
  } catch (error) {
    return createJsonResponse({ success: false, error: error.toString() }, 500);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Resolves a field value from the payload using exact match or known aliases.
 */
function resolveFieldValue(payload, headerName) {
  if (payload.hasOwnProperty(headerName)) {
    return payload[headerName];
  }
  if (FIELD_ALIASES.hasOwnProperty(headerName)) {
    var aliases = FIELD_ALIASES[headerName];
    for (var i = 0; i < aliases.length; i++) {
      if (payload.hasOwnProperty(aliases[i])) {
        return payload[aliases[i]];
      }
    }
  }
  return '';
}

/**
 * Ensures row 1 has the clean canonical schema headers.
 * If new schema columns (such as "Resume Drive Link") are added, appends them cleanly.
 */
function ensureSheetHeaders(sheet, schema) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(schema);
    formatHeaderRow(sheet, schema.length);
    return;
  }

  // Check if any schema column is missing from row 1
  var lastCol = sheet.getLastColumn();
  if (lastCol === 0) {
    sheet.appendRow(schema);
    formatHeaderRow(sheet, schema.length);
    return;
  }

  var existingHeaders = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(function(h) {
    return String(h).trim();
  });

  // Check if "Resume Drive Link" is missing from a Careers tab
  for (var i = 0; i < schema.length; i++) {
    var colName = schema[i];
    if (existingHeaders.indexOf(colName) === -1) {
      var newColIndex = sheet.getLastColumn() + 1;
      sheet.getRange(1, newColIndex).setValue(colName);
      formatHeaderRow(sheet, newColIndex);
    }
  }
}

/**
 * Applies clean header styling.
 */
function formatHeaderRow(sheet, numColumns) {
  var headerRange = sheet.getRange(1, 1, 1, numColumns);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#E8F5E9');
  headerRange.setFontColor('#1B5E20');
  sheet.setFrozenRows(1);
}

/**
 * Helper to return standard JSON with CORS headers.
 */
function createJsonResponse(obj, statusCode) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * GET handler for simple health-checks and documentation.
 */
function doGet(e) {
  return createJsonResponse({
    status: 'ok',
    service: 'Savy Greentech Form Submission & Resume Upload Web App',
    timestamp: new Date().toISOString()
  });
}

/**
 * UTILITY FUNCTION:
 * Run this function directly from the Apps Script editor toolbar dropdown to
 * cleanly apply the canonical header schema to all tabs in your spreadsheet.
 */
function resetAllTabHeadersToCanonical() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  for (var tabName in TAB_SCHEMAS) {
    var sheet = ss.getSheetByName(tabName);
    if (!sheet) continue;
    var schema = TAB_SCHEMAS[tabName];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(schema);
    } else {
      sheet.getRange(1, 1, 1, schema.length).setValues([schema]);
    }
    formatHeaderRow(sheet, schema.length);
  }
}
