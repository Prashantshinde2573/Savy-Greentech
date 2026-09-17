import { useEffect, useState, useRef } from 'react';
import {
  PiArrowRight,
  PiCaretDown,
  PiCaretRight,
  PiList,
  PiX,
  PiCar,
  PiTruck,
  PiTrash,
  PiUsers,
  PiGear,
  PiClockCountdown,
  PiLeaf
} from 'react-icons/pi';

export function SiteHeader({ currentPath = '', transparentInitially = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'products' | 'applications' | 'technology' | 'company' | null
  const [activeProductTab, setActiveProductTab] = useState('all');
  const [headerScrolled, setHeaderScrolled] = useState(!transparentInitially);
  const headerRef = useRef(null);

  useEffect(() => {
    if (!transparentInitially) {
      setHeaderScrolled(true);
      return;
    }
    const updateHeader = () => setHeaderScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, [transparentInitially]);

  // Close menus on resize
  useEffect(() => {
    const handleResize = () => {
      if (!window.matchMedia('(max-width: 960px)').matches) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isCurrent = (path) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  const isCategoryActive = (category) => {
    if (category === 'products' && currentPath.startsWith('/products')) return true;
    if (category === 'applications' && currentPath.startsWith('/applications')) return true;
    if (category === 'technology' && currentPath.startsWith('/technology')) return true;
    if (
      category === 'company' &&
      (currentPath.startsWith('/about') ||
        currentPath.startsWith('/sustainability') ||
        currentPath.startsWith('/case-studies') ||
        currentPath.startsWith('/media') ||
        currentPath.startsWith('/careers') ||
        currentPath.startsWith('/blog'))
    ) {
      return true;
    }
    return false;
  };

  const isScrolledOrActive = headerScrolled || openDropdown !== null || menuOpen;

  const handleDropdownToggle = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleMouseEnter = (name) => {
    if (!window.matchMedia('(max-width: 960px)').matches) {
      setOpenDropdown(name);
    }
  };

  const handleMouseLeave = () => {
    if (!window.matchMedia('(max-width: 960px)').matches) {
      setOpenDropdown(null);
    }
  };

  const closeAllMenus = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header
      ref={headerRef}
      className={`site-header ${isScrolledOrActive ? 'scrolled' : ''} ${openDropdown ? 'menu-active' : ''}`}
    >
      <div className="container nav-shell">
        <a
          className={`brand brand-lockup ${!isScrolledOrActive ? 'inverse' : ''}`}
          href="/"
          aria-label="SAVYGREENTECH home"
          onClick={closeAllMenus}
        >
          <img
            src={!isScrolledOrActive ? '/assets/SG-logo-white.png' : '/assets/SG-logo-black.png'}
            alt="SAVYGREENTECH"
          />
        </a>

        <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Primary navigation">
          {/* 1. Home */}
          <a className={isCurrent('/') ? 'active' : ''} href="/" onClick={closeAllMenus}>
            Home
          </a>

          {/* 2. Products Dropdown — Interactive Visual Tabbed Mega Menu */}
          <div
            className="nav-dropdown-trigger vehicle-menu-trigger"
            onMouseEnter={() => handleMouseEnter('products')}
            onMouseLeave={handleMouseLeave}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setOpenDropdown(null);
            }}
          >
            <button
              type="button"
              className={`dropdown-nav-button vehicle-nav-button ${isCategoryActive('products') ? 'active' : ''}`}
              aria-expanded={openDropdown === 'products'}
              onClick={() => handleDropdownToggle('products')}
            >
              <span>Products</span> <PiCaretDown aria-hidden="true" />
            </button>

            <div className={`tabbed-mega-menu vehicle-mega ${openDropdown === 'products' ? 'open' : ''}`}>
              <div className="tabbed-mega-container">
                {/* Left Interactive Sidebar */}
                <aside className="tabbed-sidebar">
                  <div className="tabbed-sidebar-nav">
                    <button
                      type="button"
                      className={`tabbed-nav-btn ${activeProductTab === 'all' ? 'active' : ''}`}
                      onMouseEnter={() => setActiveProductTab('all')}
                      onClick={() => setActiveProductTab('all')}
                    >
                      <PiCar className="tab-icon" />
                      <span>All Vehicles</span>
                      <PiCaretRight className="tab-arrow" />
                    </button>
                    <button
                      type="button"
                      className={`tabbed-nav-btn ${activeProductTab === 'golf' ? 'active' : ''}`}
                      onMouseEnter={() => setActiveProductTab('golf')}
                      onClick={() => setActiveProductTab('golf')}
                    >
                      <PiCar className="tab-icon" />
                      <span>Golf Carts</span>
                      <PiCaretRight className="tab-arrow" />
                    </button>
                    <button
                      type="button"
                      className={`tabbed-nav-btn ${activeProductTab === 'loading' ? 'active' : ''}`}
                      onMouseEnter={() => setActiveProductTab('loading')}
                      onClick={() => setActiveProductTab('loading')}
                    >
                      <PiTruck className="tab-icon" />
                      <span>Loading Rickshaws</span>
                      <PiCaretRight className="tab-arrow" />
                    </button>
                    <button
                      type="button"
                      className={`tabbed-nav-btn ${activeProductTab === 'garbage' ? 'active' : ''}`}
                      onMouseEnter={() => setActiveProductTab('garbage')}
                      onClick={() => setActiveProductTab('garbage')}
                    >
                      <PiTrash className="tab-icon" />
                      <span>Garbage Collection</span>
                      <PiCaretRight className="tab-arrow" />
                    </button>
                    <button
                      type="button"
                      className={`tabbed-nav-btn ${activeProductTab === 'passenger' ? 'active' : ''}`}
                      onMouseEnter={() => setActiveProductTab('passenger')}
                      onClick={() => setActiveProductTab('passenger')}
                    >
                      <PiUsers className="tab-icon" />
                      <span>Passenger Vehicles</span>
                      <PiCaretRight className="tab-arrow" />
                    </button>
                    <button
                      type="button"
                      className={`tabbed-nav-btn ${activeProductTab === 'custom' ? 'active' : ''}`}
                      onMouseEnter={() => setActiveProductTab('custom')}
                      onClick={() => setActiveProductTab('custom')}
                    >
                      <PiGear className="tab-icon" />
                      <span>Custom / Industrial</span>
                      <PiCaretRight className="tab-arrow" />
                    </button>
                    <button
                      type="button"
                      className={`tabbed-nav-btn ${activeProductTab === 'upcoming' ? 'active' : ''}`}
                      onMouseEnter={() => setActiveProductTab('upcoming')}
                      onClick={() => setActiveProductTab('upcoming')}
                    >
                      <PiClockCountdown className="tab-icon" />
                      <span>Upcoming Vehicles</span>
                      <PiCaretRight className="tab-arrow" />
                    </button>
                  </div>

                  <div className="tabbed-brand-card">
                    <PiLeaf className="brand-card-watermark" />
                    <p className="brand-card-tag">BUILT FOR A</p>
                    <h4 className="brand-card-heading">Greener Tomorrow</h4>
                    <p className="brand-card-text">
                      Purpose-built electric mobility for a cleaner, smarter world.
                    </p>
                  </div>
                </aside>

                {/* Right Interactive Content Area (Replaces content based on active tab) */}
                <div className="tabbed-content-area">
                  {/* TAB: ALL VEHICLES */}
                  {activeProductTab === 'all' && (
                    <div className="tab-pane active-pane">
                      <div className="pane-header">
                        <div>
                          <p className="pane-eyebrow">SAVY ELECTRIC VEHICLES</p>
                          <h3 className="pane-title">All Vehicle Categories</h3>
                        </div>
                        <a href="/products" className="pane-header-pill" onClick={closeAllMenus}>
                          <span>View All Vehicles</span>
                          <PiArrowRight />
                        </a>
                      </div>

                      <div className="all-vehicles-grid">
                        <div
                          className="overview-card"
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={() => setActiveProductTab('golf')}
                          onClick={() => setActiveProductTab('golf')}
                        >
                          <div className="overview-card-img">
                            <img src="/assets/classic-golf.jpeg" alt="Golf Carts" />
                          </div>
                          <span className="overview-card-label">Golf Carts</span>
                        </div>

                        <div
                          className="overview-card"
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={() => setActiveProductTab('loading')}
                          onClick={() => setActiveProductTab('loading')}
                        >
                          <div className="overview-card-img">
                            <img src="/assets/electruck.jpg" alt="Loading Rickshaws" />
                          </div>
                          <span className="overview-card-label">Loading Rickshaws</span>
                        </div>

                        <div
                          className="overview-card"
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={() => setActiveProductTab('garbage')}
                          onClick={() => setActiveProductTab('garbage')}
                        >
                          <div className="overview-card-img">
                            <img src="/assets/dump-truck.jpg" alt="Garbage Collection" />
                          </div>
                          <span className="overview-card-label">Garbage Collection</span>
                        </div>

                        <div
                          className="overview-card"
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={() => setActiveProductTab('passenger')}
                          onClick={() => setActiveProductTab('passenger')}
                        >
                          <div className="overview-card-img">
                            <img src="/assets/tuk-tuk.jpg" alt="Passenger Vehicles" />
                          </div>
                          <span className="overview-card-label">Passenger Vehicles</span>
                        </div>

                        <div
                          className="overview-card"
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={() => setActiveProductTab('custom')}
                          onClick={() => setActiveProductTab('custom')}
                        >
                          <div className="overview-card-img">
                            <img src="/assets/vintage-elite.jpg" alt="Custom / Industrial" />
                          </div>
                          <span className="overview-card-label">Custom / Industrial</span>
                        </div>

                        <div
                          className="overview-card"
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={() => setActiveProductTab('upcoming')}
                          onClick={() => setActiveProductTab('upcoming')}
                        >
                          <div className="overview-card-img">
                            <img src="/assets/coming-soon-vehicle.png" alt="Upcoming Vehicles" />
                          </div>
                          <span className="overview-card-label">Upcoming Vehicles</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB: GOLF CARTS */}
                  {activeProductTab === 'golf' && (
                    <div className="tab-pane active-pane">
                      <div className="pane-header">
                        <div>
                          <p className="pane-eyebrow">CAMPUS &amp; RESORT MOBILITY</p>
                          <h3 className="pane-title">Golf Carts</h3>
                        </div>
                        <a href="/products" className="pane-header-pill" onClick={closeAllMenus}>
                          <span>View All Golf Carts</span>
                          <PiArrowRight />
                        </a>
                      </div>

                      <div className="product-cards-tab-grid product-grid-3">
                        <a href="/products/classic-golf" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/classic-golf.jpeg" alt="Classic Golf" />
                          </div>
                          <strong className="product-tab-card-title">Classic Golf</strong>
                          <span className="product-tab-card-sub">High-efficiency 2 to 8-seater campus transit cart</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>

                        <a href="/products/club-cart" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/club-cart.jpg" alt="Club Cart" />
                          </div>
                          <strong className="product-tab-card-title">Club Cart</strong>
                          <span className="product-tab-card-sub">Luxury executive resort and VIP guest vehicle</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>

                        <a href="/products/vintage-elite" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/vintage-elite.jpg" alt="Elite Vintage Cart" />
                          </div>
                          <strong className="product-tab-card-title">Elite Vintage Cart</strong>
                          <span className="product-tab-card-sub">Timeless heritage aesthetic with electric powertrain</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* TAB: LOADING RICKSHAWS */}
                  {activeProductTab === 'loading' && (
                    <div className="tab-pane active-pane">
                      <div className="pane-header">
                        <div>
                          <p className="pane-eyebrow">COMMERCIAL CARGO</p>
                          <h3 className="pane-title">Loading Rickshaws</h3>
                        </div>
                        <a href="/products" className="pane-header-pill" onClick={closeAllMenus}>
                          <span>View All Loading Rickshaws</span>
                          <PiArrowRight />
                        </a>
                      </div>

                      <div className="product-cards-tab-grid product-grid-3">
                        <a href="/products/electruck" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/electruck.jpg" alt="Electruck Standard" />
                          </div>
                          <strong className="product-tab-card-title">Electruck Standard</strong>
                          <span className="product-tab-card-sub">Heavy-duty commercial cargo 3-wheeler</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>

                        <a href="/products/electruck" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/electruck.jpg" alt="Nano Compact Loader" />
                          </div>
                          <strong className="product-tab-card-title">Nano Compact Loader</strong>
                          <span className="product-tab-card-sub">Agile inner-facility materials and package delivery</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>

                        <a href="/products/electruck" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/electruck.jpg" alt="DLX High-Deck Loader" />
                          </div>
                          <strong className="product-tab-card-title">DLX High-Deck Loader</strong>
                          <span className="product-tab-card-sub">High-volume freight deck for FMCG &amp; laundry</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* TAB: GARBAGE COLLECTION */}
                  {activeProductTab === 'garbage' && (
                    <div className="tab-pane active-pane">
                      <div className="pane-header">
                        <div>
                          <p className="pane-eyebrow">MUNICIPAL SANITATION</p>
                          <h3 className="pane-title">Garbage Collection Vehicles</h3>
                        </div>
                        <a href="/products" className="pane-header-pill" onClick={closeAllMenus}>
                          <span>View All Garbage Vehicles</span>
                          <PiArrowRight />
                        </a>
                      </div>

                      <div className="product-cards-tab-grid product-grid-2">
                        <a href="/products/dump-truck" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/dump-truck.jpg" alt="Dual Compartment Tipper" />
                          </div>
                          <strong className="product-tab-card-title">Dual Compartment Waste Tipper</strong>
                          <span className="product-tab-card-sub">Segregated wet &amp; dry collection for Swachh Bharat</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>

                        <a href="/products/dump-truck" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/dump-truck.jpg" alt="Hydraulic Tipper" />
                          </div>
                          <strong className="product-tab-card-title">Hydraulic High-Lift Tipper</strong>
                          <span className="product-tab-card-sub">Electro-hydraulic tipping bin for municipal disposal</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* TAB: PASSENGER VEHICLES */}
                  {activeProductTab === 'passenger' && (
                    <div className="tab-pane active-pane">
                      <div className="pane-header">
                        <div>
                          <p className="pane-eyebrow">PASSENGER &amp; STUDENT TRANSIT</p>
                          <h3 className="pane-title">Passenger Vehicles</h3>
                        </div>
                        <a href="/products" className="pane-header-pill" onClick={closeAllMenus}>
                          <span>View All Passenger Vehicles</span>
                          <PiArrowRight />
                        </a>
                      </div>

                      <div className="product-cards-tab-grid product-grid-4">
                        <a href="/products/school-rickshaw" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/tuk-tuk.jpg" alt="School Rickshaw" />
                          </div>
                          <strong className="product-tab-card-title">School Rickshaw</strong>
                          <span className="product-tab-card-sub">Child-safe speed-governed student transport</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>

                        <a href="/products/tuk-tuk-e" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/tuk-tuk.jpg" alt="Passenger Rickshaw" />
                          </div>
                          <strong className="product-tab-card-title">Passenger Rickshaw (Tuk Tuk ë)</strong>
                          <span className="product-tab-card-sub">Approved 4+1 on-road passenger 3-wheeler</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>

                        <a href="/products/food-cart-rickshaw" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/electruck.jpg" alt="Rickshaw Food Cart" />
                          </div>
                          <strong className="product-tab-card-title">Rickshaw Food Cart</strong>
                          <span className="product-tab-card-sub">Mobile retail and food dispensing station</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>

                        <a href="/products/vintage-elite" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/vintage-elite.jpg" alt="Electric Vintage Car" />
                          </div>
                          <strong className="product-tab-card-title">Electric Vintage Car</strong>
                          <span className="product-tab-card-sub">VIP campus and destination wedding transport</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* TAB: CUSTOM / INDUSTRIAL */}
                  {activeProductTab === 'custom' && (
                    <div className="tab-pane active-pane">
                      <div className="pane-header">
                        <div>
                          <p className="pane-eyebrow">SPECIALIZED BUILDS</p>
                          <h3 className="pane-title">Custom / Industrial Vehicles</h3>
                        </div>
                        <a href="/products" className="pane-header-pill" onClick={closeAllMenus}>
                          <span>View All Custom Vehicles</span>
                          <PiArrowRight />
                        </a>
                      </div>

                      <div className="product-cards-tab-grid product-grid-4">
                        <a href="/products/electruck" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/electruck.jpg" alt="Electruck Heavy Cargo" />
                          </div>
                          <strong className="product-tab-card-title">Electruck Heavy Cargo</strong>
                          <span className="product-tab-card-sub">Reinforced factory and industrial platform</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>

                        <a href="/products/custom-electruck-900kg" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/electruck.jpg" alt="Ramdev Foods 900kg Build" />
                          </div>
                          <strong className="product-tab-card-title">Ramdev Foods 900kg Build</strong>
                          <span className="product-tab-card-sub">Custom reinforced heavy factory hauler</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>

                        <a href="/products/atm-vehicle" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/electruck.jpg" alt="Mobile ATM Vehicle" />
                          </div>
                          <strong className="product-tab-card-title">Mobile ATM Vehicle</strong>
                          <span className="product-tab-card-sub">Secure mobile banking and cash distribution</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>

                        <a href="/products/milk-cart" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/electruck.jpg" alt="Dairy & Milk Cart" />
                          </div>
                          <strong className="product-tab-card-title">Dairy &amp; Milk Cart</strong>
                          <span className="product-tab-card-sub">Insulated crate distribution vehicle</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* TAB: UPCOMING VEHICLES */}
                  {activeProductTab === 'upcoming' && (
                    <div className="tab-pane active-pane">
                      <div className="pane-header">
                        <div>
                          <p className="pane-eyebrow">NEXT-GEN CONCEPTS</p>
                          <h3 className="pane-title">Upcoming Vehicles</h3>
                        </div>
                        <a href="/products" className="pane-header-pill" onClick={closeAllMenus}>
                          <span>View All Upcoming Vehicles</span>
                          <PiArrowRight />
                        </a>
                      </div>

                      <div className="product-cards-tab-grid product-grid-2">
                        <a href="/products/city-pod" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/coming-soon-vehicle.png" alt="SAVY City Pod" />
                          </div>
                          <strong className="product-tab-card-title">SAVY City Pod</strong>
                          <span className="product-tab-card-sub">Amsterdam E-Mobility Expo international debut</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>

                        <a href="/products/city-pod" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/coming-soon-vehicle.png" alt="Electric Mini Bus Shuttle" />
                          </div>
                          <strong className="product-tab-card-title">Electric Mini Bus Shuttle</strong>
                          <span className="product-tab-card-sub">High-capacity zero-emission campus shuttle</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Applications (Direct Link) */}
          <a
            className={isCurrent('/applications') ? 'active' : ''}
            href="/applications"
            onClick={closeAllMenus}
          >
            Applications
          </a>

          {/* 4. Technology (Direct Link) */}
          <a
            className={isCurrent('/technology') ? 'active' : ''}
            href="/technology"
            onClick={closeAllMenus}
          >
            Technology
          </a>

          {/* 5. Company Dropdown — Clean Editorial Visual Dropdown */}
          <div
            className="nav-dropdown-trigger vehicle-menu-trigger"
            onMouseEnter={() => handleMouseEnter('company')}
            onMouseLeave={handleMouseLeave}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setOpenDropdown(null);
            }}
          >
            <button
              type="button"
              className={`dropdown-nav-button vehicle-nav-button ${isCategoryActive('company') ? 'active' : ''}`}
              aria-expanded={openDropdown === 'company'}
              onClick={() => handleDropdownToggle('company')}
            >
              <span>Company</span> <PiCaretDown aria-hidden="true" />
            </button>

            <div className={`clean-visual-dropdown vehicle-mega ${openDropdown === 'company' ? 'open' : ''}`}>
              <div className="container clean-dropdown-shell">
                <div className="clean-dropdown-grid clean-grid-6">
                  <a href="/about" className="clean-card" onClick={closeAllMenus}>
                    <div className="clean-card-img">
                      <img src="/assets/team/chandan-mundhra.jpg" alt="About Us" />
                    </div>
                    <strong className="clean-card-title">About Us</strong>
                    <span className="clean-card-sub">Founding story, timeline &amp; leadership</span>
                    <span className="clean-card-link-text">View story <PiArrowRight /></span>
                  </a>

                  <a href="/sustainability" className="clean-card" onClick={closeAllMenus}>
                    <div className="clean-card-img">
                      <img src="/assets/about-purpose/electric-future.jpg" alt="Sustainability / ESG" />
                    </div>
                    <strong className="clean-card-title">Sustainability / ESG</strong>
                    <span className="clean-card-sub">One Vehicle, One Tree &amp; carbon metrics</span>
                    <span className="clean-card-link-text">View impact <PiArrowRight /></span>
                  </a>

                  <a href="/case-studies" className="clean-card" onClick={closeAllMenus}>
                    <div className="clean-card-img">
                      <img src="/assets/news/ads-foundation-partnership.png" alt="Case Studies" />
                    </div>
                    <strong className="clean-card-title">Case Studies</strong>
                    <span className="clean-card-sub">Proven deployments across India</span>
                    <span className="clean-card-link-text">View cases <PiArrowRight /></span>
                  </a>

                  <a href="/media" className="clean-card" onClick={closeAllMenus}>
                    <div className="clean-card-img">
                      <img src="/assets/news/city-pod-netherlands.jpg" alt="Media & Press" />
                    </div>
                    <strong className="clean-card-title">Media &amp; Press</strong>
                    <span className="clean-card-sub">News coverage &amp; Amsterdam expo</span>
                    <span className="clean-card-link-text">View news <PiArrowRight /></span>
                  </a>

                  <a href="/careers" className="clean-card" onClick={closeAllMenus}>
                    <div className="clean-card-img">
                      <img src="/assets/team/dhawal-soni.jpg" alt="Careers" />
                    </div>
                    <strong className="clean-card-title">Careers</strong>
                    <span className="clean-card-sub">Join our engineering &amp; plant team</span>
                    <span className="clean-card-link-text">View roles <PiArrowRight /></span>
                  </a>

                  <a href="/blog" className="clean-card" onClick={closeAllMenus}>
                    <div className="clean-card-img">
                      <img src="/assets/about-purpose/sustainability.jpg" alt="Blog & Insights" />
                    </div>
                    <strong className="clean-card-title">Blog / Insights</strong>
                    <span className="clean-card-sub">Commercial EV economics &amp; TCO</span>
                    <span className="clean-card-link-text">Read blog <PiArrowRight /></span>
                  </a>
                </div>

                <div className="clean-dropdown-footer">
                  <a href="/about" className="clean-footer-cta" onClick={closeAllMenus}>
                    <span>Learn More About SAVY Greentech</span>
                    <PiArrowRight />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 6. Become a Dealer */}
          <a
            className={isCurrent('/become-a-dealer') ? 'active' : ''}
            href="/become-a-dealer"
            onClick={closeAllMenus}
          >
            Become a Dealer
          </a>

          {/* 7. Top-level CTA: Get in Touch */}
          <a className="button-link primary nav-cta" href="/contact" onClick={closeAllMenus}>
            <span>Get in Touch</span>
            <PiArrowRight aria-hidden="true" />
          </a>
        </nav>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        >
          {menuOpen ? <PiX /> : <PiList />}
        </button>
      </div>
    </header>
  );
}

export const GlobalNavbar = SiteHeader;
