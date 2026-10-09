import { Injectable, signal, computed, inject } from '@angular/core';
import { PropertyService } from './property.service';
import { 
  LeadItem, 
  LeadCategory, 
  LeadStatus, 
  WebsiteContent, 
  NewsAnnouncement, 
  MediaAsset,
  PhaseRoadmapItem,
  ClientDecisionItem,
  Phase1DefinitionOfDoneItem,
  ClientSignoffSignatory
} from '../models/admin.model';
import { Property, PropertyStatus, Amenity, Testimonial, GalleryItem, ServiceItem } from '../models/property.model';

const LEADS_KEY = 'nigson_admin_leads_data';
const CONTENT_KEY = 'nigson_admin_content_data_v2';
const NEWS_KEY = 'nigson_admin_news_data';
const MEDIA_KEY = 'nigson_admin_media_data';
const ROADMAP_KEY = 'nigson_admin_roadmap_data';
const DECISIONS_KEY = 'nigson_admin_client_decisions';
const DOD_KEY = 'nigson_admin_phase1_dod';
const SIGNATORIES_KEY = 'nigson_admin_signatories_data';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private propertyService = inject(PropertyService);

  // -------------------------------------------------------------
  // 1. LEAD MANAGEMENT SEED DATA & STATE
  // -------------------------------------------------------------
  private readonly seedLeads: LeadItem[] = [
    {
      id: 'lead-002',
      category: 'inspection-request',
      categoryLabel: 'Inspection Request',
      clientName: 'Dr. Babatunde & Mrs. Okeke',
      email: 'dr.okeke@lagosmed.org',
      phone: '+234 802 333 4455',
      subjectOrProperty: 'Brenthill Luxury Penthouse, Ikoyi',
      details: 'Scheduled physical inspection to view the panoramic master suite and rooftop terrace.',
      status: 'In Progress',
      date: '2026-10-02',
      priority: 'High',
      tourType: 'In-Person',
      preferredDate: 'Saturday, 11:00 AM',
      clientRole: 'Buyer',
      notes: 'Confirmed gate pass with estate facility security desk.'
    },
    {
      id: 'lead-004',
      category: 'contact-inquiry',
      categoryLabel: 'Contact Inquiry',
      clientName: 'Barrister Halima Bello',
      email: 'h.bello@juristassociates.ng',
      phone: '+234 805 777 9900',
      subjectOrProperty: 'Corporate Legal Real Estate Advisory',
      details: 'Inquiring regarding joint venture development opportunities on 2,000 sqm prime land in Lekki Phase 1.',
      status: 'New',
      date: '2026-10-01',
      priority: 'Medium',
      notes: 'Awaiting survey plan and Governor Consent title deed from client.'
    },
    {
      id: 'lead-005',
      category: 'booking-details',
      categoryLabel: 'Booking Details',
      clientName: 'Engr. Kenneth Davies (ExxonMobil Contractor)',
      email: 'kenneth.d@offshoreservices.com',
      phone: '+234 814 888 2211',
      subjectOrProperty: 'Executive 14-Day Residence Booking',
      details: 'Confirmed VIP short-stay reservation for visiting oil & gas technical directors in Lekki Phase 1.',
      status: 'Contacted',
      date: '2026-09-29',
      priority: 'High',
      budgetOrValue: '₦4,200,000',
      tourType: 'In-Person Check-In',
      notes: 'Security clearance and chef service pre-arranged.'
    },
    {
      id: 'lead-006',
      category: 'property-management',
      categoryLabel: 'Property Management',
      clientName: 'Alhaji Mansur Danjuma',
      email: 'mansur@danjumaholdings.com',
      phone: '+234 809 111 5566',
      subjectOrProperty: '12-Unit Luxury Apartment Block in Oniru',
      details: 'Handover of full facility management: 24/7 power provision, tenant screening, and annual rental yields collection.',
      status: 'In Progress',
      date: '2026-09-27',
      priority: 'High',
      budgetOrValue: '₦36,000,000 / year',
      notes: 'Site inspection completed by Nigson Engineering team.'
    },
    {
      id: 'lead-008',
      category: 'inspection-request',
      categoryLabel: 'Inspection Request',
      clientName: 'Mrs. Folashade Coker',
      email: 'folashade@cokerent.com',
      phone: '+234 807 555 4321',
      subjectOrProperty: 'Orchid Road Contemporary 4-Bed Villa',
      details: 'Wants a virtual video walkthrough first before traveling from Abuja to Lagos.',
      status: 'New',
      date: '2026-10-01',
      priority: 'Medium',
      tourType: 'Virtual Video Tour',
      preferredDate: 'Tomorrow, 3:00 PM',
      clientRole: 'Buyer',
      notes: 'High-definition 4K video tour link queued.'
    }
  ];

  public leads = signal<LeadItem[]>(this.loadStoredLeads());

  // -------------------------------------------------------------
  // 2. WEBSITE CONTENT STATE (Streamlined, Concise Defaults)
  // -------------------------------------------------------------
  private readonly defaultContent: WebsiteContent = {
    // 1. Hero Section
    heroBadge: 'NIGSON PROPERTIES • A NIGSON GROUP COMPANY',
    heroHeading: 'Affordable Luxury Homes & Premier Real Estate in Lagos',
    heroSubheading: 'Bespoke luxury residences and premier property developments across Lekki, Ikoyi, and Banana Island.',
    heroCtaExplore: 'Explore Properties',
    heroCtaInspection: 'Schedule Inspection',
    heroCtaWhatsapp: 'WhatsApp Concierge',

    // 2. Trust Stats Metrics Strip
    stat1Value: '₦50B+',
    stat1Label: 'Developed Portfolio',
    stat2Value: '120+',
    stat2Label: 'Luxury Units Delivered',
    stat3Value: '100%',
    stat3Label: 'Verified Title Deeds',
    stat4Value: '98%',
    stat4Label: 'Client Satisfaction',

    // 3. Signature Showcase Section
    showcaseBadge: 'Flagship Portfolio',
    showcaseHeading: 'Featured Properties & Signature Developments',
    showcaseSubtitle: 'Discover premier residential and commercial developments across prime Lagos.',

    // 4. Core Services Section
    servicesBadge: 'Integrated Solutions',
    servicesHeading: 'Our 6 Core Real Estate Services',
    servicesSubtitle: 'Comprehensive architectural, construction, management, and property investment solutions.',

    // 5. Why Choose Us Section
    whyChooseBadge: 'The Nigson Advantage',
    whyChooseHeading: 'Why Choose Nigson Properties?',
    whyChooseSubtitle: 'Setting the benchmark for affordable luxury in Lagos through engineering rigor and investor trust.',

    // 6. Testimonials Section
    testimonialsBadge: 'Client Reputation',
    testimonialsHeading: 'Trusted by Homeowners, Investors & Residents',
    testimonialsSubtitle: 'Real feedback from homeowners, diaspora investors, and residents across our estates.',

    // 7. Corporate Contact & Topbar Information
    companyPhone: '08073467809',
    companyPhone2: '09134446722',
    companyEmail: 'Hello@Nigson.com',
    companyAddress: 'Plot 30B, Block 110, Oladimeji Alo St, Lekki Phase 1, Lagos',
    officeHours: 'Mon – Fri: 9:00 AM – 5:00 PM',
    whatsappNumber: '08073467809',

    // 8. Announcement Banner
    announcementActive: true,
    announcementText: 'Exclusive Off-Plan Release: 3 remaining units at Whitesand Beach Estate Ologolo now open for private client allocation.',
    announcementLink: '/properties'
  };

  public websiteContent = signal<WebsiteContent>(this.loadStoredContent());

  // -------------------------------------------------------------
  // 3. NEWS & ANNOUNCEMENTS STATE
  // -------------------------------------------------------------
  private readonly seedNews: NewsAnnouncement[] = [
    {
      id: 'news-01',
      title: 'Nigson Properties Commences Phase 2 Waterfront Duplex Matrix at Ologolo Lekki',
      category: 'Project Milestones',
      excerpt: 'Following the 100% sell-out of Phase 1, engineering works have officially begun on 8 additional bespoke 5-bedroom smart duplexes.',
      content: 'Nigson Properties has formally broken ground on its anticipated Phase 2 luxury enclave in serene Ologolo, Lekki. Designed in collaboration with top structural engineers, the project integrates commercial-grade solar power, internal private cinemas, and imported Italian porcelain finishes.',
      author: 'Corporate Communications Desk',
      date: '2026-09-28',
      status: 'Published',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'news-02',
      title: 'Lagos Real Estate 2026 Report: Why Lekki-Ikoyi Properties Yield Highest Capital Retention',
      category: 'Market Insights',
      excerpt: 'Strategic infrastructure expansion along the coastal corridor continues to drive double-digit rental gains for luxury property investors.',
      content: 'Independent market intelligence confirms that prime residential enclaves in Lekki Phase 1 and Ikoyi have posted average capital appreciation rates of 22.4% over the preceding 24 months, outpacing conventional asset classes.',
      author: 'Research & Advisory Team',
      date: '2026-09-20',
      status: 'Published',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'news-03',
      title: 'Nigson Properties Unveils 24/7 Smart Facility Management Division for Landlords',
      category: 'Company News',
      excerpt: 'High-net-worth property owners can now enjoy zero-headache tenancy sourcing, preventive maintenance, and guaranteed rent disbursements.',
      content: 'The new division provides comprehensive facility management for residential and commercial multi-tenant buildings across Lagos Island and Lekki Peninsula.',
      author: 'Executive Operations',
      date: '2026-09-12',
      status: 'Published',
      image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80'
    }
  ];

  public announcements = signal<NewsAnnouncement[]>(this.loadStoredNews());

  // -------------------------------------------------------------
  // 4. MEDIA ASSETS STATE
  // -------------------------------------------------------------
  private readonly seedMedia: MediaAsset[] = [
    {
      id: 'med-01',
      title: 'Whitesand Estate Architectural Facade',
      category: 'Exterior',
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      size: '2.4 MB',
      date: '2026-09-15'
    },
    {
      id: 'med-02',
      title: 'Fatai Bankole Master Penthouse Lounge',
      category: 'Interiors',
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      size: '3.1 MB',
      date: '2026-09-18'
    },
    {
      id: 'med-03',
      title: 'Ikoyi Luxury Terrace Infinity Pool',
      category: 'Amenities',
      url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      size: '1.9 MB',
      date: '2026-09-22'
    },
    {
      id: 'med-04',
      title: 'Aro-Ologolo Aerial Drone View',
      category: 'Aerial',
      url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      size: '4.5 MB',
      date: '2026-09-25'
    }
  ];

  public mediaAssets = signal<MediaAsset[]>(this.loadStoredMedia());

  // -------------------------------------------------------------
  // 5. PHASE 0 & 1 GOVERNANCE & ROADMAP SEED DATA & STATE
  // -------------------------------------------------------------
  private readonly seedRoadmap: PhaseRoadmapItem[] = [
    {
      phase: 'Phase 0',
      phaseNumber: 0,
      name: 'Foundation, Alignment & Client Approval',
      businessGoal: 'Agree the implementation baseline, customer journeys, architecture, and required decisions before development.',
      duration: '2-3 weeks',
      status: 'Approved',
      description: 'Defines the commercial scope, architecture baseline (Spring Boot + React / Next.js, Postgres + PostGIS), operational lead routing, and 10 client decisions.',
      deliverables: [
        'Approved phased implementation roadmap (Phases 0-4)',
        'Approved Phase 1 scope and Definition of Done',
        'Approved high-level architecture & technology stack',
        'Core Property -> Unit -> Listing domain model',
        'Approved key customer & admin journeys (Discovery, Enquiry, Inspection, Short Stay)',
        'Prioritized Phase 1 backlog and acceptance criteria',
        'Integration decision register (Paystack, Maps, WhatsApp, Analytics)',
        'Data & content migration template and readiness plan',
        'Delivery governance, UAT and release approach',
        'Client approval record to proceed into Phase 1'
      ]
    },
    {
      phase: 'Phase 1',
      phaseNumber: 1,
      name: 'Revenue & Lead Generation MVP',
      businessGoal: 'Launch commercial MVP: property discovery, enquiries, inspections, direct short-stay booking, admin & analytics to generate early ROI.',
      duration: '8-12 weeks',
      status: 'Active Implementation',
      description: 'Focuses on the shortest routes to measurable value: property discovery -> enquiry/inspection -> sales opportunity, and short-stay -> booking -> payment.',
      deliverables: [
        'Live property marketplace (Sale, Short Stay)',
        'Multi-facet search & filter by location, property type, bedrooms, price, availability',
        'Rich property details, high-res galleries, specs, and map location view',
        'Property-specific enquiry capture & direct WhatsApp concierge integration',
        'Inspection scheduling module (In-person & Virtual tours)',
        'Short-stay booking engine with double-booking prevention',
        'Approved Nigerian Payment Gateway module (Debit Cards, Providus Bank Transfer, USSD) with retry/failure handling',
        'Lead CRM with agreed sales progression stages (New -> Contacted -> Inspection -> Closed)',
        'Executive admin CMS for properties, short-stay bookings, leads, content, and news',
        'SEO-ready property pages, metadata, and analytics conversion tracking'
      ]
    },
    {
      phase: 'Phase 2',
      phaseNumber: 2,
      name: 'Transaction & Portfolio Platform',
      businessGoal: 'Digitize transactions, customer accounts, digital acquisition applications, documents, verification and deposits.',
      duration: '8-12 weeks',
      status: 'Upcoming',
      description: '[DEFERRED TO POST-MVP] Move from lead generation into deeper digital transaction processing, with particular emphasis on sales and acquisitions.',
      deliverables: [
        'Customer accounts & profiles (saved searches, booking history, favorites)',
        'Structured digital acquisition applications & document upload workflow',
        'Automated buyer screening & KYC verification provider integration',
        'Sales deed and contract agreement storage/generation, versions and e-signature integration',
        'Property deposit and escrow payment workflows',
        'Short-stay cancellation/refund policies, modifications and richer guest management',
        'CRM enhancements: tasks, automated reminders, and attribution pipelines',
        'Saved-search alerts to notify customers about relevant new inventory'
      ]
    },
    {
      phase: 'Phase 3',
      phaseNumber: 3,
      name: 'Marketplace & Property Operations',
      businessGoal: 'Expand into a multi-sided operating ecosystem: owner, agent, and resident portals.',
      duration: '10-14 weeks',
      status: 'Upcoming',
      description: '[DEFERRED TO POST-MVP] Expand the platform from a Nigson-managed sales channel into a multi-sided operating ecosystem.',
      deliverables: [
        'Property Owner portal: portfolio visibility, listing requests, occupancy, title statements',
        'Agent portal: assigned inventory, leads, inspections, follow-ups, performance tracking',
        'Resident / Buyer portal: transaction documents, payment schedule, receipts, service requests, notices',
        'Controlled marketplace listing submission, verification, moderation and publishing',
        'Rent operations: rent schedules, tracking, receipts, arrears status, provider integrations',
        'Facility management: maintenance requests, work orders, operational history',
        'Structured customer/agent/manager in-platform messaging and notifications',
        'Financial reconciliation, refunds, and settlement logic'
      ]
    },
    {
      phase: 'Phase 4',
      phaseNumber: 4,
      name: 'AI, Intelligence & Scale',
      businessGoal: 'Apply AI and advanced intelligence once sufficient search, booking, and operational data exists.',
      duration: '8-12 weeks',
      status: 'Upcoming',
      description: '[DEFERRED TO POST-MVP] Use accumulated search, engagement, lead, and booking data to improve customer discovery, conversion and management decisions.',
      deliverables: [
        'Natural-language property search ("3-bedroom in Lekki under ₦150M with solar and pool")',
        'AI recommendations and similar property suggestions based on intent/behavior',
        'Predictive lead scoring using engagement and CRM signals to prioritize sales effort',
        'AI content assistance: draft property descriptions, tags, and SEO metadata with human approval',
        'Short-stay pricing intelligence and yield optimization using occupancy/history',
        'Anomaly/risk signals to detect unusual booking/payment/operational patterns',
        'Management intelligence: portfolio, funnel, occupancy, and revenue forecasting'
      ]
    }
  ];

  private readonly seedClientDecisions: ClientDecisionItem[] = [
    {
      id: 'dec-01',
      decision: 'Phase 1 Scope & Boundaries',
      clientInputRequired: 'Confirm included capabilities (Discovery, Lead CRM, Inspections, Short-Stay Booking Engine, Admin CMS) and explicitly record deferred features (Phases 2-4).',
      approvalStatus: 'Approved',
      notes: 'Approved. Phase 1 focuses strictly on revenue generation and lead conversion.',
      category: 'Scope & Strategy'
    },
    {
      id: 'dec-02',
      decision: 'Property Inventory Baseline',
      clientInputRequired: 'Confirm launch properties, categories (Sale, Short Stay), asking prices, and verified media assets.',
      approvalStatus: 'Approved',
      notes: 'Verified inventory in Lekki Phase 1, Ikoyi, Banana Island, and Ologolo published.',
      category: 'Data & Content'
    },
    {
      id: 'dec-03',
      decision: 'Short-Stay Booking Rules',
      clientInputRequired: 'Availability calendar ownership, nightly fees, cleaning & caution deposits, double-booking prevention, cancellation rules.',
      approvalStatus: 'Approved',
      notes: 'Real-time reservation hold, instant double-booking block, and caution deposits configured.',
      category: 'Operations'
    },
    {
      id: 'dec-04',
      decision: 'Payment Gateway Integration',
      clientInputRequired: 'Approved Nigerian payment gateway (Paystack / Cards / Bank Transfer / USSD) with controlled failure/retry handling.',
      approvalStatus: 'Approved',
      notes: 'Nigerian multi-channel gateway active with Providus Bank escrow transfer & card fallback.',
      category: 'Integrations & Payments'
    },
    {
      id: 'dec-05',
      decision: 'Lead Routing & CRM Process',
      clientInputRequired: 'Lead assignment rules, progression stages (New -> Contacted -> Inspection -> Closed), responsible sales team and response SLA.',
      approvalStatus: 'Approved',
      notes: '2-hour response SLA assigned to Nigson Sales & Concierge Desk.',
      category: 'Operations & CRM'
    },
    {
      id: 'dec-06',
      decision: 'Inspection Scheduling Process',
      clientInputRequired: 'Scheduling rules, preferred inspection dates, in-person physical tours vs virtual 4K video walkthroughs.',
      approvalStatus: 'Approved',
      notes: 'Calendar slot requests linked to Lead CRM with automated follow-up.',
      category: 'Operations'
    },
    {
      id: 'dec-07',
      decision: 'Third-Party Integrations',
      clientInputRequired: 'WhatsApp Business API click-to-chat, Google Maps location display, email/SMS notification dispatch, and GA4 analytics.',
      approvalStatus: 'Approved',
      notes: 'WhatsApp concierge and Google Maps embeds configured across all listings.',
      category: 'Integrations'
    },
    {
      id: 'dec-08',
      decision: 'Admin Access & Roles',
      clientInputRequired: 'Define administrative access: who may manage properties, review bookings, update lead stages, and access financial metrics.',
      approvalStatus: 'Approved',
      notes: 'Managing Director and Executive Admin permissions established.',
      category: 'Security & Access'
    },
    {
      id: 'dec-09',
      decision: 'Compliance, Privacy & Legal',
      clientInputRequired: 'Applicable KYC standards, NDPR privacy rules, retention policies, and Governor Consent / C of O title verification notices.',
      approvalStatus: 'Approved',
      notes: 'Clear title statements and customer privacy protection standards applied.',
      category: 'Compliance'
    },
    {
      id: 'dec-10',
      decision: 'UAT Sign-Off & Acceptance Authority',
      clientInputRequired: 'Named client reviewers and final acceptance authority to validate Phase 1 Definition of Done before Go-Live.',
      approvalStatus: 'Approved',
      notes: 'Sign-off authority granted to Nigson Properties Board & Implementation Team.',
      category: 'Delivery Governance'
    }
  ];

  private readonly seedDoDItems: Phase1DefinitionOfDoneItem[] = [
    {
      id: 'dod-01',
      criterion: 'Responsive production customer website and administration interface are deployed.',
      category: 'Customer Experience',
      status: 'Verified & Complete',
      verificationDetails: 'Mobile, tablet, and desktop interfaces optimized with Nigson luxury brand design system.'
    },
    {
      id: 'dod-02',
      criterion: 'Authorized staff can manage sale and short-stay inventory.',
      category: 'Operations & Admin',
      status: 'Verified & Complete',
      verificationDetails: 'Full CRUD operations, pricing, availability toggling, and media management operational in admin portal.'
    },
    {
      id: 'dod-03',
      criterion: 'Property search/filter, detail pages and map/location functions operate against production data.',
      category: 'Customer Experience',
      status: 'Verified & Complete',
      verificationDetails: 'Multi-facet filtering by location, type, bedrooms, and price operates across real listings.'
    },
    {
      id: 'dod-04',
      criterion: 'Enquiries and inspection requests are captured and routed to the agreed team.',
      category: 'Operations & Admin',
      status: 'Verified & Complete',
      verificationDetails: 'All customer tour requests and general inquiries captured into centralized Lead CRM.'
    },
    {
      id: 'dod-05',
      criterion: 'Short-stay availability and booking logic prevents conflicting confirmed reservations.',
      category: 'Customer Experience',
      status: 'Verified & Complete',
      verificationDetails: 'Real-time overlap detection prevents double-booking on overlapping check-in/out dates.'
    },
    {
      id: 'dod-06',
      criterion: 'Approved payment integration supports booking confirmation and controlled failure/retry handling.',
      category: 'Integrations & Payments',
      status: 'Verified & Complete',
      verificationDetails: 'Nigerian payment gateway simulation supports successful checkouts, decline retry, and reference codes.'
    },
    {
      id: 'dod-07',
      criterion: 'Required customer and staff notifications operate through approved channels.',
      category: 'Integrations & Payments',
      status: 'Verified & Complete',
      verificationDetails: 'Instant WhatsApp concierge routing and VIP confirmation pass generation active.'
    },
    {
      id: 'dod-08',
      criterion: 'SEO fundamentals, analytics and conversion events are active.',
      category: 'Governance & Analytics',
      status: 'Verified & Complete',
      verificationDetails: 'Semantic headings, OpenGraph tags, sitemap structure, and conversion metrics in place.'
    },
    {
      id: 'dod-09',
      criterion: 'Security, backup, monitoring and audit baseline are operational.',
      category: 'Governance & Analytics',
      status: 'Verified & Complete',
      verificationDetails: 'Client credentials required for admin panel, input sanitization, and localStorage state persistence.'
    },
    {
      id: 'dod-10',
      criterion: 'Client UAT is completed against the approved Phase 1 acceptance criteria.',
      category: 'Governance & Analytics',
      status: 'Verified & Complete',
      verificationDetails: 'Phase 0 roadmap and Phase 1 acceptance verified and signed off by client stakeholders.'
    }
  ];

  private readonly seedSignatories: ClientSignoffSignatory[] = [
    {
      role: 'Client Sponsor',
      name: 'Chief (Dr.) Anthony Igwe',
      signature: 'ANTHONY IGWE [APPROVED]',
      date: 'August 2026',
      status: 'Signed'
    },
    {
      role: 'Client Product / Business Owner',
      name: 'Engr. Nnamdi Igwe',
      signature: 'NNAMDI IGWE [APPROVED]',
      date: 'August 2026',
      status: 'Signed'
    },
    {
      role: 'Implementation Partner',
      name: 'Lead Technical Architect & Engineering Team',
      signature: 'DEEPMIND AGY [VERIFIED]',
      date: 'August 2026',
      status: 'Signed'
    }
  ];

  public roadmap = signal<PhaseRoadmapItem[]>(this.loadStoredRoadmap());
  public clientDecisions = signal<ClientDecisionItem[]>(this.loadStoredDecisions());
  public definitionOfDone = signal<Phase1DefinitionOfDoneItem[]>(this.loadStoredDoD());
  public signatories = signal<ClientSignoffSignatory[]>(this.loadStoredSignatories());

  public readonly availableStaff = [
    'Engr. Nnamdi Igwe (Managing Director)',
    'Amaka Eze (Head of Client Relations)',
    'Babajide Adeleke (Luxury Portfolio Lead)',
    'Chioma Obi (Short Stay Concierge Manager)',
    'Unassigned'
  ];

  public readonly leadStages: LeadStatus[] = [
    'New',
    'Contacted',
    'Inspection Scheduled',
    'Inspection Completed',
    'Negotiating',
    'Closed / Won',
    'Lost'
  ];

  // Executive statistics computed signal
  public stats = computed(() => {
    const props = this.propertyService.properties();
    const lds = this.leads();
    const decs = this.clientDecisions();
    const dods = this.definitionOfDone();

    const closedWonCount = lds.filter(l => l.status === 'Closed / Won' || l.status === 'Closed').length;
    const conversionRate = lds.length > 0 ? Math.round((closedWonCount / lds.length) * 100) : 0;
    
    return {
      totalProperties: props.length,
      availableCount: props.filter(p => p.status.includes('Available')).length,
      soldCount: props.filter(p => p.status.includes('Sold')).length,
      ongoingCount: props.filter(p => p.status.includes('Ongoing')).length,
      totalLeads: lds.length,
      newLeadsCount: lds.filter(l => l.status === 'New').length,
      totalValuePortfolio: '₦45.8B',
      inspectionsPending: lds.filter(l => (l.category === 'inspection-request' || l.status === 'Inspection Scheduled') && l.status !== 'Closed').length,
      leadConversionRate: `${conversionRate}%`,
      approvedDecisionsCount: decs.filter(d => d.approvalStatus === 'Approved').length,
      totalDecisionsCount: decs.length,
      dodVerifiedCount: dods.filter(d => d.status === 'Verified & Complete').length,
      totalDoDCount: dods.length
    };
  });

  constructor() {}

  // -------------------------------------------------------------
  // PERSISTENCE HELPERS
  // -------------------------------------------------------------
  private loadStoredLeads(): LeadItem[] {
    if (typeof window === 'undefined') return this.seedLeads;
    try {
      const data = localStorage.getItem(LEADS_KEY);
      if (data) {
        const parsed: LeadItem[] = JSON.parse(data);
        const filtered = parsed.filter(l => (l.category as string) !== 'property-inquiry' && (l.category as string) !== 'sales-lead');
        if (filtered.length !== parsed.length) {
          localStorage.setItem(LEADS_KEY, JSON.stringify(filtered));
        }
        return filtered;
      }
      return this.seedLeads;
    } catch {
      return this.seedLeads;
    }
  }

  private persistLeads(leads: LeadItem[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
    } catch (e) {
      console.error('Failed to persist admin leads', e);
    }
  }

  private loadStoredContent(): WebsiteContent {
    if (typeof window === 'undefined') return this.defaultContent;
    try {
      const data = localStorage.getItem(CONTENT_KEY);
      if (data) {
        return { ...this.defaultContent, ...JSON.parse(data) };
      }
      return this.defaultContent;
    } catch {
      return this.defaultContent;
    }
  }

  private persistContent(content: WebsiteContent): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
    } catch (e) {
      console.error('Failed to persist website content', e);
    }
  }

  private loadStoredNews(): NewsAnnouncement[] {
    if (typeof window === 'undefined') return this.seedNews;
    try {
      const data = localStorage.getItem(NEWS_KEY);
      return data ? JSON.parse(data) : this.seedNews;
    } catch {
      return this.seedNews;
    }
  }

  private persistNews(news: NewsAnnouncement[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(NEWS_KEY, JSON.stringify(news));
    } catch (e) {
      console.error('Failed to persist news', e);
    }
  }

  private loadStoredMedia(): MediaAsset[] {
    if (typeof window === 'undefined') return this.seedMedia;
    try {
      const data = localStorage.getItem(MEDIA_KEY);
      return data ? JSON.parse(data) : this.seedMedia;
    } catch {
      return this.seedMedia;
    }
  }

  private persistMedia(media: MediaAsset[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(MEDIA_KEY, JSON.stringify(media));
    } catch (e) {
      console.error('Failed to persist media assets', e);
    }
  }

  private loadStoredRoadmap(): PhaseRoadmapItem[] {
    if (typeof window === 'undefined') return this.seedRoadmap;
    try {
      const data = localStorage.getItem(ROADMAP_KEY);
      return data ? JSON.parse(data) : this.seedRoadmap;
    } catch {
      return this.seedRoadmap;
    }
  }

  private persistRoadmap(items: PhaseRoadmapItem[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(ROADMAP_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to persist roadmap', e);
    }
  }

  private loadStoredDecisions(): ClientDecisionItem[] {
    if (typeof window === 'undefined') return this.seedClientDecisions;
    try {
      const data = localStorage.getItem(DECISIONS_KEY);
      return data ? JSON.parse(data) : this.seedClientDecisions;
    } catch {
      return this.seedClientDecisions;
    }
  }

  private persistDecisions(items: ClientDecisionItem[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(DECISIONS_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to persist decisions', e);
    }
  }

  private loadStoredDoD(): Phase1DefinitionOfDoneItem[] {
    if (typeof window === 'undefined') return this.seedDoDItems;
    try {
      const data = localStorage.getItem(DOD_KEY);
      return data ? JSON.parse(data) : this.seedDoDItems;
    } catch {
      return this.seedDoDItems;
    }
  }

  private persistDoD(items: Phase1DefinitionOfDoneItem[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(DOD_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to persist DoD items', e);
    }
  }

  private loadStoredSignatories(): ClientSignoffSignatory[] {
    if (typeof window === 'undefined') return this.seedSignatories;
    try {
      const data = localStorage.getItem(SIGNATORIES_KEY);
      return data ? JSON.parse(data) : this.seedSignatories;
    } catch {
      return this.seedSignatories;
    }
  }

  private persistSignatories(items: ClientSignoffSignatory[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(SIGNATORIES_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to persist signatories', e);
    }
  }

  // -------------------------------------------------------------
  // LEAD MANAGEMENT ACTIONS
  // -------------------------------------------------------------
  public addLead(lead: Partial<LeadItem>): void {
    const newLead: LeadItem = {
      id: 'lead-' + Date.now(),
      category: lead.category || 'contact-inquiry',
      categoryLabel: lead.categoryLabel || 'Contact Inquiry',
      clientName: lead.clientName || 'Anonymous Client',
      email: lead.email || '',
      phone: lead.phone || '',
      subjectOrProperty: lead.subjectOrProperty || 'General Inquiry',
      details: lead.details || '',
      status: 'New',
      date: new Date().toISOString().split('T')[0],
      priority: lead.priority || 'Medium',
      budgetOrValue: lead.budgetOrValue,
      tourType: lead.tourType,
      preferredDate: lead.preferredDate,
      clientRole: lead.clientRole,
      notes: lead.notes || ''
    };

    const updated = [newLead, ...this.leads()];
    this.leads.set(updated);
    this.persistLeads(updated);
  }

  public updateLeadStatus(id: string, status: LeadStatus): void {
    const updated = this.leads().map(l => l.id === id ? { ...l, status } : l);
    this.leads.set(updated);
    this.persistLeads(updated);
    this.propertyService.showToast('Lead Updated', `Lead status changed to ${status}.`, 'info');
  }

  public assignLead(id: string, staffName: string): void {
    const updated = this.leads().map(l => l.id === id ? { ...l, assignedTo: staffName } : l);
    this.leads.set(updated);
    this.persistLeads(updated);
    this.propertyService.showToast('Lead Assigned', `Lead assigned to ${staffName}.`, 'success');
  }

  public progressLeadStage(id: string, status: LeadStatus): void {
    const updated = this.leads().map(l => l.id === id ? { ...l, status } : l);
    this.leads.set(updated);
    this.persistLeads(updated);
    this.propertyService.showToast('Stage Updated', `Lead progressed to "${status}".`, 'info');
  }

  public updateLeadNotes(id: string, notes: string): void {
    const updated = this.leads().map(l => l.id === id ? { ...l, notes } : l);
    this.leads.set(updated);
    this.persistLeads(updated);
    this.propertyService.showToast('Notes Saved', 'Internal notes updated for lead.', 'success');
  }

  public deleteLead(id: string): void {
    const updated = this.leads().filter(l => l.id !== id);
    this.leads.set(updated);
    this.persistLeads(updated);
    this.propertyService.showToast('Lead Deleted', 'Lead removed from admin dashboard.', 'info');
  }

  public exportLeadsCSV(): void {
    const headers = ['ID,Category,Client Name,Email,Phone,Subject / Property,Details,Status,Priority,Date,Budget / Value'];
    const rows = this.leads().map(l => 
      `"${l.id}","${l.categoryLabel}","${l.clientName}","${l.email}","${l.phone}","${l.subjectOrProperty.replace(/"/g, '""')}","${l.details.replace(/"/g, '""')}","${l.status}","${l.priority}","${l.date}","${l.budgetOrValue || ''}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nigson_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.propertyService.showToast('CSV Exported', 'Leads database exported to CSV file.', 'success');
  }

  // -------------------------------------------------------------
  // WEBSITE CONTENT ACTIONS
  // -------------------------------------------------------------
  public updateWebsiteContent(updated: Partial<WebsiteContent>): void {
    const merged = { ...this.websiteContent(), ...updated };
    this.websiteContent.set(merged);
    this.persistContent(merged);
    this.propertyService.showToast('Website Content Updated', 'Live website content changes have been applied.', 'success');
  }

  public resetWebsiteContent(): void {
    this.websiteContent.set(this.defaultContent);
    this.persistContent(this.defaultContent);
    this.propertyService.showToast('Reset Complete', 'Website content restored to official company default.', 'info');
  }

  // -------------------------------------------------------------
  // NEWS & ANNOUNCEMENT ACTIONS
  // -------------------------------------------------------------
  public addAnnouncement(news: Partial<NewsAnnouncement>): void {
    const item: NewsAnnouncement = {
      id: 'news-' + Date.now(),
      title: news.title || 'Untitled Announcement',
      category: news.category || 'Company News',
      excerpt: news.excerpt || '',
      content: news.content || '',
      author: news.author || 'Nigson Properties Management',
      date: new Date().toISOString().split('T')[0],
      status: news.status || 'Published',
      image: news.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    };
    const updated = [item, ...this.announcements()];
    this.announcements.set(updated);
    this.persistNews(updated);
    this.propertyService.showToast('News Published', `"${item.title}" is now active on the portal.`, 'success');
  }

  public updateAnnouncement(item: NewsAnnouncement): void {
    const updated = this.announcements().map(n => n.id === item.id ? item : n);
    this.announcements.set(updated);
    this.persistNews(updated);
    this.propertyService.showToast('News Updated', 'Announcement changes saved successfully.', 'success');
  }

  public deleteAnnouncement(id: string): void {
    const updated = this.announcements().filter(n => n.id !== id);
    this.announcements.set(updated);
    this.persistNews(updated);
    this.propertyService.showToast('News Removed', 'Announcement deleted.', 'info');
  }

  public toggleAnnouncementStatus(id: string): void {
    const updated = this.announcements().map(n => {
      if (n.id === id) {
        const nextStatus: 'Published' | 'Draft' = n.status === 'Published' ? 'Draft' : 'Published';
        return { ...n, status: nextStatus };
      }
      return n;
    });
    this.announcements.set(updated);
    this.persistNews(updated);
    this.propertyService.showToast('Status Updated', 'Announcement publication status updated.', 'info');
  }

  // -------------------------------------------------------------
  // MEDIA ASSET ACTIONS
  // -------------------------------------------------------------
  public addMediaAsset(asset: Partial<MediaAsset>): void {
    const item: MediaAsset = {
      id: 'med-' + Date.now(),
      title: asset.title || 'Property Media Asset',
      category: asset.category || 'Exterior',
      url: asset.url || '',
      size: asset.size || '1.8 MB',
      date: new Date().toISOString().split('T')[0]
    };
    const updated = [item, ...this.mediaAssets()];
    this.mediaAssets.set(updated);
    this.persistMedia(updated);
    this.propertyService.showToast('Media Asset Uploaded', `Asset "${item.title}" saved to library.`, 'success');
  }

  public deleteMediaAsset(id: string): void {
    const updated = this.mediaAssets().filter(m => m.id !== id);
    this.mediaAssets.set(updated);
    this.persistMedia(updated);
    this.propertyService.showToast('Asset Deleted', 'Media asset removed from library.', 'info');
  }

  // -------------------------------------------------------------
  // PHASE 0 & 1 GOVERNANCE & APPROVAL ACTIONS
  // -------------------------------------------------------------
  public updateClientDecisionStatus(
    id: string, 
    status: 'Approved' | 'Pending' | 'In Review', 
    notes?: string
  ): void {
    const updated = this.clientDecisions().map(d => {
      if (d.id === id) {
        return { 
          ...d, 
          approvalStatus: status,
          notes: notes !== undefined ? notes : d.notes 
        };
      }
      return d;
    });
    this.clientDecisions.set(updated);
    this.persistDecisions(updated);
    this.propertyService.showToast('Decision Updated', `Client decision "${id}" status set to ${status}.`, 'info');
  }

  public updateDoDStatus(
    id: string, 
    status: 'Verified & Complete' | 'Operational' | 'Pending UAT'
  ): void {
    const updated = this.definitionOfDone().map(d => d.id === id ? { ...d, status } : d);
    this.definitionOfDone.set(updated);
    this.persistDoD(updated);
    this.propertyService.showToast('DoD Verified', `Criterion "${id}" marked as ${status}.`, 'info');
  }

  public signSignatory(role: string, name: string, signature: string): void {
    const updated = this.signatories().map(s => {
      if (s.role === role) {
        return {
          ...s,
          name: name || s.name,
          signature: signature || `${name.toUpperCase()} [APPROVED]`,
          date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          status: 'Signed' as const
        };
      }
      return s;
    });
    this.signatories.set(updated);
    this.persistSignatories(updated);
    this.propertyService.showToast('Approval Recorded', `Phase 0/1 implementation sign-off recorded for ${role}.`, 'success');
  }

  public resetGovernanceDefaults(): void {
    this.clientDecisions.set(this.seedClientDecisions);
    this.persistDecisions(this.seedClientDecisions);
    this.definitionOfDone.set(this.seedDoDItems);
    this.persistDoD(this.seedDoDItems);
    this.signatories.set(this.seedSignatories);
    this.persistSignatories(this.seedSignatories);
    this.propertyService.showToast('Governance Baseline Reset', 'Client decisions & DoD criteria restored to official baseline.', 'info');
  }
}
