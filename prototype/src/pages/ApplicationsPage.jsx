import { useState, useRef } from 'react';
import { PiArrowRight } from 'react-icons/pi';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { PageHero } from '../components/PageHero';
import { SEOHead } from '../components/SEOHead';
import { QuoteModal } from '../components/QuoteModal';
import { ApplicationsScrollStory } from '../components/ApplicationsScrollStory';
import { usePageAnimations } from '../hooks/usePageAnimations';


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

      {/* Unified Scroll-Driven Storytelling Section */}
      <div id="sectors">
        <ApplicationsScrollStory onInquireSector={handleInquireSector} />
      </div>

      {/* Final Conversion Section */}
      <section className="contact" id="contact" aria-labelledby="apps-final-cta">
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
