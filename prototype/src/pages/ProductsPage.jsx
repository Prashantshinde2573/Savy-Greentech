import { useState, useMemo, useRef } from 'react';
import {
  PiArrowRight,
  PiCheckCircle,
  PiMagnifyingGlass,
  PiSparkle,
  PiX
} from 'react-icons/pi';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { PageHero } from '../components/PageHero';
import { SEOHead } from '../components/SEOHead';
import { QuoteModal } from '../components/QuoteModal';
import { products } from '../data/products';
import { usePageAnimations } from '../hooks/usePageAnimations';

const CATEGORY_FILTER_TABS = [
  { id: 'all', label: 'All' },
  { id: 'electric-campus-cart', label: 'Electric Campus Cart' },
  { id: 'electric-loading-rickshaw', label: 'Electric Loading Rickshaw' },
  { id: 'electric-passenger-rickshaw', label: 'Electric Passenger Rickshaw' },
  { id: 'waste-collection-rickshaw', label: 'Waste Collection Rickshaw' },
  { id: 'food-cart', label: 'Food Cart' },
  { id: 'special-purpose-vehicle', label: 'Special Purpose Vehicle' }
];

export function ProductsPage() {
  const pageRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVehicleForModal, setSelectedVehicleForModal] = useState('');
  usePageAnimations(pageRef);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all') {
        const matchesCat =
          item.category === selectedCategory ||
          (selectedCategory === 'electric-campus-cart' && (item.category === 'e-campus-cart' || item.category === 'electric-campus-cart')) ||
          (selectedCategory === 'food-cart' && (item.category === 'food-cart' || item.category === 'food-cart-rickshaw'));
        if (!matchesCat) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCopy = item.shortCopy?.toLowerCase().includes(query) || false;
        const matchesCategory = item.categoryName?.toLowerCase().includes(query) || false;
        const matchesApps = item.applications?.some((app) => app.toLowerCase().includes(query));
        const matchesSpecs =
          (item.specs?.power && item.specs.power.toLowerCase().includes(query)) ||
          (item.specs?.loadCapacity && item.specs.loadCapacity.toLowerCase().includes(query)) ||
          (item.specs?.seatingCapacity && item.specs.seatingCapacity.toLowerCase().includes(query));

        if (!matchesName && !matchesCopy && !matchesCategory && !matchesApps && !matchesSpecs) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  const handleInquire = (vehicleName) => {
    setSelectedVehicleForModal(vehicleName);
    setModalOpen(true);
  };

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
  };

  return (
    <main id="top" className="products-page" ref={pageRef}>
      <SEOHead
        title="SAVY Electric Vehicles | Commercial & Campus EV Catalog"
        description="Browse SAVY Greentech 14 purpose-built electric vehicles across 6 core categories: Electric Campus Carts, Electric Loading Rickshaws, Electric Passenger Rickshaws, Waste Collection Rickshaws, Food Carts, and Special Purpose Vehicles."
      />
      <SiteHeader currentPath="/products" transparentInitially={true} />

      <PageHero
        eyebrow="SAVY Electric Vehicles"
        title="Purpose-built electric mobility for real-world applications."
        description="Engineered across 6 core categories for institutional campuses, commercial logistics, passenger micro-mobility, municipal sanitation, street retail, and specialized industrial operations."
        videoSrc="/assets/CTA-bg.mp4"
        primaryCtaText="Request a Fleet Quote"
        onPrimaryClick={() => handleInquire('Fleet Inquiry')}
        secondaryCtaText="Explore Catalogue"
        secondaryCtaHref="#catalog"
      />

      {/* Main Direct Product Catalogue Section */}
      <section className="section-cream catalog-section" id="catalog" aria-labelledby="catalog-title">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">SAVY Vehicle Catalogue</p>
            <h2 id="catalog-title">Explore Purpose-Built Platforms</h2>
            <p className="section-subtitle">
              Filter by vehicle category or search across our 14 certified zero-emission models.
            </p>
          </div>

          {/* Category Filter Tabs (Same visual style and interaction as Blog page) */}
          <div className="category-filter-tabs" role="tablist" aria-label="Filter products by category">
            {CATEGORY_FILTER_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`category-tab-btn ${selectedCategory === tab.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(tab.id)}
                role="tab"
                aria-selected={selectedCategory === tab.id}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="blog-search-bar" style={{ marginBottom: '32px' }}>
            <PiMagnifyingGlass aria-hidden="true" />
            <input
              type="search"
              placeholder="Search by vehicle model, application, or specifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search vehicles"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <PiX />
              </button>
            )}
          </div>

          {/* Results Count & Reset Bar */}
          <div className="catalog-results-info">
            <span>
              Showing <strong>{filteredProducts.length}</strong> vehicle model{filteredProducts.length === 1 ? '' : 's'}
              {selectedCategory !== 'all' && (
                <> in <em>{CATEGORY_FILTER_TABS.find((t) => t.id === selectedCategory)?.label}</em></>
              )}
            </span>
            {(selectedCategory !== 'all' || searchQuery) && (
              <button
                type="button"
                className="reset-filters-btn"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
              >
                Reset filter <PiX aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="no-products-found">
              <p>No vehicle models match your current filter criteria.</p>
              <button
                type="button"
                className="button-link primary"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
              >
                <span>View All 14 Vehicles</span>
                <PiArrowRight aria-hidden="true" />
              </button>
            </div>
          ) : (
            <div className="catalog-grid">
              {filteredProducts.map((vehicle) => (
                <article className={`catalog-card ${vehicle.comingSoon ? 'is-coming-soon' : ''}`} key={vehicle.slug}>
                  <div className="catalog-card-media">
                    <img src={vehicle.image} alt={vehicle.name} loading="lazy" />
                    <span className="catalog-card-category-badge">{vehicle.categoryName}</span>
                    {vehicle.comingSoon && <span className="catalog-card-status-badge">In Development</span>}
                  </div>

                  <div className="catalog-card-body">
                    <h3>{vehicle.name}</h3>
                    <p className="catalog-card-tagline">{vehicle.tagline || vehicle.shortCopy}</p>

                    {/* Spec Highlights Grid */}
                    <div className="catalog-spec-badges">
                      <div className="spec-badge">
                        <span className="spec-label">Motor</span>
                        <span className="spec-val">
                          {vehicle.specs?.power ? (vehicle.specs.power.length > 20 ? 'Custom' : vehicle.specs.power) : 'Electric'}
                        </span>
                      </div>
                      <div className="spec-badge">
                        <span className="spec-label">Speed</span>
                        <span className="spec-val">{vehicle.specs?.topSpeed || '25 km/h'}</span>
                      </div>
                      <div className="spec-badge">
                        <span className="spec-label">Range</span>
                        <span className="spec-val">
                          {vehicle.specs?.range && vehicle.specs.range.includes('km')
                            ? `${vehicle.specs.range.split(' ')[0]} km`
                            : (vehicle.specs?.range?.length > 15 ? 'Configurable' : '75 km')}
                        </span>
                      </div>
                      <div className="spec-badge">
                        <span className="spec-label">Payload / Cap</span>
                        <span className="spec-val">
                          {vehicle.specs?.loadCapacity
                            ? (vehicle.specs.loadCapacity.length > 20 ? 'Custom' : vehicle.specs.loadCapacity.replace('Payload', '').trim())
                            : (vehicle.specs?.seatingCapacity?.length > 20 ? 'Custom' : vehicle.specs?.seatingCapacity || 'Standard')}
                        </span>
                      </div>
                    </div>

                    <div className="catalog-card-actions">
                      <a href={`/products/${vehicle.slug}`} className="button-link primary btn-sm">
                        <span>View Product</span>
                        <PiArrowRight aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bespoke Manufacturing & Custom Engineering Section */}
      <section className="section-white custom-solutions-callout" aria-labelledby="custom-build-heading">
        <div className="container">
          <div className="custom-box-grid">
            <div>
              <p className="eyebrow">Bespoke Manufacturing</p>
              <h2 id="custom-build-heading">Need a Custom Vehicle Configuration?</h2>
              <p className="custom-box-lead">
                From custom 900kg cargo flatbeds for FMCG leaders like Ramdev Foods to specialized mobile ATM kiosks, sanitization tippers, food carts, and luxury heritage retrofits, SAVY engineers vehicles built entirely around your unique operational requirements.
              </p>
              <div className="custom-box-bullets">
                <div className="custom-bullet-item">
                  <PiCheckCircle aria-hidden="true" />
                  <span>Custom chassis length, payload capacity, and multi-leaf suspension ratings</span>
                </div>
                <div className="custom-bullet-item">
                  <PiCheckCircle aria-hidden="true" />
                  <span>Specialized superstructures: Hydraulic tipper hoppers, insulated boxes &amp; SS liquid tanks</span>
                </div>
                <div className="custom-bullet-item">
                  <PiCheckCircle aria-hidden="true" />
                  <span>High-capacity Lithium Iron Phosphate (LFP) battery packs configured for full-shift duty</span>
                </div>
              </div>
              <div className="custom-box-actions">
                <button
                  type="button"
                  className="button-link primary"
                  onClick={() => handleInquire('Special Custom Build Project')}
                >
                  <span>Discuss Custom Requirements</span>
                  <PiArrowRight aria-hidden="true" />
                </button>
                <a href="/technology" className="button-link secondary">
                  <span>Explore In-House R&amp;D</span>
                  <PiArrowRight aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="custom-box-card">
              <div className="custom-box-header">
                <PiSparkle aria-hidden="true" />
                <h4>SAVY Custom Capabilities</h4>
              </div>
              <ul className="custom-spec-checklist">
                <li>
                  <strong>Chassis &amp; Body:</strong> 3D CAD modeling, FEA structural simulation &amp; precision robotic welding.
                </li>
                <li>
                  <strong>Powertrain:</strong> Custom motor winding &amp; proprietary programmable controllers.
                </li>
                <li>
                  <strong>Battery Systems:</strong> Indigenous thermal-protected smart BMS packaging.
                </li>
                <li>
                  <strong>Compliance:</strong> ARAI / ICAT certification and institutional safety standards.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />

      {/* Shared Quote Modal */}
      <QuoteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialVehicle={selectedVehicleForModal}
        mode="quote"
      />
    </main>
  );
}
