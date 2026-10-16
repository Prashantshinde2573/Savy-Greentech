import { test, describe } from 'node:test';
import assert from 'node:assert';
import { sanitizePhoneInput, validatePhoneNumber, validateEmail, validateResume } from '../src/utils/validation.js';

describe('Required Fields & Phone Input Verification', () => {
  describe('Phone Input Sanitization (Numbers Only, Max 10 Digits)', () => {
    test('removes all non-numeric characters on type or paste', () => {
      assert.strictEqual(sanitizePhoneInput('98765abcde'), '98765');
      assert.strictEqual(sanitizePhoneInput('abc-xyz!@#$'), '');
      assert.strictEqual(sanitizePhoneInput('9 8 7 6 5 4 3 2 1 0'), '9876543210');
      assert.strictEqual(sanitizePhoneInput('(987) 654-3210'), '9876543210');
    });

    test('enforces strict 10-digit maximum length on copy-paste', () => {
      assert.strictEqual(sanitizePhoneInput('987654321012'), '9876543210');
      assert.strictEqual(sanitizePhoneInput('98765432109876543210'), '9876543210');
    });

    test('smartly strips +91, 91, or 0 prefixes when pasted with 10-digit subscriber number', () => {
      assert.strictEqual(sanitizePhoneInput('+91 98765 43210'), '9876543210');
      assert.strictEqual(sanitizePhoneInput('+919876543210'), '9876543210');
      assert.strictEqual(sanitizePhoneInput('919876543210'), '9876543210');
      assert.strictEqual(sanitizePhoneInput('09876543210'), '9876543210');
    });
  });

  describe('Strict 10-Digit Phone Validation', () => {
    test('accepts valid 10-digit Indian numbers starting with 6, 7, 8, 9', () => {
      assert.strictEqual(validatePhoneNumber('9876543210').isValid, true);
      assert.strictEqual(validatePhoneNumber('8123456789').isValid, true);
      assert.strictEqual(validatePhoneNumber('7000000000').isValid, true);
      assert.strictEqual(validatePhoneNumber('6999999999').isValid, true);
    });

    test('rejects numbers starting with 0-5', () => {
      assert.strictEqual(validatePhoneNumber('1234567890').isValid, false);
      assert.match(validatePhoneNumber('1234567890').error, /starting with 6, 7, 8, or 9/i);
      assert.strictEqual(validatePhoneNumber('5555555555').isValid, false);
    });

    test('rejects incomplete numbers', () => {
      assert.strictEqual(validatePhoneNumber('98765').isValid, false);
      assert.match(validatePhoneNumber('98765').error, /complete 10-digit/i);
    });

    test('rejects numbers exceeding 10 digits', () => {
      assert.strictEqual(validatePhoneNumber('987654321012').isValid, false);
      assert.match(validatePhoneNumber('987654321012').error, /must not exceed 10 digits/i);
    });
  });

  describe('Form-by-Form Required Field Verification Logic', () => {
    test('Contact Form: blocks submission if any required field is empty', () => {
      function validateContactForm({ name, company, email, phone, message }) {
        const emailRes = validateEmail(email);
        const phoneRes = validatePhoneNumber(phone);
        const errors = {};
        if (!name?.trim()) errors.name = 'Please enter your full name.';
        if (!company?.trim()) errors.company = 'Please enter your company or organisation.';
        if (!emailRes.isValid) errors.email = emailRes.error;
        if (!phoneRes.isValid) errors.phone = phoneRes.error;
        if (!message?.trim()) errors.message = 'Please enter your message.';
        return { isValid: Object.keys(errors).length === 0, errors };
      }

      // Empty submission
      const emptyCheck = validateContactForm({ name: '', company: '', email: '', phone: '', message: '' });
      assert.strictEqual(emptyCheck.isValid, false);
      assert.ok(emptyCheck.errors.name);
      assert.ok(emptyCheck.errors.company);
      assert.ok(emptyCheck.errors.email);
      assert.ok(emptyCheck.errors.phone);
      assert.ok(emptyCheck.errors.message);

      // Incomplete phone
      const badPhoneCheck = validateContactForm({
        name: 'Ramesh Patel',
        company: 'Tech Park',
        email: 'ramesh@techpark.com',
        phone: '98765',
        message: 'Need 5 units',
      });
      assert.strictEqual(badPhoneCheck.isValid, false);
      assert.ok(badPhoneCheck.errors.phone);

      // All valid
      const validCheck = validateContactForm({
        name: 'Ramesh Patel',
        company: 'Tech Park',
        email: 'ramesh@techpark.com',
        phone: '9876543210',
        message: 'Need 5 units',
      });
      assert.strictEqual(validCheck.isValid, true);
      assert.strictEqual(Object.keys(validCheck.errors).length, 0);
    });

    test('Quote Modal Form: blocks submission if any required field is empty', () => {
      function validateQuoteForm({ name, company, email, phone }) {
        const emailRes = validateEmail(email);
        const phoneRes = validatePhoneNumber(phone);
        const errors = {};
        if (!name?.trim()) errors.name = 'Please enter your full name.';
        if (!company?.trim()) errors.company = 'Please enter your company or institution name.';
        if (!emailRes.isValid) errors.email = emailRes.error;
        if (!phoneRes.isValid) errors.phone = phoneRes.error;
        return { isValid: Object.keys(errors).length === 0, errors };
      }

      const emptyCheck = validateQuoteForm({ name: '', company: '', email: '', phone: '' });
      assert.strictEqual(emptyCheck.isValid, false);
      assert.ok(emptyCheck.errors.name);
      assert.ok(emptyCheck.errors.company);
      assert.ok(emptyCheck.errors.email);
      assert.ok(emptyCheck.errors.phone);

      const validCheck = validateQuoteForm({
        name: 'Rahul Sharma',
        company: 'Grand Heritage Resort',
        email: 'rahul@resort.com',
        phone: '9876543210',
      });
      assert.strictEqual(validCheck.isValid, true);
    });

    test('Dealership Application Form: blocks submission if any required field is empty', () => {
      function validateDealerForm({ name, company, email, phone, city, state }) {
        const emailRes = validateEmail(email);
        const phoneRes = validatePhoneNumber(phone);
        const errors = {};
        if (!name?.trim()) errors.name = 'Please enter your full name.';
        if (!company?.trim()) errors.company = 'Please enter your company or business name.';
        if (!phoneRes.isValid) errors.phone = phoneRes.error;
        if (!emailRes.isValid) errors.email = emailRes.error;
        if (!city?.trim()) errors.city = 'Please enter your city / district.';
        if (!state?.trim()) errors.state = 'Please enter your state.';
        return { isValid: Object.keys(errors).length === 0, errors };
      }

      const emptyCheck = validateDealerForm({ name: '', company: '', email: '', phone: '', city: '', state: '' });
      assert.strictEqual(emptyCheck.isValid, false);
      assert.ok(emptyCheck.errors.name);
      assert.ok(emptyCheck.errors.company);
      assert.ok(emptyCheck.errors.phone);
      assert.ok(emptyCheck.errors.email);
      assert.ok(emptyCheck.errors.city);
      assert.ok(emptyCheck.errors.state);

      const validCheck = validateDealerForm({
        name: 'Vikram Patel',
        company: 'Patel Auto Enterprises',
        email: 'vikram@patelauto.com',
        phone: '9876543210',
        city: 'Surat',
        state: 'Gujarat',
      });
      assert.strictEqual(validCheck.isValid, true);
    });

    test('Careers & Job Role Forms: mandatory resume upload and role required', () => {
      function validateCareersForm({ name, email, phone, role, resumeFile }) {
        const emailRes = validateEmail(email);
        const phoneRes = validatePhoneNumber(phone);
        const resumeRes = validateResume(resumeFile, { required: true });
        const errors = {};
        if (!name?.trim()) errors.name = 'Please enter your full name.';
        if (!emailRes.isValid) errors.email = emailRes.error;
        if (!phoneRes.isValid) errors.phone = phoneRes.error;
        if (!role?.trim()) errors.role = 'Please enter your position of interest.';
        if (!resumeRes.isValid) errors.resume = resumeRes.error;
        return { isValid: Object.keys(errors).length === 0, errors };
      }

      // No resume
      const noResumeCheck = validateCareersForm({
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '9876543210',
        role: 'EV Chassis Engineer',
        resumeFile: null,
      });
      assert.strictEqual(noResumeCheck.isValid, false);
      assert.strictEqual(noResumeCheck.errors.resume, 'Please upload your resume before submitting your application.');

      // Valid submission with mock resume
      const validCheck = validateCareersForm({
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '9876543210',
        role: 'EV Chassis Engineer',
        resumeFile: { name: 'priya_resume.pdf', size: 1024 * 100, type: 'application/pdf' },
      });
      assert.strictEqual(validCheck.isValid, true);
    });
  });
});
