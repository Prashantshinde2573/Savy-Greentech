import { useState, useRef } from 'react';
import { PiArrowRight, PiCheckCircle, PiFactory, PiFirstAid, PiForkKnife, PiGraduationCap, PiHouseLine, PiShieldCheck, PiSuitcaseSimple, PiTrash, PiTruck } from 'react-icons/pi';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { PageHero } from '../components/PageHero';
import { SEOHead } from '../components/SEOHead';
import { QuoteModal } from '../components/QuoteModal';
import { applicationsData } from '../data/applications';
import { usePageAnimations } from '../hooks/usePageAnimations';

const sectorIcons = {
  'municipal-government': PiTrash,
  'hospitality-tourism': PiSuitcaseSimple,
  'healthcare': PiFirstAid,
  'industrial-logistics': PiFactory,
  'defence-campuses': PiGraduationCap,
  'food-retail': PiForkKnife,
  'fmcg-delivery': PiTruck,
};

export function ApplicationsPage() {
  const pageRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSectorForModal, setSelectedSectorForModal] = useState('');
  usePageAnimations(pageRef);

  const handleInquireSector = (sectorTitle) => {
    setSelectedSectorForModal(`Application: ${sectorTitle}`);
    setModalOpen(true);
  };

  return (
    <main id="top" className="applications-page" ref={pageRef}>
      <SEOHead
        title="Applications & Use Cases | Purpose-Built Electric Mobility"
        description="Discover SAVY Greentech electric vehicle solutions across Municipal Sanitation, Luxury Resorts, Hospitals, Industrial Logistics, Defence Bases, and Campus transit."
      />
      <SiteHeader currentPath="/applications" transparentInitially={false} />

      <PageHero
        eyebrow="Real-World Mobility Solutions"
        title="Electric Mobility Built for Real-World Applications"
        description="Custom electric vehicles tailored to the demanding operating environments of smart cities, healthcare complexes, luxury resorts, industrial warehouses, and institutional campuses."
        videoSrc="/assets/about-hero.mp4"
        primaryCtaText="Discuss Your Industry Requirement"
        onPrimaryClick={() => handleInquireSector('General Industry Inquiry')}
        secondaryCtaText="Explore Use Cases"
        secondaryCtaHref="#sectors"
      />

      {/* Quick Jump Navigation Strip */}
      <section className="sector-jump-nav-strip">
        <div className="container">
          <div className="sector-jump-grid">
            {applicationsData.map((app) => {
              const Icon = sectorIcons[app.id] || PiFactory;
              return (
                <a href={`#${app.slug}`} key={app.id} className="sector-jump-link">
                  <Icon className="sector-icon" />
                  <span>{app.title}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Industry Applications Sections */}
      <div id="sectors" className="applications-deep-dive">
        {applicationsData.map((app, index) => {
          const Icon = sectorIcons[app.id] || PiFactory;
          const isEven = index % 2 === 0;

          return (
            <section
              key={app.id}
              id={app.slug}
              className={`application-sector-block ${isEven ? 'section-white' : 'section-cream'}`}
              aria-labelledby={`heading-${app.slug}`}
            >
              <div className="container">
                <div className="sector-row-grid">
                  {/* Visual Column */}
                  <div className={`sector-visual-col ${isEven ? 'order-1' : 'order-2'}`}>
                    <div className="sector-image-wrap">
                      <img src={app.image} alt={`${app.title} electric mobility`} loading="lazy" />
                      <div className="sector-quote-card">
                        <p>“{app.highlightQuote}”</p>
                      </div>
                    </div>
                  </div>

                  {/* Content Column: Problem -> Solution -> Vehicles -> Proof -> CTA */}
                  <div className={`sector-info-col ${isEven ? 'order-2' : 'order-1'}`}>
                    <div className="sector-badge">
                      <Icon />
                      <span>{app.subtitle}</span>
                    </div>

                    <h2 id={`heading-${app.slug}`}>{app.title}</h2>
                    <p className="sector-lead-copy">{app.leadCopy}</p>

                    {/* Problem & Solution Flow */}
                    <div className="problem-solution-box">
                      <div className="ps-block problem">
                        <h4>The Operational Challenge:</h4>
                        <p>{app.problem}</p>
                      </div>

                      <div className="ps-block solution">
                        <h4>The SAVY Engineering Solution:</h4>
                        <p>{app.solution}</p>
                      </div>
                    </div>

                    {/* Relevant Vehicles */}
                    <div className="sector-vehicles-strip">
                      <span className="sv-label">Recommended Platforms:</span>
                      <div className="sv-pills">
                        {app.relevantVehicles.map((veh, i) => (
                          <span key={i} className="sv-pill">{veh}</span>
                        ))}
                      </div>
                    </div>

                    {/* Proof Points */}
                    <div className="sector-proof-points">
                      <h5>Deployment Proof &amp; Impact:</h5>
                      <ul>
                        {app.proofPoints.map((pt, i) => (
                          <li key={i}>
                            <PiCheckCircle className="proof-icon" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="sector-actions">
                      <button
                        type="button"
                        className="button-link primary btn-sm"
                        onClick={() => handleInquireSector(app.title)}
                      >
                        <span>Request Proposal for {app.title}</span>
                        <PiArrowRight aria-hidden="true" />
                      </button>
                      <a href="/products" className="button-link ghost btn-sm">
                        <span>View Matching Vehicles</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Final Conversion Section */}
      <section className="contact" aria-labelledby="apps-final-cta">
        <div className="container contact-inner">
          <p className="eyebrow mint">Customized to Your Operating Duty Cycle</p>
          <h2 id="apps-final-cta">Have a unique operational challenge?</h2>
          <p>We build specialized electric vehicles around your exact campus routes, payload constraints, and climate conditions.</p>
          <div>
            <button
              type="button"
              className="button-link primary"
              onClick={() => handleInquireSector('Bespoke Application Consultation')}
            >
              <span>Consult an Application Engineer</span>
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
        defaultVehicle={selectedSectorForModal}
        mode="quote"
      />
      <SiteFooter />
    </main>
  );
}
