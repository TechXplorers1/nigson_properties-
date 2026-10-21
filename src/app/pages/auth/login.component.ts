import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LogoComponent } from '../../components/logo/logo.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, LogoComponent],
  template: `
    <div class="min-h-screen grid lg:grid-cols-12 bg-white text-zinc-900 font-sans">
      <!-- Left Visual Hero (5 cols) -->
      <div class="hidden lg:flex lg:col-span-5 bg-[#0B0C10] text-white p-12 flex-col justify-between relative overflow-hidden">
        <img src="/assets/hero.jpg" alt="Nigson Penthouse" class="absolute inset-0 w-full h-full object-cover filter brightness-[0.4]" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

        <div class="relative z-10">
          <a routerLink="/" class="cursor-pointer" aria-label="Nigson Properties Limited">
            <app-logo [isLight]="true" size="md"></app-logo>
          </a>
        </div>

        <div class="relative z-10 space-y-4">
          <p class="kicker text-red-500">Private Access</p>
          <h2 class="font-serif text-3xl md:text-4xl font-medium leading-tight">
            Institutional Real Estate Portfolio Management
          </h2>
          <p class="text-xs text-zinc-300 font-light leading-relaxed">
            Monitor verified construction milestone telemetry, legal title documents, and off-plan equity allocations in one secure vault.
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
            <h1 class="font-serif text-3xl font-medium text-zinc-950 mt-4">Welcome Back</h1>
            <p class="text-xs text-zinc-500 mt-1">Sign in to your client account or access the executive dashboard.</p>
          </div>

          <!-- Demo Quick Fill Buttons -->
          <div class="p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl space-y-2">
            <span class="text-[0.65rem] font-bold uppercase tracking-wider text-zinc-400 block">Quick Demo Credentials</span>
            <div class="flex gap-2">
              <button
                type="button"
                (click)="fillDemo('client')"
                class="flex-1 py-1.5 px-3 bg-white border border-zinc-300 hover:border-zinc-950 text-zinc-800 text-xs font-semibold rounded text-center transition-colors"
              >
                Investor Portal Demo
              </button>
              <button
                type="button"
                (click)="fillDemo('admin')"
                class="flex-1 py-1.5 px-3 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold rounded text-center transition-colors"
              >
                Executive Admin Demo
              </button>
            </div>
          </div>

          <form (ngSubmit)="handleLogin()" class="space-y-4 text-xs font-medium text-zinc-700">
            <div>
              <label class="block uppercase tracking-wider text-zinc-400 mb-1">Email Address</label>
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
              <div class="flex justify-between items-center mb-1">
                <label class="uppercase tracking-wider text-zinc-400">Password</label>
                <a routerLink="/forgot-password" class="text-red-600 hover:underline">Forgot password?</a>
              </div>
              <input
                type="password"
                required
                [(ngModel)]="password"
                name="password"
                placeholder="••••••••••••"
                class="w-full border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-xs outline-none focus:border-red-600 focus:bg-white rounded"
              />
            </div>

            <button
              type="submit"
              class="btn-sweep w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded transition-all"
            >
              Authenticate & Enter
            </button>
          </form>

          <p class="text-center text-xs text-zinc-500">
            New private investor?
            <a routerLink="/signup" class="font-bold text-red-600 hover:underline ml-1">
              Apply for Investor Account
            </a>
          </p>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  router = inject(Router);
  authService = inject(AuthService);

  email = 'investor@nigson.com';
  password = '••••••••••••';
  year = new Date().getFullYear();

  fillDemo(role: 'client' | 'admin') {
    if (role === 'client') {
      this.email = 'investor@nigson.com';
      this.password = 'password123';
    } else {
      this.email = 'admin@nigson.com';
      this.password = 'admin123';
    }
  }

  handleLogin() {
    this.authService.login(this.email);
  }
}
