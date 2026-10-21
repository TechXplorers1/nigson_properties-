import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { properties, Property, FloorPlan, naira, usd, gbp, waLink } from '../../models/data';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div *ngIf="property()" class="min-h-screen bg-white text-zinc-900 font-sans flex flex-col pt-20">
      <!-- Sticky Action Subheader -->
      <div class="sticky top-[72px] z-30 border-b border-zinc-200 bg-white/95 backdrop-blur-md py-3.5 px-6 md:px-12 shadow-sm">
        <div class="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <a routerLink="/properties" class="flex items-center gap-1 text-xs text-zinc-500 hover:text-red-600 transition-colors font-semibold">
              ← Back to Properties
            </a>
            <span class="text-zinc-300">|</span>
            <span class="text-xs font-semibold text-zinc-950 truncate max-w-xs sm:max-w-md">{{ property()!.title }}</span>
          </div>

          <div class="flex items-center gap-3">
            <!-- Currency Switcher -->
            <div class="flex items-center bg-zinc-100 rounded-full p-0.5 border border-zinc-200 text-xs font-semibold">
              <button
                *ngFor="let c of ['NGN', 'USD', 'GBP']"
                (click)="currency.set(c)"
                class="px-2.5 py-1 rounded-full transition-all text-[0.7rem]"
                [ngClass]="currency() === c ? 'bg-red-600 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900'"
              >
                {{ c }}
              </button>
            </div>

            <button
              (click)="modalService.openInspection(property())"
              class="btn-sweep bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all"
            >
              Schedule Tour
            </button>
          </div>
        </div>
      </div>

      <!-- Main Layout -->
      <main class="mx-auto max-w-7xl px-6 md:px-12 py-8 w-full flex-1">
        <!-- Title & Location Header -->
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-zinc-100">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-widest bg-red-600 text-white rounded">
                {{ property()!.status }}
              </span>
              <span class="text-xs uppercase tracking-widest font-semibold text-zinc-500">
                {{ property()!.category }} · {{ property()!.location }}
              </span>
            </div>
            <h1 class="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-zinc-950">
              {{ property()!.title }}
            </h1>
            <p *ngIf="property()!.tagline" class="mt-2 text-sm md:text-base text-zinc-600 font-light">
              {{ property()!.tagline }}
            </p>
          </div>

          <div class="text-left lg:text-right">
            <span class="text-xs uppercase tracking-widest font-semibold text-zinc-400 block">Acquisition Valuation</span>
            <span class="font-sans font-bold text-3xl sm:text-4xl text-red-600 tracking-tight tabular-nums">
              {{ formatPrice(property()!.price) }}
            </span>
            <span class="block text-xs text-zinc-500 mt-1">{{ property()!.titleDeed }}</span>
          </div>
        </div>

        <!-- Gallery Mosaic -->
        <div class="mt-8 grid gap-4 grid-cols-1 md:grid-cols-4 md:grid-rows-2 h-[420px] md:h-[540px] rounded-2xl overflow-hidden bg-zinc-950">
          <!-- Main Hero Image (Col 1-2, Row 1-2) -->
          <div class="md:col-span-2 md:row-span-2 relative group overflow-hidden cursor-pointer" (click)="selectedImg.set(property()!.gallery[0])">
            <img [src]="property()!.gallery[0]" [alt]="property()!.title" class="w-full h-full object-cover zoom-img" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <span class="absolute bottom-4 left-4 text-xs font-semibold text-white uppercase tracking-widest bg-black/50 backdrop-blur-md px-3 py-1 rounded">
              Exterior Perspective
            </span>
          </div>

          <!-- Secondary Image 1 -->
          <div class="relative group overflow-hidden cursor-pointer" (click)="selectedImg.set(property()!.gallery[1] || property()!.gallery[0])">
            <img [src]="property()!.gallery[1] || property()!.gallery[0]" alt="" class="w-full h-full object-cover zoom-img" />
          </div>

          <!-- Secondary Image 2 -->
          <div class="relative group overflow-hidden cursor-pointer" (click)="selectedImg.set(property()!.gallery[2] || property()!.gallery[0])">
            <img [src]="property()!.gallery[2] || property()!.gallery[0]" alt="" class="w-full h-full object-cover zoom-img" />
          </div>

          <!-- Secondary Image 3 -->
          <div class="relative group overflow-hidden cursor-pointer" (click)="selectedImg.set(property()!.gallery[3] || property()!.gallery[0])">
            <img [src]="property()!.gallery[3] || property()!.gallery[0]" alt="" class="w-full h-full object-cover zoom-img" />
          </div>

          <!-- Secondary Image 4 with View All counter -->
          <div class="relative group overflow-hidden cursor-pointer bg-zinc-900" (click)="selectedImg.set(property()!.gallery[4] || property()!.gallery[0])">
            <img [src]="property()!.gallery[4] || property()!.gallery[0]" alt="" class="w-full h-full object-cover zoom-img filter brightness-75" />
            <div class="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-bold text-xs uppercase tracking-widest">
              View All Photos ({{ property()!.gallery.length }})
            </div>
          </div>
        </div>

        <!-- 4-Column Key Metrics Banner -->
        <div class="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-zinc-50 border border-zinc-200/80 rounded-xl text-center">
          <div>
            <span class="text-[0.65rem] font-bold uppercase tracking-widest text-zinc-400 block">Bedrooms</span>
            <span class="font-sans font-bold text-2xl text-zinc-950 mt-1 block">{{ property()!.beds }} Suites</span>
          </div>
          <div>
            <span class="text-[0.65rem] font-bold uppercase tracking-widest text-zinc-400 block">Bathrooms</span>
            <span class="font-sans font-bold text-2xl text-zinc-950 mt-1 block">{{ property()!.baths }} En-Suite</span>
          </div>
          <div>
            <span class="text-[0.65rem] font-bold uppercase tracking-widest text-zinc-400 block">Gross Area</span>
            <span class="font-sans font-bold text-2xl text-zinc-950 mt-1 block">{{ property()!.size }} m²</span>
          </div>
          <div>
            <span class="text-[0.65rem] font-bold uppercase tracking-widest text-zinc-400 block">Delivery</span>
            <span class="font-sans font-bold text-2xl text-red-600 mt-1 block">{{ property()!.completionDate || 'Immediate' }}</span>
          </div>
        </div>

        <!-- Two-Column Editorial Details -->
        <div class="mt-12 grid gap-12 lg:grid-cols-3">
          <!-- Left Main Body (2 cols) -->
          <div class="lg:col-span-2 space-y-12">
            <!-- Architectural Summary -->
            <div>
              <p class="kicker text-red-600">Architectural Narrative</p>
              <h2 class="font-serif text-3xl font-medium text-zinc-950 mt-2">Bespoke Design & Living Standards</h2>
              <p class="mt-4 text-zinc-600 leading-relaxed text-base">
                {{ property()!.description || property()!.summary }}
              </p>
            </div>

            <!-- Key Amenities Grid -->
            <div>
              <p class="kicker text-red-600">Specifications</p>
              <h2 class="font-serif text-2xl font-medium text-zinc-950 mt-1 mb-4">Turnkey Luxury Amenities</h2>
              <div class="grid sm:grid-cols-2 gap-3">
                <div *ngFor="let am of property()!.amenities" class="flex items-center gap-3 p-3.5 bg-zinc-50 border border-zinc-200/80 rounded">
                  <div class="w-2 h-2 rounded-full bg-red-600 shrink-0"></div>
                  <span class="text-xs font-semibold text-zinc-800">{{ am }}</span>
                </div>
              </div>
            </div>

            <!-- Interactive Floor Plans -->
            <div *ngIf="property()!.floorPlans && property()!.floorPlans!.length > 0">
              <p class="kicker text-red-600">Architectural Layout</p>
              <h2 class="font-serif text-2xl font-medium text-zinc-950 mt-1 mb-4">Floor Plans & Room Matrix</h2>

              <div class="flex gap-2 border-b border-zinc-200 mb-6 pb-2">
                <button
                  *ngFor="let fp of property()!.floorPlans!; let idx = index"
                  (click)="activeFloorIdx.set(idx)"
                  class="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all"
                  [ngClass]="activeFloorIdx() === idx ? 'bg-zinc-950 text-white' : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900'"
                >
                  {{ fp.level }}
                </button>
              </div>

              <div class="p-6 bg-zinc-50 border border-zinc-200 rounded-xl">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="font-serif text-2xl font-medium text-zinc-950">{{ currentFloor()!.name }}</h3>
                  <span class="font-sans font-bold text-red-600 text-base">{{ currentFloor()!.sqm }} m²</span>
                </div>
                <p class="text-xs text-zinc-600 leading-relaxed mb-4">{{ currentFloor()!.description }}</p>
                <div class="flex flex-wrap gap-2">
                  <span *ngFor="let r of currentFloor()!.rooms" class="px-3 py-1 bg-white border border-zinc-200 rounded text-xs font-medium text-zinc-700">
                    {{ r }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Travel Times -->
            <div *ngIf="property()!.travelTimes && property()!.travelTimes!.length > 0">
              <p class="kicker text-red-600">Connectivity</p>
              <h2 class="font-serif text-2xl font-medium text-zinc-950 mt-1 mb-4">Prime Corridor Travel Times</h2>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div *ngFor="let tt of property()!.travelTimes!" class="p-4 bg-zinc-50 border border-zinc-200 rounded text-center">
                  <span class="font-sans font-bold text-xl text-red-600 block">{{ tt.time }}</span>
                  <span class="text-xs text-zinc-500 font-medium mt-1 block">{{ tt.place }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Sidebar (1 col) -->
          <div class="space-y-6">
            <!-- Inspection Card -->
            <div class="p-6 bg-zinc-950 text-white rounded-xl shadow-lg border border-white/10">
              <p class="kicker text-red-500">Private Viewing</p>
              <h3 class="font-serif text-2xl font-medium mt-1">Book an On-Site Inspection</h3>
              <p class="text-xs text-zinc-400 mt-2 leading-relaxed">
                Experience the residence with an executive portfolio manager. In-person or 4K live video tour available.
              </p>
              <button
                (click)="modalService.openInspection(property())"
                class="w-full mt-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded transition-all"
              >
                Schedule VIP Inspection
              </button>
              <a
                [href]="waLink('Hello Nigson Concierge, I would like to schedule a viewing for ' + property()!.title + '.')"
                target="_blank"
                class="w-full mt-3 py-3 border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-bold text-xs uppercase tracking-widest rounded text-center block transition-all"
              >
                WhatsApp Advisor
              </a>
            </div>

            <!-- Land Title Assurance -->
            <div class="p-6 bg-zinc-50 border border-zinc-200 rounded-xl">
              <div class="flex items-center gap-2 text-red-600 text-xs font-bold uppercase tracking-wider mb-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                Title Perfection
              </div>
              <p class="text-xs text-zinc-600 leading-relaxed">
                All Nigson land titles hold unassailable Governor’s Consent and Federal/State C of O. Conveyancing backed by legal indemnity protection.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  `
})
export class PropertyDetailComponent {
  route = inject(ActivatedRoute);
  modalService = inject(ModalService);

  property = signal<Property | null>(null);
  currency = signal<string>('NGN');
  selectedImg = signal<string>('');
  activeFloorIdx = signal<number>(0);

  waLink = waLink;

  constructor() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const found = properties.find(p => p.id === id) || properties[0];
      this.property.set(found);
      this.selectedImg.set(found.image);
    });
  }

  currentFloor(): FloorPlan | null {
    const p = this.property();
    if (!p || !p.floorPlans || p.floorPlans.length === 0) return null;
    return p.floorPlans[this.activeFloorIdx()] || p.floorPlans[0];
  }

  formatPrice(price: number): string {
    if (this.currency() === 'USD') return usd(this.property()?.usdPrice || Math.round(price / 1500));
    if (this.currency() === 'GBP') return gbp(this.property()?.gbpPrice || Math.round(price / 1920));
    return naira(price);
  }
}
