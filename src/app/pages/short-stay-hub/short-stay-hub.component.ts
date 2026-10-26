import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SubpageHeroComponent } from '../../components/subpage-hero/subpage-hero.component';
import { suites, Suite, naira, waLink } from '../../models/data';
import { CmsService } from '../../services/cms.service';

@Component({
  selector: 'app-short-stay-hub',
  standalone: true,
  imports: [CommonModule, RouterLink, SubpageHeroComponent],
  template: `
    <div class="min-h-screen bg-[#0B0C10] text-white font-sans flex flex-col">
      <app-subpage-hero
        [kicker]="cms.hero.kicker"
        [title]="cms.hero.title"
        [highlight]="cms.hero.highlight"
        [subtitle]="cms.hero.subtitle"
        [breadcrumbs]="[{ label: 'Short Stay' }]"
        [bgImage]="cms.hero.bgImage"
      >
        <div class="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-300 font-medium">
          <span *ngFor="let b of cms.hero.badges" class="flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> {{ b }}
          </span>
        </div>
      </app-subpage-hero>

      <main class="flex-1 mx-auto max-w-7xl px-6 md:px-12 py-12 w-full">
        <div class="grid gap-10 md:grid-cols-3">
          <article
            *ngFor="let s of allSuites"
            class="lux-card group border border-white/10 bg-[#16171F] rounded-2xl overflow-hidden flex flex-col justify-between shadow-xl"
          >
            <div>
              <div class="relative aspect-[4/3] overflow-hidden bg-black">
                <img [src]="s.image" [alt]="s.name" loading="lazy" class="zoom-img h-full w-full object-cover" />
                <div class="absolute left-4 top-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-xs uppercase tracking-widest text-zinc-300 font-semibold border border-white/10">
                  {{ s.location }}
                </div>
              </div>

              <div class="p-6">
                <h3 class="font-serif text-2xl md:text-3xl font-medium text-white group-hover:text-red-500 transition-colors">
                  <a [routerLink]="['/short-stay', s.id]">{{ s.name }}</a>
                </h3>
                <p class="mt-2 text-xs text-zinc-400 leading-relaxed font-light line-clamp-2">
                  {{ s.description }}
                </p>

                <!-- Amenities Badges -->
                <div class="mt-4 flex flex-wrap gap-1.5">
                  <span *ngFor="let am of s.amenities.slice(0, 4)" class="px-2.5 py-1 text-[0.65rem] uppercase tracking-wider bg-white/5 border border-white/10 rounded text-zinc-300">
                    {{ am }}
                  </span>
                </div>

                <!-- Specs -->
                <div class="mt-5 flex items-center gap-4 text-xs text-zinc-400 border-t border-white/10 pt-4">
                  <span>{{ s.beds }} Bedrooms</span>
                  <span>{{ s.baths }} Bathrooms</span>
                  <span>Max {{ s.maxGuests }} Guests</span>
                </div>
              </div>
            </div>

            <div class="p-6 pt-0">
              <div class="flex items-baseline justify-between mb-4">
                <div>
                  <span class="font-sans font-bold text-2xl text-white tracking-tight tabular-nums">
                    {{ naira(s.rate) }}
                  </span>
                  <span class="text-xs text-zinc-400"> / night</span>
                </div>
                <span class="text-[0.65rem] text-zinc-500 uppercase tracking-widest">Deposit: {{ naira(s.securityDeposit) }}</span>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <a
                  [href]="waLink('Hello Nigson Concierge, I would like to reserve the ' + s.name + ' (' + s.location + ') at ' + naira(s.rate) + '/night.')"
                  target="_blank"
                  class="btn-sweep py-2.5 bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded text-center transition-all"
                >
                  WhatsApp
                </a>
                <a
                  [routerLink]="['/short-stay', s.id]"
                  class="py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded text-center transition-colors"
                >
                  Suite Details →
                </a>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  `
})
export class ShortStayHubComponent {
  cmsService = inject(CmsService);
  get cms() {
    return this.cmsService.cmsData().shortStay;
  }

  allSuites = suites;
  naira = naira;
  waLink = waLink;
}
