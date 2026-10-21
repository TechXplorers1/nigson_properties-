import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SubpageHeroComponent } from '../../components/subpage-hero/subpage-hero.component';
import { ModalService } from '../../services/modal.service';
import { projects, Project } from '../../models/data';

type StatusFilter = 'all' | 'completed' | 'ongoing';
type CategoryFilter = 'all' | 'Construction' | 'Property Management' | 'Short Stay';

@Component({
  selector: 'app-projects-hub',
  standalone: true,
  imports: [CommonModule, RouterLink, SubpageHeroComponent],
  template: `
    <div class="min-h-screen bg-zinc-50 text-zinc-900 font-sans flex flex-col">
      <!-- Subpage Hero -->
      <app-subpage-hero
        kicker="Track Record & Pipeline"
        title="Project"
        highlight="Portfolio"
        subtitle="Showcasing our completed architectural landmarks across Lekki, Banana Island, and Ikoyi, alongside next-generation master-planned and ongoing developments."
        [breadcrumbs]="[{ label: 'Portfolio' }]"
        bgImage="/assets/projects/whitesand-1.jpg"
      >
        <div class="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-300 font-medium">
          <span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 6 Landmark Completed Deliveries</span>
          <span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> 100% Sold Out Track Record</span>
          <span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Prime Lekki, Banana Island & Ikoyi</span>
        </div>
      </app-subpage-hero>

      <!-- Main Content Container -->
      <main class="flex-1 mx-auto max-w-7xl px-4 sm:px-6 md:px-12 py-10 w-full">

        <!-- Executive Portfolio Stats Bar -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div class="bg-white border border-zinc-200/90 rounded-2xl p-5 shadow-sm">
            <span class="text-[0.68rem] font-bold uppercase tracking-wider text-zinc-500 block">Total Portfolio Units</span>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-3xl font-serif font-bold text-zinc-950">440+</span>
              <span class="text-xs text-emerald-600 font-semibold font-sans">Units</span>
            </div>
            <p class="text-[0.7rem] text-zinc-400 mt-1">Across 8 High-Yield Developments</p>
          </div>

          <div class="bg-white border border-zinc-200/90 rounded-2xl p-5 shadow-sm">
            <span class="text-[0.68rem] font-bold uppercase tracking-wider text-zinc-500 block">Completed & Sold Out</span>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-3xl font-serif font-bold text-emerald-600">100%</span>
              <span class="text-xs text-zinc-600 font-semibold font-sans">Turnkey</span>
            </div>
            <p class="text-[0.7rem] text-zinc-400 mt-1">Delivered to European Engineering Codes</p>
          </div>

          <div class="bg-white border border-zinc-200/90 rounded-2xl p-5 shadow-sm">
            <span class="text-[0.68rem] font-bold uppercase tracking-wider text-zinc-500 block">Prime Corridors</span>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-3xl font-serif font-bold text-zinc-950">5</span>
              <span class="text-xs text-zinc-600 font-semibold font-sans">Districts</span>
            </div>
            <p class="text-[0.7rem] text-zinc-400 mt-1">Ologolo, Osapa, Banana Island, Ikoyi, Ibeju</p>
          </div>

          <div class="bg-white border border-zinc-200/90 rounded-2xl p-5 shadow-sm">
            <span class="text-[0.68rem] font-bold uppercase tracking-wider text-zinc-500 block">Ongoing Pipeline</span>
            <div class="mt-1 flex items-baseline gap-2">
              <span class="text-3xl font-serif font-bold text-red-600">2</span>
              <span class="text-xs text-red-600 font-semibold font-sans">Active Sites</span>
            </div>
            <p class="text-[0.7rem] text-zinc-400 mt-1">Master Communities & Skyline Towers</p>
          </div>
        </div>

        <!-- Filter Controls Header -->
        <div class="bg-white border border-zinc-200/90 rounded-2xl p-6 shadow-sm mb-10">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <!-- Status Tabs (Completed vs Ongoing vs All) -->
            <div>
              <label class="text-[0.65rem] font-bold uppercase tracking-wider text-zinc-400 block mb-2">Development Status</label>
              <div class="inline-flex p-1 bg-zinc-100 rounded-xl gap-1">
                <button
                  (click)="setStatusFilter('all')"
                  class="px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer"
                  [ngClass]="statusFilter() === 'all' ? 'bg-zinc-950 text-white shadow-sm' : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/70'"
                >
                  All Projects ({{ allProjects.length }})
                </button>
                <button
                  (click)="setStatusFilter('completed')"
                  class="px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                  [ngClass]="statusFilter() === 'completed' ? 'bg-emerald-600 text-white shadow-sm' : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/70'"
                >
                  <span class="w-1.5 h-1.5 rounded-full" [ngClass]="statusFilter() === 'completed' ? 'bg-white' : 'bg-emerald-500'"></span>
                  Completed Projects ({{ completedCount() }})
                </button>
                <button
                  (click)="setStatusFilter('ongoing')"
                  class="px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                  [ngClass]="statusFilter() === 'ongoing' ? 'bg-red-600 text-white shadow-sm' : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/70'"
                >
                  <span class="w-1.5 h-1.5 rounded-full" [ngClass]="statusFilter() === 'ongoing' ? 'bg-white' : 'bg-red-500'"></span>
                  Ongoing Developments ({{ ongoingCount() }})
                </button>
              </div>
            </div>

            <!-- Category Filter Chips -->
            <div>
              <label class="text-[0.65rem] font-bold uppercase tracking-wider text-zinc-400 block mb-2">Category Filter</label>
              <div class="flex flex-wrap items-center gap-2">
                <button
                  *ngFor="let cat of categories"
                  (click)="setCategoryFilter(cat)"
                  class="px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer"
                  [ngClass]="categoryFilter() === cat 
                    ? 'bg-red-600 text-white border-red-600 shadow-sm' 
                    : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'"
                >
                  {{ cat === 'all' ? 'All Categories' : cat }}
                </button>
              </div>
            </div>

            <!-- View Switcher: Dossiers vs Table -->
            <div class="flex items-center gap-2 self-start lg:self-end">
              <span class="text-xs text-zinc-500">View:</span>
              <button
                (click)="viewMode.set('cards')"
                class="px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5"
                [ngClass]="viewMode() === 'cards' ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100'"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
                Detailed Dossiers
              </button>
              <button
                (click)="viewMode.set('table')"
                class="px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5"
                [ngClass]="viewMode() === 'table' ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100'"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                Portfolio Table
              </button>
            </div>
          </div>
        </div>

        <!-- VIEW 1: EXECUTIVE PORTFOLIO TABLE -->
        <section *ngIf="viewMode() === 'table'" class="mb-14 bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
          <div class="px-6 py-5 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-50/60">
            <div>
              <h3 class="font-serif text-lg font-bold text-zinc-950">Executive Project Portfolio Ledger</h3>
              <p class="text-xs text-zinc-500">Comprehensive inventory of completed deliveries and ongoing developments</p>
            </div>
            <span class="text-xs font-bold px-3 py-1 bg-zinc-200 text-zinc-700 rounded-full self-start sm:self-auto">
              {{ filteredProjects().length }} Records Found
            </span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="border-b border-zinc-200 bg-zinc-50/90 text-zinc-500 uppercase tracking-wider text-[0.68rem] font-bold">
                  <th class="py-4 px-6">Property / Project</th>
                  <th class="py-4 px-6">Location</th>
                  <th class="py-4 px-6 text-center">Units</th>
                  <th class="py-4 px-6">Status</th>
                  <th class="py-4 px-6">Category</th>
                  <th class="py-4 px-6 text-center">Execution</th>
                  <th class="py-4 px-6 text-right">Dossier</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-zinc-100 font-sans">
                <tr *ngFor="let pr of filteredProjects()" class="hover:bg-zinc-50/80 transition-colors">
                  <td class="py-4 px-6">
                    <div class="flex items-center gap-3">
                      <img [src]="pr.image" [alt]="pr.name" class="w-12 h-10 object-cover rounded-lg border border-zinc-200 shrink-0 shadow-xs" />
                      <div>
                        <a [routerLink]="['/projects', pr.id]" class="font-bold text-zinc-950 hover:text-red-600 transition-colors text-sm">
                          {{ pr.name }}
                        </a>
                        <span class="text-[0.7rem] text-zinc-400 block line-clamp-1">{{ pr.tagline }}</span>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-6 font-medium text-zinc-700">
                    <span class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                      {{ pr.location }}
                    </span>
                  </td>
                  <td class="py-4 px-6 text-center">
                    <span class="inline-block px-2.5 py-1 bg-zinc-100 text-zinc-800 font-bold rounded-lg tabular-nums">
                      {{ pr.unitCount ? pr.unitCount : pr.units }}
                    </span>
                  </td>
                  <td class="py-4 px-6">
                    <span
                      class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.68rem] font-bold uppercase tracking-wider"
                      [ngClass]="{
                        'bg-emerald-100 text-emerald-800 border border-emerald-200': pr.status === 'Completed & Sold Out',
                        'bg-teal-100 text-teal-800 border border-teal-200': pr.status === 'Completed',
                        'bg-amber-100 text-amber-800 border border-amber-200': pr.status === 'Shortlet',
                        'bg-red-100 text-red-800 border border-red-200': pr.status === 'Under Construction' || pr.status === 'Ongoing'
                      }"
                    >
                      <span *ngIf="pr.status.includes('Completed')" class="text-xs">✓</span>
                      <span *ngIf="pr.status === 'Shortlet'" class="text-xs">★</span>
                      <span *ngIf="pr.status.includes('Construction')" class="text-xs">⚡</span>
                      {{ pr.status }}
                    </span>
                  </td>
                  <td class="py-4 px-6">
                    <span class="px-2.5 py-1 bg-zinc-100 text-zinc-700 font-semibold rounded text-[0.7rem] uppercase tracking-wider">
                      {{ pr.category }}
                    </span>
                  </td>
                  <td class="py-4 px-6 text-center">
                    <div class="inline-flex flex-col items-center">
                      <span class="font-bold text-xs" [ngClass]="pr.progress === 100 ? 'text-emerald-600' : 'text-red-600'">
                        {{ pr.progress }}%
                      </span>
                      <div class="w-16 bg-zinc-200 h-1 rounded-full overflow-hidden mt-1">
                        <div
                          class="h-full rounded-full"
                          [ngClass]="pr.progress === 100 ? 'bg-emerald-500' : 'bg-red-600'"
                          [style.width.%]="pr.progress"
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-6 text-right">
                    <a
                      [routerLink]="['/projects', pr.id]"
                      class="inline-flex items-center gap-1 px-3 py-1.5 bg-zinc-950 hover:bg-red-600 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <span>Explore</span>
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- VIEW 2: DETAILED ARCHITECTURAL DOSSIER CARDS -->
        <div class="space-y-16">
          <article
            *ngFor="let pr of filteredProjects(); let i = index"
            class="group bg-white border border-zinc-200/90 rounded-3xl overflow-hidden shadow-sm hover:border-red-500/40 hover:shadow-2xl transition-all duration-300"
          >
            <div class="grid lg:grid-cols-12 gap-0">
              
              <!-- Visual Gallery Preview (7 cols) -->
              <div class="lg:col-span-7 relative bg-zinc-950 flex flex-col justify-between overflow-hidden">
                <!-- Main Image Preview with Aspect Ratio -->
                <div class="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[480px] overflow-hidden">
                  <img
                    [src]="activeImages[pr.id] || pr.image"
                    [alt]="pr.name"
                    class="w-full h-full object-cover zoom-img transition-all duration-500"
                  />

                  <!-- Gradient Overlay -->
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>

                  <!-- ROI / Appreciation Tag -->
                  <div class="absolute left-6 top-6 bg-red-600 text-white px-4 py-2.5 rounded-xl text-center shadow-lg">
                    <div class="font-sans font-bold text-2xl leading-none tabular-nums">+{{ pr.roi }}%</div>
                    <div class="text-[0.58rem] font-bold uppercase tracking-widest mt-0.5">Annual Appreciation</div>
                  </div>

                  <!-- Status Badge Overlay -->
                  <div class="absolute right-6 top-6">
                    <span
                      class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md backdrop-blur-md"
                      [ngClass]="{
                        'bg-emerald-600/95 text-white': pr.status === 'Completed & Sold Out',
                        'bg-teal-700/95 text-white': pr.status === 'Completed',
                        'bg-amber-500/95 text-white': pr.status === 'Shortlet',
                        'bg-red-600/95 text-white': pr.status === 'Under Construction' || pr.status === 'Ongoing'
                      }"
                    >
                      <span *ngIf="pr.status.includes('Completed')">✓</span>
                      <span *ngIf="pr.status === 'Shortlet'">★</span>
                      <span *ngIf="pr.status.includes('Construction')">⚡</span>
                      {{ pr.status }}
                    </span>
                  </div>

                  <!-- Category & Location Floating Pill -->
                  <div class="absolute left-6 bottom-20 right-6 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                    <span class="bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-white text-xs font-bold uppercase tracking-wider border border-white/10">
                      {{ pr.category }}
                    </span>
                    <span class="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-white text-xs font-medium flex items-center gap-1 border border-white/10">
                      <svg class="w-3.5 h-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                      {{ pr.location }}
                    </span>
                  </div>
                </div>

                <!-- Interactive Multi-Photo Gallery Thumbnail Strip -->
                <div *ngIf="pr.renderings && pr.renderings.length > 1" class="p-3 bg-zinc-900 border-t border-zinc-800 flex items-center gap-2.5 overflow-x-auto">
                  <span class="text-[0.65rem] font-bold uppercase tracking-wider text-zinc-400 px-2 shrink-0">Site Photos:</span>
                  <button
                    *ngFor="let photo of pr.renderings; let idx = index"
                    (click)="setActiveImage(pr.id, photo)"
                    class="relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer"
                    [ngClass]="(activeImages[pr.id] || pr.image) === photo ? 'border-red-500 scale-105' : 'border-zinc-700 opacity-60 hover:opacity-100'"
                  >
                    <img [src]="photo" [alt]="pr.name + ' Photo ' + (idx + 1)" class="w-full h-full object-cover" />
                  </button>
                </div>
              </div>

              <!-- Data & Specifications Matrix (5 cols) -->
              <div class="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between bg-white">
                <div>
                  <!-- Location Kicker & Title -->
                  <div class="flex items-center gap-2">
                    <p class="kicker text-red-600">{{ pr.location }}</p>
                    <span class="text-zinc-300">·</span>
                    <span class="text-xs font-bold text-zinc-500 uppercase tracking-wider">{{ pr.units }}</span>
                  </div>

                  <h2 class="font-serif text-3xl sm:text-4xl font-medium text-zinc-950 mt-1">
                    <a [routerLink]="['/projects', pr.id]" class="hover:text-red-600 transition-colors">
                      {{ pr.name }}
                    </a>
                  </h2>

                  <p class="mt-2 text-xs text-zinc-400 italic font-serif">
                    "{{ pr.tagline }}"
                  </p>

                  <p class="mt-4 text-xs md:text-sm text-zinc-600 leading-relaxed font-light">
                    {{ pr.description }}
                  </p>

                  <!-- Construction Progress / Delivery Box -->
                  <div class="mt-6 p-4 bg-zinc-50 border border-zinc-200/80 rounded-2xl">
                    <div class="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-2">
                      <span class="flex items-center gap-1.5">
                        <span class="w-2 h-2 rounded-full" [ngClass]="pr.progress === 100 ? 'bg-emerald-500' : 'bg-red-500'"></span>
                        {{ pr.progress === 100 ? 'Turnkey Delivery Status' : 'Live Site Execution' }}
                      </span>
                      <span class="font-bold font-sans tabular-nums" [ngClass]="pr.progress === 100 ? 'text-emerald-600' : 'text-red-600'">
                        {{ pr.progress }}%
                      </span>
                    </div>

                    <div class="h-2 w-full bg-zinc-200 rounded-full overflow-hidden">
                      <div
                        class="h-full rounded-full transition-all duration-1000"
                        [ngClass]="pr.progress === 100 ? 'bg-emerald-500' : 'bg-red-600'"
                        [style.width.%]="pr.progress"
                      ></div>
                    </div>

                    <div class="mt-3 flex justify-between items-center text-[0.7rem] text-zinc-500 border-t border-zinc-200/60 pt-2">
                      <span class="font-semibold text-zinc-700 flex items-center gap-1">
                        <strong class="text-zinc-900">{{ pr.unitCount ? pr.unitCount : pr.units }}</strong>
                      </span>
                      <span class="font-bold px-2 py-0.5 rounded text-[0.68rem]" [ngClass]="pr.progress === 100 ? 'bg-emerald-100 text-emerald-800' : 'bg-zinc-200 text-zinc-800'">
                        {{ pr.handover }}
                      </span>
                    </div>
                  </div>

                  <!-- Key Engineering Features -->
                  <div class="mt-6">
                    <span class="text-[0.68rem] font-bold uppercase tracking-wider text-zinc-400 block mb-2.5">Key Pillars & Specifications</span>
                    <ul class="space-y-2 text-xs text-zinc-700">
                      <li *ngFor="let f of pr.features.slice(0, 4)" class="flex items-start gap-2.5">
                        <svg class="w-4 h-4 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        <span>{{ f }}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <!-- Action CTA Row -->
                <div class="mt-8 pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    [routerLink]="['/projects', pr.id]"
                    class="btn-sweep flex-1 w-full text-center py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all block cursor-pointer shadow-sm"
                  >
                    View Project Dossier →
                  </a>
                  <button
                    (click)="modalService.openInspection()"
                    class="w-full sm:w-auto px-5 py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm text-center"
                  >
                    Schedule Tour
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- Diaspora & Institutional Consultation Banner -->
        <section class="mt-20 p-8 sm:p-12 bg-zinc-950 text-white rounded-3xl shadow-xl relative overflow-hidden border border-white/10">
          <div class="absolute -right-20 -bottom-20 w-80 h-80 bg-red-600/20 rounded-full blur-3xl pointer-events-none"></div>
          <div class="max-w-2xl relative z-10">
            <span class="text-xs font-bold uppercase tracking-widest text-red-500 block mb-2">Institutional Advisory</span>
            <h2 class="font-serif text-3xl sm:text-4xl font-medium">Looking to Partner on Upcoming Developments?</h2>
            <p class="mt-3 text-sm text-zinc-400 font-light leading-relaxed">
              From syndicated off-plan bulk acquisitions and JV land developments to institutional facility management, Nigson Properties provides institutional rigor and transparent title heritage.
            </p>
            <div class="mt-8 flex flex-wrap gap-4">
              <button
                (click)="modalService.openConsultation()"
                class="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-md"
              >
                Book Executive Consultation
              </button>
              <a
                routerLink="/contact"
                class="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer border border-white/20"
              >
                Contact Investment Desk
              </a>
            </div>
          </div>
        </section>

      </main>
    </div>
  `
})
export class ProjectsHubComponent {
  modalService = inject(ModalService);
  allProjects: Project[] = projects;

  // Active status filter: 'all' | 'completed' | 'ongoing'
  statusFilter = signal<StatusFilter>('all');
  
  // Active category filter: 'all' | 'Construction' | 'Property Management' | 'Short Stay'
  categoryFilter = signal<CategoryFilter>('all');

  // View mode: 'cards' or 'table'
  viewMode = signal<'cards' | 'table'>('cards');

  // Categories list
  categories: CategoryFilter[] = ['all', 'Construction', 'Property Management', 'Short Stay'];

  // Map of active image preview per project
  activeImages: { [id: string]: string } = {};

  completedCount = computed(() => {
    return this.allProjects.filter(p => p.statusType === 'completed' || p.progress === 100).length;
  });

  ongoingCount = computed(() => {
    return this.allProjects.filter(p => p.statusType === 'ongoing' || p.progress < 100).length;
  });

  filteredProjects = computed(() => {
    let list = this.allProjects;

    // Filter by status
    const status = this.statusFilter();
    if (status === 'completed') {
      list = list.filter(p => p.statusType === 'completed' || p.progress === 100);
    } else if (status === 'ongoing') {
      list = list.filter(p => p.statusType === 'ongoing' || p.progress < 100);
    }

    // Filter by category
    const cat = this.categoryFilter();
    if (cat !== 'all') {
      list = list.filter(p => p.category === cat);
    }

    return list;
  });

  setStatusFilter(status: StatusFilter) {
    this.statusFilter.set(status);
  }

  setCategoryFilter(category: CategoryFilter) {
    this.categoryFilter.set(category);
  }

  setActiveImage(projectId: string, imageUrl: string) {
    this.activeImages[projectId] = imageUrl;
  }
}
