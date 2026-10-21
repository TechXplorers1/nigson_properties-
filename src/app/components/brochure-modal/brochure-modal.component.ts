import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-brochure-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      *ngIf="modalService.brochureOpen()"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
      (click)="closeOnBackdrop($event)"
    >
      <div
        class="bg-white max-w-md w-full p-6 md:p-8 shadow-2xl border border-red-500/30 relative text-zinc-900 font-sans"
        (click)="$event.stopPropagation()"
      >
        <button
          (click)="modalService.closeBrochure()"
          class="absolute top-4 right-4 text-zinc-400 hover:text-zinc-800 transition-colors p-1"
          aria-label="Close dialog"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div class="mb-4">
          <div class="flex items-center gap-2 text-red-600 text-xs font-semibold uppercase tracking-widest">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Official Document Access
          </div>
          <h2 class="font-serif text-2xl font-medium mt-1">
            Request {{ getTitle() }} Dossier
          </h2>
          <p class="text-xs text-zinc-500 mt-1">
            Complete architectural layouts, certified title surveys, and milestone payment schedules.
          </p>
        </div>

        <div *ngIf="downloaded()" class="bg-emerald-50 border border-emerald-300 p-4 rounded text-emerald-900 my-4 text-sm">
          <p class="font-bold flex items-center gap-2">
            <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Dossier Dispatched Successfully
          </p>
          <p class="text-xs mt-1 text-emerald-800 leading-relaxed">
            A copy has also been sent to {{ email }}.
          </p>
          <button
            (click)="downloaded.set(false); modalService.closeBrochure()"
            class="mt-3 px-4 py-2 bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider rounded"
          >
            Close
          </button>
        </div>

        <form *ngIf="!downloaded()" (ngSubmit)="handleDownload()" class="space-y-4 text-sm">
          <div>
            <label class="block text-[0.68rem] font-semibold uppercase tracking-wider text-zinc-500 mb-1">
              Full Legal Name
            </label>
            <input
              type="text"
              required
              [(ngModel)]="name"
              name="name"
              placeholder="e.g. Chief Adeleke"
              class="w-full border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-red-600 focus:bg-white"
            />
          </div>

          <div>
            <label class="block text-[0.68rem] font-semibold uppercase tracking-wider text-zinc-500 mb-1">
              Corporate / Personal Email
            </label>
            <input
              type="email"
              required
              [(ngModel)]="email"
              name="email"
              placeholder="adeleke@holdingcorp.com"
              class="w-full border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-red-600 focus:bg-white"
            />
          </div>

          <div>
            <label class="block text-[0.68rem] font-semibold uppercase tracking-wider text-zinc-500 mb-1">
              Phone Number (WhatsApp Preferred)
            </label>
            <input
              type="tel"
              required
              [(ngModel)]="phone"
              name="phone"
              placeholder="+234 801 234 5678"
              class="w-full border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-red-600 focus:bg-white"
            />
          </div>

          <div class="flex items-center gap-2 text-[0.72rem] text-zinc-500 pt-1">
            <svg class="w-4 h-4 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            <span>Encrypted under Nigerian Data Protection Regulation (NDPR).</span>
          </div>

          <button
            type="submit"
            [disabled]="isBusy()"
            class="btn-sweep w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 text-xs font-bold uppercase tracking-widest rounded transition-all"
          >
            <span *ngIf="!isBusy()">Request PDF Dossier</span>
            <span *ngIf="isBusy()">Preparing Encrypted File...</span>
          </button>
        </form>
      </div>
    </div>
  `
})
export class BrochureModalComponent {
  modalService = inject(ModalService);

  name = '';
  email = '';
  phone = '';
  isBusy = signal(false);
  downloaded = signal(false);

  getTitle(): string {
    const p = this.modalService.selectedProject();
    return p ? p.name : 'Master Investment';
  }

  closeOnBackdrop(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.modalService.closeBrochure();
    }
  }

  handleDownload() {
    if (!this.name || !this.email) return;
    this.isBusy.set(true);

    setTimeout(() => {
      this.isBusy.set(false);
      this.downloaded.set(true);
    }, 1000);
  }
}
