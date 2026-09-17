import { useState, useRef } from 'react';
import { PiArrowLeft, PiArrowRight, PiBatteryCharging, PiCheckCircle, PiDownloadSimple, PiEngine, PiGauge, PiHeadset, PiShieldCheck, PiSparkle, PiUsers } from 'react-icons/pi';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { SEOHead } from '../components/SEOHead';
import { QuoteModal } from '../components/QuoteModal';
import { products, getProductBySlug } from '../data/products';
import { usePageAnimations } from '../hooks/usePageAnimations';

export function ProductDetailPage({ slug }) {
  const pageRef = useRef(null);
  const product = getProductBySlug(slug) || products[0];
  const [activeImage, setActiveImage] = useState(product.gallery?.[0] || product.image);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('quote');
  usePageAnimations(pageRef);

  const relatedProducts = products
    .filter((p) => p.slug !== product.slug && (p.category === product.category || !product.category))
    .slice(0, 3);

  const fallbackRelated = relatedProducts.length > 0 ? relatedProducts : products.filter((p) => p.slug !== product.slug).slice(0, 3);

  const openQuoteModal = (mode = 'quote') => {
    setModalMode(mode);
    setModalOpen(true);
  };

  const handleDownloadBrochure = () => {
    alert(`Brochure & Spec Sheet for ${product.name} will be dispatched to your email or downloaded directly once official release PDF is verified.`);
  };

  return (
    <main id="top" className="product-detail-page" ref={pageRef}>
      <SEOHead
        title={`${product.name} | Electric Vehicle Specifications & Quote`}
        description={`${product.name} by SAVY Greentech: ${product.shortCopy} View full technical specifications, features, applications, and book a demonstration.`}
      />
      <SiteHeader currentPath="/products" transparentInitially={false} />

      {/* Breadcrumb & Top Bar */}
      <div className="product-breadcrumb-bar">
        <div className="container breadcrumb-inner">
          <a href="/products" className="breadcrumb-back-link">
            <PiArrowLeft aria-hidden="true" /> Back to All Vehicles
          </a>
          <div className="breadcrumb-trail">
            <a href="/">Home</a> / <a href="/products">Products</a> / <a href="/products">{product.categoryName}</a> / <span>{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Hero & Gallery Section */}
      <section className="product-hero-section section-white" aria-labelledby="product-title">
        <div className="container">
          <div className="product-hero-grid">
            {/* Gallery Column */}
            <div className="product-gallery-col">
              <div className="product-main-media-wrap">
                <img src={activeImage} alt={`${product.name} EV`} className="product-main-image" />
                <span className="product-badge-overlay">{product.categoryName}</span>
                {product.comingSoon && <span className="product-status-overlay">In Active Development</span>}
              </div>

              {product.gallery && product.gallery.length > 1 && (
                <div className="product-thumbnails-strip">
                  {product.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`thumb-btn ${activeImage === img ? 'active' : ''}`}
                      onClick={() => setActiveImage(img)}
                      aria-label={`View angle ${idx + 1}`}
                    >
                      <img src={img} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Value Proposition & Quick Specs Column */}
            <div className="product-info-col">
              <p className="eyebrow">{product.categoryName}</p>
              <h1 id="product-title">{product.name}</h1>
              <p className="product-tagline-text">{product.tagline || product.shortCopy}</p>

              {/* Key Highlight Badges */}
              <div className="product-quick-specs-grid">
                <div className="quick-spec-card">
                  <PiEngine className="quick-spec-icon" />
                  <div>
                    <span className="quick-spec-title">Motor Power</span>
                    <strong>{product.specs.power}</strong>
                  </div>
                </div>

                <div className="quick-spec-card">
                  <PiBatteryCharging className="quick-spec-icon" />
                  <div>
                    <span className="quick-spec-title">Driving Range</span>
                    <strong>{product.specs.range}</strong>
                  </div>
                </div>

                <div className="quick-spec-card">
                  <PiGauge className="quick-spec-icon" />
                  <div>
                    <span className="quick-spec-title">Top Speed</span>
                    <strong>{product.specs.topSpeed}</strong>
                  </div>
                </div>

                <div className="quick-spec-card">
                  <PiUsers className="quick-spec-icon" />
                  <div>
                    <span className="quick-spec-title">Seating / Load</span>
                    <strong>{product.specs.seatingCapacity}</strong>
                  </div>
                </div>
              </div>

              <p className="product-short-summary">{product.shortCopy}</p>

              {/* Primary Action Buttons */}
              <div className="product-hero-ctas">
                <button
                  type="button"
                  className="button-link primary"
                  onClick={() => openQuoteModal('quote')}
                >
                  <span>Request a Quote</span>
                  <PiArrowRight aria-hidden="true" />
                </button>

                <button
                  type="button"
                  className="button-link ghost"
                  onClick={() => openQuoteModal('demo')}
                >
                  <span>Book a Demo</span>
                </button>

                <button
                  type="button"
                  className="button-link text-download"
                  onClick={handleDownloadBrochure}
                >
                  <PiDownloadSimple aria-hidden="true" />
                  <span>Download Spec Sheet</span>
                </button>
              </div>

              {/* Direct Support Notice */}
              <div className="product-direct-support-strip">
                <PiHeadset className="support-strip-icon" />
                <div>
                  <strong>Need immediate fleet consultation?</strong>
                  <p>Talk to our Ahmedabad engineering team at <a href="tel:+919638450070">+91 96384 50070</a> or <a href="https://wa.me/919638450070" target="_blank" rel="noreferrer">Chat on WhatsApp</a>.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Overview & Features */}
      <section className="section-cream product-overview-section" aria-labelledby="overview-heading">
        <div className="container">
          <div className="product-section-split">
            <div className="product-overview-content">
              <p className="eyebrow">Vehicle Overview</p>
              <h2 id="overview-heading">Engineering &amp; Operational Purpose</h2>
              <p className="product-overview-lead">{product.overview}</p>

              <div className="product-features-block">
                <h3>Key Engineering Features</h3>
                <ul className="product-features-list">
                  {product.features?.map((feat, i) => (
                    <li key={i}>
                      <PiCheckCircle className="feat-check" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Customization Options */}
            <div className="product-customization-card">
              <p className="eyebrow">Customization</p>
              <h3>Tailored to Your Operations</h3>
              <p>SAVY specializes in modifying this platform to suit your exact dimensions, payload demands, or terrain.</p>
              <ul className="custom-opts-list">
                {product.customization?.map((opt, i) => (
                  <li key={i}>
                    <PiSparkle className="custom-sparkle" />
                    <span>{opt}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="button-link primary full-width"
                onClick={() => openQuoteModal('quote')}
                style={{ marginTop: '24px' }}
              >
                <span>Discuss Custom Configuration</span>
                <PiArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Full Technical Specifications Table */}
      <section className="section-white product-specs-section" aria-labelledby="specs-table-title">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">Technical Data</p>
            <h2 id="specs-table-title">Full Specifications</h2>
            <p className="section-subtitle">Verified engineering specifications and operational parameters.</p>
          </div>

          <div className="specs-table-container">
            <table className="specs-table">
              <tbody>
                <tr>
                  <th>Vehicle Model</th>
                  <td><strong>{product.name}</strong></td>
                </tr>
                <tr>
                  <th>Category</th>
                  <td>{product.categoryName}</td>
                </tr>
                <tr>
                  <th>Motor / Drivetrain</th>
                  <td>{product.specs.power}</td>
                </tr>
                <tr>
                  <th>Top Speed</th>
                  <td>{product.specs.topSpeed}</td>
                </tr>
                <tr>
                  <th>Range per Charge</th>
                  <td>{product.specs.range}</td>
                </tr>
                <tr>
                  <th>Seating Capacity</th>
                  <td>{product.specs.seatingCapacity}</td>
                </tr>
                <tr>
                  <th>Payload / Load Capacity</th>
                  <td>{product.specs.loadCapacity}</td>
                </tr>
                <tr>
                  <th>Battery Chemistry</th>
                  <td>{product.specs.batteryType}</td>
                </tr>
                <tr>
                  <th>Charging Time</th>
                  <td>{product.specs.chargingTime}</td>
                </tr>
                <tr>
                  <th>Braking System</th>
                  <td>{product.specs.braking}</td>
                </tr>
                <tr>
                  <th>Gradeability</th>
                  <td>{product.specs.gradeability}</td>
                </tr>
                <tr>
                  <th>Dimensions &amp; Footprint</th>
                  <td>{product.specs.dimensions}</td>
                </tr>
                <tr>
                  <th>Warranty &amp; Service</th>
                  <td>{product.specs.warranty} (Doorstep service network support)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="specs-disclaimer">
            <PiShieldCheck />
            <span>Specifications represent standard manufacturer baselines and may be customized based on institutional order specifications.</span>
          </div>
        </div>
      </section>

      {/* Recommended Applications */}
      <section className="section-cream product-apps-section" aria-labelledby="apps-heading">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">Use Cases</p>
            <h2 id="apps-heading">Ideal Operating Environments</h2>
          </div>

          <div className="product-app-tags-grid">
            {product.applications?.map((app, i) => (
              <div className="product-app-badge-card" key={i}>
                <span className="app-dot" />
                <strong>{app}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="section-white related-products-section" aria-labelledby="related-heading">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">Explore Other Models</p>
            <h2 id="related-heading">Related Electric Vehicles</h2>
          </div>

          <div className="related-products-grid">
            {fallbackRelated.map((rel) => (
              <article className="catalog-card" key={rel.slug}>
                <div className="catalog-card-media">
                  <img src={rel.image} alt={rel.name} loading="lazy" />
                  <span className="catalog-card-category-badge">{rel.categoryName}</span>
                </div>
                <div className="catalog-card-body">
                  <h3>{rel.name}</h3>
                  <p className="catalog-card-tagline">{rel.tagline || rel.shortCopy}</p>
                  <div className="catalog-card-actions">
                    <a href={`/products/${rel.slug}`} className="button-link primary btn-sm">
                      <span>View Specs</span>
                      <PiArrowRight aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final Conversion CTA */}
      <section className="contact" aria-labelledby="product-final-cta">
        <div className="container contact-inner">
          <p className="eyebrow mint">Ready to place your order?</p>
          <h2 id="product-final-cta">Get direct OEM pricing for {product.name}</h2>
          <p>Contact our sales and engineering team for volume pricing, customization, and delivery timelines.</p>
          <div>
            <button type="button" className="button-link primary" onClick={() => openQuoteModal('quote')}>
              <span>Request a Quote</span>
              <PiArrowRight aria-hidden="true" />
            </button>
            <button type="button" className="button-link ghost-light" onClick={() => openQuoteModal('demo')}>
              <span>Book a Demo</span>
              <PiArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      <QuoteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultVehicle={product.name}
        mode={modalMode}
      />
      <SiteFooter />
    </main>
  );
}
