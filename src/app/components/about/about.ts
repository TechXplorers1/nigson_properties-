import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent {
  public propertyService = inject(PropertyService);

  public contactExecutive(executiveName: string): void {
    const msg = `Hello Nigson Properties, I would like to schedule an executive consultation with ${executiveName}.`;
    window.open(this.propertyService.getWhatsAppLink(msg), '_blank');
  }
}
