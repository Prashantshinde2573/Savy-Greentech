import { useEffect, useRef, useState } from 'react';
import {
  PiArrowLeft,
  PiArrowRight,
  PiCheckCircle,
  PiFactory,
  PiGear,
  PiLeaf,
  PiLinkedinLogo,
  PiTrendUp,
  PiWrench
} from 'react-icons/pi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { SEOHead } from '../components/SEOHead';
import { QuoteModal } from '../components/QuoteModal';
import { leadershipTeam, journeyGroups, journeyTimeline } from '../data/team';

gsap.registerPlugin(ScrollTrigger);

const partners = [
  ['Tirupati', 'tirupati.webp'], ['Nimba', 'nimba.webp'], ['Monika', 'monika.webp'], ['Hetero', 'hetero.webp'],
  ['Civil Hospital', 'civil_hospital.webp'], ['Adani', 'adani.webp'], ['APTDC', 'aptdc.webp'], ['Bharat Gas', 'bharat_gas.webp'],
  ['CGPL', 'cgpl.webp'], ['HP', 'hp.webp'], ['Indian Railways', 'indian_railway.webp'], ['Ramdev', 'ramdev.webp'],
  ['Shivaji', 'shivaji.webp'], ['Sun Pharma', 'sun_pharma.webp'], ['Trivik', 'trivik.webp'], ['ZEEL', 'zeel.webp'],
  ['University of Pune', 'university_of_pune.webp'], ['Pune Municipal Corporation', 'pune_mc_bw.webp'],
  ['IIT Gandhinagar', 'iit_gandhinagar.webp'], ['CLP India', 'clpindia.webp'], ['Ahmedabad Municipal Corporation', 'amd_mc.webp'],
];

export function AboutPage() {
  const storySequenceRef = useRef(null);
  const videoRef = useRef(null);
  const metricsRef = useRef(null);
  const journeyScrollRef = useRef(null);
  const missionVisionSectionRef = useRef(null);
  const missionVisionGridRef = useRef(null);
  const missionCardRef = useRef(null);
  const visionCardRef = useRef(null);
  const manufacturingSectionRef = useRef(null);
  const manufacturingGridRef = useRef(null);
  const manufacturingMediaWrapRef = useRef(null);
  const manufacturingVideoBoxRef = useRef(null);
  const manufacturingVideoRef = useRef(null);
  const manufacturingCopyRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [storyExpanded, setStoryExpanded] = useState(false);

  // Executive Leadership Carousel Ref and State
  const teamScrollRef = useRef(null);
  const [canScrollTeamLeft, setCanScrollTeamLeft] = useState(false);
  const [canScrollTeamRight, setCanScrollTeamRight] = useState(true);

  const updateTeamScrollState = () => {
    const el = teamScrollRef.current;
    if (!el) return;
    setCanScrollTeamLeft(el.scrollLeft > 10);
    setCanScrollTeamRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    const el = teamScrollRef.current;
    if (!el) return;
    updateTeamScrollState();
    el.addEventListener('scroll', updateTeamScrollState, { passive: true });
    window.addEventListener('resize', updateTeamScrollState);
    return () => {
      el.removeEventListener('scroll', updateTeamScrollState);
      window.removeEventListener('resize', updateTeamScrollState);
    };
  }, []);

  const handleTeamScroll = (direction) => {
    const el = teamScrollRef.current;
    if (!el) return;
    const card = el.querySelector('.team-card-expanded');
    const scrollAmount = card ? card.offsetWidth + 20 : 300;
    el.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  };

  // Sync active year tab and bottom counter indicator on horizontal scroll
  useEffect(() => {
    const viewport = journeyScrollRef.current;
    if (!viewport) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const viewportLeft = viewport.getBoundingClientRect().left;
          let closestIdx = 0;
          let minDistance = Infinity;

          journeyGroups.forEach((group, idx) => {
            const el = document.getElementById(`journey-year-${group.year}`);
            if (el) {
              const rect = el.getBoundingClientRect();
              const dist = Math.abs(rect.left - viewportLeft - 40);
              if (dist < minDistance) {
                minDistance = dist;
                closestIdx = idx;
              }
            }
          });

          setActiveGroupIndex(closestIdx);
          ticking = false;
        });
        ticking = true;
      }
    };

    viewport.addEventListener('scroll', handleScroll, { passive: true });
    return () => viewport.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Numbers counter GSAP animation
  useEffect(() => {
    const metrics = metricsRef.current;
    if (!metrics) return;
    const context = gsap.context(() => {
      [...metrics.querySelectorAll('[data-counter]')].forEach((element) => {
        const value = { current: Number(element.dataset.start) };
        gsap.to(value, {
          current: Number(element.dataset.end),
          duration: 1.6,
          ease: 'power2.out',
          snap: { current: 1 },
          scrollTrigger: { trigger: metrics, start: 'top 82%', once: true },
          onUpdate: () => {
            element.textContent = `${Math.round(value.current)}${element.dataset.suffix || ''}`;
          },
        });
      });
    }, metrics);
    return () => context.revert();
  }, []);

  // Hero sticky + blur overlap animation + section reveals
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      // Hero content intro reveal
      gsap.timeline({ defaults: { duration: 0.9, ease: 'power4.out' } })
        .from('.about-hero .eyebrow', { autoAlpha: 0, y: 18 }, 0.15)
        .from('.about-hero h1', { autoAlpha: 0, y: 34 }, 0.24)
        .from('.about-hero-copy, .hero-actions', { autoAlpha: 0, y: 22, clearProps: 'transform' }, 0.42);

      // Section Headings & Card Groups Reveal (excluding pinned Mission-Vision & Manufacturing sections)
      gsap.utils.toArray(
        '.about-story-content, .founder-profile-card, .founding-story-content, .journey-timeline-grid, .about-team-grid, .partners-title, .contact-inner'
      ).forEach((group) => {
        gsap.from(group, {
          autoAlpha: 0,
          y: 34,
          duration: 0.85,
          ease: 'power4.out',
          scrollTrigger: { trigger: group, start: 'top 84%', once: true },
        });
      });

      // Hero Title Fade Out on Scroll
      gsap.to('.about-hero .hero-content', {
        autoAlpha: 0,
        y: -56,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-story',
          start: 'top bottom',
          end: 'top 75%',
          scrub: true,
        },
      });

      // Hero Video Blur & Darkening on Overlap
      gsap.timeline({
        scrollTrigger: {
          trigger: '.about-story',
          start: 'top bottom',
          end: 'top top',
          scrub: 0.7,
        },
      })
        .to('.about-hero .hero-video', { filter: 'blur(12px)', scale: 1.06, ease: 'none' }, 0)
        .to('.about-hero .hero-shade', { opacity: 0.82, ease: 'none' }, 0);
    }, storySequenceRef);

    return () => context.revert();
  }, []);

  // Mission & Vision: Scroll-Driven Sticky Storytelling Animation (Scrubbed with Zero Autoplay)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const section = missionVisionSectionRef.current;
    const grid = missionVisionGridRef.current;
    const missionCard = missionCardRef.current;
    const visionCard = visionCardRef.current;

    if (!section || !grid || !missionCard || !visionCard) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP: Mission starts centered on top; Vision starts directly BEHIND Mission in the center
      mm.add('(min-width: 961px)', () => {
        // Shift amount to center both cards in the 2-column grid
        const getCenterShift = () => {
          const gridW = grid.offsetWidth;
          const cardW = missionCard.offsetWidth;
          return (gridW - cardW) / 2;
        };

        // Initial setup at scroll progress = 0:
        // Mission card starts centered on top (+shift)
        // Vision card starts centered directly behind Mission (-shift)
        gsap.set(missionCard, {
          x: () => getCenterShift(),
          force3D: true,
        });
        gsap.set(visionCard, {
          x: () => -getCenterShift(),
          force3D: true,
        });

        // Sticky Pin Timeline directly driven by user scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=1600',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Phase 1 (0 -> 0.12): Focal hold on centered Mission card as section sticks
        tl.to({}, { duration: 0.12 })
        // Phase 2 (0.12 -> 0.76): Simultaneous split — Mission slides LEFT to its column, Vision reveals from behind and slides RIGHT to its column
        .to(
          missionCard,
          {
            x: 0,
            ease: 'power2.inOut',
            duration: 0.64,
          },
          0.12
        )
        .to(
          visionCard,
          {
            x: 0,
            ease: 'power2.inOut',
            duration: 0.64,
          },
          0.12
        )
        // Phase 3 (0.76 -> 1.0): Both cards held settled side-by-side before releasing sticky pin
        .to({}, { duration: 0.24 });
      });

      // MOBILE & TABLET (max-width: 960px): Smooth scroll-controlled sequential reveal
      mm.add('(max-width: 960px)', () => {
        gsap.set(missionCard, { clearProps: 'x,y,transform' });
        gsap.set(visionCard, {
          y: 40,
          autoAlpha: 0,
          force3D: true,
          clearProps: 'x',
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'bottom 60%',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(visionCard, {
          y: 0,
          autoAlpha: 1,
          ease: 'power1.out',
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Technology / In-House Manufacturing: Scroll-Driven Full-Width Edge-to-Edge Video to Grid Transformation
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

  return (
    <main id="top" className="about-page">
      <SEOHead
        title="About Us | Driving Innovation. Delivering Sustainability."
        description="Learn about SAVY Greentech, India's trusted custom electric vehicle manufacturer founded by Chandan Mundhra. Engineering purpose-built EVs since 2014."
      />
      <SiteHeader currentPath="/about" transparentInitially={true} />

      {/* =========================================================================
          SECTION 1 + SECTION 2: HERO (100vh) + OVERLAPPING STORY SEQUENCE (MASTER EFFECT)
          ========================================================================= */}
      <div className="about-story-sequence" ref={storySequenceRef}>
        {/* SECTION 1: ABOUT US HERO (100vh) */}
        <section className="hero about-hero" aria-labelledby="about-title">
          <video ref={videoRef} className="hero-video" muted autoPlay loop playsInline preload="metadata">
            <source src="/assets/about-hero.mp4" type="video/mp4" />
          </video>
          <div className="hero-shade" />
          <div className={`hero-video-reveal ${heroVideoReady ? 'is-ready' : ''}`} aria-hidden="true" />
          <div className="hero-content container">
            <p className="eyebrow mint">Electric mobility · Since 2014</p>
            <h1 id="about-title">Building India’s electric future.</h1>
            <p className="about-hero-copy">Over a decade of purpose-built electric mobility.</p>
            <div className="hero-actions">
              <a className="button-link mint" href="/technology">
                <span>Explore Manufacturing Capability</span>
                <PiArrowRight aria-hidden="true" />
              </a>
              <a className="button-link ghost-light" href="/contact">
                <span>Talk to SAVY</span>
                <PiArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE INDIAN CUSTOM EV MANUFACTURER (OVERLAPS HERO WITH BACKGROUND BLUR) */}
        <section className="about-story" aria-labelledby="story-title">
          <div className="container about-story-content">
            <div className="about-story-heading">
              <h2 id="story-title">The Indian Custom EV Manufacturer</h2>
            </div>
            <div className="about-story-copy">
              <p className="about-story-lead">
                Savy Greentech Pvt. Ltd. (formerly Savy Electric Vehicles Pvt. Ltd.) specializes in electric three-wheelers, campus carts, golf carts, special-purpose customized EVs, and indigenous EV components including motors, controllers, and battery systems.
              </p>
              <p>
                We serve institutions, government bodies, defence units, resorts, campuses, and industries across India. Quality, safety, customer satisfaction, and lasting client relationships remain at the centre of every project.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* =========================================================================
          SECTION 3: REDEFINING MOBILITY WITH INNOVATION (METRICS STRIP)
          ========================================================================= */}
      <section className="intro intro-impact" id="about-impact" aria-label="SAVY in numbers">
        <div className="container impact-layout">
          <h2>Redefining Mobility with Innovation</h2>
          <div className="impact-numbers">
            <div className="metrics" ref={metricsRef}>
              <article>
                <strong data-counter data-start="0" data-end="500" data-suffix="+">
                  0+
                </strong>
                <span>Vehicles Deployed</span>
              </article>
              <article>
                <strong data-counter data-start="0" data-end="200" data-suffix="K+">
                  0K+
                </strong>
                <span>Tons of CO₂ Saved</span>
              </article>
              <article>
                <strong data-counter data-start="0" data-end="100" data-suffix="+">
                  0+
                </strong>
                <span>Satisfied Clients</span>
              </article>
              <article>
                <strong data-counter data-start="0" data-end="10" data-suffix="+">
                  0+
                </strong>
                <span>States Covered</span>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: OUR FOUNDING STORY (REFINED 2-COLUMN WITH COMPACT LIQUID CARD & READ MORE)
          ========================================================================= */}
      <section className="founding-story-section" id="founding-story" aria-labelledby="founding-story-title">
        {/* Subtle Organic Background Waves / Gradients */}
        <div className="founding-story-bg-organic" aria-hidden="true">
          <div className="organic-shape organic-shape-1" />
          <div className="organic-shape organic-shape-2" />
          <div className="organic-shape organic-shape-3" />
          <svg className="organic-wave-svg" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,160 C320,300 420,-40 720,140 C1020,320 1180,40 1440,180 L1440,600 L0,600 Z" fill="url(#organic-gradient-1)" opacity="0.45" />
            <path d="M0,280 C360,120 600,340 960,200 C1200,100 1320,240 1440,160 L1440,600 L0,600 Z" fill="url(#organic-gradient-2)" opacity="0.35" />
            <defs>
              <linearGradient id="organic-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e8f6ef" />
                <stop offset="50%" stopColor="#f2faf5" />
                <stop offset="100%" stopColor="#e0f2e9" />
              </linearGradient>
              <linearGradient id="organic-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ebf8f1" />
                <stop offset="100%" stopColor="#f5fbf7" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="container relative-z">
          <div className="founding-story-layout">
            {/* LEFT COLUMN: Compact Founder Profile Card (Liquid Glass UI) */}
            <div className="founder-card-column">
              <div className="founder-profile-card">
                <div className="founder-card-glass-glow" aria-hidden="true" />
                
                <div className="founder-image-box">
                  <img
                    src="/assets/team/chandan-mundhra.jpg"
                    alt="Chandan Mundhra, Founder & CEO of SAVY Greentech"
                    className="founder-profile-img"
                    loading="lazy"
                  />
                  <div className="founder-image-overlay">
                    <span className="founder-badge-role">Founder &amp; CEO</span>
                    <strong className="founder-badge-name">Chandan Mundhra</strong>
                    <span className="founder-badge-detail">25+ Years Automotive Engineering</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Section Eyebrow, Heading, Lead & Expandable Story */}
            <div className="founding-story-content">
              <div className="founding-story-eyebrow-wrap">
                <span className="founding-story-eyebrow">OUR FOUNDING STORY</span>
              </div>

              <h2 id="founding-story-title" className="founding-story-heading">
                Custom EV Manufacturing Engineered from the Ground Up
              </h2>

              <div className="founding-story-body">
                <p className="founding-story-lead">
                  Founded by <strong>Chandan Mundhra</strong>, an automotive engineering visionary with over 25 years of industry experience, <strong>Savy Greentech Pvt. Ltd.</strong> (formerly Savy Electric Vehicles Pvt. Ltd.) was established to bridge a crucial gap in India’s electric transition: custom, purpose-built commercial and campus electric vehicles.
                </p>

                {/* Secondary Content - Expandable with Smooth Animation */}
                <div
                  id="founding-expandable-text"
                  className={`founding-story-expandable ${storyExpanded ? 'is-expanded' : ''}`}
                  aria-hidden={!storyExpanded}
                >
                  <div className="founding-story-expandable-inner">
                    <p>
                      While mass-market automotive players focused on standardized passenger cars, Indian institutions, municipal corporations, resorts, hospitals, and industrial plants struggled with off-the-shelf vehicles that failed under demanding Indian terrain and operational duty cycles.
                    </p>
                    <p>
                      SAVY pioneered indigenous design-to-assembly manufacturing in Ahmedabad, Gujarat, developing our own high-torque motor controllers, heavy-duty chassis frames, and intelligent battery systems. Today, SAVY powers operations for prestigious government bodies, defence establishments, luxury resorts, and Fortune 500 corporations across India.
                    </p>
                  </div>
                </div>

                {/* Read More / Read Less Interactive Action */}
                <button
                  type="button"
                  className="founding-read-more-btn"
                  onClick={() => setStoryExpanded((prev) => !prev)}
                  aria-expanded={storyExpanded}
                  aria-controls="founding-expandable-text"
                >
                  <span>{storyExpanded ? 'Read less' : 'Read more'}</span>
                  <span className={`read-more-arrow ${storyExpanded ? 'is-up' : 'is-down'}`} aria-hidden="true">
                    {storyExpanded ? '↑' : '↓'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: SAVY JOURNEY (MULTI-CARD HORIZONTAL TIMELINE)
          ========================================================================= */}
      <section className="section-white journey-section" id="journey" aria-labelledby="journey-title">
        <div className="container">
          {/* Top Header Row */}
          <div className="journey-header-row">
            <div className="journey-title-block">
              <span className="journey-eyebrow">OUR JOURNEY</span>
              <h2 id="journey-title" className="journey-main-heading">SAVY Journey</h2>
              <p className="journey-subtitle">Milestones that drive a cleaner, smarter tomorrow.</p>
            </div>

            <div className="journey-years-nav-block">
              <div className="journey-years-tabs" role="tablist" aria-label="Milestone Years">
                {journeyGroups.map((group, idx) => {
                  const isActive = idx === activeGroupIndex;
                  return (
                    <button
                      key={group.year}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`journey-year-tab ${isActive ? 'active' : ''}`}
                      onClick={() => {
                        setActiveGroupIndex(idx);
                        const target = document.getElementById(`journey-year-${group.year}`);
                        if (target) {
                          target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
                        }
                      }}
                    >
                      <span>{group.year}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Full-Bleed Horizontal Journey Scroll Viewport */}
        <div className="journey-full-bleed-viewport" ref={journeyScrollRef} tabIndex={0} role="region" aria-label="SAVY Journey Timeline">
          <div className="journey-scroll-track">
            {journeyGroups.map((group, groupIdx) => (
              <div className="journey-year-group" id={`journey-year-${group.year}`} key={group.year}>
                <div className="journey-group-content">
                  <h3 className="journey-group-year">{group.year}</h3>

                  <div className="journey-cards-grid">
                    {group.milestones.map((item) => (
                      <article key={item.id} className="journey-milestone-card">
                        <div className="journey-card-media">
                          <img src={item.image} alt={item.alt || item.title} loading="lazy" />
                        </div>
                        <div className="journey-card-info">
                          <h4 className="journey-card-title">{item.title}</h4>
                          <p className="journey-card-desc">{item.description}</p>
                          <a className="journey-card-cta" href={item.ctaUrl || '/about'}>
                            <span>{item.ctaLabel || 'View More'}</span>
                            <PiArrowRight aria-hidden="true" />
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                {groupIdx < journeyGroups.length - 1 && (
                  <div className="journey-vertical-divider" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="container">
          {/* Bottom Controls Row */}
          <div className="journey-bottom-bar">
            <div className="journey-nav-arrows">
              <button
                type="button"
                className={`journey-arrow-btn ${activeGroupIndex > 0 ? 'active' : ''}`}
                onClick={() => {
                  const nextIdx = Math.max(0, activeGroupIndex - 1);
                  setActiveGroupIndex(nextIdx);
                  const target = document.getElementById(`journey-year-${journeyGroups[nextIdx].year}`);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
                  }
                }}
                disabled={activeGroupIndex === 0}
                aria-label="Previous Milestone Year"
              >
                <PiArrowLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                className={`journey-arrow-btn primary ${activeGroupIndex < journeyGroups.length - 1 ? 'active' : ''}`}
                onClick={() => {
                  const nextIdx = Math.min(journeyGroups.length - 1, activeGroupIndex + 1);
                  setActiveGroupIndex(nextIdx);
                  const target = document.getElementById(`journey-year-${journeyGroups[nextIdx].year}`);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
                  }
                }}
                disabled={activeGroupIndex === journeyGroups.length - 1}
                aria-label="Next Milestone Year"
              >
                <PiArrowRight aria-hidden="true" />
              </button>
            </div>

            <div className="journey-progress-indicator">
              <div className="journey-progress-track">
                <div
                  className="journey-progress-fill"
                  style={{
                    width: `${((activeGroupIndex + 1) / journeyGroups.length) * 100}%`
                  }}
                />
              </div>
              <span className="journey-counter-display">
                0{activeGroupIndex + 1} <span className="counter-divider">/</span> 0{journeyGroups.length}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: MISSION & VISION (SCROLL-DRIVEN STICKY STORYTELLING ANIMATION)
          ========================================================================= */}
      <section
        className="section-cream mission-vision-section"
        id="mission-vision"
        ref={missionVisionSectionRef}
        aria-labelledby="mission-title"
      >
        <div className="mission-vision-pin-viewport">
          <div className="container">
            <div className="mission-vision-grid" ref={missionVisionGridRef}>
              <article className="mission-card" ref={missionCardRef}>
                <div className="mission-icon"><PiLeaf /></div>
                <p className="eyebrow">Our Mission</p>
                <h2 id="mission-title">Accelerate Purpose-Built Clean Mobility</h2>
                <p>
                  To design, engineer, and manufacture reliable, high-performance, and custom-tailored electric vehicles that eliminate carbon emissions, slash operational overheads, and empower Indian enterprises with sustainable transportation.
                </p>
                <ul className="mission-list">
                  <li><PiCheckCircle /> 100% Zero tailpipe emission engineering</li>
                  <li><PiCheckCircle /> Customer-centric bespoke custom vehicle fabrication</li>
                  <li><PiCheckCircle /> Long-term reliability and nationwide doorstep service support</li>
                </ul>
              </article>

              <article className="mission-card highlight" ref={visionCardRef}>
                <div className="mission-icon"><PiTrendUp /></div>
                <p className="eyebrow mint">Our Vision</p>
                <h2>Setting the Global Benchmark for Custom EVs</h2>
                <p>
                  To become India’s most trusted manufacturer of special-purpose and commercial electric vehicles, recognized internationally for engineering precision, ecological impact, and transformative micro-mobility solutions.
                </p>
                <ul className="mission-list">
                  <li><PiCheckCircle /> Pioneer modular electric platforms for commercial adoption</li>
                  <li><PiCheckCircle /> Expand global presence with innovative platforms like City Pod</li>
                  <li><PiCheckCircle /> Foster one-tree restoration for every delivered vehicle</li>
                </ul>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: IN-HOUSE MANUFACTURING FACILITY (SCROLL-DRIVEN VIDEO TRANSITION)
          ========================================================================= */}
      <section
        className="section-white manufacturing-overview-section"
        id="manufacturing-plant"
        ref={manufacturingSectionRef}
        aria-labelledby="plant-title"
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

              {/* Right Column: Copy & Details (Tighter Vertical Spacing) */}
              <div className="engineering-copy" ref={manufacturingCopyRef}>
                <p className="eyebrow">In-House Manufacturing</p>
                <h2 id="plant-title">End-to-End Design to Assembly Facility</h2>
                <p>
                  SAVY operates a dedicated manufacturing facility in Ahmedabad, Gujarat, integrating computerized structural design, heavy tubular chassis fabrication, precision wire harness assembly, advanced battery pack integration, and multi-point quality assurance testing.
                </p>
                <ul>
                  <li><PiGear /> <span><strong>In-House CAD &amp; Fabrication:</strong> Rapid prototyping and custom chassis modifications.</span></li>
                  <li><PiFactory /> <span><strong>Verified Quality Standards:</strong> Multi-stage safety testing and electrical validation.</span></li>
                  <li><PiWrench /> <span><strong>Doorstep Service Network:</strong> Dedicated field service technicians for client fleets.</span></li>
                </ul>
                <div className="engineering-cta-wrap">
                  <a className="button-link primary" href="/technology">
                    <span>Explore Technology &amp; Plant</span>
                    <PiArrowRight aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: EXECUTIVE LEADERSHIP
          ========================================================================= */}
      <section className="about-team section-cream" aria-labelledby="leadership-title">
        <div className="container">
          <div className="team-carousel-header">
            <div className="section-heading left">
              <p className="eyebrow">Executive Leadership</p>
              <h2 id="leadership-title">The Minds Behind SAVY</h2>
              <p className="about-section-intro">Automotive veterans, engineering specialists, and operational leaders driving sustainable mobility.</p>
            </div>
            <div className="team-carousel-controls" aria-label="Leadership Carousel Navigation">
              <button
                type="button"
                className={`team-nav-btn ${canScrollTeamLeft ? 'active' : 'disabled'}`}
                onClick={() => handleTeamScroll('prev')}
                disabled={!canScrollTeamLeft}
                aria-label="Previous leadership member"
              >
                <PiArrowLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                className={`team-nav-btn ${canScrollTeamRight ? 'active' : 'disabled'}`}
                onClick={() => handleTeamScroll('next')}
                disabled={!canScrollTeamRight}
                aria-label="Next leadership member"
              >
                <PiArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="about-team-viewport" ref={teamScrollRef}>
          <div className="about-team-grid">
            {leadershipTeam.map(({ name, role, copy, image, linkedin, placeholder }) => (
              <article key={name} className="team-card-expanded">
                <div className="team-card-media">
                  <img src={image} alt={placeholder ? '' : `${name}, ${role}`} loading="lazy" />
                  {linkedin && (
                    <a className="team-linkedin" href={linkedin} target="_blank" rel="noreferrer" aria-label={`${name} on LinkedIn`}>
                      <PiLinkedinLogo aria-hidden="true" />
                    </a>
                  )}
                </div>
                <div className="team-card-copy">
                  <h3>{name}</h3>
                  <p className="team-role">{role}</p>
                  <p className="team-bio">{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: TRUSTED PARTNERS MARQUEE
          ========================================================================= */}
      <section className="trusted section-white" aria-labelledby="partners-title">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">Proven Trust</p>
            <h2 className="partners-title" id="partners-title">Trusted by Leading Institutions &amp; Enterprises</h2>
          </div>
        </div>
        <div className="sponsor-marquee">
          <div className="sponsor-track">
            {[false, true].map((hidden) => (
              <div className="sponsor-group" aria-hidden={hidden || undefined} key={String(hidden)}>
                {partners.map(([name, file]) => (
                  <div className="sponsor-logo" key={`${hidden}-${file}`}>
                    <img src={`/assets/partners/${file}`} alt={hidden ? '' : `${name} logo`} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: FINAL CONVERSION CTA
          ========================================================================= */}
      <section className="contact" id="contact" aria-labelledby="about-contact-cta">
        <video className="contact-video" muted autoPlay loop playsInline preload="metadata" aria-hidden="true">
          <source src="/assets/hero.mp4" type="video/mp4" />
        </video>
        <div className="contact-video-shade" aria-hidden="true" />
        <div className="container contact-inner">
          <p className="eyebrow mint">Connect With Our Leadership &amp; Engineering</p>
          <h2 id="about-contact-cta">Ready to build your custom EV fleet?</h2>
          <p>Consult with our engineering team to design vehicles configured around your specific operational needs.</p>
          <div>
            <button type="button" className="button-link primary" onClick={() => setModalOpen(true)}>
              <span>Discuss Your Requirement</span>
              <PiArrowRight aria-hidden="true" />
            </button>
            <a className="button-link ghost-light" href="https://wa.me/919638450070" target="_blank" rel="noreferrer">
              <span>Talk on WhatsApp</span>
              <PiArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <QuoteModal isOpen={modalOpen} onClose={() => setModalOpen(false)} mode="quote" />
      <SiteFooter />
    </main>
  );
}
