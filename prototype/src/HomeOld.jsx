import { useEffect, useRef, useState } from 'react';
import { PiArrowLeft, PiArrowRight, PiBatteryCharging, PiCaretDown, PiCarProfile, PiChatsCircle, PiCpu, PiHeadset, PiList, PiShieldCheck, PiWrench, PiX } from 'react-icons/pi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlobalNavbar } from './components/SiteHeader';
import { GlobalFooter } from './components/SiteFooter';

gsap.registerPlugin(ScrollTrigger);

const applications = [
  { title: 'Golf Courses & Resorts', image: '/assets/applications/golf-course.jpg', copy: 'Premium electric mobility solutions designed for seamless guest and staff transportation across golf resorts and luxury properties.' },
  { title: 'University & School Campuses', image: '/assets/applications/campus.jpg', copy: 'Safe, eco-friendly transport options for students, faculty, and campus operations with quiet and efficient electric vehicles.' },
  { title: 'Airports & Defence', image: '/assets/applications/airport.jpg', copy: 'Reliable electric utility vehicles built for secure transportation, personnel movement, and operational efficiency in large facilities.' },
  { title: 'Townships & Communities', image: '/assets/applications/community.jpg', copy: 'Convenient and sustainable mobility solutions for residential communities, internal transport, and maintenance operations.' },
  { title: 'Industrial Logistics', image: '/assets/applications/logistics.jpg', copy: 'Efficient electric cargo and utility vehicles engineered for warehouse movement and industrial logistics.' },
  { title: 'Government Projects', image: '/assets/applications/government.jpg', copy: 'Trusted electric mobility solutions supporting public infrastructure and institutional transportation needs.' },
  { title: 'Tourism & Sightseeing', image: '/assets/applications/tourism.jpg', copy: 'Comfortable and eco-friendly electric vehicles enhancing visitor experiences across tourist destinations.' },
  { title: 'Agriculture Mobility', image: '/assets/applications/agriculture.jpg', copy: 'Durable electric transport solutions supporting agricultural activities and rural mobility.' },
];
const vehicles = [
  { name: 'Classic Golf', image: '/assets/classic-golf.jpeg' },
  { name: 'Club Cart', image: '/assets/club-cart.jpg' },
  { name: 'Electruck', image: '/assets/electruck.jpg' },
  { name: 'Vintage Elite', image: '/assets/vintage-elite.jpg' },
  { name: 'Tuk Tuk ë', image: '/assets/tuk-tuk.jpg' },
  { name: 'Dump Truck', image: '/assets/dump-truck.jpg' },
];
const menuVehicles = vehicles.map(({ name, image }) => [name, image]);
const process = [
  ['1', 'Consultation', 'Understand your requirements and operations.', '/assets/process/consultation-external.jpg'], ['2', 'Customization', 'Configure vehicles to match your exact needs.', '/assets/process/customization-design.jpg'],
  ['3', 'Deployment', 'Integrate the vehicle into your operations.', '/assets/process/deployment-external.jpg'], ['4', 'Ongoing Support', 'Technical support and maintenance.', '/assets/process/support-external.jpg'],
];
const partners = [
  ['Tirupati', 'tirupati.webp'], ['Nimba', 'nimba.webp'], ['Monika', 'monika.webp'], ['Hetero', 'hetero.webp'],
  ['Civil Hospital', 'civil_hospital.webp'], ['Adani', 'adani.webp'], ['APTDC', 'aptdc.webp'], ['Bharat Gas', 'bharat_gas.webp'],
  ['CGPL', 'cgpl.webp'], ['HP', 'hp.webp'], ['Indian Railways', 'indian_railway.webp'], ['Ramdev', 'ramdev.webp'],
  ['Shivaji', 'shivaji.webp'], ['Sun Pharma', 'sun_pharma.webp'], ['Trivik', 'trivik.webp'], ['ZEEL', 'zeel.webp'],
  ['University of Pune', 'university_of_pune.webp'], ['Pune Municipal Corporation', 'pune_mc_bw.webp'],
  ['IIT Gandhinagar', 'iit_gandhinagar.webp'], ['CLP India', 'clpindia.webp'], ['Ahmedabad Municipal Corporation', 'amd_mc.webp'],
];

function Logo({ inverse = false }) { return <a className={`brand ${inverse ? 'inverse' : ''}`} href="#top" aria-label="SAVYGREENTECH home"><img src="/assets/logo.jpeg" alt="" /><span>SAVYGREENTECH</span></a>; }
function ButtonLink({ href, children, kind = 'primary', className = '' }) { return <a className={`button-link ${kind} ${className}`} href={href}><span>{children}</span><PiArrowRight aria-hidden="true" /></a>; }
function Heading({ eyebrow, title, center = false }) { return <div className={`section-heading ${center ? 'center' : ''}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>; }

export function HomeOld() {
  const videoRef = useRef(null);
  const applicationsRef = useRef(null);
  const metricsRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [vehicleMenuOpen, setVehicleMenuOpen] = useState(false);
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  useEffect(() => {
    const video = videoRef.current; if (!video) return;
    const reveal = () => { if (video.readyState >= 2) setHeroVideoReady(true); };
    video.addEventListener('playing', reveal);
    if (!video.paused) reveal();
    return () => video.removeEventListener('playing', reveal);
  }, []);
  useEffect(() => {
    const updateHeader = () => setHeaderScrolled(window.scrollY > 24);
    updateHeader(); window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);
  useEffect(() => {
    const metrics = metricsRef.current;
    if (!metrics) return;
    const counterElements = [...metrics.querySelectorAll('[data-counter]')];
    const counterValues = counterElements.map(element => ({
      element,
      value: { current: Number(element.dataset.start) },
      end: Number(element.dataset.end),
      suffix: element.dataset.suffix || '',
    }));
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: metrics, start: 'top 82%', once: true },
      });
      counterValues.forEach(counter => {
        timeline.to(counter.value, {
          current: counter.end,
          duration: 1.6,
          ease: 'power2.out',
          snap: { current: 1 },
          onUpdate: () => { counter.element.textContent = `${Math.round(counter.value.current)}${counter.suffix}`; },
        }, 0);
      });
    }, metrics);
    return () => context.revert();
  }, []);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = gsap.context(() => {
      gsap.timeline({ defaults: { duration: 0.85, ease: 'power4.out' } })
        .from('.hero-content .eyebrow', { autoAlpha: 0, y: 18 }, 0.12)
        .from('.hero-content h1', { autoAlpha: 0, y: 28 }, 0.2)
        // Animate the wrapper so the button's CSS hover transition never delays GSAP movement.
        .from('.hero-actions', { autoAlpha: 0, y: 20, clearProps: 'transform' }, 0.42)
        .from('.video-toggle', { autoAlpha: 0 }, 0.58);

      gsap.utils.toArray('.section-heading, .applications-intro, .intro-lower, .engineering-copy, .contact-inner').forEach(element => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 30,
          duration: 0.85,
          ease: 'power4.out',
          scrollTrigger: { trigger: element, start: 'top 86%', once: true },
        });
      });

      gsap.from('.process-steps article', {
        autoAlpha: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.18,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.process-steps', start: 'top 78%', once: true },
      });

      gsap.utils.toArray('.metrics, .vehicle-grid, .application-carousel, .tech-grid, .process-grid, .why-grid').forEach(group => {
        const cards = group.querySelectorAll('article');
        if (!cards.length) return;
        gsap.from(cards, {
          autoAlpha: 0,
          y: 36,
          duration: 0.75,
          stagger: 0.08,
          ease: 'power4.out',
          scrollTrigger: { trigger: group, start: 'top 84%', once: true },
        });
      });
    });
    return () => context.revert();
  }, []);
  const scrollApplications = direction => {
    const track = applicationsRef.current; if (!track) return;
    const card = track.querySelector('.application-card');
    track.scrollBy({ left: direction * ((card?.getBoundingClientRect().width || 320) + 24), behavior: 'smooth' });
  };

  return <main id="top" className="home-old">
    <GlobalNavbar currentPath="/home-old" transparentInitially={true} />

    <section className="hero" aria-labelledby="hero-title"><video ref={videoRef} className="hero-video" muted autoPlay loop playsInline preload="metadata"><source src="/assets/hero-bg.mp4" type="video/mp4" /></video><div className="hero-shade" /><div className={`hero-video-reveal ${heroVideoReady ? 'is-ready' : ''}`} aria-hidden="true" />
      <div className="hero-content container"><p className="eyebrow mint">Electric mobility · Since 2014</p><h1 id="hero-title">Electric vehicles built around your requirements.</h1><div className="hero-actions"><ButtonLink href="#vehicles" kind="mint">Explore Our Vehicles</ButtonLink></div></div>
    </section>

    <section className="intro intro-impact" id="about" aria-label="About SAVYGREENTECH in numbers"><div className="container impact-layout"><h2>Redefining Mobility with Innovation</h2><div className="impact-numbers"><div className="metrics" ref={metricsRef}><article><strong data-counter data-start="0" data-end="500" data-suffix="+" aria-label="More than 500 vehicles deployed">0+</strong><span>Vehicles Deployed</span></article><article><strong data-counter data-start="0" data-end="200" data-suffix="K+" aria-label="More than 200,000 tons of carbon dioxide saved">0K+</strong><span>Tons of CO₂ Saved</span></article><article><strong data-counter data-start="0" data-end="100" data-suffix="+" aria-label="More than 100 satisfied clients">0+</strong><span>Satisfied Clients</span></article><article><strong data-counter data-start="0" data-end="10" data-suffix="+" aria-label="More than 10 states covered">0+</strong><span>States Covered</span></article></div></div></div></section>

    <section className="trusted section-white" aria-labelledby="partners-title"><div className="container"><h2 className="partners-title" id="partners-title">Our Partners</h2></div><div className="sponsor-marquee"><div className="sponsor-track">{[false, true].map(hidden => <div className="sponsor-group" aria-hidden={hidden || undefined} key={String(hidden)}>{partners.map(([name, file]) => <div className="sponsor-logo" key={`${hidden}-${file}`}><img src={`/assets/partners/${file}`} alt={hidden ? '' : `${name} logo`} /></div>)}</div>)}</div></div></section>

    <section className="vehicles section-cream" id="vehicles"><div className="container"><div className="section-heading center process-heading"><h2>Electric vehicle range</h2><p>A platform for every operation.</p></div><div className="vehicle-grid">{vehicles.map(vehicle => <article className="vehicle-card" key={vehicle.name}><img src={vehicle.image} alt={`${vehicle.name} electric vehicle`} /><h3>{vehicle.name}</h3></article>)}</div></div></section>

    <section className="applications section-white" id="applications"><div className="container"><div className="section-heading center"><h2>Applications</h2></div><p className="applications-intro">Purpose-built electric mobility for complex operational environments.</p></div><div className="application-carousel" ref={applicationsRef} tabIndex="0" aria-label="Application categories">{applications.map(application => <article className="application-card" key={application.title}><img src={application.image} alt={`${application.title} electric mobility`} /><h3>{application.title}</h3><p>{application.copy}</p></article>)}</div><div className="container application-controls"><div><button type="button" onClick={() => scrollApplications(-1)} aria-label="Previous applications"><PiArrowLeft /></button><button type="button" onClick={() => scrollApplications(1)} aria-label="Next applications"><PiArrowRight /></button></div></div></section>



    <section className="process section-cream" aria-labelledby="process-title"><div className="container"><div className="section-heading center process-heading"><h2 id="process-title">Our process</h2><p>From requirement to deployment.</p></div><div className="process-split"><div className="process-feature-image"><img src="/assets/process/customization-design.jpg" alt="Electric vehicle designers working at a drawing board" loading="lazy" /></div><div className="process-steps">{process.map(([number,title,copy]) => <article key={number}><h3><span className="process-step-number" aria-hidden="true">{number.padStart(2, '0')}</span>{title}</h3><p>{copy}</p></article>)}</div></div></div></section>

    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact-inner">
        <p className="eyebrow mint">Start a conversation</p>
        <h2 id="contact-title">Ready to power<br />your project?</h2>
        <p>Talk to our team about a customized electric vehicle solution.</p>
        <div><ButtonLink href="mailto:info@savygreentech.com">Get in Touch</ButtonLink><ButtonLink href="https://wa.me/919638450070">Talk on WhatsApp</ButtonLink></div>
      </div>
    </section>
    <GlobalFooter />
  </main>;
}
