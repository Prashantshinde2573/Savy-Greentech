import { useRef } from 'react';
import { PiArrowLeft, PiFileText, PiShieldCheck } from 'react-icons/pi';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { SEOHead } from '../components/SEOHead';
import { policiesData } from '../data/policies';
import { usePageAnimations } from '../hooks/usePageAnimations';

export function PolicyPage({ policyType = 'privacy-policy' }) {
  const pageRef = useRef(null);
  const policy = policiesData[policyType] || policiesData['privacy-policy'];
  usePageAnimations(pageRef);

  return (
    <main id="top" className="policy-page" ref={pageRef}>
      <SEOHead
        title={`${policy.title} | SAVY Greentech`}
        description={`${policy.title} for SAVY Greentech electric vehicles website and services.`}
      />
      <SiteHeader currentPath={`/${policyType}`} transparentInitially={false} />

      {/* Header */}
      <section className="section-white policy-header-section" aria-labelledby="policy-title">
        <div className="container policy-container">
          <div className="breadcrumb-inner" style={{ marginBottom: '24px' }}>
            <a href="/" className="breadcrumb-back-link">
              <PiArrowLeft aria-hidden="true" /> Back to Home
            </a>
          </div>

          <div className="policy-badge-row">
            <PiShieldCheck />
            <span>Official Policy Document · Last Updated {policy.lastUpdated}</span>
          </div>

          <h1 id="policy-title" className="policy-main-title">{policy.title}</h1>
        </div>
      </section>

      {/* Policy Content */}
      <section className="section-cream policy-content-section">
        <div className="container policy-container">
          <div className="policy-body-card">
            {policy.sections.map((sec, idx) => (
              <div className="policy-section-block" key={idx}>
                <h2>{sec.heading}</h2>
                <div className="policy-text-prose">
                  {sec.content.split('\n\n').map((paragraph, pIdx) => {
                    const trimmed = paragraph.trim();
                    if (trimmed.startsWith('- ') || trimmed.startsWith('1. ') || trimmed.startsWith('2. ')) {
                      return (
                        <div key={pIdx} className="policy-bullets-block">
                          {trimmed.split('\n').map((line, lIdx) => (
                            <p key={lIdx} className="policy-bullet-item">{line}</p>
                          ))}
                        </div>
                      );
                    }
                    return <p key={pIdx}>{trimmed}</p>;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
