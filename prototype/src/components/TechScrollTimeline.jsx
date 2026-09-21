import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PiCpu, PiEngine, PiBatteryCharging, PiCheckCircle } from 'react-icons/pi';

gsap.registerPlugin(ScrollTrigger);

const techItems = [
  {
    id: '01',
    step: '01',
    icon: PiCpu,
    title: 'Smart Motor Controllers',
    description: 'Programmable intelligent motor controllers with regenerative braking, dynamic torque vectoring, and smooth low-speed throttle modulation for effortless maneuvering in confined spaces.',
    features: [
      'Regenerative braking energy recapture',
      'Over-current, over-voltage & thermal protection',
      'Programmable acceleration curves'
    ]
  },
  {
    id: '02',
    step: '02',
    icon: PiEngine,
    title: 'High-Torque Indigenous Motors',
    description: 'Custom-wound electric motors delivering peak low-end torque for steep gradients, heavy passenger groups, and industrial payloads up to 900kg without thermal derating.',
    features: [
      'High-efficiency AC Induction / BLDC options',
      'Sealed IP65/IP67 waterproof rating',
      'Zero-maintenance brushless design'
    ]
  },
  {
    id: '03',
    step: '03',
    icon: PiBatteryCharging,
    title: 'Advanced Battery Technology',
    description: 'Flexible power storage options including ultra-safe Lithium Iron Phosphate (LiFePO4) with active BMS telemetry, or cost-effective heavy-duty deep cycle lead-acid packs.',
    features: [
      'Fast charging capability (2.5–4 hours)',
      '2000+ lifecycle rated LiFePO4 cells',
      'Intelligent Battery Management System (BMS)'
    ]
  }
];

export function TechScrollTimeline() {
  const scrollAreaRef = useRef(null);
  const stickyStageRef = useRef(null);
  const trackRef = useRef(null);
  const vehicleRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Reduced motion fallback
      gsap.set('.tech-desktop-card, .tech-mobile-card', { opacity: 1, y: 0, scale: 1 });
      gsap.set(vehicleRef.current, { x: 0 });
      gsap.set('.indicator-num.num-1', { opacity: 1 });
      return;
    }

    const mm = gsap.matchMedia();

    mm.add('(min-width: 961px)', () => {
      // DESKTOP: Smooth bidirectional number cross-fade & card reveal
      const cards = gsap.utils.toArray('.tech-desktop-card');
      const track = trackRef.current;
      const vehicle = vehicleRef.current;
      const scrollArea = scrollAreaRef.current;
      const num1 = document.querySelector('.indicator-num.num-1');
      const num2 = document.querySelector('.indicator-num.num-2');
      const num3 = document.querySelector('.indicator-num.num-3');

      if (!track || !vehicle || !scrollArea) return;

      const getPos1 = () => (track.clientWidth * (1 / 6)) - (vehicle.clientWidth / 2);
      const getPos2 = () => (track.clientWidth * (3 / 6)) - (vehicle.clientWidth / 2);
      const getPos3 = () => (track.clientWidth * (5 / 6)) - (vehicle.clientWidth / 2);

      // Initial state: Card 1 visible, 01 badge active, Cards 2 & 3 hidden
      gsap.set(cards[0], { opacity: 1, y: 0, scale: 1 });
      gsap.set([cards[1], cards[2]], { opacity: 0, y: 36, scale: 0.97 });
      gsap.set(vehicle, { x: getPos1 });
      gsap.set(num1, { opacity: 1, y: 0 });
      gsap.set(num2, { opacity: 0, y: 8 });
      gsap.set(num3, { opacity: 0, y: 8 });

      // Clean scroll timeline: native CSS position: sticky handles viewport hold with ~80px breathing room
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollArea,
          start: 'top 80px',
          end: 'bottom bottom',
          scrub: 0.7,
          invalidateOnRefresh: true,
        }
      });

      // --- PHASE 1: Vehicle moves to Col 2, number transitions 01 -> 02, Card 2 reveals ---
      tl.to(vehicle, {
        x: getPos2,
        duration: 1.6,
        ease: 'power1.inOut'
      }, 0.2)
      .to(num1, { opacity: 0, y: -8, duration: 0.35, ease: 'power2.in' }, 0.7)
      .to(num2, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 0.95)
      .to(cards[1], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.0,
        ease: 'power2.out'
      }, 0.95);

      // --- PHASE 2: Vehicle moves to Col 3, number transitions 02 -> 03, Card 3 reveals ---
      tl.to(vehicle, {
        x: getPos3,
        duration: 1.6,
        ease: 'power1.inOut'
      }, 2.0)
      .to(num2, { opacity: 0, y: -8, duration: 0.35, ease: 'power2.in' }, 2.4)
      .to(num3, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 2.65)
      .to(cards[2], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.0,
        ease: 'power2.out'
      }, 2.65);

      // Final settling hold before sticky container naturally scrolls away
      tl.to({}, { duration: 0.6 });
    });

    mm.add('(max-width: 960px)', () => {
      // MOBILE: Card 1 visible first, vehicle moves to Card 2, then to Card 3
      const mobileCards = gsap.utils.toArray('.tech-mobile-card');
      const track = trackRef.current;
      const vehicle = vehicleRef.current;
      const scrollArea = scrollAreaRef.current;
      const num1 = document.querySelector('.indicator-num.num-1');
      const num2 = document.querySelector('.indicator-num.num-2');
      const num3 = document.querySelector('.indicator-num.num-3');

      if (!track || !vehicle || !scrollArea) return;

      const getMobPos1 = () => (track.clientWidth * 0.16) - (vehicle.clientWidth / 2);
      const getMobPos2 = () => (track.clientWidth * 0.50) - (vehicle.clientWidth / 2);
      const getMobPos3 = () => (track.clientWidth * 0.84) - (vehicle.clientWidth / 2);

      // Initial state: Card 1 visible, 01 badge active
      gsap.set(mobileCards, { opacity: 0, display: 'none', y: 20 });
      gsap.set(mobileCards[0], { opacity: 1, display: 'flex', y: 0 });
      gsap.set(vehicle, { x: getMobPos1 });
      gsap.set(num1, { opacity: 1, y: 0 });
      gsap.set(num2, { opacity: 0, y: 8 });
      gsap.set(num3, { opacity: 0, y: 8 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollArea,
          start: 'top 76px',
          end: 'bottom bottom',
          scrub: 0.7,
          invalidateOnRefresh: true,
        }
      });

      // Move toward Card 2
      tl.to(vehicle, { x: getMobPos2, duration: 1.4, ease: 'power1.inOut' }, 0.2)
        .to(num1, { opacity: 0, y: -8, duration: 0.35, ease: 'power2.in' }, 0.6)
        .to(num2, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 0.8)
        .to(mobileCards[0], { opacity: 0, y: -15, duration: 0.35, ease: 'power2.in' }, 0.4)
        .set(mobileCards[0], { display: 'none' }, 0.7)
        .set(mobileCards[1], { display: 'flex', opacity: 0, y: 15 }, 0.7)
        .to(mobileCards[1], { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.75);

      // Move toward Card 3
      tl.to(vehicle, { x: getMobPos3, duration: 1.4, ease: 'power1.inOut' }, 1.6)
        .to(num2, { opacity: 0, y: -8, duration: 0.35, ease: 'power2.in' }, 2.0)
        .to(num3, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 2.2)
        .to(mobileCards[1], { opacity: 0, y: -15, duration: 0.35, ease: 'power2.in' }, 1.8)
        .set(mobileCards[1], { display: 'none' }, 2.1)
        .set(mobileCards[2], { display: 'flex', opacity: 0, y: 15 }, 2.1)
        .to(mobileCards[2], { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 2.15);

      tl.to({}, { duration: 0.5 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      className="indigenous-technology-section"
      id="indigenous-tech"
      aria-labelledby="tech-pillars-heading"
    >
      {/* 1. Heading in normal document flow */}
      <div className="indigenous-heading">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">Indigenous Technology</p>
            <h2 id="tech-pillars-heading">Built for Indian Roads &amp; Duty Cycles</h2>
            <p className="section-subtitle">
              Engineered to withstand extreme ambient temperatures, continuous multi-shift usage, and heavy payload demands.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Car Animation Scroll Area (Defines vertical scroll duration) */}
      <div className="car-animation-scroll-area" ref={scrollAreaRef}>
        {/* 3. Car Animation Sticky Viewport (Pins at top: 80px natively) */}
        <div className="car-animation-sticky" ref={stickyStageRef}>
          <div className="container">
            <div className="tech-scroll-interactive-stage">
              {/* Single Moving Vehicle Track Area */}
              <div className="tech-single-vehicle-track" ref={trackRef} aria-hidden="true">
                <div className="tech-single-vehicle-runner" ref={vehicleRef}>
                  <div className="tech-veh-indicator">
                    <span className="indicator-num num-1">01</span>
                    <span className="indicator-num num-2">02</span>
                    <span className="indicator-num num-3">03</span>
                  </div>
                  <img src="/assets/tech-vehicle.png" alt="SAVY EV Marker" />
                </div>
              </div>

              {/* Clean 4px Horizontal Track Line without black progress overlay */}
              <div className="tech-timeline-line" role="presentation" />

              {/* Desktop Cards Grid (Card 1 visible first, Cards 2 & 3 reveal sequentially) */}
              <div className="tech-pillars-grid tech-desktop-cards-grid desktop-only">
                {techItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article className="tech-pillar-card tech-desktop-card" key={item.id}>
                      <div className="tech-pillar-icon-box">
                        <Icon aria-hidden="true" />
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <ul>
                        {item.features.map((feat, fIdx) => (
                          <li key={fIdx}>
                            <PiCheckCircle aria-hidden="true" /> {feat}
                          </li>
                        ))}
                      </ul>
                    </article>
                  );
                })}
              </div>

              {/* Mobile Cards Stack */}
              <div className="tech-mobile-cards-container mobile-only">
                {techItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article className="tech-pillar-card tech-mobile-card" key={item.id}>
                      <div className="tech-pillar-icon-box">
                        <Icon aria-hidden="true" />
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <ul>
                        {item.features.map((feat, fIdx) => (
                          <li key={fIdx}>
                            <PiCheckCircle aria-hidden="true" /> {feat}
                          </li>
                        ))}
                      </ul>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
