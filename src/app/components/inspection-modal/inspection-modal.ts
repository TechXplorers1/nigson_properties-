import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropertyService } from '../../services/property.service';
import { InspectionRequest } from '../../models/property.model';

@Component({
  selector: 'app-inspection-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inspection-modal.html',
  styleUrl: './inspection-modal.css'
})
export class InspectionModalComponent {
  public propertyService = inject(PropertyService);

  public selectedPropertyTitle = signal<string>('');
  public fullName = signal<string>('');
  public phone = signal<string>('');
  public email = signal<string>('');
  public preferredDate = signal<string>(this.getDefaultDate());
  public preferredTime = signal<string>('Morning (10:00 AM – 12:00 PM)');
  public tourType = signal<'In-Person' | 'Virtual Video Tour'>('In-Person');
  public clientRole = signal<'Buyer' | 'Investor' | 'Tenant' | 'Representative'>('Buyer');
  public comments = signal<string>('');

  constructor() {
    // Sync preselected property if provided
    const pre = this.propertyService.inspectionPreselectedProperty();
    if (pre) {
      this.selectedPropertyTitle.set(pre);
    }
  }

  private getDefaultDate(): string {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  }

  public closeModal(): void {
    this.propertyService.closeInspectionModal();
  }

  public submitInspection(): void {
    if (!this.fullName() || !this.phone() || !this.email()) {
      this.propertyService.showToast('Incomplete Form', 'Please provide your name, phone number, and email address.', 'error');
      return;
    }

    const propTitle = this.selectedPropertyTitle() || this.propertyService.inspectionPreselectedProperty() || 'General Portfolio Inspection';

    const req: InspectionRequest = {
      propertyId: 'custom-inspection',
      propertyTitle: propTitle,
      fullName: this.fullName(),
      phone: this.phone(),
      email: this.email(),
      preferredDate: this.preferredDate(),
      preferredTime: this.preferredTime(),
      tourType: this.tourType(),
      clientRole: this.clientRole(),
      notes: this.comments()
    };

    this.propertyService.submitInspectionRequest(req);
    this.resetForm();
  }

  public submitAndWhatsApp(): void {
    if (!this.fullName() || !this.phone()) {
      this.propertyService.showToast('Notice', 'Please fill in your name and phone number.', 'info');
      return;
    }

    const prop = this.selectedPropertyTitle() || this.propertyService.inspectionPreselectedProperty() || 'Nigson Properties Development';
    const msg = `Hello Nigson Properties, my name is ${this.fullName()}. I would like to schedule an inspection for "${prop}" on ${this.preferredDate()} (${this.preferredTime()}). My phone is ${this.phone()}.`;
    window.open(this.propertyService.getWhatsAppLink(msg), '_blank');
    this.closeModal();
  }

  private resetForm(): void {
    this.fullName.set('');
    this.phone.set('');
    this.email.set('');
    this.comments.set('');
  }
}
