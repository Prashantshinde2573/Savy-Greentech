import { useEffect, useRef, useState } from 'react';
import {
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
import { leadershipTeam, journeyTimeline } from '../data/team';

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
  const [modalOpen, setModalOpen] = useState(false);
  const [heroVideoReady, setHeroVideoReady] = useState(false);

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

      // Section Headings & Card Groups Reveal
      gsap.utils.toArray(
        '.about-story-content, .founding-story-card, .journey-timeline-grid, .mission-vision-grid, .engineering-grid, .about-team-grid, .partners-title, .contact-inner'
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

  return (
    <main id="top" className="about-page">
      <SEOHead
        title="About Us | Driving Innovation. Delivering Sustainability."
        description="Learn about SAVY Greentech, India's trusted custom electric vehicle manufacturer founded by Chandan Mundhra. Engineering purpose-built EVs since 2014."
      />
      <SiteHeader currentPath="/about" transparentInitially={false} />

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
            <div className="hero-actions" style={{ marginTop: '24px' }}>
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
          SECTION 4: OUR FOUNDING STORY
          ========================================================================= */}
      <section className="section-cream founding-story-section" id="founding-story" aria-labelledby="founding-story-title">
        <div className="container">
          <div className="founding-story-card">
            <div className="founding-story-heading">
              <span className="founding-story-badge">Our Founding Story</span>
              <h2 id="founding-story-title">Custom EV Manufacturing Engineered from the Ground Up</h2>
            </div>
            <div className="founding-story-copy">
              <p className="founding-story-lead">
                Founded by <strong>Chandan Mundhra</strong>, an automotive engineering visionary with over 25 years of industry experience, <strong>Savy Greentech Pvt. Ltd.</strong> (formerly Savy Electric Vehicles Pvt. Ltd.) was established to bridge a crucial gap in India’s electric transition: custom, purpose-built commercial and campus electric vehicles.
              </p>
              <p>
                While mass-market automotive players focused on standardized passenger cars, Indian institutions, municipal corporations, resorts, hospitals, and industrial plants struggled with off-the-shelf vehicles that failed under demanding Indian terrain and operational duty cycles.
              </p>
              <p>
                SAVY pioneered indigenous design-to-assembly manufacturing in Ahmedabad, Gujarat, developing our own high-torque motor controllers, heavy-duty chassis frames, and intelligent battery systems. Today, SAVY powers operations for prestigious government bodies, defence establishments, luxury resorts, and Fortune 500 corporations across India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: COMPANY JOURNEY TIMELINE
          ========================================================================= */}
      <section className="section-white journey-section" aria-labelledby="journey-title">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">Our Evolution</p>
            <h2 id="journey-title">The SAVY Journey</h2>
            <p className="section-subtitle">From pioneering concepts to international exhibitions and nationwide institutional fleets.</p>
          </div>

          <div className="journey-timeline-grid">
            {journeyTimeline.map((item, index) => (
              <article className="journey-card" key={item.phase}>
                <div className="journey-card-header">
                  <span className="journey-index">0{index + 1}</span>
                  <span className="journey-year">{item.year}</span>
                </div>
                <h3 className="journey-phase">{item.phase}</h3>
                <h4 className="journey-card-title">{item.title}</h4>
                <p className="journey-description">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: MISSION & VISION
          ========================================================================= */}
      <section className="section-cream mission-vision-section" aria-labelledby="mission-title">
        <div className="container">
          <div className="mission-vision-grid">
            <article className="mission-card">
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

            <article className="mission-card highlight">
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
      </section>

      {/* =========================================================================
          SECTION 7: IN-HOUSE MANUFACTURING FACILITY
          ========================================================================= */}
      <section className="section-white manufacturing-overview-section" aria-labelledby="plant-title">
        <div className="container">
          <div className="engineering-grid">
            <div className="engineering-image">
              <img src="/assets/process/customization-design.jpg" alt="SAVY Greentech manufacturing and assembly plant" loading="lazy" />
            </div>
            <div className="engineering-copy">
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
              <div style={{ marginTop: '32px' }}>
                <a className="button-link primary" href="/technology">
                  <span>Explore Technology &amp; Plant</span>
                  <PiArrowRight aria-hidden="true" />
                </a>
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
          <div className="section-heading center">
            <p className="eyebrow">Executive Leadership</p>
            <h2 id="leadership-title">The Minds Behind SAVY</h2>
            <p className="about-section-intro">Automotive veterans, engineering specialists, and operational leaders driving sustainable mobility.</p>
          </div>
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
