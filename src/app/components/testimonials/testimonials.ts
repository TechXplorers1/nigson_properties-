import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../services/property.service';
import { AdminService } from '../../services/admin.service';
import { Testimonial } from '../../models/property.model';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css'
})
export class TestimonialsComponent {
  public propertyService = inject(PropertyService);
  public adminService = inject(AdminService);

  public isPaused = signal<boolean>(false);

  // Compute items list ensuring enough cards to fill even wide viewports
  public marqueeItems = computed<Testimonial[]>(() => {
    const list = this.propertyService.testimonials();
    if (!list || list.length === 0) return [];

    let items = [...list];
    // Ensure at least 6 cards per track for seamless loop across large viewports
    while (items.length < 6) {
      items = [...items, ...list];
    }
    return items;
  });

  // Calculate speed: steady ~6.5 seconds per card, minimum 30s
  public animationDuration = computed<number>(() => {
    const count = this.marqueeItems().length;
    return Math.max(30, count * 6.5);
  });

  public pauseMarquee(): void {
    this.isPaused.set(true);
  }

  public resumeMarquee(): void {
    this.isPaused.set(false);
  }

  public togglePause(): void {
    this.isPaused.update(val => !val);
  }

  public openValuationModal(): void {
    this.propertyService.openInspectionModal('Property Valuation & Strategic Advisory Request');
  }

  public openWhatsApp(): void {
    const link = this.propertyService.getWhatsAppLink('Hello Nigson Properties, I would like to request a property valuation and speak with an investment advisor.');
    window.open(link, '_blank');
  }
}
