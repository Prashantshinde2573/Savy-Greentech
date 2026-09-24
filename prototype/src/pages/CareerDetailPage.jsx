import { useState, useRef, useEffect } from 'react';
import { PiArrowLeft, PiArrowRight, PiBriefcase, PiCheckCircle, PiClock, PiFileArrowUp, PiMapPin, PiSparkle } from 'react-icons/pi';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { SEOHead } from '../components/SEOHead';
import { getCareerBySlug, openPositions as fallbackPositions } from '../data/careers';
import { fetchCareerPostBySlug } from '../services/wordpress';
import { usePageAnimations } from '../hooks/usePageAnimations';

export function CareerDetailPage({ slug }) {
  const pageRef = useRef(null);
  const fallback = getCareerBySlug(slug) || fallbackPositions[0];
  const [job, setJob] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: fallback ? fallback.title : '',
    portfolio: '',
    message: ''
  });
  usePageAnimations(pageRef);

  useEffect(() => {
    let isMounted = true;
    async function loadJob() {
      try {
        setLoading(true);
        const wpJob = await fetchCareerPostBySlug(slug);
        if (isMounted) {
          if (wpJob) {
            setJob(wpJob);
            setFormData((prev) => ({ ...prev, role: wpJob.title }));
          } else {
            const fb = getCareerBySlug(slug) || fallbackPositions[0];
            setJob(fb);
            setFormData((prev) => ({ ...prev, role: fb.title }));
          }
        }
      } catch (err) {
        console.warn(`Error loading career post "${slug}":`, err);
        if (isMounted) {
          const fb = getCareerBySlug(slug) || fallbackPositions[0];
          setJob(fb);
          setFormData((prev) => ({ ...prev, role: fb.title }));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadJob();
    window.scrollTo(0, 0);
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleScrollToForm = () => {
    const formElem = document.getElementById('career-application');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main id="top" className="career-detail-page" ref={pageRef}>
      <SEOHead
        title={`${job.title} | Careers at SAVY Greentech`}
        description={job.description || `Apply for ${job.title} role at SAVY Greentech in Ahmedabad, Gujarat.`}
      />
      <SiteHeader currentPath="/careers" transparentInitially={false} />

      {/* Header & Meta */}
      <section className="section-white article-header-section" style={{ paddingTop: '120px', paddingBottom: '40px' }}>
        <div className="container article-container">
          <div className="breadcrumb-inner" style={{ marginBottom: '24px' }}>
            <a href="/careers" className="breadcrumb-back-link">
              <PiArrowLeft aria-hidden="true" /> Back to Open Positions
            </a>
          </div>

          <div className="article-meta-top" style={{ marginBottom: '16px' }}>
            {job.department && job.department.toLowerCase() !== 'careers' && (
              <span className="job-dept-badge">{job.department}</span>
            )}
          </div>

          <h1 className="article-main-title" style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', marginBottom: '20px' }}>
            {job.title}
          </h1>

          <div className="job-meta-pills" style={{ marginBottom: '28px' }}>
            {job.location && (
              <span>
                <PiMapPin /> {job.location}
              </span>
            )}
            {job.experience && (
              <span>
                <PiBriefcase /> {job.experience}
              </span>
            )}
            {job.type && (
              <span>
                <PiClock /> {job.type}
              </span>
            )}
          </div>

          <button
            type="button"
            className="button-link primary"
            onClick={handleScrollToForm}
          >
            <span>Apply for this Position</span>
            <PiArrowRight aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* Full Content / Job Description */}
      <section className="section-white article-body-section" style={{ paddingTop: '0', paddingBottom: '60px' }}>
        <div className="container article-container">
          <div className="article-content-prose" style={{ borderTop: '1px solid #e2ebe5', paddingTop: '36px' }}>
            {job.content && /<[a-z][\s\S]*>/i.test(job.content) ? (
              <div dangerouslySetInnerHTML={{ __html: job.content }} />
            ) : (
              <div>
                <h2>Role Overview</h2>
                <p>{job.description}</p>
                {job.content && job.content !== job.description && (
                  <div style={{ marginTop: '20px' }}>
                    {job.content.split('\n\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section-cream career-form-section" id="career-application" aria-labelledby="apply-heading">
        <div className="container">
          <div className="career-form-wrapper">
            <div className="section-heading center">
              <p className="eyebrow">Direct Application</p>
              <h2 id="apply-heading">Apply for {job.title}</h2>
              <p className="section-subtitle">
                Submit your credentials directly to our engineering &amp; talent leadership team.
              </p>
            </div>

            {submitted ? (
              <div className="career-form-success">
                <PiCheckCircle className="success-icon" />
                <h3>Application Received!</h3>
                <p>
                  Thank you for applying for <strong>{job.title}</strong>. Our hiring team will review your application and contact you soon.
                </p>
                <button
                  type="button"
                  className="button-link primary"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', role: job.title, portfolio: '', message: '' });
                  }}
                >
                  <span>Submit Another Application</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="career-main-form">
                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="c-name">Full Name *</label>
                    <input
                      id="c-name"
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="c-email">Email Address *</label>
                    <input
                      id="c-email"
                      type="email"
                      required
                      placeholder="priya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="c-phone">Phone Number *</label>
                    <input
                      id="c-phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="c-role">Position</label>
                    <input
                      id="c-role"
                      type="text"
                      readOnly
                      value={formData.role || job.title}
                      style={{ background: '#f0f5f2', cursor: 'not-allowed' }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="c-portfolio">LinkedIn Profile / Portfolio Link</label>
                  <input
                    id="c-portfolio"
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={formData.portfolio}
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="c-resume">Resume / CV Upload (PDF, DOCX)</label>
                  <div className="resume-upload-box">
                    <PiFileArrowUp className="upload-icon" />
                    <span>Click or drag and drop your resume file here</span>
                    <input id="c-resume" type="file" accept=".pdf,.doc,.docx" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="c-msg">Cover Note / Experience Summary</label>
                  <textarea
                    id="c-msg"
                    rows="3"
                    placeholder="Briefly describe your technical background or reasons for applying..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="button-link primary full-width">
                  <span>Submit Application</span>
                  <PiArrowRight aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
