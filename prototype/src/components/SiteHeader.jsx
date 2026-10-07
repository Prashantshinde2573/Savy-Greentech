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
  PiStorefront,
  PiClockCountdown,
  PiLeaf
} from 'react-icons/pi';

const MOBILE_PRODUCT_CATEGORIES = [
  {
    id: 'electric-campus-cart',
    name: 'Electric Campus Cart',
    icon: PiCar,
    categoryUrl: '/products/electric-campus-cart',
    viewAllText: 'View Electric Campus Cart Category',
    products: [
      { name: 'Classic Golf Cart', url: '/products/classic-golf-cart' },
      { name: 'Club Cart', url: '/products/club-cart' },
      { name: 'Elite Vintage Cart', url: '/products/elite-vintage-cart' },
      { name: 'Utility Cart', url: '/products/utility-cart' }
    ]
  },
  {
    id: 'electric-loading-rickshaw',
    name: 'Electric Loading Rickshaw',
    icon: PiTruck,
    categoryUrl: '/products/electric-loading-rickshaw',
    viewAllText: 'View Electric Loading Rickshaw Category',
    products: [
      { name: 'Electruck', url: '/products/electruck' },
      { name: 'Electruck DLX', url: '/products/electruck-dlx' },
      { name: 'Tobu Truck', url: '/products/tobu-truck' },
      { name: 'EcoTanker', url: '/products/ecotanker' }
    ]
  },
  {
    id: 'electric-passenger-rickshaw',
    name: 'Electric Passenger Rickshaw',
    icon: PiUsers,
    categoryUrl: '/products/electric-passenger-rickshaw',
    viewAllText: 'View Electric Passenger Rickshaw Category',
    products: [
      { name: 'Tuk Tuk e', url: '/products/tuk-tuk-e' },
      { name: 'Tuk Tuk DLX', url: '/products/tuk-tuk-dlx' }
    ]
  },
  {
    id: 'waste-collection-rickshaw',
    name: 'Waste Collection Rickshaw',
    icon: PiTrash,
    categoryUrl: '/products/waste-collection-rickshaw',
    viewAllText: 'View Waste Collection Category',
    products: [
      { name: 'Dumptruck', url: '/products/dumptruck' },
      { name: 'Tipper', url: '/products/tipper' }
    ]
  },
  {
    id: 'food-cart',
    name: 'Food Cart',
    icon: PiStorefront,
    categoryUrl: '/products/food-cart',
    viewAllText: 'View Food Cart Category',
    products: [
      { name: 'E-Food Cart', url: '/products/e-food-cart' }
    ]
  },
  {
    id: 'special-purpose-vehicle',
    name: 'Special Purpose Vehicle',
    icon: PiGear,
    categoryUrl: '/products/special-purpose-vehicle',
    viewAllText: 'View Special Purpose Category',
    products: [
      { name: 'Custom SPV', url: '/products/custom-spv' }
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

  // Reset all menu and dropdown states whenever currentPath changes
  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setMobileOpenCategory(null);
    document.body.classList.remove('menu-backdrop-open');
  }, [currentPath]);

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
    document.body.classList.remove('menu-backdrop-open');
  };

  const handleNavClick = (e) => {
    const anchor = e.target.closest('a');
    if (anchor) {
      closeAllMenus();
    }
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

        <nav
          className={menuOpen ? 'nav open' : 'nav'}
          onClick={handleNavClick}
          aria-label="Primary navigation"
        >
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
                      <span>All Products</span>
                      <PiCaretRight className="tab-arrow" />
                    </button>
                    <button
                      type="button"
                      className={`tabbed-nav-btn ${activeProductTab === 'electric-campus-cart' ? 'active' : ''}`}
                      onMouseEnter={() => setActiveProductTab('electric-campus-cart')}
                      onClick={() => setActiveProductTab('electric-campus-cart')}
                    >
                      <PiCar className="tab-icon" />
                      <span>Electric Campus Cart</span>
                      <PiCaretRight className="tab-arrow" />
                    </button>
                    <button
                      type="button"
                      className={`tabbed-nav-btn ${activeProductTab === 'electric-loading-rickshaw' ? 'active' : ''}`}
                      onMouseEnter={() => setActiveProductTab('electric-loading-rickshaw')}
                      onClick={() => setActiveProductTab('electric-loading-rickshaw')}
                    >
                      <PiTruck className="tab-icon" />
                      <span>Electric Loading Rickshaw</span>
                      <PiCaretRight className="tab-arrow" />
                    </button>
                    <button
                      type="button"
                      className={`tabbed-nav-btn ${activeProductTab === 'electric-passenger-rickshaw' ? 'active' : ''}`}
                      onMouseEnter={() => setActiveProductTab('electric-passenger-rickshaw')}
                      onClick={() => setActiveProductTab('electric-passenger-rickshaw')}
                    >
                      <PiUsers className="tab-icon" />
                      <span>Electric Passenger Rickshaw</span>
                      <PiCaretRight className="tab-arrow" />
                    </button>
                    <button
                      type="button"
                      className={`tabbed-nav-btn ${activeProductTab === 'waste-collection-rickshaw' ? 'active' : ''}`}
                      onMouseEnter={() => setActiveProductTab('waste-collection-rickshaw')}
                      onClick={() => setActiveProductTab('waste-collection-rickshaw')}
                    >
                      <PiTrash className="tab-icon" />
                      <span>Waste Collection Rickshaw</span>
                      <PiCaretRight className="tab-arrow" />
                    </button>
                    <button
                      type="button"
                      className={`tabbed-nav-btn ${activeProductTab === 'food-cart' ? 'active' : ''}`}
                      onMouseEnter={() => setActiveProductTab('food-cart')}
                      onClick={() => setActiveProductTab('food-cart')}
                    >
                      <PiStorefront className="tab-icon" />
                      <span>Food Cart</span>
                      <PiCaretRight className="tab-arrow" />
                    </button>
                    <button
                      type="button"
                      className={`tabbed-nav-btn ${activeProductTab === 'special-purpose-vehicle' ? 'active' : ''}`}
                      onMouseEnter={() => setActiveProductTab('special-purpose-vehicle')}
                      onClick={() => setActiveProductTab('special-purpose-vehicle')}
                    >
                      <PiGear className="tab-icon" />
                      <span>Special Purpose Vehicle</span>
                      <PiCaretRight className="tab-arrow" />
                    </button>
                  </div>

                  <div className="tabbed-brand-card">
                    <PiLeaf className="brand-card-watermark" />
                    <p className="brand-card-tag">BUILT FOR A</p>
                    <h4 className="brand-card-heading">Greener Tomorrow</h4>
                    <p className="brand-card-text">
                      Purpose-built electric mobility across 6 dedicated commercial categories.
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
                          <h3 className="pane-title">6 Core Product Categories</h3>
                        </div>
                        <a href="/products" className="pane-header-pill" onClick={closeAllMenus}>
                          <span>View All Products</span>
                          <PiArrowRight />
                        </a>
                      </div>

                      <div className="all-vehicles-grid">
                        <a
                          href="/products/electric-campus-cart"
                          className="product-tab-card overview-card"
                          onClick={closeAllMenus}
                        >
                          <div className="product-tab-card-img">
                            <img src="/assets/products/classic-golf/Classic Golf5.webp" alt="Electric Campus Cart" />
                          </div>
                          <strong className="product-tab-card-title">Electric Campus Cart</strong>
                          <span className="product-tab-card-sub">Campus transit, golf, luxury resort &amp; utility carts</span>
                          <span className="product-tab-card-link">Explore Category <PiArrowRight /></span>
                        </a>

                        <a
                          href="/products/electric-loading-rickshaw"
                          className="product-tab-card overview-card"
                          onClick={closeAllMenus}
                        >
                          <div className="product-tab-card-img">
                            <img src="/assets/products/electruck/Electruck1.webp" alt="Electric Loading Rickshaw" />
                          </div>
                          <strong className="product-tab-card-title">Electric Loading Rickshaw</strong>
                          <span className="product-tab-card-sub">Heavy freight, container logistics, tankers &amp; cargo</span>
                          <span className="product-tab-card-link">Explore Category <PiArrowRight /></span>
                        </a>

                        <a
                          href="/products/electric-passenger-rickshaw"
                          className="product-tab-card overview-card"
                          onClick={closeAllMenus}
                        >
                          <div className="product-tab-card-img">
                            <img src="/assets/products/electric-passenger/Electric Passenger1.webp" alt="Electric Passenger Rickshaw" />
                          </div>
                          <strong className="product-tab-card-title">Electric Passenger Rickshaw</strong>
                          <span className="product-tab-card-sub">Approved 3-wheel urban passenger &amp; group transit</span>
                          <span className="product-tab-card-link">Explore Category <PiArrowRight /></span>
                        </a>

                        <a
                          href="/products/waste-collection-rickshaw"
                          className="product-tab-card overview-card"
                          onClick={closeAllMenus}
                        >
                          <div className="product-tab-card-img">
                            <img src="/assets/products/dumptruck/Dumptruck1.webp" alt="Waste Collection Rickshaw" />
                          </div>
                          <strong className="product-tab-card-title">Waste Collection Rickshaw</strong>
                          <span className="product-tab-card-sub">Municipal door-to-door waste collection &amp; tippers</span>
                          <span className="product-tab-card-link">Explore Category <PiArrowRight /></span>
                        </a>

                        <a
                          href="/products/food-cart"
                          className="product-tab-card overview-card"
                          onClick={closeAllMenus}
                        >
                          <div className="product-tab-card-img">
                            <img src="/assets/products/food-cart/Food cart1.webp" alt="Food Cart" />
                          </div>
                          <strong className="product-tab-card-title">Food Cart</strong>
                          <span className="product-tab-card-sub">Mobile culinary catering, ice cream, soda &amp; retail</span>
                          <span className="product-tab-card-link">Explore Category <PiArrowRight /></span>
                        </a>

                        <a
                          href="/products/special-purpose-vehicle"
                          className="product-tab-card overview-card"
                          onClick={closeAllMenus}
                        >
                          <div className="product-tab-card-img">
                            <img src="/assets/products/special-purpose/Special Purpose Vehical1.webp" alt="Special Purpose Vehicle" />
                          </div>
                          <strong className="product-tab-card-title">Special Purpose Vehicle</strong>
                          <span className="product-tab-card-sub">Custom-built design &amp; bespoke engineered platforms</span>
                          <span className="product-tab-card-link">Explore Category <PiArrowRight /></span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* TAB: ELECTRIC CAMPUS CART */}
                  {activeProductTab === 'electric-campus-cart' && (
                    <div className="tab-pane active-pane">
                      <div className="pane-header">
                        <div>
                          <p className="pane-eyebrow">CAMPUS &amp; RESORT MOBILITY</p>
                          <h3 className="pane-title">Electric Campus Cart</h3>
                        </div>
                        <a href="/products/electric-campus-cart" className="pane-header-pill" onClick={closeAllMenus}>
                          <span>View Category Page</span>
                          <PiArrowRight />
                        </a>
                      </div>

                      <div className="product-cards-tab-grid product-grid-4">
                        <a href="/products/classic-golf-cart" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/products/classic-golf/Classic Golf5.webp" alt="Classic Golf Cart" />
                          </div>
                          <strong className="product-tab-card-title">Classic Golf Cart</strong>
                          <span className="product-tab-card-sub">2000W* BLDC • 2 - 8 Seater institutional cart</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>

                        <a href="/products/club-cart" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/products/club-cart/Club Cart3.webp" alt="Club Cart" />
                          </div>
                          <strong className="product-tab-card-title">Club Cart</strong>
                          <span className="product-tab-card-sub">2000W Heavy Duty BLDC • 2 - 8 Seater resort cart</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>

                        <a href="/products/elite-vintage-cart" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/products/elite-vintage/Elite Vintage Cart9.webp" alt="Elite Vintage Cart" />
                          </div>
                          <strong className="product-tab-card-title">Elite Vintage Cart</strong>
                          <span className="product-tab-card-sub">2000W BLDC • 2 - 8 Seater classic retro luxury</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>

                        <a href="/products/utility-cart" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/products/utility-cart/utility Cart1.webp" alt="Utility Cart" />
                          </div>
                          <strong className="product-tab-card-title">Utility Cart</strong>
                          <span className="product-tab-card-sub">3000W BLDC • 2 Seater + 500 kg Cargo Platform</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* TAB: ELECTRIC LOADING RICKSHAW */}
                  {activeProductTab === 'electric-loading-rickshaw' && (
                    <div className="tab-pane active-pane">
                      <div className="pane-header">
                        <div>
                          <p className="pane-eyebrow">HEAVY FREIGHT &amp; LOGISTICS</p>
                          <h3 className="pane-title">Electric Loading Rickshaw</h3>
                        </div>
                        <a href="/products/electric-loading-rickshaw" className="pane-header-pill" onClick={closeAllMenus}>
                          <span>View Category Page</span>
                          <PiArrowRight />
                        </a>
                      </div>

                      <div className="product-cards-tab-grid product-grid-4">
                        <a href="/products/electruck" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/products/electruck/Electruck1.webp" alt="Electruck" />
                          </div>
                          <strong className="product-tab-card-title">Electruck</strong>
                          <span className="product-tab-card-sub">1000W BLDC • 500 kg open cargo platform</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>

                        <a href="/products/electruck-dlx" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/products/electruck-dlx/Electruck DLX1.webp" alt="Electruck DLX" />
                          </div>
                          <strong className="product-tab-card-title">Electruck DLX</strong>
                          <span className="product-tab-card-sub">2000W High Torque BLDC • 1 - 3 ton container</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>

                        <a href="/products/tobu-truck" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/products/tobu-truck/Tobu truck1.webp" alt="Tobu Truck" />
                          </div>
                          <strong className="product-tab-card-title">Tobu Truck</strong>
                          <span className="product-tab-card-sub">1000W BLDC • 500 kg high maneuverability</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>

                        <a href="/products/ecotanker" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/products/ecotanker/EcoTanker1.webp" alt="EcoTanker" />
                          </div>
                          <strong className="product-tab-card-title">EcoTanker</strong>
                          <span className="product-tab-card-sub">2000W BLDC • 500 Ltr liquid &amp; spray tanker</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* TAB: ELECTRIC PASSENGER RICKSHAW */}
                  {activeProductTab === 'electric-passenger-rickshaw' && (
                    <div className="tab-pane active-pane">
                      <div className="pane-header">
                        <div>
                          <p className="pane-eyebrow">COMMERCIAL PASSENGER</p>
                          <h3 className="pane-title">Electric Passenger Rickshaw</h3>
                        </div>
                        <a href="/products/electric-passenger-rickshaw" className="pane-header-pill" onClick={closeAllMenus}>
                          <span>View Category Page</span>
                          <PiArrowRight />
                        </a>
                      </div>

                      <div className="product-cards-tab-grid product-grid-2">
                        <a href="/products/tuk-tuk-e" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/products/electric-passenger/Electric Passenger1.webp" alt="Tuk Tuk e" />
                          </div>
                          <strong className="product-tab-card-title">Tuk Tuk e</strong>
                          <span className="product-tab-card-sub">1000W BLDC • Driver + 2 - 4 Passengers</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>

                        <a href="/products/tuk-tuk-dlx" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/products/passenger-dlx/Passenger DLX1.webp" alt="Tuk Tuk DLX" />
                          </div>
                          <strong className="product-tab-card-title">Tuk Tuk DLX</strong>
                          <span className="product-tab-card-sub">1000W High Capacity • Driver + 6 - 9 Passengers</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* TAB: WASTE COLLECTION RICKSHAW */}
                  {activeProductTab === 'waste-collection-rickshaw' && (
                    <div className="tab-pane active-pane">
                      <div className="pane-header">
                        <div>
                          <p className="pane-eyebrow">MUNICIPAL &amp; SANITATION</p>
                          <h3 className="pane-title">Waste Collection Rickshaw</h3>
                        </div>
                        <a href="/products/waste-collection-rickshaw" className="pane-header-pill" onClick={closeAllMenus}>
                          <span>View Category Page</span>
                          <PiArrowRight />
                        </a>
                      </div>

                      <div className="product-cards-tab-grid product-grid-2">
                        <a href="/products/dumptruck" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/products/dumptruck/Dumptruck1.webp" alt="Dumptruck" />
                          </div>
                          <strong className="product-tab-card-title">Dumptruck</strong>
                          <span className="product-tab-card-sub">1200W BLDC • 500 kg Waste Capacity</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>

                        <a href="/products/tipper" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/products/tipper/Tipper 1.webp" alt="Tipper" />
                          </div>
                          <strong className="product-tab-card-title">Tipper</strong>
                          <span className="product-tab-card-sub">1500W* High Torque • 600 kg Hydraulic Tipping</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* TAB: FOOD CART */}
                  {activeProductTab === 'food-cart' && (
                    <div className="tab-pane active-pane">
                      <div className="pane-header">
                        <div>
                          <p className="pane-eyebrow">MOBILE CULINARY RETAIL</p>
                          <h3 className="pane-title">Food Cart</h3>
                        </div>
                        <a href="/products/food-cart" className="pane-header-pill" onClick={closeAllMenus}>
                          <span>View Category Page</span>
                          <PiArrowRight />
                        </a>
                      </div>

                      <div className="product-cards-tab-grid product-grid-2">
                        <a href="/products/e-food-cart" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/products/food-cart/Food cart1.webp" alt="E-Food Cart" />
                          </div>
                          <strong className="product-tab-card-title">E-Food Cart</strong>
                          <span className="product-tab-card-sub">1100W BLDC • 400 - 450 kg • Ice Cream, Soda, Dosa &amp; catering kiosk variants</span>
                          <span className="product-tab-card-link">View Details <PiArrowRight /></span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* TAB: SPECIAL PURPOSE VEHICLE */}
                  {activeProductTab === 'special-purpose-vehicle' && (
                    <div className="tab-pane active-pane">
                      <div className="pane-header">
                        <div>
                          <p className="pane-eyebrow">BESPOKE ENGINEERING</p>
                          <h3 className="pane-title">Special Purpose Vehicle</h3>
                        </div>
                        <a href="/products/special-purpose-vehicle" className="pane-header-pill" onClick={closeAllMenus}>
                          <span>View Category Page</span>
                          <PiArrowRight />
                        </a>
                      </div>

                      <div className="product-cards-tab-grid product-grid-2">
                        <a href="/products/custom-spv" className="product-tab-card" onClick={closeAllMenus}>
                          <div className="product-tab-card-img">
                            <img src="/assets/products/special-purpose/Special Purpose Vehical1.webp" alt="Custom SPV" />
                          </div>
                          <strong className="product-tab-card-title">Custom SPV</strong>
                          <span className="product-tab-card-sub">Customizable Motor &amp; Capacity • Tailored design and fabrication</span>
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
                        <a
                          href={cat.categoryUrl}
                          className="mobile-prod-item-row"
                          style={{ fontWeight: '600', color: 'var(--leaf, #1b8a5a)' }}
                          onClick={closeAllMenus}
                        >
                          <span className="mobile-prod-item-name">{cat.viewAllText || `View All ${cat.name}`}</span>
                          <PiArrowRight className="mobile-prod-item-arrow" />
                        </a>
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
