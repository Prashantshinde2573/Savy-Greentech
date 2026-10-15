import { test, describe } from 'node:test';
import assert from 'node:assert';
import {
  MAX_RESUME_SIZE_BYTES,
  ALLOWED_EXTENSIONS,
  ALLOWED_MIME_TYPES,
  validateResumeFile,
} from '../src/services/resumeUpload.js';
import { GOOGLE_RESUME_UPLOAD_URL, GOOGLE_APPS_SCRIPT_URL, SHEET_TABS } from '../src/config/forms.js';

describe('Resume Upload Validation & Config Tests', () => {
  test('constants are configured strictly per specification', () => {
    assert.strictEqual(MAX_RESUME_SIZE_BYTES, 5 * 1024 * 1024, 'Max resume size must be exactly 5 MB');
    assert.deepStrictEqual(ALLOWED_EXTENSIONS, ['.pdf', '.doc', '.docx']);
    assert.ok(ALLOWED_MIME_TYPES.includes('application/pdf'));
    assert.ok(ALLOWED_MIME_TYPES.includes('application/msword'));
    assert.ok(ALLOWED_MIME_TYPES.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document'));
  });

  test('validates valid PDF resume file successfully', () => {
    const validPdf = {
      name: 'John_Doe_Resume.pdf',
      size: 1.2 * 1024 * 1024, // 1.2 MB
      type: 'application/pdf',
    };
    assert.strictEqual(validateResumeFile(validPdf), true);
  });

  test('validates valid DOCX resume file successfully', () => {
    const validDocx = {
      name: 'Candidate_CV_2026.docx',
      size: 800 * 1024, // 800 KB
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    };
    assert.strictEqual(validateResumeFile(validDocx), true);
  });

  test('validates valid DOC resume file successfully', () => {
    const validDoc = {
      name: 'Candidate_CV.doc',
      size: 500 * 1024,
      type: 'application/msword',
    };
    assert.strictEqual(validateResumeFile(validDoc), true);
  });

  test('rejects files exceeding 5 MB limit', () => {
    const oversizedFile = {
      name: 'Huge_Portfolio.pdf',
      size: 5.5 * 1024 * 1024, // 5.5 MB
      type: 'application/pdf',
    };
    assert.throws(
      () => validateResumeFile(oversizedFile),
      /exceeds the 5 MB limit/i
    );
  });

  test('rejects empty files (0 bytes)', () => {
    const emptyFile = {
      name: 'empty.pdf',
      size: 0,
      type: 'application/pdf',
    };
    assert.throws(
      () => validateResumeFile(emptyFile),
      /file is empty/i
    );
  });

  test('rejects disallowed file extensions (e.g. .exe, .png, .zip, .js)', () => {
    const badFiles = [
      { name: 'malware.exe', size: 1024, type: 'application/x-msdownload' },
      { name: 'screenshot.png', size: 1024, type: 'image/png' },
      { name: 'archive.zip', size: 1024, type: 'application/zip' },
      { name: 'script.js', size: 1024, type: 'application/javascript' },
      { name: 'no-extension', size: 1024, type: 'application/pdf' },
    ];

    badFiles.forEach((file) => {
      assert.throws(
        () => validateResumeFile(file),
        /Invalid file type|extension/i,
        `Expected rejection for ${file.name}`
      );
    });
  });

  test('endpoint configuration contains valid Google Apps Script URLs', () => {
    assert.ok(GOOGLE_RESUME_UPLOAD_URL.startsWith('https://script.google.com/macros/s/'), 'Resume upload URL must be a valid script URL');
    assert.ok(GOOGLE_APPS_SCRIPT_URL.startsWith('https://script.google.com/macros/s/'), 'Main Apps Script URL must be a valid script URL');
    assert.strictEqual(SHEET_TABS.CAREERS, 'Careers');
  });
});
