import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from '../../components/about/about';
import { WhyChooseUsComponent } from '../../components/why-choose-us/why-choose-us';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, AboutComponent, WhyChooseUsComponent],
  templateUrl: './about-page.html',
  styleUrl: './about-page.css'
})
export class AboutPageComponent {}
