import { GOOGLE_RESUME_UPLOAD_URL, GOOGLE_APPS_SCRIPT_URL } from '../config/forms.js';

export const MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];

export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

/**
 * Validates candidate resume file for extension, MIME type, and 5 MB size limit.
 *
 * @param {File} file
 * @throws {Error} if validation fails
 */
export function validateResumeFile(file) {
  if (!file) {
    throw new Error('Please select a resume file to upload.');
  }

  // 1. Size Validation (Max 5 MB)
  if (file.size > MAX_RESUME_SIZE_BYTES) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
    throw new Error(`File size (${sizeMb} MB) exceeds the 5 MB limit. Please upload a smaller PDF or Word document.`);
  }

  if (file.size === 0) {
    throw new Error('The selected file is empty. Please select a valid resume file.');
  }

  // 2. Extension Validation
  const name = file.name || '';
  const lastDot = name.lastIndexOf('.');
  if (lastDot === -1) {
    throw new Error('The file must have an extension (.pdf, .doc, or .docx).');
  }

  const ext = name.slice(lastDot).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    throw new Error(`Invalid file type "${ext}". Only PDF, DOC, and DOCX files are allowed.`);
  }

  // 3. MIME Type Validation (if reported by browser)
  if (file.type && !ALLOWED_MIME_TYPES.includes(file.type) && file.type !== 'application/octet-stream') {
    throw new Error(`Invalid file format (${file.type}). Only PDF (.pdf) and Word documents (.doc, .docx) are allowed.`);
  }

  return true;
}

/**
 * Reads a File object in the browser and resolves with pure Base64 content (excluding data URL prefix).
 *
 * @param {File} file
 * @returns {Promise<string>} Base64 string
 */
export function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const result = reader.result;
        if (typeof result !== 'string') {
          reject(new Error('Failed to read file as text/base64 string.'));
          return;
        }
        // Result is in format "data:<mimeType>;base64,<base64data>"
        const commaIndex = result.indexOf(',');
        const base64 = commaIndex >= 0 ? result.slice(commaIndex + 1) : result;
        if (!base64 || base64.trim().length === 0) {
          reject(new Error('File content could not be converted to base64.'));
          return;
        }
        resolve(base64);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = () => {
      reject(reader.error || new Error('An error occurred reading the resume file.'));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Detects appropriate MIME type from file or extension.
 */
function resolveMimeType(file) {
  if (file.type && ALLOWED_MIME_TYPES.includes(file.type)) {
    return file.type;
  }
  const name = (file.name || '').toLowerCase();
  if (name.endsWith('.pdf')) return 'application/pdf';
  if (name.endsWith('.doc')) return 'application/msword';
  if (name.endsWith('.docx')) return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  return 'application/pdf';
}

/**
 * Sends a single resume upload request to an Apps Script endpoint.
 * Uses CORS-safelisted 'Content-Type: text/plain;charset=utf-8' to prevent
 * CORS preflight OPTIONS requests that Google Apps Script does not support.
 */
async function postResumePayload(url, payload) {
  const jsonString = JSON.stringify(payload);

  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      // Using text/plain avoids CORS preflight while Google Apps Script receives
      // the raw JSON string in e.postData.contents
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: jsonString,
      redirect: 'follow',
    });
  } catch (netErr) {
    throw new Error(
      'Unable to reach the resume upload service. If you are an administrator, ensure the Google Apps Script Web App is deployed with "Who has access" set to "Anyone".'
    );
  }

  // Check for HTTP authentication / permission redirects (e.g. 401 or redirect to Google Accounts)
  if (response.status === 401 || (response.url && response.url.includes('accounts.google.com'))) {
    throw new Error(
      'Resume upload endpoint authentication error (HTTP 401). ' +
      'Please ensure the Google Apps Script Web App is deployed with "Who has access" set to "Anyone".'
    );
  }

  if (!response.ok) {
    throw new Error(`Google Apps Script responded with HTTP status ${response.status}`);
  }

  const rawText = await response.text();
  let result;
  try {
    result = JSON.parse(rawText);
  } catch (parseErr) {
    // If the response was HTML, it may be an Apps Script error screen
    if (rawText.includes('<!DOCTYPE html>') || rawText.includes('Sign in')) {
      throw new Error(
        'Resume upload endpoint returned HTML instead of JSON. ' +
        'Please verify that the Apps Script deployment access is set to "Anyone".'
      );
    }
    throw new Error('Failed to parse response from resume upload endpoint.');
  }

  if (!result || result.success === false) {
    throw new Error(result?.error || result?.message || 'Resume upload failed on Google Drive server.');
  }

  if (!result.fileUrl) {
    throw new Error('Upload succeeded on Google Drive but no fileUrl was returned.');
  }

  return {
    success: true,
    fileName: result.fileName || payload.fileName,
    fileId: result.fileId || '',
    fileUrl: result.fileUrl,
  };
}

/**
 * Uploads candidate's resume to Google Drive through the Google Apps Script endpoint.
 *
 * @param {File} file - Selected browser File object
 * @param {Object} [options]
 * @param {string} [options.endpointUrl] - Override endpoint URL
 * @returns {Promise<{ success: boolean, fileName: string, fileId: string, fileUrl: string }>}
 */
export async function uploadResumeToGoogleDrive(file, options = {}) {
  // 1. Strict Client-side Validation (File size <= 5 MB, PDF/DOC/DOCX)
  validateResumeFile(file);

  // 2. Read File as Base64 in browser
  const base64Data = await readFileAsBase64(file);
  const mimeType = resolveMimeType(file);

  const payload = {
    fileName: file.name,
    mimeType,
    base64: base64Data,
    action: 'uploadResume',
  };

  const primaryUrl = options.endpointUrl || GOOGLE_RESUME_UPLOAD_URL;

  try {
    return await postResumePayload(primaryUrl, payload);
  } catch (primaryErr) {
    // If primary URL is distinct from GOOGLE_APPS_SCRIPT_URL and encountered an authorization error,
    // attempt fallback to GOOGLE_APPS_SCRIPT_URL if configured with resume handling.
    if (
      GOOGLE_APPS_SCRIPT_URL &&
      primaryUrl !== GOOGLE_APPS_SCRIPT_URL &&
      primaryErr.message?.includes('401')
    ) {
      try {
        console.warn('Primary resume endpoint returned 401. Attempting unified Apps Script endpoint fallback...');
        return await postResumePayload(GOOGLE_APPS_SCRIPT_URL, payload);
      } catch (fallbackErr) {
        // Report actionable primary error so administrator knows to adjust deployment settings
        throw primaryErr;
      }
    }
    throw primaryErr;
  }
}
