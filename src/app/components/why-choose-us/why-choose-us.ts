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
      desc: 'Nigson Properties benefits from the robust institutional reputation, financial strength, and corporate foundation of Nigson Group.'
    },
    {
      icon: 'ri-medal-fill',
      title: 'Quality Without Compromise',
      desc: 'Every development is executed with meticulous attention to architectural planning, structural integrity, premium finishing, and stringent safety.'
    },
    {
      icon: 'ri-line-chart-line',
      title: 'Proven Expertise & Strong Market Presence',
      desc: 'We combine granular Lagos micro-market knowledge, strategic property investment insight, and deep operational excellence across prime corridors.'
    },
    {
      icon: 'ri-user-heart-line',
      title: 'Customer-First Transparency',
      desc: 'We prioritize clear communication, uncompromised integrity in documentation, milestone reporting, and dedicated post-handover customer care.'
    },
    {
      icon: 'ri-cpu-line',
      title: 'Innovation-Driven Development',
      desc: 'Standardized smart home automation, high-capacity solar inverter systems, and state-of-the-art water purification integrated into all homes.'
    },
    {
      icon: 'ri-seedling-line',
      title: 'Sustainable Investments, Lasting Value',
      desc: 'High-capital-appreciation assets designed to generate strong rental yields, withstand climate elements, and appreciate for generations.'
    }
  ];
}
