import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  public propertyService = inject(PropertyService);
  public authService = inject(AuthService);
  public adminService = inject(AdminService);
  private router = inject(Router);
  public isMobileMenuOpen = signal<boolean>(false);
  public isScrolled = signal<boolean>(false);

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled.set(window.scrollY > 40);
      });
    }
  }

  public toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(val => !val);
  }

  public closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  public openInspection(): void {
    this.closeMobileMenu();
    this.propertyService.openInspectionModal();
  }

  public openWhatsApp(): void {
    window.open(this.propertyService.getWhatsAppLink('Hello Nigson Properties, I would like to make an inquiry regarding your properties and services.'), '_blank');
  }

  public openLogin(): void {
    this.closeMobileMenu();
    this.authService.openAuthModal('login');
  }

  public openProfile(): void {
    this.closeMobileMenu();
    this.router.navigate(['/profile']);
  }

  public navigateToAdmin(): void {
    this.closeMobileMenu();
    this.router.navigate(['/admin']);
  }

  public logout(): void {
    this.closeMobileMenu();
    this.authService.logout();
  }
}
