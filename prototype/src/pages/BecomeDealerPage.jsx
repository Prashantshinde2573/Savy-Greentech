import { useState, useRef } from 'react';
import { PiArrowRight, PiCheckCircle, PiHandshake, PiHeadset, PiMapPin, PiMegaphone, PiShieldCheck, PiStorefront, PiTrendUp, PiWrench } from 'react-icons/pi';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { PageHero } from '../components/PageHero';
import { SEOHead } from '../components/SEOHead';
import { usePageAnimations } from '../hooks/usePageAnimations';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main id="top" className="dealer-page" ref={pageRef}>
      <SEOHead
        title="Become a Dealer | SAVY Electric Vehicle Dealership Opportunities"
        description="Partner with SAVY Greentech as an authorized electric vehicle dealer. Access high-demand golf carts, cargo rickshaws, municipal tippers, and complete OEM support."
      />
      <SiteHeader currentPath="/become-a-dealer" transparentInitially={false} />

      <PageHero
        eyebrow="Channel Partnership"
        title="Become a SAVY Dealer"
        description="Join India’s fastest growing manufacturer of purpose-built custom electric vehicles and capture the booming commercial and institutional EV market."
        videoSrc="/assets/CTA-bg.mp4"
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

      {/* Territory Availability Map Section */}
      <section className="section-cream territory-section" aria-labelledby="territory-title">
        <div className="container">
          <div className="territory-grid">
            <div className="territory-copy">
              <div className="territory-badge">
                <PiMapPin />
                <span>Pan-India Expansion</span>
              </div>
              <h2 id="territory-title">Available Territories &amp; Regional Presence</h2>
              <p>
                SAVY is actively expanding its authorized dealer and service touchpoint network across key regional hubs in Western, Southern, Northern, and Central India.
              </p>
              <div className="territory-regions-list">
                <div className="region-box">
                  <strong>Western Region:</strong>
                  <span>Gujarat, Maharashtra, Goa, Rajasthan (Selected Districts Open)</span>
                </div>
                <div className="region-box">
                  <strong>Southern Region:</strong>
                  <span>Karnataka, Andhra Pradesh, Telangana, Tamil Nadu, Kerala (Open)</span>
                </div>
                <div className="region-box">
                  <strong>Northern &amp; Central Region:</strong>
                  <span>Madhya Pradesh, Uttar Pradesh, Delhi NCR, Punjab, Haryana (Open)</span>
                </div>
              </div>
            </div>

            <div className="territory-map-card">
              <img src="/assets/india-dotted-map.png" alt="SAVY India Dealer Network Map" />
              <div className="map-caption">
                <span>🟢 Active Deployments &amp; Dealership Hubs Across 10+ States</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dealer Journey Process */}
      <section className="section-white dealer-journey-section" aria-labelledby="journey-title">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">Onboarding Roadmap</p>
            <h2 id="journey-title">The 5-Step Dealer Journey</h2>
            <p className="section-subtitle">A streamlined, transparent partnership process from application to showroom launch.</p>
          </div>

          <div className="dealer-steps-grid">
            {dealerSteps.map((step) => (
              <div className="dealer-step-card" key={step.step}>
                <span className="step-num">{step.step}</span>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                <button
                  type="button"
                  className="button-link primary"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '', company: '', phone: '', email: '',
                      city: '', state: '', preferredTerritory: '', experience: '', message: ''
                    });
                  }}
                >
                  <span>Submit Another Form</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="dealer-main-form">
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

                <button type="submit" className="button-link primary full-width">
                  <span>Apply to Become a Dealer</span>
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
