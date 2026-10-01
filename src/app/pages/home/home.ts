import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HeroComponent } from '../../components/hero/hero';
import { ShowcaseComponent } from '../../components/showcase/showcase';
import { ServicesComponent } from '../../components/services/services';
import { WhyChooseUsComponent } from '../../components/why-choose-us/why-choose-us';
import { TestimonialsComponent } from '../../components/testimonials/testimonials';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    ShowcaseComponent,
    ServicesComponent,
    WhyChooseUsComponent,
    TestimonialsComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {}
