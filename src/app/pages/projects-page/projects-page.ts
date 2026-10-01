import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsMatrixComponent } from '../../components/projects-matrix/projects-matrix';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [CommonModule, ProjectsMatrixComponent],
  templateUrl: './projects-page.html',
  styleUrl: './projects-page.css'
})
export class ProjectsPageComponent {}
