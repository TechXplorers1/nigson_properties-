import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { properties, Property, addLead } from '../../models/data';

@Component({
  selector: 'app-inspection-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      *ngIf="modalService.inspectionOpen()"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
      (click)="closeOnBackdrop($event)"
    >
      <div
        class="bg-white max-w-lg w-full max-h-[92vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-red-500/30 relative text-zinc-900 font-sans"
        (click)="$event.stopPropagation()"
      >
        <!-- Close Button -->
        <button
          (click)="modalService.closeInspection()"
          class="absolute top-4 right-4 text-zinc-400 hover:text-zinc-800 transition-colors p-1"
          aria-label="Close dialog"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <!-- Header -->
        <div class="mb-6">
          <p class="kicker">Private Viewing</p>
          <h2 class="font-serif text-3xl font-medium text-zinc-950 mt-1">Schedule an Inspection</h2>
          <p class="text-xs text-zinc-500 mt-1">Choose a residence and a preferred date. Our concierge desk handles the rest.</p>
        </div>

        <!-- Success Toast State -->
        <div *ngIf="submitted()" class="bg-emerald-50 border border-emerald-300 p-4 rounded text-emerald-900 my-4 text-sm">
          <p class="font-bold flex items-center gap-2">
            <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Thank you, {{ clientName }}.
          </p>
          <p class="text-xs mt-1 text-emerald-800 leading-relaxed">
            Your inspection request for {{ getSelectedPropertyTitle() }} has been logged. An executive advisor will confirm via WhatsApp/phone within 2 hours.
          </p>
          <button
            (click)="submitted.set(false); modalService.closeInspection()"
            class="mt-4 px-4 py-2 bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider rounded"
          >
            Close Window
          </button>
        </div>

        <!-- Form -->
        <form *ngIf="!submitted()" (ngSubmit)="submitInspection()" class="grid gap-4 text-sm">
          <div>
            <label class="block text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-zinc-500 mb-1">
              Property of Interest
            </label>
            <select
              [(ngModel)]="selectedPropId"
              name="propId"
              class="w-full border border-zinc-300 bg-zinc-50 px-3 py-2.5 text-sm outline-none focus:border-red-600 focus:bg-white"
            >
              <option *ngFor="let p of allProperties" [value]="p.id">
                {{ p.title }} — {{ p.location }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-zinc-500 mb-1">
              Preferred Date & Time
            </label>
            <input
              type="datetime-local"
              [(ngModel)]="datetime"
              name="datetime"
              required
              class="w-full border border-zinc-300 bg-zinc-50 px-3 py-2.5 text-sm outline-none focus:border-red-600 focus:bg-white"
            />
          </div>

          <div>
            <label class="block text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-zinc-500 mb-1">
              Full Name
            </label>
            <input
              type="text"
              [(ngModel)]="clientName"
              name="clientName"
              placeholder="e.g. Chief Adeleke Coker"
              required
              class="w-full border border-zinc-300 bg-zinc-50 px-3 py-2.5 text-sm outline-none focus:border-red-600 focus:bg-white"
            />
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label class="block text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-zinc-500 mb-1">
                Email Address
              </label>
              <input
                type="email"
                [(ngModel)]="email"
                name="email"
                placeholder="investor@example.com"
                required
                class="w-full border border-zinc-300 bg-zinc-50 px-3 py-2.5 text-sm outline-none focus:border-red-600 focus:bg-white"
              />
            </div>
            <div>
              <label class="block text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-zinc-500 mb-1">
                Phone Number
              </label>
              <div class="flex">
                <span class="flex items-center gap-1 border border-r-0 border-zinc-300 bg-zinc-100 px-2.5 text-xs text-zinc-700 font-semibold">
                  🇳🇬 +234
                </span>
                <input
                  type="tel"
                  [(ngModel)]="phone"
                  name="phone"
                  placeholder="807 346 7809"
                  required
                  class="w-full border border-zinc-300 bg-zinc-50 px-3 py-2.5 text-sm outline-none focus:border-red-600 focus:bg-white"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            class="btn-sweep mt-3 bg-red-600 hover:bg-red-700 text-white px-6 py-3.5 text-xs font-bold uppercase tracking-[0.3em] transition-all text-center cursor-pointer"
          >
            Confirm VIP Inspection
          </button>
        </form>
      </div>
    </div>
  `
})
export class InspectionModalComponent {
  modalService = inject(ModalService);
  allProperties = properties;

  selectedPropId = properties[0].id;
  datetime = '';
  clientName = '';
  email = '';
  phone = '';
  tourType = signal<'person' | 'virtual'>('person');
  submitted = signal(false);

  constructor() {
    // Sync with modal service property if provided
    if (this.modalService.selectedProperty()) {
      this.selectedPropId = this.modalService.selectedProperty()!.id;
    }
  }

  getSelectedPropertyTitle(): string {
    const p = this.allProperties.find(x => x.id === this.selectedPropId);
    return p ? p.title : 'Selected Residence';
  }

  closeOnBackdrop(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.modalService.closeInspection();
    }
  }

  submitInspection() {
    if (!this.clientName || !this.email) return;
    addLead({
      type: 'Inspection Request',
      name: this.clientName.trim(),
      email: this.email.trim(),
      phone: this.phone ? `+234 ${this.phone.trim()}` : '+234 807 346 7809',
      property: this.getSelectedPropertyTitle(),
      preferredDate: this.datetime || undefined,
      tourType: this.tourType() === 'person' ? 'In-Person VIP Tour' : '4K Virtual Inspection',
      status: 'New',
      notes: `VIP private viewing requested for ${this.getSelectedPropertyTitle()} (${this.tourType() === 'person' ? 'In-Person' : '4K Virtual'}). Preferred slot: ${this.datetime || 'Immediate confirmation'}.`,
      source: 'Website Inspection Scheduler'
    });
    this.submitted.set(true);
  }
}
