import { useState, useRef } from 'react';
import { PiArrowRight, PiBriefcase, PiCheckCircle, PiClock, PiFileArrowUp, PiGraduationCap, PiHeart, PiLightning, PiMapPin, PiSparkle, PiUsers, PiX } from 'react-icons/pi';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { PageHero } from '../components/PageHero';
import { SEOHead } from '../components/SEOHead';
import { openPositions, cultureBenefits } from '../data/careers';
import { usePageAnimations } from '../hooks/usePageAnimations';

export function CareersPage() {
  const pageRef = useRef(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    portfolio: '',
    message: ''
  });
  usePageAnimations(pageRef);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setFormData((prev) => ({ ...prev, role: job ? job.title : 'General Application' }));
    const formElem = document.getElementById('career-application');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
        videoSrc="/assets/about-hero.mp4"
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
            {openPositions.map((job) => (
              <article className="job-card" key={job.id}>
                <div className="job-card-header">
                  <div>
                    <span className="job-dept-badge">{job.department}</span>
                    <h3>{job.title}</h3>
                  </div>
                  <button
                    type="button"
                    className="button-link primary btn-sm"
                    onClick={() => handleApplyClick(job)}
                  >
                    <span>Apply Now</span>
                    <PiArrowRight aria-hidden="true" />
                  </button>
                </div>

                <div className="job-meta-pills">
                  <span><PiMapPin /> {job.location}</span>
                  <span><PiBriefcase /> {job.experience}</span>
                  <span><PiClock /> {job.type}</span>
                </div>

                <p className="job-desc">{job.description}</p>
              </article>
            ))}
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
                <button
                  type="button"
                  className="button-link primary"
                  onClick={() => {
                    setSubmitted(false);
                    setSelectedJob(null);
                    setFormData({ name: '', email: '', phone: '', role: '', portfolio: '', message: '' });
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
                    <label htmlFor="c-role">Position of Interest *</label>
                    <input
                      id="c-role"
                      type="text"
                      required
                      placeholder="e.g. EV Design & Chassis Engineer"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
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
                  <label htmlFor="c-msg">Tell Us About Your Experience</label>
                  <textarea
                    id="c-msg"
                    rows="3"
                    placeholder="Briefly describe your relevant technical background or automotive engineering passion..."
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
