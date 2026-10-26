import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubpageHeroComponent } from '../../components/subpage-hero/subpage-hero.component';
import { leadership, testimonials, missionVision, coreValues, whyChooseUsPillars } from '../../models/data';
import { CmsService } from '../../services/cms.service';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, SubpageHeroComponent],
  template: `
    <div class="min-h-screen bg-white text-zinc-900 font-sans flex flex-col">
      <app-subpage-hero
        [kicker]="cms.hero.kicker"
        [title]="cms.hero.title"
        [highlight]="cms.hero.highlight"
        [subtitle]="cms.hero.subtitle"
        [breadcrumbs]="[{ label: 'About Nigson' }]"
        [bgImage]="cms.hero.bgImage"
      >
        <div class="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-300 font-medium">
          <span *ngFor="let b of cms.hero.badges" class="flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> {{ b }}
          </span>
        </div>
      </app-subpage-hero>

      <main class="flex-1 mx-auto max-w-7xl px-6 md:px-12 py-20 w-full space-y-24">
        <!-- Origin & Brand Narrative Section (Client PDF 2 Section A) -->
        <section class="grid lg:grid-cols-12 gap-12 items-center">
          <div class="lg:col-span-6 space-y-6">
            <p class="kicker text-red-600">{{ cms.narrative.kicker }}</p>
            <h2 class="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-zinc-950 leading-tight">
              {{ cms.narrative.title }}
            </h2>
            <p class="text-base text-zinc-600 leading-relaxed font-light">
              {{ cms.narrative.p1 }}
            </p>
            <p class="text-base text-zinc-600 leading-relaxed font-light">
              {{ cms.narrative.p2 }}
            </p>
            <p class="text-sm text-zinc-500 leading-relaxed font-light">
              {{ cms.narrative.p3 }}
            </p>

            <div class="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-200">
              <div>
                <span class="font-serif text-3xl font-bold text-red-600 tabular-nums">{{ cms.stats.decadeLabel }}</span>
                <span class="text-[0.68rem] font-bold uppercase tracking-wider text-zinc-400 block mt-1">{{ cms.stats.decadeSub }}</span>
              </div>
              <div>
                <span class="font-serif text-3xl font-bold text-red-600 tabular-nums">{{ cms.stats.dueDiligenceLabel }}</span>
                <span class="text-[0.68rem] font-bold uppercase tracking-wider text-zinc-400 block mt-1">{{ cms.stats.dueDiligenceSub }}</span>
              </div>
              <div>
                <span class="font-serif text-3xl font-bold text-red-600 tabular-nums">{{ cms.stats.litigationLabel }}</span>
                <span class="text-[0.68rem] font-bold uppercase tracking-wider text-zinc-400 block mt-1">{{ cms.stats.litigationSub }}</span>
              </div>
            </div>
          </div>

          <div class="lg:col-span-6 rounded-3xl overflow-hidden aspect-[4/3] bg-zinc-950 relative shadow-xl">
            <img [src]="cms.boardCard.image" [alt]="cms.boardCard.title" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
            <div class="absolute bottom-6 left-6 right-6 text-white">
              <span class="text-xs uppercase tracking-widest text-red-500 font-bold">{{ cms.boardCard.tag }}</span>
              <p class="font-serif text-xl font-bold mt-1">{{ cms.boardCard.title }}</p>
            </div>
          </div>
        </section>

        <!-- Vision & Mission (Client PDF 2 Section B) -->
        <section class="grid md:grid-cols-2 gap-8">
          <div class="p-8 sm:p-10 rounded-3xl bg-zinc-50 border border-zinc-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="h-12 w-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-6 font-bold text-xl">
                🎯
              </div>
              <span class="text-xs font-bold uppercase tracking-widest text-red-600">Our North Star</span>
              <h3 class="font-serif text-2xl sm:text-3xl font-bold text-zinc-950 mt-1">Our Mission</h3>
              <p class="text-base text-zinc-700 mt-4 font-light leading-relaxed">
                {{ activeMission }}
              </p>
            </div>
            <div class="mt-8 pt-4 border-t border-zinc-200/80">
              <span class="text-xs font-semibold text-zinc-400 uppercase tracking-wider">High-Quality Real Estate & Energy Solutions</span>
            </div>
          </div>

          <div class="p-8 sm:p-10 rounded-3xl bg-zinc-950 text-white shadow-xl flex flex-col justify-between border border-white/10">
            <div>
              <div class="h-12 w-12 rounded-2xl bg-red-600 text-white flex items-center justify-center mb-6 font-bold text-xl">
                🏛️
              </div>
              <span class="text-xs font-bold uppercase tracking-widest text-red-500">Strategic Ambition</span>
              <h3 class="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">Our Vision</h3>
              <p class="text-lg text-zinc-200 mt-4 font-serif italic">
                “{{ activeVision }}”
              </p>
              
              <!-- 3 Pillars from PDF 2 -->
              <div class="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/10 text-center">
                <div class="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span class="font-serif font-bold text-sm text-red-400 block">Property</span>
                  <span class="text-[0.65rem] uppercase tracking-wider text-zinc-400">Excellence</span>
                </div>
                <div class="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span class="font-serif font-bold text-sm text-red-400 block">Investment</span>
                  <span class="text-[0.65rem] uppercase tracking-wider text-zinc-400">Growth</span>
                </div>
                <div class="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span class="font-serif font-bold text-sm text-red-400 block">Global</span>
                  <span class="text-[0.65rem] uppercase tracking-wider text-zinc-400">Reach</span>
                </div>
              </div>
            </div>
            <div class="mt-8 pt-4 border-t border-white/10">
              <span class="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Redefining Affordable Luxury Housing</span>
            </div>
          </div>
        </section>

        <!-- Our Core Values (Client PDF 2 Section B - 7 Values) -->
        <section class="space-y-10">
          <div class="text-center max-w-3xl mx-auto">
            <p class="kicker text-red-600">The Nigson Standard</p>
            <h2 class="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-zinc-950 mt-1">
              Our 7 Core Values
            </h2>
            <p class="mt-3 text-sm text-zinc-500">
              The foundational ethical principles and operational codes that guide every Nigson development, client partnership, and corporate initiative.
            </p>
          </div>

          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              *ngFor="let v of activeValues; let i = index"
              class="p-7 rounded-2xl border border-zinc-200 bg-white hover:border-red-400 hover:shadow-lg transition-all flex flex-col justify-between"
              [ngClass]="i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''"
            >
              <div>
                <div class="flex items-center justify-between mb-4">
                  <span class="text-xs font-mono font-bold text-red-600">0{{ i + 1 }}</span>
                  <span class="w-2 h-2 rounded-full bg-red-600"></span>
                </div>
                <h3 class="font-serif text-xl font-bold text-zinc-950">{{ v.title }}</h3>
                <p class="text-xs sm:text-sm text-zinc-600 mt-2.5 leading-relaxed font-light">
                  {{ v.desc }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Why Choose Us? (Client PDF 2 Section D - 6 Pillars) -->
        <section class="rounded-3xl border border-zinc-200 bg-[#FAF9F6] p-8 md:p-14 space-y-12">
          <div class="text-center max-w-3xl mx-auto">
            <p class="kicker text-red-600">Value Proposition</p>
            <h2 class="font-serif text-3xl md:text-4xl font-medium text-zinc-950 mt-1">
              Why Choose Nigson Properties Limited?
            </h2>
            <p class="text-sm text-zinc-600 mt-3 font-light leading-relaxed">
              At Nigson Properties Limited, we are committed to redefining modern living by delivering luxurious yet affordable homes that combine functionality, comfort, and security. With over a decade of experience in real estate development, we create thoughtfully designed properties that meet the evolving needs of homeowners and investors.
            </p>
          </div>

          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div *ngFor="let p of activeWhyChoose" class="p-7 rounded-2xl bg-white border border-zinc-200 shadow-sm flex flex-col justify-between">
              <div>
                <div class="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold text-sm mb-4">
                  ✓
                </div>
                <h3 class="font-serif text-lg font-bold text-zinc-950 mb-2">{{ p.title }}</h3>
                <p class="text-xs text-zinc-600 leading-relaxed font-light">{{ p.desc }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Client Testimonials (BRD Section 18) -->
        <section class="border-t border-zinc-200 pt-16">
          <div class="text-center max-w-2xl mx-auto mb-12">
            <p class="kicker text-red-600">Client Voices</p>
            <h2 class="font-serif text-3xl md:text-4xl font-medium text-zinc-950 mt-1">
              Endorsed by Discerning Clients
            </h2>
            <p class="mt-2 text-xs md:text-sm text-zinc-500">
              Read how homeowners, institutional investors, and hospitality guests experience the Nigson standard.
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-6">
            <div *ngFor="let t of clientTestimonials.slice(0, 3)" class="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 flex flex-col justify-between">
              <div>
                <div class="flex items-center gap-1 text-amber-500 mb-3 text-sm">
                  ★★★★★
                </div>
                <p class="text-xs text-zinc-700 italic leading-relaxed">
                  “{{ t.quote }}”
                </p>
              </div>
              <div class="mt-6 pt-4 border-t border-zinc-200/80 flex items-center justify-between">
                <div>
                  <p class="text-xs font-bold text-zinc-950">{{ t.name }}</p>
                  <p class="text-[0.65rem] text-zinc-500">{{ t.role }}</p>
                </div>
                <span class="px-2 py-0.5 bg-red-100 text-red-700 text-[0.6rem] font-bold rounded-full">
                  {{ t.category }}
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  `
})
export class AboutPageComponent {
  cmsService = inject(CmsService);
  get cms() {
    return this.cmsService.cmsData().about;
  }

  get activeMission(): string {
    return this.cms?.missionVision?.mission || this.brandData.mission;
  }

  get activeVision(): string {
    return this.cms?.missionVision?.vision || this.brandData.vision;
  }

  get activeValues() {
    return this.cms?.coreValues?.length ? this.cms.coreValues : this.values;
  }

  get activeWhyChoose() {
    return this.cms?.whyChoose?.length ? this.cms.whyChoose : this.whyChooseList;
  }

  board = leadership;
  clientTestimonials = testimonials;
  brandData = missionVision;
  values = coreValues;
  whyChooseList = whyChooseUsPillars;
}

