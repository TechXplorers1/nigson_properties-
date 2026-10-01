import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css'
})
export class ProfilePageComponent implements OnInit {
  public authService = inject(AuthService);
  public propertyService = inject(PropertyService);
  private router = inject(Router);

  // Edit Profile State
  public isEditing = signal<boolean>(false);
  public editName = signal<string>('');
  public editEmail = signal<string>('');
  public editPhone = signal<string>('');
  public editAvatar = signal<string>('');

  // Sample avatar photos for easy switching
  public readonly avatarPresets = [
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
  ];

  ngOnInit(): void {
    const user = this.authService.currentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }
    this.populateEditFields(user);
  }

  private populateEditFields(user: User): void {
    this.editName.set(user.name);
    this.editEmail.set(user.email);
    this.editPhone.set(user.phone || '+234 807 346 7809');
    this.editAvatar.set(user.avatar || '');
  }

  public startEditing(): void {
    const user = this.authService.currentUser();
    if (user) {
      this.populateEditFields(user);
      this.isEditing.set(true);
    }
  }

  public cancelEditing(): void {
    this.isEditing.set(false);
  }

  public saveProfileChanges(): void {
    if (!this.editName().trim()) {
      this.propertyService.showToast('Validation Error', 'Full name cannot be empty.', 'error');
      return;
    }

    this.authService.updateProfile({
      name: this.editName().trim(),
      email: this.editEmail().trim(),
      phone: this.editPhone().trim(),
      avatar: this.editAvatar().trim() || undefined
    });

    this.isEditing.set(false);
  }

  public selectAvatarPreset(url: string): void {
    this.editAvatar.set(url);
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

  public openWhatsAppConcierge(): void {
    const user = this.authService.currentUser();
    const name = user ? user.name : 'Client';
    const msg = `Hello Nigson Properties, I am ${name} from your Private Client Portal. I would like to consult with my dedicated investment officer.`;
    window.open(this.propertyService.getWhatsAppLink(msg), '_blank');
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
