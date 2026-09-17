import { useState, useMemo, useRef } from 'react';
import { PiArrowRight, PiCheckCircle, PiFunnel, PiMagnifyingGlass, PiSliders, PiSparkle, PiX } from 'react-icons/pi';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { PageHero } from '../components/PageHero';
import { SEOHead } from '../components/SEOHead';
import { QuoteModal } from '../components/QuoteModal';
import { products, productCategories } from '../data/products';
import { usePageAnimations } from '../hooks/usePageAnimations';

export function ProductsPage() {
  const pageRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [seatingFilter, setSeatingFilter] = useState('all');
  const [loadFilter, setLoadFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVehicleForModal, setSelectedVehicleForModal] = useState('');
  usePageAnimations(pageRef);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCopy = item.shortCopy.toLowerCase().includes(query);
        const matchesCategory = item.categoryName.toLowerCase().includes(query);
        const matchesApps = item.applications?.some((app) => app.toLowerCase().includes(query));
        if (!matchesName && !matchesCopy && !matchesCategory && !matchesApps) {
          return false;
        }
      }
      // Seating filter
      if (seatingFilter !== 'all') {
        const seats = item.specs.seatingCapacity.toLowerCase();
        if (seatingFilter === '1-2' && !(seats.includes('1') || seats.includes('2') || seats.includes('driver'))) return false;
        if (seatingFilter === '4-6' && !(seats.includes('4') || seats.includes('6'))) return false;
        if (seatingFilter === '8+' && !(seats.includes('8') || seats.includes('12') || seats.includes('10') || seats.includes('20'))) return false;
      }
      // Load filter
      if (loadFilter !== 'all') {
        const load = item.specs.loadCapacity.toLowerCase();
        if (loadFilter === 'heavy' && !(load.includes('800') || load.includes('900') || load.includes('600') || load.includes('650') || load.includes('heavy'))) return false;
        if (loadFilter === 'standard' && (load.includes('900') || load.includes('heavy'))) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, seatingFilter, loadFilter]);

  const handleInquire = (vehicleName) => {
    setSelectedVehicleForModal(vehicleName);
    setModalOpen(true);
  };

  return (
    <main id="top" className="products-page" ref={pageRef}>
      <SEOHead
        title="SAVY Electric Vehicles | Commercial & Campus EV Catalog"
        description="Browse SAVY Greentech purpose-built electric vehicles: Golf carts, loading rickshaws, garbage tippers, passenger tuk-tuks, vintage cars, and custom industrial builds."
      />
      <SiteHeader currentPath="/products" transparentInitially={false} />

      <PageHero
        eyebrow="SAVY Electric Vehicles"
        title="Purpose-built electric mobility for real-world applications."
        description="Engineered for institutional campuses, luxury resorts, municipal sanitation, industrial logistics, and last-mile urban transport."
        videoSrc="/assets/CTA-bg.mp4"
        primaryCtaText="Request a Fleet Quote"
        onPrimaryClick={() => handleInquire('Fleet Inquiry')}
        secondaryCtaText="Book a Demo"
        secondaryCtaHref="#catalog"
      />

      {/* Catalog & Filter Section */}
      <section className="section-cream catalog-section" id="catalog" aria-labelledby="catalog-title">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">Vehicle Catalog</p>
            <h2 id="catalog-title">Explore Purpose-Built Platforms</h2>
            <p className="section-subtitle">Select a category or filter by technical capacity to find your vehicle.</p>
          </div>

          {/* Category Tabs */}
          <div className="category-filter-tabs" role="tablist" aria-label="Vehicle Categories">
            {productCategories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={selectedCategory === cat.id}
                className={`category-tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Advanced Filter Bar */}
          <div className="catalog-filters-bar">
            <div className="search-filter-input">
              <PiMagnifyingGlass aria-hidden="true" />
              <input
                type="search"
                placeholder="Search by vehicle name, industry, or specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search vehicles"
              />
              {searchQuery && (
                <button type="button" className="clear-search" onClick={() => setSearchQuery('')} aria-label="Clear search">
                  <PiX />
                </button>
              )}
            </div>

            <div className="filter-dropdowns">
              <div className="filter-select-wrap">
                <label htmlFor="filter-seating">Seating:</label>
                <select id="filter-seating" value={seatingFilter} onChange={(e) => setSeatingFilter(e.target.value)}>
                  <option value="all">All Seating</option>
                  <option value="1-2">1–2 Seats / Driver</option>
                  <option value="4-6">4–6 Seats</option>
                  <option value="8+">8+ / Large Group</option>
                </select>
              </div>

              <div className="filter-select-wrap">
                <label htmlFor="filter-load">Payload:</label>
                <select id="filter-load" value={loadFilter} onChange={(e) => setLoadFilter(e.target.value)}>
                  <option value="all">All Payloads</option>
                  <option value="standard">Standard Duty</option>
                  <option value="heavy">Heavy Duty (500kg+)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count & Reset */}
          <div className="catalog-results-info">
            <span>Showing <strong>{filteredProducts.length}</strong> vehicle model{filteredProducts.length === 1 ? '' : 's'}</span>
            {(selectedCategory !== 'all' || searchQuery || seatingFilter !== 'all' || loadFilter !== 'all') && (
              <button
                type="button"
                className="reset-filters-btn"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setSeatingFilter('all');
                  setLoadFilter('all');
                }}
              >
                Reset all filters <PiX aria-hidden="true" />
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
                  setSeatingFilter('all');
                  setLoadFilter('all');
                }}
              >
                <span>View All Vehicles</span>
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

                    {/* Spec Highlights Badges */}
                    <div className="catalog-spec-badges">
                      {vehicle.specs.power && (
                        <div className="spec-badge">
                          <span className="spec-label">Motor</span>
                          <span className="spec-val">{vehicle.specs.power.split(' ')[0]} {vehicle.specs.power.split(' ')[1]}</span>
                        </div>
                      )}
                      {vehicle.specs.topSpeed && (
                        <div className="spec-badge">
                          <span className="spec-label">Speed</span>
                          <span className="spec-val">{vehicle.specs.topSpeed}</span>
                        </div>
                      )}
                      {vehicle.specs.range && (
                        <div className="spec-badge">
                          <span className="spec-label">Range</span>
                          <span className="spec-val">{vehicle.specs.range.split(' ')[0]} km</span>
                        </div>
                      )}
                      {vehicle.specs.loadCapacity && (
                        <div className="spec-badge">
                          <span className="spec-label">Payload</span>
                          <span className="spec-val">{vehicle.specs.loadCapacity.split(' ')[0]} {vehicle.specs.loadCapacity.split(' ')[1] || ''}</span>
                        </div>
                      )}
                    </div>

                    <div className="catalog-card-actions">
                      <a href={`/products/${vehicle.slug}`} className="button-link primary btn-sm">
                        <span>View Specs &amp; Details</span>
                        <PiArrowRight aria-hidden="true" />
                      </a>
                      <button
                        type="button"
                        className="button-link ghost btn-sm"
                        onClick={() => handleInquire(vehicle.name)}
                      >
                        <span>Quote</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Custom Build Engineering Section */}
      <section className="section-white custom-solutions-callout" aria-labelledby="custom-build-heading">
        <div className="container">
          <div className="custom-box-grid">
            <div>
              <p className="eyebrow">Bespoke Manufacturing</p>
              <h2 id="custom-build-heading">Need a Custom Vehicle Configuration?</h2>
              <p>
                From custom 900kg cargo flatbeds for FMCG giants like Ramdev Foods to specialized mobile ATM kiosks, sanitization tippers, and luxury heritage retrofits, SAVY engineers vehicles built entirely around your unique operational requirements.
              </p>
              <ul className="custom-bullets">
                <li><PiCheckCircle /> Custom dimensions, cargo box heights, and load capacities</li>
                <li><PiCheckCircle /> Lithium-ion or Lead-acid battery pack sizing for target ranges</li>
                <li><PiCheckCircle /> Auxiliary power integration (refrigeration, inverters, hydraulic lifts)</li>
              </ul>
            </div>
            <div className="custom-box-cta">
              <h3>Consult an EV Engineer</h3>
              <p>Discuss your operational payloads, gradients, and daily range requirements directly with our technical team.</p>
              <button
                type="button"
                className="button-link primary full-width"
                onClick={() => handleInquire('Custom Engineering Requirement')}
              >
                <span>Discuss a Custom EV</span>
                <PiArrowRight aria-hidden="true" />
              </button>
              <a
                href="https://wa.me/919638450070"
                className="button-link ghost-light full-width"
                target="_blank"
                rel="noreferrer"
                style={{ marginTop: '12px' }}
              >
                <span>Chat on WhatsApp</span>
                <PiArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <QuoteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultVehicle={selectedVehicleForModal}
        mode="quote"
      />
      <SiteFooter />
    </main>
  );
}
