import fs from 'node:fs';
import path from 'node:path';

const NARRATIVE_FORMS_ENDPOINT = 'https://savygreen.upwardsonwards.io/wp-json/nrfm/v1/forms/69/submit';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

/**
 * Safely resolves the API key from process.env or local env files without exposing it.
 */
function getApiKey() {
  if (process.env.NARRATIVE_FORMS_API_KEY && process.env.NARRATIVE_FORMS_API_KEY.trim()) {
    return process.env.NARRATIVE_FORMS_API_KEY.trim();
  }

  const candidatePaths = [
    path.resolve(process.cwd(), '.env.local'),
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), 'prototype', '.env.local'),
    path.resolve(process.cwd(), 'prototype', '.env'),
    path.resolve(process.cwd(), '..', '.env.local'),
    path.resolve(process.cwd(), '..', '.env'),
  ];

  for (const envPath of candidatePaths) {
    try {
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf-8');
        for (const line of content.split('\n')) {
          const match = line.match(/^\s*NARRATIVE_FORMS_API_KEY\s*=\s*(.*)$/);
          if (match) {
            let val = match[1].trim();
            if (
              (val.startsWith('"') && val.endsWith('"')) ||
              (val.startsWith("'") && val.endsWith("'"))
            ) {
              val = val.slice(1, -1);
            }
            if (val) return val;
          }
        }
      }
    } catch {
      // Ignore file reading errors
    }
  }

  return null;
}

export const handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: '',
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        status: 405,
        message: 'Method not allowed. Only POST requests are supported.',
        details: `Received HTTP method: ${event.httpMethod}`,
      }),
    };
  }

  // Parse request body
  let data = {};
  try {
    data = JSON.parse(event.body || '{}');
  } catch (err) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        status: 400,
        message: 'Invalid JSON payload received.',
        details: err.message,
      }),
    };
  }

  const {
    userType = 'Buyer',
    name = '',
    company = '',
    email = '',
    phone = '',
    requirement = '',
    message = '',
  } = data;

  // Basic required field validation
  const trimmedName = String(name).trim();
  const trimmedEmail = String(email).trim();
  const trimmedPhone = String(phone).trim();
  const trimmedCompany = String(company).trim();
  const trimmedMessage = String(message).trim();
  const trimmedRequirement = String(requirement).trim();
  const trimmedUserType = String(userType).trim() || 'Buyer';

  if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedMessage) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        status: 400,
        message: 'Validation error: Missing required fields.',
        details: 'Name, Email, Phone, and Message are required.',
      }),
    };
  }

  // Resolve API Key
  const apiKey = getApiKey();
  const hasApiKey = Boolean(apiKey);

  console.log('[Server Log] Form submission initiated:');
  console.log(' - NARRATIVE_FORMS_API_KEY exists:', hasApiKey);
  console.log(' - Target WordPress endpoint:', NARRATIVE_FORMS_ENDPOINT);

  if (!hasApiKey) {
    console.error('[Server Log Error] NARRATIVE_FORMS_API_KEY is not configured in process.env or .env.local.');
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        status: 500,
        message: 'NARRATIVE_FORMS_API_KEY is not configured on server.',
        details: 'Environment variable NARRATIVE_FORMS_API_KEY was not found in process.env or .env.local',
      }),
    };
  }

  // Map submission fields to Narrative Forms schema
  const payload = {
    user_type: trimmedUserType,
    name: trimmedName,
    company: trimmedCompany,
    email: trimmedEmail,
    phone: trimmedPhone,
    vehicle: trimmedRequirement,
    message: trimmedMessage,

    // Aliases to guarantee matching in WordPress Narrative Forms Form 69
    userType: trimmedUserType,
    requirement: trimmedRequirement,
    'i-am-a': trimmedUserType,
    'full-name': trimmedName,
    'company-organisation': trimmedCompany,
    'email-address': trimmedEmail,
    'phone-whatsapp-number': trimmedPhone,
    'vehicle-of-interest-requirement': trimmedRequirement,
    'your-message': trimmedMessage,
    'I am a': trimmedUserType,
    'Full Name': trimmedName,
    'Company / Organisation': trimmedCompany,
    'Email Address': trimmedEmail,
    'Phone / WhatsApp Number': trimmedPhone,
    'Vehicle of Interest / Requirement': trimmedRequirement,
    'Your Message': trimmedMessage,
  };

  console.log(' - Request payload field names:', Object.keys(payload));

  try {
    const wpResponse = await fetch(NARRATIVE_FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-NRFM-API-Key': apiKey,
      },
      body: JSON.stringify(payload),
    });

    const responseText = await wpResponse.text();
    let responseData = {};
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = { raw: responseText };
    }

    console.log(' - WordPress HTTP status:', wpResponse.status);
    console.log(' - WordPress response body:', responseData);

    if (!wpResponse.ok) {
      const safeDetail =
        (responseData && (responseData.message || responseData.code)) ||
        (typeof responseData === 'string' ? responseData : JSON.stringify(responseData)) ||
        'Server returned error';

      return {
        statusCode: wpResponse.status,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          status: wpResponse.status,
          message: `Narrative Forms API returned ${wpResponse.status}`,
          details: safeDetail,
        }),
      };
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        status: 200,
        message: 'Form submitted successfully to WordPress.',
        submissionId: responseData.id || responseData.submission_id || null,
      }),
    };
  } catch (error) {
    console.error('[Server Log Error] Fetch failed connecting to WordPress endpoint:', error);
    return {
      statusCode: 502,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        status: 502,
        message: 'Failed to connect to WordPress server.',
        details: error.message,
      }),
    };
  }
};
