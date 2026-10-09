import { 
  Component, 
  inject, 
  signal, 
  computed, 
  ElementRef, 
  ViewChild, 
  AfterViewInit, 
  OnDestroy, 
  PLATFORM_ID, 
  NgZone, 
  HostListener 
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PropertyService } from '../../services/property.service';
import { AdminService } from '../../services/admin.service';
import { ServiceItem } from '../../models/property.model';

export interface CircularServiceItem extends ServiceItem {
  uniqueKey: string;
  setIndex: number;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class ServicesComponent implements AfterViewInit, OnDestroy {
  public propertyService = inject(PropertyService);
  public adminService = inject(AdminService);
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);

  @ViewChild('carouselTrack', { static: false }) carouselTrack?: ElementRef<HTMLDivElement>;

  public isPaused = signal<boolean>(false);
  public hoveredUniqueKey = signal<string | null>(null);
  public activeServiceIndex = signal<number>(0);
  public isDragging = false;

  private startX = 0;
  private startScrollLeft = 0;
  private animationFrameId?: number;
  private resumeTimeout?: ReturnType<typeof setTimeout>;
  private isDestroyed = false;
  private isBrowser = false;

  // Generate 3 identical sets for continuous, seamless circular scrolling
  public circularServices = computed<CircularServiceItem[]>(() => {
    const services = this.propertyService.services();
    if (!services || services.length === 0) return [];

    return [
      ...services.map(s => ({ ...s, uniqueKey: `set0-${s.id}`, setIndex: 0 })),
      ...services.map(s => ({ ...s, uniqueKey: `set1-${s.id}`, setIndex: 1 })),
      ...services.map(s => ({ ...s, uniqueKey: `set2-${s.id}`, setIndex: 2 }))
    ];
  });

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser || !this.carouselTrack?.nativeElement) return;

    // Start in the middle set (set1) for immediate 2-way seamless scroll
    setTimeout(() => {
      this.initCarouselPosition();
      this.startContinuousScroll();
    }, 150);
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.resumeTimeout) {
      clearTimeout(this.resumeTimeout);
    }
  }

  private initCarouselPosition(): void {
    const el = this.carouselTrack?.nativeElement;
    if (!el) return;

    const singleSetWidth = el.scrollWidth / 3;
    if (singleSetWidth > 0) {
      el.scrollLeft = singleSetWidth;
    }
  }

  private startContinuousScroll(): void {
    const scrollStep = () => {
      if (this.isDestroyed) return;

      const el = this.carouselTrack?.nativeElement;
      if (el && !this.isPaused() && !this.propertyService.isServiceModalOpen() && !this.isDragging) {
        el.scrollLeft += 0.85; // Smooth, stately continuous circular glide
        this.checkCircularBounds(el);
        this.updateActiveIndex(el);
      }

      this.animationFrameId = requestAnimationFrame(scrollStep);
    };

    this.ngZone.runOutsideAngular(() => {
      this.animationFrameId = requestAnimationFrame(scrollStep);
    });
  }

  private checkCircularBounds(el: HTMLDivElement): void {
    const singleSetWidth = el.scrollWidth / 3;
    if (singleSetWidth <= 0) return;

    // When passing Set 2, seamlessly wrap back to Set 1 without any visual jump
    if (el.scrollLeft >= 2 * singleSetWidth) {
      el.scrollLeft -= singleSetWidth;
    }
    // When scrolling backwards past Set 1, seamlessly wrap forward to Set 2
    else if (el.scrollLeft <= singleSetWidth * 0.05) {
      el.scrollLeft += singleSetWidth;
    }
  }

  private updateActiveIndex(el: HTMLDivElement): void {
    const singleSetWidth = el.scrollWidth / 3;
    if (singleSetWidth <= 0) return;

    const cardWidth = singleSetWidth / 6;
    const relativeOffset = el.scrollLeft % singleSetWidth;
    const newIdx = Math.floor((relativeOffset + cardWidth * 0.4) / cardWidth) % 6;

    if (newIdx !== this.activeServiceIndex() && newIdx >= 0 && newIdx < 6) {
      this.ngZone.run(() => {
        this.activeServiceIndex.set(newIdx);
      });
    }
  }

  public scrollNext(): void {
    const el = this.carouselTrack?.nativeElement;
    if (!el) return;

    this.pauseTemporarily(2200);
    const singleSetWidth = el.scrollWidth / 3;
    const cardWidth = singleSetWidth / 6;

    this.checkCircularBounds(el);
    el.scrollBy({ left: cardWidth, behavior: 'smooth' });
  }

  public scrollPrev(): void {
    const el = this.carouselTrack?.nativeElement;
    if (!el) return;

    this.pauseTemporarily(2200);
    const singleSetWidth = el.scrollWidth / 3;
    const cardWidth = singleSetWidth / 6;

    if (el.scrollLeft < singleSetWidth + 10) {
      el.scrollLeft += singleSetWidth;
    }
    el.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  }

  public scrollToIndex(idx: number): void {
    const el = this.carouselTrack?.nativeElement;
    if (!el) return;

    this.pauseTemporarily(3000);
    const singleSetWidth = el.scrollWidth / 3;
    const cardWidth = singleSetWidth / 6;

    el.scrollTo({
      left: singleSetWidth + idx * cardWidth,
      behavior: 'smooth'
    });
    this.activeServiceIndex.set(idx);
  }

  public onCardMouseEnter(uniqueKey: string): void {
    this.hoveredUniqueKey.set(uniqueKey);
    this.isPaused.set(true);
  }

  public onCardMouseLeave(): void {
    this.hoveredUniqueKey.set(null);
    this.resumeAfterDelay(400);
  }

  public onCarouselMouseEnter(): void {
    this.isPaused.set(true);
  }

  public onCarouselMouseLeave(): void {
    if (!this.hoveredUniqueKey()) {
      this.resumeAfterDelay(400);
    }
  }

  private pauseTemporarily(durationMs: number = 2000): void {
    this.isPaused.set(true);
    this.resumeAfterDelay(durationMs);
  }

  private resumeAfterDelay(delayMs: number): void {
    if (this.resumeTimeout) {
      clearTimeout(this.resumeTimeout);
    }
    this.resumeTimeout = setTimeout(() => {
      if (!this.hoveredUniqueKey() && !this.isDragging && !this.propertyService.isServiceModalOpen()) {
        this.isPaused.set(false);
      }
    }, delayMs);
  }

  // Mouse drag interactions
  public onMouseDown(e: MouseEvent): void {
    const el = this.carouselTrack?.nativeElement;
    if (!el) return;

    this.isDragging = true;
    this.startX = e.pageX - el.offsetLeft;
    this.startScrollLeft = el.scrollLeft;
    this.isPaused.set(true);
  }

  public onMouseMove(e: MouseEvent): void {
    if (!this.isDragging) return;
    const el = this.carouselTrack?.nativeElement;
    if (!el) return;

    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - this.startX) * 1.5;
    el.scrollLeft = this.startScrollLeft - walk;
    this.checkCircularBounds(el);
  }

  public onMouseUp(): void {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.resumeAfterDelay(800);
  }

  // Touch swipe interactions
  public onTouchStart(e: TouchEvent): void {
    const el = this.carouselTrack?.nativeElement;
    if (!el || e.touches.length === 0) return;

    this.isDragging = true;
    this.startX = e.touches[0].pageX - el.offsetLeft;
    this.startScrollLeft = el.scrollLeft;
    this.isPaused.set(true);
  }

  public onTouchMove(e: TouchEvent): void {
    if (!this.isDragging || e.touches.length === 0) return;
    const el = this.carouselTrack?.nativeElement;
    if (!el) return;

    const x = e.touches[0].pageX - el.offsetLeft;
    const walk = (x - this.startX) * 1.2;
    el.scrollLeft = this.startScrollLeft - walk;
    this.checkCircularBounds(el);
  }

  public onTouchEnd(): void {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.resumeAfterDelay(800);
  }

  // Open Service Modal Dialog on "Explore Scope" button click
  public openServiceDetails(service: ServiceItem, event?: Event): void {
    if (event) event.stopPropagation();
    this.isPaused.set(true);
    this.propertyService.openServiceModal(service);
  }

  public closeServiceModal(): void {
    this.propertyService.closeServiceModal();
    this.resumeAfterDelay(600);
  }

  @HostListener('window:keydown.escape')
  public onEscapeKey(): void {
    if (this.propertyService.isServiceModalOpen()) {
      this.closeServiceModal();
    }
  }

  public onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80';
    }
  }

  public requestConsultation(service: ServiceItem, event?: Event): void {
    if (event) event.stopPropagation();
    const msg = `Hello Nigson Properties, I would like to request a consultation regarding your service: "${service.title}". Please connect me with a representative.`;
    window.open(this.propertyService.getWhatsAppLink(msg), '_blank');
  }
}
