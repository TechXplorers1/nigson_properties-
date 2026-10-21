import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-subpage-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="relative flex items-center justify-center overflow-hidden bg-[#0B0C10] text-white pt-28 pb-16 md:pt-36 md:pb-20 min-h-[50vh] md:min-h-[56vh] font-sans">
      <!-- Background Image with Cinematic Overlay -->
      <div *ngIf="bgImage" class="absolute inset-0 z-0">
        <img
          [src]="bgImage"
          [alt]="title"
          class="w-full h-full object-cover scale-105 filter brightness-[0.35] contrast-[1.1] transition-transform duration-1000 ease-out"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-[#0B0C10]/60 to-transparent"></div>
        <div class="absolute inset-0 bg-radial-gradient-glow opacity-30"></div>
      </div>

      <!-- Content Container -->
      <div class="relative z-10 mx-auto max-w-7xl px-6 md:px-12 w-full text-center">
        <!-- Breadcrumbs -->
        <nav class="mb-6 flex items-center justify-center gap-2 text-[0.72rem] tracking-wider uppercase text-zinc-400">
          <a routerLink="/" class="hover:text-red-500 transition-colors">Home</a>
          <ng-container *ngFor="let b of breadcrumbs">
            <span class="flex items-center gap-2">
              <svg class="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
              <a *ngIf="b.href" [routerLink]="b.href" class="hover:text-red-500 transition-colors">{{ b.label }}</a>
              <span *ngIf="!b.href" class="text-white font-semibold">{{ b.label }}</span>
            </span>
          </ng-container>
        </nav>

        <!-- Kicker -->
        <p class="kicker mb-3">{{ kicker }}</p>

        <!-- Title -->
        <h1 class="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.08] max-w-4xl mx-auto">
          {{ title }} <em *ngIf="highlight" class="italic text-red-600 font-serif">{{ highlight }}</em>
        </h1>

        <!-- Subtitle -->
        <p *ngIf="subtitle" class="mt-4 md:mt-5 text-sm sm:text-base md:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed font-sans font-light">
          {{ subtitle }}
        </p>

        <!-- Content projection -->
        <div class="mt-8">
          <ng-content></ng-content>
        </div>
      </div>
    </section>
  `
})
export class SubpageHeroComponent {
  @Input() kicker = '';
  @Input() title = '';
  @Input() highlight?: string;
  @Input() subtitle = '';
  @Input() breadcrumbs: { label: string; href?: string }[] = [];
  @Input() bgImage?: string;
}
