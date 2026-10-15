import { useState, useRef, useEffect } from 'react';
import { PiArrowLeft, PiArrowRight, PiBriefcase, PiCheckCircle, PiClock, PiFileArrowUp, PiMapPin, PiSparkle, PiWhatsappLogo } from 'react-icons/pi';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { SEOHead } from '../components/SEOHead';
import { fetchCareerPostBySlug } from '../services/wordpress';
import { getCareerBySlug } from '../data/careers';
import { usePageAnimations } from '../hooks/usePageAnimations';
import { submitFormToGoogleSheets, buildWhatsAppUrl, attemptOpenWhatsApp } from '../services/formSubmission';
import { SHEET_TABS } from '../config/forms';

export function CareerDetailPage({ slug }) {
  const pageRef = useRef(null);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [whatsappLink, setWhatsappLink] = useState(null);
  const [honeypot, setHoneypot] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    portfolio: '',
    message: ''
  });
  usePageAnimations(pageRef);

  useEffect(() => {
    let isMounted = true;
    async function loadJob() {
      try {
        setLoading(true);
        const wpJob = await fetchCareerPostBySlug(slug).catch(() => null);
        const matchedJob = wpJob || getCareerBySlug(slug);
        if (isMounted) {
          if (matchedJob) {
            setJob(matchedJob);
            setFormData((prev) => ({ ...prev, role: matchedJob.title }));
          } else {
            setJob(null);
          }
        }
      } catch (err) {
        console.error(`Error loading career post "${slug}":`, err);
        if (isMounted) {
          const fallback = getCareerBySlug(slug);
          setJob(fallback);
          if (fallback) {
            setFormData((prev) => ({ ...prev, role: fallback.title }));
          }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const targetRole = job?.title || formData.role || 'Job Role Application';
      const payload = {
        'Application Type': 'Job Role Application',
        'Position': targetRole,
        'Full Name': formData.name,
        'Email Address': formData.email,
        'Phone Number': formData.phone,
        'LinkedIn / Portfolio': formData.portfolio || 'N/A',
        'Resume File': resumeFileName || 'Not uploaded',
        'Cover Note / Experience': formData.message || 'N/A',
        'Job Slug': slug || '',
      };

      await submitFormToGoogleSheets({
        formType: SHEET_TABS.CAREERS,
        payload,
        honeypot,
      });

      const waUrl = buildWhatsAppUrl({
        formType: 'Job Role Application',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        jobRole: targetRole,
        experience: job?.experience || '',
        location: job?.location || '',
        resume: resumeFileName || '',
        portfolio: formData.portfolio || '',
        message: formData.message || '',
      });

      setWhatsappLink(waUrl);
      setSubmitted(true);
      setSubmitError(null);

      if (waUrl) {
        attemptOpenWhatsApp(waUrl);
      }
    } catch (err) {
      console.error('Job application error:', err);
      setSubmitError(err.message || 'Unable to submit your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScrollToForm = () => {
    const formElem = document.getElementById('career-application');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <main id="top" className="career-detail-page" ref={pageRef}>
        <SiteHeader currentPath="/careers" transparentInitially={false} />
        <section className="section-white article-header-section" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
          <div className="container article-container" style={{ textAlign: 'center', minHeight: '300px' }}>
            <p className="eyebrow mint">SAVY Careers</p>
            <h2>Loading Position Details...</h2>
          </div>
        </section>
        <SiteFooter />
      </main>
    );
  }

  if (!job) {
    return (
      <main id="top" className="career-detail-page" ref={pageRef}>
        <SiteHeader currentPath="/careers" transparentInitially={false} />
        <section className="section-white article-header-section" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
          <div className="container article-container" style={{ textAlign: 'center', minHeight: '300px' }}>
            <div className="breadcrumb-inner" style={{ marginBottom: '24px' }}>
              <a href="/careers" className="breadcrumb-back-link">
                <PiArrowLeft aria-hidden="true" /> Back to Open Positions
              </a>
            </div>
            <h2>Position Not Found</h2>
            <p style={{ marginTop: '12px', marginBottom: '24px' }}>The position you are looking for is no longer active or has been moved.</p>
            <a href="/careers" className="button-link primary">
              <span>View All Open Positions</span>
              <PiArrowRight aria-hidden="true" />
            </a>
          </div>
        </section>
        <SiteFooter />
      </main>
    );
  }

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

                {whatsappLink && (
                  <div style={{ marginTop: '20px', marginBottom: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-link secondary"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: '#25D366',
                        color: '#ffffff',
                        borderColor: '#25D366',
                        fontWeight: 600,
                      }}
                    >
                      <PiWhatsappLogo style={{ fontSize: '1.25rem' }} aria-hidden="true" />
                      <span>Chat on WhatsApp</span>
                    </a>
                    <span style={{ fontSize: '0.8125rem', color: '#6B7280', textAlign: 'center' }}>
                      WhatsApp opens with your prefilled job application. Review and manually click Send in WhatsApp.
                    </span>
                  </div>
                )}

                <button
                  type="button"
                  className="button-link primary"
                  onClick={() => {
                    setSubmitted(false);
                    setWhatsappLink(null);
                    setSubmitError(null);
                    setResumeFileName('');
                    setFormData({ name: '', email: '', phone: '', role: job.title, portfolio: '', message: '' });
                  }}
                >
                  <span>Submit Another Application</span>
                  <PiArrowRight aria-hidden="true" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="career-main-form">
                {/* Honeypot field for spam prevention */}
                <input
                  type="text"
                  name="candidate_source"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', opacity: 0, zIndex: -1, width: 0, height: 0, pointerEvents: 'none' }}
                />
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
                    <span>
                      {resumeFileName ? `Selected: ${resumeFileName}` : 'Click or drag and drop your resume file here'}
                    </span>
                    <input
                      id="c-resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        setResumeFileName(file ? file.name : '');
                      }}
                    />
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

                {submitError && (
                  <div
                    className="form-error-alert"
                    role="alert"
                    style={{
                      backgroundColor: '#FEF2F2',
                      color: '#991B1B',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      marginBottom: '16px',
                      border: '1px solid #FCA5A5',
                    }}
                  >
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  className="button-link primary full-width"
                  disabled={isSubmitting}
                  style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                >
                  <span>{isSubmitting ? 'Submitting Application...' : 'Submit Application'}</span>
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
