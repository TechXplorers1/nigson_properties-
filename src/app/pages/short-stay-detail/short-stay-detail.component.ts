import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { suites, Suite, naira, waLink, addLead } from '../../models/data';

@Component({
  selector: 'app-short-stay-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div *ngIf="suite()" class="min-h-screen bg-[#0B0C10] text-white font-sans flex flex-col pt-20">
      <!-- Sticky Action Subheader -->
      <div class="sticky top-[72px] z-30 border-b border-white/10 bg-[#16171F]/95 backdrop-blur-md py-3.5 px-6 md:px-12 shadow-sm">
        <div class="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <a routerLink="/short-stay" class="flex items-center gap-1 text-xs text-zinc-400 hover:text-red-500 transition-colors font-semibold">
              ← Back to Short Stay
            </a>
            <span class="text-white/20">|</span>
            <span class="text-xs font-semibold text-white truncate max-w-xs sm:max-w-md">{{ suite()!.name }}</span>
          </div>

          <div class="flex items-center gap-4">
            <div class="hidden sm:block text-right">
              <span class="text-[0.65rem] uppercase text-zinc-400 block">Nightly Rate</span>
              <span class="font-bold text-base text-white tabular-nums">{{ naira(suite()!.rate) }} / night</span>
            </div>
            <button
              (click)="dispatchBooking()"
              class="btn-sweep bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all"
            >
              Reserve via WhatsApp
            </button>
          </div>
        </div>
      </div>

      <main class="mx-auto max-w-7xl px-6 md:px-12 py-8 w-full flex-1">
        <!-- Header Title -->
        <div class="pb-8 border-b border-white/10">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-red-500 font-bold text-xs uppercase tracking-widest">Serviced Luxury Suite</span>
            <span class="text-white/20">·</span>
            <span class="bg-white/10 px-2.5 py-0.5 rounded text-xs text-zinc-300 font-medium">
              {{ suite()!.location }}
            </span>
            <span class="text-amber-400 text-xs font-bold ml-2">★ 5.0 (24 Executive Reviews)</span>
          </div>
          <h1 class="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight">
            {{ suite()!.name }}
          </h1>
          <p class="text-sm md:text-base text-zinc-300 mt-2 font-light max-w-3xl leading-relaxed">
            {{ suite()!.tagline || suite()!.description }}
          </p>
        </div>

        <!-- Gallery Grid -->
        <div class="my-8 grid grid-cols-1 md:grid-cols-3 gap-4 h-[400px] md:h-[480px] rounded-3xl overflow-hidden bg-black">
          <div class="md:col-span-2 overflow-hidden bg-zinc-900 relative cursor-pointer" (click)="selectedImg.set(suite()!.image)">
            <img [src]="selectedImg() || suite()!.image" [alt]="suite()!.name" class="w-full h-full object-cover zoom-img" />
          </div>
          <div class="hidden md:grid grid-rows-2 gap-4">
            <div *ngFor="let g of suite()!.gallery.slice(1, 3)" class="overflow-hidden bg-zinc-900 relative cursor-pointer" (click)="selectedImg.set(g)">
              <img [src]="g" alt="" class="w-full h-full object-cover zoom-img" />
            </div>
          </div>
        </div>

        <div class="grid gap-12 lg:grid-cols-3">
          <!-- Left Details (2 cols) -->
          <div class="lg:col-span-2 space-y-12">
            <div>
              <p class="kicker text-red-500">The Residence Experience</p>
              <h2 class="font-serif text-3xl font-medium text-white mt-2">Executive Comfort & Discretion</h2>
              <p class="mt-4 text-zinc-300 leading-relaxed text-base font-light">
                {{ suite()!.description }}
              </p>
            </div>

            <!-- Curated Inclusions -->
            <div>
              <p class="kicker text-red-500">Suite Inclusions</p>
              <h2 class="font-serif text-2xl font-medium text-white mt-1 mb-4">Five-Star Amenities</h2>
              <div class="grid sm:grid-cols-2 gap-3">
                <div *ngFor="let am of suite()!.amenities" class="flex items-center gap-3 p-3.5 bg-white/5 border border-white/10 rounded">
                  <div class="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></div>
                  <span class="text-xs font-semibold text-zinc-200">{{ am }}</span>
                </div>
              </div>
            </div>

            <!-- House Rules -->
            <div *ngIf="suite()!.houseRules">
              <p class="kicker text-red-500">Stay Policy</p>
              <h2 class="font-serif text-2xl font-medium text-white mt-1 mb-4">House Guidelines</h2>
              <ul class="space-y-2.5 text-xs text-zinc-300">
                <li *ngFor="let r of suite()!.houseRules" class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  {{ r }}
                </li>
              </ul>
            </div>

            <!-- Client Reviews -->
            <div *ngIf="suite()!.reviews && suite()!.reviews.length > 0">
              <p class="kicker text-red-500">Testimonials</p>
              <h2 class="font-serif text-2xl font-medium text-white mt-1 mb-6">Verified Executive Reviews</h2>
              <div class="space-y-4">
                <div *ngFor="let rv of suite()!.reviews" class="p-5 bg-white/5 border border-white/10 rounded-xl">
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="font-bold text-sm text-white">{{ rv.name }}</h4>
                    <span class="text-amber-400 text-xs font-bold">★★★★★</span>
                  </div>
                  <span class="text-xs text-zinc-400 block mb-2">{{ rv.title }} · {{ rv.date }}</span>
                  <p class="text-xs text-zinc-300 italic leading-relaxed">“{{ rv.comment }}”</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Booking Calculator (1 col) -->
          <div>
            <div class="sticky top-28 p-6 bg-[#16171F] border border-white/10 rounded-2xl shadow-2xl">
              <span class="text-[0.65rem] font-bold uppercase tracking-widest text-red-500 block">Digital Reservation</span>
              <h3 class="font-serif text-2xl font-medium text-white mt-1">Book Your Stay</h3>

              <div class="mt-6 space-y-4 text-xs">
                <!-- Nights Control -->
                <div>
                  <div class="flex justify-between font-semibold mb-1 text-zinc-300">
                    <span>Duration of Stay</span>
                    <span class="text-red-500 font-bold text-sm">{{ nights }} Nights</span>
                  </div>
                  <input type="range" min="1" max="30" [(ngModel)]="nights" class="w-full accent-red-600" />
                </div>

                <!-- Guests -->
                <div>
                  <label class="block font-semibold mb-1 text-zinc-300">Guests</label>
                  <select [(ngModel)]="guests" class="w-full p-2.5 bg-black border border-white/20 rounded text-white text-xs outline-none">
                    <option [value]="1">1 Guest</option>
                    <option [value]="2">2 Guests</option>
                    <option [value]="4">4 Guests</option>
                    <option [value]="6">6 Guests</option>
                  </select>
                </div>

                <!-- Add-ons -->
                <div class="pt-3 border-t border-white/10 space-y-2">
                  <label class="flex items-center gap-2 cursor-pointer text-zinc-300">
                    <input type="checkbox" [(ngModel)]="includeChef" class="accent-red-600" />
                    <span>Private Gourmet Chef (+{{ naira(45000) }}/night)</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer text-zinc-300">
                    <input type="checkbox" [(ngModel)]="includeChauffeur" class="accent-red-600" />
                    <span>Range Rover Chauffeur (+{{ naira(60000) }}/night)</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer text-zinc-300">
                    <input type="checkbox" [(ngModel)]="includeAirport" class="accent-red-600" />
                    <span>VIP Airport Pickup (+{{ naira(35000) }})</span>
                  </label>
                </div>

                <!-- Calculation Summary -->
                <div class="pt-4 border-t border-white/10 space-y-2 text-zinc-400">
                  <div class="flex justify-between">
                    <span>Accommodation ({{ nights }} nights)</span>
                    <span class="text-white">{{ naira(suite()!.rate * nights) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Cleaning Fee</span>
                    <span class="text-white">{{ naira(suite()!.cleaningFee) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Refundable Deposit</span>
                    <span class="text-white">{{ naira(suite()!.securityDeposit) }}</span>
                  </div>
                  <div class="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                    <span>Total Estimate</span>
                    <span class="text-red-500 tabular-nums">{{ naira(calculateTotal()) }}</span>
                  </div>
                </div>

                <button
                  (click)="dispatchBooking()"
                  class="btn-sweep w-full mt-4 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded text-center transition-all"
                >
                  Confirm on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `
})
export class ShortStayDetailComponent {
  route = inject(ActivatedRoute);

  suite = signal<Suite | null>(null);
  selectedImg = signal<string>('');
  nights = 3;
  guests = 2;
  includeChef = true;
  includeChauffeur = false;
  includeAirport = true;

  naira = naira;

  constructor() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const found = suites.find(s => s.id === id) || suites[0];
      this.suite.set(found);
      this.selectedImg.set(found.image);
    });
  }

  calculateTotal(): number {
    const s = this.suite();
    if (!s) return 0;
    const chefCost = this.includeChef ? 45000 * this.nights : 0;
    const chauffeurCost = this.includeChauffeur ? 60000 * this.nights : 0;
    const airportCost = this.includeAirport ? 35000 : 0;
    return s.rate * this.nights + s.cleaningFee + s.securityDeposit + chefCost + chauffeurCost + airportCost;
  }

  dispatchBooking() {
    const s = this.suite();
    if (!s) return;
    const total = this.calculateTotal();
    addLead({
      type: 'Booking Details',
      name: 'Private Suite Client',
      email: 'guest@hospitality.nigson.com',
      phone: '+234 807 346 7809',
      property: s.name,
      location: s.location,
      budget: naira(total),
      nights: this.nights,
      guests: this.guests,
      status: 'New',
      notes: `Short-stay suite reservation dispatched via WhatsApp for ${s.name} (${this.nights} nights, ${this.guests} guests). Estimated Total: ${naira(total)}. Add-ons: Chef (${this.includeChef}), Chauffeur (${this.includeChauffeur}), Airport (${this.includeAirport}).`,
      source: 'Short-Stay Booking Engine'
    });
    const msg = `Hello Nigson Concierge, I would like to book ${s.name} in ${s.location} for ${this.nights} nights (${this.guests} guests). Total estimate: ${naira(total)}. Please confirm availability.`;
    window.open(waLink(msg), '_blank');
  }
}
