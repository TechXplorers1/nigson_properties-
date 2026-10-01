import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { AdminService } from '../../services/admin.service';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './showcase.html',
  styleUrl: './showcase.css'
})
export class ShowcaseComponent {
  public propertyService = inject(PropertyService);
  public adminService = inject(AdminService);

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
