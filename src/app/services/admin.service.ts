import { Injectable, signal, computed, inject } from '@angular/core';
import { PropertyService } from './property.service';
import { 
  LeadItem, 
  LeadCategory, 
  LeadStatus, 
  WebsiteContent, 
  NewsAnnouncement, 
  MediaAsset 
} from '../models/admin.model';
import { Property, PropertyStatus, Amenity, Testimonial, GalleryItem, ServiceItem } from '../models/property.model';

const LEADS_KEY = 'nigson_admin_leads_data';
const CONTENT_KEY = 'nigson_admin_content_data';
const NEWS_KEY = 'nigson_admin_news_data';
const MEDIA_KEY = 'nigson_admin_media_data';

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
      id: 'lead-003',
      category: 'sales-lead',
      categoryLabel: 'Sales Lead',
      clientName: 'London Diaspora Property Syndicate (Lead: Amaka Cole)',
      email: 'syndicate@colecapital.co.uk',
      phone: '+44 7700 900123',
      subjectOrProperty: 'Bulk Off-Plan Acquisition Package',
      details: 'Seeking to allocate ₦650,000,000 into high-yield Lekki rental duplexes with guaranteed facility management.',
      status: 'Qualified',
      date: '2026-09-28',
      priority: 'High',
      budgetOrValue: '₦650,000,000',
      notes: 'Virtual Zoom presentation completed. Drafting Deed of Agreement.'
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
  // 2. WEBSITE CONTENT STATE
  // -------------------------------------------------------------
  private readonly defaultContent: WebsiteContent = {
    // 1. Hero Section
    heroBadge: 'NIGSON PROPERTIES LIMITED • A NIGSON GROUP COMPANY',
    heroHeading: 'Delivering Affordable Luxury Homes & Premier Real Estate in Lagos',
    heroSubheading: 'Building Trust. Creating Value. Delivering Exceptional Real Estate Solutions. From bespoke family duplexes in Lekki to luxury waterfront residences in Ikoyi and managed properties in Banana Island.',
    heroCtaExplore: 'Explore Properties',
    heroCtaInspection: 'Schedule Inspection',
    heroCtaWhatsapp: 'WhatsApp Concierge',

    // 2. Trust Stats Metrics Strip
    stat1Value: '₦50B+',
    stat1Label: 'Developed Portfolio',
    stat2Value: '120+',
    stat2Label: 'Luxury Units Delivered',
    stat3Value: '100%',
    stat3Label: 'C of O & Gov\'s Consent',
    stat4Value: '98%',
    stat4Label: 'Client Satisfaction',

    // 3. Signature Showcase Section
    showcaseBadge: 'Featured Highlights & Signature Portfolio',
    showcaseHeading: 'Discover Our Premier Luxury Residences',
    showcaseSubtitle: 'Hand-crafted architectural masterworks across Lekki Phase 1, Ologolo, and Ikoyi. Each home guarantees 100% verified Governor\'s Consent, 24/7 clean solar power, and bespoke contemporary finishes.',

    // 4. Core Services Section
    servicesBadge: 'Integrated Real Estate Solutions',
    servicesHeading: 'Our 6 Core Real Estate Services',
    servicesSubtitle: 'From visionary concept, architectural design, and turnkey construction to asset management, facility operations, and property sales.',

    // 5. Why Choose Us Section
    whyChooseBadge: 'The Nigson Advantage',
    whyChooseHeading: 'Why Choose Nigson Properties?',
    whyChooseSubtitle: 'Setting the benchmark for affordable luxury in Nigeria through institutional backing, engineering rigor, and unyielding client dedication.',

    // 6. Testimonials Section
    testimonialsBadge: 'Client Experiences & Reputation',
    testimonialsHeading: 'Trusted by Homeowners, Investors & Residents',
    testimonialsSubtitle: 'Hear directly from families living in our estates, overseas diaspora investors, corporate residential tenants, and property landlords.',

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

  // Quick statistics computed signal for admin overview
  public stats = computed(() => {
    const props = this.propertyService.properties();
    const lds = this.leads();
    
    return {
      totalProperties: props.length,
      availableCount: props.filter(p => p.status.includes('Available')).length,
      soldCount: props.filter(p => p.status.includes('Sold')).length,
      ongoingCount: props.filter(p => p.status.includes('Ongoing')).length,
      totalLeads: lds.length,
      newLeadsCount: lds.filter(l => l.status === 'New').length,
      totalValuePortfolio: '₦45.8B',
      inspectionsPending: lds.filter(l => l.category === 'inspection-request' && l.status !== 'Closed').length
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
        const filtered = parsed.filter(l => (l.category as string) !== 'property-inquiry');
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
}
