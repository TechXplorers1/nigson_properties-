import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SubpageHeroComponent } from '../../components/subpage-hero/subpage-hero.component';
import { ModalService } from '../../services/modal.service';
import { properties, Property, naira, waLink } from '../../models/data';

@Component({
  selector: 'app-properties-hub',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, SubpageHeroComponent],
  template: `
    <div class="min-h-screen bg-white text-zinc-900 font-sans flex flex-col">
      <app-subpage-hero
        kicker="Curated Portfolio"
        title="Exclusive Real Estate"
        highlight="Portfolio"
        subtitle="Waterfront villas, smart penthouses, and master-planned residences in Lagos's most coveted zip codes. Verified C of O and Governor's Consent guaranteed."
        [breadcrumbs]="[{ label: 'Properties' }]"
        bgImage="/assets/hero.jpg"
      >
        <div class="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-300 font-medium">
          <span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> 100% Verified Land Titles</span>
          <span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> 24/7 Redundant Solar Grid</span>
          <span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> Direct Developer Allocations</span>
        </div>
      </app-subpage-hero>

      <main class="flex-1 mx-auto max-w-7xl px-6 md:px-12 py-12 w-full">
        <!-- Sticky Filter Bar -->
        <div class="sticky top-20 z-30 rounded-2xl border border-zinc-200/90 bg-white/95 p-5 shadow-lg backdrop-blur-md mb-10">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
            <!-- Search Input -->
            <div class="relative flex-1 max-w-md">
              <svg class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input
                type="text"
                [(ngModel)]="search"
                placeholder="Search by residence title, neighborhood..."
                class="w-full rounded-full border border-zinc-200 bg-zinc-50 pl-10 pr-4 py-2 text-xs outline-none focus:border-red-600 focus:bg-white"
              />
            </div>

            <!-- Category Pills -->
            <div class="flex items-center gap-1.5 overflow-x-auto pb-1">
              <button
                *ngFor="let cat of categories"
                (click)="selectedCategory.set(cat)"
                class="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all"
                [ngClass]="selectedCategory() === cat ? 'bg-red-600 text-white shadow-sm' : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950'"
              >
                {{ cat }}
              </button>
            </div>
          </div>

          <!-- Secondary Filters & Controls -->
          <div class="flex flex-wrap items-center justify-between gap-4 pt-4 text-xs font-medium text-zinc-600">
            <div class="flex flex-wrap items-center gap-3">
              <!-- Location Filter -->
              <select
                [(ngModel)]="selectedLocation"
                class="rounded border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-xs outline-none focus:border-red-600"
              >
                <option value="All">All Locations</option>
                <option *ngFor="let loc of locations" [value]="loc">{{ loc }}</option>
              </select>

              <!-- Bedroom Filter -->
              <select
                [(ngModel)]="selectedBeds"
                class="rounded border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-xs outline-none focus:border-red-600"
              >
                <option value="All">All Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
                <option value="6">6+ Bedrooms</option>
              </select>

              <!-- Status Filter -->
              <select
                [(ngModel)]="selectedStatus"
                class="rounded border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-xs outline-none focus:border-red-600"
              >
                <option value="All">All Statuses</option>
                <option value="Ready for Handover">Ready for Handover</option>
                <option value="Off-Plan">Off-Plan</option>
              </select>
            </div>

            <div class="flex items-center gap-4">
              <!-- Sort -->
              <div class="flex items-center gap-2">
                <span class="text-zinc-400">Sort by:</span>
                <select
                  [(ngModel)]="sortBy"
                  class="rounded border border-zinc-200 bg-zinc-50 px-2 py-1.5 text-xs outline-none focus:border-red-600"
                >
                  <option value="featured">Featured</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="price-asc">Price: Low to High</option>
                </select>
              </div>

              <!-- View Mode Toggle -->
              <div class="flex items-center bg-zinc-100 rounded p-0.5 border border-zinc-200">
                <button
                  (click)="viewMode.set('grid')"
                  class="p-1 rounded transition-colors"
                  [ngClass]="viewMode() === 'grid' ? 'bg-white shadow-sm text-zinc-950' : 'text-zinc-400 hover:text-zinc-700'"
                  title="Grid View"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                </button>
                <button
                  (click)="viewMode.set('list')"
                  class="p-1 rounded transition-colors"
                  [ngClass]="viewMode() === 'list' ? 'bg-white shadow-sm text-zinc-950' : 'text-zinc-400 hover:text-zinc-700'"
                  title="List View"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Result Stats -->
        <div class="mb-6 flex justify-between items-center text-xs text-zinc-500 font-semibold uppercase tracking-wider">
          <span>Showing {{ filtered().length }} Exclusive Residences</span>
        </div>

        <!-- Grid View -->
        <div *ngIf="viewMode() === 'grid'" class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <article
            *ngFor="let p of filtered()"
            class="lux-card group bg-white border border-zinc-200/90 rounded-sm overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div class="relative aspect-[4/3] overflow-hidden bg-zinc-950">
                <img [src]="p.image" [alt]="p.title" loading="lazy" class="zoom-img h-full w-full object-cover" />
                <div class="absolute left-4 top-4 flex gap-2">
                  <span class="flex items-center gap-1 bg-white/95 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.15em] text-zinc-900 shadow-sm">
                    {{ p.location }}
                  </span>
                  <span
                    class="px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.15em] text-white shadow-sm"
                    [ngClass]="p.status === 'Off-Plan' ? 'bg-red-600' : 'bg-zinc-950'"
                  >
                    {{ p.status }}
                  </span>
                </div>
              </div>

              <div class="p-6">
                <p class="text-[0.65rem] uppercase tracking-[0.25em] text-zinc-400 font-semibold">{{ p.category }}</p>
                <h3 class="mt-2 text-2xl font-serif text-zinc-950 leading-tight group-hover:text-red-600 transition-colors">
                  <a [routerLink]="['/properties', p.id]">{{ p.title }}</a>
                </h3>
                <p class="mt-2 text-xs text-zinc-600 line-clamp-2 leading-relaxed">{{ p.summary }}</p>

                <div class="mt-5 flex items-center gap-4 border-y border-zinc-100 py-3 text-xs text-zinc-500">
                  <span>{{ p.beds }} Beds</span>
                  <span>{{ p.baths }} Baths</span>
                  <span>{{ p.size }} sqm</span>
                  <span class="ml-auto text-red-600 font-semibold">Solar Redundant</span>
                </div>
              </div>
            </div>

            <div class="p-6 pt-0">
              <div class="flex items-center justify-between mb-4">
                <span class="font-sans font-bold text-2xl tracking-tight text-red-600 tabular-nums">
                  {{ naira(p.price) }}
                </span>
                <span class="text-xs text-zinc-400">{{ p.titleDeed?.includes('Federal') ? 'Federal C of O' : 'Governor Consent' }}</span>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <button
                  (click)="modalService.openInspection(p)"
                  class="btn-sweep py-2.5 text-center text-xs font-bold uppercase tracking-wider bg-zinc-950 text-white hover:bg-red-600 rounded transition-colors"
                >
                  Schedule Tour
                </button>
                <a
                  [routerLink]="['/properties', p.id]"
                  class="py-2.5 text-center text-xs font-bold uppercase tracking-wider border border-zinc-300 text-zinc-700 hover:border-red-600 hover:text-red-600 rounded transition-colors"
                >
                  View Details
                </a>
              </div>
            </div>
          </article>
        </div>

        <!-- List View -->
        <div *ngIf="viewMode() === 'list'" class="space-y-6">
          <article
            *ngFor="let p of filtered()"
            class="group bg-white border border-zinc-200/90 rounded-sm overflow-hidden flex flex-col md:flex-row hover:border-red-500/40 hover:shadow-lg transition-all"
          >
            <div class="relative md:w-80 md:shrink-0 aspect-[4/3] md:aspect-auto overflow-hidden bg-zinc-950">
              <img [src]="p.image" [alt]="p.title" loading="lazy" class="zoom-img h-full w-full object-cover" />
              <div class="absolute left-3 top-3">
                <span class="px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider bg-red-600 text-white rounded">
                  {{ p.status }}
                </span>
              </div>
            </div>

            <div class="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between text-xs text-zinc-400 uppercase tracking-widest font-semibold mb-1">
                  <span>{{ p.category }}</span>
                  <span class="text-red-600">{{ p.location }}</span>
                </div>
                <h3 class="font-serif text-2xl md:text-3xl font-medium text-zinc-950 group-hover:text-red-600 transition-colors">
                  <a [routerLink]="['/properties', p.id]">{{ p.title }}</a>
                </h3>
                <p class="mt-2 text-xs md:text-sm text-zinc-600 leading-relaxed">{{ p.summary }}</p>

                <div class="mt-4 flex flex-wrap gap-4 text-xs text-zinc-500">
                  <span><strong>{{ p.beds }}</strong> Bedrooms</span>
                  <span><strong>{{ p.baths }}</strong> Bathrooms</span>
                  <span><strong>{{ p.size }}</strong> sqm Built</span>
                  <span><strong>Title:</strong> {{ p.titleDeed || 'Governor Consent' }}</span>
                </div>
              </div>

              <div class="mt-6 pt-4 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p class="font-sans font-bold text-2xl text-red-600 tabular-nums">
                  {{ naira(p.price) }}
                </p>
                <div class="flex gap-2">
                  <button
                    (click)="modalService.openInspection(p)"
                    class="px-4 py-2 bg-zinc-950 text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-red-600 transition-colors"
                  >
                    Schedule Tour
                  </button>
                  <a
                    [routerLink]="['/properties', p.id]"
                    class="px-4 py-2 border border-zinc-300 text-zinc-800 text-xs font-bold uppercase tracking-wider rounded hover:border-red-600 hover:text-red-600 transition-colors"
                  >
                    Full Dossier →
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  `
})
export class PropertiesHubComponent {
  modalService = inject(ModalService);

  allProperties = properties;
  search = '';
  selectedCategory = signal('All');
  selectedLocation = 'All';
  selectedBeds = 'All';
  selectedStatus = 'All';
  sortBy = 'featured';
  viewMode = signal<'grid' | 'list'>('grid');

  categories = ['All', 'Waterfront Penthouses', 'Smart Terraces', 'Luxury Villas'];
  locations = ['Banana Island', 'Ikoyi', 'Lekki Phase 1', 'Eko Atlantic'];

  naira = naira;
  waLink = waLink;

  filtered(): Property[] {
    return this.allProperties
      .filter(p => {
        const matchesSearch =
          !this.search ||
          p.title.toLowerCase().includes(this.search.toLowerCase()) ||
          p.location.toLowerCase().includes(this.search.toLowerCase()) ||
          p.summary.toLowerCase().includes(this.search.toLowerCase());

        const matchesCategory =
          this.selectedCategory() === 'All' || p.category === this.selectedCategory();

        const matchesLocation =
          this.selectedLocation === 'All' || p.location === this.selectedLocation;

        const matchesBeds =
          this.selectedBeds === 'All' || p.beds >= Number(this.selectedBeds);

        const matchesStatus =
          this.selectedStatus === 'All' || p.status === this.selectedStatus;

        return matchesSearch && matchesCategory && matchesLocation && matchesBeds && matchesStatus;
      })
      .sort((a, b) => {
        if (this.sortBy === 'price-desc') return b.price - a.price;
        if (this.sortBy === 'price-asc') return a.price - b.price;
        return 0;
      });
  }
}
