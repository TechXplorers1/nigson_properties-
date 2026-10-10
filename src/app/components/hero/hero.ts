import { Component, ElementRef, ViewChild, AfterViewInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PropertyService } from '../../services/property.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class HeroComponent implements AfterViewInit {
  public propertyService = inject(PropertyService);
  public adminService = inject(AdminService);
  public router = inject(Router);

  // Search Engine State
  public selectedTab = signal<string>('all');
  public searchLocation = signal<string>('all');
  public searchPropertyType = signal<string>('all');
  public searchBedrooms = signal<string>('all');
  public searchMaxPrice = signal<number>(1000000000);

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

  public selectTab(tab: string): void {
    this.selectedTab.set(tab);
    if (tab === 'short-stay') {
      this.router.navigate(['/short-stay']);
    } else if (tab === 'projects') {
      this.router.navigate(['/projects']);
    }
  }

  public applySearch(): void {
    const tab = this.selectedTab();
    if (tab === 'short-stay') {
      this.router.navigate(['/short-stay']);
      return;
    }
    if (tab === 'projects') {
      this.router.navigate(['/projects']);
      return;
    }

    this.propertyService.setCategory(tab);
    this.propertyService.setLocation(this.searchLocation());
    this.propertyService.setBedrooms(this.searchBedrooms());
    this.propertyService.setMaxPrice(this.searchMaxPrice());
    this.router.navigate(['/properties']);
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
