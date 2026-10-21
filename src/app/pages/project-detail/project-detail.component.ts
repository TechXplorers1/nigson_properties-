import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { projects, Project, naira, waLink } from '../../models/data';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div *ngIf="project()" class="min-h-screen bg-zinc-50 text-zinc-900 font-sans flex flex-col pt-20">
      <!-- Sticky Action Subheader -->
      <div class="sticky top-[72px] z-30 border-b border-zinc-200 bg-white/95 backdrop-blur-md py-3.5 px-6 md:px-12 shadow-sm">
        <div class="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <a routerLink="/projects" class="flex items-center gap-1 text-xs text-zinc-500 hover:text-red-600 transition-colors font-semibold">
              ← Back to Project Portfolio
            </a>
            <span class="text-zinc-300">|</span>
            <span class="text-xs font-semibold text-zinc-950 truncate max-w-xs sm:max-w-md">{{ project()!.name }}</span>
            <span
              class="px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold uppercase tracking-wider"
              [ngClass]="{
                'bg-emerald-100 text-emerald-800': project()!.status === 'Completed & Sold Out',
                'bg-teal-100 text-teal-800': project()!.status === 'Completed',
                'bg-amber-100 text-amber-800': project()!.status === 'Shortlet',
                'bg-red-100 text-red-800': project()!.status === 'Under Construction' || project()!.status === 'Ongoing'
              }"
            >
              {{ project()!.status }}
            </span>
          </div>

          <div class="flex items-center gap-3">
            <button
              (click)="modalService.openInspection()"
              class="btn-sweep bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
            >
              Book Site Tour / Inquiry
            </button>
          </div>
        </div>
      </div>

      <main class="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 py-8 w-full flex-1">
        <!-- Project Title & Metrics -->
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-zinc-200 bg-white p-6 sm:p-8 rounded-3xl shadow-sm">
          <div>
            <div class="flex flex-wrap items-center gap-2 mb-2">
              <span class="text-red-600 font-bold text-xs uppercase tracking-widest">{{ project()!.category }}</span>
              <span class="text-zinc-300">·</span>
              <span class="bg-zinc-100 px-2.5 py-0.5 rounded text-xs text-zinc-700 font-semibold flex items-center gap-1">
                <svg class="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                {{ project()!.location }}
              </span>
              <span class="text-zinc-300">·</span>
              <span class="bg-zinc-950 text-white px-2.5 py-0.5 rounded text-xs font-bold tabular-nums">
                {{ project()!.unitCount ? (project()!.unitCount + ' Units') : project()!.units }}
              </span>
            </div>

            <h1 class="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-zinc-950 tracking-tight">
              {{ project()!.name }}
            </h1>
            <p class="text-sm md:text-base text-zinc-600 mt-2 max-w-2xl font-light">
              {{ project()!.tagline }}
            </p>
          </div>

          <!-- Quick Metrics Bar -->
          <div class="flex flex-wrap gap-3">
            <div *ngFor="let m of project()!.metrics" class="rounded-2xl border border-zinc-200 bg-zinc-50 p-3.5 text-center min-w-[120px] shadow-2xs">
              <span class="text-[0.65rem] font-bold uppercase tracking-wider text-zinc-500 block">{{ m.label }}</span>
              <span class="font-serif text-lg sm:text-xl font-bold text-red-600 tabular-nums mt-0.5 block">{{ m.value }}</span>
            </div>
          </div>
        </div>

        <!-- Hero Architectural Visual with Gallery Preview -->
        <section class="my-8 space-y-3">
          <div class="rounded-3xl overflow-hidden aspect-[16/9] sm:aspect-[16/8] bg-zinc-950 relative shadow-xl">
            <img [src]="activeImage() || project()!.image" [alt]="project()!.name" class="w-full h-full object-cover transition-all duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
            
            <div class="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between text-white gap-4">
              <div>
                <span class="text-xs uppercase tracking-wider text-red-400 font-bold">Execution Milestone</span>
                <p class="font-serif text-2xl font-bold">
                  {{ project()!.progress === 100 ? '100% Certified Turnkey Handover' : (project()!.progress + '% Certified Completed') }}
                </p>
                <span class="text-xs text-zinc-300 font-medium">{{ project()!.handover }}</span>
              </div>
              <div class="w-64 bg-white/20 h-2.5 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-1000"
                  [ngClass]="project()!.progress === 100 ? 'bg-emerald-500' : 'bg-red-600'"
                  [style.width.%]="project()!.progress"
                ></div>
              </div>
            </div>
          </div>

          <!-- Multi-Image Thumbnail Gallery (Real Google Drive Photos) -->
          <div *ngIf="project()!.renderings && project()!.renderings.length > 1" class="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold uppercase tracking-wider text-zinc-700 flex items-center gap-2">
                <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                Site Visual Gallery ({{ project()!.renderings.length }} Photos)
              </span>
              <span class="text-[0.7rem] text-zinc-400">Click any image to enlarge</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                *ngFor="let img of project()!.renderings; let idx = index"
                (click)="activeImage.set(img)"
                class="group relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer"
                [ngClass]="(activeImage() || project()!.image) === img ? 'border-red-600 ring-2 ring-red-600/30 scale-102' : 'border-zinc-200 hover:border-zinc-400 opacity-80 hover:opacity-100'"
              >
                <img [src]="img" [alt]="project()!.name + ' Photo ' + (idx + 1)" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span class="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded text-[0.62rem] font-bold bg-black/70 text-white backdrop-blur">
                  #{{ idx + 1 }}
                </span>
              </button>
            </div>
          </div>
        </section>

        <!-- Narrative & Matrix Grid -->
        <div class="grid gap-12 lg:grid-cols-3">
          <!-- Left Details (2 cols) -->
          <div class="lg:col-span-2 space-y-12">
            <!-- Narrative Section -->
            <div class="bg-white border border-zinc-200 p-8 rounded-3xl shadow-sm">
              <p class="kicker text-red-600">Master Narrative</p>
              <h2 class="font-serif text-3xl font-medium text-zinc-950 mt-2">Vision & Infrastructure Blueprint</h2>
              <p class="mt-4 text-zinc-600 leading-relaxed text-base font-light">
                {{ project()!.description }}
              </p>
            </div>

            <!-- Features -->
            <div class="bg-white border border-zinc-200 p-8 rounded-3xl shadow-sm">
              <p class="kicker text-red-600">Infrastructure Pillars</p>
              <h2 class="font-serif text-2xl font-medium text-zinc-950 mt-1 mb-6">Engineering & Architectural Standards</h2>
              <div class="grid sm:grid-cols-2 gap-3.5">
                <div *ngFor="let feat of project()!.features" class="flex items-center gap-3 p-4 bg-zinc-50 border border-zinc-200/80 rounded-xl">
                  <div class="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0"></div>
                  <span class="text-xs font-semibold text-zinc-800">{{ feat }}</span>
                </div>
              </div>
            </div>

            <!-- Construction Milestone Log -->
            <div *ngIf="project()!.milestones && project()!.milestones.length > 0" class="bg-white border border-zinc-200 p-8 rounded-3xl shadow-sm">
              <p class="kicker text-red-600">Timeline & Verification</p>
              <h2 class="font-serif text-2xl font-medium text-zinc-950 mt-1 mb-6">Certified Milestone Execution</h2>
              <div class="space-y-4">
                <div
                  *ngFor="let ms of project()!.milestones"
                  class="p-4 rounded-xl border flex items-center justify-between"
                  [ngClass]="ms.status === 'Completed' ? 'bg-emerald-50/50 border-emerald-200' : 'bg-zinc-50 border-zinc-200'"
                >
                  <div class="flex items-center gap-4">
                    <span
                      class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                      [ngClass]="ms.status === 'Completed' ? 'bg-emerald-600 text-white' : 'bg-zinc-200 text-zinc-600'"
                    >
                      ✓
                    </span>
                    <div>
                      <h4 class="text-sm font-semibold text-zinc-900">{{ ms.title }}</h4>
                      <span class="text-[0.7rem] text-zinc-500 uppercase tracking-wider">{{ ms.date }}</span>
                    </div>
                  </div>
                  <span
                    class="px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider rounded"
                    [ngClass]="ms.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'"
                  >
                    {{ ms.status }} ({{ ms.progress }}%)
                  </span>
                </div>
              </div>
            </div>

            <!-- Phases Unit Matrix -->
            <div *ngIf="project()!.phases && project()!.phases.length > 0" class="bg-white border border-zinc-200 p-8 rounded-3xl shadow-sm">
              <p class="kicker text-red-600">Unit Allocation Matrix</p>
              <h2 class="font-serif text-2xl font-medium text-zinc-950 mt-1 mb-4">Availability & Delivery Release</h2>
              <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div *ngFor="let ph of project()!.phases" class="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl">
                  <span
                    class="px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider rounded inline-block mb-2"
                    [ngClass]="ph.status === 'Sold Out' ? 'bg-zinc-200 text-zinc-700' : 'bg-red-100 text-red-700'"
                  >
                    {{ ph.status }}
                  </span>
                  <h4 class="font-serif text-lg font-bold text-zinc-900">{{ ph.name }}</h4>
                  <p class="text-xs text-zinc-500 mt-1">{{ ph.units }}</p>
                  <p class="mt-4 font-sans font-bold text-base text-red-600 tabular-nums">
                    {{ ph.priceFrom < 1_000_000 ? (naira(ph.priceFrom) + ' / night') : ('From ' + naira(ph.priceFrom)) }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Sidebar (1 col) -->
          <div class="space-y-6">
            <!-- Project Overview Card -->
            <div class="p-6 bg-zinc-950 text-white rounded-3xl shadow-xl border border-white/10">
              <p class="kicker text-red-500">Portfolio Specification</p>
              <h3 class="font-serif text-2xl font-medium mt-1">{{ project()!.name }}</h3>
              
              <div class="mt-6 space-y-3 text-xs border-y border-white/10 py-4">
                <div class="flex justify-between">
                  <span class="text-zinc-400">Location:</span>
                  <strong class="text-white">{{ project()!.location }}</strong>
                </div>
                <div class="flex justify-between">
                  <span class="text-zinc-400">Total Units:</span>
                  <strong class="text-white">{{ project()!.unitCount ? (project()!.unitCount + ' Units') : project()!.units }}</strong>
                </div>
                <div class="flex justify-between">
                  <span class="text-zinc-400">Category:</span>
                  <strong class="text-white">{{ project()!.category }}</strong>
                </div>
                <div class="flex justify-between">
                  <span class="text-zinc-400">Status:</span>
                  <span class="px-2 py-0.5 rounded text-[0.65rem] font-bold uppercase" [ngClass]="project()!.progress === 100 ? 'bg-emerald-500/30 text-emerald-300' : 'bg-red-500/30 text-red-300'">
                    {{ project()!.status }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-zinc-400">Target Handover:</span>
                  <strong class="text-white">{{ project()!.handover }}</strong>
                </div>
              </div>

              <button
                (click)="modalService.openInspection()"
                class="w-full mt-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer block text-center shadow-md"
              >
                Inquire on this Project
              </button>
            </div>

            <!-- WhatsApp Link Card -->
            <div class="p-6 bg-emerald-50 border border-emerald-200 rounded-3xl">
              <span class="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">Direct Developer Concierge</span>
              <p class="text-xs text-emerald-700 leading-relaxed mb-4">
                Chat directly with our institutional investment desk on WhatsApp regarding {{ project()!.name }}.
              </p>
              <a
                [href]="waLink('Hello, I am inquiring about ' + project()!.name + ' located in ' + project()!.location + '.')"
                target="_blank"
                class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 hover:underline"
              >
                Message on WhatsApp →
              </a>
            </div>

            <!-- Download Brochure / Request Information -->
            <div class="p-6 bg-white border border-zinc-200 rounded-3xl shadow-sm">
              <span class="text-xs font-bold uppercase tracking-wider text-zinc-900 block mb-1">Project Documents</span>
              <p class="text-xs text-zinc-500 leading-relaxed mb-4">
                Request certified architectural drawings, title documents, and investment memorandum.
              </p>
              <button
                (click)="modalService.openBrochure(project())"
                class="w-full py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                Request Investor Briefing
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  `
})
export class ProjectDetailComponent {
  route = inject(ActivatedRoute);
  modalService = inject(ModalService);

  project = signal<Project | null>(null);
  activeImage = signal<string | null>(null);
  naira = naira;
  waLink = waLink;

  constructor() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const found = projects.find(p => p.id === id) || projects[0];
      this.project.set(found);
      this.activeImage.set(found ? found.image : null);
    });
  }
}
