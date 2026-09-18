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
  const sectionRef = useRef(null);
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
      const num1 = document.querySelector('.indicator-num.num-1');
      const num2 = document.querySelector('.indicator-num.num-2');
      const num3 = document.querySelector('.indicator-num.num-3');

      if (!track || !vehicle) return;

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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=1800',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // --- PHASE 1 (Scroll toward Col 2): Vehicle moves to Col 2, number transitions 01 -> 02, Card 2 reveals ---
      tl.to(vehicle, {
        x: getPos2,
        duration: 1.8,
        ease: 'power1.inOut'
      }, 0.2)
      .to(num1, { opacity: 0, y: -8, duration: 0.4, ease: 'power2.in' }, 0.8)
      .to(num2, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 1.1)
      .to(cards[1], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out'
      }, 1.1);

      // --- PHASE 2 (Scroll toward Col 3): Vehicle moves to Col 3, number transitions 02 -> 03, Card 3 reveals ---
      tl.to(vehicle, {
        x: getPos3,
        duration: 1.8,
        ease: 'power1.inOut'
      }, 2.4)
      .to(num2, { opacity: 0, y: -8, duration: 0.4, ease: 'power2.in' }, 2.9)
      .to(num3, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 3.2)
      .to(cards[2], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out'
      }, 3.3);

      // Hold briefly at end before unpinning
      tl.to({}, { duration: 0.4 });
    });

    mm.add('(max-width: 960px)', () => {
      // MOBILE: Card 1 visible first, vehicle moves to Card 2, then to Card 3
      const mobileCards = gsap.utils.toArray('.tech-mobile-card');
      const track = trackRef.current;
      const vehicle = vehicleRef.current;
      const num1 = document.querySelector('.indicator-num.num-1');
      const num2 = document.querySelector('.indicator-num.num-2');
      const num3 = document.querySelector('.indicator-num.num-3');

      if (!track || !vehicle) return;

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
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=1400',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // Move toward Card 2
      tl.to(vehicle, { x: getMobPos2, duration: 1.5, ease: 'power1.inOut' }, 0.2)
        .to(num1, { opacity: 0, y: -8, duration: 0.4, ease: 'power2.in' }, 0.7)
        .to(num2, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.9)
        .to(mobileCards[0], { opacity: 0, y: -15, duration: 0.4, ease: 'power2.in' }, 0.4)
        .set(mobileCards[0], { display: 'none' }, 0.8)
        .set(mobileCards[1], { display: 'flex', opacity: 0, y: 15 }, 0.8)
        .to(mobileCards[1], { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.85);

      // Move toward Card 3
      tl.to(vehicle, { x: getMobPos3, duration: 1.5, ease: 'power1.inOut' }, 1.8)
        .to(num2, { opacity: 0, y: -8, duration: 0.4, ease: 'power2.in' }, 2.3)
        .to(num3, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 2.5)
        .to(mobileCards[1], { opacity: 0, y: -15, duration: 0.4, ease: 'power2.in' }, 2.0)
        .set(mobileCards[1], { display: 'none' }, 2.4)
        .set(mobileCards[2], { display: 'flex', opacity: 0, y: 15 }, 2.4)
        .to(mobileCards[2], { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 2.45);

      tl.to({}, { duration: 0.3 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      className="tech-scroll-section"
      id="indigenous-tech"
      aria-labelledby="tech-pillars-heading"
      ref={sectionRef}
    >
      <div className="tech-scroll-pin-inner">
        <div className="container">
          {/* Section Heading */}
          <div className="section-heading center">
            <p className="eyebrow">Indigenous Technology</p>
            <h2 id="tech-pillars-heading">Built for Indian Roads &amp; Duty Cycles</h2>
            <p className="section-subtitle">
              Engineered to withstand extreme ambient temperatures, continuous multi-shift usage, and heavy payload demands.
            </p>
          </div>

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
    </section>
  );
}
