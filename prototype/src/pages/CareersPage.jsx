import { useState, useRef, useEffect } from 'react';
import { PiArrowRight, PiBriefcase, PiCheckCircle, PiClock, PiFileArrowUp, PiMapPin, PiSparkle, PiWhatsappLogo } from 'react-icons/pi';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { PageHero } from '../components/PageHero';
import { SEOHead } from '../components/SEOHead';
import { cultureBenefits } from '../data/careers';
import { fetchCareerPosts } from '../services/wordpress';
import { usePageAnimations } from '../hooks/usePageAnimations';
import { submitFormToGoogleSheets, buildWhatsAppUrl, attemptOpenWhatsApp } from '../services/formSubmission';
import { uploadResumeToGoogleDrive } from '../services/resumeUpload';
import { SHEET_TABS } from '../config/forms';
import { validateEmail, validatePhoneNumber, validateResume, sanitizePhoneInput } from '../utils/validation';

export function CareersPage() {
  const pageRef = useRef(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [whatsappLink, setWhatsappLink] = useState(null);
  const [honeypot, setHoneypot] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
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
    async function loadCareers() {
      try {
        setLoading(true);
        const wpCareers = await fetchCareerPosts();
        if (isMounted) {
          setJobs(wpCareers || []);
        }
      } catch (err) {
        console.error('WordPress API error for careers:', err);
        if (isMounted) {
          setJobs([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadCareers();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setFormData((prev) => ({ ...prev, role: job ? job.title : 'General Application' }));
    const formElem = document.getElementById('career-application');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEmailChange = (val) => {
    setFormData((prev) => ({ ...prev, email: val }));
    if (fieldErrors.email) {
      const res = validateEmail(val);
      if (res.isValid) {
        setFieldErrors((prev) => {
          const next = { ...prev };
          delete next.email;
          return next;
        });
      }
    }
  };

  const handleEmailBlur = () => {
    if (formData.email.trim()) {
      const res = validateEmail(formData.email);
      if (!res.isValid) {
        setFieldErrors((prev) => ({ ...prev, email: res.error }));
      }
    }
  };

  const handlePhoneChange = (val) => {
    const sanitized = sanitizePhoneInput(val);
    setFormData((prev) => ({ ...prev, phone: sanitized }));
    if (fieldErrors.phone) {
      const res = validatePhoneNumber(sanitized);
      if (res.isValid) {
        setFieldErrors((prev) => {
          const next = { ...prev };
          delete next.phone;
          return next;
        });
      }
    }
  };

  const handlePhoneBlur = () => {
    if (formData.phone.trim()) {
      const res = validatePhoneNumber(formData.phone);
      if (!res.isValid) {
        setFieldErrors((prev) => ({ ...prev, phone: res.error }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Comprehensive Client-side Validation (Email, Phone, Role, Mandatory Resume)
    const emailRes = validateEmail(formData.email);
    const phoneRes = validatePhoneNumber(formData.phone);
    const resumeRes = validateResume(resumeFile, { required: true });

    const errors = {};
    if (!formData.name?.trim()) errors.name = 'Please enter your full name.';
    if (!emailRes.isValid) errors.email = emailRes.error;
    if (!phoneRes.isValid) errors.phone = phoneRes.error;
    if (!formData.role?.trim()) errors.role = 'Please enter your position of interest.';
    if (!resumeRes.isValid) errors.resume = resumeRes.error;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const appType = selectedJob ? 'Job Role Application' : 'General Application';
      const targetRole = formData.role || (selectedJob ? selectedJob.title : 'General Application');

      // 2. Upload mandatory resume to Google Drive
      const uploadResult = await uploadResumeToGoogleDrive(resumeFile);
      const uploadedDriveUrl = uploadResult.fileUrl;
      const effectiveFileName = uploadResult.fileName || resumeFile.name;

      // 3. Submit application to Google Sheets (same row, no duplicate rows)
      const payload = {
        'Application Type': appType,
        'Position': targetRole,
        'Full Name': formData.name.trim(),
        'Email Address': emailRes.value,
        'Phone Number': phoneRes.value,
        'LinkedIn / Portfolio': formData.portfolio?.trim() || 'N/A',
        'Resume File': effectiveFileName,
        'Resume Drive Link': uploadedDriveUrl,
        'Cover Note / Experience': formData.message?.trim() || 'N/A',
        'Job Slug': selectedJob?.slug || '',
      };

      await submitFormToGoogleSheets({
        formType: SHEET_TABS.CAREERS,
        payload,
        honeypot,
      });

      const waUrl = buildWhatsAppUrl({
        formType: selectedJob ? 'Job Role Application' : 'Career Application',
        name: formData.name.trim(),
        email: emailRes.value,
        phone: phoneRes.value,
        jobRole: targetRole,
        experience: selectedJob?.experience || '',
        location: selectedJob?.location || '',
        resume: effectiveFileName !== 'Not uploaded' ? effectiveFileName : '',
        portfolio: formData.portfolio?.trim() || '',
        message: formData.message?.trim() || '',
      });

      setWhatsappLink(waUrl);
      setSubmitted(true);
      setSubmitError(null);

      if (waUrl) {
        attemptOpenWhatsApp(waUrl);
      }
    } catch (err) {
      console.error('Career application error:', err);
      setSubmitError(err.message || 'Unable to submit your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main id="top" className="careers-page" ref={pageRef}>
      <SEOHead
        title="Careers | Build the Future of Electric Mobility With SAVY"
        description="Join the SAVY Greentech engineering, production, and after-sales team. Explore open roles in Ahmedabad and across regional service networks."
      />
      <SiteHeader currentPath="/careers" transparentInitially={true} />

      <PageHero
        eyebrow="Join Our Team"
        title="Build the Future of Electric Mobility With SAVY"
        description="Work with passionate automotive engineers, designers, and clean-tech pioneers building India's indigenous electric vehicle platforms."
        videoSrc="/assets/Videos/became a dealer page (1).mp4"
        primaryCtaText="Explore Open Positions"
        primaryCtaHref="#open-positions"
        secondaryCtaText="Life at SAVY"
        secondaryCtaHref="#culture"
      />

      {/* Culture & Benefits */}
      <section className="section-white culture-section" id="culture" aria-labelledby="culture-title">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">Life at SAVY</p>
            <h2 id="culture-title">Why Build Your Career at SAVY Greentech?</h2>
            <p className="section-subtitle">We combine the agile spirit of innovation with serious manufacturing and engineering rigor.</p>
          </div>

          <div className="culture-grid">
            {cultureBenefits.map((item, idx) => (
              <article className="culture-card" key={idx}>
                <div className="culture-icon-wrap"><PiSparkle /></div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions List */}
      <section className="section-cream open-positions-section" id="open-positions" aria-labelledby="jobs-heading">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">Opportunities</p>
            <h2 id="jobs-heading">Open Engineering &amp; Operations Roles</h2>
            <p className="section-subtitle">Discover opportunities to make an impact across our plant, R&amp;D lab, and regional networks.</p>
          </div>

          <div className="jobs-list">
            {loading ? (
              [1, 2, 3].map((n) => (
                <article className="job-card" key={n} style={{ opacity: 0.6 }}>
                  <div className="job-card-header">
                    <div>
                      <div style={{ height: '18px', width: '120px', background: '#dce8e0', borderRadius: '4px', marginBottom: '8px' }} />
                      <div style={{ height: '24px', width: '260px', background: '#dce8e0', borderRadius: '6px' }} />
                    </div>
                  </div>
                  <div style={{ height: '14px', width: '100%', background: '#dce8e0', borderRadius: '4px', marginTop: '16px' }} />
                </article>
              ))
            ) : jobs.length === 0 ? (
              <div className="no-products-found" style={{ textAlign: 'center', padding: '40px 0' }}>
                <p>No open positions at the moment. You can submit a general application below.</p>
              </div>
            ) : (
              jobs.map((job) => (
                <article className="job-card" key={job.id || job.slug}>
                  <div className="job-card-header">
                    <div>
                      {job.department && job.department.toLowerCase() !== 'careers' && (
                        <span className="job-dept-badge">{job.department}</span>
                      )}
                      <h3>
                        <a href={`/careers/${job.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                          {job.title}
                        </a>
                      </h3>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <a
                        href={`/careers/${job.slug}`}
                        className="button-link secondary btn-sm"
                        style={{ padding: '8px 14px', fontSize: '13px' }}
                      >
                        <span>Details</span>
                        <PiArrowRight aria-hidden="true" />
                      </a>
                      <button
                        type="button"
                        className="button-link primary btn-sm"
                        onClick={() => handleApplyClick(job)}
                      >
                        <span>Apply Now</span>
                        <PiArrowRight aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="job-meta-pills">
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

                  <p className="job-desc">{job.description}</p>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Career Application Form */}
      <section className="section-white career-form-section" id="career-application" aria-labelledby="apply-heading">
        <div className="container">
          <div className="career-form-wrapper">
            <div className="section-heading center">
              <p className="eyebrow">Direct Recruitment</p>
              <h2 id="apply-heading">Submit Your Application</h2>
              <p className="section-subtitle">
                {selectedJob ? `Applying for: ${selectedJob.title}` : 'Apply for an open position or submit a general application.'}
              </p>
            </div>

            {submitted ? (
              <div className="career-form-success">
                <PiCheckCircle className="success-icon" />
                <h3>Application Received!</h3>
                <p>Our talent acquisition team will review your qualifications and contact shortlisted candidates for technical rounds.</p>

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
                    setSelectedJob(null);
                    setWhatsappLink(null);
                    setSubmitError(null);
                    setFieldErrors({});
                    setResumeFile(null);
                    setResumeFileName('');
                    setFormData({ name: '', email: '', phone: '', role: '', portfolio: '', message: '' });
                  }}
                >
                  <span>Submit Another Application</span>
                  <PiArrowRight aria-hidden="true" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="career-main-form" noValidate>
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
                      className={fieldErrors.name ? 'input-field-error' : ''}
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (fieldErrors.name && e.target.value.trim()) {
                          setFieldErrors((prev) => {
                            const next = { ...prev };
                            delete next.name;
                            return next;
                          });
                        }
                      }}
                      aria-invalid={!!fieldErrors.name}
                      aria-describedby={fieldErrors.name ? 'c-name-error' : undefined}
                    />
                    {fieldErrors.name && (
                      <span id="c-name-error" className="field-error-text" role="alert">
                        {fieldErrors.name}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="c-email">Email Address *</label>
                    <input
                      id="c-email"
                      type="email"
                      required
                      placeholder="priya@example.com"
                      className={fieldErrors.email ? 'input-field-error' : ''}
                      value={formData.email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      onBlur={handleEmailBlur}
                      aria-invalid={!!fieldErrors.email}
                      aria-describedby={fieldErrors.email ? 'c-email-error' : undefined}
                    />
                    {fieldErrors.email && (
                      <span id="c-email-error" className="field-error-text" role="alert">
                        {fieldErrors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="c-phone">Phone Number *</label>
                    <input
                      id="c-phone"
                      type="text"
                      inputMode="numeric"
                      maxLength={10}
                      pattern="[0-9]*"
                      required
                      placeholder="e.g. 9876543210"
                      className={fieldErrors.phone ? 'input-field-error' : ''}
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      onBlur={handlePhoneBlur}
                      aria-invalid={!!fieldErrors.phone}
                      aria-describedby={fieldErrors.phone ? 'c-phone-error' : undefined}
                    />
                    {fieldErrors.phone && (
                      <span id="c-phone-error" className="field-error-text" role="alert">
                        {fieldErrors.phone}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="c-role">Position of Interest *</label>
                    <input
                      id="c-role"
                      type="text"
                      required
                      placeholder="e.g. EV Design & Chassis Engineer"
                      className={fieldErrors.role ? 'input-field-error' : ''}
                      value={formData.role}
                      onChange={(e) => {
                        setFormData({ ...formData, role: e.target.value });
                        if (fieldErrors.role && e.target.value.trim()) {
                          setFieldErrors((prev) => {
                            const next = { ...prev };
                            delete next.role;
                            return next;
                          });
                        }
                      }}
                      aria-invalid={!!fieldErrors.role}
                      aria-describedby={fieldErrors.role ? 'c-role-error' : undefined}
                    />
                    {fieldErrors.role && (
                      <span id="c-role-error" className="field-error-text" role="alert">
                        {fieldErrors.role}
                      </span>
                    )}
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
                  <label htmlFor="c-resume">Resume / CV Upload (PDF, DOC, DOCX) *</label>
                  <div className={`resume-upload-box ${fieldErrors.resume ? 'input-field-error' : ''}`}>
                    <PiFileArrowUp className="upload-icon" />
                    <span>
                      {resumeFileName ? `Selected: ${resumeFileName}` : 'Click or drag and drop your resume file here *'}
                    </span>
                    <input
                      id="c-resume"
                      type="file"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const valRes = validateResume(file, { required: true });
                          if (valRes.isValid) {
                            setResumeFile(file);
                            setResumeFileName(file.name);
                            setFieldErrors((prev) => {
                              const next = { ...prev };
                              delete next.resume;
                              return next;
                            });
                          } else {
                            setResumeFile(null);
                            setResumeFileName('');
                            e.target.value = '';
                            setFieldErrors((prev) => ({ ...prev, resume: valRes.error }));
                          }
                        } else {
                          setResumeFile(null);
                          setResumeFileName('');
                          setFieldErrors((prev) => ({
                            ...prev,
                            resume: 'Please upload your resume before submitting your application.'
                          }));
                        }
                      }}
                      aria-invalid={!!fieldErrors.resume}
                      aria-describedby={fieldErrors.resume ? 'c-resume-error' : undefined}
                    />
                  </div>
                  {fieldErrors.resume && (
                    <span id="c-resume-error" className="field-error-text" role="alert">
                      {fieldErrors.resume}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="c-msg">Tell Us About Your Experience</label>
                  <textarea
                    id="c-msg"
                    rows="3"
                    placeholder="Briefly describe your relevant technical background or automotive engineering passion..."
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
                  <span>{isSubmitting ? 'Submitting your application...' : 'Submit Application'}</span>
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
