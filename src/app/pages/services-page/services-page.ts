import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from '../../components/services/services';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, ServicesComponent],
  templateUrl: './services-page.html',
  styleUrl: './services-page.css'
})
export class ServicesPageComponent {}
