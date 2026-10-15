/**
 * Savy Greentech - Form Submission and WhatsApp Integration Configuration
 *
 * --------------------------------------------------------------------------
 * HOW TO CONFIGURE YOUR WHATSAPP NUMBER:
 * 1. Change the WHATSAPP_NUMBER constant below to your full international
 *    phone number using DIGITS ONLY (no spaces, dashes, or plus signs).
 *    Example: '919876543210' (for India: country code 91 + 10-digit number).
 * 2. Alternatively, you can set the VITE_WHATSAPP_NUMBER environment variable.
 * --------------------------------------------------------------------------
 */

export const GOOGLE_SPREADSHEET_ID = '1KRqMTf087SlI9Rx5wKy4grXSmDLLwl2R78yfGSzwaWg';

export const GOOGLE_APPS_SCRIPT_URL =
  import.meta.env?.VITE_GOOGLE_APPS_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbxvCA3LCR-Sk1Nd9O6naRct1raLDbBz4BJIU6vCzR7F4DwLQDgco5uYNVPrZWkhJ15Zew/exec';

export const GOOGLE_RESUME_UPLOAD_URL =
  import.meta.env?.VITE_GOOGLE_RESUME_UPLOAD_URL ||
  'https://script.google.com/macros/s/AKfycbw_D95ygHn7j1E0c67RRD35LxxLM6frNzjl0AmA5AnPtbkwtBC2Hz9SZBhUMDTvnTQxMA/exec';

/**
 * Verified SAVY Greentech Business WhatsApp Number (Digits only, international format).
 * Configured in SiteFooter and FloatingWhatsApp as 919284830085.
 * Can be overridden via VITE_WHATSAPP_NUMBER in .env if needed.
 */
export const WHATSAPP_NUMBER =
  import.meta.env?.VITE_WHATSAPP_NUMBER || '919284830085';

/**
 * Google Sheet Tab Names strictly supported by the Apps Script endpoint.
 */
export const SHEET_TABS = {
  CAREERS: 'Careers',
  BECOME_A_DEALER: 'Become a Dealer',
  GET_IN_TOUCH: 'Get in Touch',
  QUOTE_REQUEST: 'Quote Request',
};
