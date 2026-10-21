import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { properties, Property, naira, waLink } from '../../models/data';

@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="min-h-screen bg-zinc-50 text-zinc-900 font-sans flex flex-col pt-16">
      <!-- Portal Top Header Bar -->
      <section class="bg-[#0B0C10] text-white pt-16 pb-12 px-6 md:px-12 border-b border-white/10">
        <div class="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="flex items-center gap-4">
            <div class="h-16 w-16 rounded-full bg-red-600/20 border-2 border-red-600 text-red-500 flex items-center justify-center font-serif text-2xl font-bold">
              {{ authService.currentUser()?.initials || 'CA' }}
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-red-500 font-bold text-xs uppercase tracking-widest">Accredited Private Client</span>
                <span class="rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 text-[0.65rem] font-bold">
                  {{ authService.currentUser()?.tier || 'Tier 1 Investor' }}
                </span>
              </div>
              <h1 class="font-serif text-3xl font-medium text-white mt-1">
                Welcome back, {{ authService.currentUser()?.name || 'Chief Adeleke' }}
              </h1>
              <p class="text-xs text-zinc-400 font-light">
                {{ authService.currentUser()?.email || 'investor@nigson.com' }} · Client Portfolio Ref: #NIG-84920-IKY
              </p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <a
              routerLink="/properties"
              class="btn-sweep bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-all"
            >
              Explore New Launches
            </a>
            <button
              (click)="authService.logout()"
              class="border border-white/20 hover:border-white text-zinc-300 hover:text-white px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Exit Vault
            </button>
          </div>
        </div>
      </section>

      <!-- Main Tabs Container -->
      <main class="flex-1 mx-auto max-w-7xl px-6 md:px-12 py-10 w-full">
        <!-- Navigation Tabs Bar -->
        <div class="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-zinc-200">
          <button
            *ngFor="let tab of tabs"
            (click)="activeTab.set(tab.id)"
            class="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap"
            [ngClass]="activeTab() === tab.id ? 'bg-red-600 text-white shadow-md' : 'bg-white text-zinc-600 hover:text-zinc-950 border border-zinc-200'"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- TAB 1: PORTFOLIO -->
        <div *ngIf="activeTab() === 'portfolio'" class="space-y-8 animate-fadeIn">
          <!-- Summary Metrics Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <span class="text-xs font-bold uppercase tracking-wider text-zinc-400 block">Total Portfolio Valuation</span>
              <p class="font-sans font-bold text-3xl text-zinc-950 mt-1 tabular-nums">{{ naira(2100000000) }}</p>
              <span class="text-xs text-emerald-600 font-semibold mt-1 block">↑ +24.8% Capital Appreciation</span>
            </div>
            <div class="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <span class="text-xs font-bold uppercase tracking-wider text-zinc-400 block">Active Allocations</span>
              <p class="font-sans font-bold text-3xl text-zinc-950 mt-1">2 Prime Residences</p>
              <span class="text-xs text-zinc-500 mt-1 block">Banana Island & Eko Atlantic</span>
            </div>
            <div class="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <span class="text-xs font-bold uppercase tracking-wider text-zinc-400 block">Next Milestone Transfer</span>
              <p class="font-sans font-bold text-3xl text-red-600 mt-1 tabular-nums">{{ naira(85000000) }}</p>
              <span class="text-xs text-zinc-500 mt-1 block">Due Nov 2026 (Floor 20 Superstructure)</span>
            </div>
          </div>

          <!-- Saved & Owned Properties -->
          <h3 class="font-serif text-2xl font-medium text-zinc-950">Active Holding Dossiers</h3>
          <div class="grid md:grid-cols-2 gap-8">
            <div *ngFor="let p of savedProperties" class="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div class="aspect-[16/9] relative overflow-hidden bg-zinc-950">
                  <img [src]="p.image" [alt]="p.title" class="w-full h-full object-cover" />
                  <span class="absolute top-4 left-4 bg-red-600 text-white text-[0.65rem] font-bold uppercase tracking-wider px-3 py-1 rounded">
                    Under Development (78%)
                  </span>
                </div>
                <div class="p-6">
                  <h4 class="font-serif text-2xl font-bold text-zinc-950">{{ p.title }}</h4>
                  <p class="text-xs text-zinc-500 mt-1">{{ p.address || p.location }}</p>

                  <div class="mt-4 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                    <div class="flex justify-between text-xs font-semibold mb-1">
                      <span>Construction Execution</span>
                      <span class="text-red-600 font-bold">78% Complete</span>
                    </div>
                    <div class="h-2 w-full bg-zinc-200 rounded-full overflow-hidden">
                      <div class="h-full bg-red-600 rounded-full" style="width: 78%"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="p-6 pt-0 flex items-center justify-between border-t border-zinc-100">
                <span class="font-sans font-bold text-xl text-zinc-950 tabular-nums">{{ naira(p.price) }}</span>
                <a [routerLink]="['/properties', p.id]" class="text-xs font-bold uppercase tracking-wider text-red-600 hover:underline">
                  View Full Specs →
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 2: INSPECTIONS -->
        <div *ngIf="activeTab() === 'inspections'" class="space-y-6 animate-fadeIn">
          <div class="flex justify-between items-center">
            <h3 class="font-serif text-2xl font-medium text-zinc-950">Inspection Appointments</h3>
            <a routerLink="/properties" class="text-xs font-bold uppercase tracking-wider text-red-600 hover:underline">
              + Request New Tour
            </a>
          </div>

          <div class="space-y-4">
            <div *ngFor="let insp of inspectionsList" class="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span class="px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider rounded inline-block mb-1"
                  [ngClass]="insp.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-zinc-100 text-zinc-600'">
                  {{ insp.status }}
                </span>
                <h4 class="font-serif text-xl font-bold text-zinc-900">{{ insp.propertyTitle }}</h4>
                <p class="text-xs text-zinc-500 mt-0.5">{{ insp.type }} · Scheduled: <strong>{{ insp.dateTime }}</strong></p>
                <p class="text-xs text-zinc-400 mt-1">Lead Executive Escort: {{ insp.advisor }}</p>
              </div>
              <div class="flex gap-2">
                <a [href]="waLink('Hello ' + insp.advisor + ', I am inquiring about my inspection for ' + insp.propertyTitle + '.')" target="_blank" class="px-4 py-2 border border-zinc-300 rounded text-xs font-bold text-zinc-800 hover:border-red-600 hover:text-red-600">
                  Contact Escort
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 3: LEGAL DOCUMENTS -->
        <div *ngIf="activeTab() === 'documents'" class="space-y-6 animate-fadeIn">
          <h3 class="font-serif text-2xl font-medium text-zinc-950">Certified Land Titles & Conveyancing Vault</h3>
          <p class="text-xs text-zinc-500 -mt-4">Access official certified true copies (CTC) and deed of assignment perfection documents.</p>

          <div class="grid sm:grid-cols-2 gap-4">
            <div *ngFor="let doc of legalDocs" class="p-6 bg-white border border-zinc-200 rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <span class="text-[0.65rem] font-bold uppercase tracking-wider text-red-600 block mb-1">Encrypted Legal File</span>
                <h4 class="font-serif text-lg font-bold text-zinc-900">{{ doc.title }}</h4>
                <p class="text-xs text-zinc-500 mt-1">{{ doc.ref }} · {{ doc.fileSize }}</p>
              </div>
              <button (click)="viewDoc(doc.title)" class="mt-6 flex items-center justify-center gap-2 py-2.5 bg-zinc-950 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-red-600 transition-colors cursor-pointer">
                View Certified Document
              </button>
            </div>
          </div>
        </div>

        <!-- TAB 4: SHORT STAY VOUCHERS -->
        <div *ngIf="activeTab() === 'stays'" class="space-y-6 animate-fadeIn">
          <h3 class="font-serif text-2xl font-medium text-zinc-950">Executive Hospitality Stays</h3>
          <div class="p-6 bg-[#0B0C10] text-white rounded-2xl shadow-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span class="text-xs uppercase tracking-widest text-emerald-400 font-bold block mb-1">Accredited Owner Privilege</span>
              <h4 class="font-serif text-2xl font-medium">Complimentary Executive Suite Nights</h4>
              <p class="text-xs text-zinc-400 mt-1">4 of 6 complimentary nights remaining for this calendar year.</p>
            </div>
            <a routerLink="/short-stay" class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded text-center">
              Redeem at Suite
            </a>
          </div>
        </div>

        <!-- TAB 5: SETTINGS -->
        <div *ngIf="activeTab() === 'settings'" class="space-y-6 animate-fadeIn max-w-xl">
          <h3 class="font-serif text-2xl font-medium text-zinc-950">Investor Account Profile</h3>
          <div class="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm space-y-4 text-xs font-medium text-zinc-700">
            <div>
              <label class="block uppercase tracking-wider text-zinc-400 mb-1">Full Legal Name</label>
              <input type="text" value="Chief Babatunde Adeleke" class="w-full p-2.5 bg-zinc-50 border border-zinc-300 rounded text-xs" />
            </div>
            <div>
              <label class="block uppercase tracking-wider text-zinc-400 mb-1">Entity / Holding Trust</label>
              <input type="text" value="Adeleke Family Holding Trust Ltd" class="w-full p-2.5 bg-zinc-50 border border-zinc-300 rounded text-xs" />
            </div>
            <div>
              <label class="block uppercase tracking-wider text-zinc-400 mb-1">Preferred Currency Display</label>
              <select class="w-full p-2.5 bg-zinc-50 border border-zinc-300 rounded text-xs">
                <option value="NGN">NGN (Nigerian Naira)</option>
                <option value="USD">USD (United States Dollar)</option>
                <option value="GBP">GBP (British Pound Sterling)</option>
              </select>
            </div>
            <button class="w-full py-3 bg-red-600 text-white font-bold uppercase tracking-wider rounded mt-4">
              Save Preferences
            </button>
          </div>
        </div>
      </main>
    </div>
  `
})
export class PortalComponent {
  authService = inject(AuthService);
  savedProperties = properties.slice(0, 2);
  activeTab = signal<'portfolio' | 'inspections' | 'documents' | 'stays' | 'settings'>('portfolio');

  tabs = [
    { id: 'portfolio' as const, label: 'Portfolio Holdings (2)' },
    { id: 'inspections' as const, label: 'Inspection Appointments (2)' },
    { id: 'documents' as const, label: 'Legal Titles & Deeds (4)' },
    { id: 'stays' as const, label: 'Short-Stay Credits' },
    { id: 'settings' as const, label: 'Account Profile' }
  ];

  inspectionsList = [
    {
      propertyTitle: 'The Grand Azure Waterfront Villa',
      type: 'Private Chauffeur Guided Tour',
      dateTime: 'Oct 28, 2026 at 11:00 AM',
      advisor: 'Engr. Marco Bellini',
      status: 'Confirmed'
    },
    {
      propertyTitle: 'The Sovereign Smart Penthouse',
      type: 'Live 4K Ultra-HD Virtual Tour',
      dateTime: 'Nov 04, 2026 at 3:00 PM',
      advisor: 'Barr. Folashade Adeleke-Coker',
      status: 'Scheduled'
    }
  ];

  legalDocs = [
    {
      title: 'Federal Certificate of Occupancy (Federal C of O) — Banana Island',
      ref: 'LSR/BNN/2021/VOL-18-NO-94',
      fileSize: '4.2 MB (Signed & Sealed CTC)'
    },
    {
      title: 'Registered Governor’s Consent — Sovereign Penthouse',
      ref: 'LSR/EKO/2023/VOL-44-NO-112',
      fileSize: '3.8 MB (Governor’s Consent Deed)'
    },
    {
      title: 'Structural Eurocode Foundation Warranties',
      ref: 'ENG/NIG/2024/EC2-BASF',
      fileSize: '6.1 MB (Geotechnical Soil Survey)'
    },
    {
      title: 'Nigson Group Corporate Conveyancing Indemnity Bond',
      ref: 'CAMA/RC/1894231/BOND-2026',
      fileSize: '1.9 MB (Indemnity Guarantee)'
    }
  ];

  naira = naira;
  waLink = waLink;

  viewDoc(title: string) {
    alert(`Viewing ${title} — Cryptographically verified record displayed.`);
  }
}
