import { useState, useRef } from 'react';
import { PiArrowRight, PiCheckCircle, PiClock, PiEnvelopeSimple, PiHeadset, PiMapPin, PiPhoneCall, PiWhatsappLogo } from 'react-icons/pi';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { PageHero } from '../components/PageHero';
import { SEOHead } from '../components/SEOHead';
import { products } from '../data/products';
import { usePageAnimations } from '../hooks/usePageAnimations';
import { submitFormToGoogleSheets, buildWhatsAppUrl, attemptOpenWhatsApp } from '../services/formSubmission';
import { SHEET_TABS } from '../config/forms';
import { validateEmail, validatePhoneNumber, sanitizePhoneInput } from '../utils/validation';

export function ContactPage() {
  const pageRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [whatsappLink, setWhatsappLink] = useState(null);
  const [honeypot, setHoneypot] = useState('');
  const [formData, setFormData] = useState({
    userType: 'Buyer',
    name: '',
    company: '',
    email: '',
    phone: '',
    requirement: '',
    message: ''
  });
  usePageAnimations(pageRef);

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
    if (!formData.company.trim()) errors.company = 'Please enter your company or organisation.';
    if (!emailRes.isValid) errors.email = emailRes.error;
    if (!phoneRes.isValid) errors.phone = phoneRes.error;
    if (!formData.message.trim()) errors.message = 'Please enter your message.';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        'User Type': formData.userType,
        'Full Name': formData.name.trim(),
        'Company / Organisation': formData.company.trim(),
        'Email Address': emailRes.value,
        'Phone Number': phoneRes.value,
        'Vehicle of Interest': formData.requirement || 'General Enquiry',
        'Message': formData.message.trim(),
      };

      await submitFormToGoogleSheets({
        formType: SHEET_TABS.GET_IN_TOUCH,
        payload,
        honeypot,
      });

      const waUrl = buildWhatsAppUrl({
        formType: SHEET_TABS.GET_IN_TOUCH,
        name: formData.name.trim(),
        email: emailRes.value,
        phone: phoneRes.value,
        company: formData.company.trim(),
        userType: formData.userType,
        requirement: formData.requirement,
        message: formData.message.trim(),
      });

      setWhatsappLink(waUrl);
      setSubmitted(true);
      setSubmitError(null);

      if (waUrl) {
        attemptOpenWhatsApp(waUrl);
      }
    } catch (err) {
      console.error('Contact form submission failed:', err);
      setSubmitError(err.message || 'Unable to submit the form. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main id="top" className="contact-page" ref={pageRef}>
      <SEOHead
        title="Contact Us | Let's Build a Greener Tomorrow, Together"
        description="Get in touch with SAVY Greentech. Request EV quotes, schedule campus demos, apply for dealerships, or connect with our Ahmedabad headquarters."
      />
      <SiteHeader currentPath="/contact" transparentInitially={true} />

      <PageHero
        eyebrow="Get in Touch"
        title="Let's Build a Greener Tomorrow, Together."
        description="Whether you are an institutional buyer, municipal administrator, potential dealer, or clean-tech engineer, our team is ready to assist you."
        videoSrc="/assets/Videos/Clubcart closeups (1).mp4"
        primaryCtaText="Submit Enquiry"
        primaryCtaHref="#contact-form-section"
        secondaryCtaText="Chat on WhatsApp"
        secondaryCtaHref="https://wa.me/919284830085"
      />

      {/* Main Contact Section: Form & Info */}
      <section className="section-cream contact-main-section" id="contact-form-section" aria-labelledby="contact-heading">
        <div className="container">
          <div className="contact-layout-grid">
            {/* Form Column */}
            <div className="contact-form-col">
              <div className="contact-form-box">
                <div className="form-header">
                  <p className="eyebrow">Send a Message</p>
                  <h2 id="contact-heading">Start a Conversation</h2>
                  <p>Fill out the form below and our team will get back to you within 24 hours.</p>
                </div>

                {submitted ? (
                  <div className="contact-success-state">
                    <PiCheckCircle className="success-icon" />
                    <h3>Thank you for contacting SAVY!</h3>
                    <p>Your message has been received and saved. A member of our team will reach out to you promptly.</p>
                    
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
                          WhatsApp opens with your prefilled enquiry. Review and manually click Send in WhatsApp.
                        </span>
                      </div>
                    )}

                    <button
                      type="button"
                      className="button-link primary"
                      onClick={() => {
                        setSubmitted(false);
                        setSubmitError(null);
                        setFieldErrors({});
                        setWhatsappLink(null);
                        setFormData({ userType: 'Buyer', name: '', company: '', email: '', phone: '', requirement: '', message: '' });
                      }}
                    >
                      <span>Send Another Message</span>
                      <PiArrowRight aria-hidden="true" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-inner-form" noValidate>
                    {/* Honeypot field for spam prevention */}
                    <input
                      type="text"
                      name="website_url"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      style={{ position: 'absolute', opacity: 0, zIndex: -1, width: 0, height: 0, pointerEvents: 'none' }}
                    />
                    {/* Persona Selector Dropdown */}
                    <div className="form-group">
                      <label htmlFor="c-user-type">I am a: *</label>
                      <select
                        id="c-user-type"
                        value={formData.userType}
                        onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                      >
                        <option value="Buyer">Commercial Buyer / Fleet Manager</option>
                        <option value="Institution">Institutional / Government Body</option>
                        <option value="Dealer">Prospective Dealer / Distributor</option>
                        <option value="Job Seeker">Job Seeker / Candidate</option>
                        <option value="Press">Press / Media Professional</option>
                      </select>
                    </div>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label htmlFor="c-name">Full Name *</label>
                        <input
                          id="c-name"
                          type="text"
                          required
                          placeholder="e.g. Ramesh Patel"
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
                          aria-describedby={fieldErrors.name ? 'c-name-error' : undefined}
                        />
                        {fieldErrors.name && (
                          <span id="c-name-error" className="field-error-text" role="alert">
                            {fieldErrors.name}
                          </span>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="c-org">Company / Organisation *</label>
                        <input
                          id="c-org"
                          type="text"
                          required
                          placeholder="e.g. Ahmedabad Tech Park"
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
                          aria-describedby={fieldErrors.company ? 'c-org-error' : undefined}
                        />
                        {fieldErrors.company && (
                          <span id="c-org-error" className="field-error-text" role="alert">
                            {fieldErrors.company}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label htmlFor="c-email">Email Address *</label>
                        <input
                          id="c-email"
                          type="email"
                          required
                          placeholder="ramesh@techpark.com"
                          className={fieldErrors.email ? 'input-field-error' : ''}
                          value={formData.email}
                          onChange={(e) => handleEmailChange(e.target.value)}
                          onBlur={handleEmailBlur}
                          aria-invalid={!!fieldErrors.email}
                          aria-describedby={fieldErrors.email ? 'c-email-error' : undefined}
                        />
                        {fieldErrors.email && (
                          <span id="c-email-error" className="field-error-text" role="alert">
                            {fieldErrors.email}
                          </span>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="c-phone">Phone / WhatsApp Number *</label>
                        <input
                          id="c-phone"
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
                          aria-describedby={fieldErrors.phone ? 'c-phone-error' : undefined}
                        />
                        {fieldErrors.phone && (
                          <span id="c-phone-error" className="field-error-text" role="alert">
                            {fieldErrors.phone}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="c-req">Vehicle of Interest / Requirement</label>
                      <select
                        id="c-req"
                        value={formData.requirement}
                        onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                      >
                        <option value="">Select a vehicle of interest...</option>
                        {products.map((p) => (
                          <option key={p.slug} value={p.name}>
                            {p.name} ({p.categoryName})
                          </option>
                        ))}
                        <option value="Custom SPV / Bespoke Solution">Custom SPV / Bespoke Fleet Solution</option>
                        <option value="Multiple Vehicles / Institutional Fleet Order">Multiple Vehicles / Institutional Fleet Order</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="c-msg">Your Message *</label>
                      <textarea
                        id="c-msg"
                        rows="4"
                        required
                        placeholder="Please tell us about your application, operating location, or any specific questions..."
                        className={fieldErrors.message ? 'input-field-error' : ''}
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (fieldErrors.message && e.target.value.trim()) {
                            setFieldErrors((prev) => {
                              const next = { ...prev };
                              delete next.message;
                              return next;
                            });
                          }
                        }}
                        aria-invalid={!!fieldErrors.message}
                        aria-describedby={fieldErrors.message ? 'c-msg-error' : undefined}
                      />
                      {fieldErrors.message && (
                        <span id="c-msg-error" className="field-error-text" role="alert">
                          {fieldErrors.message}
                        </span>
                      )}
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
                      <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                      <PiArrowRight aria-hidden="true" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Direct Info Column */}
            <div className="contact-info-col">
              {/* WhatsApp Fast CTA Card */}
              <div className="whatsapp-callout-card">
                <div className="wa-icon-box"><PiWhatsappLogo /></div>
                <div>
                  <h3>Quickest Response on WhatsApp</h3>
                  <p>Need urgent pricing or specification sheets? Chat directly with our sales desk on WhatsApp.</p>
                  <a
                    href="https://wa.me/919284830085"
                    target="_blank"
                    rel="noreferrer"
                    className="button-link mint btn-sm"
                  >
                    <span>Chat on WhatsApp (9284830085)</span>
                    <PiArrowRight aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Office & Plant Details */}
              <div className="contact-details-card">
                <h3>Headquarters &amp; Plant</h3>

                <div className="contact-detail-row">
                  <PiMapPin className="detail-icon" />
                  <div>
                    <strong>Savy Greentech Pvt. Ltd.</strong>
                    <p>
                      513, North Plaza, Motera,<br />
                      Ahmedabad, Gujarat 380005, India
                    </p>
                  </div>
                </div>

                <div className="contact-detail-row">
                  <PiPhoneCall className="detail-icon" />
                  <div>
                    <strong>Toll-Free Number:</strong>
                    <p><a href="tel:18002026972">1800 202 6972</a></p>
                  </div>
                </div>

                <div className="contact-detail-row">
                  <PiWhatsappLogo className="detail-icon" />
                  <div>
                    <strong>WhatsApp Direct:</strong>
                    <p><a href="https://wa.me/919284830085" target="_blank" rel="noreferrer">+91 9284830085</a></p>
                  </div>
                </div>

                <div className="contact-detail-row">
                  <PiEnvelopeSimple className="detail-icon" />
                  <div>
                    <strong>Official Email:</strong>
                    <p><a href="mailto:info@savygreentech.com">info@savygreentech.com</a></p>
                  </div>
                </div>

                <div className="contact-detail-row">
                  <PiClock className="detail-icon" />
                  <div>
                    <strong>Working Hours:</strong>
                    <p>Monday – Saturday: 9:30 AM – 6:30 PM (IST)</p>
                  </div>
                </div>
              </div>

              {/* Regional Support Network Note */}
              <div className="regional-support-note">
                <PiHeadset className="regional-icon" />
                <div>
                  <strong>Pan-India Service Support</strong>
                  <p>SAVY maintains regional field technicians across Gujarat, Maharashtra, Rajasthan, Karnataka, and Andhra Pradesh for on-site fleet maintenance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Google Map Section */}
      <section className="section-white map-embed-section" aria-labelledby="map-heading">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">Location</p>
            <h2 id="map-heading">Visit Our Ahmedabad Facility</h2>
          </div>

          <div className="map-iframe-container">
            <iframe
              title="SAVY Greentech Ahmedabad Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.366479354024!2d72.5976508759537!3d23.08365821406852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e838b02446757%3A0xe5f9b45e2c56a84c!2sNorth%20Plaza%2C%20Motera%2C%20Ahmedabad%2C%20Gujarat%20380005!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
