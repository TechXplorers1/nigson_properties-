import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from '../../components/contact/contact';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, ContactComponent],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css'
})
export class ContactPageComponent {}
