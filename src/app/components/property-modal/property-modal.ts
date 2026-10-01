import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../services/property.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-property-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-modal.html',
  styleUrl: './property-modal.css'
})
export class PropertyModalComponent {
  public propertyService = inject(PropertyService);
  public authService = inject(AuthService);
  public activeImageIndex = signal<number>(0);
  public Object = Object;

  public setActiveImage(index: number): void {
    this.activeImageIndex.set(index);
  }

  public closeModal(): void {
    this.propertyService.closePropertyDetails();
    this.activeImageIndex.set(0);
  }

  public openInspection(): void {
    const prop = this.propertyService.activeProperty();
    if (prop) {
      this.propertyService.openInspectionModal(prop.title);
    }
  }

  public chatOnWhatsApp(): void {
    const prop = this.propertyService.activeProperty();
    if (prop) {
      const msg = `Hello Nigson Properties, I am viewing "${prop.title}" on your website. I would like more information and to schedule an inspection.`;
      window.open(this.propertyService.getWhatsAppLink(msg), '_blank');
    }
  }

  public downloadBrochure(): void {
    const prop = this.propertyService.activeProperty();
    if (prop) {
      this.propertyService.showToast(
        'Brochure Download Initiated',
        `The official property specification document for ${prop.title} has been compiled and is ready for download.`,
        'info'
      );
    }
  }

  public toggleSave(): void {
    const prop = this.propertyService.activeProperty();
    if (prop) {
      this.authService.toggleSaveProperty(prop.id);
    }
  }
}
