/**
 * Savy Greentech - Form Validation Utilities
 *
 * Implements strict, user-friendly client-side validation for emails, phone numbers,
 * and resume file uploads across all customer-facing forms.
 */

import { validateResumeFile } from '../services/resumeUpload.js';

/**
 * Standard RFC-compliant email regex ensuring a valid user, domain, and TLD of at least 2 characters.
 * Rejects invalid patterns such as:
 * - test@
 * - test.com
 * - @gmail.com
 * - test@gmail
 * - test@.com
 */
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

/**
 * Validates an email address.
 *
 * @param {string} email
 * @param {Object} [options]
 * @param {boolean} [options.required=true]
 * @returns {{ isValid: boolean, error: string, value: string }}
 */
export function validateEmail(email, { required = true } = {}) {
  const trimmed = typeof email === 'string' ? email.trim() : '';

  if (!trimmed) {
    if (required) {
      return { isValid: false, error: 'Email address is required.', value: '' };
    }
    return { isValid: true, error: '', value: '' };
  }

  // Reject internal spaces
  if (/\s/.test(trimmed)) {
    return {
      isValid: false,
      error: 'Email address must not contain spaces.',
      value: trimmed,
    };
  }

  if (!EMAIL_REGEX.test(trimmed)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address (e.g. name@company.com).',
      value: trimmed,
    };
  }

  return { isValid: true, error: '', value: trimmed };
}

/**
 * Sanitizes phone number input:
 * - Allows numbers only (0-9).
 * - Maximum 10 digits.
 * - Strips any non-digit characters (including alphabets, special characters, spaces, +, -).
 * - If a user pastes an Indian number with country code (+91 / 91) or leading 0,
 *   smartly removes the prefix before enforcing the 10-digit maximum limit.
 *
 * @param {string} val
 * @returns {string}
 */
export function sanitizePhoneInput(val) {
  if (typeof val !== 'string') return '';
  let digits = val.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    digits = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith('0')) {
    digits = digits.slice(1);
  }
  return digits.slice(0, 10);
}

/**
 * Validates phone numbers.
 * Requirements:
 * - Numbers only (0–9).
 * - Exactly 10 digits.
 * - Must start with 6, 7, 8, or 9 for Indian mobile numbers.
 *
 * @param {string} phone
 * @param {Object} [options]
 * @param {boolean} [options.required=true]
 * @returns {{ isValid: boolean, error: string, value: string }}
 */
export function validatePhoneNumber(phone, { required = true } = {}) {
  const trimmed = typeof phone === 'string' ? phone.trim() : '';

  if (!trimmed) {
    if (required) {
      return { isValid: false, error: 'Phone number is required.', value: '' };
    }
    return { isValid: true, error: '', value: '' };
  }

  // Reject non-numeric characters if any remain
  if (/\D/.test(trimmed)) {
    return {
      isValid: false,
      error: 'Phone number must contain numbers only (0–9).',
      value: trimmed,
    };
  }

  if (trimmed.length < 10) {
    return {
      isValid: false,
      error: 'Please enter a complete 10-digit mobile number.',
      value: trimmed,
    };
  }

  if (trimmed.length > 10) {
    return {
      isValid: false,
      error: 'Phone number must not exceed 10 digits.',
      value: trimmed,
    };
  }

  // Indian mobile numbers must start with 6, 7, 8, or 9
  if (!/^[6-9]/.test(trimmed)) {
    return {
      isValid: false,
      error: 'Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.',
      value: trimmed,
    };
  }

  return { isValid: true, error: '', value: trimmed };
}

/**
 * Validates candidate resume file upload.
 *
 * @param {File|null|undefined} file
 * @param {Object} [options]
 * @param {boolean} [options.required=true]
 * @returns {{ isValid: boolean, error: string }}
 */
export function validateResume(file, { required = true } = {}) {
  if (!file) {
    if (required) {
      return {
        isValid: false,
        error: 'Please upload your resume before submitting your application.',
      };
    }
    return { isValid: true, error: '' };
  }

  try {
    validateResumeFile(file);
    return { isValid: true, error: '' };
  } catch (err) {
    return { isValid: false, error: err.message };
  }
}
