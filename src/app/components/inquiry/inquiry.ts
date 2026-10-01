import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropertyService } from '../../services/property.service';
import { PropertyInquiry } from '../../models/property.model';

@Component({
  selector: 'app-inquiry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inquiry.html',
  styleUrl: './inquiry.css'
})
export class InquiryComponent {
  public propertyService = inject(PropertyService);

  public fullName = signal<string>('');
  public phone = signal<string>('');
  public email = signal<string>('');
  public propertyInterestedIn = signal<string>('Opposite Whitesand Beach Estate, Ologolo');
  public inquiryType = signal<'Buy' | 'Lease' | 'Property Management' | 'Investment' | 'General Inquiry'>('Buy');
  public budgetRange = signal<string>('₦150M – ₦250M');
  public preferredInspectionDate = signal<string>('');
  public message = signal<string>('');

  public submitForm(): void {
    if (!this.fullName() || !this.phone() || !this.email()) {
      this.propertyService.showToast('Notice', 'Please provide your full name, phone number, and email address.', 'error');
      return;
    }

    const inquiry: PropertyInquiry = {
      fullName: this.fullName(),
      phone: this.phone(),
      email: this.email(),
      propertyInterestedIn: this.propertyInterestedIn(),
      inquiryType: this.inquiryType(),
      budgetRange: this.budgetRange(),
      preferredInspectionDate: this.preferredInspectionDate(),
      message: this.message()
    };

    this.propertyService.submitInquiry(inquiry);
    this.resetForm();
  }

  public chatWhatsApp(): void {
    const msg = `Hello Nigson Properties, my name is ${this.fullName() || 'Client'}. I am submitting an inquiry regarding "${this.propertyInterestedIn()}" (${this.inquiryType()}). Please connect me with your sales advisor.`;
    window.open(this.propertyService.getWhatsAppLink(msg), '_blank');
  }

  private resetForm(): void {
    this.fullName.set('');
    this.phone.set('');
    this.email.set('');
    this.message.set('');
  }
}
