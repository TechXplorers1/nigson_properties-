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
      id: 'whitesand-ologolo',
      title: 'Opposite Whitesand Beach Estate',
      slug: 'opposite-whitesand-beach-estate-ologolo',
      location: 'Ologolo, Lekki, Lagos',
      neighborhoodArea: 'Ologolo, Lekki',
      category: 'construction',
      categoryLabel: 'Building Construction',
      status: 'Completed & Sold Out',
      purpose: 'completed',
      price: '₦185,000,000',
      numericPrice: 185000000,
      priceSubtext: 'Original Listing Price',
      units: 6,
      propertyType: 'Duplex',
      bedrooms: 5,
      bathrooms: 6,
      size: '520 sqm each',
      featured: true,
      heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'Opposite Whitesand Beach Estate features 6 units of prestigious 5-bedroom fully detached and semi-detached luxury duplexes in serene Ologolo, Lekki. Designed for modern family living with superior craftsmanship, dual lounges, and an exclusive private cinema room.',
      features: [
        '5-bedroom fully and semi-detached duplexes',
        'All bedrooms ensuite with high-end sanitary wares',
        'Master lounge plus separate Family lounge',
        'Fully fitted chef kitchen with premium heat extractor & ovens',
        'Private in-house cinema room for family entertainment',
        '24/7 dedicated clean power supply',
        'Integrated solar panel arrays with high-capacity inverter system',
        'Spacious parking for up to 4 vehicles',
        'Security gatehouse with automated perimeter fencing',
        'Independent Boys Quarters (BQ)',
        'Direct proximity to Lekki-Epe Expressway and beach corridors'
      ],
      amenities: [
        { icon: 'ri-flashlight-line', label: '24/7 Solar & Inverter' },
        { icon: 'ri-film-line', label: 'Cinema Room' },
        { icon: 'ri-car-line', label: '4-Car Parking' },
        { icon: 'ri-shield-check-line', label: 'Access Control' },
        { icon: 'ri-drop-line', label: 'Treated Water' },
        { icon: 'ri-home-4-line', label: 'Private BQ' }
      ],
      neighborhoodHighlights: [
        '2 minutes drive to Lekki-Epe Expressway',
        'Direct proximity to Whitesand Beach and leisure hubs',
        '5 minutes to Circle Mall and Osapa London',
        'Reputable international schools and private hospitals nearby'
      ],
      specifications: {
        'Structure': 'Reinforced concrete frame with premium Italian porcelain tiling',
        'Power': 'Dual 24/7 grid connection + 10kVA Solar Hybrid System',
        'Security': 'CCTV cameras, smart video doorbell, intercom & access gate',
        'Kitchen': 'Imported quartz countertops, built-in microwave & gas burner'
      }
    },
    {
      id: 'fatai-bankole',
      title: 'Fatai Bankole Luxury Residences',
      slug: 'fatai-bankole-aro-ologolo-lekki',
      location: 'Aro-Ologolo, Lekki, Lagos',
      neighborhoodArea: 'Aro-Ologolo, Lekki',
      category: 'construction',
      categoryLabel: 'Building Construction',
      status: 'Completed & Sold Out',
      purpose: 'completed',
      price: '₦195,000,000',
      numericPrice: 195000000,
      priceSubtext: 'Completed & Handed Over',
      units: 7,
      propertyType: 'Duplex',
      bedrooms: 5,
      bathrooms: 6,
      size: '550 sqm each',
      featured: true,
      heroImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'An architectural statement in Aro-Ologolo, Lekki featuring 7 ultra-luxurious 5-bedroom homes. Highlights include an opulent master suite, a dedicated Madam’s bedroom with an imported hydro-massage Jacuzzi, expansive living areas, and self-sufficient renewable energy systems.',
      features: [
        '5-bedroom semi-detached and fully detached architectural homes',
        'Grand Master bedroom with private balcony view',
        'Madam’s bedroom suite with deluxe hydro-massage Jacuzzi',
        'Two dedicated children’s bedrooms with bespoke wardrobes',
        'Comfortable ensuite guest room on ground floor',
        'Modern open-concept living and elevated dining areas',
        'Fully fitted designer kitchen with island counter',
        'High-capacity solar panels and smart inverter backup',
        'Industrial-grade multi-stage water treatment plant',
        '24/7 clean electrical power infrastructure',
        'Secured security house with automated sliding access gates'
      ],
      amenities: [
        { icon: 'ri-hot-tub-line', label: 'Hydro Jacuzzi' },
        { icon: 'ri-sun-line', label: 'Solar Arrays' },
        { icon: 'ri-water-flash-line', label: 'Water Treatment Plant' },
        { icon: 'ri-shield-keyhole-line', label: 'Guarded Gatehouse' },
        { icon: 'ri-parking-box-line', label: 'Ample Car Park' }
      ],
      neighborhoodHighlights: [
        'Quiet gated residential enclave with tarred access roads',
        '3 minutes to Meadow Hall School & regional sports hubs',
        'Fast access to Lekki Phase 1 and Victoria Island'
      ],
      specifications: {
        'Master Suite': 'Walk-in dressing closet, frameless glass shower & Jacuzzi',
        'Water Supply': 'Industrial borehole with automatic aeration & filtration plant',
        'Finishes': 'POP ceiling with ambient magnetic track lighting'
      }
    },
    {
      id: 'white-oaks-estate',
      title: 'White Oaks Estate',
      slug: 'white-oaks-estate-aro-ologolo-lekki',
      location: 'Aro-Ologolo, Lekki, Lagos',
      neighborhoodArea: 'Aro-Ologolo, Lekki',
      category: 'construction',
      categoryLabel: 'Building Construction',
      status: 'Completed & Sold Out',
      purpose: 'completed',
      price: '₦210,000,000',
      numericPrice: 210000000,
      priceSubtext: '14 Units Delivered & Sold Out',
      units: 14,
      propertyType: 'Duplex',
      bedrooms: 5,
      bathrooms: 6,
      size: '540 sqm average',
      featured: true,
      heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'White Oaks Estate represents one of Nigson Properties’ most celebrated flagship residential developments in Lekki. Comprising 14 bespoke 5-bedroom homes engineered with superior structural integrity, elegant facades, and sustainable energy foundations.',
      features: [
        '14 private 5-bedroom detached and semi-detached homes',
        'Dual-volume family lounges with high ceilings and natural illumination',
        'Master bedroom and Madam’s room equipped with Jacuzzi baths',
        'Contemporary imported fitted kitchen with soft-close cabinets',
        'Clean solar and inverter system installed in all units',
        'Centralized water purification plant with continuous pressure pumps',
        '24/7 dedicated estate security patrol and perimeter sensors',
        'Dedicated estate generator backup and underground electrification'
      ],
      amenities: [
        { icon: 'ri-building-line', label: '14-Home Community' },
        { icon: 'ri-shield-star-line', label: '24/7 Security Patrol' },
        { icon: 'ri-flashlight-line', label: 'Solar Hybrid' },
        { icon: 'ri-road-map-line', label: 'Tarred Estate Roads' }
      ],
      neighborhoodHighlights: [
        'Direct access to major commercial shopping centers in Lekki',
        'Close to Chevron head office and Lekki conservation corridor'
      ],
      specifications: {
        'Development Footprint': '14 residential units on fully landscaped estate grounds',
        'Drainage': 'Reinforced covered concrete drainage infrastructure'
      }
    },
    {
      id: 'olufemi-olatunji-osapa',
      title: 'Olufemi Olatunji Court',
      slug: 'olufemi-olatunji-osapa-lekki',
      location: 'Osapa, Lekki, Lagos',
      neighborhoodArea: 'Osapa, Lekki',
      category: 'construction',
      categoryLabel: 'Building Construction',
      status: 'Completed & Sold Out',
      purpose: 'completed',
      price: '₦230,000,000',
      numericPrice: 230000000,
      priceSubtext: 'Premium Osapa Development',
      units: 9,
      propertyType: 'Apartment',
      bedrooms: 4,
      bathrooms: 5,
      size: '2,100 sqm Total Land Area',
      featured: true,
      heroImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'Spanning a generous 2,100 square meter property in the high-demand Osapa London neighborhood, this gated community delivers 9 fully detached and semi-detached luxury residences with world-class fittings and round-the-clock infrastructure.',
      features: [
        '9 fully detached and semi-detached luxury apartments/duplexes',
        'Expansive 2,100 sqm well-drained estate footprint',
        'Ensuite bedrooms with custom Spanish sanitary fittings',
        'Expansive modern living room with floor-to-ceiling windows',
        'High-end kitchen fittings with premium integrated appliances',
        'Full solar panels and industrial inverter setup',
        'Central reverse osmosis & industrial water treatment plant',
        '24/7 steady power network',
        'Ample paved parking spaces for residents and visitors',
        'Armed security response, CCTV, and biometric access control'
      ],
      amenities: [
        { icon: 'ri-layout-grid-line', label: '2,100 sqm Grounds' },
        { icon: 'ri-shopping-bag-3-line', label: 'Near Circle Mall' },
        { icon: 'ri-sun-line', label: 'Solar & Inverter' },
        { icon: 'ri-drop-line', label: 'Treated Water Plant' },
        { icon: 'ri-shield-user-line', label: 'Armed Response' }
      ],
      neighborhoodHighlights: [
        'Walking distance to Circle Mall (Shoprite, banks, cafes)',
        'Surrounded by top tier private clinics, fine dining, and gyms',
        'Fast access to Lekki-Ikoyi Link Bridge in under 12 minutes'
      ],
      specifications: {
        'Land Area': '2,100 sqm with Governor’s Consent and C of O',
        'Finishes': 'Imported Turkish security doors, Spanish vitrified tiles'
      }
    },
    {
      id: 'nigson-villa-banana-island',
      title: 'Nigson Villa Banana Island',
      slug: 'nigson-villa-banana-island-lagos',
      location: 'Banana Island, Ikoyi, Lagos',
      neighborhoodArea: 'Banana Island, Ikoyi',
      category: 'management',
      categoryLabel: 'Property Management & Luxury Leasing',
      status: 'Available for Lease',
      purpose: 'lease',
      price: '₦22,000,000 / year',
      numericPrice: 22000000,
      priceSubtext: 'Service Charge Inclusive Option Available',
      units: 8,
      propertyType: 'Apartment',
      bedrooms: 3,
      bathrooms: 4,
      size: '280 sqm per unit',
      featured: true,
      heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'Nigson Villa is an elite residential development managed by Nigson Properties in Nigeria’s most prestigious neighborhood: Banana Island, Ikoyi. Comprising 8 exclusive 2-bedroom and 3-bedroom luxury apartments featuring an Olympic-grade swimming pool, reverse osmosis water system, and round-the-clock facility management.',
      features: [
        '8 exclusive luxury apartment units (2 & 3 Bedroom options)',
        'Modern spa-inspired bathrooms with German fittings',
        'Visitor’s guest powder room in every unit',
        'Contemporary open interiors with premium wooden cabinetry',
        'Ensuite Boys Quarters (BQ) for each residence',
        '24/7 guaranteed uninterrupted electrical power',
        'High-level security with motorized estate gates & biometric intercom',
        'Ample allocated parking for residents and visiting guests',
        'Advanced Reverse Osmosis (RO) drinking water filtration system',
        'Exclusive resident swimming pool and landscaped sun deck',
        'Prestigious Banana Island location with unmatched tranquility'
      ],
      amenities: [
        { icon: 'ri-water-flash-fill', label: 'Swimming Pool' },
        { icon: 'ri-vip-crown-line', label: 'Banana Island Address' },
        { icon: 'ri-flashlight-line', label: '24/7 Power' },
        { icon: 'ri-drop-fill', label: 'Reverse Osmosis Water' },
        { icon: 'ri-service-line', label: 'Managed Facility' },
        { icon: 'ri-user-star-line', label: 'Concierge Desk' }
      ],
      neighborhoodHighlights: [
        'Nigeria’s most secure and affluent residential haven',
        'Private waterfront walkway and helipad access',
        'Home to multinational diplomats, C-suite executives, and entrepreneurs'
      ],
      specifications: {
        'Management': 'Full facility management provided by Nigson Properties Ltd',
        'Water': 'Automated multi-stage Reverse Osmosis drinking water plant',
        'Pool': 'Private heated freshwater pool with poolside bar'
      }
    },
    {
      id: 'benson-close-ikoyi',
      title: 'Benson Close Ikoyi Waterfront',
      slug: 'benson-close-ikoyi-waterfront-apartment',
      location: 'Benson Close, Old Ikoyi, Lagos',
      neighborhoodArea: 'Ikoyi, Lagos',
      category: 'leasing',
      categoryLabel: 'Property Leasing',
      status: 'Available for Lease',
      purpose: 'lease',
      price: '₦22,000,000 / annum',
      numericPrice: 22000000,
      priceSubtext: 'Corporate & Executive Lease',
      units: 1,
      propertyType: 'Apartment',
      bedrooms: 1,
      bathrooms: 2,
      size: '110 sqm',
      featured: true,
      heroImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'An exquisitely finished 1-bedroom luxury waterfront apartment located on exclusive Benson Close, Ikoyi. Designed for corporate executives, expatriates, and discerning professionals seeking tranquil waterfront living with 24/7 power, high security, and picturesque lagoon views.',
      features: [
        'Fully furnished designer 1-bedroom suite with plush king bed',
        'Stunning waterfront views over the Lagos lagoon and sunrise vistas',
        '24/7 uninterrupted clean electricity with silent generator sync',
        '24/7 guarded security perimeter and CCTV surveillance',
        'Fully equipped gourmet kitchen (microwave, oven, blender, espresso maker)',
        'High-speed fiber-optic Wi-Fi infrastructure',
        'Climate-controlled whisper-quiet air conditioning',
        'Dedicated allocated secured parking bay',
        'Smart 65-inch 4K TV and home entertainment system',
        'Washer-dryer in-unit and laundry facilities'
      ],
      amenities: [
        { icon: 'ri-wifi-line', label: 'Fiber Wi-Fi' },
        { icon: 'ri-sailboat-line', label: 'Waterfront Lagoon View' },
        { icon: 'ri-tv-line', label: 'Smart 4K TV' },
        { icon: 'ri-restaurant-line', label: 'Fitted Kitchen' },
        { icon: 'ri-shield-check-line', label: '24/7 Security' },
        { icon: 'ri-flashlight-line', label: '24/7 Clean Power' }
      ],
      neighborhoodHighlights: [
        'Walking distance to upscale Ikoyi restaurants, cafes, and private clubs',
        '7 minutes drive to Victoria Island financial district',
        'Close to Southern Sun Ikoyi and Lagos Polo Club'
      ],
      specifications: {
        'Lease Terms': 'Minimum 1-year lease, corporate guarantees accepted',
        'Services Included': 'Security, dedicated parking, backup power, water treatment'
      }
    },
    {
      id: 'lekki-pearl-residences',
      title: 'Lekki Pearl Residences',
      slug: 'lekki-pearl-residences-lekki-phase-1',
      location: 'Admiralty Way Axis, Lekki Phase 1, Lagos',
      neighborhoodArea: 'Lekki Phase 1',
      category: 'sales',
      categoryLabel: 'Property For Sale',
      status: 'Available for Sale',
      purpose: 'sale',
      price: '₦260,000,000',
      numericPrice: 260000000,
      priceSubtext: 'Off-Plan & Flexible Milestone Payments',
      units: 12,
      propertyType: 'Terrace',
      bedrooms: 4,
      bathrooms: 5,
      size: '420 sqm',
      featured: true,
      heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'Lekki Pearl Residences brings smart, sustainable luxury to prime Lekki Phase 1. 12 units of 4-bedroom terrace duplexes with private rooftop terraces, smart home automation (lighting, climate, security), solar integration, and high capital appreciation potential.',
      features: [
        '4-bedroom luxury terrace duplex with private rooftop terrace',
        'Smart home automation (voice and smartphone lighting & sound control)',
        'Private elevator option available on select corner units',
        '10kVA solar hybrid energy system pre-wired and installed',
        'Master bedroom suite with private sky lounge terrace',
        'Fully equipped Italian kitchen with wine cooler & island',
        'Communal gym and relaxation pavilion for residents',
        '24/7 guarded security gatehouse and perimeter electric fence'
      ],
      amenities: [
        { icon: 'ri-smartphone-line', label: 'Smart Home Automation' },
        { icon: 'ri-sun-fill', label: '10kVA Solar' },
        { icon: 'ri-building-2-line', label: 'Rooftop Sky Lounge' },
        { icon: 'ri-dumbbell-line', label: 'Fitness Center' },
        { icon: 'ri-shield-flash-line', label: 'Biometric Access' }
      ],
      neighborhoodHighlights: [
        'Prime Lekki Phase 1 location off Admiralty Way',
        'Proximity to upscale banks, lounges, and corporate headquarters',
        'Immediate rental yield potential of ₦14M - ₦18M annually'
      ],
      specifications: {
        'Delivery Stage': 'Ongoing development - Q4 2026 delivery',
        'Payment Plan': '30% initial deposit, milestone installments over 12 months'
      }
    },
    {
      id: 'victoria-island-prime',
      title: 'Victoria Island Executive Suites',
      slug: 'victoria-island-executive-suites',
      location: 'Ahmadu Bello Way Corridor, Victoria Island, Lagos',
      neighborhoodArea: 'Victoria Island',
      category: 'leasing',
      categoryLabel: 'Property For Lease',
      status: 'Available for Lease',
      purpose: 'lease',
      price: '₦28,000,000 / year',
      numericPrice: 28000000,
      priceSubtext: 'Corporate & Diplomatic Leases Welcomed',
      units: 6,
      propertyType: 'Apartment',
      bedrooms: 3,
      bathrooms: 4,
      size: '260 sqm',
      featured: false,
      heroImage: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'Ultra-luxurious 3-bedroom serviced apartment in Victoria Island catering to multinational corporations, senior diplomats, and discerning families. Includes dedicated concierge, infinity pool, fitness center, and 100% power uptime.',
      features: [
        '3 ensuite bedrooms with panoramic Atlantic Ocean & city skyline views',
        'Full service facility management by Nigson Properties',
        '24/7 uninterrupted power with redundant dual synchronised generators',
        'High-capacity high-speed elevators',
        'Dedicated basement parking with valet options',
        'Modern gym, sauna, and infinity pool access'
      ],
      amenities: [
        { icon: 'ri-building-line', label: 'VI Skyline View' },
        { icon: 'ri-water-flash-line', label: 'Infinity Pool' },
        { icon: 'ri-flashlight-line', label: '100% Power Uptime' },
        { icon: 'ri-service-line', label: 'Full Concierge' }
      ],
      neighborhoodHighlights: [
        'Heart of Lagos financial and diplomatic district',
        'Minutes from Eko Atlantic City and five-star hotels'
      ],
      specifications: {
        'Tenancy Terms': 'Minimum 1-year lease, corporate guarantees accepted'
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
      fullDescription: 'We relieve property owners and diaspora investors of the daily operational burdens of real estate ownership. Our property management team handles rigorous tenant vetting, lease administration, rent collection, routine and emergency maintenance, and comprehensive financial reporting. We treat every property as a high-performing investment asset.',
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
      id: 'property-sales-leasing',
      number: '06',
      title: 'Property Sales & Leasing',
      tagline: 'Connecting Discerning Buyers & Quality Properties with Trust',
      shortDescription: 'Targeted marketing, professional advisory, buyer viewings, and transparent contract negotiation for residential acquisitions and high-grade leases.',
      fullDescription: 'Navigating the Lagos luxury real estate market demands deep market intelligence, transparency, and verified legal standing. Whether you are acquiring your dream family duplex in Lekki, securing an off-plan investment in Banana Island, or seeking a corporate lease in Victoria Island, our sales and leasing team provides discreet, honest, and results-driven brokerage services.',
      icon: 'ri-shake-hands-line',
      image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=900&q=80',
      highlights: [
        'Exclusive portfolio of verified title properties in prime Lagos nodes',
        'Strategic digital and private network property marketing',
        'Thorough tenant vetting and buyer financial pre-qualification',
        'Accompanied private property viewings & virtual live walk-throughs',
        'Transparent title verification & legal conveyance coordination',
        'Personalized property investment advisory for diaspora clients'
      ],
      deliverables: [
        'Customized property matching based on lifestyle & budget',
        'Contract of sale, deed of assignment & lease preparation',
        'Mortgage and payment plan structuring support',
        'After-sale onboarding and property handover'
      ]
    }
  ];

  // Project portfolio summary directly from Section 12 table in BRD
  private readonly projectSummariesData: ProjectSummary[] = [
    {
      name: 'Opposite Whitesand Beach Estate',
      location: 'Ologolo, Lekki',
      units: 6,
      status: 'Completed & Sold Out',
      category: 'Construction',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      completionYear: 'Delivered'
    },
    {
      name: 'Fatai Bankole Residences',
      location: 'Aro-Ologolo, Lekki',
      units: 7,
      status: 'Completed & Sold Out',
      category: 'Construction',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
      completionYear: 'Delivered'
    },
    {
      name: 'White Oaks Estate',
      location: 'Aro-Ologolo, Lekki',
      units: 14,
      status: 'Completed & Sold Out',
      category: 'Construction',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      completionYear: 'Delivered'
    },
    {
      name: 'Olufemi Olatunji Court',
      location: 'Osapa, Lekki',
      units: 9,
      status: 'Completed & Sold Out',
      category: 'Construction',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
      completionYear: 'Delivered'
    },
    {
      name: 'Nigson Villa',
      location: 'Banana Island, Lagos',
      units: 8,
      status: 'Completed',
      category: 'Property Management',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      completionYear: 'Active Management'
    },
    {
      name: 'Benson Close Waterfront Suite',
      location: 'Ikoyi, Lagos',
      units: 1,
      status: 'Completed',
      category: 'Property Management',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      completionYear: 'Active Management'
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
      role: 'Corporate Tenant & Management Consultant',
      propertyOrProject: 'Benson Close Ikoyi Waterfront',
      clientType: 'Tenant',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      quote: 'The Benson Close apartment in Ikoyi is my premier choice for corporate residence in Lagos. Unbeatable waterfront sunset views, blazing fast fiber internet, flawless maintenance, and absolute security.'
    },
    {
      id: 'test-4',
      clientName: 'Alhaji Bashir Mohammed',
      role: 'Commercial Landlord & Asset Owner',
      propertyOrProject: 'Nigson Villa, Banana Island',
      clientType: 'Property Landlord',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      quote: 'Nigson Properties has managed our Banana Island multi-unit property with consummate professionalism. Tenant vetting is strict, preventive maintenance is carried out proactively, and rental remissions are always punctual.'
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
      title: 'Lagoon Waterfront View - Benson Close Ikoyi',
      category: 'Exterior',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
      description: 'Direct lagoon breeze and serene sunset vistas from the private terrace on Benson Close, Ikoyi.'
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

  private readonly PROPS_KEY = 'nigson_properties_store';
  private readonly TESTIMONIALS_KEY = 'nigson_testimonials_store';
  private readonly GALLERIES_KEY = 'nigson_galleries_store';
  private readonly SERVICES_KEY = 'nigson_services_store';

  private loadStoredProperties(): Property[] {
    if (typeof window === 'undefined') return this.propertiesData;
    try {
      const data = localStorage.getItem(this.PROPS_KEY);
      return data ? JSON.parse(data) : this.propertiesData;
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

  // Reactive State Signals
  public properties = signal<Property[]>(this.loadStoredProperties());
  public services = signal<ServiceItem[]>(this.loadStoredServices());
  public projectSummaries = signal<ProjectSummary[]>(this.projectSummariesData);
  public leadershipTeam = signal<TeamMember[]>(this.leadershipTeamData);
  public testimonials = signal<Testimonial[]>(this.loadStoredTestimonials());
  public galleryItems = signal<GalleryItem[]>(this.loadStoredGalleries());

  // Filter signals
  public selectedCategory = signal<string>('all');
  public searchQuery = signal<string>('');
  public selectedLocation = signal<string>('all');
  public selectedBedrooms = signal<string>('all');
  public maxPrice = signal<number>(300000000);

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
      } else if (cat === 'lease') {
        result = result.filter(p => p.purpose === 'lease' || p.category === 'leasing' || p.category === 'management');
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
      const newLead = {
        id: 'lead-' + Date.now(),
        category: 'contact-inquiry',
        categoryLabel: 'Contact Inquiry',
        clientName: inquiry.fullName,
        email: inquiry.email,
        phone: inquiry.phone,
        subjectOrProperty: inquiry.propertyInterestedIn || 'General Inquiry',
        details: `${inquiry.inquiryType} inquiry: ${inquiry.message}. Budget: ${inquiry.budgetRange || 'Not specified'}. Preferred Date: ${inquiry.preferredInspectionDate || 'Flexible'}.`,
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

