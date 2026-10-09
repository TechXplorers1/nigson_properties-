import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PropertyService } from '../../services/property.service';
import { AdminService } from '../../services/admin.service';
import { 
  Property, 
  PropertyType,
  AVAILABLE_PROPERTY_TYPES,
  PropertyStatus, 
  PropertyCategory, 
  PropertyPurpose, 
  Amenity, 
  Testimonial, 
  GalleryItem, 
  ServiceItem,
  ShortStayBooking,
  ShortStayProperty,
  ProjectSummary
} from '../../models/property.model';
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
} from '../../models/admin.model';
import { ShortStayService } from '../../services/short-stay.service';

export type AdminTab = 'overview' | 'properties' | 'projects' | 'bookings' | 'leads';
export type ContentSubTab = 'website' | 'media' | 'testimonials' | 'services' | 'news' | 'gallery';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent implements OnInit {
  public authService = inject(AuthService);
  public propertyService = inject(PropertyService);
  public adminService = inject(AdminService);
  public shortStayService = inject(ShortStayService);
  private router = inject(Router);

  // Active Navigation Tabs
  public activeTab = signal<AdminTab>('properties');
  public activeContentSubTab = signal<ContentSubTab>('website');

  // Property Filters & Search
  public propSearch = signal<string>('');
  public propStatusFilter = signal<string>('all');
  public propViewMode = signal<'table' | 'grid'>('table');

  // Project Development Matrix Filters & Modal State
  public projectSearch = signal<string>('');
  public projectStatusFilter = signal<string>('all');
  public isProjectModalOpen = signal<boolean>(false);
  public isEditProjectMode = signal<boolean>(false);
  public editingProjectOriginalName = signal<string>('');
  public projName = signal<string>('');
  public projLocation = signal<string>('');
  public projUnits = signal<number | null>(6);
  public projStatus = signal<string>('Completed & Sold Out');
  public projCategory = signal<string>('Building Construction');
  public projImage = signal<string>('');
  public projCompletionYear = signal<string>('Delivered');

  public availableProjectStatuses = [
    'Completed & Sold Out',
    'Available for Sale',
    'Ongoing Development',
    'Sold Out'
  ];

  public availableProjectCategories = [
    'Building Construction',
    'Property Management'
  ];

  public presetProjectImages = [
    { label: 'Beachfront Modern', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
    { label: 'Luxury Villa', url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80' },
    { label: 'Estate Development', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80' },
    { label: 'Exclusive Court', url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80' },
    { label: 'Waterfront Terraces', url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80' }
  ];

  // Short-Stay Bookings Filters & State (Phase 1 Operations)
  public bookingSearch = signal<string>('');
  public bookingStatusFilter = signal<string>('all');
  public selectedBookingForModal = signal<ShortStayBooking | null>(null);
  public isBookingDetailsModalOpen = signal<boolean>(false);

  // Short-Stay Residence Creation Modal State
  public isShortStayModalOpen = signal<boolean>(false);
  public stayTitle = signal<string>('');
  public stayLocation = signal<string>('');
  public stayArea = signal<'Lekki Phase 1' | 'Ikoyi' | 'Victoria Island' | 'Banana Island' | 'Ologolo, Lekki'>('Lekki Phase 1');
  public stayType = signal<'Luxury Penthouse' | 'Waterfront Villa' | 'Executive Suite' | 'Serviced Apartment' | 'Beachfront Maisonette'>('Luxury Penthouse');
  public stayPricePerNight = signal<number | null>(null);
  public stayBedrooms = signal<number | null>(3);
  public stayBathrooms = signal<number | null>(3);
  public stayMaxGuests = signal<number | null>(6);
  public stayHeroImage = signal<string>('');
  public stayDescription = signal<string>('');
  public stayCleaningFee = signal<number | null>(25000);
  public staySecurityDeposit = signal<number | null>(50000);
  public stayInstantBook = signal<boolean>(true);
  public selectedStayAmenities = signal<string[]>([
    '24/7 Solar & Inverter',
    'Starlink High-Speed WiFi',
    '24/7 Gated Security & CCTV',
    'Fully Equipped Chef Kitchen'
  ]);

  public availableStayAreas: Array<'Lekki Phase 1' | 'Ikoyi' | 'Victoria Island' | 'Banana Island' | 'Ologolo, Lekki'> = [
    'Lekki Phase 1',
    'Ikoyi',
    'Victoria Island',
    'Banana Island',
    'Ologolo, Lekki'
  ];

  public availableStayTypes: Array<'Luxury Penthouse' | 'Waterfront Villa' | 'Executive Suite' | 'Serviced Apartment' | 'Beachfront Maisonette'> = [
    'Luxury Penthouse',
    'Waterfront Villa',
    'Executive Suite',
    'Serviced Apartment',
    'Beachfront Maisonette'
  ];

  public availableStayAmenitiesList = [
    { icon: 'ri-sun-cloudy-line', label: '24/7 Solar & Inverter' },
    { icon: 'ri-wifi-line', label: 'Starlink High-Speed WiFi' },
    { icon: 'ri-drop-line', label: 'Private Rooftop Plunge Pool' },
    { icon: 'ri-tv-line', label: '85" 4K Smart Cinema TV' },
    { icon: 'ri-shield-check-line', label: '24/7 Gated Security & CCTV' },
    { icon: 'ri-restaurant-line', label: 'Fully Equipped Chef Kitchen' },
    { icon: 'ri-car-line', label: '2 Covered Reserved Parking' },
    { icon: 'ri-sparkling-line', label: 'Daily Executive Housekeeping' },
    { icon: 'ri-building-line', label: 'Private Elevator Access' },
    { icon: 'ri-cup-line', label: 'Complimentary Nespresso Bar' },
    { icon: 'ri-football-line', label: 'Private Wellness Gym' }
  ];

  public presetStayImages = [
    { label: 'Waterfront Penthouse', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Presidential Suite', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Lagoon Villa', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Urban Diplomatic Apartment', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80' }
  ];

  // Lead Filters & Search
  public leadCategoryFilter = signal<string>('all');
  public leadStatusFilter = signal<string>('all');
  public leadSearch = signal<string>('');

  // -------------------------------------------------------------
  // PROPERTY MODAL STATE (ADD / EDIT)
  // -------------------------------------------------------------
  public isPropertyModalOpen = signal<boolean>(false);
  public isEditMode = signal<boolean>(false);
  public editingPropertyId = signal<string>('');

  // Property Form Fields
  public propTitle = signal<string>('');
  public propSlug = signal<string>('');
  public propLocation = signal<string>('');
  public propNeighborhood = signal<string>('');
  public propCategory = signal<PropertyCategory>('sales');
  public propStatus = signal<PropertyStatus>('Available for Sale');
  public propPurpose = signal<PropertyPurpose>('sale');
  public propPrice = signal<string>('');
  public propNumericPrice = signal<number | null>(null);
  public propPriceSubtext = signal<string>('');
  public propUnits = signal<number | null>(null);
  public readonly availablePropertyTypes = AVAILABLE_PROPERTY_TYPES;
  public propType = signal<PropertyType>('Duplex');
  public propBedrooms = signal<number | null>(null);
  public propBathrooms = signal<number | null>(null);
  public propSize = signal<string>('');
  public propFeatured = signal<boolean>(false);
  public propHeroImage = signal<string>('');
  public propVideoUrl = signal<string>('');
  public propDescription = signal<string>('');
  public propFeaturesText = signal<string>('');
  public propHighlightsText = signal<string>('');
  public propGalleryInput = signal<string>('');
  public selectedAmenities = signal<string[]>([]);

  // Preset Luxury Real Estate Image Presets
  public readonly presetImages = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
  ];

  // Available Amenities Catalog
  public readonly allAvailableAmenities: { id: string; label: string; icon: string }[] = [
    { id: '24/7 Solar & Inverter', label: '24/7 Solar & Inverter', icon: 'ri-flashlight-line' },
    { id: 'Cinema Room', label: 'Cinema Room', icon: 'ri-film-line' },
    { id: '4-Car Parking', label: '4-Car Parking', icon: 'ri-car-line' },
    { id: 'Access Control', label: 'Access Control', icon: 'ri-shield-check-line' },
    { id: 'Treated Water', label: 'Treated Water', icon: 'ri-drop-line' },
    { id: 'Private BQ', label: 'Private BQ', icon: 'ri-home-4-line' },
    { id: 'Swimming Pool', label: 'Swimming Pool', icon: 'ri-contrast-drop-2-line' },
    { id: 'Smart Home Automation', label: 'Smart Home Automation', icon: 'ri-cpu-line' },
    { id: 'Fully Fitted Kitchen', label: 'Fully Fitted Kitchen', icon: 'ri-restaurant-line' },
    { id: 'CCTV Perimeter Surveillance', label: 'CCTV Perimeter Surveillance', icon: 'ri-camera-lens-line' }
  ];

  // -------------------------------------------------------------
  // TESTIMONIAL MODAL STATE
  // -------------------------------------------------------------
  public isTestimonialModalOpen = signal<boolean>(false);
  public testClientName = signal<string>('');
  public testRole = signal<string>('Diaspora Property Investor');
  public testProperty = signal<string>('Opposite Whitesand Beach Estate');
  public testQuote = signal<string>('');
  public testRating = signal<number>(5);
  public testType = signal<'Homeowner' | 'Diaspora Investor' | 'Tenant' | 'Property Landlord'>('Diaspora Investor');

  // -------------------------------------------------------------
  // GALLERY MODAL STATE
  // -------------------------------------------------------------
  public isGalleryModalOpen = signal<boolean>(false);
  public galTitle = signal<string>('');
  public galCategory = signal<'All' | 'Exterior' | 'Interiors' | 'Living' | 'Kitchen' | 'Amenities'>('Exterior');
  public galImage = signal<string>('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');
  public galDescription = signal<string>('');

  // -------------------------------------------------------------
  // NEWS MODAL STATE
  // -------------------------------------------------------------
  public isNewsModalOpen = signal<boolean>(false);
  public newsTitle = signal<string>('');
  public newsCategory = signal<'Market Insights' | 'Project Milestones' | 'Company News' | 'Press Release'>('Project Milestones');
  public newsExcerpt = signal<string>('');
  public newsContent = signal<string>('');
  public newsAuthor = signal<string>('Nigson Properties Communications');
  public newsStatus = signal<'Published' | 'Draft'>('Published');

  // -------------------------------------------------------------
  // SERVICE EDIT MODAL STATE
  // -------------------------------------------------------------
  public isServiceModalOpen = signal<boolean>(false);
  public editingService = signal<ServiceItem | null>(null);
  public serviceTitle = signal<string>('');
  public serviceTagline = signal<string>('');
  public serviceShortDesc = signal<string>('');
  public serviceFullDesc = signal<string>('');

  // -------------------------------------------------------------
  // MEDIA UPLOAD STATE
  // -------------------------------------------------------------
  public newMediaTitle = signal<string>('');
  public newMediaCategory = signal<'Exterior' | 'Interiors' | 'Aerial' | 'Amenities' | 'Documents'>('Exterior');
  public newMediaUrl = signal<string>('');

  // -------------------------------------------------------------
  // WEBSITE CONTENT FORM (BOUND TO AdminService.websiteContent)
  // -------------------------------------------------------------
  // CONTENT MANAGEMENT FORM SIGNALS (EXACT HOME PAGE CONTENT)
  // -------------------------------------------------------------
  // Hero Section
  public contentHeroBadge = signal<string>('');
  public contentHeroHeading = signal<string>('');
  public contentHeroSubheading = signal<string>('');
  public contentHeroCtaExplore = signal<string>('');
  public contentHeroCtaInspection = signal<string>('');
  public contentHeroCtaWhatsapp = signal<string>('');

  // Trust Stats
  public contentStat1Value = signal<string>('');
  public contentStat1Label = signal<string>('');
  public contentStat2Value = signal<string>('');
  public contentStat2Label = signal<string>('');
  public contentStat3Value = signal<string>('');
  public contentStat3Label = signal<string>('');
  public contentStat4Value = signal<string>('');
  public contentStat4Label = signal<string>('');

  // Showcase Section
  public contentShowcaseBadge = signal<string>('');
  public contentShowcaseHeading = signal<string>('');
  public contentShowcaseSubtitle = signal<string>('');

  // Services Section
  public contentServicesBadge = signal<string>('');
  public contentServicesHeading = signal<string>('');
  public contentServicesSubtitle = signal<string>('');

  // Why Choose Us Section
  public contentWhyChooseBadge = signal<string>('');
  public contentWhyChooseHeading = signal<string>('');
  public contentWhyChooseSubtitle = signal<string>('');

  // Testimonials Section
  public contentTestimonialsBadge = signal<string>('');
  public contentTestimonialsHeading = signal<string>('');
  public contentTestimonialsSubtitle = signal<string>('');

  // Corporate Contact
  public contentPhone = signal<string>('');
  public contentPhone2 = signal<string>('');
  public contentEmail = signal<string>('');
  public contentAddress = signal<string>('');
  public contentOfficeHours = signal<string>('');
  public contentWhatsapp = signal<string>('');

  // Live Announcement
  public contentAnnouncementActive = signal<boolean>(true);
  public contentAnnouncementText = signal<string>('');
  public contentAnnouncementLink = signal<string>('');

  // Filtered Properties Computed Signal
  public filteredProperties = computed(() => {
    let list = this.propertyService.properties();
    const query = this.propSearch().toLowerCase().trim();
    const status = this.propStatusFilter();

    if (status !== 'all') {
      list = list.filter(p => p.status === status);
    }

    if (query) {
      list = list.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.propertyType.toLowerCase().includes(query)
      );
    }

    return list;
  });

  // Filtered Leads Computed Signal
  public filteredLeads = computed(() => {
    let list = this.adminService.leads();
    const cat = this.leadCategoryFilter();
    const status = this.leadStatusFilter();
    const query = this.leadSearch().toLowerCase().trim();

    if (cat !== 'all') {
      list = list.filter(l => l.category === cat);
    }

    if (status !== 'all') {
      list = list.filter(l => l.status === status);
    }

    if (query) {
      list = list.filter(l => 
        l.clientName.toLowerCase().includes(query) ||
        l.email.toLowerCase().includes(query) ||
        l.phone.includes(query) ||
        l.subjectOrProperty.toLowerCase().includes(query)
      );
    }

    return list;
  });

  // Lead Counts by Category
  public leadCounts = computed(() => {
    const list = this.adminService.leads();
    return {
      all: list.length,
      inspectionRequest: list.filter(l => l.category === 'inspection-request').length,
      contactInquiry: list.filter(l => l.category === 'contact-inquiry').length,
      bookingDetails: list.filter(l => l.category === 'booking-details').length,
      propertyManagement: list.filter(l => l.category === 'property-management').length
    };
  });

  // Filtered Short-Stay Bookings (Phase 1 MVP Operations)
  public filteredBookings = computed(() => {
    let list = this.shortStayService.bookings();
    const query = this.bookingSearch().toLowerCase().trim();
    const status = this.bookingStatusFilter();

    if (status !== 'all') {
      list = list.filter(b => b.status === status);
    }

    if (query) {
      list = list.filter(b => 
        b.id.toLowerCase().includes(query) ||
        b.clientName.toLowerCase().includes(query) ||
        b.propertyTitle.toLowerCase().includes(query) ||
        b.email.toLowerCase().includes(query) ||
        b.phone.includes(query)
      );
    }
    return list;
  });

  public bookingCounts = computed(() => {
    const list = this.shortStayService.bookings();
    return {
      all: list.length,
      confirmed: list.filter(b => b.status === 'Confirmed').length,
      pending: list.filter(b => b.status === 'Pending Payment').length,
      checkedIn: list.filter(b => b.status === 'Checked-In').length,
      completed: list.filter(b => b.status === 'Completed').length,
      cancelled: list.filter(b => b.status === 'Cancelled').length,
      totalRevenue: list.filter(b => b.status === 'Confirmed' || b.status === 'Checked-In' || b.status === 'Completed')
        .reduce((sum, b) => sum + (b.totalAmount || 0), 0)
    };
  });

  // Filtered Project Summaries (Project Development Matrix)
  public filteredProjectSummaries = computed(() => {
    let list = this.propertyService.projectSummaries();
    const query = this.projectSearch().toLowerCase().trim();
    const status = this.projectStatusFilter();

    if (query) {
      list = list.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.location.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    if (status !== 'all') {
      list = list.filter(p => p.status.toLowerCase() === status.toLowerCase());
    }

    return list;
  });

  public adminLoginEmail = signal<string>('admin@nigson.com');
  public adminLoginPassword = signal<string>('admin123');

  ngOnInit(): void {
    if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
      this.initWebsiteContentForm();
    }
  }

  public quickLoginAsAdmin(): void {
    this.authService.quickDemoLogin('admin');
    this.initWebsiteContentForm();
  }

  public submitAdminLogin(): void {
    const res = this.authService.login({
      email: this.adminLoginEmail(),
      password: this.adminLoginPassword()
    });
    if (res.success) {
      this.initWebsiteContentForm();
    }
  }

  private initWebsiteContentForm(): void {
    const c = this.adminService.websiteContent();
    // 1. Hero
    this.contentHeroBadge.set(c.heroBadge || 'NIGSON PROPERTIES LIMITED • A NIGSON GROUP COMPANY');
    this.contentHeroHeading.set(c.heroHeading || 'Delivering Affordable Luxury Homes & Premier Real Estate in Lagos');
    this.contentHeroSubheading.set(c.heroSubheading || 'Building Trust. Creating Value. Delivering Exceptional Real Estate Solutions. From bespoke family duplexes in Lekki to luxury waterfront residences in Ikoyi and managed properties in Banana Island.');
    this.contentHeroCtaExplore.set(c.heroCtaExplore || 'Explore Properties');
    this.contentHeroCtaInspection.set(c.heroCtaInspection || 'Schedule Inspection');
    this.contentHeroCtaWhatsapp.set(c.heroCtaWhatsapp || 'WhatsApp Concierge');

    // 2. Trust Stats
    this.contentStat1Value.set(c.stat1Value || '₦50B+');
    this.contentStat1Label.set(c.stat1Label || 'Developed Portfolio');
    this.contentStat2Value.set(c.stat2Value || '120+');
    this.contentStat2Label.set(c.stat2Label || 'Luxury Units Delivered');
    this.contentStat3Value.set(c.stat3Value || '100%');
    this.contentStat3Label.set(c.stat3Label || 'C of O & Gov\'s Consent');
    this.contentStat4Value.set(c.stat4Value || '98%');
    this.contentStat4Label.set(c.stat4Label || 'Client Satisfaction');

    // 3. Showcase Section
    this.contentShowcaseBadge.set(c.showcaseBadge || 'Featured Highlights & Signature Portfolio');
    this.contentShowcaseHeading.set(c.showcaseHeading || 'Discover Our Premier Luxury Residences');
    this.contentShowcaseSubtitle.set(c.showcaseSubtitle || 'Hand-crafted architectural masterworks across Lekki Phase 1, Ologolo, and Ikoyi. Each home guarantees 100% verified Governor\'s Consent, 24/7 clean solar power, and bespoke contemporary finishes.');

    // 4. Services Section
    this.contentServicesBadge.set(c.servicesBadge || 'Integrated Real Estate Solutions');
    this.contentServicesHeading.set(c.servicesHeading || 'Our 6 Core Real Estate Services');
    this.contentServicesSubtitle.set(c.servicesSubtitle || 'From visionary concept, architectural design, and turnkey construction to asset management, facility operations, and property sales.');

    // 5. Why Choose Us Section
    this.contentWhyChooseBadge.set(c.whyChooseBadge || 'The Nigson Advantage');
    this.contentWhyChooseHeading.set(c.whyChooseHeading || 'Why Choose Nigson Properties?');
    this.contentWhyChooseSubtitle.set(c.whyChooseSubtitle || 'Setting the benchmark for affordable luxury in Nigeria through institutional backing, engineering rigor, and unyielding client dedication.');

    // 6. Testimonials Section
    this.contentTestimonialsBadge.set(c.testimonialsBadge || 'Client Experiences & Reputation');
    this.contentTestimonialsHeading.set(c.testimonialsHeading || 'Trusted by Homeowners, Investors & Residents');
    this.contentTestimonialsSubtitle.set(c.testimonialsSubtitle || 'Hear directly from families living in our estates, overseas diaspora investors, corporate residential tenants, and property landlords.');

    // 7. Corporate Contact
    this.contentPhone.set(c.companyPhone || '08073467809');
    this.contentPhone2.set(c.companyPhone2 || '09134446722');
    this.contentEmail.set(c.companyEmail || 'Hello@Nigson.com');
    this.contentAddress.set(c.companyAddress || 'Plot 30B, Block 110, Oladimeji Alo St, Lekki Phase 1, Lagos');
    this.contentOfficeHours.set(c.officeHours || 'Mon – Fri: 9:00 AM – 5:00 PM');
    this.contentWhatsapp.set(c.whatsappNumber || '08073467809');

    // 8. Live Announcement
    this.contentAnnouncementActive.set(c.announcementActive !== false);
    this.contentAnnouncementText.set(c.announcementText || 'Exclusive Off-Plan Release: 3 remaining units at Whitesand Beach Estate Ologolo now open for private client allocation.');
    this.contentAnnouncementLink.set(c.announcementLink || '/properties');
  }

  public isSidebarOpen = signal<boolean>(typeof window !== 'undefined' ? window.innerWidth > 1024 : true);

  public setTab(tab: AdminTab): void {
    this.activeTab.set(tab);
  }

  public selectTab(tab: AdminTab): void {
    this.setTab(tab);
    if (typeof window !== 'undefined' && window.innerWidth <= 1024) {
      this.closeSidebar();
    }
  }

  public toggleSidebar(): void {
    this.isSidebarOpen.update(v => !v);
  }

  public closeSidebar(): void {
    this.isSidebarOpen.set(false);
  }

  public openSidebar(): void {
    this.isSidebarOpen.set(true);
  }

  public setContentSubTab(sub: ContentSubTab): void {
    this.activeContentSubTab.set(sub);
  }

  // -------------------------------------------------------------
  // PROPERTY ACTIONS
  // -------------------------------------------------------------
  public openAddPropertyModal(): void {
    this.isEditMode.set(false);
    this.editingPropertyId.set('');
    this.propTitle.set('');
    this.propSlug.set('');
    this.propLocation.set('');
    this.propNeighborhood.set('');
    this.propCategory.set('sales');
    this.propStatus.set('Available for Sale');
    this.propPurpose.set('sale');
    this.propPrice.set('');
    this.propNumericPrice.set(null);
    this.propPriceSubtext.set('');
    this.propUnits.set(null);
    this.propType.set('Duplex');
    this.propBedrooms.set(null);
    this.propBathrooms.set(null);
    this.propSize.set('');
    this.propFeatured.set(false);
    this.propHeroImage.set('');
    this.propVideoUrl.set('');
    this.propDescription.set('');
    this.propFeaturesText.set('');
    this.propHighlightsText.set('');
    this.propGalleryInput.set('');
    this.selectedAmenities.set([]);
    this.isPropertyModalOpen.set(true);
  }

  public openEditPropertyModal(p: Property): void {
    this.isEditMode.set(true);
    this.editingPropertyId.set(p.id);
    this.propTitle.set(p.title);
    this.propSlug.set(p.slug);
    this.propLocation.set(p.location);
    this.propNeighborhood.set(p.neighborhoodArea);
    this.propCategory.set(p.category);
    this.propStatus.set(p.status);
    this.propPurpose.set(p.purpose);
    this.propPrice.set(p.price);
    this.propNumericPrice.set(p.numericPrice);
    this.propPriceSubtext.set(p.priceSubtext || '');
    this.propUnits.set(p.units);
    this.propType.set(p.propertyType);
    this.propBedrooms.set(p.bedrooms);
    this.propBathrooms.set(p.bathrooms);
    this.propSize.set(p.size);
    this.propFeatured.set(p.featured);
    this.propHeroImage.set(p.heroImage);
    this.propVideoUrl.set(p.videoUrl || '');
    this.propDescription.set(p.description);
    this.propFeaturesText.set(p.features ? p.features.join('\n') : '');
    this.propHighlightsText.set(p.neighborhoodHighlights ? p.neighborhoodHighlights.join('\n') : '');
    this.propGalleryInput.set(p.gallery ? p.gallery.join(', ') : '');
    this.selectedAmenities.set(p.amenities ? p.amenities.map(a => a.label) : []);
    this.isPropertyModalOpen.set(true);
  }

  public closePropertyModal(): void {
    this.isPropertyModalOpen.set(false);
  }

  public toggleAmenity(label: string): void {
    const current = this.selectedAmenities();
    if (current.includes(label)) {
      this.selectedAmenities.set(current.filter(a => a !== label));
    } else {
      this.selectedAmenities.set([...current, label]);
    }
  }

  public isAmenitySelected(label: string): boolean {
    return this.selectedAmenities().includes(label);
  }

  public selectPresetHeroImage(url: string): void {
    this.propHeroImage.set(url);
  }

  // Real local file upload simulation (FileReader converts to base64 Data URL)
  public onHeroImageFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.propHeroImage.set(e.target.result as string);
          this.propertyService.showToast('Image Loaded', `"${file.name}" loaded into property media.`, 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  }

  public saveProperty(): void {
    if (!this.propTitle().trim() || !this.propPrice().trim()) {
      this.propertyService.showToast('Required Fields Missing', 'Please enter property title and price.', 'error');
      return;
    }

    const amenitiesList: Amenity[] = this.selectedAmenities().map(label => {
      const found = this.allAvailableAmenities.find(a => a.label === label);
      return {
        label: label,
        icon: found ? found.icon : 'ri-checkbox-circle-line'
      };
    });

    const featuresList = this.propFeaturesText()
      .split('\n')
      .map(s => s.trim())
      .filter(s => !!s);

    const highlightsList = this.propHighlightsText()
      .split('\n')
      .map(s => s.trim())
      .filter(s => !!s);

    const galleryList = this.propGalleryInput()
      .split(',')
      .map(s => s.trim())
      .filter(s => !!s);

    const slug = this.propSlug().trim() || this.propTitle().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const id = this.isEditMode() ? this.editingPropertyId() : slug + '-' + Date.now().toString().slice(-4);

    const categoryLabels: Record<PropertyCategory, string> = {
      construction: 'Building Construction',
      management: 'Property Management',
      sales: 'Property Sales & Acquisitions'
    };

    const propData: Property = {
      id: id,
      title: this.propTitle().trim(),
      slug: slug,
      location: this.propLocation().trim(),
      neighborhoodArea: this.propNeighborhood().trim(),
      category: this.propCategory(),
      categoryLabel: categoryLabels[this.propCategory()],
      status: this.propStatus(),
      purpose: this.propPurpose(),
      price: this.propPrice().trim(),
      numericPrice: Number(this.propNumericPrice()) || 0,
      priceSubtext: this.propPriceSubtext().trim(),
      units: Number(this.propUnits()) || 1,
      propertyType: this.propType(),
      bedrooms: Number(this.propBedrooms()) || 1,
      bathrooms: Number(this.propBathrooms()) || 1,
      size: this.propSize().trim(),
      featured: this.propFeatured(),
      heroImage: this.propHeroImage().trim() || this.presetImages[0],
      gallery: galleryList.length ? galleryList : [this.propHeroImage().trim() || this.presetImages[0]],
      videoUrl: this.propVideoUrl().trim(),
      description: this.propDescription().trim() || `Prestigious ${this.propType()} located in prime ${this.propLocation()}. Crafted with high architectural standards and luxury finishes by Nigson Properties.`,
      features: featuresList.length ? featuresList : ['High-End Sanitary Wares', '24/7 Power', 'Fitted Kitchen', 'Secure Perimeter'],
      amenities: amenitiesList,
      neighborhoodHighlights: highlightsList,
      specifications: {
        'Structure': 'Reinforced concrete frame with premium imported tiling',
        'Power': 'Dual 24/7 clean power supply & inverter integration',
        'Title': "Governor's Consent / Certificate of Occupancy"
      }
    };

    if (this.isEditMode()) {
      this.propertyService.updateProperty(propData);
    } else {
      this.propertyService.addProperty(propData);
    }

    this.closePropertyModal();
  }

  public deleteProperty(id: string, title: string): void {
    if (confirm(`Are you sure you want to permanently delete "${title}" from the active portfolio?`)) {
      this.propertyService.deleteProperty(id);
    }
  }

  public markAsSold(id: string): void {
    this.propertyService.markPropertyAsSold(id);
  }

  public markAsAvailable(id: string): void {
    this.propertyService.markPropertyAsAvailable(id);
  }

  public changePropertyStatus(id: string, status: PropertyStatus): void {
    this.propertyService.changePropertyStatus(id, status);
  }

  // -------------------------------------------------------------
  // LEAD ACTIONS
  // -------------------------------------------------------------
  public updateLeadStatus(id: string, status: LeadStatus): void {
    this.adminService.updateLeadStatus(id, status);
  }

  public editLeadNotes(lead: LeadItem): void {
    const notes = prompt(`Add internal notes for ${lead.clientName}:`, lead.notes || '');
    if (notes !== null) {
      this.adminService.updateLeadNotes(lead.id, notes);
    }
  }

  public deleteLead(id: string, name: string): void {
    if (confirm(`Delete lead entry for ${name}?`)) {
      this.adminService.deleteLead(id);
    }
  }

  public callLead(phone: string): void {
    window.open(`tel:${phone.replace(/\s+/g, '')}`, '_self');
  }

  public chatLeadWhatsApp(lead: LeadItem): void {
    const msg = `Hello ${lead.clientName}, this is Engr. Nnamdi from Nigson Properties following up on your ${lead.categoryLabel} regarding ${lead.subjectOrProperty}.`;
    const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  public emailLead(email: string, subject: string): void {
    window.open(`mailto:${email}?subject=${encodeURIComponent('Nigson Properties Follow-up: ' + subject)}`, '_blank');
  }

  public assignLeadToStaff(id: string, staff: string): void {
    this.adminService.assignLead(id, staff);
  }

  public progressLeadStage(id: string, stage: LeadStatus): void {
    this.adminService.progressLeadStage(id, stage);
  }

  public exportLeadsCSV(): void {
    this.adminService.exportLeadsCSV();
  }

  // -------------------------------------------------------------
  // SHORT-STAY BOOKING ACTIONS (Phase 1 Operations)
  // -------------------------------------------------------------
  public openBookingDetails(booking: ShortStayBooking): void {
    this.selectedBookingForModal.set(booking);
    this.isBookingDetailsModalOpen.set(true);
  }

  public closeBookingDetails(): void {
    this.isBookingDetailsModalOpen.set(false);
    this.selectedBookingForModal.set(null);
  }

  public updateBookingStatus(id: string, status: ShortStayBooking['status']): void {
    this.shortStayService.updateBookingStatus(id, status);
  }

  public cancelBooking(id: string): void {
    const reason = prompt('Please enter cancellation reason:', 'Client schedule change / reservation cancellation');
    if (reason !== null) {
      this.shortStayService.cancelBooking(id, reason);
      if (this.selectedBookingForModal()?.id === id) {
        this.closeBookingDetails();
      }
    }
  }

  public toggleStayAvailability(id: string): void {
    this.shortStayService.togglePropertyAvailability(id);
  }

  public printBookingReceipt(): void {
    window.print();
  }

  // -------------------------------------------------------------
  // SHORT-STAY INVENTORY ACTIONS (ADD / DELETE)
  // -------------------------------------------------------------
  public openAddShortStayModal(): void {
    this.stayTitle.set('');
    this.stayLocation.set('');
    this.stayArea.set('Lekki Phase 1');
    this.stayType.set('Luxury Penthouse');
    this.stayPricePerNight.set(null);
    this.stayBedrooms.set(3);
    this.stayBathrooms.set(3);
    this.stayMaxGuests.set(6);
    this.stayHeroImage.set('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80');
    this.stayDescription.set('');
    this.stayCleaningFee.set(25000);
    this.staySecurityDeposit.set(50000);
    this.stayInstantBook.set(true);
    this.selectedStayAmenities.set([
      '24/7 Solar & Inverter',
      'Starlink High-Speed WiFi',
      '24/7 Gated Security & CCTV',
      'Fully Equipped Chef Kitchen'
    ]);
    this.isShortStayModalOpen.set(true);
  }

  public closeShortStayModal(): void {
    this.isShortStayModalOpen.set(false);
  }

  public toggleStayAmenity(label: string): void {
    const current = this.selectedStayAmenities();
    if (current.includes(label)) {
      this.selectedStayAmenities.set(current.filter(l => l !== label));
    } else {
      this.selectedStayAmenities.set([...current, label]);
    }
  }

  public isStayAmenitySelected(label: string): boolean {
    return this.selectedStayAmenities().includes(label);
  }

  public selectPresetStayHeroImage(url: string): void {
    this.stayHeroImage.set(url);
  }

  public onStayHeroImageFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.stayHeroImage.set(e.target.result as string);
          this.propertyService.showToast('Image Loaded', `"${file.name}" selected as hero image.`, 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  }

  public saveShortStay(): void {
    if (!this.stayTitle().trim()) {
      this.propertyService.showToast('Title Required', 'Please enter a title for the short stay residence.', 'error');
      return;
    }
    if (!this.stayPricePerNight() || this.stayPricePerNight()! <= 0) {
      this.propertyService.showToast('Price Required', 'Please enter a valid nightly rate in Naira (₦).', 'error');
      return;
    }

    const amenities: Amenity[] = this.selectedStayAmenities().map(label => {
      const found = this.availableStayAmenitiesList.find(a => a.label === label);
      return {
        label,
        icon: found ? found.icon : 'ri-checkbox-circle-line'
      };
    });

    const hero = this.stayHeroImage().trim() || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80';

    this.shortStayService.addShortStay({
      title: this.stayTitle().trim(),
      slug: this.stayTitle().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      location: this.stayLocation().trim() || `${this.stayArea()}, Lagos`,
      area: this.stayArea(),
      propertyType: this.stayType(),
      pricePerNight: this.stayPricePerNight()!,
      weeklyDiscountPercent: 12,
      monthlyDiscountPercent: 25,
      bedrooms: this.stayBedrooms() || 2,
      bathrooms: this.stayBathrooms() || 2,
      maxGuests: this.stayMaxGuests() || 4,
      rating: 5.0,
      reviewCount: 1,
      isInstantBook: this.stayInstantBook(),
      isSuperhost: true,
      heroImage: hero,
      gallery: [hero],
      description: this.stayDescription().trim() || `Experience modern executive luxury in ${this.stayArea()} with 24/7 solar backup power, high-speed Starlink internet, and 24/7 security.`,
      amenities: amenities.length ? amenities : [
        { icon: 'ri-sun-cloudy-line', label: '24/7 Solar & Inverter' },
        { icon: 'ri-wifi-line', label: 'Starlink High-Speed WiFi' }
      ],
      houseRules: [
        'Check-in: 2:00 PM – 10:00 PM',
        'Check-out: 11:00 AM',
        'No smoking indoors (balconies permitted)',
        'Valid Government ID required at check-in'
      ],
      checkInTime: '2:00 PM',
      checkOutTime: '11:00 AM',
      cleaningFee: this.stayCleaningFee() || 25000,
      securityDeposit: this.staySecurityDeposit() || 50000,
      available: true
    });

    this.closeShortStayModal();
  }

  public deleteShortStay(id: string, title: string): void {
    if (confirm(`Are you sure you want to remove "${title}" from active short-stay inventory?`)) {
      this.shortStayService.deleteShortStay(id);
    }
  }

  // -------------------------------------------------------------
  // PROJECT DEVELOPMENT MATRIX ACTIONS (ADD / EDIT / DELETE)
  // -------------------------------------------------------------
  public openAddProjectModal(): void {
    this.isEditProjectMode.set(false);
    this.editingProjectOriginalName.set('');
    this.projName.set('');
    this.projLocation.set('');
    this.projUnits.set(6);
    this.projStatus.set('Completed & Sold Out');
    this.projCategory.set('Building Construction');
    this.projImage.set('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80');
    this.projCompletionYear.set('Delivered & Handed Over');
    this.isProjectModalOpen.set(true);
  }

  public openEditProjectModal(p: ProjectSummary): void {
    this.isEditProjectMode.set(true);
    this.editingProjectOriginalName.set(p.name);
    this.projName.set(p.name);
    this.projLocation.set(p.location);
    this.projUnits.set(p.units);
    this.projStatus.set(p.status);
    this.projCategory.set(p.category);
    this.projImage.set(p.image);
    this.projCompletionYear.set(p.completionYear);
    this.isProjectModalOpen.set(true);
  }

  public closeProjectModal(): void {
    this.isProjectModalOpen.set(false);
  }

  public selectPresetProjectImage(url: string): void {
    this.projImage.set(url);
  }

  public onProjectImageFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.projImage.set(e.target.result as string);
          this.propertyService.showToast('Image Loaded', `"${file.name}" loaded for project photo.`, 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  }

  public saveProject(): void {
    if (!this.projName().trim()) {
      this.propertyService.showToast('Project Name Required', 'Please enter a name for the development project.', 'error');
      return;
    }
    if (!this.projLocation().trim()) {
      this.propertyService.showToast('Location Required', 'Please enter project location.', 'error');
      return;
    }

    const projectData: ProjectSummary = {
      name: this.projName().trim(),
      location: this.projLocation().trim(),
      units: Number(this.projUnits()) || 1,
      status: this.projStatus().trim(),
      category: this.projCategory().trim(),
      image: this.projImage().trim() || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      completionYear: this.projCompletionYear().trim() || 'Delivered'
    };

    if (this.isEditProjectMode()) {
      this.propertyService.updateProject(this.editingProjectOriginalName(), projectData);
    } else {
      this.propertyService.addProject(projectData);
    }

    this.closeProjectModal();
  }

  public deleteProject(name: string): void {
    if (confirm(`Are you sure you want to remove "${name}" from the Project Development Matrix?`)) {
      this.propertyService.deleteProject(name);
    }
  }

  // -------------------------------------------------------------
  // PHASE 0 & 1 GOVERNANCE & APPROVAL ACTIONS
  // -------------------------------------------------------------
  public toggleClientDecision(id: string, currentStatus: string): void {
    const nextStatus = currentStatus === 'Approved' ? 'In Review' : 'Approved';
    this.adminService.updateClientDecisionStatus(id, nextStatus as any);
  }

  public editDecisionNotes(decision: ClientDecisionItem): void {
    const notes = prompt(`Update client notes for "${decision.decision}":`, decision.notes || '');
    if (notes !== null) {
      this.adminService.updateClientDecisionStatus(decision.id, decision.approvalStatus, notes);
    }
  }

  public toggleDoDCriterion(id: string, currentStatus: string): void {
    const nextStatus = currentStatus === 'Verified & Complete' ? 'Operational' : 'Verified & Complete';
    this.adminService.updateDoDStatus(id, nextStatus as any);
  }

  public signClientApprovalModal(role: string, name: string): void {
    const signature = prompt(`Sign implementation approval for ${name} (${role}):`, `${name.toUpperCase()} [APPROVED]`);
    if (signature) {
      this.adminService.signSignatory(role, name, signature);
    }
  }

  public resetGovernanceDefaults(): void {
    if (confirm('Reset client decisions and Definition of Done to official Phase 0 approved baseline?')) {
      this.adminService.resetGovernanceDefaults();
    }
  }

  // -------------------------------------------------------------
  // WEBSITE CONTENT ACTIONS
  // -------------------------------------------------------------
  public saveWebsiteContent(): void {
    const updated: WebsiteContent = {
      heroBadge: this.contentHeroBadge().trim(),
      heroHeading: this.contentHeroHeading().trim(),
      heroSubheading: this.contentHeroSubheading().trim(),
      heroCtaExplore: this.contentHeroCtaExplore().trim(),
      heroCtaInspection: this.contentHeroCtaInspection().trim(),
      heroCtaWhatsapp: this.contentHeroCtaWhatsapp().trim(),

      stat1Value: this.contentStat1Value().trim(),
      stat1Label: this.contentStat1Label().trim(),
      stat2Value: this.contentStat2Value().trim(),
      stat2Label: this.contentStat2Label().trim(),
      stat3Value: this.contentStat3Value().trim(),
      stat3Label: this.contentStat3Label().trim(),
      stat4Value: this.contentStat4Value().trim(),
      stat4Label: this.contentStat4Label().trim(),

      showcaseBadge: this.contentShowcaseBadge().trim(),
      showcaseHeading: this.contentShowcaseHeading().trim(),
      showcaseSubtitle: this.contentShowcaseSubtitle().trim(),

      servicesBadge: this.contentServicesBadge().trim(),
      servicesHeading: this.contentServicesHeading().trim(),
      servicesSubtitle: this.contentServicesSubtitle().trim(),

      whyChooseBadge: this.contentWhyChooseBadge().trim(),
      whyChooseHeading: this.contentWhyChooseHeading().trim(),
      whyChooseSubtitle: this.contentWhyChooseSubtitle().trim(),

      testimonialsBadge: this.contentTestimonialsBadge().trim(),
      testimonialsHeading: this.contentTestimonialsHeading().trim(),
      testimonialsSubtitle: this.contentTestimonialsSubtitle().trim(),

      companyPhone: this.contentPhone().trim(),
      companyPhone2: this.contentPhone2().trim(),
      companyEmail: this.contentEmail().trim(),
      companyAddress: this.contentAddress().trim(),
      officeHours: this.contentOfficeHours().trim(),
      whatsappNumber: this.contentWhatsapp().trim(),

      announcementActive: this.contentAnnouncementActive(),
      announcementText: this.contentAnnouncementText().trim(),
      announcementLink: this.contentAnnouncementLink().trim()
    };

    this.adminService.updateWebsiteContent(updated);
  }

  public resetWebsiteContent(): void {
    if (confirm('Are you sure you want to reset website content to company defaults?')) {
      this.adminService.resetWebsiteContent();
      this.initWebsiteContentForm();
    }
  }

  // -------------------------------------------------------------
  // MEDIA ASSET ACTIONS
  // -------------------------------------------------------------
  public addMediaAsset(): void {
    if (!this.newMediaTitle().trim() || !this.newMediaUrl().trim()) {
      this.propertyService.showToast('Validation Error', 'Please specify a title and image URL.', 'error');
      return;
    }
    this.adminService.addMediaAsset({
      title: this.newMediaTitle().trim(),
      category: this.newMediaCategory(),
      url: this.newMediaUrl().trim()
    });
    this.newMediaTitle.set('');
    this.newMediaUrl.set('');
  }

  public onMediaUploadFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.newMediaUrl.set(e.target.result as string);
          if (!this.newMediaTitle()) {
            this.newMediaTitle.set(file.name.replace(/\.[^/.]+$/, ''));
          }
          this.propertyService.showToast('File Ready', `"${file.name}" loaded for media asset upload.`, 'info');
        }
      };
      reader.readAsDataURL(file);
    }
  }

  public deleteMediaAsset(id: string): void {
    this.adminService.deleteMediaAsset(id);
  }

  // -------------------------------------------------------------
  // TESTIMONIAL ACTIONS
  // -------------------------------------------------------------
  public openAddTestimonial(): void {
    this.testClientName.set('');
    this.testRole.set('Diaspora Property Investor');
    this.testProperty.set('Opposite Whitesand Beach Estate');
    this.testQuote.set('');
    this.testRating.set(5);
    this.testType.set('Diaspora Investor');
    this.isTestimonialModalOpen.set(true);
  }

  public closeTestimonialModal(): void {
    this.isTestimonialModalOpen.set(false);
  }

  public saveTestimonial(): void {
    if (!this.testClientName().trim() || !this.testQuote().trim()) {
      this.propertyService.showToast('Required Fields', 'Please enter client name and testimonial quote.', 'error');
      return;
    }

    const t: Testimonial = {
      id: 'test-' + Date.now(),
      clientName: this.testClientName().trim(),
      role: this.testRole().trim(),
      propertyOrProject: this.testProperty().trim(),
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: Number(this.testRating()) || 5,
      quote: this.testQuote().trim(),
      clientType: this.testType()
    };

    this.propertyService.addTestimonial(t);
    this.closeTestimonialModal();
  }

  public deleteTestimonial(id: string): void {
    if (confirm('Delete this testimonial?')) {
      this.propertyService.deleteTestimonial(id);
    }
  }

  // -------------------------------------------------------------
  // GALLERY ACTIONS
  // -------------------------------------------------------------
  public openAddGallery(): void {
    this.galTitle.set('');
    this.galCategory.set('Exterior');
    this.galImage.set(this.presetImages[0]);
    this.galDescription.set('');
    this.isGalleryModalOpen.set(true);
  }

  public closeGalleryModal(): void {
    this.isGalleryModalOpen.set(false);
  }

  public saveGallery(): void {
    if (!this.galTitle().trim() || !this.galImage().trim()) {
      this.propertyService.showToast('Validation Error', 'Title and photo URL are required.', 'error');
      return;
    }

    const item: GalleryItem = {
      id: 'gal-' + Date.now(),
      title: this.galTitle().trim(),
      category: this.galCategory(),
      image: this.galImage().trim(),
      description: this.galDescription().trim() || this.galTitle().trim()
    };

    this.propertyService.addGalleryItem(item);
    this.closeGalleryModal();
  }

  public deleteGalleryItem(id: string): void {
    if (confirm('Delete this gallery photo?')) {
      this.propertyService.deleteGalleryItem(id);
    }
  }

  // -------------------------------------------------------------
  // SERVICE ACTIONS
  // -------------------------------------------------------------
  public openEditService(service: ServiceItem): void {
    this.editingService.set(service);
    this.serviceTitle.set(service.title);
    this.serviceTagline.set(service.tagline);
    this.serviceShortDesc.set(service.shortDescription);
    this.serviceFullDesc.set(service.fullDescription);
    this.isServiceModalOpen.set(true);
  }

  public closeServiceModal(): void {
    this.isServiceModalOpen.set(false);
    this.editingService.set(null);
  }

  public saveService(): void {
    const s = this.editingService();
    if (!s) return;

    const updated: ServiceItem = {
      ...s,
      title: this.serviceTitle().trim(),
      tagline: this.serviceTagline().trim(),
      shortDescription: this.serviceShortDesc().trim(),
      fullDescription: this.serviceFullDesc().trim()
    };

    this.propertyService.updateService(updated);
    this.closeServiceModal();
  }

  // -------------------------------------------------------------
  // NEWS / ANNOUNCEMENT ACTIONS
  // -------------------------------------------------------------
  public openAddNews(): void {
    this.newsTitle.set('');
    this.newsCategory.set('Project Milestones');
    this.newsExcerpt.set('');
    this.newsContent.set('');
    this.newsAuthor.set('Nigson Properties Communications');
    this.newsStatus.set('Published');
    this.isNewsModalOpen.set(true);
  }

  public closeNewsModal(): void {
    this.isNewsModalOpen.set(false);
  }

  public saveNews(): void {
    if (!this.newsTitle().trim() || !this.newsExcerpt().trim()) {
      this.propertyService.showToast('Required Fields', 'Headline and summary excerpt are required.', 'error');
      return;
    }

    this.adminService.addAnnouncement({
      title: this.newsTitle().trim(),
      category: this.newsCategory(),
      excerpt: this.newsExcerpt().trim(),
      content: this.newsContent().trim() || this.newsExcerpt().trim(),
      author: this.newsAuthor().trim(),
      status: this.newsStatus()
    });

    this.closeNewsModal();
  }

  public toggleNewsStatus(id: string): void {
    this.adminService.toggleAnnouncementStatus(id);
  }

  public deleteNews(id: string): void {
    if (confirm('Delete this announcement?')) {
      this.adminService.deleteAnnouncement(id);
    }
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
