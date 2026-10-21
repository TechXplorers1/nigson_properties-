import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';
import { LogoComponent } from '../logo/logo.component';
import { WHATSAPP } from '../../models/data';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LogoComponent],
  template: `
    <header
      class="fixed top-0 inset-x-0 z-50 transition-all duration-300 font-sans"
      [ngClass]="{
        'bg-white/95 backdrop-blur-md shadow-sm border-b border-zinc-200/80 py-3.5 text-zinc-900': isScrolled() || !isHomePage(),
        'bg-transparent py-4 text-white': !isScrolled() && isHomePage()
      }"
    >
      <div class="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <!-- New Brand Logo (as per user image) -->
        <a routerLink="/" class="cursor-pointer" aria-label="Nigson Properties Limited">
          <app-logo [isLight]="!isScrolled() && isHomePage()" size="md"></app-logo>
        </a>

        <!-- Desktop Navigation (NO Home link as requested) -->
        <nav class="hidden lg:flex items-center gap-6 xl:gap-7 text-[11px] font-semibold uppercase tracking-[0.16em]">
          <a
            routerLink="/properties"
            routerLinkActive="text-red-600 font-bold"
            class="transition-colors hover:text-red-600"
            [ngClass]="(isScrolled() || !isHomePage()) ? 'text-zinc-700' : 'text-white/90 hover:text-white'"
          >
            Properties
          </a>
          <a
            routerLink="/projects"
            routerLinkActive="text-red-600 font-bold"
            class="transition-colors hover:text-red-600"
            [ngClass]="(isScrolled() || !isHomePage()) ? 'text-zinc-700' : 'text-white/90 hover:text-white'"
          >
            Developments
          </a>
          <a
            routerLink="/short-stay"
            routerLinkActive="text-red-600 font-bold"
            class="transition-colors hover:text-red-600"
            [ngClass]="(isScrolled() || !isHomePage()) ? 'text-zinc-700' : 'text-white/90 hover:text-white'"
          >
            Short-Stay
          </a>

          <a
            routerLink="/services"
            routerLinkActive="text-red-600 font-bold"
            class="transition-colors hover:text-red-600"
            [ngClass]="(isScrolled() || !isHomePage()) ? 'text-zinc-700' : 'text-white/90 hover:text-white'"
          >
            Services
          </a>
          <a
            routerLink="/about"
            routerLinkActive="text-red-600 font-bold"
            class="transition-colors hover:text-red-600"
            [ngClass]="(isScrolled() || !isHomePage()) ? 'text-zinc-700' : 'text-white/90 hover:text-white'"
          >
            About
          </a>
          <a
            routerLink="/contact"
            routerLinkActive="text-red-600 font-bold"
            class="transition-colors hover:text-red-600"
            [ngClass]="(isScrolled() || !isHomePage()) ? 'text-zinc-700' : 'text-white/90 hover:text-white'"
          >
            Contact
          </a>
        </nav>

        <!-- Right Action Items (Login vs User Profile Button) -->
        <div class="hidden lg:flex items-center gap-4">
          <!-- CASE 1: When user is LOGGED OUT -> Show Login Button -->
          <a
            *ngIf="!authService.isLoggedIn()"
            routerLink="/login"
            class="btn-sweep px-5 py-2 text-[11px] uppercase tracking-[0.16em] font-semibold rounded transition-all shadow-sm flex items-center justify-center"
            [ngClass]="(isScrolled() || !isHomePage()) ? 'bg-zinc-950 text-white hover:bg-red-600' : 'bg-white text-zinc-950 hover:bg-red-600 hover:text-white'"
          >
            Login
          </a>

          <!-- CASE 2: When user is LOGGED IN -> Show User Profile Button with Dropdown -->
          <div *ngIf="authService.isLoggedIn()" class="relative">
            <button
              (click)="profileMenuOpen.set(!profileMenuOpen()); $event.stopPropagation()"
              class="flex items-center gap-2.5 p-1.5 pl-2 pr-3.5 rounded-full border transition-all text-[11px] font-semibold cursor-pointer select-none"
              [ngClass]="(isScrolled() || !isHomePage())
                ? 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-900 shadow-sm'
                : 'border-white/30 bg-black/40 hover:bg-black/60 text-white backdrop-blur-md'"
              aria-label="User Profile"
            >
              <!-- Avatar Circle -->
              <span class="w-7 h-7 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-sm">
                {{ authService.currentUser()?.initials || 'U' }}
              </span>

              <!-- User Name & Tier -->
              <div class="text-left hidden xl:block">
                <span class="block leading-none font-bold text-[11px] truncate max-w-[130px]">
                  {{ authService.currentUser()?.name || 'Chief Adeleke' }}
                </span>
                <span class="text-[9px] opacity-70 block font-normal mt-0.5 truncate max-w-[130px]">
                  {{ authService.currentUser()?.tier || 'Tier 1 Investor' }}
                </span>
              </div>

              <!-- Chevron Indicator -->
              <svg
                class="w-3.5 h-3.5 opacity-60 transition-transform duration-200"
                [ngClass]="profileMenuOpen() ? 'rotate-180' : ''"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <!-- User Profile Dropdown Menu -->
            <div
              *ngIf="profileMenuOpen()"
              class="absolute right-0 mt-2.5 w-64 bg-white text-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 py-3 z-50 animate-fadeIn"
              (click)="$event.stopPropagation()"
            >
              <!-- Profile Header -->
              <div class="px-5 py-3 border-b border-zinc-100">
                <p class="font-serif text-base font-bold text-zinc-950">{{ authService.currentUser()?.name }}</p>
                <p class="text-[0.7rem] text-zinc-400 mt-0.5 truncate">{{ authService.currentUser()?.email }}</p>
                <span class="inline-block mt-2 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[0.62rem] font-bold uppercase tracking-wider rounded">
                  {{ authService.currentUser()?.tier }}
                </span>
              </div>

              <!-- Navigation Links -->
              <div class="py-2 text-xs font-semibold text-zinc-700">
                <a
                  [routerLink]="authService.currentUser()?.role === 'admin' ? '/admin' : '/portal'"
                  (click)="profileMenuOpen.set(false)"
                  class="flex items-center gap-2.5 px-5 py-2.5 hover:bg-zinc-50 hover:text-red-600 transition-colors"
                >
                  <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                  <span>{{ authService.currentUser()?.role === 'admin' ? 'Executive Dashboard' : 'Investor Vault & Portfolio' }}</span>
                </a>

                <a
                  routerLink="/portal"
                  (click)="profileMenuOpen.set(false)"
                  class="flex items-center gap-2.5 px-5 py-2.5 hover:bg-zinc-50 hover:text-red-600 transition-colors"
                >
                  <svg class="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  <span>Legal Title Documents</span>
                </a>

                <a
                  routerLink="/properties"
                  (click)="profileMenuOpen.set(false)"
                  class="flex items-center gap-2.5 px-5 py-2.5 hover:bg-zinc-50 hover:text-red-600 transition-colors"
                >
                  <svg class="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                  <span>Browse Prime Residences</span>
                </a>
              </div>

              <!-- Sign Out -->
              <div class="pt-2 border-t border-zinc-100">
                <button
                  (click)="authService.logout(); profileMenuOpen.set(false)"
                  class="w-full flex items-center gap-2.5 px-5 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Menu Toggle Button -->
        <button
          (click)="mobileOpen.set(!mobileOpen())"
          class="lg:hidden p-2 rounded focus:outline-none"
          [ngClass]="(isScrolled() || !isHomePage()) ? 'text-zinc-900' : 'text-white'"
          aria-label="Toggle Navigation Menu"
        >
          <svg *ngIf="!mobileOpen()" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <svg *ngIf="mobileOpen()" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Mobile Dropdown Drawer -->
      <div
        *ngIf="mobileOpen()"
        class="lg:hidden bg-zinc-950/98 text-white border-b border-zinc-800 px-8 py-8 animate-fadeIn"
      >
        <nav class="flex flex-col gap-5 text-xs uppercase tracking-[0.16em] font-medium">
          <a routerLink="/properties" (click)="mobileOpen.set(false)" class="hover:text-red-500 py-1 border-b border-zinc-800/60">Properties</a>
          <a routerLink="/projects" (click)="mobileOpen.set(false)" class="hover:text-red-500 py-1 border-b border-zinc-800/60">Developments</a>
          <a routerLink="/short-stay" (click)="mobileOpen.set(false)" class="hover:text-red-500 py-1 border-b border-zinc-800/60">Short-Stay Suites</a>

          <a routerLink="/services" (click)="mobileOpen.set(false)" class="hover:text-red-500 py-1 border-b border-zinc-800/60">Core Services</a>
          <a routerLink="/about" (click)="mobileOpen.set(false)" class="hover:text-red-500 py-1 border-b border-zinc-800/60">About Nigson</a>
          <a routerLink="/contact" (click)="mobileOpen.set(false)" class="hover:text-red-500 py-1 border-b border-zinc-800/60">Contact Headquarters</a>
          <a routerLink="/portal" (click)="mobileOpen.set(false)" class="text-red-400 py-1 border-b border-zinc-800/60">Investor Portal</a>
          <a routerLink="/admin" (click)="mobileOpen.set(false)" class="text-zinc-400 py-1 border-b border-zinc-800/60">Executive Admin</a>
        </nav>

        <div class="mt-8 flex flex-col gap-3">
          <!-- When Logged Out: Show Login Button -->
          <ng-container *ngIf="!authService.isLoggedIn()">
            <a
              routerLink="/login"
              (click)="mobileOpen.set(false)"
              class="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs tracking-widest uppercase rounded text-center block transition-colors"
            >
              Login to Portal
            </a>
          </ng-container>

          <!-- When Logged In: Show User Profile Card & Sign Out -->
          <ng-container *ngIf="authService.isLoggedIn()">
            <div class="p-4 bg-zinc-900 border border-zinc-800 rounded-xl mb-1 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="w-10 h-10 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-sm">
                  {{ authService.currentUser()?.initials || 'U' }}
                </span>
                <div>
                  <p class="font-serif text-base font-bold text-white">{{ authService.currentUser()?.name }}</p>
                  <p class="text-[0.65rem] text-zinc-400">{{ authService.currentUser()?.tier }}</p>
                </div>
              </div>
            </div>

            <a
              [routerLink]="authService.currentUser()?.role === 'admin' ? '/admin' : '/portal'"
              (click)="mobileOpen.set(false)"
              class="w-full py-3 bg-red-600 text-white font-semibold text-xs tracking-widest uppercase rounded text-center block"
            >
              {{ authService.currentUser()?.role === 'admin' ? 'Open Admin Console' : 'Open Investor Vault' }}
            </a>

            <button
              (click)="authService.logout(); mobileOpen.set(false)"
              class="w-full py-2.5 bg-zinc-900 border border-red-900/40 text-red-400 font-semibold text-xs tracking-widest uppercase rounded text-center"
            >
              Sign Out
            </button>
          </ng-container>

          <a
            [href]="'https://wa.me/' + whatsapp + '?text=Hello%20Nigson%20Properties%2C%20I%20would%20like%20to%20inquire%20about%20your%20developments.'"
            target="_blank"
            class="w-full py-3 bg-zinc-900 border border-zinc-700 text-zinc-300 font-semibold text-xs tracking-widest uppercase rounded text-center"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </header>
  `
})
export class NavbarComponent {
  modalService = inject(ModalService);
  authService = inject(AuthService);
  router = inject(Router);

  isScrolled = signal<boolean>(false);
  isHomePage = signal<boolean>(true);
  mobileOpen = signal<boolean>(false);
  profileMenuOpen = signal<boolean>(false);
  whatsapp = WHATSAPP;

  constructor() {
    this.checkRoute(this.router.url);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.checkRoute(event.urlAfterRedirects || event.url);
      this.mobileOpen.set(false);
      this.profileMenuOpen.set(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  private checkRoute(url: string) {
    const cleanUrl = url.split('?')[0].split('#')[0];
    this.isHomePage.set(cleanUrl === '/' || cleanUrl === '');
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (typeof window !== 'undefined') {
      this.isScrolled.set(window.scrollY > 40);
    }
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.profileMenuOpen.set(false);
  }
}
