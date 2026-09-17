import { useState, useMemo, useRef } from 'react';
import { PiArrowRight, PiCalculator, PiCheckCircle, PiCoins, PiCurrencyInr, PiGlobeHemisphereEast, PiLeaf, PiPlant, PiRecycle, PiShieldCheck, PiTree, PiWind } from 'react-icons/pi';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { PageHero } from '../components/PageHero';
import { SEOHead } from '../components/SEOHead';
import { QuoteModal } from '../components/QuoteModal';
import { usePageAnimations } from '../hooks/usePageAnimations';

const vehicleProfiles = {
  'golf-cart': {
    name: 'Electric Golf Cart / Campus Cart',
    dieselMileage: 14,
    evKwhPerKm: 0.08,
    co2PerLiter: 2.68,
  },
  'cargo-electruck': {
    name: 'Electruck Cargo 3-Wheeler',
    dieselMileage: 18,
    evKwhPerKm: 0.10,
    co2PerLiter: 2.68,
  },
  'dump-truck': {
    name: 'Electric Dump Truck (Sanitation)',
    dieselMileage: 12,
    evKwhPerKm: 0.12,
    co2PerLiter: 2.68,
  },
  'passenger-auto': {
    name: 'Tuk Tuk ë Passenger Auto',
    dieselMileage: 20,
    evKwhPerKm: 0.09,
    co2PerLiter: 2.68,
  }
};

export function SustainabilityPage() {
  const pageRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  usePageAnimations(pageRef);

  // Calculator State
  const [selectedVehicleType, setSelectedVehicleType] = useState('cargo-electruck');
  const [dailyKm, setDailyKm] = useState(60);
  const [fuelPrice, setFuelPrice] = useState(95);
  const [electricityTariff, setElectricityTariff] = useState(8.5);
  const [comparisonYears, setComparisonYears] = useState(3);

  // Calculator Calculations
  const calculations = useMemo(() => {
    const profile = vehicleProfiles[selectedVehicleType] || vehicleProfiles['cargo-electruck'];
    const operatingDaysPerYear = 300;
    const totalDays = operatingDaysPerYear * comparisonYears;
    const totalDistance = dailyKm * totalDays;

    const totalLitersDiesel = totalDistance / profile.dieselMileage;
    const dieselRunningCost = totalLitersDiesel * fuelPrice;

    const totalKwh = totalDistance * profile.evKwhPerKm;
    const evRunningCost = totalKwh * electricityTariff;

    const totalSavings = dieselRunningCost - evRunningCost;
    const monthlySavings = totalSavings / (comparisonYears * 12);
    const yearlySavings = totalSavings / comparisonYears;

    const co2KgAvoided = totalLitersDiesel * profile.co2PerLiter;
    const co2TonsAvoided = (co2KgAvoided / 1000).toFixed(1);

    return {
      totalDistance: Math.round(totalDistance).toLocaleString('en-IN'),
      dieselCost: Math.round(dieselRunningCost).toLocaleString('en-IN'),
      evCost: Math.round(evRunningCost).toLocaleString('en-IN'),
      totalSavings: Math.round(totalSavings).toLocaleString('en-IN'),
      monthlySavings: Math.round(monthlySavings).toLocaleString('en-IN'),
      yearlySavings: Math.round(yearlySavings).toLocaleString('en-IN'),
      co2TonsAvoided,
    };
  }, [selectedVehicleType, dailyKm, fuelPrice, electricityTariff, comparisonYears]);

  return (
    <main id="top" className="sustainability-page" ref={pageRef}>
      <SEOHead
        title="Sustainability & ESG | EV vs Diesel Calculator & One Tree Initiative"
        description="Calculate fuel and CO2 savings with SAVY EVs. Learn about our One Vehicle One Tree initiative, sustainable manufacturing, and circular energy principles."
      />
      <SiteHeader currentPath="/sustainability" transparentInitially={false} />

      <PageHero
        eyebrow="Sustainability &amp; ESG"
        title="Driving a Cleaner, More Sustainable Future"
        description="Zero emissions at the tailpipe, sustainable manufacturing in our plant, and tangible reforestation for every electric vehicle deployed across India."
        videoSrc="/assets/about-hero.mp4"
        primaryCtaText="Calculate Your Fleet Savings"
        primaryCtaHref="#calculator"
        secondaryCtaText="One Vehicle, One Tree"
        secondaryCtaHref="#one-tree"
      />

      {/* Impact Metrics Overview */}
      <section className="intro intro-impact section-white" aria-label="Environmental impact in numbers">
        <div className="container impact-layout">
          <h2>Tangible Environmental &amp; Community Impact</h2>
          <div className="impact-numbers">
            <div className="metrics">
              <article>
                <strong>500+</strong>
                <span>Vehicles Deployed</span>
              </article>
              <article>
                <strong>200K+</strong>
                <span>Tons CO₂ Prevented</span>
              </article>
              <article>
                <strong>500+</strong>
                <span>Trees Planted</span>
              </article>
              <article>
                <strong>100%</strong>
                <span>Zero Tailpipe Emissions</span>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive EV vs Diesel/Petrol Calculator */}
      <section className="section-cream calculator-section" id="calculator" aria-labelledby="calc-title">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">Financial &amp; Carbon Impact</p>
            <h2 id="calc-title">Interactive EV vs. Diesel Calculator</h2>
            <p className="section-subtitle">See how much your organization will save in operating expenses and greenhouse gas emissions.</p>
          </div>

          <div className="calculator-wrapper">
            {/* Input Controls */}
            <div className="calc-inputs-panel">
              <h3>Fleet Operating Parameters</h3>

              <div className="calc-form-group">
                <label htmlFor="calc-vehicle-type">Vehicle Application / Model:</label>
                <select
                  id="calc-vehicle-type"
                  value={selectedVehicleType}
                  onChange={(e) => setSelectedVehicleType(e.target.value)}
                >
                  <option value="golf-cart">Electric Golf Cart / Campus Cart</option>
                  <option value="cargo-electruck">Electruck Cargo 3-Wheeler</option>
                  <option value="dump-truck">Electric Dump Truck (Sanitation)</option>
                  <option value="passenger-auto">Tuk Tuk ë Passenger Auto</option>
                </select>
              </div>

              <div className="calc-form-group">
                <div className="slider-header">
                  <label htmlFor="calc-daily-km">Daily Operating Distance:</label>
                  <span className="slider-val">{dailyKm} km / day</span>
                </div>
                <input
                  id="calc-daily-km"
                  type="range"
                  min="20"
                  max="150"
                  step="5"
                  value={dailyKm}
                  onChange={(e) => setDailyKm(Number(e.target.value))}
                />
                <div className="slider-range-labels">
                  <span>20 km</span>
                  <span>80 km</span>
                  <span>150 km</span>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="calc-form-group">
                  <label htmlFor="calc-fuel-price">Diesel/Petrol Price (₹/L):</label>
                  <input
                    id="calc-fuel-price"
                    type="number"
                    min="70"
                    max="150"
                    value={fuelPrice}
                    onChange={(e) => setFuelPrice(Number(e.target.value))}
                  />
                </div>

                <div className="calc-form-group">
                  <label htmlFor="calc-elec-price">Electricity Tariff (₹/kWh):</label>
                  <input
                    id="calc-elec-price"
                    type="number"
                    min="4"
                    max="20"
                    step="0.5"
                    value={electricityTariff}
                    onChange={(e) => setElectricityTariff(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="calc-form-group">
                <label>Comparison Horizon:</label>
                <div className="comparison-pills">
                  {[1, 3, 5].map((years) => (
                    <button
                      key={years}
                      type="button"
                      className={`period-pill ${comparisonYears === years ? 'active' : ''}`}
                      onClick={() => setComparisonYears(years)}
                    >
                      {years} Year{years > 1 ? 's' : ''}
                    </button>
                  ))}
                </div>
              </div>

              <p className="calc-disclaimer-note">
                *Assumes 300 commercial operating days/year based on real-world Indian commercial tariffs and fuel averages.
              </p>
            </div>

            {/* Results Output Panel */}
            <div className="calc-results-panel">
              <div className="results-header">
                <p className="eyebrow mint">Estimated Savings Output</p>
                <span className="results-horizon-badge">{comparisonYears} Year Horizon ({calculations.totalDistance} km)</span>
              </div>

              {/* Total Savings Card */}
              <div className="main-savings-card">
                <span className="savings-label">Total Operational Savings</span>
                <strong className="savings-number">₹{calculations.totalSavings}</strong>
                <span className="savings-monthly">Approx. <strong>₹{calculations.monthlySavings}</strong> saved every month</span>
              </div>

              {/* Side-by-Side Cost Comparison */}
              <div className="cost-breakdown-grid">
                <div className="cost-box diesel">
                  <span className="cost-type">Diesel / Petrol Cost</span>
                  <strong>₹{calculations.dieselCost}</strong>
                </div>

                <div className="cost-box electric">
                  <span className="cost-type">SAVY EV Energy Cost</span>
                  <strong>₹{calculations.evCost}</strong>
                </div>
              </div>

              {/* CO2 Emissions Avoided */}
              <div className="carbon-avoided-card">
                <PiPlant className="carbon-leaf-icon" />
                <div>
                  <span className="carbon-title">Greenhouse Gas Reduction:</span>
                  <strong className="carbon-val">{calculations.co2TonsAvoided} Tons of CO₂ Avoided</strong>
                </div>
              </div>

              <button
                type="button"
                className="button-link primary full-width"
                onClick={() => setModalOpen(true)}
                style={{ marginTop: '20px' }}
              >
                <span>Request Fleet Cost Analysis</span>
                <PiArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* One Vehicle, One Tree Section */}
      <section className="section-white one-tree-section" id="one-tree" aria-labelledby="tree-heading">
        <div className="container">
          <div className="one-tree-grid">
            <div className="one-tree-copy">
              <div className="tree-badge">
                <PiTree />
                <span>Ecological Commitment</span>
              </div>
              <h2 id="tree-heading">One Vehicle. One Tree.</h2>
              <p className="tree-lead-p">
                At SAVY Greentech, every electric vehicle delivery is accompanied by the planting and nurturing of a native tree sapling in partnership with community restoration drives across India.
              </p>
              <p>
                We believe that true sustainability requires both technological innovation to eliminate emissions and active biological restoration to heal our ecosystems.
              </p>
              <ul className="tree-commitments-list">
                <li><PiCheckCircle /> Indigenous tree species suited to local arid and tropical biomes</li>
                <li><PiCheckCircle /> Multi-year survival and maintenance monitoring with local trusts</li>
                <li><PiCheckCircle /> Transparent tracking connected to verified vehicle delivery milestones</li>
              </ul>
            </div>

            {/* Live Counter Card */}
            <div className="one-tree-counter-card">
              <div className="tree-icon-large"><PiTree /></div>
              <h3>Live Restoration Counter</h3>
              <div className="tree-counter-numbers">
                <div className="counter-col">
                  <span className="counter-num">500+</span>
                  <span className="counter-lbl">Vehicles Delivered</span>
                </div>
                <div className="counter-arrow">→</div>
                <div className="counter-col highlight">
                  <span className="counter-num">500+</span>
                  <span className="counter-lbl">Trees Planted</span>
                </div>
              </div>
              <p className="counter-footnote">
                Live counter reflecting verified SAVY institutional, municipal, and commercial vehicle deliveries nationwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Pillars */}
      <section className="section-cream sustainability-pillars-section" aria-labelledby="pillars-heading">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">Comprehensive ESG</p>
            <h2 id="pillars-heading">Our Three Sustainability Pillars</h2>
          </div>

          <div className="tech-pillars-grid">
            <article className="tech-pillar-card">
              <div className="tech-pillar-icon-box"><PiWind /></div>
              <h3>Zero Tailpipe Emissions</h3>
              <p>100% electric propulsion eliminates nitrogen oxides (NOx), sulfur dioxide (SO₂), and particulate matter (PM2.5) in congested urban centers and hospital zones.</p>
            </article>

            <article className="tech-pillar-card">
              <div className="tech-pillar-icon-box"><PiRecycle /></div>
              <h3>Circular Materials &amp; Sourcing</h3>
              <p>Chassis fabricated with recyclable steel and non-toxic materials. Battery disposal partnerships ensure responsible end-of-life recycling and lithium recovery.</p>
            </article>

            <article className="tech-pillar-card">
              <div className="tech-pillar-icon-box"><PiGlobeHemisphereEast /></div>
              <h3>Community &amp; Civic Health</h3>
              <p>Empowering municipal sanitation staff with ergonomic hydraulic tippers and noise-free vehicles, improving workplace safety and public hygiene.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Final Conversion CTA */}
      <section className="contact" aria-labelledby="sustainability-cta">
        <div className="container contact-inner">
          <p className="eyebrow mint">Join India’s Green Transition</p>
          <h2 id="sustainability-cta">Partner with SAVY for your ESG fleet goals</h2>
          <p>Reach out to our sustainability advisory team for institutional fleet electrification roadmaps.</p>
          <div>
            <button type="button" className="button-link primary" onClick={() => setModalOpen(true)}>
              <span>Discuss Fleet Electrification</span>
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
