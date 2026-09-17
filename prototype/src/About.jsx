import { useEffect, useRef, useState } from 'react';
import { PiArrowRight, PiCaretDown, PiLinkedinLogo, PiList, PiX } from 'react-icons/pi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlobalNavbar } from './components/SiteHeader';
import { GlobalFooter } from './components/SiteFooter';

gsap.registerPlugin(ScrollTrigger);

const vehicles = [
  ['Classic Golf', '/assets/classic-golf.jpeg'], ['Club Cart', '/assets/club-cart.jpg'], ['Electruck', '/assets/electruck.jpg'],
  ['Vintage Elite', '/assets/vintage-elite.jpg'], ['Tuk Tuk ë', '/assets/tuk-tuk.jpg'], ['Dump Truck', '/assets/dump-truck.jpg'],
];

const partners = [
  ['Tirupati', 'tirupati.webp'], ['Nimba', 'nimba.webp'], ['Monika', 'monika.webp'], ['Hetero', 'hetero.webp'],
  ['Civil Hospital', 'civil_hospital.webp'], ['Adani', 'adani.webp'], ['APTDC', 'aptdc.webp'], ['Bharat Gas', 'bharat_gas.webp'],
  ['CGPL', 'cgpl.webp'], ['HP', 'hp.webp'], ['Indian Railways', 'indian_railway.webp'], ['Ramdev', 'ramdev.webp'],
  ['Shivaji', 'shivaji.webp'], ['Sun Pharma', 'sun_pharma.webp'], ['Trivik', 'trivik.webp'], ['ZEEL', 'zeel.webp'],
  ['University of Pune', 'university_of_pune.webp'], ['Pune Municipal Corporation', 'pune_mc_bw.webp'],
  ['IIT Gandhinagar', 'iit_gandhinagar.webp'], ['CLP India', 'clpindia.webp'], ['Ahmedabad Municipal Corporation', 'amd_mc.webp'],
];

const focusAreas = [
  { title: 'Sustainability', copy: 'Savy Greentech is committed to eco-friendly, non-polluting electric vehicles and innovative e-mobility solutions for a sustainable tomorrow.', points: ['Eco-friendly vehicle solutions', 'Zero-emission technology', 'Sustainable e-mobility focus', 'Committed to green innovation'], image: '/assets/about-purpose/electric-future.jpg', alt: 'Green urban infrastructure supporting sustainable mobility' },
  { title: 'Redefining Mobility with Innovation', copy: 'Transforming transportation through cutting-edge electric vehicle technology and smart design.', points: ['Advanced EV engineering', 'Innovative design solutions', 'Smart mobility integration', 'Future-ready technology'], image: '/assets/about-purpose/innovation.webp', alt: 'Electric vehicle battery platforms in production' },
  { title: 'Building India’s Electric Future', copy: 'Driving India’s transition to clean, sustainable transportation across urban and rural landscapes.', points: ['Made for Indian roads', 'Expanding EV accessibility', 'Supporting national green goals', 'Empowering local communities'], image: '/assets/about-purpose/sustainability.jpg', alt: 'Map of public electric vehicle charging stations across India' },
];

const team = [
  { name: 'Chandan Mundhra', role: 'Founder & CEO', copy: 'Driving innovation in electric vehicle manufacturing with 25+ years of expertise in reliable, efficient, and customized EV solutions.', image: '/assets/team/chandan-mundhra.jpg', linkedin: 'https://www.linkedin.com/in/chandanmundhra/' },
  { name: 'Dhawal Soni', role: 'Chief Operating Officer', copy: 'Overseeing strategic operations, production planning, and business growth for innovative electric vehicle solutions.', image: '/assets/team/dhawal-soni.jpg', linkedin: 'https://www.linkedin.com/in/dhawalsoni01/' },
  { name: 'Lokendra Agarwal', role: 'Chief Technology Officer', copy: 'Driving research and development of advanced electric vehicle platforms, battery technologies, and smart EV systems.', image: '/assets/team/team-placeholder-1.jpg', placeholder: true },
  { name: 'Jitendra Adhyaru', role: 'Chief Financial Officer', copy: 'Leading financial planning, corporate governance, and strategic investments to accelerate electric mobility growth.', image: '/assets/team/team-placeholder-2.jpg', placeholder: true },
];

function Logo({ inverse = false }) {
  return <a className={`brand brand-lockup ${inverse ? 'inverse' : ''}`} href="/" aria-label="SAVYGREENTECH home"><img src={inverse ? '/assets/SG-logo-white.png' : '/assets/SG-logo-black.png'} alt="SAVYGREENTECH" /></a>;
}

function ButtonLink({ href, children, className = '' }) {
  return <a className={`button-link primary ${className}`} href={href}><span>{children}</span><PiArrowRight aria-hidden="true" /></a>;
}

export function About() {
  const videoRef = useRef(null);
  const storySequenceRef = useRef(null);
  const metricsRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [vehicleMenuOpen, setVehicleMenuOpen] = useState(false);
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reveal = () => { if (video.readyState >= 2) setHeroVideoReady(true); };
    video.addEventListener('playing', reveal);
    if (!video.paused) reveal();
    return () => video.removeEventListener('playing', reveal);
  }, []);

  useEffect(() => {
    const updateHeader = () => setHeaderScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  useEffect(() => {
    const metrics = metricsRef.current;
    if (!metrics) return;
    const context = gsap.context(() => {
      [...metrics.querySelectorAll('[data-counter]')].forEach(element => {
        const value = { current: Number(element.dataset.start) };
        gsap.to(value, {
          current: Number(element.dataset.end), duration: 1.6, ease: 'power2.out', snap: { current: 1 },
          scrollTrigger: { trigger: metrics, start: 'top 82%', once: true },
          onUpdate: () => { element.textContent = `${Math.round(value.current)}${element.dataset.suffix || ''}`; },
        });
      });
    }, metrics);
    return () => context.revert();
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = gsap.context(() => {
      gsap.timeline({ defaults: { duration: 0.9, ease: 'power4.out' } })
        .from('.about-hero .eyebrow', { autoAlpha: 0, y: 18 }, 0.15)
        .from('.about-hero h1', { autoAlpha: 0, y: 34 }, 0.24)
        .from('.about-hero-copy', { autoAlpha: 0, y: 22 }, 0.42);
      gsap.utils.toArray('.about-story-content, .about-focus-list, .about-team-grid, .metrics, .partners-title, .contact-inner').forEach(group => {
        gsap.from(group, { autoAlpha: 0, y: 34, duration: 0.85, ease: 'power4.out', scrollTrigger: { trigger: group, start: 'top 84%', once: true } });
      });

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

  return <main id="top" className="about-page">
    <GlobalNavbar currentPath="/about" transparentInitially={false} />

    <div className="about-story-sequence" ref={storySequenceRef}>
      <section className="hero about-hero" aria-labelledby="about-title"><video ref={videoRef} className="hero-video" muted autoPlay loop playsInline preload="metadata"><source src="/assets/about-hero.mp4" type="video/mp4" /></video><div className="hero-shade" /><div className={`hero-video-reveal ${heroVideoReady ? 'is-ready' : ''}`} aria-hidden="true" /><div className="hero-content container"><p className="eyebrow mint">About SAVYGREENTECH</p><h1 id="about-title">Building India’s electric future.</h1><p className="about-hero-copy">Over a decade of purpose-built electric mobility.</p></div></section>

      <section className="about-story" aria-labelledby="story-title"><div className="container about-story-content"><div className="about-story-heading"><h2 id="story-title">The Indian Custom EV Manufacturer</h2></div><div className="about-story-copy"><p className="about-story-lead">Savy Greentech Pvt. Ltd. (formerly Savy Electric Vehicles Pvt. Ltd.) specializes in electric three-wheelers, campus carts, golf carts, special-purpose customized EVs, and indigenous EV components including motors, controllers, and battery systems.</p><p>We serve institutions, government bodies, defence units, resorts, campuses, and industries across India. Quality, safety, customer satisfaction, and lasting client relationships remain at the centre of every project.</p></div></div></section>
    </div>

    <section className="intro intro-impact" aria-label="SAVYGREENTECH in numbers"><div className="container impact-layout"><h2>Redefining Mobility with Innovation</h2><div className="impact-numbers"><div className="metrics" ref={metricsRef}><article><strong data-counter data-start="0" data-end="500" data-suffix="+">0+</strong><span>Vehicles Deployed</span></article><article><strong data-counter data-start="0" data-end="200" data-suffix="K+">0K+</strong><span>Tons of CO₂ Saved</span></article><article><strong data-counter data-start="0" data-end="100" data-suffix="+">0+</strong><span>Satisfied Clients</span></article><article><strong data-counter data-start="0" data-end="10" data-suffix="+">0+</strong><span>States Covered</span></article></div></div></div></section>

    <section className="trusted section-white" aria-labelledby="about-partners-title"><div className="container"><h2 className="partners-title" id="about-partners-title">Our Partners</h2></div><div className="sponsor-marquee"><div className="sponsor-track">{[false, true].map(hidden => <div className="sponsor-group" aria-hidden={hidden || undefined} key={String(hidden)}>{partners.map(([name, file]) => <div className="sponsor-logo" key={`${hidden}-${file}`}><img src={`/assets/partners/${file}`} alt={hidden ? '' : `${name} logo`} /></div>)}</div>)}</div></div></section>

    <section className="about-team section-cream" aria-labelledby="team-title"><div className="container"><div className="section-heading center"><h2 id="team-title">Our Team</h2><p className="about-section-intro">The people powering our progress.</p></div><div className="about-team-grid">{team.map(({ name, role, image, linkedin, placeholder }) => <article key={name}><div className="team-card-media"><img src={image} alt={placeholder ? '' : `${name}, ${role}`} loading="lazy" />{linkedin && <a className="team-linkedin" href={linkedin} target="_blank" rel="noreferrer" aria-label={`${name} on LinkedIn`}><PiLinkedinLogo aria-hidden="true" /></a>}</div><div className="team-card-copy"><h3>{name}</h3><p className="team-role">{role}</p></div></article>)}</div></div></section>

    <section className="about-focus section-white" aria-labelledby="focus-title"><div className="container"><div className="section-heading center"><h2 id="focus-title">Electric mobility with a clear purpose.</h2></div><div className="about-focus-list">{focusAreas.map(({ title, copy, points, image, alt }) => <article key={title}><div className="about-focus-copy"><h3>{title}</h3><p>{copy}</p><ul>{points.map(point => <li key={point}>{point}</li>)}</ul></div><img src={image} alt={alt} loading="lazy" /></article>)}</div></div></section>

    <section className="contact" id="contact" aria-labelledby="about-contact-title"><video className="contact-video" muted autoPlay loop playsInline preload="metadata" aria-hidden="true"><source src="/assets/hero.mp4" type="video/mp4" /></video><div className="contact-video-shade" aria-hidden="true" /><div className="container contact-inner"><p className="eyebrow mint">Start a conversation</p><h2 id="about-contact-title">Ready to power<br />your project?</h2><p>Talk to our team about a customized electric vehicle solution.</p><div><ButtonLink href="mailto:info@savygreentech.com">Get in Touch</ButtonLink><ButtonLink href="https://wa.me/919638450070">Talk on WhatsApp</ButtonLink></div></div></section>

    <GlobalFooter />
  </main>;
}

