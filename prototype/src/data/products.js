export const productCategories = [
  {
    id: 'electric-campus-cart',
    slug: 'electric-campus-cart',
    aliasSlugs: ['e-campus-cart'],
    name: 'Electric Campus Cart',
    shortName: 'Campus Carts',
    tagline: 'Eco-friendly, whisper-quiet electric mobility for universities, resorts, hospitals, and corporate campuses.',
    heroImage: '/assets/products/classic-golf/Classic Golf5.webp',
    icon: 'car',
    description: 'Purpose-built electric campus carts engineered for passenger comfort, VIP hospitality, and whisper-quiet institutional transit. Available in multiple seating configurations from 2 to 8 seats.'
  },
  {
    id: 'electric-loading-rickshaw',
    slug: 'electric-loading-rickshaw',
    aliasSlugs: [],
    name: 'Electric Loading Rickshaw',
    shortName: 'Loading Rickshaws',
    tagline: 'Heavy-duty electric cargo, freight, water tankers, and commercial logistics solutions.',
    heroImage: '/assets/products/electruck/Electruck1.webp',
    icon: 'truck',
    description: 'Heavy-payload 3-wheel electric carriers engineered for industrial material handling, urban freight, liquid transport, and commercial deliveries.'
  },
  {
    id: 'electric-passenger-rickshaw',
    slug: 'electric-passenger-rickshaw',
    aliasSlugs: [],
    name: 'Electric Passenger Rickshaw',
    shortName: 'Passenger Rickshaws',
    tagline: 'Certified on-road & institutional 3-wheel passenger electric rickshaws engineered for reliable, economical micro-mobility.',
    heroImage: '/assets/products/electric-passenger/Electric Passenger1.webp',
    icon: 'users',
    description: 'Safe, economical, and approved electric passenger rickshaws for urban micro-mobility, tourist circuits, and group transit.'
  },
  {
    id: 'waste-collection-rickshaw',
    slug: 'waste-collection-rickshaw',
    aliasSlugs: [],
    name: 'Waste Collection Rickshaw',
    shortName: 'Waste Collection',
    tagline: 'Swachh Bharat & municipal sanitation electric vehicles engineered for clean, efficient waste collection.',
    heroImage: '/assets/products/dumptruck/Dumptruck1.webp',
    icon: 'trash',
    description: 'Purpose-built electric waste collection and tipping rickshaws for municipal corporations, smart cities, and gram panchayats.'
  },
  {
    id: 'food-cart',
    slug: 'food-cart',
    aliasSlugs: ['food-cart-rickshaw'],
    name: 'Food Cart',
    shortName: 'Food Carts',
    tagline: 'Mobile electric culinary and retail dispensing stations for street food, beverages, and event vending.',
    heroImage: '/assets/products/food-cart/Food cart1.webp',
    icon: 'store',
    description: 'Food-grade stainless steel electric mobile retail units designed for pollution-free street vending, fast food, beverages, catering, and event refreshments.'
  },
  {
    id: 'special-purpose-vehicle',
    slug: 'special-purpose-vehicle',
    aliasSlugs: [],
    name: 'Special Purpose Vehicle',
    shortName: 'Special Purpose',
    tagline: 'Bespoke engineered electric vehicles customized for specialized industrial, institutional, and government operations.',
    heroImage: '/assets/products/special-purpose/Special Purpose Vehical1.webp',
    icon: 'gear',
    description: 'Tailored electric mobility engineering built from the ground up to match unique operational workflows, specialized equipment, and heavy payload specifications.'
  }
];

export const products = [
  // ==========================================
  // 1. ELECTRIC CAMPUS CART
  // ==========================================
  {
    slug: 'classic-golf-cart',
    aliasSlugs: ['classic-golf'],
    name: 'Classic Golf Cart',
    category: 'electric-campus-cart',
    categoryName: 'Electric Campus Cart',
    tagline: 'High-efficiency four-wheel electric campus cart for institutional transit.',
    image: '/assets/products/classic-golf/Classic Golf5.webp',
    pdf: '/assets/Downloadable PDF/Savy Electric Classic Golf.pdf',
    gallery: [
      '/assets/products/classic-golf/Classic Golf5.webp',
      '/assets/products/classic-golf/Classic Golf2.webp',
      '/assets/products/classic-golf/Classic Golf4.webp',
      '/assets/products/classic-golf/Classic Golf7.webp',
      '/assets/products/classic-golf/Classic Golf6.webp',
      '/assets/products/classic-golf/Classic Golf1.webp',
      '/assets/products/classic-golf/Classic Golf3.webp',
      '/assets/products/classic-golf/Classic Golf8.webp',
      '/assets/products/classic-golf/Classic Golf9.webp'
    ],
    shortCopy: 'Classic Golf Cart is a four-wheel campus cart designed for internal passenger transport, campuses, resorts, factories & gated communities.',
    overview: 'The SAVY Classic Golf Cart provides a silent, zero-emission transportation solution engineered specifically for internal passenger transit across universities, resorts, corporate campuses, factories, and gated communities. Built with robust tubular steel chassis, smart motor control, and ergonomic passenger seating, it delivers superior comfort and dependable daily campus mobility.',
    specs: {
      power: '2000W* BLDC',
      topSpeed: '25 km/h',
      range: '75 km per charge',
      seatingCapacity: '2 - 8 Seater',
      loadCapacity: 'Up to 600 kg Payload',
      batteryType: 'Lithium-ion / Advanced Lead-Acid Options',
      chargingTime: '4–6 Hours (Standard) / 2.5 Hours (Fast)',
      dimensions: 'Standard Institutional Dimensions',
      warranty: 'Standard OEM Warranty',
      gradeability: 'Up to 15 degrees',
      braking: 'Regenerative Braking + Mechanical Hydraulic Drum',
    },
    features: [
      'Ergonomic all-weather contoured seating with premium upholstery (2 to 8 seats)',
      '2000W* BLDC motor with advanced smart motor controller and regenerative braking',
      'Heavy-duty rust-resistant tubular chassis built for continuous campus operation',
      'Digital LED instrument dashboard displaying speed, battery SOC, and diagnostics',
      'Modular canopy roof with integrated rain drainage channels',
      'Whisper-quiet zero-emission operation with low total cost of ownership'
    ],
    applications: [
      'Campuses, Universities & Schools',
      'Luxury Resorts & Hotels',
      'Factories & Industrial Campuses',
      'Gated Communities & Townships',
      'Hospitals & Healthcare Facilities'
    ],
    customization: [
      'Custom seating layouts (2, 4, 6, 8 seater configurations)',
      'Solar-roof panel integration for extended daytime range',
      'Enclosed all-weather rain curtains and weather protection',
      'Institutional branding and custom exterior color schemes',
      'Rear utility cargo box conversion for luggage or maintenance tools'
    ]
  },
  {
    slug: 'club-cart',
    aliasSlugs: [],
    name: 'Club Cart',
    category: 'electric-campus-cart',
    categoryName: 'Electric Campus Cart',
    tagline: 'Heavy-duty luxury campus and resort electric mobility.',
    image: '/assets/products/club-cart/Club Cart3.webp',
    pdf: '/assets/Downloadable PDF/Savy Electric Club Cart.pdf',
    gallery: [
      '/assets/products/club-cart/Club Cart3.webp',
      '/assets/products/club-cart/Club Cart4.webp',
      '/assets/products/club-cart/Club Cart2.webp',
      '/assets/products/club-cart/Club Cart10.webp',
      '/assets/products/club-cart/Club Cart11.webp',
      '/assets/products/club-cart/Club Cart12.webp',
      '/assets/products/club-cart/Club Cart1.webp',
      '/assets/products/club-cart/Club Cart5.webp',
      '/assets/products/club-cart/Club Cart6.webp',
      '/assets/products/club-cart/Club Cart7.webp',
      '/assets/products/club-cart/Club Cart8.webp',
      '/assets/products/club-cart/Club Cart9.webp'
    ],
    shortCopy: 'Club Cart features a heavy-duty chassis design engineered for golf courses, large corporate parks & resorts with executive styling.',
    overview: 'Engineered for luxury hospitality, VIP guest transit, golf courses, and premier resort environments, the SAVY Club Cart elevates passenger comfort with heavy-duty chassis design, automotive-grade exterior body panels, enhanced suspension tuning, and sophisticated aesthetics.',
    specs: {
      power: '2000W Heavy Duty BLDC',
      topSpeed: '25 km/h',
      range: '75 km per charge',
      seatingCapacity: '2 - 8 Seater',
      loadCapacity: 'Up to 650 kg',
      batteryType: 'Lithium-ion (LiFePO4) / Deep Cycle Lead-Acid',
      chargingTime: '4–5 Hours',
      dimensions: 'Premium Heavy-Duty Footprint',
      warranty: 'Standard OEM Warranty',
      gradeability: '15 degrees',
      braking: 'Hydraulic disc/drum with regenerative assist',
    },
    features: [
      'Heavy-duty chassis design engineered for golf courses, corporate parks & resorts',
      '2000W Heavy Duty BLDC motor delivering smooth acceleration and high efficiency',
      'Executive styled front fascia with high-intensity LED projector headlamps',
      'Plush dual-tone marine-grade vinyl seating with enhanced cushioning (2 - 8 seater)',
      'Smooth independent front suspension for superior ride comfort',
      'Integrated beverage holders, glove box storage, and USB charging points'
    ],
    applications: [
      'Golf Courses & Country Clubs',
      'Large Corporate Parks & Tech Campuses',
      'Luxury Hotels, Spas & Beach Resorts',
      'VIP Airport Lounges & Terminals'
    ],
    customization: [
      'Bespoke upholstery and custom embroidery',
      'Rear-facing flip seat converting into a flat utility deck',
      'Custom alloy wheels and turf-friendly pneumatic tires',
      'PA system and onboard audio integration for guided property tours'
    ]
  },
  {
    slug: 'elite-vintage-cart',
    aliasSlugs: ['vintage-elite'],
    name: 'Elite Vintage Cart',
    category: 'electric-campus-cart',
    categoryName: 'Electric Campus Cart',
    tagline: 'Classic retro luxury design paired with clean electric powertrain.',
    image: '/assets/products/elite-vintage/Elite Vintage Cart9.webp',
    pdf: '/assets/Downloadable PDF/Elite Vintage Cart.pdf',
    gallery: [
      '/assets/products/elite-vintage/Elite Vintage Cart9.webp',
      '/assets/products/elite-vintage/Elite Vintage Cart1.webp',
      '/assets/products/elite-vintage/Elite Vintage Cart11.webp',
      '/assets/products/elite-vintage/Elite Vintage Cart2.webp',
      '/assets/products/elite-vintage/Elite Vintage Cart3.webp',
      '/assets/products/elite-vintage/Elite Vintage Cart6.webp',
      '/assets/products/elite-vintage/Elite Vintage Cart7.webp',
      '/assets/products/elite-vintage/Elite Vintage Cart8.webp',
      '/assets/products/elite-vintage/Elite Vintage Cart10.webp',
      '/assets/products/elite-vintage/Elite Vintage Cart4.webp',
      '/assets/products/elite-vintage/Elite Vintage Cart5.webp'
    ],
    shortCopy: 'Elite Vintage Cart features a classic retro luxury design, suitable for heritage sites, weddings & VIP transport.',
    overview: 'The SAVY Elite Vintage Cart combines nostalgic classic retro luxury design with clean zero-emission electric engineering. A statement vehicle ideal for heritage sites, destination weddings, royal heritage hotels, and high-profile VIP transport.',
    specs: {
      power: '2000W BLDC',
      topSpeed: '25 km/h',
      range: '75 km per charge',
      seatingCapacity: '2 - 8 Seater',
      loadCapacity: 'Up to 600 kg',
      batteryType: 'Lithium-ion / Advanced Deep Cycle',
      chargingTime: '4–6 Hours',
      dimensions: 'Grand Classic Wheelbase',
      warranty: 'Comprehensive SAVY OEM Warranty',
      gradeability: '15 degrees',
      braking: 'Regenerative + Hydraulic Braking System',
    },
    features: [
      'Classic retro luxury exterior with handcrafted chrome accents and ornate vintage styling',
      '2000W BLDC electric motor providing silent, vibration-free VIP transit',
      'Deep cushioned luxury button-tufted upholstery with weather-resistant finish (2 - 8 seater)',
      'Wide stepped running boards and spacious legroom for effortless passenger entry',
      'Handcrafted wood-finish dashboard with analog-styled digital indicators',
      'All-weather canopy protection with vintage aesthetic detailing'
    ],
    applications: [
      'Heritage Sites, Palaces & Historic Monuments',
      'Destination Weddings & Luxury Event Venues',
      'VIP Transport in Government & Institutional Campuses',
      'Eco-Tourism Circuits & Botanical Gardens'
    ],
    customization: [
      'Custom royal color palettes (British Racing Green, Royal Maroon, Ivory White)',
      'Canopy fringe trim, brass coach lamps, and personalized crest badging',
      'Luxury bar console and auxiliary cool-box fitment'
    ]
  },
  {
    slug: 'utility-cart',
    aliasSlugs: [],
    name: 'Utility Cart',
    category: 'electric-campus-cart',
    categoryName: 'Electric Campus Cart',
    tagline: 'High-power electric utility vehicle for heavy campus logistics and facility maintenance.',
    image: '/assets/products/utility-cart/utility Cart1.webp',
    pdf: '/assets/Downloadable PDF/Utility Cart .pdf',
    gallery: [
      '/assets/products/utility-cart/utility Cart1.webp',
      '/assets/products/utility-cart/utility Cart2.webp',
      '/assets/products/utility-cart/utility Cart3.webp',
      '/assets/products/utility-cart/utility Cart4.webp',
      '/assets/products/utility-cart/utility Cart5.webp',
      '/assets/products/utility-cart/utility Cart6.webp',
      '/assets/products/utility-cart/utility Cart7.webp',
      '/assets/products/utility-cart/utility Cart8.webp'
    ],
    shortCopy: 'Utility Cart combines a 2-seater passenger cabin with a 500 kg cargo platform and 3000W BLDC motor for heavy campus logistics, maintenance operations, and internal material transfer.',
    overview: 'The SAVY Utility Cart is purpose-built for facility maintenance teams, groundskeepers, and campus logistics crews. Equipped with a high-torque 3000W BLDC motor, 2 ergonomic seats, and a rugged 500 kg rear cargo platform, it effortlessly manages equipment transfer, tools, and material movement across large institutions.',
    specs: {
      power: '3000W BLDC Motor',
      topSpeed: '25 km/h',
      range: '75 km per charge',
      seatingCapacity: '2 Seater + 500 kg Cargo Platform',
      loadCapacity: '500 kg Cargo Platform Payload',
      batteryType: 'Lithium-ion / Heavy-Duty Deep Cycle',
      chargingTime: '4–5 Hours',
      dimensions: 'Utility Flatbed Campus Footprint',
      warranty: 'Standard OEM Warranty',
      gradeability: '15 degrees laden',
      braking: 'Dual Hydraulic Braking with Regenerative Assist',
    },
    features: [
      'Powerful 3000W BLDC motor built for heavy cargo hauling across campus gradients',
      'Ergonomic 2-seater cabin paired with heavy-gauge 500 kg rear utility cargo bed',
      'Reinforced tubular chassis with heavy-duty rear suspension for material handling',
      'Integrated tool tie-down rails and drop-down tailgate for easy loading',
      'Zero-emission, low-noise operation ideal for quiet institutional grounds'
    ],
    applications: [
      'Heavy Campus Logistics & Facility Maintenance',
      'University, Hospital & Corporate Groundskeeper Operations',
      'Resort & Hotel Material Transfer',
      'Industrial Plant Internal Parts & Maintenance Logistics'
    ],
    customization: [
      'Lockable enclosed toolboxes and maintenance rack mounts',
      'Drop-side removable rails and cargo tie-down anchors',
      'Solar auxiliary charging roof for all-day field operation'
    ]
  },

  // ==========================================
  // 2. ELECTRIC LOADING RICKSHAW
  // ==========================================
  {
    slug: 'electruck',
    aliasSlugs: ['electruck-500kg'],
    name: 'Electruck',
    category: 'electric-loading-rickshaw',
    categoryName: 'Electric Loading Rickshaw',
    tagline: 'Heavy-duty open-body cargo platform for industrial logistics & commercial deliveries.',
    image: '/assets/products/electruck/Electruck1.webp',
    pdf: '/assets/Downloadable PDF/Savy Electruck.pdf',
    gallery: [
      '/assets/products/electruck/Electruck1.webp',
      '/assets/products/electruck/Electruck2.webp',
      '/assets/products/electruck/Electruck3.webp',
      '/assets/products/electruck/Electruck4.webp',
      '/assets/products/electruck/Electruck5.webp',
      '/assets/products/electruck/Electruck6.webp',
      '/assets/products/electruck/Electruck7.webp',
      '/assets/products/electruck/Electruck8.webp',
      '/assets/products/electruck/Electruck9.webp',
      '/assets/products/electruck/Electruck10.webp',
      '/assets/products/electruck/Electruck11.webp'
    ],
    shortCopy: 'Electruck is a heavy-duty open-body cargo platform with 1000W BLDC motor and 500 kg payload capacity for industrial logistics & commercial deliveries.',
    overview: 'The SAVY Electruck delivers dependable commercial freight capability with its heavy-duty open-body cargo platform, reinforced chassis, and 1000W BLDC electric powertrain. Ideal for industrial logistics, warehouse operations, and urban commercial deliveries.',
    specs: {
      power: '1000W BLDC',
      topSpeed: '25 km/h',
      range: '75–100 km per charge',
      seatingCapacity: '1 Driver',
      loadCapacity: '500 kg Payload',
      batteryType: 'Lithium-ion / Deep Cycle Lead-Acid',
      chargingTime: '4–6 Hours',
      dimensions: 'Open-Body Cargo Platform',
      warranty: 'Verified OEM Industrial Warranty',
      gradeability: '12 degrees',
      braking: 'Heavy-Duty Mechanical / Hydraulic Assist',
    },
    features: [
      'Heavy-duty open-body steel cargo deck with drop-down sides and tie-down hooks',
      'Reliable 1000W BLDC motor with high-efficiency controller',
      'Reinforced ladder-frame chassis with heavy-duty leaf spring rear suspension',
      'Weatherproof IP65/IP67 electronics enclosure for all-season dependability',
      'Over 75% operational cost reduction compared to conventional fossil-fuel loaders'
    ],
    applications: [
      'Industrial Logistics & Manufacturing Plants',
      'Commercial Goods & Express Deliveries',
      'FMCG, Hardware & Warehouse Material Movement',
      'Wholesale Market & Intra-facility Freight'
    ],
    customization: [
      'High-side steel mesh walls or open flatbed configuration',
      'Canvas weather-protective tie-down canopy',
      'Custom fleet branding and color finishes'
    ]
  },
  {
    slug: 'electruck-dlx',
    aliasSlugs: [],
    name: 'Electruck DLX',
    category: 'electric-loading-rickshaw',
    categoryName: 'Electric Loading Rickshaw',
    tagline: 'Enclosed weatherproof container cargo body for secure urban & express logistics.',
    image: '/assets/products/electruck-dlx/Electruck DLX1.webp',
    pdf: '/assets/Downloadable PDF/Savy Electruck-DLX.pdf',
    gallery: [
      '/assets/products/electruck-dlx/Electruck DLX1.webp',
      '/assets/products/electruck-dlx/Electruck DLX2.webp',
      '/assets/products/electruck-dlx/Electruck DLX3.webp',
      '/assets/products/electruck-dlx/Electruck DLX4.webp',
      '/assets/products/electruck-dlx/Electruck DLX5.webp',
      '/assets/products/electruck-dlx/Electruck DLX6.webp',
      '/assets/products/electruck-dlx/Electruck DLX7.webp',
      '/assets/products/electruck-dlx/Electruck DLX8.webp'
    ],
    shortCopy: 'Electruck DLX features an enclosed weatherproof container cargo body with 2000W High Torque BLDC motor for 1 - 3 ton secure urban & express logistics.',
    overview: 'Built for demanding freight environments, the SAVY Electruck DLX features a fully enclosed weatherproof container body, high-tonnage structural steel chassis, and a 2000W High Torque BLDC powertrain rated for 1 to 3 ton payloads.',
    specs: {
      power: '2000W High Torque BLDC',
      topSpeed: '25 km/h',
      range: '70–90 km per charge',
      seatingCapacity: '1 Driver',
      loadCapacity: '1 - 3 ton Payload',
      batteryType: 'High-Capacity Lithium-ion (LFP) with Smart BMS',
      chargingTime: '4–6 Hours / Fast Charge Ready',
      dimensions: 'Reinclosed Container Cargo Body',
      warranty: 'Industrial SLA Warranty Support',
      gradeability: '15 degrees fully loaded',
      braking: 'Dual-Circuit Hydraulic Disc/Drum Heavy-Duty System',
    },
    features: [
      'Enclosed weatherproof container cargo body with lockable rear doors for secure transit',
      '2000W High Torque BLDC powertrain with heavy differential gear reduction',
      'Massive 1 to 3 ton payload capacity with multi-leaf heavy-duty suspension',
      'Double-gusseted reinforced structural steel chassis built for continuous freight cycles',
      'Weather-sealed cargo bay protecting high-value goods, electronics, and parcels'
    ],
    applications: [
      'Secure Urban & Express Logistics',
      'E-Commerce Fulfillment & Parcel Distribution',
      'FMCG, Pharmaceuticals & Protected Freight',
      'Heavy Industrial Warehousing Logistics'
    ],
    customization: [
      'Internal partition shelving and organizer dividers',
      'Rear roller shutter door or double-swing container doors',
      'Fleet telemetry and heavy-duty fast-charging packages'
    ]
  },
  {
    slug: 'tobu-truck',
    aliasSlugs: ['nano-truck'],
    name: 'Tobu Truck',
    category: 'electric-loading-rickshaw',
    categoryName: 'Electric Loading Rickshaw',
    tagline: 'High maneuverability design for tight spaces, markets & narrow city streets.',
    image: '/assets/products/tobu-truck/Tobu truck1.webp',
    pdf: '/assets/Downloadable PDF/Nano truck.pdf',
    gallery: [
      '/assets/products/tobu-truck/Tobu truck1.webp',
      '/assets/products/tobu-truck/Tobu truck2.webp',
      '/assets/products/tobu-truck/Tobu truck3.webp'
    ],
    shortCopy: 'Tobu Truck features a high maneuverability design with 1000W BLDC motor and 500 kg payload capacity tailored for tight spaces, markets & narrow city streets.',
    overview: 'Designed for quick trips, narrow market lanes, and crowded urban hubs, the SAVY Tobu Truck offers unmatched maneuverability, a 500 kg payload rating, and a 1000W BLDC electric drive that navigates congested alleys effortlessly.',
    specs: {
      power: '1000W BLDC',
      topSpeed: '25 km/h',
      range: '80 km per charge',
      seatingCapacity: '1 Driver',
      loadCapacity: '500 kg Payload',
      batteryType: 'Lithium-ion / Deep Cycle',
      chargingTime: '3.5–4.5 Hours',
      dimensions: 'Ultra-Compact Maneuverable Footprint',
      warranty: 'Standard SAVY Warranty',
      gradeability: '10 degrees',
      braking: 'Mechanical & Regenerative Braking',
    },
    features: [
      'High maneuverability design with ultra-tight turning radius for narrow streets',
      '1000W BLDC energy-efficient motor delivering dependable daily cargo hauling',
      '500 kg payload capacity with rigid lightweight chassis structure',
      'Low load-bed height for rapid manual loading and unloading',
      'Minimal maintenance overheads and ultra-low operating cost per kilometer'
    ],
    applications: [
      'Dense City Markets & Narrow Wholesale Alleys',
      'Courier & Last-Mile Urban Logistics',
      'Intra-Facility Supply Runs & Campus Logistics',
      'Local Retail & Grocery Goods Distribution'
    ],
    customization: [
      'Weather-sealed canvas canopy cover or lockable mesh cage',
      'Rear parcel organizer dividers and delivery basket fitments'
    ]
  },
  {
    slug: 'ecotanker',
    aliasSlugs: ['electric-water-tanker', 'milk-cart'],
    name: 'EcoTanker',
    category: 'electric-loading-rickshaw',
    categoryName: 'Electric Loading Rickshaw',
    tagline: '500-liter electric liquid transport and pressure spraying tanker.',
    image: '/assets/products/ecotanker/EcoTanker1.webp',
    pdf: '/assets/Downloadable PDF/Savy Eco tanker .pdf',
    gallery: [
      '/assets/products/ecotanker/EcoTanker1.webp',
      '/assets/products/ecotanker/EcoTanker2.webp',
      '/assets/products/ecotanker/EcoTanker3.webp',
      '/assets/products/ecotanker/EcoTanker4.webp',
      '/assets/products/ecotanker/EcoTanker5.webp',
      '/assets/products/ecotanker/EcoTanker6.webp'
    ],
    shortCopy: 'EcoTanker is an electric vehicle mounted with a 500 Ltr tank and 2000W BLDC motor for water spraying, liquid transport, and mobile utility sanitation tanks.',
    overview: 'The SAVY EcoTanker provides a silent, zero-emission liquid transport and spraying solution. Equipped with a 500-liter baffled anti-slosh tank, high-pressure dispensing pump, and 2000W BLDC motor, it handles municipal horticulture, road dust suppression, and mobile utility sanitation.',
    specs: {
      power: '2000W BLDC',
      topSpeed: '25 km/h',
      range: '70 km per charge',
      seatingCapacity: '1 Driver',
      loadCapacity: '500 Ltr Capacity Tank',
      batteryType: 'Lithium-ion with Auxiliary 12V Pump Circuit',
      chargingTime: '4–5 Hours',
      dimensions: 'Integrated Tanker Chassis Platform',
      warranty: 'SAVY Municipal & Commercial Warranty',
      gradeability: '12 degrees',
      braking: 'Heavy-Duty Hydraulic / Mechanical Drum',
    },
    features: [
      '500-liter corrosion-resistant liquid storage tank with anti-slosh baffles',
      '2000W BLDC high-torque electric powertrain built for continuous laden operation',
      'High-pressure electric water pump with adjustable spray gun and hose reel',
      'Wide rear spray bar configuration for road washing and dust suppression',
      'Top inspection hatch with rapid filling port and quick-drain bottom valve'
    ],
    applications: [
      'Water Spraying & Dust Suppression on Roads',
      'Horticulture, Municipal Parks & Green Belt Irrigation',
      'Mobile Utility Sanitation & Liquid Transport',
      'Industrial Campus Washing & Utility Water Supply'
    ],
    customization: [
      'High-pressure spray nozzle wand for tree washing and pesticide spraying',
      'Stainless steel SS304 tank option for potable drinking water or dairy liquid transfer',
      'Retractable 30-meter spring-loaded hose reel'
    ]
  },

  // ==========================================
  // 3. ELECTRIC PASSENGER RICKSHAW
  // ==========================================
  {
    slug: 'tuk-tuk-e',
    aliasSlugs: ['tuk-tuk', 'three-wheel-passenger-rickshaw', 'school-rickshaw'],
    name: 'Tuk Tuk e',
    category: 'electric-passenger-rickshaw',
    categoryName: 'Electric Passenger Rickshaw',
    tagline: 'Standard eco-friendly last-mile urban passenger connectivity.',
    image: '/assets/products/electric-passenger/Electric Passenger1.webp',
    pdf: '/assets/Downloadable PDF/Savy Tuk Tuk E.pdf',
    gallery: [
      '/assets/products/electric-passenger/Electric Passenger1.webp',
      '/assets/products/electric-passenger/Electric Passenger2.webp',
      '/assets/products/electric-passenger/Electric Passenger3.webp',
      '/assets/products/electric-passenger/Electric Passenger4.webp',
      '/assets/products/electric-passenger/Electric Passenger5.webp'
    ],
    shortCopy: 'Tuk Tuk e is a standard eco-friendly electric passenger 3-wheeler with 1000W BLDC motor for Driver + 2 - 4 Passengers last-mile connectivity.',
    overview: 'The SAVY Tuk Tuk e is a certified, standard eco-friendly passenger electric rickshaw engineered for dependable last-mile urban connectivity, tourist transport, and institutional campus shuttles. Delivers whisper-quiet rides, excellent battery economy, and robust passenger safety.',
    specs: {
      power: '1000W BLDC',
      topSpeed: '25 km/h',
      range: '70–120 km per charge',
      seatingCapacity: 'Driver + 2 - 4 Passengers',
      loadCapacity: 'Up to 500 kg Passenger Load',
      batteryType: 'Lithium-ion (Fast Charge) / Advanced Deep Cycle',
      chargingTime: '3.5–5 Hours',
      dimensions: 'Standard Urban Passenger 3-Wheeler',
      warranty: 'SAVY Verified Warranty',
      gradeability: '12 degrees',
      braking: 'Mechanical / Hydraulic Drum with Parking Lock',
    },
    features: [
      'Driver + 2 to 4 Passenger seating capacity with wide comfortable bench seating',
      '1000W BLDC motor with smart controller and smooth regenerative braking',
      'Tubular steel safety roll cage and reinforced side impact bars',
      'All-weather monsoon and dust protection curtains',
      'Tight turning radius for effortless navigation through crowded city streets'
    ],
    applications: [
      'Urban Last-Mile Passenger Connectivity',
      'Tourist Destination & Heritage Circuit Shuttles',
      'University, Hospital & Institutional Passenger Movement',
      'Gated Community & Township Feeder Mobility'
    ],
    customization: [
      'Digital fare meter & smart GPS tracking integration',
      'Luggage overhead carrier rack and under-seat lockable compartments',
      'Fleet telematics and remote battery diagnostic monitoring'
    ]
  },
  {
    slug: 'tuk-tuk-dlx',
    aliasSlugs: [],
    name: 'Tuk Tuk DLX',
    category: 'electric-passenger-rickshaw',
    categoryName: 'Electric Passenger Rickshaw',
    tagline: 'Premium extended passenger capacity with reinforced body structure.',
    image: '/assets/products/passenger-dlx/Passenger DLX1.webp',
    pdf: '/assets/Downloadable PDF/Savy_Tuk_Tuk_e_DLX_Spec_Sheet.pdf',
    gallery: [
      '/assets/products/passenger-dlx/Passenger DLX1.webp',
      '/assets/products/passenger-dlx/Passenger DLX2.webp',
      '/assets/products/passenger-dlx/Passenger DLX3.webp',
      '/assets/products/passenger-dlx/Passenger DLX4.webp',
      '/assets/products/passenger-dlx/Passenger DLX5.webp'
    ],
    shortCopy: 'Tuk Tuk DLX features premium extended passenger capacity for Driver + 6 - 9 Passengers, reinforced body structure, and heavy-duty suspension.',
    overview: 'The SAVY Tuk Tuk DLX is engineered for high-capacity passenger transport, accommodating Driver + 6 to 9 passengers. Built with reinforced structural steel bodywork, upgraded heavy-duty multi-leaf suspension, and a 1000W high-capacity powertrain for dependable group shuttle operations.',
    specs: {
      power: '1000W High Capacity',
      topSpeed: '25 km/h',
      range: '70–100 km per charge',
      seatingCapacity: 'Driver + 6 - 9 Passengers',
      loadCapacity: 'Up to 750 kg Group Load',
      batteryType: 'High-Density Lithium-ion / Deep Cycle',
      chargingTime: '4–5 Hours',
      dimensions: 'Extended High-Capacity Passenger Body',
      warranty: 'SAVY Verified Warranty',
      gradeability: '12 degrees laden',
      braking: 'Dual Hydraulic Drum with Parking Lock',
    },
    features: [
      'Extended passenger cabin seating Driver + 6 to 9 passengers comfortably',
      '1000W High Capacity electric motor engineered for continuous passenger loads',
      'Reinforced structural steel body frame with heavy-duty passenger safety cage',
      'Heavy-duty multi-leaf rear suspension with dual shock absorbers for smooth ride',
      'Overhead luggage storage rack and under-seat lockable compartments'
    ],
    applications: [
      'Group Campus & Institutional Shuttles',
      'High-Density Tourist Sightseeing & Pilgrimage Routes',
      'Industrial Plant & Airport Staff Transit',
      'Large Township Internal Feeder Services'
    ],
    customization: [
      'Flexible seating arrangements (6+1, 8+1, 9+1)',
      'School bus child safety protective wire mesh and safety door locks',
      'Smart digital fleet telemetry and CCTV cabin camera integration'
    ]
  },

  // ==========================================
  // 4. WASTE COLLECTION RICKSHAW
  // ==========================================
  {
    slug: 'dumptruck',
    aliasSlugs: ['dump-truck', 'dumptruck-garbage-collection'],
    name: 'Dumptruck',
    category: 'waste-collection-rickshaw',
    categoryName: 'Waste Collection Rickshaw',
    tagline: 'Municipal door-to-door waste collection with manual or mechanical dump mechanism.',
    image: '/assets/products/dumptruck/Dumptruck1.webp',
    pdf: '/assets/Downloadable PDF/Savy Dumptruck.pdf',
    gallery: [
      '/assets/products/dumptruck/Dumptruck1.webp',
      '/assets/products/dumptruck/Dumptruck2.webp',
      '/assets/products/dumptruck/Dumptruck3.webp',
      '/assets/products/dumptruck/Dumptruck4.webp',
      '/assets/products/dumptruck/Dumptruck5.webp',
      '/assets/products/dumptruck/Dumptruck6.webp',
      '/assets/products/dumptruck/Dumptruck7.webp',
      '/assets/products/dumptruck/Dumptruck8.webp'
    ],
    shortCopy: 'Dumptruck is a municipal door-to-door waste collection electric vehicle with 1200W BLDC motor, 500 kg waste capacity, and manual or mechanical dump mechanism.',
    overview: 'Built to support Swachh Bharat and municipal solid waste management initiatives, the SAVY Dumptruck features a 1200W BLDC powertrain, 500 kg waste payload capacity, dual wet/dry segregation compartments, and manual or mechanical dump discharge for narrow-lane civic cleanliness.',
    specs: {
      power: '1200W BLDC',
      topSpeed: '25 km/h',
      range: '70–100 km per charge',
      seatingCapacity: '1 Driver + 1 Helper',
      loadCapacity: '500 kg Waste Capacity',
      batteryType: 'High-Density Lithium / Deep Cycle Industrial',
      chargingTime: '4–6 Hours',
      dimensions: 'Municipal Sanitation Dump Bin Footprint',
      warranty: 'Municipal OEM Warranty Support',
      gradeability: '12 degrees laden',
      braking: 'Hydraulic / Mechanical Front and Rear Drum',
    },
    features: [
      '500 kg waste payload capacity with dual wet and dry waste segregation compartments',
      '1200W BLDC motor engineered for frequent stop-and-go door-to-door collection',
      'Manual or mechanical dump mechanism for rapid civic waste offloading',
      'Corrosion-resistant anti-leachate bin floor preventing foul odor and fluid drips',
      'Audio PA public announcement speaker system for resident collection alerts'
    ],
    applications: [
      'Municipal Corporations, Nagar Palikas & Smart Cities',
      'Door-to-Door Residential Waste Collection',
      'Gram Panchayats & Rural Sanitation Missions',
      'Large Educational, Healthcare & Industrial Campuses'
    ],
    customization: [
      'Manual or mechanical tipping assist lever mechanism',
      'Single large volume bin or partitioned multi-compartment bin',
      'GPS live fleet tracking and geofencing telemetry module'
    ]
  },
  {
    slug: 'tipper',
    aliasSlugs: ['e-tipper'],
    name: 'Tipper',
    category: 'waste-collection-rickshaw',
    categoryName: 'Waste Collection Rickshaw',
    tagline: 'Hydraulic tipping system for effortless municipal garbage dumping.',
    image: '/assets/products/tipper/Tipper 1.webp',
    pdf: '/assets/Downloadable PDF/E Tipper .pdf',
    gallery: [
      '/assets/products/tipper/Tipper 1.webp',
      '/assets/products/tipper/Tipper 2.webp',
      '/assets/products/tipper/Tipper 3.webp',
      '/assets/products/tipper/Tipper 4.webp',
      '/assets/products/tipper/Tipper 5.webp',
      '/assets/products/tipper/Tipper 6.webp'
    ],
    shortCopy: 'Tipper features an electro-hydraulic tipping system and 1500W* High Torque motor for effortless 600 kg municipal garbage dumping.',
    overview: 'The SAVY Tipper is engineered for high-efficiency municipal waste transport. Featuring a 1500W* high-torque powertrain and an integrated electro-hydraulic tipping hopper, it unloads up to 600 kg of solid waste with the push of a joystick, eliminating manual shoveling.',
    specs: {
      power: '1500W* High Torque',
      topSpeed: '25 km/h',
      range: '70–100 km per charge',
      seatingCapacity: '1 Driver + 1 Helper',
      loadCapacity: '600 kg Payload',
      batteryType: 'High-Capacity Lithium-ion / Deep Cycle Industrial',
      chargingTime: '4–6 Hours',
      dimensions: 'Electro-Hydraulic Tipping Hopper Body',
      warranty: 'Municipal OEM Warranty Support',
      gradeability: '12 degrees laden',
      braking: 'Dual Hydraulic Disc/Drum Braking System',
    },
    features: [
      'Electro-hydraulic tipping mechanism with intuitive operator lever control',
      '1500W* High Torque electric motor for hauling 600 kg loads over steep inclines',
      'High-grade reinforced steel hopper with leak-proof seals to contain leachate',
      'High discharge tipping angle ensuring clean, rapid evacuation into transfer stations',
      'Heavy-duty leaf spring rear suspension designed for continuous municipal cycles'
    ],
    applications: [
      'Municipal Solid Waste Transfer Stations & Landfills',
      'Smart City Waste Logistics & Centralized Garbage Bins',
      'Large Industrial Waste & Scrap Disposal',
      'Institutional Campus Grounds Sanitation'
    ],
    customization: [
      'Hydraulic auto-lifter for standard 120L / 240L municipal garbage bins',
      'Partitioned wet/dry compartments with independent dual tipping',
      'Public announcement PA siren system and GPS fleet management'
    ]
  },

  // ==========================================
  // 5. FOOD CART
  // ==========================================
  {
    slug: 'e-food-cart',
    aliasSlugs: ['food-cart-rickshaw', 'food-cart', 'dosa-cart', 'soda-cart', 'custom-food-cart', 'other-food-cart-variants'],
    name: 'E-Food Cart',
    category: 'food-cart',
    categoryName: 'Food Cart',
    tagline: 'Customized mobile catering platform for street vendors.',
    image: '/assets/products/food-cart/Food cart1.webp',
    pdf: '/assets/Downloadable PDF/Savy Food  Cart.pdf',
    gallery: [
      '/assets/products/food-cart/Food cart1.webp',
      '/assets/products/food-cart/Food cart2.webp',
      '/assets/products/food-cart/Food cart3.webp',
      '/assets/products/food-cart/Food cart4.webp',
      '/assets/products/food-cart/Food cart5.webp',
      '/assets/products/food-cart/Food cart6.webp'
    ],
    shortCopy: 'E-Food Cart is a customized mobile catering platform with 1100W BLDC motor and 400 - 450 kg payload capacity tailored for street vendors, ice cream, soda, dosa, and fast-food retail.',
    overview: 'The SAVY E-Food Cart transforms street food and beverage vending into a clean, modern, zero-emission commercial business. Built with food-grade stainless steel surfaces, fold-out serving bays, and auxiliary inverter outputs, it can be customized as an Ice Cream Cart, Soda Cart, Dosa Cart, Coffee Kiosk, or multi-purpose mobile kitchen.',
    specs: {
      power: '1100W BLDC',
      topSpeed: '20 km/h',
      range: '70 km per charge',
      seatingCapacity: '1 Operator + Walk-up Serving Bay',
      loadCapacity: '400 - 450 kg Payload',
      batteryType: 'Lithium-ion with Auxiliary Inverter Output',
      chargingTime: '4–5 Hours',
      dimensions: 'Food-Grade Commercial Kitchen Module',
      warranty: 'SAVY Commercial Warranty',
      gradeability: '10 degrees',
      braking: 'Mechanical / Hydraulic Assist',
    },
    customizationVariants: [
      {
        name: 'Ice Cream Cart',
        tag: 'Refrigerated Mobile Vending',
        copy: 'Dedicated insulated cold-storage freezer bay powered by auxiliary vehicle inverter, keeping ice creams and frozen desserts at optimal temperature without noisy generators.'
      },
      {
        name: 'Soda Cart',
        tag: 'Fountain Beverage Station',
        copy: 'Integrated multi-flavor fountain post-mix soda dispensing manifold, onboard chiller unit, and secure safety brackets for CO2 cylinders and syrup canisters.'
      },
      {
        name: 'Dosa & Fast-Food Cart',
        tag: 'Hot Prep Station',
        copy: 'Commercial food-grade SS304 tawa griddle, multi-burner gas piping fixtures, sanitary wash sink, batter storage, and condiment organizers.'
      },
      {
        name: 'Coffee & Snack Kiosk',
        tag: 'Quick Service Retail',
        copy: 'Auxiliary 220V inverter power for espresso machines, blenders, or display warmers, paired with fold-out serving counters and illuminated branding marquee.'
      }
    ],
    features: [
      'Customized mobile catering platform tailored for street vendors and culinary retail',
      '1100W BLDC motor providing smooth, quiet mobility to high-footfall locations',
      '400 - 450 kg payload capacity accommodating appliances, prep counters, and inventory',
      'Food-grade SS304 stainless steel prep countertops, wash sinks, and storage',
      'Auxiliary battery inverter powering mixers, chillers, lights, and billing POS systems',
      'Fold-out canopy awnings and bright LED counter illumination for evening vending'
    ],
    applications: [
      'Street Food Vending, Night Markets & Food Courts',
      'Ice Cream, Beverages & Soda Dispensing',
      'Corporate Tech Parks, Universities & Event Grounds',
      'Tourist Promenades, Beaches & Exhibition Grounds'
    ],
    customization: [
      'Custom kitchen equipment layout (Dosa tawa, soda fountain, ice cream freezer, espresso bar)',
      'Solar-assisted roof canopy for daytime auxiliary power generation',
      'Digital POS mounting, custom marquee LED lighting, and branded vinyl wraps'
    ]
  },

  // ==========================================
  // 6. SPECIAL PURPOSE VEHICLE
  // ==========================================
  {
    slug: 'custom-spv',
    aliasSlugs: ['custom-built-vehicles', 'atm-vehicle', 'custom-electruck-900kg', 'special-purpose-custom', 'city-pod'],
    name: 'Custom SPV',
    category: 'special-purpose-vehicle',
    categoryName: 'Special Purpose Vehicle',
    tagline: 'Custom-built design and fabrication tailored to specific commercial, industrial, or operational requirements.',
    image: '/assets/products/special-purpose/Special Purpose Vehical1.webp',
    gallery: [
      '/assets/products/special-purpose/Special Purpose Vehical1.webp',
      '/assets/products/special-purpose/Special Purpose Vehical2.webp',
      '/assets/products/special-purpose/Special Purpose Vehical3.webp',
      '/assets/products/special-purpose/Special Purpose Vehical4.webp',
      '/assets/products/special-purpose/Special Purpose Vehical5.webp',
      '/assets/products/special-purpose/Special Purpose Vehical6.webp',
      '/assets/products/special-purpose/Special Purpose Vehical7.webp'
    ],
    shortCopy: 'Custom SPV offers bespoke design and fabrication tailored to specific commercial, industrial, or operational requirements with fully customizable motor power and capacity.',
    overview: 'SAVY Greentech’s in-house R&D, chassis fabrication, and power electronics engineering teams create custom-built Special Purpose Vehicles (SPVs) tailored to unique operational challenges. From heavy multi-shift industrial haulers (Ramdev Foods) to secure Mobile ATM banking units, hospital emergency carts, and specialized civic utilities.',
    specs: {
      power: 'Customizable as per requirement',
      topSpeed: 'Customizable (Calibrated to site regulations)',
      range: 'Customizable (Configurable battery capacity)',
      seatingCapacity: 'Customizable as per requirement',
      loadCapacity: 'Customizable as per requirement',
      batteryType: 'Custom Engineered Lithium-ion Packs (LFP / NMC)',
      chargingTime: 'Tailored Charging Architecture',
      dimensions: 'Custom CAD-Engineered Dimensions',
      warranty: 'Comprehensive OEM SLA Support',
      gradeability: 'Up to 15 degrees laden',
      braking: 'Hydraulic Multi-Circuit Braking System',
    },
    features: [
      'Custom-built design and fabrication tailored to specific commercial, industrial, or operational requirements',
      'Motor power and battery payload capacity fully customizable to exact duty cycles',
      'Bespoke CAD engineering, FEA structural stress simulation, and precision manufacturing',
      'Dedicated auxiliary electrical systems, inverters, and specialized equipment mounting',
      'End-to-end prototyping, testing, ARAI/ICAT certification, and volume production under one roof'
    ],
    applications: [
      'Mobile ATM & Rural Banking Financial Services',
      'Heavy Industrial Multi-Shift Logistics & Factory Haulage (Ramdev Foods)',
      'Mobile Healthcare Clinics, Ambulance & Patient Transfer',
      'Airport Tarmac Baggage & Maintenance Utility Platforms',
      'Bespoke Government & Defense Specialized Utility Platforms'
    ],
    customization: [
      'Complete mechanical, electrical, and aesthetic customization to client specs',
      'Telemetry, RFID access control, and specialized utility equipment mounting',
      'Hydraulic lift-gates, secure vaults, or climate-controlled laboratory cabins'
    ]
  }
];

// Helper to look up a category by slug or id or alias
export const getCategoryBySlug = (slug) => {
  if (!slug) return null;
  const raw = slug.replace(/^\/|\/$/g, '').toLowerCase();
  const clean = raw
    .replace(/^category\//, '')
    .replace(/^products\/category\//, '')
    .replace(/^products\//, '');
  return productCategories.find(
    (c) =>
      c.slug.toLowerCase() === clean ||
      c.id.toLowerCase() === clean ||
      c.aliasSlugs?.some((a) => a.toLowerCase() === clean) ||
      c.slug.toLowerCase() === raw ||
      c.id.toLowerCase() === raw ||
      c.aliasSlugs?.some((a) => a.toLowerCase() === raw)
  );
};

// Helper to look up a product by slug or alias
export const getProductBySlug = (slug) => {
  if (!slug) return null;
  // Handle nested slugs e.g. "electric-campus-cart/classic-golf-cart"
  const parts = slug.replace(/^\/|\/$/g, '').split('/');
  const targetSlug = parts[parts.length - 1].toLowerCase();
  
  return products.find(
    (p) =>
      p.slug.toLowerCase() === targetSlug ||
      p.aliasSlugs?.some((a) => a.toLowerCase() === targetSlug)
  );
};

// Helper to get products belonging to a category
export const getProductsByCategory = (categorySlug) => {
  const cat = getCategoryBySlug(categorySlug);
  if (!cat) return [];
  return products.filter(
    (p) =>
      p.category === cat.id ||
      p.category === cat.slug ||
      cat.aliasSlugs?.includes(p.category)
  );
};
