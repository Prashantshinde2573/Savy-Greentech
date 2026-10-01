export const productCategories = [
  {
    id: 'e-campus-cart',
    slug: 'e-campus-cart',
    name: 'E-Campus Cart',
    shortName: 'Campus Carts',
    tagline: 'Eco-friendly, whisper-quiet electric mobility for universities, resorts, hospitals, and corporate campuses.',
    heroImage: '/assets/classic-golf.jpeg',
    icon: 'car',
    description: 'Purpose-built electric campus carts engineered for passenger comfort, VIP hospitality, and whisper-quiet institutional transit. Available in multiple seating configurations from 2 to 8 seats.'
  },
  {
    id: 'electric-passenger-rickshaw',
    slug: 'electric-passenger-rickshaw',
    name: 'Electric Passenger Rickshaw',
    shortName: 'Passenger Rickshaws',
    tagline: 'Certified on-road & institutional 3-wheel passenger electric rickshaws engineered for reliable, economical micro-mobility.',
    heroImage: '/assets/tuk-tuk.jpg',
    icon: 'users',
    description: 'Safe, economical, and approved electric passenger rickshaws for urban micro-mobility, tourist circuits, and student transit.'
  },
  {
    id: 'electric-loading-rickshaw',
    slug: 'electric-loading-rickshaw',
    name: 'Electric Loading Rickshaw',
    shortName: 'Loading Rickshaws',
    tagline: 'Heavy-duty electric cargo, freight, water tankers, and municipal logistics solutions.',
    heroImage: '/assets/electruck.jpg',
    icon: 'truck',
    description: 'Heavy-payload 3-wheel electric carriers engineered for industrial material handling, urban freight, water distribution, dairy routes, and municipal sanitation.'
  },
  {
    id: 'food-cart-rickshaw',
    slug: 'food-cart-rickshaw',
    name: 'Food Cart Rickshaw',
    shortName: 'Food Carts',
    tagline: 'Mobile electric culinary and retail dispensing stations for street food, beverages, and event vending.',
    heroImage: '/assets/applications/food-cart.webp',
    icon: 'store',
    description: 'Food-grade stainless steel electric mobile retail units designed for pollution-free street vending, fast food, beverages, catering, and event refreshments.'
  },
  {
    id: 'special-purpose-vehicle',
    slug: 'special-purpose-vehicle',
    name: 'Special Purpose Vehicle',
    shortName: 'Special Purpose',
    tagline: 'Bespoke engineered electric vehicles customized for specialized industrial, institutional, and government operations.',
    heroImage: '/assets/electruck.jpg',
    icon: 'gear',
    description: 'Tailored electric mobility engineering built from the ground up to match unique operational workflows, specialized equipment, and heavy payload specifications.'
  }
];

export const products = [
  // ==========================================
  // 1. E-CAMPUS CART
  // ==========================================
  {
    slug: 'classic-golf',
    name: 'Classic Golf',
    category: 'e-campus-cart',
    categoryName: 'E-Campus Cart',
    tagline: 'High-efficiency four-wheel electric campus cart for institutional transit.',
    image: '/assets/classic-golf.jpeg',
    gallery: [
      '/assets/classic-golf.jpeg',
      '/assets/club-cart.jpg',
      '/assets/applications/golf-course.jpg',
      '/assets/applications/campus.jpg'
    ],
    shortCopy: 'Classic Golf is a four-wheel campus cart designed for internal transportation purposes across universities, schools, resorts, government bodies, industrial campuses, and large institutions.',
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
    category: 'e-campus-cart',
    categoryName: 'E-Campus Cart',
    tagline: 'Premium luxury campus and resort electric mobility.',
    image: '/assets/club-cart.jpg',
    gallery: [
      '/assets/club-cart.jpg',
      '/assets/classic-golf.jpeg',
      '/assets/vintage-elite.jpg',
      '/assets/applications/tourism.jpg'
    ],
    shortCopy: 'Club Cart is a premium four-wheel campus cart designed for internal transportation in luxury campuses, resorts, institutions, and commercial premises with executive styling.',
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
    slug: 'vintage-elite',
    aliasSlugs: ['elite-vintage-cart'],
    name: 'Elite Vintage Cart',
    category: 'e-campus-cart',
    categoryName: 'E-Campus Cart',
    tagline: 'Timeless heritage styling paired with cutting-edge electric powertrain.',
    image: '/assets/vintage-elite.jpg',
    gallery: [
      '/assets/vintage-elite.jpg',
      '/assets/classic-golf.jpeg',
      '/assets/applications/tourism.jpg'
    ],
    shortCopy: 'A premium four-wheel campus cart designed for internal transportation with a classic vintage appearance, preferred by resorts, heritage properties, and for VIP movement.',
    overview: 'The SAVY Elite Vintage Cart combines nostalgic classic automobile design with clean zero-emission electric engineering. A statement vehicle ideal for royal heritage hotels, destination wedding venues, high-profile institutional visits, and VIP hospitality.',
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

  // ==========================================
  // 2. ELECTRIC PASSENGER RICKSHAW
  // ==========================================
  {
    slug: 'three-wheel-passenger-rickshaw',
    aliasSlugs: ['tuk-tuk-e', 'tuk-tuk'],
    name: 'Three-wheel Passenger Rickshaw',
    category: 'electric-passenger-rickshaw',
    categoryName: 'Electric Passenger Rickshaw',
    tagline: 'Versatile electric passenger three-wheeler with certified on-road approval.',
    image: '/assets/tuk-tuk.jpg',
    gallery: [
      '/assets/tuk-tuk.jpg',
      '/assets/electruck.jpg',
      '/assets/applications/community.jpg',
      '/assets/applications/tourism.jpg'
    ],
    shortCopy: 'Three-wheel Passenger Rickshaw (Tuk Tuk ë) is a versatile three-wheel passenger vehicle designed for urban and commercial transport, available in multiple seating configurations with approved on-road variants.',
    overview: 'The SAVY Three-wheel Passenger Rickshaw is an efficient, safe, and economical electric passenger vehicle. Built to provide green micro-mobility for campus transit, tourist circuits, and certified on-road passenger transport with exceptional battery mileage and low maintenance overheads.',
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

  // ==========================================
  // 3. ELECTRIC LOADING RICKSHAW
  // ==========================================
  {
    slug: 'electruck',
    aliasSlugs: ['electruck-500kg'],
    name: 'Electruck — max 500 kg',
    category: 'electric-loading-rickshaw',
    categoryName: 'Electric Loading Rickshaw',
    tagline: 'Rugged heavy-duty electric cargo carrier with versatile body customizations.',
    image: '/assets/electruck.jpg',
    gallery: [
      '/assets/electruck.jpg',
      '/assets/dump-truck.jpg',
      '/assets/applications/logistics.jpg'
    ],
    shortCopy: 'Electruck (max 500 kg) is a heavy-duty cargo loading three-wheeler engineered for FMCG delivery, laundry services, material handling, and municipal operations with versatile body customizations.',
    overview: 'The SAVY Electruck redefines urban and industrial cargo transport with its heavy-duty payload capability, reinforced steel frame, and high-torque electric powertrain. Available with specialized customization variants including Pack Body, Half Body, Dumptruck, and Tipper configurations.',
    specs: {
      power: '1.5 kW High-Torque Indigenous Motor',
      topSpeed: '25 km/h',
      range: '75–100 km per charge',
      seatingCapacity: '1 Driver',
      loadCapacity: 'Up to 500 kg Certified Payload',
      batteryType: 'Heavy-Duty Lithium-ion / Deep Cycle Lead-Acid',
      chargingTime: '4–6 Hours',
      dimensions: 'High-Volume Cargo Deck Footprint',
      warranty: 'Verified OEM Industrial Warranty',
      gradeability: 'Up to 12 degrees fully laden',
      braking: 'Heavy-Duty Mechanical / Hydraulic Assist',
    },
    customizationVariants: [
      {
        name: 'Pack Body',
        tag: 'Enclosed Cargo Box',
        copy: 'Fully enclosed metal container box body with weather-sealed roll-up shutters or double lockable doors. Ideal for FMCG delivery, parcel logistics, and protected goods.'
      },
      {
        name: 'Half Body',
        tag: 'Open Freight Deck',
        copy: 'Open high-side utility freight deck with drop-down sides and heavy-duty steel tie-down hooks for rapid loading and multi-purpose industrial freight.'
      },
      {
        name: 'Dumptruck — Garbage Collection',
        tag: 'Municipal Sanitation',
        copy: 'Specialized municipal waste collection body featuring dual wet/dry segregation compartments and easy discharge for door-to-door civic cleanliness.'
      },
      {
        name: 'Tipper — Garbage Transportation',
        tag: 'Electro-Hydraulic Tip',
        copy: 'Heavy-duty electro-hydraulic tipping hopper engineered for effortless dumping of municipal solid waste, debris, and bulk materials.'
      }
    ],
    features: [
      'Reinforced ladder-frame chassis with heavy-duty leaf spring rear suspension',
      'Four factory-customized body configurations: Pack Body, Half Body, Dumptruck, and Tipper',
      'Weatherproof sealed motor and electronic controller enclosure (IP65/IP67)',
      'Digital battery management and overload protection system',
      'Over 75% operational cost reduction compared to conventional diesel loaders'
    ],
    applications: [
      'Industrial Manufacturing Plants & Material Handling',
      'FMCG, Courier & Parcel Last-Mile Delivery',
      'Hospital & Hotel Linen / Laundry Transport',
      'Municipal Waste Collection & Rural Sanitation'
    ],
    customization: [
      'Pack Body enclosed box with rear lockable shutters',
      'Half Body open utility cargo deck with drop sides',
      'Dumptruck dual-compartment waste collection body',
      'Tipper electro-hydraulic tipping hopper for garbage transport'
    ]
  },
  {
    slug: 'electruck-dlx',
    name: 'Electruck DLX — 1–3 Ton',
    category: 'electric-loading-rickshaw',
    categoryName: 'Electric Loading Rickshaw',
    tagline: 'High-tonnage heavy industrial electric cargo carrier built for 1 to 3 Ton payloads.',
    image: '/assets/electruck.jpg',
    gallery: [
      '/assets/electruck.jpg',
      '/assets/applications/logistics.jpg'
    ],
    shortCopy: 'Electruck DLX is an ultra-heavy-duty electric cargo platform engineered for high-tonnage material handling and heavy manufacturing logistics, rated for 1 to 3 Ton capacities.',
    overview: 'Built for demanding industrial environments and heavy freight cycles, the SAVY Electruck DLX combines reinforced heavy-gauge structural steel frames, upgraded high-torque powertrains, and multi-leaf suspension systems to carry between 1,000 kg and 3,000 kg with zero emissions.',
    specs: {
      power: '3 kW – 5 kW Heavy Industrial Powertrain',
      topSpeed: '25 km/h',
      range: '70–90 km per charge',
      seatingCapacity: '1 Driver',
      loadCapacity: '1,000 kg – 3,000 kg (1–3 Ton)',
      batteryType: 'High-Capacity Lithium-ion (LFP) with Smart BMS',
      chargingTime: '4–6 Hours / Rapid Charge Compatible',
      dimensions: 'Extended Reinforced Industrial Wheelbase',
      warranty: 'Industrial SLA Warranty Support',
      gradeability: '15 degrees fully loaded',
      braking: 'Dual-Circuit Hydraulic Disc/Drum Heavy-Duty System',
    },
    features: [
      'Double-gusseted reinforced structural steel chassis for heavy tonnage',
      'High-torque industrial motor with heavy differential gear reduction',
      'Multi-leaf heavy rear suspension with dual shock absorbers',
      'Custom heavy cargo platform dimensions suited for industrial pallets and crates'
    ],
    applications: [
      'Heavy Manufacturing & Steel / Engineering Plants',
      'Warehouse Bulk Material Movement & Distribution Centers',
      'Agro-Processing, Grain & Sugar Mills',
      'Heavy Industrial Campus Logistics'
    ],
    customization: [
      'Hydraulic lift-gate for effortless ground-to-bed pallet loading',
      'High-side steel cages or enclosed container configurations',
      'Fleet telemetry and heavy-duty battery fast-charging packages'
    ]
  },
  {
    slug: 'tobu-truck',
    name: 'Tobu Truck — small/light cargo',
    category: 'electric-loading-rickshaw',
    categoryName: 'Electric Loading Rickshaw',
    tagline: 'Agile, compact electric cargo truck engineered for small and light freight.',
    image: '/assets/electruck.jpg',
    gallery: [
      '/assets/electruck.jpg',
      '/assets/applications/logistics.jpg'
    ],
    shortCopy: 'Tobu Truck is a nimble, compact electric cargo vehicle tailored for light-load delivery, intra-facility movements, and narrow-street urban logistics.',
    overview: 'Designed for quick, nimble trips and low-payload urban logistics, the SAVY Tobu Truck provides an economical, easy-to-park electric transport solution with an ultra-tight turning radius for narrow market alleys and dense warehouse corridors.',
    specs: {
      power: '1.2 kW Efficient BLDC Motor',
      topSpeed: '25 km/h',
      range: '80 km per charge',
      seatingCapacity: '1 Driver',
      loadCapacity: '300–400 kg Light Cargo',
      batteryType: 'Lithium-ion / Deep Cycle',
      chargingTime: '3.5–4.5 Hours',
      dimensions: 'Compact Ultra-Maneuverable Footprint',
      warranty: 'Standard SAVY Warranty',
      gradeability: '10 degrees',
      braking: 'Mechanical & Regenerative Braking',
    },
    features: [
      'Ultra-compact footprint for narrow lanes and tight warehouse aisles',
      'Lightweight rigid chassis providing maximum battery efficiency',
      'Convenient low load-bed height for quick manual parcel loading',
      'Extremely low operating and maintenance expenses'
    ],
    applications: [
      'E-Commerce & Courier Last-Mile Delivery',
      'Intra-Hospital & University Campus Supply Runs',
      'Local Grocery & Hardware Store Deliveries',
      'Internal Factory Parts Shuttle'
    ],
    customization: [
      'Weather-sealed canvas canopy cover or lockable mesh cage',
      'Rear parcel organizer dividers and delivery basket fitments'
    ]
  },
  {
    slug: 'electric-water-tanker',
    name: 'Electric Water Tanker — 500 L',
    category: 'electric-loading-rickshaw',
    categoryName: 'Electric Loading Rickshaw',
    tagline: '500-liter electric water dispensing tanker for horticulture and campus maintenance.',
    image: '/assets/electruck.jpg',
    gallery: [
      '/assets/electruck.jpg',
      '/assets/applications/government.jpg'
    ],
    shortCopy: 'Purpose-built electric vehicle mounted with a 500L anti-slosh water tanker and pressure dispensing pump for horticulture, campus grounds, and civic watering.',
    overview: 'The SAVY Electric Water Tanker (500 L) delivers silent, zero-emission watering and sanitization capability for botanical gardens, public parks, municipal green belts, and expansive corporate campuses without noisy tractor engines.',
    specs: {
      power: '1.5 kW High-Torque Motor',
      topSpeed: '25 km/h',
      range: '70 km per charge',
      seatingCapacity: '1 Driver',
      loadCapacity: '500 Liters Water Tank + Dispensing System',
      batteryType: 'Lithium-ion with Auxiliary 12V Pump Circuit',
      chargingTime: '4–5 Hours',
      dimensions: 'Integrated Tanker Platform',
      warranty: 'SAVY Municipal & Commercial Warranty',
      gradeability: '12 degrees',
      braking: 'Heavy-Duty Hydraulic / Mechanical Drum',
    },
    features: [
      '500-liter corrosion-resistant water tank with internal anti-slosh baffles',
      'Electric 12V high-pressure water pump with adjustable spray gun and hose reel',
      'Wide rear spray bar option for road dust suppression and lawn watering',
      'Top inspection hatch with quick-fill inlet and bottom drain valve'
    ],
    applications: [
      'Horticulture, Municipal Parks & Green Belt Maintenance',
      'University, Resort & Industrial Campus Landscaping',
      'Road Cleaning & Mist/Dust Suppression in Construction Zones',
      'Remote Drinking Water / Utility Water Distribution'
    ],
    customization: [
      'High-pressure spray nozzle wand for tree washing and pesticide spraying',
      'Stainless steel SS304 tank option for potable drinking water supply',
      'Retractable 30-meter spring-loaded hose reel'
    ]
  },
  {
    slug: 'milk-cart',
    name: 'Milk Cart — SS tanker, 500 L',
    category: 'electric-loading-rickshaw',
    categoryName: 'Electric Loading Rickshaw',
    tagline: 'Food-grade 304 stainless steel 500L tanker cart tailored for dairy collection.',
    image: '/assets/electruck.jpg',
    gallery: [
      '/assets/electruck.jpg',
      '/assets/applications/agriculture.jpg'
    ],
    shortCopy: 'Purpose-built electric vehicle tailored for dairy cooperatives and milk distribution networks with a 500L food-grade stainless steel tanker or organized can bays.',
    overview: 'Optimized for hygienic, early morning, silent delivery across residential neighbourhoods and dairy collection centres. Features sanitary SS304 construction, easy clean-in-place valves, and zero exhaust emissions.',
    specs: {
      power: '1.5 kW High-Torque Motor',
      topSpeed: '25 km/h',
      range: '75 km per charge',
      seatingCapacity: '1 Driver',
      loadCapacity: '500 Liters Food-Grade SS Tank / Crate Bays',
      batteryType: 'Lithium-ion / Deep Cycle Lead-Acid',
      chargingTime: '4 Hours',
      dimensions: 'Crate-Optimized Bed Dimensions',
      warranty: 'SAVY Commercial Warranty',
      gradeability: '12 degrees',
      braking: 'Heavy-Duty Drum',
    },
    features: [
      'Food-grade 304 stainless steel tank with sanitary mirror finish inside',
      'Corrosion-proof wash-down floor with non-slip texture',
      'Quick-drain butterfly sanitary valve for effortless milk transfer',
      'Whisper-quiet electric drive perfect for 4:00 AM distribution rounds'
    ],
    applications: [
      'Dairy Cooperatives & Milk Collection Routes',
      'Agro-Farm Produce & Liquid Food Transport',
      'Community Daily Dairy Essentials Delivery'
    ],
    customization: [
      'Insulated PUF container box for maintaining chilled milk temperatures',
      'Dual tank compartments for separate milk grades or collection points'
    ]
  },
  {
    slug: 'dump-truck',
    aliasSlugs: ['dumptruck-garbage-collection'],
    name: 'Dump Truck — Municipal Sanitation',
    category: 'electric-loading-rickshaw',
    categoryName: 'Electric Loading Rickshaw',
    tagline: 'Hydraulic tipper & dual-compartment EV for municipal waste collection.',
    image: '/assets/dump-truck.jpg',
    gallery: [
      '/assets/dump-truck.jpg',
      '/assets/electruck.jpg',
      '/assets/applications/government.jpg',
      '/assets/applications/community.jpg'
    ],
    shortCopy: 'Dumptruck is a three-wheel electric waste collection vehicle designed for efficient door-to-door garbage collection and municipal sanitation operations.',
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
      'GPS live fleet tracking and geofencing telemetry module'
    ]
  },

  // ==========================================
  // 4. FOOD CART RICKSHAW
  // ==========================================
  {
    slug: 'dosa-cart',
    name: 'Dosa Cart',
    category: 'food-cart-rickshaw',
    categoryName: 'Food Cart Rickshaw',
    tagline: 'Mobile electric fast-food kiosk with food-grade SS tawa & prep station.',
    image: '/assets/applications/food-cart.webp',
    gallery: [
      '/assets/applications/food-cart.webp'
    ],
    shortCopy: 'Mobile electric food vending vehicle customized with heavy-gauge food-grade stainless steel dosa tawa, batter containers, and gas/electric burner fixtures.',
    overview: 'The SAVY Dosa Cart transforms fast-food street vending into a clean, modern, zero-emission commercial operation. Designed with hygiene-first SS304 countertops, fold-out serving bays, integrated condiment organizers, and battery-powered illumination.',
    specs: {
      power: '1.5 kW Electric Powertrain',
      topSpeed: '20 km/h',
      range: '70 km per charge',
      seatingCapacity: '1 Driver / Chef + Walk-up Service Area',
      loadCapacity: 'Up to 600 kg Cooking Equipment & Ingredients',
      batteryType: 'Lithium-ion with Auxiliary 220V Inverter Output',
      chargingTime: '4–5 Hours',
      dimensions: 'Food-Grade Kitchen Module',
      warranty: 'SAVY Commercial Warranty',
      gradeability: '10 degrees',
      braking: 'Mechanical & Hydraulic Braking',
    },
    features: [
      'Heavy-gauge commercial SS304 dosa tawa griddle with burner integration',
      'Sanitary wash sink with fresh water tank and wastewater container',
      'Overhead fold-out weather canopy with high-visibility LED spotlights',
      'Lockable dry-storage compartments and insulated batter cooler bay',
      'Auxiliary battery inverter powering mixers, lights, and billing machine'
    ],
    applications: [
      'Street Food Vending & Night Markets',
      'Corporate Tech Parks & University Food Courts',
      'Event Catering, Fairs & Tourist Hotspots',
      'Beach Promenades & Pedestrian Plazas'
    ],
    customization: [
      'Custom tawa size and multi-burner gas piping setup',
      'Solar-assisted roof for daytime battery topping and lighting',
      'Custom vinyl wrap branding and digital POS mounting'
    ]
  },
  {
    slug: 'soda-cart',
    name: 'Soda Cart',
    category: 'food-cart-rickshaw',
    categoryName: 'Food Cart Rickshaw',
    tagline: 'Mobile refrigerated soda & beverage dispensing EV with multi-flavor fountain taps.',
    image: '/assets/applications/food-cart.webp',
    gallery: [
      '/assets/applications/food-cart.webp'
    ],
    shortCopy: 'Mobile beverage dispensing EV equipped with multi-flavor post-mix fountain soda taps, onboard cooling chiller, and CO2 cylinder safety bays.',
    overview: 'The SAVY Soda Cart offers high-margin mobile beverage vending for parks, tourist destinations, sports stadiums, and event grounds. Features food-grade beverage lines, continuous chilling systems, and silent electric mobility.',
    specs: {
      power: '1.5 kW Electric Powertrain',
      topSpeed: '20 km/h',
      range: '70 km per charge',
      seatingCapacity: '1 Driver + Dispensing Kiosk',
      loadCapacity: 'Up to 600 kg Syrup Tanks & Refrigeration System',
      batteryType: 'Lithium-ion with Dedicated Chiller Inverter',
      chargingTime: '4–5 Hours',
      dimensions: 'Beverage Kiosk Platform',
      warranty: 'SAVY Commercial Warranty',
      gradeability: '10 degrees',
      braking: 'Mechanical & Hydraulic Drum',
    },
    features: [
      'Multi-flavor post-mix fountain soda dispensing manifold (4 to 8 valves)',
      'Integrated ice-bank chiller maintaining ice-cold beverage temperatures',
      'Secure bracket mountings for CO2 gas cylinders and syrup canisters',
      'Illuminated display marquee and digital cash register counter'
    ],
    applications: [
      'Public Parks, Beaches & Tourist Attractions',
      'Sports Stadiums, Concerts & Outdoor Exhibitions',
      'Commercial Hubs & Transportation Terminals'
    ],
    customization: [
      'Flavored juice dispensers and sugarcane juice extractor integration',
      'Custom LED branded neon signage and sound system'
    ]
  },
  {
    slug: 'food-cart-rickshaw',
    aliasSlugs: ['other-food-cart-variants', 'custom-food-cart'],
    name: 'Other Food Cart variants',
    category: 'food-cart-rickshaw',
    categoryName: 'Food Cart Rickshaw',
    tagline: 'Custom-tailored mobile culinary kitchens for specialty food and beverage retail.',
    image: '/assets/applications/food-cart.webp',
    gallery: [
      '/assets/applications/food-cart.webp'
    ],
    shortCopy: 'Bespoke mobile electric food dispensing and retail vehicle customizable for coffee stalls, momos, rolls, chaat, ice cream, and specialty culinary kiosks.',
    overview: 'The SAVY Custom Food Cart brings culinary concepts directly to high-footfall tourist zones, corporate campuses, and pedestrian plazas without noise or pollution.',
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
      'Lockable dry-storage cabinetry and insulated cold-beverage compartments'
    ],
    applications: [
      'Specialty Coffee, Tea & Snack Vending',
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

  // ==========================================
  // 5. SPECIAL PURPOSE VEHICLE
  // ==========================================
  {
    slug: 'custom-built-vehicles',
    aliasSlugs: ['custom-electruck-900kg', 'atm-vehicle', 'special-purpose-custom'],
    name: 'Custom-built Vehicles',
    category: 'special-purpose-vehicle',
    categoryName: 'Special Purpose Vehicle',
    tagline: 'Bespoke engineered electric vehicle platforms customized for unique operational requirements.',
    image: '/assets/electruck.jpg',
    gallery: [
      '/assets/electruck.jpg',
      '/assets/applications/logistics.jpg',
      '/assets/applications/government.jpg'
    ],
    shortCopy: 'Special-purpose customized electric vehicles engineered from the ground up for mobile banking, heavy industrial haulage, healthcare transit, and specialized civic utilities.',
    overview: 'SAVY Greentech’s in-house R&D, chassis fabrication, and power electronics engineering teams create custom-built electric vehicles for clients with specific operational challenges. From heavy 900kg+ FMCG distribution platforms (Ramdev Foods) to secure Mobile ATM banking units and hazardous environment shuttles.',
    specs: {
      power: '1.5 kW – 5 kW Custom Powertrains',
      topSpeed: '25 km/h (Calibrated to site regulations)',
      range: '75–120 km per charge (Configurable)',
      seatingCapacity: 'Custom Cabin Formats',
      loadCapacity: '500 kg to 3,000 kg Custom Ratings',
      batteryType: 'Custom Engineered Lithium-ion Packs (LFP / NMC)',
      chargingTime: 'Tailored Charging Architecture',
      dimensions: 'Custom CAD-Engineered Dimensions',
      warranty: 'Comprehensive OEM SLA Support',
      gradeability: 'Up to 15 degrees laden',
      braking: 'Hydraulic Multi-Circuit Braking System',
    },
    features: [
      'Tailor-made tubular and ladder-frame chassis with finite element stress analysis',
      'Custom payload bodies: Mobile ATMs, insulated medical labs, heavy cargo haulers',
      'Auxiliary battery systems and high-power inverters for specialized equipment',
      'End-to-end design, prototyping, testing, and volume manufacturing under one roof'
    ],
    applications: [
      'Mobile ATM & Rural Banking Services',
      'Heavy FMCG Manufacturing & Multi-Shift Factory Haulage (Ramdev Foods)',
      'Hospital Patient Transfer & Mobile Health Clinics',
      'Airport Tarmac Baggage & Maintenance Utility Platforms',
      'Hazardous Material & Chemical Plant Controlled Shuttles'
    ],
    customization: [
      'Complete mechanical, electrical, and aesthetic customization to client specs',
      'Telemetry, RFID access control, and specialized equipment mounting'
    ]
  },

  // Legacy / Direct Slug Products (Maintained for seamless routing)
  {
    slug: 'school-rickshaw',
    name: 'Electric School Rickshaw',
    category: 'electric-passenger-rickshaw',
    categoryName: 'Electric Passenger Rickshaw',
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
      'Bright safety yellow exterior with high-visibility reflective branding'
    ],
    applications: [
      'Primary & Secondary School Transportation',
      'Daycare & Kindergarten Transit Circuits'
    ],
    customization: [
      'GPS live bus/rickshaw tracking app integration for parents',
      'CCTV internal cabin safety camera module'
    ]
  },
  {
    slug: 'atm-vehicle',
    name: 'Mobile ATM & Bank Vehicle',
    category: 'special-purpose-vehicle',
    categoryName: 'Special Purpose Vehicle',
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
      'Dedicated pure sine wave inverter backup for continuous ATM uptime',
      'Surveillance camera integration and panic alarm system'
    ],
    applications: [
      'Rural & Remote Financial Inclusion Programs',
      'Festivals, Fairs & Disaster Relief Cash Distribution'
    ],
    customization: [
      'Custom bank branding and ATM machine integration specifications'
    ]
  },
  {
    slug: 'custom-electruck-900kg',
    name: 'Custom 900kg Electruck (Ramdev Foods)',
    category: 'special-purpose-vehicle',
    categoryName: 'Special Purpose Vehicle',
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
      'Custom high-side cargo walls engineered for palletized food crates'
    ],
    applications: [
      'Heavy FMCG Manufacturing & Warehousing',
      'Spice, Grain & Food Distribution Logistics'
    ],
    customization: [
      'Custom payload sizing (up to 1,200 kg on request)',
      'Hydraulic lift-gate for effortless ground-to-bed pallet loading'
    ]
  },
  {
    slug: 'city-pod',
    name: 'SAVY City Pod (Upcoming)',
    category: 'special-purpose-vehicle',
    categoryName: 'Special Purpose Vehicle',
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
      'Smart City VIP Feeder Mobility'
    ],
    customization: [
      'Bespoke international livery, interior trims, and telematics configurations'
    ],
    comingSoon: true
  }
];

// Helper to look up a category by slug or id
export const getCategoryBySlug = (slug) => {
  if (!slug) return null;
  const clean = slug.replace(/^\/|\/$/g, '').toLowerCase();
  return productCategories.find(
    (c) => c.slug.toLowerCase() === clean || c.id.toLowerCase() === clean
  );
};

// Helper to look up a product by slug or alias
export const getProductBySlug = (slug) => {
  if (!slug) return null;
  // Handle nested slugs e.g. "e-campus-cart/classic-golf"
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
      (cat.id === 'special-purpose-vehicle' && (p.category === 'special-purpose-vehicle' || p.category === 'upcoming' || p.category === 'custom-industrial'))
  );
};
