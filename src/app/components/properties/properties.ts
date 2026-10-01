import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropertyService } from '../../services/property.service';
import { AuthService } from '../../services/auth.service';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './properties.html',
  styleUrl: './properties.css'
})
export class PropertiesComponent {
  public propertyService = inject(PropertyService);
  public authService = inject(AuthService);

  public categories = [
    { id: 'all', label: 'All Developments' },
    { id: 'sale', label: 'For Sale' },
    { id: 'lease', label: 'For Lease' },
    { id: 'completed', label: 'Completed & Sold Out' },
    { id: 'ongoing', label: 'Ongoing Projects' }
  ];

  public setCategory(cat: string): void {
    this.propertyService.setCategory(cat);
  }

  public selectTab(cat: string): void {
    this.propertyService.setCategory(cat);
  }

  public applySearch(): void {
    const el = document.getElementById('properties-results');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  public resetFilters(): void {
    this.propertyService.setCategory('all');
    this.propertyService.setLocation('all');
    this.propertyService.setBedrooms('all');
    this.propertyService.setMaxPrice(300000000);
    this.propertyService.setSearch('');
  }

  public openDetails(property: Property): void {
    this.propertyService.openPropertyDetails(property);
  }

  public openInspection(property: Property, event?: Event): void {
    if (event) event.stopPropagation();
    this.propertyService.openInspectionModal(property.title);
  }

  public openWhatsApp(property: Property, event?: Event): void {
    if (event) event.stopPropagation();
    const msg = `Hello Nigson Properties, I am interested in inquiring about "${property.title}" located at ${property.location} (Status: ${property.status}). Please provide further details.`;
    window.open(this.propertyService.getWhatsAppLink(msg), '_blank');
  }

  public getBadgeClass(status: string): string {
    if (status.includes('Sold')) return 'badge-sold';
    if (status.includes('Lease') || status.includes('Sale')) return 'badge-available';
    if (status.includes('Ongoing')) return 'badge-ongoing';
    return 'badge-gold';
  }

  public toggleFavorite(propertyId: string, event: Event): void {
    event.stopPropagation();
    this.authService.toggleSaveProperty(propertyId);
  }
}
