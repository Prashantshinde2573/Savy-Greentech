import { useEffect, useRef, useState } from 'react';
import {
  PiArrowLeft,
  PiArrowRight,
  PiBuildings,
  PiCalendarCheck,
  PiChartBar,
  PiCheckCircle,
  PiCompassTool,
  PiFactory,
  PiGear,
  PiGraduationCap,
  PiHeadset,
  PiLeaf,
  PiLightning,
  PiSealCheck,
  PiShieldCheck,
  PiTrendUp,
  PiTruck,
  PiUsers,
  PiWrench
} from 'react-icons/pi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlobalNavbar } from './components/SiteHeader';
import { GlobalFooter } from './components/SiteFooter';
import { SEOHead } from './components/SEOHead';
import { QuoteModal } from './components/QuoteModal';
import { VehiclePrototypeHoverCard } from './components/VehiclePrototypeHoverCard';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 02. TRUSTED PARTNERS DATA
// ==========================================

const partners = [
  ['Indian Railways', 'indian_railway.webp'],
  ['APTDC', 'aptdc.webp'],
  ['Civil Hospital', 'civil_hospital.webp'],
  ['Ramdev', 'ramdev.webp'],
  ['Adani', 'adani.webp'],
  ['Bharat Gas', 'bharat_gas.webp'],
  ['HP', 'hp.webp'],
  ['Pune Municipal Corporation', 'pune_mc_bw.webp'],
  ['Ahmedabad Municipal Corporation', 'amd_mc.webp'],
  ['IIT Gandhinagar', 'iit_gandhinagar.webp'],
  ['Sun Pharma', 'sun_pharma.webp'],
  ['Hetero', 'hetero.webp'],
  ['Tirupati', 'tirupati.webp'],
  ['Nimba', 'nimba.webp'],
  ['Monika', 'monika.webp'],
  ['CGPL', 'cgpl.webp'],
  ['Shivaji', 'shivaji.webp'],
  ['Trivik', 'trivik.webp'],
  ['ZEEL', 'zeel.webp'],
  ['University of Pune', 'university_of_pune.webp'],
  ['CLP India', 'clpindia.webp']
];

// ==========================================
// 03. PRODUCTS DATA
// ==========================================
const vehicles = [
  {
    name: 'Classic Golf',
    image: '/assets/classic-golf.jpeg',
    copy: 'High-efficiency four-wheel electric campus cart for universities, resorts, institutions, and industrial campuses.',
    slug: 'classic-golf'
  },
  {
    name: 'Club Cart',
    image: '/assets/club-cart.jpg',
    copy: 'Premium exterior styling with contoured seating for luxury hospitality, VIP transit, and prestigious campuses.',
    slug: 'club-cart'
  },
  {
    name: 'Electruck',
    image: '/assets/electruck.jpg',
    copy: 'High-torque three-wheel electric cargo carrier for FMCG logistics, laundry transit, and factory floor distribution.',
    slug: 'electruck'
  },
  {
    name: 'Vintage Elite',
    image: '/assets/vintage-elite.jpg',
    copy: 'Vintage-styled luxury electric vehicle preferred for VIP transport, weddings, heritage properties, and premier resorts.',
    slug: 'vintage-elite'
  },
  {
    name: 'Tuk Tuk ë',
    image: '/assets/tuk-tuk.jpg',
    copy: 'Versatile electric passenger vehicle engineered for urban micro-mobility and institutional passenger movement.',
    slug: 'tuk-tuk-e'
  },
  {
    name: 'Dump Truck',
    image: '/assets/dump-truck.jpg',
    copy: 'Electro-hydraulic tipping electric tipper designed for municipal sanitation, smart cities, and Gram Panchayats.',
    slug: 'dump-truck'
  },
  {
    name: 'Coming Soon',
    image: '/assets/coming-soon-vehicle.png',
    comingSoon: true
  }
];

// ==========================================
// 04. REAL-WORLD APPLICATIONS DATA
// ==========================================
const realWorldApplications = [
  {
    title: 'Municipal & Government',
    tag: 'Civic Sanitation',
    image: '/assets/applications/government.jpg',
    copy: 'Swachh Bharat & Smart City sanitation solutions with whisper-quiet zero-emission electric tippers.',
    slug: 'municipal-government'
  },
  {
    title: 'Hospitality & Tourism',
    tag: 'Quiet Luxury',
    image: '/assets/applications/tourism.jpg',
    copy: 'Elevating guest experiences in luxury resorts, eco-destinations, and golf courses with silent electric transit.',
    slug: 'hospitality-tourism'
  },
  {
    title: 'Healthcare & Hospitals',
    tag: 'Sterile Transit',
    image: '/assets/applications/campus.jpg',
    copy: 'Zero-emission patient transfers, medical laundry, and campus logistics in sterile hospital compounds.',
    slug: 'healthcare'
  },
  {
    title: 'Industrial & Logistics',
    tag: 'Heavy Duty',
    image: '/assets/applications/logistics.jpg',
    copy: 'High-payload factory floor transit and warehouse material handling with heavy-duty electric cargo platforms.',
    slug: 'industrial-logistics'
  },
  {
    title: 'Defence & Campuses',
    tag: 'Institutional',
    image: '/assets/applications/airport.jpg',
    copy: 'Secure, dependable electric utility vehicles for airbases, defence units, and expansive university campuses.',
    slug: 'airports-defence'
  },
  {
    title: 'Food & Mobile Retail',
    tag: 'Special Purpose',
    image: '/assets/applications/community.jpg',
    copy: 'Customized mobile retail kiosks, food service carts, and specialized community utility vehicles.',
    slug: 'townships-communities'
  },
  {
    title: 'FMCG & Warehousing',
    tag: 'Multi-Shift Cargo',
    image: '/assets/electruck.jpg',
    copy: 'Purpose-built heavy crate distribution and multi-shift factory material movement with zero indoor fumes.',
    slug: 'industrial-logistics'
  }
];

// ==========================================
// 05. WHY SAVY CAPABILITY DATA
// ==========================================
const whySavyPoints = [
  {
    number: '10+',
    title: 'Years of EV Manufacturing',
    desc: 'Pioneering indigenous electric vehicle engineering and customized chassis development since 2014.'
  },
  {
    number: '10,000',
    title: 'Annual Manufacturing Capacity',
    desc: 'Scalable production plant in Ahmedabad, Gujarat engineered for volume institutional and commercial orders.'
  },
  {
    number: 'In-House',
    title: 'Design & Customisation',
    desc: 'Complete CAD modeling, tubular chassis fabrication, powertrain tuning, and bespoke body integration.'
  },
  {
    number: 'Doorstep',
    title: 'Service & Maintenance',
    desc: 'Nationwide field support network ensuring rapid preventive maintenance and genuine spare parts availability.'
  },
  {
    number: 'Purpose-Built',
    title: 'Commercial EV Platforms',
    desc: 'Eliminating the compromises of off-the-shelf vehicles with platforms engineered for demanding Indian duty cycles.'
  },
  {
    number: 'Verified',
    title: 'Institutional Proof',
    desc: 'Over 500+ deployed vehicles serving defence installations, state governments, hospitals, and Fortune 500s.'
  }
];

// ==========================================
// 05B. ENGINEERING EXCELLENCE BENTO DATA
// ==========================================
const engineeringBentoPoints = [
  {
    id: 'years-mfg',
    title: 'Years of EV Manufacturing',
    highlight: '10+',
    subtext: 'Since 2014',
    isNumber: true,
    icon: PiCalendarCheck,
    gridClass: 'bento-row1-left',
    theme: 'theme-dark-green',
    imgOverlay: '/assets/bento/ev-chassis.png',
    imgType: 'ev-chassis'
  },
  {
    id: 'capacity',
    title: 'Annual Manufacturing Capacity',
    highlight: '10,000',
    subtext: 'Annual units',
    isNumber: true,
    icon: PiChartBar,
    gridClass: 'bento-row1-right',
    theme: 'theme-mint',
    showBarChart: true
  },
  {
    id: 'service',
    title: 'Service & Maintenance',
    highlight: 'DOORSTEP',
    subtext: 'Nationwide support',
    isNumber: false,
    icon: PiWrench,
    gridClass: 'bento-row2-left',
    theme: 'theme-mint',
    imgOverlay: '/assets/bento/india-network.png',
    imgType: 'india-network'
  },
  {
    id: 'customisation',
    title: 'Design & Customisation',
    highlight: 'IN-HOUSE',
    subtext: 'CAD + Chassis',
    isNumber: false,
    icon: PiCompassTool,
    gridClass: 'bento-row2-right',
    theme: 'theme-white',
    imgOverlay: '/assets/bento/cad-chassis.png',
    imgType: 'cad-chassis'
  },
  {
    id: 'platforms',
    title: 'Commercial EV Platforms',
    highlight: 'PURPOSE-BUILT',
    subtext: 'Indian duty cycles',
    isNumber: false,
    icon: PiTruck,
    gridClass: 'bento-row3-left',
    theme: 'theme-cream-mint',
    imgOverlay: '/assets/bento/commercial-ev.png',
    imgType: 'commercial-ev'
  },
  {
    id: 'institutional',
    title: 'Institutional Proof',
    highlight: '500+',
    subtext: 'Vehicles deployed',
    isNumber: true,
    icon: PiShieldCheck,
    gridClass: 'bento-row3-right',
    theme: 'theme-dark-green',
    imgOverlay: '/assets/bento/institutional-gov.png',
    imgType: 'institutional-gov'
  }
];

// ==========================================
// 10. LATEST NEWS & INSIGHTS DATA
// ==========================================
const featuredNewsItem = {
  tag: 'Company Milestone · 2021',
  title: 'Savë partners with ADS Foundation to build EV workforce skills',
  copy: 'Savë formally associated with ADS Foundation, Gandhinagar, as an industry partner to help equip India’s workforce with skills required by the growing electric-vehicle industry.',
  image: '/assets/news/ads-foundation-partnership.png',
  link: '/media'
};

const secondaryNewsItems = [
  {
    tag: 'Industrial Product Monitor · Feb 2026',
    title: 'Savy Greentech featured for premium electric mobility',
    copy: 'Industrial Product Monitor highlights Savy Greentech’s clean, silent and sustainable electric mobility solutions for VIP and institutional movement.',
    image: '/assets/news/ipm-premium-electric-mobility.png',
    link: '/media'
  },
  {
    tag: 'Business Standard · 3 Jan 2024',
    title: 'Indian E-Auto Grabs International Attention at Netherlands E-Mobility Expo',
    copy: 'Savy Electric’s City Pod emerged as a standout at the Netherlands Expo in Amsterdam, demonstrating the potential of Indian electric autos in sustainable tourism.',
    image: '/assets/news/city-pod-netherlands.jpg',
    link: '/media'
  },
  {
    tag: 'The Policy Times · 2025',
    title: 'Savy EV: India’s electric revolution with Chandan Mundhra',
    copy: 'The feature explores locally powered three-wheelers, Savy’s research and service ecosystem, domestic sourcing and plans for charging infrastructure.',
    image: '/assets/news/policy-times-savy.jpg',
    link: '/media'
  },
  {
    tag: 'The CEO Magazine · May 2026',
    title: 'EV Fleet & Logistics Forum 2026 brings industry leaders together',
    copy: 'The forum brought together EV manufacturers and fleet operators, with Savy Greentech COO Dhawal Soni among participating keynote leaders.',
    image: '/assets/news/ev-fleet-forum.jpg',
    link: '/media'
  }
];

export function App() {
  const videoRef = useRef(null);
  const applicationsRef = useRef(null);
  const manufacturingSectionRef = useRef(null);
  const manufacturingGridRef = useRef(null);
  const manufacturingMediaWrapRef = useRef(null);
  const manufacturingVideoBoxRef = useRef(null);
  const manufacturingVideoRef = useRef(null);
  const manufacturingCopyRef = useRef(null);

  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('quote');
  const [modalVehicle, setModalVehicle] = useState('');

  // Applications carousel scroll helper (reusing exact approved handler)
  const scrollApplications = (direction) => {
    const track = applicationsRef.current;
    if (!track) return;
    const card = track.querySelector('.application-card');
    track.scrollBy({
      left: direction * ((card?.getBoundingClientRect().width || 320) + 24),
      behavior: 'smooth'
    });
  };

  // Video autoplay listener
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reveal = () => {
      if (video.readyState >= 2) setHeroVideoReady(true);
    };
    video.addEventListener('playing', reveal);
    if (!video.paused) reveal();
    return () => video.removeEventListener('playing', reveal);
  }, []);

  // In-House Manufacturing: Scroll-Driven Full-Width Edge-to-Edge Video to Grid Transformation
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const section = manufacturingSectionRef.current;
    const mediaWrap = manufacturingMediaWrapRef.current;
    const videoBox = manufacturingVideoBoxRef.current;
    const copy = manufacturingCopyRef.current;

    if (!section || !mediaWrap || !videoBox || !copy) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP: 100% Viewport Edge-to-Edge Video -> Left Media Slot Transformation
      mm.add('(min-width: 961px)', () => {
        const getTargetMetrics = () => {
          const viewportEl = section.querySelector('.manufacturing-pin-viewport');
          if (!viewportEl) return { top: 0, left: 0, width: 500, height: 380 };
          const viewportRect = viewportEl.getBoundingClientRect();
          const targetRect = mediaWrap.getBoundingClientRect();
          return {
            top: targetRect.top - viewportRect.top,
            left: targetRect.left - viewportRect.left,
            width: targetRect.width,
            height: targetRect.height,
          };
        };

        // Initial state at scroll progress = 0: 100% edge-to-edge full viewport
        gsap.set(videoBox, {
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: 0,
          force3D: true,
        });

        // Hide copy initially so it does NOT obscure the full-width video
        gsap.set(copy, {
          autoAlpha: 0,
          x: 48,
          pointerEvents: 'none',
          force3D: true,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=1300',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Phase 1: Video shrinks and moves to left (0 -> 0.72)
        tl.to(
          videoBox,
          {
            top: () => getTargetMetrics().top,
            left: () => getTargetMetrics().left,
            width: () => getTargetMetrics().width,
            height: () => getTargetMetrics().height,
            borderRadius: '20px',
            ease: 'power2.inOut',
            duration: 0.72,
          },
          0
        )
        // Text starts revealing later (at 0.40) once the video has cleared the right-side area
        .to(
          copy,
          {
            autoAlpha: 1,
            x: 0,
            pointerEvents: 'auto',
            ease: 'power2.out',
            duration: 0.34,
          },
          0.40
        )
        // Phase 2 (0.74 -> 1.0): Settled Hold state before unpinning
        .to({}, { duration: 0.26 });
      });

      // MOBILE & TABLET (max-width: 960px): Clean scroll-controlled entrance
      mm.add('(max-width: 960px)', () => {
        gsap.set(videoBox, { clearProps: 'top,left,width,height,borderRadius,transform' });
        gsap.set(copy, {
          autoAlpha: 0,
          y: 30,
          pointerEvents: 'auto',
          force3D: true,
          clearProps: 'x',
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 45%',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(copy, {
          autoAlpha: 1,
          y: 0,
          ease: 'power1.out',
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // GSAP Counters & Reveal Animations
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.timeline({ defaults: { duration: 0.85, ease: 'power4.out' } })
        .from('.hero-content .eyebrow', { autoAlpha: 0, y: 18 }, 0.12)
        .from('.hero-content h1', { autoAlpha: 0, y: 28 }, 0.2)
        .from('.hero-actions', { autoAlpha: 0, y: 20, clearProps: 'transform' }, 0.42);

      // Section headings reveal
      gsap.utils.toArray('.section-heading, .news-header-split, .trust-strip-header, .cs-content-block, .home-dealer-banner').forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 28,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        });
      });

      // Applications, Rows & Bento Cards reveal
      gsap.utils.toArray('.vehicle-grid, .application-carousel, .why-savy-rows-list, .engineering-bento-grid, .news-content-layout, .press-articles-grid').forEach((group) => {
        const cards = group.querySelectorAll('article, .why-savy-row, .bento-card, .news-card, .press-card');
        if (!cards.length) return;
        gsap.from(cards, {
          autoAlpha: 0,
          y: 28,
          duration: 0.75,
          stagger: 0.08,
          ease: 'power4.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: group, start: 'top 84%', once: true }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const handleOpenQuote = (vehicleName = '', mode = 'quote') => {
    setModalVehicle(vehicleName);
    setModalMode(mode);
    setModalOpen(true);
  };

  return (
    <main id="top" className="home-page">
      <SEOHead
        title="SAVY Greentech | India's Custom Electric Vehicle Manufacturer"
        description="Pioneering purpose-built commercial, institutional, and campus electric vehicles engineered around your operational needs since 2014."
      />

      {/* Global Transparent Navbar Overlay */}
      <GlobalNavbar currentPath="/" transparentInitially={true} />

      {/* =========================================================================
          01. HERO SECTION
          ========================================================================= */}
      <section className="hero" aria-labelledby="hero-title">
        <video
          ref={videoRef}
          className="hero-video"
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
        >
          <source src="/assets/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="hero-shade" />
        <div className={`hero-video-reveal ${heroVideoReady ? 'is-ready' : ''}`} aria-hidden="true" />
        
        <div className="hero-content container">
          <p className="eyebrow mint">Electric mobility · Since 2014</p>
          <h1 id="hero-title">Electric vehicles built around your requirements.</h1>
          <div className="hero-actions">
            <a className="button-link mint" href="#vehicles">
              <span>Explore Our Vehicles</span>
              <PiArrowRight aria-hidden="true" />
            </a>
            <button
              type="button"
              className="button-link ghost-light"
              onClick={() => handleOpenQuote('', 'quote')}
            >
              <span>Request a Custom Quote</span>
              <PiArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          02. TRUST / CREDIBILITY STRIP
          ========================================================================= */}
      <section className="home-trust-strip" aria-label="Trusted across sectors">
        <div className="container">
          <div className="trust-strip-header">
            <p className="eyebrow">TRUSTED ACROSS SECTORS</p>
            <p className="trust-lead">
              Purpose-built electric mobility solutions trusted across government, institutional, hospitality, and industrial applications.
            </p>
          </div>

          {/* Marquee Partner Logos */}
          <div className="sponsor-marquee">
            <div className="sponsor-track">
              {[false, true].map((hidden) => (
                <div className="sponsor-group" aria-hidden={hidden || undefined} key={String(hidden)}>
                  {partners.map(([name, file]) => (
                    <div className="sponsor-logo" key={`${hidden}-${file}`}>
                      <img src={`/assets/partners/${file}`} alt={hidden ? '' : `${name} logo`} loading="lazy" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          03. EXISTING PRODUCT SECTION (ORIGINAL - TEMPORARILY HIDDEN)
          ========================================================================= */}
      <section className="vehicles section-cream" id="vehicles" aria-labelledby="vehicles-title" style={{ display: 'none' }}>
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">SAVY VEHICLE LINEUP</p>
            <h2 id="vehicles-title">Electric Vehicle Range</h2>
            <p className="section-subtitle">
              A purpose-built platform for every operation.
            </p>
          </div>

          <div className="vehicle-grid">
            {vehicles.map((vehicle) => (
              <article
                className={`vehicle-card${vehicle.comingSoon ? ' coming-soon' : ''}`}
                key={vehicle.name}
              >
                <div className="vehicle-card-media">
                  <img
                    src={vehicle.image}
                    alt={vehicle.comingSoon ? 'Electric vehicle design in development' : `${vehicle.name} electric vehicle`}
                    loading="lazy"
                  />
                </div>
                <div className="vehicle-card-copy">
                  <h3>{vehicle.name}</h3>
                  <p>{vehicle.copy}</p>
                  {vehicle.comingSoon ? (
                    <span className="vehicle-status">In development</span>
                  ) : (
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginTop: 'auto' }}>
                      <a href={`/products/${vehicle.slug}`}>
                        Explore details <PiArrowRight aria-hidden="true" />
                      </a>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          03.B. DUPLICATE VEHICLE SECTION (SAVY PROTOTYPE WITH 4-FRAME ROTATION)
          All 4 cards use original SAVY content and 4-frame hover animation
          ========================================================================= */}
      <section className="savy-proto-section" id="vehicles-prototype" aria-labelledby="vehicles-proto-title">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">SAVY VEHICLE LINEUP</p>
            <h2 id="vehicles-proto-title">Electric Vehicle Range</h2>
            <p className="section-subtitle">
              A purpose-built platform for every operation.
            </p>
          </div>

          <div className="savy-proto-grid">
            {vehicles.slice(0, 6).map((vehicle) => (
              <VehiclePrototypeHoverCard
                key={vehicle.slug}
                vehicle={vehicle}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          04. OPERATIONAL VERSATILITY (REUSING APPROVED APPLICATIONS COMPONENT)
          ========================================================================= */}
      <section className="applications section-white" id="applications" aria-labelledby="applications-title">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">OPERATIONAL VERSATILITY</p>
            <h2 id="applications-title">Built for the Way You Work</h2>
            <p className="section-subtitle">
              Purpose-built electric vehicles designed around real operational needs.
            </p>
          </div>
        </div>

        <div
          className="application-carousel"
          ref={applicationsRef}
          tabIndex="0"
          aria-label="Operational applications"
        >
          {realWorldApplications.map((app) => (
            <article className="application-card" key={app.title}>
              <img src={app.image} alt={`${app.title} electric mobility`} loading="lazy" />
              <h3>{app.title}</h3>
              <p>{app.copy}</p>
            </article>
          ))}
        </div>

        <div className="container application-controls">
          <div>
            <button
              type="button"
              onClick={() => scrollApplications(-1)}
              aria-label="Previous applications"
            >
              <PiArrowLeft />
            </button>
            <button
              type="button"
              onClick={() => scrollApplications(1)}
              aria-label="Next applications"
            >
              <PiArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          05. WHY SAVY / ENGINEERING EXCELLENCE (EDITORIAL HORIZONTAL ROWS)
          ========================================================================= */}
      <section className="home-why-savy-section" id="why-savy" aria-labelledby="why-title">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">ENGINEERING EXCELLENCE</p>
            <h2 id="why-title">
              Engineering Mobility Around Your Needs
            </h2>
            <p className="section-subtitle">
              Over a decade of manufacturing capability, indigenous engineering, and nationwide client support.
            </p>
          </div>

          <div className="why-savy-rows-list">
            {whySavyPoints.map((item) => {
              const isText = isNaN(Number(item.number.replace(/[^0-9]/g, ''))) || item.number.includes('-');
              return (
                <div key={item.title} className="why-savy-row">
                  <div className="why-savy-row-left">
                    <h3 className="why-savy-row-title">{item.title}</h3>
                    <p className="why-savy-row-desc">{item.desc}</p>
                  </div>
                  <div className="why-savy-row-right">
                    <span className={`why-savy-row-value ${isText ? 'text-value' : 'num-value'}`}>
                      {item.number}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          05B. ENGINEERING EXCELLENCE (RESPONSIVE ASYMMETRIC BENTO GRID)
          ========================================================================= */}
      <section className="home-engineering-bento-section" id="engineering-bento" aria-labelledby="engineering-bento-title">
        <div className="bento-container">
          <div className="section-heading center">
            <p className="eyebrow">ENGINEERING EXCELLENCE</p>
            <h2 id="engineering-bento-title">
              Engineering Mobility Around Your Needs
            </h2>
            <p className="section-subtitle">
              Over a decade of manufacturing capability, indigenous engineering, and nationwide client support.
            </p>
          </div>

          <div className="engineering-bento-grid">
            {engineeringBentoPoints.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.id}
                  className={`bento-card ${item.gridClass} ${item.theme} ${item.imgOverlay ? `has-media-${item.imgType}` : ''}`}
                >
                  {item.imgOverlay && (
                    <div className={`bento-visual-media bento-media-${item.imgType}`} aria-hidden="true">
                      <img src={item.imgOverlay} alt="" loading="lazy" />
                      <div className="bento-media-blend" />
                    </div>
                  )}

                  {item.showBarChart && (
                    <div className="bento-bar-chart-visual" aria-hidden="true">
                      <span className="bento-bar bar-1" />
                      <span className="bento-bar bar-2" />
                      <span className="bento-bar bar-3" />
                      <span className="bento-bar bar-4" />
                    </div>
                  )}

                  <div className="bento-card-content">
                    <div className="bento-header-row">
                      <span className="bento-card-icon" aria-hidden="true">
                        <Icon />
                      </span>
                      <span className="bento-card-title">{item.title}</span>
                    </div>

                    <div className="bento-highlight-group">
                      <div className={`bento-main-highlight ${item.isNumber ? 'is-number' : 'is-word'}`}>
                        {item.highlight}
                      </div>
                      <div className="bento-subtext">{item.subtext}</div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          06. FEATURED CASE STUDY (RAMDEV FOODS)
          ========================================================================= */}
      <section className="home-featured-case-study" id="case-study" aria-labelledby="cs-heading">
        <div className="container">
          <div className="case-study-split-layout">
            <div className="cs-media-showcase">
              <img
                src="/assets/electruck.jpg"
                alt="Custom 900kg Heavy-Duty Electruck deployed at Ramdev Foods"
                loading="lazy"
              />
              <div className="cs-client-badge">
                <img src="/assets/partners/ramdev.webp" alt="Ramdev Foods Logo" />
                <div>
                  <strong>Ramdev Foods</strong>
                  <span>FMCG &amp; Food Logistics</span>
                </div>
              </div>
            </div>

            <div className="cs-content-block">
              <p className="eyebrow">FEATURED CASE STUDY</p>
              <h2 id="cs-heading">Moving 900kg Loads, More Efficiently</h2>
              <p className="cs-lead">
                A purpose-built Electruck engineered for high-load industrial movement and daily operational requirements across extensive spice manufacturing facilities.
              </p>

              <div className="cs-metrics-row">
                <div className="cs-metric-item">
                  <strong>900 kg</strong>
                  <span>Custom Payload Capacity</span>
                </div>
                <div className="cs-metric-item">
                  <strong>75%+</strong>
                  <span>Fuel Cost Reduction</span>
                </div>
                <div className="cs-metric-item">
                  <strong>0%</strong>
                  <span>Indoor Exhaust Emissions</span>
                </div>
              </div>

              <div className="cs-actions">
                <a className="button-link primary" href="/case-studies">
                  <span>Read Full Case Study</span>
                  <PiArrowRight aria-hidden="true" />
                </a>
                <button
                  type="button"
                  className="button-link ghost"
                  onClick={() => handleOpenQuote('Custom 900kg Electruck', 'quote')}
                >
                  <span>Request Similar Build</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          07. IN-HOUSE MANUFACTURING (SCROLL-DRIVEN VIDEO TRANSITION)
          ========================================================================= */}
      <section
        className="section-white manufacturing-overview-section"
        id="manufacturing"
        ref={manufacturingSectionRef}
        aria-labelledby="mfg-title"
      >
        <div className="manufacturing-pin-viewport">
          {/* Edge-to-Edge Full-Width Animated Video Stage */}
          <div className="manufacturing-video-stage" ref={manufacturingVideoBoxRef}>
            <video
              ref={manufacturingVideoRef}
              className="manufacturing-plant-video"
              src="/assets/manufacturing-plant.mp4"
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
            />
          </div>

          {/* Target Grid Layout with Placeholder on Left and Text on Right */}
          <div className="container manufacturing-container">
            <div className="engineering-grid" ref={manufacturingGridRef}>
              {/* Left Column: Target Media Placeholder */}
              <div className="engineering-media-placeholder" ref={manufacturingMediaWrapRef} />

              {/* Right Column: Copy & Details */}
              <div className="engineering-copy" ref={manufacturingCopyRef}>
                <p className="eyebrow">ENGINEERED IN-HOUSE</p>
                <h2 id="mfg-title">From Design to Assembly, Built by SAVY</h2>
                <p>
                  From structural design and chassis fabrication to electrical integration, battery systems, and final assembly, SAVY brings critical stages of vehicle development under one roof in Ahmedabad, Gujarat.
                </p>

                <ul>
                  <li>
                    <PiGear />
                    <span><strong>In-House Design:</strong> Full CAD structural engineering and bespoke chassis fabrication.</span>
                  </li>
                  <li>
                    <PiFactory />
                    <span><strong>Precision Manufacturing:</strong> High-torque motor controllers and customized battery pack integration.</span>
                  </li>
                  <li>
                    <PiShieldCheck />
                    <span><strong>Quality &amp; Testing:</strong> Multi-point electrical validation and rigorous road duty-cycle testing.</span>
                  </li>
                </ul>

                <div className="engineering-cta-wrap">
                  <a className="button-link primary" href="/technology">
                    <span>Explore Technology &amp; Manufacturing</span>
                    <PiArrowRight aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          08. LATEST FROM SAVY (SPLIT HEADER + STICKY FEATURED CARD + 2-COL SCROLLING GRID)
          ========================================================================= */}
      <section className="news section-dark" id="news" aria-labelledby="news-title">
        <div className="container">
          {/* Top Header Area: Left (Heading & Desc) + Right (CTA Button) */}
          <div className="news-header-split">
            <div className="news-header-left">
              <p className="eyebrow mint">LATEST FROM SAVY</p>
              <h2 id="news-title">News, Press &amp; Insights</h2>
              <p className="news-intro-copy">
                Stay updated on our latest product debuts, corporate milestones, and technology articles shaping sustainable electric mobility.
              </p>
            </div>
            <div className="news-header-right">
              <a className="button-link mint" href="/media">
                <span>View All Media &amp; News</span>
                <PiArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Main Content Area: Left Sticky Featured Card + Right 2-Col Scrolling Grid */}
          <div className="news-content-layout">
            {/* Left Column: Large Featured Card (Sticky) */}
            <div className="news-featured-sticky-col">
              <article className="news-card news-card-featured">
                <a className="news-featured-image" href={featuredNewsItem.link} aria-label={`Read ${featuredNewsItem.title}`}>
                  <img src={featuredNewsItem.image} alt={featuredNewsItem.title} loading="lazy" />
                </a>
                <p className="news-meta">{featuredNewsItem.tag}</p>
                <h3 className="news-featured-title">
                  <a href={featuredNewsItem.link}>{featuredNewsItem.title}</a>
                </h3>
                <p className="news-copy">{featuredNewsItem.copy}</p>
                <a className="news-link" href={featuredNewsItem.link}>
                  <span>Read Story</span>
                  <PiArrowRight aria-hidden="true" />
                </a>
              </article>
            </div>

            {/* Right Column: 2-Column Scrolling Cards Grid */}
            <div className="news-scrolling-grid-col">
              <div className="news-cards-2col-grid">
                {secondaryNewsItems.map((story) => (
                  <article className="news-card news-secondary-card" key={story.title}>
                    <a className="news-secondary-image" href={story.link} aria-label={`Read ${story.title}`}>
                      <img src={story.image} alt={story.title} loading="lazy" />
                    </a>
                    <p className="news-meta">{story.tag}</p>
                    <h3>
                      <a href={story.link}>{story.title}</a>
                    </h3>
                    <p className="news-copy">{story.copy}</p>
                    <a className="news-link" href={story.link}>
                      <span>Read Story</span>
                      <PiArrowRight aria-hidden="true" />
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. BECOME A SAVY DEALER
          ========================================================================= */}
      <section className="home-dealer-section" id="dealers" aria-labelledby="dealer-heading">
        <div className="container">
          <div className="home-dealer-banner">
            <div className="dealer-content-grid">
              <div>
                <p className="eyebrow">DEALER NETWORK OPPORTUNITY</p>
                <h2 id="dealer-heading" style={{ fontSize: 'clamp(28px, 3.4vw, 38px)', fontWeight: '600', color: 'var(--bark)', margin: '0 0 16px' }}>
                  Bring SAVY Mobility to Your Region
                </h2>
                <p style={{ fontSize: '15.5px', lineHeight: '1.6', color: 'var(--slate)', margin: '0 0 24px' }}>
                  Partner with SAVY to deliver purpose-built electric mobility solutions to businesses, institutions, and communities in your region.
                </p>
                <a className="button-link primary" href="/become-a-dealer">
                  <span>Become a Dealer</span>
                  <PiArrowRight aria-hidden="true" />
                </a>
              </div>

              <div className="dealer-pillars-list">
                <div className="dealer-pillar-item">
                  <PiShieldCheck />
                  <div>
                    <strong>Dedicated Dealer Support</strong>
                    <p>Exclusive territory operations and direct institutional inquiry forwarding.</p>
                  </div>
                </div>
                <div className="dealer-pillar-item">
                  <PiWrench />
                  <div>
                    <strong>Product &amp; Technical Training</strong>
                    <p>Comprehensive technical diagnostics, service documentation, and parts priority.</p>
                  </div>
                </div>
                <div className="dealer-pillar-item">
                  <PiTrendUp />
                  <div>
                    <strong>Marketing &amp; Launch Support</strong>
                    <p>Co-branded marketing collateral, digital campaigns, and expo display support.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          12. FINAL CONVERSION CTA
          ========================================================================= */}
      <section className="contact" id="contact" aria-labelledby="contact-title">
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
          <p className="eyebrow mint">Start a conversation</p>
          <h2 id="contact-title">Have a Mobility Requirement?</h2>
          <p>
            Tell us what you need. We'll help you find or build the right electric vehicle for your application.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a className="button-link primary" href="#vehicles">
              <span>Explore Products</span>
            </a>
            <button
              type="button"
              className="button-link primary"
              onClick={() => handleOpenQuote('', 'quote')}
            >
              <span>Request a Quote</span>
            </button>
            <button
              type="button"
              className="button-link ghost-light"
              onClick={() => handleOpenQuote('', 'demo')}
            >
              <span>Book a Demo</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          13. FOOTER
          ========================================================================= */}
      <GlobalFooter />

      {/* Interactive Quotation & Demo Modal */}
      <QuoteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultVehicle={modalVehicle}
        mode={modalMode}
      />
    </main>
  );
}


