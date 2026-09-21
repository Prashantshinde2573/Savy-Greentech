import React, { useState, useEffect, useRef } from 'react';
import { PiArrowRight } from 'react-icons/pi';

/* =========================================================================
   Vehicle Hover Animation Prototype (SAVY Vehicle Lineup)
   Applied consistently across all prototype cards.
   Frames:
     Frame 1 -> Default 3/4 front view
     Frame 2 -> Intermediate turn 1
     Frame 3 -> Intermediate turn 2
     Frame 4 -> Final side view
   ========================================================================= */

const PROTOTYPE_FRAMES = [
  '/assets/prototype-hover/card-frame-1.png',
  '/assets/prototype-hover/card-frame-2.png',
  '/assets/prototype-hover/card-frame-3.png',
  '/assets/prototype-hover/card-frame-4.png',
];

export function VehicleCategoryCard({ vehicle }) {
  const [currentFrame, setCurrentFrame] = useState(1);
  const currentFrameRef = useRef(1);
  const timeoutsRef = useRef([]);

  // Preload all 4 frames on mount for instant zero-flicker hover transitions
  useEffect(() => {
    PROTOTYPE_FRAMES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    return () => {
      clearAllTimeouts();
    };
  }, []);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  };

  const animateTo = (target) => {
    clearAllTimeouts();

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setCurrentFrame(1);
      currentFrameRef.current = 1;
      return;
    }

    const start = currentFrameRef.current;
    if (start === target) return;

    const isForward = target > start;
    const stepCount = Math.abs(target - start);
    let accumulatedTime = 0;

    for (let i = 1; i <= stepCount; i++) {
      const nextFrame = isForward ? start + i : start - i;
      // Fast, responsive automotive hover timing: ~75ms per step (total ~300ms)
      const delay = isForward ? (nextFrame === 4 ? 90 : 75) : 75;
      accumulatedTime += delay;

      const timer = setTimeout(() => {
        setCurrentFrame(nextFrame);
        currentFrameRef.current = nextFrame;
      }, accumulatedTime);

      timeoutsRef.current.push(timer);
    }
  };

  const handleMouseEnter = () => {
    animateTo(4);
  };

  const handleMouseLeave = () => {
    animateTo(1);
  };

  const handleTouchToggle = () => {
    if (currentFrameRef.current === 1) {
      animateTo(4);
    } else {
      animateTo(1);
    }
  };

  return (
    <div
      className="savy-proto-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTouchToggle}
      tabIndex={0}
      role="region"
      aria-label={`${vehicle.name} electric vehicle card`}
    >
      {/* Vehicle slot positioned at top-right, extending ~20% outside card */}
      <div className="savy-proto-vehicle-slot">
        <div className="savy-proto-frame-stack">
          {PROTOTYPE_FRAMES.map((src, idx) => {
            const frameNum = idx + 1;
            const isActive = currentFrame === frameNum;
            return (
              <img
                key={frameNum}
                src={src}
                alt={`${vehicle.name} turning frame ${frameNum}`}
                className={`savy-proto-frame savy-frame-${frameNum} ${isActive ? 'frame-active' : ''}`}
                loading="eager"
                decoding="async"
                draggable={false}
              />
            );
          })}
        </div>
      </div>

      {/* Left / Lower Content Area from Original SAVY Vehicle Lineup */}
      <div className="savy-proto-content">
        <h3 className="savy-proto-title">{vehicle.name}</h3>
        <p className="savy-proto-desc">{vehicle.copy}</p>
        <a href={`/products/${vehicle.slug}`} className="savy-proto-link">
          Explore details <PiArrowRight aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

export const VehiclePrototypeHoverCard = VehicleCategoryCard;
