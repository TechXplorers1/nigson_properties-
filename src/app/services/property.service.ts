import { Injectable, signal, computed } from '@angular/core';
import { 
  Property, 
  PropertyStatus,
  Amenity,
  ServiceItem, 
  Testimonial, 
  TeamMember, 
  ProjectSummary, 
  InspectionRequest, 
  PropertyInquiry, 
  GalleryItem
} from '../models/property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  // Properties list grounded directly in Nigson Properties BRD
  private readonly propertiesData: Property[] = [
    {
      id: 'grand-azure-banana-island',
      title: 'The Grand Azure Waterfront Villa',
      slug: 'grand-azure-waterfront-villa-banana-island',
      location: 'Ocean Drive, Banana Island, Ikoyi, Lagos',
      neighborhoodArea: 'Banana Island, Ikoyi',
      category: 'sales',
      categoryLabel: '',
      status: 'Available for Sale',
      purpose: 'sale',
      price: '₦650,000,000',
      numericPrice: 650000000,
      units: 1,
      propertyType: 'Villa',
      bedrooms: 5,
      bathrooms: 6,
      size: '620 sqm',
      featured: true,
      heroImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'The Grand Azure Waterfront Villa stands as an ultra-luxury private architectural trophy nestled directly along Ocean Drive on Banana Island. Featuring an exclusive private lagoon boat jetty, double-volume living salon, infinity-edge swimming pool, and Italian marble finishes throughout.',
      features: [
        '5 ultra-spacious ensuite bedrooms with walk-in dressing suites',
        'Private waterfront jetty access for luxury boat mooring',
        'Infinity swimming pool overlooking the tranquil Lagos lagoon',
        'Gourmet Italian show kitchen with integrated Gaggenau appliances',
        'Secondary industrial prep kitchen for catering and events',
        'Private 4K Dolby Atmos cinema room with acoustic wall panelling',
        '20kVA integrated solar-battery hybrid backup system',
        'Dedicated multi-car private motor court for up to 6 vehicles',
        'Biometric access control, perimeter motion sensors & 24/7 armed patrol',
        'Independent 2-room staff quarters (BQ)'
      ],
      amenities: [
        { icon: 'ri-anchor-line', label: 'Private Boat Jetty' },
        { icon: 'ri-water-flash-fill', label: 'Infinity Pool' },
        { icon: 'ri-film-line', label: 'Cinema Room' },
        { icon: 'ri-sun-line', label: '20kVA Solar Hybrid' },
        { icon: 'ri-shield-keyhole-line', label: 'Armed Security' },
        { icon: 'ri-car-line', label: '6-Car Motor Court' }
      ],
      neighborhoodHighlights: [
        'Nigeria’s most prestigious and secure residential address',
        'Direct water commute connectivity to Victoria Island and Ikoyi clubs',
        'Unmatched capital preservation and generational wealth appreciation'
      ],
      specifications: {
        'Title': 'Federal Republic of Nigeria Certificate of Occupancy (C of O)',
        'Structure': 'Marine-grade reinforced concrete pile foundation & structural framing',
        'Finishes': 'Calacatta marble tiling, Antonio Lupi luxury sanitary fixtures',
        'Power': 'Dual 24/7 dedicated Island grid + 20kVA solar hybrid generation'
      }
    },
    {
      id: 'sovereign-residence-lekki',
      title: 'The Sovereign Smart Luxury Residence',
      slug: 'sovereign-smart-luxury-residence-lekki',
      location: 'Admiralty Way Axis, Lekki Phase 1, Lagos',
      neighborhoodArea: 'Lekki Phase 1',
      category: 'sales',
      categoryLabel: '',
      status: 'Available for Sale',
      purpose: 'sale',
      price: '₦285,000,000',
      numericPrice: 285000000,
      units: 1,
      propertyType: 'Duplex',
      bedrooms: 5,
      bathrooms: 6,
      size: '520 sqm',
      featured: true,
      heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'An avant-garde contemporary masterpiece situated just off Admiralty Way in prime Lekki Phase 1. The Sovereign combines automated smart home infrastructure, a rooftop cocktail jacuzzi, soaring double-height ceilings, and supreme energy resilience.',
      features: [
        '5 lavish ensuite bedrooms with custom Spanish porcelain tiles',
        'Opulent master suite with private sky lounge & hydro-massage jacuzzi',
        'Full home automation with mobile and voice-controlled lighting and HVAC',
        'Dedicated acoustic cinema room with 4K projection setup',
        'Open-plan chef kitchen with quartz island counter & German appliances',
        '15kVA solar inverter hybrid system with lithium battery storage',
        'Central water purification plant with continuous pressure pumps',
        'Spacious parking for 4 vehicles with motorized security sliding gate',
        'Ensuite domestic staff quarters (BQ)'
      ],
      amenities: [
        { icon: 'ri-smartphone-line', label: 'Smart Home Automation' },
        { icon: 'ri-hot-tub-line', label: 'Rooftop Jacuzzi' },
        { icon: 'ri-film-line', label: 'Cinema Room' },
        { icon: 'ri-sun-fill', label: '15kVA Solar Hybrid' },
        { icon: 'ri-shield-check-line', label: 'Motorized Gate' },
        { icon: 'ri-home-4-line', label: 'Ensuite BQ' }
      ],
      neighborhoodHighlights: [
        'Walking distance to prime Lekki Phase 1 dining, boutiques, and lounges',
        '4 minutes drive to the Lekki-Ikoyi Link Bridge',
        'Projected annual rental yield of ₦22M - ₦26M for high-yield investors'
      ],
      specifications: {
        'Title': 'Governor’s Consent & Registered Deed of Assignment',
        'Automation': 'Control4 smart home hub with integrated voice & tablet control',
        'Sanitary': 'Hansgrohe concealed valves & Catalano Italian sanitaryware'
      }
    },
    {
      id: 'obsidian-penthouse-ikoyi',
      title: 'The Obsidian Contemporary Sky Penthouse',
      slug: 'obsidian-contemporary-sky-penthouse-ikoyi',
      location: 'Alexander Road Axis, Old Ikoyi, Lagos',
      neighborhoodArea: 'Ikoyi, Lagos',
      category: 'sales',
      categoryLabel: '',
      status: 'Available for Sale',
      purpose: 'sale',
      price: '₦420,000,000',
      numericPrice: 420000000,
      units: 1,
      propertyType: 'Penthouse',
      bedrooms: 4,
      bathrooms: 5,
      size: '480 sqm',
      featured: true,
      heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'Perched above Old Ikoyi, The Obsidian is an elite 4-bedroom duplex sky penthouse delivering sweeping 360-degree panoramic vistas of the Lagos coastline. Featuring a private keycard-operated elevator, expansive wrap-around sky terrace, and world-class building amenities.',
      features: [
        '4 grand master suites with floor-to-ceiling soundproof acoustic glazing',
        'Private high-speed keycard internal elevator direct to foyer',
        'Expansive wrap-around sky terrace with outdoor cocktail lounge',
        'Custom Arclinea designer kitchen with integrated Miele appliances',
        'Private temperature-controlled wine cellar and cigar lounge',
        '24/7 dedicated clean power grid backed by dual synchronised generators',
        'Communal 25-meter heated lap pool, state-of-the-art gym & sauna',
        'Covered basement parking for 3 executive vehicles'
      ],
      amenities: [
        { icon: 'ri-building-line', label: 'Private Elevator' },
        { icon: 'ri-water-flash-line', label: 'Lap Pool & Sauna' },
        { icon: 'ri-building-2-line', label: 'Sky Lounge Terrace' },
        { icon: 'ri-flashlight-line', label: '24/7 Unbroken Power' },
        { icon: 'ri-shield-star-line', label: 'Concierge & Security' },
        { icon: 'ri-car-line', label: 'Basement Parking' }
      ],
      neighborhoodHighlights: [
        'Immediate proximity to Ikoyi Club 1938 and Southern Sun Ikoyi',
        '5 minutes drive to Victoria Island financial district',
        'Highly secure consular and executive residential quarter'
      ],
      specifications: {
        'Title': 'Lagos State Certificate of Occupancy (C of O) & Governor’s Consent',
        'Flooring': 'Imported Statuario Italian marble & engineered European oak parquet'
      }
    },
    {
      id: 'pearl-horizon-osapa',
      title: 'The Pearl Horizon Luxury Duplex',
      slug: 'pearl-horizon-luxury-duplex-osapa',
      location: 'Osapa London, Lekki, Lagos',
      neighborhoodArea: 'Osapa London, Lekki',
      category: 'sales',
      categoryLabel: '',
      status: 'Available for Sale',
      purpose: 'sale',
      price: '₦195,000,000',
      numericPrice: 195000000,
      units: 1,
      propertyType: 'Duplex',
      bedrooms: 4,
      bathrooms: 5,
      size: '410 sqm',
      featured: true,
      heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'Nestled in prime Osapa London within walking distance to Circle Mall, The Pearl Horizon offers 4 spacious ensuite bedrooms with pristine contemporary architecture, double-volume ceilings, private family lounge, and round-the-clock solar backup.',
      features: [
        '4-bedroom fully detached luxury duplex with contemporary facade',
        'Double-volume family lounge with ambient perimeter LED lighting',
        'All bedrooms ensuite with high-end Spanish vitrified ceramics',
        'Fully fitted Italian kitchen with breakfast counter and burner hobs',
        'Integrated 12kVA solar panel array and inverter power system',
        'Central water purification plant with automatic pressurized delivery',
        'Spacious paved compound accommodating up to 4 large vehicles',
        'Ensuite maid’s room / Boys Quarters (BQ)',
        'Automated gate control and CCTV surveillance'
      ],
      amenities: [
        { icon: 'ri-sun-line', label: '12kVA Solar Inverter' },
        { icon: 'ri-drop-line', label: 'Industrial Water Plant' },
        { icon: 'ri-car-line', label: '4-Car Paved Driveway' },
        { icon: 'ri-shield-check-line', label: 'CCTV & Gatehouse' },
        { icon: 'ri-shopping-bag-3-line', label: '2 Mins to Circle Mall' }
      ],
      neighborhoodHighlights: [
        '2 minutes drive to Circle Mall (Shoprite, cinema, pharmacies)',
        'Fast connection to Lekki-Epe Expressway and Victoria Island',
        'Established, quiet family-oriented gated community with tarred roads'
      ],
      specifications: {
        'Title': 'Governor’s Consent & Registered Survey',
        'Finishes': 'POP ceilings, magnetic architectural track lighting, Spanish ceramics'
      }
    },
    {
      id: 'monarch-coastal-villa-ologolo',
      title: 'The Monarch Coastal Villa',
      slug: 'monarch-coastal-villa-ologolo',
      location: 'Beach Road Axis, Ologolo, Lekki, Lagos',
      neighborhoodArea: 'Ologolo, Lekki',
      category: 'sales',
      categoryLabel: '',
      status: 'Available for Sale',
      purpose: 'sale',
      price: '₦340,000,000',
      numericPrice: 340000000,
      units: 1,
      propertyType: 'Villa',
      bedrooms: 5,
      bathrooms: 6,
      size: '550 sqm',
      featured: true,
      heroImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'A pristine coastal residence located along the Beach Road corridor in Ologolo, Lekki. The Monarch Coastal Villa boasts a private outdoor swimming pool, double-volume living salon, rooftop sunset deck, and complete renewable solar independence.',
      features: [
        '5 ultra-luxury ensuite bedrooms with custom European built-in closets',
        'Private outdoor swimming pool with poolside sun terrace & shower',
        'Rooftop sunset deck with views of the Atlantic shoreline',
        'Grand master suite with balcony, walk-in dressing salon & spa jacuzzi',
        'Chef’s kitchen fitted with quartz counters, heat extractor & microwave',
        'Integrated 15kVA solar hybrid battery power generation',
        'Dedicated 2-room staff quarters (BQ)',
        'Underground storm drainage and concrete-paved private driveway'
      ],
      amenities: [
        { icon: 'ri-water-flash-fill', label: 'Private Swimming Pool' },
        { icon: 'ri-sun-line', label: '15kVA Solar Hybrid' },
        { icon: 'ri-building-2-line', label: 'Rooftop Sunset Deck' },
        { icon: 'ri-hot-tub-line', label: 'Spa Hydro Jacuzzi' },
        { icon: 'ri-car-line', label: 'Spacious Parking' }
      ],
      neighborhoodHighlights: [
        'Walking distance to Ologolo coastline and beach leisure venues',
        '4 minutes drive to Lekki-Epe Expressway and Circle Mall',
        'High-demand corridor for long-term luxury executive leases'
      ],
      specifications: {
        'Title': 'Governor’s Consent & Registered Deed of Assignment',
        'Structure': 'Reinforced concrete frame, damp-proof membrane & thermal insulation'
      }
    },
    {
      id: 'imperial-crest-chevron',
      title: 'The Imperial Crest Executive Terraces',
      slug: 'imperial-crest-executive-terraces-chevron',
      location: 'Chevron Tollgate Corridor, Lekki, Lagos',
      neighborhoodArea: 'Chevron Corridor, Lekki',
      category: 'sales',
      categoryLabel: '',
      status: 'Completed & Sold Out',
      purpose: 'completed',
      price: '₦175,000,000',
      numericPrice: 175000000,
      units: 8,
      propertyType: 'Terrace',
      bedrooms: 4,
      bathrooms: 5,
      size: '380 sqm each',
      featured: false,
      heroImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'A delivered flagship residential development positioned within the secure Chevron Tollgate corridor. Featuring 8 executive 4-bedroom terrace homes with paved private roadways, underground electrification, and round-the-clock estate management.',
      features: [
        '4-bedroom executive terrace homes delivered with premium finishes',
        'All bedrooms ensuite with high-grade European ceramic sanitary fixtures',
        'Private family lounge plus expansive open-plan ground floor reception',
        'Fitted contemporary kitchen with polished granite countertops',
        'Central solar hybrid power inverter installed per unit',
        'Paved estate access with underground stormwater drainage',
        '24/7 security patrol, access gatehouse and CCTV perimeter protection',
        'Self-contained Boys Quarters (BQ)'
      ],
      amenities: [
        { icon: 'ri-flashlight-line', label: '24/7 Clean Power' },
        { icon: 'ri-road-map-line', label: 'Paved Estate Avenue' },
        { icon: 'ri-shield-check-line', label: 'Gated Security Patrol' },
        { icon: 'ri-drop-line', label: 'Estate Water Supply' },
        { icon: 'ri-home-4-line', label: 'Ensuite BQ' }
      ],
      neighborhoodHighlights: [
        'Strategically located near Chevron Nigeria Limited corporate headquarters',
        'Easy commute to Lekki Conservation Centre and Victoria Garden City (VGC)',
        'Consistent rental yields exceeding ₦12M per annum'
      ],
      specifications: {
        'Title': 'Governor’s Consent & Certificate of Occupancy',
        'Status': 'Delivered on schedule with 100% owner occupancy'
      }
    }
  ];

  // 7 Core Services specified in Section 7 of BRD
  private readonly servicesData: ServiceItem[] = [
    {
      id: 'building-construction',
      number: '01',
      title: 'Building Construction',
      tagline: 'Affordable Luxury Built on Quality & Structural Integrity',
      shortDescription: 'Delivering luxurious yet affordable residential and commercial buildings while maintaining highest craftsmanship, innovation, and cost-effectiveness.',
      fullDescription: 'At Nigson Properties, building construction is rooted in our philosophy of affordable luxury. We utilize certified structural engineers, premium European and local materials, and advanced sustainable practices. From foundation to finishing, every home is engineered with family-friendly layouts, smart home tech, solar power integration, and aging-in-place features that endure for generations.',
      icon: 'ri-building-2-line',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80',
      highlights: [
        'Modern architectural designs with aesthetic elegance',
        'Smart home technology integration (lighting, audio, security)',
        'Built-in solar power & inverter backup solutions',
        'Premium infrastructure with underground drainage & tarred road networks',
        'Family-friendly layouts & aging-in-place universal accessibility',
        'Advanced perimeter security & access control automation',
        'Eco-friendly and sustainable building solutions'
      ],
      deliverables: [
        'Architectural design & 3D visualizations',
        'Structural engineering & foundation safety audits',
        'Full turnkey construction and site management',
        'Interior finishing & bespoke joinery'
      ]
    },
    {
      id: 'project-development',
      number: '02',
      title: 'Project Development',
      tagline: 'From Concept to Completion: Seamless Real Estate Execution',
      shortDescription: 'Guiding visionary real estate projects through feasibility, master planning, architectural design, execution, and handover with unmatched precision.',
      fullDescription: 'Nigson Properties manages real estate projects end-to-end: Concept → Feasibility → Design → Development → Construction → Completion. We bridge strategic market insight with rigorous financial modeling and regulatory approval mastery, transforming raw land into thriving, high-yield luxury communities.',
      icon: 'ri-draft-line',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80',
      highlights: [
        'Comprehensive feasibility studies & financial viability modeling',
        'Innovative architectural design & urban master planning',
        'Rigorous development planning & milestone scheduling',
        'Regulatory approvals, Governor’s Consent & building permits',
        'Stringent quality control & environmental impact assessments',
        'Sustainable development with green energy footprints'
      ],
      deliverables: [
        'Market demand & valuation reports',
        'Land acquisition & title perfection',
        'Development timeline & budget tracking',
        'Turnkey handover to owners & investors'
      ]
    },
    {
      id: 'property-management',
      number: '03',
      title: 'Property Management',
      tagline: 'Preserving Asset Value, Maximizing Rental Returns',
      shortDescription: 'Professional management ensuring properties remain profitable, pristine, well-maintained, and completely stress-free for landlords and tenants.',
      fullDescription: 'We relieve property owners and diaspora investors of the daily operational burdens of real estate ownership. Our property management team handles rigorous tenant vetting, tenancy administration, rent collection, routine and emergency maintenance, and comprehensive financial reporting. We treat every property as a high-performing investment asset.',
      icon: 'ri-home-gear-line',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80',
      highlights: [
        'Tenant relations & dedicated resident communication channels',
        'Preventive & scheduled routine maintenance protocols',
        'Transparent financial accounting, rent collection & disbursement',
        'Long-term asset value preservation and appreciation',
        '24/7 emergency response for plumbing, electrical & HVAC',
        'Facility operations & space optimization'
      ],
      deliverables: [
        'Rigorous tenant vetting & background checks',
        'Automated rent invoicing & recovery',
        'Monthly & quarterly landlord statement reports',
        'Asset condition inspection reports'
      ]
    },
    {
      id: 'project-management',
      number: '04',
      title: 'Project Management',
      tagline: 'On Time. Within Budget. Built to the Highest Standards.',
      shortDescription: 'Expert project governance managing planning, risk, budget controls, and stakeholder coordination to guarantee benchmark project delivery.',
      fullDescription: 'Led by certified Project Management Professionals (PMP), Nigson Properties provides institutional-grade project management services for private developers, corporate bodies, and joint-venture partnerships. We ensure zero compromise on construction standards while guarding schedules and budgets vigilantly.',
      icon: 'ri-task-line',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
      highlights: [
        'Detailed work-breakdown structures & critical path scheduling',
        'Proactive risk assessment, mitigation & health and safety (HSE)',
        'Cross-functional stakeholder and contractor coordination',
        'Stringent budget monitoring & cost control audits',
        'Material quality verification & testing before installation',
        'Milestone-driven project completion and handover protocols'
      ],
      deliverables: [
        'Comprehensive Project Charter & Execution Plan',
        'Real-time cost variance & milestone dashboards',
        'Contractor KPI evaluation and compliance tracking',
        'Punch-list resolution & commissioning documentation'
      ]
    },
    {
      id: 'facility-management',
      number: '05',
      title: 'Facility Management',
      tagline: 'Maximizing Efficiency, Prolonging Infrastructure Life',
      shortDescription: 'Integrated facility management solutions optimizing energy, water, space, and preventive maintenance across residential estates and commercial assets.',
      fullDescription: 'We provide end-to-end facility operations that keep modern developments functioning at peak performance. From industrial water treatment and synchronized solar-generator hybrid grids to smart HVAC optimization and access security, we protect your physical infrastructure and reduce operational lifecycle costs.',
      icon: 'ri-settings-4-line',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=80',
      highlights: [
        'Preventive maintenance programs for electro-mechanical systems',
        'Energy optimization & solar power management',
        'Space utilization analysis and architectural longevity planning',
        'Industrial reverse osmosis & water treatment operation',
        'Perimeter security, CCTV, and firefighting system readiness',
        'Operational support with certified on-site technicians'
      ],
      deliverables: [
        'Facility audit & energy efficiency diagnostics',
        '24/7 on-call engineering response team',
        'Predictive maintenance schedules & vendor management',
        'Health, safety, and regulatory compliance certificates'
      ]
    },
    {
      id: 'property-sales-acquisitions',
      number: '06',
      title: 'Property Sales & Acquisitions',
      tagline: 'Connecting Discerning Buyers & Quality Properties with Trust',
      shortDescription: 'Targeted marketing, professional advisory, buyer viewings, and transparent contract negotiation for residential acquisitions and high-grade developments.',
      fullDescription: 'Navigating the Lagos luxury real estate market demands deep market intelligence, transparency, and verified legal standing. Whether you are acquiring your dream family duplex in Lekki, securing an off-plan investment in Banana Island, or exploring prime commercial assets in Victoria Island, our sales and advisory team provides discreet, honest, and results-driven brokerage services.',
      icon: 'ri-shake-hands-line',
      image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=900&q=80',
      highlights: [
        'Exclusive portfolio of verified title properties in prime Lagos nodes',
        'Strategic digital and private network property marketing',
        'Thorough buyer financial pre-qualification and consultation',
        'Accompanied private property viewings & virtual live walk-throughs',
        'Transparent title verification & legal conveyance coordination',
        'Personalized property investment advisory for diaspora clients'
      ],
      deliverables: [
        'Customized property matching based on lifestyle & budget',
        'Contract of sale, deed of assignment & conveyance coordination',
        'Mortgage and payment plan structuring support',
        'After-sale onboarding and property handover'
      ]
    }
  ];

  // Project portfolio summary directly from Section 12 table in BRD
  private readonly projectSummariesData: ProjectSummary[] = [
    {
      name: 'White Oaks Residential Master Community',
      location: 'Aro-Ologolo, Lekki Corridor',
      units: 14,
      status: 'Completed & Sold Out',
      category: 'Civil & Building Construction',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80',
      completionYear: 'Delivered & Commissioned'
    },
    {
      name: 'Fatai Bankole Multi-Unit Enclave',
      location: 'Aro-Ologolo, Lekki Phase 1 Axis',
      units: 7,
      status: 'Completed & Sold Out',
      category: 'Building Construction',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80',
      completionYear: 'Delivered On Schedule'
    },
    {
      name: 'Olufemi Olatunji Gated Community',
      location: 'Osapa London, Lekki',
      units: 9,
      status: 'Completed & Sold Out',
      category: 'Urban Development & Construction',
      image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=900&q=80',
      completionYear: 'Delivered & Handed Over'
    },
    {
      name: 'Whitesand Coastal Master Development',
      location: 'Lekki Beach Road Corridor, Ologolo',
      units: 18,
      status: 'Ongoing Development',
      category: 'Waterfront Civil Engineering',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80',
      completionYear: 'Target Q4 2026'
    },
    {
      name: 'Ikoyi Lagoon Crest Commercial Towers',
      location: 'Osborne Foreshore, Ikoyi, Lagos',
      units: 24,
      status: 'Ongoing Development',
      category: 'Commercial Civil Engineering',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
      completionYear: 'Target Q2 2027'
    },
    {
      name: 'Banana Island Marine & Drainage Infrastructure',
      location: 'Ocean Drive, Banana Island, Lagos',
      units: 1,
      status: 'Completed & Sold Out',
      category: 'Water Infrastructure & Civil Engineering',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80',
      completionYear: 'Delivered & Commissioned'
    }
  ];

  // Leadership Team from Section 30 of BRD
  private readonly leadershipTeamData: TeamMember[] = [
    {
      name: 'Miss Ijeoma Odunukwe',
      title: 'Managing Director & CEO',
      credentials: 'Executive Leadership',
      roleDescription: 'Visionary real estate executive guiding the strategic growth of Nigson Properties Limited. Committed to reshaping affordable luxury living across Nigeria with integrity, innovation, and long-term value creation.',
      image: '/images/team/ijeoma-odunukwe.jpg'
    },
    {
      name: 'Olubukola Ladeinde',
      title: 'Head of Sales & Marketing',
      credentials: 'Real Estate Portfolio Strategist',
      roleDescription: 'Seasoned property investment strategist specializing in prime Lagos residential acquisitions, diaspora client relations, high-net-worth portfolio management, and strategic asset marketing.',
      image: '/images/team/olubukola-ladeinde.jpg'
    },
    {
      name: 'Adedamola Adeyemi, PMP',
      title: 'Head, Projects & Operations',
      credentials: 'PMP Certified Project Director',
      roleDescription: 'Certified Project Management Professional with over 15 years leading high-complexity civil engineering, property development, and luxury residential projects from conception to punctual completion.',
      image: '/images/team/adedamola-adeyemi.jpg'
    }
  ];

  // Testimonials directly relevant to BRD Section 18
  private readonly testimonialsData: Testimonial[] = [
    {
      id: 'test-1',
      clientName: 'Chief Emeka & Dr. Vivian Okafor',
      role: 'Homeowners',
      propertyOrProject: 'White Oaks Estate, Ologolo',
      clientType: 'Homeowner',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      quote: 'Buying our duplex in White Oaks Estate was the smoothest real estate decision we ever made. The solar inverter setup means our family enjoys 24/7 power without the headache of constant generator maintenance. Nigson Properties delivered exactly what they promised!'
    },
    {
      id: 'test-2',
      clientName: 'Tunde & Folashade Balogun',
      role: 'Diaspora Real Estate Investors (London, UK)',
      propertyOrProject: 'Opposite Whitesand Beach Estate',
      clientType: 'Diaspora Investor',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      quote: 'Investing from abroad can be terrifying, but the transparency from Miss Ijeoma Odunukwe and the Nigson team gave us complete peace of mind. Every milestone was documented with video progress reports, and our title documentation was seamless.'
    },
    {
      id: 'test-3',
      clientName: 'Marcus Vance',
      role: 'Private Investor & Luxury Homeowner',
      propertyOrProject: 'Lekki Pearl Residences',
      clientType: 'Homeowner',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      quote: 'The team at Nigson Properties made acquiring our property in Lekki completely hassle-free. Modern smart finishing, flawless architectural delivery, and prompt title handover.'
    },
    {
      id: 'test-4',
      clientName: 'Alhaji Bashir Mohammed',
      role: 'Commercial Asset Owner & Diaspora Partner',
      propertyOrProject: 'Whitesand Beach Estate',
      clientType: 'Property Landlord',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      quote: 'Nigson Properties has managed our residential facilities with consummate professionalism. Asset upkeep is strict, preventive maintenance is carried out proactively, and communication is transparent.'
    }
  ];

  // Gallery items for BRD Section 17
  private readonly galleryData: GalleryItem[] = [
    {
      id: 'gal-1',
      title: 'Grand Living Hall & Double Volume Ceiling',
      category: 'Living',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
      description: 'Spacious contemporary living room with imported Italian porcelain tiles, recessed LED illumination and dual-aspect glass.'
    },
    {
      id: 'gal-2',
      title: 'Modern Architecture Facade - White Oaks',
      category: 'Exterior',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      description: 'Sleek architectural lines, cantilevered balconies, and solar panels integrated cleanly into roof designs.'
    },
    {
      id: 'gal-3',
      title: 'Chef-Inspired Fitted Gourmet Kitchen',
      category: 'Kitchen',
      image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80',
      description: 'Custom cabinetry, quartz waterfall island, built-in induction burner, heat extractor and double ovens.'
    },
    {
      id: 'gal-4',
      title: 'Master Suite with Private Balcony Terrace',
      category: 'Interiors',
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=80',
      description: 'Expansive master bedroom designed with acoustic insulation, ambient mood lighting, and walk-in dressing room.'
    },
    {
      id: 'gal-5',
      title: 'Spa Bathroom with Hydro-Massage Jacuzzi',
      category: 'Interiors',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
      description: 'Madam’s ensuite featuring a multi-jet hydro Jacuzzi, rain shower head, and bespoke illuminated vanity mirrors.'
    },
    {
      id: 'gal-6',
      title: 'Waterfront Lagoon & Sunset Terrace',
      category: 'Exterior',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
      description: 'Direct lagoon breeze and serene sunset vistas from the private terrace overlooking Lagos waters.'
    },
    {
      id: 'gal-7',
      title: 'Resident Swimming Pool & Sun Deck',
      category: 'Amenities',
      image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80',
      description: 'Crystal-clear heated pool with outdoor loungers, shower pavilion, and perimeter landscape lighting.'
    },
    {
      id: 'gal-8',
      title: 'Private Home Cinema & Entertainment Room',
      category: 'Amenities',
      image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1000&q=80',
      description: 'Dedicated acoustic-paneled media lounge with 4K projection setup and reclining leather theater seating.'
    }
  ];

  private readonly PROPS_KEY = 'nigson_properties_store_v6';
  private readonly TESTIMONIALS_KEY = 'nigson_testimonials_store';
  private readonly GALLERIES_KEY = 'nigson_galleries_store';
  private readonly SERVICES_KEY = 'nigson_services_store';
  private readonly PROJECTS_KEY = 'nigson_projects_store_v2';

  private loadStoredProperties(): Property[] {
    if (typeof window === 'undefined') return this.propertiesData;
    try {
      // Clear legacy storage keys that contain obsolete or duplicate property cards
      localStorage.removeItem('nigson_properties_store');
      localStorage.removeItem('nigson_properties_store_v2');
      localStorage.removeItem('nigson_properties_store_v3');
      localStorage.removeItem('nigson_properties_store_v4');
      localStorage.removeItem('nigson_properties_store_v5');

      const data = localStorage.getItem(this.PROPS_KEY);
      if (data) {
        const parsed: Property[] = JSON.parse(data);
        const cleaned = parsed.filter(p => 
          !p.status.toLowerCase().includes('lease') &&
          p.purpose !== ('lease' as any) &&
          !['nigson-villa-banana-island', 'benson-close-ikoyi', 'victoria-island-prime'].includes(p.id)
        );
        if (cleaned.length > 0) {
          return cleaned;
        }
      }
      // Initialize with fresh sanitized propertiesData
      localStorage.setItem(this.PROPS_KEY, JSON.stringify(this.propertiesData));
      return this.propertiesData;
    } catch {
      return this.propertiesData;
    }
  }

  private persistProperties(props: Property[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(this.PROPS_KEY, JSON.stringify(props));
    } catch (e) {
      console.error('Failed to persist properties', e);
    }
  }

  private loadStoredTestimonials(): Testimonial[] {
    if (typeof window === 'undefined') return this.testimonialsData;
    try {
      const data = localStorage.getItem(this.TESTIMONIALS_KEY);
      return data ? JSON.parse(data) : this.testimonialsData;
    } catch {
      return this.testimonialsData;
    }
  }

  private persistTestimonials(data: Testimonial[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(this.TESTIMONIALS_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to persist testimonials', e);
    }
  }

  private loadStoredGalleries(): GalleryItem[] {
    if (typeof window === 'undefined') return this.galleryData;
    try {
      const data = localStorage.getItem(this.GALLERIES_KEY);
      return data ? JSON.parse(data) : this.galleryData;
    } catch {
      return this.galleryData;
    }
  }

  private persistGalleries(data: GalleryItem[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(this.GALLERIES_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to persist galleries', e);
    }
  }

  private loadStoredServices(): ServiceItem[] {
    if (typeof window === 'undefined') return this.servicesData;
    try {
      const data = localStorage.getItem(this.SERVICES_KEY);
      return data ? JSON.parse(data) : this.servicesData;
    } catch {
      return this.servicesData;
    }
  }

  private persistServices(data: ServiceItem[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(this.SERVICES_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to persist services', e);
    }
  }

  private loadStoredProjects(): ProjectSummary[] {
    if (typeof window === 'undefined') return this.projectSummariesData;
    try {
      // Clear legacy storage key
      localStorage.removeItem('nigson_projects_store');
      const data = localStorage.getItem(this.PROJECTS_KEY);
      return data ? JSON.parse(data) : this.projectSummariesData;
    } catch {
      return this.projectSummariesData;
    }
  }

  private persistProjects(data: ProjectSummary[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to persist projects', e);
    }
  }

  // Reactive State Signals
  public properties = signal<Property[]>(this.loadStoredProperties());
  public services = signal<ServiceItem[]>(this.loadStoredServices());
  public projectSummaries = signal<ProjectSummary[]>(this.loadStoredProjects());
  public leadershipTeam = signal<TeamMember[]>(this.leadershipTeamData);
  public testimonials = signal<Testimonial[]>(this.loadStoredTestimonials());
  public galleryItems = signal<GalleryItem[]>(this.loadStoredGalleries());

  // Filter signals
  public selectedCategory = signal<string>('all');
  public searchQuery = signal<string>('');
  public selectedLocation = signal<string>('all');
  public selectedBedrooms = signal<string>('all');
  public maxPrice = signal<number>(1000000000);

  // Selected Property for detail modal / view
  public activeProperty = signal<Property | null>(null);

  // Selected Service for modal details
  public activeService = signal<ServiceItem | null>(null);

  // Modal visibility signals
  public isInspectionModalOpen = signal<boolean>(false);
  public inspectionPreselectedProperty = signal<string>('');
  public isLightboxOpen = signal<boolean>(false);
  public activeLightboxImage = signal<GalleryItem | null>(null);
  public isServiceModalOpen = signal<boolean>(false);

  // Toast notification signal
  public toastMessage = signal<{ title: string; message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Filtered properties computed signal
  public filteredProperties = computed(() => {
    let result = this.properties();
    const cat = this.selectedCategory();
    const query = this.searchQuery().toLowerCase().trim();
    const loc = this.selectedLocation();
    const beds = this.selectedBedrooms();
    const budget = this.maxPrice();

    if (cat !== 'all') {
      if (cat === 'sale') {
        result = result.filter(p => p.purpose === 'sale' || p.category === 'sales');
      } else if (cat === 'completed') {
        result = result.filter(p => p.status.includes('Completed') || p.status.includes('Sold Out'));
      } else if (cat === 'ongoing') {
        result = result.filter(p => p.status.includes('Ongoing'));
      }
    }

    if (loc !== 'all') {
      result = result.filter(p => p.neighborhoodArea.toLowerCase().includes(loc.toLowerCase()));
    }

    if (beds !== 'all') {
      const bedNum = parseInt(beds, 10);
      if (!isNaN(bedNum)) {
        if (beds === '5+') {
          result = result.filter(p => p.bedrooms >= 5);
        } else {
          result = result.filter(p => p.bedrooms === bedNum);
        }
      }
    }

    if (budget && budget > 0) {
      result = result.filter(p => p.numericPrice <= budget);
    }

    if (query) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.features.some(f => f.toLowerCase().includes(query))
      );
    }

    return result;
  });

  // Helper actions
  public setCategory(cat: string): void {
    this.selectedCategory.set(cat);
  }

  public setLocation(loc: string): void {
    this.selectedLocation.set(loc);
  }

  public setBedrooms(beds: string): void {
    this.selectedBedrooms.set(beds);
  }

  public setMaxPrice(price: number): void {
    this.maxPrice.set(price);
  }

  public setSearch(query: string): void {
    this.searchQuery.set(query);
  }

  public openPropertyDetails(property: Property): void {
    this.activeProperty.set(property);
  }

  public closePropertyDetails(): void {
    this.activeProperty.set(null);
  }

  public openInspectionModal(propertyTitle?: string): void {
    if (propertyTitle) {
      this.inspectionPreselectedProperty.set(propertyTitle);
    } else if (this.activeProperty()) {
      this.inspectionPreselectedProperty.set(this.activeProperty()!.title);
    } else {
      this.inspectionPreselectedProperty.set('');
    }
    this.isInspectionModalOpen.set(true);
  }

  public closeInspectionModal(): void {
    this.isInspectionModalOpen.set(false);
  }


  public openServiceModal(service: ServiceItem): void {
    this.activeService.set(service);
    this.isServiceModalOpen.set(true);
  }

  public closeServiceModal(): void {
    this.isServiceModalOpen.set(false);
    this.activeService.set(null);
  }

  public openLightbox(item: GalleryItem): void {
    this.activeLightboxImage.set(item);
    this.isLightboxOpen.set(true);
  }

  public closeLightbox(): void {
    this.isLightboxOpen.set(false);
    this.activeLightboxImage.set(null);
  }

  public showToast(title: string, message: string, type: 'success' | 'info' | 'error' = 'success'): void {
    this.toastMessage.set({ title, message, type });
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 4500);
  }

  // Handle Inspection Request submission (BRD Section 15)
  public submitInspectionRequest(request: InspectionRequest): void {
    console.log('Inspection Request Captured:', request);
    try {
      const existingRaw = localStorage.getItem('nigson_admin_leads_data');
      const leads = existingRaw ? JSON.parse(existingRaw) : [];
      const newLead = {
        id: 'lead-' + Date.now(),
        category: 'inspection-request',
        categoryLabel: 'Inspection Request',
        clientName: request.fullName,
        email: request.email,
        phone: request.phone,
        subjectOrProperty: request.propertyTitle || 'Property Inspection',
        details: `Scheduled ${request.tourType || 'In-Person'} inspection for ${request.preferredDate} (${request.preferredTime}). Client Role: ${request.clientRole || 'Buyer'}. Notes: ${request.notes || 'None'}.`,
        status: 'New',
        date: new Date().toISOString().split('T')[0],
        priority: 'High',
        tourType: request.tourType,
        preferredDate: `${request.preferredDate} (${request.preferredTime})`,
        clientRole: request.clientRole,
        notes: request.notes || ''
      };
      localStorage.setItem('nigson_admin_leads_data', JSON.stringify([newLead, ...leads]));
    } catch {}

    this.showToast(
      'Inspection Scheduled Successfully!', 
      `Thank you ${request.fullName}. Our sales representative will contact you at ${request.phone} to confirm your inspection for ${request.preferredDate} (${request.preferredTime}).`,
      'success'
    );
    this.closeInspectionModal();
  }

  // Handle General Inquiry submission (BRD Section 14)
  public submitInquiry(inquiry: PropertyInquiry): void {
    console.log('General Property Inquiry Captured:', inquiry);
    try {
      const existingRaw = localStorage.getItem('nigson_admin_leads_data');
      const leads = existingRaw ? JSON.parse(existingRaw) : [];
      let category = 'contact-inquiry';
      let categoryLabel = 'Contact Inquiry';

      if (inquiry.inquiryType === 'Property Management') {
        category = 'property-management';
        categoryLabel = 'Property Management';
      }

      const newLead = {
        id: 'lead-' + Date.now(),
        category: category,
        categoryLabel: categoryLabel,
        clientName: inquiry.fullName,
        email: inquiry.email,
        phone: inquiry.phone,
        subjectOrProperty: inquiry.propertyInterestedIn || 'General Inquiry',
        details: `${inquiry.inquiryType} inquiry: ${inquiry.message || 'Direct inquiry submitted from website'}. Budget: ${inquiry.budgetRange || 'Not specified'}. Preferred Date: ${inquiry.preferredInspectionDate || 'Flexible'}.`,
        status: 'New',
        date: new Date().toISOString().split('T')[0],
        priority: 'High',
        budgetOrValue: inquiry.budgetRange || '',
        preferredDate: inquiry.preferredInspectionDate,
        notes: `Inquiry Type: ${inquiry.inquiryType}`
      };
      localStorage.setItem('nigson_admin_leads_data', JSON.stringify([newLead, ...leads]));
    } catch {}

    this.showToast(
      'Inquiry Received!', 
      `Thank you ${inquiry.fullName}. Your ${inquiry.inquiryType} inquiry regarding "${inquiry.propertyInterestedIn || 'Nigson Properties'}" has been forwarded to our corporate sales desk.`,
      'success'
    );
  }

  // -------------------------------------------------------------
  // ADMIN PROPERTY MANAGEMENT METHODS
  // -------------------------------------------------------------
  public addProperty(property: Property): void {
    const updated = [property, ...this.properties()];
    this.properties.set(updated);
    this.persistProperties(updated);
    this.showToast('Property Added', `"${property.title}" has been added to the portfolio.`, 'success');
  }

  public updateProperty(property: Property): void {
    const updated = this.properties().map(p => p.id === property.id ? property : p);
    this.properties.set(updated);
    this.persistProperties(updated);
    this.showToast('Property Updated', `"${property.title}" details successfully saved.`, 'success');
  }

  public deleteProperty(propertyId: string): void {
    const target = this.properties().find(p => p.id === propertyId);
    const updated = this.properties().filter(p => p.id !== propertyId);
    this.properties.set(updated);
    this.persistProperties(updated);
    this.showToast('Property Deleted', `"${target?.title || 'Property'}" was removed from the portfolio.`, 'info');
  }

  public changePropertyStatus(propertyId: string, status: PropertyStatus): void {
    const updated = this.properties().map(p => p.id === propertyId ? { ...p, status } : p);
    this.properties.set(updated);
    this.persistProperties(updated);
    this.showToast('Status Updated', `Property status updated to "${status}".`, 'info');
  }

  public markPropertyAsSold(propertyId: string): void {
    this.changePropertyStatus(propertyId, 'Sold Out');
  }

  public markPropertyAsAvailable(propertyId: string): void {
    this.changePropertyStatus(propertyId, 'Available for Sale');
  }

  public updatePropertyPricing(propertyId: string, price: string, numericPrice: number): void {
    const updated = this.properties().map(p => p.id === propertyId ? { ...p, price, numericPrice } : p);
    this.properties.set(updated);
    this.persistProperties(updated);
    this.showToast('Price Updated', `Price updated to ${price}.`, 'success');
  }

  public updatePropertyDescription(propertyId: string, description: string): void {
    const updated = this.properties().map(p => p.id === propertyId ? { ...p, description } : p);
    this.properties.set(updated);
    this.persistProperties(updated);
    this.showToast('Description Updated', 'Property description successfully saved.', 'success');
  }

  public updatePropertyAmenities(propertyId: string, amenities: Amenity[]): void {
    const updated = this.properties().map(p => p.id === propertyId ? { ...p, amenities } : p);
    this.properties.set(updated);
    this.persistProperties(updated);
    this.showToast('Amenities Updated', 'Property amenities matrix saved.', 'success');
  }

  public updatePropertyMedia(propertyId: string, heroImage: string, gallery: string[], videoUrl?: string): void {
    const updated = this.properties().map(p => p.id === propertyId ? { 
      ...p, 
      heroImage: heroImage || p.heroImage, 
      gallery: gallery && gallery.length ? gallery : p.gallery,
      videoUrl: videoUrl !== undefined ? videoUrl : p.videoUrl
    } : p);
    this.properties.set(updated);
    this.persistProperties(updated);
    this.showToast('Media Updated', 'Property photos and video media updated.', 'success');
  }

  // -------------------------------------------------------------
  // ADMIN PROJECT DEVELOPMENT MATRIX METHODS
  // -------------------------------------------------------------
  public addProject(project: ProjectSummary): void {
    const updated = [project, ...this.projectSummaries()];
    this.projectSummaries.set(updated);
    this.persistProjects(updated);
    this.showToast('Project Added', `"${project.name}" added to Project Development Matrix.`, 'success');
  }

  public updateProject(oldName: string, updatedProject: ProjectSummary): void {
    const updated = this.projectSummaries().map(p => p.name === oldName ? updatedProject : p);
    this.projectSummaries.set(updated);
    this.persistProjects(updated);
    this.showToast('Project Updated', `"${updatedProject.name}" updated successfully.`, 'success');
  }

  public deleteProject(name: string): void {
    const updated = this.projectSummaries().filter(p => p.name !== name);
    this.projectSummaries.set(updated);
    this.persistProjects(updated);
    this.showToast('Project Removed', `"${name}" removed from Project Development Matrix.`, 'info');
  }

  // -------------------------------------------------------------
  // ADMIN CONTENT: TESTIMONIALS, GALLERIES & SERVICES
  // -------------------------------------------------------------
  public addTestimonial(t: Testimonial): void {
    const updated = [t, ...this.testimonials()];
    this.testimonials.set(updated);
    this.persistTestimonials(updated);
    this.showToast('Testimonial Added', `Review by ${t.clientName} added.`, 'success');
  }

  public updateTestimonial(t: Testimonial): void {
    const updated = this.testimonials().map(item => item.id === t.id ? t : item);
    this.testimonials.set(updated);
    this.persistTestimonials(updated);
    this.showToast('Testimonial Updated', `Review by ${t.clientName} updated.`, 'success');
  }

  public deleteTestimonial(id: string): void {
    const updated = this.testimonials().filter(item => item.id !== id);
    this.testimonials.set(updated);
    this.persistTestimonials(updated);
    this.showToast('Testimonial Removed', 'Client testimonial deleted.', 'info');
  }

  public addGalleryItem(item: GalleryItem): void {
    const updated = [item, ...this.galleryItems()];
    this.galleryItems.set(updated);
    this.persistGalleries(updated);
    this.showToast('Gallery Item Added', `"${item.title}" added to gallery.`, 'success');
  }

  public updateGalleryItem(item: GalleryItem): void {
    const updated = this.galleryItems().map(g => g.id === item.id ? item : g);
    this.galleryItems.set(updated);
    this.persistGalleries(updated);
    this.showToast('Gallery Updated', `"${item.title}" updated.`, 'success');
  }

  public deleteGalleryItem(id: string): void {
    const updated = this.galleryItems().filter(g => g.id !== id);
    this.galleryItems.set(updated);
    this.persistGalleries(updated);
    this.showToast('Gallery Item Deleted', 'Photo removed from gallery.', 'info');
  }

  public updateService(service: ServiceItem): void {
    const updated = this.services().map(s => s.id === service.id ? service : s);
    this.services.set(updated);
    this.persistServices(updated);
    this.showToast('Service Updated', `"${service.title}" details updated.`, 'success');
  }

  // Generate WhatsApp Direct link with pre-filled message (BRD Section 5 & 23)
  public getWhatsAppLink(message: string = 'Hello Nigson Properties, I would like to inquire about your real estate developments and available properties.'): string {
    const phoneNumber = '2348073467809';
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  }
}

