import { Component, OnInit, OnDestroy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { AdminService } from '../../services/admin.service';
import { Property } from '../../models/property.model';

export interface ProjectSlide {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  units: string;
  status: string;
  categoryBadge: string;
  statusBadge: string;
  image: string;
  link: string;
}

export interface ShortStaySlide {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  price: string;
  rating: string;
  categoryBadge: string;
  statusBadge: string;
  image: string;
  link: string;
}

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './showcase.html',
  styleUrl: './showcase.css'
})
export class ShowcaseComponent implements OnInit, OnDestroy {
  public propertyService = inject(PropertyService);
  public adminService = inject(AdminService);

  // 1. Featured Landmark Project Developments Data
  public readonly projectSlides: ProjectSlide[] = [
    {
      id: 'proj-1',
      title: 'White Oaks Residential Master Community',
      subtitle: '14-Home Gated Residential Master Enclave',
      location: 'Aro-Ologolo & Lekki Corridor',
      units: '14 Units Handed Over',
      status: '100% Sold Out',
      categoryBadge: 'Master Community',
      statusBadge: '100% Sold-Out Track Record',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
      link: '/projects'
    },
    {
      id: 'proj-2',
      title: 'Fatai Bankole Multi-Unit Enclave',
      subtitle: 'Contemporary Multi-Family Architectural Masterpiece',
      location: 'Aro-Ologolo, Lekki Phase 1 Axis',
      units: '7 Luxury Duplexes Handed Over',
      status: 'Completed & Delivered',
      categoryBadge: 'Building Construction',
      statusBadge: 'Delivered On Schedule',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      link: '/projects'
    },
    {
      id: 'proj-3',
      title: 'Whitesand Coastal Master Development',
      subtitle: '18-Unit Waterfront Enclave & Coastal Civil Engineering',
      location: 'Lekki Beach Road Corridor, Ologolo',
      units: '18 Waterfront Master Units',
      status: 'Active Construction',
      categoryBadge: 'Marine & Civil Engineering',
      statusBadge: 'Delivery Q4 2026',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
      link: '/projects'
    },
    {
      id: 'proj-4',
      title: 'Olufemi Olatunji Gated Community',
      subtitle: '2,100 sqm Footprint Gated Enclave & Infrastructure',
      location: 'Osapa London, Lekki',
      units: '9 Prime Units Handed Over',
      status: 'Delivered & Commissioned',
      categoryBadge: 'Urban Development',
      statusBadge: 'PMP Certified Execution',
      image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80',
      link: '/projects'
    },
    {
      id: 'proj-5',
      title: 'Ikoyi Lagoon Crest Commercial Towers',
      subtitle: 'Smart Mixed-Use Commercial High-Rise & Infrastructure',
      location: 'Osborne Foreshore, Ikoyi, Lagos',
      units: '24 Executive Tower Units',
      status: 'Active Engineering',
      categoryBadge: 'Commercial High-Rise',
      statusBadge: 'Target Q2 2027',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      link: '/projects'
    }
  ];

  // 2. Curated Bespoke Luxury Short Stay Residences Data
  public readonly shortStaySlides: ShortStaySlide[] = [
    {
      id: 'stay-1',
      title: 'The Grand Horizon Penthouse & Suites',
      subtitle: 'Lagoon & Ikoyi Link Bridge Panoramic Skyline',
      location: 'Admiralty Way, Lekki Phase 1',
      price: 'From ₦180,000 / Night',
      rating: '4.98★ (52 Reviews)',
      categoryBadge: 'Executive Short Stay',
      statusBadge: 'Instant Booking Available',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      link: '/short-stay'
    },
    {
      id: 'stay-2',
      title: 'Diplomatic Presidential Haven',
      subtitle: 'Private Biometric Lift, Olympic Lap Pool & Concierge',
      location: 'Alexander Avenue, Ikoyi, Lagos',
      price: 'From ₦320,000 / Night',
      rating: '4.99★ (38 Reviews)',
      categoryBadge: 'Diplomatic Luxury',
      statusBadge: '24/7 Armed Security',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      link: '/short-stay'
    },
    {
      id: 'stay-3',
      title: 'Banana Island Royal Water Villa',
      subtitle: 'Private Marina Boat Jetty & Suspended Infinity Pool',
      location: 'Ocean Drive, Banana Island, Ikoyi',
      price: 'From ₦450,000 / Night',
      rating: '5.0★ (29 Reviews)',
      categoryBadge: 'Ultra-Luxury Villa',
      statusBadge: 'Yacht Access & Chauffeur',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      link: '/short-stay'
    },
    {
      id: 'stay-4',
      title: 'Whitesand Coastal Luxury Retreat',
      subtitle: 'Private Cinema, BBQ Gazebo & Stroll to Lekki Beach',
      location: 'Opposite Whitesand Beach, Lekki',
      price: 'From ₦150,000 / Night',
      rating: '4.95★ (47 Reviews)',
      categoryBadge: 'Beachside Villa',
      statusBadge: '100% Solar Guaranteed',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      link: '/short-stay'
    },
    {
      id: 'stay-5',
      title: 'Eko Pearl Marina Serviced Apartment',
      subtitle: 'Floor-to-Ceiling Atlantic Ocean & Marina Panoramas',
      location: 'Eko Atlantic City, Victoria Island',
      price: 'From ₦220,000 / Night',
      rating: '4.97★ (43 Reviews)',
      categoryBadge: 'High-Rise Luxury',
      statusBadge: 'Executive Concierge 24/7',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      link: '/short-stay'
    }
  ];

  // Active slide indices & hover states for automatic scrolling
  public activeProjectIndex = signal<number>(0);
  public activeShortStayIndex = signal<number>(0);
  public isProjectsHovered = signal<boolean>(false);
  public isShortStayHovered = signal<boolean>(false);

  // Computed active items
  public activeProject = computed(() => this.projectSlides[this.activeProjectIndex()]);
  public activeShortStay = computed(() => this.shortStaySlides[this.activeShortStayIndex()]);

  private autoScrollInterval: any = null;

  public ngOnInit(): void {
    this.startAutoScroll();
  }

  public ngOnDestroy(): void {
    this.stopAutoScroll();
  }

  private startAutoScroll(): void {
    if (typeof window !== 'undefined') {
      this.autoScrollInterval = setInterval(() => {
        // Auto-advance Projects slide if not hovered
        if (!this.isProjectsHovered()) {
          this.activeProjectIndex.update(idx => (idx + 1) % this.projectSlides.length);
        }
        // Auto-advance Short Stay slide if not hovered
        if (!this.isShortStayHovered()) {
          this.activeShortStayIndex.update(idx => (idx + 1) % this.shortStaySlides.length);
        }
      }, 3800);
    }
  }

  private stopAutoScroll(): void {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }
  }

  // --- Projects Carousel Controls ---
  public selectProject(index: number, event?: Event): void {
    if (event) event.stopPropagation();
    this.activeProjectIndex.set(index);
  }

  public prevProject(event?: Event): void {
    if (event) event.stopPropagation();
    const total = this.projectSlides.length;
    this.activeProjectIndex.update(idx => (idx - 1 + total) % total);
  }

  public nextProject(event?: Event): void {
    if (event) event.stopPropagation();
    const total = this.projectSlides.length;
    this.activeProjectIndex.update(idx => (idx + 1) % total);
  }

  public onProjectsMouseEnter(): void {
    this.isProjectsHovered.set(true);
  }

  public onProjectsMouseLeave(): void {
    this.isProjectsHovered.set(false);
  }

  // --- Short Stay Carousel Controls ---
  public selectShortStay(index: number, event?: Event): void {
    if (event) event.stopPropagation();
    this.activeShortStayIndex.set(index);
  }

  public prevShortStay(event?: Event): void {
    if (event) event.stopPropagation();
    const total = this.shortStaySlides.length;
    this.activeShortStayIndex.update(idx => (idx - 1 + total) % total);
  }

  public nextShortStay(event?: Event): void {
    if (event) event.stopPropagation();
    const total = this.shortStaySlides.length;
    this.activeShortStayIndex.update(idx => (idx + 1) % total);
  }

  public onShortStayMouseEnter(): void {
    this.isShortStayHovered.set(true);
  }

  public onShortStayMouseLeave(): void {
    this.isShortStayHovered.set(false);
  }

  // --- Modal Helpers ---
  public openPropertyDetails(property: Property): void {
    this.propertyService.openPropertyDetails(property);
  }

  public openInspection(property?: Property): void {
    this.propertyService.openInspectionModal(property?.title);
  }

  public onImageError(event: Event, fallbackUrl?: string): void {
    const target = event.target as HTMLImageElement;
    target.src = fallbackUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
  }
}
