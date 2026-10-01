import { useState, useMemo, useRef } from 'react';
import {
  PiArrowRight,
  PiCheckCircle,
  PiFunnel,
  PiMagnifyingGlass,
  PiSliders,
  PiSparkle,
  PiX,
  PiCar,
  PiTruck,
  PiUsers,
  PiStorefront,
  PiGear
} from 'react-icons/pi';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { PageHero } from '../components/PageHero';
import { SEOHead } from '../components/SEOHead';
import { QuoteModal } from '../components/QuoteModal';
import { products, productCategories } from '../data/products';
import { usePageAnimations } from '../hooks/usePageAnimations';

const CATEGORY_ICONS = {
  'e-campus-cart': PiCar,
  'electric-passenger-rickshaw': PiUsers,
  'electric-loading-rickshaw': PiTruck,
  'food-cart-rickshaw': PiStorefront,
  'special-purpose-vehicle': PiGear
};

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
        const matchesCopy = item.shortCopy?.toLowerCase().includes(query) || false;
        const matchesCategory = item.categoryName?.toLowerCase().includes(query) || false;
        const matchesApps = item.applications?.some((app) => app.toLowerCase().includes(query));
        if (!matchesName && !matchesCopy && !matchesCategory && !matchesApps) {
          return false;
        }
      }
      // Seating filter
      if (seatingFilter !== 'all') {
        const seats = item.specs?.seatingCapacity?.toLowerCase() || '';
        if (seatingFilter === '1-2' && !(seats.includes('1') || seats.includes('2') || seats.includes('driver'))) return false;
        if (seatingFilter === '4-6' && !(seats.includes('4') || seats.includes('6'))) return false;
        if (seatingFilter === '8+' && !(seats.includes('8') || seats.includes('12') || seats.includes('10') || seats.includes('20'))) return false;
      }
      // Load filter
      if (loadFilter !== 'all') {
        const load = item.specs?.loadCapacity?.toLowerCase() || '';
        if (loadFilter === 'heavy' && !(load.includes('800') || load.includes('900') || load.includes('600') || load.includes('650') || load.includes('ton') || load.includes('heavy'))) return false;
        if (loadFilter === 'standard' && (load.includes('900') || load.includes('ton') || load.includes('heavy'))) return false;
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
        description="Browse SAVY Greentech 5 core product categories: E-Campus Carts, Electric Passenger Rickshaws, Electric Loading Rickshaws, Food Cart Rickshaws, and Special Purpose Vehicles."
      />
      <SiteHeader currentPath="/products" transparentInitially={true} />

      <PageHero
        eyebrow="SAVY Electric Vehicles"
        title="Purpose-built electric mobility for real-world applications."
        description="Engineered across 5 core categories for institutional campuses, luxury hospitality, commercial logistics, street retail, and specialized operations."
        videoSrc="/assets/CTA-bg.mp4"
        primaryCtaText="Request a Fleet Quote"
        onPrimaryClick={() => handleInquire('Fleet Inquiry')}
        secondaryCtaText="Explore Categories"
        secondaryCtaHref="#categories"
      />

      {/* 5 Core Product Categories Showcase */}
      <section className="section-white category-showcase-section" id="categories" aria-labelledby="cat-showcase-title">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">Product Categories</p>
            <h2 id="cat-showcase-title">Explore Our 5 Core Categories</h2>
            <p className="section-subtitle">
              Select a category to view specialized vehicle lineups, custom body configurations, and full technical specifications.
            </p>
          </div>

          <div className="hub-categories-grid">
            {productCategories.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.slug] || PiCar;
              const catProds = products.filter((p) => p.category === cat.id || p.category === cat.slug);
              return (
                <article key={cat.slug} className="hub-cat-card">
                  <div className="hub-cat-card-media">
                    <img src={cat.heroImage} alt={cat.name} loading="lazy" />
                    <div className="hub-cat-badge">
                      <Icon aria-hidden="true" />
                      <span>{catProds.length} Model{catProds.length === 1 ? '' : 's'}</span>
                    </div>
                  </div>
                  <div className="hub-cat-card-body">
                    <h3>{cat.name}</h3>
                    <p className="hub-cat-tagline">{cat.tagline}</p>
                    <div className="hub-cat-actions">
                      <a href={`/products/${cat.slug}`} className="button-link primary btn-sm">
                        <span>View Category</span>
                        <PiArrowRight aria-hidden="true" />
                      </a>
                      <button
                        type="button"
                        className="button-link ghost-dark btn-sm"
                        onClick={() => handleInquire(`${cat.name} Category Inquiry`)}
                      >
                        <span>Enquire</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Catalog & Filter Section */}
      <section className="section-cream catalog-section" id="catalog" aria-labelledby="catalog-title">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">Vehicle Catalog</p>
            <h2 id="catalog-title">Explore Purpose-Built Platforms</h2>
            <p className="section-subtitle">Filter by vehicle category, seating capacity, or payload duty cycle to find your exact fleet model.</p>
          </div>

          {/* Unified Filter Bar */}
          <div className="catalog-filters-bar">
            {/* Search Input */}
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

            {/* Filter Dropdowns Grid */}
            <div className="filter-dropdowns">
              {/* Vehicle Type Dropdown */}
              <div className="filter-select-wrap">
                <select
                  id="filter-category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  aria-label="Filter by Vehicle Category"
                >
                  <option value="all">All 5 Categories</option>
                  {productCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Seating Dropdown */}
              <div className="filter-select-wrap">
                <select
                  id="filter-seating"
                  value={seatingFilter}
                  onChange={(e) => setSeatingFilter(e.target.value)}
                  aria-label="Filter by Seating Capacity"
                >
                  <option value="all">All Seating</option>
                  <option value="1-2">1–2 Seats / Driver</option>
                  <option value="4-6">4–6 Seats</option>
                  <option value="8+">8+ / Large Group</option>
                </select>
              </div>

              {/* Payload Dropdown */}
              <div className="filter-select-wrap">
                <select
                  id="filter-load"
                  value={loadFilter}
                  onChange={(e) => setLoadFilter(e.target.value)}
                  aria-label="Filter by Payload Capacity"
                >
                  <option value="all">All Payloads</option>
                  <option value="standard">Standard Duty (&lt; 500kg)</option>
                  <option value="heavy">Heavy Duty (500kg – 3 Ton)</option>
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

                    {/* Spec Highlights Grid */}
                    <div className="catalog-spec-badges">
                      <div className="spec-badge">
                        <span className="spec-label">Motor</span>
                        <span className="spec-val">
                          {vehicle.specs?.power ? `${vehicle.specs.power.split(' ')[0]} ${vehicle.specs.power.split(' ')[1] || ''}` : 'Electric'}
                        </span>
                      </div>
                      <div className="spec-badge">
                        <span className="spec-label">Speed</span>
                        <span className="spec-val">{vehicle.specs?.topSpeed || '25 km/h'}</span>
                      </div>
                      <div className="spec-badge">
                        <span className="spec-label">Range</span>
                        <span className="spec-val">{vehicle.specs?.range ? `${vehicle.specs.range.split(' ')[0]} km` : '75 km'}</span>
                      </div>
                      <div className="spec-badge">
                        <span className="spec-label">Payload</span>
                        <span className="spec-val">
                          {vehicle.specs?.loadCapacity ? `${vehicle.specs.loadCapacity.split(' ')[0]} ${vehicle.specs.loadCapacity.split(' ')[1] || ''}` : vehicle.specs?.seatingCapacity?.split(' ')[0] + ' Seats' || 'Standard'}
                        </span>
                      </div>
                    </div>

                    <div className="catalog-card-actions">
                      <a href={`/products/${vehicle.slug}`} className="button-link primary btn-sm">
                        <span>View Specs &amp; Details</span>
                        <PiArrowRight aria-hidden="true" />
                      </a>
                      <button
                        type="button"
                        className="button-link ghost-dark btn-sm"
                        onClick={() => handleInquire(vehicle.name)}
                      >
                        <span>Enquire</span>
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
                From custom 900kg cargo flatbeds for FMCG giants like Ramdev Foods to specialized mobile ATM kiosks, sanitization tippers, food carts, and luxury heritage retrofits, SAVY engineers vehicles built entirely around your unique operational requirements.
              </p>
              <div className="custom-box-bullets">
                <div className="custom-bullet-item">
                  <PiCheckCircle aria-hidden="true" />
                  <span>Custom chassis length, payload capacity, and leaf spring ratings</span>
                </div>
                <div className="custom-bullet-item">
                  <PiCheckCircle aria-hidden="true" />
                  <span>Specialized superstructures: Tipper hoppers, insulated boxes &amp; SS water tanks</span>
                </div>
                <div className="custom-bullet-item">
                  <PiCheckCircle aria-hidden="true" />
                  <span>High-capacity Lithium Iron Phosphate (LFP) battery sizing for full-shift duty</span>
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
                <a href="/technology" className="button-link ghost">
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
                  <strong>Chassis &amp; Body:</strong> CAD modeling, FEA simulation &amp; precision robotic welding.
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
