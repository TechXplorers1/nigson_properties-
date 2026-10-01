import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class HeroComponent {
  public propertyService = inject(PropertyService);
  public adminService = inject(AdminService);

  public openInspection(): void {
    this.propertyService.openInspectionModal();
  }

  public openWhatsApp(): void {
    window.open(this.propertyService.getWhatsAppLink('Hello Nigson Properties, I am interested in exploring available luxury properties in Lagos.'), '_blank');
  }
}
