import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center p-6 bg-[#0B0C10] text-white font-sans">
      <div class="max-w-md w-full bg-[#16171F] border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl space-y-6">
        <div>
          <a routerLink="/login" class="text-xs font-semibold text-zinc-400 hover:text-red-500 transition-colors">
            ← Back to Sign In
          </a>
          <h1 class="font-serif text-3xl font-medium text-white mt-4">Reset Password</h1>
          <p class="text-xs text-zinc-400 mt-1">Enter your email and we'll send a secure password reset link.</p>
        </div>

        <div *ngIf="sent()" class="bg-emerald-950/60 border border-emerald-500/40 p-4 rounded-xl text-emerald-300 text-xs leading-relaxed">
          <p class="font-bold text-sm text-emerald-200">Reset Link Dispatched</p>
          <p class="mt-1">We have sent recovery instructions to <strong>{{ email }}</strong>. Please check your spam folder if it doesn't appear within 2 minutes.</p>
        </div>

        <form *ngIf="!sent()" (ngSubmit)="handleReset()" class="space-y-4 text-xs">
          <div>
            <label class="block uppercase tracking-wider text-zinc-400 mb-1">Account Email Address</label>
            <input
              type="email"
              required
              [(ngModel)]="email"
              name="email"
              placeholder="investor@holdingcorp.com"
              class="w-full border border-white/20 bg-black/50 px-3.5 py-2.5 text-xs text-white outline-none focus:border-red-600 rounded"
            />
          </div>

          <button
            type="submit"
            class="btn-sweep w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded transition-all"
          >
            Send Secure Reset Link
          </button>
        </form>
      </div>
    </div>
  `
})
export class ForgotPasswordComponent {
  email = '';
  sent = signal(false);

  handleReset() {
    if (!this.email) return;
    this.sent.set(true);
  }
}
