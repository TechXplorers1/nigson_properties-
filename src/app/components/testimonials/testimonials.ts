import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../services/property.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css'
})
export class TestimonialsComponent {
  public propertyService = inject(PropertyService);
  public adminService = inject(AdminService);
}
