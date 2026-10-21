import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LogoComponent } from '../logo/logo.component';
import { WHATSAPP, waLink } from '../../models/data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, LogoComponent],
  template: `
    <footer class="relative overflow-hidden bg-[#0B0C10] pt-24 pb-12 text-white border-t border-white/10 font-sans">
      <div class="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <div class="grid gap-12 md:grid-cols-2 lg:grid-cols-4 pb-16 border-b border-white/10">
          <!-- Brand Col -->
          <div>
            <a routerLink="/" class="cursor-pointer" aria-label="Nigson Properties Limited">
              <app-logo [isLight]="true" size="lg"></app-logo>
            </a>
            <p class="mt-6 font-serif text-2xl text-white font-normal">Nigson Properties Limited</p>
            <p class="mt-2 text-xs leading-relaxed text-zinc-400">
              Incorporated under the Companies and Allied Matters Act (CAMA 2020), Federal Republic of Nigeria. RC 1894231.
            </p>
          </div>

          <!-- Navigation Links -->
          <div>
            <p class="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-red-600">Portfolio & Solutions</p>
            <ul class="mt-5 space-y-2.5 text-xs text-zinc-300">
              <li><a routerLink="/properties" class="hover:text-red-500 transition-colors">Exclusive Properties</a></li>
              <li><a routerLink="/projects" class="hover:text-red-500 transition-colors">Master Developments</a></li>
              <li><a routerLink="/short-stay" class="hover:text-red-500 transition-colors">Executive Short-Stay</a></li>

              <li><a routerLink="/services" class="hover:text-red-500 transition-colors">Core Services</a></li>
              <li><a routerLink="/about" class="hover:text-red-500 transition-colors">About Nigson Properties</a></li>
              <li><a routerLink="/portal" class="hover:text-red-500 transition-colors">Client Portal</a></li>
            </ul>
          </div>

          <!-- Headquarters Details -->
          <div>
            <p class="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-red-600">Headquarters</p>
            <ul class="mt-5 space-y-3.5 text-xs text-zinc-300">
              <li class="flex gap-2.5 items-start">
                <svg class="w-4 h-4 mt-0.5 shrink-0 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>Plot 30B, Block 110, Oladimeji Alo Street, Lekki Phase 1, Lagos, Nigeria</span>
              </li>
              <li class="flex gap-2.5 items-center">
                <svg class="w-4 h-4 shrink-0 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span><a href="tel:+2348073467809" class="hover:text-white">+234 807 346 7809</a> · <a href="tel:+2349134446722" class="hover:text-white">+234 913 444 6722</a></span>
              </li>
              <li class="flex gap-2.5 items-center">
                <svg class="w-4 h-4 shrink-0 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <a href="mailto:Hello@Nigson.com" class="hover:text-white">Hello&#64;Nigson.com</a>
              </li>
              <li class="flex gap-2.5 items-center text-zinc-400 text-[11px]">
                <svg class="w-4 h-4 shrink-0 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Mon–Fri: 9:00 AM – 5:00 PM</span>
              </li>
            </ul>
          </div>

          <!-- Newsletter / Briefings -->
          <div>
            <p class="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-red-600">Private Briefings</p>
            <p class="mt-5 text-xs text-zinc-400 leading-relaxed">
              Curated off-plan launch allocations, market valuations, and private investor briefings sent monthly.
            </p>
            <form (ngSubmit)="handleSubscribe()" class="mt-4 flex flex-col gap-2">
              <input
                type="email"
                [(ngModel)]="email"
                name="email"
                placeholder="investor@example.com"
                required
                class="w-full rounded-sm border border-white/20 bg-white/5 px-3 py-2.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
              />
              <button
                type="submit"
                class="btn-sweep flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2.5 text-[0.7rem] font-bold uppercase tracking-widest rounded-sm transition-all"
              >
                <span *ngIf="!subscribed()">Join Investor Register</span>
                <span *ngIf="subscribed()" class="flex items-center gap-1.5 text-emerald-300">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  Subscribed!
                </span>
              </button>
            </form>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {{ currentYear }} Nigson Properties Limited. All rights reserved.</p>
          <div class="flex gap-6">
            <a routerLink="/about" class="hover:text-white transition-colors">Governance & Titles</a>
            <a routerLink="/contact" class="hover:text-white transition-colors">Private Desk</a>
            <a routerLink="/admin" class="hover:text-white transition-colors">Executive Admin</a>
          </div>
        </div>
      </div>

      <!-- Floating WhatsApp Concierge Button -->
      <a
        [href]="waLink('Hello Nigson Concierge, I would like to inquire about your luxury properties and master developments.')"
        target="_blank"
        rel="noreferrer"
        class="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 transition-all pulse-ring"
        title="Chat on WhatsApp"
        aria-label="WhatsApp Concierge"
      >
        <svg class="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.769.832 2.791.833h.001c3.181 0 5.768-2.586 5.768-5.766 0-3.18-2.587-5.766-5.769-5.766zm3.374 8.163c-.144.405-.837.774-1.17.822-.312.043-.65.074-1.921-.456-1.626-.677-2.659-2.339-2.739-2.447-.078-.108-.66-88-.66-1.678 0-.798.417-1.19.565-1.353.148-.163.324-.204.432-.204.108 0 .216.001.311.006.101.005.236-.038.369.28.143.344.488 1.19.531 1.277.043.088.072.19.014.305-.058.115-.088.188-.175.29-.087.102-.183.228-.261.306-.089.088-.182.184-.078.363.104.179.462.763.992 1.236.682.608 1.258.796 1.437.885.179.088.283.074.388-.047.105-.122.451-.527.572-.708.12-.18.241-.151.405-.091.164.06 1.037.489 1.215.578.178.089.297.133.34.208.043.074.043.432-.101.837z"></path>
        </svg>
      </a>
    </footer>
  `
})
export class FooterComponent {
  email = '';
  subscribed = signal(false);
  currentYear = new Date().getFullYear();
  waLink = waLink;

  handleSubscribe() {
    if (!this.email) return;
    this.subscribed.set(true);
    setTimeout(() => {
      this.email = '';
    }, 2000);
  }
}
