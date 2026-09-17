import { useState, useRef } from 'react';
import { PiArrowRight, PiBatteryCharging, PiCheckCircle, PiCpu, PiDrop, PiEngine, PiFactory, PiGauge, PiGear, PiHeadset, PiLightning, PiShieldCheck, PiWrench } from 'react-icons/pi';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { PageHero } from '../components/PageHero';
import { SEOHead } from '../components/SEOHead';
import { QuoteModal } from '../components/QuoteModal';
import { usePageAnimations } from '../hooks/usePageAnimations';

const manufacturingStages = [
  {
    step: '01',
    title: 'Computerized Design & FEA',
    description: '3D CAD structural chassis modeling, finite element stress analysis (FEA), and customized load distribution calculations tailored to client payload requirements.',
    icon: PiCpu,
    image: '/assets/process/consultation-external.jpg'
  },
  {
    step: '02',
    title: 'Precision Fabrication & Welding',
    description: 'Robotic and high-precision manual MIG welding of high-tensile tubular steel frames with multi-stage anti-corrosion chemical treatment and powder coating.',
    icon: PiGear,
    image: '/assets/process/customization-design.jpg'
  },
  {
    step: '03',
    title: 'Powertrain & Electrical Harnessing',
    description: 'Integration of indigenous high-torque AC/BLDC electric motors, intelligent smart motor controllers, automotive-grade sealed wiring harnesses, and IP-rated enclosures.',
    icon: PiLightning,
    image: '/assets/process/customization-external.jpg'
  },
  {
    step: '04',
    title: 'Battery Pack Integration & BMS',
    description: 'Assembly of smart Lithium-ion (LFP/NMC) or heavy-duty deep-cycle Lead-Acid battery banks equipped with active thermal monitoring and multi-layer protection BMS.',
    icon: PiBatteryCharging,
    image: '/assets/about-purpose/innovation.webp'
  },
  {
    step: '05',
    title: 'Multi-Point Quality Control & Dyno Testing',
    description: 'Comprehensive 48-point pre-delivery inspection including electrical leakage testing, dyno load testing, brake efficiency verification, and live test-track endurance trials.',
    icon: PiShieldCheck,
    image: '/assets/process/deployment-external.jpg'
  }
];

export function TechnologyPage() {
  const pageRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  usePageAnimations(pageRef);

  return (
    <main id="top" className="technology-page" ref={pageRef}>
      <SEOHead
        title="Technology & Manufacturing | Indigenous EV Engineering"
        description="Explore SAVY Greentech’s engineering: In-house manufacturing plant in Ahmedabad, smart battery technology, high-torque motors, and multi-stage testing."
      />
      <SiteHeader currentPath="/technology" transparentInitially={false} />

      <PageHero
        eyebrow="Engineering Excellence"
        title="Engineering the Future of Purpose-Built Electric Mobility"
        description="Proprietary powertrain integration, robust tubular chassis fabrication, advanced battery systems, and rigorous quality testing built specifically for Indian operating conditions."
        videoSrc="/assets/CTA-bg.mp4"
        primaryCtaText="Discuss Your Vehicle Requirement"
        onPrimaryClick={() => setModalOpen(true)}
        secondaryCtaText="Explore Plant Capabilities"
        secondaryCtaHref="#manufacturing-process"
      />

      {/* Core Engineering Pillars */}
      <section className="section-white tech-pillars-section" aria-labelledby="tech-pillars-heading">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">Indigenous Technology</p>
            <h2 id="tech-pillars-heading">Built for Indian Roads &amp; Duty Cycles</h2>
            <p className="section-subtitle">Engineered to withstand extreme ambient temperatures, continuous multi-shift usage, and heavy payload demands.</p>
          </div>

          <div className="tech-pillars-grid">
            <article className="tech-pillar-card">
              <div className="tech-pillar-icon-box"><PiCpu /></div>
              <h3>Smart Motor Controllers</h3>
              <p>Programmable intelligent motor controllers with regenerative braking, dynamic torque vectoring, and smooth low-speed throttle modulation for effortless maneuvering in confined spaces.</p>
              <ul>
                <li><PiCheckCircle /> Regenerative braking energy recapture</li>
                <li><PiCheckCircle /> Over-current, over-voltage &amp; thermal protection</li>
                <li><PiCheckCircle /> Programmable acceleration curves</li>
              </ul>
            </article>

            <article className="tech-pillar-card">
              <div className="tech-pillar-icon-box"><PiEngine /></div>
              <h3>High-Torque Indigenous Motors</h3>
              <p>Custom-wound electric motors delivering peak low-end torque for steep gradients, heavy passenger groups, and industrial payloads up to 900kg without thermal derating.</p>
              <ul>
                <li><PiCheckCircle /> High-efficiency AC Induction / BLDC options</li>
                <li><PiCheckCircle /> Sealed IP65/IP67 waterproof rating</li>
                <li><PiCheckCircle /> Zero-maintenance brushless design</li>
              </ul>
            </article>

            <article className="tech-pillar-card">
              <div className="tech-pillar-icon-box"><PiBatteryCharging /></div>
              <h3>Advanced Battery Technology</h3>
              <p>Flexible power storage options including ultra-safe Lithium Iron Phosphate (LiFePO4) with active BMS telemetry, or cost-effective heavy-duty deep cycle lead-acid packs.</p>
              <ul>
                <li><PiCheckCircle /> Fast charging capability (2.5–4 hours)</li>
                <li><PiCheckCircle /> 2000+ lifecycle rated LiFePO4 cells</li>
                <li><PiCheckCircle /> Intelligent Battery Management System (BMS)</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Battery Technology Deep Dive */}
      <section className="section-cream battery-deep-dive-section" aria-labelledby="battery-heading">
        <div className="container">
          <div className="engineering-grid">
            <div className="engineering-image">
              <img src="/assets/about-purpose/electric-future.jpg" alt="SAVY electric vehicle battery pack engineering" loading="lazy" />
            </div>
            <div className="engineering-copy">
              <p className="eyebrow">Power &amp; Energy Storage</p>
              <h2 id="battery-heading">Battery Systems &amp; Thermal Safety</h2>
              <p>
                At SAVY Greentech, we match battery chemistry to your exact operational economics and charging infrastructure.
              </p>

              <div className="battery-compare-cards">
                <div className="battery-type-box">
                  <h4>Lithium Iron Phosphate (LiFePO4)</h4>
                  <p><strong>Ideal for:</strong> High-utilization fleets, 24/7 industrial shifts, fast-charging requirements.</p>
                  <ul>
                    <li>High thermal stability in 45°C+ Indian summers</li>
                    <li>Lightweight, maximizing vehicle range and payload</li>
                    <li>Long lifespan exceeding 2,000+ deep discharge cycles</li>
                  </ul>
                </div>

                <div className="battery-type-box">
                  <h4>Deep-Cycle Heavy-Duty Lead-Acid</h4>
                  <p><strong>Ideal for:</strong> Budget-conscious campus carts, rural Gram Panchayat sanitation, predictable short routes.</p>
                  <ul>
                    <li>Lower initial capital expenditure</li>
                    <li>Proven, reliable performance on predictable campus loops</li>
                    <li>100% recyclable and easy nationwide replacement</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Stage In-House Manufacturing Process */}
      <section className="section-white manufacturing-process-section" id="manufacturing-process" aria-labelledby="process-heading">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">Design to Assembly</p>
            <h2 id="process-heading">Our 5-Stage In-House Manufacturing Process</h2>
            <p className="section-subtitle">Complete vertical integration in Ahmedabad ensures stringent quality control and custom agility.</p>
          </div>

          <div className="process-stages-vertical">
            {manufacturingStages.map((stage) => {
              const Icon = stage.icon;
              return (
                <article className="process-stage-item" key={stage.step}>
                  <div className="stage-step-badge">{stage.step}</div>
                  <div className="stage-image-preview">
                    <img src={stage.image} alt={stage.title} loading="lazy" />
                  </div>
                  <div className="stage-content">
                    <div className="stage-icon"><Icon /></div>
                    <h3>{stage.title}</h3>
                    <p>{stage.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality & Testing Standards */}
      <section className="section-cream quality-standards-section" aria-labelledby="quality-heading">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">Quality &amp; Compliance</p>
            <h2 id="quality-heading">Rigorous Validation &amp; Safety Protocols</h2>
            <p className="section-subtitle">Every vehicle undergoes multi-point validation to guarantee safe, durable operational performance.</p>
          </div>

          <div className="quality-cards-grid">
            <div className="quality-card">
              <PiShieldCheck className="quality-icon" />
              <h4>Structural Stress Testing</h4>
              <p>Chassis frames tested for torsional rigidity and sustained overload limits to ensure safety on uneven terrain and industrial loading docks.</p>
            </div>

            <div className="quality-card">
              <PiDrop className="quality-icon" />
              <h4>Ingress &amp; Weatherproofing</h4>
              <p>Water-spray testing of electrical enclosures, controllers, and wiring junctions to ensure total operational safety during monsoon conditions.</p>
            </div>

            <div className="quality-card">
              <PiGauge className="quality-icon" />
              <h4>Braking &amp; Gradient Dyno</h4>
              <p>Comprehensive dynamometer evaluation verifying stopping distances, regenerative assist, and hill-hold capabilities on steep inclines.</p>
            </div>

            <div className="quality-card">
              <PiLightning className="quality-icon" />
              <h4>Electrical Safety &amp; Insulation</h4>
              <p>High-voltage insulation resistance testing, short-circuit fail-safe verification, and fuse coordination for complete operator safety.</p>
            </div>
          </div>

          <div className="certifications-note-box">
            <p><strong>Compliance &amp; Certifications Reference:</strong> SAVY electric passenger platforms (such as Tuk Tuk ë 4+1) hold on-road type approval. For institutional and industrial platforms, SAVY adheres to verified national manufacturing, electrical, and safety benchmarks.</p>
          </div>
        </div>
      </section>

      {/* After-Sales & Doorstep Service Support */}
      <section className="section-white after-sales-section" aria-labelledby="service-heading">
        <div className="container">
          <div className="after-sales-box">
            <div className="after-sales-copy">
              <p className="eyebrow mint">Nationwide Network</p>
              <h2 id="service-heading">Doorstep Service &amp; Lifetime Support</h2>
              <p>
                A vehicle is only as dependable as the service standing behind it. SAVY Greentech provides comprehensive after-sales support with dedicated field service technicians and guaranteed genuine spare parts availability.
              </p>
              <div className="service-features-grid">
                <div>
                  <PiWrench className="service-feat-icon" />
                  <strong>Doorstep Diagnostics</strong>
                  <p>Certified field technicians visit your campus or facility for routine servicing and repairs.</p>
                </div>
                <div>
                  <PiGear className="service-feat-icon" />
                  <strong>Genuine OEM Spares</strong>
                  <p>Ready inventory of motors, controllers, tires, and body panels for minimal downtime.</p>
                </div>
                <div>
                  <PiHeadset className="service-feat-icon" />
                  <strong>Dedicated Support Desk</strong>
                  <p>Direct telephone and WhatsApp hotline for rapid technical consultation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Conversion CTA */}
      <section className="contact" aria-labelledby="tech-final-cta">
        <div className="container contact-inner">
          <p className="eyebrow mint">Consult Our Technical Team</p>
          <h2 id="tech-final-cta">Discuss your custom engineering requirement</h2>
          <p>Tell us your vehicle specifications, payload requirements, and fleet operational parameters.</p>
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
