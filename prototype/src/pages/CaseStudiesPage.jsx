import { useState, useRef } from 'react';
import { PiArrowRight, PiBuildings, PiCheckCircle, PiFactory, PiFirstAid, PiGraduationCap, PiSuitcaseSimple, PiTruck } from 'react-icons/pi';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { PageHero } from '../components/PageHero';
import { SEOHead } from '../components/SEOHead';
import { QuoteModal } from '../components/QuoteModal';
import { caseStudies } from '../data/caseStudies';
import { usePageAnimations } from '../hooks/usePageAnimations';

export function CaseStudiesPage() {
  const pageRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCaseStudyId, setActiveCaseStudyId] = useState(caseStudies[0].id);
  const [selectedInquiryTopic, setSelectedInquiryTopic] = useState('');
  usePageAnimations(pageRef);

  const activeStudy = caseStudies.find((c) => c.id === activeCaseStudyId) || caseStudies[0];

  const handleInquire = (title) => {
    setSelectedInquiryTopic(`Case Study Inquiry: ${title}`);
    setModalOpen(true);
  };

  return (
    <main id="top" className="case-studies-page" ref={pageRef}>
      <SEOHead
        title="Case Studies & Deployments | Proven Electric Vehicle Fleets"
        description="Explore documented institutional deployments of SAVY electric vehicles across Ramdev Foods, Civil Hospital Ahmedabad, Andhra Pradesh Tourism, and Defence installations."
      />
      <SiteHeader currentPath="/case-studies" transparentInitially={true} />

      <PageHero
        eyebrow="Verified Field Deployments"
        title="Proven Performance Across Indian Industries"
        description="Explore how India's top public institutions, FMCG corporations, healthcare complexes, and state tourism bodies achieve reliable operations with SAVY electric vehicles."
        videoSrc="/assets/about-hero.mp4"
        primaryCtaText="Have a Similar Requirement?"
        onPrimaryClick={() => handleInquire('General Case Study Inquiry')}
        secondaryCtaText="Explore Case Studies"
        secondaryCtaHref="#case-studies-list"
      />

      {/* Case Study Selection Grid */}
      <section className="section-cream case-studies-index-section" id="case-studies-list" aria-labelledby="cs-index-title">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">Enterprise &amp; Institutional Proof</p>
            <h2 id="cs-index-title">Documented Deployments</h2>
            <p className="section-subtitle">Real-world results delivered through custom EV engineering.</p>
          </div>

          <div className="case-studies-cards-grid">
            {caseStudies.map((study) => (
              <article
                key={study.id}
                className={`case-study-card ${activeStudy.id === study.id ? 'active' : ''}`}
                onClick={() => setActiveCaseStudyId(study.id)}
              >
                <div className="cs-card-header">
                  {study.logo && (
                    <div className="cs-partner-logo">
                      <img src={study.logo} alt={study.customer} />
                    </div>
                  )}
                  <span className="cs-industry-badge">{study.industry}</span>
                </div>
                <h3>{study.title}</h3>
                <p className="cs-card-summary">{study.summary}</p>
                <div className="cs-card-meta">
                  <span>Vehicle: <strong>{study.vehicle}</strong></span>
                  <span className="cs-read-btn">
                    {activeStudy.id === study.id ? 'Viewing Details ↓' : 'Read Case Study →'}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Deep Dive Case Study View */}
      <section className="section-white active-case-study-deep-dive" aria-labelledby="active-study-title">
        <div className="container">
          <div className="active-cs-layout">
            {/* Header */}
            <div className="active-cs-header">
              <div className="active-cs-badge-row">
                <span className="active-cs-client">{activeStudy.customer}</span>
                <span className="active-cs-ind">{activeStudy.industry}</span>
                <span className="active-cs-loc">Deployment: {activeStudy.deployment}</span>
              </div>
              <h2 id="active-study-title">{activeStudy.title}</h2>
            </div>

            <div className="active-cs-body-grid">
              {/* Left Column: Challenge & Solution */}
              <div className="active-cs-text-col">
                <div className="cs-story-block challenge">
                  <p className="eyebrow">The Operational Challenge</p>
                  <p className="cs-story-p">{activeStudy.challenge}</p>
                </div>

                <div className="cs-story-block solution">
                  <p className="eyebrow">The SAVY Custom Solution</p>
                  <p className="cs-story-p">{activeStudy.solution}</p>
                </div>

                <div className="cs-story-block results">
                  <p className="eyebrow">Measurable Results &amp; Impact</p>
                  <ul className="cs-results-list">
                    {activeStudy.results.map((res, i) => (
                      <li key={i}>
                        <PiCheckCircle className="cs-res-icon" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Vehicle specs & Media */}
              <div className="active-cs-side-col">
                {activeStudy.gallery?.[0] && (
                  <div className="active-cs-image-box">
                    <img src={activeStudy.gallery[0]} alt={`${activeStudy.customer} deployment`} />
                    <span className="cs-image-caption">Deployed Platform: {activeStudy.vehicle}</span>
                  </div>
                )}

                <div className="cs-vehicle-callout-card">
                  <h4>Platform Used</h4>
                  <p className="cs-veh-name">{activeStudy.vehicle}</p>
                  <p className="cs-veh-desc">Engineered and manufactured in-house by SAVY Greentech with bespoke customizations.</p>
                  <div className="cs-side-actions">
                    <a href={`/products/${activeStudy.relatedProduct}`} className="button-link primary full-width btn-sm">
                      <span>View Vehicle Specs</span>
                      <PiArrowRight aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      className="button-link ghost full-width btn-sm"
                      onClick={() => handleInquire(activeStudy.title)}
                      style={{ marginTop: '10px' }}
                    >
                      <span>Inquire About Similar Solution</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Conversion CTA with Video Background */}
      <section className="contact" aria-labelledby="cs-final-cta">
        <video
          className="contact-video"
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/assets/hero.mp4" type="video/mp4" />
        </video>
        <div className="contact-video-shade" aria-hidden="true" />

        <div className="container contact-inner">
          <p className="eyebrow mint">Proven Institutional Track Record</p>
          <h2 id="cs-final-cta">Have a similar fleet requirement?</h2>
          <p>Consult with our engineering team to explore bespoke custom EV solutions for your organization.</p>
          <div>
            <button
              type="button"
              className="button-link primary"
              onClick={() => handleInquire('Enterprise Custom Inquiry')}
            >
              <span>Request Institutional Proposal</span>
              <PiArrowRight aria-hidden="true" />
            </button>
            <a className="button-link ghost-light" href="https://wa.me/919638450070" target="_blank" rel="noreferrer">
              <span>Talk on WhatsApp</span>
              <PiArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <QuoteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultVehicle={selectedInquiryTopic}
        mode="quote"
      />
      <SiteFooter />
    </main>
  );
}
