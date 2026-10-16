import { useState, useEffect } from 'react';
import { PiArrowRight, PiCheckCircle, PiWhatsappLogo, PiX } from 'react-icons/pi';
import { products } from '../data/products';
import { submitFormToGoogleSheets, buildWhatsAppUrl, attemptOpenWhatsApp } from '../services/formSubmission';
import { SHEET_TABS } from '../config/forms';
import { validateEmail, validatePhoneNumber, sanitizePhoneInput } from '../utils/validation';

export function QuoteModal({ isOpen, onClose, defaultVehicle = '', mode = 'quote' }) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [whatsappLink, setWhatsappLink] = useState(null);
  const [honeypot, setHoneypot] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    vehicle: defaultVehicle,
    quantity: '1',
    message: ''
  });

  useEffect(() => {
    if (defaultVehicle) {
      setFormData((prev) => ({ ...prev, vehicle: defaultVehicle }));
    }
  }, [defaultVehicle, isOpen]);

  if (!isOpen) return null;

  const handleEmailChange = (val) => {
    setFormData((prev) => ({ ...prev, email: val }));
    if (fieldErrors.email) {
      const res = validateEmail(val);
      if (res.isValid) {
        setFieldErrors((prev) => {
          const next = { ...prev };
          delete next.email;
          return next;
        });
      }
    }
  };

  const handleEmailBlur = () => {
    if (formData.email.trim()) {
      const res = validateEmail(formData.email);
      if (!res.isValid) {
        setFieldErrors((prev) => ({ ...prev, email: res.error }));
      }
    }
  };

  const handlePhoneChange = (val) => {
    const sanitized = sanitizePhoneInput(val);
    setFormData((prev) => ({ ...prev, phone: sanitized }));
    if (fieldErrors.phone) {
      const res = validatePhoneNumber(sanitized);
      if (res.isValid) {
        setFieldErrors((prev) => {
          const next = { ...prev };
          delete next.phone;
          return next;
        });
      }
    }
  };

  const handlePhoneBlur = () => {
    if (formData.phone.trim()) {
      const res = validatePhoneNumber(formData.phone);
      if (!res.isValid) {
        setFieldErrors((prev) => ({ ...prev, phone: res.error }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validate fields before submission
    const emailRes = validateEmail(formData.email);
    const phoneRes = validatePhoneNumber(formData.phone);

    const errors = {};
    if (!formData.name.trim()) errors.name = 'Please enter your full name.';
    if (!formData.company.trim()) errors.company = 'Please enter your company or institution name.';
    if (!emailRes.isValid) errors.email = emailRes.error;
    if (!phoneRes.isValid) errors.phone = phoneRes.error;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const requestTypeName = mode === 'demo' ? 'Vehicle Demo Request' : 'Custom Quote Request';
      const payload = {
        'Request Type': requestTypeName,
        'Full Name': formData.name.trim(),
        'Company / Institution': formData.company.trim(),
        'Phone Number': phoneRes.value,
        'Work Email': emailRes.value,
        'Vehicle Model': formData.vehicle || 'Not specified',
        'Fleet Quantity': formData.quantity,
        'Requirements / Notes': formData.message.trim() || 'N/A',
      };

      await submitFormToGoogleSheets({
        formType: SHEET_TABS.QUOTE_REQUEST,
        payload,
        honeypot,
      });

      const quantityLabel =
        formData.quantity === '1'
          ? '1 Unit (Evaluation)'
          : formData.quantity === '2-5'
          ? '2 – 5 Units'
          : formData.quantity === '6-20'
          ? '6 – 20 Units (Fleet)'
          : formData.quantity === '20+'
          ? '20+ Units (Institutional)'
          : formData.quantity;

      const waUrl = buildWhatsAppUrl({
        formType: SHEET_TABS.QUOTE_REQUEST,
        name: formData.name.trim(),
        phone: phoneRes.value,
        email: emailRes.value,
        company: formData.company.trim(),
        vehicle: formData.vehicle,
        quantity: quantityLabel,
        requestType: mode === 'demo' ? 'Vehicle Demonstration' : 'Custom Quotation',
        message: formData.message.trim(),
      });

      setWhatsappLink(waUrl);
      setSubmitted(true);
      setSubmitError(null);

      if (waUrl) {
        attemptOpenWhatsApp(waUrl);
      }
    } catch (err) {
      console.error('Quote form submission failed:', err);
      setSubmitError(err.message || 'Unable to submit your quote request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const title = mode === 'demo' ? 'Book a Vehicle Demonstration' : 'Request a Custom Quotation';
  const subtitle = mode === 'demo'
    ? 'Experience SAVY electric vehicles at your campus, facility, or plant.'
    : 'Get detailed commercial and technical proposals customized to your operations.';

  const handleModalClose = () => {
    setSubmitted(false);
    setWhatsappLink(null);
    setSubmitError(null);
    setFieldErrors({});
    onClose();
  };

  return (
    <div className="quote-modal-backdrop" onClick={handleModalClose} role="dialog" aria-modal="true">
      <div className="quote-modal-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="quote-modal-close" onClick={handleModalClose} aria-label="Close modal">
          <PiX />
        </button>

        {submitted ? (
          <div className="quote-modal-success">
            <PiCheckCircle className="success-icon" />
            <h3>Thank you for reaching out!</h3>
            <p>Our commercial and engineering team will contact you within 24 hours with a comprehensive proposal.</p>
            
            {whatsappLink && (
              <div style={{ marginTop: '20px', marginBottom: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-link secondary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#25D366',
                    color: '#ffffff',
                    borderColor: '#25D366',
                    fontWeight: 600,
                  }}
                >
                  <PiWhatsappLogo style={{ fontSize: '1.25rem' }} aria-hidden="true" />
                  <span>Chat on WhatsApp</span>
                </a>
                <span style={{ fontSize: '0.8125rem', color: '#6B7280', textAlign: 'center' }}>
                  WhatsApp opens with your prefilled request. Review and manually click Send in WhatsApp.
                </span>
              </div>
            )}

            <button
              type="button"
              className="button-link primary"
              onClick={handleModalClose}
            >
              <span>Close</span>
              <PiArrowRight aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div>
            <p className="eyebrow" style={{ marginBottom: '8px' }}>{mode === 'demo' ? 'On-Site Experience' : 'Direct OEM Pricing'}</p>
            <h3 className="modal-title">{title}</h3>
            <p className="modal-subtitle">{subtitle}</p>

            <form onSubmit={handleSubmit} className="quote-form" noValidate>
              {/* Honeypot field for spam prevention */}
              <input
                type="text"
                name="company_fax"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', opacity: 0, zIndex: -1, width: 0, height: 0, pointerEvents: 'none' }}
              />
              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="modal-name">Full Name *</label>
                  <input
                    id="modal-name"
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    className={fieldErrors.name ? 'input-field-error' : ''}
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (fieldErrors.name && e.target.value.trim()) {
                        setFieldErrors((prev) => {
                          const next = { ...prev };
                          delete next.name;
                          return next;
                        });
                      }
                    }}
                    aria-invalid={!!fieldErrors.name}
                    aria-describedby={fieldErrors.name ? 'modal-name-error' : undefined}
                  />
                  {fieldErrors.name && (
                    <span id="modal-name-error" className="field-error-text" role="alert">
                      {fieldErrors.name}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="modal-company">Company / Institution *</label>
                  <input
                    id="modal-company"
                    type="text"
                    required
                    placeholder="e.g. Grand Heritage Resort"
                    className={fieldErrors.company ? 'input-field-error' : ''}
                    value={formData.company}
                    onChange={(e) => {
                      setFormData({ ...formData, company: e.target.value });
                      if (fieldErrors.company && e.target.value.trim()) {
                        setFieldErrors((prev) => {
                          const next = { ...prev };
                          delete next.company;
                          return next;
                        });
                      }
                    }}
                    aria-invalid={!!fieldErrors.company}
                    aria-describedby={fieldErrors.company ? 'modal-company-error' : undefined}
                  />
                  {fieldErrors.company && (
                    <span id="modal-company-error" className="field-error-text" role="alert">
                      {fieldErrors.company}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="modal-phone">Phone / WhatsApp Number *</label>
                  <input
                    id="modal-phone"
                    type="text"
                    inputMode="numeric"
                    maxLength={10}
                    pattern="[0-9]*"
                    required
                    placeholder="e.g. 9876543210"
                    className={fieldErrors.phone ? 'input-field-error' : ''}
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    onBlur={handlePhoneBlur}
                    aria-invalid={!!fieldErrors.phone}
                    aria-describedby={fieldErrors.phone ? 'modal-phone-error' : undefined}
                  />
                  {fieldErrors.phone && (
                    <span id="modal-phone-error" className="field-error-text" role="alert">
                      {fieldErrors.phone}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="modal-email">Work Email *</label>
                  <input
                    id="modal-email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    className={fieldErrors.email ? 'input-field-error' : ''}
                    value={formData.email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    onBlur={handleEmailBlur}
                    aria-invalid={!!fieldErrors.email}
                    aria-describedby={fieldErrors.email ? 'modal-email-error' : undefined}
                  />
                  {fieldErrors.email && (
                    <span id="modal-email-error" className="field-error-text" role="alert">
                      {fieldErrors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="modal-vehicle">Vehicle Model</label>
                  <select
                    id="modal-vehicle"
                    value={formData.vehicle}
                    onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                  >
                    <option value="">Select vehicle model...</option>
                    {formData.vehicle && !products.some((p) => p.name === formData.vehicle) && (
                      <option value={formData.vehicle}>{formData.vehicle}</option>
                    )}
                    {products.map((p) => (
                      <option key={p.slug} value={p.name}>
                        {p.name} ({p.categoryName})
                      </option>
                    ))}
                    <option value="Custom SPV / Bespoke Solution">Custom SPV / Bespoke Fleet Solution</option>
                    <option value="Multiple Vehicles / Institutional Fleet">Multiple Vehicles / Institutional Fleet</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="modal-qty">Fleet Quantity</label>
                  <select
                    id="modal-qty"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  >
                    <option value="1">1 Unit (Evaluation)</option>
                    <option value="2-5">2 – 5 Units</option>
                    <option value="6-20">6 – 20 Units (Fleet)</option>
                    <option value="20+">20+ Units (Institutional)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="modal-msg">Operational Requirements / Custom Notes</label>
                <textarea
                  id="modal-msg"
                  rows="3"
                  placeholder="Mention daily distance, payload, terrain, or special custom requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              {submitError && (
                <div
                  className="form-error-alert"
                  role="alert"
                  style={{
                    backgroundColor: '#FEF2F2',
                    color: '#991B1B',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    marginBottom: '16px',
                    border: '1px solid #FCA5A5',
                  }}
                >
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                className="button-link primary full-width"
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
              >
                <span>
                  {isSubmitting
                    ? 'Submitting...'
                    : mode === 'demo'
                    ? 'Confirm Demo Request'
                    : 'Submit Quote Request'}
                </span>
                <PiArrowRight aria-hidden="true" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
