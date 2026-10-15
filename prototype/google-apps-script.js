/**
 * ==============================================================================
 * SAVY GREENTECH - GOOGLE APPS SCRIPT FORM SUBMISSION WEB APP
 * Target Spreadsheet ID: 1KRqMTf087SlI9Rx5wKy4grXSmDLLwl2R78yfGSzwaWg
 *
 * HOW TO DEPLOY:
 * 1. Open your Google Spreadsheet (ID: 1KRqMTf087SlI9Rx5wKy4grXSmDLLwl2R78yfGSzwaWg).
 * 2. In the top menu, go to Extensions > Apps Script.
 * 3. Replace all existing code in Code.gs with this entire script.
 * 4. Click "Save" (disk icon).
 * 5. Click "Deploy" > "Manage deployments".
 * 6. Click the Pencil (Edit) icon on your active Web App deployment.
 * 7. In the "Version" dropdown, select "New version".
 * 8. Click "Deploy".
 *    (This updates the script logic while KEEPING your exact existing Web App URL!)
 *
 * OPTIONAL ONE-CLICK HEADER CLEANUP:
 * - In the Apps Script toolbar, select the function "resetAllTabHeadersToCanonical"
 *   from the dropdown and click "Run". This immediately writes the clean canonical
 *   headers (Date + form fields) across all 4 tabs and removes any test columns.
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
  'Resume File': ['Resume File', 'Resume Filename', 'resumeFileName', 'resume'],
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
 * Main POST handler called by the React website.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Wait up to 30 seconds for concurrent write locks
    lock.waitLock(30000);

    if (!e || !e.parameter) {
      return createJsonResponse({ success: false, error: 'Missing request parameters' }, 400);
    }

    var formType = (e.parameter.formType || '').trim();
    if (!TAB_SCHEMAS.hasOwnProperty(formType)) {
      return createJsonResponse({
        success: false,
        error: 'Invalid formType: "' + formType + '". Allowed tabs: ' + Object.keys(TAB_SCHEMAS).join(', ')
      }, 400);
    }

    var rawPayload = e.parameter.payload;
    var payload = {};
    if (rawPayload) {
      try {
        payload = JSON.parse(rawPayload);
      } catch (err) {
        return createJsonResponse({ success: false, error: 'Invalid JSON payload' }, 400);
      }
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
 */
function ensureSheetHeaders(sheet, schema) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(schema);
    formatHeaderRow(sheet, schema.length);
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
function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * GET handler for simple health-checks.
 */
function doGet(e) {
  return createJsonResponse({
    status: 'ok',
    service: 'Savy Greentech Form Submission Web App',
    timestamp: new Date().toISOString()
  });
}

/**
 * UTILITY FUNCTION:
 * Run this function directly from the Apps Script editor toolbar dropdown to
 * cleanly apply the canonical header schema to all 4 tabs in your spreadsheet.
 */
function resetAllTabHeadersToCanonical() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  for (var tabName in TAB_SCHEMAS) {
    var sheet = ss.getSheetByName(tabName);
    if (!sheet) {
      sheet = ss.insertSheet(tabName);
    }
    var schema = TAB_SCHEMAS[tabName];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(schema);
    } else {
      sheet.getRange(1, 1, 1, schema.length).setValues([schema]);
    }
    formatHeaderRow(sheet, schema.length);
  }
}
