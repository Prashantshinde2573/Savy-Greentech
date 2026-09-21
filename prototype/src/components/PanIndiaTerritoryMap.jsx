import React, { useState, useEffect, useRef } from 'react';
import { PiArrowRight } from 'react-icons/pi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import indiaStates from '../data/indiaStatesData.json';

gsap.registerPlugin(ScrollTrigger);

// Defined 3 clean regional groups
const REGIONS = [
  {
    id: 'western',
    name: 'WESTERN REGION',
    statesList: 'Gujarat · Maharashtra · Goa · Rajasthan',
    stateIds: ['INGJ', 'INMH', 'INGA', 'INRJ']
  },
  {
    id: 'southern',
    name: 'SOUTHERN REGION',
    statesList: 'Karnataka · Andhra Pradesh · Telangana · Tamil Nadu · Kerala',
    stateIds: ['INKA', 'INAP', 'INTG', 'INTN', 'INKL', 'INPY']
  },
  {
    id: 'northern_central',
    name: 'NORTHERN & CENTRAL',
    statesList: 'Madhya Pradesh · Uttar Pradesh · Delhi NCR · Punjab · Haryana',
    stateIds: ['INMP', 'INUP', 'INDL', 'INPB', 'INHR', 'INCH', 'INUT', 'INHP']
  }
];

// Fixed geographic coordinates for the 14 deployment markers
const LOGO_MARKERS = [
  { id: 'INGJ', name: 'Gujarat', x: 200, y: 500 },
  { id: 'INMH', name: 'Maharashtra', x: 320, y: 620 },
  { id: 'INGA', name: 'Goa', x: 260, y: 715 },
  { id: 'INRJ', name: 'Rajasthan', x: 260, y: 380 },
  { id: 'INKA', name: 'Karnataka', x: 330, y: 735 },
  { id: 'INAP', name: 'Andhra Pradesh', x: 440, y: 700 },
  { id: 'INTG', name: 'Telangana', x: 410, y: 640 },
  { id: 'INTN', name: 'Tamil Nadu', x: 375, y: 840 },
  { id: 'INKL', name: 'Kerala', x: 320, y: 855 },
  { id: 'INMP', name: 'Madhya Pradesh', x: 380, y: 470 },
  { id: 'INUP', name: 'Uttar Pradesh', x: 450, y: 365 },
  { id: 'INDL', name: 'Delhi NCR', x: 343, y: 320 },
  { id: 'INPB', name: 'Punjab', x: 295, y: 245 },
  { id: 'INHR', name: 'Haryana', x: 315, y: 295 }
];

// Deterministic geographic scatter offsets and stagger delays for each state/UT
const STATE_OFFSETS = {
  // Northern States & UTs (travel in from top / top-left / top-right)
  INJK: { x: -50, y: -300, r: -2.2, delay: 0 },
  INLA: { x: 70, y: -330, r: 1.8, delay: 0.02 },
  INHP: { x: 45, y: -260, r: 1.2, delay: 0.05 },
  INPB: { x: -140, y: -230, r: -2.4, delay: 0.04 },
  INUT: { x: 95, y: -240, r: 2.1, delay: 0.07 },
  INHR: { x: -90, y: -190, r: -1.6, delay: 0.06 },
  INDL: { x: -20, y: -170, r: 1.1, delay: 0.09 },
  INCH: { x: -60, y: -210, r: -1.0, delay: 0.04 },

  // Western States & UTs (travel in from left / west)
  INRJ: { x: -310, y: -70, r: -2.6, delay: 0.05 },
  INGJ: { x: -340, y: 70, r: -3.0, delay: 0.08 },
  INMH: { x: -290, y: 150, r: -2.1, delay: 0.13 },
  INGA: { x: -250, y: 200, r: -1.5, delay: 0.18 },
  INDH: { x: -270, y: 110, r: -2.0, delay: 0.11 },

  // Central States (travel in diagonally)
  INMP: { x: -40, y: -100, r: 1.6, delay: 0.11 },
  INUP: { x: 65, y: -150, r: -1.4, delay: 0.10 },
  INCT: { x: 85, y: 95, r: 2.2, delay: 0.17 },
  INJH: { x: 170, y: -30, r: -1.5, delay: 0.18 },
  INBR: { x: 190, y: -120, r: 1.6, delay: 0.15 },

  // Southern States (travel in from bottom / south)
  INTG: { x: -45, y: 200, r: 1.9, delay: 0.20 },
  INKA: { x: -170, y: 270, r: -2.2, delay: 0.23 },
  INAP: { x: 140, y: 240, r: -1.6, delay: 0.24 },
  INKL: { x: -140, y: 330, r: -2.5, delay: 0.26 },
  INTN: { x: 55, y: 350, r: 2.1, delay: 0.28 },
  INPY: { x: 120, y: 300, r: 1.2, delay: 0.27 },

  // Eastern & North-Eastern States (travel in from right / east)
  INOR: { x: 250, y: 120, r: 2.0, delay: 0.20 },
  INWB: { x: 260, y: -20, r: -1.8, delay: 0.18 },
  INSK: { x: 200, y: -200, r: 2.2, delay: 0.16 },
  INAS: { x: 330, y: -90, r: 1.5, delay: 0.24 },
  INAR: { x: 370, y: -160, r: 2.6, delay: 0.22 },
  INML: { x: 290, y: -50, r: -1.6, delay: 0.26 },
  INNL: { x: 380, y: -70, r: 2.1, delay: 0.28 },
  INMN: { x: 370, y: -10, r: -2.0, delay: 0.30 },
  INMZ: { x: 350, y: 50, r: 1.6, delay: 0.32 },
  INTR: { x: 310, y: 30, r: -2.1, delay: 0.29 },

  // Islands
  INAN: { x: 280, y: 280, r: 2.2, delay: 0.32 },
  INLD: { x: -230, y: 290, r: -2.1, delay: 0.30 }
};

export function PanIndiaTerritoryMap() {
  const sectionRef = useRef(null);
  const mapFrameRef = useRef(null);
  const svgRef = useRef(null);

  const [selectedStateId, setSelectedStateId] = useState(null);
  const [activeRegionId, setActiveRegionId] = useState(null);
  const [hoveredState, setHoveredState] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Scroll-driven map assembly animation triggered when map is visible in viewport
  useEffect(() => {
    const mapFrame = mapFrameRef.current;
    const svg = svgRef.current;
    if (!mapFrame || !svg) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const pieces = svg.querySelectorAll('.savy-state-piece');
      if (!pieces.length) return;

      const isMobile = window.innerWidth <= 768;
      const distanceScale = isMobile ? 0.7 : 1;

      // Master scroll-driven assembly timeline triggered directly on the map container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mapFrame,
          start: 'top 65%',
          end: 'top 10%',
          scrub: 1,
          invalidateOnRefresh: true
        }
      });

      pieces.forEach((piece) => {
        const stateId = piece.getAttribute('data-state-id');
        const offset = STATE_OFFSETS[stateId] || { x: 0, y: -120, r: 0, delay: 0 };

        // Set initial scattered state
        gsap.set(piece, {
          x: offset.x * distanceScale,
          y: offset.y * distanceScale,
          rotation: offset.r,
          transformOrigin: '50% 50%',
          opacity: 0.06
        });

        // Assemble toward exact coordinate
        tl.to(
          piece,
          {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            ease: 'power2.out',
            duration: 1
          },
          offset.delay
        );
      });
    }, mapFrame);

    return () => ctx.revert();
  }, []);

  const handleStateMouseEnter = (state, e) => {
    setHoveredState(state);
    if (e && e.currentTarget) {
      const parentRect = e.currentTarget.closest('.savy-map-frame')?.getBoundingClientRect();
      if (parentRect) {
        setTooltipPos({
          x: e.clientX - parentRect.left,
          y: e.clientY - parentRect.top - 18
        });
      }
    }
  };

  const handleStateMouseMove = (e) => {
    const parentRect = e.currentTarget.closest('.savy-map-frame')?.getBoundingClientRect();
    if (parentRect) {
      setTooltipPos({
        x: e.clientX - parentRect.left,
        y: e.clientY - parentRect.top - 18
      });
    }
  };

  const handleStateMouseLeave = () => {
    setHoveredState(null);
  };

  const handleStateClick = (stateId) => {
    if (selectedStateId === stateId) {
      setSelectedStateId(null);
    } else {
      setSelectedStateId(stateId);
      setActiveRegionId(null);
    }
  };

  const handleRegionClick = (regionId) => {
    if (activeRegionId === regionId) {
      setActiveRegionId(null);
    } else {
      setActiveRegionId(regionId);
      setSelectedStateId(null);
    }
  };

  // Helper to check if a state is currently highlighted
  const isStateHighlighted = (stateId) => {
    if (selectedStateId) {
      return selectedStateId === stateId;
    }
    if (activeRegionId) {
      const region = REGIONS.find((r) => r.id === activeRegionId);
      return region ? region.stateIds.includes(stateId) : false;
    }
    return false;
  };

  return (
    <section
      ref={sectionRef}
      className="savy-expansion-section"
      id="territories"
      aria-labelledby="expansion-heading"
    >
      <div className="container">
        {/* 1. Centered Section Header */}
        <div className="savy-expansion-header center">
          <p className="eyebrow">PAN-INDIA EXPANSION</p>
          <h2 id="expansion-heading" className="savy-expansion-title">
            Available Territories &amp;<br />Regional Presence
          </h2>
          <p className="savy-expansion-desc">
            SAVY is actively expanding its authorized dealer and service touchpoint network across key regional hubs in Western, Southern, Northern, and Central India.
          </p>
        </div>

        {/* 2. Main Layout: Left Compact Region Cards + Right Dominant SVG Map */}
        <div className="savy-expansion-layout">
          {/* Left Column: Minimal Regional Selector Cards & CTA */}
          <div className="savy-expansion-sidebar">
            <div className="savy-region-list" role="tablist" aria-label="Regional territories">
              {REGIONS.map((region) => {
                const isSelected = activeRegionId === region.id;
                return (
                  <button
                    key={region.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`savy-region-card ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => handleRegionClick(region.id)}
                  >
                    <div className="region-card-header">
                      <h3 className="region-card-title">{region.name}</h3>
                    </div>
                    <p className="region-card-states">{region.statesList}</p>
                  </button>
                );
              })}
            </div>

            {/* Compact CTA */}
            <div className="savy-expansion-cta-wrap">
              <a href="#dealer-form" className="button-link primary savy-simple-cta">
                <span>Apply for Territory</span>
                <PiArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Column: Clean Vector India Map with Scroll Assembly */}
          <div className="savy-expansion-map-stage">
            <div ref={mapFrameRef} className="savy-map-frame">
              <svg
                ref={svgRef}
                viewBox="0 0 1000 1000"
                className="savy-india-vector-map"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Interactive India Territory Map"
              >
                {/* State Pieces (with attached Logo Markers) */}
                <g className="savy-map-states-layer">
                  {indiaStates.map((state) => {
                    const isHighlighted = isStateHighlighted(state.id);
                    const isHovered = hoveredState && hoveredState.id === state.id;
                    const marker = LOGO_MARKERS.find((m) => m.id === state.id);

                    let pathClass = 'savy-india-state';
                    if (isHighlighted) pathClass += ' state-selected';
                    if (isHovered) pathClass += ' state-hovered';

                    return (
                      <g
                        key={state.id}
                        id={`in-state-grp-${state.id.toLowerCase()}`}
                        className="savy-state-piece"
                        data-state-id={state.id}
                      >
                        {/* State Outline */}
                        <path
                          id={`in-state-${state.id.toLowerCase()}`}
                          d={state.d}
                          className={pathClass}
                          onClick={() => handleStateClick(state.id)}
                          onMouseEnter={(e) => handleStateMouseEnter(state, e)}
                          onMouseMove={handleStateMouseMove}
                          onMouseLeave={handleStateMouseLeave}
                        />

                        {/* Attached Official SAVY Greentech Logo Marker */}
                        {marker && (
                          <g
                            className={`savy-geo-marker ${isHighlighted ? 'marker-active' : ''}`}
                            transform={`translate(${marker.x}, ${marker.y})`}
                            pointerEvents="none"
                            aria-hidden="true"
                          >
                            <circle
                              cx="0"
                              cy="0"
                              r={marker.id === 'INGJ' ? '4.5' : '3.5'}
                              className="savy-geo-dot"
                            />
                            <g transform="translate(-16, -18)">
                              <image
                                href="/assets/savy-marker-logo.png"
                                width="32"
                                height="14.7"
                                className="savy-geo-logo-img"
                                preserveAspectRatio="xMidYMid meet"
                              />
                            </g>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </g>
              </svg>

              {/* Minimal Hover Tooltip: ONLY State Name */}
              {hoveredState && (
                <div
                  className="savy-minimal-tooltip"
                  style={{
                    left: `${tooltipPos.x}px`,
                    top: `${tooltipPos.y}px`
                  }}
                  role="tooltip"
                >
                  {hoveredState.name}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

