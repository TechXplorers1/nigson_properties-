import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesComponent } from '../../components/properties/properties';

@Component({
  selector: 'app-properties-page',
  standalone: true,
  imports: [CommonModule, PropertiesComponent],
  templateUrl: './properties-page.html',
  styleUrl: './properties-page.css'
})
export class PropertiesPageComponent {}
