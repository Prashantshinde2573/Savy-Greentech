import { useState, useRef } from 'react';
import { PiArrowRight, PiCheckCircle, PiClock, PiEnvelopeSimple, PiHeadset, PiMapPin, PiPhoneCall, PiWhatsappLogo } from 'react-icons/pi';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { PageHero } from '../components/PageHero';
import { SEOHead } from '../components/SEOHead';
import { usePageAnimations } from '../hooks/usePageAnimations';

export function ContactPage() {
  const pageRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main id="top" className="contact-page" ref={pageRef}>
      <SEOHead
        title="Contact Us | Let's Build a Greener Tomorrow, Together"
        description="Get in touch with SAVY Greentech. Request EV quotes, schedule campus demos, apply for dealerships, or connect with our Ahmedabad headquarters."
      />
      <SiteHeader currentPath="/contact" transparentInitially={false} />

      <PageHero
        eyebrow="Get in Touch"
        title="Let's Build a Greener Tomorrow, Together."
        description="Whether you are an institutional buyer, municipal administrator, potential dealer, or clean-tech engineer, our team is ready to assist you."
        videoSrc="/assets/hero.mp4"
        primaryCtaText="Submit Enquiry"
        primaryCtaHref="#contact-form-section"
        secondaryCtaText="Chat on WhatsApp"
        secondaryCtaHref="https://wa.me/919638450070"
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
                    <p>Your message has been received. A member of our team will reach out to you promptly.</p>
                    <button
                      type="button"
                      className="button-link primary"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ userType: 'Buyer', name: '', company: '', email: '', phone: '', requirement: '', message: '' });
                      }}
                    >
                      <span>Send Another Message</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-inner-form">
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
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="c-org">Company / Organisation *</label>
                        <input
                          id="c-org"
                          type="text"
                          required
                          placeholder="e.g. Ahmedabad Tech Park"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
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
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="c-phone">Phone / WhatsApp Number *</label>
                        <input
                          id="c-phone"
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="c-req">Vehicle of Interest / Requirement</label>
                      <input
                        id="c-req"
                        type="text"
                        placeholder="e.g. 4 Classic Golf Carts, 2 Dump Tippers, or Custom EV"
                        value={formData.requirement}
                        onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="c-msg">Your Message *</label>
                      <textarea
                        id="c-msg"
                        rows="4"
                        required
                        placeholder="Please tell us about your application, operating location, or any specific questions..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <button type="submit" className="button-link primary full-width">
                      <span>Send Message</span>
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
                    href="https://wa.me/919638450070"
                    target="_blank"
                    rel="noreferrer"
                    className="button-link mint btn-sm"
                  >
                    <span>Chat on WhatsApp</span>
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
                    <strong>Telephone / Mobile:</strong>
                    <p><a href="tel:+919638450070">+91 96384 50070</a></p>
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
