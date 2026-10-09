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
      
      let categoryLabel = '';

      let price = proj.units === 1 ? 'Master Infrastructure' : `${proj.units} Master Units`;
      let priceSubtext = proj.completionYear;

      const defaultAmenities = [
        { icon: 'ri-community-line', label: `${proj.units} Master Units` },
        { icon: 'ri-shield-check-line', label: '100% Quality Audited' },
        { icon: 'ri-flashlight-line', label: 'Central Infrastructure' }
      ];

      const fullProperty = prop || this.createProjectProperty(proj, categoryLabel, price, priceSubtext);

      return {
        id: proj.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: proj.name,
        displayTitle: proj.name,
        location: proj.location.includes('Lagos') ? proj.location : `${proj.location}, Lagos`,
        units: proj.units,
        status: proj.status,
        category: proj.category,
        categoryLabel: categoryLabel,
        image: proj.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        completionYear: proj.completionYear,
        price: price,
        priceSubtext: priceSubtext,
        bedrooms: fullProperty.bedrooms,
        bathrooms: fullProperty.bathrooms,
        size: fullProperty.size,
        description: fullProperty.description,
        amenities: fullProperty.amenities?.length ? fullProperty.amenities : defaultAmenities,
        property: fullProperty
      };
    });
  });

  public createProjectProperty(
    proj: ProjectSummary, 
    categoryLabel?: string, 
    price?: string, 
    priceSubtext?: string
  ): Property {
    const isCommercial = proj.category.toLowerCase().includes('commercial');
    const isWaterfront = proj.category.toLowerCase().includes('marine') || proj.category.toLowerCase().includes('water') || proj.category.toLowerCase().includes('coastal');
    const isManagement = proj.category.toLowerCase().includes('management');

    let propType = 'Master Community';
    if (isCommercial) propType = 'Commercial High-Rise';
    else if (isWaterfront) propType = 'Waterfront Infrastructure';
    else if (proj.units === 1) propType = 'Civil Infrastructure';
    else if (proj.units <= 8) propType = 'Residential Enclave';

    const bedrooms = (isCommercial || isWaterfront || proj.units === 1) ? 0 : 4;
    const bathrooms = (isCommercial || isWaterfront || proj.units === 1) ? 0 : 5;
    const size = proj.units === 1 ? 'Master Civil Site' : `${proj.units * 350} sqm Land Area`;

    const features = [
      'Structural engineering executed to BS 8110 and Eurocode 2 structural integrity standards',
      'Engineered heavy-duty subterranean stormwater drainage integration for complete flood prevention',
      'Underground electrical reticulation backed by dedicated transformer infrastructure and solar backup',
      'Central industrial-grade water purification treatment plant with automated pressure distribution',
      'Gated perimeter security barrier with biometric gatehouse access and 24/7 CCTV surveillance coverage',
      'Internal tarred arterial access roads with solar-powered LED streetlights and pedestrian kerbs'
    ];

    if (isCommercial) {
      features.push('High-speed panoramic destination-controlled passenger elevators');
      features.push('Integrated building management system (BMS) with fiber optic backbone');
    } else if (isWaterfront) {
      features.push('Reinforced shoreline sheet-piling and coastal erosion mitigation revetment');
      features.push('Private boat slipway and floating pontoon marine access jetty');
    }

    const amenities = [
      { icon: 'ri-building-line', label: `${proj.units} Master Units` },
      { icon: 'ri-shield-star-line', label: '100% Quality Audited' },
      { icon: 'ri-flashlight-line', label: 'Dedicated Substation' },
      { icon: 'ri-drop-line', label: 'Industrial Water Plant' },
      { icon: 'ri-road-map-line', label: 'Paved Access Roads' },
      { icon: 'ri-shield-check-line', label: 'Perimeter Security' }
    ];

    const neighborhood = [
      `Strategic prime frontage along ${proj.location}`,
      'Direct arterial transit routes to Lekki-Epe Expressway and Victoria Island financial hubs',
      'Executive residential and diplomatic quarter with high capital appreciation'
    ];

    const specs: Record<string, string> = {
      'Project Scope': proj.units === 1 ? 'Master Civil Infrastructure' : `${proj.units} Master Units Enclave`,
      'Delivery Milestone': proj.completionYear,
      'Development Category': proj.category,
      'Structural Standards': 'BS 8110 / Eurocode 2 Structural Certification',
      'Principal Developer': 'Nigson Properties Limited',
      'Title / Approvals': 'Lagos State Governor’s Consent & Approved Building Scheme'
    };

    const gallery = [
      proj.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ];

    return {
      id: proj.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: proj.name,
      slug: proj.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      location: proj.location.includes('Lagos') ? proj.location : `${proj.location}, Lagos`,
      neighborhoodArea: proj.location,
      category: isManagement ? 'management' : 'construction',
      categoryLabel: categoryLabel || '',
      status: proj.status as any,
      purpose: proj.status.includes('Sale') ? 'sale' : 'completed',
      price: price || (proj.units === 1 ? 'Master Infrastructure' : `${proj.units} Master Units`),
      numericPrice: proj.units * 150000000,
      priceSubtext: priceSubtext || proj.completionYear,
      units: proj.units,
      propertyType: propType,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      size: size,
      featured: true,
      heroImage: proj.image || gallery[0],
      gallery: gallery,
      description: `A landmark ${proj.category.toLowerCase()} portfolio development located in prime ${proj.location}. Comprising ${proj.units} units executed under Nigson Properties' uncompromising structural and engineering standards, delivered with full civil infrastructure, drainage integration, and central utilities.`,
      features: features,
      amenities: amenities,
      neighborhoodHighlights: neighborhood,
      specifications: specs
    };
  }

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
    const targetProp = project.property || this.createProjectProperty({
      name: project.name,
      location: project.location,
      units: project.units,
      status: project.status,
      category: project.category,
      image: project.image,
      completionYear: project.completionYear
    });
    this.propertyService.openPropertyDetails(targetProp);
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
    if (status.includes('Available') || status.includes('Sale')) return 'badge-available';
    if (status.includes('Completed')) return 'badge-gold';
    return 'badge-gold';
  }
}
