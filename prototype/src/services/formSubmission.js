import { GOOGLE_APPS_SCRIPT_URL, WHATSAPP_NUMBER, SHEET_TABS } from '../config/forms.js';

const ALLOWED_TABS = Object.values(SHEET_TABS);

/**
 * Sanitizes a single cell value to prevent Google Sheets CSV/Formula Injection.
 * Prefixes cells beginning with '=', '+', '-', or '@' with a single apostrophe.
 */
function sanitizeCell(val) {
  if (val === null || val === undefined) return '';
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (trimmed.length > 0 && /^[=+@-]/.test(trimmed)) {
      return `'${trimmed}`;
    }
    return trimmed;
  }
  return val;
}

/**
 * Sanitizes all fields in a payload object.
 */
export function sanitizePayload(payload) {
  const sanitized = {};
  for (const [key, value] of Object.entries(payload)) {
    sanitized[key] = sanitizeCell(value);
  }
  return sanitized;
}

/**
 * Submits form data to the Google Apps Script Web App endpoint.
 *
 * @param {Object} options
 * @param {string} options.formType - Exact Google Sheet tab name
 * @param {Object} options.payload - Key-value pair object of form data
 * @param {string} [options.honeypot] - Hidden anti-bot field value
 * @returns {Promise<{ success: boolean }>}
 */
export async function submitFormToGoogleSheets({ formType, payload, honeypot = '' }) {
  // 1. Client-side Honeypot Check (Silently drop spam bot submissions)
  if (honeypot && String(honeypot).trim().length > 0) {
    // Return simulated success so bots do not learn or retry
    return { success: true, simulated: true };
  }

  // 2. Validate formType against allowed tabs
  if (!ALLOWED_TABS.includes(formType)) {
    throw new Error(`Invalid form destination tab: "${formType}". Must be one of: ${ALLOWED_TABS.join(', ')}`);
  }

  // 3. Sanitize all cell inputs (formula injection prevention)
  const cleanPayload = sanitizePayload(payload);

  // 4. Construct URL-encoded parameters required by Google Apps Script
  const params = new URLSearchParams();
  params.append('formType', formType);
  params.append('payload', JSON.stringify(cleanPayload));

  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script responded with HTTP status ${response.status}`);
    }

    const result = await response.json().catch(() => null);

    // Google Apps Script endpoint returns { success: true }
    if (result && result.success === false) {
      throw new Error(result.error || result.message || 'Google Sheets could not record the submission.');
    }

    return { success: true, data: result };
  } catch (err) {
    // Avoid leaking sensitive data in logs, but preserve actionable error message
    console.error('Form submission request failed:', err.message || err);
    throw new Error(
      err.message && !err.message.includes('fetch')
        ? err.message
        : 'Network error communicating with the submission server. Please check your internet connection and try again.'
    );
  }
}

/**
 * Checks if a valid international WhatsApp number is configured.
 */
export function isWhatsAppConfigured() {
  if (!WHATSAPP_NUMBER || WHATSAPP_NUMBER === 'REPLACE_WITH_MY_NUMBER') {
    return false;
  }
  const digitsOnly = String(WHATSAPP_NUMBER).replace(/\D/g, '');
  return digitsOnly.length >= 10;
}

/**
 * Builds the official WhatsApp click-to-chat URL with prefilled text.
 * Format: https://wa.me/WHATSAPP_NUMBER?text=ENCODED_MESSAGE
 *
 * @param {Object} options
 * @param {string} options.formType - Form category (e.g. "Get in Touch", "Careers")
 * @param {string} [options.name] - Customer or applicant name
 * @param {Array<string>} [options.details] - Short summary lines (e.g. ["Vehicle: Club Cart", "Quantity: 2"])
 * @returns {string|null} - Formatted WhatsApp URL or null if number is not configured
 */
export function buildWhatsAppUrl({ formType, name = '', details = [] }) {
  if (!isWhatsAppConfigured()) {
    return null;
  }

  const cleanNumber = String(WHATSAPP_NUMBER).replace(/\D/g, '');

  const lines = ['New Website Form Submission', ''];
  lines.push(`Form: ${formType}`);
  if (name) {
    lines.push(`Name: ${name}`);
  }
  if (details && details.length > 0) {
    details.forEach((item) => {
      if (item) lines.push(item);
    });
  }
  lines.push('');
  lines.push('Please check the Google Sheet for complete submission details.');

  const messageText = lines.join('\n');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(messageText)}`;
}

/**
 * Attempts to open WhatsApp in a new tab/window.
 * Note: If the browser's popup blocker prevents automatic opening,
 * callers should display the link/button on the success screen so the user can click it.
 *
 * @param {string|null} whatsappUrl
 * @returns {boolean} - true if window opened, false otherwise
 */
export function attemptOpenWhatsApp(whatsappUrl) {
  if (!whatsappUrl) return false;
  try {
    const opened = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    return !!opened;
  } catch (e) {
    return false;
  }
}
