import { useState, useRef } from 'react';
import { PiArrowRight, PiCheckCircle, PiFactory, PiFlag, PiGear, PiHandshake, PiLeaf, PiLinkedinLogo, PiShieldCheck, PiTrendUp, PiWrench } from 'react-icons/pi';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { PageHero } from '../components/PageHero';
import { SEOHead } from '../components/SEOHead';
import { QuoteModal } from '../components/QuoteModal';
import { leadershipTeam, journeyTimeline } from '../data/team';
import { usePageAnimations } from '../hooks/usePageAnimations';

const partners = [
  ['Tirupati', 'tirupati.webp'], ['Nimba', 'nimba.webp'], ['Monika', 'monika.webp'], ['Hetero', 'hetero.webp'],
  ['Civil Hospital', 'civil_hospital.webp'], ['Adani', 'adani.webp'], ['APTDC', 'aptdc.webp'], ['Bharat Gas', 'bharat_gas.webp'],
  ['CGPL', 'cgpl.webp'], ['HP', 'hp.webp'], ['Indian Railways', 'indian_railway.webp'], ['Ramdev', 'ramdev.webp'],
  ['Shivaji', 'shivaji.webp'], ['Sun Pharma', 'sun_pharma.webp'], ['Trivik', 'trivik.webp'], ['ZEEL', 'zeel.webp'],
  ['University of Pune', 'university_of_pune.webp'], ['Pune Municipal Corporation', 'pune_mc_bw.webp'],
  ['IIT Gandhinagar', 'iit_gandhinagar.webp'], ['CLP India', 'clpindia.webp'], ['Ahmedabad Municipal Corporation', 'amd_mc.webp'],
];

export function AboutPage() {
  const pageRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  usePageAnimations(pageRef);

  return (
    <main id="top" className="about-page" ref={pageRef}>
      <SEOHead
        title="About Us | Driving Innovation. Delivering Sustainability."
        description="Learn about SAVY Greentech, India's trusted custom electric vehicle manufacturer founded by Chandan Mundhra. Engineering purpose-built EVs since 2014."
      />
      <SiteHeader currentPath="/about" transparentInitially={false} />

      <PageHero
        eyebrow="Driving Innovation · Delivering Sustainability"
        title="Engineering India’s purpose-built electric mobility."
        description="A decade of engineering indigenous electric three-wheelers, luxury campus carts, municipal utility haulers, and special-purpose customized EV solutions."
        videoSrc="/assets/about-hero.mp4"
        primaryCtaText="Explore Manufacturing Capability"
        primaryCtaHref="/technology"
        secondaryCtaText="Talk to SAVY"
        secondaryCtaHref="/contact"
      />

      {/* Metrics Strip */}
      <section className="intro intro-impact section-white" aria-label="SAVY in numbers">
        <div className="container impact-layout">
          <h2>Redefining Mobility with Innovation</h2>
          <div className="impact-numbers">
            <div className="metrics">
              <article>
                <strong>500+</strong>
                <span>Vehicles Deployed</span>
              </article>
              <article>
                <strong>200K+</strong>
                <span>Tons of CO₂ Saved</span>
              </article>
              <article>
                <strong>100+</strong>
                <span>Satisfied Clients</span>
              </article>
              <article>
                <strong>10+</strong>
                <span>States Covered</span>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Founding Story */}
      <section className="about-story section-cream" aria-labelledby="founding-story-title">
        <div className="container about-story-content">
          <div className="about-story-heading">
            <p className="eyebrow">Our Founding Story</p>
            <h2 id="founding-story-title">Custom EV Manufacturing Engineered from the Ground Up</h2>
          </div>
          <div className="about-story-copy">
            <p className="about-story-lead">
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
      </section>

      {/* Company Journey Timeline */}
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

      {/* Mission & Vision */}
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

      {/* Manufacturing Facility Overview */}
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

      {/* Leadership Section */}
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

      {/* Partners Marquee */}
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

      {/* Final Conversion CTA */}
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
