import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from '../../components/gallery/gallery';

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [CommonModule, GalleryComponent],
  templateUrl: './gallery-page.html',
  styleUrl: './gallery-page.css'
})
export class GalleryPageComponent {}
