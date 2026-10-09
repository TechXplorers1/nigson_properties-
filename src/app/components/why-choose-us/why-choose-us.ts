import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-choose-us.html',
  styleUrl: './why-choose-us.css'
})
export class WhyChooseUsComponent {
  public adminService = inject(AdminService);
  public pillars = [
    {
      icon: 'ri-building-line',
      title: 'A Trusted Name You Can Rely On',
      desc: 'Backed by the institutional strength, financial integrity, and corporate foundation of Nigson Group.'
    },
    {
      icon: 'ri-medal-fill',
      title: 'Quality Without Compromise',
      desc: 'Architectural precision, European structural standards, and premium turnkey finishes in every home.'
    },
    {
      icon: 'ri-line-chart-line',
      title: 'Lagos Market Expertise',
      desc: 'Granular micro-market intelligence and strategic property investment insight across prime corridors.'
    },
    {
      icon: 'ri-user-heart-line',
      title: 'Customer-First Transparency',
      desc: 'Verified land titles, clear documentation, transparent milestone reporting, and dedicated aftercare.'
    },
    {
      icon: 'ri-cpu-line',
      title: 'Innovation-Driven Engineering',
      desc: 'Standardized smart home automation, high-capacity solar inverters, and central clean water plants.'
    },
    {
      icon: 'ri-seedling-line',
      title: 'Sustainable Long-Term Value',
      desc: 'Prime high-appreciation assets designed for strong rental yields and generational wealth creation.'
    }
  ];
}
