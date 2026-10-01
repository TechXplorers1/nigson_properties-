import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PropertyService } from '../../services/property.service';
import { UserRole } from '../../models/user.model';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPageComponent {
  public authService = inject(AuthService);
  public propertyService = inject(PropertyService);
  private router = inject(Router);

  public activeTab = signal<'login' | 'register'>('login');
  public isSubmitting = signal<boolean>(false);
  public errorMessage = signal<string>('');
  public showPassword = signal<boolean>(false);

  // Login form
  public loginEmail = signal<string>('');
  public loginPassword = signal<string>('');
  public rememberMe = signal<boolean>(true);

  // Register form
  public regName = signal<string>('');
  public regEmail = signal<string>('');
  public regPhone = signal<string>('');
  public regRole = signal<UserRole>('investor');
  public regPassword = signal<string>('');
  public regConfirmPassword = signal<string>('');
  public showConfirmPassword = signal<boolean>(false);

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      if (this.authService.isAdmin()) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  public togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  public toggleConfirmPassword(): void {
    this.showConfirmPassword.update(v => !v);
  }

  public setTab(tab: 'login' | 'register'): void {
    this.activeTab.set(tab);
    this.errorMessage.set('');
  }

  public onQuickDemo(type: 'admin' | 'investor' | 'client' | 'diaspora'): void {
    this.errorMessage.set('');
    const res = this.authService.quickDemoLogin(type);
    if (res.role === 'admin' || this.authService.isAdmin()) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/']);
    }
  }

  public onLogin(): void {
    this.errorMessage.set('');
    this.isSubmitting.set(true);

    setTimeout(() => {
      const res = this.authService.login({
        email: this.loginEmail(),
        password: this.loginPassword(),
        rememberMe: this.rememberMe()
      });

      this.isSubmitting.set(false);
      if (!res.success) {
        this.errorMessage.set(res.message);
      } else {
        if (res.role === 'admin' || this.authService.isAdmin()) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      }
    }, 400);
  }

  public onRegister(): void {
    this.errorMessage.set('');

    if (this.regPassword() !== this.regConfirmPassword()) {
      this.errorMessage.set('Passwords do not match. Please ensure both passwords are identical.');
      return;
    }

    this.isSubmitting.set(true);

    setTimeout(() => {
      const res = this.authService.register({
        name: this.regName(),
        email: this.regEmail(),
        phone: this.regPhone(),
        password: this.regPassword(),
        role: this.regRole()
      });

      this.isSubmitting.set(false);
      if (!res.success) {
        this.errorMessage.set(res.message);
      } else {
        this.router.navigate(['/']);
      }
    }, 400);
  }

  public getSavedProperties(): Property[] {
    const user = this.authService.currentUser();
    if (!user || !user.savedPropertyIds.length) return [];
    return this.propertyService.properties().filter((p: Property) => user.savedPropertyIds.includes(p.id));
  }

  public viewProperty(prop: Property): void {
    this.propertyService.openPropertyDetails(prop);
  }

  public removeSaved(propId: string, event: Event): void {
    event.stopPropagation();
    this.authService.toggleSaveProperty(propId);
  }

  public openInspection(): void {
    this.propertyService.openInspectionModal();
  }

  public logout(): void {
    this.authService.logout();
  }
}
