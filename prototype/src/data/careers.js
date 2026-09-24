export const openPositions = [
  {
    id: 'ev-design-engineer',
    slug: 'ev-design-chassis-engineer',
    title: 'EV Design & Chassis Engineer',
    department: 'Engineering & R&D',
    location: 'Ahmedabad, Gujarat',
    experience: '3–6 Years',
    type: 'Full-Time',
    description: 'Lead the CAD modeling, structural FEA analysis, chassis frame optimization, and suspension geometry design for custom electric vehicles and light commercial platforms.'
  },
  {
    id: 'production-supervisor',
    slug: 'plant-production-supervisor',
    title: 'Plant Production Supervisor',
    department: 'Manufacturing & Assembly',
    location: 'Ahmedabad Facility, Gujarat',
    experience: '4–7 Years',
    type: 'Full-Time',
    description: 'Manage day-to-day vehicle assembly lines, fabrication schedules, quality inspections, worker safety, and shop floor throughput optimization.'
  },
  {
    id: 'bms-embedded-engineer',
    slug: 'battery-systems-bms-engineer',
    title: 'Battery Systems & BMS Engineer',
    department: 'Powertrain & Electronics',
    location: 'Ahmedabad, Gujarat',
    experience: '2–5 Years',
    type: 'Full-Time',
    description: 'Design and validate battery pack integration, thermal management circuits, battery management system (BMS) firmware protocols, and fast-charging safety algorithms.'
  },
  {
    id: 'institutional-sales-manager',
    slug: 'b2b-institutional-sales-manager',
    title: 'B2B & Institutional Sales Manager',
    department: 'Business Development',
    location: 'Ahmedabad / Regional Hybrid',
    experience: '5+ Years',
    type: 'Full-Time',
    description: 'Drive sales of custom EV fleets across municipal corporations, luxury resorts, university campuses, defence establishments, and industrial logistics clients.'
  },
  {
    id: 'service-technician',
    slug: 'field-service-after-sales-technician',
    title: 'Field Service & After-Sales Technician',
    department: 'Customer Support & Service',
    location: 'Multiple States / Regional',
    experience: '2–4 Years',
    type: 'Full-Time',
    description: 'Provide prompt on-site doorstep diagnostics, preventive maintenance, motor/controller repairs, and battery health checks for institutional client fleets.'
  }
];

export function getCareerBySlug(slug) {
  if (!slug) return null;
  return (
    openPositions.find(
      (job) => job.slug === slug || job.id === slug
    ) || null
  );
}

export const cultureBenefits = [
  {
    title: 'Pioneering Clean Tech',
    description: 'Work directly on tangible zero-emission mobility platforms that reduce carbon footprints across Indian cities.'
  },
  {
    title: 'Hands-On Engineering',
    description: 'Gain direct experience in design-to-assembly manufacturing, motor controllers, battery integration, and fabrication.'
  },
  {
    title: 'Growth & Ownership',
    description: 'Fast-paced, entrepreneurial environment where your contributions directly shape vehicle production and client success.'
  },
  {
    title: 'Continuous Learning',
    description: 'Access to technical workshops, industry conclaves, and hands-on guidance from veteran automotive leaders.'
  }
];
