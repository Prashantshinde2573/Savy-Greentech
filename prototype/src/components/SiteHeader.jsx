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

const MOBILE_PRODUCT_CATEGORIES = [
  {
    id: 'golf',
    name: 'Golf Carts',
    icon: PiCar,
    categoryUrl: '/products',
    viewAllText: 'View All Golf Carts',
    products: [
      { name: 'Classic Golf', url: '/products/classic-golf' },
      { name: 'Club Cart', url: '/products/club-cart' },
      { name: 'Elite Vintage Cart', url: '/products/vintage-elite' }
    ]
  },
  {
    id: 'loading',
    name: 'Loading Rickshaws',
    icon: PiTruck,
    categoryUrl: '/products',
    viewAllText: 'View All Loading Rickshaws',
    products: [
      { name: 'Electruck Standard', url: '/products/electruck' },
      { name: 'Nano Compact Loader', url: '/products/electruck' },
      { name: 'DLX High-Deck Loader', url: '/products/electruck' }
    ]
  },
  {
    id: 'garbage',
    name: 'Garbage Collection',
    icon: PiTrash,
    categoryUrl: '/products',
    viewAllText: 'View All Garbage Vehicles',
    products: [
      { name: 'Dual Compartment Waste Tipper', url: '/products/dump-truck' },
      { name: 'Hydraulic High-Lift Tipper', url: '/products/dump-truck' }
    ]
  },
  {
    id: 'passenger',
    name: 'Passenger Vehicles',
    icon: PiUsers,
    categoryUrl: '/products',
    viewAllText: 'View All Passenger Vehicles',
    products: [
      { name: 'School Rickshaw', url: '/products/school-rickshaw' },
      { name: 'Passenger Rickshaw (Tuk Tuk ë)', url: '/products/tuk-tuk-e' },
      { name: 'Rickshaw Food Cart', url: '/products/food-cart-rickshaw' },
      { name: 'Electric Vintage Car', url: '/products/vintage-elite' }
    ]
  },
  {
    id: 'custom',
    name: 'Custom / Industrial',
    icon: PiGear,
    categoryUrl: '/products',
    viewAllText: 'View All Custom Vehicles',
    products: [
      { name: 'Electruck Heavy Cargo', url: '/products/electruck' },
      { name: 'Ramdev Foods 900kg Build', url: '/products/custom-electruck-900kg' },
      { name: 'Mobile ATM Vehicle', url: '/products/atm-vehicle' },
      { name: 'Dairy & Milk Cart', url: '/products/milk-cart' }
    ]
  },
  {
    id: 'upcoming',
    name: 'Upcoming Vehicles',
    icon: PiClockCountdown,
    categoryUrl: '/products',
    viewAllText: 'View All Upcoming Vehicles',
    products: [
      { name: 'SAVY City Pod', url: '/products/city-pod' },
      { name: 'Electric Mini Bus Shuttle', url: '/products/city-pod' }
    ]
  }
];

const MOBILE_COMPANY_ITEMS = [
  {
    title: 'About Us',
    desc: 'Founding story, timeline & leadership',
    href: '/about',
    img: '/assets/process/consultation.jpg',
    imgClass: 'clean-img-about'
  },
  {
    title: 'Sustainability / ESG',
    desc: 'One Vehicle, One Tree & carbon metrics',
    href: '/sustainability',
    img: '/assets/about-purpose/electric-future.jpg',
    imgClass: 'clean-img-sustainability'
  },
  {
    title: 'Case Studies',
    desc: 'Proven deployments across India',
    href: '/case-studies',
    img: '/assets/news/ads-foundation-partnership.png',
    imgClass: 'clean-img-casestudies'
  },
  {
    title: 'Media & Press',
    desc: 'News coverage & Amsterdam expo',
    href: '/media',
    img: '/assets/news/city-pod-netherlands.jpg',
    imgClass: 'clean-img-media'
  },
  {
    title: 'Careers',
    desc: 'Join our engineering & plant team',
    href: '/careers',
    img: '/assets/process/customization-design.jpg',
    imgClass: 'clean-img-careers'
  },
  {
    title: 'Blog / Insights',
    desc: 'Commercial EV economics & TCO',
    href: '/blog',
    img: '/assets/about-purpose/sustainability.jpg',
    imgClass: 'clean-img-blog'
  }
];

export function SiteHeader({ currentPath = '', transparentInitially = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'products' | 'applications' | 'technology' | 'company' | null
  const [activeProductTab, setActiveProductTab] = useState('all');
  const [mobileOpenCategory, setMobileOpenCategory] = useState(null);
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
        setMobileOpenCategory(null);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scrolling when a mega dropdown or mobile menu is open
  useEffect(() => {
    if (openDropdown !== null || menuOpen) {
      document.body.classList.add('menu-backdrop-open');
    } else {
      document.body.classList.remove('menu-backdrop-open');
    }
    return () => {
      document.body.classList.remove('menu-backdrop-open');
    };
  }, [openDropdown, menuOpen]);

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

  const handleMobileCategoryToggle = (catId) => {
    setMobileOpenCategory((prev) => (prev === catId ? null : catId));
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
    setMobileOpenCategory(null);
  };

  return (
    <>
      {/* Background Dim & Soft Blur Overlay when Dropdown is Open */}
      <div
        className={`nav-dropdown-backdrop ${openDropdown ? 'is-active' : ''}`}
        onClick={closeAllMenus}
        aria-hidden="true"
      />
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
                          className="product-tab-card overview-card"
                          role="button"
                          tabIndex={0}
                          onClick={() => setActiveProductTab('golf')}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveProductTab('golf'); }}
                        >
                          <div className="product-tab-card-img">
                            <img src="/assets/classic-golf.jpeg" alt="Golf Carts" />
                          </div>
                          <strong className="product-tab-card-title">Golf Carts</strong>
                          <span className="product-tab-card-sub">High-efficiency campus transit &amp; resort carts</span>
                          <span className="product-tab-card-link">View Category <PiArrowRight /></span>
                        </div>

                        <div
                          className="product-tab-card overview-card"
                          role="button"
                          tabIndex={0}
                          onClick={() => setActiveProductTab('loading')}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveProductTab('loading'); }}
                        >
                          <div className="product-tab-card-img">
                            <img src="/assets/electruck.jpg" alt="Loading Rickshaws" />
                          </div>
                          <strong className="product-tab-card-title">Loading Rickshaws</strong>
                          <span className="product-tab-card-sub">Heavy-duty commercial cargo &amp; last-mile delivery</span>
                          <span className="product-tab-card-link">View Category <PiArrowRight /></span>
                        </div>

                        <div
                          className="product-tab-card overview-card"
                          role="button"
                          tabIndex={0}
                          onClick={() => setActiveProductTab('garbage')}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveProductTab('garbage'); }}
                        >
                          <div className="product-tab-card-img">
                            <img src="/assets/dump-truck.jpg" alt="Garbage Collection" />
                          </div>
                          <strong className="product-tab-card-title">Garbage Collection</strong>
                          <span className="product-tab-card-sub">Municipal waste &amp; hydraulic tipper vehicles</span>
                          <span className="product-tab-card-link">View Category <PiArrowRight /></span>
                        </div>

                        <div
                          className="product-tab-card overview-card"
                          role="button"
                          tabIndex={0}
                          onClick={() => setActiveProductTab('passenger')}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveProductTab('passenger'); }}
                        >
                          <div className="product-tab-card-img">
                            <img src="/assets/tuk-tuk.jpg" alt="Passenger Vehicles" />
                          </div>
                          <strong className="product-tab-card-title">Passenger Vehicles</strong>
                          <span className="product-tab-card-sub">Approved student transit &amp; on-road 3-wheelers</span>
                          <span className="product-tab-card-link">View Category <PiArrowRight /></span>
                        </div>

                        <div
                          className="product-tab-card overview-card"
                          role="button"
                          tabIndex={0}
                          onClick={() => setActiveProductTab('custom')}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveProductTab('custom'); }}
                        >
                          <div className="product-tab-card-img">
                            <img src="/assets/vintage-elite.jpg" alt="Custom / Industrial" />
                          </div>
                          <strong className="product-tab-card-title">Custom / Industrial</strong>
                          <span className="product-tab-card-sub">Tailor-made utility platforms &amp; special EVs</span>
                          <span className="product-tab-card-link">View Category <PiArrowRight /></span>
                        </div>

                        <div
                          className="product-tab-card overview-card"
                          role="button"
                          tabIndex={0}
                          onClick={() => setActiveProductTab('upcoming')}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveProductTab('upcoming'); }}
                        >
                          <div className="product-tab-card-img">
                            <img src="/assets/coming-soon-vehicle.png" alt="Upcoming Vehicles" />
                          </div>
                          <strong className="product-tab-card-title">Upcoming Vehicles</strong>
                          <span className="product-tab-card-sub">Next-generation electric mobility concepts</span>
                          <span className="product-tab-card-link">View Category <PiArrowRight /></span>
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

              {/* Mobile Nested Accordion Products Navigation (Mobile Only) */}
              <div className="mobile-products-accordion">
                {/* 1. All Vehicles Direct Link Row */}
                <a href="/products" className="mobile-prod-cat-row all-vehicles-row" onClick={closeAllMenus}>
                  <div className="mobile-prod-cat-left">
                    <PiCar className="mobile-prod-cat-icon" />
                    <span>All Vehicles</span>
                  </div>
                  <PiArrowRight className="mobile-prod-cat-arrow" />
                </a>

                {/* 2. Nested Category Accordions */}
                {MOBILE_PRODUCT_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isExpanded = mobileOpenCategory === cat.id;
                  return (
                    <div key={cat.id} className={`mobile-prod-cat-group ${isExpanded ? 'is-expanded' : ''}`}>
                      <button
                        type="button"
                        className={`mobile-prod-cat-row ${isExpanded ? 'is-active' : ''}`}
                        onClick={() => handleMobileCategoryToggle(cat.id)}
                        aria-expanded={isExpanded}
                      >
                        <div className="mobile-prod-cat-left">
                          <Icon className="mobile-prod-cat-icon" />
                          <span>{cat.name}</span>
                        </div>
                        <PiCaretDown className={`mobile-prod-cat-chevron ${isExpanded ? 'rotate-open' : ''}`} />
                      </button>

                      {/* Nested Compact Product List */}
                      <div className={`mobile-prod-nested-list ${isExpanded ? 'is-open' : ''}`}>
                        {cat.products.map((p, idx) => (
                          <a
                            key={idx}
                            href={p.url}
                            className="mobile-prod-item-row"
                            onClick={closeAllMenus}
                          >
                            <span className="mobile-prod-item-name">{p.name}</span>
                            <PiArrowRight className="mobile-prod-item-arrow" />
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                })}
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
                      <img className="clean-img-about" src="/assets/process/consultation.jpg" alt="About Us Leadership & Story" />
                    </div>
                    <div className="clean-card-body">
                      <strong className="clean-card-title">About Us</strong>
                      <span className="clean-card-sub">Founding story, timeline &amp; leadership</span>
                      <span className="clean-card-link-text">View story <PiArrowRight /></span>
                    </div>
                  </a>

                  <a href="/sustainability" className="clean-card" onClick={closeAllMenus}>
                    <div className="clean-card-img">
                      <img className="clean-img-sustainability" src="/assets/about-purpose/electric-future.jpg" alt="Sustainability / ESG" />
                    </div>
                    <div className="clean-card-body">
                      <strong className="clean-card-title">Sustainability / ESG</strong>
                      <span className="clean-card-sub">One Vehicle, One Tree &amp; carbon metrics</span>
                      <span className="clean-card-link-text">View impact <PiArrowRight /></span>
                    </div>
                  </a>

                  <a href="/case-studies" className="clean-card" onClick={closeAllMenus}>
                    <div className="clean-card-img">
                      <img className="clean-img-casestudies" src="/assets/news/ads-foundation-partnership.png" alt="Case Studies" />
                    </div>
                    <div className="clean-card-body">
                      <strong className="clean-card-title">Case Studies</strong>
                      <span className="clean-card-sub">Proven deployments across India</span>
                      <span className="clean-card-link-text">View cases <PiArrowRight /></span>
                    </div>
                  </a>

                  <a href="/media" className="clean-card" onClick={closeAllMenus}>
                    <div className="clean-card-img">
                      <img className="clean-img-media" src="/assets/news/city-pod-netherlands.jpg" alt="Media & Press" />
                    </div>
                    <div className="clean-card-body">
                      <strong className="clean-card-title">Media &amp; Press</strong>
                      <span className="clean-card-sub">News coverage &amp; Amsterdam expo</span>
                      <span className="clean-card-link-text">View news <PiArrowRight /></span>
                    </div>
                  </a>

                  <a href="/careers" className="clean-card" onClick={closeAllMenus}>
                    <div className="clean-card-img">
                      <img className="clean-img-careers" src="/assets/process/customization-design.jpg" alt="Careers at SAVY" />
                    </div>
                    <div className="clean-card-body">
                      <strong className="clean-card-title">Careers</strong>
                      <span className="clean-card-sub">Join our engineering &amp; plant team</span>
                      <span className="clean-card-link-text">View roles <PiArrowRight /></span>
                    </div>
                  </a>

                  <a href="/blog" className="clean-card" onClick={closeAllMenus}>
                    <div className="clean-card-img">
                      <img className="clean-img-blog" src="/assets/about-purpose/sustainability.jpg" alt="Blog & Insights" />
                    </div>
                    <div className="clean-card-body">
                      <strong className="clean-card-title">Blog / Insights</strong>
                      <span className="clean-card-sub">Commercial EV economics &amp; TCO</span>
                      <span className="clean-card-link-text">Read blog <PiArrowRight /></span>
                    </div>
                  </a>
                </div>

                <div className="clean-dropdown-footer">
                  <a href="/about" className="clean-footer-cta" onClick={closeAllMenus}>
                    <span>Learn More About SAVY Greentech</span>
                    <PiArrowRight />
                  </a>
                </div>
              </div>

              {/* Mobile Compact Company Navigation List (Mobile Only) */}
              <div className="mobile-company-list">
                {MOBILE_COMPANY_ITEMS.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    className="mobile-company-row"
                    onClick={closeAllMenus}
                  >
                    <div className="mobile-company-thumb">
                      <img src={item.img} alt={item.title} className={item.imgClass} />
                    </div>
                    <div className="mobile-company-body">
                      <strong className="mobile-company-title">{item.title}</strong>
                      <span className="mobile-company-desc">{item.desc}</span>
                    </div>
                    <PiArrowRight className="mobile-company-arrow" />
                  </a>
                ))}
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
    </>
  );
}

export const GlobalNavbar = SiteHeader;
