import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LogoComponent } from '../../components/logo/logo.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, LogoComponent],
  template: `
    <div class="min-h-screen grid lg:grid-cols-12 bg-white text-zinc-900 font-sans">
      <!-- Left Visual Hero (5 cols) -->
      <div class="hidden lg:flex lg:col-span-5 bg-[#0B0C10] text-white p-12 flex-col justify-between relative overflow-hidden">
        <img src="/assets/villa.jpg" alt="Nigson Villa" class="absolute inset-0 w-full h-full object-cover filter brightness-[0.4]" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

        <div class="relative z-10">
          <a routerLink="/" class="cursor-pointer" aria-label="Nigson Properties Limited">
            <app-logo [isLight]="true" size="md"></app-logo>
          </a>
        </div>

        <div class="relative z-10 space-y-4">
          <p class="kicker text-red-500">Investor Onboarding</p>
          <h2 class="font-serif text-3xl md:text-4xl font-medium leading-tight">
            Curated Wealth & Direct Developer Portfolios
          </h2>
          <p class="text-xs text-zinc-300 font-light leading-relaxed">
            Gain foundational pricing on off-plan coastal developments and receive confidential investor allocations.
          </p>
        </div>

        <div class="relative z-10 text-[0.65rem] text-zinc-400">
          © {{ year }} Nigson Properties Limited · CAMA RC 1894231
        </div>
      </div>

      <!-- Right Form Area (7 cols) -->
      <div class="lg:col-span-7 flex items-center justify-center p-8 sm:p-12 lg:p-16">
        <div class="max-w-md w-full space-y-8">
          <div>
            <div class="flex items-center justify-between">
              <a routerLink="/" class="text-xs font-semibold text-zinc-400 hover:text-red-600 transition-colors">
                ← Back to Home
              </a>
              <span class="text-xs text-zinc-400">RC 1894231</span>
            </div>
            <h1 class="font-serif text-3xl font-medium text-zinc-950 mt-4">Investor Registration</h1>
            <p class="text-xs text-zinc-500 mt-1">Open an accredited investor account for off-plan syndicates.</p>
          </div>

          <form (ngSubmit)="handleSignup()" class="space-y-4 text-xs font-medium text-zinc-700">
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block uppercase tracking-wider text-zinc-400 mb-1">First Name</label>
                <input
                  type="text"
                  required
                  [(ngModel)]="firstName"
                  name="firstName"
                  placeholder="Adaeze"
                  class="w-full border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-xs outline-none focus:border-red-600 focus:bg-white rounded"
                />
              </div>
              <div>
                <label class="block uppercase tracking-wider text-zinc-400 mb-1">Last Name</label>
                <input
                  type="text"
                  required
                  [(ngModel)]="lastName"
                  name="lastName"
                  placeholder="Okafor"
                  class="w-full border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-xs outline-none focus:border-red-600 focus:bg-white rounded"
                />
              </div>
            </div>

            <div>
              <label class="block uppercase tracking-wider text-zinc-400 mb-1">Corporate / Personal Email</label>
              <input
                type="email"
                required
                [(ngModel)]="email"
                name="email"
                placeholder="investor@holdingcorp.com"
                class="w-full border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-xs outline-none focus:border-red-600 focus:bg-white rounded"
              />
            </div>

            <div>
              <label class="block uppercase tracking-wider text-zinc-400 mb-1">Investor Category</label>
              <select
                [(ngModel)]="category"
                name="category"
                class="w-full border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-xs outline-none focus:border-red-600 rounded"
              >
                <option value="HNW Individual">HNW Individual</option>
                <option value="Diaspora Professional">Diaspora Professional</option>
                <option value="Family Office / Trust">Family Office / Trust</option>
                <option value="Institutional Real Estate Syndicate">Institutional Real Estate Syndicate</option>
              </select>
            </div>

            <div>
              <label class="block uppercase tracking-wider text-zinc-400 mb-1">Create Secure Password</label>
              <input
                type="password"
                required
                [(ngModel)]="password"
                name="password"
                placeholder="Minimum 8 characters"
                class="w-full border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-xs outline-none focus:border-red-600 focus:bg-white rounded"
              />
            </div>

            <button
              type="submit"
              class="btn-sweep w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded transition-all"
            >
              Complete Registration & Access Vault
            </button>
          </form>

          <p class="text-center text-xs text-zinc-500">
            Already have an investor account?
            <a routerLink="/login" class="font-bold text-red-600 hover:underline ml-1">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  `
})
export class SignupComponent {
  router = inject(Router);
  authService = inject(AuthService);

  firstName = '';
  lastName = '';
  email = '';
  category = 'HNW Individual';
  password = '';
  year = new Date().getFullYear();

  handleSignup() {
    this.authService.login(this.email || 'investor@nigson.com');
  }
}
