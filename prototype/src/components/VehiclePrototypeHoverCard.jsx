import React, { useState, useEffect, useRef } from 'react';
import { PiArrowRight } from 'react-icons/pi';

/* =========================================================================
   Vehicle Hover Animation (SAVY Vehicle Lineup)
   Club Cart 6-Frame Preloaded Canvas Animation:
     - 6 sequential high-res motion frames from assets/Club Cart
     - Preloaded into memory as HTMLImageElements
     - Direct synchronous Canvas 2D frame drawing (0% opacity crossfade)
     - Absolute zero white flash, transparent gap, or background flicker
     - Frame step timing: ~90ms (~11 FPS) for fluid vehicle motion
   ========================================================================= */

const CLUB_CART_FRAMES = [
  '/assets/club-cart/Club Cart - 01.jpg',
  '/assets/club-cart/Club Cart - 02.jpg',
  '/assets/club-cart/Club Cart - 03.jpg',
  '/assets/club-cart/Club Cart - 04.jpg',
  '/assets/club-cart/Club Cart - 05.jpg',
  '/assets/club-cart/Club Cart - 06.jpg',
];

const DEFAULT_FRAMES = [
  '/assets/prototype-hover/card-frame-1.png',
  '/assets/prototype-hover/card-frame-2.png',
  '/assets/prototype-hover/card-frame-3.png',
  '/assets/prototype-hover/card-frame-4.png',
];

export function VehicleCategoryCard({ vehicle }) {
  // Use the 6-frame vehicle animation across all cards in the SAVY Vehicle Lineup
  const frames =
    vehicle?.frames && vehicle.frames.length > 0
      ? vehicle.frames
      : CLUB_CART_FRAMES;

  const totalFrames = frames.length;

  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameIdxRef = useRef(0);
  const timeoutsRef = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Helper to draw a specific frame directly to the canvas
  const drawFrameToCanvas = (frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Ensure canvas buffer matches image resolution
    if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }

    // Direct synchronous draw replaces canvas pixels instantly without transparent states
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  // Preload all frames into memory on mount
  useEffect(() => {
    let isMounted = true;
    imagesRef.current = [];
    let loadedCount = 0;

    frames.forEach((src, idx) => {
      const img = new Image();
      img.decoding = 'sync';
      img.src = src;
      imagesRef.current[idx] = img;

      const handleImageReady = () => {
        loadedCount++;
        if (!isMounted) return;

        // Immediately render frame 0 if it's the first frame
        if (idx === currentFrameIdxRef.current) {
          drawFrameToCanvas(idx);
          setIsLoaded(true);
        }

        if (loadedCount === frames.length) {
          setIsLoaded(true);
          // Re-draw initial frame to ensure high-fidelity render
          drawFrameToCanvas(currentFrameIdxRef.current);
        }
      };

      if (img.complete && img.naturalWidth > 0) {
        handleImageReady();
      } else {
        img.onload = handleImageReady;
        img.onerror = () => {
          console.warn(`Failed to preload frame: ${src}`);
        };
      }
    });

    return () => {
      isMounted = false;
      clearAllTimeouts();
    };
  }, [frames]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  };

  // Step through frames at 8-12 FPS (90ms per step)
  const animateToFrame = (targetIdx) => {
    clearAllTimeouts();

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || totalFrames <= 1) {
      currentFrameIdxRef.current = 0;
      drawFrameToCanvas(0);
      return;
    }

    const startIdx = currentFrameIdxRef.current;
    if (startIdx === targetIdx) return;

    const isForward = targetIdx > startIdx;
    const stepCount = Math.abs(targetIdx - startIdx);
    const frameIntervalMs = 90; // ~11 FPS for smooth sequential motion

    let accumulatedDelay = 0;

    for (let i = 1; i <= stepCount; i++) {
      const nextIdx = isForward ? startIdx + i : startIdx - i;
      accumulatedDelay += frameIntervalMs;

      const timerId = setTimeout(() => {
        currentFrameIdxRef.current = nextIdx;
        drawFrameToCanvas(nextIdx);
      }, accumulatedDelay);

      timeoutsRef.current.push(timerId);
    }
  };

  const handleMouseEnter = () => {
    if (totalFrames > 1) {
      animateToFrame(totalFrames - 1);
    }
  };

  const handleMouseLeave = () => {
    if (totalFrames > 1) {
      animateToFrame(0);
    }
  };

  const handleTouchToggle = () => {
    if (totalFrames <= 1) return;
    if (currentFrameIdxRef.current === 0) {
      animateToFrame(totalFrames - 1);
    } else {
      animateToFrame(0);
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
      {/* Vehicle slot positioned at top-right, extending outside card */}
      <div className="savy-proto-vehicle-slot">
        <canvas
          ref={canvasRef}
          className="savy-proto-canvas"
          width={3928}
          height={2618}
          aria-label={`${vehicle.name} vehicle frame`}
        />
        {/* Fallback image if canvas/JS is still initializing */}
        {!isLoaded && (
          <img
            src={frames[0]}
            alt={vehicle.name}
            className="savy-proto-frame frame-active frame-fallback"
            loading="eager"
            decoding="async"
            draggable={false}
          />
        )}
      </div>

      {/* Left / Lower Content Area from SAVY Vehicle Lineup */}
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
