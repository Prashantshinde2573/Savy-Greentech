import React from 'react';
import {
  PiFileText,
  PiHeadset,
  PiMapPin,
  PiHandshake,
  PiRocketLaunch
} from 'react-icons/pi';

const JOURNEY_STEPS = [
  {
    step: '01',
    icon: PiFileText,
    title: 'Submit Enquiry',
    description: 'Complete the dealership application form with your background and target territory.'
  },
  {
    step: '02',
    icon: PiHeadset,
    title: 'Qualification Call',
    description: 'Initial commercial alignment with our dealer development team to assess capabilities.'
  },
  {
    step: '03',
    icon: PiMapPin,
    title: 'Territory Discussion',
    description: 'Evaluate exclusive/regional territory availability and initial order targets.'
  },
  {
    step: '04',
    icon: PiHandshake,
    title: 'Agreement & Onboarding',
    description: 'Formal dealership agreement, branding kit, and showroom demo allocation.'
  },
  {
    step: '05',
    icon: PiRocketLaunch,
    title: 'Training & Sales Launch',
    description: 'Technical service certification and joint local marketing launch.'
  }
];

export function DealerJourneyScrollSection() {
  return (
    <section
      className="section-white onboarding-roadmap-section"
      id="onboarding-roadmap"
      aria-labelledby="roadmap-heading"
    >
      <div className="container">
        <div className="onboarding-roadmap-box">
          <div className="onboarding-roadmap-bg-vehicle" aria-hidden="true">
            <img
              src="/assets/service-vehicle-wireframe.png"
              alt=""
              loading="lazy"
            />
          </div>
          <div className="onboarding-roadmap-copy">
            <p className="eyebrow mint">ONBOARDING ROADMAP</p>
            <h2 id="roadmap-heading">The 5-Step Dealer Journey</h2>
            <p>
              A structured, transparent partnership process from initial application to official showroom launch and sales rollout.
            </p>
            <div className="roadmap-steps-grid">
              {JOURNEY_STEPS.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.step} className="roadmap-step-item">
                    <div className="roadmap-step-icon-wrap">
                      <Icon className="roadmap-step-icon" aria-hidden="true" />
                      <span className="roadmap-step-num">{item.step}</span>
                    </div>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

