import { inject } from '@angular/core';
import { Routes, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './pages/home/home';
import { PropertiesPageComponent } from './pages/properties-page/properties-page';
import { AboutPageComponent } from './pages/about-page/about-page';
import { ProjectsPageComponent } from './pages/projects-page/projects-page';
import { ServicesPageComponent } from './pages/services-page/services-page';
import { GalleryPageComponent } from './pages/gallery-page/gallery-page';
import { ContactPageComponent } from './pages/contact-page/contact-page';
import { CalculatorPageComponent } from './pages/calculator-page/calculator-page';
import { LoginPageComponent } from './pages/login-page/login-page';
import { ProfilePageComponent } from './pages/profile-page/profile-page';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard';

import { ShortStayPageComponent } from './pages/short-stay-page/short-stay-page';

export const adminLoginGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAdmin()) {
    return router.createUrlTree(['/admin']);
  }
  return true;
};

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent, 
    title: 'Nigson Properties | Affordable Luxury Real Estate in Lagos' 
  },
  { path: 'properties', component: PropertiesPageComponent, title: 'Properties for Sale & Lease | Nigson Properties' },
  { path: 'short-stay', component: ShortStayPageComponent, title: 'Luxury Short Stay Apartments, Penthouses & Villas | Nigson Properties' },
  { path: 'about', component: AboutPageComponent, title: 'About Us & Leadership | Nigson Properties' },
  { path: 'projects', component: ProjectsPageComponent, title: 'Project Development Matrix | Nigson Properties' },
  { path: 'portfolio', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'services', component: ServicesPageComponent, title: 'Our 6 Core Real Estate Services | Nigson Properties' },
  { path: 'calculator', component: CalculatorPageComponent, title: 'Mortgage & ROI Investment Calculator | Nigson Properties' },
  { path: 'gallery', component: GalleryPageComponent, title: 'Architectural Project Gallery | Nigson Properties' },
  { path: 'contact', component: ContactPageComponent, title: 'Contact Us | Nigson Properties Lagos' },
  { 
    path: 'login', 
    component: LoginPageComponent, 
    canActivate: [adminLoginGuard],
    title: 'Client Portal & Login | Nigson Properties' 
  },
  { path: 'profile', component: ProfilePageComponent, title: 'Private Client Profile Dashboard | Nigson Properties' },
  { path: 'admin', component: AdminDashboardComponent, title: 'Executive Admin Control Panel | Nigson Properties' },
  { path: 'admin/dashboard', redirectTo: 'admin', pathMatch: 'full' },
  { path: 'portal', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'dashboard', redirectTo: 'profile', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];
