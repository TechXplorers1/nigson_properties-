import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubpageHeroComponent } from '../../components/subpage-hero/subpage-hero.component';
import { leadership, testimonials, LeadershipMember, Testimonial } from '../../models/data';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, SubpageHeroComponent],
  template: `
    <div class="min-h-screen bg-white text-zinc-900 font-sans flex flex-col">
      <app-subpage-hero
        kicker="Heritage & Institutional Strength"
        title="Building Trust. Creating"
        highlight="Value."
        subtitle="Nigson Properties Limited is the real estate development and property management arm of Nigson Group, delivering affordable luxury homes, modern architecture, and long-term investment value across Nigeria."
        [breadcrumbs]="[{ label: 'About Nigson' }]"
        bgImage="/assets/consultation.jpg"
      >
        <div class="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-300 font-medium">
          <span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> Nigson Group Real Estate Arm</span>
          <span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> 100% Guaranteed Dispute-Free Titles</span>
          <span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> Affordable Luxury Built for Generations</span>
        </div>
      </app-subpage-hero>

      <main class="flex-1 mx-auto max-w-7xl px-6 md:px-12 py-20 w-full space-y-24">
        <!-- Origin & Brand Narrative Section -->
        <section class="grid lg:grid-cols-12 gap-12 items-center">
          <div class="lg:col-span-6 space-y-6">
            <p class="kicker text-red-600">The Nigson Legacy</p>
            <h2 class="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-zinc-950 leading-tight">
              A Trusted Real Estate Development Company
            </h2>
            <p class="text-base text-zinc-600 leading-relaxed font-light">
              Nigson Properties Limited is the real estate development and property management arm of Nigson Group, specializing in residential development, property sales, project management, and facility management services.
            </p>
            <p class="text-base text-zinc-600 leading-relaxed font-light">
              We are committed to delivering affordable luxury homes across Nigeria, combining modern architecture, quality craftsmanship, innovative building solutions, comfort, security, functionality, sustainability, and long-term investment value.
            </p>

            <div class="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-200">
              <div>
                <span class="font-serif text-3xl font-bold text-red-600 tabular-nums">₦140B+</span>
                <span class="text-[0.68rem] font-bold uppercase tracking-wider text-zinc-400 block mt-1">Group Asset Base</span>
              </div>
              <div>
                <span class="font-serif text-3xl font-bold text-red-600 tabular-nums">100%</span>
                <span class="text-[0.68rem] font-bold uppercase tracking-wider text-zinc-400 block mt-1">C of O Verified</span>
              </div>
              <div>
                <span class="font-serif text-3xl font-bold text-red-600 tabular-nums">0%</span>
                <span class="text-[0.68rem] font-bold uppercase tracking-wider text-zinc-400 block mt-1">Title Litigation</span>
              </div>
            </div>
          </div>

          <div class="lg:col-span-6 rounded-3xl overflow-hidden aspect-[4/3] bg-zinc-950 relative shadow-xl">
            <img src="/assets/consultation.jpg" alt="Nigson Board Consultation" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
            <div class="absolute bottom-6 left-6 right-6 text-white">
              <span class="text-xs uppercase tracking-widest text-red-500 font-bold">Executive Board</span>
              <p class="font-serif text-xl font-bold mt-1">Advisory Governance & Institutional Due Diligence</p>
            </div>
          </div>
        </section>

        <!-- Vision, Mission & Core Values (BRD Section 6) -->
        <section class="grid md:grid-cols-3 gap-8">
          <div class="p-8 rounded-2xl bg-zinc-50 border border-zinc-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="h-12 w-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-5 font-bold text-xl">
                🎯
              </div>
              <h3 class="font-serif text-2xl font-bold text-zinc-950">Our Vision</h3>
              <p class="text-sm text-zinc-600 mt-3 font-light leading-relaxed">
                To be Nigeria’s foremost real estate development and property management institution, recognized globally for transforming skylines, delivering accessible and affordable luxury, and creating enduring multigenerational value.
              </p>
            </div>
            <span class="text-xs font-semibold text-red-600 uppercase tracking-wider mt-6 block">Visionary Leadership</span>
          </div>

          <div class="p-8 rounded-2xl bg-zinc-50 border border-zinc-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="h-12 w-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-5 font-bold text-xl">
                🏛️
              </div>
              <h3 class="font-serif text-2xl font-bold text-zinc-950">Our Mission</h3>
              <p class="text-sm text-zinc-600 mt-3 font-light leading-relaxed">
                To engineer and deliver world-class residential and commercial real estate solutions through innovative construction methods, impeccable craftsmanship, dispute-free legal titles, and customer-first property management.
              </p>
            </div>
            <span class="text-xs font-semibold text-red-600 uppercase tracking-wider mt-6 block">Purposeful Execution</span>
          </div>

          <div class="p-8 rounded-2xl bg-zinc-50 border border-zinc-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="h-12 w-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-5 font-bold text-xl">
                ⭐
              </div>
              <h3 class="font-serif text-2xl font-bold text-zinc-950">Core Values</h3>
              <p class="text-sm text-zinc-600 mt-3 font-light leading-relaxed">
                Quality, Integrity, Innovation, Sustainability, Professionalism, and Customer-Centric Service. We believe that true luxury lies in structural permanence and transparent relationships.
              </p>
            </div>
            <span class="text-xs font-semibold text-red-600 uppercase tracking-wider mt-6 block">The Nigson Standard</span>
          </div>
        </section>

        <!-- Commitments: Quality & Customers (BRD Section 6) -->
        <section class="rounded-3xl border border-zinc-200 bg-[#FAF9F6] p-8 md:p-14">
          <div class="text-center max-w-2xl mx-auto mb-12">
            <p class="kicker text-red-600">Our Institutional Commitments</p>
            <h2 class="font-serif text-3xl md:text-4xl font-medium text-zinc-950 mt-1">
              Commitment to Quality & Customers
            </h2>
          </div>

          <div class="grid md:grid-cols-2 gap-8">
            <div class="p-8 rounded-2xl bg-white border border-zinc-200 shadow-sm">
              <span class="text-xs font-bold text-red-600 uppercase tracking-widest block mb-2">Uncompromising Craftsmanship</span>
              <h3 class="font-serif text-2xl font-bold text-zinc-950 mb-3">Commitment to Quality</h3>
              <p class="text-sm text-zinc-600 font-light leading-relaxed">
                Every development executed by Nigson Properties undergoes rigorous planning, Eurocode structural engineering, high-tensile concrete pouring, and meticulous finishing inspections. From Schuco acoustic solar glass to CATL clean lithium microgrids, our homes are engineered for century-long permanence.
              </p>
              <ul class="mt-4 space-y-2 text-xs text-zinc-700 font-medium">
                <li class="flex items-center gap-2">✓ Geo-technical soil and deep foundation sounding</li>
                <li class="flex items-center gap-2">✓ Independent solar power and lithium energy microgrids</li>
                <li class="flex items-center gap-2">✓ Industrial reverse-osmosis potable water purification</li>
                <li class="flex items-center gap-2">✓ 100% C of O & Governor’s Consent legal title guarantee</li>
              </ul>
            </div>

            <div class="p-8 rounded-2xl bg-white border border-zinc-200 shadow-sm">
              <span class="text-xs font-bold text-red-600 uppercase tracking-widest block mb-2">Client-First Partnership</span>
              <h3 class="font-serif text-2xl font-bold text-zinc-950 mb-3">Commitment to Customers</h3>
              <p class="text-sm text-zinc-600 font-light leading-relaxed">
                We prioritize absolute transparency, personalized advisory, and continuous aftercare. Whether you are acquiring your dream home, booking an executive short-stay, or entrusting your multi-unit portfolio to our facility management team, we treat your investment with paramount stewardship.
              </p>
              <ul class="mt-4 space-y-2 text-xs text-zinc-700 font-medium">
                <li class="flex items-center gap-2">✓ Dedicated Private Wealth Advisor and WhatsApp Concierge</li>
                <li class="flex items-center gap-2">✓ 4K Live interactive virtual tours for diaspora clients</li>
                <li class="flex items-center gap-2">✓ Transparent milestone reporting and escrow protection</li>
                <li class="flex items-center gap-2">✓ 24/7 dedicated facility management and operational desk</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Executive Board Leadership (BRD Section 6 & 30) -->
        <section>
          <div class="text-center max-w-2xl mx-auto mb-14">
            <p class="kicker text-red-600">Executive Leadership</p>
            <h2 class="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-zinc-950 mt-1">
              Leadership & Governance
            </h2>
            <p class="mt-3 text-xs md:text-sm text-zinc-500 font-light">
              Steered by visionary executives with decades of expertise in real estate development, project engineering, corporate governance, and capital management.
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div *ngFor="let m of board" class="group bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm flex flex-col hover:border-red-500 transition-colors">
              <div class="aspect-[4/5] overflow-hidden bg-zinc-950 relative">
                <img [src]="m.image" [alt]="m.name" class="w-full h-full object-cover zoom-img transition-all duration-500" />
              </div>
              <div class="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 class="font-serif text-xl font-bold text-zinc-950">{{ m.name }}</h3>
                  <span class="text-xs font-semibold text-red-600 block mt-0.5">{{ m.role }}</span>
                  <span class="text-[0.65rem] text-zinc-400 uppercase tracking-wider block mt-1">{{ m.credentials }}</span>
                  <p class="text-xs text-zinc-600 font-light mt-3 leading-relaxed">{{ m.bio }}</p>
                </div>
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
  board = leadership;
  clientTestimonials = testimonials;
}

