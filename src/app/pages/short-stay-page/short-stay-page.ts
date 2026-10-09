import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ShortStayService } from '../../services/short-stay.service';
import { PropertyService } from '../../services/property.service';
import { AdminService } from '../../services/admin.service';
import { ShortStayProperty, ShortStayBooking } from '../../models/property.model';

@Component({
  selector: 'app-short-stay-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './short-stay-page.html',
  styleUrl: './short-stay-page.css'
})
export class ShortStayPageComponent implements OnInit {
  public shortStayService = inject(ShortStayService);
  public propertyService = inject(PropertyService);
  public adminService = inject(AdminService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Filters
  public selectedArea = signal<string>('all');
  public selectedType = signal<string>('all');
  public selectedGuests = signal<number>(0);
  public maxPriceFilter = signal<number>(500000);
  public searchQuery = signal<string>('');

  // Selected Property for Details Modal
  public selectedProperty = signal<ShortStayProperty | null>(null);
  public activeGalleryImage = signal<string>('');

  // Booking Modal State
  public isBookingModalOpen = signal<boolean>(false);
  public bookingProperty = signal<ShortStayProperty | null>(null);
  public bookingSuccess = signal<ShortStayBooking | null>(null);
  public bookingStep = signal<'details' | 'payment' | 'confirmation'>('details');
  public selectedPaymentMethod = signal<'Card' | 'Bank Transfer' | 'USSD' | 'Paystack'>('Card');
  public paymentError = signal<string | null>(null);
  public isProcessingPayment = signal<boolean>(false);

  // Booking Form Fields
  public bookCheckIn = signal<string>('');
  public bookCheckOut = signal<string>('');
  public bookGuests = signal<number>(2);
  public bookClientName = signal<string>('');
  public bookEmail = signal<string>('');
  public bookPhone = signal<string>('');
  public bookSpecialRequests = signal<string>('');
  public bookAirportPickup = signal<boolean>(false);
  public bookChefService = signal<boolean>(false);

  // Live double booking conflict check
  public isCurrentDatesAvailable = computed(() => {
    const prop = this.bookingProperty();
    if (!prop) return true;
    const inDate = this.bookCheckIn();
    const outDate = this.bookCheckOut();
    if (!inDate || !outDate) return true;
    return this.shortStayService.isDateRangeAvailable(prop.id, inDate, outDate);
  });



  ngOnInit(): void {
    // Set default dates: check-in tomorrow, check-out in 4 days
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const checkout = new Date();
    checkout.setDate(checkout.getDate() + 4);

    this.bookCheckIn.set(tomorrow.toISOString().split('T')[0]);
    this.bookCheckOut.set(checkout.toISOString().split('T')[0]);

    // Check if query params have a specific property
    this.route.queryParams.subscribe(params => {
      if (params['prop']) {
        const p = this.shortStayService.shortStays().find(item => item.id === params['prop'] || item.slug === params['prop']);
        if (p) {
          this.openDetailsModal(p);
        }
      }
      if (params['area']) {
        this.selectedArea.set(params['area']);
      }
    });
  }

  // Filtered Properties
  public filteredShortStays = computed(() => {
    let list = this.shortStayService.shortStays();
    const area = this.selectedArea();
    const type = this.selectedType();
    const guests = this.selectedGuests();
    const maxPrice = this.maxPriceFilter();
    const query = this.searchQuery().toLowerCase().trim();

    if (area !== 'all') {
      list = list.filter(p => p.area === area);
    }

    if (type !== 'all') {
      list = list.filter(p => p.propertyType === type);
    }

    if (guests > 0) {
      list = list.filter(p => p.maxGuests >= guests);
    }

    list = list.filter(p => p.pricePerNight <= maxPrice);

    if (query) {
      list = list.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.propertyType.toLowerCase().includes(query)
      );
    }

    return list;
  });

  // Calculate live booking totals
  public calculatedBookingNights = computed(() => {
    const inDate = this.bookCheckIn();
    const outDate = this.bookCheckOut();
    if (!inDate || !outDate) return 3;

    const start = new Date(inDate);
    const end = new Date(outDate);
    const diffTime = end.getTime() - start.getTime();
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  });

  public calculatedBookingTotal = computed(() => {
    const prop = this.bookingProperty();
    if (!prop) return 0;

    const nights = this.calculatedBookingNights();
    let nightly = prop.pricePerNight;

    if (nights >= 30) {
      nightly = Math.round(nightly * (1 - prop.monthlyDiscountPercent / 100));
    } else if (nights >= 7) {
      nightly = Math.round(nightly * (1 - prop.weeklyDiscountPercent / 100));
    }

    let addOns = 0;
    if (this.bookAirportPickup()) addOns += 35000;
    if (this.bookChefService()) addOns += 50000;

    return (nightly * nights) + prop.cleaningFee + prop.securityDeposit + addOns;
  });

  public resetFilters(): void {
    this.selectedArea.set('all');
    this.selectedType.set('all');
    this.selectedGuests.set(0);
    this.maxPriceFilter.set(500000);
    this.searchQuery.set('');
  }

  // Details Modal
  public openDetailsModal(prop: ShortStayProperty): void {
    this.selectedProperty.set(prop);
    this.activeGalleryImage.set(prop.heroImage);
  }

  public closeDetailsModal(): void {
    this.selectedProperty.set(null);
  }

  public switchGalleryImage(img: string): void {
    this.activeGalleryImage.set(img);
  }

  // Booking Modal
  public openBookingModal(prop: ShortStayProperty): void {
    this.bookingProperty.set(prop);
    this.bookingSuccess.set(null);
    this.bookingStep.set('details');
    this.paymentError.set(null);
    this.isProcessingPayment.set(false);
    this.isBookingModalOpen.set(true);

    // If details modal was open, close it
    this.selectedProperty.set(null);
  }

  public closeBookingModal(): void {
    this.isBookingModalOpen.set(false);
    this.bookingProperty.set(null);
    this.bookingSuccess.set(null);
    this.bookingStep.set('details');
    this.paymentError.set(null);
  }

  public proceedToPayment(): void {
    const prop = this.bookingProperty();
    if (!prop) return;

    if (!this.bookClientName().trim() || !this.bookEmail().trim() || !this.bookPhone().trim()) {
      this.propertyService.showToast('Required Fields', 'Please enter your name, email, and WhatsApp phone number.', 'error');
      return;
    }

    if (!this.bookCheckIn() || !this.bookCheckOut()) {
      this.propertyService.showToast('Dates Required', 'Please select valid check-in and check-out dates.', 'error');
      return;
    }

    if (!this.isCurrentDatesAvailable()) {
      this.propertyService.showToast(
        'Dates Conflict', 
        `"${prop.title}" is already reserved for the selected dates. Please adjust your calendar dates.`, 
        'error'
      );
      return;
    }

    // Create reservation hold (Pending Payment)
    const res = this.shortStayService.bookStay({
      propertyId: prop.id,
      clientName: this.bookClientName(),
      email: this.bookEmail(),
      phone: this.bookPhone(),
      checkInDate: this.bookCheckIn(),
      checkOutDate: this.bookCheckOut(),
      guestsCount: this.bookGuests(),
      specialRequests: this.bookSpecialRequests(),
      airportPickup: this.bookAirportPickup(),
      chefService: this.bookChefService(),
      paymentMethod: this.selectedPaymentMethod()
    });

    if (!res.success || !res.booking) {
      this.propertyService.showToast('Booking Conflict', res.error || 'Dates unavailable.', 'error');
      return;
    }

    this.bookingSuccess.set(res.booking);
    this.paymentError.set(null);
    this.bookingStep.set('payment');
  }

  public confirmPayment(simulateFailure: boolean = false): void {
    const booking = this.bookingSuccess();
    if (!booking) return;

    this.isProcessingPayment.set(true);
    this.paymentError.set(null);

    setTimeout(() => {
      this.isProcessingPayment.set(false);
      const res = this.shortStayService.processBookingPayment(booking.id, this.selectedPaymentMethod(), simulateFailure);

      if (!res.success) {
        this.paymentError.set(res.error || 'Payment authorization declined. Please retry or choose another method.');
      } else {
        // Fetch refreshed booking
        const refreshed = this.shortStayService.bookings().find(b => b.id === booking.id) || {
          ...booking,
          status: 'Confirmed' as const,
          paymentReference: res.paymentReference,
          paymentStatus: 'Paid' as const
        };
        this.bookingSuccess.set(refreshed);
        this.bookingStep.set('confirmation');
      }
    }, 1200);
  }

  public backToDetails(): void {
    this.bookingStep.set('details');
    this.paymentError.set(null);
  }

  public printReceipt(): void {
    if (typeof window !== 'undefined') {
      window.print();
    }
  }

  public getWhatsAppLink(booking: ShortStayBooking): string {
    return this.shortStayService.getWhatsAppBookingLink(booking);
  }

  public speakToAgent(prop?: ShortStayProperty): void {
    const title = prop ? prop.title : 'Luxury Short Stay in Lagos';
    window.open(this.shortStayService.getWhatsAppDirectInquiryLink(title), '_blank');
  }

  public requestInspection(prop?: ShortStayProperty): void {
    this.propertyService.openInspectionModal(prop ? {
      id: prop.id,
      title: prop.title,
      slug: prop.slug,
      location: prop.location,
      price: prop.priceFormatted
    } as any : undefined);
  }
}
