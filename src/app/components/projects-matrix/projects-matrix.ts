import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../services/property.service';
import { Property, ProjectSummary } from '../../models/property.model';

export interface ProjectCardItem {
  id: string;
  name: string;
  displayTitle: string;
  location: string;
  units: number;
  status: string;
  category: string;
  categoryLabel: string;
  image: string;
  completionYear: string;
  price: string;
  priceSubtext?: string;
  bedrooms?: number;
  bathrooms?: number;
  size?: string;
  description: string;
  amenities: { icon: string; label: string }[];
  property?: Property;
}

@Component({
  selector: 'app-projects-matrix',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects-matrix.html',
  styleUrl: './projects-matrix.css'
})
export class ProjectsMatrixComponent {
  public propertyService = inject(PropertyService);

  public activeFilter = signal<string>('all');
  public viewMode = signal<'cards' | 'table'>('cards');

  public filterTabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'construction', label: 'Building Construction' },
    { id: 'management', label: 'Property Management' }
  ];

  public projectsList = computed<ProjectCardItem[]>(() => {
    return this.propertyService.projectSummaries().map(proj => {
      const prop = this.propertyService.properties().find(p => 
        p.title.toLowerCase().includes(proj.name.toLowerCase()) || 
        proj.name.toLowerCase().includes(p.title.toLowerCase())
      );
      
      let categoryLabel = 'BUILDING CONSTRUCTION';
      if (proj.category.toLowerCase().includes('management')) {
        categoryLabel = 'PROPERTY MANAGEMENT';
      } else if (prop) {
        categoryLabel = prop.categoryLabel.toUpperCase();
      }

      let price = prop ? prop.price : `${proj.units} Luxury Units`;
      let priceSubtext = prop?.priceSubtext || `Delivered & Handed Over`;

      const defaultAmenities = [
        { icon: 'ri-building-line', label: `${proj.units} Delivered Units` },
        { icon: 'ri-shield-check-line', label: '100% Quality Audited' },
        { icon: 'ri-flashlight-line', label: 'Solar & Inverter' }
      ];

      return {
        id: prop ? prop.id : proj.name.toLowerCase().replace(/\s+/g, '-'),
        name: proj.name,
        displayTitle: prop ? prop.title : proj.name,
        location: prop ? prop.location : `${proj.location}, Lagos`,
        units: proj.units,
        status: proj.status,
        category: proj.category,
        categoryLabel: categoryLabel,
        image: proj.image || prop?.heroImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        completionYear: proj.completionYear,
        price: price,
        priceSubtext: priceSubtext,
        bedrooms: prop?.bedrooms,
        bathrooms: prop?.bathrooms,
        size: prop?.size,
        description: prop ? prop.description : `A landmark ${proj.category.toLowerCase()} development located in prime ${proj.location}, featuring ${proj.units} luxury units executed to European engineering standards.`,
        amenities: prop?.amenities?.length ? prop.amenities : defaultAmenities,
        property: prop
      };
    });
  });

  public filteredProjects = computed<ProjectCardItem[]>(() => {
    const filter = this.activeFilter();
    const list = this.projectsList();
    if (filter === 'all') return list;
    if (filter === 'construction') return list.filter(p => p.category.toLowerCase().includes('construction'));
    if (filter === 'management') return list.filter(p => p.category.toLowerCase().includes('management'));
    return list;
  });

  public setFilter(catId: string): void {
    this.activeFilter.set(catId);
  }

  public setViewMode(mode: 'cards' | 'table'): void {
    this.viewMode.set(mode);
  }

  public openProject(project: ProjectCardItem): void {
    if (project.property) {
      this.propertyService.openPropertyDetails(project.property);
    } else {
      this.propertyService.showToast('Project Development', `Viewing details for ${project.displayTitle}`, 'info');
    }
  }

  public openInspection(project: ProjectCardItem, event?: Event): void {
    if (event) event.stopPropagation();
    this.propertyService.openInspectionModal(project.displayTitle);
  }

  public openWhatsApp(project: ProjectCardItem, event?: Event): void {
    if (event) event.stopPropagation();
    const msg = `Hello Nigson Properties, I would like to inquire about the project: "${project.displayTitle}" (${project.location}, Status: ${project.status}). Please provide full details.`;
    window.open(this.propertyService.getWhatsAppLink(msg), '_blank');
  }

  public onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
    }
  }

  public getStatusBadgeClass(status: string): string {
    if (status.includes('Sold Out') || status.includes('Sold')) return 'badge-sold';
    if (status.includes('Available') || status.includes('Lease') || status.includes('Sale')) return 'badge-available';
    if (status.includes('Completed')) return 'badge-gold';
    return 'badge-gold';
  }
}
