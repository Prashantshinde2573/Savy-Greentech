import { useState, useRef } from 'react';
import {
  PiArrowLeft,
  PiArrowRight,
  PiCar,
  PiTruck,
  PiTrash,
  PiUsers,
  PiStorefront,
  PiGear,
  PiCheckCircle,
  PiEnvelopeSimple,
  PiPhoneCall,
  PiShieldCheck,
  PiLightning,
  PiSliders
} from 'react-icons/pi';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { SEOHead } from '../components/SEOHead';
import { QuoteModal } from '../components/QuoteModal';
import {
  productCategories,
  getCategoryBySlug,
  getProductsByCategory,
  products
} from '../data/products';
import { usePageAnimations } from '../hooks/usePageAnimations';

const CATEGORY_ICONS = {
  'electric-campus-cart': PiCar,
  'e-campus-cart': PiCar,
  'electric-loading-rickshaw': PiTruck,
  'electric-passenger-rickshaw': PiUsers,
  'waste-collection-rickshaw': PiTrash,
  'food-cart': PiStorefront,
  'food-cart-rickshaw': PiStorefront,
  'special-purpose-vehicle': PiGear
};

export function ProductCategoryPage({ categorySlug }) {
  const pageRef = useRef(null);
  const category = getCategoryBySlug(categorySlug) || productCategories[0];
  const categoryProducts = getProductsByCategory(category.slug);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVehicle, setModalVehicle] = useState(category.name);
  const [activeVariantTab, setActiveVariantTab] = useState(0);

  usePageAnimations(pageRef);

  const handleOpenQuote = (vehicleName = category.name) => {
    setModalVehicle(vehicleName);
    setModalOpen(true);
  };

  const electruckProduct = categoryProducts.find((p) => p.slug === 'electruck');
  const electruckVariants = electruckProduct?.customizationVariants || [];

  const CategoryIcon = CATEGORY_ICONS[category.slug] || PiCar;

  // Extract actual category product images ONLY (no lifestyle/application/stock assets)
  const categoryImages = [];
  categoryProducts.forEach((prod) => {
    if (prod.image && !categoryImages.includes(prod.image)) {
      categoryImages.push(prod.image);
    }
  });

  if (categoryImages.length === 0 && category.heroImage) {
    categoryImages.push(category.heroImage);
  }

  // Define editorial masonry height variations for Column 1 and Column 2
  const col1Heights = ['card-tall', 'card-short', 'card-medium', 'card-tall', 'card-short', 'card-medium'];
  const col2Heights = ['card-short', 'card-tall', 'card-medium', 'card-short', 'card-tall', 'card-medium'];

  const buildColumnItems = (imgList, heightPatterns, offset = 0) => {
    return heightPatterns.map((hClass, idx) => ({
      src: imgList[(idx + offset) % imgList.length],
      heightClass: hClass
    }));
  };

  const col1Base = buildColumnItems(categoryImages, col1Heights, 0);
  const col2Base = buildColumnItems(categoryImages, col2Heights, 1);

  return (
    <main id="top" className="product-category-page" ref={pageRef}>
      <SEOHead
        title={`${category.name} | SAVY Greentech Electric Vehicles`}
        description={`${category.tagline} Discover ${category.name} range by SAVY Greentech: technical specifications, customizations, and commercial fleet enquiry.`}
      />
      <SiteHeader currentPath={`/products/${category.slug}`} transparentInitially={false} />

      {/* Breadcrumb Bar */}
      <nav className="product-breadcrumb-bar" aria-label="Breadcrumbs">
        <div className="container breadcrumb-inner">
          <a href="/products" className="breadcrumb-back-link">
            <PiArrowLeft aria-hidden="true" /> Back to All Products
          </a>
          <div className="breadcrumb-trail">
            <a href="/">Home</a> / <a href="/products">Products</a> / <span aria-current="page">{category.name}</span>
          </div>
        </div>
      </nav>

      {/* Category Hero Section (100vh with Two Vertical Infinite Carousels) */}
      <section className="category-hero-section section-cream" aria-labelledby="cat-hero-title">
        <div className="container category-hero-layout">
          {/* Left: Category Copy & Actions */}
          <div className="category-hero-copy">
            <div className="category-badge-pill">
              <CategoryIcon className="cat-badge-icon" aria-hidden="true" />
              <span>SAVY Product Category</span>
            </div>
            <h1 id="cat-hero-title">{category.name}</h1>
            <p className="category-hero-lead">{category.tagline}</p>
            <p className="category-hero-desc">{category.description}</p>
            
            <div className="category-hero-actions">
              <button
                type="button"
                className="button-link primary"
                onClick={() => handleOpenQuote(`${category.name} Fleet Inquiry`)}
              >
                <span>Request Fleet Quote</span>
                <PiArrowRight aria-hidden="true" />
              </button>
              <a href="#models-grid" className="button-link ghost">
                <span>Explore Models ({categoryProducts.length})</span>
                <PiArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right: Two Vertical Infinite Product Image Carousels (Image-Only with Varied Heights) */}
          <div className="category-hero-carousels-wrapper">
            <div className="category-hero-carousels" aria-hidden="true">
              {/* Column 1: Scrolls Upward */}
              <div className="hero-carousel-col carousel-col-up">
                <div className="carousel-track track-up">
                  {col1Base.map((item, idx) => (
                    <div key={`c1-a-${idx}`} className={`hero-carousel-card ${item.heightClass}`}>
                      <img src={item.src} alt={category.name} loading="eager" />
                    </div>
                  ))}
                  {/* Duplicate cloned set for seamless infinite loop */}
                  {col1Base.map((item, idx) => (
                    <div key={`c1-b-${idx}`} className={`hero-carousel-card ${item.heightClass}`}>
                      <img src={item.src} alt={category.name} loading="eager" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Scrolls Downward */}
              <div className="hero-carousel-col carousel-col-down">
                <div className="carousel-track track-down">
                  {col2Base.map((item, idx) => (
                    <div key={`c2-a-${idx}`} className={`hero-carousel-card ${item.heightClass}`}>
                      <img src={item.src} alt={category.name} loading="eager" />
                    </div>
                  ))}
                  {/* Duplicate cloned set for seamless infinite loop */}
                  {col2Base.map((item, idx) => (
                    <div key={`c2-b-${idx}`} className={`hero-carousel-card ${item.heightClass}`}>
                      <img src={item.src} alt={category.name} loading="eager" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Models Grid */}
      <section className="section-white category-models-section" id="models-grid" aria-labelledby="models-heading">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">Vehicle Lineup</p>
            <h2 id="models-heading">{category.name} Models</h2>
            <p className="section-subtitle">
              Purpose-engineered electric vehicles designed for durability, reliability, and minimal total cost of ownership.
            </p>
          </div>

          <div className="category-products-grid">
            {categoryProducts.map((product) => (
              <article key={product.slug} className="cat-product-card">
                <div className="cat-product-card-media">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  {product.comingSoon && <span className="card-badge coming-soon">Upcoming Concept</span>}
                </div>
                
                <div className="cat-product-card-body">
                  <div className="cat-product-card-header">
                    <span className="cat-product-category-tag">{product.categoryName}</span>
                    <h3 className="cat-product-name">{product.name}</h3>
                    <p className="cat-product-tagline">{product.tagline}</p>
                  </div>

                  {/* Specs Quick Pills */}
                  <div className="cat-product-specs-pills">
                    {product.specs?.power && (
                      <div className="spec-pill">
                        <span className="pill-label">Motor</span>
                        <strong className="pill-val">{product.specs.power.length > 24 ? 'Customizable' : product.specs.power}</strong>
                      </div>
                    )}
                    {product.specs?.range && product.specs.range !== 'Customizable (Configurable battery capacity)' && (
                      <div className="spec-pill">
                        <span className="pill-label">Range</span>
                        <strong className="pill-val">{product.specs.range.split(' ')[0]} km</strong>
                      </div>
                    )}
                    {product.specs?.loadCapacity && (
                      <div className="spec-pill">
                        <span className="pill-label">Payload</span>
                        <strong className="pill-val">{product.specs.loadCapacity.length > 24 ? 'Customizable' : product.specs.loadCapacity}</strong>
                      </div>
                    )}
                    {product.specs?.seatingCapacity && (
                      <div className="spec-pill">
                        <span className="pill-label">Capacity</span>
                        <strong className="pill-val">{product.specs.seatingCapacity.length > 24 ? 'Customizable' : product.specs.seatingCapacity}</strong>
                      </div>
                    )}
                  </div>

                  <p className="cat-product-summary">{product.shortCopy}</p>

                  <div className="cat-product-card-actions">
                    <a
                      href={`/products/${product.slug}`}
                      className="button-link primary btn-sm"
                    >
                      <span>View Product</span>
                      <PiArrowRight aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Special Modular Customization Variants Showcase (For Food Cart or Loading Category) */}
      {categoryProducts.some((p) => p.customizationVariants?.length > 0) && (
        <section className="section-cream electruck-variants-section" aria-labelledby="variants-heading">
          <div className="container">
            <div className="section-heading center">
              <p className="eyebrow">Modular Customizations</p>
              <h2 id="variants-heading">Purpose-Built Application Formats</h2>
              <p className="section-subtitle">
                Engineered with flexible chassis and superstructure configurations to match specific operational workflows.
              </p>
            </div>

            <div className="electruck-variants-grid">
              {categoryProducts
                .flatMap((p) => p.customizationVariants || [])
                .map((variant, idx) => (
                  <div key={idx} className="variant-card">
                    <div className="variant-card-icon-wrap">
                      <PiSliders aria-hidden="true" />
                    </div>
                    <span className="variant-tag">{variant.tag}</span>
                    <h3 className="variant-title">{variant.name}</h3>
                    <p className="variant-copy">{variant.copy}</p>
                    <button
                      type="button"
                      className="button-link mint btn-sm variant-enquire-btn"
                      onClick={() => handleOpenQuote(`${variant.name} Inquiry`)}
                    >
                      <span>Enquire About {variant.name}</span>
                      <PiArrowRight aria-hidden="true" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Enquiry Strip CTA */}
      <section className="category-enquiry-banner section-white" aria-labelledby="cta-enquire-title">
        <div className="container">
          <div className="category-enquiry-card">
            <div className="enquiry-card-content">
              <p className="eyebrow mint">Custom Manufacturing &amp; Fleet Orders</p>
              <h2 id="cta-enquire-title">Need a tailored {category.name} solution?</h2>
              <p>
                Our engineering team in Ahmedabad designs and manufactures custom seating layouts, chassis dimensions, battery capacities, and specialized cargo fixtures to your exact specifications.
              </p>
            </div>
            <div className="enquiry-card-actions">
              <button
                type="button"
                className="button-link primary"
                onClick={() => handleOpenQuote(`${category.name} Custom Inquiry`)}
              >
                <span>Request a Custom Quote</span>
                <PiArrowRight aria-hidden="true" />
              </button>
              <a href="https://wa.me/919284830085" target="_blank" rel="noreferrer" className="button-link ghost-light">
                <PiPhoneCall aria-hidden="true" />
                <span>Talk to Sales Engineer</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />

      {/* Shared Quote / Enquiry Modal */}
      <QuoteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialVehicle={modalVehicle}
        mode="quote"
      />
    </main>
  );
}
