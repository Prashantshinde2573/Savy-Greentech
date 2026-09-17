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
                          <h3 className="pane-title">Purpose-Built for a Cleaner, Smarter Tomorrow</h3>
                        </div>
                        <a href="/products" className="pane-header-pill" onClick={closeAllMenus}>
                          <span>View All Vehicles</span>
                          <PiArrowRight />
                        </a>
                      </div>

                      <div className="all-vehicles-grid">
                        <a href="/products/classic-golf" className="overview-card" onClick={closeAllMenus}>
                          <div className="overview-card-img">
                            <img src="/assets/classic-golf.jpeg" alt="Golf Carts" />
                          </div>
                          <span className="overview-card-label">Golf Carts</span>
                        </a>

                        <a href="/products/electruck" className="overview-card" onClick={closeAllMenus}>
                          <div className="overview-card-img">
                            <img src="/assets/electruck.jpg" alt="Loading Rickshaws" />
                          </div>
                          <span className="overview-card-label">Loading Rickshaws</span>
                        </a>

                        <a href="/products/dump-truck" className="overview-card" onClick={closeAllMenus}>
                          <div className="overview-card-img">
                            <img src="/assets/dump-truck.jpg" alt="Garbage Collection" />
                          </div>
                          <span className="overview-card-label">Garbage Collection</span>
                        </a>

                        <a href="/products/tuk-tuk-e" className="overview-card" onClick={closeAllMenus}>
                          <div className="overview-card-img">
                            <img src="/assets/tuk-tuk.jpg" alt="Passenger Vehicles" />
                          </div>
                          <span className="overview-card-label">Passenger Vehicles</span>
                        </a>

                        <a href="/products/custom-electruck-900kg" className="overview-card" onClick={closeAllMenus}>
                          <div className="overview-card-img">
                            <img src="/assets/vintage-elite.jpg" alt="Custom / Industrial" />
                          </div>
                          <span className="overview-card-label">Custom / Industrial</span>
                        </a>

                        <a href="/products/city-pod" className="overview-card" onClick={closeAllMenus}>
                          <div className="overview-card-img">
                            <img src="/assets/coming-soon-vehicle.png" alt="Upcoming Vehicles" />
                          </div>
                          <span className="overview-card-label">Upcoming Vehicles</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* TAB: GOLF CARTS */}
                  {activeProductTab === 'golf' && (
                    <div className="tab-pane active-pane single-cat-pane">
                      <div className="single-cat-layout">
                        <div className="single-cat-media">
                          <img src="/assets/classic-golf.jpeg" alt="Golf Carts" />
                        </div>
                        <div className="single-cat-details">
                          <p className="pane-eyebrow">CAMPUS &amp; RESORT MOBILITY</p>
                          <h3 className="single-cat-title">Golf Carts</h3>
                          <p className="single-cat-desc">
                            Silent, comfortable 2 to 8-seater electric carts engineered for resorts, universities, airports, and luxury VIP campus transit.
                          </p>
                          <ul className="single-cat-list">
                            <li><a href="/products/classic-golf" onClick={closeAllMenus}>Golf Carts (Classic &amp; Club)</a></li>
                            <li><a href="/products/vintage-elite" onClick={closeAllMenus}>Elite Vintage Cart</a></li>
                            <li><a href="/products/club-cart" onClick={closeAllMenus}>Electric Club Cart</a></li>
                            <li><a href="/products/classic-golf" onClick={closeAllMenus}>Custom Seating &amp; Cargo Carts</a></li>
                          </ul>
                          <a href="/products/classic-golf" className="single-cat-cta-btn" onClick={closeAllMenus}>
                            <span>View Golf Carts</span>
                            <PiArrowRight />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB: LOADING RICKSHAWS */}
                  {activeProductTab === 'loading' && (
                    <div className="tab-pane active-pane single-cat-pane">
                      <div className="single-cat-layout">
                        <div className="single-cat-media">
                          <img src="/assets/electruck.jpg" alt="Loading Rickshaws" />
                        </div>
                        <div className="single-cat-details">
                          <p className="pane-eyebrow">COMMERCIAL CARGO</p>
                          <h3 className="single-cat-title">Loading Rickshaws</h3>
                          <p className="single-cat-desc">
                            Heavy-duty three-wheel electric cargo vehicles designed for FMCG delivery, internal factory logistics, laundry services, and urban freight.
                          </p>
                          <ul className="single-cat-list">
                            <li><a href="/products/electruck" onClick={closeAllMenus}>Electruck Standard Loader</a></li>
                            <li><a href="/products/electruck" onClick={closeAllMenus}>Nano Compact Loader</a></li>
                            <li><a href="/products/classic-golf" onClick={closeAllMenus}>Golf Loader Cart</a></li>
                            <li><a href="/products/electruck" onClick={closeAllMenus}>DLX High-Deck Loader</a></li>
                          </ul>
                          <a href="/products/electruck" className="single-cat-cta-btn" onClick={closeAllMenus}>
                            <span>View Loading Rickshaws</span>
                            <PiArrowRight />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB: GARBAGE COLLECTION */}
                  {activeProductTab === 'garbage' && (
                    <div className="tab-pane active-pane single-cat-pane">
                      <div className="single-cat-layout">
                        <div className="single-cat-media">
                          <img src="/assets/dump-truck.jpg" alt="Garbage Collection" />
                        </div>
                        <div className="single-cat-details">
                          <p className="pane-eyebrow">MUNICIPAL SANITATION</p>
                          <h3 className="single-cat-title">Garbage Collection Vehicles</h3>
                          <p className="single-cat-desc">
                            Purpose-built electric waste collection tippers supporting Swachh Bharat missions across municipalities, smart cities, and Gram Panchayats.
                          </p>
                          <ul className="single-cat-list">
                            <li><a href="/products/dump-truck" onClick={closeAllMenus}>Dual Compartment Waste Tipper</a></li>
                            <li><a href="/products/dump-truck" onClick={closeAllMenus}>Hydraulic High-Lift Tipper</a></li>
                            <li><a href="/products/dump-truck" onClick={closeAllMenus}>Wet &amp; Dry Segregated Tipper</a></li>
                          </ul>
                          <a href="/products/dump-truck" className="single-cat-cta-btn" onClick={closeAllMenus}>
                            <span>View Garbage Vehicles</span>
                            <PiArrowRight />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB: PASSENGER VEHICLES */}
                  {activeProductTab === 'passenger' && (
                    <div className="tab-pane active-pane single-cat-pane">
                      <div className="single-cat-layout">
                        <div className="single-cat-media">
                          <img src="/assets/tuk-tuk.jpg" alt="Passenger Vehicles" />
                        </div>
                        <div className="single-cat-details">
                          <p className="pane-eyebrow">PASSENGER &amp; STUDENT TRANSIT</p>
                          <h3 className="single-cat-title">Passenger &amp; Other Vehicles</h3>
                          <p className="single-cat-desc">
                            Safe, approved electric passenger mobility solutions ranging from child-safe school rickshaws to mobile retail food carts.
                          </p>
                          <ul className="single-cat-list">
                            <li><a href="/products/school-rickshaw" onClick={closeAllMenus}>Electric School Rickshaw (Child-Safe)</a></li>
                            <li><a href="/products/tuk-tuk-e" onClick={closeAllMenus}>Passenger Rickshaw (Tuk Tuk ë — 2+1 to 8+1)</a></li>
                            <li><a href="/products/food-cart-rickshaw" onClick={closeAllMenus}>Rickshaw Food Cart</a></li>
                            <li><a href="/products/vintage-elite" onClick={closeAllMenus}>Electric Vintage Car</a></li>
                          </ul>
                          <a href="/products/tuk-tuk-e" className="single-cat-cta-btn" onClick={closeAllMenus}>
                            <span>View Passenger Vehicles</span>
                            <PiArrowRight />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB: CUSTOM / INDUSTRIAL */}
                  {activeProductTab === 'custom' && (
                    <div className="tab-pane active-pane single-cat-pane">
                      <div className="single-cat-layout">
                        <div className="single-cat-media">
                          <img src="/assets/vintage-elite.jpg" alt="Custom Builds" />
                        </div>
                        <div className="single-cat-details">
                          <p className="pane-eyebrow">SPECIALIZED BUILDS</p>
                          <h3 className="single-cat-title">Custom / Industrial Vehicles</h3>
                          <p className="single-cat-desc">
                            Engineered from the ground up for specific operational duty cycles, heavy payload requirements, and custom client superstructures.
                          </p>
                          <ul className="single-cat-list">
                            <li><a href="/products/electruck" onClick={closeAllMenus}>Electruck Heavy Cargo</a></li>
                            <li><a href="/products/custom-electruck-900kg" onClick={closeAllMenus}>Ramdev Foods 900kg Custom Build</a></li>
                            <li><a href="/products/custom-electruck-900kg" onClick={closeAllMenus}>Mobile ATM Banking Vehicle</a></li>
                            <li><a href="/products/custom-electruck-900kg" onClick={closeAllMenus}>Dairy &amp; Milk Distribution Cart</a></li>
                          </ul>
                          <a href="/products/custom-electruck-900kg" className="single-cat-cta-btn" onClick={closeAllMenus}>
                            <span>View Custom Builds</span>
                            <PiArrowRight />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB: UPCOMING VEHICLES */}
                  {activeProductTab === 'upcoming' && (
                    <div className="tab-pane active-pane single-cat-pane">
                      <div className="single-cat-layout">
                        <div className="single-cat-media">
                          <img src="/assets/coming-soon-vehicle.png" alt="Upcoming Vehicles" />
                        </div>
                        <div className="single-cat-details">
                          <p className="pane-eyebrow">NEXT-GEN CONCEPTS</p>
                          <h3 className="single-cat-title">Upcoming Vehicles</h3>
                          <p className="single-cat-desc">
                            Next-generation electric mobility concepts designed for sustainable global tourism and modern smart city transit.
                          </p>
                          <ul className="single-cat-list">
                            <li><a href="/products/city-pod" onClick={closeAllMenus}>City Pod (Amsterdam E-Mobility Expo Debut)</a></li>
                            <li><a href="/products/city-pod" onClick={closeAllMenus}>Electric Mini Bus Shuttle</a></li>
                          </ul>
                          <a href="/products/city-pod" className="single-cat-cta-btn" onClick={closeAllMenus}>
                            <span>View Upcoming Vehicles</span>
                            <PiArrowRight />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Applications Dropdown — Clean Visual Card Grid */}
          <div
            className="nav-dropdown-trigger vehicle-menu-trigger"
            onMouseEnter={() => handleMouseEnter('applications')}
            onMouseLeave={handleMouseLeave}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setOpenDropdown(null);
            }}
          >
            <button
              type="button"
              className={`dropdown-nav-button vehicle-nav-button ${isCategoryActive('applications') ? 'active' : ''}`}
              aria-expanded={openDropdown === 'applications'}
              onClick={() => handleDropdownToggle('applications')}
            >
              <span>Applications</span> <PiCaretDown aria-hidden="true" />
            </button>

            <div className={`clean-visual-dropdown vehicle-mega ${openDropdown === 'applications' ? 'open' : ''}`}>
              <div className="container clean-dropdown-shell">
                <div className="clean-dropdown-grid clean-grid-6">
                  <a href="/applications#municipal-government" className="clean-card" onClick={closeAllMenus}>
                    <div className="clean-card-img">
                      <img src="/assets/applications/government.jpg" alt="Municipal & Government" />
                    </div>
                    <strong className="clean-card-title">Municipal &amp; Government</strong>
                    <span className="clean-card-sub">Swachh Bharat &amp; civic services</span>
                    <span className="clean-card-link-text">Explore <PiArrowRight /></span>
                  </a>

                  <a href="/applications#hospitality-tourism" className="clean-card" onClick={closeAllMenus}>
                    <div className="clean-card-img">
                      <img src="/assets/applications/tourism.jpg" alt="Hospitality & Tourism" />
                    </div>
                    <strong className="clean-card-title">Hospitality &amp; Tourism</strong>
                    <span className="clean-card-sub">Resorts &amp; luxury guest mobility</span>
                    <span className="clean-card-link-text">Explore <PiArrowRight /></span>
                  </a>

                  <a href="/applications#healthcare" className="clean-card" onClick={closeAllMenus}>
                    <div className="clean-card-img">
                      <img src="/assets/applications/campus.jpg" alt="Healthcare & Hospitals" />
                    </div>
                    <strong className="clean-card-title">Healthcare &amp; Hospitals</strong>
                    <span className="clean-card-sub">Quiet patient &amp; campus transit</span>
                    <span className="clean-card-link-text">Explore <PiArrowRight /></span>
                  </a>

                  <a href="/applications#industrial-logistics" className="clean-card" onClick={closeAllMenus}>
                    <div className="clean-card-img">
                      <img src="/assets/applications/logistics.jpg" alt="Industrial & Logistics" />
                    </div>
                    <strong className="clean-card-title">Industrial &amp; Logistics</strong>
                    <span className="clean-card-sub">Factory cargo &amp; warehouse flow</span>
                    <span className="clean-card-link-text">Explore <PiArrowRight /></span>
                  </a>

                  <a href="/applications#defence-campuses" className="clean-card" onClick={closeAllMenus}>
                    <div className="clean-card-img">
                      <img src="/assets/applications/airport.jpg" alt="Defence & Institutional" />
                    </div>
                    <strong className="clean-card-title">Defence &amp; Institutional</strong>
                    <span className="clean-card-sub">Air bases &amp; university campuses</span>
                    <span className="clean-card-link-text">Explore <PiArrowRight /></span>
                  </a>

                  <a href="/applications#food-retail" className="clean-card" onClick={closeAllMenus}>
                    <div className="clean-card-img">
                      <img src="/assets/applications/community.jpg" alt="Food, Retail & FMCG" />
                    </div>
                    <strong className="clean-card-title">Food, Retail &amp; FMCG</strong>
                    <span className="clean-card-sub">Mobile vending &amp; last-mile delivery</span>
                    <span className="clean-card-link-text">Explore <PiArrowRight /></span>
                  </a>
                </div>

                <div className="clean-dropdown-footer">
                  <a href="/applications" className="clean-footer-cta" onClick={closeAllMenus}>
                    <span>View All Industry Applications &amp; Case Studies</span>
                    <PiArrowRight />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Technology Dropdown — Clean 4-Card Visual Dropdown */}
          <div
            className="nav-dropdown-trigger vehicle-menu-trigger"
            onMouseEnter={() => handleMouseEnter('technology')}
            onMouseLeave={handleMouseLeave}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setOpenDropdown(null);
            }}
          >
            <button
              type="button"
              className={`dropdown-nav-button vehicle-nav-button ${isCategoryActive('technology') ? 'active' : ''}`}
              aria-expanded={openDropdown === 'technology'}
              onClick={() => handleDropdownToggle('technology')}
            >
              <span>Technology</span> <PiCaretDown aria-hidden="true" />
            </button>

            <div className={`clean-visual-dropdown vehicle-mega ${openDropdown === 'technology' ? 'open' : ''}`}>
              <div className="container clean-dropdown-shell">
                <div className="clean-dropdown-grid clean-grid-4">
                  <a href="/technology" className="clean-card" onClick={closeAllMenus}>
                    <div className="clean-card-img">
                      <img src="/assets/process/customization-design.jpg" alt="Technology & Platform" />
                    </div>
                    <strong className="clean-card-title">Technology &amp; Powertrain</strong>
                    <span className="clean-card-sub">High-torque indigenous motors &amp; BMS</span>
                    <span className="clean-card-link-text">Learn more <PiArrowRight /></span>
                  </a>

                  <a href="/technology#manufacturing-process" className="clean-card" onClick={closeAllMenus}>
                    <div className="clean-card-img">
                      <img src="/assets/process/consultation-external.jpg" alt="In-House Manufacturing" />
                    </div>
                    <strong className="clean-card-title">In-House Manufacturing</strong>
                    <span className="clean-card-sub">5-stage design to assembly Ahmedabad plant</span>
                    <span className="clean-card-link-text">Learn more <PiArrowRight /></span>
                  </a>

                  <a href="/technology#quality-heading" className="clean-card" onClick={closeAllMenus}>
                    <div className="clean-card-img">
                      <img src="/assets/process/deployment-external.jpg" alt="Quality & Testing" />
                    </div>
                    <strong className="clean-card-title">Quality &amp; Testing</strong>
                    <span className="clean-card-sub">Rigorous dyno, gradient &amp; ARAI tests</span>
                    <span className="clean-card-link-text">Learn more <PiArrowRight /></span>
                  </a>

                  <a href="/technology#service-heading" className="clean-card" onClick={closeAllMenus}>
                    <div className="clean-card-img">
                      <img src="/assets/process/support-external.jpg" alt="After-Sales Service" />
                    </div>
                    <strong className="clean-card-title">After-Sales Service</strong>
                    <span className="clean-card-sub">Pan-India doorstep support &amp; genuine parts</span>
                    <span className="clean-card-link-text">Learn more <PiArrowRight /></span>
                  </a>
                </div>

                <div className="clean-dropdown-footer">
                  <a href="/technology" className="clean-footer-cta" onClick={closeAllMenus}>
                    <span>Explore Full Engineering &amp; Technology Stack</span>
                    <PiArrowRight />
                  </a>
                </div>
              </div>
            </div>
          </div>

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
