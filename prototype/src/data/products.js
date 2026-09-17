export const productCategories = [
  { id: 'all', name: 'All Vehicles' },
  { id: 'golf-carts', name: 'Electric Golf Carts' },
  { id: 'loading-rickshaws', name: 'Electric Loading Rickshaws' },
  { id: 'garbage-collection', name: 'Electric Garbage Collection' },
  { id: 'passenger-rickshaws', name: 'Electric Passenger Rickshaws' },
  { id: 'school-rickshaws', name: 'Electric School Rickshaw' },
  { id: 'food-carts', name: 'Rickshaw Food Carts' },
  { id: 'vintage-cars', name: 'Electric Vintage Cars' },
  { id: 'custom-industrial', name: 'Custom & Industrial Builds' },
  { id: 'upcoming', name: 'Upcoming Products' },
];

export const products = [
  {
    slug: 'classic-golf',
    name: 'Classic Golf',
    category: 'golf-carts',
    categoryName: 'Electric Golf Carts',
    tagline: 'High-efficiency four-wheel electric campus cart for institutional transit.',
    image: '/assets/classic-golf.jpeg',
    gallery: [
      '/assets/classic-golf.jpeg',
      '/assets/club-cart.jpg',
      '/assets/applications/golf-course.jpg',
      '/assets/applications/campus.jpg'
    ],
    shortCopy: 'Classic Golf is a four-wheel campus cart designed for internal transportation purposes across various sectors such as universities, schools, resorts, government bodies, industrial campuses, and large institutions.',
    overview: 'The SAVY Classic Golf cart provides a silent, zero-emission transportation solution engineered specifically for paved and internal pathways. Built with robust tubular steel chassis, smart motor control, and ergonomic passenger seating, it delivers superior comfort and dependable daily campus mobility.',
    specs: {
      power: '2 kW High-Torque AC/DC Motor',
      topSpeed: '25 km/h',
      range: '75 km per charge',
      seatingCapacity: '2, 4, 6 & 8 Seater Variants',
      loadCapacity: 'Up to 600 kg Payload',
      batteryType: 'Lithium-ion / Advanced Lead-Acid Options',
      chargingTime: '4–6 Hours (Standard) / 2.5 Hours (Fast)',
      dimensions: 'Custom / Standard Institutional Dimensions',
      warranty: 'Standard OEM Warranty (Terms apply)',
      gradeability: 'Up to 15 degrees',
      braking: 'Regenerative Braking + Mechanical Hydraulic Drum',
    },
    features: [
      'Ergonomic all-weather contoured seating with premium upholstery',
      'Advanced smart motor controller with regenerative braking system',
      'Heavy-duty rust-resistant tubular chassis built for continuous operation',
      'Digital LED instrument dashboard displaying speed, SOC, and diagnostic codes',
      'Modular canopy roof with integrated rain drainage channels',
      'Low total cost of ownership with minimal routine maintenance requirements'
    ],
    applications: [
      'Golf Courses & Luxury Resorts',
      'University & School Campuses',
      'Airports & Large Transit Hubs',
      'Gated Townships & Residential Communities',
      'Hospitals & Healthcare Campuses'
    ],
    customization: [
      'Custom seating layouts (2, 4, 6, 8, 12 seats)',
      'Solar-roof panel integration for extended daytime range',
      'Enclosed all-weather weather curtains and rain protection',
      'Institutional branding and customized exterior color schemes',
      'Rear utility cargo box conversion for luggage or maintenance tools'
    ]
  },
  {
    slug: 'club-cart',
    name: 'Club Cart',
    category: 'golf-carts',
    categoryName: 'Electric Golf Carts',
    tagline: 'Premium luxury campus and resort electric mobility.',
    image: '/assets/club-cart.jpg',
    gallery: [
      '/assets/club-cart.jpg',
      '/assets/classic-golf.jpeg',
      '/assets/vintage-elite.jpg',
      '/assets/applications/tourism.jpg'
    ],
    shortCopy: 'Club Cart is a premium four-wheel campus cart similar to the Classic Golf model, designed for internal transportation in campuses, resorts, institutions, and commercial premises. The primary difference lies in its premium exterior design and styling.',
    overview: 'Engineered for luxury hospitality, VIP guest transit, and premier resort environments, the SAVY Club Cart elevates passenger comfort with automotive-grade exterior body panels, enhanced suspension tuning, and sophisticated aesthetics.',
    specs: {
      power: '2 kW High-Efficiency Motor',
      topSpeed: '25 km/h',
      range: '75 km per charge',
      seatingCapacity: '2, 4, 6 & 8 Seater VIP Options',
      loadCapacity: 'Up to 650 kg',
      batteryType: 'Lithium-ion (LiFePO4) / Deep Cycle Lead-Acid',
      chargingTime: '4–5 Hours',
      dimensions: 'Premium Executive Footprint',
      warranty: 'Standard OEM Warranty',
      gradeability: '15 degrees',
      braking: 'Hydraulic disc/drum with regenerative assist',
    },
    features: [
      'Executive styled front fascia with high-intensity LED projector headlamps',
      'Plush dual-tone marine-grade vinyl seating with enhanced cushioning',
      'Smooth independent front suspension for superior ride comfort',
      'Integrated beverage holders, glove box storage, and USB charging points',
      'Lightweight yet rigid composite body panels for longevity and elegance'
    ],
    applications: [
      'Luxury Hotels, Spas & Beach Resorts',
      'VIP Airport Lounges & Terminals',
      'Corporate Headquarters & Industrial Campuses',
      'Golf Estates & High-End Gated Communities'
    ],
    customization: [
      'Bespoke upholstery and custom embroidery',
      'Rear-facing flip seat converting into a flat utility deck',
      'Custom alloy wheels and turf-friendly pneumatic tires',
      'PA system and onboard audio integration for guided property tours'
    ]
  },
  {
    slug: 'electruck',
    name: 'Electruck',
    category: 'loading-rickshaws',
    categoryName: 'Electric Loading Rickshaws',
    tagline: 'Rugged heavy-duty electric cargo carrier for industrial logistics.',
    image: '/assets/electruck.jpg',
    gallery: [
      '/assets/electruck.jpg',
      '/assets/dump-truck.jpg',
      '/assets/applications/logistics.jpg'
    ],
    shortCopy: 'Electruck is a cargo-loading three-wheeler designed to cater to clients across various sectors such as FMCG delivery, laundry services, material handling, and industrial logistics.',
    overview: 'The SAVY Electruck redefines industrial cargo transport with its heavy-duty payload capability, reinforced steel cargo bed, and high-torque electric powertrain. Built to handle punishing duty cycles in manufacturing plants, warehouses, and last-mile urban logistics networks.',
    specs: {
      power: '1.5 kW High-Torque Indigenous Motor',
      topSpeed: '25 km/h',
      range: '75 km (Payload dependent)',
      seatingCapacity: '1 Driver',
      loadCapacity: '500 kg to 900 kg Custom Payload Ratings',
      batteryType: 'Heavy-Duty Lithium-ion / Deep Cycle Lead-Acid',
      chargingTime: '4–6 Hours',
      dimensions: 'High-Volume Cargo Box Configurations',
      warranty: 'Verified OEM Industrial Warranty',
      gradeability: 'Up to 12 degrees fully laden',
      braking: 'Heavy-Duty Mechanical / Hydraulic Assist',
    },
    features: [
      'Reinforced ladder-frame chassis with heavy-duty leaf spring rear suspension',
      'High-grade steel cargo deck with drop-down sides and secure lock mechanisms',
      'Weatherproof sealed motor and electronic controller enclosure (IP65/IP67)',
      'Digital battery management and overload protection system',
      'Zero fuel consumption leading to over 75% operational cost reduction'
    ],
    applications: [
      'Industrial Manufacturing Plants & Material Handling',
      'FMCG & Parcel Last-Mile Delivery',
      'Hospital & Hotel Linen / Laundry Transport',
      'Wholesale Markets, Agro-Logistics & Hardware Supply'
    ],
    customization: [
      'Closed container box body with roll-up shutters or double rear doors',
      'Custom 900 kg heavy-duty reinforced chassis (as built for Ramdev Foods)',
      'Insulated container body for perishable goods and cold chain transit',
      'Hydraulic tip-tray for aggregate and bulk material unloading'
    ]
  },
  {
    slug: 'dump-truck',
    name: 'Dump Truck',
    category: 'garbage-collection',
    categoryName: 'Electric Garbage Collection',
    tagline: 'Hydraulic tipper & dual-compartment EV for municipal sanitation.',
    image: '/assets/dump-truck.jpg',
    gallery: [
      '/assets/dump-truck.jpg',
      '/assets/electruck.jpg',
      '/assets/applications/government.jpg',
      '/assets/applications/community.jpg'
    ],
    shortCopy: 'Dumptruck is a three-wheel electric waste collection vehicle designed for efficient door-to-door garbage collection and municipal sanitation operations, widely used by Gram Panchayats, municipalities, and government sanitation departments.',
    overview: 'Built specifically to support Swachh Bharat and municipal solid waste management initiatives, the SAVY Dump Truck features hydraulic tipping mechanisms, dual wet/dry segregation compartments, and low-speed high-torque maneuvering through narrow lanes where conventional diesel trucks cannot enter.',
    specs: {
      power: '1.5 kW High-Torque Motor',
      topSpeed: '25 km/h',
      range: '70–120 km per charge',
      seatingCapacity: '1 Driver + 1 Helper',
      loadCapacity: '500–800 kg Waste Payload Capacity',
      batteryType: 'High-Density Lithium / Deep Cycle Industrial',
      chargingTime: '4–6 Hours',
      dimensions: 'Compact Narrow-Alley Urban Footprint',
      warranty: 'Municipal OEM Warranty Support',
      gradeability: '12 degrees laden',
      braking: 'Hydraulic / Mechanical Front and Rear Drum',
    },
    features: [
      'Dual compartment waste segregation (Wet Waste & Dry Waste dividers)',
      'Electro-hydraulic tipping mechanism with intuitive operator joystick control',
      'Leak-proof anti-corrosive stainless steel or treated MS bin floor to prevent leachate spills',
      'Audio public announcement (PA) siren system for resident door-to-door collection alerts',
      'Easy wash-down design with drainage plugs for effortless daily sanitization'
    ],
    applications: [
      'Municipal Corporations & Nagar Palikas',
      'Gram Panchayats & Rural Sanitation Missions',
      'Smart City Waste Management Hubs',
      'Large Educational & Industrial Campuses'
    ],
    customization: [
      'Hydraulic auto-lifter for standard 120L / 240L municipal garbage bins',
      'Single large capacity tipper bin or partitioned multi-compartment bin',
      'GPS live fleet tracking and geofencing telemetry module',
      'Solar trickle-charging auxiliary rooftop unit'
    ]
  },
  {
    slug: 'vintage-elite',
    name: 'Vintage Elite',
    category: 'vintage-cars',
    categoryName: 'Electric Vintage Cars',
    tagline: 'Timeless heritage styling paired with cutting-edge electric powertrain.',
    image: '/assets/vintage-elite.jpg',
    gallery: [
      '/assets/vintage-elite.jpg',
      '/assets/classic-golf.jpeg',
      '/assets/applications/tourism.jpg'
    ],
    shortCopy: 'A premium four-wheel campus cart designed for internal transportation with a vintage appearance. It is preferred by universities, schools, resorts, government bodies, and for VIP movement within large campuses and commercial premises.',
    overview: 'The SAVY Vintage Elite combines nostalgic classic automobile design with clean zero-emission electric engineering. A statement vehicle ideal for royal heritage hotels, destination wedding venues, high-profile institutional visits, and VIP hospitality.',
    specs: {
      power: '2 kW High-Precision Electric Motor',
      topSpeed: '25 km/h',
      range: '75 km per charge',
      seatingCapacity: '4 to 8 Seater Heritage Formats',
      loadCapacity: 'Up to 600 kg',
      batteryType: 'Lithium-ion / Advanced Deep Cycle',
      chargingTime: '4–6 Hours',
      dimensions: 'Grand Classic Wheelbase',
      warranty: 'Comprehensive SAVY OEM Warranty',
      gradeability: '15 degrees',
      braking: 'Regenerative + Hydraulic Braking System',
    },
    features: [
      'Classic hand-crafted chrome grille, vintage headlamp nacelles, and ornate bumpers',
      'Handcrafted wood-finish dashboard with analog-styled digital indicators',
      'Deep cushioned luxury button-tufted upholstery with weather-resistant coating',
      'Spacious legroom and wide stepped running boards for effortless entry/exit',
      'Smooth, silent glide with zero vibration and zero tailpipe emissions'
    ],
    applications: [
      'Heritage Hotels, Palaces & Luxury Resorts',
      'VIP Movement in Government & Institutional Campuses',
      'Destination Weddings, Film Cities & Theme Parks',
      'Eco-Tourism Circuits & Botanical Gardens'
    ],
    customization: [
      'Custom royal color palettes (British Racing Green, Royal Maroon, Ivory White)',
      'Canopy fringe trim, brass coach lamps, and personalized crest badging',
      'Luxury bar console and auxiliary cool-box fitment'
    ]
  },
  {
    slug: 'tuk-tuk-e',
    name: 'Tuk Tuk ë',
    category: 'passenger-rickshaws',
    categoryName: 'Electric Passenger Rickshaws',
    tagline: 'Versatile electric passenger three-wheeler with on-road approval.',
    image: '/assets/tuk-tuk.jpg',
    gallery: [
      '/assets/tuk-tuk.jpg',
      '/assets/electruck.jpg',
      '/assets/applications/community.jpg',
      '/assets/applications/tourism.jpg'
    ],
    shortCopy: 'Tuk Tuk ë is a versatile three-wheel passenger vehicle designed for urban and commercial transport, available in multiple seating configurations from 2+1 to 8+1, with the 4+1 variant approved for on-road use.',
    overview: 'The SAVY Tuk Tuk ë is an efficient, safe, and economical electric passenger vehicle. Built to provide green micro-mobility for campus transit, tourist circuits, and certified on-road passenger transport with exceptional battery mileage and low maintenance overheads.',
    specs: {
      power: '1.5 kW Indigenous BLDC / PMSM Motor',
      topSpeed: '25 km/h',
      range: '70–120 km per charge',
      seatingCapacity: '2+1 to 8+1 Configurations (4+1 On-Road Approved)',
      loadCapacity: 'Up to 500 kg Passenger Load',
      batteryType: 'Lithium-ion (Quick-Charge Ready) / Lead-Acid',
      chargingTime: '3.5–5 Hours',
      dimensions: 'Compact High-Maneuverability Chassis',
      warranty: 'SAVY Verified Warranty',
      gradeability: '12 degrees',
      braking: 'Mechanical / Hydraulic Drum with Parking Lock',
    },
    features: [
      'Approved 4+1 on-road passenger transport compliance',
      'Heavy-gauge tubular steel passenger safety cage and roll-over protection',
      'Comfortable wide bench seats with safety grab handles and non-slip flooring',
      'Weather-shield curtains for complete monsoon and dust protection',
      'Extremely tight turning radius for nimble navigation through congested lanes'
    ],
    applications: [
      'Urban Last-Mile Passenger Transit & Feeder Services',
      'Tourist Destination Sightseeing & Heritage Zones',
      'University, Hospital & Industrial Campus Shuttle Service',
      'Township & Gated Community Internal Transport'
    ],
    customization: [
      'Flexible passenger seating capacity (2+1, 4+1, 6+1, 8+1)',
      'Digital fare meter & smart GPS tracking integration',
      'Luggage overhead carrier rack and under-seat lockable compartments',
      'Fleet telematics and remote battery diagnostic monitoring'
    ]
  },
  {
    slug: 'school-rickshaw',
    name: 'Electric School Rickshaw',
    category: 'school-rickshaws',
    categoryName: 'Electric School Rickshaw',
    tagline: 'Safe, dedicated zero-emission electric school transport for children.',
    image: '/assets/tuk-tuk.jpg',
    gallery: [
      '/assets/tuk-tuk.jpg',
      '/assets/applications/campus.jpg'
    ],
    shortCopy: 'Purpose-built electric school transport designed with child safety cages, emergency exits, and smooth speed governors for student transit.',
    overview: 'Engineered with maximum priority on student safety and clean air, the SAVY Electric School Rickshaw ensures child-friendly boarding, protective safety mesh, speed governors, and zero fumes around school zones.',
    specs: {
      power: '1.5 kW Regulated Motor',
      topSpeed: '20–25 km/h (Speed Governed)',
      range: '75–100 km per charge',
      seatingCapacity: 'Dedicated Student Seating (6–10 Children)',
      loadCapacity: '400–500 kg',
      batteryType: 'Lithium-ion with Thermal Safety BMS',
      chargingTime: '4 Hours',
      dimensions: 'Child-Safe High Visibility Frame',
      warranty: 'SAVY OEM Warranty',
      gradeability: '12 degrees',
      braking: 'Dual Hydraulic Drum with Fail-Safe Locks',
    },
    features: [
      'Protective high-side wire mesh and secure safety door locks',
      'Integrated speed limiter calibrated for student safety in residential zones',
      'Bright safety yellow exterior with high-visibility reflective branding',
      'School bag storage racks positioned below seats to maximize aisle space',
      'First-aid kit mounting and fire extinguisher bracket standard'
    ],
    applications: [
      'Primary & Secondary School Transportation',
      'Daycare & Kindergarten Transit Circuits',
      'Residential Community School Feeder Networks'
    ],
    customization: [
      'GPS live bus/rickshaw tracking app integration for parents',
      'CCTV internal cabin safety camera module',
      'Custom school crest badging and color schemes'
    ]
  },
  {
    slug: 'food-cart-rickshaw',
    name: 'Rickshaw Food Cart',
    category: 'food-carts',
    categoryName: 'Rickshaw Food Carts',
    tagline: 'Mobile electric retail and commercial food dispensing station.',
    image: '/assets/electruck.jpg',
    gallery: [
      '/assets/electruck.jpg',
      '/assets/applications/tourism.jpg'
    ],
    shortCopy: 'Mobile commercial food dispensing and retail vehicle built on a robust electric three-wheeler platform with food-grade stainless steel counters.',
    overview: 'The SAVY Rickshaw Food Cart brings mobile culinary and retail ventures into high-footfall tourist zones, corporate tech parks, and community plazas without generating noisy generator fumes or diesel odors.',
    specs: {
      power: '1.5 kW High-Efficiency Motor',
      topSpeed: '20 km/h',
      range: '70 km per charge',
      seatingCapacity: '1 Operator + Walk-up Serving Bay',
      loadCapacity: 'Up to 600 kg Kitchen Equipment & Stock',
      batteryType: 'Lithium-ion with Auxiliary Inverter Output',
      chargingTime: '4–5 Hours',
      dimensions: 'Food-Grade Mobile Service Kiosk',
      warranty: 'SAVY Commercial Warranty',
      gradeability: '10 degrees',
      braking: 'Mechanical / Hydraulic Assist',
    },
    features: [
      'Food-grade 304 stainless steel prep countertops and sanitary water sinks',
      'Fold-out service awnings and LED counter display lighting',
      'Auxiliary battery inverter powering coffee machines, blenders, or warmers',
      'Lockable dry-storage cabinetry and insulated cold-beverage compartments',
      'Clean, silent operation compliant with eco-sensitive urban pedestrian plazas'
    ],
    applications: [
      'Street Food Vending & Specialty Coffee Stalls',
      'Corporate Campuses & IT Tech Parks',
      'Exhibition Grounds, Event Venues & Tourist Hubs',
      'Hotel Resort Poolside Refreshment Stations'
    ],
    customization: [
      'Custom kitchen equipment layout (Griddles, induction, beverage taps)',
      'Solar roof canopy for continuous auxiliary power generation',
      'Digital POS display mounting and branded vinyl wraps'
    ]
  },
  {
    slug: 'custom-electruck-900kg',
    name: 'Custom 900kg Electruck (Ramdev Foods)',
    category: 'custom-industrial',
    categoryName: 'Custom & Industrial Builds',
    tagline: 'Heavy-duty bespoke industrial cargo platform built for 900kg payloads.',
    image: '/assets/electruck.jpg',
    gallery: [
      '/assets/electruck.jpg',
      '/assets/applications/logistics.jpg'
    ],
    shortCopy: 'Custom heavy-duty build developed specifically for Ramdev Foods, featuring reinforced chassis, heavy-duty suspension, and custom payload capacity.',
    overview: 'A showcase of SAVY’s in-house engineering and custom fabrication capabilities. Tailored for Ramdev Foods’ rigorous multi-shift spice and packaged food distribution needs across extensive manufacturing compounds.',
    specs: {
      power: '2 kW High-Torque Heavy Duty Powertrain',
      topSpeed: '25 km/h',
      range: '75 km per charge',
      seatingCapacity: '1 Driver',
      loadCapacity: '900 kg Certified Industrial Payload',
      batteryType: 'High-Capacity Lithium-ion Pack',
      chargingTime: '4 Hours',
      dimensions: 'Reinforced Extended Cargo Platform',
      warranty: 'Dedicated Industrial SLA Support',
      gradeability: '15 degrees fully loaded',
      braking: 'Hydraulic Disc/Drum Heavy-Duty System',
    },
    features: [
      'Bespoke engineered chassis with double-gusseted stress points',
      'Heavy-duty multi-leaf suspension and reinforced heavy axle hubs',
      'Custom high-side cargo walls engineered for palletized food crates',
      'Continuous-duty thermal management for round-the-clock factory shifts'
    ],
    applications: [
      'Heavy FMCG Manufacturing & Warehousing',
      'Spice, Grain & Food Distribution Logistics',
      'Industrial Spare Parts & Heavy Material Handling'
    ],
    customization: [
      'Custom payload sizing (up to 1,200 kg on request)',
      'Hydraulic lift-gate for effortless ground-to-bed pallet loading'
    ]
  },
  {
    slug: 'atm-vehicle',
    name: 'Mobile ATM & Bank Vehicle',
    category: 'custom-industrial',
    categoryName: 'Custom & Industrial Builds',
    tagline: 'Secure mobile banking and financial service delivery EV.',
    image: '/assets/electruck.jpg',
    gallery: [
      '/assets/electruck.jpg',
      '/assets/applications/government.jpg'
    ],
    shortCopy: 'Special-purpose customized electric vehicle equipped with secure enclosures, auxiliary power, and connectivity for mobile banking services.',
    overview: 'Developed for financial inclusion and rural banking access, the SAVY Mobile ATM Vehicle houses automated teller machines, teller counters, and satellite communication equipment on a clean electric chassis.',
    specs: {
      power: '1.5 kW Electric Motor',
      topSpeed: '25 km/h',
      range: '75 km',
      seatingCapacity: '1 Driver + 1 Bank Officer',
      loadCapacity: 'Heavy Enclosure Rated',
      batteryType: 'Lithium-ion + UPS Auxiliary Battery System',
      chargingTime: '4–5 Hours',
      dimensions: 'Security Reinforced Cabin',
      warranty: 'SAVY Special Purpose Warranty',
      gradeability: '12 degrees',
      braking: 'Hydraulic Multi-Circuit Braking',
    },
    features: [
      'Reinforced steel ATM security booth with safe anchoring points',
      'Dedicated pure sine wave inverter backup for 8+ hours of continuous ATM uptime',
      'Surveillance camera integration and panic alarm system',
      'Climate-controlled teller and passenger compartment'
    ],
    applications: [
      'Rural & Remote Financial Inclusion Programs',
      'Festivals, Fairs & Disaster Relief Cash Distribution',
      'Corporate Campuses & Special Economic Zones (SEZs)'
    ],
    customization: [
      'Custom bank branding and ATM machine integration specifications',
      'Biometric authentication console and VSAT antenna mount'
    ]
  },
  {
    slug: 'milk-cart',
    name: 'Electric Milk Distribution Cart',
    category: 'custom-industrial',
    categoryName: 'Custom & Industrial Builds',
    tagline: 'Insulated daily dairy and milk crate delivery vehicle.',
    image: '/assets/electruck.jpg',
    gallery: [
      '/assets/electruck.jpg',
      '/assets/applications/agriculture.jpg'
    ],
    shortCopy: 'Purpose-built electric vehicle tailored for dairy cooperatives and milk distribution networks with organized can racks and insulated bays.',
    overview: 'Optimized for early morning, silent, emission-free delivery across residential neighbourhoods and dairy collection centres without disturbing communities.',
    specs: {
      power: '1.5 kW High-Torque Motor',
      topSpeed: '25 km/h',
      range: '75 km per charge',
      seatingCapacity: '1 Driver',
      loadCapacity: 'Up to 600 kg Dairy Cans & Crates',
      batteryType: 'Lithium-ion / Deep Cycle Lead-Acid',
      chargingTime: '4 Hours',
      dimensions: 'Crate-Optimized Bed Dimensions',
      warranty: 'SAVY Commercial Warranty',
      gradeability: '12 degrees',
      braking: 'Heavy-Duty Drum',
    },
    features: [
      'Custom rack shelving designed for standard dairy crates and 40L milk cans',
      'Corrosion-proof wash-down floor with non-slip texture',
      'Whisper-quiet electric drive perfect for 4:00 AM distribution rounds'
    ],
    applications: [
      'Dairy Cooperatives & Milk Supply Routes',
      'Agro-Farm Produce Collection',
      'Community Daily Essentials Delivery'
    ],
    customization: [
      'Insulated PUF container box for maintaining chilled milk temperatures'
    ]
  },
  {
    slug: 'city-pod',
    name: 'SAVY City Pod (Upcoming)',
    category: 'upcoming',
    categoryName: 'Upcoming Products',
    tagline: 'Next-generation luxury urban e-auto debuted internationally in Amsterdam.',
    image: '/assets/coming-soon-vehicle.png',
    gallery: [
      '/assets/coming-soon-vehicle.png',
      '/assets/news/city-pod-netherlands.jpg'
    ],
    shortCopy: 'Savy Electric’s City Pod emerged as a standout at the Netherlands E-Mobility Expo, demonstrating the future of Indian electric autos in sustainable urban and tourist transit.',
    overview: 'The SAVY City Pod represents the pinnacle of urban micro-mobility design. Unveiled to international acclaim in Amsterdam, Netherlands, it combines aerodynamic styling, futuristic glasshouse visibility, premium passenger appointments, and intelligent connected tech.',
    specs: {
      power: 'Advanced High-Efficiency Next-Gen Powertrain',
      topSpeed: 'Upcoming Specification',
      range: 'Targeted High-Range Urban Battery Pack',
      seatingCapacity: 'Driver + Ergonomic Passenger Lounge',
      loadCapacity: 'Executive Passenger Capacity',
      batteryType: 'Smart Lithium-ion with Fast-Charge Architecture',
      chargingTime: 'Rapid-Charge Compatible',
      dimensions: 'Aerodynamic Urban Pod Footprint',
      warranty: 'Comprehensive International / Domestic Warranty',
      gradeability: 'Engineered for Global City Terrains',
      braking: 'Advanced Electronic ABS + Regenerative Assist',
    },
    features: [
      'Futuristic aerodynamic monocoque silhouette with panoramic visibility',
      'International design language showcased at the Netherlands E-Mobility Expo',
      'Connected digital cockpit with IoT vehicle telemetry and smart infotainment',
      'Ultra-comfortable luxury passenger lounge seating'
    ],
    applications: [
      'Eco-Tourism & European / Global Urban Transit',
      'Smart City VIP Feeder Mobility',
      'Premium Shared Ride Services'
    ],
    customization: [
      'Bespoke international livery, interior trims, and telematics configurations'
    ],
    comingSoon: true
  },
  {
    slug: 'mini-bus',
    name: 'SAVY Electric Mini Bus (Upcoming)',
    category: 'upcoming',
    categoryName: 'Upcoming Products',
    tagline: 'High-capacity electric passenger shuttle for campuses and institutions.',
    image: '/assets/coming-soon-vehicle.png',
    gallery: [
      '/assets/coming-soon-vehicle.png',
      '/assets/applications/campus.jpg'
    ],
    shortCopy: 'Purpose-built high-capacity multi-passenger electric mini bus in active engineering development for institutional shuttles and large campus mobility.',
    overview: 'Designed to bridge the gap between campus carts and full-sized buses, the upcoming SAVY Electric Mini Bus delivers group passenger capacity with zero emissions, low operating overheads, and wheelchair-accessible options.',
    specs: {
      power: 'High-Torque Commercial Electric Drivetrain',
      topSpeed: '25–35 km/h (Campus Regulated)',
      range: '100+ km per charge target',
      seatingCapacity: '12 to 20 Passenger Seating Options',
      loadCapacity: 'High-Volume Group Transport',
      batteryType: 'High-Capacity Lithium Iron Phosphate (LFP)',
      chargingTime: 'Fast-Charging Capable',
      dimensions: 'Spacious High-Roof Low-Floor Layout',
      warranty: 'Commercial Fleet Warranty',
      gradeability: '15 degrees',
      braking: 'Full Pneumatic / Hydraulic Dual Circuit Braking',
    },
    features: [
      'Low-floor design for quick passenger ingress and egress',
      'Air-conditioned / all-weather ventilation cabin options',
      'Sturdy roll-cage chassis structure meeting institutional safety norms',
      'Integrated public address and route display system'
    ],
    applications: [
      'University Shuttles & Corporate Tech Parks',
      'Airport Tarmac & Terminal Passenger Transfers',
      'Large Gated Townships & Tourist Wildlife Sanctuaries'
    ],
    customization: [
      'Custom seating arrangements, wheelchair ramps, and livery branding'
    ],
    comingSoon: true
  }
];

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug);
