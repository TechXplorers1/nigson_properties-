import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../services/property.service';
import { AdminService } from '../../services/admin.service';
import { ServiceItem } from '../../models/property.model';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class ServicesComponent {
  public propertyService = inject(PropertyService);
  public adminService = inject(AdminService);
  public hoveredServiceId = signal<string | null>(null);

  public openServiceDetails(service: ServiceItem): void {
    this.propertyService.openServiceModal(service);
  }

  public setHoveredService(serviceId: string | null): void {
    this.hoveredServiceId.set(serviceId);
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
