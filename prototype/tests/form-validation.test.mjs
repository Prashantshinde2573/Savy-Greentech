import { test, describe } from 'node:test';
import assert from 'node:assert';
import { validateEmail, validatePhoneNumber, validateResume, sanitizePhoneInput } from '../src/utils/validation.js';

describe('Form Validation Utilities Tests', () => {
  describe('Email Validation', () => {
    test('accepts valid standard email addresses', () => {
      const validEmails = [
        'test@gmail.com',
        'ramesh.patel@savygreentech.com',
        'fleet_manager@tech-park.co.in',
        'user+tag@domain.org',
        'a.b-c_d@example.io',
      ];
      for (const email of validEmails) {
        const res = validateEmail(email);
        assert.strictEqual(res.isValid, true, `Expected "${email}" to be valid`);
        assert.strictEqual(res.error, '');
      }
    });

    test('trims whitespace and accepts valid email', () => {
      const res = validateEmail('   user@company.com   ');
      assert.strictEqual(res.isValid, true);
      assert.strictEqual(res.value, 'user@company.com');
    });

    test('rejects missing or empty required email', () => {
      const res = validateEmail('');
      assert.strictEqual(res.isValid, false);
      assert.match(res.error, /required/i);
    });

    test('rejects invalid email formats specified in requirements', () => {
      const invalidEmails = [
        'test@',
        'test.com',
        '@gmail.com',
        'test@gmail',
        'test@.com',
        'test@com',
        'test@domain',
        'user @domain.com',
        'user@domain .com',
        'user@domain..com',
      ];
      for (const email of invalidEmails) {
        const res = validateEmail(email);
        assert.strictEqual(res.isValid, false, `Expected "${email}" to be invalid`);
        assert.ok(res.error.length > 0);
      }
    });
  });

  describe('Phone Number Input Sanitization & Validation', () => {
    test('sanitizes input: strips alphabets, spaces, symbols and restricts to max 10 digits', () => {
      assert.strictEqual(sanitizePhoneInput('98765abcde'), '98765');
      assert.strictEqual(sanitizePhoneInput('987654321012'), '9876543210');
      assert.strictEqual(sanitizePhoneInput('+91 98765 43210'), '9876543210');
      assert.strictEqual(sanitizePhoneInput('09876543210'), '9876543210');
      assert.strictEqual(sanitizePhoneInput('+91 (987) 654-3210'), '9876543210');
      assert.strictEqual(sanitizePhoneInput('phone: 98765-43210'), '9876543210');
    });

    test('accepts valid 10-digit Indian mobile numbers starting with 6, 7, 8, 9', () => {
      const validNumbers = [
        '9876543210',
        '8123456789',
        '7000000000',
        '6999999999',
      ];
      for (const phone of validNumbers) {
        const res = validatePhoneNumber(phone);
        assert.strictEqual(res.isValid, true, `Expected "${phone}" to be valid`);
        assert.strictEqual(res.error, '');
      }
    });

    test('rejects Indian numbers starting with digits other than 6, 7, 8, or 9', () => {
      const invalidStartingDigits = [
        '1234567890',
        '2345678901',
        '3456789012',
        '4567890123',
        '5555555555',
        '0123456789',
      ];
      for (const phone of invalidStartingDigits) {
        const res = validatePhoneNumber(phone);
        assert.strictEqual(res.isValid, false, `Expected "${phone}" to be rejected`);
        assert.match(res.error, /starting with 6, 7, 8, or 9/i);
      }
    });

    test('rejects incomplete numbers (< 10 digits)', () => {
      const incomplete = ['98765', '987654321', '9', ''];
      for (const phone of incomplete.filter(Boolean)) {
        const res = validatePhoneNumber(phone);
        assert.strictEqual(res.isValid, false, `Expected "${phone}" to be rejected`);
        assert.match(res.error, /complete 10-digit/i);
      }
    });

    test('rejects numbers exceeding 10 digits', () => {
      const res = validatePhoneNumber('987654321012');
      assert.strictEqual(res.isValid, false);
      assert.match(res.error, /must not exceed 10 digits/i);
    });

    test('rejects non-numeric characters if passed directly', () => {
      const invalidChars = [
        '98765abcde',
        '+919876543210',
        '98765 43210',
      ];
      for (const phone of invalidChars) {
        const res = validatePhoneNumber(phone);
        assert.strictEqual(res.isValid, false, `Expected "${phone}" to be rejected`);
        assert.match(res.error, /numbers only/i);
      }
    });

    test('rejects empty required phone number', () => {
      const res = validatePhoneNumber('');
      assert.strictEqual(res.isValid, false);
      assert.match(res.error, /required/i);
    });
  });

  describe('Resume Mandatory Validation', () => {
    test('rejects empty resume when required', () => {
      const res = validateResume(null, { required: true });
      assert.strictEqual(res.isValid, false);
      assert.strictEqual(res.error, 'Please upload your resume before submitting your application.');
    });

    test('accepts valid mock File object', () => {
      const mockPdf = {
        name: 'candidate_resume.pdf',
        size: 1024 * 500, // 500 KB
        type: 'application/pdf',
      };
      const res = validateResume(mockPdf, { required: true });
      assert.strictEqual(res.isValid, true);
      assert.strictEqual(res.error, '');
    });

    test('rejects oversized file (> 5 MB)', () => {
      const mockBigFile = {
        name: 'large_portfolio.pdf',
        size: 6 * 1024 * 1024,
        type: 'application/pdf',
      };
      const res = validateResume(mockBigFile, { required: true });
      assert.strictEqual(res.isValid, false);
      assert.match(res.error, /5 MB/i);
    });

    test('rejects disallowed file format', () => {
      const mockExe = {
        name: 'resume.exe',
        size: 1024,
        type: 'application/x-msdownload',
      };
      const res = validateResume(mockExe, { required: true });
      assert.strictEqual(res.isValid, false);
      assert.match(res.error, /PDF, DOC, and DOCX/i);
    });
  });
});
