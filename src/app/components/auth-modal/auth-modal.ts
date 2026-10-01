import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PropertyService } from '../../services/property.service';
import { UserRole } from '../../models/user.model';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-modal.html',
  styleUrl: './auth-modal.css'
})
export class AuthModalComponent {
  public authService = inject(AuthService);
  public propertyService = inject(PropertyService);
  private router = inject(Router);

  // Form Fields
  public loginEmail = signal<string>('');
  public loginPassword = signal<string>('');
  public rememberMe = signal<boolean>(true);
  public showPassword = signal<boolean>(false);
  public errorMessage = signal<string>('');
  public isSubmitting = signal<boolean>(false);

  // Register Fields
  public regName = signal<string>('');
  public regEmail = signal<string>('');
  public regPhone = signal<string>('');
  public regPassword = signal<string>('');
  public regConfirmPassword = signal<string>('');
  public regRole = signal<UserRole>('investor');
  public showConfirmPassword = signal<boolean>(false);

  // Forgot Password Field
  public forgotEmail = signal<string>('');

  public togglePasswordVisibility(): void {
    this.showPassword.update(v => !v);
  }

  public toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword.update(v => !v);
  }

  public onLoginSubmit(): void {
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
        this.loginEmail.set('');
        this.loginPassword.set('');
        if (res.role === 'admin' || this.authService.isAdmin()) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      }
    }, 400);
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

  public onRegisterSubmit(): void {
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
        this.regName.set('');
        this.regEmail.set('');
        this.regPhone.set('');
        this.regPassword.set('');
        this.regConfirmPassword.set('');
        this.router.navigate(['/']);
      }
    }, 400);
  }

  public onForgotSubmit(): void {
    this.errorMessage.set('');
    const res = this.authService.requestPasswordReset(this.forgotEmail());
    if (!res.success) {
      this.errorMessage.set(res.message);
    } else {
      this.forgotEmail.set('');
    }
  }

  public getSavedProperties(): Property[] {
    const user = this.authService.currentUser();
    if (!user || !user.savedPropertyIds.length) return [];
    return this.propertyService.properties().filter((p: Property) => user.savedPropertyIds.includes(p.id));
  }

  public viewProperty(prop: Property): void {
    this.authService.closeAuthModal();
    this.propertyService.openPropertyDetails(prop);
  }

  public removeSaved(propId: string, event: Event): void {
    event.stopPropagation();
    this.authService.toggleSaveProperty(propId);
  }

  public navigateToProperties(): void {
    this.authService.closeAuthModal();
    this.router.navigate(['/properties']);
  }

  public openInspection(): void {
    this.authService.closeAuthModal();
    this.propertyService.openInspectionModal();
  }

  public goToProfileDashboard(): void {
    this.authService.closeAuthModal();
    this.router.navigate(['/profile']);
  }

  public logout(): void {
    this.authService.logout();
  }
}
