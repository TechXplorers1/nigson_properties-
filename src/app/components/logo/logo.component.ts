import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center select-none group" [ngClass]="size === 'sm' ? 'gap-2' : (size === 'lg' ? 'gap-3.5' : 'gap-2.5')">
      <!-- Red Icon Square with White Building Architecture -->
      <div
        class="shrink-0 flex items-center justify-center bg-[#CC0D23] transition-transform duration-300 group-hover:scale-105 shadow-sm"
        [ngClass]="{
          'w-7 h-7 rounded-md': size === 'sm',
          'w-8 h-8 md:w-8.5 md:h-8.5 rounded-lg': size === 'md',
          'w-11 h-11 rounded-xl': size === 'lg'
        }"
      >
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="w-[72%] h-[72%]"
        >
          <g
            stroke="#FFFFFF"
            stroke-width="3.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <!-- Baseline -->
            <path d="M 8 50 H 56" />

            <!-- Center Main Tower -->
            <path d="M 19 50 V 19 A 4.5 4.5 0 0 1 23.5 14.5 H 40.5 A 4.5 4.5 0 0 1 45 19 V 50" />

            <!-- Left Wing -->
            <path d="M 10 50 V 30 A 3.5 3.5 0 0 1 13.5 26.5 H 19" />

            <!-- Right Wing -->
            <path d="M 45 26.5 H 50.5 A 3.5 3.5 0 0 1 54 30 V 50" />

            <!-- Upper Floor Window -->
            <path d="M 27 24 H 37" />

            <!-- Arched Entry / Doorway -->
            <path d="M 27 50 V 40 A 5 5 0 0 1 37 40 V 50" />
          </g>
        </svg>
      </div>

      <!-- Typography -->
      <div class="flex flex-col justify-center leading-none">
        <div
          class="font-sans font-extrabold uppercase flex items-center gap-1.5 transition-colors"
          [ngClass]="{
            'text-[11px] tracking-[0.10em]': size === 'sm',
            'text-[12.5px] md:text-[13.5px] tracking-[0.12em]': size === 'md',
            'text-base md:text-lg tracking-[0.14em]': size === 'lg'
          }"
        >
          <span
            [ngClass]="{
              'text-white': isLight,
              'text-zinc-950': !isLight
            }"
          >
            NIGSON
          </span>
          <span class="text-[#CC0D23]">
            PROPERTIES
          </span>
        </div>

        <span
          class="font-sans font-semibold uppercase transition-colors"
          [ngClass]="{
            'text-[6.5px] tracking-[0.20em] mt-0.5': size === 'sm',
            'text-[7px] md:text-[7.5px] tracking-[0.24em] mt-0.5': size === 'md',
            'text-[9px] tracking-[0.26em] mt-1': size === 'lg',
            'text-zinc-400': isLight,
            'text-slate-500': !isLight
          }"
        >
          A NIGSON GROUP COMPANY
        </span>
      </div>
    </div>
  `
})
export class LogoComponent {
  @Input() isLight: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
}
