import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {
  public propertyService = inject(PropertyService);

  public contactName = signal<string>('');
  public contactEmail = signal<string>('');
  public contactPhone = signal<string>('');
  public contactSubject = signal<string>('General Property Inquiry');
  public contactMessage = signal<string>('');

  public sendMessage(): void {
    if (!this.contactName() || !this.contactPhone() || !this.contactEmail()) {
      this.propertyService.showToast('Notice', 'Please complete your name, phone number, and email address.', 'error');
      return;
    }

    try {
      const existingRaw = localStorage.getItem('nigson_admin_leads_data');
      const leads = existingRaw ? JSON.parse(existingRaw) : [];
      const newLead = {
        id: 'lead-' + Date.now(),
        category: 'contact-inquiry',
        categoryLabel: 'Contact Inquiry',
        clientName: this.contactName(),
        email: this.contactEmail(),
        phone: this.contactPhone(),
        subjectOrProperty: this.contactSubject() || 'General Property Inquiry',
        details: this.contactMessage() || 'Website contact form submission',
        status: 'New',
        date: new Date().toISOString().split('T')[0],
        priority: 'Medium',
        notes: `Subject: ${this.contactSubject()}`
      };
      localStorage.setItem('nigson_admin_leads_data', JSON.stringify([newLead, ...leads]));
    } catch {}

    this.propertyService.showToast(
      'Message Dispatched Successfully',
      `Thank you ${this.contactName()}. Our corporate office at Lekki Phase 1 has received your message and an agent will reach out shortly.`,
      'success'
    );

    this.contactName.set('');
    this.contactEmail.set('');
    this.contactPhone.set('');
    this.contactMessage.set('');
  }

  public openMapDirections(): void {
    window.open('https://maps.google.com/?q=Plot+30B+Block+110+Oladimeji+Alo+Street+Lekki+Phase+1+Lagos', '_blank');
  }

  public chatWhatsApp(): void {
    const msg = `Hello Nigson Properties, I am contacting your Lekki Phase 1 office from your website regarding ${this.contactSubject()}.`;
    window.open(this.propertyService.getWhatsAppLink(msg), '_blank');
  }
}
