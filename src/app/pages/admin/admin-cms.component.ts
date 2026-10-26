import { Component, signal, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CmsService, CmsContent, DEFAULT_CMS_CONTENT } from '../../services/cms.service';

export type CmsPageId = 'home' | 'properties' | 'shortStay' | 'projects' | 'services' | 'about' | 'contact';
export type CmsViewport = 'desktop' | 'laptop' | 'tablet' | 'mobile';
export type CmsViewMode = 'split' | 'preview' | 'editor';

export interface CmsPageTab {
  id: CmsPageId;
  name: string;
  route: string;
  icon: string;
  badge: string;
  description: string;
}

@Component({
  selector: 'app-admin-cms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6 animate-fadeIn pb-12">
      <!-- 1. CMS MODULE HEADER & CONTROLS -->
      <div class="bg-white border border-zinc-200/90 rounded-2xl p-6 shadow-sm">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[0.65rem] font-bold uppercase tracking-widest text-red-600 font-sans">
                Live Visual Page Editor & Studio
              </span>
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold rounded-full">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Real-Time Synchronised
              </span>
            </div>
            <h2 class="font-serif text-3xl font-bold text-zinc-950 mt-1">
              Content Management Studio
            </h2>
            <p class="text-xs text-zinc-500 mt-1 max-w-2xl">
              Inspect and edit every page across the website in real time. Switch between all 7 pages below to edit headlines, copy, hero images, banners, and contacts with an exact live visual page preview.
            </p>
          </div>

          <!-- Top Action Bar -->
          <div class="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              (click)="openLivePageInNewTab()"
              class="px-3.5 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 border border-zinc-200"
              title="Open current page in a new browser tab"
            >
              <svg class="w-4 h-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Live Site ↗</span>
            </button>

            <button
              type="button"
              (click)="resetCurrentPage()"
              class="px-3.5 py-2.5 bg-white hover:bg-red-50 text-zinc-600 hover:text-red-700 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 border border-zinc-200 hover:border-red-200"
              title="Reset current page to initial corporate defaults"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Reset Page</span>
            </button>

            <button
              type="button"
              (click)="saveAndPublish()"
              class="px-5 py-2.5 bg-[#CC0D23] hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-red-600/20 cursor-pointer flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Publish Changes</span>
            </button>
          </div>
        </div>

        <!-- 2. ALL 7 PAGES SELECTOR TABS -->
        <div class="mt-6 pt-5 border-t border-zinc-100">
          <div class="flex items-center justify-between mb-3">
            <span class="text-[0.68rem] font-bold uppercase tracking-wider text-zinc-400">
              Select Website Page to Edit (7 Available Pages)
            </span>
            <span class="text-xs text-zinc-500 font-medium">
              Currently Editing: <strong class="text-zinc-900 font-semibold">{{ activePageTab.name }}</strong> ({{ activePageTab.route }})
            </span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            <button
              *ngFor="let page of pages"
              type="button"
              (click)="selectPage(page.id)"
              class="p-3 text-left rounded-xl border transition-all cursor-pointer relative group flex flex-col justify-between"
              [ngClass]="selectedPage() === page.id
                ? 'bg-zinc-900 text-white border-zinc-900 shadow-md ring-2 ring-red-600/30'
                : 'bg-zinc-50 hover:bg-white text-zinc-700 border-zinc-200/90 hover:border-zinc-300'"
            >
              <div class="flex items-center justify-between gap-1 mb-1.5">
                <span class="text-base leading-none">{{ page.icon }}</span>
                <span
                  class="text-[9px] font-mono px-1.5 py-0.5 rounded font-semibold tracking-tighter"
                  [ngClass]="selectedPage() === page.id ? 'bg-white/20 text-white' : 'bg-zinc-200/70 text-zinc-600'"
                >
                  {{ page.badge }}
                </span>
              </div>
              <span class="text-xs font-serif font-bold block truncate" [ngClass]="selectedPage() === page.id ? 'text-white' : 'text-zinc-900'">
                {{ page.name }}
              </span>
              <span class="text-[10px] font-mono truncate block mt-0.5" [ngClass]="selectedPage() === page.id ? 'text-zinc-400' : 'text-zinc-400'">
                {{ page.route }}
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- 3. STUDIO TOOLBAR: VIEW MODES & DEVICE VIEWPORTS -->
      <div class="bg-white border border-zinc-200/90 rounded-2xl p-3 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <!-- View Mode Switcher -->
        <div class="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl">
          <button
            type="button"
            (click)="viewMode.set('split')"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
            [ngClass]="viewMode() === 'split' ? 'bg-white text-zinc-950 shadow-xs' : 'text-zinc-600 hover:text-zinc-950'"
            title="Side-by-side Editor and Exact Live Page"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
            <span>Split Studio</span>
          </button>

          <button
            type="button"
            (click)="viewMode.set('preview')"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
            [ngClass]="viewMode() === 'preview' ? 'bg-white text-zinc-950 shadow-xs' : 'text-zinc-600 hover:text-zinc-950'"
            title="Full-width Exact Live Page Preview"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>Exact Page Only</span>
          </button>

          <button
            type="button"
            (click)="viewMode.set('editor')"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
            [ngClass]="viewMode() === 'editor' ? 'bg-white text-zinc-950 shadow-xs' : 'text-zinc-600 hover:text-zinc-950'"
            title="Full-width Content Form Editor"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Editor Only</span>
          </button>
        </div>


        <!-- Device Viewport Simulator Controls (Enabled when showing preview) -->
        <div *ngIf="viewMode() !== 'editor'" class="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl">
          <button
            type="button"
            (click)="viewport.set('desktop')"
            class="px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1"
            [ngClass]="viewport() === 'desktop' ? 'bg-white text-zinc-900 shadow-xs font-bold' : 'text-zinc-600 hover:text-zinc-900'"
            title="Desktop View (100% fluid)"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            <span>Desktop</span>
          </button>
          <button
            type="button"
            (click)="viewport.set('laptop')"
            class="px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1"
            [ngClass]="viewport() === 'laptop' ? 'bg-white text-zinc-900 shadow-xs font-bold' : 'text-zinc-600 hover:text-zinc-900'"
            title="Laptop View (1024px)"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
            <span>Laptop</span>
          </button>
          <button
            type="button"
            (click)="viewport.set('tablet')"
            class="px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1"
            [ngClass]="viewport() === 'tablet' ? 'bg-white text-zinc-900 shadow-xs font-bold' : 'text-zinc-600 hover:text-zinc-900'"
            title="Tablet View (768px)"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
            <span>Tablet</span>
          </button>
          <button
            type="button"
            (click)="viewport.set('mobile')"
            class="px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1"
            [ngClass]="viewport() === 'mobile' ? 'bg-white text-zinc-900 shadow-xs font-bold' : 'text-zinc-600 hover:text-zinc-900'"
            title="Mobile View (375px)"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
            <span>Mobile</span>
          </button>
        </div>

        <!-- Reload Preview Button -->
        <div *ngIf="viewMode() !== 'editor'" class="flex items-center gap-2">
          <button
            type="button"
            (click)="reloadPreview()"
            class="p-2 hover:bg-zinc-100 rounded-xl text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
            title="Reload live preview frame"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Reload Preview</span>
          </button>
        </div>
      </div>

      <!-- 4. MAIN STUDIO WORKSPACE (SPLIT OR FULL) -->
      <div class="grid gap-6 items-start" [ngClass]="{
        'lg:grid-cols-12': viewMode() === 'split',
        'grid-cols-1': viewMode() !== 'split'
      }">

        <!-- LEFT COLUMN: CONTENT EDITOR CONTROLS -->
        <div
          *ngIf="viewMode() !== 'preview'"
          class="space-y-6"
          [ngClass]="getContentColClass()"
        >
          <!-- Section Navigation within Active Page (Single Unified Tab) -->
          <div class="bg-white/95 backdrop-blur-md border border-zinc-200/90 rounded-2xl p-3 shadow-sm flex items-center justify-between sticky top-0 z-30">
            <div class="flex items-center gap-2">
              <span
                class="py-2 px-4 rounded-xl text-xs font-bold bg-[#CC0D23] text-white shadow-xs flex items-center gap-2"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
                <span>Hero, Copy & Page Sections</span>
              </span>
              <span class="text-xs text-zinc-500 font-medium hidden sm:inline">
                Editing {{ activePageTab.name }}
              </span>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                (click)="scrollToSection('hero')"
                class="px-2.5 py-1 text-[11px] font-semibold text-zinc-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer border border-zinc-200 shadow-2xs"
                title="Scroll to Hero Header"
              >
                Hero ↑
              </button>
              <button
                *ngIf="selectedPage() === 'home'"
                type="button"
                (click)="scrollToSection('standard')"
                class="px-2.5 py-1 text-[11px] font-semibold text-zinc-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer border border-zinc-200 shadow-2xs"
                title="Scroll to Page Sections"
              >
                Sections ↓
              </button>
            </div>
          </div>

          <!-- ========================================================= -->
          <!-- HERO & BANNER EDITOR (COMMON TO ALL PAGES)                -->
          <!-- ========================================================= -->
          <div id="editor-hero" class="bg-white border border-zinc-200/90 rounded-2xl p-6 shadow-sm space-y-5">
            <div class="border-b border-zinc-100 pb-3">
              <span class="text-[0.65rem] font-bold uppercase tracking-widest text-red-600 block">Section 1</span>
              <h3 class="font-serif text-xl font-bold text-zinc-950">Hero Header & Background Media</h3>
              <p class="text-xs text-zinc-500 mt-0.5">Customize the prominent entry section of the {{ activePageTab.name }}.</p>
            </div>

            <!-- Eyebrow / Kicker -->
            <div>
              <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                Eyebrow / Kicker Tag
              </label>
              <input
                type="text"
                [(ngModel)]="activeHero.kicker"
                (ngModelChange)="onModelChange()"
                placeholder="e.g. Luxury Real Estate · Lagos & Abuja"
                class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white focus:border-red-600 outline-none font-medium"
              />
            </div>

            <!-- Page Title Controls (Tailored for Home vs Subpages) -->
            <div *ngIf="selectedPage() === 'home'" class="space-y-3">
              <div>
                <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Title Line 1
                </label>
                <input
                  type="text"
                  [(ngModel)]="draft.home.hero.titleLine1"
                  (ngModelChange)="onModelChange()"
                  placeholder="Redefining"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white focus:border-red-600 outline-none font-medium"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                  Highlighted Word / Phrase (Italic & Red)
                </label>
                <input
                  type="text"
                  [(ngModel)]="draft.home.hero.titleHighlight"
                  (ngModelChange)="onModelChange()"
                  placeholder="Architectural Luxury"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-red-200 bg-red-50/30 text-xs focus:bg-white focus:border-red-600 outline-none font-medium"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Title Line 2
                </label>
                <input
                  type="text"
                  [(ngModel)]="draft.home.hero.titleLine2"
                  (ngModelChange)="onModelChange()"
                  placeholder="Across Lagos & Abuja"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white focus:border-red-600 outline-none font-medium"
                />
              </div>
            </div>

            <!-- Subpage Title Controls (for Properties, Short Stay, Projects, Services, About, Contact) -->
            <div *ngIf="selectedPage() !== 'home'" class="grid sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Main Title
                </label>
                <input
                  type="text"
                  [(ngModel)]="activeHero.title"
                  (ngModelChange)="onModelChange()"
                  placeholder="Page title"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white focus:border-red-600 outline-none font-medium"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                  Highlight Word (Red & Italic)
                </label>
                <input
                  type="text"
                  [(ngModel)]="activeHero.highlight"
                  (ngModelChange)="onModelChange()"
                  placeholder="Highlighted word"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-red-200 bg-red-50/30 text-xs focus:bg-white focus:border-red-600 outline-none font-medium"
                />
              </div>
            </div>

            <!-- Subtitle / Lead Paragraph -->
            <div>
              <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                Subtitle / Descriptive Copy
              </label>
              <textarea
                rows="3"
                [(ngModel)]="activeHero.subtitle"
                (ngModelChange)="onModelChange()"
                placeholder="Enter compelling introductory copy..."
                class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white focus:border-red-600 outline-none font-light leading-relaxed"
              ></textarea>
            </div>

            <!-- Hero Background Image Section -->
            <div class="p-4 bg-zinc-50 border border-zinc-200/90 rounded-2xl space-y-3">
              <label class="block text-xs font-bold text-zinc-900 uppercase tracking-wider">
                Hero Background Image
              </label>

              <!-- Image Thumbnail Preview -->
              <div class="relative aspect-video rounded-xl overflow-hidden border border-zinc-300 bg-zinc-900 shadow-inner group">
                <img
                  [src]="activeHero.bgImage || '/assets/hero.jpg'"
                  alt="Hero Preview"
                  class="w-full h-full object-cover filter brightness-[0.85] group-hover:scale-105 transition-transform duration-500"
                />
                <div class="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-[11px] font-mono truncate flex items-center justify-between">
                  <span class="truncate">{{ activeHero.bgImage }}</span>
                  <span class="text-emerald-400 font-bold text-[9px] uppercase tracking-wider shrink-0 ml-2">Active Hero</span>
                </div>
              </div>

              <!-- Quick Presets Carousel/Selector -->
              <div>
                <span class="text-[0.65rem] font-bold uppercase tracking-wider text-zinc-500 block mb-1.5">
                  Quick Select from Luxury Presets:
                </span>
                <div class="grid grid-cols-3 gap-1.5">
                  <button
                    *ngFor="let p of quickHeroPresets"
                    type="button"
                    (click)="setHeroBgImage(p.url)"
                    class="p-1.5 rounded-lg border text-left transition-all cursor-pointer truncate flex items-center gap-1.5"
                    [ngClass]="activeHero.bgImage === p.url ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white hover:bg-zinc-100 text-zinc-700 border-zinc-200'"
                  >
                    <img [src]="p.url" class="w-5 h-5 rounded object-cover shrink-0" alt="" />
                    <span class="text-[10px] truncate block">{{ p.label }}</span>
                  </button>
                </div>
              </div>

              <!-- Custom URL input -->
              <div>
                <label class="block text-[11px] font-semibold text-zinc-600 mb-1">
                  Or Paste Custom Image URL:
                </label>
                <div class="flex items-center gap-2">
                  <input
                    type="text"
                    [(ngModel)]="activeHero.bgImage"
                    (ngModelChange)="onModelChange()"
                    placeholder="/assets/villa.jpg or https://images.unsplash.com/..."
                    class="flex-1 px-3 py-2 rounded-xl border border-zinc-200 bg-white text-xs outline-none focus:border-red-600 font-mono"
                  />
                  <label class="px-3 py-2 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 text-xs font-semibold rounded-xl cursor-pointer shrink-0 transition-colors">
                    Upload
                    <input type="file" accept="image/*" class="hidden" (change)="onUploadHeroImage($event)" />
                  </label>
                </div>
              </div>
            </div>

            <!-- Home Hero CTA Buttons (Only on Home Page) -->
            <div *ngIf="selectedPage() === 'home'" class="grid sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Primary Button Text
                </label>
                <input
                  type="text"
                  [(ngModel)]="draft.home.hero.cta1Text"
                  (ngModelChange)="onModelChange()"
                  placeholder="Explore Developments"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white focus:border-red-600 outline-none font-medium"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Secondary Button Text
                </label>
                <input
                  type="text"
                  [(ngModel)]="draft.home.hero.cta2Text"
                  (ngModelChange)="onModelChange()"
                  placeholder="Schedule Private Tour"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white focus:border-red-600 outline-none font-medium"
                />
              </div>
            </div>

            <!-- Subpage Badges (Properties, Projects, Short Stay, Services, About) -->
            <div *ngIf="activeHero.badges" class="space-y-2 pt-2">
              <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider">
                Hero Assurance Badges
              </label>
              <div *ngFor="let badge of activeHero.badges; let idx = index; trackBy: trackByIndex" class="flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-red-100 text-red-600 font-bold text-[10px] flex items-center justify-center shrink-0">
                  {{ idx + 1 }}
                </span>
                <input
                  type="text"
                  [(ngModel)]="activeHero.badges[idx]"
                  (ngModelChange)="onModelChange()"
                  class="flex-1 px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white focus:border-red-600 outline-none font-medium"
                />
              </div>
            </div>
          </div>

          <!-- ========================================================= -->
          <!-- PAGE SPECIFIC COPY & SECTIONS                             -->
          <!-- ========================================================= -->
          <div *ngIf="selectedPage() !== 'properties' && selectedPage() !== 'shortStay' && selectedPage() !== 'projects'" class="bg-white border border-zinc-200/90 rounded-2xl p-6 shadow-sm space-y-6">

            <!-- ================= HOME PAGE COPY ================= -->
            <div *ngIf="selectedPage() === 'home'" class="space-y-8">

              <!-- Quick Jump Anchor Bar (Sticky) -->
              <div class="bg-zinc-50/95 backdrop-blur-md border border-zinc-200/90 rounded-2xl p-3.5 space-y-2 sticky top-[72px] z-20 shadow-xs">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Jump to Section Editor & Live Preview:
                  </span>
                  <span class="text-[10px] font-bold text-red-600">7 Core Sections</span>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    (click)="scrollToSection('hero')"
                    class="px-2.5 py-1 bg-white hover:bg-red-50 hover:text-red-700 text-zinc-700 font-semibold rounded-lg border border-zinc-200 text-[11px] transition-all cursor-pointer shadow-xs"
                  >
                    0. Hero & Banner
                  </button>
                  <button
                    type="button"
                    (click)="scrollToSection('standard')"
                    class="px-2.5 py-1 bg-white hover:bg-red-50 hover:text-red-700 text-zinc-700 font-semibold rounded-lg border border-zinc-200 text-[11px] transition-all cursor-pointer shadow-xs"
                  >
                    1. The Nigson Standard
                  </button>
                  <button
                    type="button"
                    (click)="scrollToSection('properties')"
                    class="px-2.5 py-1 bg-white hover:bg-red-50 hover:text-red-700 text-zinc-700 font-semibold rounded-lg border border-zinc-200 text-[11px] transition-all cursor-pointer shadow-xs"
                  >
                    2. Properties Showcase
                  </button>
                  <button
                    type="button"
                    (click)="scrollToSection('projects')"
                    class="px-2.5 py-1 bg-white hover:bg-red-50 hover:text-red-700 text-zinc-700 font-semibold rounded-lg border border-zinc-200 text-[11px] transition-all cursor-pointer shadow-xs"
                  >
                    3. Projects Matrix
                  </button>
                  <button
                    type="button"
                    (click)="scrollToSection('shortstay')"
                    class="px-2.5 py-1 bg-white hover:bg-red-50 hover:text-red-700 text-zinc-700 font-semibold rounded-lg border border-zinc-200 text-[11px] transition-all cursor-pointer shadow-xs"
                  >
                    4. Short Stay Suites
                  </button>
                  <button
                    type="button"
                    (click)="scrollToSection('services')"
                    class="px-2.5 py-1 bg-white hover:bg-red-50 hover:text-red-700 text-zinc-700 font-semibold rounded-lg border border-zinc-200 text-[11px] transition-all cursor-pointer shadow-xs"
                  >
                    5. Explore 7 Core Capabilities
                  </button>
                  <button
                    type="button"
                    (click)="scrollToSection('why-choose')"
                    class="px-2.5 py-1 bg-white hover:bg-red-50 hover:text-red-700 text-zinc-700 font-semibold rounded-lg border border-zinc-200 text-[11px] transition-all cursor-pointer shadow-xs"
                  >
                    6. Why Choose Nigson
                  </button>
                  <button
                    type="button"
                    (click)="scrollToSection('testimonials')"
                    class="px-2.5 py-1 bg-white hover:bg-red-50 hover:text-red-700 text-zinc-700 font-semibold rounded-lg border border-zinc-200 text-[11px] transition-all cursor-pointer shadow-xs"
                  >
                    7. Testimonials & Reviews
                  </button>
                </div>
              </div>

              <!-- SECTION 1: THE NIGSON STANDARD -->
              <div id="editor-standard" class="space-y-4 pt-2 scroll-mt-36">
                <div class="border-b border-zinc-100 pb-3 flex items-center justify-between">
                  <div>
                    <span class="text-[0.65rem] font-bold uppercase tracking-widest text-red-600 block">Home Section 1</span>
                    <h3 class="font-serif text-lg font-bold text-zinc-950">The Nigson Standard</h3>
                  </div>
                  <button
                    type="button"
                    (click)="scrollToSection('standard')"
                    class="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Focus Preview ↗
                  </button>
                </div>

                <div class="space-y-3">
                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Standard Section Kicker
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="draft.home.standard.kicker"
                      (ngModelChange)="onModelChange()"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none"
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Featured Quote Lead
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="draft.home.standard.quote"
                      (ngModelChange)="onModelChange()"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none font-serif italic"
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                      Quote Highlight Text (Red)
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="draft.home.standard.quoteHighlight"
                      (ngModelChange)="onModelChange()"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-red-200 bg-red-50/30 text-xs focus:bg-white outline-none font-serif font-bold text-red-600"
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Quote Suffix
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="draft.home.standard.quoteSuffix"
                      (ngModelChange)="onModelChange()"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none font-serif italic"
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Standard Paragraph 1
                    </label>
                    <textarea
                      rows="3"
                      [(ngModel)]="draft.home.standard.p1"
                      (ngModelChange)="onModelChange()"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none leading-relaxed"
                    ></textarea>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Standard Paragraph 2
                    </label>
                    <textarea
                      rows="3"
                      [(ngModel)]="draft.home.standard.p2"
                      (ngModelChange)="onModelChange()"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none leading-relaxed"
                    ></textarea>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Consultation Link Text
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="draft.home.standard.consultationText"
                      (ngModelChange)="onModelChange()"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none font-bold uppercase tracking-wider text-red-600"
                    />
                  </div>
                </div>
              </div>

              <!-- SECTION 2: PROPERTIES SHOWCASE SECTION -->
              <div id="editor-properties" class="border-t border-zinc-200/80 pt-6 space-y-4 scroll-mt-36">
                <div class="border-b border-zinc-100 pb-3 flex items-center justify-between">
                  <div>
                    <span class="text-[0.65rem] font-bold uppercase tracking-widest text-red-600 block">Home Section 2</span>
                    <h3 class="font-serif text-lg font-bold text-zinc-950">Properties Showcase Section</h3>
                  </div>
                  <button
                    type="button"
                    (click)="scrollToSection('properties')"
                    class="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Focus Preview ↗
                  </button>
                </div>

                <div class="space-y-3">
                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Section Eyebrow / Kicker
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="draft.home.propertiesSection.kicker"
                      (ngModelChange)="onModelChange()"
                      placeholder="Exclusive Inventory"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Section Main Title
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="draft.home.propertiesSection.title"
                      (ngModelChange)="onModelChange()"
                      placeholder="Featured Residences & Estates"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none font-serif text-sm font-bold"
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Section Subtitle / Descriptive Copy
                    </label>
                    <textarea
                      rows="2"
                      [(ngModel)]="draft.home.propertiesSection.subtitle"
                      (ngModelChange)="onModelChange()"
                      placeholder="Curated luxury residences across Ikoyi, Banana Island..."
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none leading-relaxed"
                    ></textarea>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      "View All" Button Label
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="draft.home.propertiesSection.viewAllText"
                      (ngModelChange)="onModelChange()"
                      placeholder="View All Properties"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none font-semibold"
                    />
                  </div>
                </div>
              </div>

              <!-- SECTION 3: MASTER DEVELOPMENTS & PROJECTS -->
              <div id="editor-projects" class="border-t border-zinc-200/80 pt-6 space-y-4 scroll-mt-36">
                <div class="border-b border-zinc-100 pb-3 flex items-center justify-between">
                  <div>
                    <span class="text-[0.65rem] font-bold uppercase tracking-widest text-red-600 block">Home Section 3</span>
                    <h3 class="font-serif text-lg font-bold text-zinc-950">Developments & Project Portfolio Matrix</h3>
                  </div>
                  <button
                    type="button"
                    (click)="scrollToSection('projects')"
                    class="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Focus Preview ↗
                  </button>
                </div>

                <div class="space-y-3">
                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Section Eyebrow / Kicker
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="draft.home.projectsSection.kicker"
                      (ngModelChange)="onModelChange()"
                      placeholder="Track Record & Pipeline"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none font-medium"
                    />
                  </div>

                  <div class="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                        Title Prefix
                      </label>
                      <input
                        type="text"
                        [(ngModel)]="draft.home.projectsSection.title"
                        (ngModelChange)="onModelChange()"
                        placeholder="Project"
                        class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none font-serif font-bold"
                      />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                        Highlight Phrase (Red & Italic)
                      </label>
                      <input
                        type="text"
                        [(ngModel)]="draft.home.projectsSection.highlight"
                        (ngModelChange)="onModelChange()"
                        placeholder="Portfolio Matrix"
                        class="w-full px-3.5 py-2.5 rounded-xl border border-red-200 bg-red-50/30 text-xs focus:bg-white outline-none font-serif font-bold text-red-600 italic"
                      />
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Section Subtitle / Descriptive Copy
                    </label>
                    <textarea
                      rows="2"
                      [(ngModel)]="draft.home.projectsSection.subtitle"
                      (ngModelChange)="onModelChange()"
                      placeholder="Showcasing 100% completed & sold-out architectural landmarks..."
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none leading-relaxed"
                    ></textarea>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      "View All" Button Label
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="draft.home.projectsSection.viewAllText"
                      (ngModelChange)="onModelChange()"
                      placeholder="View All Developments & Projects"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none font-semibold"
                    />
                  </div>
                </div>
              </div>

              <!-- SECTION 4: LUXURY SHORT STAY SECTION -->
              <div id="editor-shortstay" class="border-t border-zinc-200/80 pt-6 space-y-4 scroll-mt-36">
                <div class="border-b border-zinc-100 pb-3 flex items-center justify-between">
                  <div>
                    <span class="text-[0.65rem] font-bold uppercase tracking-widest text-red-600 block">Home Section 4</span>
                    <h3 class="font-serif text-lg font-bold text-zinc-950">Luxury Short Stay Suites Section</h3>
                  </div>
                  <button
                    type="button"
                    (click)="scrollToSection('shortstay')"
                    class="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Focus Preview ↗
                  </button>
                </div>

                <div class="space-y-3">
                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Section Eyebrow / Kicker
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="draft.home.shortStaySection.kicker"
                      (ngModelChange)="onModelChange()"
                      placeholder="Hospitality & Executive Living"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none font-medium"
                    />
                  </div>

                  <div class="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                        Title Prefix
                      </label>
                      <input
                        type="text"
                        [(ngModel)]="draft.home.shortStaySection.title"
                        (ngModelChange)="onModelChange()"
                        placeholder="Luxury Short Stay"
                        class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none font-serif font-bold"
                      />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                        Highlight Phrase (Red & Italic)
                      </label>
                      <input
                        type="text"
                        [(ngModel)]="draft.home.shortStaySection.highlight"
                        (ngModelChange)="onModelChange()"
                        placeholder="Apartments & Suites"
                        class="w-full px-3.5 py-2.5 rounded-xl border border-red-200 bg-red-50/30 text-xs focus:bg-white outline-none font-serif font-bold text-red-600 italic"
                      />
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Section Subtitle / Descriptive Copy
                    </label>
                    <textarea
                      rows="2"
                      [(ngModel)]="draft.home.shortStaySection.subtitle"
                      (ngModelChange)="onModelChange()"
                      placeholder="Experience 5-star hotel luxury with the privacy of a private residence..."
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none leading-relaxed"
                    ></textarea>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      "View All" Button Label
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="draft.home.shortStaySection.viewAllText"
                      (ngModelChange)="onModelChange()"
                      placeholder="View All Short-Stay Suites"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none font-semibold"
                    />
                  </div>
                </div>
              </div>

              <!-- SECTION 5: EXPLORE 7 CORE CAPABILITIES / SERVICES -->
              <div id="editor-services" class="border-t border-zinc-200/80 pt-6 space-y-4 scroll-mt-36">
                <div class="border-b border-zinc-100 pb-3 flex items-center justify-between">
                  <div>
                    <span class="text-[0.65rem] font-bold uppercase tracking-widest text-red-600 block">Home Section 5</span>
                    <h3 class="font-serif text-lg font-bold text-zinc-950">Explore 7 Core Capabilities</h3>
                  </div>
                  <button
                    type="button"
                    (click)="scrollToSection('services')"
                    class="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Focus Preview ↗
                  </button>
                </div>

                <div class="space-y-3">
                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Section Eyebrow / Kicker
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="draft.home.servicesSection.kicker"
                      (ngModelChange)="onModelChange()"
                      placeholder="Integrated Expertise"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none font-medium"
                    />
                  </div>

                  <div class="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                        Title Prefix
                      </label>
                      <input
                        type="text"
                        [(ngModel)]="draft.home.servicesSection.title"
                        (ngModelChange)="onModelChange()"
                        placeholder="Explore 7 Core"
                        class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none font-serif font-bold"
                      />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                        Highlight Phrase (Red & Italic)
                      </label>
                      <input
                        type="text"
                        [(ngModel)]="draft.home.servicesSection.highlight"
                        (ngModelChange)="onModelChange()"
                        placeholder="Capabilities"
                        class="w-full px-3.5 py-2.5 rounded-xl border border-red-200 bg-red-50/30 text-xs focus:bg-white outline-none font-serif font-bold text-red-600 italic"
                      />
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Section Subtitle / Descriptive Copy
                    </label>
                    <textarea
                      rows="2"
                      [(ngModel)]="draft.home.servicesSection.subtitle"
                      (ngModelChange)="onModelChange()"
                      placeholder="Click on each capability tab to explore how Nigson safeguards investments..."
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none leading-relaxed"
                    ></textarea>
                  </div>

                  <!-- 7 Service Items List -->
                  <div class="pt-3 space-y-3">
                    <span class="text-xs font-bold uppercase tracking-wider text-zinc-900 block">
                      Edit 7 Core Capability Cards & Images
                    </span>
                    <div class="space-y-3">
                      <div
                        *ngFor="let s of draft.home.servicesSection.items; let idx = index"
                        class="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-3"
                      >
                        <div class="flex items-center justify-between border-b border-zinc-200/70 pb-2">
                          <div class="flex items-center gap-2">
                            <span class="w-6 h-6 rounded-full bg-red-600 text-white font-bold text-[11px] flex items-center justify-center">
                              {{ s.num }}
                            </span>
                            <span class="text-xs font-serif font-bold text-zinc-950">{{ s.title }}</span>
                          </div>
                          <span class="text-[10px] uppercase font-bold text-zinc-500 bg-white px-2 py-0.5 rounded border border-zinc-200">
                            {{ s.tag }}
                          </span>
                        </div>

                        <div class="grid sm:grid-cols-2 gap-3">
                          <div>
                            <label class="block text-[11px] font-semibold text-zinc-600 mb-1">Capability Title</label>
                            <input
                              type="text"
                              [(ngModel)]="s.title"
                              (ngModelChange)="onModelChange()"
                              class="w-full px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-bold"
                            />
                          </div>
                          <div>
                            <label class="block text-[11px] font-semibold text-zinc-600 mb-1">Category Tag</label>
                            <input
                              type="text"
                              [(ngModel)]="s.tag"
                              (ngModelChange)="onModelChange()"
                              class="w-full px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label class="block text-[11px] font-semibold text-zinc-600 mb-1">Description</label>
                          <textarea
                            rows="2"
                            [(ngModel)]="s.desc"
                            (ngModelChange)="onModelChange()"
                            class="w-full px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs leading-relaxed"
                          ></textarea>
                        </div>

                        <!-- Card Image -->
                        <div>
                          <label class="block text-[11px] font-semibold text-zinc-600 mb-1">Card Background Image</label>
                          <div class="flex items-center gap-2">
                            <img [src]="s.image" [alt]="s.title" class="w-12 h-10 rounded-lg object-cover border border-zinc-300 shrink-0" />
                            <input
                              type="text"
                              [(ngModel)]="s.image"
                              (ngModelChange)="onModelChange()"
                              placeholder="/assets/villa.jpg or https://..."
                              class="flex-1 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-mono"
                            />
                            <!-- Choose a file button -->
                            <input
                              type="file"
                              accept="image/*"
                              class="hidden"
                              #cardFileInput
                              (change)="onUploadHomeServiceImage($event, idx)"
                            />
                            <button
                              type="button"
                              (click)="cardFileInput.click()"
                              class="px-3 py-1.5 bg-zinc-100 hover:bg-red-50 hover:text-red-600 hover:border-red-300 text-zinc-800 text-xs font-bold rounded-lg border border-zinc-200 flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-2xs"
                              title="Upload an image file from your computer"
                            >
                              <svg class="w-3.5 h-3.5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l4-4m0 0l4 4m-4-4v12" />
                              </svg>
                              <span>Choose a file</span>
                            </button>
                          </div>
                          <!-- Quick Presets -->
                          <div class="flex flex-wrap gap-1 mt-1.5">
                            <button
                              *ngFor="let p of quickHeroPresets.slice(0, 4)"
                              type="button"
                              (click)="setServiceItemImage(idx, p.url)"
                              class="text-[10px] px-2 py-0.5 rounded bg-zinc-200/80 hover:bg-zinc-300 text-zinc-700 transition-colors cursor-pointer"
                            >
                              {{ p.label }}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- SECTION 6: WHY CHOOSE NIGSON PROPERTIES -->
              <div id="editor-why-choose" class="border-t border-zinc-200/80 pt-6 space-y-4 scroll-mt-36">
                <div class="border-b border-zinc-100 pb-3 flex items-center justify-between">
                  <div>
                    <span class="text-[0.65rem] font-bold uppercase tracking-widest text-red-600 block">Home Section 6</span>
                    <h3 class="font-serif text-lg font-bold text-zinc-950">Why Choose Nigson Properties</h3>
                  </div>
                  <button
                    type="button"
                    (click)="scrollToSection('why-choose')"
                    class="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Focus Preview ↗
                  </button>
                </div>

                <div class="space-y-3">
                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Section Eyebrow / Kicker
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="draft.home.whyChooseSection.kicker"
                      (ngModelChange)="onModelChange()"
                      placeholder="The Nigson Standard"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none font-medium"
                    />
                  </div>

                  <div class="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                        Title Prefix
                      </label>
                      <input
                        type="text"
                        [(ngModel)]="draft.home.whyChooseSection.title"
                        (ngModelChange)="onModelChange()"
                        placeholder="Why Choose"
                        class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none font-serif font-bold"
                      />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                        Highlight Phrase (Red & Italic)
                      </label>
                      <input
                        type="text"
                        [(ngModel)]="draft.home.whyChooseSection.highlight"
                        (ngModelChange)="onModelChange()"
                        placeholder="Nigson Properties"
                        class="w-full px-3.5 py-2.5 rounded-xl border border-red-200 bg-red-50/30 text-xs focus:bg-white outline-none font-serif font-bold text-red-600 italic"
                      />
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Section Subtitle / Descriptive Copy
                    </label>
                    <textarea
                      rows="2"
                      [(ngModel)]="draft.home.whyChooseSection.subtitle"
                      (ngModelChange)="onModelChange()"
                      placeholder="Built on institutional integrity, European engineering standards..."
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none leading-relaxed"
                    ></textarea>
                  </div>

                  <!-- 6 Pillars Cards -->
                  <div class="pt-3 space-y-3">
                    <span class="text-xs font-bold uppercase tracking-wider text-zinc-900 block">
                      Edit 6 Institutional Pillars
                    </span>
                    <div class="grid sm:grid-cols-2 gap-3">
                      <div
                        *ngFor="let item of draft.home.whyChooseSection.items; let idx = index"
                        class="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200 space-y-2"
                      >
                        <div class="flex items-center gap-2">
                          <span class="w-5 h-5 rounded-full bg-red-100 text-red-600 font-bold text-[10px] flex items-center justify-center shrink-0">
                            {{ idx + 1 }}
                          </span>
                          <span class="text-[11px] font-bold text-zinc-500 uppercase">Pillar #{{ idx + 1 }}</span>
                        </div>
                        <input
                          type="text"
                          [(ngModel)]="item.title"
                          (ngModelChange)="onModelChange()"
                          placeholder="Pillar title"
                          class="w-full px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-bold"
                        />
                        <textarea
                          rows="3"
                          [(ngModel)]="item.desc"
                          (ngModelChange)="onModelChange()"
                          placeholder="Pillar description"
                          class="w-full px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs leading-relaxed"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- SECTION 7: CLIENT TESTIMONIALS & REVIEWS -->
              <div id="editor-testimonials" class="border-t border-zinc-200/80 pt-6 space-y-4 scroll-mt-36">
                <div class="border-b border-zinc-100 pb-3 flex items-center justify-between">
                  <div>
                    <span class="text-[0.65rem] font-bold uppercase tracking-widest text-red-600 block">Home Section 7</span>
                    <h3 class="font-serif text-lg font-bold text-zinc-950">Client Testimonials & Reviews</h3>
                  </div>
                  <button
                    type="button"
                    (click)="scrollToSection('testimonials')"
                    class="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Focus Preview ↗
                  </button>
                </div>

                <div class="space-y-3">
                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Section Eyebrow / Kicker
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="draft.home.testimonialsSection.kicker"
                      (ngModelChange)="onModelChange()"
                      placeholder="Proven Trust & Reputation"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Section Main Title
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="draft.home.testimonialsSection.title"
                      (ngModelChange)="onModelChange()"
                      placeholder="Client Testimonials & Reviews"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none font-serif text-sm font-bold"
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Section Subtitle / Descriptive Copy
                    </label>
                    <textarea
                      rows="2"
                      [(ngModel)]="draft.home.testimonialsSection.subtitle"
                      (ngModelChange)="onModelChange()"
                      placeholder="Hear directly from verified homeowners, diaspora investors..."
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none leading-relaxed"
                    ></textarea>
                  </div>

                  <!-- Testimonials Items -->
                  <div class="pt-3 space-y-3">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-bold uppercase tracking-wider text-zinc-900">
                        Verified Client Reviews ({{ draft.home.testimonialsSection.items.length }})
                      </span>
                      <button
                        type="button"
                        (click)="addHomeTestimonial()"
                        class="px-3 py-1 bg-zinc-950 hover:bg-red-600 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <span>+ Add Review</span>
                      </button>
                    </div>

                    <div class="space-y-3">
                      <div
                        *ngFor="let t of draft.home.testimonialsSection.items; let idx = index"
                        class="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-3"
                      >
                        <div class="flex items-center justify-between border-b border-zinc-200/70 pb-2">
                          <span class="text-xs font-bold text-zinc-900">Review #{{ idx + 1 }} · {{ t.name }}</span>
                          <button
                            type="button"
                            (click)="removeHomeTestimonial(idx)"
                            class="text-[11px] text-red-600 hover:text-red-800 font-semibold cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>

                        <div class="grid sm:grid-cols-3 gap-3">
                          <div>
                            <label class="block text-[11px] font-semibold text-zinc-600 mb-1">Client Name</label>
                            <input
                              type="text"
                              [(ngModel)]="t.name"
                              (ngModelChange)="onModelChange()"
                              placeholder="Full Name"
                              class="w-full px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-bold"
                            />
                          </div>

                          <div>
                            <label class="block text-[11px] font-semibold text-zinc-600 mb-1">Role / Designation</label>
                            <input
                              type="text"
                              [(ngModel)]="t.role"
                              (ngModelChange)="onModelChange()"
                              placeholder="e.g. Verified Homeowner"
                              class="w-full px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs"
                            />
                          </div>

                          <div>
                            <label class="block text-[11px] font-semibold text-zinc-600 mb-1">Category</label>
                            <select
                              [(ngModel)]="t.category"
                              (ngModelChange)="onModelChange()"
                              class="w-full px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-medium"
                            >
                              <option value="Homeowner">Homeowner</option>
                              <option value="Investor">Investor</option>
                              <option value="Short-Stay Guest">Short-Stay Guest</option>
                              <option value="Property Management">Property Management</option>
                            </select>
                          </div>
                        </div>

                        <div class="grid sm:grid-cols-2 gap-3">
                          <div>
                            <label class="block text-[11px] font-semibold text-zinc-600 mb-1">Project Referenced</label>
                            <input
                              type="text"
                              [(ngModel)]="t.project"
                              (ngModelChange)="onModelChange()"
                              placeholder="e.g. The Grand Azure Villa"
                              class="w-full px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs"
                            />
                          </div>
                          <div>
                            <label class="block text-[11px] font-semibold text-zinc-600 mb-1">Location</label>
                            <input
                              type="text"
                              [(ngModel)]="t.location"
                              (ngModelChange)="onModelChange()"
                              placeholder="e.g. Banana Island, Ikoyi"
                              class="w-full px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label class="block text-[11px] font-semibold text-zinc-600 mb-1">Client Quote</label>
                          <textarea
                            rows="3"
                            [(ngModel)]="t.quote"
                            (ngModelChange)="onModelChange()"
                            placeholder="Enter client testimonial quote..."
                            class="w-full px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs leading-relaxed italic"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>




            <!-- ================= SERVICES PAGE COPY ================= -->
            <div *ngIf="selectedPage() === 'services'" class="space-y-6">
              <div class="border-b border-zinc-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span class="text-[0.65rem] font-bold uppercase tracking-widest text-red-600 block">Services Matrix</span>
                  <h3 class="font-serif text-xl font-bold text-zinc-950">Explore 7 Core Capabilities</h3>
                  <p class="text-xs text-zinc-500">Edit titles, summaries, images, and Phase I–IV execution roadmaps for each service.</p>
                </div>
                <button
                  type="button"
                  (click)="resetServicesToDefault()"
                  class="px-3 py-1.5 bg-zinc-100 hover:bg-red-50 hover:text-red-600 text-zinc-700 text-xs font-semibold rounded-lg border border-zinc-200 transition-colors cursor-pointer self-start sm:self-auto shrink-0 shadow-2xs"
                  title="Restore default 7 services with Phase I-IV roadmaps"
                >
                  Reset 7 Services
                </button>
              </div>

              <div class="space-y-6">
                <div *ngFor="let s of draft.services.servicesList; let idx = index" class="p-5 bg-zinc-50/80 border border-zinc-200 rounded-2xl space-y-4">
                  <!-- Header -->
                  <div class="flex items-center justify-between border-b border-zinc-200/80 pb-3">
                    <div class="flex items-center gap-2">
                      <span class="w-6 h-6 rounded-lg bg-red-600 text-white font-mono font-bold text-xs flex items-center justify-center">{{ s.num }}</span>
                      <span class="text-sm font-bold text-zinc-950 font-serif">{{ s.title }}</span>
                    </div>
                    <span class="text-[10px] px-2.5 py-1 bg-white text-zinc-700 rounded-md font-semibold border border-zinc-200">{{ s.tagline }}</span>
                  </div>

                  <!-- Title & Tagline -->
                  <div class="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label class="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Service Title</label>
                      <input
                        type="text"
                        [(ngModel)]="s.title"
                        (ngModelChange)="onModelChange()"
                        placeholder="Service Title"
                        class="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-white text-xs font-semibold outline-none"
                      />
                    </div>
                    <div>
                      <label class="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Tagline</label>
                      <input
                        type="text"
                        [(ngModel)]="s.tagline"
                        (ngModelChange)="onModelChange()"
                        placeholder="Tagline"
                        class="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-white text-xs outline-none"
                      />
                    </div>
                  </div>

                  <!-- Summary -->
                  <div>
                    <label class="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Service Summary</label>
                    <textarea
                      rows="2"
                      [(ngModel)]="s.summary"
                      (ngModelChange)="onModelChange()"
                      placeholder="Service Summary"
                      class="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-white text-xs leading-relaxed outline-none"
                    ></textarea>
                  </div>

                  <!-- Image URL & Choose File -->
                  <div>
                    <label class="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Service Image</label>
                    <div class="flex items-center gap-3">
                      <img [src]="s.image" class="w-14 h-11 rounded-lg object-cover border border-zinc-300 shrink-0 shadow-2xs" alt="" />
                      <input
                        type="text"
                        [(ngModel)]="s.image"
                        (ngModelChange)="onModelChange()"
                        placeholder="Image URL"
                        class="flex-1 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-[11px] font-mono outline-none"
                      />
                      <!-- Choose a file button -->
                      <input
                        type="file"
                        accept="image/*"
                        class="hidden"
                        #servicePageFileInput
                        (change)="onUploadServicesPageItemImage($event, idx)"
                      />
                      <button
                        type="button"
                        (click)="servicePageFileInput.click()"
                        class="px-3 py-1.5 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-300 text-zinc-800 text-xs font-bold rounded-lg border border-zinc-200 flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-2xs"
                        title="Upload an image file from your computer"
                      >
                        <svg class="w-3.5 h-3.5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l4-4m0 0l4 4m-4-4v12" />
                        </svg>
                        <span>Choose file</span>
                      </button>
                    </div>
                  </div>

                  <!-- Execution Roadmap / Process Phases (Phase I, Phase II, Phase III, Phase IV) -->
                  <div class="pt-2 border-t border-zinc-200/80">
                    <div class="flex items-center justify-between mb-2.5">
                      <div class="flex items-center gap-2">
                        <span class="text-[11px] font-bold uppercase tracking-wider text-red-600">Phases & Execution Roadmap</span>
                        <span class="text-[10px] text-zinc-400 font-medium">(Phase I · Phase II · Phase III · Phase IV)</span>
                      </div>
                      <button
                        type="button"
                        (click)="addServiceProcessStep(idx)"
                        class="text-[11px] font-semibold text-red-600 hover:text-red-700 hover:underline cursor-pointer flex items-center gap-1"
                      >
                        + Add Phase
                      </button>
                    </div>

                    <div class="grid sm:grid-cols-2 gap-3">
                      <div
                        *ngFor="let p of s.process; let pIdx = index"
                        class="p-3 bg-white border border-zinc-200/90 rounded-xl space-y-2 shadow-2xs"
                      >
                        <div class="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            [(ngModel)]="p.step"
                            (ngModelChange)="onModelChange()"
                            placeholder="e.g. Phase I"
                            class="w-24 px-2 py-1 rounded-lg border border-zinc-200 bg-zinc-50 focus:bg-white text-[11px] font-bold text-red-600 outline-none uppercase"
                          />
                          <input
                            type="text"
                            [(ngModel)]="p.title"
                            (ngModelChange)="onModelChange()"
                            placeholder="Phase Title"
                            class="flex-1 px-2.5 py-1 rounded-lg border border-zinc-200 bg-zinc-50 focus:bg-white text-xs font-semibold text-zinc-900 outline-none"
                          />
                          <button
                            type="button"
                            (click)="removeServiceProcessStep(idx, pIdx)"
                            *ngIf="s.process.length > 1"
                            class="text-zinc-400 hover:text-red-600 p-1 text-xs cursor-pointer"
                            title="Remove Phase"
                          >
                            ✕
                          </button>
                        </div>
                        <textarea
                          rows="2"
                          [(ngModel)]="p.desc"
                          (ngModelChange)="onModelChange()"
                          placeholder="Phase description..."
                          class="w-full px-2.5 py-1.5 rounded-lg border border-zinc-200 bg-zinc-50 focus:bg-white text-xs text-zinc-600 leading-relaxed outline-none"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- ================= ABOUT PAGE COPY ================= -->
            <div *ngIf="selectedPage() === 'about'" class="space-y-6">
              <div class="border-b border-zinc-100 pb-3">
                <span class="text-[0.65rem] font-bold uppercase tracking-widest text-red-600 block">About Sections</span>
                <h3 class="font-serif text-xl font-bold text-zinc-950">Brand Origin & Narrative</h3>
              </div>

              <div class="space-y-3">
                <div>
                  <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Narrative Headline
                  </label>
                  <input
                    type="text"
                    [(ngModel)]="draft.about.narrative.title"
                    (ngModelChange)="onModelChange()"
                    class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none font-medium"
                  />
                </div>

                <div>
                  <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Narrative Paragraph 1
                  </label>
                  <textarea
                    rows="3"
                    [(ngModel)]="draft.about.narrative.p1"
                    (ngModelChange)="onModelChange()"
                    class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none leading-relaxed"
                  ></textarea>
                </div>

                <div>
                  <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Narrative Paragraph 2
                  </label>
                  <textarea
                    rows="3"
                    [(ngModel)]="draft.about.narrative.p2"
                    (ngModelChange)="onModelChange()"
                    class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none leading-relaxed"
                  ></textarea>
                </div>

                <div>
                  <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Narrative Paragraph 3
                  </label>
                  <textarea
                    rows="3"
                    [(ngModel)]="draft.about.narrative.p3"
                    (ngModelChange)="onModelChange()"
                    class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none leading-relaxed"
                  ></textarea>
                </div>
              </div>

              <!-- Executive Board Card Image -->
              <div class="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-3">
                <span class="text-xs font-bold uppercase tracking-wider text-zinc-900 block">Executive Board Card Image</span>
                <div class="flex items-center gap-3">
                  <img [src]="draft.about.boardCard.image" class="w-16 h-12 rounded-xl object-cover border border-zinc-300 shadow-sm" alt="" />
                  <div class="flex-1 space-y-1">
                    <input
                      type="text"
                      [(ngModel)]="draft.about.boardCard.title"
                      (ngModelChange)="onModelChange()"
                      placeholder="Board card title"
                      class="w-full px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-semibold"
                    />
                    <input
                      type="text"
                      [(ngModel)]="draft.about.boardCard.image"
                      (ngModelChange)="onModelChange()"
                      placeholder="/assets/consultation.jpg"
                      class="w-full px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-[11px] font-mono"
                    />
                  </div>
                </div>
              </div>

              <!-- Strategic Mission & Vision -->
              <div class="border-t border-zinc-200/80 pt-5 space-y-4">
                <div class="border-b border-zinc-100 pb-2">
                  <span class="text-[0.65rem] font-bold uppercase tracking-widest text-red-600 block">Strategic North Star</span>
                  <h3 class="font-serif text-xl font-bold text-zinc-950">Our Mission & Our Vision</h3>
                </div>

                <div class="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-2">
                  <div class="flex items-center gap-2">
                    <span class="text-base">🎯</span>
                    <label class="block text-xs font-bold text-zinc-900 uppercase tracking-wider">
                      Our Mission
                    </label>
                  </div>
                  <textarea
                    rows="3"
                    [(ngModel)]="draft.about.missionVision.mission"
                    (ngModelChange)="onModelChange()"
                    placeholder="Enter our mission statement..."
                    class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-xs focus:bg-white outline-none leading-relaxed"
                  ></textarea>
                </div>

                <div class="p-4 bg-zinc-900 text-white border border-zinc-800 rounded-2xl space-y-2">
                  <div class="flex items-center gap-2">
                    <span class="text-base">🏛️</span>
                    <label class="block text-xs font-bold text-red-400 uppercase tracking-wider">
                      Our Vision
                    </label>
                  </div>
                  <textarea
                    rows="3"
                    [(ngModel)]="draft.about.missionVision.vision"
                    (ngModelChange)="onModelChange()"
                    placeholder="Enter our vision statement..."
                    class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-white text-xs focus:border-red-500 outline-none leading-relaxed"
                  ></textarea>
                </div>
              </div>

              <!-- Our 7 Core Values -->
              <div class="border-t border-zinc-200/80 pt-5 space-y-4">
                <div class="border-b border-zinc-100 pb-2 flex items-center justify-between">
                  <div>
                    <span class="text-[0.65rem] font-bold uppercase tracking-widest text-red-600 block">The Nigson Standard</span>
                    <h3 class="font-serif text-xl font-bold text-zinc-950">Our 7 Core Values</h3>
                  </div>
                  <button
                    type="button"
                    (click)="addCoreValue()"
                    class="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center gap-1"
                  >
                    <span>+ Add Value</span>
                  </button>
                </div>

                <div class="space-y-3">
                  <div
                    *ngFor="let val of draft.about.coreValues; let idx = index; trackBy: trackByIndex"
                    class="p-4 bg-zinc-50 border border-zinc-200/90 rounded-2xl space-y-3 relative"
                  >
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-mono font-bold text-red-600">Core Value #0{{ idx + 1 }}</span>
                      <button
                        *ngIf="draft.about.coreValues.length > 1"
                        type="button"
                        (click)="removeCoreValue(idx)"
                        class="text-[11px] text-zinc-400 hover:text-red-600 cursor-pointer font-bold transition-colors"
                      >
                        Remove
                      </button>
                    </div>

                    <div>
                      <label class="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Value Title</label>
                      <input
                        type="text"
                        [(ngModel)]="val.title"
                        (ngModelChange)="onModelChange()"
                        placeholder="e.g. Professionalism"
                        class="w-full px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-semibold"
                      />
                    </div>

                    <div>
                      <label class="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Description</label>
                      <textarea
                        rows="2"
                        [(ngModel)]="val.desc"
                        (ngModelChange)="onModelChange()"
                        placeholder="Detailed ethical conduct or standard description..."
                        class="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-white text-xs leading-relaxed"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Why Choose Nigson Properties -->
              <div class="border-t border-zinc-200/80 pt-5 space-y-4">
                <div class="border-b border-zinc-100 pb-2 flex items-center justify-between">
                  <div>
                    <span class="text-[0.65rem] font-bold uppercase tracking-widest text-red-600 block">Value Proposition</span>
                    <h3 class="font-serif text-xl font-bold text-zinc-950">Why Choose Nigson Properties</h3>
                  </div>
                  <button
                    type="button"
                    (click)="addWhyChoose()"
                    class="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center gap-1"
                  >
                    <span>+ Add Reason</span>
                  </button>
                </div>

                <div class="space-y-3">
                  <div
                    *ngFor="let pillar of draft.about.whyChoose; let idx = index; trackBy: trackByIndex"
                    class="p-4 bg-[#FAF9F6] border border-zinc-200/90 rounded-2xl space-y-3"
                  >
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <span class="w-5 h-5 rounded-md bg-red-100 text-red-600 flex items-center justify-center font-bold text-[10px]">✓</span>
                        <span class="text-xs font-bold text-zinc-700">Pillar #{{ idx + 1 }}</span>
                      </div>
                      <button
                        *ngIf="draft.about.whyChoose.length > 1"
                        type="button"
                        (click)="removeWhyChoose(idx)"
                        class="text-[11px] text-zinc-400 hover:text-red-600 cursor-pointer font-bold transition-colors"
                      >
                        Remove
                      </button>
                    </div>

                    <div>
                      <label class="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Pillar Title</label>
                      <input
                        type="text"
                        [(ngModel)]="pillar.title"
                        (ngModelChange)="onModelChange()"
                        placeholder="e.g. A Decade of Excellence"
                        class="w-full px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-semibold"
                      />
                    </div>

                    <div>
                      <label class="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Description</label>
                      <textarea
                        rows="2"
                        [(ngModel)]="pillar.desc"
                        (ngModelChange)="onModelChange()"
                        placeholder="Detailed pillar description..."
                        class="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-white text-xs leading-relaxed"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- ================= CONTACT PAGE COPY ================= -->
            <div *ngIf="selectedPage() === 'contact'" class="space-y-5">
              <div class="border-b border-zinc-100 pb-3">
                <span class="text-[0.65rem] font-bold uppercase tracking-widest text-red-600 block">Contact Sections</span>
                <h3 class="font-serif text-xl font-bold text-zinc-950">Direct Channels & Office Details</h3>
              </div>

              <div class="space-y-3">
                <div>
                  <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Office Heading
                  </label>
                  <input
                    type="text"
                    [(ngModel)]="draft.contact.office.title"
                    (ngModelChange)="onModelChange()"
                    class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none font-medium"
                  />
                </div>

                <div>
                  <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Office Subtitle
                  </label>
                  <textarea
                    rows="2"
                    [(ngModel)]="draft.contact.office.desc"
                    (ngModelChange)="onModelChange()"
                    class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none leading-relaxed"
                  ></textarea>
                </div>

                <!-- Telephone Lines -->
                <div class="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Primary Telephone Line
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="draft.contact.office.phones[0]"
                      (ngModelChange)="onModelChange()"
                      placeholder="08073467809"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Secondary Telephone Line
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="draft.contact.office.phones[1]"
                      (ngModelChange)="onModelChange()"
                      placeholder="09134446722"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none font-mono"
                    />
                  </div>
                </div>

                <div class="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="draft.contact.office.addressLine1"
                      (ngModelChange)="onModelChange()"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Address Line 2 (City / State)
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="draft.contact.office.addressLine2"
                      (ngModelChange)="onModelChange()"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none"
                    />
                  </div>
                </div>

                <div class="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Corporate Email
                    </label>
                    <input
                      type="email"
                      [(ngModel)]="draft.contact.office.email"
                      (ngModelChange)="onModelChange()"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Office Hours
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="draft.contact.office.hours"
                      (ngModelChange)="onModelChange()"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none"
                    />
                  </div>
                </div>

                <div class="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      WhatsApp Direct Line
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="draft.contact.office.whatsapp"
                      (ngModelChange)="onModelChange()"
                      placeholder="2348073467809"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Headquarters Card Label
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="draft.contact.office.headquartersTitle"
                      (ngModelChange)="onModelChange()"
                      placeholder="Corporate Headquarters"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none"
                    />
                  </div>
                </div>
              </div>

              <!-- ================= SECTION: PROPERTY INQUIRY & CONSULTATION ================= -->
              <div class="border-t border-zinc-200/80 pt-5 space-y-4">
                <div class="border-b border-zinc-100 pb-2">
                  <span class="text-[0.65rem] font-bold uppercase tracking-widest text-red-600 block">Lead Generation & Advisory</span>
                  <h3 class="font-serif text-xl font-bold text-zinc-950">Property Inquiry & Consultation</h3>
                </div>

                <div class="space-y-3">
                  <div class="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                        Form Kicker
                      </label>
                      <input
                        type="text"
                        [(ngModel)]="draft.contact.inquiryForm.kicker"
                        (ngModelChange)="onModelChange()"
                        placeholder="CLIENT ENGAGEMENT"
                        class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none font-medium"
                      />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                        Submit Button Text
                      </label>
                      <input
                        type="text"
                        [(ngModel)]="draft.contact.inquiryForm.buttonText"
                        (ngModelChange)="onModelChange()"
                        placeholder="SUBMIT PROPERTY INQUIRY"
                        class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Form Title
                    </label>
                    <input
                      type="text"
                      [(ngModel)]="draft.contact.inquiryForm.title"
                      (ngModelChange)="onModelChange()"
                      placeholder="Property Inquiry & Consultation"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none font-semibold text-zinc-950"
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Form Subtitle / Instructions
                    </label>
                    <textarea
                      rows="2"
                      [(ngModel)]="draft.contact.inquiryForm.desc"
                      (ngModelChange)="onModelChange()"
                      placeholder="Complete this inquiry form and our designated sales and client services team will contact you promptly."
                      class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none leading-relaxed"
                    ></textarea>
                  </div>

                  <div class="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                        Success Banner Title
                      </label>
                      <input
                        type="text"
                        [(ngModel)]="draft.contact.inquiryForm.successTitle"
                        (ngModelChange)="onModelChange()"
                        placeholder="Inquiry Dispatched Successfully"
                        class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                        Success Confirmation Note
                      </label>
                      <input
                        type="text"
                        [(ngModel)]="draft.contact.inquiryForm.successMessage"
                        (ngModelChange)="onModelChange()"
                        placeholder="Our sales and client services team will contact you shortly."
                        class="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs focus:bg-white outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>



        </div>

        <!-- RIGHT COLUMN: THE EXACT LIVE PAGE VIEW (CANVAS / IFRAME) -->
        <div
          *ngIf="viewMode() !== 'editor'"
          class="flex flex-col items-center"
          [ngClass]="getPreviewColClass()"
        >
          <!-- BROWSER CHROME MOCK FRAME -->
          <div
            class="w-full bg-[#18181B] rounded-2xl overflow-hidden shadow-2xl border border-zinc-700/80 transition-all duration-300"
            [ngClass]="getViewportClass()"
          >
            <!-- Browser Chrome Header Bar -->
            <div class="bg-[#27272A] px-4 py-2.5 flex items-center justify-between gap-3 border-b border-zinc-700 select-none">
              <!-- Window Traffic Light Dots -->
              <div class="flex items-center gap-1.5 shrink-0">
                <span class="w-3 h-3 rounded-full bg-[#EF4444] inline-block"></span>
                <span class="w-3 h-3 rounded-full bg-[#F59E0B] inline-block"></span>
                <span class="w-3 h-3 rounded-full bg-[#10B981] inline-block"></span>
              </div>

              <!-- Address Bar Mock with Real Route & SSL Lock -->
              <div class="flex-1 max-w-lg bg-[#18181B] rounded-lg px-3 py-1 flex items-center gap-2 text-zinc-300 text-xs border border-zinc-700">
                <svg class="w-3 h-3 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span class="text-zinc-500 font-mono text-[11px]">https://</span>
                <span class="text-white font-mono text-[11px] font-medium truncate">nigsonproperties.com{{ activePageTab.route }}</span>
                <span class="ml-auto text-[9px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-800">
                  LIVE 200 OK
                </span>
              </div>

              <!-- Device & Live Indicator -->
              <div class="flex items-center gap-2 shrink-0">
                <span class="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">
                  {{ getViewportDimensions() }}
                </span>
                <button
                  type="button"
                  (click)="reloadPreview()"
                  class="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Refresh exact page preview"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- THE EXACT LIVE PAGE IFRAME -->
            <div class="relative bg-white w-full">
              <iframe
                [src]="currentSafeUrl"
                class="w-full border-none transition-all duration-300"
                style="height: 780px;"
                title="Exact Live Website Page Preview"
              ></iframe>

              <!-- Floating Live Preview Badge -->
              <div class="absolute bottom-4 right-4 z-20 pointer-events-none bg-zinc-950/90 text-white backdrop-blur-md px-3 py-1.5 rounded-full border border-zinc-700 shadow-xl flex items-center gap-2 text-xs">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span class="font-sans font-medium text-[11px]">Exact Render: {{ activePageTab.name }}</span>
              </div>
            </div>
          </div>

          <!-- Bottom helper hint -->
          <div class="mt-2 text-center text-xs text-zinc-400 flex items-center justify-center gap-2">
            <span>Scroll & click inside the frame to test exact page interactivity.</span>
            <span>·</span>
            <button (click)="openLivePageInNewTab()" class="text-red-600 hover:underline font-semibold cursor-pointer">
              Open Fullscreen ↗
            </button>
          </div>
        </div>

      </div>
    </div>
  `
})
export class AdminCmsComponent {
  cmsService = inject(CmsService);
  sanitizer = inject(DomSanitizer);

  logAction = output<{ action: string; target: string }>();
  showToastMsg = output<string>();

  selectedPage = signal<CmsPageId>('home');
  viewport = signal<CmsViewport>('desktop');
  viewMode = signal<CmsViewMode>('split');
  editorSection = signal<'content'>('content');
  previewNonce = signal<number>(Date.now());

  // Deep clone of CMS content for two-way binding
  draft: CmsContent = JSON.parse(JSON.stringify(this.cmsService.cmsData()));

  constructor() {
    this.ensureDraftIntegrity();
  }

  pages: CmsPageTab[] = [
    { id: 'home', name: 'Home Page', route: '/', icon: '🏠', badge: 'HERO', description: 'Hero, Nigson Standard, Stats & Featured' },
    { id: 'properties', name: 'Properties Page', route: '/properties', icon: '🏢', badge: 'PORTFOLIO', description: 'Curated Portfolio & Off-Market Banner' },
    { id: 'shortStay', name: 'Short Stay Page', route: '/short-stay', icon: '🛎️', badge: 'SUITES', description: 'Executive Suites & VIP Hospitality Desk' },
    { id: 'projects', name: 'Projects Page', route: '/projects', icon: '🏗️', badge: 'PIPELINE', description: 'Developments Matrix & Portfolio Stats' },
    { id: 'services', name: 'Services Page', route: '/services', icon: '🛠️', badge: 'SERVICES', description: 'Full Real Estate 6 Services Matrix' },
    { id: 'about', name: 'About Page', route: '/about', icon: '🏛️', badge: 'HERITAGE', description: 'Pedigree, Narrative & Board Leadership' },
    { id: 'contact', name: 'Contact Page', route: '/contact', icon: '📞', badge: 'VIP DESK', description: 'Corporate Office, Direct Phones & Email' }
  ];

  quickHeroPresets = [
    { label: 'Lagoon Estate', url: '/assets/hero.jpg' },
    { label: 'Waterfront Villa', url: '/assets/villa.jpg' },
    { label: 'Sky Penthouse', url: '/assets/penthouse.jpg' },
    { label: 'Whitesand Enclave', url: '/assets/projects/whitesand-1.jpg' },
    { label: 'Executive Suite I', url: '/assets/suite1.jpg' },
    { label: 'Executive Board', url: '/assets/consultation.jpg' }
  ];

  assetGallery = [
    { label: 'Lagoon Estate Dusk', url: '/assets/hero.jpg' },
    { label: 'Waterfront Villa', url: '/assets/villa.jpg' },
    { label: 'Sky Penthouse Terrace', url: '/assets/penthouse.jpg' },
    { label: 'Contemporary Townhomes', url: '/assets/terrace.jpg' },
    { label: 'Whitesand Enclave Lekki', url: '/assets/projects/whitesand-1.jpg' },
    { label: 'White Oaks Phase II', url: '/assets/white-oaks-1.jpg' },
    { label: 'Banana Island Waterfront', url: '/assets/banana-1.jpg' },
    { label: 'Fatai Bankole Villa', url: '/assets/fatai-bankole-1.jpg' },
    { label: 'Executive Suite I (Ikoyi)', url: '/assets/suite1.jpg' },
    { label: 'Executive Suite II (Banana)', url: '/assets/suite2.jpg' },
    { label: 'High-Rise Architectural Towers', url: '/assets/towers.jpg' },
    { label: 'Master Community Horizon', url: '/assets/community.jpg' },
    { label: 'Executive Board Consultation', url: '/assets/consultation.jpg' },
    { label: 'Olufemi Olatunji Residence', url: '/assets/olufemi-olatunji-1.jpg' },
    { label: 'Benson Close Luxury Suite', url: '/assets/benson-close-1.jpg' }
  ];

  get activePageTab(): CmsPageTab {
    return this.pages.find(p => p.id === this.selectedPage()) || this.pages[0];
  }

  get activeHero(): any {
    const page = this.selectedPage();
    return this.draft[page].hero;
  }

  get currentSafeUrl(): SafeResourceUrl {
    const tab = this.activePageTab;
    const url = `${tab.route}?preview=1&v=${this.previewNonce()}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  trackByIndex(index: number): number {
    return index;
  }

  selectPage(pageId: CmsPageId) {
    this.selectedPage.set(pageId);
    this.previewNonce.set(Date.now());
  }

  getViewportClass(): string {
    switch (this.viewport()) {
      case 'laptop': return 'max-w-[1024px]';
      case 'tablet': return 'max-w-[768px]';
      case 'mobile': return 'max-w-[390px]';
      default: return 'w-full';
    }
  }

  getViewportDimensions(): string {
    switch (this.viewport()) {
      case 'laptop': return '1024 × 780';
      case 'tablet': return '768 × 780';
      case 'mobile': return '390 × 780';
      default: return '100% Fluid';
    }
  }

  getContentColClass(): string {
    if (this.viewMode() !== 'split') {
      return 'w-full';
    }
    return 'lg:col-span-6 lg:min-h-[850px] lg:max-h-[calc(100vh-40px)] xl:min-h-[920px] lg:overflow-y-auto lg:pr-3.5 custom-scrollbar scroll-smooth';
  }

  getPreviewColClass(): string {
    if (this.viewMode() !== 'split') {
      return 'w-full';
    }
    return 'lg:col-span-6 lg:sticky lg:top-4';
  }

  onUploadHomeServiceImage(event: Event, itemIndex: number) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          this.draft.home.servicesSection.items[itemIndex].image = reader.result;
          this.onModelChange();
          this.showToastMsg.emit(`Capability #${itemIndex + 1} image uploaded successfully.`);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onUploadServicesPageItemImage(event: Event, itemIndex: number) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          this.draft.services.servicesList[itemIndex].image = reader.result;
          this.onModelChange();
          this.showToastMsg.emit(`Service #${itemIndex + 1} image uploaded successfully.`);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  setHeroBgImage(url: string) {
    this.activeHero.bgImage = url;
    this.onModelChange();
  }

  onUploadHeroImage(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          this.activeHero.bgImage = reader.result;
          this.onModelChange();
          this.showToastMsg.emit('Image uploaded successfully into draft.');
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onModelChange() {
    // Automatically propagate changes to the service and iframe live!
    const page = this.selectedPage();
    this.cmsService.updatePage(page, this.draft[page]);
  }

  reloadPreview() {
    this.previewNonce.set(Date.now());
    this.showToastMsg.emit(`Refreshed live preview of ${this.activePageTab.name}.`);
  }

  scrollToSection(anchorId: string) {
    if (typeof document !== 'undefined') {
      const el = document.getElementById('editor-' + anchorId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      try {
        const iframe = document.querySelector('iframe') as HTMLIFrameElement;
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.location.hash = anchorId;
        }
      } catch (e) {
        // Safe cross-origin fallback
      }
    }
  }

  setServiceItemImage(idx: number, url: string) {
    if (this.draft.home.servicesSection?.items?.[idx]) {
      this.draft.home.servicesSection.items[idx].image = url;
      this.onModelChange();
      this.showToastMsg.emit('Updated service capability image.');
    }
  }

  addHomeTestimonial() {
    if (!this.draft.home.testimonialsSection.items) {
      this.draft.home.testimonialsSection.items = [];
    }
    this.draft.home.testimonialsSection.items.push({
      name: 'New Client Reviewer',
      role: 'Verified Homeowner',
      project: 'Signature Ikoyi Residence',
      location: 'Lagos, Nigeria',
      category: 'Homeowner',
      rating: 5,
      quote: 'Exceptional build quality, reliable power, and a truly effortless property transaction.'
    });
    this.onModelChange();
    this.showToastMsg.emit('Added new testimonial card.');
  }

  removeHomeTestimonial(idx: number) {
    if (confirm('Are you sure you want to remove this client review?')) {
      this.draft.home.testimonialsSection.items.splice(idx, 1);
      this.onModelChange();
      this.showToastMsg.emit('Removed testimonial review.');
    }
  }

  openLivePageInNewTab() {
    if (typeof window !== 'undefined') {
      window.open(this.activePageTab.route, '_blank');
    }
  }

  saveAndPublish() {
    const page = this.selectedPage();
    this.cmsService.updatePage(page, this.draft[page]);
    this.previewNonce.set(Date.now());

    this.logAction.emit({
      action: 'Page Content Published',
      target: `CMS: ${this.activePageTab.name} (${this.activePageTab.route}) updated & published.`
    });

    this.showToastMsg.emit(`Published changes to "${this.activePageTab.name}" successfully!`);
  }

  resetCurrentPage() {
    const page = this.selectedPage();
    if (confirm(`Are you sure you want to restore "${this.activePageTab.name}" back to corporate defaults? Any unsaved edits will be discarded.`)) {
      this.cmsService.resetPage(page);
      this.draft[page] = JSON.parse(JSON.stringify(DEFAULT_CMS_CONTENT[page]));
      this.ensureDraftIntegrity();
      this.previewNonce.set(Date.now());

      this.logAction.emit({
        action: 'Page Content Reset',
        target: `CMS: ${this.activePageTab.name} restored to default corporate values.`
      });

      this.showToastMsg.emit(`Restored "${this.activePageTab.name}" to default settings.`);
    }
  }

  ensureDraftIntegrity() {
    if (!this.draft.contact) {
      this.draft.contact = JSON.parse(JSON.stringify(DEFAULT_CMS_CONTENT.contact));
    }
    if (!this.draft.contact.office) {
      this.draft.contact.office = { ...DEFAULT_CMS_CONTENT.contact.office };
    }
    if (!this.draft.contact.office.phones || !this.draft.contact.office.phones.length) {
      this.draft.contact.office.phones = [...DEFAULT_CMS_CONTENT.contact.office.phones];
    }
    if (!this.draft.contact.office.phones[0]) this.draft.contact.office.phones[0] = '08073467809';
    if (!this.draft.contact.office.phones[1]) this.draft.contact.office.phones[1] = '09134446722';
    if (!this.draft.contact.office.whatsapp) this.draft.contact.office.whatsapp = '2348073467809';
    if (!this.draft.contact.inquiryForm) {
      this.draft.contact.inquiryForm = { ...DEFAULT_CMS_CONTENT.contact.inquiryForm };
    }

    if (!this.draft.about) {
      this.draft.about = JSON.parse(JSON.stringify(DEFAULT_CMS_CONTENT.about));
    }
    if (!this.draft.about.missionVision) {
      this.draft.about.missionVision = { ...DEFAULT_CMS_CONTENT.about.missionVision };
    }
    if (!this.draft.about.coreValues || !this.draft.about.coreValues.length) {
      this.draft.about.coreValues = JSON.parse(JSON.stringify(DEFAULT_CMS_CONTENT.about.coreValues));
    }
    if (!this.draft.about.whyChoose || !this.draft.about.whyChoose.length) {
      this.draft.about.whyChoose = JSON.parse(JSON.stringify(DEFAULT_CMS_CONTENT.about.whyChoose));
    }

    if (!this.draft.services) {
      this.draft.services = JSON.parse(JSON.stringify(DEFAULT_CMS_CONTENT.services));
    }
    if (!this.draft.services.servicesList || this.draft.services.servicesList.length < 7) {
      this.draft.services.servicesList = JSON.parse(JSON.stringify(DEFAULT_CMS_CONTENT.services.servicesList));
    } else {
      const defaultServices = DEFAULT_CMS_CONTENT.services.servicesList;
      this.draft.services.servicesList.forEach((s, idx) => {
        if (!s.process || s.process.length === 0) {
          s.process = defaultServices[idx]?.process
            ? JSON.parse(JSON.stringify(defaultServices[idx].process))
            : [
                { step: 'Phase I', title: 'Consultation & Discovery', desc: 'Initial scoping and needs assessment.' },
                { step: 'Phase II', title: 'Strategy & Framework', desc: 'Developing the execution roadmap.' },
                { step: 'Phase III', title: 'Operational Execution', desc: 'On-site execution with quality control.' },
                { step: 'Phase IV', title: 'Delivery & Ongoing Care', desc: 'Commissioning and ongoing client satisfaction.' }
              ];
        }
      });
    }
  }

  addServiceProcessStep(serviceIdx: number) {
    const service = this.draft.services.servicesList[serviceIdx];
    if (service) {
      if (!service.process) service.process = [];
      const phaseNum = ['Phase I', 'Phase II', 'Phase III', 'Phase IV', 'Phase V', 'Phase VI'][service.process.length] || `Phase ${service.process.length + 1}`;
      service.process.push({
        step: phaseNum,
        title: 'New Phase',
        desc: 'Phase execution and quality delivery details.'
      });
      this.onModelChange();
      this.showToastMsg.emit(`Added ${phaseNum} to ${service.title}.`);
    }
  }

  removeServiceProcessStep(serviceIdx: number, pIdx: number) {
    const service = this.draft.services.servicesList[serviceIdx];
    if (service && service.process) {
      service.process.splice(pIdx, 1);
      this.onModelChange();
      this.showToastMsg.emit('Removed phase step.');
    }
  }

  resetServicesToDefault() {
    this.draft.services.servicesList = JSON.parse(JSON.stringify(DEFAULT_CMS_CONTENT.services.servicesList));
    this.onModelChange();
    this.showToastMsg.emit('Reset all 7 services and Phase I–IV roadmaps to defaults.');
  }

  addCoreValue() {
    if (!this.draft.about.coreValues) {
      this.draft.about.coreValues = [];
    }
    this.draft.about.coreValues.push({
      title: 'New Core Value',
      desc: 'Commitment to excellence and client satisfaction.'
    });
    this.onModelChange();
    this.showToastMsg.emit('Added new core value.');
  }

  removeCoreValue(idx: number) {
    if (confirm('Are you sure you want to remove this core value?')) {
      this.draft.about.coreValues.splice(idx, 1);
      this.onModelChange();
      this.showToastMsg.emit('Removed core value.');
    }
  }

  addWhyChoose() {
    if (!this.draft.about.whyChoose) {
      this.draft.about.whyChoose = [];
    }
    this.draft.about.whyChoose.push({
      title: 'New Value Proposition',
      desc: 'Delivering exceptional real estate quality and long-term value.'
    });
    this.onModelChange();
    this.showToastMsg.emit('Added new reason to choose Nigson.');
  }

  removeWhyChoose(idx: number) {
    if (confirm('Are you sure you want to remove this pillar?')) {
      this.draft.about.whyChoose.splice(idx, 1);
      this.onModelChange();
      this.showToastMsg.emit('Removed pillar.');
    }
  }
}
