import { Injectable, signal } from '@angular/core';

export interface HeroContent {
  kicker: string;
  title: string;
  highlight: string;
  titleLine2?: string;
  subtitle: string;
  bgImage: string;
  cta1Text?: string;
  cta1Link?: string;
  cta2Text?: string;
  cta2Link?: string;
  badges?: string[];
}

export interface HomeStandardContent {
  kicker: string;
  quote: string;
  quoteHighlight: string;
  quoteSuffix: string;
  p1: string;
  p2: string;
  consultationText: string;
}

export interface HomeStatItem {
  value: string;
  label: string;
  sublabel: string;
}

export interface HomeSectionHeader {
  kicker: string;
  title: string;
  highlight: string;
  subtitle: string;
  viewAllText: string;
}

export interface HomeServiceItem {
  num: string;
  title: string;
  desc: string;
  image: string;
  tag: string;
}

export interface HomeWhyChooseItem {
  title: string;
  desc: string;
  iconName?: string;
}

export interface HomeTestimonialItem {
  quote: string;
  name: string;
  role: string;
  category: string;
  rating?: number;
  project?: string;
  location?: string;
}

export interface HomePageContent {
  hero: {
    kicker: string;
    titleLine1: string;
    titleHighlight: string;
    titleLine2: string;
    subtitle: string;
    bgImage: string;
    cta1Text: string;
    cta1Link: string;
    cta2Text: string;
  };
  standard: HomeStandardContent;
  stats: HomeStatItem[];
  propertiesSection: HomeSectionHeader;
  projectsSection: HomeSectionHeader;
  shortStaySection: HomeSectionHeader;
  servicesSection: {
    kicker: string;
    title: string;
    highlight: string;
    subtitle: string;
    items: HomeServiceItem[];
  };
  whyChooseSection: {
    kicker: string;
    title: string;
    highlight: string;
    subtitle: string;
    items: HomeWhyChooseItem[];
  };
  testimonialsSection: {
    kicker: string;
    title: string;
    subtitle: string;
    items: HomeTestimonialItem[];
  };
}

export interface PropertiesPageContent {
  hero: HeroContent;
  hubHeader: {
    title: string;
    subtitle: string;
  };
  ctaBanner: {
    title: string;
    subtitle: string;
    bgImage: string;
    buttonText: string;
  };
}

export interface ShortStayPageContent {
  hero: HeroContent;
  conciergeBanner: {
    kicker: string;
    title: string;
    subtitle: string;
    phone: string;
    waText: string;
  };
}

export interface ProjectsPageContent {
  hero: HeroContent;
  stats: {
    units: string;
    unitsLabel: string;
    unitsSub: string;
    rate: string;
    rateLabel: string;
    rateSub: string;
  };
  matrixHeader: {
    title: string;
    subtitle: string;
  };
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  desc: string;
}

export interface ServiceCmsItem {
  num: string;
  title: string;
  tagline: string;
  summary: string;
  image: string;
  process: ServiceProcessStep[];
  deliverables?: string[];
}

export interface ServicesPageContent {
  hero: HeroContent;
  servicesList: ServiceCmsItem[];
}

export interface CoreValueCmsItem {
  title: string;
  desc: string;
}

export interface WhyChooseCmsItem {
  title: string;
  desc: string;
}

export interface AboutPageContent {
  hero: HeroContent;
  narrative: {
    kicker: string;
    title: string;
    p1: string;
    p2: string;
    p3: string;
  };
  stats: {
    decadeLabel: string;
    decadeSub: string;
    dueDiligenceLabel: string;
    dueDiligenceSub: string;
    litigationLabel: string;
    litigationSub: string;
  };
  boardCard: {
    tag: string;
    title: string;
    image: string;
  };
  missionVision: {
    missionTitle?: string;
    mission: string;
    visionTitle?: string;
    vision: string;
  };
  coreValues: CoreValueCmsItem[];
  whyChoose: WhyChooseCmsItem[];
}

export interface ContactPageContent {
  hero: HeroContent;
  office: {
    kicker: string;
    title: string;
    desc: string;
    headquartersTitle: string;
    addressLine1: string;
    addressLine2: string;
    phones: string[];
    hours: string;
    email: string;
    whatsapp: string;
    vipNoticeTitle: string;
    vipNoticeDesc: string;
  };
  inquiryForm: {
    kicker: string;
    title: string;
    desc: string;
    buttonText: string;
    successTitle: string;
    successMessage: string;
  };
}

export interface CmsContent {
  home: HomePageContent;
  properties: PropertiesPageContent;
  shortStay: ShortStayPageContent;
  projects: ProjectsPageContent;
  services: ServicesPageContent;
  about: AboutPageContent;
  contact: ContactPageContent;
}

export const DEFAULT_CMS_CONTENT: CmsContent = {
  home: {
    hero: {
      kicker: 'Luxury Real Estate · Lagos & Abuja',
      titleLine1: 'Redefining',
      titleHighlight: 'Architectural Luxury',
      titleLine2: 'Across Lagos & Abuja',
      subtitle:
        'Curating bespoke waterfront residences, smart penthouses, and green communities with guaranteed 24/7 clean energy and unencumbered titles.',
      bgImage: '/assets/hero.jpg',
      cta1Text: 'Explore Developments',
      cta1Link: '/properties',
      cta2Text: 'Schedule Private Tour'
    },
    standard: {
      kicker: 'The Nigson Standard',
      quote: '“We don’t just build structures; we craft',
      quoteHighlight: 'generational wealth',
      quoteSuffix: 'and iconic skylines.”',
      p1: 'Every Nigson residence is engineered to European structural and finishing standards — German fittings, Italian stone, and independent solar microgrids — then placed on the most coveted addresses in Lagos: Lekki Phase 1, Ikoyi, and Banana Island.',
      p2: 'Each title is verified before sale, with Governor’s Consent and C of O guaranteed, so your investment is as secure as it is beautiful.',
      consultationText: 'Book a private consultation →'
    },
    stats: [
      { value: '10+ Yrs', label: 'Market Leadership', sublabel: 'Over a decade of landmark real estate' },
      { value: '100%', label: 'Dispute-Free Titles', sublabel: 'Guaranteed C of O & Governor’s Consent' },
      { value: '₦45B+', label: 'Asset Portfolio', sublabel: 'Premium residential & commercial assets' },
      { value: '24/7', label: 'Clean Energy', sublabel: 'Zero-downtime redundant microgrids' }
    ],
    propertiesSection: {
      kicker: 'Curated Portfolio',
      title: 'Signature Residences &',
      highlight: 'Waterfront Villas',
      subtitle:
        'Explore meticulously finished luxury townhomes, private beachfront compounds, and sky penthouses with uncompromised land documentation.',
      viewAllText: 'View All Properties'
    },
    projectsSection: {
      kicker: 'Track Record & Pipeline',
      title: 'Project',
      highlight: 'Portfolio Matrix',
      subtitle:
        'Showcasing 100% completed & sold-out architectural landmarks across Lekki, Banana Island, and Ikoyi, alongside next-generation master developments.',
      viewAllText: 'View All Developments & Projects'
    },
    shortStaySection: {
      kicker: 'Hospitality & Executive Living',
      title: 'Luxury Short Stay',
      highlight: 'Apartments & Suites',
      subtitle:
        "Experience 5-star hotel luxury with the privacy of a private residence in Lagos's most exclusive enclaves.",
      viewAllText: 'View All Short-Stay Suites'
    },
    servicesSection: {
      kicker: 'Integrated Expertise',
      title: 'Explore 7 Core',
      highlight: 'Capabilities',
      subtitle:
        'Click on each capability tab to explore how Nigson safeguards investments across the property value chain.',
      items: [
        {
          num: '01',
          title: 'Building Construction',
          desc: 'Luxurious yet affordable buildings, precision from design to completion, elegance, functionality, and cost-effectiveness.',
          image: '/assets/villa.jpg',
          tag: 'Construction'
        },
        {
          num: '02',
          title: 'Project Development',
          desc: 'In-depth feasibility studies, innovative architectural designs, and sustainable impactful solutions.',
          image: '/assets/community.jpg',
          tag: 'Development'
        },
        {
          num: '03',
          title: 'Property Management',
          desc: 'Rooted in empathy, proactive maintenance, tenant relations, and financial management to maximize asset value.',
          image: '/assets/banana-1.jpg',
          tag: 'Management'
        },
        {
          num: '04',
          title: 'Project Management',
          desc: 'Meticulous planning, risk assessment, seamless coordination, completed on time and within budget.',
          image: '/assets/consultation.jpg',
          tag: 'Project Management'
        },
        {
          num: '05',
          title: 'Facility Management',
          desc: 'Resilient and value-driven asset care, preventive maintenance, energy optimization, and effective space utilization.',
          image: '/assets/towers.jpg',
          tag: 'Facility Operations'
        },
        {
          num: '06',
          title: 'Property Sales and Leasing Services',
          desc: 'Built on trust, integrity, and deep market expertise to ensure every buying, selling, or leasing transaction is seamless.',
          image: '/assets/penthouse.jpg',
          tag: 'Sales & Leasing'
        },
        {
          num: '07',
          title: 'Short-Stay Luxury Suites',
          desc: 'Waterfront serviced suites (Benson Close, Ikoyi) with 24/7 power, Wi-Fi, housekeeping every 2 days, and seamless booking.',
          image: '/assets/benson-close-1.jpg',
          tag: 'Short Stay'
        }
      ]
    },
    whyChooseSection: {
      kicker: 'The Nigson Standard',
      title: 'Why Choose',
      highlight: 'Nigson Properties',
      subtitle:
        "Built on institutional integrity, European engineering standards, and transparent client partnerships across Nigeria's prime corridors.",
      items: [
        {
          title: 'A Decade of Excellence',
          desc: 'With over 10 years of experience in real estate, we deliver quality developments that combine modern design, functionality, and affordability.',
          iconName: 'Award'
        },
        {
          title: 'Secure & Safe Living',
          desc: 'Our properties are designed to promote safety and peace of mind, with secure environments and carefully considered security features.',
          iconName: 'Shield'
        },
        {
          title: 'Sustainable Energy Solutions',
          desc: 'We incorporate solar panel installations to improve energy efficiency, promote sustainability, and enhance everyday convenience.',
          iconName: 'Sun'
        },
        {
          title: 'Ample Parking Spaces',
          desc: 'Our developments feature well-planned parking spaces that provide convenience for residents and visitors alike.',
          iconName: 'Car'
        },
        {
          title: 'Modern Amenities',
          desc: 'From contemporary facilities to thoughtfully designed living spaces, we integrate modern amenities that enhance comfort, functionality, and quality of life.',
          iconName: 'Sparkles'
        },
        {
          title: 'Proper Title Documentation',
          desc: 'We prioritize transparency and confidence in property ownership by ensuring appropriate title documentation and conducting due diligence to help clients make informed and secure property investments.',
          iconName: 'FileCheck'
        }
      ]
    },
    testimonialsSection: {
      kicker: 'Proven Trust & Reputation',
      title: 'Client Testimonials & Reviews',
      subtitle:
        'Hear directly from verified homeowners, diaspora investors, short-stay guests, and corporate partners.',
      items: [
        {
          name: 'Chief Adeleke O.',
          role: 'Verified Homeowner',
          project: 'The Grand Azure Villa',
          location: 'Banana Island, Ikoyi',
          quote:
            'Acquiring our waterfront residence in Banana Island through Nigson was the smoothest real estate transaction of my life. Zero title ambiguity, immediate Governor’s Consent handover, and the European finishing exceeded our expectations.',
          category: 'Homeowner',
          rating: 5
        },
        {
          name: 'Dr. Folashade Alakija',
          role: 'Diaspora Private Investor',
          project: 'White Oaks Phase II',
          location: 'London, UK · Lekki',
          quote:
            'Living in London, investing back home always felt risky until I partnered with Nigson. Their quarterly telemetry reports, dedicated escrow, and flawless handover of our Ikoyi apartments restored my faith in Nigerian real estate.',
          category: 'Investor',
          rating: 5
        },
        {
          name: 'Marcus Sterling',
          role: 'Managing Director, Sterling Infrastructure',
          project: 'Benson Close Luxury Suites',
          location: 'Old Ikoyi',
          quote:
            'We host our visiting international executives exclusively at Nigson short-stay suites. The 24/7 solar microgrid and Starlink high-speed internet ensure our operations never pause.',
          category: 'Short-Stay Guest',
          rating: 5
        }
      ]
    }
  },

  properties: {
    hero: {
      kicker: 'Curated Portfolio',
      title: 'Exclusive Real Estate',
      highlight: 'Portfolio',
      subtitle:
        "Waterfront villas, smart penthouses, and master-planned residences in Lagos's most coveted zip codes. Verified C of O and Governor's Consent guaranteed.",
      bgImage: '/assets/hero.jpg',
      badges: ['100% Verified Land Titles', '24/7 Redundant Solar Grid', 'Direct Developer Allocations']
    },
    hubHeader: {
      title: 'Available Residences & Private Offerings',
      subtitle: 'Filter our active prime real estate by category, location, and investment tier.'
    },
    ctaBanner: {
      title: 'Seeking a Private Off-Market Allocation?',
      subtitle:
        'Our Private Client Office arranges discreet off-market acquisitions and bespoke architectural commissions for high-net-worth investors.',
      bgImage: '/assets/villa.jpg',
      buttonText: 'Request VIP Advisory Consultation'
    }
  },

  shortStay: {
    hero: {
      kicker: 'Hospitality & Executive Living',
      title: 'Executive Short-Stay',
      highlight: 'Suites',
      subtitle:
        'Turnkey residential hospitality in prime Banana Island, Ikoyi, Victoria Island, Eko Atlantic, and Abuja. Tailored for traveling executives, diaspora investors, and diplomatic missions.',
      bgImage: '/assets/suite1.jpg',
      badges: ['Starlink 300Mbps Uncapped WiFi', '24/7 Redundant Solar Grid', 'Range Rover Chauffeur on Call']
    },
    conciergeBanner: {
      kicker: 'VIP Hospitality Desk',
      title: 'Bespoke Corporate & Long-Term Bookings',
      subtitle:
        'Our hospitality concierge coordinates direct airport transfers, dedicated private chefs, diplomatic security escorts, and customized billing for corporate accounts.',
      phone: '08073467809',
      waText: 'Hello Nigson Hospitality, I would like to arrange an executive short-stay reservation.'
    }
  },

  projects: {
    hero: {
      kicker: 'Track Record & Pipeline',
      title: 'Project',
      highlight: 'Portfolio',
      subtitle:
        'Showcasing our completed architectural landmarks across Lekki, Banana Island, and Ikoyi, alongside next-generation master-planned and ongoing developments.',
      bgImage: '/assets/projects/whitesand-1.jpg',
      badges: ['6 Landmark Completed Deliveries', '100% Sold Out Track Record', 'Prime Lekki, Banana Island & Ikoyi']
    },
    stats: {
      units: '440+',
      unitsLabel: 'Total Portfolio Units',
      unitsSub: 'Across 8 High-Yield Developments',
      rate: '100%',
      rateLabel: 'Sold Out Track Record',
      rateSub: 'Across All Completed Phases'
    },
    matrixHeader: {
      title: 'Master Developments Matrix',
      subtitle: 'Discover our pipeline of current landmark projects and delivered architectural enclaves.'
    }
  },

  services: {
    hero: {
      kicker: 'Our Services & Capabilities',
      title: 'Full-Spectrum Real Estate',
      highlight: 'Services',
      subtitle:
        'Specializing in building construction, project development, property management, project management, facility management, and property sales and leasing across Nigeria.',
      bgImage: '/assets/villa.jpg',
      badges: ['Design to Completion Precision', 'Over a Decade of Experience', 'Integrity & Trust Driven']
    },
    servicesList: [
      {
        num: '01',
        title: 'Building Construction',
        tagline: 'Engineering Excellence',
        summary:
          'From architectural design to turnkey completion, we manage the entire construction lifecycle with structural rigor, premium materials, and adherence to international building standards.',
        image: '/assets/villa.jpg',
        process: [
          { step: 'Phase I', title: 'Architectural Blueprint', desc: 'Precision structural engineering & 3D visualizations.' },
          { step: 'Phase II', title: 'Site Mobilization', desc: 'Deep piling, certified soil testing & reinforced foundation.' },
          { step: 'Phase III', title: 'Superstructure & Shell', desc: 'High-grade concrete pouring, masonry & German MEP.' },
          { step: 'Phase IV', title: 'Luxury Finishing', desc: 'European marble, bespoke cabinetry & smart home automation.' }
        ]
      },
      {
        num: '02',
        title: 'Project Development',
        tagline: 'Land Banking & Landmarks',
        summary:
          'We conceptualize and execute master-planned residential communities, multi-unit luxury terraced developments, and commercial properties that redefine urban horizons.',
        image: '/assets/hero.jpg',
        process: [
          { step: 'Phase I', title: 'Feasibility & Due Diligence', desc: 'Title validation, demographic analysis & yield modeling.' },
          { step: 'Phase II', title: 'Statutory Approvals', desc: 'Lagos/Abuja town planning, EIA & Governor’s Consent clearance.' },
          { step: 'Phase III', title: 'Capital & Infrastructure', desc: 'Road networks, solar microgrids & perimeter defense.' },
          { step: 'Phase IV', title: 'Delivery & Allocation', desc: 'Phased key handovers with immaculate deed documentation.' }
        ]
      },
      {
        num: '03',
        title: 'Property Management',
        tagline: 'Preserving Asset Longevity',
        summary:
          'Protecting real estate assets with rigorous lease governance, tenant vetting, prompt rent collection, maintenance scheduling, and capital preservation.',
        image: '/assets/suite1.jpg',
        process: [
          { step: 'Phase I', title: 'Tenant Screening & Vetting', desc: 'Comprehensive financial, criminal & background verification.' },
          { step: 'Phase II', title: 'Lease Governance', desc: 'Tight legal contracts safeguarding landlord capital returns.' },
          { step: 'Phase III', title: 'Rent Disbursement', desc: 'Prompt automated accounting and quarterly portfolio reports.' },
          { step: 'Phase IV', title: 'Asset Preservation', desc: 'Routine structural audits to uphold prime market value.' }
        ]
      },
      {
        num: '04',
        title: 'Project Management',
        tagline: 'On Time & On Budget',
        summary:
          'Comprehensive oversight of independent property developments. We supervise contractors, enforce strict timeline milestones, eliminate cost overruns, and guarantee QA/QC.',
        image: '/assets/consultation.jpg',
        process: [
          { step: 'Phase I', title: 'Cost Engineering', desc: 'Bill of quantities auditing and supply chain price locks.' },
          { step: 'Phase II', title: 'Milestone Tracking', desc: 'Critical path method scheduling with penalty enforcement.' },
          { step: 'Phase III', title: 'QA/QC Inspections', desc: 'Material destructive testing and Eurocode compliance checks.' },
          { step: 'Phase IV', title: 'Client Reporting', desc: 'Live drone footage, expense ledgers & executive dossiers.' }
        ]
      },
      {
        num: '05',
        title: 'Facility Management',
        tagline: 'Operational Perfection',
        summary:
          'End-to-end estate and building operations ensuring 24/7 power autonomy, immaculate landscaping, clean water filtration, elevator maintenance, and biometric perimeter security.',
        image: '/assets/suite2.jpg',
        process: [
          { step: 'Phase I', title: '24/7 Power Assurance', desc: 'Dual generators paired with solar/lithium microgrid.' },
          { step: 'Phase II', title: 'Water Infrastructure', desc: 'Multi-stage industrial reverse osmosis & borehole filtration.' },
          { step: 'Phase III', title: 'Access Control', desc: 'Armed security personnel, CCTV surveillance & smart barriers.' },
          { step: 'Phase IV', title: 'Rapid Response Team', desc: 'On-site MEP technicians available 24/7 for urgent calls.' }
        ]
      },
      {
        num: '06',
        title: 'Property Sales & Leasing',
        tagline: 'Elite Transaction Advisory',
        summary:
          'Connecting discerning buyers, institutional investors, and diaspora clients with verified high-yield luxury real estate across Lekki, Ikoyi, Victoria Island, and Abuja.',
        image: '/assets/penthouse.jpg',
        process: [
          { step: 'Phase I', title: 'Private Dossiers', desc: 'Confidential investment memoranda and video walk-throughs.' },
          { step: 'Phase II', title: 'Title Certification', desc: 'Zero-litigation guarantee with registered Governor’s Consent.' },
          { step: 'Phase III', title: 'Flexible Escrow Terms', desc: 'Milestone payment plans tailored to construction progress.' },
          { step: 'Phase IV', title: 'Immediate Handover', desc: 'Frictionless deed transfer and turnkey key handover.' }
        ]
      },
      {
        num: '07',
        title: 'Short-Stay Luxury Suites',
        tagline: 'Waterfront Serviced Suites',
        summary:
          'Waterfront serviced suites (Benson Close, Ikoyi) with 24/7 power, Starlink Wi-Fi, housekeeping every 2 days, and seamless luxury booking.',
        image: '/assets/benson-close-1.jpg',
        process: [
          { step: 'Phase I', title: '5-Star Concierge', desc: 'Personalized check-in and 24/7 hospitality assistance.' },
          { step: 'Phase II', title: 'Uninterrupted Power', desc: 'Solar microgrid backed by silent industrial generator.' },
          { step: 'Phase III', title: 'Ultra-Fast Starlink', desc: 'High-speed internet for seamless remote work and streaming.' },
          { step: 'Phase IV', title: 'Housekeeping & Care', desc: 'Linens, amenities, and meticulous cleaning every 48 hours.' }
        ]
      }
    ]
  },

  about: {
    hero: {
      kicker: 'Heritage & Institutional Strength',
      title: 'Building Trust. Creating',
      highlight: 'Value.',
      subtitle:
        'Nigson Properties Limited is the real estate development and property management arm of Nigson Group, delivering affordable luxury homes, modern architecture, and long-term investment value across Nigeria.',
      bgImage: '/assets/consultation.jpg',
      badges: [
        'A Decade of Real Estate Excellence (10+ Years)',
        '100% Guaranteed Dispute-Free Titles',
        'Affordable Luxury Built for Generations'
      ]
    },
    narrative: {
      kicker: 'About Us',
      title: 'Nigson Properties Limited',
      p1: 'Nigson Properties is the real estate development and property management arm of the Nigson Group, committed to delivering affordable luxury homes across Nigeria. We combine modern architecture, quality craftsmanship, and innovative building solutions to create residences that offer comfort, style, security, and exceptional value.',
      p2: "Our mission is to make luxury living accessible to everyone—from young professionals and growing families to seasoned homeowners and investors. Through a full-spectrum service approach, we ensure every development is thoughtfully planned, technologically advanced, and tailored to meet the evolving needs of today's property market.",
      p3: 'We specialize in residential development, property sales, leasing, project management, and facility management services. Every Nigson Property is designed to deliver functionality, comfort, sustainability, and long-term investment value, providing our clients with homes and assets they can enjoy with confidence for years to come.'
    },
    stats: {
      decadeLabel: '10+ Yrs',
      decadeSub: 'Decade of Excellence',
      dueDiligenceLabel: '100%',
      dueDiligenceSub: 'Title Due Diligence',
      litigationLabel: '0%',
      litigationSub: 'Title Litigation'
    },
    boardCard: {
      tag: 'Executive Board',
      title: 'Advisory Governance & Institutional Due Diligence',
      image: '/assets/consultation.jpg'
    },
    missionVision: {
      missionTitle: 'Our Mission',
      mission:
        'We are a team of professionals that offer high-quality real estate and energy solutions that fulfills their business objectives using modern technology whilst also delivering superior returns to our shareholders.',
      visionTitle: 'Our Vision',
      vision:
        'The leading partner of affordable luxury housing and energy solutions.'
    },
    coreValues: [
      {
        title: 'Professionalism',
        desc: 'We demonstrate a high standard of conduct and competence, ensuring reliability and accountability in our services.'
      },
      {
        title: 'Excellence',
        desc: 'We are committed to delivering superior quality in all our services, ensuring client satisfaction.'
      },
      {
        title: 'Trust',
        desc: 'We foster confidence through transparency, honesty, and consistent delivery of promised results.'
      },
      {
        title: 'Integrity',
        desc: 'We uphold transparency and honesty in all our dealings, building trust with our clients and partners.'
      },
      {
        title: 'Value-Driven',
        desc: 'We are committed to adopting responsible practices that foster sustainable growth, create a positive impact on communities, and drive continuous innovation.'
      },
      {
        title: 'Collaboration',
        desc: 'We value teamwork and partnerships to achieve greater results through shared goals and mutual respect.'
      },
      {
        title: 'Customer-Centric',
        desc: 'Our clients are at the heart of everything we do, and we strive to provide tailored solutions for every need.'
      }
    ],
    whyChoose: [
      {
        title: 'A Decade of Excellence',
        desc: 'With over 10 years of experience in real estate, we deliver quality developments that combine modern design, functionality, and affordability.'
      },
      {
        title: 'Secure & Safe Living',
        desc: 'Our properties are designed to promote safety and peace of mind, with secure environments and carefully considered security features.'
      },
      {
        title: 'Sustainable Energy Solutions',
        desc: 'We incorporate solar panel installations to improve energy efficiency, promote sustainability, and enhance everyday convenience.'
      },
      {
        title: 'Ample Parking Spaces',
        desc: 'Our developments feature well-planned parking spaces that provide convenience for residents and visitors alike.'
      },
      {
        title: 'Modern Amenities',
        desc: 'From contemporary facilities to thoughtfully designed living spaces, we integrate modern amenities that enhance comfort, functionality, and quality of life.'
      },
      {
        title: 'Proper Title Documentation',
        desc: 'We prioritize transparency and confidence in property ownership by ensuring appropriate title documentation and conducting due diligence.'
      }
    ]
  },

  contact: {
    hero: {
      kicker: 'Corporate Contact & Headquarters',
      title: 'Consultation &',
      highlight: 'Headquarters',
      subtitle:
        'Visit our corporate headquarters on Oladimeji Alo Street, Lekki Phase 1, or schedule a consultation with our executive team.',
      bgImage: '/assets/consultation.jpg'
    },
    office: {
      kicker: 'Direct Communications',
      title: 'Lagos Corporate Office',
      desc: 'We welcome prospective homeowners, diaspora investors, short-stay guests, and corporate partners by appointment or walk-in.',
      headquartersTitle: 'Corporate Headquarters',
      addressLine1: 'Plot 30B, Block 110, Oladimeji Alo Street',
      addressLine2: 'Lekki Phase 1, Lagos, Nigeria',
      phones: ['08073467809', '09134446722'],
      hours: 'Monday–Friday, 9:00 AM–5:00 PM',
      email: 'Hello@Nigson.com',
      whatsapp: '2348073467809',
      vipNoticeTitle: 'Private Executive Concierge Desk',
      vipNoticeDesc:
        'High-net-worth investors and diaspora clients can book one-on-one virtual or in-person advisory sessions directly with the Managing Director.'
    },
    inquiryForm: {
      kicker: 'Client Engagement',
      title: 'Property Inquiry & Consultation',
      desc: 'Complete this inquiry form and our designated sales and client services team will contact you promptly.',
      buttonText: 'Submit Property Inquiry',
      successTitle: 'Inquiry Dispatched Successfully',
      successMessage: 'Our sales and client services team will contact you shortly.'
    }
  }
};

const STORAGE_KEY_CMS = 'nigson_cms_content';

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  readonly cmsData = signal<CmsContent>(this.loadStoredContent());

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (event) => {
        if (event.key === STORAGE_KEY_CMS && event.newValue) {
          try {
            const parsed = JSON.parse(event.newValue);
            this.cmsData.set(this.mergeWithDefaults(parsed));
          } catch (e) {
            console.warn('Failed to parse updated CMS storage data', e);
          }
        }
      });
    }
  }

  private loadStoredContent(): CmsContent {
    if (typeof window === 'undefined') {
      return DEFAULT_CMS_CONTENT;
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CMS);
      if (stored) {
        const parsed = JSON.parse(stored);
        return this.mergeWithDefaults(parsed);
      }
    } catch (e) {
      console.warn('Error loading CMS data from storage', e);
    }
    return DEFAULT_CMS_CONTENT;
  }

  private mergeWithDefaults(saved: any): CmsContent {
    return {
      home: {
        ...DEFAULT_CMS_CONTENT.home,
        ...(saved?.home || {}),
        hero: { ...DEFAULT_CMS_CONTENT.home.hero, ...(saved?.home?.hero || {}) },
        standard: { ...DEFAULT_CMS_CONTENT.home.standard, ...(saved?.home?.standard || {}) },
        stats: saved?.home?.stats?.length ? saved.home.stats : DEFAULT_CMS_CONTENT.home.stats,
        propertiesSection: { ...DEFAULT_CMS_CONTENT.home.propertiesSection, ...(saved?.home?.propertiesSection || {}) },
        projectsSection: { ...DEFAULT_CMS_CONTENT.home.projectsSection, ...(saved?.home?.projectsSection || {}) },
        shortStaySection: { ...DEFAULT_CMS_CONTENT.home.shortStaySection, ...(saved?.home?.shortStaySection || {}) },
        servicesSection: {
          ...DEFAULT_CMS_CONTENT.home.servicesSection,
          ...(saved?.home?.servicesSection || {}),
          items: saved?.home?.servicesSection?.items?.length ? saved.home.servicesSection.items : DEFAULT_CMS_CONTENT.home.servicesSection.items
        },
        whyChooseSection: {
          ...DEFAULT_CMS_CONTENT.home.whyChooseSection,
          ...(saved?.home?.whyChooseSection || {}),
          items: saved?.home?.whyChooseSection?.items?.length ? saved.home.whyChooseSection.items : DEFAULT_CMS_CONTENT.home.whyChooseSection.items
        },
        testimonialsSection: {
          ...DEFAULT_CMS_CONTENT.home.testimonialsSection,
          ...(saved?.home?.testimonialsSection || {}),
          items: saved?.home?.testimonialsSection?.items?.length ? saved.home.testimonialsSection.items : DEFAULT_CMS_CONTENT.home.testimonialsSection.items
        }
      },
      properties: {
        ...DEFAULT_CMS_CONTENT.properties,
        ...(saved?.properties || {}),
        hero: { ...DEFAULT_CMS_CONTENT.properties.hero, ...(saved?.properties?.hero || {}) },
        hubHeader: { ...DEFAULT_CMS_CONTENT.properties.hubHeader, ...(saved?.properties?.hubHeader || {}) },
        ctaBanner: { ...DEFAULT_CMS_CONTENT.properties.ctaBanner, ...(saved?.properties?.ctaBanner || {}) }
      },
      shortStay: {
        ...DEFAULT_CMS_CONTENT.shortStay,
        ...(saved?.shortStay || {}),
        hero: { ...DEFAULT_CMS_CONTENT.shortStay.hero, ...(saved?.shortStay?.hero || {}) },
        conciergeBanner: { ...DEFAULT_CMS_CONTENT.shortStay.conciergeBanner, ...(saved?.shortStay?.conciergeBanner || {}) }
      },
      projects: {
        ...DEFAULT_CMS_CONTENT.projects,
        ...(saved?.projects || {}),
        hero: { ...DEFAULT_CMS_CONTENT.projects.hero, ...(saved?.projects?.hero || {}) },
        stats: { ...DEFAULT_CMS_CONTENT.projects.stats, ...(saved?.projects?.stats || {}) },
        matrixHeader: { ...DEFAULT_CMS_CONTENT.projects.matrixHeader, ...(saved?.projects?.matrixHeader || {}) }
      },
      services: {
        ...DEFAULT_CMS_CONTENT.services,
        ...(saved?.services || {}),
        hero: { ...DEFAULT_CMS_CONTENT.services.hero, ...(saved?.services?.hero || {}) },
        servicesList: saved?.services?.servicesList && saved.services.servicesList.length >= 7
          ? saved.services.servicesList.map((s: any, idx: number) => ({
              ...DEFAULT_CMS_CONTENT.services.servicesList[idx],
              ...s,
              process: (s.process && s.process.length)
                ? s.process
                : DEFAULT_CMS_CONTENT.services.servicesList[idx]?.process || []
            }))
          : DEFAULT_CMS_CONTENT.services.servicesList
      },
      about: {
        ...DEFAULT_CMS_CONTENT.about,
        ...(saved?.about || {}),
        hero: { ...DEFAULT_CMS_CONTENT.about.hero, ...(saved?.about?.hero || {}) },
        narrative: { ...DEFAULT_CMS_CONTENT.about.narrative, ...(saved?.about?.narrative || {}) },
        stats: { ...DEFAULT_CMS_CONTENT.about.stats, ...(saved?.about?.stats || {}) },
        boardCard: { ...DEFAULT_CMS_CONTENT.about.boardCard, ...(saved?.about?.boardCard || {}) },
        missionVision: { ...DEFAULT_CMS_CONTENT.about.missionVision, ...(saved?.about?.missionVision || {}) },
        coreValues: saved?.about?.coreValues?.length ? saved.about.coreValues : DEFAULT_CMS_CONTENT.about.coreValues,
        whyChoose: saved?.about?.whyChoose?.length ? saved.about.whyChoose : DEFAULT_CMS_CONTENT.about.whyChoose
      },
      contact: {
        ...DEFAULT_CMS_CONTENT.contact,
        ...(saved?.contact || {}),
        hero: { ...DEFAULT_CMS_CONTENT.contact.hero, ...(saved?.contact?.hero || {}) },
        office: {
          ...DEFAULT_CMS_CONTENT.contact.office,
          ...(saved?.contact?.office || {}),
          phones: saved?.contact?.office?.phones?.length ? saved.contact.office.phones : DEFAULT_CMS_CONTENT.contact.office.phones
        },
        inquiryForm: {
          ...DEFAULT_CMS_CONTENT.contact.inquiryForm,
          ...(saved?.contact?.inquiryForm || {})
        }
      }
    };
  }

  updatePage<K extends keyof CmsContent>(pageKey: K, updatedData: Partial<CmsContent[K]>): void {
    const current = this.cmsData();
    const mergedPage = {
      ...current[pageKey],
      ...updatedData
    };
    const newContent: CmsContent = {
      ...current,
      [pageKey]: mergedPage
    };
    this.saveAndNotify(newContent);
  }

  updateAll(fullContent: CmsContent): void {
    this.saveAndNotify(fullContent);
  }

  resetPage(pageKey: keyof CmsContent): void {
    const current = this.cmsData();
    const newContent: CmsContent = {
      ...current,
      [pageKey]: JSON.parse(JSON.stringify(DEFAULT_CMS_CONTENT[pageKey]))
    };
    this.saveAndNotify(newContent);
  }

  resetAll(): void {
    this.saveAndNotify(JSON.parse(JSON.stringify(DEFAULT_CMS_CONTENT)));
  }

  private saveAndNotify(content: CmsContent): void {
    this.cmsData.set(content);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_CMS, JSON.stringify(content));
        // Dispatch synthetic storage event for same-window iframes
        window.dispatchEvent(
          new StorageEvent('storage', {
            key: STORAGE_KEY_CMS,
            newValue: JSON.stringify(content)
          })
        );
      } catch (e) {
        console.warn('Failed to persist CMS content', e);
      }
    }
  }

  exportJson(): string {
    return JSON.stringify(this.cmsData(), null, 2);
  }

  importJson(json: string): boolean {
    try {
      const parsed = JSON.parse(json);
      const merged = this.mergeWithDefaults(parsed);
      this.saveAndNotify(merged);
      return true;
    } catch {
      return false;
    }
  }
}
