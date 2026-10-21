import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { naira, usd, gbp, waLink } from '../../models/data';

@Component({
  selector: 'app-mortgage-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="rounded-2xl border border-zinc-200 bg-white p-6 md:p-8 shadow-sm font-sans text-zinc-900">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-100 gap-4">
        <div>
          <div class="flex items-center gap-2 text-red-600 text-xs font-semibold uppercase tracking-widest">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
            Milestone Financing
          </div>
          <h3 class="font-serif text-2xl font-medium mt-1">Payment Plan & Mortgage Calculator</h3>
        </div>

        <!-- Currency Switcher -->
        <div class="flex items-center bg-zinc-100 rounded-full p-1 border border-zinc-200 text-xs font-semibold">
          <button
            *ngFor="let c of currencies"
            (click)="currency.set(c)"
            class="px-3 py-1 rounded-full transition-all"
            [ngClass]="currency() === c ? 'bg-red-600 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900'"
          >
            {{ c }}
          </button>
        </div>
      </div>

      <div class="grid gap-6 md:grid-cols-2 pt-6">
        <!-- Sliders Control -->
        <div class="space-y-6">
          <!-- Down payment % -->
          <div>
            <div class="flex justify-between text-xs font-semibold mb-2">
              <span class="text-zinc-500 uppercase tracking-wider">Initial Down Payment</span>
              <span class="text-red-600 font-bold text-sm tabular-nums">{{ downPercent }}% ({{ formatAmount(downPayment()) }})</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              [(ngModel)]="downPercent"
              class="w-full accent-red-600 cursor-pointer"
            />
            <div class="flex justify-between text-[0.65rem] text-zinc-400 mt-1">
              <span>10% (Minimum)</span>
              <span>30% (Standard)</span>
              <span>60% (Expedited)</span>
            </div>
          </div>

          <!-- Tenure Slider -->
          <div>
            <div class="flex justify-between text-xs font-semibold mb-2">
              <span class="text-zinc-500 uppercase tracking-wider">Milestone Schedule Tenure</span>
              <span class="text-red-600 font-bold text-sm tabular-nums">{{ tenureMonths }} Months</span>
            </div>
            <input
              type="range"
              min="6"
              max="36"
              step="6"
              [(ngModel)]="tenureMonths"
              class="w-full accent-red-600 cursor-pointer"
            />
            <div class="flex justify-between text-[0.65rem] text-zinc-400 mt-1">
              <span>6 Months</span>
              <span>12 Months</span>
              <span>24 Months</span>
              <span>36 Months</span>
            </div>
          </div>

          <div class="rounded-xl bg-zinc-50 p-4 border border-zinc-100 text-xs text-zinc-600 leading-relaxed">
            <span class="font-semibold text-zinc-950">Zero Percent Developer Interest:</span> All milestone installments are tied strictly to certified structural engineering stages verified by independent quantity surveyors.
          </div>
        </div>

        <!-- Calculation Summary Card -->
        <div class="rounded-xl bg-[#0B0C10] text-white p-6 flex flex-col justify-between border border-white/10 shadow-lg">
          <div>
            <span class="text-[0.65rem] font-bold tracking-[0.2em] text-red-500 uppercase">Live Financial Breakdown</span>
            <div class="mt-4 space-y-3.5">
              <div class="flex justify-between items-center text-sm border-b border-white/10 pb-2.5">
                <span class="text-zinc-400">Total Valuation</span>
                <span class="font-bold text-base tabular-nums">{{ formatAmount(initialPrice) }}</span>
              </div>
              <div class="flex justify-between items-center text-sm border-b border-white/10 pb-2.5">
                <span class="text-zinc-400">Initial Equity Deposit ({{ downPercent }}%)</span>
                <span class="font-bold text-base text-red-500 tabular-nums">{{ formatAmount(downPayment()) }}</span>
              </div>
              <div class="flex justify-between items-center text-sm border-b border-white/10 pb-2.5">
                <span class="text-zinc-400">Remaining Balance</span>
                <span class="text-sm text-zinc-200 tabular-nums">{{ formatAmount(balance()) }}</span>
              </div>
              <div class="flex justify-between items-center text-sm pt-1">
                <span class="text-zinc-300 font-semibold">Monthly Milestone Installment</span>
                <span class="font-bold text-xl text-emerald-400 tabular-nums">{{ formatAmount(monthlyPayment()) }} / mo</span>
              </div>
            </div>
          </div>

          <a
            [href]="waLink('Hello Nigson Finance Desk, I would like to structure a customized ' + tenureMonths + '-month payment plan.')"
            target="_blank"
            class="mt-6 w-full py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest rounded text-center transition-all"
          >
            Request Official Term Sheet
          </a>
        </div>
      </div>
    </div>
  `
})
export class MortgageCalculatorComponent {
  @Input() initialPrice: number = 850_000_000;

  downPercent = 30;
  tenureMonths = 24;
  currencies: ('NGN' | 'USD' | 'GBP')[] = ['NGN', 'USD', 'GBP'];
  currency = signal<'NGN' | 'USD' | 'GBP'>('NGN');
  waLink = waLink;

  downPayment(): number {
    return (this.initialPrice * this.downPercent) / 100;
  }

  balance(): number {
    return this.initialPrice - this.downPayment();
  }

  monthlyPayment(): number {
    return Math.round(this.balance() / this.tenureMonths);
  }

  formatAmount(amount: number): string {
    if (this.currency() === 'USD') return usd(Math.round(amount / 1500));
    if (this.currency() === 'GBP') return gbp(Math.round(amount / 1920));
    return naira(amount);
  }
}
