import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Nigson Properties Limited — Architectural Luxury Across Lagos & Abuja'
  },
  {
    path: 'properties',
    loadComponent: () => import('./pages/properties-hub/properties-hub.component').then(m => m.PropertiesHubComponent),
    title: 'Exclusive Properties Portfolio — Nigson Properties Limited'
  },
  {
    path: 'properties/:id',
    loadComponent: () => import('./pages/property-detail/property-detail.component').then(m => m.PropertyDetailComponent),
    title: 'Residence Dossier — Nigson Properties Limited'
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects-hub/projects-hub.component').then(m => m.ProjectsHubComponent),
    title: 'Master Developments Matrix — Nigson Properties Limited'
  },
  {
    path: 'projects/:id',
    loadComponent: () => import('./pages/project-detail/project-detail.component').then(m => m.ProjectDetailComponent),
    title: 'Development Project Dossier — Nigson Properties Limited'
  },
  {
    path: 'short-stay',
    loadComponent: () => import('./pages/short-stay-hub/short-stay-hub.component').then(m => m.ShortStayHubComponent),
    title: 'Executive Short-Stay Suites — Nigson Properties Limited'
  },
  {
    path: 'short-stay/:id',
    loadComponent: () => import('./pages/short-stay-detail/short-stay-detail.component').then(m => m.ShortStayDetailComponent),
    title: 'Serviced Suite Reservation — Nigson Properties Limited'
  },
  {
    path: 'gallery',
    redirectTo: 'projects',
    pathMatch: 'full'
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services-page/services-page.component').then(m => m.ServicesPageComponent),
    title: 'Core Real Estate Services — Nigson Properties Limited'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about-page/about-page.component').then(m => m.AboutPageComponent),
    title: 'Corporate Pedigree & Leadership — Nigson Properties Limited'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact-page/contact-page.component').then(m => m.ContactPageComponent),
    title: 'Corporate Headquarters & VIP Desk — Nigson Properties Limited'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login.component').then(m => m.LoginComponent),
    title: 'Private Client Portal Authentication — Nigson Properties Limited'
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/auth/signup.component').then(m => m.SignupComponent),
    title: 'Investor Onboarding — Nigson Properties Limited'
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/auth/forgot-password.component').then(m => m.ForgotPasswordComponent),
    title: 'Reset Password — Nigson Properties Limited'
  },
  {
    path: 'portal',
    loadComponent: () => import('./pages/portal/portal.component').then(m => m.PortalComponent),
    title: 'Client Portal Vault — Nigson Properties Limited'
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent),
    title: 'Executive CRM Console — Nigson Properties Limited'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
