import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../services/property.service';
import { GalleryItem } from '../../models/property.model';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css'
})
export class GalleryComponent {
  public propertyService = inject(PropertyService);
  public activeTab = signal<string>('All');

  public tabs = ['All', 'Exterior', 'Interiors', 'Living', 'Kitchen', 'Amenities'];

  public filteredGallery = computed(() => {
    const tab = this.activeTab();
    if (tab === 'All') {
      return this.propertyService.galleryItems();
    }
    return this.propertyService.galleryItems().filter(item => item.category === tab);
  });

  public setTab(tab: string): void {
    this.activeTab.set(tab);
  }

  public openLightbox(item: GalleryItem): void {
    this.propertyService.openLightbox(item);
  }
}
