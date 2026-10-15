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

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      if (!response.ok) {
        if (attempt === 1 && (response.status === 404 || response.status === 429 || response.status >= 500)) {
          // Transient Google Apps Script proxy throttling - backoff and retry once
          await new Promise((r) => setTimeout(r, 1500));
          continue;
        }
        throw new Error(`Google Apps Script responded with HTTP status ${response.status}`);
      }

      const result = await response.json().catch(() => null);

      // Google Apps Script endpoint returns { success: true }
      if (result && result.success === false) {
        throw new Error(result.error || result.message || 'Google Sheets could not record the submission.');
      }

      return { success: true, data: result };
    } catch (err) {
      if (attempt === 1 && !err.message?.includes('Google Sheets could not record')) {
        await new Promise((r) => setTimeout(r, 1500));
        continue;
      }
      // Avoid leaking sensitive data in logs, but preserve actionable error message
      console.error('Form submission request failed:', err.message || err);
      throw new Error(
        err.message && !err.message.includes('fetch')
          ? err.message
          : 'Network error communicating with the submission server. Please check your internet connection and try again.'
      );
    }
  }
}

/**
 * Checks if a valid international WhatsApp number is configured.
 */
export function isWhatsAppConfigured(customNumber = null) {
  const number = customNumber || WHATSAPP_NUMBER;
  if (!number || number === 'REPLACE_WITH_MY_NUMBER') {
    return false;
  }
  const digitsOnly = String(number).replace(/\D/g, '');
  return digitsOnly.length >= 10;
}

/**
 * Encodes and creates a WhatsApp click-to-chat URL from raw text.
 * Format: https://wa.me/WHATSAPP_NUMBER?text=ENCODED_MESSAGE
 *
 * @param {string} messageText - Unencoded human-readable message
 * @param {string} [customNumber] - Optional override for business number
 * @returns {string|null}
 */
export function generateWhatsAppUrl(messageText, customNumber = null) {
  if (!messageText || !isWhatsAppConfigured(customNumber)) {
    return null;
  }
  const cleanNumber = String(customNumber || WHATSAPP_NUMBER).replace(/\D/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(messageText)}`;
}

/**
 * Generates formatted WhatsApp message for Get in Touch form.
 */
export function formatGetInTouchWhatsAppMessage({
  name,
  email,
  phone,
  company,
  userType,
  requirement,
  message,
}) {
  const lines = [
    'New Website Enquiry – Savy Greentech',
    '',
    'Hello Savy Greentech Team,',
    'A new enquiry has been submitted through the website.',
    '',
  ];

  if (name?.trim()) lines.push(`Name: ${name.trim()}`);
  if (email?.trim()) lines.push(`Email: ${email.trim()}`);
  if (phone?.trim()) lines.push(`Phone: ${phone.trim()}`);
  if (company?.trim()) lines.push(`Company/Organisation: ${company.trim()}`);
  if (userType?.trim()) lines.push(`User Type: ${userType.trim()}`);
  if (requirement?.trim()) lines.push(`Vehicle of Interest / Requirement: ${requirement.trim()}`);
  if (message?.trim()) lines.push(`Message: ${message.trim()}`);

  lines.push('');
  lines.push('Source: Savy Greentech Website');
  lines.push('Form Type: Get in Touch');
  lines.push('');
  lines.push('Please follow up with this enquiry.');

  return lines.join('\n');
}

/**
 * Generates formatted WhatsApp message for Vehicle Quotation & Demo Form (QuoteModal).
 */
export function formatQuoteRequestWhatsAppMessage({
  name,
  phone,
  email,
  company,
  vehicle,
  quantity,
  location,
  requestType,
  message,
}) {
  const lines = [
    'New Vehicle Quotation / Demo Request – Savy Greentech',
    '',
    'Hello Team,',
    'A new vehicle quotation or demo request has been received.',
    '',
  ];

  if (name?.trim()) lines.push(`Name: ${name.trim()}`);
  if (phone?.trim()) lines.push(`Phone: ${phone.trim()}`);
  if (email?.trim()) lines.push(`Email: ${email.trim()}`);
  if (company?.trim()) lines.push(`Company: ${company.trim()}`);
  if (vehicle?.trim()) lines.push(`Vehicle: ${vehicle.trim()}`);
  if (quantity?.trim()) lines.push(`Quantity / Fleet Size: ${quantity.trim()}`);
  if (location?.trim()) lines.push(`Location: ${location.trim()}`);
  if (requestType?.trim()) lines.push(`Request Type: ${requestType.trim()}`);
  if (message?.trim()) lines.push(`Additional Message: ${message.trim()}`);

  lines.push('');
  lines.push('Source: Savy Greentech Website');
  lines.push('Form Type: Quote Request');
  lines.push('');
  lines.push('Please contact the customer for further discussion.');

  return lines.join('\n');
}

/**
 * Generates formatted WhatsApp message for Dealership Application Form.
 */
export function formatDealerApplicationWhatsAppMessage({
  name,
  company,
  phone,
  email,
  city,
  state,
  territory,
  experience,
  vehicleCategory,
  message,
}) {
  const lines = [
    'New Dealership Application – Savy Greentech',
    '',
    'Hello Team,',
    'A new dealership application has been submitted.',
    '',
  ];

  if (name?.trim()) lines.push(`Applicant Name: ${name.trim()}`);
  if (company?.trim()) lines.push(`Business Name: ${company.trim()}`);
  if (phone?.trim()) lines.push(`Phone: ${phone.trim()}`);
  if (email?.trim()) lines.push(`Email: ${email.trim()}`);

  const cityState = [city?.trim(), state?.trim()].filter(Boolean).join(', ');
  if (cityState) lines.push(`City / State: ${cityState}`);
  if (territory?.trim()) lines.push(`Target Territory: ${territory.trim()}`);
  if (experience?.trim()) lines.push(`Business Experience: ${experience.trim()}`);
  if (vehicleCategory?.trim()) lines.push(`Interested Vehicle Category: ${vehicleCategory.trim()}`);
  if (message?.trim()) lines.push(`Additional Details: ${message.trim()}`);

  lines.push('');
  lines.push('Source: Savy Greentech Website');
  lines.push('Form Type: Become a Dealer');
  lines.push('');
  lines.push('Please review the application and contact the applicant.');

  return lines.join('\n');
}

/**
 * Generates formatted WhatsApp message for Career Application / Job Role Application.
 */
export function formatCareerApplicationWhatsAppMessage({
  formType = 'Career Application',
  name,
  email,
  phone,
  jobRole,
  experience,
  location,
  resume,
  portfolio,
  message,
}) {
  const lines = [
    'New Job Application – Savy Greentech',
    '',
    'Hello HR Team,',
    'A new job application has been submitted.',
    '',
  ];

  if (name?.trim()) lines.push(`Applicant Name: ${name.trim()}`);
  if (email?.trim()) lines.push(`Email: ${email.trim()}`);
  if (phone?.trim()) lines.push(`Phone: ${phone.trim()}`);
  if (jobRole?.trim()) lines.push(`Job Role: ${jobRole.trim()}`);
  if (experience?.trim()) lines.push(`Experience: ${experience.trim()}`);
  if (location?.trim()) lines.push(`Location: ${location.trim()}`);
  if (resume?.trim()) lines.push(`Resume: ${resume.trim()}`);
  if (portfolio?.trim()) lines.push(`Portfolio / LinkedIn: ${portfolio.trim()}`);
  if (message?.trim()) lines.push(`Cover Note: ${message.trim()}`);

  lines.push('');
  lines.push('Source: Savy Greentech Website');
  lines.push(`Form Type: ${formType}`);
  lines.push('');
  lines.push('Please review the application and follow up with the applicant.');

  return lines.join('\n');
}

/**
 * Builds the official WhatsApp click-to-chat URL with prefilled text tailored to each form.
 *
 * @param {Object} options
 * @returns {string|null} - Formatted WhatsApp URL or null if number is not configured
 */
export function buildWhatsAppUrl(options = {}) {
  if (options.messageText) {
    return generateWhatsAppUrl(options.messageText, options.customNumber);
  }

  const { formType } = options;

  if (formType === SHEET_TABS.GET_IN_TOUCH || formType === 'Get in Touch') {
    return generateWhatsAppUrl(formatGetInTouchWhatsAppMessage(options), options.customNumber);
  }
  if (
    formType === SHEET_TABS.QUOTE_REQUEST ||
    formType === 'Quote Request' ||
    formType?.includes('Quote') ||
    formType?.includes('Demo')
  ) {
    return generateWhatsAppUrl(formatQuoteRequestWhatsAppMessage(options), options.customNumber);
  }
  if (formType === SHEET_TABS.BECOME_A_DEALER || formType === 'Become a Dealer') {
    return generateWhatsAppUrl(formatDealerApplicationWhatsAppMessage(options), options.customNumber);
  }
  if (
    formType === SHEET_TABS.CAREERS ||
    formType === 'Careers' ||
    formType === 'Career Application' ||
    formType === 'Job Role Application'
  ) {
    return generateWhatsAppUrl(formatCareerApplicationWhatsAppMessage(options), options.customNumber);
  }

  // Fallback for custom or legacy calls
  const lines = [
    'New Website Form Submission – Savy Greentech',
    '',
    'Hello Team,',
    'A new form submission has been received.',
    '',
  ];
  if (options.name) lines.push(`Name: ${options.name}`);
  if (Array.isArray(options.details)) {
    options.details.forEach((item) => {
      if (item) lines.push(item);
    });
  }
  lines.push('');
  lines.push('Source: Savy Greentech Website');
  lines.push(`Form Type: ${formType || 'Website Form'}`);
  lines.push('');
  lines.push('Please follow up with this enquiry.');

  return generateWhatsAppUrl(lines.join('\n'), options.customNumber);
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
  if (!whatsappUrl || typeof window === 'undefined') return false;
  try {
    const opened = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    return !!opened;
  } catch (e) {
    return false;
  }
}
