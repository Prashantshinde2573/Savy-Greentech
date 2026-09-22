import { useState, useRef } from 'react';
import { PiArrowRight, PiArticle, PiDownloadSimple, PiEnvelopeSimple, PiGlobeHemisphereWest, PiMagnifyingGlass, PiMegaphone, PiTrophy } from 'react-icons/pi';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { PageHero } from '../components/PageHero';
import { SEOHead } from '../components/SEOHead';
import { QuoteModal } from '../components/QuoteModal';
import { pressArticles, amsterdamFeature, awardsExhibitions } from '../data/newsMedia';
import { usePageAnimations } from '../hooks/usePageAnimations';

export function MediaPage() {
  const pageRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  usePageAnimations(pageRef);

  const handleDownloadPressKit = () => {
    alert('SAVY Greentech Press Kit containing high-resolution logos, executive bios, and vehicle imagery will be prepared for download.');
  };

  return (
    <main id="top" className="media-page" ref={pageRef}>
      <SEOHead
        title="Media & Press | Recognised Today. Trusted Everyday."
        description="Read latest news coverage, international exhibitions, and press releases about SAVY Greentech electric vehicles and the City Pod European launch."
      />
      <SiteHeader currentPath="/media" transparentInitially={true} />

      <PageHero
        eyebrow="News &amp; Recognition"
        title="Recognised Today. Trusted Everyday."
        description="From international debuts in Amsterdam to features in leading national automotive and industrial publications."
        videoSrc="/assets/about-hero.mp4"
        primaryCtaText="Download Press Kit"
        onPrimaryClick={handleDownloadPressKit}
        secondaryCtaText="Media Inquiries"
        secondaryCtaHref="#media-contact"
      />

      {/* City Pod Amsterdam Feature */}
      <section className="section-white amsterdam-spotlight-section" aria-labelledby="amsterdam-heading">
        <div className="container">
          <div className="amsterdam-grid">
            <div className="amsterdam-image-wrap">
              <img src={amsterdamFeature.image} alt="SAVY City Pod at Netherlands E-Mobility Expo" />
              <div className="amsterdam-badge">International Launch · Amsterdam</div>
            </div>
            <div className="amsterdam-copy">
              <p className="eyebrow">{amsterdamFeature.subtitle}</p>
              <h2 id="amsterdam-heading">{amsterdamFeature.title}</h2>
              <p className="amsterdam-lead">{amsterdamFeature.overview}</p>
              <ul className="amsterdam-highlights">
                {amsterdamFeature.highlights.map((hl, i) => (
                  <li key={i}>{hl}</li>
                ))}
              </ul>
              <div style={{ marginTop: '28px' }}>
                <a
                  href="https://www.business-standard.com/amp/content/press-releases-ani/a-new-look-for-indian-e-auto-grabs-international-attention-at-netherlands-e-mobility-expo-124010300834_1.html"
                  target="_blank"
                  rel="noreferrer"
                  className="button-link primary"
                >
                  <span>Read Business Standard Feature</span>
                  <PiArrowRight aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Press Coverage Grid */}
      <section className="section-cream press-grid-section" aria-labelledby="press-heading">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">News &amp; Publications</p>
            <h2 id="press-heading">Press Coverage &amp; Articles</h2>
            <p className="section-subtitle">Verified editorial features covering SAVY’s electric vehicle technology and leadership.</p>
          </div>

          <div className="press-articles-grid">
            {pressArticles.map((story) => (
              <article className="press-card" key={story.title}>
                <a className="press-card-media" href={story.href} target="_blank" rel="noreferrer" aria-label={`Read ${story.title}`}>
                  <img src={story.image} alt="" loading="lazy" />
                  <span className="press-publication-tag">{story.publication}</span>
                </a>
                <div className="press-card-body">
                  <p className="press-meta-date">{story.category}</p>
                  <h3>
                    <a href={story.href} target="_blank" rel="noreferrer">{story.title}</a>
                  </h3>
                  <p className="press-excerpt">{story.copy}</p>
                  <a className="press-read-link" href={story.href} target="_blank" rel="noreferrer">
                    Read full article <PiArrowRight aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Exhibitions */}
      <section className="section-white awards-section" aria-labelledby="awards-heading">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">Industry Participation</p>
            <h2 id="awards-heading">Exhibitions &amp; Industry Conclaves</h2>
          </div>

          <div className="awards-grid">
            {awardsExhibitions.map((item, idx) => (
              <article className="award-card" key={idx}>
                <div className="award-header">
                  <PiTrophy className="award-icon" />
                  <span className="award-year">{item.year}</span>
                </div>
                <span className="award-category">{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Download Press Kit Callout */}
      <section className="section-cream press-kit-callout-section" id="media-contact" aria-labelledby="kit-heading">
        <div className="container">
          <div className="press-kit-box">
            <div className="press-kit-copy">
              <p className="eyebrow mint">Press Resources</p>
              <h2 id="kit-heading">SAVY Media Kit &amp; Press Resources</h2>
              <p>Download official high-resolution vehicle photography, company brand marks, founder portraits, and company background briefs for editorial use.</p>
              <div className="kit-actions">
                <button type="button" className="button-link primary" onClick={handleDownloadPressKit}>
                  <PiDownloadSimple aria-hidden="true" />
                  <span>Download Press Kit (ZIP)</span>
                </button>
                <a href="mailto:info@savygreentech.com?subject=Press%20Inquiry%20SAVY" className="button-link ghost-light">
                  <PiEnvelopeSimple aria-hidden="true" />
                  <span>Contact Media Relations</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Conversion CTA */}
      <section className="contact" aria-labelledby="media-final-cta">
        <div className="container contact-inner">
          <p className="eyebrow mint">Media &amp; Editorial Inquiries</p>
          <h2 id="media-final-cta">Looking for an EV industry spokesperson?</h2>
          <p>Connect with our leadership team for interviews, expert commentary on commercial electric mobility, or keynote presentations.</p>
          <div>
            <a className="button-link primary" href="mailto:info@savygreentech.com?subject=Interview%20Request">
              <span>Send Media Inquiry</span>
              <PiArrowRight aria-hidden="true" />
            </a>
            <a className="button-link ghost-light" href="https://wa.me/919638450070" target="_blank" rel="noreferrer">
              <span>Chat on WhatsApp</span>
              <PiArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <QuoteModal isOpen={modalOpen} onClose={() => setModalOpen(false)} defaultVehicle="Media Inquiry" mode="quote" />
      <SiteFooter />
    </main>
  );
}
