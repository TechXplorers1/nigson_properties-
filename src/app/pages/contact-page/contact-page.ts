import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from '../../components/contact/contact';
import { InquiryComponent } from '../../components/inquiry/inquiry';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, ContactComponent, InquiryComponent],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css'
})
export class ContactPageComponent {}
