import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { InspectionModalComponent } from './components/inspection-modal/inspection-modal.component';
import { BrochureModalComponent } from './components/brochure-modal/brochure-modal.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    InspectionModalComponent,
    BrochureModalComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  router = inject(Router);
  isAdminPage = signal<boolean>(false);

  constructor() {
    this.checkRoute(this.router.url);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.checkRoute(event.urlAfterRedirects || event.url);
    });
  }

  private checkRoute(url: string) {
    const cleanUrl = url ? url.split('?')[0].split('#')[0] : '';
    this.isAdminPage.set(cleanUrl.startsWith('/admin'));
  }
}
