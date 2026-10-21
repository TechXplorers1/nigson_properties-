import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export interface AuthUser {
  name: string;
  initials: string;
  email: string;
  role: 'investor' | 'admin';
  tier: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'nigson_auth_user';

  isLoggedIn = signal<boolean>(false);
  currentUser = signal<AuthUser | null>(null);

  constructor(private router: Router) {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        try {
          const user = JSON.parse(stored);
          this.currentUser.set(user);
          this.isLoggedIn.set(true);
        } catch {
          localStorage.removeItem(this.STORAGE_KEY);
        }
      }
    }
  }

  login(email: string = 'investor@nigson.com', role?: 'investor' | 'admin') {
    const isAdm = role === 'admin' || email.toLowerCase().includes('admin');
    const user: AuthUser = isAdm
      ? {
          name: 'Executive Admin',
          initials: 'EA',
          email: email || 'admin@nigson.com',
          role: 'admin',
          tier: 'System Director'
        }
      : {
          name: 'Chief Adeleke',
          initials: 'CA',
          email: email || 'investor@nigson.com',
          role: 'investor',
          tier: 'Tier 1 Private Client'
        };

    this.currentUser.set(user);
    this.isLoggedIn.set(true);

    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    }

    if (isAdm) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/portal']);
    }
  }

  logout() {
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
    }
    this.router.navigate(['/']);
  }
}
