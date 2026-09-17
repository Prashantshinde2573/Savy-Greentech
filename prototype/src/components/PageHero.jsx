import { PiArrowRight } from 'react-icons/pi';

export function PageHero({
  eyebrow = 'SAVYGREENTECH',
  title,
  description,
  videoSrc,
  bgImage,
  primaryCtaText = 'Discuss Your Requirement',
  primaryCtaHref = '/contact',
  secondaryCtaText,
  secondaryCtaHref,
  onPrimaryClick,
  onSecondaryClick
}) {
  return (
    <section className="hero page-hero" aria-labelledby="page-hero-title">
      {videoSrc ? (
        <video className="hero-video" muted autoPlay loop playsInline preload="metadata">
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : bgImage ? (
        <img src={bgImage} alt="" className="hero-video" style={{ objectFit: 'cover' }} />
      ) : (
        <div className="page-hero-fallback-bg" />
      )}
      <div className="hero-shade page-hero-shade" />
      <div className="hero-content container">
        {eyebrow && <p className="eyebrow mint">{eyebrow}</p>}
        {title && <h1 id="page-hero-title">{title}</h1>}
        {description && <p className="page-hero-copy">{description}</p>}
        {(primaryCtaText || secondaryCtaText) && (
          <div className="hero-actions">
            {primaryCtaText && (
              onPrimaryClick ? (
                <button type="button" className="button-link mint" onClick={onPrimaryClick}>
                  <span>{primaryCtaText}</span>
                  <PiArrowRight aria-hidden="true" />
                </button>
              ) : (
                <a className="button-link mint" href={primaryCtaHref}>
                  <span>{primaryCtaText}</span>
                  <PiArrowRight aria-hidden="true" />
                </a>
              )
            )}
            {secondaryCtaText && (
              onSecondaryClick ? (
                <button type="button" className="button-link ghost-light" onClick={onSecondaryClick}>
                  <span>{secondaryCtaText}</span>
                  <PiArrowRight aria-hidden="true" />
                </button>
              ) : (
                <a className="button-link ghost-light" href={secondaryCtaHref}>
                  <span>{secondaryCtaText}</span>
                  <PiArrowRight aria-hidden="true" />
                </a>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}
