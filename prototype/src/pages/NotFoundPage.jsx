import { useRef } from 'react';
import { PiArrowRight, PiWarningCircle, PiHouse, PiCar, PiSparkle, PiPhoneCall } from 'react-icons/pi';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { SEOHead } from '../components/SEOHead';
import { usePageAnimations } from '../hooks/usePageAnimations';

export function NotFoundPage() {
  const pageRef = useRef(null);
  usePageAnimations(pageRef);

  return (
    <main id="top" className="not-found-page" ref={pageRef}>
      <SEOHead
        title="404 - Page Not Found | SAVY Greentech Electric Vehicles"
        description="The page you're looking for doesn't exist or may have been moved. Return to the homepage or explore SAVY Greentech electric vehicles."
      />
      <SiteHeader currentPath="/404" transparentInitially={false} />

      <section className="not-found-section section-cream" aria-labelledby="not-found-title">
        <div className="container not-found-container">
          <div className="not-found-badge-pill">
            <PiWarningCircle className="not-found-badge-icon" aria-hidden="true" />
            <span>404 Error</span>
          </div>

          <div className="not-found-giant-num" aria-hidden="true">
            404
          </div>

          <h1 id="not-found-title" className="not-found-title">
            Page Not Found
          </h1>

          <p className="not-found-desc">
            The page you're looking for doesn't exist or may have been moved.
          </p>

          <div className="not-found-actions">
            <a href="/" className="button-link primary">
              <span>Back to Home</span>
              <PiArrowRight aria-hidden="true" />
            </a>
            <a href="/products" className="button-link secondary">
              <span>Explore Our Vehicles</span>
              <PiArrowRight aria-hidden="true" />
            </a>
          </div>

          <div className="not-found-quick-links">
            <p className="quick-links-title">Popular Destinations</p>
            <div className="quick-links-grid">
              <a href="/products" className="quick-link-item">
                <PiCar aria-hidden="true" />
                <span>14 Certified EV Models</span>
              </a>
              <a href="/applications" className="quick-link-item">
                <PiSparkle aria-hidden="true" />
                <span>Industry Applications</span>
              </a>
              <a href="/sustainability" className="quick-link-item">
                <PiHouse aria-hidden="true" />
                <span>Sustainability & ESG</span>
              </a>
              <a href="/contact" className="quick-link-item">
                <PiPhoneCall aria-hidden="true" />
                <span>Contact & Fleet Enquiry</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
