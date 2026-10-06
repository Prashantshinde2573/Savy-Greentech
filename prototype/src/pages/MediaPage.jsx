import { useState, useRef, useEffect } from 'react';
import { PiArrowRight, PiArticle, PiCalendarBlank, PiDownloadSimple, PiEnvelopeSimple, PiGlobeHemisphereWest, PiMagnifyingGlass, PiMapPin, PiMegaphone, PiSparkle, PiTrophy } from 'react-icons/pi';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { PageHero } from '../components/PageHero';
import { SEOHead } from '../components/SEOHead';
import { QuoteModal } from '../components/QuoteModal';
import { amsterdamFeature } from '../data/newsMedia';
import { fetchNewsPosts, fetchIndustryParticipationPosts, stripHtml } from '../services/wordpress';
import { usePageAnimations } from '../hooks/usePageAnimations';

function NewsCard({ post }) {
  const acf = (post?.acf && !Array.isArray(post.acf)) ? post.acf : {};
  const publicationName = acf.publication_name ? stripHtml(acf.publication_name) : (post?.publication_name || post?.publicationName || '');
  const newsDate = acf.date ? stripHtml(acf.date) : (post?.date || '');
  const newsLink = acf.news_link ? String(acf.news_link).trim() : (post?.news_link || post?.newsLink || post?.href || '');
  const metaDate = publicationName && newsDate ? `${publicationName} · ${newsDate}` : (publicationName || newsDate || '');
  const title = stripHtml(post?.title?.rendered || post?.title || '');
  const description = stripHtml(post?.excerpt?.rendered || post?.excerpt || post?.description || '');
  const image = post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || post?.image || '/assets/news/ipm-premium-electric-mobility.png';

  return (
    <article className="press-card">
      {newsLink ? (
        <a className="press-card-media" href={newsLink} target="_blank" rel="noopener noreferrer" aria-label={`Read ${title}`}>
          <img src={image} alt={title} loading="lazy" />
          {publicationName && <span className="press-publication-tag">{publicationName}</span>}
        </a>
      ) : (
        <div className="press-card-media">
          <img src={image} alt={title} loading="lazy" />
          {publicationName && <span className="press-publication-tag">{publicationName}</span>}
        </div>
      )}
      <div className="press-card-body">
        {metaDate && <p className="press-meta-date">{metaDate}</p>}
        <h3>
          {newsLink ? (
            <a href={newsLink} target="_blank" rel="noopener noreferrer">{title}</a>
          ) : (
            <span>{title}</span>
          )}
        </h3>
        {description && <p className="press-excerpt">{description}</p>}
        {newsLink && (
          <a className="press-read-link" href={newsLink} target="_blank" rel="noopener noreferrer">
            Read full article <PiArrowRight aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

function IndustryParticipationCard({ post }) {
  const acf = (post?.acf && !Array.isArray(post.acf)) ? post.acf : {};
  const year = acf.year || post?.year || '';
  const exhibitionsName = acf.exhibitions_name ? stripHtml(acf.exhibitions_name) : (post?.exhibitions_name || post?.exhibitionsName || post?.category || '');
  const location = acf.location ? stripHtml(acf.location) : (post?.location || '');
  const title = stripHtml(post?.title?.rendered || post?.title || '');
  const description = stripHtml(post?.excerpt?.rendered || post?.excerpt || post?.description || '');
  const image = post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || post?.image || '/assets/news/city-pod-netherlands.jpg';
  const role = acf.role ? stripHtml(acf.role) : (post?.role || '');
  const highlight = acf.highlight ? stripHtml(acf.highlight) : (post?.highlight || '');

  return (
    <article className="award-card">
      <div className="award-card-media">
        <img src={image} alt={title} loading="lazy" />
        <div className="award-media-overlay" />
        {year && (
          <span className="award-year-badge">
            <PiCalendarBlank aria-hidden="true" />
            <span>{year}</span>
          </span>
        )}
        {highlight && (
          <span className="award-highlight-pill">
            <PiSparkle aria-hidden="true" />
            <span>{highlight}</span>
          </span>
        )}
      </div>
      <div className="award-card-body">
        <div className="award-meta-row">
          {exhibitionsName && <span className="award-category">{exhibitionsName}</span>}
          {location && (
            <span className="award-location">
              <PiMapPin aria-hidden="true" />
              <span>{location}</span>
            </span>
          )}
        </div>
        <h3>{title}</h3>
        {description && <p>{description}</p>}
        {role && (
          <div className="award-card-footer">
            <span className="award-role-tag">{role}</span>
          </div>
        )}
      </div>
    </article>
  );
}

export function MediaPage() {
  const pageRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [pressList, setPressList] = useState([]);
  const [awardsList, setAwardsList] = useState([]);
  const [loading, setLoading] = useState(true);
  usePageAnimations(pageRef);

  useEffect(() => {
    let isMounted = true;
    async function loadMedia() {
      try {
        setLoading(true);
        const [newsPosts, industryPosts] = await Promise.all([
          fetchNewsPosts(),
          fetchIndustryParticipationPosts()
        ]);

        console.log("Media posts:", { newsPosts, industryPosts });
        console.log("Media post count:", (newsPosts?.length || 0) + (industryPosts?.length || 0));

        if (isMounted) {
          setPressList(newsPosts || []);
          setAwardsList(industryPosts || []);
        }
      } catch (err) {
        console.error('WordPress API error for media:', err);
        if (isMounted) {
          setPressList([]);
          setAwardsList([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadMedia();
    return () => {
      isMounted = false;
    };
  }, []);

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
            {pressList.map((post) => (
              <NewsCard key={post.id || post.slug} post={post} />
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
            {awardsList.map((post) => (
              <IndustryParticipationCard key={post.id || post.slug} post={post} />
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
                <a href="mailto:info@savygreentech.com?subject=Press%20Inquiry%20SAVY" className="button-link secondary">
                  <PiEnvelopeSimple aria-hidden="true" />
                  <span>Contact Media Relations</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Conversion CTA with Video Background */}
      <section className="contact" aria-labelledby="media-final-cta">
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
          <p className="eyebrow mint">Media &amp; Editorial Inquiries</p>
          <h2 id="media-final-cta">Looking for an EV industry spokesperson?</h2>
          <p>Connect with our leadership team for interviews, expert commentary on commercial electric mobility, or keynote presentations.</p>
          <div>
            <a className="button-link primary" href="mailto:info@savygreentech.com?subject=Interview%20Request">
              <span>Send Media Inquiry</span>
              <PiArrowRight aria-hidden="true" />
            </a>
            <a className="button-link secondary" href="https://wa.me/919284830085" target="_blank" rel="noreferrer">
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
