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
  { name: 'Classic Golf', image: '/assets/classic-golf.jpeg', copy: 'Classic Golf is a four-wheel campus cart designed for internal transportation purposes across various sectors such as universities, schools, resorts, government bodies, industrial campuses, and large institutions.' },
  { name: 'Club Cart', image: '/assets/club-cart.jpg', copy: 'Club Cart is also a four-wheel campus cart similar to the Classic Golf model, designed for internal transportation in campuses, resorts, institutions, and commercial premises. The primary difference lies in its premium exterior design and styling.' },
  { name: 'Electruck', image: '/assets/electruck.jpg', copy: 'Electruck is a cargo-loading three-wheeler designed to cater to clients across various sectors such as FMCG delivery, laundry services, material handling, and more.' },
  { name: 'Vintage Elite', image: '/assets/vintage-elite.jpg', copy: 'A premium four-wheel campus cart designed for internal transportation with a vintage appearance. It is preferred by universities, schools, resorts, government bodies, and for VIP movement within large campuses and commercial premises.' },
  { name: 'Tuk Tuk ë', image: '/assets/tuk-tuk.jpg', copy: 'Tuk Tuk ë is a versatile three-wheel passenger vehicle designed for urban and commercial transport, available in multiple seating configurations from 2+1 to 8+1, with the 4+1 variant approved for on-road use.' },
  { name: 'Dump Truck', image: '/assets/dump-truck.jpg', copy: 'Dumptruck is a three-wheel electric waste collection vehicle designed for efficient door-to-door garbage collection and municipal sanitation operations, widely used by Gram Panchayats, municipalities, and government sanitation departments.' },
  { name: 'Coming Soon', image: '/assets/coming-soon-vehicle.png', copy: 'A new purpose-built electric vehicle is currently in development.', comingSoon: true },
];
const menuVehicles = vehicles.filter(({ comingSoon }) => !comingSoon).map(({ name, image }) => [name, image]);
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
const newsStories = [
  {
    category: 'Company milestone · 2021',
    title: 'Savë partners with ADS Foundation to build EV workforce skills',
    copy: 'Savë formally associated with ADS Foundation, Gandhinagar, as an industry partner to help equip India’s workforce with skills required by the growing electric-vehicle industry.',
    image: '/assets/news/ads-foundation-partnership.png',
    href: 'https://www.linkedin.com/posts/chandanmundhra_electricvehicles-employment-skillindiamission-activity-6878358943819804672-aHtr',
  },
  {
    category: 'Industrial Product Monitor · Feb 2026',
    title: 'Savy Greentech featured for premium electric mobility',
    copy: 'Industrial Product Monitor highlights Savy Greentech’s clean, silent and sustainable electric mobility solutions for VIP and institutional movement across industries, resorts and campuses.',
    image: '/assets/news/ipm-premium-electric-mobility.png',
    href: 'https://lnkd.in/dFKvrmNN',
  },
  {
    category: 'Business Standard · 3 Jan 2024',
    title: 'Indian E-Auto Grabs International Attention at Netherlands E-Mobility Expo',
    copy: 'Savy Electric’s City Pod emerged as a standout at the Netherlands Expo, demonstrating the potential of Indian electric autos in sustainable tourism.',
    image: '/assets/news/city-pod-netherlands.jpg',
    href: 'https://www.business-standard.com/amp/content/press-releases-ani/a-new-look-for-indian-e-auto-grabs-international-attention-at-netherlands-e-mobility-expo-124010300834_1.html',
  },
  {
    category: 'The Policy Times · 2025',
    title: 'Savy EV: India’s electric revolution with Chandan Mundhra',
    copy: 'The feature explores locally powered three-wheelers, Savy’s research and service ecosystem, domestic sourcing and its plans for charging and battery recycling.',
    image: '/assets/news/policy-times-savy.jpg',
    href: 'https://www.linkedin.com/posts/thepolicytimes_thepolicytimes-electricvehicles-savyev-activity-7341711368921755648-kjr8',
  },
  {
    category: 'Industrial Product Monitor · Jul 2025',
    title: 'Savy Greentech Spearheads the EV Evolution',
    copy: 'Industrial Product Monitor profiles Savy Greentech’s purpose-built vehicles and its research, fabrication, assembly and quality-control process.',
    image: '/assets/news/industrial-product-monitor.jpg',
    href: 'https://fliphtml5.com/mdidf/hjtw/E-Magazine_July_2025/',
  },
  {
    category: 'IssueWire · 26 Mar 2022',
    title: 'Ahmedabad-based EV startup Savy Electric raises seed investment',
    copy: 'Savy Electric raised a seed round led by NRI angel investor Ratul Bhattacharya to support new passenger and freight vehicles and expand manufacturing.',
    image: '/assets/news/savy-seed-investment.png',
    href: 'https://www.issuewire.com/ahmedabad-based-ev-startup-savy-electric-raises-seed-investment-1728368941969228',
  },
  {
    category: 'The CEO Magazine · 8 May 2026',
    title: 'EV Fleet & Logistics Forum 2026 brings industry leaders together',
    copy: 'The forum brought together EV manufacturers, fleet operators and financiers, with Savy Greentech COO Dhawal Soni among the participating leaders.',
    image: '/assets/news/ev-fleet-forum.jpg',
    href: 'https://www.theceo.in/press-release/ev-fleet-logistics-forum-2026-key-players-like-drivn-and-refex-mobility-driving-indias-ev-fleet-solutions',
  },
  {
    category: 'IITRAM · 2 Sep 2023',
    title: 'Chandan Mundhra joins Industry Academia Conclave 2023',
    copy: 'IITRAM hosted Chandan Mundhra, Director of Savy Electric Vehicles, as a panelist for its Industry Academia Conclave.',
    image: '/assets/news/iitram-conclave.jpg',
    href: 'https://alumni.iitram.ac.in/singevent/18',
  },
];

function Logo({ inverse = false }) { return <a className={`brand brand-lockup ${inverse ? 'inverse' : ''}`} href="#top" aria-label="SAVYGREENTECH home"><img src={inverse ? '/assets/SG-logo-white.png' : '/assets/SG-logo-black.png'} alt="SAVYGREENTECH" /></a>; }
function ButtonLink({ href, children, kind = 'primary', className = '' }) { return <a className={`button-link ${kind} ${className}`} href={href}><span>{children}</span><PiArrowRight aria-hidden="true" /></a>; }
function Heading({ eyebrow, title, center = false }) { return <div className={`section-heading ${center ? 'center' : ''}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>; }

export function App() {
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
        .from('.hero-actions', { autoAlpha: 0, y: 20, clearProps: 'transform' }, 0.42);

      gsap.utils.toArray('.section-heading, .applications-intro, .intro-lower, .engineering-copy, .contact-inner').forEach(element => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 30,
          duration: 0.85,
          ease: 'power4.out',
          scrollTrigger: { trigger: element, start: 'top 86%', once: true },
        });
      });

      gsap.from('.process-timeline-step', {
        autoAlpha: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.18,
        ease: 'power4.out',
          scrollTrigger: { trigger: '.process-timeline', start: 'top 78%', once: true },
      });

      const processTimeline = gsap.timeline({
        scrollTrigger: { trigger: '.process-timeline', start: 'top 78%', once: true },
      });
      processTimeline
        .to('.process-timeline-fill', { scaleX: 1, duration: 2.4, ease: 'none' })
        .to('.process-timeline-step:nth-child(3) .process-timeline-number', { backgroundColor: 'var(--electric-blue)', color: 'var(--white)', duration: 0.22 }, 0.8)
        .to('.process-timeline-step:nth-child(4) .process-timeline-number', { backgroundColor: 'var(--electric-blue)', color: 'var(--white)', duration: 0.22 }, 1.6)
        .to('.process-timeline-step:nth-child(5) .process-timeline-number', { backgroundColor: 'var(--electric-blue)', color: 'var(--white)', duration: 0.22 }, 2.4);

      gsap.utils.toArray('.metrics, .vehicle-grid, .application-carousel, .tech-grid, .process-grid, .why-grid, .news-grid').forEach(group => {
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

  return <main id="top">
    <GlobalNavbar currentPath="/" transparentInitially={true} />

    <section className="hero" aria-labelledby="hero-title"><video ref={videoRef} className="hero-video" muted autoPlay loop playsInline preload="metadata"><source src="/assets/hero-bg.mp4" type="video/mp4" /></video><div className="hero-shade" /><div className={`hero-video-reveal ${heroVideoReady ? 'is-ready' : ''}`} aria-hidden="true" />
      <div className="hero-content container"><p className="eyebrow mint">Electric mobility · Since 2014</p><h1 id="hero-title">Electric vehicles built around your requirements.</h1><div className="hero-actions"><ButtonLink href="#vehicles" kind="mint">Explore Our Vehicles</ButtonLink></div></div>
    </section>

    <section className="intro intro-impact" id="about" aria-label="About SAVYGREENTECH in numbers"><div className="container impact-layout"><h2>Redefining Mobility with Innovation</h2><div className="impact-numbers"><div className="metrics" ref={metricsRef}><article><strong data-counter data-start="0" data-end="500" data-suffix="+" aria-label="More than 500 vehicles deployed">0+</strong><span>Vehicles Deployed</span></article><article><strong data-counter data-start="0" data-end="200" data-suffix="K+" aria-label="More than 200,000 tons of carbon dioxide saved">0K+</strong><span>Tons of CO₂ Saved</span></article><article><strong data-counter data-start="0" data-end="100" data-suffix="+" aria-label="More than 100 satisfied clients">0+</strong><span>Satisfied Clients</span></article><article><strong data-counter data-start="0" data-end="10" data-suffix="+" aria-label="More than 10 states covered">0+</strong><span>States Covered</span></article></div></div></div></section>

    <section className="trusted section-white" aria-labelledby="partners-title"><div className="container"><h2 className="partners-title" id="partners-title">Our Partners</h2></div><div className="sponsor-marquee"><div className="sponsor-track">{[false, true].map(hidden => <div className="sponsor-group" aria-hidden={hidden || undefined} key={String(hidden)}>{partners.map(([name, file]) => <div className="sponsor-logo" key={`${hidden}-${file}`}><img src={`/assets/partners/${file}`} alt={hidden ? '' : `${name} logo`} /></div>)}</div>)}</div></div></section>

    <section className="vehicles section-cream" id="vehicles"><div className="container"><div className="section-heading center process-heading"><h2>Electric vehicle range</h2><p>A platform for every operation.</p></div><div className="vehicle-grid">{vehicles.map(vehicle => <article className={`vehicle-card${vehicle.comingSoon ? ' coming-soon' : ''}`} key={vehicle.name}><div className="vehicle-card-media"><img src={vehicle.image} alt={vehicle.comingSoon ? 'Electric vehicle design in development' : `${vehicle.name} electric vehicle`} /></div><div className="vehicle-card-copy"><h3>{vehicle.name}</h3><p>{vehicle.copy}</p>{vehicle.comingSoon ? <span className="vehicle-status">In development</span> : <a href="#contact">Explore now <PiArrowRight aria-hidden="true" /></a>}</div></article>)}</div></div></section>

    <section className="applications section-white" id="applications"><div className="container"><div className="section-heading center"><h2>Applications</h2></div><p className="applications-intro">Purpose-built electric mobility for complex operational environments.</p></div><div className="application-carousel" ref={applicationsRef} tabIndex="0" aria-label="Application categories">{applications.map(application => <article className="application-card" key={application.title}><img src={application.image} alt={`${application.title} electric mobility`} /><h3>{application.title}</h3><p>{application.copy}</p></article>)}</div><div className="container application-controls"><div><button type="button" onClick={() => scrollApplications(-1)} aria-label="Previous applications"><PiArrowLeft /></button><button type="button" onClick={() => scrollApplications(1)} aria-label="Next applications"><PiArrowRight /></button></div></div></section>



    <section className="process section-cream" aria-labelledby="process-title"><div className="container"><div className="section-heading center process-heading"><h2 id="process-title">Our process</h2><p>From requirement to deployment.</p></div><div className="process-timeline"><span className="process-timeline-fill" aria-hidden="true" />{process.map(([number, title, copy]) => <article className="process-timeline-step" key={number}><span className="process-timeline-number" aria-label={`Step ${number}`}>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

    <section className="news section-white" id="news" aria-labelledby="news-title"><div className="container"><div className="section-heading center"><h2 id="news-title">In The News</h2></div><div className="news-grid"><div className="news-featured-column">{newsStories.slice(0, 1).map(story => <article className="news-card news-card-featured" key={story.title}><a className="news-image" href={story.href} target="_blank" rel="noreferrer" aria-label={`Read ${story.title}`}><img src={story.image} alt="" loading="lazy" /></a><p className="news-meta">{story.category}</p><h3><a href={story.href} target="_blank" rel="noreferrer">{story.title}</a></h3><p className="news-copy">{story.copy}</p><a className="news-link" href={story.href} target="_blank" rel="noreferrer">Read story <PiArrowRight aria-hidden="true" /></a></article>)}</div><div className="news-list">{newsStories.slice(1).map(story => <article className="news-card" key={story.title}><a className="news-image" href={story.href} target="_blank" rel="noreferrer" aria-label={`Read ${story.title}`}><img src={story.image} alt="" loading="lazy" /></a><p className="news-meta">{story.category}</p><h3><a href={story.href} target="_blank" rel="noreferrer">{story.title}</a></h3><p className="news-copy">{story.copy}</p><a className="news-link" href={story.href} target="_blank" rel="noreferrer">Read story <PiArrowRight aria-hidden="true" /></a></article>)}</div></div></div></section>

    <section className="contact" id="contact" aria-labelledby="contact-title">
      <video className="contact-video" muted autoPlay loop playsInline preload="metadata" aria-hidden="true">
        <source src="/assets/hero.mp4" type="video/mp4" />
      </video>
      <div className="contact-video-shade" aria-hidden="true" />
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

