import { PiLinkedinLogo, PiWhatsappLogo, PiPhone, PiEnvelopeSimple, PiMapPin } from 'react-icons/pi';

export function SiteFooter() {
  return (
    <footer className="footer original-footer extended-footer" id="footer">
      <div className="container">
        <div className="footer-top-brand-row">
          <div className="footer-brand-summary">
            <a className="brand brand-lockup inverse" href="/" aria-label="SAVYGREENTECH home">
              <img src="/assets/SG-logo-white.png" alt="SAVYGREENTECH" />
            </a>
            <p className="footer-brand-p">
              Purpose-built custom electric vehicles engineered for institutions, industries, resorts, and smart cities. Reliable, efficient mobility solutions since 2014.
            </p>
          </div>
          <div className="footer-top-socials">
            <a href="https://www.linkedin.com/company/savygreentech/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="footer-social-btn">
              <PiLinkedinLogo /> <span>LinkedIn</span>
            </a>
            <a href="https://wa.me/919284830085" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="footer-social-btn">
              <PiWhatsappLogo /> <span>WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="footer-grid footer-5-col">
          {/* 1. Company */}
          <div className="footer-col">
            <p className="eyebrow mint">Company</p>
            <a href="/about">About Us</a>
            <a href="/sustainability">Sustainability / ESG</a>
            <a href="/case-studies">Case Studies</a>
            <a href="/media">Media &amp; Press</a>
            <a href="/careers">Careers</a>
            <a href="/blog">Blog / Insights</a>
          </div>

          {/* 2. Products */}
          <div className="footer-col">
            <p className="eyebrow mint">Products</p>
            <a href="/products">All Products</a>
            <a href="/products/electric-campus-cart">Electric Campus Cart</a>
            <a href="/products/electric-loading-rickshaw">Electric Loading Rickshaw</a>
            <a href="/products/electric-passenger-rickshaw">Electric Passenger Rickshaw</a>
            <a href="/products/waste-collection-rickshaw">Waste Collection Rickshaw</a>
            <a href="/products/food-cart">Food Cart</a>
            <a href="/products/special-purpose-vehicle">Special Purpose Vehicle</a>
          </div>

          {/* 3. Applications */}
          <div className="footer-col">
            <p className="eyebrow mint">Applications</p>
            <a href="/applications#municipal-government">Municipal &amp; Government</a>
            <a href="/applications#hospitality-tourism">Hospitality &amp; Tourism</a>
            <a href="/applications#healthcare">Healthcare</a>
            <a href="/applications#industrial-logistics">Industrial &amp; Logistics</a>
            <a href="/applications#defence-campuses">Defence &amp; Institutional</a>
            <a href="/applications#food-retail">Food &amp; Retail</a>
            <a href="/applications#fmcg-delivery">FMCG</a>
          </div>

          {/* 4. Technology */}
          <div className="footer-col">
            <p className="eyebrow mint">Technology</p>
            <a href="/technology">Technology</a>
            <a href="/technology#manufacturing-process">Manufacturing</a>
            <a href="/technology#quality-heading">Quality &amp; Testing</a>
            <a href="/technology#service-heading">After-Sales Service</a>
          </div>

          {/* 5. Connect */}
          <div className="footer-col footer-connect-col">
            <p className="eyebrow mint">Connect</p>
            <a href="/become-a-dealer" className="footer-highlight-link">Become a Dealer</a>
            <a href="/contact" className="footer-highlight-link">Contact Us / Get in Touch</a>
            <div className="footer-contact-details">
              <a href="tel:18002026972" className="footer-icon-link">
                <PiPhone /> <span>Toll Free: 1800 202 6972</span>
              </a>
              <a href="https://wa.me/919284830085" target="_blank" rel="noreferrer" className="footer-icon-link">
                <PiWhatsappLogo /> <span>WhatsApp: 9284830085</span>
              </a>
              <a href="mailto:info@savygreentech.com" className="footer-icon-link">
                <PiEnvelopeSimple /> <span>info@savygreentech.com</span>
              </a>
              <div className="footer-address-snippet">
                <PiMapPin />
                <span>513, North Plaza, Motera, Ahmedabad, Gujarat 380005, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 SAVYGREENTECH (Savy Greentech Pvt. Ltd.) All rights reserved.</span>
          <div className="footer-legal-links">
            <a href="/warranty">Warranty &amp; Service</a>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms">Terms &amp; Conditions</a>
            <a href="/cookie-policy">Cookie Policy</a>
          </div>
          <a href="#top" className="back-to-top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

export const GlobalFooter = SiteFooter;

