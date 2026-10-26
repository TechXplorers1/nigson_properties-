export const WHATSAPP = "2348073467809";
export const COMPANY_ADDRESS = "Plot 30B, Block 110, Oladimeji Alo Street, Lekki Phase 1, Lagos";
export const COMPANY_EMAIL = "Hello@Nigson.com";
export const COMPANY_PHONES = ["08073467809", "09134446722"];
export const COMPANY_HOURS = "Monday–Friday, 9:00 AM–5:00 PM";

export type Category = "Waterfront Penthouses" | "Smart Terraces" | "Luxury Villas";

export interface FloorPlan {
  level: string;
  name: string;
  sqm: number;
  description: string;
  rooms: string[];
}

export interface Property {
  id: string;
  slug?: string;
  title: string;
  tagline?: string;
  category: Category;
  location: string;
  address?: string;
  status: "Off-Plan" | "Ready for Handover";
  beds: number;
  baths: number;
  size: number;
  price: number;
  usdPrice?: number;
  gbpPrice?: number;
  titleDeed?: string;
  image: string;
  gallery: string[];
  amenities: string[];
  summary: string;
  description?: string;
  floorPlans?: FloorPlan[];
  highlights?: { label: string; value: string }[];
  completionDate?: string;
  travelTimes?: { place: string; time: string }[];
}

export const properties: Property[] = [
  {
    id: "azure",
    slug: "grand-azure-waterfront-villa",
    title: "The Grand Azure Waterfront Villa",
    tagline: "Sculpted Lagoon Frontage with Private Deep-Water Jetty",
    category: "Luxury Villas",
    location: "Banana Island",
    address: "Zone A, Ocean Parade Way, Banana Island, Ikoyi, Lagos",
    status: "Ready for Handover",
    beds: 5,
    baths: 6,
    size: 850,
    price: 1_250_000_000,
    usdPrice: 835_000,
    gbpPrice: 650_000,
    titleDeed: "Federal Certificate of Occupancy (Federal C of O) & Governor's Consent",
    image: "/assets/villa.jpg",
    gallery: ["/assets/villa.jpg", "/assets/hero.jpg", "/assets/suite2.jpg", "/assets/consultation.jpg", "/assets/suite1.jpg"],
    amenities: [
      "Private 24ft Deep-Water Jetty",
      "22-Metre Heated Infinity Pool",
      "Private 12-Seat Dolby Atmos Cinema",
      "ThyssenKrupp 6-Person Glass Elevator",
      "40kVA Hybrid Solar & Lithium Storage Grid",
      "En-Suite Maid & Chauffeur Quarters (2 Rooms)",
      "Poliform Italian Fitted Chef's Kitchen",
      "24/7 Monitored Biometric Access Control"
    ],
    summary: "A sculpted white villa on the lagoon edge with floor-to-ceiling glazing, a private jetty and a 22-metre infinity pool.",
    description: "Conceived as an architectural sanctuary where water, light, and geometry converse. The Grand Azure occupies one of the rare deep-water frontages of Banana Island, engineered with Eurocode seismic-resistant foundation piling and floor-to-ceiling Schuco solar-acoustic glazing. Every detail—from the open-concept marble salon to the private wellness spa—is crafted for generational preservation.",
    completionDate: "Immediate Handover",
    highlights: [
      { label: "Gross Floor Area", value: "850 m²" },
      { label: "Covered Parking", value: "6 Luxury Vehicles" },
      { label: "Power Autonomy", value: "100% 24/7 Solar Grid" },
      { label: "Land Title", value: "Federal C of O" }
    ],
    floorPlans: [
      {
        level: "Ground Floor",
        name: "Grand Salon & Waterfront Terrace",
        sqm: 340,
        description: "Double-height living pavilion opening directly to the infinity deck, dry kitchen, formal dining for 14, and garden court.",
        rooms: ["Formal Salon (85m²)", "Show Kitchen & Scullery", "Guest Suite I", "Cinema Lounge", "Staff Wing"]
      },
      {
        level: "First Floor",
        name: "Private Family Suite & Terraces",
        sqm: 290,
        description: "Three en-suite private bedrooms, sound-insulated study room, and cantilevered sunset family terrace.",
        rooms: ["Junior Master Suite", "Suite III & IV", "Family Gallery Lounge", "Private Office"]
      },
      {
        level: "Penthouse Suite",
        name: "Master Sanctuary & Rooftop Spa",
        sqm: 220,
        description: "Entire floor reserved for the primary suite with private plunge pool, his-and-hers dressing room, and outdoor fireplace.",
        rooms: ["Primary Bedroom (72m²)", "Bespoke Italian Dressing Room", "Lagoon-View Spa Bath", "Sky Terrace"]
      }
    ],
    travelTimes: [
      { place: "Banana Island Marina & Helipad", time: "3 Mins" },
      { place: "Lekki-Ikoyi Link Bridge", time: "8 Mins" },
      { place: "Victoria Island Financial Core", time: "14 Mins" },
      { place: "Murtala Muhammed Int'l Airport", time: "38 Mins" }
    ]
  },
  {
    id: "sovereign",
    slug: "sovereign-smart-penthouse",
    title: "The Sovereign Smart Penthouse",
    tagline: "Full-Floor Sky Sanctuary with 270° Atlantic Ocean Panorama",
    category: "Waterfront Penthouses",
    location: "Eko Atlantic",
    address: "Marina District, Tower 2, Eko Atlantic City, Lagos",
    status: "Off-Plan",
    beds: 4,
    baths: 5,
    size: 650,
    price: 850_000_000,
    usdPrice: 565_000,
    gbpPrice: 440_000,
    titleDeed: "Eko Atlantic Free Zone C of O / Governor's Consent",
    image: "/assets/penthouse.jpg",
    gallery: ["/assets/penthouse.jpg", "/assets/suite1.jpg", "/assets/towers.jpg", "/assets/hero.jpg"],
    amenities: [
      "Wraparound 180m² Sky Sunset Terrace",
      "KNX Full Smart Home Automation (Lighting, Climate, Blinds)",
      "Dedicated High-Speed Private Lift with Keycard Access",
      "Temperature-Controlled 400-Bottle Wine Cellar",
      "24/7 Eko Atlantic City Independent Clean Power",
      "Residents' Executive Marina Club & Yacht Berths"
    ],
    summary: "Full-floor penthouse above the Atlantic with 270° ocean views and a fully automated smart-home system.",
    description: "Rising high above the Great Wall of Lagos, The Sovereign Penthouse commands unobstructed panoramic views of the Atlantic Ocean and the vibrant city skyline. Designed with wide column-free living expanses, double-glazed insulated envelope, and European engineered timber finishes.",
    completionDate: "Q3 2026",
    highlights: [
      { label: "Internal Area", value: "650 m²" },
      { label: "Private Terrace", value: "180 m²" },
      { label: "Expected Yield", value: "13.8% p.a." },
      { label: "City Services", value: "Eko Free Zone" }
    ],
    floorPlans: [
      {
        level: "Level 24",
        name: "Full Sky Residence",
        sqm: 650,
        description: "Entire 24th floor featuring expansive entertaining galleria, primary ocean-view suite, 3 VIP bedrooms, and wraparound terrace.",
        rooms: ["Ocean Grand Room", "Show Bar & Kitchen", "Primary Suite with Dual Walk-in", "3 Guest Suites", "Private Lift Foyer"]
      }
    ],
    travelTimes: [
      { place: "Eko Atlantic Yacht Club", time: "2 Mins" },
      { place: "Ahmadu Bello Way (Victoria Island)", time: "5 Mins" },
      { place: "Ikoyi Club 1938", time: "12 Mins" }
    ]
  },
  {
    id: "obsidian",
    slug: "obsidian-contemporary-terrace",
    title: "The Obsidian Contemporary Terrace",
    tagline: "Gated Mews Living with Rooftop Garden in Prime Lekki Phase 1",
    category: "Smart Terraces",
    location: "Lekki Phase 1",
    address: "Off Admiralty Way, Lekki Phase 1, Lagos",
    status: "Ready for Handover",
    beds: 4,
    baths: 5,
    size: 420,
    price: 450_000_000,
    usdPrice: 300_000,
    gbpPrice: 235_000,
    titleDeed: "Lagos State Certificate of Occupancy (C of O)",
    image: "/assets/terrace.jpg",
    gallery: ["/assets/terrace.jpg", "/assets/suite2.jpg", "/assets/suite1.jpg", "/assets/villa.jpg"],
    amenities: [
      "Exclusive 8-Unit Gated Mews Community",
      "Private Astroturf Rooftop Sky Lounge & BBQ",
      "Dedicated 22kW Fast EV Vehicle Charger",
      "Siemens Fitted Kitchen with Quartz Countertops",
      "20kVA Hybrid Solar Inverter System",
      "Integrated Perimeter Infrared Surveillance"
    ],
    summary: "Charcoal-clad terraces in a gated mews, finished with walnut joinery and a private rooftop lounge.",
    description: "An intimate enclave of dark-charcoal basalt architectural terraces nestled just steps from Admiralty Way. Combining the privacy of a townhouse with the convenience and security of a modern smart gated community.",
    completionDate: "Ready for Handover",
    highlights: [
      { label: "Built-up Space", value: "420 m²" },
      { label: "Levels", value: "3 Floors + Sky Deck" },
      { label: "Solar Storage", value: "20 kWh Lithium" },
      { label: "Location", value: "Lekki Prime" }
    ],
    floorPlans: [
      {
        level: "Ground & Level 1",
        name: "Living, Dining & Suites",
        sqm: 260,
        description: "Living area with 3.2m ceiling height, imported kitchen, and two guest rooms.",
        rooms: ["Reception", "Kitchen", "Guest Suite", "Maid Room"]
      },
      {
        level: "Level 2 & Rooftop",
        name: "Master Suite & Sky Terrace",
        sqm: 160,
        description: "Master sanctuary with skylight bathroom and walkout to open-air rooftop lounge.",
        rooms: ["Master Bedroom", "Dressing Room", "Rooftop BBQ Pavilion"]
      }
    ],
    travelTimes: [
      { place: "Admiralty Way Waterfront Restaurants", time: "2 Mins" },
      { place: "Lekki-Ikoyi Toll Gate", time: "4 Mins" },
      { place: "Victoria Island", time: "10 Mins" }
    ]
  },
  {
    id: "noir",
    slug: "maison-noir-lagoon-residence",
    title: "Maison Noir Lagoon Residence",
    tagline: "Ultra-Prime Waterfront Estate on Ikoyi's Southern Shore",
    category: "Luxury Villas",
    location: "Ikoyi",
    address: "Alexander Avenue, Old Ikoyi, Lagos",
    status: "Off-Plan",
    beds: 6,
    baths: 7,
    size: 980,
    price: 1_600_000_000,
    usdPrice: 1_070_000,
    gbpPrice: 830_000,
    titleDeed: "Lagos State Governor's Consent / Clean Freehold Root",
    image: "/assets/hero.jpg",
    gallery: ["/assets/hero.jpg", "/assets/villa.jpg", "/assets/suite2.jpg", "/assets/consultation.jpg"],
    amenities: [
      "120ft Direct Lagoon Water Frontage",
      "Private Wellness Wing with Turkish Hammam & Sauna",
      "Wine Tasting Lounge with Sub-Zero Preservation",
      "Commercial TechnoGym Fitness Facility",
      "Private Boat Dock with Jet-Ski Launchers",
      "Clean-Energy Solar Microgrid with 60kWh Storage"
    ],
    summary: "An obsidian-stone residence on Ikoyi's lagoon with dusk-lit terraces and a resort-grade spa wing.",
    description: "Maison Noir represents the zenith of contemporary tropical architecture in Old Ikoyi. Characterized by monolithic basalt volumes, reflecting pools, and floor-to-ceiling glass pavilions opening onto the tranquil lagoon.",
    completionDate: "Q4 2026",
    highlights: [
      { label: "Plot Area", value: "1,450 m²" },
      { label: "Built Area", value: "980 m²" },
      { label: "Private Waterfront", value: "36 Metres" },
      { label: "Staff Accommodation", value: "3 Self-Contained" }
    ],
    floorPlans: [
      {
        level: "Ground Pavilion",
        name: "Water Courtyard & State Rooms",
        sqm: 480,
        description: "Dramatic cantilevered entrance leading to water court, formal salons, and state dining pavilion.",
        rooms: ["Water Lounge", "State Dining Room", "Chef Kitchen", "Wine Cellar", "Hammam Spa"]
      },
      {
        level: "Upper Sanctuary",
        name: "Private Chambers & Master Suite",
        sqm: 500,
        description: "5 opulent en-suite suites including presidential master wing with private outdoor terrace.",
        rooms: ["Presidential Master Wing", "4 Junior Suites", "Private Library", "Gymnasium"]
      }
    ],
    travelTimes: [
      { place: "Ikoyi Club 1938 Golf Course", time: "4 Mins" },
      { place: "Bourdillon Road", time: "3 Mins" },
      { place: "Banana Island Gate", time: "7 Mins" }
    ]
  },
  {
    id: "crest",
    slug: "lagoon-crest-sky-duplex",
    title: "Lagoon Crest Sky Duplex",
    tagline: "Double-Height Architectural Wonder with Private Helipad Access",
    category: "Waterfront Penthouses",
    location: "Ikoyi",
    address: "Kingsway Corridor, Ikoyi, Lagos",
    status: "Off-Plan",
    beds: 4,
    baths: 5,
    size: 560,
    price: 720_000_000,
    usdPrice: 480_000,
    gbpPrice: 375_000,
    titleDeed: "Federal C of O / Governor's Consent",
    image: "/assets/towers.jpg",
    gallery: ["/assets/towers.jpg", "/assets/penthouse.jpg", "/assets/suite1.jpg", "/assets/hero.jpg"],
    amenities: [
      "7-Metre Double-Height Glass Salon",
      "Direct Private Marina & Helipad Access",
      "Private Sky Terrace with Heated Dipping Pool",
      "Exclusive Residents' Club & Cigar Lounge",
      "Daikin Central Inverter HVAC System",
      "100% Guaranteed 24/7 Redundant Power"
    ],
    summary: "A double-height sky duplex within the Lagoon Crest Towers, with direct marina and helipad access.",
    description: "Suspended between water and sky, the Lagoon Crest Sky Duplex delivers double-height vertical volume with uninterrupted views toward the Lagos lagoon. Featuring custom Italian marble flooring and intelligent KNX home automation.",
    completionDate: "Q2 2027",
    highlights: [
      { label: "Ceiling Height", value: "7.0 Metres" },
      { label: "Floor Level", value: "Floors 18 & 19" },
      { label: "Parking", value: "4 Underground Bays" },
      { label: "Project Status", value: "Under Construction" }
    ],
    travelTimes: [
      { place: "Southern Sun Ikoyi", time: "3 Mins" },
      { place: "Falomo Roundabout", time: "5 Mins" },
      { place: "Victoria Island", time: "8 Mins" }
    ]
  },
  {
    id: "onyx",
    slug: "onyx-garden-terrace",
    title: "The Onyx Garden Terrace",
    tagline: "Landscaped Contemporary Townhomes in Serene Lekki Phase 1",
    category: "Smart Terraces",
    location: "Lekki Phase 1",
    address: "Off Freedom Way, Lekki Phase 1, Lagos",
    status: "Ready for Handover",
    beds: 4,
    baths: 4,
    size: 380,
    price: 385_000_000,
    usdPrice: 260_000,
    gbpPrice: 200_000,
    titleDeed: "Lagos State C of O",
    image: "/assets/suite1.jpg",
    gallery: ["/assets/suite1.jpg", "/assets/terrace.jpg", "/assets/suite2.jpg", "/assets/villa.jpg"],
    amenities: [
      "Private Landscaped Zen Garden",
      "Smart Biometric & RFID Keyless Entry",
      "Custom Dedicated Work-from-Home Studio",
      "Dedicated Maid's Quarters",
      "Central Industrial Water Purification System",
      "Silent Solar Hybrid Inverter Plant"
    ],
    summary: "Intimate four-bedroom terraces with landscaped gardens, minutes from Admiralty Way.",
    description: "Designed for young executive families and discerning investors seeking strong rental yield. The Onyx terraces deliver a rare balance of private green gardens and low-maintenance smart urban living in prime Lekki.",
    completionDate: "Immediate Handover",
    highlights: [
      { label: "Size", value: "380 m²" },
      { label: "Garden Area", value: "45 m²" },
      { label: "Rental Yield", value: "11.5% Historical" },
      { label: "Handover", value: "Immediate" }
    ],
    travelTimes: [
      { place: "The Palms Shopping Mall", time: "6 Mins" },
      { place: "Admiralty Way Hub", time: "3 Mins" },
      { place: "Lekki-Ikoyi Link", time: "5 Mins" }
    ]
  },
  {
    id: "lumina",
    slug: "the-lumina-marina-mansion",
    title: "The Lumina Marina Mansion",
    tagline: "Grand Monolithic Waterfront Compound with Triple Private Mooring",
    category: "Luxury Villas",
    location: "Victoria Island",
    address: "Cowrie Creek Waterfront, Victoria Island, Lagos",
    status: "Off-Plan",
    beds: 6,
    baths: 7,
    size: 1120,
    price: 2_100_000_000,
    usdPrice: 1_400_000,
    gbpPrice: 1_100_000,
    titleDeed: "Lagos State Governor's Consent / Federal C of O",
    image: "/assets/villa.jpg",
    gallery: ["/assets/villa.jpg", "/assets/hero.jpg", "/assets/suite2.jpg", "/assets/towers.jpg"],
    amenities: [
      "Triple Deep-Water Private Boat Mooring",
      "25m Heated Infinity Pool & Sunken Firepit",
      "Sub-Zero Commercial Catering Kitchen & Cold Room",
      "Commercial 8-Stop Otis Elevator",
      "60kVA Clean Solar & Battery Hybrid Grid",
      "Integrated Armed Security Gatehouse & Panic Vault"
    ],
    summary: "A basalt and travertine architectural masterwork featuring private dockage, heated infinity lap pool, and bespoke wine vault.",
    description: "The Lumina Marina Mansion is an ultra-exclusive waterfront sanctuary fronting Cowrie Creek in Victoria Island. Designed with monumental basalt stone elevations, cantilevered glass lounges, and direct open-water access for 50ft yachts.",
    completionDate: "Q1 2027",
    highlights: [
      { label: "Waterfront Slip", value: "3 Yacht Slips" },
      { label: "Gross Built Area", value: "1,120 m²" },
      { label: "Solar Autonomy", value: "60 kWh Battery" },
      { label: "Handover Target", value: "Q1 2027" }
    ]
  },
  {
    id: "maitama",
    slug: "maitama-diplomatic-sky-residence",
    title: "The Maitama Diplomatic Sky Residence",
    tagline: "Bespoke Sky Estate Overlooking the Aso Rock & Diplomatic Enclave",
    category: "Waterfront Penthouses",
    location: "Abuja (Maitama)",
    address: "Gana Street Diplomatic Quarter, Maitama, Abuja",
    status: "Ready for Handover",
    beds: 5,
    baths: 6,
    size: 780,
    price: 1_450_000_000,
    usdPrice: 970_000,
    gbpPrice: 750_000,
    titleDeed: "FCT Minister's Statutory Certificate of Occupancy",
    image: "/assets/penthouse.jpg",
    gallery: ["/assets/penthouse.jpg", "/assets/suite1.jpg", "/assets/towers.jpg", "/assets/hero.jpg"],
    amenities: [
      "Panoramic 360° Views of Abuja Green Rolling Hills",
      "Schuco Ballistic-Grade Acoustic Glazing",
      "Private High-Speed Biometric Lift to Foyer",
      "Indoor Heated Hydrotherapy Plunge Pool",
      "Dedicated 30kVA Rooftop Solar Array",
      "Full KNX Automation with Remote Global Telemetry"
    ],
    summary: "Floor-to-ceiling Schuco solar glass with 360-degree views of Abuja green hills, biometric high-speed elevator, and ballistic security glass.",
    description: "Positioned on the highest point of Maitama, this diplomatic sky residence affords sovereign-grade discretion and breathtaking vistas over the federal capital. Finished in bookmatched Calacatta marble and acoustic timber paneling.",
    completionDate: "Immediate Handover",
    highlights: [
      { label: "Living Space", value: "780 m²" },
      { label: "Sky Terrace", value: "140 m²" },
      { label: "Title Root", value: "Statutory FCT C of O" },
      { label: "Handover", value: "Immediate" }
    ]
  },
  {
    id: "guzape",
    slug: "guzape-cascades-smart-terraces",
    title: "The Guzape Cascades Smart Terraces",
    tagline: "Terraced Hilltop Townhomes with Hanging Gardens & Solar Microgrid",
    category: "Smart Terraces",
    location: "Abuja (Guzape)",
    address: "Asokoro Extension Ridge, Guzape Hills, Abuja",
    status: "Off-Plan",
    beds: 4,
    baths: 5,
    size: 450,
    price: 420_000_000,
    usdPrice: 280_000,
    gbpPrice: 218_000,
    titleDeed: "FCTA Statutory Certificate of Occupancy",
    image: "/assets/terrace.jpg",
    gallery: ["/assets/terrace.jpg", "/assets/suite2.jpg", "/assets/villa.jpg", "/assets/suite1.jpg"],
    amenities: [
      "Cascading Tiered Architecture Built into Natural Granite",
      "Private Rooftop Heated Jacuzzi with Sunset Views",
      "Direct 22kW Electric Vehicle Charging Ports",
      "Poliform Custom Italian Cabinetry & Kitchen",
      "Silent In-House Solar Hybrid Backup Inverter",
      "24/7 Gated Perimeter with Drone Patrol System"
    ],
    summary: "Tiered multi-level contemporary homes engineered into the granite ridge of Guzape with private plunge pools.",
    description: "A rare architectural blend of organic hillside topography and crisp European minimalism. Each terrace offers dual living salons, green cantilevered balconies, and high-efficiency climate automation.",
    completionDate: "Q4 2026",
    highlights: [
      { label: "Townhome Area", value: "450 m²" },
      { label: "Balcony Deck", value: "65 m²" },
      { label: "Energy Source", value: "100% Clean Solar" },
      { label: "Handover", value: "December 2026" }
    ]
  },
  {
    id: "atlantic",
    slug: "atlantic-horizons-sky-villa",
    title: "The Atlantic Horizons Sky Villa",
    tagline: "Panoramic Sky Sanctuary with Sunset Marina Terrace",
    category: "Waterfront Penthouses",
    location: "Eko Atlantic",
    address: "Ocean Boulevard, Tower 1, Eko Atlantic City, Lagos",
    status: "Ready for Handover",
    beds: 4,
    baths: 5,
    size: 610,
    price: 920_000_000,
    usdPrice: 615_000,
    gbpPrice: 480_000,
    titleDeed: "Eko Atlantic Free Zone C of O / Governor's Consent",
    image: "/assets/towers.jpg",
    gallery: ["/assets/towers.jpg", "/assets/penthouse.jpg", "/assets/hero.jpg", "/assets/suite1.jpg"],
    amenities: [
      "Direct Atlantic Ocean & Eko Atlantic Marina Panoramas",
      "Double-Height Glass Living Pavilion (6.2m)",
      "Dedicated Private Marina Yacht Berth Allocation",
      "Floor-Level Private Service Quarters",
      "24/7 Uninterrupted Free-Zone Clean Power Grid",
      "Residents' Sky Club with Infinity Edge Pool"
    ],
    summary: "High-floor glass pavilion suspended above the Atlantic shoreline with private marina berthing rights.",
    description: "Floating high above the Atlantic shoreline, this duplex sky villa combines massive glazed heights with an open terrace engineered for oceanic sea breezes and spectacular dusk sunsets.",
    completionDate: "Immediate Handover",
    highlights: [
      { label: "Built-up Space", value: "610 m²" },
      { label: "Ceiling Height", value: "6.2 Metres" },
      { label: "Berth Rights", value: "Included in Deed" },
      { label: "Handover", value: "Immediate" }
    ]
  },
  {
    id: "sanctuary",
    slug: "ikoyi-sanctuary-mews",
    title: "The Ikoyi Sanctuary Mews",
    tagline: "Discreet Gated Enclave of 6 Bespoke Low-Rise Architectural Homes",
    category: "Smart Terraces",
    location: "Ikoyi",
    address: "Cooper Road / Lugard Avenue, Old Ikoyi, Lagos",
    status: "Off-Plan",
    beds: 4,
    baths: 5,
    size: 410,
    price: 580_000_000,
    usdPrice: 390_000,
    gbpPrice: 305_000,
    titleDeed: "Federal C of O with Governor's Consent",
    image: "/assets/suite1.jpg",
    gallery: ["/assets/suite1.jpg", "/assets/terrace.jpg", "/assets/villa.jpg", "/assets/hero.jpg"],
    amenities: [
      "Private Lush Landscaped Courtyard with Reflecting Water Wall",
      "Custom Italian Joinery & Kitchen by Dada Ateliers",
      "Complete Bang & Olufsen In-Wall Multi-Room Audio",
      "Private Underground Parking for 3 Cars",
      "Clean Energy Solar Microgrid with 30kWh Lithium Bank",
      "Direct Concierge Link to Ikoyi Club 1938"
    ],
    summary: "Finished with imported Italian walnut cabinetry, silent lithium microgrid, and private landscaped courtyard.",
    description: "Nestled within the mature canopy of Old Ikoyi, The Sanctuary Mews offers peerless residential seclusion. Built with sustainable insulated concrete forms, handcrafted stone screens, and smart zoned cooling.",
    completionDate: "Q3 2026",
    highlights: [
      { label: "Internal Area", value: "410 m²" },
      { label: "Courtyard Garden", value: "50 m²" },
      { label: "Title Heritage", value: "Federal C of O" },
      { label: "Handover", value: "September 2026" }
    ]
  },
  {
    id: "manor",
    slug: "banana-island-presidential-manor",
    title: "The Banana Island Presidential Manor",
    tagline: "Palatial Waterfront Compound with Helipad & Subterranean 8-Car Garage",
    category: "Luxury Villas",
    location: "Banana Island",
    address: "Ocean Parade Extension, Banana Island, Ikoyi, Lagos",
    status: "Ready for Handover",
    beds: 7,
    baths: 8,
    size: 1350,
    price: 2_800_000_000,
    usdPrice: 1_870_000,
    gbpPrice: 1_450_000,
    titleDeed: "Federal Certificate of Occupancy & Governor's Consent",
    image: "/assets/hero.jpg",
    gallery: ["/assets/hero.jpg", "/assets/villa.jpg", "/assets/towers.jpg", "/assets/suite2.jpg"],
    amenities: [
      "FAA-Compliant Private Helipad Pad Access",
      "Subterranean Climate-Controlled 8-Vehicle Gallery",
      "Olympic 25m Heated Lagoon-View Infinity Pool",
      "Private 20-Seat Dolby Cinema & Executive Boardroom",
      "100kVA Clean Solar-Lithium Independent Microgrid",
      "Dual Staff Apartments & Chauffeur Waiting Quarters"
    ],
    summary: "The crowning private residence of Banana Island with Olympic infinity edge pool, commercial chef's kitchen, and 24-seat private cinema.",
    description: "An estate of unmatched imperial proportions occupying a commanding waterfront peninsula on Banana Island. Engineered for high-profile principals requiring uncompromised security, diplomatic entertaining facilities, and supreme tranquility.",
    completionDate: "Immediate Handover",
    highlights: [
      { label: "Total Built Area", value: "1,350 m²" },
      { label: "Land Extent", value: "2,200 m²" },
      { label: "Subterranean Parking", value: "8 Bays" },
      { label: "Handover Status", value: "Immediate" }
    ]
  },
  {
    id: "opposite-whitesand-residence",
    slug: "opposite-whitesand-beach-estate-residences",
    title: "Opposite Whitesand Beach Estate",
    tagline: "5-Bedroom Luxury Duplexes with Cinema Room & Solar Power in Ologolo, Lekki",
    category: "Smart Terraces",
    location: "Lekki (Ologolo)",
    address: "Opposite Whitesand Beach Estate, Ologolo, Lekki, Lagos",
    status: "Ready for Handover",
    beds: 5,
    baths: 6,
    size: 520,
    price: 245_000_000,
    usdPrice: 165_000,
    gbpPrice: 130_000,
    titleDeed: "Governor's Consent & Lagos State Approved Survey Plan",
    image: "/assets/whitesand-1.jpg",
    gallery: [
      "/assets/whitesand-1.jpg",
      "/assets/whitesand-2.jpg",
      "/assets/whitesand-3.jpg",
      "/assets/whitesand-4.jpg"
    ],
    amenities: [
      "5-Bedroom Fully & Semi-Detached Luxury Duplexes",
      "All Bedrooms En-Suite with Walk-in Closets",
      "Exclusive Master Lounge & Cantilevered Balcony",
      "Fully Fitted Gourmet Chef's Kitchen",
      "Private Sound-Insulated Cinema Room",
      "Expansive Family Lounge on Upper Level",
      "24/7 Redundant Power Supply Grid",
      "Solar Panels & High-Capacity Hybrid Inverter",
      "Ample Multi-Car Parking Driveway",
      "Dedicated Gatehouse & Security House",
      "Self-Contained Staff Quarters (BQ)",
      "Immediate Proximity to Lekki-Epe Expressway"
    ],
    summary: "5-bedroom fully and semi-detached luxury duplexes featuring private cinema, master lounge, fitted kitchen, and solar inverter.",
    description: "Situated directly opposite the prestigious Whitesand Beach Estate in prime Ologolo, Lekki. Designed for modern executive families demanding elegance, security, and effortless connectivity to the Lekki-Epe Expressway corridor.",
    completionDate: "Ready for Handover",
    highlights: [
      { label: "Configuration", value: "5 En-Suite Bedrooms" },
      { label: "Entertainment", value: "Private Cinema Room" },
      { label: "Power System", value: "24/7 Solar & Inverter" },
      { label: "Staff Wing", value: "En-Suite BQ Included" }
    ]
  },
  {
    id: "fatai-bankole-residence",
    slug: "fatai-bankole-luxury-residences",
    title: "Fatai Bankole Residences",
    tagline: "5-Bedroom Detached Homes with Madam's Jacuzzi Suite in Aro-Ologolo",
    category: "Smart Terraces",
    location: "Lekki (Aro-Ologolo)",
    address: "Fatai Bankole Street, Aro-Ologolo, Lekki, Lagos",
    status: "Ready for Handover",
    beds: 5,
    baths: 6,
    size: 550,
    price: 260_000_000,
    usdPrice: 175_000,
    gbpPrice: 138_000,
    titleDeed: "Lagos State Certificate of Occupancy & Governor's Consent",
    image: "/assets/fatai-bankole-1.jpg",
    gallery: [
      "/assets/fatai-bankole-1.jpg",
      "/assets/fatai-bankole-2.jpg",
      "/assets/fatai-bankole-3.jpg",
      "/assets/fatai-bankole-4.jpg"
    ],
    amenities: [
      "5-Bedroom Semi-Detached & Fully Detached Homes",
      "Primary Master Bedroom Sanctuary",
      "Madam's Bedroom with Luxury Hydrotherapy Jacuzzi",
      "Two Dedicated Children's Rooms with En-Suite Baths",
      "Executive Ground-Floor Guest Room",
      "All Bedrooms Fully En-Suite",
      "Modern Open-Concept Living & Formal Dining",
      "Fully Fitted Contemporary Italian Kitchen",
      "Solar Panels & Pure Sine Wave Inverter System",
      "Central Industrial Water Treatment Plant",
      "24/7 Clean Uninterrupted Electricity",
      "Dedicated Covered Parking for 4 Cars",
      "Fortified Security House & Automated Access"
    ],
    summary: "Architectural 5-bedroom detached homes with master suite, Madam's jacuzzi bedroom, 2 children's rooms, guest room, and solar power.",
    description: "An exceptional family enclave on Fatai Bankole Street in Aro-Ologolo, Lekki. Boasting dedicated master and Madam's wings with hydrotherapy jacuzzi, two children's rooms, guest quarters, water treatment plant, and 24/7 power.",
    completionDate: "Ready for Handover",
    highlights: [
      { label: "Layout", value: "5 Beds · 6 Baths" },
      { label: "Luxury Bath", value: "Hydrotherapy Jacuzzi" },
      { label: "Water Quality", value: "Industrial Treatment" },
      { label: "Security", value: "Gated Guardhouse" }
    ]
  },
  {
    id: "white-oaks-residence",
    slug: "white-oaks-estate-residences",
    title: "White Oaks Estate",
    tagline: "14 Contemporary Enclave Residences in Aro-Ologolo, Lekki",
    category: "Smart Terraces",
    location: "Lekki (Aro-Ologolo)",
    address: "White Oaks Enclave, Aro-Ologolo, Lekki, Lagos",
    status: "Ready for Handover",
    beds: 5,
    baths: 6,
    size: 540,
    price: 255_000_000,
    usdPrice: 170_000,
    gbpPrice: 135_000,
    titleDeed: "Governor's Consent C of O / Freehold Root of Title",
    image: "/assets/white-oaks-1.jpg",
    gallery: [
      "/assets/white-oaks-1.jpg",
      "/assets/white-oaks-2.jpg",
      "/assets/white-oaks-3.jpg",
      "/assets/white-oaks-4.jpg"
    ],
    amenities: [
      "14 Contemporary Luxury Gated Enclave Homes",
      "5 En-Suite Bedrooms with Modern Sanitaryware",
      "Madam's Bedroom with Hydrotherapy Jacuzzi",
      "Two Children's En-Suite Bedrooms & Guest Wing",
      "Fully Fitted Modern Kitchen with Quartz Finishes",
      "Solar Panels & Hybrid Inverter Clean Storage",
      "Central Water Treatment & Filtration Facility",
      "24/7 Redundant Clean Electricity",
      "Private Covered Parking Spaces",
      "Security Gatehouse & Perimeter Surveillance Grid"
    ],
    summary: "14 contemporary gated homes featuring 5 en-suite bedrooms, Madam's jacuzzi suite, solar power, and water treatment.",
    description: "A private residential enclave of 14 homes in Aro-Ologolo, Lekki. Engineered with modern aesthetics, clean solar energy, treated water, and family-oriented floorplans with private security.",
    completionDate: "Ready for Handover",
    highlights: [
      { label: "Community", value: "14 Private Units" },
      { label: "Bedrooms", value: "5 En-Suite Rooms" },
      { label: "Clean Power", value: "24/7 Solar Grid" },
      { label: "Water", value: "Potable Filtration" }
    ]
  },
  {
    id: "olufemi-olatunji-residence",
    slug: "olufemi-olatunji-residences-osapa",
    title: "Olufemi Olatunji Residences",
    tagline: "9 Fully Detached & Semi-Detached Luxury Apartments on 2,100 sqm in Osapa",
    category: "Smart Terraces",
    location: "Lekki (Osapa)",
    address: "Olufemi Olatunji Street, Osapa, Lekki, Lagos",
    status: "Ready for Handover",
    beds: 4,
    baths: 5,
    size: 480,
    price: 235_000_000,
    usdPrice: 158_000,
    gbpPrice: 125_000,
    titleDeed: "Governor's Consent C of O Verified",
    image: "/assets/olufemi-olatunji-1.jpg",
    gallery: [
      "/assets/olufemi-olatunji-1.jpg",
      "/assets/olufemi-olatunji-2.jpg",
      "/assets/olufemi-olatunji-3.jpg",
      "/assets/olufemi-olatunji-4.jpg"
    ],
    amenities: [
      "9 Fully Detached & Semi-Detached Luxury Homes",
      "Expansive 2,100 sqm Secured Property Compound",
      "All Bedrooms En-Suite with Contemporary Bathrooms",
      "Modern Open Living Room with European High-End Fittings",
      "Solar Panels & Clean Battery Inverter Backup",
      "Centralized Water Treatment Plant",
      "24/7 Guaranteed Continuous Power",
      "Dedicated Covered Parking Bays",
      "Fortified Security House & CCTV Monitoring",
      "Immediate Access to Circle Mall, Healthcare & Fine Dining"
    ],
    summary: "9 boutique apartments on a 2,100 sqm compound in Osapa with en-suite rooms, high-end fittings, solar power, and water treatment.",
    description: "Set across a 2,100 sqm prime land parcel in Osapa, Lekki. Comprising 9 fully and semi-detached homes with European fittings, 24/7 power, high-pressure water treatment, and minutes to premier commercial hubs.",
    completionDate: "Ready for Handover",
    highlights: [
      { label: "Land Parcel", value: "2,100 m² Compound" },
      { label: "Total Units", value: "9 Residences" },
      { label: "Bedrooms", value: "4 En-Suite Beds" },
      { label: "Neighborhood", value: "Osapa, Lekki" }
    ]
  },
  {
    id: "nigson-villa-residence",
    slug: "nigson-villa-banana-island-residences",
    title: "Nigson Villa Banana Island",
    tagline: "8 Palatial 2 & 3-Bedroom Apartments with Pool & Reverse Osmosis in Banana Island",
    category: "Luxury Villas",
    location: "Banana Island",
    address: "Zone A, Ocean Parade, Banana Island, Ikoyi, Lagos",
    status: "Ready for Handover",
    beds: 3,
    baths: 4,
    size: 420,
    price: 850_000_000,
    usdPrice: 570_000,
    gbpPrice: 445_000,
    titleDeed: "Federal Certificate of Occupancy & Governor's Consent",
    image: "/assets/banana-1.jpg",
    gallery: [
      "/assets/banana-1.jpg",
      "/assets/banana-2.jpg",
      "/assets/banana-3.jpg",
      "/assets/banana-4.jpg"
    ],
    amenities: [
      "8 Exclusive Units in Prestigious Banana Island",
      "Spacious 2-Bedroom & 3-Bedroom Floorplans",
      "Designer Bathrooms with Visitor's Toilet",
      "Contemporary Luxury European Interiors",
      "Self-Contained Staff Quarters (BQ) per Residence",
      "24/7 Continuous Clean Power Grid",
      "High-Level Armed Security & Biometric Access",
      "Ample Multi-Car Covered Parking",
      "Industrial Reverse Osmosis Pure Water System",
      "Serene Landscaped Tropical Environment",
      "Residents' Swimming Pool & Sunbathing Terrace",
      "Prestigious Banana Island Waterfront Location"
    ],
    summary: "8 luxury 2 and 3-bedroom residences in Banana Island with swimming pool, reverse osmosis water, 24/7 power, and BQ.",
    description: "An architectural landmark of 8 luxury apartments occupying one of the most prestigious positions on Banana Island. Featuring swimming pool, reverse osmosis water purification, 24/7 power, BQ, and round-the-clock armed security.",
    completionDate: "Ready for Handover",
    highlights: [
      { label: "Location", value: "Banana Island, Lagos" },
      { label: "Total Units", value: "8 Apartments" },
      { label: "Amenities", value: "Pool & RO Water" },
      { label: "Power", value: "24/7 Redundant Grid" }
    ]
  }
];

export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  location: string;
  image: string;
  renderings: string[];
  roi: number;
  progress: number;
  handover: string;
  units: string;
  unitCount?: number;
  status: string; // e.g. "Completed & Sold Out" | "Completed" | "Shortlet" | "Under Construction" | "Ongoing"
  statusType?: 'completed' | 'ongoing';
  landArea: string;
  category: string; // "Construction" | "Property Management" | "Short Stay" | "Master-Planned Community"
  description: string;
  features: string[];
  milestones: { title: string; date: string; progress: number; status: "Completed" | "In Progress" | "Scheduled" }[];
  phases: { name: string; status: "Sold Out" | "Selling Fast" | "Coming Soon"; units: string; priceFrom: number }[];
  metrics: { label: string; value: string }[];
  homeSize?: string;
  bedroomsDetail?: { name: string; desc?: string }[];
  bathroomsDetail?: string[];
  livingSpaceDetail?: string[];
  amenitiesDetail?: string[];
  outdoorDetail?: string[];
  neighborhoodDetail?: string[];
  driveLink?: string;
}

export const projects: Project[] = [
  // 1. Opposite Whitesand Beach Estate (Completed & Sold Out - Construction)
  {
    id: "opposite-whitesand",
    slug: "opposite-whitesand-beach-estate",
    name: "Opposite Whitesand Beach Estate",
    tagline: "Luxurious Modern 5-Bedroom Fully and Semi-Detached Duplex in Ologolo, Lekki, Lagos",
    location: "Opposite Whitesand Beach Estate, Ologolo, Lekki",
    image: "/assets/whitesand-1.jpg",
    renderings: [
      "/assets/whitesand-1.jpg",
      "/assets/whitesand-2.jpg",
      "/assets/whitesand-3.jpg",
      "/assets/whitesand-4.jpg"
    ],
    roi: 32,
    progress: 100,
    handover: "Completed & Sold Out",
    units: "6 Units",
    unitCount: 6,
    status: "Completed & Sold Out",
    statusType: "completed",
    landArea: "2,400 m²",
    category: "Construction",
    driveLink: "https://drive.google.com/drive/folders/17UIbH-DrYe_SFM28rwVR0d6mKeXzxjWh?usp=drive_link",
    homeSize: "Spacious 5-bedroom fully and semi-detached duplexes",
    bedroomsDetail: [
      { name: "Master Bedroom", desc: "Includes a dedicated Master Lounge for ultimate relaxation." },
      { name: "Madam’s Bedroom", desc: "Designed for premium comfort, luxury, and privacy." },
      { name: "Children’s Bedroom (2)", desc: "Two dedicated, naturally lit children’s bedrooms." },
      { name: "Guest Room", desc: "Separate, private guest accommodation." }
    ],
    bathroomsDetail: [
      "All Rooms Ensuite: Each bedroom features a private luxury bathroom.",
      "Visitor’s Toilet: Added convenience for guests on the ground level."
    ],
    livingSpaceDetail: [
      "Living Room / Dining Area: Spacious, elegant, and filled with natural light.",
      "Fully Fitted Kitchen: Modern appliances including cooker unit, microwave, oven, and heat extractor.",
      "Cinema Room: Designed for family entertainment and media immersion.",
      "Family Lounge: Cozy upstairs area for family relaxation."
    ],
    amenitiesDetail: [
      "24/7 Power Supply: Uninterrupted electricity for comfort.",
      "Solar Panels and Inverter: Reliable alternative clean power source."
    ],
    outdoorDetail: [
      "Driveway / Parking Lot: Sufficient parking spaces for residents and visitors.",
      "Security House: Dedicated fortified post for 24/7 security personnel.",
      "BQ (Boys' Quarters): Additional functional domestic staff space."
    ],
    neighborhoodDetail: [
      "Prime Location: Situated opposite White Sand Beach Estate in Ologolo, offering direct proximity to Lekki-Epe Expressway.",
      "Nearby Lifestyle & Commercial Amenities: Circle Mall, MedPlus Pharmacy, CedarCare Hospital, Domino's Pizza, I-Fitness Gym, Mobil Filling Station, Chicken Republic, Whitesand School, banks, and marts."
    ],
    description: "Opposite White Sand Beach Estate, Aro-Ologolo is a luxurious modern 5-bedroom fully and semi-detached duplex community in Ologolo, Lekki, Lagos. Thoughtfully engineered with a master lounge, cinema room, fitted chef's kitchen, solar microgrid, security house, and BQ. 100% completed and fully sold out.",
    features: [
      "Spacious 5-Bedroom Fully & Semi-Detached Duplexes",
      "Master Suite with Dedicated Master Lounge",
      "Private Cinema Room & Family Lounge",
      "Fully Fitted Kitchen with Cooker, Microwave, Oven & Extractor",
      "24/7 Power Supply with Solar Panels & Inverter System",
      "Driveway Parking, Security House & BQ (Boys' Quarters)"
    ],
    metrics: [
      { label: "Portfolio Status", value: "Completed & Sold Out" },
      { label: "Total Units", value: "6 Units" },
      { label: "Category", value: "Construction" },
      { label: "Location", value: "Ologolo, Lekki" }
    ],
    milestones: [
      { title: "Land Survey & Structural Substructure Piling", date: "Q1 2023", progress: 100, status: "Completed" },
      { title: "Superstructure Frame & Masonry Casting", date: "Q3 2023", progress: 100, status: "Completed" },
      { title: "Turnkey Architectural Finishes & MEP Setup", date: "Q2 2024", progress: 100, status: "Completed" },
      { title: "Commissioning & Resident Handover", date: "Q4 2024", progress: 100, status: "Completed" }
    ],
    phases: [
      { name: "5-Bedroom Duplex Enclave", status: "Sold Out", units: "6 Units", priceFrom: 185_000_000 }
    ]
  },

  // 2. Fatai Bankole (Completed & Sold Out - Construction)
  {
    id: "fatai-bankole",
    slug: "fatai-bankole-residences",
    name: "Fatai Bankole",
    tagline: "7 Units of 5-Bedroom Semi-Detached & Fully Detached in Aro-Ologolo, Lekki",
    location: "Fatai Bankole, Aro-Ologolo, Lekki",
    image: "/assets/fatai-bankole-1.jpg",
    renderings: [
      "/assets/fatai-bankole-1.jpg",
      "/assets/fatai-bankole-2.jpg",
      "/assets/fatai-bankole-3.jpg",
      "/assets/fatai-bankole-4.jpg"
    ],
    roi: 30,
    progress: 100,
    handover: "Completed & Sold Out",
    units: "7 Units",
    unitCount: 7,
    status: "Completed & Sold Out",
    statusType: "completed",
    landArea: "2,800 m²",
    category: "Construction",
    homeSize: "7 units of 5 Bedroom Semi-detached and Fully detached",
    bedroomsDetail: [
      { name: "Master Bedroom", desc: "Spacious primary suite designed for absolute comfort." },
      { name: "Madam’s Bedroom with Jacuzzi", desc: "Private sanctuary fitted with a relaxing hydro-massage Jacuzzi." },
      { name: "Children’s Room (2)", desc: "Two generous ensuite bedrooms for children." },
      { name: "Guest Room", desc: "Dedicated guest accommodation ensuring hospitality." }
    ],
    bathroomsDetail: [
      "All Rooms Ensuite: Private bathroom for each room.",
      "Jacuzzi in Madam’s Bedroom for luxury relaxation."
    ],
    livingSpaceDetail: [
      "Modern living and dining areas crafted with contemporary aesthetics.",
      "Fully Fitted Kitchen with high-grade cabinetry and modern appliances."
    ],
    amenitiesDetail: [
      "Solar Panels and Inverter for continuous clean energy.",
      "Water Treatment Plant providing purified, pressurized water.",
      "24/7 Power Supply guarantee."
    ],
    outdoorDetail: [
      "Driveway / Parking Lot with ample capacity.",
      "Fortified Security House for round-the-clock peace of mind."
    ],
    neighborhoodDetail: [
      "Prime Location near Lekki-Epe Expressway corridor.",
      "Close to essential services, top schools, healthcare, and lifestyle hubs."
    ],
    description: "An architectural development of 7 units of 5-bedroom semi-detached and fully detached luxury homes in Fatai Bankole, Aro-Ologolo, Lekki. Highlights include a Madam's bedroom with Jacuzzi, water treatment plant, solar power grid, and 24/7 security. Delivered on schedule and 100% sold out.",
    features: [
      "7 Units of 5-Bedroom Semi-Detached & Fully Detached",
      "Madam’s Bedroom with Jacuzzi & All Rooms Ensuite",
      "Modern Living & Dining Areas with Fully Fitted Kitchen",
      "Solar Panels, Inverter & Water Treatment Plant",
      "24/7 Power Supply & Security House",
      "Prime Lekki-Epe Expressway Proximity"
    ],
    metrics: [
      { label: "Portfolio Status", value: "Completed & Sold Out" },
      { label: "Total Units", value: "7 Residences" },
      { label: "Category", value: "Construction" },
      { label: "Location", value: "Aro-Ologolo, Lekki" }
    ],
    milestones: [
      { title: "Site Excavation & Deep Foundation Piling", date: "Q2 2023", progress: 100, status: "Completed" },
      { title: "Superstructure Frame & Masonry", date: "Q4 2023", progress: 100, status: "Completed" },
      { title: "Facade Glazing & Interior Millwork", date: "Q2 2024", progress: 100, status: "Completed" },
      { title: "Full Handover to Homeowners", date: "Q3 2024", progress: 100, status: "Completed" }
    ],
    phases: [
      { name: "5-Bedroom Duplex Release", status: "Sold Out", units: "7 Units", priceFrom: 195_000_000 }
    ]
  },

  // 3. White Oaks Estate (Completed & Sold Out - Construction)
  {
    id: "white-oaks-estate",
    slug: "white-oaks-estate-ologolo",
    name: "White Oaks Estate",
    tagline: "14 Units of 5-Bedroom Semi-Detached & Fully Detached in Aro-Ologolo, Lekki",
    location: "White Oaks Estate, Aro-Ologolo, Lekki",
    image: "/assets/white-oaks-1.jpg",
    renderings: [
      "/assets/white-oaks-1.jpg",
      "/assets/white-oaks-2.jpg",
      "/assets/white-oaks-3.jpg",
      "/assets/white-oaks-4.jpg"
    ],
    roi: 35,
    progress: 100,
    handover: "Completed & Sold Out",
    units: "14 Units",
    unitCount: 14,
    status: "Completed & Sold Out",
    statusType: "completed",
    landArea: "5,500 m²",
    category: "Construction",
    homeSize: "14 units of 5 Bedroom Semi-detached and Fully detached",
    bedroomsDetail: [
      { name: "Master Bedroom", desc: "Grand master suite with private balcony and wardrobe." },
      { name: "Madam’s Bedroom with Jacuzzi", desc: "Comfortable retreat with an ensuite Jacuzzi bath." },
      { name: "Children’s Room (2)", desc: "Two children's ensuite bedrooms." },
      { name: "Guest Room", desc: "Independent guest accommodation." }
    ],
    bathroomsDetail: [
      "All Rooms Ensuite: Complete privacy for every occupant.",
      "Jacuzzi in Madam’s Bedroom."
    ],
    livingSpaceDetail: [
      "Modern living and dining areas with double-height accents.",
      "Fully Fitted Kitchen with high-end appliances and storage."
    ],
    amenitiesDetail: [
      "Solar Panels and Inverter: Eco-friendly energy security.",
      "Water Treatment Plant: Central potable water filtration.",
      "24/7 Power Supply: Continuous uninterrupted electricity."
    ],
    outdoorDetail: [
      "Driveway / Parking Lot for residents and visitors.",
      "Dedicated Security House with CCTV perimeter control."
    ],
    neighborhoodDetail: [
      "Prime Location near Lekki-Epe Expressway.",
      "Close to essential services, Circle Mall, international schools, and lifestyle hubs."
    ],
    description: "A secure, master-engineered gated residential community of 14 units of 5-bedroom semi-detached and fully detached luxury duplexes in Aro-Ologolo, Lekki. Featuring Madam's Jacuzzi suites, water treatment plant, solar energy backup, and 24/7 security. Delivered and 100% sold out.",
    features: [
      "14 Units of 5-Bedroom Semi-Detached & Fully Detached",
      "Madam’s Bedroom with Jacuzzi & All Rooms Ensuite",
      "Fully Fitted Kitchen & Modern Open-Plan Living",
      "Solar Panels, Inverter & Clean Water Treatment",
      "24/7 Power Supply & Fortified Security Post",
      "Immediate Lekki-Epe Expressway Connectivity"
    ],
    metrics: [
      { label: "Portfolio Status", value: "Completed & Sold Out" },
      { label: "Total Units", value: "14 Units" },
      { label: "Category", value: "Construction" },
      { label: "Location", value: "Aro-Ologolo, Lekki" }
    ],
    milestones: [
      { title: "Infrastructure & Civil Groundworks", date: "Q1 2022", progress: 100, status: "Completed" },
      { title: "Structural Shells & Enclosures", date: "Q4 2022", progress: 100, status: "Completed" },
      { title: "Road Paving, Drainage & Landscaping", date: "Q2 2023", progress: 100, status: "Completed" },
      { title: "Final Certification & Resident Occupancy", date: "Q4 2023", progress: 100, status: "Completed" }
    ],
    phases: [
      { name: "Full Community Release", status: "Sold Out", units: "14 Units", priceFrom: 175_000_000 }
    ]
  },

  // 4. Olufemi Olatunji (Completed & Sold Out - Construction)
  {
    id: "olufemi-olatunji",
    slug: "olufemi-olatunji-osapa",
    name: "Olufemi Olatunji",
    tagline: "9 Units of Fully & Semi-Detached Apartments on 2,100sqm in Osapa, Lekki",
    location: "Olufemi Olatunji, Osapa, Lekki, Lagos",
    image: "/assets/olufemi-olatunji-1.jpg",
    renderings: [
      "/assets/olufemi-olatunji-1.jpg",
      "/assets/olufemi-olatunji-2.jpg",
      "/assets/olufemi-olatunji-3.jpg",
      "/assets/olufemi-olatunji-4.jpg"
    ],
    roi: 29,
    progress: 100,
    handover: "Completed & Sold Out",
    units: "9 Units",
    unitCount: 9,
    status: "Completed & Sold Out",
    statusType: "completed",
    landArea: "2,100 m²",
    category: "Construction",
    homeSize: "9 Units of Fully detached and semi-detached apartments on 2,100sqm",
    bedroomsDetail: [
      { name: "Master Bedroom", desc: "Spacious primary suite with architectural luxury finishes." },
      { name: "Madam’s Bedroom", desc: "Elegantly finished bedroom designed for privacy and tranquility." },
      { name: "Children’s Room (2)", desc: "Two ensuite bedrooms for children." },
      { name: "Guest Room", desc: "Ensuite guest bedroom ensuring guest discretion." }
    ],
    bathroomsDetail: [
      "All rooms are ensuite: Each bedroom features a private bathroom."
    ],
    livingSpaceDetail: [
      "Modern living room with high-end fittings and refined finishes."
    ],
    amenitiesDetail: [
      "Solar Panels and Inverter for clean, continuous energy.",
      "Water Treatment Plant providing clean, safe running water.",
      "24/7 Power Supply guarantee."
    ],
    outdoorDetail: [
      "Dedicated Parking Lots for residents and visitors.",
      "Fortified Security House for 24/7 access control."
    ],
    neighborhoodDetail: [
      "Proximity to Key Amenities: Located in a sought-after, quiet residential neighborhood with excellent access to Primefort Hospital, Blue Coral Health Care Services, Zenith and Polaris Banks, Chicken Republic, The Chop Box, Cold Stone/Domino’s, Burger King, Medplus Pharmacy, and neighborhood Mart Stores.",
      "Proximity to Key Locations: 17 minutes from Ikoyi, 13 minutes from Lekki hub, 17 minutes from Victoria Island, and 26 minutes from Lagos Mainland — offering an ideal combination of convenience and connectivity."
    ],
    description: "An exclusive development of 9 units of fully detached and semi-detached luxury residences set on 2,100 sqm on Olufemi Olatunji Street, Osapa, Lekki. Boasting modern living rooms with high-end fittings, all ensuite bedrooms, solar power, water treatment, and central location just 13-17 mins from Lekki and Ikoyi. 100% completed and sold out.",
    features: [
      "9 Units of Fully & Semi-Detached on 2,100 sqm Parcel",
      "All Rooms Ensuite (Master, Madam's, 2 Children's, Guest Room)",
      "Modern Living Room with High-End European Fittings",
      "Solar Panels, Inverter & Central Water Treatment Plant",
      "24/7 Power Supply & Fortified Security House",
      "13-17 Mins to Lekki Hub, Ikoyi & Victoria Island"
    ],
    metrics: [
      { label: "Portfolio Status", value: "Completed & Sold Out" },
      { label: "Total Units", value: "9 Units" },
      { label: "Category", value: "Construction" },
      { label: "Location", value: "Osapa, Lekki" }
    ],
    milestones: [
      { title: "Piling & Reinforced Concrete Substructures", date: "Q1 2023", progress: 100, status: "Completed" },
      { title: "Superstructure Frame & Masonry", date: "Q3 2023", progress: 100, status: "Completed" },
      { title: "Interior Joinery, Flooring & Systems", date: "Q1 2024", progress: 100, status: "Completed" },
      { title: "Complete Handover & Title Delivery", date: "Q3 2024", progress: 100, status: "Completed" }
    ],
    phases: [
      { name: "Exclusive Osapa Cluster", status: "Sold Out", units: "9 Units", priceFrom: 210_000_000 }
    ]
  },

  // 5. Nigson Villa (Completed - Property Management)
  {
    id: "nigson-villa",
    slug: "nigson-villa-banana-island",
    name: "Nigson Villa",
    tagline: "Spacious 8 Units of 3-Bedroom & 2-Bedroom Apartments in Banana Island, Lagos",
    location: "Banana Island, Ikoyi, Lagos",
    image: "/assets/banana-1.jpg",
    renderings: [
      "/assets/banana-1.jpg",
      "/assets/banana-2.jpg",
      "/assets/banana-3.jpg",
      "/assets/banana-4.jpg"
    ],
    roi: 26,
    progress: 100,
    handover: "Completed (Managed)",
    units: "8 Units",
    unitCount: 8,
    status: "Completed",
    statusType: "completed",
    landArea: "4,200 m²",
    category: "Property Management",
    homeSize: "Spacious 8 Units of 3-bedroom and 2-bedroom apartments",
    bedroomsDetail: [
      { name: "3-Bedroom & 2-Bedroom Configurations", desc: "Each apartment includes 3 or 2 bedrooms finished to luxury international standards." }
    ],
    bathroomsDetail: [
      "Each apartment includes modern bathrooms.",
      "Visitor’s Toilet: Added convenience for visiting guests."
    ],
    livingSpaceDetail: [
      "Comfortable living/dining area with contemporary interiors equipped with modern amenities.",
      "A BQ (Boys’ Quarters) providing dedicated staff space."
    ],
    amenitiesDetail: [
      "24/7 Power Supply: Uninterrupted electricity for comfort.",
      "High-Level Security: Robust safety measures with biometric and guard access.",
      "Ample Parking Space: Sufficient parking for residents and visitors.",
      "Reverse Osmosis Water System: Provides purified, clean water."
    ],
    outdoorDetail: [
      "Serene Environment: A tranquil, beautifully maintained atmosphere.",
      "Swimming Pool: Perfect for relaxation, wellness, and leisure."
    ],
    neighborhoodDetail: [
      "Prestigious Location: Situated in Banana Island, one of Lagos' most exclusive neighborhoods."
    ],
    description: "Nigson Villa is a prestigious enclave of 8 units of 3-bedroom and 2-bedroom luxury apartments situated in Banana Island, Lagos. Features a sparkling swimming pool, serene landscaped environment, reverse osmosis water purification, high-level security, and Boys' Quarters (BQ). Professionally managed by Nigson Properties Limited.",
    features: [
      "Spacious 8 Units of 3-Bedroom & 2-Bedroom Apartments",
      "Contemporary Living/Dining Area & Boys’ Quarters (BQ)",
      "Swimming Pool & Beautifully Maintained Serene Atmosphere",
      "Reverse Osmosis (RO) Water Purification System",
      "24/7 Power Supply & High-Level Gated Security",
      "Prestigious Banana Island Waterfront Location"
    ],
    metrics: [
      { label: "Portfolio Status", value: "Completed (Managed)" },
      { label: "Total Units", value: "8 Residences" },
      { label: "Category", value: "Property Management" },
      { label: "Location", value: "Banana Island, Lagos" }
    ],
    milestones: [
      { title: "Civil Engineering & Marine Bulkhead", date: "Q1 2022", progress: 100, status: "Completed" },
      { title: "Architectural Construction & Fit-out", date: "Q3 2023", progress: 100, status: "Completed" },
      { title: "Turnkey Commissioning", date: "Q1 2024", progress: 100, status: "Completed" },
      { title: "Active Facility Management Operations", date: "Ongoing", progress: 100, status: "Completed" }
    ],
    phases: [
      { name: "Banana Island Managed Enclave", status: "Sold Out", units: "8 Units", priceFrom: 950_000_000 }
    ]
  },

  // 6. Benson Close (Shortlet - Short Stay)
  {
    id: "benson-close",
    slug: "benson-close-ikoyi",
    name: "Benson Close",
    tagline: "Luxury 1-Bedroom Waterfront Short-let Apartment – Benson Close, Awolowo, Ikoyi",
    location: "Benson Close, Awolowo, Ikoyi",
    image: "/assets/benson-close-1.jpg",
    renderings: [
      "/assets/benson-close-1.jpg",
      "/assets/benson-close-2.jpg",
      "/assets/benson-close-3.jpg",
      "/assets/benson-close-4.jpg"
    ],
    roi: 34,
    progress: 100,
    handover: "Active Shortlet Operation",
    units: "1 Unit",
    unitCount: 1,
    status: "Shortlet",
    statusType: "completed",
    landArea: "650 m²",
    category: "Short Stay",
    homeSize: "Luxury 1-Bedroom Waterfront Short-let Apartment – Ikoyi",
    bedroomsDetail: [
      { name: "Furnished Master Bedroom", desc: "Designed for comfort, privacy, and serene relaxation with waterfront views." }
    ],
    bathroomsDetail: [
      "Modern bathroom fitted with high-end sanitaryware."
    ],
    livingSpaceDetail: [
      "Spacious living room with elegant decor.",
      "Fully equipped kitchen with appliances, utensils, and cookware."
    ],
    amenitiesDetail: [
      "Beautiful waterfront views",
      "High-speed Wi-Fi and Smart TV",
      "24/7 security and 24-hour power",
      "Housekeeping visits scheduled every 2 days",
      "Concierge services and elevator access"
    ],
    outdoorDetail: [
      "Ample parking for guests and visitors",
      "Waterfront jetty area with designated outdoor smoking"
    ],
    neighborhoodDetail: [
      "Prime Benson Close, Awolowo, Ikoyi — peaceful, leafy, and central waterfront sanctuary."
    ],
    description: "Experience premium living in the heart of Ikoyi with this beautifully furnished 1-bedroom waterfront apartment, designed for comfort, privacy, and convenience. Whether you're visiting for business or leisure, this apartment offers a peaceful escape with stunning waterfront surroundings. Features concierge services, elevators, high-speed Wi-Fi, housekeeping every 2 days, and 24-hour power and security.",
    features: [
      "Beautiful Waterfront Views",
      "Spacious Living Room & Modern Bathroom",
      "Fully Equipped Kitchen",
      "High-Speed Wi-Fi & Smart TV",
      "24/7 Security & Ample Parking",
      "Ideal for Staycations, Business Trips & Weekend Getaways"
    ],
    metrics: [
      { label: "Portfolio Status", value: "Shortlet (Active)" },
      { label: "Capacity", value: "1 Executive Suite (Max 2 Guests)" },
      { label: "Caution Fee", value: "₦200,000 (Refundable)" },
      { label: "Location", value: "Ikoyi, Lagos" }
    ],
    milestones: [
      { title: "Architectural Renovation & Reinforcement", date: "Q2 2023", progress: 100, status: "Completed" },
      { title: "Bespoke Interior Design & Smart Setup", date: "Q4 2023", progress: 100, status: "Completed" },
      { title: "Hospitality Soft Launch", date: "Q1 2024", progress: 100, status: "Completed" },
      { title: "Full Operational Deployment", date: "Active", progress: 100, status: "Completed" }
    ],
    phases: [
      { name: "Luxury Waterfront 1-Bedroom Suite", status: "Selling Fast", units: "1 Suite", priceFrom: 280_000 }
    ]
  },

  // 7. White Oaks Coastal Community (Ongoing Development)
  {
    id: "white-oaks",
    slug: "white-oaks-coastal-community",
    name: "White Oaks Coastal Community",
    tagline: "48-Hectare Master-Planned Coastal Haven & Private Beach Club",
    location: "Ibeju-Lekki Coastal Corridor, Lagos",
    image: "/assets/community.jpg",
    renderings: ["/assets/community.jpg", "/assets/villa.jpg", "/assets/hero.jpg", "/assets/towers.jpg"],
    roi: 28,
    progress: 78,
    handover: "Handover Q4 2026",
    units: "212 Luxury Homes & 40 Waterfront Villas",
    unitCount: 252,
    status: "Under Construction",
    statusType: "ongoing",
    landArea: "48 Hectares",
    category: "Construction",
    description: "White Oaks is Nigson's flagship coastal community redefining luxury living along the rapidly expanding Lekki Free Trade Zone corridor. Featuring an exclusive 1.2km private beach frontage, Olympic infinity pool, 18-hole golf putting green, international wellness club, and 100% clean solar microgrid.",
    features: [
      "1.2km Private Atlantic Beach Club & Boardwalk",
      "Olympic-Length Edge Infinity Pool & Cabanas",
      "Central 10-Acre Navigable Lagoon & Marina",
      "24/7 Armed Security & Drone Patrol Perimeter",
      "Commercial Town Square with Artisanal Supermarket",
      "Independent 5MW Solar & LNG Clean Energy Plant"
    ],
    metrics: [
      { label: "Capital Appreciation", value: "+28% p.a." },
      { label: "Projected Rental Yield", value: "14.2%" },
      { label: "Phase 1 Handover", value: "December 2026" },
      { label: "Title", value: "Federal Gazette & C of O" }
    ],
    milestones: [
      { title: "Land Reclamation & Soil Densification", date: "Q1 2024", progress: 100, status: "Completed" },
      { title: "Deep Piling & Substructure Engineering", date: "Q3 2024", progress: 100, status: "Completed" },
      { title: "Superstructure & Frame Erection", date: "Q2 2025", progress: 90, status: "In Progress" },
      { title: "MEP, Solar Microgrid & Water Infrastructure", date: "Q4 2025", progress: 65, status: "In Progress" },
      { title: "Turnkey Interior Fit-out & Handover", date: "Q4 2026", progress: 30, status: "Scheduled" }
    ],
    phases: [
      { name: "Phase 1: The Beachfront Pavilions", status: "Sold Out", units: "48 Villas", priceFrom: 450_000_000 },
      { name: "Phase 2: The Lagoon Mews", status: "Selling Fast", units: "64 Terraces", priceFrom: 290_000_000 },
      { name: "Phase 3: The Sanctuary Heights", status: "Selling Fast", units: "100 Residences", priceFrom: 360_000_000 }
    ]
  },

  // 8. Ikoyi Lagoon Crest Towers (Ongoing Development)
  {
    id: "lagoon-crest",
    slug: "ikoyi-lagoon-crest-towers",
    name: "Ikoyi Lagoon Crest Towers",
    tagline: "Twin 28-Storey Ultra-Luxury Towers on the Southern Ikoyi Skyline",
    location: "Kingsway / Alexander Corridor, Ikoyi, Lagos",
    image: "/assets/towers.jpg",
    renderings: ["/assets/towers.jpg", "/assets/penthouse.jpg", "/assets/suite1.jpg", "/assets/consultation.jpg"],
    roi: 24,
    progress: 62,
    handover: "Handover Q2 2027",
    units: "2 Towers · 146 Sky Residences & Duplexes",
    unitCount: 146,
    status: "Under Construction",
    statusType: "ongoing",
    landArea: "12,000 m² Waterfront Parcel",
    category: "Construction",
    description: "An architectural landmark on the Ikoyi skyline. The twin 28-storey towers feature aerodynamic wind-tunnel tested design, helipad, private yacht berths, double-height sky lounges, and private wellness suites for global titans and institutional investors.",
    features: [
      "Twin 28-Storey Aerodynamic High-Rise Architecture",
      "Rooftop Helipad with VIP Pilot Lounge",
      "Private Yacht Berths & Deep-Water Marina",
      "Infinity Sky Pool Suspended on 18th Floor",
      "Triple-Volume Grand Marble Lobby with Concierge",
      "Sub-Zero Commercial Grade Energy Infrastructure"
    ],
    metrics: [
      { label: "Annual Capital Growth", value: "+24% p.a." },
      { label: "Target Rental Yield", value: "12.8%" },
      { label: "Current Construction", value: "Level 19 of 28" },
      { label: "Title", value: "Governor's Consent C of O" }
    ],
    milestones: [
      { title: "Jet-Grouting & 45m Bored Piles", date: "Q2 2023", progress: 100, status: "Completed" },
      { title: "Basement Parking & Podium Casting", date: "Q1 2024", progress: 100, status: "Completed" },
      { title: "Tower 1 & 2 Core Vertical Rise (Floor 19)", date: "Q3 2025", progress: 75, status: "In Progress" },
      { title: "Curtain Wall & Schuco Glazing Envelope", date: "Q1 2026", progress: 40, status: "Scheduled" },
      { title: "Final Handover & Marina Commissioning", date: "Q2 2027", progress: 10, status: "Scheduled" }
    ],
    phases: [
      { name: "Tower 1: Executive Suites & Duplexes", status: "Selling Fast", units: "73 Units", priceFrom: 620_000_000 },
      { name: "Tower 2: Presidential Penthouses", status: "Selling Fast", units: "73 Units", priceFrom: 850_000_000 }
    ]
  }
];

export interface SuiteCancellationPolicy {
  general: string;
  tiers: { period: string; accommodationRefund: string; cautionRefund: string }[];
  afterCheckIn: string;
  rescheduling: string;
  refundProcessingTime: string;
  managementInitiated: string;
}

export interface SuiteDetailedRules {
  conductNoise: string[];
  visitors: string[];
  smokingSubstances: string[];
  fireSafety: string[];
  propertyCare: string[];
  cleaningHygiene: string[];
  kitchenUse: string[];
  utilities: string[];
  pets: string;
  penalties: string[];
}

export interface Suite {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  location: string;
  address: string;
  image: string;
  gallery: string[];
  rate: number;
  cleaningFee: number;
  securityDeposit: number;
  beds: number;
  baths: number;
  maxGuests: number;
  amenities: string[];
  description: string;
  houseRules: string[];
  cautionFeeRefundTerms?: string;
  checkInTime?: string;
  checkOutTime?: string;
  earlyCheckInPolicy?: string;
  lateCheckOutPolicy?: string;
  keyPolicy?: string;
  idRequirement?: string;
  visitorPolicy?: string;
  quietHours?: string;
  smokingPolicy?: string;
  cancellationPolicy?: SuiteCancellationPolicy;
  detailedRules?: SuiteDetailedRules;
  reviews: { name: string; title: string; rating: number; date: string; comment: string }[];
}

export const suites: Suite[] = [
  {
    id: "benson-close-suite",
    slug: "benson-close-ikoyi-suite",
    name: "Benson Close Ikoyi Short-Stay Apartment",
    tagline: "Luxury 1-Bedroom Waterfront Short-let Apartment – Benson Close, Awolowo, Ikoyi",
    location: "Ikoyi",
    address: "Benson Close, Awolowo, Old Ikoyi, Lagos",
    image: "/assets/benson-close-1.jpg",
    gallery: [
      "/assets/benson-close-1.jpg",
      "/assets/benson-close-2.jpg",
      "/assets/benson-close-3.jpg",
      "/assets/benson-close-4.jpg"
    ],
    rate: 280_000,
    cleaningFee: 25_000,
    securityDeposit: 200_000,
    cautionFeeRefundTerms: "Caution Fee is ₦200,000 and is fully refundable after inspection, provided there are no damages, missing items, or policy violations. Refund is processed within 24 hours if no damages or policy violations are found.",
    checkInTime: "1:00 PM",
    checkOutTime: "12:00 PM",
    earlyCheckInPolicy: "Early check ins are subject to availability and 10% of the apartment’s fee would be charged.",
    lateCheckOutPolicy: "Late check outs are also subject to availability and 10% for each hour stayed past 12:00pm will be charged.",
    keyPolicy: "An access key will be given to you by the housekeeper at the point of check in. This is to be returned intact at the point of check out. If it is lost or damaged, a ₦50,000 deduction will be made from the caution fee deposit.",
    idRequirement: "A valid government-issued ID (NIN Slip/Card, International Passport, Driver’s License, or Voter’s Card) is required for each guest.",
    visitorPolicy: "Visitors are allowed only between 10:00 AM and 9:00 PM, unless otherwise agreed. Visitors are not allowed to sleep over.",
    quietHours: "10:00 PM – 7:00 AM",
    smokingPolicy: "Smoking is strictly prohibited inside the apartment and in all indoor areas. Guests who wish to smoke may do so outside the compound, towards the jetty area.",
    beds: 1,
    baths: 1,
    maxGuests: 2,
    amenities: [
      "Beautiful waterfront views",
      "Spacious living room",
      "Fully equipped kitchen",
      "Modern bathroom",
      "High-speed Wi-Fi & Internet",
      "Smart TV with streaming",
      "24/7 security & Fortified gatehouse",
      "Ample parking for residents and visitors",
      "Concierge services & Elevators",
      "Housekeeping visits scheduled every 2 days",
      "24-hour uninterrupted power & clean solar supply"
    ],
    description: "Welcome to our amazing one-bedroom waterfront apartment! Experience premium living in the heart of Ikoyi with this beautifully furnished 1-bedroom waterfront apartment, designed for comfort, privacy, and convenience. Whether you're visiting for business or leisure, this apartment offers a peaceful escape with stunning waterfront surroundings. Features concierge services, elevators, high-speed Wi-Fi, housekeeping every 2 days, and 24-hour power and security.",
    houseRules: [
      "Check-in time is 1:00 PM and check-out time is 12:00 PM",
      "Caution Fee is ₦200,000 (fully refundable within 24 hours after inspection)",
      "Maximum of 2 guests are allowed to stay in the apartment",
      "All bookings must be confirmed with full payment before check-in",
      "Valid government-issued ID (NIN, Passport, Driver’s License, or Voter’s Card) required",
      "Lost or damaged access key attracts a ₦50,000 deduction from caution fee",
      "Visitors allowed only between 10:00 AM and 9:00 PM (no overnight sleepovers)",
      "Smoking strictly prohibited indoors; outdoor smoking permitted towards jetty area only",
      "Quiet hours: 10:00 PM – 7:00 AM (parties and events strictly prohibited)",
      "Housekeeping visits scheduled for every 2 days; care for towels & beddings",
      "Pets are strictly not allowed"
    ],
    cancellationPolicy: {
      general: "All cancellations must be communicated directly to management via call or WhatsApp. Cancellation is only valid after management confirms receipt of the request and its alignment with cancellation policy.",
      tiers: [
        {
          period: "7 Days or More Before Check-In",
          accommodationRefund: "100% refund of accommodation fee",
          cautionRefund: "Caution fee (if already paid) is fully refundable"
        },
        {
          period: "3–6 Days Before Check-In",
          accommodationRefund: "50% refund of accommodation fee",
          cautionRefund: "Caution fee is fully refundable"
        },
        {
          period: "Less Than 48 Hours Before Check-In / Day of Check-In / No-Show",
          accommodationRefund: "No refund of accommodation fee (0%)",
          cautionRefund: "Caution fee is fully refundable (if already paid)"
        }
      ],
      afterCheckIn: "No refund for early check-out or shortened stay, regardless of the reason. Once a guest checks in, all accommodation fees become non-refundable.",
      rescheduling: "Rescheduling is allowed only once, subject to availability. Requests must be made at least 72 hours before the original check-in date. Rescheduling less than 72 hours before check-in is treated as a cancellation (no refund).",
      refundProcessingTime: "Refunds are processed within 24–72 hours after confirmation. All refunds are returned to the same account or payment channel used for booking.",
      managementInitiated: "If management cancels a booking due to unforeseen circumstances (e.g., maintenance issues, safety concerns), the guest will receive a full refund, including accommodation fee and caution fee. Guest may also be offered a free date change or alternative apartment, if available."
    },
    detailedRules: {
      conductNoise: [
        "Loud music, shouting, or disruptive gatherings are not allowed.",
        "Parties, events, and crowd gatherings are strictly prohibited.",
        "Quiet hours: 10:00 PM – 7:00 AM.",
        "Any disturbance at all during your stay that inconveniences the residence will lead to an immediate eviction without a refund.",
        "No gatherings, events or get togethers are allowed in the apartment or public area as it's a strictly residential property.",
        "Any illegal activity (fraud, drugs, prostitution, cybercrime, etc.) will lead to immediate eviction and forfeiture of payment and caution fee."
      ],
      visitors: [
        "Visitors are allowed only between 10:00 AM and 9:00 PM, unless otherwise agreed.",
        "Visitors are not allowed to sleep over.",
        "Guests are fully responsible for the behavior of their visitors."
      ],
      smokingSubstances: [
        "Smoking is strictly prohibited inside the apartment and in all indoor areas.",
        "Guests who wish to smoke may do so outside the compound, towards the jetty area.",
        "Reports of marijuana smoking or any other type of illegal drug use will lead to an eviction without refund of caution fee.",
        "Excessive alcohol use leading to disturbance or property damage is prohibited."
      ],
      fireSafety: [
        "Guests must not use open flames (candles, gas burners, shisha, etc.) inside the apartment.",
        "All electrical appliances must be switched off when not in use, especially when leaving the apartment.",
        "Tampering with smoke detectors, fire extinguishers, or any fire-safety equipment is strictly forbidden.",
        "Any negligence that leads to a fire incident will result in charges for damages and possible legal action."
      ],
      propertyCare: [
        "Guests must treat the property with care.",
        "Any damages, stains, breakages, or missing items will be deducted from the caution fee.",
        "If the cost of damage exceeds the caution fee, the guest must pay the balance immediately.",
        "A fine will be charged for smoking indoors or causing smoke-related damage.",
        "Any item(s) damaged as a result of smoking related activities will be fully replaced by the guest.",
        "No rearranging of furniture, tampering with electrical installations, or removing items from the apartment."
      ],
      cleaningHygiene: [
        "Guests must maintain basic cleanliness during their stay.",
        "Extra cleaning charges will apply for extra attention and excessively dirty apartments.",
        "Housekeeping visits are scheduled for every 2 days.",
        "During housekeeping visits, guests are required to secure and safeguard their personal belongings and valuables.",
        "Please note that towels and beddings are to be handled with care and only used for their purposes. If the towels or beddings are used for makeup, oil or any other permanently damaging products, they will be paid for.",
        "The management will not be responsible for any missing or misplaced items if belongings are left unsecured during cleaning."
      ],
      kitchenUse: [
        "Guests may cook using provided appliances.",
        "Ensure proper ventilation while cooking.",
        "Clean used utensils and surfaces after use; failure to clean may attract extra charges."
      ],
      utilities: [
        "Please use electricity and water responsibly.",
        "Do not tamper with: Security cameras, Wi-Fi router, or other Amenities. Any tampering will attract penalty charges."
      ],
      pets: "Pets are not allowed.",
      penalties: [
        "Immediate eviction without refund",
        "Loss of caution fee",
        "Additional charges for damages or disturbances",
        "Possible police involvement for illegal activities"
      ]
    },
    reviews: [
      {
        name: "Capt. Tunde Williams",
        title: "International Pilot (London)",
        rating: 5,
        date: "October 2026",
        comment: "The finest 1-bedroom apartment in Ikoyi. The waterfront view at dusk is magnificent, Wi-Fi speed was blazing, and the 24/7 power was completely uninterrupted."
      }
    ]
  },
  {
    id: "admiralty-suite",
    slug: "admiralty-executive-suite",
    name: "The Admiralty Executive Suite",
    tagline: "Ultra-Fast Starlink WiFi · Private Chauffeur · 24/7 Solar Power",
    location: "Lekki Phase 1",
    address: "Admiralty Way Waterfront, Lekki Phase 1, Lagos",
    image: "/assets/suite1.jpg",
    gallery: ["/assets/suite1.jpg", "/assets/terrace.jpg", "/assets/suite2.jpg", "/assets/hero.jpg"],
    rate: 220_000,
    cleaningFee: 25_000,
    securityDeposit: 100_000,
    beds: 2,
    baths: 2,
    maxGuests: 4,
    amenities: [
      "Starlink 300Mbps Uncapped WiFi",
      "24/7 Guaranteed Clean Solar Grid",
      "Complimentary Airport Chauffeur Pickup",
      "Daily Executive Housekeeping Service",
      "Nespresso Coffee Bar & Organic Teas",
      "King Koil Presidential Orthopedic Mattresses",
      "75\" Samsung Neo-QLED with Netflix & DSTV",
      "Curated In-House Mini-Bar & Wine Chiller"
    ],
    description: "Designed specifically for traveling executives, diaspora returnees, and discerning tastemakers. Located just off Admiralty Way with rapid access to the Lekki-Ikoyi Link Bridge, this duplex suite marries residential discretion with five-star hotel service.",
    houseRules: [
      "Check-in: 2:00 PM | Check-out: 11:00 AM",
      "Strict No Smoking Policy Inside the Suite",
      "No Loud Parties or Unregistered External Gatherings",
      "Refundable Security Deposit Handled on Arrival"
    ],
    reviews: [
      {
        name: "Dr. Babatunde Alabi",
        title: "Managing Director, Global Health Corp (London)",
        rating: 5,
        date: "September 2026",
        comment: "The most seamless short stay in Lagos. The Starlink speed was rock solid for my transatlantic board calls, and the chauffeur made my meetings across Ikoyi completely stress-free."
      },
      {
        name: "Claire Moreau",
        title: "Creative Director (Paris)",
        rating: 5,
        date: "August 2026",
        comment: "Exquisite interior finishing. The linen, the bespoke Italian carpentry, and the quietness despite being right in Lekki Phase 1 blew me away."
      }
    ]
  },
  {
    id: "sovereign-sky",
    slug: "sovereign-sky-penthouse",
    name: "Sovereign Sky Penthouse",
    tagline: "Rooftop Heated Jacuzzi · In-House Private Chef · Lagoon Sunset",
    location: "Ikoyi",
    address: "Alexander Avenue, Old Ikoyi, Lagos",
    image: "/assets/suite2.jpg",
    gallery: ["/assets/suite2.jpg", "/assets/towers.jpg", "/assets/penthouse.jpg", "/assets/villa.jpg"],
    rate: 350_000,
    cleaningFee: 35_000,
    securityDeposit: 150_000,
    beds: 3,
    baths: 3.5,
    maxGuests: 6,
    amenities: [
      "Private Rooftop Heated Jacuzzi with Lagoon View",
      "Dedicated In-House Private Chef on Call",
      "Ultra-Fast Starlink 350Mbps WiFi",
      "24/7 Redundant Clean Solar Power",
      "Full Range Rover Vogue Airport Chauffeur Service",
      "Sonos High-Fidelity Multi-Room Audio",
      "Hermès Bath Amenities & Egyptian Cotton Linens",
      "Private Elevator Access directly into Suite"
    ],
    description: "Perched high above Old Ikoyi, this sky penthouse suite offers an intoxicating vantage point over the sunset-dappled lagoon. Indulge in culinary excellence prepared by our in-house chef while relaxing on the private heated spa terrace.",
    houseRules: [
      "Check-in: 3:00 PM | Check-out: 12:00 PM",
      "Strict No Smoking Inside Living Areas",
      "Maximum 6 Overnight Guests",
      "Valid Government ID Required at Check-in"
    ],
    reviews: [
      {
        name: "Engr. Nnamdi Eze",
        title: "Private Equity Partner (Dubai)",
        rating: 5,
        date: "October 2026",
        comment: "The chef was world-class. From fresh lobster dinners to morning tropical fruit platters, this rivals the best five-star suites in Dubai or London."
      }
    ]
  },
  {
    id: "atlantic-horizon",
    slug: "atlantic-horizon-residence",
    name: "Atlantic Horizon Residence",
    tagline: "Panoramic Atlantic Vistas · Private Butler · 24/7 Clean Energy",
    location: "Eko Atlantic",
    address: "Marina Boulevard, Eko Atlantic City, Lagos",
    image: "/assets/penthouse.jpg",
    gallery: ["/assets/penthouse.jpg", "/assets/suite1.jpg", "/assets/towers.jpg", "/assets/community.jpg"],
    rate: 480_000,
    cleaningFee: 40_000,
    securityDeposit: 200_000,
    beds: 4,
    baths: 4.5,
    maxGuests: 8,
    amenities: [
      "Panoramic 270° Atlantic Ocean Horizon Views",
      "Dedicated 24/7 Private Butler & Chauffeur",
      "Personal Gourmet Chef on Standby",
      "Private Balcony Plunge Pool",
      "Starlink Enterprise 500Mbps High-Speed WiFi",
      "Full Smart Home Voice & iPad Automation",
      "Private Wine Tasting Cellar",
      "Helipad Landing Clearance on Request"
    ],
    description: "The crown jewel of Eko Atlantic luxury hospitality. A full-floor oceanfront residence suspended over the Atlantic with unparalleled privacy, world-class butler service, and direct yacht harbor proximity.",
    houseRules: [
      "Check-in: 3:00 PM | Check-out: 12:00 PM",
      "Quiet Hours after 11:00 PM",
      "Security Deposit Handled Digitally"
    ],
    reviews: [
      {
        name: "Senator (Chief) O. Adeleke",
        title: "Family Vacation & Private Retreat",
        rating: 5,
        date: "September 2026",
        comment: "Unmatched hospitality. The butler was discreet and attentive, the ocean view was therapeutic, and the security in Eko Atlantic is gold standard."
      }
    ]
  },
  {
    id: "banana-island-waterfront",
    slug: "banana-island-waterfront-villa-suite",
    name: "The Banana Island Waterfront Villa Suite",
    tagline: "Private Boat Jetty · Infinity Plunge Pool · 24/7 Diplomatic Security",
    location: "Banana Island",
    address: "Ocean View Drive, Zone A, Banana Island, Ikoyi, Lagos",
    image: "/assets/villa.jpg",
    gallery: ["/assets/villa.jpg", "/assets/suite1.jpg", "/assets/hero.jpg", "/assets/towers.jpg"],
    rate: 650_000,
    cleaningFee: 50_000,
    securityDeposit: 250_000,
    beds: 4,
    baths: 4.5,
    maxGuests: 8,
    amenities: [
      "Private Deep-Water Boat Dock & Jet-Ski Slip",
      "Solar-Powered Infinity Plunge Pool overlooking Lagoon",
      "Starlink Enterprise 500Mbps Dedicated Line",
      "Private Michelin-Trained Chef & Butler Service",
      "Sub-Zero Wine Preservation Cellar & Bar",
      "24/7 Redundant Lithium-Phosphate Solar Microgrid",
      "Gated Island Access with Armed Diplomatic Escort on Request",
      "Bang & Olufsen Integrated Multi-Room Sound System"
    ],
    description: "A private sanctuary situated in Nigeria's most exclusive gated enclave. Featuring uninterrupted lagoon frontage, private jetty access for yacht arrivals, and intuitive white-glove hospitality curated for world leaders and royal delegations.",
    houseRules: [
      "Check-in: 3:00 PM | Check-out: 12:00 PM",
      "Discreet Executive Gatherings Only (Maximum 10 attendees)",
      "Strict Non-Smoking Indoors",
      "Security Clearance Protocol via Island Gatehouse"
    ],
    reviews: [
      {
        name: "Alhaji Farouk Al-Mansur",
        title: "Energy Consortium Chairman",
        rating: 5,
        date: "September 2026",
        comment: "The waterfront deck and seamless yacht transfer made this our finest stay in West Africa. Exceptional privacy and 100% stable clean power throughout."
      }
    ]
  },
  {
    id: "maitama-diplomatic-oasis",
    slug: "maitama-diplomatic-oasis-suite",
    name: "The Maitama Diplomatic Oasis",
    tagline: "Aso Rock Panoramic Views · Bulletproof Glass · Biometric Wing Access",
    location: "Maitama, Abuja",
    address: "Gana Street Corridor, Maitama Hills, Abuja FCT",
    image: "/assets/community.jpg",
    gallery: ["/assets/community.jpg", "/assets/suite2.jpg", "/assets/terrace.jpg", "/assets/consultation.jpg"],
    rate: 380_000,
    cleaningFee: 30_000,
    securityDeposit: 150_000,
    beds: 3,
    baths: 3.5,
    maxGuests: 6,
    amenities: [
      "Panoramic Hills & Aso Rock Scenery",
      "Armored Perimeter & Biometric Access Control",
      "Starlink 350Mbps Ultra-Fast Redundant Fiber",
      "Chauffeured Mercedes-Maybach Airport Transfers",
      "Private Finnish Sauna & Steam Bath",
      "24/7 Central Air Purification & Clean Solar Grid",
      "Espresso Lounge & Fully Stocked Sommelier Bar",
      "Dedicated Executive Secretariat & Conference Room"
    ],
    description: "Positioned high on the Maitama ridge in the diplomatic capital. The Maitama Diplomatic Oasis delivers fortified peace-of-mind, bespoke concierge services, and diplomatic-grade connectivity for ministerial missions and multinational leaders.",
    houseRules: [
      "Check-in: 2:00 PM | Check-out: 11:30 AM",
      "Diplomatic Protocol ID Registration on Check-in",
      "Quiet Hours from 10:00 PM"
    ],
    reviews: [
      {
        name: "Ambassador Jean-Luc Vaneck",
        title: "European Trade Delegation",
        rating: 5,
        date: "August 2026",
        comment: "Outstanding security and serenity. Having an executive boardroom within the suite saved us countless hours of transit across Abuja."
      }
    ]
  },
  {
    id: "victoria-marina-penthouse",
    slug: "victoria-marina-penthouse-suite",
    name: "The Victoria Marina Sky Suite",
    tagline: "Wraparound Skyline Terrace · Private Sommelier · Helipad Proximity",
    location: "Victoria Island",
    address: "Ozumba Mbadiwe Avenue, Victoria Island, Lagos",
    image: "/assets/towers.jpg",
    gallery: ["/assets/towers.jpg", "/assets/penthouse.jpg", "/assets/suite1.jpg", "/assets/hero.jpg"],
    rate: 420_000,
    cleaningFee: 35_000,
    securityDeposit: 180_000,
    beds: 3,
    baths: 3,
    maxGuests: 6,
    amenities: [
      "Wraparound 360° Marina & Atlantic Ocean Skyline Views",
      "Floor-to-Ceiling Motorized Silk Solar Curtains",
      "Private Sommelier Curated Wine & Champagne Cellar",
      "Direct Lift Access with Biometric Keycard",
      "Sonos Dolby Atmos Surround Cinema Lounge",
      "Starlink 300Mbps Uncapped High-Speed WiFi",
      "Complimentary Range Rover Chauffeur throughout VI & Ikoyi",
      "24/7 Zero-Interruption Solar Microgrid"
    ],
    description: "Suspended along the iconic Ozumba Mbadiwe waterfront, this high-floor suite gazes across the five-cowrie creek and coastal lights. Designed for discerning executives requiring effortless proximity to Lagos's financial epicenter.",
    houseRules: [
      "Check-in: 2:00 PM | Check-out: 12:00 PM",
      "No Unregistered Commercial Photography without Prior Permit",
      "Refundable Deposit Released at Checkout Inspection"
    ],
    reviews: [
      {
        name: "Stephanie O’Connor",
        title: "Venture Capitalist (New York)",
        rating: 5,
        date: "October 2026",
        comment: "The night view of the marina is breathtaking. The concierge booked all our dinner tables at Noir and RSVP without us lifting a finger."
      }
    ]
  },
  {
    id: "asokoro-presidential-loft",
    slug: "asokoro-presidential-loft-suite",
    name: "The Asokoro Presidential Loft",
    tagline: "Heated Rooftop Pool · Private Cigar Lounge · Embassy Quarter Serenity",
    location: "Asokoro, Abuja",
    address: "Yakubu Gowon Crescent, Asokoro District, Abuja FCT",
    image: "/assets/suite2.jpg",
    gallery: ["/assets/suite2.jpg", "/assets/villa.jpg", "/assets/suite1.jpg", "/assets/community.jpg"],
    rate: 320_000,
    cleaningFee: 30_000,
    securityDeposit: 120_000,
    beds: 2,
    baths: 2.5,
    maxGuests: 4,
    amenities: [
      "Private Rooftop Solar-Heated Lap Pool",
      "Bespoke Cedarwood Walk-in Humidor & Cigar Lounge",
      "High-Yield Solar Inverter with 24/7 Redundancy",
      "Starlink Enterprise 350Mbps Ultra-Low Latency WiFi",
      "Italian Leather Chesterfield Furnishings",
      "Daily Continental Breakfast by Private Chef",
      "Nnamdi Azikiwe VIP Airport Chauffeur Meet-and-Greet",
      "State-of-the-Art Surveillance & Gated Patrol"
    ],
    description: "An intimate, two-story luxury loft in Abuja's leafy Asokoro embassy enclave. Offering bespoke mahogany craftsmanship, a heated rooftop dipping pool, and absolute confidentiality for visiting statesmen and corporate leaders.",
    houseRules: [
      "Check-in: 3:00 PM | Check-out: 11:00 AM",
      "Maximum 4 Overnight Guests",
      "Strict Non-Smoking in Bedroom Wings"
    ],
    reviews: [
      {
        name: "Tariq Bello",
        title: "Fintech Founder",
        rating: 5,
        date: "October 2026",
        comment: "The cigar terrace and quietness of Asokoro make this my go-to residence whenever I fly into Abuja for regulatory summits."
      }
    ]
  }
];

export interface LeadershipMember {
  name: string;
  role: string;
  bio: string;
  credentials: string;
  image: string;
}

export const leadership: LeadershipMember[] = [
  {
    name: "Miss Ijeoma Odunukwe",
    role: "Managing Director & CEO",
    credentials: "B.Sc, MBA, Nigson Properties Limited",
    bio: "Executive steward and Managing Director of Nigson Properties Limited. Championing corporate governance, capital stewardship, and the visionary mission of delivering affordable luxury homes and master-planned communities across Nigeria.",
    image: "/assets/team/ijeoma-odunukwe.jpg"
  },
  {
    name: "Adedamola Adeyemi, PMP",
    role: "Head, Projects & Operations",
    credentials: "PMP®, Certified Project Director, Nigson Properties",
    bio: "Directs end-to-end engineering operations, Eurocode structural execution, contractor coordination, and quality assurance across all Nigson residential construction developments and master infrastructure.",
    image: "/assets/team/adedamola-adeyemi.jpg"
  },
  {
    name: "Ladeinde Olubukola",
    role: "Head of Sales & Marketing",
    credentials: "Strategic Marketing & Client Relations, Nigson Properties",
    bio: "Leads property sales strategy, institutional and diaspora client engagement, bespoke acquisitions, and market expansion, connecting buyers and global investors to high-yield Nigerian real estate.",
    image: "/assets/team/olubukola-ladeinde.jpg"
  },
  {
    name: "Director, Properties",
    role: "Director, Properties",
    credentials: "Corporate Governance & Real Estate Strategy, Nigson Group",
    bio: "Provides strategic governance, group asset allocation, regulatory compliance oversight, and institutional due diligence across Nigson Group's real estate development holdings.",
    image: "/assets/consultation.jpg"
  }
];

export interface ServiceDetail {
  num: string;
  title: string;
  tagline: string;
  summary: string;
  image: string;
  process: { step: string; title: string; desc: string }[];
  deliverables: string[];
}

export const servicesDetails: ServiceDetail[] = [
  {
    num: "01",
    title: "Building Construction",
    tagline: "Modern architectural designs, quality craftsmanship & innovative building solutions",
    summary: "At the heart of our building construction services is a commitment to excellence and professionalism. We craft luxurious yet affordable buildings that align with your aspirations while maintaining exceptional value. Guided by integrity and trust, we oversee every step—from design to completion—with precision and innovation, ensuring your vision becomes a reality. Our resilient approach ensures we deliver quality structures that stand out for their elegance, functionality, and cost-effectiveness.",
    image: "/assets/villa.jpg",
    process: [
      { step: "01", title: "Site & Soil Mechanics Analysis", desc: "Geo-resistivity sounding, soil load bearing tests, and deep foundation engineering up to 45m." },
      { step: "02", title: "Modern Architectural Master-Planning", desc: "Cantilevered contemporary geometry, solar orientation, and family-friendly functional floorplans." },
      { step: "03", title: "High-Tensile Superstructure & MEP", desc: "Eurocode-compliant reinforced concrete casting, German plumbing infrastructure, and CATL solar integration." },
      { step: "04", title: "Snag-Free Handover & Warranty", desc: "Exhaustive 120-point quality audit, smart automation commissioning, and structural guarantee certificate." }
    ],
    deliverables: [
      "Modern Architectural Designs & 3D Visualizations",
      "Smart Home Automation Systems",
      "Solar Power & Lithium Battery Integration",
      "Premium Infrastructure & Family-Friendly Layouts",
      "Advanced Multi-Tier Security Systems",
      "Sustainable & Aging-in-Place Facilities"
    ]
  },
  {
    num: "02",
    title: "Project Development",
    tagline: "Feasibility studies, innovative design & sustainable impactful solutions",
    summary: "From concept to completion, our project development services are driven by a commitment to value and excellence. We conduct in-depth feasibility studies, craft innovative designs, and manage every phase of development with professionalism and trust. Our dedication to creating luxurious yet affordable properties reflect our empathy for client needs and our focus on delivering sustainable, impactful solutions.",
    image: "/assets/community.jpg",
    process: [
      { step: "01", title: "Feasibility Studies & Market Intel", desc: "Comprehensive demographic analysis, land tenure verification, and financial yield projections." },
      { step: "02", title: "Innovative Design & Approvals", desc: "Collaborative architectural drafting, environmental impact assessments, and state government statutory approvals." },
      { step: "03", title: "Development Planning & Procurement", desc: "Phased milestone scheduling, heavy machinery mobilization, and European material procurement." },
      { step: "04", title: "Turnkey Execution & Delivery", desc: "On-site quality supervision, contractor management, and seamless handover to owners." }
    ],
    deliverables: [
      "Comprehensive Real Estate Feasibility Studies",
      "Innovative Architectural Masterplans",
      "End-to-End Development Planning",
      "Stakeholder & Contractor Coordination",
      "Quality Control & Material Certifications",
      "Sustainable Green Development Blueprints"
    ]
  },
  {
    num: "03",
    title: "Property Management",
    tagline: "Tenant relations, proactive maintenance & maximizing asset value",
    summary: "We offer property management solutions that are rooted in empathy and a deep understanding of your needs. With a focus on value-driven services, we handle tenant relations, proactive maintenance, and financial management, ensuring your properties remain profitable and stress-free. By upholding professionalism and trust, we create seamless experiences for both property owners and tenants, maximizing asset value and satisfaction.",
    image: "/assets/banana-1.jpg",
    process: [
      { step: "01", title: "Tenant Screening & Relations", desc: "Rigorous corporate and diaspora background verification, credit checks, and airtight tenancy agreements." },
      { step: "02", title: "Preventive & Routine Maintenance", desc: "Scheduled inspections of HVAC, plumbing, generators, elevators, and solar microgrid arrays." },
      { step: "03", title: "Financial & Asset Management", desc: "Automated service charge billing, transparent financial reporting, and capital reserve planning." }
    ],
    deliverables: [
      "Professional Tenant Relations & Vetting",
      "Proactive Preventive Maintenance Program",
      "Transparent Financial Management & Accounting",
      "Long-Term Asset Value Preservation",
      "Regular Property Performance & Yield Audits",
      "High Occupancy & Tenant Satisfaction"
    ]
  },
  {
    num: "04",
    title: "Project Management",
    tagline: "Meticulous planning, risk assessment, on time & within budget delivery",
    summary: "Our project management services are designed to deliver excellence at every stage. With meticulous planning, risk assessment, and seamless coordination, we bring your vision to life. Guided by professionalism and integrity, we ensure projects are completed on time, within budget, and to the highest standards. Our resilient and flexible approach guarantees that your unique goals are met with precision and care.",
    image: "/assets/consultation.jpg",
    process: [
      { step: "01", title: "Project Charters & Work Breakdown", desc: "Establishing strict milestone schedules, critical path methodology, and resource allocations." },
      { step: "02", title: "Risk Assessment & Stakeholder Matrix", desc: "Proactive identification of regulatory, logistical, and financial risks with contingency plans." },
      { step: "03", title: "Budget & Quality Assurance", desc: "Real-time cost tracking, contractor milestone sign-offs, and compliance with building codes." }
    ],
    deliverables: [
      "Structured Project Master Scheduling & PMP Oversight",
      "Comprehensive Risk Assessment & Mitigation Plans",
      "Transparent Budget Monitoring & Cost Control",
      "Stakeholder Coordination & Progress Reports",
      "Quality Assurance & Statutory Compliance Audits",
      "On-Time & On-Budget Project Commissioning"
    ]
  },
  {
    num: "05",
    title: "Facility Management",
    tagline: "Preventive maintenance, energy optimization & effective space utilization",
    summary: "Our facility management services are designed with resilience and value at the core, ensuring your assets remain functional, efficient, and long-lasting. We prioritize professionalism in every interaction, providing preventive maintenance, energy optimization, and effective space utilization. Guided by integrity and empathy, we enhance the performance of your facilities while giving you peace of mind.",
    image: "/assets/towers.jpg",
    process: [
      { step: "01", title: "Facility Audit & Baseline Mapping", desc: "Comprehensive IoT sensor audits across generators, chillers, solar arrays, and water treatment." },
      { step: "02", title: "Energy & Resource Optimization", desc: "Intelligent load balancing between solar photovoltaic panels, lithium batteries, and grid supply." },
      { step: "03", title: "24/7 Operations & Security", desc: "Round-the-clock armed gate security, biometric access, CCTV monitoring, and rapid repair crews." }
    ],
    deliverables: [
      "24/7 Preventative & Corrective Maintenance",
      "Clean Energy Optimization & Solar Grid Oversight",
      "Strategic Space Utilization & Planning",
      "Continuous Facility Performance Monitoring",
      "Asset Maintenance & Equipment Life Extension",
      "24/7 Dedicated Operational Support Desk"
    ]
  },
  {
    num: "06",
    title: "Property Sales and Leasing Services",
    tagline: "Buying, selling & leasing built on trust, integrity & market expertise",
    summary: "Whether you’re buying, selling, or leasing, our property sales and leasing services are built on trust, integrity, and a deep understanding of the market. We help clients find the perfect property or secure the right tenants with professionalism and empathy. Our value-driven approach ensures that every transaction is seamless and tailored to meet your specific needs, while delivering the best possible outcomes.",
    image: "/assets/penthouse.jpg",
    process: [
      { step: "01", title: "Buyer & Tenant Advisory Consultation", desc: "Understanding lifestyle goals, family space requirements, investment yield targets, and prime corridor locations." },
      { step: "02", title: "Private Property Viewings & Tours", desc: "Exclusive in-person VIP site inspections or 4K live interactive virtual inspections for diaspora clients." },
      { step: "03", title: "Title Verification & Closing", desc: "Certified True Copies of C of O, Deed of Assignment execution, lease drafting, and seamless key handover." }
    ],
    deliverables: [
      "Curated Portfolio of Completed & Off-Plan Luxury Homes",
      "Verified Governor’s Consent & Certificate of Occupancy",
      "Direct Developer Pricing & Structured Payment Plans",
      "Dedicated Private Property Inspections (In-Person & Virtual)",
      "Transparent Legal Conveyancing & Lease Structuring",
      "Snag-Free Handover & Comprehensive Resident Dossier"
    ]
  },
  {
    num: "07",
    title: "Short-Stay Hospitality & Booking",
    tagline: "Curated luxury serviced suites with seamless booking & 5-star hospitality",
    summary: "Showcasing premium short-stay apartments across prime Lagos addresses including our signature Benson Close waterfront 1-bedroom apartment in Ikoyi. Offering seamless WhatsApp reservations, waterfront vistas, 24/7 power, and executive concierge services.",
    image: "/assets/benson-close-1.jpg",
    process: [
      { step: "01", title: "Instant Online Booking Engine", desc: "Browse curated suites, select dates, view instant pricing, and reserve with encrypted security." },
      { step: "02", title: "VIP Concierge Check-in", desc: "Seamless key handover by housekeeper, personalized orientation, and luggage assistance." },
      { step: "03", title: "White-Glove In-Stay Hospitality", desc: "Housekeeping visits every 2 days, on-demand private chef, airport chauffeur, and 24/7 client desk." }
    ],
    deliverables: [
      "Fully Furnished Waterfront Luxury Suites (Benson Close, Ikoyi)",
      "Guaranteed 24/7 Electricity & Clean Solar Power",
      "High-Speed Uncapped Wi-Fi & Smart TV",
      "Housekeeping Visits Scheduled Every 2 Days",
      "Waterfront Views & Serene Old Ikoyi Neighborhood",
      "24/7 Security & Dedicated Covered Parking"
    ]
  }
];

// ==========================================
// BRAND IDENTITY, MISSION, VISION & CORE VALUES (From Client PDF 2)
// ==========================================
export interface CoreValueItem {
  title: string;
  desc: string;
  icon?: string;
}

export const missionVision = {
  aboutUsTitle: "Nigson Properties Limited - About Us",
  aboutUs: "Nigson Properties is the real estate development and property management arm of the Nigson Group, committed to delivering affordable luxury homes across Nigeria. We combine modern architecture, quality craftsmanship, and innovative building solutions to create residences that offer comfort, style, security, and exceptional value.\n\nOur mission is to make luxury living accessible to everyone—from young professionals and growing families to seasoned homeowners and investors. Through a full-spectrum service approach, we ensure every development is thoughtfully planned, technologically advanced, and tailored to meet the evolving needs of today's property market.\n\nWe specialize in residential development, property sales, leasing, project management, and facility management services. Every Nigson Property is designed to deliver functionality, comfort, sustainability, and long-term investment value, providing our clients with homes and assets they can enjoy with confidence for years to come.",
  mission: "We are a team of professionals that offer high-quality real estate and energy solutions that fulfills their business objectives using modern technology whilst also delivering superior returns to our shareholders.",
  vision: "The leading partner of affordable luxury housing and energy solutions.",
  visionPillars: [
    { title: "Property Excellence", desc: "Uncompromising architectural design, European engineering standards, and durable construction." },
    { title: "Investment Growth", desc: "Creating enduring capital appreciation and high rental yields across prime locations." },
    { title: "Global Reach", desc: "Delivering trusted real estate solutions for local residents and diaspora investors worldwide." }
  ]
};

export const coreValues: CoreValueItem[] = [
  {
    title: "Professionalism",
    desc: "We demonstrate a high standard of conduct and competence, ensuring reliability and accountability in our services."
  },
  {
    title: "Excellence",
    desc: "We are committed to delivering superior quality in all our services, ensuring client satisfaction."
  },
  {
    title: "Trust",
    desc: "We foster confidence through transparency, honesty, and consistent delivery of promised results."
  },
  {
    title: "Integrity",
    desc: "We uphold transparency and honesty in all our dealings, building trust with our clients and partners."
  },
  {
    title: "Value-Driven",
    desc: "We are committed to adopting responsible practices that foster sustainable growth, create a positive impact on communities, and drive continuous innovation. By relentlessly exploring new ways to create and deliver value, we aim to provide solutions that align with our clients' needs while upholding our responsibility to the environment and society."
  },
  {
    title: "Collaboration",
    desc: "We value teamwork and partnerships to achieve greater results through shared goals and mutual respect."
  },
  {
    title: "Customer-Centric",
    desc: "Our clients are at the heart of everything we do, and we strive to provide tailored solutions for every need."
  }
];

export const whyChooseUsPillars = [
  {
    title: "A Decade of Excellence",
    desc: "With over 10 years of experience in real estate, we deliver quality developments that combine modern design, functionality, and affordability.",
    iconName: "Award"
  },
  {
    title: "Secure & Safe Living",
    desc: "Our properties are designed to promote safety and peace of mind, with secure environments and carefully considered security features.",
    iconName: "Shield"
  },
  {
    title: "Sustainable Energy Solutions",
    desc: "We incorporate solar panel installations to improve energy efficiency, promote sustainability, and enhance everyday convenience.",
    iconName: "Sun"
  },
  {
    title: "Ample Parking Spaces",
    desc: "Our developments feature well-planned parking spaces that provide convenience for residents and visitors alike.",
    iconName: "Car"
  },
  {
    title: "Modern Amenities",
    desc: "From contemporary facilities to thoughtfully designed living spaces, we integrate modern amenities that enhance comfort, functionality, and quality of life.",
    iconName: "Sparkles"
  },
  {
    title: "Proper Title Documentation",
    desc: "We prioritize transparency and confidence in property ownership by ensuring appropriate title documentation and conducting due diligence to help clients make informed and secure property investments.",
    iconName: "FileCheck"
  }
];

// ==========================================
// TESTIMONIALS (BRD Section 18)
// ==========================================
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  project: string;
  location: string;
  category: 'Homeowner' | 'Investor' | 'Short-Stay Guest' | 'Property Management';
  rating: number;
  quote: string;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Dr. Chidi Okeke',
    role: 'Homeowner & Surgeon (UK Diaspora)',
    project: 'Opposite Whitesand Beach Estate',
    location: 'Ologolo, Lekki',
    category: 'Homeowner',
    rating: 5,
    quote: 'Investing from London can feel daunting, but Nigson Properties made the entire process seamless. The construction quality, 24/7 solar power, and verified title deed gave me complete peace of mind. Truly affordable luxury without compromise.',
    image: '/assets/team/olubukola-ladeinde.jpg'
  },
  {
    id: 'test-2',
    name: 'Chief (Mrs.) Folashade Balogun',
    role: 'Private Real Estate Investor',
    project: 'White Oaks Estate',
    location: 'Aro-Ologolo, Lekki',
    category: 'Investor',
    rating: 5,
    quote: 'I acquired multiple off-plan units at White Oaks Estate. The capital appreciation exceeded 35% upon completion, and Nigson delivered precisely on the agreed timeline. Their team represents the gold standard of Nigerian real estate development.',
    image: '/assets/team/ijeoma-odunukwe.jpg'
  },
  {
    id: 'test-3',
    name: 'Capt. Tunde Williams',
    role: 'International Commercial Pilot',
    project: 'Benson Close Ikoyi Suite',
    location: 'Old Ikoyi',
    category: 'Short-Stay Guest',
    rating: 5,
    quote: 'The Benson Close short-stay apartment in Ikoyi is my preferred retreat whenever I have layovers or family holidays in Lagos. The waterfront views, high-speed Starlink Wi-Fi, 24/7 electricity, and attentive housekeeping are unmatched.',
    image: '/assets/team/adedamola-adeyemi.jpg'
  },
  {
    id: 'test-4',
    name: 'Sir Godwin Eze',
    role: 'Consortium Asset Trustee',
    project: 'Nigson Villa',
    location: 'Banana Island, Lagos',
    category: 'Property Management',
    rating: 5,
    quote: 'Entrusting our Banana Island property to Nigson Properties for facility and asset management was one of our best corporate decisions. Preventive maintenance, zero power downtime, and rigorous tenant vetting have kept our asset in pristine shape.',
    image: '/assets/consultation.jpg'
  },
  {
    id: 'test-5',
    name: 'Engr. Babatunde Alabi',
    role: 'Infrastructure Director',
    project: 'Olufemi Olatunji Residences',
    location: 'Osapa, Lekki',
    category: 'Homeowner',
    rating: 5,
    quote: 'As a civil engineer myself, I inspect structural integrity with high scrutiny. Nigson’s piling, concrete quality, European sanitary fittings, and water treatment systems at Olufemi Olatunji are simply exceptional.',
    image: '/assets/team/adedamola-adeyemi.jpg'
  },
  {
    id: 'test-6',
    name: 'Lady Victoria Oshodi',
    role: 'Institutional Portfolio Owner (Monaco)',
    project: 'Corporate Facility Management',
    location: 'Victoria Island & Ikoyi',
    category: 'Property Management',
    rating: 5,
    quote: 'Living in Monaco while owning prime property in Lagos requires absolute trust. Nigson provides transparent accounting, automated tenant reporting, and flawless facility operations. Outstanding professionalism.',
    image: '/assets/team/ijeoma-odunukwe.jpg'
  }
];

// ==========================================
// PROJECT GALLERY (BRD Section 17 & 29)
// ==========================================
export interface GalleryItem {
  id: string;
  title: string;
  project: string;
  location: string;
  category: 'Completed Developments' | 'Ongoing Developments' | 'Building Exteriors' | 'Interior Finishes' | 'Kitchens & Living' | 'Amenities & Landscaping';
  image: string;
  description: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Opposite Whitesand Beach Estate - Modern Elevation',
    project: 'Opposite Whitesand Beach Estate',
    location: 'Ologolo, Lekki',
    category: 'Building Exteriors',
    image: '/assets/whitesand-1.jpg',
    description: 'Contemporary multi-level cubic facade with cantilevered balconies, integrated perimeter security, and landscaped driveway in Ologolo, Lekki.'
  },
  {
    id: 'gal-2',
    title: 'Opposite Whitesand Beach Estate - Private Pool & Deck',
    project: 'Opposite Whitesand Beach Estate',
    location: 'Ologolo, Lekki',
    category: 'Amenities & Landscaping',
    image: '/assets/whitesand-2.jpg',
    description: 'Private swimming pool with hardwood sun deck and perimeter privacy walls.'
  },
  {
    id: 'gal-3',
    title: 'Fatai Bankole - Architectural Symmetry',
    project: 'Fatai Bankole',
    location: 'Aro-Ologolo, Lekki',
    category: 'Building Exteriors',
    image: '/assets/fatai-bankole-1.jpg',
    description: 'Turnkey architectural duplexes featuring sleek geometric lines, Schuco acoustic glazing, and private parking driveways.'
  },
  {
    id: 'gal-4',
    title: 'Fatai Bankole - Rooftop Terrace & Sky Lounge',
    project: 'Fatai Bankole',
    location: 'Aro-Ologolo, Lekki',
    category: 'Amenities & Landscaping',
    image: '/assets/fatai-bankole-2.jpg',
    description: 'Rooftop entertaining deck with panoramic views toward the Lekki coastal skyline.'
  },
  {
    id: 'gal-5',
    title: 'White Oaks Estate - Gated Community Entrance',
    project: 'White Oaks Estate',
    location: 'Aro-Ologolo, Lekki',
    category: 'Completed Developments',
    image: '/assets/white-oaks-1.jpg',
    description: 'Master-planned 14-unit gated residential enclave with private internal paved boulevards and security gatehouse.'
  },
  {
    id: 'gal-6',
    title: 'White Oaks Estate - Architectural Streetscape',
    project: 'White Oaks Estate',
    location: 'Aro-Ologolo, Lekki',
    category: 'Building Exteriors',
    image: '/assets/white-oaks-2.jpg',
    description: 'Uniform modern aesthetic featuring high-grade exterior plastering, storm drainage, and underground cabling.'
  },
  {
    id: 'gal-7',
    title: 'Olufemi Olatunji - Boutique Duplex Enclave',
    project: 'Olufemi Olatunji',
    location: 'Osapa, Lekki',
    category: 'Completed Developments',
    image: '/assets/olufemi-olatunji-1.jpg',
    description: '9 exclusive residences situated on an expansive 2,100 m² plot in Osapa, Lekki.'
  },
  {
    id: 'gal-8',
    title: 'Nigson Villa - Banana Island Waterfront',
    project: 'Nigson Villa',
    location: 'Banana Island, Lagos',
    category: 'Building Exteriors',
    image: '/assets/banana-1.jpg',
    description: 'Prestigious waterfront residential estate in Banana Island with private boat slips and deep-water jetty.'
  },
  {
    id: 'gal-9',
    title: 'Benson Close - Ikoyi Short-Stay Residence',
    project: 'Benson Close',
    location: 'Ikoyi, Lagos',
    category: 'Completed Developments',
    image: '/assets/benson-close-1.jpg',
    description: 'Serene leafy retreat in Old Ikoyi operating as a luxury serviced short-stay haven.'
  },
  {
    id: 'gal-10',
    title: 'Designer Gourmet Kitchen & Scullery',
    project: 'Opposite Whitesand Beach Estate',
    location: 'Ologolo, Lekki',
    category: 'Kitchens & Living',
    image: '/assets/whitesand-3.jpg',
    description: 'Fully fitted Italian kitchen with quartz countertops, integrated German appliances, and breakfast island.'
  },
  {
    id: 'gal-11',
    title: 'Grand Living Salon with Double Height',
    project: 'Olufemi Olatunji',
    location: 'Osapa, Lekki',
    category: 'Kitchens & Living',
    image: '/assets/olufemi-olatunji-2.jpg',
    description: 'Double-volume entertaining room with bookmatched porcelain tiling and ambient cove lighting.'
  },
  {
    id: 'gal-12',
    title: 'Master Bedroom Sanctuary & Balcony',
    project: 'Fatai Bankole',
    location: 'Aro-Ologolo, Lekki',
    category: 'Interior Finishes',
    image: '/assets/fatai-bankole-3.jpg',
    description: 'Palatial master suite with walk-in dressing wardrobe, custom joinery, and private sunset balcony.'
  },
  {
    id: 'gal-13',
    title: 'Hydrotherapy Jacuzzi & Master Bath',
    project: 'Fatai Bankole',
    location: 'Aro-Ologolo, Lekki',
    category: 'Interior Finishes',
    image: '/assets/fatai-bankole-4.jpg',
    description: 'Madam’s bathroom featuring deep-soaking hydrotherapy jacuzzi, rain shower, and Spanish marble.'
  },
  {
    id: 'gal-14',
    title: 'Benson Close - Fully Furnished Waterfront Living',
    project: 'Benson Close',
    location: 'Ikoyi, Lagos',
    category: 'Interior Finishes',
    image: '/assets/benson-close-2.jpg',
    description: 'Warm contemporary living space with mid-century bespoke furniture and smart entertainment.'
  },
  {
    id: 'gal-15',
    title: 'White Oaks Coastal Community - Construction Progress',
    project: 'White Oaks Coastal Community',
    location: 'Ibeju-Lekki',
    category: 'Ongoing Developments',
    image: '/assets/community.jpg',
    description: '48-hectare master-planned coastal community featuring private beach club, green parklands, and infrastructure groundworks.'
  },
  {
    id: 'gal-16',
    title: 'Lagoon Crest Towers - Ikoyi Skyline',
    project: 'Lagoon Crest Towers',
    location: 'Ikoyi, Lagos',
    category: 'Ongoing Developments',
    image: '/assets/towers.jpg',
    description: 'Twin 28-storey aerodynamic towers rising along the Lagos lagoon with rooftop helipad and sky pool.'
  }
];

export const naira = (n: number) => "₦" + n.toLocaleString("en-NG");
export const usd = (n: number) => "$" + n.toLocaleString("en-US");
export const gbp = (n: number) => "£" + n.toLocaleString("en-GB");
export const waLink = (text: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

const STORAGE_KEY_PROPS = 'nigson_properties_catalog';
const STORAGE_KEY_PROJECTS = 'nigson_projects_catalog';
const STORAGE_KEY_SUITES = 'nigson_suites_catalog';
const STORAGE_KEY_LEADS = 'nigson_leads_catalog';

function loadStored<T>(key: string): T[] | null {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const data = localStorage.getItem(key);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore storage errors
    }
  }
  return null;
}

export function persistProperties(list: Property[]) {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.setItem(STORAGE_KEY_PROPS, JSON.stringify(list));
    } catch (e) {
      console.warn('Failed to persist properties', e);
    }
  }
}

export function persistProjects(list: Project[]) {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(list));
    } catch (e) {
      console.warn('Failed to persist projects', e);
    }
  }
}

export function persistSuites(list: Suite[]) {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.setItem(STORAGE_KEY_SUITES, JSON.stringify(list));
    } catch (e) {
      console.warn('Failed to persist suites', e);
    }
  }
}

// ==========================================
// LEAD MANAGEMENT MODELS & SEED DATA
// 7 Categories:
// 1. Property inquiries
// 2. Inspection requests
// 3. Sales leads
// 4. Leasing inquiries
// 5. Contact inquiries
// 6. Booking details
// 7. Property management inquiries
// ==========================================
export type LeadType =
  | 'Property Inquiry'
  | 'Inspection Request'
  | 'Sales Lead'
  | 'Leasing Inquiry'
  | 'Contact Inquiry'
  | 'Booking Details'
  | 'Property Management';

export type LeadStatus = 'New' | 'In Progress' | 'Scheduled' | 'Closed';

export interface Lead {
  id: string;
  type: LeadType;
  name: string;
  email: string;
  phone: string;
  property?: string;
  budget?: string;
  status: LeadStatus;
  date: string;
  preferredDate?: string;
  tourType?: 'In-Person VIP Tour' | '4K Virtual Inspection';
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  nights?: number;
  serviceCategory?: string;
  location?: string;
  notes?: string;
  source?: string;
  assignedAgent?: string;
}

export const initialLeads: Lead[] = [
  // 1. Property inquiries
  {
    id: 'ld-prop-1',
    type: 'Property Inquiry',
    name: 'Dr. Chidi Okeke',
    email: 'dr.okeke@londoncardio.uk',
    phone: '+44 7911 123456',
    property: 'The Grand Azure Waterfront Villa',
    location: 'Banana Island, Ikoyi',
    budget: '₦1.25 Billion',
    status: 'New',
    date: 'Oct 20, 2026',
    notes: 'Inquiring about private deep-water jetty depth for 38ft yacht mooring and KNX home automation schedule.',
    source: 'Property Detail Portal'
  },
  {
    id: 'ld-prop-2',
    type: 'Property Inquiry',
    name: 'Senator Patricia Adeleke',
    email: 'adeleke.patricia@nass.gov.ng',
    phone: '+234 803 442 8899',
    property: 'The Sovereign Smart Penthouse',
    location: 'Eko Atlantic City',
    budget: '₦850 Million',
    status: 'In Progress',
    date: 'Oct 19, 2026',
    notes: 'Wants architectural floor plans for Level 24 sky deck and details on dual-currency dollar escrow payment structures.',
    source: 'Direct Portal Inquiry'
  },

  // 2. Inspection requests
  {
    id: 'ld-insp-1',
    type: 'Inspection Request',
    name: 'Chief Babatunde Coker',
    email: 'coker.holdings@lagoschamber.ng',
    phone: '+234 807 346 7809',
    property: 'Maison Noir Lagoon Residence',
    location: 'Lekki Phase 1',
    budget: '₦1.6 Billion',
    preferredDate: 'Oct 25, 2026 · 02:00 PM',
    tourType: 'In-Person VIP Tour',
    status: 'Scheduled',
    date: 'Oct 21, 2026',
    notes: 'Physical on-site tour. Will be accompanied by his private architect and family attorney.',
    source: 'Inspection Scheduler'
  },
  {
    id: 'ld-insp-2',
    type: 'Inspection Request',
    name: 'Engr. Emeka Nwosu',
    email: 'emeka.nwosu@chevronoffshore.com',
    phone: '+44 7700 900123',
    property: 'The Grand Azure Waterfront Villa',
    location: 'Banana Island',
    budget: '₦1.25 Billion',
    preferredDate: 'Oct 28, 2026 · 04:30 PM WAT',
    tourType: '4K Virtual Inspection',
    status: 'New',
    date: 'Oct 20, 2026',
    notes: 'Diaspora live 4K drone & interior walkthrough from Aberdeen, UK. Requesting title verification documents.',
    source: 'Virtual Inspection Booking'
  },

  // 3. Sales leads
  {
    id: 'ld-sales-1',
    type: 'Sales Lead',
    name: 'Alh. Farouk Dangote-Bello',
    email: 'f.dangote@bellocapital.ng',
    phone: '+234 802 333 9988',
    property: 'White Oaks Coastal Community',
    location: 'Ibeju-Lekki Coastal Corridor',
    budget: '₦2.4 Billion (3-Unit Allocation)',
    status: 'In Progress',
    date: 'Oct 18, 2026',
    notes: 'Institutional investor looking for syndicate off-plan allocation across 3 waterfront luxury plots with guaranteed 28% IRR.',
    source: 'Private Wealth Referral'
  },
  {
    id: 'ld-sales-2',
    type: 'Sales Lead',
    name: 'Dr. (Mrs.) Folake Solanke',
    email: 'folake@apexholdings.ng',
    phone: '+234 803 555 7890',
    property: 'The Titanium Sky Mansion',
    location: 'Victoria Island Waterfront',
    budget: '₦1.8 Billion',
    status: 'New',
    date: 'Oct 21, 2026',
    notes: 'High net worth client requesting exclusive developer terms and immediate contract of sale.',
    source: 'Executive Referral'
  },

  // 4. Leasing inquiries
  {
    id: 'ld-lease-1',
    type: 'Leasing Inquiry',
    name: 'Marcus Van Der Merwe (TotalEnergies EP)',
    email: 'm.vandermerwe@totalenergies.fr',
    phone: '+234 814 200 4433',
    property: 'The Sovereign Smart Penthouse',
    location: 'Eko Atlantic City',
    budget: '₦45 Million / Year',
    serviceCategory: 'Corporate Diplomatic Lease',
    status: 'Scheduled',
    date: 'Oct 19, 2026',
    notes: '2-Year corporate diplomatic lease agreement requested. Requires embassy security clearance and dedicated concierge parking.',
    source: 'Corporate Relocation Desk'
  },
  {
    id: 'ld-lease-2',
    type: 'Leasing Inquiry',
    name: 'Barrister Nkemdilim Obi',
    email: 'nkem.obi@obipartners.law',
    phone: '+234 809 112 3344',
    property: 'The Grand Azure Executive Wing',
    location: 'Banana Island',
    budget: '₦60 Million / Year',
    serviceCategory: 'Long-term Residential Tenancy',
    status: 'New',
    date: 'Oct 17, 2026',
    notes: 'Long-term lease for senior partner with quarterly diplomatic break clause.',
    source: 'Website Inquiry'
  },

  // 5. Contact inquiries
  {
    id: 'ld-contact-1',
    type: 'Contact Inquiry',
    name: 'Kofi Mensah (Dubai Family Trust)',
    email: 'kofi@mensahcapital.ae',
    phone: '+971 50 123 4567',
    property: 'Corporate Consultation / Headquarters',
    location: 'Admiralty Way, Lekki Phase 1',
    budget: '₦1.5B – ₦3B+',
    status: 'In Progress',
    date: 'Oct 16, 2026',
    notes: 'Scheduled private boardroom consultation regarding prime coastal land acquisition for a diaspora luxury estate.',
    source: 'Contact Page VIP Briefing'
  },
  {
    id: 'ld-contact-2',
    type: 'Contact Inquiry',
    name: 'Elizabeth Adebayo',
    email: 'e.adebayo@goldmansachs.co.uk',
    phone: '+44 7890 654321',
    property: 'Private Client Advisory',
    location: 'Banana Island & Ikoyi',
    budget: '₦700M – ₦1.5B',
    status: 'New',
    date: 'Oct 21, 2026',
    notes: 'Requested portfolio analysis comparing off-plan capital appreciation against short-stay hospitality yield in Lagos.',
    source: 'Advisory Form'
  },

  // 6. Booking details
  {
    id: 'ld-book-1',
    type: 'Booking Details',
    name: 'Capt. Tunde Williams',
    email: 'tunde.w@virginatlantic.com',
    phone: '+44 7922 456789',
    property: 'The Admiralty Executive Suite',
    location: 'Lekki Phase 1',
    budget: '₦1,750,000',
    checkIn: 'Dec 12, 2026',
    checkOut: 'Dec 17, 2026',
    nights: 5,
    guests: 4,
    status: 'Scheduled',
    date: 'Oct 20, 2026',
    notes: '5-Night executive stay. Requested in-house chef, Range Rover chauffeur service, and daily housekeeping.',
    source: 'Short-Stay Booking Engine'
  },
  {
    id: 'ld-book-2',
    type: 'Booking Details',
    name: 'Ambassador Tariq Al-Mansoor',
    email: 'almansoor@diplomatic.ae',
    phone: '+971 52 888 7766',
    property: 'The Alexander Presidential Residence',
    location: 'Old Ikoyi',
    budget: '₦2,450,000',
    checkIn: 'Nov 02, 2026',
    checkOut: 'Nov 09, 2026',
    nights: 7,
    guests: 2,
    status: 'Closed',
    date: 'Oct 15, 2026',
    notes: 'VIP diplomatic delegation stay confirmed. Security detail, high-speed Starlink encrypted comms, and private chef deployed.',
    source: 'Diplomatic Concierge Desk'
  },

  // 7. Property management inquiries
  {
    id: 'ld-pm-1',
    type: 'Property Management',
    name: 'Sir Godwin Eze & Partners',
    email: 'godwin.eze@ezegroup.com',
    phone: '+234 803 777 4411',
    property: '4-Unit Luxury Terrace Complex',
    location: 'Parkview Estate, Ikoyi',
    budget: 'Asset Value: ₦2.8 Billion',
    serviceCategory: 'Full Turnkey Facility Management',
    status: 'In Progress',
    date: 'Oct 18, 2026',
    notes: 'Owner consortium seeking complete facility management, 24/7 solar microgrid maintenance, security personnel, and tenant vetting.',
    source: 'Corporate Service Request'
  },
  {
    id: 'ld-pm-2',
    type: 'Property Management',
    name: 'Lady Victoria Oshodi',
    email: 'victoria.oshodi@monaco-invest.mc',
    phone: '+377 93 25 11 00',
    property: 'Waterfront Tower Apartments (6 Units)',
    location: 'Victoria Island Waterfront',
    budget: 'Annual Rent Roll: ₦180 Million',
    serviceCategory: 'Premium Tenancy & Asset Preservation',
    status: 'New',
    date: 'Oct 21, 2026',
    notes: 'Owner relocating to Monaco. Requires comprehensive tenant screening, international rent collection in USD/NGN, and routine maintenance oversight.',
    source: 'Asset Owner Portal'
  }
];

export const leads: Lead[] = [...initialLeads];

export function persistLeads(list: Lead[]) {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(list));
    } catch (e) {
      console.warn('Failed to persist leads', e);
    }
  }
}

export function addLead(newLead: Omit<Lead, 'id' | 'date'> & { id?: string; date?: string }): Lead {
  const lead: Lead = {
    ...newLead,
    id: newLead.id || `ld-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    date: newLead.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };
  leads.unshift(lead);
  persistLeads(leads);
  return lead;
}

// ========================================================
// USERS, ROLES & PERMISSIONS GOVERNANCE
// ========================================================

export type UserRole =
  | 'Super Admin'
  | 'Project Director'
  | 'Senior Sales Advisor'
  | 'Hospitality & Short-Stay Desk'
  | 'Facility & Property Manager'
  | 'Verified Private Investor';

export type UserStatus = 'Active' | 'Pending Approval' | 'Suspended';

export interface AppUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  department: string;
  tier?: string;
  joinedDate: string;
  lastLogin: string;
  avatarColor?: string;
}

export interface PermissionItem {
  id: string;
  label: string;
  category: 'Properties & Inventory' | 'Master Developments' | 'Short-Stay Hospitality' | 'Lead Management & CRM' | 'Title Vault & Legal' | 'Financials & Escrow' | 'Security & Governance';
  superAdmin: boolean;
  projectDirector: boolean;
  salesAdvisor: boolean;
  hospitalityDesk: boolean;
  facilityManager: boolean;
  investor: boolean;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  target: string;
  ipAddress: string;
  status: 'Success' | 'Warning' | 'Blocked';
}

export const initialUsers: AppUser[] = [
  {
    id: 'usr-001',
    name: 'Miss Ijeoma Odunukwe',
    email: 'ijeoma.odunukwe@nigson.com',
    phone: '+234 807 346 7809',
    role: 'Super Admin',
    status: 'Active',
    department: 'Executive Board',
    tier: 'Managing Director & CEO',
    joinedDate: 'Jan 2021',
    lastLogin: '10 mins ago',
    avatarColor: 'bg-red-600'
  },
  {
    id: 'usr-002',
    name: 'Adedamola Adeyemi, PMP',
    email: 'adedamola.adeyemi@nigson.com',
    phone: '+234 913 444 6722',
    role: 'Project Director',
    status: 'Active',
    department: 'Projects & Operations',
    tier: 'Head of Operations',
    joinedDate: 'Mar 2021',
    lastLogin: '1 hour ago',
    avatarColor: 'bg-teal-600'
  },
  {
    id: 'usr-003',
    name: 'Ladeinde Olubukola',
    email: 'olubukola.ladeinde@nigson.com',
    phone: '+234 802 111 4455',
    role: 'Senior Sales Advisor',
    status: 'Active',
    department: 'Sales & Marketing',
    tier: 'Head of Commercial Sales',
    joinedDate: 'Jun 2021',
    lastLogin: '25 mins ago',
    avatarColor: 'bg-blue-600'
  },
  {
    id: 'usr-004',
    name: 'Director, Properties',
    email: 'director.properties@nigson.com',
    phone: '+234 803 999 8811',
    role: 'Super Admin',
    status: 'Active',
    department: 'Executive Committee',
    tier: 'Board Member',
    joinedDate: 'Jan 2021',
    lastLogin: 'Yesterday',
    avatarColor: 'bg-zinc-800'
  },
  {
    id: 'usr-005',
    name: 'Chinedu Nwosu',
    email: 'hospitality@nigson.com',
    phone: '+234 814 220 9900',
    role: 'Hospitality & Short-Stay Desk',
    status: 'Active',
    department: 'Hospitality Operations',
    tier: 'Benson Close Suite Concierge',
    joinedDate: 'Nov 2023',
    lastLogin: '3 hours ago',
    avatarColor: 'bg-amber-600'
  },
  {
    id: 'usr-006',
    name: 'Engr. Babatunde Fashanu',
    email: 'facilities@nigson.com',
    phone: '+234 809 555 7722',
    role: 'Facility & Property Manager',
    status: 'Active',
    department: 'Asset & Facilities',
    tier: 'Banana Island Lead Engineer',
    joinedDate: 'Aug 2022',
    lastLogin: '4 hours ago',
    avatarColor: 'bg-emerald-600'
  },
  {
    id: 'usr-007',
    name: 'Chief Adeleke',
    email: 'investor@nigson.com',
    phone: '+234 803 777 0000',
    role: 'Verified Private Investor',
    status: 'Active',
    department: 'Private Client Vault',
    tier: 'Tier 1 Investor (Whitesand & Banana Island)',
    joinedDate: 'Feb 2024',
    lastLogin: 'Today, 2:15 PM',
    avatarColor: 'bg-purple-600'
  },
  {
    id: 'usr-008',
    name: 'Dr. Ngozi Okonjo-Eze',
    email: 'n.okonjo@diasporagroup.co.uk',
    phone: '+44 7700 900123',
    role: 'Verified Private Investor',
    status: 'Active',
    department: 'UK Diaspora Syndicate',
    tier: 'Tier 1 Syndicate Lead (White Oaks Enclave)',
    joinedDate: 'May 2024',
    lastLogin: '2 days ago',
    avatarColor: 'bg-indigo-600'
  },
  {
    id: 'usr-009',
    name: 'Tunde Balogun',
    email: 'tunde.b@investorportal.ng',
    phone: '+234 705 666 4321',
    role: 'Verified Private Investor',
    status: 'Pending Approval',
    department: 'Investor Onboarding',
    tier: 'Prospective Client (KYC Verification)',
    joinedDate: 'Today',
    lastLogin: 'Never',
    avatarColor: 'bg-zinc-500'
  }
];

export const initialPermissions: PermissionItem[] = [
  // Properties & Inventory
  { id: 'p1', label: 'View Residence Dossiers & Appraisals', category: 'Properties & Inventory', superAdmin: true, projectDirector: true, salesAdvisor: true, hospitalityDesk: true, facilityManager: true, investor: true },
  { id: 'p2', label: 'Create & Publish New Residences', category: 'Properties & Inventory', superAdmin: true, projectDirector: true, salesAdvisor: false, hospitalityDesk: false, facilityManager: false, investor: false },
  { id: 'p3', label: 'Edit Pricing, Multi-Currency & Details', category: 'Properties & Inventory', superAdmin: true, projectDirector: true, salesAdvisor: true, hospitalityDesk: false, facilityManager: false, investor: false },
  { id: 'p4', label: 'Delete & Archive Listed Properties', category: 'Properties & Inventory', superAdmin: true, projectDirector: false, salesAdvisor: false, hospitalityDesk: false, facilityManager: false, investor: false },

  // Master Developments
  { id: 'p5', label: 'View Master Construction Progress', category: 'Master Developments', superAdmin: true, projectDirector: true, salesAdvisor: true, hospitalityDesk: false, facilityManager: true, investor: true },
  { id: 'p6', label: 'Certify & Update Piling / Milestone %', category: 'Master Developments', superAdmin: true, projectDirector: true, salesAdvisor: false, hospitalityDesk: false, facilityManager: false, investor: false },
  { id: 'p7', label: 'Upload Site Drone Visuals & Layouts', category: 'Master Developments', superAdmin: true, projectDirector: true, salesAdvisor: false, hospitalityDesk: false, facilityManager: false, investor: false },

  // Short-Stay Hospitality
  { id: 'p8', label: 'View Benson Close Reservation Matrix', category: 'Short-Stay Hospitality', superAdmin: true, projectDirector: false, salesAdvisor: true, hospitalityDesk: true, facilityManager: false, investor: false },
  { id: 'p9', label: 'Approve & Manage Guest Check-in / Out', category: 'Short-Stay Hospitality', superAdmin: true, projectDirector: false, salesAdvisor: false, hospitalityDesk: true, facilityManager: false, investor: false },
  { id: 'p10', label: 'Modify Suite Rates & Caution Deposits', category: 'Short-Stay Hospitality', superAdmin: true, projectDirector: false, salesAdvisor: false, hospitalityDesk: true, facilityManager: false, investor: false },

  // Lead Management & CRM
  { id: 'p11', label: 'View All Inquiries, Sales & Inspections', category: 'Lead Management & CRM', superAdmin: true, projectDirector: true, salesAdvisor: true, hospitalityDesk: true, facilityManager: true, investor: false },
  { id: 'p12', label: 'Assign Leads & Update Interaction Status', category: 'Lead Management & CRM', superAdmin: true, projectDirector: false, salesAdvisor: true, hospitalityDesk: true, facilityManager: true, investor: false },
  { id: 'p13', label: 'Export Lead Ledger to CSV / Spreadsheets', category: 'Lead Management & CRM', superAdmin: true, projectDirector: false, salesAdvisor: true, hospitalityDesk: false, facilityManager: false, investor: false },

  // Title Vault & Legal
  { id: 'p14', label: 'View Approved Title Deeds & C of O', category: 'Title Vault & Legal', superAdmin: true, projectDirector: true, salesAdvisor: true, hospitalityDesk: false, facilityManager: false, investor: true },
  { id: 'p15', label: 'Upload Verified Survey Plans & Governor’s Consent', category: 'Title Vault & Legal', superAdmin: true, projectDirector: true, salesAdvisor: false, hospitalityDesk: false, facilityManager: false, investor: false },
  { id: 'p16', label: 'Download Watermarked Architectural Blueprints', category: 'Title Vault & Legal', superAdmin: true, projectDirector: true, salesAdvisor: false, hospitalityDesk: false, facilityManager: false, investor: true },

  // Financials & Escrow
  { id: 'p17', label: 'View Corporate Escrow & Pricing Schedules', category: 'Financials & Escrow', superAdmin: true, projectDirector: false, salesAdvisor: true, hospitalityDesk: false, facilityManager: false, investor: true },
  { id: 'p18', label: 'Configure Banking Gateways & Paystack Keys', category: 'Financials & Escrow', superAdmin: true, projectDirector: false, salesAdvisor: false, hospitalityDesk: false, facilityManager: false, investor: false },

  // Security & Governance
  { id: 'p19', label: 'Manage Users, Roles & Revoke Access', category: 'Security & Governance', superAdmin: true, projectDirector: false, salesAdvisor: false, hospitalityDesk: false, facilityManager: false, investor: false },
  { id: 'p20', label: 'Access System Security Audit Logs', category: 'Security & Governance', superAdmin: true, projectDirector: true, salesAdvisor: false, hospitalityDesk: false, facilityManager: false, investor: false }
];

export const initialAuditLogs: AuditLogItem[] = [
  { id: 'log-101', timestamp: '12 mins ago', actor: 'Miss Ijeoma Odunukwe', role: 'Super Admin', action: 'Price Calibration', target: 'Opposite Whitesand (₦245M)', ipAddress: '102.89.43.12 (Lagos)', status: 'Success' },
  { id: 'log-102', timestamp: '45 mins ago', actor: 'Adedamola Adeyemi, PMP', role: 'Project Director', action: 'Milestone Updated', target: 'White Oaks Enclave (100% Sold Out)', ipAddress: '197.210.52.88 (Lekki)', status: 'Success' },
  { id: 'log-103', timestamp: '1 hour ago', actor: 'Ladeinde Olubukola', role: 'Senior Sales Advisor', action: 'Lead Assigned', target: 'Lead #LD-804 to Lekki Sales Desk', ipAddress: '105.112.98.14 (Victoria Island)', status: 'Success' },
  { id: 'log-104', timestamp: '2 hours ago', actor: 'Chinedu Nwosu', role: 'Hospitality Desk', action: 'Booking Confirmed', target: 'Benson Close Suite (Nov 12-16)', ipAddress: '197.211.33.5 (Ikoyi)', status: 'Success' },
  { id: 'log-105', timestamp: '3 hours ago', actor: 'Tunde Balogun', role: 'Verified Private Investor', action: 'New Registration', target: 'Investor Portal (Pending Approval)', ipAddress: '102.89.22.19 (Abuja)', status: 'Warning' },
  { id: 'log-106', timestamp: '5 hours ago', actor: 'System Security Guard', role: 'Automated Shield', action: 'Failed Login Blocked', target: 'Admin Console (3 Invalid Attempts)', ipAddress: '185.220.101.5 (Tor Exit)', status: 'Blocked' },
  { id: 'log-107', timestamp: 'Yesterday', actor: 'Chief Adeleke', role: 'Verified Private Investor', action: 'Vault Document Download', target: 'Governor’s Consent Deed PDF', ipAddress: '197.210.45.10 (Banana Island)', status: 'Success' }
];

export const STORAGE_KEY_USERS = 'nigson_admin_users';
export const STORAGE_KEY_PERMISSIONS = 'nigson_admin_permissions';
export const STORAGE_KEY_AUDIT = 'nigson_admin_audit_logs';

export const users: AppUser[] = [...initialUsers];
export const permissions: PermissionItem[] = [...initialPermissions];
export const auditLogs: AuditLogItem[] = [...initialAuditLogs];

export function persistUsers(list: AppUser[]): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(list));
    } catch (e) {
      console.warn('Failed to persist users', e);
    }
  }
}

export function persistPermissions(list: PermissionItem[]): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY_PERMISSIONS, JSON.stringify(list));
    } catch (e) {
      console.warn('Failed to persist permissions', e);
    }
  }
}

export function persistAuditLogs(list: AuditLogItem[]): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY_AUDIT, JSON.stringify(list));
    } catch (e) {
      console.warn('Failed to persist audit logs', e);
    }
  }
}

// Hydrate initial arrays from localStorage if present
if (typeof window !== 'undefined') {
  const storedP = loadStored<Property>(STORAGE_KEY_PROPS);
  if (storedP) {
    properties.splice(0, properties.length, ...storedP);
  }
  const storedPrj = loadStored<Project>(STORAGE_KEY_PROJECTS);
  if (storedPrj) {
    const defaultMap = new Map(projects.map(p => [p.id, p]));
    const merged = storedPrj.map(p => {
      const def = defaultMap.get(p.id);
      if (def) {
        return {
          ...def,
          ...p,
          image: def.image,
          renderings: def.renderings,
          status: def.status,
          statusType: def.statusType,
          units: def.units,
          unitCount: def.unitCount,
          category: def.category,
          location: def.location
        };
      }
      return p;
    });
    for (const p of projects) {
      if (!merged.some(m => m.id === p.id)) {
        merged.push(p);
      }
    }
    projects.splice(0, projects.length, ...merged);
    persistProjects(projects);
  }
  const storedS = loadStored<Suite>(STORAGE_KEY_SUITES);
  if (storedS) {
    suites.splice(0, suites.length, ...storedS);
  }
  const storedL = loadStored<Lead>(STORAGE_KEY_LEADS);
  if (storedL) {
    leads.splice(0, leads.length, ...storedL);
  }
  const storedU = loadStored<AppUser>(STORAGE_KEY_USERS);
  if (storedU) {
    users.splice(0, users.length, ...storedU);
  }
  const storedPerm = loadStored<PermissionItem>(STORAGE_KEY_PERMISSIONS);
  if (storedPerm) {
    permissions.splice(0, permissions.length, ...storedPerm);
  }
  const storedAudit = loadStored<AuditLogItem>(STORAGE_KEY_AUDIT);
  if (storedAudit) {
    auditLogs.splice(0, auditLogs.length, ...storedAudit);
  }
}


