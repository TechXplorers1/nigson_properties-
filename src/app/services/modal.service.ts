import { Injectable, signal } from '@angular/core';
import { Property, Project } from '../models/data';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  inspectionOpen = signal<boolean>(false);
  selectedProperty = signal<Property | null>(null);

  brochureOpen = signal<boolean>(false);
  selectedProject = signal<Project | null>(null);

  quickViewOpen = signal<boolean>(false);
  quickViewProperty = signal<Property | null>(null);

  openInspection(property?: Property | null) {
    this.selectedProperty.set(property ?? null);
    this.inspectionOpen.set(true);
  }

  openConsultation() {
    this.inspectionOpen.set(true);
  }

  closeInspection() {
    this.inspectionOpen.set(false);
    this.selectedProperty.set(null);
  }

  openBrochure(project?: Project | null) {
    this.selectedProject.set(project ?? null);
    this.brochureOpen.set(true);
  }

  closeBrochure() {
    this.brochureOpen.set(false);
    this.selectedProject.set(null);
  }

  openQuickView(property: Property) {
    this.quickViewProperty.set(property);
    this.quickViewOpen.set(true);
  }

  closeQuickView() {
    this.quickViewOpen.set(false);
    this.quickViewProperty.set(null);
  }
}
