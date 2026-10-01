import React from 'react';
import { PiWhatsappLogoFill } from 'react-icons/pi';

export function FloatingWhatsApp() {
  return (
    <aside aria-label="WhatsApp quick chat" className="floating-whatsapp-wrapper">
      <a
        href="https://wa.me/919284830085"
        target="_blank"
        rel="noreferrer"
        className="floating-whatsapp-btn"
        aria-label="Chat with SAVY Greentech on WhatsApp (9284830085)"
      >
        <PiWhatsappLogoFill className="floating-whatsapp-icon" aria-hidden="true" />
        <span className="floating-whatsapp-tooltip">Chat on WhatsApp</span>
      </a>
    </aside>
  );
}
