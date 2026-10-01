import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from '../../components/calculator/calculator';

@Component({
  selector: 'app-calculator-page',
  standalone: true,
  imports: [CommonModule, CalculatorComponent],
  templateUrl: './calculator-page.html',
  styleUrl: './calculator-page.css'
})
export class CalculatorPageComponent {}
