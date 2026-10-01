import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent {
  public propertyService = inject(PropertyService);
  public newsletterEmail = signal<string>('');

  public scrollTo(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  public subscribeNewsletter(): void {
    if (!this.newsletterEmail()) {
      this.propertyService.showToast('Notice', 'Please enter your email address to receive property updates.', 'info');
      return;
    }

    this.propertyService.showToast(
      'Newsletter Subscription Confirmed',
      `Thank you. ${this.newsletterEmail()} has been registered for exclusive off-plan launches and investor insights.`,
      'success'
    );
    this.newsletterEmail.set('');
  }

  public openInspection(): void {
    this.propertyService.openInspectionModal();
  }

  public openWhatsApp(): void {
    window.open(this.propertyService.getWhatsAppLink('Hello Nigson Properties, I would like to make an inquiry.'), '_blank');
  }
}
