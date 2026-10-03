export type LeadCategory = 
  | 'inspection-request' 
  | 'sales-lead' 
  | 'contact-inquiry' 
  | 'booking-details' 
  | 'property-management';

export type LeadStatus = 'New' | 'In Progress' | 'Contacted' | 'Qualified' | 'Closed';

export interface LeadItem {
  id: string;
  category: LeadCategory;
  categoryLabel: string;
  clientName: string;
  email: string;
  phone: string;
  subjectOrProperty: string;
  details: string;
  status: LeadStatus;
  date: string;
  priority: 'High' | 'Medium' | 'Standard';
  budgetOrValue?: string;
  tourType?: string;
  preferredDate?: string;
  clientRole?: string;
  notes?: string;
}

export interface WebsiteContent {
  // 1. Hero Section
  heroBadge: string;
  heroHeading: string;
  heroSubheading: string;
  heroCtaExplore: string;
  heroCtaInspection: string;
  heroCtaWhatsapp: string;

  // 2. Trust Stats Metrics Strip
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  stat4Value: string;
  stat4Label: string;

  // 3. Signature Showcase Section
  showcaseBadge: string;
  showcaseHeading: string;
  showcaseSubtitle: string;

  // 4. Core Services Section
  servicesBadge: string;
  servicesHeading: string;
  servicesSubtitle: string;

  // 5. Why Choose Us Section
  whyChooseBadge: string;
  whyChooseHeading: string;
  whyChooseSubtitle: string;

  // 6. Testimonials Section
  testimonialsBadge: string;
  testimonialsHeading: string;
  testimonialsSubtitle: string;

  // 7. Corporate Contact & Topbar Information
  companyPhone: string;
  companyPhone2: string;
  companyEmail: string;
  companyAddress: string;
  officeHours: string;
  whatsappNumber: string;

  // 8. Announcement Banner
  announcementActive: boolean;
  announcementText: string;
  announcementLink: string;
}

export interface NewsAnnouncement {
  id: string;
  title: string;
  category: 'Market Insights' | 'Project Milestones' | 'Company News' | 'Press Release';
  excerpt: string;
  content: string;
  author: string;
  date: string;
  status: 'Published' | 'Draft';
  image?: string;
}

export interface MediaAsset {
  id: string;
  title: string;
  category: 'Exterior' | 'Interiors' | 'Aerial' | 'Amenities' | 'Documents';
  url: string;
  size?: string;
  date: string;
}
