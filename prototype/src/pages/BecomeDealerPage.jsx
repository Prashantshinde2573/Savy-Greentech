import { useState, useRef } from 'react';
import { PiArrowRight, PiCheckCircle, PiHandshake, PiHeadset, PiMapPin, PiMegaphone, PiShieldCheck, PiStorefront, PiTrendUp, PiWhatsappLogo, PiWrench } from 'react-icons/pi';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { PageHero } from '../components/PageHero';
import { SEOHead } from '../components/SEOHead';
import { usePageAnimations } from '../hooks/usePageAnimations';
import { PanIndiaTerritoryMap } from '../components/PanIndiaTerritoryMap';
import { DealerJourneyScrollSection } from '../components/DealerJourneyScrollSection';
import { submitFormToGoogleSheets, buildWhatsAppUrl, attemptOpenWhatsApp } from '../services/formSubmission';
import { SHEET_TABS } from '../config/forms';

const dealerBenefits = [
  {
    icon: PiStorefront,
    title: 'High-Demand Product Line',
    description: 'Diverse portfolio covering high-margin campus golf carts, Swachh Bharat municipal tippers, commercial cargo loaders, and luxury passenger EVs.'
  },
  {
    icon: PiWrench,
    title: 'Technical & Service Training',
    description: 'In-depth hands-on technical training for your service technicians on motor controllers, battery BMS diagnostics, and wiring systems.'
  },
  {
    icon: PiMegaphone,
    title: 'Marketing & Lead Support',
    description: 'Co-branded digital and print collateral, local exhibition support, and direct allocation of institutional leads in your designated territory.'
  },
  {
    icon: PiShieldCheck,
    title: 'Prompt OEM Spares & Warranty',
    description: 'Direct factory warranty backing and guaranteed fast dispatch of genuine spare parts, ensuring minimal customer turnaround time.'
  }
];

const dealerSteps = [
  { step: '1', title: 'Submit Enquiry', description: 'Complete the dealership application form with your background and target territory.' },
  { step: '2', title: 'Qualification Call', description: 'Initial commercial alignment with our dealer development team.' },
  { step: '3', title: 'Territory Discussion', description: 'Evaluate exclusive/regional territory availability and initial order targets.' },
  { step: '4', title: 'Agreement & Onboarding', description: 'Formal dealership agreement, branding kit, and showroom demo allocation.' },
  { step: '5', title: 'Training & Sales Launch', description: 'Technical service certification and joint local marketing launch.' }
];

export function BecomeDealerPage() {
  const pageRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [whatsappLink, setWhatsappLink] = useState(null);
  const [honeypot, setHoneypot] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    preferredTerritory: '',
    experience: '',
    message: ''
  });
  usePageAnimations(pageRef);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        'Applicant Name': formData.name,
        'Company Name': formData.company,
        'Phone Number': formData.phone,
        'Email Address': formData.email,
        'City': formData.city,
        'State': formData.state,
        'Target Territory': formData.preferredTerritory || 'N/A',
        'Business Background': formData.experience || 'N/A',
        'Facility Details & Notes': formData.message || 'N/A',
      };

      await submitFormToGoogleSheets({
        formType: SHEET_TABS.BECOME_A_DEALER,
        payload,
        honeypot,
      });

      const waUrl = buildWhatsAppUrl({
        formType: SHEET_TABS.BECOME_A_DEALER,
        name: formData.name,
        details: [
          `Company: ${formData.company}`,
          `Location: ${formData.city}, ${formData.state}`,
          `Phone: ${formData.phone}`,
        ],
      });

      setWhatsappLink(waUrl);
      setSubmitted(true);
      setSubmitError(null);

      if (waUrl) {
        attemptOpenWhatsApp(waUrl);
      }
    } catch (err) {
      console.error('Dealer application error:', err);
      setSubmitError(err.message || 'Unable to submit your dealership application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main id="top" className="dealer-page" ref={pageRef}>
      <SEOHead
        title="Become a Dealer | SAVY Electric Vehicle Dealership Opportunities"
        description="Partner with SAVY Greentech as an authorized electric vehicle dealer. Access high-demand golf carts, cargo rickshaws, municipal tippers, and complete OEM support."
      />
      <SiteHeader currentPath="/become-a-dealer" transparentInitially={true} />

      <PageHero
        eyebrow="Channel Partnership"
        title="Become a SAVY Dealer"
        description="Join India’s fastest growing manufacturer of purpose-built custom electric vehicles and capture the booming commercial and institutional EV market."
        videoSrc="/assets/Videos/became a dealer page (1).mp4"
        primaryCtaText="Apply for Dealership"
        primaryCtaHref="#dealer-form"
        secondaryCtaText="Why Partner With Us"
        secondaryCtaHref="#why-partner"
      />

      {/* Why Partner Section */}
      <section className="section-white dealer-benefits-section" id="why-partner" aria-labelledby="why-dealer-title">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">The SAVY Advantage</p>
            <h2 id="why-dealer-title">Why Partner With SAVY Greentech?</h2>
            <p className="section-subtitle">A sustainable, high-growth commercial proposition backed by robust engineering.</p>
          </div>

          <div className="dealer-benefits-grid">
            {dealerBenefits.map((item, idx) => {
              const Icon = item.icon;
              return (
                <article className="dealer-benefit-card" key={idx}>
                  <div className="db-icon-wrap"><Icon /></div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Redesigned Interactive Pan-India Expansion & Territory Map Section */}
      <PanIndiaTerritoryMap />

      {/* Redesigned Premium Dark-Green Onboarding Roadmap / 5-Step Dealer Journey */}
      <DealerJourneyScrollSection />

      {/* Dealer Application Form */}
      <section className="section-cream dealer-form-section" id="dealer-form" aria-labelledby="form-heading">
        <div className="container">
          <div className="dealer-form-wrapper">
            <div className="section-heading center">
              <p className="eyebrow">Join Our Network</p>
              <h2 id="form-heading">Dealer Application Form</h2>
              <p className="section-subtitle">Submit your commercial background to begin territory qualification discussions.</p>
            </div>

            {submitted ? (
              <div className="dealer-form-success">
                <PiCheckCircle className="success-icon" />
                <h3>Application Received Successfully!</h3>
                <p>Our dealer network director will review your territory application and contact you within 48 business hours.</p>

                {whatsappLink && (
                  <div style={{ marginTop: '20px', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
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
                  </div>
                )}

                <button
                  type="button"
                  className="button-link primary"
                  onClick={() => {
                    setSubmitted(false);
                    setWhatsappLink(null);
                    setSubmitError(null);
                    setFormData({
                      name: '', company: '', phone: '', email: '',
                      city: '', state: '', preferredTerritory: '', experience: '', message: ''
                    });
                  }}
                >
                  <span>Submit Another Form</span>
                  <PiArrowRight aria-hidden="true" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="dealer-main-form">
                {/* Honeypot field for spam prevention */}
                <input
                  type="text"
                  name="business_fax"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', opacity: 0, zIndex: -1, width: 0, height: 0, pointerEvents: 'none' }}
                />
                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="d-name">Applicant Name *</label>
                    <input
                      id="d-name"
                      type="text"
                      required
                      placeholder="e.g. Vikram Patel"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="d-company">Company / Business Name *</label>
                    <input
                      id="d-company"
                      type="text"
                      required
                      placeholder="e.g. Patel Auto Enterprises"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="d-phone">Mobile / WhatsApp Number *</label>
                    <input
                      id="d-phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="d-email">Email Address *</label>
                    <input
                      id="d-email"
                      type="email"
                      required
                      placeholder="vikram@patelauto.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-grid-3">
                  <div className="form-group">
                    <label htmlFor="d-city">City / District *</label>
                    <input
                      id="d-city"
                      type="text"
                      required
                      placeholder="e.g. Surat"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="d-state">State *</label>
                    <input
                      id="d-state"
                      type="text"
                      required
                      placeholder="e.g. Gujarat"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="d-territory">Target Territory / Region</label>
                    <input
                      id="d-territory"
                      type="text"
                      placeholder="e.g. South Gujarat / Surat Urban"
                      value={formData.preferredTerritory}
                      onChange={(e) => setFormData({ ...formData, preferredTerritory: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="d-exp">Existing Automotive / Business Background</label>
                  <select
                    id="d-exp"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  >
                    <option value="">Select current business type...</option>
                    <option value="automotive-dealership">Automotive / 2W / 3W / 4W Dealership</option>
                    <option value="industrial-equipment">Industrial Equipment &amp; Machinery</option>
                    <option value="commercial-logistics">Fleet Logistics &amp; Transport Operator</option>
                    <option value="new-entrepreneur">New Business / Clean-Tech Entrepreneur</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="d-msg">Facility Details &amp; Additional Information</label>
                  <textarea
                    id="d-msg"
                    rows="3"
                    placeholder="Mention available showroom space, workshop capacity, or target customer segments..."
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
                  <span>{isSubmitting ? 'Submitting Application...' : 'Apply to Become a Dealer'}</span>
                  <PiArrowRight aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
