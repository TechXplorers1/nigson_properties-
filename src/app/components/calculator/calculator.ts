import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calculator.html',
  styleUrl: './calculator.css'
})
export class CalculatorComponent {
  public propertyService = inject(PropertyService);

  public propertyPrice = signal<number>(195000000);
  public downPaymentPercent = signal<number>(30);
  public loanTermYears = signal<number>(10);
  public interestRate = signal<number>(16);
  public annualRentalIncome = signal<number>(18000000);

  // Computations
  public downPaymentAmount = computed<number>(() => {
    return (this.propertyPrice() * this.downPaymentPercent()) / 100;
  });

  public loanAmount = computed<number>(() => {
    return this.propertyPrice() - this.downPaymentAmount();
  });

  public monthlyMortgage = computed<number>(() => {
    const principal = this.loanAmount();
    const monthlyRate = (this.interestRate() / 100) / 12;
    const totalMonths = this.loanTermYears() * 12;

    if (monthlyRate === 0) return principal / totalMonths;

    const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                    (Math.pow(1 + monthlyRate, totalMonths) - 1);
    return Math.round(payment);
  });

  public rentalYieldPercent = computed<string>(() => {
    if (this.propertyPrice() === 0) return '0.0';
    const yieldVal = (this.annualRentalIncome() / this.propertyPrice()) * 100;
    return yieldVal.toFixed(1);
  });

  public netAnnualCashFlow = computed<number>(() => {
    const annualMortgage = this.monthlyMortgage() * 12;
    return this.annualRentalIncome() - annualMortgage;
  });

  public quickSetProperty(price: number, rent: number): void {
    this.propertyPrice.set(price);
    this.annualRentalIncome.set(rent);
  }

  public bookConsultation(): void {
    const msg = `Hello Nigson Properties, I used your ROI & Mortgage Calculator for a ₦${this.propertyPrice().toLocaleString()} property. I would like to schedule a private investment advisory consultation.`;
    window.open(this.propertyService.getWhatsAppLink(msg), '_blank');
  }
}
