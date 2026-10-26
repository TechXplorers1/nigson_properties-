import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LogoComponent } from '../../components/logo/logo.component';
import {
  properties, Property, Category,
  projects, Project,
  suites, Suite,
  leads, Lead, LeadType, LeadStatus,
  naira, waLink,
  persistProperties, persistProjects, persistSuites, persistLeads,
  AppUser, UserRole, UserStatus, PermissionItem, AuditLogItem,
  users, permissions, auditLogs, initialPermissions,
  persistUsers, persistPermissions, persistAuditLogs
} from '../../models/data';
import { AdminCmsComponent } from './admin-cms.component';

type AdminModule = 'overview' | 'properties' | 'projects' | 'shortstay' | 'leads' | 'users' | 'content';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, LogoComponent, AdminCmsComponent],
  template: `
    <div class="min-h-screen bg-zinc-100 text-zinc-900 font-sans flex flex-col" (window:keydown.escape)="closeAllModals()">
      <!-- Main Layout: Side Panel + Active Module Content -->
      <div
        class="flex-1 flex mx-auto w-full relative transition-all duration-300"
        [ngClass]="activeModule() === 'content' ? 'max-w-[1800px] px-2 sm:px-4 lg:px-6' : 'max-w-7xl'"
      >
        <!-- Backdrop for mobile drawer -->
        <div
          *ngIf="sidebarOpen()"
          (click)="sidebarOpen.set(false)"
          class="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-40 transition-opacity"
        ></div>

        <!-- Floating Hamburger Toggle (Visible when side panel is collapsed) -->
        <button
          *ngIf="!sidebarOpen()"
          (click)="toggleSidebar()"
          class="fixed top-6 left-6 z-40 p-2.5 bg-white hover:bg-zinc-50 text-zinc-800 hover:text-red-600 border border-zinc-200 rounded-2xl shadow-lg transition-all flex items-center gap-2.5 cursor-pointer group animate-fadeIn"
          title="Open Admin Modules"
          aria-label="Open Admin Modules"
        >
          <svg class="w-5 h-5 text-zinc-700 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span class="text-xs font-serif font-bold tracking-wider text-zinc-800 group-hover:text-red-600 pr-1">
            Admin Modules
          </span>
        </button>

        <!-- SIDE PANEL -->
        <aside
          class="bg-white border-r border-zinc-200/90 shadow-2xl lg:shadow-none transition-all duration-300 ease-in-out z-50 lg:z-auto fixed lg:sticky top-0 inset-y-0 left-0 h-screen overflow-y-auto shrink-0"
          [ngClass]="{
            'w-80 translate-x-0': sidebarOpen(),
            'w-0 -translate-x-full lg:translate-x-0 lg:w-0 overflow-hidden border-none pointer-events-none': !sidebarOpen()
          }"
        >
          <div class="w-80 p-6 flex flex-col justify-between min-h-full">
            <div>
              <!-- Sidepanel Brand & Header with Hamburger Button -->
              <div class="mb-6 pb-4 border-b border-zinc-100">
                <div class="flex items-center justify-between">
                  <a routerLink="/" class="cursor-pointer" aria-label="Nigson Properties Home">
                    <app-logo [isLight]="false" size="sm"></app-logo>
                  </a>
                  <button
                    (click)="toggleSidebar()"
                    class="p-2 rounded-xl text-zinc-700 hover:text-red-600 hover:bg-zinc-100 transition-colors cursor-pointer group"
                    title="Toggle Side Panel"
                    aria-label="Toggle Side Panel"
                  >
                    <svg class="w-5 h-5 text-zinc-700 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
                <div class="mt-3.5 flex items-center justify-between">
                  <span class="font-serif tracking-[0.22em] text-[10px] font-bold text-slate-400 uppercase block">
                    ADMIN MODULES
                  </span>
                  <span class="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold rounded-full">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live Portal
                  </span>
                </div>
              </div>

              <!-- Modules List -->
              <div class="space-y-3">
                <!-- 1. Executive Overview -->
                <button
                  type="button"
                  (click)="selectModule('overview')"
                  class="w-full text-left transition-all duration-200 cursor-pointer select-none"
                  [ngClass]="activeModule() === 'overview'
                    ? 'bg-[#CC0D23] text-white rounded-2xl shadow-lg shadow-red-600/25 px-4 py-3.5 flex items-center gap-3.5'
                    : 'text-zinc-800 hover:bg-zinc-100 rounded-2xl px-4 py-3.5 flex items-center gap-3.5'"
                >
                  <div class="w-6 h-6 flex items-center justify-center shrink-0">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" stroke-width="2"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12l3-3m-6 3a3 3 0 116 0 3 3 0 01-6 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7v1m-4 2l.7.7m6.6 0l.7-.7"/>
                    </svg>
                  </div>
                  <span class="font-serif text-[15px] font-medium leading-none">
                    Executive Overview
                  </span>
                </button>

                <!-- 2. Property Management -->
                <button
                  type="button"
                  (click)="selectModule('properties')"
                  class="w-full text-left transition-all duration-200 cursor-pointer select-none"
                  [ngClass]="activeModule() === 'properties'
                    ? 'bg-[#CC0D23] text-white rounded-2xl shadow-lg shadow-red-600/25 px-4 py-3.5 flex items-center justify-between'
                    : 'text-zinc-800 hover:bg-zinc-100 rounded-2xl px-4 py-3.5 flex items-center justify-between'"
                >
                  <div class="flex items-center gap-3.5">
                    <div class="w-6 h-6 flex items-center justify-center shrink-0">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                      </svg>
                    </div>
                    <span class="font-serif text-[15px] font-medium leading-none">
                      Property Management
                    </span>
                  </div>
                  <span
                    class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-serif font-bold shrink-0 transition-colors"
                    [ngClass]="activeModule() === 'properties'
                      ? 'bg-white/20 text-white border border-white/30'
                      : 'bg-red-50 text-red-600 border border-red-100'"
                  >
                    {{ allProps.length }}
                  </span>
                </button>

                <!-- 3. Project Developments -->
                <button
                  type="button"
                  (click)="selectModule('projects')"
                  class="w-full text-left transition-all duration-200 cursor-pointer select-none"
                  [ngClass]="activeModule() === 'projects'
                    ? 'bg-[#CC0D23] text-white rounded-2xl shadow-lg shadow-red-600/25 px-4 py-3.5 flex items-center justify-between'
                    : 'text-zinc-800 hover:bg-zinc-100 rounded-2xl px-4 py-3.5 flex items-center justify-between'"
                >
                  <div class="flex items-center gap-3.5">
                    <div class="w-6 h-6 flex items-center justify-center shrink-0">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 6l4 4-2 2-4-4 2-2z M5 19l7-7 M11 10l3 3"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 20h4"/>
                      </svg>
                    </div>
                    <span class="font-serif text-[15px] font-medium leading-none">
                      Project Developments
                    </span>
                  </div>
                  <span
                    class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-serif font-bold shrink-0 transition-colors"
                    [ngClass]="activeModule() === 'projects'
                      ? 'bg-white/20 text-white border border-white/30'
                      : 'bg-red-50 text-red-600 border border-red-100'"
                  >
                    {{ allProjects.length }}
                  </span>
                </button>

                <!-- 4. Short-Stay Bookings -->
                <button
                  type="button"
                  (click)="selectModule('shortstay')"
                  class="w-full text-left transition-all duration-200 cursor-pointer select-none"
                  [ngClass]="activeModule() === 'shortstay'
                    ? 'bg-[#CC0D23] text-white rounded-2xl shadow-lg shadow-red-600/25 px-4 py-3.5 flex items-center justify-between'
                    : 'text-zinc-800 hover:bg-zinc-100 rounded-2xl px-4 py-3.5 flex items-center justify-between'"
                >
                  <div class="flex items-center gap-3.5">
                    <div class="w-6 h-6 flex items-center justify-center shrink-0">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
                      </svg>
                    </div>
                    <span class="font-serif text-[15px] font-medium leading-none">
                      Short-Stay Bookings
                    </span>
                  </div>
                  <span
                    class="ml-auto px-2 py-0.5 text-xs font-bold rounded-full transition-colors"
                    [ngClass]="activeModule() === 'shortstay'
                      ? 'bg-white text-red-600'
                      : 'bg-red-50 text-red-600 border border-red-100'"
                  >
                    {{ allSuites.length }}
                  </span>
                </button>

                <!-- 5. Lead Management -->
                <button
                  type="button"
                  (click)="selectModule('leads')"
                  class="w-full text-left transition-all duration-200 cursor-pointer select-none"
                  [ngClass]="activeModule() === 'leads'
                    ? 'bg-[#CC0D23] text-white rounded-2xl shadow-lg shadow-red-600/25 px-4 py-3.5 flex items-center justify-between'
                    : 'text-zinc-800 hover:bg-zinc-100 rounded-2xl px-4 py-3.5 flex items-center justify-between'"
                >
                  <div class="flex items-center gap-3.5">
                    <div class="w-6 h-6 flex items-center justify-center shrink-0">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/>
                        <circle cx="9" cy="7" r="4" stroke-width="2"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 8l1.2 2.5 2.8.4-2 2 .5 2.8L19 14.3l-2.5 1.4.5-2.8-2-2 2.8-.4L19 8z"/>
                      </svg>
                    </div>
                    <span class="font-serif text-[15px] font-medium leading-none">
                      Lead Management
                    </span>
                  </div>
                  <span
                    class="px-2.5 py-0.5 rounded-full text-[0.65rem] font-serif font-bold tracking-wider uppercase shrink-0 transition-colors"
                    [ngClass]="activeModule() === 'leads'
                      ? 'bg-white text-red-600'
                      : 'bg-[#E11D48] text-white shadow-xs'"
                  >
                    {{ getNewLeadsCount() }} NEW
                  </span>
                </button>

                <!-- 6. Users, Roles & Permissions -->
                <button
                  type="button"
                  (click)="selectModule('users')"
                  class="w-full text-left transition-all duration-200 cursor-pointer select-none"
                  [ngClass]="activeModule() === 'users'
                    ? 'bg-[#CC0D23] text-white rounded-2xl shadow-lg shadow-red-600/25 px-4 py-3.5 flex items-center justify-between'
                    : 'text-zinc-800 hover:bg-zinc-100 rounded-2xl px-4 py-3.5 flex items-center justify-between'"
                >
                  <div class="flex items-center gap-3.5">
                    <div class="w-6 h-6 flex items-center justify-center shrink-0">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <span class="font-serif text-[15px] font-medium leading-none">
                      Users, Roles & Permissions
                    </span>
                  </div>
                  <span
                    class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-serif font-bold shrink-0 transition-colors"
                    [ngClass]="activeModule() === 'users'
                      ? 'bg-white/20 text-white border border-white/30'
                      : 'bg-zinc-100 text-zinc-700 border border-zinc-200'"
                  >
                    {{ allUsers.length }}
                  </span>
                </button>

                <!-- 7. Content Management -->
                <button
                  type="button"
                  (click)="selectModule('content')"
                  class="w-full text-left transition-all duration-200 cursor-pointer select-none"
                  [ngClass]="activeModule() === 'content'
                    ? 'bg-[#CC0D23] text-white rounded-2xl shadow-lg shadow-red-600/25 px-4 py-3.5 flex items-center justify-between'
                    : 'text-zinc-800 hover:bg-zinc-100 rounded-2xl px-4 py-3.5 flex items-center justify-between'"
                >
                  <div class="flex items-center gap-3.5">
                    <div class="w-6 h-6 flex items-center justify-center shrink-0">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span class="font-serif text-[15px] font-medium leading-none">
                      Content Management
                    </span>
                  </div>
                  <span
                    class="px-2 py-0.5 text-xs font-bold rounded-full transition-colors"
                    [ngClass]="activeModule() === 'content'
                      ? 'bg-white text-red-600'
                      : 'bg-red-50 text-red-600 border border-red-100'"
                  >
                    7 Pages
                  </span>
                </button>
              </div>
            </div>

            <!-- Side Panel Footer Info & Sign Out -->
            <div class="mt-8 pt-5 border-t border-zinc-100 space-y-3">
              <div class="p-3 bg-zinc-50 rounded-xl border border-zinc-200/80 flex items-center justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                  <span class="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-sm">
                    EA
                  </span>
                  <div class="min-w-0">
                    <span class="text-xs font-bold text-zinc-950 block truncate">Executive Admin</span>
                    <span class="text-[0.65rem] text-zinc-500 block truncate">System Director · RC 1894231</span>
                  </div>
                </div>
              </div>

              <!-- Live Website & Sign Out Button inside Sidepanel -->
              <div class="flex items-center gap-2 pt-1">
                <a
                  routerLink="/"
                  class="flex-1 text-center py-2.5 px-3 border border-zinc-200 hover:border-zinc-400 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-semibold rounded-xl transition-all"
                >
                  Live Site →
                </a>
                <button
                  (click)="authService.logout()"
                  class="flex-1 py-2.5 px-3 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 hover:border-red-600 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </aside>

        <!-- MAIN MODULE CONTENT AREA -->
        <main class="flex-1 min-w-0 p-6 md:p-10 space-y-8 animate-fadeIn">

          <!-- MODULE 1: EXECUTIVE OVERVIEW -->
          <div *ngIf="activeModule() === 'overview'" class="space-y-8">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span class="text-xs font-bold uppercase tracking-widest text-red-600">Telemetry & Performance</span>
                <h2 class="font-serif text-3xl font-bold text-zinc-950 mt-1">Executive Overview</h2>
                <p class="text-xs text-zinc-500">Live operational telemetry across developments, client equity, and hospitality.</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-full">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  System Operational · Live
                </span>
              </div>
            </div>

            <!-- Key Metrics Cards -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div class="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                <span class="text-[0.68rem] font-bold uppercase tracking-wider text-zinc-400 block">Gross Pipeline</span>
                <p class="font-sans font-bold text-3xl text-zinc-950 mt-1 tabular-nums">₦18.4 Billion</p>
                <span class="text-xs text-emerald-600 font-semibold mt-1 block">↑ 16.4% MoM Growth</span>
              </div>

              <div class="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                <span class="text-[0.68rem] font-bold uppercase tracking-wider text-zinc-400 block">Active Private Leads</span>
                <p class="font-sans font-bold text-3xl text-zinc-950 mt-1 tabular-nums">48 Investors</p>
                <span class="text-xs text-zinc-500 mt-1 block">12 UK/US Diaspora</span>
              </div>

              <div class="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                <span class="text-[0.68rem] font-bold uppercase tracking-wider text-zinc-400 block">Off-Plan Closures</span>
                <p class="font-sans font-bold text-3xl text-zinc-950 mt-1 tabular-nums">14 Units</p>
                <span class="text-xs text-red-600 font-semibold mt-1 block">White Oaks & Lagoon Crest</span>
              </div>

              <div class="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                <span class="text-[0.68rem] font-bold uppercase tracking-wider text-zinc-400 block">Hospitality Occupancy</span>
                <p class="font-sans font-bold text-3xl text-zinc-950 mt-1 tabular-nums">94.2%</p>
                <span class="text-xs text-zinc-500 mt-1 block">Executive Short-Stay</span>
              </div>
            </div>

            <!-- Quick Jump Panels -->
            <div class="grid md:grid-cols-2 gap-6">
              <!-- Recent VIP Leads Summary -->
              <div class="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 space-y-4">
                <div class="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <h3 class="font-serif text-lg font-bold text-zinc-950">Recent Priority Inquiries</h3>
                  <button (click)="selectModule('leads')" class="text-xs text-red-600 hover:underline font-semibold cursor-pointer">
                    View CRM ({{ allLeads.length }}) →
                  </button>
                </div>
                <div class="divide-y divide-zinc-100">
                  <div *ngFor="let ld of allLeads.slice(0, 4)" class="py-3 flex items-center justify-between gap-3">
                    <div class="min-w-0">
                      <div class="flex items-center gap-2 flex-wrap">
                        <p class="font-bold text-xs text-zinc-900 truncate">{{ ld.name }}</p>
                        <span class="px-1.5 py-0.5 rounded text-[0.6rem] font-bold border" [ngClass]="getCategoryBadgeClass(ld.type)">
                          {{ ld.type }}
                        </span>
                      </div>
                      <p class="text-[0.7rem] text-zinc-400 truncate mt-0.5">{{ ld.property || ld.serviceCategory || 'Portfolio Advisory' }}</p>
                    </div>
                    <span
                      class="px-2.5 py-0.5 rounded text-[0.65rem] font-bold shrink-0 border"
                      [ngClass]="getStatusBadgeClass(ld.status)"
                    >
                      {{ ld.status }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Construction Milestone Telemetry -->
              <div class="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 space-y-4">
                <div class="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <h3 class="font-serif text-lg font-bold text-zinc-950">Active Construction Milestones</h3>
                  <button (click)="selectModule('projects')" class="text-xs text-red-600 hover:underline font-semibold cursor-pointer">
                    All Developments ({{ allProjects.length }}) →
                  </button>
                </div>
                <div class="space-y-3">
                  <div *ngFor="let pr of allProjects.slice(0, 3)" class="space-y-1">
                    <div class="flex justify-between text-xs font-semibold">
                      <span class="text-zinc-800">{{ pr.name }}</span>
                      <span class="text-red-600 font-bold tabular-nums">{{ pr.progress }}%</span>
                    </div>
                    <div class="w-full bg-zinc-100 rounded-full h-2 overflow-hidden">
                      <div class="bg-red-600 h-2 rounded-full transition-all duration-500" [style.width.%]="pr.progress"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- MODULE 2: PROPERTY MANAGEMENT -->
          <div *ngIf="activeModule() === 'properties'" class="space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span class="text-xs font-bold uppercase tracking-widest text-red-600">Inventory CMS</span>
                <h2 class="font-serif text-3xl font-bold text-zinc-950 mt-1">Property Management</h2>
                <p class="text-xs text-zinc-500">Manage live properties, pricing, allocations, and handover status.</p>
              </div>
              <div class="flex items-center gap-3">
                <span class="px-3 py-1 bg-zinc-950 text-white text-xs font-bold rounded-lg">
                  {{ allProps.length }} Total Residences
                </span>
                <button
                  (click)="addNewProperty()"
                  class="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                  <span>Add Property</span>
                </button>
              </div>
            </div>

            <!-- Configuration Notice -->
            <div class="p-4 bg-zinc-900 text-white rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border border-zinc-800">
              <div class="flex items-center gap-2.5">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span><strong>Admin Catalog:</strong> {{ allProps.length }} active properties loaded in management console.</span>
              </div>
              <span class="text-zinc-400 bg-zinc-800 px-2.5 py-1 rounded text-[0.7rem] font-medium">
                Home Page Showcase: Dynamically featured premier listings
              </span>
            </div>

            <!-- Search and Filter Bar -->
            <div class="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-white p-4 rounded-xl border border-zinc-200">
              <div class="flex-1 max-w-md relative">
                <input
                  type="text"
                  [ngModel]="propSearch()"
                  (ngModelChange)="propSearch.set($event)"
                  placeholder="Search residence by name, location (Ikoyi, Abuja, Banana Island)..."
                  class="w-full pl-9 pr-4 py-2 border border-zinc-200 rounded-lg text-xs outline-none focus:border-red-600"
                />
                <svg class="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>

              <!-- Category Pills -->
              <div class="flex flex-wrap gap-2">
                <button
                  *ngFor="let cat of propCategories"
                  (click)="selectedPropCategory.set(cat)"
                  class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                  [ngClass]="selectedPropCategory() === cat ? 'bg-zinc-950 text-white shadow-sm' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'"
                >
                  {{ cat }}
                </button>
              </div>
            </div>

            <!-- Properties Grid -->
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div *ngFor="let p of filteredProps()" class="border border-zinc-200 rounded-2xl p-5 flex flex-col justify-between bg-white shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <div class="aspect-[16/10] rounded-xl overflow-hidden bg-zinc-950 mb-3.5 relative">
                    <img [src]="p.image" [alt]="p.title" class="w-full h-full object-cover" />
                    <span class="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[0.62rem] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-sm">
                      {{ p.category }}
                    </span>
                    <span class="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded text-[0.62rem] font-bold bg-white/95 text-zinc-900 shadow-sm">
                      {{ p.location }}
                    </span>
                  </div>
                  <h4 class="font-serif text-lg font-bold text-zinc-950 leading-tight">
                    <a [routerLink]="['/properties', p.id]" target="_blank" class="hover:text-red-600 transition-colors">{{ p.title }}</a>
                  </h4>
                  <p class="text-xs text-zinc-500 mt-1">{{ p.address || p.location }} · {{ p.beds }} Beds · {{ p.size }} sqm</p>
                  <p class="font-sans font-bold text-base text-red-600 mt-2.5 tabular-nums">{{ naira(p.price) }}</p>
                </div>

                <div class="mt-4 pt-3.5 border-t border-zinc-100 flex items-center justify-between gap-2">
                  <button
                    (click)="toggleStatus(p)"
                    class="px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                    [ngClass]="p.status === 'Ready for Handover' ? 'bg-zinc-950 text-white' : 'bg-red-50 text-red-700 border border-red-200'"
                  >
                    {{ p.status }}
                  </button>
                  <div class="flex items-center gap-3">
                    <a [routerLink]="['/properties', p.id]" target="_blank" class="text-xs text-zinc-500 hover:text-zinc-950 font-semibold">
                      View ↗
                    </a>
                    <button (click)="deleteProp(p.id)" class="text-xs text-red-600 hover:underline font-semibold cursor-pointer">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div *ngIf="filteredProps().length === 0" class="p-12 text-center bg-white rounded-2xl border border-zinc-200 text-zinc-400">
              <p class="font-serif text-lg text-zinc-800">No residences found matching "{{ propSearch() }}"</p>
              <button (click)="propSearch.set(''); selectedPropCategory.set('All')" class="mt-2 text-xs text-red-600 hover:underline font-bold cursor-pointer">
                Clear Filters
              </button>
            </div>
          </div>

          <!-- MODULE 3: PROJECT DEVELOPMENTS -->
          <div *ngIf="activeModule() === 'projects'" class="space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span class="text-xs font-bold uppercase tracking-widest text-red-600">Masterplan Telemetry</span>
                <h2 class="font-serif text-3xl font-bold text-zinc-950 mt-1">Project Developments</h2>
                <p class="text-xs text-zinc-500">Track structural engineering stages, bored piling, and capital allocation.</p>
              </div>
              <div class="flex items-center gap-3">
                <span class="px-3 py-1 bg-zinc-950 text-white text-xs font-bold rounded-lg">
                  {{ allProjects.length }} Total Projects
                </span>
                <button
                  (click)="proposeProject()"
                  class="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                  <span>Add Project</span>
                </button>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div *ngFor="let pr of allProjects" class="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                <div class="aspect-[16/9] rounded-xl overflow-hidden bg-zinc-950 relative">
                  <img [src]="pr.image" [alt]="pr.name" class="w-full h-full object-cover" />
                  <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[0.68rem] font-bold uppercase tracking-wider shadow-sm"
                    [ngClass]="pr.status && pr.status.includes('Completed') ? 'bg-emerald-600 text-white' : (pr.status === 'Shortlet' ? 'bg-amber-500 text-white' : 'bg-red-600 text-white')">
                    {{ pr.status || (pr.progress === 100 ? 'Completed' : 'Under Construction') }}
                  </span>
                  <span class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-sm">
                    {{ pr.roi }}% Projected ROI
                  </span>
                  <span class="absolute bottom-3 left-3 px-2.5 py-0.5 rounded text-[0.65rem] font-bold bg-black/75 backdrop-blur text-white uppercase tracking-wider border border-white/10">
                    {{ pr.category }}
                  </span>
                </div>

                <div class="flex items-start justify-between gap-3">
                  <div>
                    <h3 class="font-serif text-xl font-bold text-zinc-950">
                      <a [routerLink]="['/projects', pr.id]" target="_blank" class="hover:text-red-600 transition-colors">{{ pr.name }}</a>
                    </h3>
                    <p class="text-xs text-zinc-500 mt-0.5">{{ pr.location }} · {{ pr.units }}</p>
                  </div>
                </div>

                <div class="space-y-1.5">
                  <div class="flex justify-between text-xs font-semibold">
                    <span class="text-zinc-600">Total Construction Completion</span>
                    <span class="text-red-600 font-bold tabular-nums">{{ pr.progress }}%</span>
                  </div>
                  <div class="w-full bg-zinc-100 rounded-full h-3 overflow-hidden">
                    <div class="bg-red-600 h-3 rounded-full transition-all duration-500" [style.width.%]="pr.progress"></div>
                  </div>
                </div>

                <div class="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-600">
                  <span>Target: <strong class="text-zinc-900">{{ pr.handover }}</strong></span>
                  <div class="flex items-center gap-3">
                    <a [routerLink]="['/projects', pr.id]" target="_blank" class="text-zinc-600 hover:text-zinc-950 font-semibold">
                      Live Project ↗
                    </a>
                    <button (click)="deleteProject(pr.id)" class="text-xs text-red-600 hover:underline font-semibold cursor-pointer">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- MODULE 4: SHORT-STAY BOOKINGS -->
          <div *ngIf="activeModule() === 'shortstay'" class="space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span class="text-xs font-bold uppercase tracking-widest text-red-600">Hospitality & Concierge</span>
                <h2 class="font-serif text-3xl font-bold text-zinc-950 mt-1">Short-Stay Bookings</h2>
                <p class="text-xs text-zinc-500">Manage serviced duplexes, turnover schedules, and guest check-ins.</p>
              </div>
              <div class="flex items-center gap-3">
                <span class="px-3 py-1 bg-zinc-950 text-white text-xs font-bold rounded-lg">
                  {{ allSuites.length }} Managed Suites
                </span>
                <button
                  (click)="addSuite()"
                  class="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                  <span>Add Short Stay</span>
                </button>
              </div>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div *ngFor="let st of allSuites" class="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                <div class="aspect-[16/9] rounded-xl overflow-hidden bg-zinc-950 relative">
                  <img [src]="st.image" [alt]="st.name" class="w-full h-full object-cover" />
                  <span class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-sm">
                    94.2% Occupancy
                  </span>
                  <span class="absolute bottom-3 left-3 px-2.5 py-0.5 rounded text-[0.65rem] font-bold bg-black/75 backdrop-blur text-white uppercase tracking-wider border border-white/10">
                    {{ st.location }}
                  </span>
                </div>

                <div class="flex items-start justify-between gap-4">
                  <div>
                    <h3 class="font-serif text-xl font-bold text-zinc-950 hover:text-red-600 transition-colors">
                      <a [routerLink]="['/short-stay', st.id]" target="_blank">{{ st.name }}</a>
                    </h3>
                    <p class="text-xs text-zinc-500 mt-0.5">{{ st.beds }} Beds · {{ st.baths }} Baths · Max {{ st.maxGuests }} Guests</p>
                  </div>
                  <div class="text-right shrink-0">
                    <p class="font-sans font-bold text-xl text-red-600 tabular-nums">{{ naira(st.rate) }}</p>
                    <span class="text-[0.65rem] text-zinc-400 uppercase tracking-wider block">Per Night</span>
                  </div>
                </div>

                <div class="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
                  <div class="flex items-center gap-3">
                    <a [routerLink]="['/short-stay', st.id]" target="_blank" class="text-zinc-600 hover:text-zinc-950 font-semibold flex items-center gap-1">
                      Live Suite Page ↗
                    </a>
                    <button (click)="deleteSuite(st.id)" class="text-xs text-red-600 hover:underline font-semibold cursor-pointer">
                      Delete
                    </button>
                  </div>
                  <a [href]="waLink('Hello, inquiring about Short-Stay concierge calendar for ' + st.name)" target="_blank" class="text-red-600 hover:underline font-bold">
                    Concierge Line →
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- MODULE 5: LEAD MANAGEMENT -->
          <div *ngIf="activeModule() === 'leads'" class="space-y-6 animate-fadeIn">
            <!-- Header Section -->
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span class="text-xs font-bold uppercase tracking-widest text-red-600">Executive VIP CRM</span>
                <h2 class="font-serif text-3xl font-bold text-zinc-950 mt-1">Lead Management</h2>
                <p class="text-xs text-zinc-500">
                  Centralized command desk for property inquiries, private inspections, sales pipelines, leasing, and concierge hospitality.
                </p>
              </div>

              <div class="flex items-center gap-2.5">
                <button
                  type="button"
                  (click)="openLogLeadModal()"
                  class="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                  </svg>
                  <span>+ Log New Inquiry</span>
                </button>
              </div>
            </div>

            <!-- KPI Cards Grid -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <!-- Card 1: Total Inquiries -->
              <div class="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-sm">
                <div class="flex items-center justify-between">
                  <span class="text-[0.68rem] font-bold uppercase tracking-wider text-zinc-400">Total Inquiries</span>
                  <span class="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-700 flex items-center justify-center text-xs">
                    📊
                  </span>
                </div>
                <p class="font-sans font-bold text-2xl md:text-3xl text-zinc-950 mt-2 tabular-nums">
                  {{ allLeads.length }}
                </p>
                <span class="text-[0.7rem] text-zinc-500 mt-1 block">Across 7 Active Categories</span>
              </div>

              <!-- Card 2: Action Required / New -->
              <div class="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-sm">
                <div class="flex items-center justify-between">
                  <span class="text-[0.68rem] font-bold uppercase tracking-wider text-rose-500">Action Required</span>
                  <span class="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                </div>
                <p class="font-sans font-bold text-2xl md:text-3xl text-rose-600 mt-2 tabular-nums">
                  {{ getNewLeadsCount() }} New
                </p>
                <span class="text-[0.7rem] text-zinc-500 mt-1 block">Awaiting First Outreach</span>
              </div>

              <!-- Card 3: Scheduled Inspections & Bookings -->
              <div class="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-sm">
                <div class="flex items-center justify-between">
                  <span class="text-[0.68rem] font-bold uppercase tracking-wider text-amber-600">Scheduled Tours & Stays</span>
                  <span class="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center text-xs">
                    📅
                  </span>
                </div>
                <p class="font-sans font-bold text-2xl md:text-3xl text-zinc-950 mt-2 tabular-nums">
                  {{ getScheduledCount() }}
                </p>
                <span class="text-[0.7rem] text-zinc-500 mt-1 block">VIP Viewings & Bookings Confirmed</span>
              </div>

              <!-- Card 4: Estimated Pipeline Allocation -->
              <div class="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-sm">
                <div class="flex items-center justify-between">
                  <span class="text-[0.68rem] font-bold uppercase tracking-wider text-emerald-600">Pipeline Scope</span>
                  <span class="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs">
                    💎
                  </span>
                </div>
                <p class="font-sans font-bold text-2xl md:text-3xl text-zinc-950 mt-2 tabular-nums">
                  {{ getInquiryPipelineTotal() }}
                </p>
                <span class="text-[0.7rem] text-zinc-500 mt-1 block">Total Capital In Play</span>
              </div>
            </div>

            <!-- Category Tabs Navigation (All 7 Categories) -->
            <div class="bg-white p-2 rounded-2xl border border-zinc-200 shadow-sm overflow-x-auto">
              <div class="flex items-center gap-1.5 min-w-max">
                <button
                  type="button"
                  *ngFor="let cat of leadCategories"
                  (click)="selectedLeadCategory.set(cat.type)"
                  class="px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer select-none"
                  [ngClass]="selectedLeadCategory() === cat.type
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'"
                >
                  <span>{{ cat.icon }}</span>
                  <span>{{ cat.label }}</span>
                  <span
                    class="px-1.5 py-0.5 rounded-md text-[0.65rem] font-bold"
                    [ngClass]="selectedLeadCategory() === cat.type
                      ? 'bg-white/20 text-white'
                      : 'bg-zinc-100 text-zinc-600'"
                  >
                    {{ getLeadsCountByType(cat.type) }}
                  </span>
                </button>
              </div>
            </div>

            <!-- Search, Filter & Quick Toolbar -->
            <div class="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <!-- Search Bar -->
              <div class="relative flex-1">
                <input
                  type="text"
                  [ngModel]="leadSearch()"
                  (ngModelChange)="leadSearch.set($event)"
                  placeholder="Search investor, email, phone, property or requirements..."
                  class="w-full pl-10 pr-8 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-red-600 focus:bg-white transition-all"
                />
                <svg class="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <button
                  *ngIf="leadSearch()"
                  (click)="leadSearch.set('')"
                  class="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-700 text-xs font-bold"
                >
                  &times;
                </button>
              </div>

              <!-- Status Dropdown Filter -->
              <div class="flex items-center gap-3">
                <span class="text-xs text-zinc-400 font-semibold whitespace-nowrap">Status:</span>
                <select
                  [ngModel]="leadStatusFilter()"
                  (ngModelChange)="leadStatusFilter.set($event)"
                  class="px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-700 outline-none focus:border-red-600 focus:bg-white transition-all cursor-pointer"
                >
                  <option value="All">All Statuses ({{ allLeads.length }})</option>
                  <option value="New">New ({{ getStatusCount('New') }})</option>
                  <option value="In Progress">In Progress ({{ getStatusCount('In Progress') }})</option>
                  <option value="Scheduled">Scheduled ({{ getStatusCount('Scheduled') }})</option>
                  <option value="Closed">Closed ({{ getStatusCount('Closed') }})</option>
                </select>

                <!-- Reset Filters Button if applied -->
                <button
                  *ngIf="leadSearch() || leadStatusFilter() !== 'All' || selectedLeadCategory() !== 'All'"
                  (click)="resetLeadFilters()"
                  class="px-3 py-2 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  Reset
                </button>
              </div>
            </div>

            <!-- Leads Table -->
            <div class="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs text-zinc-600">
                  <thead class="bg-zinc-50 text-[0.65rem] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-200">
                    <tr>
                      <th class="py-3.5 px-6">Investor / Contact</th>
                      <th class="py-3.5 px-6">Inquiry Category</th>
                      <th class="py-3.5 px-6">Property / Subject</th>
                      <th class="py-3.5 px-6">Capital / Scope</th>
                      <th class="py-3.5 px-6">Timeline & Date</th>
                      <th class="py-3.5 px-6">Lifecycle Status</th>
                      <th class="py-3.5 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-zinc-100">
                    <tr *ngFor="let ld of filteredLeads()" class="hover:bg-zinc-50/80 transition-colors group">
                      <!-- 1. Contact -->
                      <td class="py-4 px-6">
                        <div class="flex items-center gap-2">
                          <span class="font-bold text-zinc-950 block text-sm">{{ ld.name }}</span>
                          <span *ngIf="ld.source" class="px-1.5 py-0.5 bg-zinc-100 text-zinc-500 rounded text-[0.6rem] font-medium">
                            {{ ld.source }}
                          </span>
                        </div>
                        <div class="text-zinc-400 mt-0.5 space-x-1">
                          <a [href]="'mailto:' + ld.email" class="hover:text-red-600 hover:underline">{{ ld.email }}</a>
                          <span>·</span>
                          <a [href]="'tel:' + ld.phone" class="hover:text-red-600 hover:underline">{{ ld.phone }}</a>
                        </div>
                      </td>

                      <!-- 2. Category Badge -->
                      <td class="py-4 px-6">
                        <span
                          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[0.68rem] font-bold border"
                          [ngClass]="getCategoryBadgeClass(ld.type)"
                        >
                          <span>{{ getCategoryIcon(ld.type) }}</span>
                          <span>{{ ld.type }}</span>
                        </span>
                        <!-- Subtype info if present -->
                        <span *ngIf="ld.tourType" class="text-[0.65rem] text-purple-600 font-medium block mt-1">
                          ↳ {{ ld.tourType }}
                        </span>
                        <span *ngIf="ld.nights" class="text-[0.65rem] text-emerald-600 font-medium block mt-1">
                          ↳ {{ ld.nights }} Nights · {{ ld.guests }} Guests
                        </span>
                        <span *ngIf="ld.serviceCategory" class="text-[0.65rem] text-amber-600 font-medium block mt-1">
                          ↳ {{ ld.serviceCategory }}
                        </span>
                      </td>

                      <!-- 3. Property / Subject -->
                      <td class="py-4 px-6">
                        <p class="font-semibold text-zinc-900 leading-snug">{{ ld.property || 'General Portfolio Advisory' }}</p>
                        <p *ngIf="ld.location" class="text-[0.68rem] text-zinc-400 mt-0.5">{{ ld.location }}</p>
                      </td>

                      <!-- 4. Budget / Financials -->
                      <td class="py-4 px-6 font-sans font-bold text-zinc-950 tabular-nums">
                        {{ ld.budget || '—' }}
                      </td>

                      <!-- 5. Timeline & Date -->
                      <td class="py-4 px-6">
                        <span class="text-zinc-700 font-medium block">{{ ld.date }}</span>
                        <span *ngIf="ld.preferredDate" class="text-[0.68rem] text-purple-700 font-semibold block mt-0.5">
                          Req: {{ ld.preferredDate }}
                        </span>
                        <span *ngIf="ld.checkIn" class="text-[0.68rem] text-emerald-700 font-semibold block mt-0.5">
                          Stay: {{ ld.checkIn }} → {{ ld.checkOut }}
                        </span>
                      </td>

                      <!-- 6. Status Selector -->
                      <td class="py-4 px-6">
                        <select
                          [ngModel]="ld.status"
                          (ngModelChange)="updateLeadStatus(ld, $event)"
                          class="px-2.5 py-1.5 text-xs font-semibold rounded-lg border outline-none cursor-pointer transition-colors"
                          [ngClass]="getStatusBadgeClass(ld.status)"
                        >
                          <option value="New">New</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Scheduled">Scheduled</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>

                      <!-- 7. Actions -->
                      <td class="py-4 px-6 text-right">
                        <div class="flex items-center justify-end gap-2">
                          <!-- WhatsApp Button -->
                          <a
                            [href]="generateWhatsAppLink(ld)"
                            target="_blank"
                            class="px-2.5 py-1.5 bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-[0.65rem] uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                            title="Direct WhatsApp Outreach"
                          >
                            <span>WhatsApp</span>
                          </a>

                          <!-- View Details Button -->
                          <button
                            type="button"
                            (click)="openViewLeadModal(ld)"
                            class="p-1.5 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 rounded-lg transition-colors cursor-pointer"
                            title="View Inquiry Dossier"
                          >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                            </svg>
                          </button>

                          <!-- Delete Button -->
                          <button
                            type="button"
                            (click)="deleteLead(ld.id)"
                            class="p-1.5 hover:bg-red-50 text-zinc-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                            title="Delete Lead"
                          >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>

                    <!-- Empty State -->
                    <tr *ngIf="filteredLeads().length === 0">
                      <td colspan="7" class="py-12 px-6 text-center text-zinc-400">
                        <div class="max-w-xs mx-auto space-y-2">
                          <p class="font-serif text-lg font-bold text-zinc-800">No Inquiries Found</p>
                          <p class="text-xs text-zinc-500">No client inquiries match the current category tab or search criteria.</p>
                          <button
                            (click)="resetLeadFilters()"
                            class="mt-3 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                          >
                            Reset All Filters
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>


          <!-- MODULE 6: USERS, ROLES & PERMISSIONS -->
          <div *ngIf="activeModule() === 'users'" class="space-y-6 animate-fadeIn">
            <!-- Header Banner -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span class="text-xs font-bold uppercase tracking-widest text-red-600">Enterprise Access & Governance</span>
                <h2 class="font-serif text-3xl font-bold text-zinc-950 mt-1">Users, Roles & Permissions</h2>
                <p class="text-xs text-zinc-500">Corporate user administration, access tiering, role-based permission matrix & audit security logs.</p>
              </div>
              <div class="flex items-center gap-3">
                <button
                  (click)="openAddUserModal()"
                  class="btn-sweep px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span>+ Invite Member</span>
                </button>
              </div>
            </div>

            <!-- Top Metric Stats Cards -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div class="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm">
                <span class="text-[0.68rem] font-bold uppercase tracking-wider text-zinc-400 block">Total System Users</span>
                <p class="font-sans font-bold text-3xl text-zinc-950 mt-1 tabular-nums">{{ allUsers.length }}</p>
                <span class="text-xs text-emerald-600 font-semibold mt-1 block">✓ All Accounts Indexed</span>
              </div>
              <div class="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm">
                <span class="text-[0.68rem] font-bold uppercase tracking-wider text-zinc-400 block">Staff & Executives</span>
                <p class="font-sans font-bold text-3xl text-zinc-950 mt-1 tabular-nums">{{ getStaffCount() }}</p>
                <span class="text-xs text-zinc-500 mt-1 block">5 Operational Roles</span>
              </div>
              <div class="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm">
                <span class="text-[0.68rem] font-bold uppercase tracking-wider text-zinc-400 block">Private Investors</span>
                <p class="font-sans font-bold text-3xl text-zinc-950 mt-1 tabular-nums">{{ getInvestorCount() }}</p>
                <span class="text-xs text-purple-600 font-semibold mt-1 block">Tier 1 & Syndicates</span>
              </div>
              <div class="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm">
                <span class="text-[0.68rem] font-bold uppercase tracking-wider text-zinc-400 block">Security Status</span>
                <p class="font-sans font-bold text-xl text-emerald-700 mt-2 flex items-center gap-1.5 font-serif">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active Shield
                </p>
                <span class="text-xs text-zinc-400 mt-1 block">RBAC Strict Enforced</span>
              </div>
            </div>

            <!-- Sub-Tabs Navigation -->
            <div class="bg-white p-1.5 rounded-2xl border border-zinc-200 shadow-sm flex items-center gap-1 max-w-xl">
              <button
                (click)="usersSubTab.set('directory')"
                class="flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                [ngClass]="usersSubTab() === 'directory' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                <span>User Directory ({{ allUsers.length }})</span>
              </button>
              <button
                (click)="usersSubTab.set('roles')"
                class="flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                [ngClass]="usersSubTab() === 'roles' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                <span>Roles & Permissions</span>
              </button>
              <button
                (click)="usersSubTab.set('audit')"
                class="flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                [ngClass]="usersSubTab() === 'audit' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span>Security Audit Log</span>
              </button>
            </div>

            <!-- SUB-TAB 1: USER DIRECTORY -->
            <div *ngIf="usersSubTab() === 'directory'" class="space-y-4">
              <!-- Filter & Search Controls -->
              <div class="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
                <div class="relative w-full md:w-80">
                  <input
                    type="text"
                    [(ngModel)]="userSearchTerm"
                    placeholder="Search by name, email, department..."
                    class="w-full pl-9 pr-4 py-2 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 bg-zinc-50 focus:bg-white"
                  />
                  <svg class="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <div class="flex items-center gap-2.5 w-full md:w-auto flex-wrap">
                  <!-- Role Filter -->
                  <select
                    [(ngModel)]="userRoleFilter"
                    class="px-3 py-2 border border-zinc-200 rounded-xl text-xs bg-white text-zinc-700 outline-none focus:border-red-600 font-medium"
                  >
                    <option value="ALL">All Roles ({{ allUsers.length }})</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Project Director">Project Director</option>
                    <option value="Senior Sales Advisor">Senior Sales Advisor</option>
                    <option value="Hospitality & Short-Stay Desk">Hospitality & Short-Stay Desk</option>
                    <option value="Facility & Property Manager">Facility & Property Manager</option>
                    <option value="Verified Private Investor">Verified Private Investor</option>
                  </select>

                  <!-- Status Filter -->
                  <select
                    [(ngModel)]="userStatusFilter"
                    class="px-3 py-2 border border-zinc-200 rounded-xl text-xs bg-white text-zinc-700 outline-none focus:border-red-600 font-medium"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Pending Approval">Pending Approval</option>
                    <option value="Suspended">Suspended</option>
                  </select>

                  <button
                    *ngIf="userSearchTerm || userRoleFilter !== 'ALL' || userStatusFilter !== 'ALL'"
                    (click)="userSearchTerm = ''; userRoleFilter = 'ALL'; userStatusFilter = 'ALL'"
                    class="px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-xl transition-colors font-semibold"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <!-- Users Table -->
              <div class="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
                <div class="overflow-x-auto">
                  <table class="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr class="bg-zinc-50 border-b border-zinc-200 text-zinc-400 font-bold uppercase tracking-wider text-[0.65rem]">
                        <th class="py-3.5 px-4">User</th>
                        <th class="py-3.5 px-4">Role & Access Tier</th>
                        <th class="py-3.5 px-4">Contact Info</th>
                        <th class="py-3.5 px-4">Status</th>
                        <th class="py-3.5 px-4">Activity</th>
                        <th class="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-zinc-100">
                      <tr *ngFor="let u of filteredUsers()" class="hover:bg-zinc-50/70 transition-colors">
                        <!-- User Name & Avatar -->
                        <td class="py-3.5 px-4">
                          <div class="flex items-center gap-3">
                            <span class="w-8 h-8 rounded-full text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-sm" [ngClass]="u.avatarColor || 'bg-red-600'">
                              {{ u.name.slice(0, 2).toUpperCase() }}
                            </span>
                            <div>
                              <p class="font-bold text-zinc-950">{{ u.name }}</p>
                              <p class="text-[0.68rem] text-zinc-400">{{ u.department }}</p>
                            </div>
                          </div>
                        </td>

                        <!-- Role & Tier -->
                        <td class="py-3.5 px-4">
                          <div>
                            <span class="inline-block px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold border" [ngClass]="getUserRoleBadgeClass(u.role)">
                              {{ u.role }}
                            </span>
                            <span *ngIf="u.tier" class="block text-[0.65rem] text-zinc-500 mt-0.5 truncate max-w-[180px]">
                              {{ u.tier }}
                            </span>
                          </div>
                        </td>

                        <!-- Contact Info -->
                        <td class="py-3.5 px-4">
                          <p class="text-zinc-800 font-medium">{{ u.email }}</p>
                          <p class="text-[0.68rem] text-zinc-400 mt-0.5">{{ u.phone }}</p>
                        </td>

                        <!-- Status Badge -->
                        <td class="py-3.5 px-4">
                          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold border" [ngClass]="getUserStatusBadgeClass(u.status)">
                            <span class="w-1.5 h-1.5 rounded-full" [ngClass]="u.status === 'Active' ? 'bg-emerald-500' : (u.status === 'Suspended' ? 'bg-rose-500' : 'bg-amber-500')"></span>
                            {{ u.status }}
                          </span>
                        </td>

                        <!-- Joined & Last Login -->
                        <td class="py-3.5 px-4 text-zinc-600">
                          <p class="font-medium text-[0.7rem]">{{ u.lastLogin }}</p>
                          <p class="text-[0.65rem] text-zinc-400 mt-0.5">Joined {{ u.joinedDate }}</p>
                        </td>

                        <!-- Actions -->
                        <td class="py-3.5 px-4 text-right">
                          <div class="flex items-center justify-end gap-1.5">
                            <button
                              (click)="openEditUserModal(u)"
                              class="p-1.5 hover:bg-zinc-200/60 rounded-lg text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer"
                              title="Edit User Profile & Role"
                            >
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                            </button>
                            <button
                              (click)="toggleUserStatus(u)"
                              class="p-1.5 hover:bg-zinc-200/60 rounded-lg text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer"
                              [title]="u.status === 'Active' ? 'Suspend User Access' : 'Reactivate User Access'"
                            >
                              <svg *ngIf="u.status === 'Active'" class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                              <svg *ngIf="u.status !== 'Active'" class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            </button>
                            <button
                              (click)="resetUserPassword(u)"
                              class="p-1.5 hover:bg-zinc-200/60 rounded-lg text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer"
                              title="Send Password Reset Link"
                            >
                              <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
                            </button>
                            <button
                              *ngIf="u.role !== 'Super Admin'"
                              (click)="deleteUser(u)"
                              class="p-1.5 hover:bg-red-50 rounded-lg text-zinc-400 hover:text-red-600 transition-colors cursor-pointer"
                              title="Delete User"
                            >
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                            </button>
                          </div>
                        </td>
                      </tr>

                      <tr *ngIf="filteredUsers().length === 0">
                        <td colspan="6" class="py-12 text-center text-zinc-400">
                          <p class="font-bold text-sm">No users match your filters.</p>
                          <button (click)="userSearchTerm = ''; userRoleFilter = 'ALL'; userStatusFilter = 'ALL'" class="mt-2 text-xs text-red-600 hover:underline">
                            Reset Filters
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- SUB-TAB 2: ROLES & PERMISSIONS MATRIX -->
            <div *ngIf="usersSubTab() === 'roles'" class="space-y-6">
              <!-- Roles Overview Cards -->
              <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="p-4 bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between">
                      <span class="px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold bg-red-50 text-red-700 border border-red-200">
                        Super Admin
                      </span>
                      <span class="text-xs font-bold text-zinc-500">2 Users</span>
                    </div>
                    <p class="text-xs font-bold text-zinc-900 mt-2">Executive Leadership & Board</p>
                    <p class="text-[0.7rem] text-zinc-500 mt-1 leading-relaxed">Full unrestricted access to all real estate inventory, financial models, user accounts & compliance audits.</p>
                  </div>
                  <span class="text-[0.65rem] text-emerald-600 font-bold mt-3 block">✓ All 20 Capabilities Granted</span>
                </div>

                <div class="p-4 bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between">
                      <span class="px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                        Project Director
                      </span>
                      <span class="text-xs font-bold text-zinc-500">1 User</span>
                    </div>
                    <p class="text-xs font-bold text-zinc-900 mt-2">Projects & Operations</p>
                    <p class="text-[0.7rem] text-zinc-500 mt-1 leading-relaxed">PMP-certified management of ongoing developments, civil piling progress, drone visual archives & title uploads.</p>
                  </div>
                  <span class="text-[0.65rem] text-zinc-600 font-bold mt-3 block">14 Capabilities Granted</span>
                </div>

                <div class="p-4 bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between">
                      <span class="px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        Senior Sales Advisor
                      </span>
                      <span class="text-xs font-bold text-zinc-500">1 User</span>
                    </div>
                    <p class="text-xs font-bold text-zinc-900 mt-2">Commercial Sales Desk</p>
                    <p class="text-[0.7rem] text-zinc-500 mt-1 leading-relaxed">Lead qualification, inspection dispatch, client dossier presentation, and off-plan allocation tracking.</p>
                  </div>
                  <span class="text-[0.65rem] text-zinc-600 font-bold mt-3 block">9 Capabilities Granted</span>
                </div>

                <div class="p-4 bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between">
                      <span class="px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        Hospitality Desk
                      </span>
                      <span class="text-xs font-bold text-zinc-500">1 User</span>
                    </div>
                    <p class="text-xs font-bold text-zinc-900 mt-2">Short-Stay Operations</p>
                    <p class="text-[0.7rem] text-zinc-500 mt-1 leading-relaxed">Benson Close Old Ikoyi serviced suite reservations, calendar sync, caution deposits & check-in verification.</p>
                  </div>
                  <span class="text-[0.65rem] text-zinc-600 font-bold mt-3 block">6 Capabilities Granted</span>
                </div>

                <div class="p-4 bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between">
                      <span class="px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Facility Manager
                      </span>
                      <span class="text-xs font-bold text-zinc-500">1 User</span>
                    </div>
                    <p class="text-xs font-bold text-zinc-900 mt-2">Asset & Maintenance</p>
                    <p class="text-[0.7rem] text-zinc-500 mt-1 leading-relaxed">Banana Island & Lekki maintenance ticketing, emergency dispatch, and tenant service charge workflows.</p>
                  </div>
                  <span class="text-[0.65rem] text-zinc-600 font-bold mt-3 block">4 Capabilities Granted</span>
                </div>

                <div class="p-4 bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between">
                      <span class="px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                        Verified Investor
                      </span>
                      <span class="text-xs font-bold text-zinc-500">3 Users</span>
                    </div>
                    <p class="text-xs font-bold text-zinc-900 mt-2">Private Client Vault</p>
                    <p class="text-[0.7rem] text-zinc-500 mt-1 leading-relaxed">Restricted access to verified legal title deeds, watermarked architectural drawings & payment ledger receipts.</p>
                  </div>
                  <span class="text-[0.65rem] text-zinc-600 font-bold mt-3 block">4 Capabilities Granted</span>
                </div>
              </div>

              <!-- Interactive Permission Matrix Table -->
              <div class="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
                <div class="p-4 bg-zinc-50 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 class="font-serif font-bold text-sm text-zinc-950">Interactive Role-Based Permission Matrix (RBAC)</h3>
                    <p class="text-[0.7rem] text-zinc-500">Click any capability badge to toggle live permissions for that corporate role.</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <button
                      (click)="resetPermissionsToDefault()"
                      class="px-3 py-1.5 text-xs text-zinc-600 hover:text-zinc-900 border border-zinc-200 rounded-xl hover:bg-zinc-100 transition-colors font-semibold"
                    >
                      Reset to Defaults
                    </button>
                    <button
                      (click)="showToast('Permissions matrix saved to cloud storage.')"
                      class="px-4 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
                    >
                      Save Matrix
                    </button>
                  </div>
                </div>

                <div class="overflow-x-auto">
                  <table class="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr class="bg-zinc-100/70 border-b border-zinc-200 text-zinc-600 font-bold uppercase tracking-wider text-[0.65rem]">
                        <th class="py-3 px-4 min-w-[240px]">Capability / Scope</th>
                        <th class="py-3 px-3 text-center">Super Admin</th>
                        <th class="py-3 px-3 text-center">Project Director</th>
                        <th class="py-3 px-3 text-center">Sales Advisor</th>
                        <th class="py-3 px-3 text-center">Hospitality</th>
                        <th class="py-3 px-3 text-center">Facility Mgr</th>
                        <th class="py-3 px-3 text-center">Investor</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-zinc-100">
                      <tr *ngFor="let p of allPermissions" class="hover:bg-zinc-50/70 transition-colors">
                        <!-- Label & Category -->
                        <td class="py-3 px-4">
                          <p class="font-bold text-zinc-900">{{ p.label }}</p>
                          <span class="text-[0.65rem] text-zinc-400 font-medium uppercase tracking-wider">{{ p.category }}</span>
                        </td>

                        <!-- Super Admin (Locked) -->
                        <td class="py-3 px-3 text-center">
                          <button
                            (click)="togglePermission(p, 'superAdmin')"
                            class="px-2.5 py-1 rounded-lg text-[0.65rem] font-bold transition-all cursor-pointer inline-flex items-center gap-1 bg-red-50 text-red-700 border border-red-200"
                            title="Super Admin has master override"
                          >
                            <span>✓</span> Granted
                          </button>
                        </td>

                        <!-- Project Director -->
                        <td class="py-3 px-3 text-center">
                          <button
                            (click)="togglePermission(p, 'projectDirector')"
                            class="px-2.5 py-1 rounded-lg text-[0.65rem] font-bold transition-all cursor-pointer inline-flex items-center gap-1 border"
                            [ngClass]="p.projectDirector ? 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100' : 'bg-zinc-50 text-zinc-400 border-zinc-200 hover:bg-zinc-100'"
                          >
                            <span>{{ p.projectDirector ? '✓ Granted' : '— Denied' }}</span>
                          </button>
                        </td>

                        <!-- Senior Sales Advisor -->
                        <td class="py-3 px-3 text-center">
                          <button
                            (click)="togglePermission(p, 'salesAdvisor')"
                            class="px-2.5 py-1 rounded-lg text-[0.65rem] font-bold transition-all cursor-pointer inline-flex items-center gap-1 border"
                            [ngClass]="p.salesAdvisor ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' : 'bg-zinc-50 text-zinc-400 border-zinc-200 hover:bg-zinc-100'"
                          >
                            <span>{{ p.salesAdvisor ? '✓ Granted' : '— Denied' }}</span>
                          </button>
                        </td>

                        <!-- Hospitality Desk -->
                        <td class="py-3 px-3 text-center">
                          <button
                            (click)="togglePermission(p, 'hospitalityDesk')"
                            class="px-2.5 py-1 rounded-lg text-[0.65rem] font-bold transition-all cursor-pointer inline-flex items-center gap-1 border"
                            [ngClass]="p.hospitalityDesk ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' : 'bg-zinc-50 text-zinc-400 border-zinc-200 hover:bg-zinc-100'"
                          >
                            <span>{{ p.hospitalityDesk ? '✓ Granted' : '— Denied' }}</span>
                          </button>
                        </td>

                        <!-- Facility Manager -->
                        <td class="py-3 px-3 text-center">
                          <button
                            (click)="togglePermission(p, 'facilityManager')"
                            class="px-2.5 py-1 rounded-lg text-[0.65rem] font-bold transition-all cursor-pointer inline-flex items-center gap-1 border"
                            [ngClass]="p.facilityManager ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' : 'bg-zinc-50 text-zinc-400 border-zinc-200 hover:bg-zinc-100'"
                          >
                            <span>{{ p.facilityManager ? '✓ Granted' : '— Denied' }}</span>
                          </button>
                        </td>

                        <!-- Private Investor -->
                        <td class="py-3 px-3 text-center">
                          <button
                            (click)="togglePermission(p, 'investor')"
                            class="px-2.5 py-1 rounded-lg text-[0.65rem] font-bold transition-all cursor-pointer inline-flex items-center gap-1 border"
                            [ngClass]="p.investor ? 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' : 'bg-zinc-50 text-zinc-400 border-zinc-200 hover:bg-zinc-100'"
                          >
                            <span>{{ p.investor ? '✓ Granted' : '— Denied' }}</span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- SUB-TAB 3: SECURITY & AUDIT TRAIL -->
            <div *ngIf="usersSubTab() === 'audit'" class="space-y-4">
              <!-- Audit Filter & Export Bar -->
              <div class="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                <div class="relative w-full sm:w-80">
                  <input
                    type="text"
                    [(ngModel)]="auditSearchTerm"
                    placeholder="Search logs by actor, action, target..."
                    class="w-full pl-9 pr-4 py-2 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 bg-zinc-50 focus:bg-white"
                  />
                  <svg class="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <div class="flex items-center gap-2">
                  <button
                    (click)="exportAuditLogCSV()"
                    class="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                    <span>Export Audit Trail (CSV)</span>
                  </button>
                </div>
              </div>

              <!-- Audit Table -->
              <div class="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
                <div class="overflow-x-auto">
                  <table class="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr class="bg-zinc-50 border-b border-zinc-200 text-zinc-400 font-bold uppercase tracking-wider text-[0.65rem]">
                        <th class="py-3 px-4">Timestamp</th>
                        <th class="py-3 px-4">Actor & Role</th>
                        <th class="py-3 px-4">Action Taken</th>
                        <th class="py-3 px-4">Target Resource</th>
                        <th class="py-3 px-4">IP Address / Geo</th>
                        <th class="py-3 px-4 text-right">Security Status</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-zinc-100">
                      <tr *ngFor="let log of filteredAuditLogs()" class="hover:bg-zinc-50/70 transition-colors">
                        <td class="py-3 px-4 text-zinc-500 font-medium whitespace-nowrap">{{ log.timestamp }}</td>
                        <td class="py-3 px-4">
                          <p class="font-bold text-zinc-900">{{ log.actor }}</p>
                          <span class="text-[0.65rem] text-zinc-400">{{ log.role }}</span>
                        </td>
                        <td class="py-3 px-4 font-semibold text-zinc-800">{{ log.action }}</td>
                        <td class="py-3 px-4 text-zinc-600">{{ log.target }}</td>
                        <td class="py-3 px-4 font-mono text-[0.7rem] text-zinc-500">{{ log.ipAddress }}</td>
                        <td class="py-3 px-4 text-right">
                          <span
                            class="inline-block px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold border"
                            [ngClass]="{
                              'bg-emerald-50 text-emerald-700 border-emerald-200': log.status === 'Success',
                              'bg-amber-50 text-amber-700 border-amber-200': log.status === 'Warning',
                              'bg-rose-50 text-rose-700 border-rose-200': log.status === 'Blocked'
                            }"
                          >
                            {{ log.status }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- MODULE 7: CONTENT MANAGEMENT STUDIO (ALL 7 PAGES & LIVE EXACT VIEW) -->
          <div *ngIf="activeModule() === 'content'" class="animate-fadeIn">
            <app-admin-cms
              (logAction)="onCmsLogAction($event)"
              (showToastMsg)="showToast($event)"
            ></app-admin-cms>
          </div>

        </main>
      </div>

      <!-- ======================================================== -->
      <!-- MODAL 1: ADD PROPERTY FORM                               -->
      <!-- ======================================================== -->
      <div
        *ngIf="showAddPropertyModal()"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto animate-fadeIn"
        (click)="closeAddPropertyModal()"
      >
        <div
          class="bg-white max-w-3xl w-full my-auto rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden relative flex flex-col max-h-[92vh] text-zinc-900"
          (click)="$event.stopPropagation()"
        >
          <!-- Header -->
          <div class="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-5 border-b border-zinc-100 flex items-center justify-between z-10">
            <div>
              <span class="text-[0.68rem] font-bold uppercase tracking-widest text-red-600 block">Inventory Catalog</span>
              <h3 class="font-serif text-2xl font-bold text-zinc-950">Add New Property</h3>
            </div>
            <button
              (click)="closeAddPropertyModal()"
              class="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <!-- Form Body -->
          <form (ngSubmit)="submitNewProperty()" class="overflow-y-auto px-6 py-6 space-y-6 text-xs text-zinc-700">
            <!-- Row 1: Title & Tagline -->
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Property Title <span class="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  name="propTitle"
                  [(ngModel)]="propertyForm.title"
                  placeholder="e.g. The Grand Azure Waterfront Villa"
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all bg-white"
                />
              </div>

              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Tagline / Subheading
                </label>
                <input
                  type="text"
                  name="propTagline"
                  [(ngModel)]="propertyForm.tagline"
                  placeholder="e.g. Sculpted Lagoon Frontage with Private Jetty"
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all bg-white"
                />
              </div>
            </div>

            <!-- Row 2: Category, Status & Location -->
            <div class="grid sm:grid-cols-3 gap-4">
              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Category <span class="text-red-600">*</span>
                </label>
                <select
                  name="propCategory"
                  [(ngModel)]="propertyForm.category"
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 bg-white cursor-pointer"
                >
                  <option value="Luxury Villas">Luxury Villas</option>
                  <option value="Waterfront Penthouses">Waterfront Penthouses</option>
                  <option value="Smart Terraces">Smart Terraces</option>
                </select>
              </div>

              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Development Status
                </label>
                <select
                  name="propStatus"
                  [(ngModel)]="propertyForm.status"
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 bg-white cursor-pointer"
                >
                  <option value="Ready for Handover">Ready for Handover</option>
                  <option value="Off-Plan">Off-Plan</option>
                </select>
              </div>

              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Primary Location <span class="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  name="propLocation"
                  [(ngModel)]="propertyForm.location"
                  placeholder="e.g. Banana Island, Ikoyi, Eko Atlantic"
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 transition-all bg-white"
                />
              </div>
            </div>

            <!-- Row 3: Address & Title Deed -->
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Full Street Address
                </label>
                <input
                  type="text"
                  name="propAddress"
                  [(ngModel)]="propertyForm.address"
                  placeholder="e.g. Zone A, Ocean Parade Way, Banana Island, Ikoyi"
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 transition-all bg-white"
                />
              </div>

              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Land Title Deed
                </label>
                <input
                  type="text"
                  name="propTitleDeed"
                  [(ngModel)]="propertyForm.titleDeed"
                  placeholder="e.g. Federal C of O & Governor's Consent"
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 transition-all bg-white"
                />
              </div>
            </div>

            <!-- Row 4: Pricing & Dimensions -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-200/80">
              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1">
                  Price (₦ NGN) <span class="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="1000000"
                  name="propPrice"
                  [(ngModel)]="propertyForm.price"
                  class="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs font-bold text-red-600 outline-none focus:border-red-600 bg-white"
                />
                <span class="text-[0.65rem] text-zinc-400 mt-1 block">Formatted: {{ naira(propertyForm.price || 0) }}</span>
              </div>

              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1">
                  Bedrooms
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  name="propBeds"
                  [(ngModel)]="propertyForm.beds"
                  class="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs outline-none focus:border-red-600 bg-white"
                />
              </div>

              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1">
                  Bathrooms
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  name="propBaths"
                  [(ngModel)]="propertyForm.baths"
                  class="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs outline-none focus:border-red-600 bg-white"
                />
              </div>

              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1">
                  Floor Area (sqm)
                </label>
                <input
                  type="number"
                  min="50"
                  name="propSize"
                  [(ngModel)]="propertyForm.size"
                  class="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs outline-none focus:border-red-600 bg-white"
                />
              </div>
            </div>

            <!-- Row 5: Imagery Selection with File Upload & Multi-Image Gallery -->
            <div class="space-y-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-200/80">
              <div class="flex items-center justify-between">
                <div>
                  <label class="block font-bold text-zinc-900 uppercase tracking-wider text-[0.68rem]">
                    Residence Imagery & Gallery <span class="text-red-600">*</span>
                  </label>
                  <p class="text-[0.68rem] text-zinc-500 mt-0.5">
                    Choose files from your device to add multiple photos. The first image will be the primary cover photo.
                  </p>
                </div>
                <span class="px-2.5 py-0.5 rounded-full bg-zinc-200 text-zinc-800 text-[0.68rem] font-bold">
                  {{ propertyImages.length }} Selected
                </span>
              </div>

              <!-- Upload File Picker Area -->
              <input
                type="file"
                multiple
                accept="image/*"
                class="hidden"
                #propertyFileInput
                (change)="onFilesSelected($event, 'property')"
              />

              <div
                (click)="propertyFileInput.click()"
                class="border-2 border-dashed border-zinc-300 hover:border-red-500 bg-white hover:bg-red-50/20 rounded-xl p-4 text-center cursor-pointer transition-all group"
              >
                <div class="flex flex-col items-center justify-center gap-1.5">
                  <div class="w-10 h-10 rounded-full bg-red-50 text-red-600 group-hover:scale-110 flex items-center justify-center transition-transform shadow-xs">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <span class="text-xs font-bold text-zinc-900 group-hover:text-red-600">
                      Choose Files from Device (Multiple Allowed)
                    </span>
                    <span class="text-xs text-zinc-500 block text-[0.65rem] mt-0.5">
                      Select high-res photos (JPG, PNG, WEBP)
                    </span>
                  </div>
                </div>
              </div>

              <!-- URL Input & Preset Selector -->
              <div class="space-y-2 pt-1">
                <div class="flex gap-2">
                  <input
                    type="text"
                    [(ngModel)]="customUrlInput.property"
                    name="propCustomUrl"
                    placeholder="Or paste an image URL (https://... or /assets/...)"
                    class="flex-1 px-3 py-1.5 border border-zinc-200 rounded-lg text-xs outline-none focus:border-red-600 bg-white"
                  />
                  <button
                    type="button"
                    (click)="addImageUrl('property')"
                    class="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    + Add URL
                  </button>
                </div>

                <div>
                  <span class="text-[0.68rem] text-zinc-500 block mb-1">Add from catalog presets:</span>
                  <div class="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      *ngFor="let img of presetImages"
                      (click)="addPresetImage(img.url, 'property')"
                      class="px-2 py-0.5 rounded text-[0.65rem] font-medium border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700 transition-colors cursor-pointer"
                    >
                      + {{ img.label }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Multi-Image Gallery Preview Grid -->
              <div *ngIf="propertyImages.length > 0" class="pt-2">
                <span class="text-[0.68rem] font-bold uppercase tracking-wider text-zinc-500 block mb-2">
                  Selected Gallery Photos ({{ propertyImages.length }})
                </span>
                <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                  <div
                    *ngFor="let img of propertyImages; let i = index"
                    class="aspect-[4/3] rounded-lg overflow-hidden border relative group bg-zinc-900 shadow-xs"
                    [ngClass]="i === 0 ? 'border-red-600 ring-2 ring-red-600/40' : 'border-zinc-200'"
                  >
                    <img [src]="img" alt="Gallery photo" class="w-full h-full object-cover" />
                    <!-- Cover badge -->
                    <span
                      *ngIf="i === 0"
                      class="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-red-600 text-white text-[0.55rem] font-bold uppercase tracking-wider shadow-xs"
                    >
                      Cover
                    </span>
                    <!-- Set as cover button -->
                    <button
                      *ngIf="i !== 0"
                      type="button"
                      (click)="setPrimaryImage(i, 'property')"
                      class="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/80 hover:bg-zinc-950 text-white text-[0.55rem] font-medium opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      title="Set as cover image"
                    >
                      Set Cover
                    </button>
                    <!-- Remove button -->
                    <button
                      type="button"
                      (click)="removeImage(i, 'property')"
                      class="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/75 hover:bg-red-600 text-white flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                      title="Remove image"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Row 6: Amenities with Clickable Chips -->
            <div>
              <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                Key Amenities (comma separated)
              </label>
              <textarea
                rows="2"
                name="propAmenities"
                [(ngModel)]="propertyForm.amenities"
                placeholder="Private Jetty, Infinity Pool, 24/7 Solar, ThyssenKrupp Elevator"
                class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 bg-white"
              ></textarea>
              <div class="flex flex-wrap gap-1.5 mt-2">
                <span class="text-[0.65rem] text-zinc-400 self-center mr-1">Add preset:</span>
                <button
                  type="button"
                  *ngFor="let chip of ['Private Jetty', '22m Heated Pool', '40kVA Solar Grid', 'Glass Elevator', 'KNX Automation', 'Dolby Cinema', 'Staff Wing', 'Biometric Gate']"
                  (click)="addPropertyAmenity(chip)"
                  class="px-2 py-0.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-md text-[0.65rem] font-medium transition-colors cursor-pointer"
                >
                  + {{ chip }}
                </button>
              </div>
            </div>

            <!-- Row 7: Summary & Description -->
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Card Summary (Teaser)
                </label>
                <textarea
                  rows="3"
                  name="propSummary"
                  [(ngModel)]="propertyForm.summary"
                  placeholder="Short architectural summary visible on cards..."
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 bg-white"
                ></textarea>
              </div>

              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Full Architectural Description
                </label>
                <textarea
                  rows="3"
                  name="propDesc"
                  [(ngModel)]="propertyForm.description"
                  placeholder="In-depth narrative of materials, design philosophy, and specifications..."
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 bg-white"
                ></textarea>
              </div>
            </div>

            <!-- Footer Actions -->
            <div class="pt-4 border-t border-zinc-100 flex items-center justify-end gap-3">
              <button
                type="button"
                (click)="closeAddPropertyModal()"
                class="px-5 py-2.5 border border-zinc-200 hover:bg-zinc-100 text-zinc-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span>Publish Property</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- MODAL 2: ADD PROJECT FORM                                -->
      <!-- ======================================================== -->
      <div
        *ngIf="showAddProjectModal()"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto animate-fadeIn"
        (click)="closeAddProjectModal()"
      >
        <div
          class="bg-white max-w-3xl w-full my-auto rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden relative flex flex-col max-h-[92vh] text-zinc-900"
          (click)="$event.stopPropagation()"
        >
          <!-- Header -->
          <div class="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-5 border-b border-zinc-100 flex items-center justify-between z-10">
            <div>
              <span class="text-[0.68rem] font-bold uppercase tracking-widest text-red-600 block">Masterplan Telemetry</span>
              <h3 class="font-serif text-2xl font-bold text-zinc-950">Add Project Development</h3>
            </div>
            <button
              (click)="closeAddProjectModal()"
              class="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <!-- Form Body -->
          <form (ngSubmit)="submitNewProject()" class="overflow-y-auto px-6 py-6 space-y-6 text-xs text-zinc-700">
            <!-- Row 1: Name & Tagline -->
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Project Name <span class="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  name="projName"
                  [(ngModel)]="projectForm.name"
                  placeholder="e.g. Eko Marina Horizon Towers"
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 transition-all bg-white"
                />
              </div>

              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Tagline / Scope
                </label>
                <input
                  type="text"
                  name="projTagline"
                  [(ngModel)]="projectForm.tagline"
                  placeholder="e.g. Twin 32-Storey Sustainable Marina Sky Towers"
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 transition-all bg-white"
                />
              </div>
            </div>

            <!-- Row 2: Category & Location -->
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Project Category <span class="text-red-600">*</span>
                </label>
                <select
                  name="projCategory"
                  [(ngModel)]="projectForm.category"
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 bg-white cursor-pointer"
                >
                  <option value="Master-Planned Community">Master-Planned Community</option>
                  <option value="High-Rise Waterfront Towers">High-Rise Waterfront Towers</option>
                  <option value="Luxury Coastal Enclave">Luxury Coastal Enclave</option>
                </select>
              </div>

              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Geographic Location <span class="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  name="projLocation"
                  [(ngModel)]="projectForm.location"
                  placeholder="e.g. Marina District, Eko Atlantic City, Lagos"
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 transition-all bg-white"
                />
              </div>
            </div>

            <!-- Row 3: Telemetry Metrics -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-200/80">
              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1">
                  Projected ROI (% p.a.)
                </label>
                <input
                  type="number"
                  min="5"
                  max="100"
                  name="projRoi"
                  [(ngModel)]="projectForm.roi"
                  class="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs font-bold text-emerald-600 outline-none focus:border-red-600 bg-white"
                />
              </div>

              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1">
                  Construction Progress (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  name="projProgress"
                  [(ngModel)]="projectForm.progress"
                  class="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs font-bold text-red-600 outline-none focus:border-red-600 bg-white"
                />
                <span class="text-[0.65rem] text-zinc-400 mt-1 block">{{ projectForm.progress }}% Complete</span>
              </div>

              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1">
                  Units
                </label>
                <input
                  type="text"
                  name="projUnits"
                  [(ngModel)]="projectForm.units"
                  placeholder="e.g. 160 Sky Suites"
                  class="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs outline-none focus:border-red-600 bg-white"
                />
              </div>

              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1">
                  Land / Parcel Area
                </label>
                <input
                  type="text"
                  name="projArea"
                  [(ngModel)]="projectForm.landArea"
                  placeholder="e.g. 18,500 m²"
                  class="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs outline-none focus:border-red-600 bg-white"
                />
              </div>
            </div>

            <!-- Row 4: Handover Date -->
            <div>
              <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                Target Handover Date
              </label>
              <input
                type="text"
                name="projHandover"
                [(ngModel)]="projectForm.handover"
                placeholder="e.g. Handover Q3 2027"
                class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 bg-white"
              />
            </div>

            <!-- Row 5: Imagery Selection with File Upload & Multi-Image Gallery -->
            <div class="space-y-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-200/80">
              <div class="flex items-center justify-between">
                <div>
                  <label class="block font-bold text-zinc-900 uppercase tracking-wider text-[0.68rem]">
                    Project Renderings & Visuals <span class="text-red-600">*</span>
                  </label>
                  <p class="text-[0.68rem] text-zinc-500 mt-0.5">
                    Choose 3D renderings and masterplan photos. The first image will be the hero visual.
                  </p>
                </div>
                <span class="px-2.5 py-0.5 rounded-full bg-zinc-200 text-zinc-800 text-[0.68rem] font-bold">
                  {{ projectImages.length }} Selected
                </span>
              </div>

              <!-- Upload File Picker Area -->
              <input
                type="file"
                multiple
                accept="image/*"
                class="hidden"
                #projectFileInput
                (change)="onFilesSelected($event, 'project')"
              />

              <div
                (click)="projectFileInput.click()"
                class="border-2 border-dashed border-zinc-300 hover:border-red-500 bg-white hover:bg-red-50/20 rounded-xl p-4 text-center cursor-pointer transition-all group"
              >
                <div class="flex flex-col items-center justify-center gap-1.5">
                  <div class="w-10 h-10 rounded-full bg-red-50 text-red-600 group-hover:scale-110 flex items-center justify-center transition-transform shadow-xs">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <span class="text-xs font-bold text-zinc-900 group-hover:text-red-600">
                      Choose Renderings from Device (Multiple Allowed)
                    </span>
                    <span class="text-xs text-zinc-500 block text-[0.65rem] mt-0.5">
                      Upload masterplan & architecture photos (JPG, PNG, WEBP)
                    </span>
                  </div>
                </div>
              </div>

              <!-- URL Input & Preset Selector -->
              <div class="space-y-2 pt-1">
                <div class="flex gap-2">
                  <input
                    type="text"
                    [(ngModel)]="customUrlInput.project"
                    name="projCustomUrl"
                    placeholder="Or paste an image URL (https://... or /assets/...)"
                    class="flex-1 px-3 py-1.5 border border-zinc-200 rounded-lg text-xs outline-none focus:border-red-600 bg-white"
                  />
                  <button
                    type="button"
                    (click)="addImageUrl('project')"
                    class="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    + Add URL
                  </button>
                </div>

                <div>
                  <span class="text-[0.68rem] text-zinc-500 block mb-1">Add from catalog presets:</span>
                  <div class="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      *ngFor="let img of presetImages"
                      (click)="addPresetImage(img.url, 'project')"
                      class="px-2 py-0.5 rounded text-[0.65rem] font-medium border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700 transition-colors cursor-pointer"
                    >
                      + {{ img.label }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Multi-Image Renderings Preview Grid -->
              <div *ngIf="projectImages.length > 0" class="pt-2">
                <span class="text-[0.68rem] font-bold uppercase tracking-wider text-zinc-500 block mb-2">
                  Project Renderings ({{ projectImages.length }})
                </span>
                <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                  <div
                    *ngFor="let img of projectImages; let i = index"
                    class="aspect-[4/3] rounded-lg overflow-hidden border relative group bg-zinc-900 shadow-xs"
                    [ngClass]="i === 0 ? 'border-red-600 ring-2 ring-red-600/40' : 'border-zinc-200'"
                  >
                    <img [src]="img" alt="Rendering photo" class="w-full h-full object-cover" />
                    <!-- Cover badge -->
                    <span
                      *ngIf="i === 0"
                      class="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-red-600 text-white text-[0.55rem] font-bold uppercase tracking-wider shadow-xs"
                    >
                      Hero
                    </span>
                    <!-- Set as hero button -->
                    <button
                      *ngIf="i !== 0"
                      type="button"
                      (click)="setPrimaryImage(i, 'project')"
                      class="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/80 hover:bg-zinc-950 text-white text-[0.55rem] font-medium opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      title="Set as hero image"
                    >
                      Set Hero
                    </button>
                    <!-- Remove button -->
                    <button
                      type="button"
                      (click)="removeImage(i, 'project')"
                      class="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/75 hover:bg-red-600 text-white flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                      title="Remove image"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Row 6: Features with Chips -->
            <div>
              <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                Core Development Features (comma separated)
              </label>
              <textarea
                rows="2"
                name="projFeatures"
                [(ngModel)]="projectForm.features"
                placeholder="Twin 30-Storey Towers, Deep-Water Marina, Rooftop Helipad, 5MW Clean Solar Plant"
                class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 bg-white"
              ></textarea>
              <div class="flex flex-wrap gap-1.5 mt-2">
                <span class="text-[0.65rem] text-zinc-400 self-center mr-1">Add preset:</span>
                <button
                  type="button"
                  *ngFor="let chip of ['Private Marina', 'Helipad Access', '5MW Solar Plant', 'Olympic Edge Pool', 'Armed Drone Perimeter', 'Commercial Square']"
                  (click)="addProjectFeature(chip)"
                  class="px-2 py-0.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-md text-[0.65rem] font-medium transition-colors cursor-pointer"
                >
                  + {{ chip }}
                </button>
              </div>
            </div>

            <!-- Row 7: Description -->
            <div>
              <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                Detailed Masterplan Description
              </label>
              <textarea
                rows="3"
                name="projDesc"
                [(ngModel)]="projectForm.description"
                placeholder="Provide executive description of the engineering, site plan, and investment merits..."
                class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 bg-white"
              ></textarea>
            </div>

            <!-- Footer Actions -->
            <div class="pt-4 border-t border-zinc-100 flex items-center justify-end gap-3">
              <button
                type="button"
                (click)="closeAddProjectModal()"
                class="px-5 py-2.5 border border-zinc-200 hover:bg-zinc-100 text-zinc-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span>Publish Project</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- MODAL 3: ADD SHORT STAY FORM                             -->
      <!-- ======================================================== -->
      <div
        *ngIf="showAddShortStayModal()"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto animate-fadeIn"
        (click)="closeAddShortStayModal()"
      >
        <div
          class="bg-white max-w-3xl w-full my-auto rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden relative flex flex-col max-h-[92vh] text-zinc-900"
          (click)="$event.stopPropagation()"
        >
          <!-- Header -->
          <div class="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-5 border-b border-zinc-100 flex items-center justify-between z-10">
            <div>
              <span class="text-[0.68rem] font-bold uppercase tracking-widest text-red-600 block">Hospitality & Concierge</span>
              <h3 class="font-serif text-2xl font-bold text-zinc-950">Add Short-Stay Suite</h3>
            </div>
            <button
              (click)="closeAddShortStayModal()"
              class="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <!-- Form Body -->
          <form (ngSubmit)="submitNewShortStay()" class="overflow-y-auto px-6 py-6 space-y-6 text-xs text-zinc-700">
            <!-- Row 1: Name & Tagline -->
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Suite Name <span class="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  name="suiteName"
                  [(ngModel)]="suiteForm.name"
                  placeholder="e.g. The Admiralty Executive Suite"
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 transition-all bg-white"
                />
              </div>

              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Tagline / Highlights
                </label>
                <input
                  type="text"
                  name="suiteTagline"
                  [(ngModel)]="suiteForm.tagline"
                  placeholder="e.g. Ultra-Fast Starlink WiFi · Private Chauffeur · 24/7 Solar"
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 transition-all bg-white"
                />
              </div>
            </div>

            <!-- Row 2: Location & Address -->
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Location <span class="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  name="suiteLoc"
                  [(ngModel)]="suiteForm.location"
                  placeholder="e.g. Ikoyi, Victoria Island, Lekki Phase 1"
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 transition-all bg-white"
                />
              </div>

              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Street Address
                </label>
                <input
                  type="text"
                  name="suiteAddress"
                  [(ngModel)]="suiteForm.address"
                  placeholder="e.g. Admiralty Way Waterfront, Lekki Phase 1, Lagos"
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 transition-all bg-white"
                />
              </div>
            </div>

            <!-- Row 3: Rates & Financials -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-200/80">
              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1">
                  Nightly Rate (₦ NGN) <span class="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="10000"
                  step="5000"
                  name="suiteRate"
                  [(ngModel)]="suiteForm.rate"
                  class="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs font-bold text-red-600 outline-none focus:border-red-600 bg-white"
                />
                <span class="text-[0.65rem] text-zinc-400 mt-1 block">{{ naira(suiteForm.rate || 0) }} / night</span>
              </div>

              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1">
                  Cleaning Fee (₦)
                </label>
                <input
                  type="number"
                  min="0"
                  name="suiteClean"
                  [(ngModel)]="suiteForm.cleaningFee"
                  class="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs outline-none focus:border-red-600 bg-white"
                />
              </div>

              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1">
                  Security Deposit (₦)
                </label>
                <input
                  type="number"
                  min="0"
                  name="suiteDeposit"
                  [(ngModel)]="suiteForm.securityDeposit"
                  class="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs outline-none focus:border-red-600 bg-white"
                />
              </div>
            </div>

            <!-- Row 4: Capacity -->
            <div class="grid grid-cols-3 gap-4">
              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Bedrooms
                </label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  name="suiteBeds"
                  [(ngModel)]="suiteForm.beds"
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 bg-white"
                />
              </div>

              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Bathrooms
                </label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  name="suiteBaths"
                  [(ngModel)]="suiteForm.baths"
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 bg-white"
                />
              </div>

              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Max Guests
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  name="suiteGuests"
                  [(ngModel)]="suiteForm.maxGuests"
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 bg-white"
                />
              </div>
            </div>

            <!-- Row 5: Imagery Selection with File Upload & Multi-Image Gallery -->
            <div class="space-y-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-200/80">
              <div class="flex items-center justify-between">
                <div>
                  <label class="block font-bold text-zinc-900 uppercase tracking-wider text-[0.68rem]">
                    Suite Photography & Interiors <span class="text-red-600">*</span>
                  </label>
                  <p class="text-[0.68rem] text-zinc-500 mt-0.5">
                    Choose interior and suite photos. The first image will be the primary listing photo.
                  </p>
                </div>
                <span class="px-2.5 py-0.5 rounded-full bg-zinc-200 text-zinc-800 text-[0.68rem] font-bold">
                  {{ suiteImages.length }} Selected
                </span>
              </div>

              <!-- Upload File Picker Area -->
              <input
                type="file"
                multiple
                accept="image/*"
                class="hidden"
                #suiteFileInput
                (change)="onFilesSelected($event, 'suite')"
              />

              <div
                (click)="suiteFileInput.click()"
                class="border-2 border-dashed border-zinc-300 hover:border-red-500 bg-white hover:bg-red-50/20 rounded-xl p-4 text-center cursor-pointer transition-all group"
              >
                <div class="flex flex-col items-center justify-center gap-1.5">
                  <div class="w-10 h-10 rounded-full bg-red-50 text-red-600 group-hover:scale-110 flex items-center justify-center transition-transform shadow-xs">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <span class="text-xs font-bold text-zinc-900 group-hover:text-red-600">
                      Choose Photos from Device (Multiple Allowed)
                    </span>
                    <span class="text-xs text-zinc-500 block text-[0.65rem] mt-0.5">
                      Select multiple interior & amenity photos (JPG, PNG, WEBP)
                    </span>
                  </div>
                </div>
              </div>

              <!-- URL Input & Preset Selector -->
              <div class="space-y-2 pt-1">
                <div class="flex gap-2">
                  <input
                    type="text"
                    [(ngModel)]="customUrlInput.suite"
                    name="suiteCustomUrl"
                    placeholder="Or paste an image URL (https://... or /assets/...)"
                    class="flex-1 px-3 py-1.5 border border-zinc-200 rounded-lg text-xs outline-none focus:border-red-600 bg-white"
                  />
                  <button
                    type="button"
                    (click)="addImageUrl('suite')"
                    class="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    + Add URL
                  </button>
                </div>

                <div>
                  <span class="text-[0.68rem] text-zinc-500 block mb-1">Add from catalog presets:</span>
                  <div class="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      *ngFor="let img of presetImages"
                      (click)="addPresetImage(img.url, 'suite')"
                      class="px-2 py-0.5 rounded text-[0.65rem] font-medium border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700 transition-colors cursor-pointer"
                    >
                      + {{ img.label }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Multi-Image Gallery Preview Grid -->
              <div *ngIf="suiteImages.length > 0" class="pt-2">
                <span class="text-[0.68rem] font-bold uppercase tracking-wider text-zinc-500 block mb-2">
                  Suite Photo Gallery ({{ suiteImages.length }})
                </span>
                <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                  <div
                    *ngFor="let img of suiteImages; let i = index"
                    class="aspect-[4/3] rounded-lg overflow-hidden border relative group bg-zinc-900 shadow-xs"
                    [ngClass]="i === 0 ? 'border-red-600 ring-2 ring-red-600/40' : 'border-zinc-200'"
                  >
                    <img [src]="img" alt="Suite photo" class="w-full h-full object-cover" />
                    <!-- Cover badge -->
                    <span
                      *ngIf="i === 0"
                      class="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-red-600 text-white text-[0.55rem] font-bold uppercase tracking-wider shadow-xs"
                    >
                      Primary
                    </span>
                    <!-- Set as primary button -->
                    <button
                      *ngIf="i !== 0"
                      type="button"
                      (click)="setPrimaryImage(i, 'suite')"
                      class="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/80 hover:bg-zinc-950 text-white text-[0.55rem] font-medium opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      title="Set as primary image"
                    >
                      Set Primary
                    </button>
                    <!-- Remove button -->
                    <button
                      type="button"
                      (click)="removeImage(i, 'suite')"
                      class="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/75 hover:bg-red-600 text-white flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                      title="Remove image"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Row 6: Amenities with Chips -->
            <div>
              <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                Hospitality Amenities (comma separated)
              </label>
              <textarea
                rows="2"
                name="suiteAmenities"
                [(ngModel)]="suiteForm.amenities"
                placeholder="Starlink WiFi, 24/7 Solar, Airport Chauffeur, Private Chef"
                class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 bg-white"
              ></textarea>
              <div class="flex flex-wrap gap-1.5 mt-2">
                <span class="text-[0.65rem] text-zinc-400 self-center mr-1">Add preset:</span>
                <button
                  type="button"
                  *ngFor="let chip of ['Starlink 350Mbps WiFi', '24/7 Clean Solar Grid', 'Airport Chauffeur Service', 'Private Rooftop Jacuzzi', 'Private Chef on Call', 'Sonos High-Fidelity Audio', 'Hermès Toiletries', 'Daily Housekeeping']"
                  (click)="addSuiteAmenity(chip)"
                  class="px-2 py-0.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-md text-[0.65rem] font-medium transition-colors cursor-pointer"
                >
                  + {{ chip }}
                </button>
              </div>
            </div>

            <!-- Row 7: House Rules & Description -->
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  House Rules (one per line)
                </label>
                <textarea
                  rows="3"
                  name="suiteRules"
                  [(ngModel)]="suiteForm.houseRules"
                  placeholder="Check-in: 3:00 PM | Check-out: 12:00 PM&#10;No Smoking Indoors"
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 bg-white"
                ></textarea>
              </div>

              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Suite Overview / Description
                </label>
                <textarea
                  rows="3"
                  name="suiteDesc"
                  [(ngModel)]="suiteForm.description"
                  placeholder="Atmosphere, views, furnishing, and private concierge benefits..."
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 bg-white"
                ></textarea>
              </div>
            </div>

            <!-- Footer Actions -->
            <div class="pt-4 border-t border-zinc-100 flex items-center justify-end gap-3">
              <button
                type="button"
                (click)="closeAddShortStayModal()"
                class="px-5 py-2.5 border border-zinc-200 hover:bg-zinc-100 text-zinc-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span>Publish Short-Stay</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- MODAL: VIEW INQUIRY DOSSIER                              -->
      <!-- ======================================================== -->
      <div
        *ngIf="selectedLeadForView()"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn"
        (click)="closeViewLeadModal()"
      >
        <div
          class="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-zinc-200 flex flex-col"
          (click)="$event.stopPropagation()"
        >
          <!-- Header -->
          <div class="px-6 py-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
            <div>
              <div class="flex items-center gap-2">
                <span
                  class="px-2.5 py-0.5 rounded-md text-[0.68rem] font-bold border"
                  [ngClass]="getCategoryBadgeClass(selectedLeadForView()!.type)"
                >
                  {{ selectedLeadForView()!.type }}
                </span>
                <span class="text-[0.65rem] text-zinc-400 font-mono">
                  ID: {{ selectedLeadForView()!.id }}
                </span>
              </div>
              <h3 class="font-serif text-xl font-bold text-zinc-950 mt-1">
                {{ selectedLeadForView()!.name }}
              </h3>
            </div>
            <button
              type="button"
              (click)="closeViewLeadModal()"
              class="w-8 h-8 rounded-full bg-zinc-200/80 hover:bg-zinc-300 text-zinc-700 flex items-center justify-center text-sm font-bold transition-colors cursor-pointer"
            >
              &times;
            </button>
          </div>

          <!-- Body -->
          <div class="p-6 overflow-y-auto space-y-5 text-xs text-zinc-700">
            <!-- Contact Card -->
            <div class="p-4 bg-zinc-50 rounded-2xl border border-zinc-200/80 grid sm:grid-cols-2 gap-3">
              <div>
                <span class="text-[0.65rem] uppercase tracking-wider font-bold text-zinc-400 block">Email Address</span>
                <a [href]="'mailto:' + selectedLeadForView()!.email" class="text-zinc-900 font-semibold hover:text-red-600 block mt-0.5">
                  {{ selectedLeadForView()!.email }}
                </a>
              </div>
              <div>
                <span class="text-[0.65rem] uppercase tracking-wider font-bold text-zinc-400 block">Phone / WhatsApp</span>
                <a [href]="'tel:' + selectedLeadForView()!.phone" class="text-zinc-900 font-semibold hover:text-red-600 block mt-0.5">
                  {{ selectedLeadForView()!.phone }}
                </a>
              </div>
            </div>

            <!-- Subject & Financial Allocation -->
            <div class="grid sm:grid-cols-2 gap-4">
              <div class="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200/70">
                <span class="text-[0.65rem] uppercase tracking-wider font-bold text-zinc-400 block">Property / Subject</span>
                <span class="font-bold text-zinc-950 block mt-0.5 text-sm">
                  {{ selectedLeadForView()!.property || 'General Portfolio Briefing' }}
                </span>
                <span *ngIf="selectedLeadForView()!.location" class="text-zinc-500 text-[0.7rem] block mt-0.5">
                  {{ selectedLeadForView()!.location }}
                </span>
              </div>

              <div class="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200/70">
                <span class="text-[0.65rem] uppercase tracking-wider font-bold text-zinc-400 block">Capital / Allocation</span>
                <span class="font-bold text-zinc-950 block mt-0.5 text-sm">
                  {{ selectedLeadForView()!.budget || 'Flexible Investment Budget' }}
                </span>
                <span *ngIf="selectedLeadForView()!.serviceCategory" class="text-amber-700 text-[0.7rem] font-medium block mt-0.5">
                  {{ selectedLeadForView()!.serviceCategory }}
                </span>
              </div>
            </div>

            <!-- Specific Requirements / Timelines -->
            <div *ngIf="selectedLeadForView()!.preferredDate || selectedLeadForView()!.checkIn || selectedLeadForView()!.tourType" class="p-4 bg-red-50/50 rounded-2xl border border-red-100 space-y-1.5">
              <span class="text-[0.65rem] uppercase tracking-wider font-bold text-red-600 block">Scheduled Details</span>
              <p *ngIf="selectedLeadForView()!.tourType" class="text-zinc-800">
                <strong class="font-semibold">Tour Type:</strong> {{ selectedLeadForView()!.tourType }}
              </p>
              <p *ngIf="selectedLeadForView()!.preferredDate" class="text-zinc-800">
                <strong class="font-semibold">Preferred Viewing:</strong> {{ selectedLeadForView()!.preferredDate }}
              </p>
              <p *ngIf="selectedLeadForView()!.checkIn" class="text-zinc-800">
                <strong class="font-semibold">Short-Stay Duration:</strong> {{ selectedLeadForView()!.checkIn }} → {{ selectedLeadForView()!.checkOut }} ({{ selectedLeadForView()!.nights }} Nights · {{ selectedLeadForView()!.guests }} Guests)
              </p>
            </div>

            <!-- Client Notes & Requirements -->
            <div>
              <span class="text-[0.65rem] uppercase tracking-wider font-bold text-zinc-400 block mb-1">Inquiry Specifications & Notes</span>
              <div class="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200 text-zinc-800 leading-relaxed font-normal">
                {{ selectedLeadForView()!.notes || 'No additional notes logged.' }}
              </div>
            </div>

            <!-- Lifecycle Status Updater -->
            <div>
              <span class="text-[0.65rem] uppercase tracking-wider font-bold text-zinc-400 block mb-1.5">Update Lifecycle Status</span>
              <div class="grid grid-cols-4 gap-2">
                <button
                  type="button"
                  *ngFor="let s of ['New', 'In Progress', 'Scheduled', 'Closed']"
                  (click)="updateLeadStatus(selectedLeadForView()!, $any(s))"
                  class="py-2 text-center rounded-xl font-bold text-xs border transition-all cursor-pointer"
                  [ngClass]="selectedLeadForView()!.status === s
                    ? getStatusBadgeClass($any(s)) + ' ring-2 ring-zinc-950/20'
                    : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'"
                >
                  {{ s }}
                </button>
              </div>
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="px-6 py-4 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between">
            <button
              type="button"
              (click)="deleteLead(selectedLeadForView()!.id); closeViewLeadModal()"
              class="text-xs text-red-600 hover:text-red-700 font-bold hover:underline cursor-pointer"
            >
              Delete Inquiry
            </button>
            <div class="flex items-center gap-2">
              <a
                [href]="generateWhatsAppLink(selectedLeadForView()!)"
                target="_blank"
                class="px-4 py-2 bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>Direct WhatsApp</span>
              </a>
              <button
                type="button"
                (click)="closeViewLeadModal()"
                class="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- MODAL: LOG NEW INQUIRY                                   -->
      <!-- ======================================================== -->
      <div
        *ngIf="showLogLeadModal()"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn"
        (click)="closeLogLeadModal()"
      >
        <div
          class="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-zinc-200 flex flex-col"
          (click)="$event.stopPropagation()"
        >
          <!-- Header -->
          <div class="px-6 py-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
            <div>
              <span class="text-[0.65rem] font-bold uppercase tracking-widest text-red-600">VIP Lead Intake</span>
              <h3 class="font-serif text-xl font-bold text-zinc-950 mt-0.5">
                Log New Client Inquiry
              </h3>
            </div>
            <button
              type="button"
              (click)="closeLogLeadModal()"
              class="w-8 h-8 rounded-full bg-zinc-200/80 hover:bg-zinc-300 text-zinc-700 flex items-center justify-center text-sm font-bold transition-colors cursor-pointer"
            >
              &times;
            </button>
          </div>

          <!-- Form Body -->
          <form (ngSubmit)="submitLogNewLead()" class="overflow-y-auto px-6 py-6 space-y-4 text-xs text-zinc-700">
            <!-- Inquiry Category -->
            <div>
              <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1">
                Inquiry Category <span class="text-red-600">*</span>
              </label>
              <select
                required
                name="logType"
                [(ngModel)]="newLeadForm.type"
                class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs font-semibold outline-none focus:border-red-600 bg-white"
              >
                <option value="Property Inquiry">Property Inquiries</option>
                <option value="Inspection Request">Inspection Requests</option>
                <option value="Sales Lead">Sales Leads</option>
                <option value="Leasing Inquiry">Leasing Inquiries</option>
                <option value="Contact Inquiry">Contact Inquiries</option>
                <option value="Booking Details">Booking Details</option>
                <option value="Property Management">Property Management Inquiries</option>
              </select>
            </div>

            <!-- Client Name & Source -->
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1">
                  Client Full Name <span class="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  name="logName"
                  [(ngModel)]="newLeadForm.name"
                  placeholder="e.g. Chief Adeleke Coker"
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 bg-white"
                />
              </div>

              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1">
                  Intake Channel / Source
                </label>
                <select
                  name="logSource"
                  [(ngModel)]="newLeadForm.source"
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 bg-white"
                >
                  <option value="Direct Call / Office Walk-in">Direct Call / Office Walk-in</option>
                  <option value="Admiralty Way VIP Desk">Admiralty Way VIP Desk</option>
                  <option value="WhatsApp Concierge">WhatsApp Concierge</option>
                  <option value="Private Banker Referral">Private Banker Referral</option>
                  <option value="Diaspora Syndicate">Diaspora Syndicate</option>
                  <option value="Web Portal">Web Portal</option>
                </select>
              </div>
            </div>

            <!-- Email & Phone -->
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1">
                  Email Address <span class="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  required
                  name="logEmail"
                  [(ngModel)]="newLeadForm.email"
                  placeholder="investor@domain.com"
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 bg-white"
                />
              </div>

              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1">
                  Phone / WhatsApp <span class="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  required
                  name="logPhone"
                  [(ngModel)]="newLeadForm.phone"
                  placeholder="+234 807 346 7809"
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 bg-white"
                />
              </div>
            </div>

            <!-- Property Subject & Budget -->
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1">
                  Property Allocation / Asset
                </label>
                <input
                  type="text"
                  name="logProperty"
                  [(ngModel)]="newLeadForm.property"
                  placeholder="e.g. The Grand Azure Waterfront Villa"
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 bg-white"
                />
              </div>

              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1">
                  Budget / Deal Size / Rate
                </label>
                <input
                  type="text"
                  name="logBudget"
                  [(ngModel)]="newLeadForm.budget"
                  placeholder="e.g. ₦1.25 Billion or ₦350,000/night"
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 bg-white"
                />
              </div>
            </div>

            <!-- Preferred Date or Service Specifics -->
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1">
                  Inspection / Scheduled Date
                </label>
                <input
                  type="text"
                  name="logDate"
                  [(ngModel)]="newLeadForm.preferredDate"
                  placeholder="e.g. Oct 28, 2026 · 02:00 PM"
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 bg-white"
                />
              </div>

              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1">
                  Initial Lifecycle Status
                </label>
                <select
                  name="logStatus"
                  [(ngModel)]="newLeadForm.status"
                  class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs font-semibold outline-none focus:border-red-600 bg-white"
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <!-- Notes & Requirements -->
            <div>
              <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1">
                Client Notes & Inquiries
              </label>
              <textarea
                rows="3"
                name="logNotes"
                [(ngModel)]="newLeadForm.notes"
                placeholder="Key requirements, legal representation, timeline expectations, or specific concierge requests..."
                class="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 bg-white"
              ></textarea>
            </div>

            <!-- Footer Actions -->
            <div class="pt-4 border-t border-zinc-100 flex items-center justify-end gap-3">
              <button
                type="button"
                (click)="closeLogLeadModal()"
                class="px-5 py-2.5 border border-zinc-200 hover:bg-zinc-100 text-zinc-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Save & Log Inquiry
              </button>
            </div>
          </form>
        </div>
      </div>


      <!-- ======================================================== -->
      <!-- MODAL 6: INVITE / ADD NEW USER                          -->
      <!-- ======================================================== -->
      <div
        *ngIf="showAddUserModal()"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto animate-fadeIn"
        (click)="closeAddUserModal()"
      >
        <div
          class="bg-white max-w-xl w-full my-auto rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden relative flex flex-col max-h-[92vh] text-zinc-900"
          (click)="$event.stopPropagation()"
        >
          <!-- Header -->
          <div class="px-8 py-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/80">
            <div>
              <span class="text-[0.68rem] font-bold uppercase tracking-wider text-red-600">User Administration</span>
              <h3 class="font-serif text-2xl font-bold text-zinc-950 mt-0.5">Invite New Team Member</h3>
            </div>
            <button
              (click)="closeAddUserModal()"
              class="w-9 h-9 rounded-full bg-zinc-200/80 hover:bg-zinc-300 flex items-center justify-center text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          <!-- Form Body -->
          <form (ngSubmit)="submitAddUser()" class="p-8 space-y-5 overflow-y-auto flex-1">
            <div>
              <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                Full Name <span class="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="userName"
                [(ngModel)]="newUserForm.name"
                required
                placeholder="e.g. Arc. Oladimeji Alo"
                class="w-full px-4 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600"
              />
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Email Address <span class="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  name="userEmail"
                  [(ngModel)]="newUserForm.email"
                  required
                  placeholder="e.g. user@nigson.com"
                  class="w-full px-4 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600"
                />
              </div>
              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="userPhone"
                  [(ngModel)]="newUserForm.phone"
                  placeholder="+234 800 000 0000"
                  class="w-full px-4 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600"
                />
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Assigned Corporate Role <span class="text-red-600">*</span>
                </label>
                <select
                  name="userRole"
                  [(ngModel)]="newUserForm.role"
                  class="w-full px-4 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 bg-white"
                >
                  <option value="Super Admin">Super Admin (Executive Leadership)</option>
                  <option value="Project Director">Project Director (Operations)</option>
                  <option value="Senior Sales Advisor">Senior Sales Advisor (Sales Desk)</option>
                  <option value="Hospitality & Short-Stay Desk">Hospitality & Short-Stay Desk</option>
                  <option value="Facility & Property Manager">Facility & Property Manager</option>
                  <option value="Verified Private Investor">Verified Private Investor</option>
                </select>
              </div>

              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Department / Office
                </label>
                <input
                  type="text"
                  name="userDept"
                  [(ngModel)]="newUserForm.department"
                  placeholder="e.g. Lekki Phase 1 HQ"
                  class="w-full px-4 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600"
                />
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Initial Account Status
                </label>
                <select
                  name="userStatus"
                  [(ngModel)]="newUserForm.status"
                  class="w-full px-4 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 bg-white"
                >
                  <option value="Active">Active (Immediate Portal Access)</option>
                  <option value="Pending Approval">Pending Approval (Email Verification Required)</option>
                  <option value="Suspended">Suspended (Locked)</option>
                </select>
              </div>

              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Access Tier / Sub-Title
                </label>
                <input
                  type="text"
                  name="userTier"
                  [(ngModel)]="newUserForm.tier"
                  placeholder="e.g. Tier 1 Investor / Senior Specialist"
                  class="w-full px-4 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600"
                />
              </div>
            </div>

            <!-- Footer Buttons -->
            <div class="pt-4 border-t border-zinc-100 flex items-center justify-end gap-3">
              <button
                type="button"
                (click)="closeAddUserModal()"
                class="px-5 py-2.5 text-xs text-zinc-600 hover:text-zinc-950 font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
              >
                Dispatch Invitation
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- MODAL 7: EDIT USER PROFILE & ROLE                         -->
      <!-- ======================================================== -->
      <div
        *ngIf="showEditUserModal()"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto animate-fadeIn"
        (click)="closeEditUserModal()"
      >
        <div
          class="bg-white max-w-xl w-full my-auto rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden relative flex flex-col max-h-[92vh] text-zinc-900"
          (click)="$event.stopPropagation()"
        >
          <!-- Header -->
          <div class="px-8 py-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/80">
            <div>
              <span class="text-[0.68rem] font-bold uppercase tracking-wider text-red-600">Access Governance</span>
              <h3 class="font-serif text-2xl font-bold text-zinc-950 mt-0.5">Edit User Account</h3>
            </div>
            <button
              (click)="closeEditUserModal()"
              class="w-9 h-9 rounded-full bg-zinc-200/80 hover:bg-zinc-300 flex items-center justify-center text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          <!-- Form Body -->
          <form (ngSubmit)="submitEditUser()" class="p-8 space-y-5 overflow-y-auto flex-1">
            <div>
              <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="editUserName"
                [(ngModel)]="editUserForm.name"
                required
                class="w-full px-4 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600"
              />
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="editUserEmail"
                  [(ngModel)]="editUserForm.email"
                  required
                  class="w-full px-4 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600"
                />
              </div>
              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="editUserPhone"
                  [(ngModel)]="editUserForm.phone"
                  class="w-full px-4 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600"
                />
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Corporate Role (RBAC)
                </label>
                <select
                  name="editUserRole"
                  [(ngModel)]="editUserForm.role"
                  class="w-full px-4 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 bg-white"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Project Director">Project Director</option>
                  <option value="Senior Sales Advisor">Senior Sales Advisor</option>
                  <option value="Hospitality & Short-Stay Desk">Hospitality & Short-Stay Desk</option>
                  <option value="Facility & Property Manager">Facility & Property Manager</option>
                  <option value="Verified Private Investor">Verified Private Investor</option>
                </select>
              </div>

              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Account Status
                </label>
                <select
                  name="editUserStatus"
                  [(ngModel)]="editUserForm.status"
                  class="w-full px-4 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600 bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="Pending Approval">Pending Approval</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Department / Unit
                </label>
                <input
                  type="text"
                  name="editUserDept"
                  [(ngModel)]="editUserForm.department"
                  class="w-full px-4 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label class="block font-bold text-zinc-800 uppercase tracking-wider text-[0.68rem] mb-1.5">
                  Access Tier / Sub-Title
                </label>
                <input
                  type="text"
                  name="editUserTier"
                  [(ngModel)]="editUserForm.tier"
                  class="w-full px-4 py-2.5 border border-zinc-200 rounded-xl text-xs outline-none focus:border-red-600"
                />
              </div>
            </div>

            <!-- Footer Buttons -->
            <div class="pt-4 border-t border-zinc-100 flex items-center justify-end gap-3">
              <button
                type="button"
                (click)="closeEditUserModal()"
                class="px-5 py-2.5 text-xs text-zinc-600 hover:text-zinc-950 font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- TOAST NOTIFICATION                                       -->
      <!-- ======================================================== -->
      <div
        *ngIf="toastMessage()"
        class="fixed bottom-6 right-6 z-50 bg-zinc-950 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-zinc-800 flex items-center gap-3 animate-fadeIn text-xs"
      >
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span class="font-medium">{{ toastMessage() }}</span>
        <button (click)="toastMessage.set(null)" class="text-zinc-400 hover:text-white ml-2 text-base font-bold leading-none cursor-pointer">
          &times;
        </button>
      </div>

    </div>
  `
})
export class AdminComponent {
  authService = inject(AuthService);

  sidebarOpen = signal<boolean>(true);
  activeModule = signal<AdminModule>('overview');

  allProps = [...properties];
  allProjects = [...projects];
  allSuites = [...suites];
  naira = naira;
  waLink = waLink;

  propSearch = signal<string>('');
  selectedPropCategory = signal<string>('All');
  propCategories = ['All', 'Luxury Villas', 'Waterfront Penthouses', 'Smart Terraces'];

  // Modal Signals
  showAddPropertyModal = signal<boolean>(false);
  showAddProjectModal = signal<boolean>(false);
  showAddShortStayModal = signal<boolean>(false);
  toastMessage = signal<string | null>(null);

  // Gallery images lists (supports multiple images per form)
  propertyImages: string[] = ['/assets/villa.jpg'];
  projectImages: string[] = ['/assets/community.jpg'];
  suiteImages: string[] = ['/assets/suite1.jpg'];

  customUrlInput = {
    property: '',
    project: '',
    suite: ''
  };

  // Gallery presets
  presetImages = [
    { label: 'Opposite Whitesand (Lekki)', url: '/assets/whitesand-1.jpg' },
    { label: 'Fatai Bankole (Aro-Ologolo)', url: '/assets/fatai-bankole-1.jpg' },
    { label: 'White Oaks Estate (Lekki)', url: '/assets/white-oaks-1.jpg' },
    { label: 'Olufemi Olatunji (Osapa)', url: '/assets/olufemi-olatunji-1.jpg' },
    { label: 'Nigson Villa (Banana Island)', url: '/assets/banana-1.jpg' },
    { label: 'Benson Close Suite (Ikoyi)', url: '/assets/benson-close-1.jpg' },
    { label: 'Waterfront Villa', url: '/assets/villa.jpg' },
    { label: 'Sky Penthouse', url: '/assets/penthouse.jpg' },
    { label: 'Contemporary Terrace', url: '/assets/terrace.jpg' },
    { label: 'Lagoon Estate', url: '/assets/hero.jpg' },
    { label: 'High-Rise Towers', url: '/assets/towers.jpg' },
    { label: 'Master Community', url: '/assets/community.jpg' },
    { label: 'Executive Suite I', url: '/assets/suite1.jpg' },
    { label: 'Executive Suite II', url: '/assets/suite2.jpg' },
    { label: 'Architectural Lounge', url: '/assets/consultation.jpg' }
  ];

  // Property Form State
  propertyForm = {
    title: '',
    tagline: '',
    category: 'Luxury Villas' as Category,
    location: 'Banana Island',
    address: '',
    status: 'Ready for Handover' as 'Ready for Handover' | 'Off-Plan',
    beds: 5,
    baths: 6,
    size: 750,
    price: 1200000000,
    titleDeed: 'Federal Certificate of Occupancy (Federal C of O) & Governor\'s Consent',
    amenities: 'Private Deep-Water Jetty, 20m Heated Infinity Pool, 40kVA Solar Grid, Glass Elevator, KNX Smart Automation, Staff Quarters',
    summary: '',
    description: '',
    completionDate: 'Immediate Handover'
  };

  // Project Form State
  projectForm = {
    name: '',
    tagline: '',
    category: 'Master-Planned Community',
    location: 'Ibeju-Lekki Coastal Corridor, Lagos',
    roi: 28,
    progress: 45,
    handover: 'Handover Q4 2027',
    units: '180 Luxury Residences & 30 Sky Villas',
    landArea: '35 Hectares',
    description: '',
    features: 'Private Atlantic Beach Club, Olympic-Length Infinity Pool, 24/7 Armed Drone Perimeter, 5MW Clean Solar Microgrid, Commercial Town Square'
  };

  // Short Stay Form State
  suiteForm = {
    name: '',
    tagline: '',
    location: 'Ikoyi',
    address: 'Alexander Avenue, Old Ikoyi, Lagos',
    rate: 320000,
    cleaningFee: 30000,
    securityDeposit: 150000,
    beds: 3,
    baths: 3.5,
    maxGuests: 6,
    description: '',
    amenities: 'Starlink Enterprise 350Mbps WiFi, 24/7 Redundant Solar Grid, Private Rooftop Heated Jacuzzi, Dedicated In-House Chef, Airport Range Rover Chauffeur, Hermès Bath Amenities',
    houseRules: 'Check-in: 3:00 PM | Check-out: 12:00 PM\nStrict No Smoking Inside Living Areas\nQuiet Hours after 11:00 PM\nValid Government ID required at check-in'
  };

  filteredProps(): Property[] {
    const q = this.propSearch().toLowerCase().trim();
    const cat = this.selectedPropCategory();
    return this.allProps.filter(p => {
      const matchesSearch = !q ||
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        (p.address && p.address.toLowerCase().includes(q));
      const matchesCategory = cat === 'All' || p.category === cat;
      return matchesSearch && matchesCategory;
    });
  }

  allLeads: Lead[] = [...leads];
  leads = this.allLeads; // Backward compatibility

  selectedLeadCategory = signal<string>('All');
  leadSearch = signal<string>('');
  leadStatusFilter = signal<string>('All');
  selectedLeadForView = signal<Lead | null>(null);
  showLogLeadModal = signal<boolean>(false);

  leadCategories: { type: string; label: string; icon: string }[] = [
    { type: 'All', label: 'All Inquiries', icon: '📋' },
    { type: 'Property Inquiry', label: 'Property Inquiries', icon: '🏡' },
    { type: 'Inspection Request', label: 'Inspection Requests', icon: '🔍' },
    { type: 'Sales Lead', label: 'Sales Leads', icon: '📈' },
    { type: 'Leasing Inquiry', label: 'Leasing Inquiries', icon: '📑' },
    { type: 'Contact Inquiry', label: 'Contact Inquiries', icon: '💬' },
    { type: 'Booking Details', label: 'Booking Details', icon: '🛎️' },
    { type: 'Property Management', label: 'Property Management', icon: '🏢' }
  ];

  newLeadForm: {
    type: LeadType;
    name: string;
    email: string;
    phone: string;
    property: string;
    budget: string;
    preferredDate: string;
    serviceCategory: string;
    status: LeadStatus;
    notes: string;
    source: string;
  } = {
    type: 'Property Inquiry',
    name: '',
    email: '',
    phone: '',
    property: '',
    budget: '',
    preferredDate: '',
    serviceCategory: '',
    status: 'New',
    notes: '',
    source: 'Direct Call / Office Walk-in'
  };

  filteredLeads(): Lead[] {
    const q = this.leadSearch().toLowerCase().trim();
    const cat = this.selectedLeadCategory();
    const status = this.leadStatusFilter();

    return this.allLeads.filter(ld => {
      const matchesCat = cat === 'All' || ld.type === cat;
      const matchesStatus = status === 'All' || ld.status === status;
      const matchesQuery = !q ||
        ld.name.toLowerCase().includes(q) ||
        ld.email.toLowerCase().includes(q) ||
        ld.phone.toLowerCase().includes(q) ||
        (ld.property && ld.property.toLowerCase().includes(q)) ||
        (ld.location && ld.location.toLowerCase().includes(q)) ||
        (ld.notes && ld.notes.toLowerCase().includes(q));

      return matchesCat && matchesStatus && matchesQuery;
    });
  }

  getLeadsCountByType(type: string): number {
    if (type === 'All') return this.allLeads.length;
    return this.allLeads.filter(l => l.type === type).length;
  }

  getNewLeadsCount(): number {
    return this.allLeads.filter(l => l.status === 'New').length;
  }

  getScheduledCount(): number {
    return this.allLeads.filter(l => l.status === 'Scheduled').length;
  }

  getStatusCount(st: LeadStatus): number {
    return this.allLeads.filter(l => l.status === st).length;
  }

  getInquiryPipelineTotal(): string {
    return '₦8.45B';
  }

  resetLeadFilters() {
    this.selectedLeadCategory.set('All');
    this.leadSearch.set('');
    this.leadStatusFilter.set('All');
  }

  getCategoryBadgeClass(type: LeadType): string {
    switch (type) {
      case 'Property Inquiry':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Inspection Request':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Sales Lead':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Leasing Inquiry':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'Contact Inquiry':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Booking Details':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Property Management':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-zinc-100 text-zinc-700 border-zinc-200';
    }
  }

  getCategoryIcon(type: LeadType): string {
    switch (type) {
      case 'Property Inquiry': return '🏡';
      case 'Inspection Request': return '🔍';
      case 'Sales Lead': return '📈';
      case 'Leasing Inquiry': return '📑';
      case 'Contact Inquiry': return '💬';
      case 'Booking Details': return '🛎️';
      case 'Property Management': return '🏢';
      default: return '📋';
    }
  }

  getStatusBadgeClass(status: LeadStatus): string {
    switch (status) {
      case 'New':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'In Progress':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Scheduled':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Closed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-zinc-100 text-zinc-700 border-zinc-200';
    }
  }

  updateLeadStatus(lead: Lead, status: LeadStatus) {
    lead.status = status;
    leads.splice(0, leads.length, ...this.allLeads);
    persistLeads(this.allLeads);
    this.showToast(`Updated status for "${lead.name}" to ${status}.`);
  }

  deleteLead(id: string) {
    if (!confirm('Are you sure you want to remove this inquiry record from CRM?')) return;
    this.allLeads = this.allLeads.filter(l => l.id !== id);
    leads.splice(0, leads.length, ...this.allLeads);
    persistLeads(this.allLeads);
    this.showToast('Lead inquiry removed from CRM.');
  }

  generateWhatsAppLink(ld: Lead): string {
    let text = `Hello ${ld.name}, reaching out from Nigson Properties Executive Desk.`;
    if (ld.type === 'Inspection Request') {
      text = `Hello ${ld.name}, confirming your VIP inspection request for ${ld.property || 'the residence'}${ld.preferredDate ? ' on ' + ld.preferredDate : ''}. Our team is ready to escort you.`;
    } else if (ld.type === 'Booking Details') {
      text = `Hello ${ld.name}, confirming your short-stay booking details for ${ld.property || 'the suite'}${ld.checkIn ? ' from ' + ld.checkIn + ' to ' + ld.checkOut : ''}. Welcome to Nigson Hospitality.`;
    } else if (ld.type === 'Property Management') {
      text = `Hello ${ld.name}, regarding your property management inquiry for ${ld.property || 'your real estate asset'}. We would like to present our asset preservation proposal.`;
    } else if (ld.type === 'Leasing Inquiry') {
      text = `Hello ${ld.name}, regarding your leasing inquiry for ${ld.property || 'the property'}. We have prepared the tenancy terms for your review.`;
    } else if (ld.type === 'Sales Lead') {
      text = `Hello ${ld.name}, regarding your investment inquiry for ${ld.property || 'our development'}. I have developer allocation details ready for your review.`;
    } else if (ld.property) {
      text = `Hello ${ld.name}, thank you for your inquiry regarding ${ld.property}. How can our private portfolio advisory assist you today?`;
    }
    return waLink(text);
  }

  openViewLeadModal(lead: Lead) {
    this.selectedLeadForView.set(lead);
  }

  closeViewLeadModal() {
    this.selectedLeadForView.set(null);
  }

  openLogLeadModal() {
    this.newLeadForm = {
      type: 'Property Inquiry',
      name: '',
      email: '',
      phone: '',
      property: '',
      budget: '',
      preferredDate: '',
      serviceCategory: '',
      status: 'New',
      notes: '',
      source: 'Direct Call / Office Walk-in'
    };
    this.showLogLeadModal.set(true);
  }

  closeLogLeadModal() {
    this.showLogLeadModal.set(false);
  }

  submitLogNewLead() {
    if (!this.newLeadForm.name.trim() || !this.newLeadForm.email.trim()) {
      alert('Please provide the client name and email address.');
      return;
    }
    const id = `ld-${Date.now()}`;
    const newLd: Lead = {
      id,
      type: this.newLeadForm.type,
      name: this.newLeadForm.name.trim(),
      email: this.newLeadForm.email.trim(),
      phone: this.newLeadForm.phone.trim() || '+234 807 346 7809',
      property: this.newLeadForm.property.trim() || undefined,
      budget: this.newLeadForm.budget.trim() || undefined,
      preferredDate: this.newLeadForm.preferredDate.trim() || undefined,
      serviceCategory: this.newLeadForm.serviceCategory.trim() || undefined,
      status: this.newLeadForm.status,
      notes: this.newLeadForm.notes.trim() || undefined,
      source: this.newLeadForm.source,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    this.allLeads.unshift(newLd);
    leads.splice(0, leads.length, ...this.allLeads);
    persistLeads(this.allLeads);

    this.showToast(`Inquiry for "${newLd.name}" logged under ${newLd.type}!`);
    this.closeLogLeadModal();
  }

  toggleSidebar() {
    this.sidebarOpen.set(!this.sidebarOpen());
  }

  selectModule(mod: AdminModule) {
    this.activeModule.set(mod);
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      this.sidebarOpen.set(false);
    }
  }

  closeAllModals() {
    this.showAddPropertyModal.set(false);
    this.showAddProjectModal.set(false);
    this.showAddShortStayModal.set(false);
    this.selectedLeadForView.set(null);
    this.showLogLeadModal.set(false);
    this.showAddUserModal.set(false);
    this.showEditUserModal.set(false);
  }

  showToast(msg: string) {
    this.toastMessage.set(msg);
    setTimeout(() => {
      if (this.toastMessage() === msg) {
        this.toastMessage.set(null);
      }
    }, 4000);
  }

  addPropertyAmenity(amenity: string) {
    if (!this.propertyForm.amenities.includes(amenity)) {
      this.propertyForm.amenities = this.propertyForm.amenities
        ? `${this.propertyForm.amenities}, ${amenity}`
        : amenity;
    }
  }

  addProjectFeature(feature: string) {
    if (!this.projectForm.features.includes(feature)) {
      this.projectForm.features = this.projectForm.features
        ? `${this.projectForm.features}, ${feature}`
        : feature;
    }
  }

  addSuiteAmenity(amenity: string) {
    if (!this.suiteForm.amenities.includes(amenity)) {
      this.suiteForm.amenities = this.suiteForm.amenities
        ? `${this.suiteForm.amenities}, ${amenity}`
        : amenity;
    }
  }

  // --- MULTI-IMAGE FILE UPLOAD & MANAGEMENT ---
  async onFilesSelected(event: Event, type: 'property' | 'project' | 'suite') {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const files = Array.from(input.files);
    for (const file of files) {
      if (!file.type.startsWith('image/')) continue;
      try {
        const compressed = await this.readAndCompressImage(file);
        if (compressed) {
          if (type === 'property') {
            this.propertyImages.push(compressed);
          } else if (type === 'project') {
            this.projectImages.push(compressed);
          } else if (type === 'suite') {
            this.suiteImages.push(compressed);
          }
        }
      } catch (e) {
        console.error('Image upload failed', e);
      }
    }
    input.value = '';
  }

  private readAndCompressImage(file: File, maxWidth = 1600, maxHeight = 1200, quality = 0.82): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const rawUrl = e.target?.result as string;
        if (!rawUrl) {
          resolve('');
          return;
        }
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            if (width / height > maxWidth / maxHeight) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(rawUrl);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = () => resolve(rawUrl);
        img.src = rawUrl;
      };
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  }

  addImageUrl(type: 'property' | 'project' | 'suite') {
    const url = this.customUrlInput[type]?.trim();
    if (!url) return;
    if (type === 'property') {
      this.propertyImages.push(url);
    } else if (type === 'project') {
      this.projectImages.push(url);
    } else if (type === 'suite') {
      this.suiteImages.push(url);
    }
    this.customUrlInput[type] = '';
  }

  addPresetImage(url: string, type: 'property' | 'project' | 'suite') {
    if (type === 'property') {
      if (!this.propertyImages.includes(url)) this.propertyImages.push(url);
    } else if (type === 'project') {
      if (!this.projectImages.includes(url)) this.projectImages.push(url);
    } else if (type === 'suite') {
      if (!this.suiteImages.includes(url)) this.suiteImages.push(url);
    }
  }

  removeImage(index: number, type: 'property' | 'project' | 'suite') {
    if (type === 'property') {
      this.propertyImages.splice(index, 1);
    } else if (type === 'project') {
      this.projectImages.splice(index, 1);
    } else if (type === 'suite') {
      this.suiteImages.splice(index, 1);
    }
  }

  setPrimaryImage(index: number, type: 'property' | 'project' | 'suite') {
    if (type === 'property' && index > 0 && index < this.propertyImages.length) {
      const [item] = this.propertyImages.splice(index, 1);
      this.propertyImages.unshift(item);
    } else if (type === 'project' && index > 0 && index < this.projectImages.length) {
      const [item] = this.projectImages.splice(index, 1);
      this.projectImages.unshift(item);
    } else if (type === 'suite' && index > 0 && index < this.suiteImages.length) {
      const [item] = this.suiteImages.splice(index, 1);
      this.suiteImages.unshift(item);
    }
  }

  // --- ADD PROPERTY ---
  addNewProperty() {
    if (this.propertyImages.length === 0) {
      this.propertyImages = ['/assets/villa.jpg'];
    }
    this.showAddPropertyModal.set(true);
  }

  closeAddPropertyModal() {
    this.showAddPropertyModal.set(false);
  }

  submitNewProperty() {
    if (!this.propertyForm.title.trim()) {
      alert('Please provide a property title.');
      return;
    }

    const id = this.slugify(this.propertyForm.title);
    const gallery = this.propertyImages.length > 0 ? [...this.propertyImages] : ['/assets/villa.jpg'];
    const primaryImage = gallery[0];
    const amenitiesArr = this.propertyForm.amenities
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const newProp: Property = {
      id,
      slug: id,
      title: this.propertyForm.title.trim(),
      tagline: this.propertyForm.tagline.trim() || undefined,
      category: this.propertyForm.category,
      location: this.propertyForm.location.trim() || 'Lagos',
      address: this.propertyForm.address.trim() || undefined,
      status: this.propertyForm.status,
      beds: Number(this.propertyForm.beds) || 1,
      baths: Number(this.propertyForm.baths) || 1,
      size: Number(this.propertyForm.size) || 100,
      price: Number(this.propertyForm.price) || 100000000,
      usdPrice: Math.round((Number(this.propertyForm.price) || 100000000) / 1500),
      gbpPrice: Math.round((Number(this.propertyForm.price) || 100000000) / 1920),
      titleDeed: this.propertyForm.titleDeed.trim() || undefined,
      image: primaryImage,
      gallery: gallery,
      amenities: amenitiesArr.length > 0 ? amenitiesArr : ['24/7 Redundant Clean Power', 'Biometric Access Control'],
      summary: this.propertyForm.summary.trim() || `${this.propertyForm.title} offers unparalleled modern luxury in ${this.propertyForm.location}.`,
      description: this.propertyForm.description.trim() || `${this.propertyForm.title} is an exclusive prime residence crafted with uncompromised engineering and Italian luxury finishes.`,
      completionDate: this.propertyForm.completionDate.trim() || 'Immediate Handover',
      highlights: [
        { label: 'Built Space', value: `${this.propertyForm.size} m²` },
        { label: 'Bedrooms', value: `${this.propertyForm.beds} En-Suite` },
        { label: 'Title', value: this.propertyForm.titleDeed || 'Federal C of O' }
      ]
    };

    this.allProps.unshift(newProp);
    properties.splice(0, properties.length, ...this.allProps);
    persistProperties(this.allProps);

    this.showToast(`Property "${newProp.title}" added with ${gallery.length} photos!`);
    this.closeAddPropertyModal();

    // Reset fields
    this.propertyForm.title = '';
    this.propertyForm.tagline = '';
    this.propertyForm.summary = '';
    this.propertyForm.description = '';
    this.propertyImages = ['/assets/villa.jpg'];
  }

  // --- ADD PROJECT ---
  proposeProject() {
    if (this.projectImages.length === 0) {
      this.projectImages = ['/assets/community.jpg'];
    }
    this.showAddProjectModal.set(true);
  }

  closeAddProjectModal() {
    this.showAddProjectModal.set(false);
  }

  submitNewProject() {
    if (!this.projectForm.name.trim()) {
      alert('Please provide a project name.');
      return;
    }

    const id = this.slugify(this.projectForm.name);
    const renderings = this.projectImages.length > 0 ? [...this.projectImages] : ['/assets/community.jpg'];
    const primaryImage = renderings[0];
    const featuresArr = this.projectForm.features
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const newProject: Project = {
      id,
      slug: id,
      name: this.projectForm.name.trim(),
      tagline: this.projectForm.tagline.trim() || 'Master-Planned Architectural Landmark',
      location: this.projectForm.location.trim() || 'Lagos Coastal Corridor',
      image: primaryImage,
      renderings: renderings,
      roi: Number(this.projectForm.roi) || 24,
      progress: Math.min(100, Math.max(0, Number(this.projectForm.progress) || 0)),
      handover: this.projectForm.handover.trim() || 'Handover Q4 2027',
      units: this.projectForm.units.trim() || '150 Units',
      status: Number(this.projectForm.progress) >= 100 ? 'Completed & Sold Out' : 'Under Construction',
      statusType: Number(this.projectForm.progress) >= 100 ? 'completed' : 'ongoing',
      landArea: this.projectForm.landArea.trim() || '20 Hectares',
      category: this.projectForm.category.trim() || 'Master-Planned Community',
      description: this.projectForm.description.trim() || `${this.projectForm.name} is an iconic visionary development engineered for high capital appreciation.`,
      features: featuresArr.length > 0 ? featuresArr : ['24/7 Redundant Power', 'Gated Perimeter Security'],
      metrics: [
        { label: 'Projected ROI', value: `+${this.projectForm.roi}% p.a.` },
        { label: 'Current Progress', value: `${this.projectForm.progress}%` },
        { label: 'Handover Target', value: this.projectForm.handover }
      ],
      milestones: [
        { title: 'Site Preparation & Piling Foundation', date: 'Q1 2025', progress: 100, status: 'Completed' },
        { title: 'Superstructure Core Rise', date: 'Q3 2025', progress: Math.min(100, Number(this.projectForm.progress) * 1.2), status: 'In Progress' },
        { title: 'Turnkey Architectural Finishes', date: 'Q4 2026', progress: Math.min(100, Number(this.projectForm.progress)), status: 'In Progress' }
      ],
      phases: [
        { name: 'Phase 1: Foundation Allocations', status: 'Selling Fast', units: '60 Units', priceFrom: 350000000 }
      ]
    };

    this.allProjects.unshift(newProject);
    projects.splice(0, projects.length, ...this.allProjects);
    persistProjects(this.allProjects);

    this.showToast(`Project "${newProject.name}" added with ${renderings.length} renderings!`);
    this.closeAddProjectModal();

    // Reset fields
    this.projectForm.name = '';
    this.projectForm.tagline = '';
    this.projectForm.description = '';
    this.projectImages = ['/assets/community.jpg'];
  }

  // --- ADD SHORT STAY ---
  addSuite() {
    if (this.suiteImages.length === 0) {
      this.suiteImages = ['/assets/suite1.jpg'];
    }
    this.showAddShortStayModal.set(true);
  }

  closeAddShortStayModal() {
    this.showAddShortStayModal.set(false);
  }

  submitNewShortStay() {
    if (!this.suiteForm.name.trim()) {
      alert('Please provide a suite name.');
      return;
    }

    const id = this.slugify(this.suiteForm.name);
    const gallery = this.suiteImages.length > 0 ? [...this.suiteImages] : ['/assets/suite1.jpg'];
    const primaryImage = gallery[0];
    const amenitiesArr = this.suiteForm.amenities
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    const rulesArr = this.suiteForm.houseRules
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const newSuite: Suite = {
      id,
      slug: id,
      name: this.suiteForm.name.trim(),
      tagline: this.suiteForm.tagline.trim() || 'Executive Concierge Serviced Residence',
      location: this.suiteForm.location.trim() || 'Lagos',
      address: this.suiteForm.address.trim() || 'Prime Location, Lagos',
      image: primaryImage,
      gallery: gallery,
      rate: Number(this.suiteForm.rate) || 200000,
      cleaningFee: Number(this.suiteForm.cleaningFee) || 20000,
      securityDeposit: Number(this.suiteForm.securityDeposit) || 100000,
      beds: Number(this.suiteForm.beds) || 2,
      baths: Number(this.suiteForm.baths) || 2,
      maxGuests: Number(this.suiteForm.maxGuests) || 4,
      amenities: amenitiesArr.length > 0 ? amenitiesArr : ['Starlink WiFi', '24/7 Clean Power', 'Daily Housekeeping'],
      description: this.suiteForm.description.trim() || `${this.suiteForm.name} offers ultra-luxury executive hospitality in ${this.suiteForm.location}.`,
      houseRules: rulesArr.length > 0 ? rulesArr : ['Check-in: 3:00 PM | Check-out: 12:00 PM', 'No Smoking Indoors'],
      reviews: [
        {
          name: 'Executive Guest',
          title: 'Visiting Partner',
          rating: 5,
          date: 'Recent Stay',
          comment: 'Impeccable finishing, silent solar power, and prompt concierge service throughout.'
        }
      ]
    };

    this.allSuites.unshift(newSuite);
    suites.splice(0, suites.length, ...this.allSuites);
    persistSuites(this.allSuites);

    this.showToast(`Short-Stay Suite "${newSuite.name}" added with ${gallery.length} photos!`);
    this.closeAddShortStayModal();

    // Reset fields
    this.suiteForm.name = '';
    this.suiteForm.tagline = '';
    this.suiteForm.description = '';
    this.suiteImages = ['/assets/suite1.jpg'];
  }

  // --- ACTIONS ---
  toggleStatus(p: Property) {
    p.status = p.status === 'Ready for Handover' ? 'Off-Plan' : 'Ready for Handover';
    properties.splice(0, properties.length, ...this.allProps);
    persistProperties(this.allProps);
  }

  deleteProp(id: string) {
    if (!confirm('Are you sure you want to remove this property from the catalog?')) return;
    this.allProps = this.allProps.filter(p => p.id !== id);
    properties.splice(0, properties.length, ...this.allProps);
    persistProperties(this.allProps);
    this.showToast('Property deleted successfully.');
  }

  deleteProject(id: string) {
    if (!confirm('Are you sure you want to remove this project development?')) return;
    this.allProjects = this.allProjects.filter(p => p.id !== id);
    projects.splice(0, projects.length, ...this.allProjects);
    persistProjects(this.allProjects);
    this.showToast('Project deleted successfully.');
  }

  deleteSuite(id: string) {
    if (!confirm('Are you sure you want to remove this short-stay suite?')) return;
    this.allSuites = this.allSuites.filter(s => s.id !== id);
    suites.splice(0, suites.length, ...this.allSuites);
    persistSuites(this.allSuites);
    this.showToast('Short-stay suite deleted successfully.');
  }

  private slugify(text: string): string {
    const base = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    return `${base}-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  // ========================================================
  // USERS, ROLES & GOVERNANCE STATE & METHODS
  // ========================================================
  allUsers: AppUser[] = users;
  allPermissions: PermissionItem[] = permissions;
  allAuditLogs: AuditLogItem[] = auditLogs;
  usersSubTab = signal<'directory' | 'roles' | 'audit'>('directory');

  userSearchTerm = '';
  userRoleFilter = 'ALL';
  userStatusFilter = 'ALL';
  auditSearchTerm = '';

  showAddUserModal = signal<boolean>(false);
  showEditUserModal = signal<boolean>(false);
  editingUser: AppUser | null = null;

  newUserForm: {
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    department: string;
    status: UserStatus;
    tier: string;
  } = {
    name: '',
    email: '',
    phone: '',
    role: 'Senior Sales Advisor',
    department: 'Sales & Marketing',
    status: 'Active',
    tier: 'Executive Sales Specialist'
  };

  editUserForm: {
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    department: string;
    status: UserStatus;
    tier: string;
  } = {
    name: '',
    email: '',
    phone: '',
    role: 'Senior Sales Advisor',
    department: '',
    status: 'Active',
    tier: ''
  };

  getStaffCount(): number {
    return this.allUsers.filter(u => u.role !== 'Verified Private Investor').length;
  }

  getInvestorCount(): number {
    return this.allUsers.filter(u => u.role === 'Verified Private Investor').length;
  }

  filteredUsers(): AppUser[] {
    return this.allUsers.filter(u => {
      const matchSearch = !this.userSearchTerm ||
        u.name.toLowerCase().includes(this.userSearchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(this.userSearchTerm.toLowerCase()) ||
        u.department.toLowerCase().includes(this.userSearchTerm.toLowerCase());
      const matchRole = this.userRoleFilter === 'ALL' || u.role === this.userRoleFilter;
      const matchStatus = this.userStatusFilter === 'ALL' || u.status === this.userStatusFilter;
      return matchSearch && matchRole && matchStatus;
    });
  }

  filteredAuditLogs(): AuditLogItem[] {
    if (!this.auditSearchTerm) return this.allAuditLogs;
    const term = this.auditSearchTerm.toLowerCase();
    return this.allAuditLogs.filter(log =>
      log.actor.toLowerCase().includes(term) ||
      log.action.toLowerCase().includes(term) ||
      log.target.toLowerCase().includes(term) ||
      log.role.toLowerCase().includes(term) ||
      log.ipAddress.toLowerCase().includes(term)
    );
  }

  getUserRoleBadgeClass(role: UserRole): string {
    switch (role) {
      case 'Super Admin':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Project Director':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'Senior Sales Advisor':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Hospitality & Short-Stay Desk':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Facility & Property Manager':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Verified Private Investor':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-zinc-50 text-zinc-700 border-zinc-200';
    }
  }

  getUserStatusBadgeClass(status: UserStatus): string {
    switch (status) {
      case 'Active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pending Approval':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Suspended':
        return 'bg-rose-50 text-rose-700 border-rose-200';
    }
  }

  openAddUserModal() {
    this.newUserForm = {
      name: '',
      email: '',
      phone: '',
      role: 'Senior Sales Advisor',
      department: 'Sales & Marketing',
      status: 'Active',
      tier: 'Executive Sales Specialist'
    };
    this.showAddUserModal.set(true);
  }

  closeAddUserModal() {
    this.showAddUserModal.set(false);
  }

  submitAddUser() {
    if (!this.newUserForm.name || !this.newUserForm.email) {
      this.showToast('Please fill in user name and corporate email.');
      return;
    }
    const colors = ['bg-red-600', 'bg-blue-600', 'bg-teal-600', 'bg-purple-600', 'bg-amber-600', 'bg-emerald-600'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newUser: AppUser = {
      id: `usr-${Date.now().toString(36)}`,
      name: this.newUserForm.name,
      email: this.newUserForm.email,
      phone: this.newUserForm.phone || '+234 800 000 0000',
      role: this.newUserForm.role,
      department: this.newUserForm.department || 'General Operations',
      status: this.newUserForm.status,
      tier: this.newUserForm.tier || (this.newUserForm.role === 'Verified Private Investor' ? 'Tier 1 Investor' : 'Corporate Staff'),
      joinedDate: 'Oct 2026',
      lastLogin: 'Never',
      avatarColor: randomColor
    };
    this.allUsers.unshift(newUser);
    users.splice(0, users.length, ...this.allUsers);
    persistUsers(this.allUsers);

    // Audit log
    const logItem: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      actor: 'Executive Admin',
      role: 'Super Admin',
      action: 'User Invited',
      target: `${newUser.name} (${newUser.role})`,
      ipAddress: '102.89.43.12 (Console)',
      status: 'Success'
    };
    this.allAuditLogs.unshift(logItem);
    auditLogs.splice(0, auditLogs.length, ...this.allAuditLogs);
    persistAuditLogs(this.allAuditLogs);

    this.closeAddUserModal();
    this.showToast(`User account created and invitation dispatched to ${newUser.email}.`);
  }

  openEditUserModal(u: AppUser) {
    this.editingUser = u;
    this.editUserForm = {
      name: u.name,
      email: u.email,
      phone: u.phone,
      role: u.role,
      department: u.department,
      status: u.status,
      tier: u.tier || ''
    };
    this.showEditUserModal.set(true);
  }

  closeEditUserModal() {
    this.showEditUserModal.set(false);
    this.editingUser = null;
  }

  submitEditUser() {
    if (!this.editingUser) return;
    this.editingUser.name = this.editUserForm.name;
    this.editingUser.email = this.editUserForm.email;
    this.editingUser.phone = this.editUserForm.phone;
    this.editingUser.role = this.editUserForm.role;
    this.editingUser.department = this.editUserForm.department;
    this.editingUser.status = this.editUserForm.status;
    this.editingUser.tier = this.editUserForm.tier;

    users.splice(0, users.length, ...this.allUsers);
    persistUsers(this.allUsers);

    const logItem: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      actor: 'Executive Admin',
      role: 'Super Admin',
      action: 'User Role/Profile Modified',
      target: `${this.editingUser.name} (${this.editingUser.role})`,
      ipAddress: '102.89.43.12 (Console)',
      status: 'Success'
    };
    this.allAuditLogs.unshift(logItem);
    auditLogs.splice(0, auditLogs.length, ...this.allAuditLogs);
    persistAuditLogs(this.allAuditLogs);

    this.closeEditUserModal();
    this.showToast('User profile & permissions updated.');
  }

  toggleUserStatus(u: AppUser) {
    u.status = u.status === 'Active' ? 'Suspended' : 'Active';
    users.splice(0, users.length, ...this.allUsers);
    persistUsers(this.allUsers);

    const logItem: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      actor: 'Executive Admin',
      role: 'Super Admin',
      action: u.status === 'Active' ? 'User Re-Activated' : 'User Suspended',
      target: `${u.name}`,
      ipAddress: '102.89.43.12 (Console)',
      status: u.status === 'Active' ? 'Success' : 'Warning'
    };
    this.allAuditLogs.unshift(logItem);
    auditLogs.splice(0, auditLogs.length, ...this.allAuditLogs);
    persistAuditLogs(this.allAuditLogs);

    this.showToast(`User status updated to ${u.status}.`);
  }

  resetUserPassword(u: AppUser) {
    const logItem: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      actor: 'Executive Admin',
      role: 'Super Admin',
      action: 'Password Reset Dispatched',
      target: `${u.name} (${u.email})`,
      ipAddress: '102.89.43.12 (Console)',
      status: 'Success'
    };
    this.allAuditLogs.unshift(logItem);
    auditLogs.splice(0, auditLogs.length, ...this.allAuditLogs);
    persistAuditLogs(this.allAuditLogs);

    this.showToast(`Secure password reset instructions sent to ${u.email}.`);
  }

  deleteUser(u: AppUser) {
    if (!confirm(`Are you sure you want to permanently remove user account ${u.name}?`)) return;
    this.allUsers = this.allUsers.filter(item => item.id !== u.id);
    users.splice(0, users.length, ...this.allUsers);
    persistUsers(this.allUsers);

    const logItem: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      actor: 'Executive Admin',
      role: 'Super Admin',
      action: 'User Account Deleted',
      target: `${u.name}`,
      ipAddress: '102.89.43.12 (Console)',
      status: 'Warning'
    };
    this.allAuditLogs.unshift(logItem);
    auditLogs.splice(0, auditLogs.length, ...this.allAuditLogs);
    persistAuditLogs(this.allAuditLogs);

    this.showToast('User account deleted.');
  }

  togglePermission(
    p: PermissionItem,
    roleKey: 'superAdmin' | 'projectDirector' | 'salesAdvisor' | 'hospitalityDesk' | 'facilityManager' | 'investor'
  ) {
    if (roleKey === 'superAdmin') {
      this.showToast('Super Admin permissions are foundational and cannot be revoked.');
      return;
    }
    p[roleKey] = !p[roleKey];
    permissions.splice(0, permissions.length, ...this.allPermissions);
    persistPermissions(this.allPermissions);

    const logItem: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      actor: 'Executive Admin',
      role: 'Super Admin',
      action: 'Permission Toggle',
      target: `${p.label} -> ${roleKey}: ${p[roleKey] ? 'Granted' : 'Revoked'}`,
      ipAddress: '102.89.43.12 (Console)',
      status: 'Success'
    };
    this.allAuditLogs.unshift(logItem);
    auditLogs.splice(0, auditLogs.length, ...this.allAuditLogs);
    persistAuditLogs(this.allAuditLogs);

    this.showToast(`Updated permission "${p.label}" for ${roleKey}.`);
  }

  resetPermissionsToDefault() {
    this.allPermissions.forEach((p, idx) => {
      const orig = initialPermissions[idx];
      if (orig) {
        p.superAdmin = orig.superAdmin;
        p.projectDirector = orig.projectDirector;
        p.salesAdvisor = orig.salesAdvisor;
        p.hospitalityDesk = orig.hospitalityDesk;
        p.facilityManager = orig.facilityManager;
        p.investor = orig.investor;
      }
    });
    permissions.splice(0, permissions.length, ...this.allPermissions);
    persistPermissions(this.allPermissions);
    this.showToast('Permissions matrix restored to corporate defaults.');
  }

  exportAuditLogCSV() {
    const headers = ['Timestamp', 'Actor', 'Role', 'Action', 'Target Resource', 'IP Address', 'Status'];
    const rows = this.allAuditLogs.map(l => [
      `"${l.timestamp}"`,
      `"${l.actor}"`,
      `"${l.role}"`,
      `"${l.action}"`,
      `"${l.target}"`,
      `"${l.ipAddress}"`,
      `"${l.status}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `nigson_audit_log_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.showToast(`Audit log exported (${this.allAuditLogs.length} events).`);
  }

  onCmsLogAction(event: { action: string; target: string }) {
    const logItem: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      actor: 'Executive Admin',
      role: 'Super Admin',
      action: event.action,
      target: event.target,
      ipAddress: '102.89.43.12 (CMS Studio)',
      status: 'Success'
    };
    this.allAuditLogs.unshift(logItem);
    auditLogs.splice(0, auditLogs.length, ...this.allAuditLogs);
    persistAuditLogs(this.allAuditLogs);
  }

}
