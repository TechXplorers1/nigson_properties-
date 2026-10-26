import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SubpageHeroComponent } from '../../components/subpage-hero/subpage-hero.component';
import { waLink, addLead } from '../../models/data';
import { CmsService } from '../../services/cms.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, FormsModule, SubpageHeroComponent],
  template: `
    <div class="min-h-screen bg-white text-zinc-900 font-sans flex flex-col">
      <app-subpage-hero
        [kicker]="cms.hero.kicker"
        [title]="cms.hero.title"
        [highlight]="cms.hero.highlight"
        [subtitle]="cms.hero.subtitle"
        [breadcrumbs]="[{ label: 'Contact Us' }]"
        [bgImage]="cms.hero.bgImage"
      />

      <main class="flex-1 mx-auto max-w-7xl px-6 md:px-12 py-16 w-full">
        <div class="grid lg:grid-cols-12 gap-12">
          <!-- Left Column: Direct Channels & Office Info -->
          <div class="lg:col-span-5 space-y-8">
            <div>
              <p class="kicker text-red-600">{{ cms.office.kicker }}</p>
              <h2 class="font-serif text-3xl font-medium text-zinc-950 mt-1">
                {{ cms.office.title }}
              </h2>
              <p class="text-xs md:text-sm text-zinc-500 mt-2 font-light">
                {{ cms.office.desc }}
              </p>
            </div>

            <!-- Info Cards -->
            <div class="space-y-4">
              <div class="p-5 rounded-2xl border border-zinc-200 bg-zinc-50 flex items-start gap-4">
                <div class="h-10 w-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                </div>
                <div>
                  <span class="text-[0.68rem] font-bold uppercase tracking-wider text-zinc-400">{{ cms.office.headquartersTitle }}</span>
                  <p class="text-sm font-semibold text-zinc-900 mt-0.5">{{ cms.office.addressLine1 }}</p>
                  <p class="text-xs text-zinc-500">{{ cms.office.addressLine2 }}</p>
                </div>
              </div>

              <div class="p-5 rounded-2xl border border-zinc-200 bg-zinc-50 flex items-start gap-4">
                <div class="h-10 w-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <div>
                  <span class="text-[0.68rem] font-bold uppercase tracking-wider text-zinc-400">Telephone Lines</span>
                  <p class="text-sm font-semibold text-zinc-900 mt-0.5">
                    <ng-container *ngFor="let phone of cms.office.phones; let last = last">
                      <a [href]="'tel:' + phone" class="hover:text-red-600">{{ phone }}</a>
                      <span *ngIf="!last"> · </span>
                    </ng-container>
                  </p>
                  <p class="text-xs text-zinc-500">{{ cms.office.hours }}</p>
                </div>
              </div>

              <div class="p-5 rounded-2xl border border-zinc-200 bg-zinc-50 flex items-start gap-4">
                <div class="h-10 w-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <span class="text-[0.68rem] font-bold uppercase tracking-wider text-zinc-400">Electronic Mail</span>
                  <p class="text-sm font-semibold text-zinc-900 mt-0.5">
                    <a [href]="'mailto:' + cms.office.email" class="hover:text-red-600">{{ cms.office.email }}</a>
                  </p>
                  <p class="text-xs text-zinc-500">Corporate Inquiries & Property Support</p>
                </div>
              </div>
            </div>

            <!-- WhatsApp Direct Button -->
            <div class="p-6 bg-[#0B0C10] text-white rounded-2xl">
              <span class="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-1">Instant WhatsApp</span>
              <h4 class="font-serif text-xl font-bold">Speak Directly with an Agent</h4>
              <p class="text-xs text-zinc-400 mt-2 mb-4">Connect with our client engagement team for instant responses.</p>
              <a
                [href]="waLink('Hello Nigson Properties, I would like to make an inquiry.')"
                target="_blank"
                class="inline-flex items-center gap-2 bg-[#25D366] hover:bg-emerald-600 text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
              >
                WhatsApp Us Now
              </a>
            </div>
          </div>

          <!-- Right Column: Property Inquiry Form (BRD Section 14) -->
          <div class="lg:col-span-7">
            <div class="bg-white border border-zinc-200/90 rounded-2xl p-8 md:p-10 shadow-lg">
              <p class="kicker text-red-600">{{ activeInquiry.kicker }}</p>
              <h3 class="font-serif text-3xl font-medium text-zinc-950 mt-1">{{ activeInquiry.title }}</h3>
              <p class="text-xs text-zinc-500 mt-1 mb-6">{{ activeInquiry.desc }}</p>

              <div *ngIf="submitted()" class="bg-emerald-50 border border-emerald-300 p-5 rounded-xl text-emerald-900 text-sm mb-6">
                <p class="font-bold flex items-center gap-2 text-base">
                  <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  {{ activeInquiry.successTitle || 'Inquiry Dispatched Successfully' }}
                </p>
                <p class="text-xs text-emerald-800 mt-1 leading-relaxed">
                  Thank you, {{ fullName }}. {{ activeInquiry.successMessage || 'Our sales and client services team will contact you shortly.' }}
                </p>
                <button (click)="submitted.set(false)" class="mt-4 px-4 py-2 bg-emerald-700 text-white rounded text-xs font-semibold uppercase tracking-wider">
                  Submit Another Inquiry
                </button>
              </div>

              <form *ngIf="!submitted()" (ngSubmit)="handleContactSubmit()" class="space-y-4 text-xs font-medium text-zinc-700">
                <div>
                  <label class="block uppercase tracking-wider text-zinc-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    [(ngModel)]="fullName"
                    name="fullName"
                    placeholder="e.g. Babatunde Alabi"
                    class="w-full border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-xs outline-none focus:border-red-600 focus:bg-white rounded"
                  />
                </div>

                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block uppercase tracking-wider text-zinc-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      [(ngModel)]="email"
                      name="email"
                      placeholder="investor@example.com"
                      class="w-full border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-xs outline-none focus:border-red-600 focus:bg-white rounded"
                    />
                  </div>
                  <div>
                    <label class="block uppercase tracking-wider text-zinc-400 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      [(ngModel)]="phone"
                      name="phone"
                      placeholder="08073467809"
                      class="w-full border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-xs outline-none focus:border-red-600 focus:bg-white rounded"
                    />
                  </div>
                </div>

                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block uppercase tracking-wider text-zinc-400 mb-1">Property Interested In</label>
                    <input
                      type="text"
                      [(ngModel)]="propertyInterestedIn"
                      name="propertyInterestedIn"
                      placeholder="e.g. Opposite Whitesand Beach Estate"
                      class="w-full border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-xs outline-none focus:border-red-600 rounded"
                    />
                  </div>
                  <div>
                    <label class="block uppercase tracking-wider text-zinc-400 mb-1">Inquiry Type</label>
                    <select
                      [(ngModel)]="inquiryType"
                      name="inquiryType"
                      class="w-full border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-xs outline-none focus:border-red-600 rounded"
                    >
                      <option value="Buy">Buy a Property</option>
                      <option value="Short Stay">Short Stay Booking</option>
                      <option value="Property Management">Property Management</option>
                      <option value="Investment">Real Estate Investment</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block uppercase tracking-wider text-zinc-400 mb-1">Preferred Inspection Date (Optional)</label>
                    <input
                      type="date"
                      [(ngModel)]="preferredInspectionDate"
                      name="preferredInspectionDate"
                      class="w-full border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-xs outline-none focus:border-red-600 rounded"
                    />
                  </div>
                  <div>
                    <label class="block uppercase tracking-wider text-zinc-400 mb-1">Budget Range (Optional)</label>
                    <select
                      [(ngModel)]="budget"
                      name="budget"
                      class="w-full border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-xs outline-none focus:border-red-600 rounded"
                    >
                      <option value="₦200M – ₦500M">₦200M – ₦500M</option>
                      <option value="₦500M – ₦1B">₦500M – ₦1B</option>
                      <option value="₦1B – ₦2.5B+">₦1B – ₦2.5B+</option>
                      <option value="Short-Stay Daily Rate">Short-Stay Daily Rate</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block uppercase tracking-wider text-zinc-400 mb-1">Message</label>
                  <textarea
                    rows="4"
                    [(ngModel)]="message"
                    name="message"
                    placeholder="Provide additional details regarding your inquiry, inspection preference, or questions..."
                    class="w-full border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-xs outline-none focus:border-red-600 focus:bg-white rounded"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  class="btn-sweep w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded transition-all"
                >
                  {{ activeInquiry.buttonText || 'Submit Property Inquiry' }}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  `
})
export class ContactPageComponent {
  cmsService = inject(CmsService);
  get cms() {
    return this.cmsService.cmsData().contact;
  }

  get activeInquiry() {
    return this.cms.inquiryForm || {
      kicker: 'Client Engagement',
      title: 'Property Inquiry & Consultation',
      desc: 'Complete this inquiry form and our designated sales and client services team will contact you promptly.',
      buttonText: 'Submit Property Inquiry',
      successTitle: 'Inquiry Dispatched Successfully',
      successMessage: 'Our sales and client services team will contact you shortly.'
    };
  }

  fullName = '';
  email = '';
  phone = '';
  propertyInterestedIn = '';
  inquiryType = 'Buy';
  preferredInspectionDate = '';
  budget = '₦200M – ₦500M';
  message = '';
  submitted = signal(false);

  waLink = waLink;

  handleContactSubmit() {
    if (!this.fullName || !this.email) return;

    let leadType: 'Property Inquiry' | 'Sales Lead' | 'Booking Details' | 'Property Management' | 'Contact Inquiry' = 'Property Inquiry';
    if (this.inquiryType === 'Buy') leadType = 'Sales Lead';
    else if (this.inquiryType === 'Short Stay') leadType = 'Booking Details';
    else if (this.inquiryType === 'Property Management') leadType = 'Property Management';
    else if (this.inquiryType === 'General Inquiry') leadType = 'Contact Inquiry';

    addLead({
      type: leadType,
      name: this.fullName.trim(),
      email: this.email.trim(),
      phone: this.phone.trim() || '08073467809',
      property: this.propertyInterestedIn || 'General Inquiry',
      budget: this.budget,
      preferredDate: this.preferredInspectionDate,
      status: 'New',
      notes: this.message ? this.message.trim() : `Inquiry Type: ${this.inquiryType}. Preferred Date: ${this.preferredInspectionDate || 'Flexible'}.`,
      source: 'Contact Us Inquiry Form'
    });
    this.submitted.set(true);
  }
}
