import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import {
  properties,
  projects,
  suites,
  testimonials,
  naira,
  waLink,
  Property,
  Project,
  Suite,
  Testimonial,
  Category
} from '../../models/data';

interface ServiceItem {
  num: string;
  title: string;
  desc: string;
  image: string;
  tag: string;
}

interface WhyChooseItem {
  title: string;
  desc: string;
  iconName: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="overflow-x-hidden font-sans bg-white text-zinc-900">
      <!-- HERO SECTION -->
      <section id="home" class="relative flex min-h-[92vh] flex-col justify-end bg-[#0B0C10] pt-[72px]">
        <img
          src="/assets/hero.jpg"
          alt="Nigson waterfront villa at dusk"
          class="absolute inset-0 h-full w-full object-cover filter brightness-[0.75] contrast-[1.05]"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30 pointer-events-none"></div>

        <div class="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12 pb-20 pt-24 text-white">
          <p class="kicker text-red-500 mb-3 tracking-[0.35em]">Luxury Real Estate · Lagos & Abuja</p>
          <h1 class="max-w-6xl font-serif text-4xl leading-[1.05] sm:text-5xl md:text-6xl lg:text-[4.6rem] xl:text-[5.25rem] text-white drop-shadow-md">
            <span class="block">Redefining <em class="text-red-500 font-serif italic">Architectural Luxury</em></span>
            <span class="block">Across Lagos & Abuja</span>
          </h1>

          <p class="mt-6 max-w-xl text-base text-zinc-200/95 md:text-lg font-light leading-relaxed">
            Curating bespoke waterfront residences, smart penthouses, and green communities with guaranteed 24/7 clean energy and unencumbered titles.
          </p>

          <div class="mt-9 flex flex-wrap gap-4">
            <a
              routerLink="/properties"
              class="btn-sweep flex items-center gap-2 bg-red-600 hover:bg-red-700 px-7 py-4 text-xs font-bold uppercase tracking-[0.25em] text-white rounded transition-all shadow-lg"
            >
              Explore Developments
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </a>
            <button
              (click)="modalService.openInspection()"
              class="btn-sweep border border-white/60 bg-black/30 backdrop-blur-sm px-7 py-4 text-xs font-bold uppercase tracking-[0.25em] text-white hover:bg-white hover:text-zinc-950 rounded transition-all"
            >
              Schedule Private Tour
            </button>
          </div>
        </div>
      </section>

      <!-- THE NIGSON STANDARD INTRO -->
      <section class="bg-white py-24 md:py-32">
        <div class="mx-auto grid max-w-7xl gap-12 px-6 md:px-12 md:grid-cols-2 md:gap-20">
          <div>
            <p class="kicker text-red-600">The Nigson Standard</p>
            <blockquote class="mt-6 font-serif text-4xl italic leading-tight text-zinc-950 md:text-5xl">
              “We don’t just build structures; we craft <span class="text-red-600 font-serif not-italic">generational wealth</span> and iconic skylines.”
            </blockquote>
          </div>
          <div class="flex flex-col justify-end text-zinc-600">
            <p class="text-base md:text-lg leading-relaxed">
              Every Nigson residence is engineered to European structural and finishing standards — German fittings, Italian stone, and independent solar microgrids — then placed on the most coveted addresses in Lagos: Lekki Phase 1, Ikoyi, and Banana Island.
            </p>
            <p class="mt-5 text-base md:text-lg leading-relaxed">
              Each title is verified before sale, with Governor’s Consent and C of O guaranteed, so your investment is as secure as it is beautiful.
            </p>
            <button
              (click)="modalService.openInspection()"
              class="mt-8 self-start border-b border-red-600 pb-1 text-xs font-bold uppercase tracking-[0.3em] text-red-600 transition hover:border-zinc-950 hover:text-zinc-950"
            >
              Book a private consultation →
            </button>
          </div>
        </div>
      </section>

      <!-- PROPERTIES SHOWCASE -->
      <section id="properties" class="bg-[#FAF9F6] py-24 md:py-32 border-t border-zinc-200/60">
        <div class="mx-auto max-w-7xl px-6 md:px-12">
          <div class="mx-auto mb-14 max-w-3xl text-center">
            <p class="kicker text-red-600">Curated Portfolio</p>
            <h2 class="mt-4 font-serif text-4xl leading-[1.05] md:text-6xl text-zinc-950">
              Signature Residences & <em class="text-red-600 font-serif italic">Waterfront Villas</em>
            </h2>
            <p class="mt-4 text-zinc-500 text-sm md:text-base">
              Explore meticulously finished luxury townhomes, private beachfront compounds, and sky penthouses with uncompromised land documentation.
            </p>
          </div>

          <!-- Category Filter Tabs -->
          <div class="mb-12 flex flex-wrap justify-center gap-2">
            <button
              *ngFor="let tab of tabs"
              (click)="activeTab.set(tab)"
              class="px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.22em] rounded transition-all"
              [ngClass]="activeTab() === tab ? 'bg-zinc-950 text-white shadow-md' : 'bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200'"
            >
              {{ tab }}
            </button>
          </div>

          <!-- Properties Grid -->
          <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <article
              *ngFor="let p of filteredProperties()"
              (click)="modalService.openQuickView(p)"
              class="lux-card group cursor-pointer bg-white border border-zinc-200/80 rounded-sm overflow-hidden flex flex-col"
            >
              <div class="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                <img
                  [src]="p.image"
                  [alt]="p.title"
                  loading="lazy"
                  class="zoom-img h-full w-full object-cover"
                />
                <div class="absolute left-4 top-4 flex gap-2">
                  <span class="flex items-center gap-1 bg-white/95 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.15em] text-zinc-900 shadow-sm">
                    <svg class="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                    {{ p.location }}
                  </span>
                  <span
                    class="px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.15em] text-white shadow-sm"
                    [ngClass]="p.status === 'Off-Plan' ? 'bg-red-600' : 'bg-zinc-950'"
                  >
                    {{ p.status }}
                  </span>
                </div>

                <!-- Hover Overlay -->
                <div class="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition duration-300 group-hover:opacity-100">
                  <button
                    (click)="modalService.openQuickView(p); $event.stopPropagation()"
                    class="flex items-center gap-1.5 bg-white text-zinc-950 px-4 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] rounded"
                  >
                    Quick Preview
                  </button>
                  <button
                    (click)="modalService.openInspection(p); $event.stopPropagation()"
                    class="flex items-center gap-1.5 bg-red-600 text-white px-4 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] rounded"
                  >
                    Inspect
                  </button>
                </div>
              </div>

              <div class="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p class="text-[0.65rem] uppercase tracking-[0.25em] text-zinc-400 font-semibold">{{ p.category }}</p>
                  <h3 class="mt-2 text-2xl font-serif text-zinc-950 leading-tight group-hover:text-red-600 transition-colors">
                    {{ p.title }}
                  </h3>
                  <div class="mt-5 flex items-center gap-4 border-y border-zinc-100 py-3 text-xs text-zinc-500">
                    <span>{{ p.beds }} Beds</span>
                    <span>{{ p.baths }} Baths</span>
                    <span>{{ p.size }} sqm</span>
                    <span class="ml-auto flex items-center gap-1 text-red-600 font-medium">Solar 24/7</span>
                  </div>
                </div>

                <div class="mt-5 flex items-center justify-between">
                  <p class="font-sans font-bold text-2xl tracking-tight text-red-600 tabular-nums">
                    {{ naira(p.price) }}
                  </p>
                  <a
                    [routerLink]="['/properties', p.id]"
                    (click)="$event.stopPropagation()"
                    class="text-xs uppercase tracking-wider font-bold text-zinc-700 hover:text-red-600 transition-colors"
                  >
                    Details →
                  </a>
                </div>
              </div>
            </article>
          </div>

          <!-- View All Properties Button -->
          <div class="mt-14 text-center">
            <a
              routerLink="/properties"
              class="btn-sweep inline-flex items-center gap-3 px-8 py-4 bg-zinc-950 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-[0.22em] rounded transition-all shadow-md group cursor-pointer"
            >
              <span>View All Properties</span>
              <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <!-- MASTER-PLANNED DEVELOPMENTS -->
      <section id="projects" class="bg-white py-24 md:py-32">
        <div class="mx-auto max-w-7xl px-6 md:px-12">
          <div class="mx-auto mb-12 max-w-3xl text-center">
            <p class="kicker text-red-600">Track Record & Pipeline</p>
            <h2 class="mt-4 font-serif text-4xl leading-[1.05] md:text-6xl text-zinc-950">
              Project <em class="text-red-600 font-serif italic">Portfolio Matrix</em>
            </h2>
            <p class="mt-4 text-zinc-500 text-sm md:text-base">
              Showcasing 100% completed & sold-out architectural landmarks across Lekki, Banana Island, and Ikoyi, alongside next-generation master developments.
            </p>

            <!-- Status Tabs for Completed vs Ongoing -->
            <div class="mt-8 inline-flex p-1.5 bg-zinc-100 rounded-2xl gap-1">
              <button
                (click)="projectTab.set('all')"
                class="px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                [ngClass]="projectTab() === 'all' ? 'bg-zinc-950 text-white shadow-sm' : 'text-zinc-600 hover:text-zinc-950'"
              >
                All Developments ({{ allProjects.length }})
              </button>
              <button
                (click)="projectTab.set('completed')"
                class="px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                [ngClass]="projectTab() === 'completed' ? 'bg-emerald-600 text-white shadow-sm' : 'text-zinc-600 hover:text-zinc-950'"
              >
                <span class="w-1.5 h-1.5 rounded-full" [ngClass]="projectTab() === 'completed' ? 'bg-white' : 'bg-emerald-500'"></span>
                Completed Deliveries (6)
              </button>
              <button
                (click)="projectTab.set('ongoing')"
                class="px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                [ngClass]="projectTab() === 'ongoing' ? 'bg-red-600 text-white shadow-sm' : 'text-zinc-600 hover:text-zinc-950'"
              >
                <span class="w-1.5 h-1.5 rounded-full" [ngClass]="projectTab() === 'ongoing' ? 'bg-white' : 'bg-red-500'"></span>
                Ongoing Developments (2)
              </button>
            </div>
          </div>

          <div class="grid gap-8 lg:grid-cols-2">
            <div
              *ngFor="let pr of filteredHomeProjects()"
              class="lux-card group flex flex-col bg-[#0B0C10] text-white rounded-3xl overflow-hidden border border-white/10 hover:border-red-600/40 transition-all shadow-xl"
            >
              <div class="relative aspect-[16/10] overflow-hidden">
                <img [src]="pr.image" [alt]="pr.name" loading="lazy" class="zoom-img h-full w-full object-cover" />
                
                <!-- Status Badge Overlay -->
                <div class="absolute left-4 top-4">
                  <span
                    class="px-3 py-1.5 rounded-full text-[0.65rem] font-bold uppercase tracking-wider backdrop-blur-md shadow-md"
                    [ngClass]="{
                      'bg-emerald-600/95 text-white': pr.status === 'Completed & Sold Out',
                      'bg-teal-700/95 text-white': pr.status === 'Completed',
                      'bg-amber-500/95 text-white': pr.status === 'Shortlet',
                      'bg-red-600/95 text-white': pr.status === 'Under Construction' || pr.status === 'Ongoing'
                    }"
                  >
                    <span *ngIf="pr.status.includes('Completed')">✓ </span>
                    <span *ngIf="pr.status === 'Shortlet'">★ </span>
                    <span *ngIf="pr.status.includes('Construction')">⚡ </span>
                    {{ pr.status }}
                  </span>
                </div>

                <!-- ROI Appreciation Pill -->
                <div class="absolute right-4 top-4 bg-red-600 px-3.5 py-2 text-center text-white rounded-xl shadow-lg">
                  <div class="font-sans font-bold text-2xl leading-none tracking-tight tabular-nums">+{{ pr.roi }}%</div>
                  <div class="text-[0.55rem] font-bold uppercase tracking-[0.15em]">Annual Appreciation</div>
                </div>

                <!-- Category Pill -->
                <div class="absolute right-4 bottom-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded text-white text-[0.68rem] font-bold uppercase tracking-wider border border-white/10">
                  {{ pr.category }}
                </div>
              </div>

              <div class="flex flex-1 flex-col p-8">
                <div class="flex items-center justify-between">
                  <p class="kicker text-red-500">{{ pr.location }}</p>
                  <span class="px-2.5 py-0.5 rounded text-[0.7rem] font-bold bg-white/10 text-white tabular-nums">
                    {{ pr.unitCount ? (pr.unitCount + ' Units') : pr.units }}
                  </span>
                </div>

                <h3 class="mt-2 font-serif text-3xl md:text-4xl text-white">
                  <a [routerLink]="['/projects', pr.id]" class="hover:text-red-500 transition-colors">
                    {{ pr.name }}
                  </a>
                </h3>
                <p class="mt-1 text-xs text-zinc-400 line-clamp-2">{{ pr.tagline }}</p>

                <div class="mt-6">
                  <div class="flex justify-between text-xs uppercase tracking-[0.2em] text-zinc-300 font-medium">
                    <span class="flex items-center gap-1.5">
                      <span class="w-1.5 h-1.5 rounded-full" [ngClass]="pr.progress === 100 ? 'bg-emerald-500' : 'bg-red-500'"></span>
                      {{ pr.progress }}% Executed
                    </span>
                    <span>{{ pr.handover }}</span>
                  </div>
                  <div class="mt-2 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      class="h-full rounded-full transition-all duration-1000"
                      [ngClass]="pr.progress === 100 ? 'bg-emerald-500' : 'bg-red-600'"
                      [style.width.%]="pr.progress"
                    ></div>
                  </div>
                </div>

                <ul class="mt-6 grid grid-cols-2 gap-2.5 text-xs text-zinc-300">
                  <li *ngFor="let f of pr.features.slice(0, 4)" class="flex items-center gap-2">
                    <svg class="w-3.5 h-3.5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span class="truncate">{{ f }}</span>
                  </li>
                </ul>

                <div class="mt-8">
                  <a
                    [routerLink]="['/projects', pr.id]"
                    class="btn-sweep w-full py-3.5 bg-white hover:bg-red-600 text-zinc-950 hover:text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <span>Explore Development Dossier</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- View All Developments / Projects Button -->
          <div class="mt-14 text-center">
            <a
              routerLink="/projects"
              class="btn-sweep inline-flex items-center gap-3 px-8 py-4 bg-zinc-950 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-[0.22em] rounded transition-all shadow-md group cursor-pointer"
            >
              <span>View All Developments & Projects</span>
              <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <!-- SHORT STAY SECTION -->
      <section id="shortstay" class="relative bg-[#0B0C10] py-24 md:py-32 text-white">
        <div class="relative mx-auto max-w-7xl px-6 md:px-12">
          <div class="mx-auto mb-14 max-w-3xl text-center">
            <p class="kicker text-red-500">Hospitality & Executive Living</p>
            <h2 class="mt-4 font-serif text-4xl leading-[1.05] md:text-6xl text-white">
              Luxury Short Stay <em class="text-red-500 font-serif italic">Apartments & Suites</em>
            </h2>
            <p class="mt-4 text-zinc-400 text-sm md:text-base">
              Experience 5-star hotel luxury with the privacy of a private residence in Lagos's most exclusive enclaves.
            </p>
          </div>

          <div class="grid gap-8 md:grid-cols-3">
            <div
              *ngFor="let s of allSuites"
              class="lux-card group border border-white/10 bg-[#16171F] rounded overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div class="aspect-[4/3] overflow-hidden">
                  <img [src]="s.image" [alt]="s.name" loading="lazy" class="zoom-img h-full w-full object-cover" />
                </div>
                <div class="p-6">
                  <p class="text-[0.62rem] uppercase tracking-[0.25em] text-red-500 font-semibold">{{ s.location }}</p>
                  <h3 class="mt-2 text-2xl font-serif text-white">{{ s.name }}</h3>
                  <div class="mt-4 flex flex-wrap gap-1.5">
                    <span *ngFor="let a of s.amenities.slice(0, 4)" class="border border-red-500/30 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.12em] text-zinc-300">
                      {{ a }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="p-6 pt-0">
                <p class="font-sans font-bold text-2xl tracking-tight text-white tabular-nums">
                  {{ naira(s.rate) }} <span class="text-xs font-normal text-zinc-400">/ Night</span>
                </p>
                <div class="mt-4 flex gap-2">
                  <a
                    [href]="waLink('Hello Nigson Concierge, I would like to reserve the ' + s.name + ' (' + s.location + ') at ' + naira(s.rate) + '/night.')"
                    target="_blank"
                    class="btn-sweep flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-emerald-600 text-white py-3 text-xs font-bold uppercase tracking-wider rounded transition-all"
                  >
                    Reserve on WhatsApp
                  </a>
                  <a
                    [routerLink]="['/short-stay', s.id]"
                    class="px-4 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider rounded text-center transition-colors"
                  >
                    Suite Page
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- View All Short-Stay Suites Button -->
          <div class="mt-14 text-center">
            <a
              routerLink="/short-stay"
              class="btn-sweep inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-red-600 text-zinc-950 hover:text-white font-bold text-xs uppercase tracking-[0.22em] rounded transition-all shadow-md group cursor-pointer"
            >
              <span>View All Short-Stay Suites</span>
              <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <!-- 6 CORE CAPABILITIES (INTERACTIVE BOOKSHELF ACCORDION) -->
      <section id="services" class="bg-white py-24 md:py-32">
        <div class="mx-auto max-w-7xl px-6 md:px-12">
          <div class="mx-auto mb-14 max-w-3xl text-center">
            <p class="kicker text-red-600">Integrated Expertise</p>
            <h2 class="mt-4 font-serif text-4xl leading-[1.05] md:text-6xl text-zinc-950">
              Our 6 Core <em class="text-red-600 font-serif italic">Capabilities</em>
            </h2>
            <p class="mt-4 text-zinc-500 text-sm md:text-base">
              Click on each capability tab to explore how Nigson safeguards investments across the property value chain.
            </p>
          </div>

          <!-- DESKTOP BOOKSHELF ACCORDION (md and up) -->
          <div class="hidden md:flex gap-3.5 h-[530px] items-stretch">
            <div
              *ngFor="let s of allServices; let i = index"
              (click)="activeService.set(i)"
              class="group relative rounded-3xl transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden cursor-pointer"
              [ngClass]="activeService() === i
                ? 'flex-1 bg-[#181716] border border-[#2d2b29] p-8 lg:p-9 shadow-2xl cursor-default'
                : 'w-16 lg:w-20 shrink-0 bg-[#181716] hover:bg-[#201e1d] border border-white/5 hover:border-red-500/40 flex flex-col justify-between items-center py-7 px-2'"
            >
              <!-- Expanded State -->
              <div *ngIf="activeService() === i" class="flex flex-col justify-between h-full w-full animate-fadeIn">
                <div class="flex items-start gap-6 lg:gap-8">
                  <span class="font-sans font-bold text-4xl sm:text-5xl lg:text-6xl text-red-500 tabular-nums leading-none tracking-tight shrink-0 select-none">
                    {{ s.num }}
                  </span>
                  <div>
                    <h3 class="font-serif text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
                      {{ s.title }}
                    </h3>
                    <p class="mt-2.5 text-sm lg:text-base text-zinc-300 leading-relaxed max-w-2xl font-light">
                      {{ s.desc }}
                    </p>
                  </div>
                </div>

                <div class="mt-6 relative w-full h-[280px] lg:h-[310px] rounded-2xl overflow-hidden shadow-2xl group/img">
                  <img
                    [src]="s.image"
                    [alt]="s.title"
                    class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                  <div class="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                    <span class="rounded-full bg-black/60 backdrop-blur-md px-3.5 py-1 text-[0.7rem] uppercase tracking-widest text-zinc-200 font-medium border border-white/10">
                      {{ s.tag }}
                    </span>
                    <a
                      [href]="waLink('Hello Nigson Concierge, I would like to enquire about your ' + s.title + ' capability.')"
                      target="_blank"
                      (click)="$event.stopPropagation()"
                      class="flex items-center gap-1.5 text-xs text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full font-medium tracking-wide transition-all shadow-lg"
                    >
                      Enquire via Concierge
                    </a>
                  </div>
                </div>
              </div>

              <!-- Collapsed Spine State -->
              <ng-container *ngIf="activeService() !== i">
                <span class="font-sans font-bold text-2xl lg:text-3xl text-red-500 tabular-nums tracking-tight select-none">
                  {{ s.num }}
                </span>
                <div class="flex-1 flex items-center justify-center py-6 overflow-hidden">
                  <span class="[writing-mode:vertical-rl] rotate-180 text-xs font-medium tracking-[0.2em] text-zinc-400 uppercase select-none transition-colors group-hover:text-white whitespace-nowrap">
                    {{ s.title }}
                  </span>
                </div>
                <div class="text-zinc-500 group-hover:text-red-500 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </ng-container>
            </div>
          </div>

          <!-- MOBILE ACCORDION (< md) -->
          <div class="flex md:hidden flex-col gap-3">
            <div
              *ngFor="let s of allServices; let i = index"
              (click)="activeService.set(activeService() === i ? -1 : i)"
              class="rounded-2xl transition-all duration-300 overflow-hidden border"
              [ngClass]="activeService() === i
                ? 'bg-[#181716] border-[#2d2b29] p-5 shadow-xl'
                : 'bg-[#181716] border-white/5 p-4 flex items-center justify-between cursor-pointer'"
            >
              <div *ngIf="activeService() === i">
                <div class="flex items-start gap-4">
                  <span class="font-sans font-bold text-3xl text-red-500 tabular-nums leading-none tracking-tight shrink-0">
                    {{ s.num }}
                  </span>
                  <div>
                    <h3 class="font-serif text-xl text-white leading-tight">
                      {{ s.title }}
                    </h3>
                    <p class="mt-2 text-xs text-zinc-300 leading-relaxed">
                      {{ s.desc }}
                    </p>
                  </div>
                </div>
                <div class="mt-4 relative w-full h-52 rounded-xl overflow-hidden shadow-lg">
                  <img [src]="s.image" [alt]="s.title" class="w-full h-full object-cover" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                  <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span class="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[0.65rem] uppercase tracking-wider text-zinc-200 border border-white/10">
                      {{ s.tag }}
                    </span>
                    <a
                      [href]="waLink('Hello Nigson Concierge, I would like to enquire about your ' + s.title + ' capability.')"
                      target="_blank"
                      (click)="$event.stopPropagation()"
                      class="text-[0.7rem] text-white bg-red-600 px-3 py-1.5 rounded-full font-medium"
                    >
                      Enquire
                    </a>
                  </div>
                </div>
              </div>

              <div *ngIf="activeService() !== i" class="flex items-center justify-between w-full">
                <div class="flex items-center gap-3">
                  <span class="font-sans font-bold text-xl text-red-500 tabular-nums">{{ s.num }}</span>
                  <span class="font-serif text-base text-zinc-200 font-medium">{{ s.title }}</span>
                </div>
                <svg class="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <!-- View Core Capabilities Button -->
          <div class="mt-14 text-center">
            <a
              routerLink="/services"
              class="btn-sweep inline-flex items-center gap-3 px-8 py-4 bg-zinc-950 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-[0.22em] rounded transition-all shadow-md group cursor-pointer"
            >
              <span>Explore 7 Core Capabilities</span>
              <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <!-- WHY CHOOSE NIGSON PROPERTIES (3-by-2 cards grid) -->
      <section id="why-choose" class="border-t border-zinc-200 bg-[#FAF9F6] py-24 md:py-32">
        <div class="mx-auto max-w-7xl px-6 md:px-12">
          <div class="mx-auto mb-14 max-w-3xl text-center">
            <p class="kicker text-red-600">The Nigson Standard</p>
            <h2 class="mt-4 font-serif text-4xl leading-[1.05] md:text-6xl text-zinc-950">
              Why Choose <em class="text-red-600 font-serif italic">Nigson Properties</em>
            </h2>
            <p class="mt-4 text-zinc-500 text-sm md:text-base">
              Built on institutional integrity, European engineering standards, and transparent client partnerships across Nigeria's prime corridors.
            </p>
          </div>

          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div
              *ngFor="let item of whyChooseItems"
              class="group h-full rounded-2xl border border-zinc-200/90 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:shadow-lg"
            >
              <div class="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/40 bg-red-50 text-red-600 transition-all duration-300 group-hover:scale-105 group-hover:bg-red-600 group-hover:text-white">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 class="mt-5 font-serif text-xl font-bold leading-snug text-zinc-950">
                {{ item.title }}
              </h3>
              <p class="mt-3 text-sm leading-relaxed text-zinc-600">
                {{ item.desc }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CLIENT TESTIMONIALS & REVIEWS SECTION (BRD Section 5 & 18) -->
      <section id="testimonials" class="border-t border-zinc-200 bg-white py-24 md:py-32">
        <div class="mx-auto max-w-7xl px-6 md:px-12">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p class="kicker text-red-600">Proven Trust & Reputation</p>
              <h2 class="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-zinc-950">
                Client Testimonials & Reviews
              </h2>
              <p class="mt-2 text-zinc-500 text-sm max-w-xl">
                Hear directly from verified homeowners, diaspora investors, short-stay guests, and corporate partners.
              </p>
            </div>

            <!-- Filter Categories -->
            <div class="mt-6 md:mt-0 flex flex-wrap gap-2">
              <button
                *ngFor="let tab of ['All', 'Homeowner', 'Investor', 'Short-Stay Guest', 'Property Management']"
                (click)="testimonialTab.set(tab)"
                class="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all"
                [ngClass]="testimonialTab() === tab ? 'bg-red-600 text-white shadow-sm' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'"
              >
                {{ tab }}
              </button>
            </div>
          </div>

          <!-- Testimonial Grid -->
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              *ngFor="let t of filteredTestimonials()"
              class="p-8 rounded-2xl border border-zinc-200 bg-[#FAF9F6] shadow-sm flex flex-col justify-between hover:border-red-400 transition-colors"
            >
              <div>
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-1 text-amber-500 text-sm">
                    ★★★★★
                  </div>
                  <span class="px-2.5 py-1 bg-red-100 text-red-700 text-[0.65rem] font-bold rounded-full uppercase tracking-wider">
                    {{ t.category }}
                  </span>
                </div>
                <p class="text-sm text-zinc-700 italic leading-relaxed">
                  “{{ t.quote }}”
                </p>
              </div>

              <div class="mt-8 pt-5 border-t border-zinc-200 flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-sm shrink-0">
                  {{ t.name.charAt(0) }}
                </div>
                <div>
                  <h4 class="font-serif text-base font-bold text-zinc-950 leading-tight">{{ t.name }}</h4>
                  <p class="text-xs text-red-600 font-medium">{{ t.project }}</p>
                  <p class="text-[0.65rem] text-zinc-400">{{ t.location }} · {{ t.role }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom CTAs (BRD Section 5 Contact CTA) -->
          <div class="mt-16 p-8 md:p-12 rounded-3xl bg-zinc-950 text-white flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <span class="text-xs font-bold uppercase tracking-widest text-red-500 block mb-2">Connect with Nigson Properties</span>
              <h3 class="font-serif text-2xl md:text-3xl font-bold">Ready to Experience Exceptional Real Estate?</h3>
              <p class="text-xs md:text-sm text-zinc-400 mt-2 max-w-xl">
                Schedule a private property viewing, reserve an executive short-stay suite, or consult on turnkey project development with our senior advisory team.
              </p>
            </div>

            <div class="flex flex-wrap gap-4 shrink-0">
              <button
                (click)="modalService.openInspection()"
                class="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest rounded transition-all"
              >
                Schedule Inspection
              </button>
              <a
                routerLink="/contact"
                class="px-6 py-3.5 border border-zinc-700 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-widest rounded transition-all"
              >
                Contact Us
              </a>
              <a
                [href]="waLink('Hello Nigson Properties, I would like to enquire about your developments.')"
                target="_blank"
                class="px-6 py-3.5 bg-[#25D366] hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-widest rounded transition-all flex items-center gap-2"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- QUICK VIEW DIALOG OVERLAY -->
      <div
        *ngIf="modalService.quickViewOpen() && modalService.quickViewProperty() as qp"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
        (click)="modalService.closeQuickView()"
      >
        <div
          class="bg-white max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative text-zinc-900 font-sans"
          (click)="$event.stopPropagation()"
        >
          <button
            (click)="modalService.closeQuickView()"
            class="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>

          <div class="relative aspect-[16/9] bg-zinc-900">
            <img [src]="qp.gallery[quickImgIdx]" [alt]="qp.title" class="w-full h-full object-cover" />
          </div>

          <div class="flex gap-2 px-6 pt-4 overflow-x-auto">
            <button
              *ngFor="let g of qp.gallery; let i = index"
              (click)="quickImgIdx = i"
              class="h-14 w-20 shrink-0 overflow-hidden border-2 rounded transition-all"
              [ngClass]="i === quickImgIdx ? 'border-red-600 scale-105' : 'border-transparent opacity-60 hover:opacity-100'"
            >
              <img [src]="g" alt="" class="h-full w-full object-cover" />
            </button>
          </div>

          <div class="p-6 md:p-8">
            <p class="kicker text-red-600">{{ qp.location }} · {{ qp.status }}</p>
            <h2 class="mt-2 font-serif text-3xl font-medium text-zinc-950">{{ qp.title }}</h2>
            <p class="mt-2 text-sm text-zinc-600 leading-relaxed">{{ qp.summary }}</p>

            <div class="mt-4 flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 border-y border-zinc-100 py-3">
              <span>{{ qp.beds }} Beds</span>
              <span>{{ qp.baths }} Baths</span>
              <span>{{ qp.size }} sqm</span>
              <span class="text-red-600">Solar Microgrid Included</span>
            </div>

            <ul class="mt-5 grid grid-cols-2 gap-2 text-xs text-zinc-700">
              <li *ngFor="let am of qp.amenities.slice(0, 6)" class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                {{ am }}
              </li>
            </ul>

            <div class="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-100 pt-5">
              <p class="font-sans font-bold text-2xl tracking-tight text-red-600 tabular-nums">
                {{ naira(qp.price) }}
              </p>
              <div class="flex gap-2">
                <a
                  [href]="waLink('Hello, I would like to inquire about ' + qp.title + ' in ' + qp.location + '.')"
                  target="_blank"
                  class="border border-zinc-950 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-950 hover:bg-zinc-950 hover:text-white transition-colors"
                >
                  Contact Desk
                </a>
                <button
                  (click)="modalService.closeQuickView(); modalService.openInspection(qp)"
                  class="bg-red-600 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-700 transition-colors"
                >
                  Schedule Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent {
  modalService = inject(ModalService);

  // Exclusively 6 premier showcase residences and 3 flagship short-stay suites for the Home Page
  allProperties = properties.slice(0, 6);
  allProjects = projects;
  allSuites = suites.slice(0, 3);

  projectTab = signal<'all' | 'completed' | 'ongoing'>('all');

  filteredHomeProjects = computed(() => {
    const tab = this.projectTab();
    if (tab === 'completed') {
      return this.allProjects.filter(p => p.statusType === 'completed' || p.progress === 100);
    }
    if (tab === 'ongoing') {
      return this.allProjects.filter(p => p.statusType === 'ongoing' || p.progress < 100);
    }
    return this.allProjects;
  });

  tabs: (string | Category)[] = ['All Residences', 'Waterfront Penthouses', 'Smart Terraces', 'Luxury Villas'];
  activeTab = signal<string>('All Residences');
  activeService = signal<number>(0);
  quickImgIdx = 0;

  naira = naira;
  waLink = waLink;

  allTestimonials = testimonials;
  testimonialTab = signal<string>('All');

  filteredTestimonials = computed(() => {
    const tab = this.testimonialTab();
    if (tab === 'All') return this.allTestimonials;
    return this.allTestimonials.filter(t => t.category === tab);
  });

  allServices: ServiceItem[] = [
    {
      num: '01',
      title: 'Building Construction',
      desc: 'Modern architectural designs, smart home tech, solar power, and family-friendly layouts.',
      image: '/assets/villa.jpg',
      tag: 'Construction'
    },
    {
      num: '02',
      title: 'Project Development',
      desc: 'Concept → Feasibility → Design → Development → Construction → Turnkey Handover.',
      image: '/assets/community.jpg',
      tag: 'Development'
    },
    {
      num: '03',
      title: 'Property Management',
      desc: 'Preventive maintenance, tenant relations, and asset value preservation for multi-unit portfolios.',
      image: '/assets/banana-1.jpg',
      tag: 'Management'
    },
    {
      num: '04',
      title: 'Short-Stay Booking',
      desc: 'Fully furnished serviced suites with seamless online booking, waterfront vistas, and 24/7 power.',
      image: '/assets/benson-close-1.jpg',
      tag: 'Short-Stay'
    },
    {
      num: '05',
      title: 'Project Management',
      desc: 'PMP-certified project scheduling, risk assessment, budget monitoring, and quality assurance.',
      image: '/assets/consultation.jpg',
      tag: 'Project Management'
    },
    {
      num: '06',
      title: 'Facility Management',
      desc: '24/7 preventative operations, solar microgrid optimization, and continuous asset stewardship.',
      image: '/assets/towers.jpg',
      tag: 'Facility Operations'
    },
    {
      num: '07',
      title: 'Property Sales',
      desc: 'Direct developer sales, verified Governor’s Consent titles, and transparent buyer advisory.',
      image: '/assets/penthouse.jpg',
      tag: 'Property Sales'
    }
  ];

  whyChooseItems: WhyChooseItem[] = [
    {
      title: 'A Trusted Name You Can Rely On',
      desc: 'Backed by the institutional strength, financial integrity, and corporate foundation of Nigson Group.',
      iconName: 'Building2'
    },
    {
      title: 'Quality Without Compromise',
      desc: 'Architectural precision, European structural standards, and premium turnkey finishes in every home.',
      iconName: 'Award'
    },
    {
      title: 'Lagos Market Expertise',
      desc: 'Granular micro-market intelligence and strategic property investment insight across prime corridors.',
      iconName: 'TrendingUp'
    },
    {
      title: 'Customer-First Transparency',
      desc: 'Verified land titles, clear documentation, transparent milestone reporting, and dedicated aftercare.',
      iconName: 'UserCheck'
    },
    {
      title: 'Innovation-Driven Engineering',
      desc: 'Standardized smart home automation, high-capacity solar inverters, and central clean water plants.',
      iconName: 'Cpu'
    },
    {
      title: 'Sustainable Long-Term Value',
      desc: 'Prime high-appreciation assets designed for strong rental yields and generational wealth creation.',
      iconName: 'Sprout'
    }
  ];

  filteredProperties(): Property[] {
    const current = this.activeTab();
    const showcaseSix = this.allProperties.slice(0, 6);
    if (current === 'All Residences') {
      return showcaseSix;
    }
    return showcaseSix.filter(p => p.category === current);
  }
}
