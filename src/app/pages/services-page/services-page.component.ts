import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SubpageHeroComponent } from '../../components/subpage-hero/subpage-hero.component';
import { servicesDetails, ServiceDetail, waLink } from '../../models/data';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, SubpageHeroComponent],
  template: `
    <div class="min-h-screen bg-white text-zinc-900 font-sans flex flex-col">
      <app-subpage-hero
        kicker="Our Services & Capabilities"
        title="7 Core Real Estate"
        highlight="Capabilities"
        subtitle="End-to-end building construction, project development, facility management, short-stay bookings, and transparent property sales."
        [breadcrumbs]="[{ label: 'Our Services' }]"
        bgImage="/assets/villa.jpg"
      >
        <div class="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-300 font-medium">
          <span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> Modern Architectural Design</span>
          <span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> Guaranteed Title Perfection</span>
          <span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> 24/7 Facility Operations</span>
        </div>
      </app-subpage-hero>

      <main class="flex-1 mx-auto max-w-7xl px-6 md:px-12 py-16 w-full">
        <div class="space-y-24">
          <section
            *ngFor="let s of allServices; let i = index"
            class="grid lg:grid-cols-12 gap-12 items-center"
            [ngClass]="i % 2 === 1 ? 'lg:flex-row-reverse' : ''"
          >
            <!-- Image (5 cols) -->
            <div class="lg:col-span-5" [ngClass]="i % 2 === 1 ? 'lg:order-2' : ''">
              <div class="relative aspect-[4/3] rounded-3xl overflow-hidden bg-zinc-950 shadow-xl group">
                <img [src]="s.image" [alt]="s.title" class="w-full h-full object-cover zoom-img" />
                <div class="absolute left-6 top-6 font-sans font-bold text-4xl text-white bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-xl border border-white/10">
                  {{ s.num }}
                </div>
              </div>
            </div>

            <!-- Content & Steps (7 cols) -->
            <div class="lg:col-span-7" [ngClass]="i % 2 === 1 ? 'lg:order-1' : ''">
              <p class="kicker text-red-600">{{ s.tagline }}</p>
              <h2 class="font-serif text-3xl sm:text-4xl font-medium text-zinc-950 mt-1 mb-4">
                {{ s.title }}
              </h2>
              <p class="text-zinc-600 text-sm md:text-base leading-relaxed font-light mb-8">
                {{ s.summary }}
              </p>

              <!-- Process Steps Grid -->
              <div class="grid sm:grid-cols-2 gap-4 mb-8">
                <div *ngFor="let p of s.process" class="p-4 bg-zinc-50 border border-zinc-200/80 rounded-xl">
                  <span class="text-xs font-bold text-red-600 block">{{ p.step }} · {{ p.title }}</span>
                  <p class="text-xs text-zinc-500 mt-1 leading-relaxed">{{ p.desc }}</p>
                </div>
              </div>

              <!-- Deliverables -->
              <div class="p-4 bg-[#FAF9F6] border border-zinc-200 rounded-xl mb-6">
                <span class="text-[0.65rem] font-bold uppercase tracking-wider text-zinc-400 block mb-2">Key Deliverables</span>
                <div class="flex flex-wrap gap-2">
                  <span *ngFor="let del of s.deliverables" class="px-3 py-1 bg-white border border-zinc-200 rounded text-xs font-medium text-zinc-700">
                    ✓ {{ del }}
                  </span>
                </div>
              </div>

              <a
                [href]="waLink('Hello Nigson Desk, I would like to consult on ' + s.title + '.')"
                target="_blank"
                class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 hover:text-red-700"
              >
                Inquire on WhatsApp Concierge →
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  `
})
export class ServicesPageComponent {
  allServices = servicesDetails;
  waLink = waLink;
}
