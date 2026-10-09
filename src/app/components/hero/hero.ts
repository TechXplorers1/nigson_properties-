import { Component, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
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
export class HeroComponent implements AfterViewInit {
  public propertyService = inject(PropertyService);
  public adminService = inject(AdminService);

  @ViewChild('heroVideo') public heroVideoRef?: ElementRef<HTMLVideoElement>;

  public ngAfterViewInit(): void {
    if (this.heroVideoRef?.nativeElement) {
      const video = this.heroVideoRef.nativeElement;
      // Set to 0.5x slow motion for ultra-smooth cinematic DJI Inspire 3 drone gliding
      video.playbackRate = 0.5;

      video.play().catch(() => {
        // Handled: muted autoplay policy
      });
    }
  }

  public openInspection(): void {
    this.propertyService.openInspectionModal();
  }

  public openWhatsApp(): void {
    window.open(this.propertyService.getWhatsAppLink('Hello Nigson Properties, I am interested in exploring available luxury properties in Lagos.'), '_blank');
  }

  public scrollDown(): void {
    const showcaseSection = document.getElementById('showcase');
    if (showcaseSection) {
      const headerOffset = 68;
      const elementPosition = showcaseSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({
        top: window.innerHeight * 0.8,
        behavior: 'smooth'
      });
    }
  }
}
