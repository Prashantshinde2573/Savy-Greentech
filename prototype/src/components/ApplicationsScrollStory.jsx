import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  PiArrowRight, 
  PiCheckCircle, 
  PiFactory, 
  PiFirstAid, 
  PiForkKnife, 
  PiGraduationCap, 
  PiSuitcaseSimple, 
  PiTrash, 
  PiTruck 
} from 'react-icons/pi';
import { applicationsData } from '../data/applications';

gsap.registerPlugin(ScrollTrigger);

const sectorIcons = {
  'municipal-government': PiTrash,
  'hospitality-tourism': PiSuitcaseSimple,
  'healthcare': PiFirstAid,
  'industrial-logistics': PiFactory,
  'defence-campuses': PiGraduationCap,
  'food-retail': PiForkKnife,
  'fmcg-delivery': PiTruck,
};

const tabLabels = {
  'municipal-government': 'Municipal & Govt',
  'hospitality-tourism': 'Hospitality & Tourism',
  'healthcare': 'Healthcare',
  'industrial-logistics': 'Industrial & Logistics',
  'defence-campuses': 'Defence & Campuses',
  'food-retail': 'Food & Retail',
  'fmcg-delivery': 'FMCG & Delivery',
};

export function ApplicationsScrollStory({ onInquireSector }) {
  const containerRef = useRef(null);
  const stRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);
  const isClickScrollingRef = useRef(false);

  const totalSlides = applicationsData.length;

  // Auto-scroll active tab into view horizontally whenever activeIndex changes
  useEffect(() => {
    const activeTab = tabRefs.current[activeIndex];
    if (activeTab && typeof activeTab.scrollIntoView === 'function') {
      activeTab.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }, [activeIndex]);

  // Mobile scroll tracking: update activeIndex and tabs when user scrolls through cards
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: [0.1, 0.5]
    };

    const observerCallback = (entries) => {
      if (isClickScrollingRef.current) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Number(entry.target.getAttribute('data-index'));
          if (!isNaN(idx) && idx >= 0 && idx < totalSlides) {
            setActiveIndex(idx);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elements = document.querySelectorAll('.story-mobile-stream .application-sector-block');
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [totalSlides]);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add('(min-width: 961px)', () => {
      const images = gsap.utils.toArray('.story-image-slide');
      const contents = gsap.utils.toArray('.story-content-panel');
      const numElements = gsap.utils.toArray('.story-num-item');
      const progressBar = document.querySelector('.story-progress-bar-fill');

      // 1. Set initial states deterministically for forward & reverse
      images.forEach((img, i) => {
        if (i === 0) {
          gsap.set(img, { autoAlpha: 1, scale: 1, zIndex: 2, clipPath: 'inset(0% 0% 0% 0%)' });
        } else {
          gsap.set(img, { autoAlpha: 0, scale: 1.05, zIndex: 1, clipPath: 'inset(100% 0% 0% 0%)' });
        }
      });

      contents.forEach((panel, i) => {
        if (i === 0) {
          gsap.set(panel, { autoAlpha: 1, y: 0, zIndex: 2 });
        } else {
          gsap.set(panel, { autoAlpha: 0, y: 24, zIndex: 1 });
        }
      });

      numElements.forEach((num, i) => {
        if (i === 0) {
          gsap.set(num, { autoAlpha: 1, y: 0 });
        } else {
          gsap.set(num, { autoAlpha: 0, y: 8 });
        }
      });

      if (progressBar) {
        gsap.set(progressBar, { scaleX: 1 / totalSlides, transformOrigin: 'left center' });
      }

      // 850px scroll per slide transition
      const scrollDistance = (totalSlides - 1) * 850;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 120px',
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const rawIdx = self.progress * (totalSlides - 1);
            const currentIdx = Math.min(totalSlides - 1, Math.max(0, Math.round(rawIdx)));
            setActiveIndex(currentIdx);
          }
        }
      });

      stRef.current = tl.scrollTrigger;

      // Progress bar scrubbing smoothly along the entire timeline
      if (progressBar) {
        tl.to(progressBar, {
          scaleX: 1,
          ease: 'none',
          duration: totalSlides - 1
        }, 0);
      }

      // 2. Build 100% reversible chained transitions between slides
      for (let i = 0; i < totalSlides - 1; i++) {
        const time = i;
        const currentImg = images[i];
        const nextImg = images[i + 1];
        const currentContent = contents[i];
        const nextContent = contents[i + 1];
        const currentNum = numElements[i];
        const nextNum = numElements[i + 1];

        // Slide i transitions out
        tl.to(currentContent, {
          autoAlpha: 0,
          y: -20,
          ease: 'power2.inOut',
          duration: 0.55
        }, time);

        tl.to(currentImg, {
          scale: 1.04,
          opacity: 0.2,
          ease: 'power2.inOut',
          duration: 0.8
        }, time);

        tl.to(currentNum, {
          autoAlpha: 0,
          y: -8,
          ease: 'power2.inOut',
          duration: 0.4
        }, time);

        // Slide i + 1 transitions in (using fromTo to guarantee reversible state)
        tl.fromTo(nextImg, 
          { clipPath: 'inset(100% 0% 0% 0%)', autoAlpha: 0, scale: 1.05, zIndex: i + 3 },
          { clipPath: 'inset(0% 0% 0% 0%)', autoAlpha: 1, scale: 1, ease: 'power2.inOut', duration: 0.8 },
          time + 0.1
        );

        tl.fromTo(nextContent,
          { autoAlpha: 0, y: 24, zIndex: i + 3 },
          { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.55 },
          time + 0.25
        );

        tl.fromTo(nextNum,
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.4 },
          time + 0.25
        );
      }
    });

    return () => {
      mm.revert();
    };
  }, [totalSlides]);

  const handleJumpClick = (e, index, slug) => {
    e.preventDefault();
    setActiveIndex(index);

    if (window.innerWidth >= 961 && stRef.current) {
      const st = stRef.current;
      const progress = index / (totalSlides - 1);
      const targetY = st.start + progress * (st.end - st.start);
      window.scrollTo({
        top: targetY + 2,
        behavior: 'smooth'
      });
    } else {
      const targetElem = document.getElementById(`mob-${slug}`) || document.getElementById(slug);
      if (targetElem) {
        isClickScrollingRef.current = true;
        const navStrip = document.querySelector('.sector-jump-nav-strip');
        const navHeight = navStrip ? navStrip.getBoundingClientRect().height : 48;
        const totalHeaderOffset = navHeight + (window.innerWidth <= 680 ? 66 : 72) + 8;
        const elementPosition = targetElem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - totalHeaderOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        setTimeout(() => {
          isClickScrollingRef.current = false;
        }, 750);
      }
    }
  };

  return (
    <div className="applications-story-wrapper">
      {/* 1. SINGLE, PERMANENT TOP APPLICATION NAVIGATION LAYER */}
      <nav className="sector-jump-nav-strip" aria-label="Applications navigation" role="tablist">
        <div className="sector-jump-container">
          <div className="sector-jump-grid">
            {applicationsData.map((app, index) => {
              const Icon = sectorIcons[app.id] || PiFactory;
              const isActive = index === activeIndex;
              const label = tabLabels[app.id] || app.title;
              return (
                <a
                  key={app.id}
                  ref={(el) => (tabRefs.current[index] = el)}
                  href={`#${app.slug}`}
                  onClick={(e) => handleJumpClick(e, index, app.slug)}
                  className={`sector-jump-link ${isActive ? 'is-active' : ''}`}
                  title={app.title}
                  role="tab"
                  aria-selected={isActive}
                >
                  <Icon className="sector-icon" />
                  <span>{label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      {/* 2. PINNED SCROLL-DRIVEN STORYTELLING CONTAINER (ONLY THIS PINS) */}
      <div className="applications-scroll-container" ref={containerRef}>
        {/* Progress & Counter Bar */}
        <div className="story-hud-bar">
          <div className="container story-hud-inner">
            <div className="story-counter-wrap">
              <span className="story-counter-label">Application</span>
              <div className="story-counter-numbers">
                {applicationsData.map((_, i) => (
                  <span
                    key={i}
                    className={`story-num-item ${i === activeIndex ? 'active' : ''}`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                ))}
                <span className="story-num-total">/ {String(totalSlides).padStart(2, '0')}</span>
              </div>
            </div>
            <div className="story-progress-track">
              <div className="story-progress-bar-fill" />
            </div>
          </div>
        </div>

        {/* Desktop Pinned Stage (~100vh) */}
        <div className="story-stage-viewport">
          <div className="container story-stage-container">
            <div className="story-stage-grid">
              
              {/* Visual Column - Layered Image Stack */}
              <div className="story-image-column">
                <div className="story-image-stack">
                  {applicationsData.map((app, i) => (
                    <div key={app.id} className="story-image-slide" data-index={i}>
                      <img
                        src={app.image}
                        alt={`${app.title} electric mobility`}
                        loading={i === 0 ? 'eager' : 'lazy'}
                      />
                      <div className="sector-quote-card">
                        <p>“{app.highlightQuote}”</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content Column - Layered Content Stack */}
              <div className="story-content-column">
                <div className="story-content-stack">
                  {applicationsData.map((app, index) => {
                    const Icon = sectorIcons[app.id] || PiFactory;
                    return (
                      <article
                        key={app.id}
                        id={app.slug}
                        className="story-content-panel"
                        data-index={index}
                        aria-labelledby={`heading-story-${app.slug}`}
                      >
                        <div className="sector-badge">
                          <Icon />
                          <span>{app.subtitle}</span>
                        </div>

                        <h2 id={`heading-story-${app.slug}`}>{app.title}</h2>
                        <p className="sector-lead-copy">{app.leadCopy}</p>

                        {/* Problem & Solution Flow */}
                        <div className="problem-solution-box">
                          <div className="ps-block problem">
                            <h4>The Operational Challenge:</h4>
                            <p>{app.problem}</p>
                          </div>

                          <div className="ps-block solution">
                            <h4>The SAVY Engineering Solution:</h4>
                            <p>{app.solution}</p>
                          </div>
                        </div>

                        {/* Relevant Vehicles */}
                        <div className="sector-vehicles-strip">
                          <span className="sv-label">Recommended Platforms:</span>
                          <div className="sv-pills">
                            {app.relevantVehicles.map((veh, vIdx) => (
                              <span key={vIdx} className="sv-pill">{veh}</span>
                            ))}
                          </div>
                        </div>

                        {/* Proof Points */}
                        <div className="sector-proof-points">
                          <h5>Deployment Proof &amp; Impact:</h5>
                          <ul>
                            {app.proofPoints.map((pt, pIdx) => (
                              <li key={pIdx}>
                                <PiCheckCircle className="proof-icon" />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Actions */}
                        <div className="sector-actions">
                          <button
                            type="button"
                            className="button-link primary btn-sm"
                            onClick={() => onInquireSector(app.title)}
                          >
                            <span>Request Proposal for {app.title}</span>
                            <PiArrowRight aria-hidden="true" />
                          </button>
                          <a href="/products" className="button-link ghost btn-sm">
                            <span>View Matching Vehicles</span>
                          </a>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Mobile Stream (Clean, zero duplicate nav) */}
        <div className="story-mobile-stream">
          {applicationsData.map((app, index) => {
            const Icon = sectorIcons[app.id] || PiFactory;
            const isEven = index % 2 === 0;
            return (
              <section
                key={`mob-${app.id}`}
                id={`mob-${app.slug}`}
                data-index={index}
                className={`application-sector-block ${isEven ? 'section-white' : 'section-cream'}`}
              >
                <div className="container">
                  <div className="sector-mobile-card">
                    <div className="sector-mobile-number">
                      <span>{String(index + 1).padStart(2, '0')}</span> / {String(totalSlides).padStart(2, '0')}
                    </div>
                    <div className="sector-image-wrap">
                      <img src={app.image} alt={`${app.title} electric mobility`} loading="lazy" />
                      <div className="sector-quote-card">
                        <p>“{app.highlightQuote}”</p>
                      </div>
                    </div>

                    <div className="sector-info-col" style={{ marginTop: '20px' }}>
                      <div className="sector-badge">
                        <Icon />
                        <span>{app.subtitle}</span>
                      </div>

                      <h2>{app.title}</h2>
                      <p className="sector-lead-copy">{app.leadCopy}</p>

                      <div className="problem-solution-box">
                        <div className="ps-block problem">
                          <h4>The Operational Challenge:</h4>
                          <p>{app.problem}</p>
                        </div>

                        <div className="ps-block solution">
                          <h4>The SAVY Engineering Solution:</h4>
                          <p>{app.solution}</p>
                        </div>
                      </div>

                      <div className="sector-vehicles-strip">
                        <span className="sv-label">Recommended Platforms:</span>
                        <div className="sv-pills">
                          {app.relevantVehicles.map((veh, i) => (
                            <span key={i} className="sv-pill">{veh}</span>
                          ))}
                        </div>
                      </div>

                      <div className="sector-proof-points">
                        <h5>Deployment Proof &amp; Impact:</h5>
                        <ul>
                          {app.proofPoints.map((pt, i) => (
                            <li key={i}>
                              <PiCheckCircle className="proof-icon" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="sector-actions">
                        <button
                          type="button"
                          className="button-link primary btn-sm"
                          onClick={() => onInquireSector(app.title)}
                        >
                          <span>Request Proposal for {app.title}</span>
                          <PiArrowRight aria-hidden="true" />
                        </button>
                        <a href="/products" className="button-link ghost btn-sm">
                          <span>View Matching Vehicles</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
