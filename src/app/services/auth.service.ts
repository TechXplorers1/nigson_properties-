import { Injectable, signal, computed, inject } from '@angular/core';
import { User, LoginCredentials, RegisterData, UserRole } from '../models/user.model';
import { PropertyService } from './property.service';

const STORAGE_KEY = 'nigson_properties_user_session';
const SAVED_PROPS_KEY = 'nigson_saved_properties';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private propertyService = inject(PropertyService);

  // Pre-configured Demo accounts for instant luxury client testing
  public readonly demoAccounts: { email: string; pass: string; user: User }[] = [
    {
      email: 'admin@nigson.com',
      pass: 'admin123',
      user: {
        id: 'usr_admin_00',
        name: 'Engr. Nnamdi Igwe',
        email: 'admin@nigson.com',
        phone: '+234 807 346 7809',
        role: 'admin',
        roleLabel: 'Managing Director & System Admin',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
        savedPropertyIds: [],
        membershipTier: 'Black Card Investor',
        createdAt: '2023-01-01'
      }
    },
    {
      email: 'investor@nigson.com',
      pass: 'investor123',
      user: {
        id: 'usr_investor_01',
        name: 'Chief Tunde Adeleke',
        email: 'investor@nigson.com',
        phone: '+234 803 555 0192',
        role: 'investor',
        roleLabel: 'High-Net-Worth Investor',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        savedPropertyIds: ['grand-azure-banana-island', 'obsidian-penthouse-ikoyi'],
        membershipTier: 'Black Card Investor',
        createdAt: '2024-03-15'
      }
    },
    {
      email: 'client@nigson.com',
      pass: 'client123',
      user: {
        id: 'usr_client_02',
        name: 'Dr. Somtochukwu Obi',
        email: 'client@nigson.com',
        phone: '+234 812 444 8890',
        role: 'client',
        roleLabel: 'Private Residence Buyer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        savedPropertyIds: ['sovereign-residence-lekki'],
        membershipTier: 'Gold Private Client',
        createdAt: '2024-06-20'
      }
    },
    {
      email: 'diaspora@nigson.com',
      pass: 'diaspora123',
      user: {
        id: 'usr_diaspora_03',
        name: 'Amara Williams (Esq.)',
        email: 'diaspora@nigson.com',
        phone: '+44 7911 123456',
        role: 'diaspora',
        roleLabel: 'Diaspora Real Estate Client',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        savedPropertyIds: ['pearl-horizon-osapa'],
        membershipTier: 'Silver Member',
        createdAt: '2024-08-10'
      }
    }
  ];

  public currentUser = signal<User | null>(this.loadStoredUser());
  public isLoggedIn = computed(() => !!this.currentUser());
  public isAdmin = computed(() => this.currentUser()?.role === 'admin');
  public isAuthModalOpen = signal<boolean>(false);
  public authMode = signal<'login' | 'register' | 'forgot' | 'profile'>('login');

  constructor() {}

  private loadStoredUser(): User | null {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  private persistUser(user: User | null): void {
    if (typeof window === 'undefined') return;
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to persist user session', e);
    }
  }

  public openAuthModal(mode: 'login' | 'register' | 'forgot' | 'profile' = 'login'): void {
    if (this.isLoggedIn() && mode === 'login') {
      this.authMode.set('profile');
    } else {
      this.authMode.set(mode);
    }
    this.isAuthModalOpen.set(true);
  }

  public closeAuthModal(): void {
    this.isAuthModalOpen.set(false);
  }

  public switchMode(mode: 'login' | 'register' | 'forgot' | 'profile'): void {
    this.authMode.set(mode);
  }

  public login(credentials: LoginCredentials): { success: boolean; message: string; role?: UserRole } {
    const email = credentials.email.trim().toLowerCase();
    const password = credentials.password.trim();

    if (!email || !password) {
      return { success: false, message: 'Please enter both your email and password.' };
    }

    // Check demo accounts first
    const matchedDemo = this.demoAccounts.find(
      acc => acc.email.toLowerCase() === email && acc.pass === password
    );

    if (matchedDemo) {
      this.currentUser.set(matchedDemo.user);
      this.persistUser(matchedDemo.user);
      this.closeAuthModal();
      this.propertyService.showToast(
        matchedDemo.user.role === 'admin' ? 'Executive Access Granted' : 'Welcome Back!',
        `Welcome to Nigson Properties ${matchedDemo.user.role === 'admin' ? 'Admin Portal' : 'Client Portal'}, ${matchedDemo.user.name}.`,
        'success'
      );
      return { success: true, message: 'Logged in successfully.', role: matchedDemo.user.role };
    }

    // Allow custom login with realistic simulation
    if (password.length >= 6) {
      const isAdminLogin = email.includes('admin') || password === 'admin123';
      const customUser: User = {
        id: 'usr_' + Date.now(),
        name: isAdminLogin 
          ? 'Engr. Nnamdi Igwe' 
          : email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email: email,
        phone: '+234 807 346 7809',
        avatar: isAdminLogin
          ? 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        role: isAdminLogin ? 'admin' : 'client',
        roleLabel: isAdminLogin ? 'Managing Director & System Admin' : 'Private Client',
        savedPropertyIds: ['grand-azure-banana-island'],
        membershipTier: isAdminLogin ? 'Black Card Investor' : 'Gold Private Client',
        createdAt: new Date().toISOString().split('T')[0]
      };
      this.currentUser.set(customUser);
      this.persistUser(customUser);
      this.closeAuthModal();
      this.propertyService.showToast(
        isAdminLogin ? 'Admin Access Granted' : 'Login Successful',
        `Welcome back, ${customUser.name}.`,
        'success'
      );
      return { success: true, message: 'Logged in successfully.', role: customUser.role };
    }

    return { 
      success: false, 
      message: 'Invalid credentials. Password must be at least 6 characters or use one of the quick demo accounts.' 
    };
  }

  public quickDemoLogin(type: 'admin' | 'investor' | 'client' | 'diaspora'): { success: boolean; message: string; role?: UserRole } {
    const demo = this.demoAccounts.find(d => d.user.role === type) || this.demoAccounts[0];
    return this.login({ email: demo.email, password: demo.pass });
  }

  public register(data: RegisterData): { success: boolean; message: string } {
    if (!data.name.trim() || !data.email.trim() || !data.password.trim()) {
      return { success: false, message: 'All fields are required.' };
    }

    if (data.password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters long.' };
    }

    const roleLabels: Record<UserRole, string> = {
      admin: 'System Administrator',
      investor: 'High-Net-Worth Investor',
      client: 'Private Residence Buyer',
      diaspora: 'Diaspora Real Estate Client',
      corporate: 'Corporate Partner'
    };

    const newUser: User = {
      id: 'usr_' + Date.now(),
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      role: data.role,
      roleLabel: roleLabels[data.role] || 'Private Client',
      savedPropertyIds: [],
      membershipTier: data.role === 'investor' ? 'Black Card Investor' : 'Gold Private Client',
      createdAt: new Date().toISOString().split('T')[0]
    };

    this.currentUser.set(newUser);
    this.persistUser(newUser);
    this.closeAuthModal();
    this.propertyService.showToast(
      'Account Created Successfully!',
      `Welcome to Nigson Properties, ${newUser.name}. Your luxury client dashboard is now active.`,
      'success'
    );
    return { success: true, message: 'Registration complete.' };
  }

  public logout(): void {
    const name = this.currentUser()?.name || 'Client';
    this.currentUser.set(null);
    this.persistUser(null);
    this.closeAuthModal();
    this.propertyService.showToast(
      'Signed Out',
      `You have been safely signed out. Thank you for visiting Nigson Properties, ${name}.`,
      'info'
    );
  }

  public toggleSaveProperty(propertyId: string): void {
    const user = this.currentUser();
    if (!user) {
      this.propertyService.showToast('Sign In Required', 'Please sign in to save properties to your portfolio.', 'info');
      this.openAuthModal('login');
      return;
    }

    const currentIds = [...user.savedPropertyIds];
    const index = currentIds.indexOf(propertyId);
    let action = 'saved to';

    if (index > -1) {
      currentIds.splice(index, 1);
      action = 'removed from';
    } else {
      currentIds.push(propertyId);
    }

    const updatedUser = { ...user, savedPropertyIds: currentIds };
    this.currentUser.set(updatedUser);
    this.persistUser(updatedUser);

    this.propertyService.showToast(
      'Saved Properties Updated',
      `Property successfully ${action} your saved luxury portfolio.`,
      'success'
    );
  }

  public isPropertySaved(propertyId: string): boolean {
    const user = this.currentUser();
    return user ? user.savedPropertyIds.includes(propertyId) : false;
  }

  public requestPasswordReset(email: string): { success: boolean; message: string } {
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Please provide a valid registered email address.' };
    }

    this.propertyService.showToast(
      'Reset Link Dispatched',
      `Password reset instructions have been securely sent to ${email}. Please check your inbox.`,
      'info'
    );
    this.switchMode('login');
    return { success: true, message: 'Reset email sent.' };
  }

  public updateProfile(updated: Partial<User>): void {
    const current = this.currentUser();
    if (!current) return;
    const merged = { ...current, ...updated };
    this.currentUser.set(merged);
    this.persistUser(merged);
    this.propertyService.showToast('Profile Updated', 'Your profile details have been updated successfully.', 'success');
  }
}
