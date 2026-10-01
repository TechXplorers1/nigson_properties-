import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PropertyService } from './services/property.service';
import { AuthService } from './services/auth.service';

// Global Layout Components
import { HeaderComponent } from './components/header/header';
import { FooterComponent } from './components/footer/footer';
import { PropertyModalComponent } from './components/property-modal/property-modal';
import { InspectionModalComponent } from './components/inspection-modal/inspection-modal';
import { AuthModalComponent } from './components/auth-modal/auth-modal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    PropertyModalComponent,
    InspectionModalComponent,
    AuthModalComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  public propertyService = inject(PropertyService);
  public authService = inject(AuthService);
  public router = inject(Router);

  public currentUrl = signal<string>(typeof window !== 'undefined' ? window.location.pathname : '');

  // On admin page (/admin), show only the dedicated admin layout (hiding public header/footer)
  public isAdminView = computed(() => {
    return this.currentUrl().startsWith('/admin');
  });

  constructor() {
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects || event.url;
      this.currentUrl.set(url);
    });
  }

  public openFloatingWhatsApp(): void {
    const msg = 'Hello Nigson Properties, I am browsing your corporate website and would like to speak to an agent regarding your properties.';
    window.open(this.propertyService.getWhatsAppLink(msg), '_blank');
  }

  public openFloatingInspection(): void {
    this.propertyService.openInspectionModal();
  }
}
