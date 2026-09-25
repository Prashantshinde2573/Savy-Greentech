import { useState } from 'react';
import { PiArrowRight, PiCheckCircle, PiX } from 'react-icons/pi';

export function QuoteModal({ isOpen, onClose, defaultVehicle = '', mode = 'quote' }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    vehicle: defaultVehicle,
    quantity: '1',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const title = mode === 'demo' ? 'Book a Vehicle Demonstration' : 'Request a Custom Quotation';
  const subtitle = mode === 'demo'
    ? 'Experience SAVY electric vehicles at your campus, facility, or plant.'
    : 'Get detailed commercial and technical proposals customized to your operations.';

  return (
    <div className="quote-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="quote-modal-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="quote-modal-close" onClick={onClose} aria-label="Close modal">
          <PiX />
        </button>

        {submitted ? (
          <div className="quote-modal-success">
            <PiCheckCircle className="success-icon" />
            <h3>Thank you for reaching out!</h3>
            <p>Our commercial and engineering team will contact you within 24 hours with a comprehensive proposal.</p>
            <button type="button" className="button-link primary" onClick={onClose}>
              <span>Close</span>
            </button>
          </div>
        ) : (
          <div>
            <p className="eyebrow" style={{ marginBottom: '8px' }}>{mode === 'demo' ? 'On-Site Experience' : 'Direct OEM Pricing'}</p>
            <h3 className="modal-title">{title}</h3>
            <p className="modal-subtitle">{subtitle}</p>

            <form onSubmit={handleSubmit} className="quote-form">
              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="modal-name">Full Name *</label>
                  <input
                    id="modal-name"
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="modal-company">Company / Institution *</label>
                  <input
                    id="modal-company"
                    type="text"
                    required
                    placeholder="e.g. Grand Heritage Resort"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="modal-phone">Phone / WhatsApp Number *</label>
                  <input
                    id="modal-phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="modal-email">Work Email *</label>
                  <input
                    id="modal-email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="modal-vehicle">Vehicle Model</label>
                  <input
                    id="modal-vehicle"
                    type="text"
                    placeholder="e.g. Classic Golf, Electruck, Dump Truck"
                    value={formData.vehicle}
                    onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="modal-qty">Fleet Quantity</label>
                  <select
                    id="modal-qty"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  >
                    <option value="1">1 Unit (Evaluation)</option>
                    <option value="2-5">2 – 5 Units</option>
                    <option value="6-20">6 – 20 Units (Fleet)</option>
                    <option value="20+">20+ Units (Institutional)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="modal-msg">Operational Requirements / Custom Notes</label>
                <textarea
                  id="modal-msg"
                  rows="3"
                  placeholder="Mention daily distance, payload, terrain, or special custom requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button type="submit" className="button-link primary full-width">
                <span>{mode === 'demo' ? 'Confirm Demo Request' : 'Submit Quote Request'}</span>
                <PiArrowRight aria-hidden="true" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
