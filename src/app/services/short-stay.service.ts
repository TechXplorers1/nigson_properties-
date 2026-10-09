import { Injectable, signal, inject } from '@angular/core';
import { ShortStayProperty, ShortStayBooking, Amenity } from '../models/property.model';
import { AdminService } from './admin.service';
import { PropertyService } from './property.service';

const SHORT_STAY_KEY = 'nigson_short_stay_properties';
const BOOKINGS_KEY = 'nigson_short_stay_bookings';

@Injectable({
  providedIn: 'root'
})
export class ShortStayService {
  private adminService = inject(AdminService);
  private propertyService = inject(PropertyService);

  private readonly seedShortStays: ShortStayProperty[] = [
    {
      id: 'stay-01',
      title: 'The Grand Horizon Waterfront Penthouse',
      slug: 'grand-horizon-waterfront-penthouse-lekki',
      location: 'Admiralty Way, Lekki Phase 1, Lagos',
      area: 'Lekki Phase 1',
      propertyType: 'Luxury Penthouse',
      pricePerNight: 180000,
      priceFormatted: '₦180,000',
      weeklyDiscountPercent: 12,
      monthlyDiscountPercent: 25,
      bedrooms: 3,
      bathrooms: 3.5,
      maxGuests: 6,
      rating: 4.98,
      reviewCount: 52,
      isInstantBook: true,
      isSuperhost: true,
      heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'An executive penthouse masterpiece commanding unobstructed panoramic views of the Lekki-Ikoyi Link Bridge and Lagos lagoon. Features custom Italian marble finishes, private rooftop dip pool, high-speed Starlink internet, Bang & Olufsen audio, and 24/7 solar-backed uninterrupted clean power.',
      amenities: [
        { icon: 'ri-sun-cloudy-line', label: '24/7 Solar & Inverter' },
        { icon: 'ri-wifi-line', label: 'Starlink High-Speed WiFi' },
        { icon: 'ri-drop-line', label: 'Private Rooftop Plunge Pool' },
        { icon: 'ri-tv-line', label: '85" 4K Smart Cinema TV' },
        { icon: 'ri-shield-check-line', label: '24/7 Gated Security & CCTV' },
        { icon: 'ri-restaurant-line', label: 'Fully Equipped Chef Kitchen' },
        { icon: 'ri-car-line', label: '2 Covered Reserved Parking' },
        { icon: 'ri-sparkling-line', label: 'Daily Executive Housekeeping' }
      ],
      houseRules: [
        'Check-in: 2:00 PM – 10:00 PM',
        'Check-out: 11:00 AM',
        'No smoking indoors (balconies permitted)',
        'No unauthorized loud parties or commercial filming without permit',
        'Valid Government ID required at check-in'
      ],
      checkInTime: '2:00 PM',
      checkOutTime: '11:00 AM',
      cleaningFee: 25000,
      securityDeposit: 50000,
      available: true
    },
    {
      id: 'stay-02',
      title: 'The Sovereign Presidential Suite, Ikoyi',
      slug: 'sovereign-presidential-suite-ikoyi',
      location: 'Cooper Road, Old Ikoyi, Lagos',
      area: 'Ikoyi',
      propertyType: 'Executive Suite',
      pricePerNight: 280000,
      priceFormatted: '₦280,000',
      weeklyDiscountPercent: 15,
      monthlyDiscountPercent: 30,
      bedrooms: 4,
      bathrooms: 4.5,
      maxGuests: 8,
      rating: 4.99,
      reviewCount: 38,
      isInstantBook: false,
      isSuperhost: true,
      heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'Nestled in the prestigious diplomatic enclave of Ikoyi, this expansive 4-bedroom sanctuary offers absolute privacy, biometric private lift access, Olympic-standard lap pool, private gym, and 24/7 armed diplomatic security patrol.',
      amenities: [
        { icon: 'ri-shield-star-line', label: 'Diplomatic Armed Security' },
        { icon: 'ri-building-line', label: 'Private Elevator Access' },
        { icon: 'ri-sun-line', label: '100% Uninterrupted Power' },
        { icon: 'ri-dvd-line', label: 'Private Acoustics Cinema Room' },
        { icon: 'ri-drop-line', label: 'Olympic Pool & Cabana' },
        { icon: 'ri-football-line', label: 'Private Wellness Gym' },
        { icon: 'ri-user-star-line', label: 'Private Chauffeur on Request' },
        { icon: 'ri-cup-line', label: 'Complimentary Nespresso Bar' }
      ],
      houseRules: [
        'Check-in: 3:00 PM',
        'Check-out: 12:00 PM',
        'Quiet hours from 10:00 PM',
        'Diplomatic protocol and access registration at main estate gate',
        'Refundable caution deposit required before check-in'
      ],
      checkInTime: '3:00 PM',
      checkOutTime: '12:00 PM',
      cleaningFee: 35000,
      securityDeposit: 100000,
      available: true
    },
    {
      id: 'stay-03',
      title: 'Banana Island Royal Water Villa',
      slug: 'banana-island-royal-water-villa',
      location: 'Ocean Drive, Banana Island, Ikoyi',
      area: 'Banana Island',
      propertyType: 'Waterfront Villa',
      pricePerNight: 450000,
      priceFormatted: '₦450,000',
      weeklyDiscountPercent: 10,
      monthlyDiscountPercent: 20,
      bedrooms: 5,
      bathrooms: 6,
      maxGuests: 10,
      rating: 5.0,
      reviewCount: 29,
      isInstantBook: false,
      isSuperhost: true,
      heroImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'Lagos most exclusive short stay address. Featuring a private boat jetty, infinity pool directly suspended over the marina, 2 ensuite servant quarters, cinema room, wine cellar, and on-demand yacht cruise concierge.',
      amenities: [
        { icon: 'ri-anchor-line', label: 'Private Yacht Boat Jetty' },
        { icon: 'ri-drop-line', label: 'Lagoon Infinity Pool' },
        { icon: 'ri-movie-line', label: '12-Seater Private Cinema' },
        { icon: 'ri-shield-keyhole-line', label: 'Triple-Layer Island Security' },
        { icon: 'ri-car-line', label: '4-Car Underground Garage' },
        { icon: 'ri-wifi-line', label: 'Ultra High-Speed Gigabit Fiber' },
        { icon: 'ri-service-line', label: 'Full Butler & Maid Service' },
        { icon: 'ri-goblet-line', label: 'Private Bar & Wine Lounge' }
      ],
      houseRules: [
        'Check-in: 3:00 PM',
        'Check-out: 12:00 PM',
        'Guest manifest must be provided 24 hours prior to arrival for gate pass',
        'Strictly maximum 10 overnight guests'
      ],
      checkInTime: '3:00 PM',
      checkOutTime: '12:00 PM',
      cleaningFee: 50000,
      securityDeposit: 150000,
      available: true
    },
    {
      id: 'stay-04',
      title: 'The White Sand Beachfront Maisonette',
      slug: 'white-sand-beachfront-maisonette-ologolo',
      location: 'Opposite Whitesand Beach, Ologolo, Lekki',
      area: 'Ologolo, Lekki',
      propertyType: 'Beachfront Maisonette',
      pricePerNight: 140000,
      priceFormatted: '₦140,000',
      weeklyDiscountPercent: 15,
      monthlyDiscountPercent: 25,
      bedrooms: 3,
      bathrooms: 3,
      maxGuests: 6,
      rating: 4.96,
      reviewCount: 64,
      isInstantBook: true,
      isSuperhost: true,
      heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'Crafted with signature Nigson craftsmanship opposite Whitesand Beach. Offers fresh coastal breezes, private cinema room, outdoor barbecue gazebo, automated access control, and 100% solar and soundproof backup power.',
      amenities: [
        { icon: 'ri-sun-line', label: 'Solar & Inverter Guarantee' },
        { icon: 'ri-sailboat-line', label: 'Beachside Stroll Access' },
        { icon: 'ri-film-line', label: 'Private Cinema Room' },
        { icon: 'ri-fire-line', label: 'Outdoor BBQ Gazebo' },
        { icon: 'ri-wifi-line', label: 'High-Speed Broadband WiFi' },
        { icon: 'ri-car-line', label: 'Private 3-Car Parking' }
      ],
      houseRules: [
        'Check-in: 2:00 PM',
        'Check-out: 11:00 AM',
        'No smoking inside',
        'Pets considered on request'
      ],
      checkInTime: '2:00 PM',
      checkOutTime: '11:00 AM',
      cleaningFee: 20000,
      securityDeposit: 40000,
      available: true
    },
    {
      id: 'stay-05',
      title: 'Eko Pearl Marina Serviced Apartment',
      slug: 'eko-pearl-marina-serviced-apartment',
      location: 'Eko Atlantic Marina Promenade, Victoria Island',
      area: 'Victoria Island',
      propertyType: 'Serviced Apartment',
      pricePerNight: 220000,
      priceFormatted: '₦220,000',
      weeklyDiscountPercent: 12,
      monthlyDiscountPercent: 22,
      bedrooms: 2,
      bathrooms: 2.5,
      maxGuests: 4,
      rating: 4.97,
      reviewCount: 43,
      isInstantBook: true,
      isSuperhost: true,
      heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'Ultra-modern living high above the Atlantic coast. Floor-to-ceiling double-glazed soundproof glass, direct views of the Atlantic Ocean and marina yacht promenade, Olympic pool, tennis courts, and 24/7 business concierge.',
      amenities: [
        { icon: 'ri-water-flash-line', label: 'Panoramic Ocean Views' },
        { icon: 'ri-drop-line', label: 'Infinity Swimming Pool' },
        { icon: 'ri-basketball-line', label: 'Tennis Courts & Gym' },
        { icon: 'ri-shield-user-line', label: 'Eko Atlantic Security Perimeter' },
        { icon: 'ri-wifi-line', label: 'Fiber Optic Gigabit Internet' },
        { icon: 'ri-restaurant-2-line', label: 'Promenade Dining at Doorstep' }
      ],
      houseRules: [
        'Check-in: 2:00 PM',
        'Check-out: 11:00 AM',
        'Access card required for elevator',
        'No smoking inside the apartment'
      ],
      checkInTime: '2:00 PM',
      checkOutTime: '11:00 AM',
      cleaningFee: 25000,
      securityDeposit: 60000,
      available: true
    },
    {
      id: 'stay-06',
      title: 'The Signature Lekki Phase 1 Terrace Suite',
      slug: 'signature-lekki-phase-1-terrace-suite',
      location: 'Oladimeji Alo Street, Lekki Phase 1, Lagos',
      area: 'Lekki Phase 1',
      propertyType: 'Executive Suite',
      pricePerNight: 120000,
      priceFormatted: '₦120,000',
      weeklyDiscountPercent: 15,
      monthlyDiscountPercent: 28,
      bedrooms: 2,
      bathrooms: 2,
      maxGuests: 4,
      rating: 4.95,
      reviewCount: 71,
      isInstantBook: true,
      isSuperhost: true,
      heroImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'Conveniently situated right beside Nigson Properties Corporate Headquarters in Lekki Phase 1. Walking distance to upscale restaurants, bistros, and Lekki Colosseum. Ideal for short business assignments, diaspora holiday stays, and executive retreats.',
      amenities: [
        { icon: 'ri-sun-line', label: '24/7 Uninterrupted Power' },
        { icon: 'ri-wifi-line', label: 'Fiber High-Speed WiFi' },
        { icon: 'ri-tv-line', label: 'Smart TV with Netflix & DSTV' },
        { icon: 'ri-sparkling-line', label: 'Daily Housekeeping' },
        { icon: 'ri-car-line', label: 'Secure Gated Parking' },
        { icon: 'ri-shopping-bag-line', label: 'Steps from Lekki 1 Restaurants' }
      ],
      houseRules: [
        'Check-in: 2:00 PM',
        'Check-out: 12:00 PM',
        'No smoking inside',
        'Government ID required for registration'
      ],
      checkInTime: '2:00 PM',
      checkOutTime: '12:00 PM',
      cleaningFee: 15000,
      securityDeposit: 30000,
      available: true
    }
  ];

  public shortStays = signal<ShortStayProperty[]>(this.loadProperties());
  public bookings = signal<ShortStayBooking[]>(this.loadBookings());

  constructor() {}

  private loadProperties(): ShortStayProperty[] {
    if (typeof window === 'undefined') return this.seedShortStays;
    try {
      const data = localStorage.getItem(SHORT_STAY_KEY);
      return data ? JSON.parse(data) : this.seedShortStays;
    } catch {
      return this.seedShortStays;
    }
  }

  private loadBookings(): ShortStayBooking[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(BOOKINGS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private persistBookings(items: ShortStayBooking[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to persist bookings', e);
    }
  }

  public getPropertyById(id: string): ShortStayProperty | undefined {
    return this.shortStays().find(p => p.id === id);
  }

  // -------------------------------------------------------------
  // DOUBLE-BOOKING CONFLICT PREVENTION (Phase 1 Definition of Done)
  // -------------------------------------------------------------
  public isDateRangeAvailable(propertyId: string, checkIn: string, checkOut: string, excludeBookingId?: string): boolean {
    if (!checkIn || !checkOut) return true;
    const requestedStart = new Date(checkIn).getTime();
    const requestedEnd = new Date(checkOut).getTime();
    if (isNaN(requestedStart) || isNaN(requestedEnd) || requestedEnd <= requestedStart) return false;

    // Check all active reservations (Confirmed or Pending Payment)
    const activeReservations = this.bookings().filter(b => 
      b.propertyId === propertyId && 
      b.status !== 'Cancelled' &&
      (!excludeBookingId || b.id !== excludeBookingId)
    );

    for (const b of activeReservations) {
      const existingStart = new Date(b.checkInDate).getTime();
      const existingEnd = new Date(b.checkOutDate).getTime();
      // Date overlap condition: (StartA < EndB) and (EndA > StartB)
      if (requestedStart < existingEnd && requestedEnd > existingStart) {
        return false; // Conflicting confirmed reservation detected
      }
    }
    return true;
  }

  public getBookedDateRanges(propertyId: string): { start: string; end: string; id: string; clientName: string }[] {
    return this.bookings()
      .filter(b => b.propertyId === propertyId && b.status !== 'Cancelled')
      .map(b => ({ start: b.checkInDate, end: b.checkOutDate, id: b.id, clientName: b.clientName }));
  }

  // -------------------------------------------------------------
  // SHORT-STAY RESERVATION CREATION WITH TEMPORARY HOLD & DOUBLE-BOOKING GUARD
  // -------------------------------------------------------------
  public bookStay(bookingData: {
    propertyId: string;
    clientName: string;
    email: string;
    phone: string;
    checkInDate: string;
    checkOutDate: string;
    guestsCount: number;
    specialRequests?: string;
    airportPickup?: boolean;
    chefService?: boolean;
    paymentMethod?: string;
  }): { success: boolean; booking?: ShortStayBooking; error?: string } {
    const prop = this.getPropertyById(bookingData.propertyId) || this.shortStays()[0];

    // Double-booking check
    if (!this.isDateRangeAvailable(prop.id, bookingData.checkInDate, bookingData.checkOutDate)) {
      return {
        success: false,
        error: `Conflicting Reservation: "${prop.title}" is already booked for the selected dates. Please select alternative dates.`
      };
    }
    
    // Calculate nights
    const start = new Date(bookingData.checkInDate);
    const end = new Date(bookingData.checkOutDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24))) || 1;

    // Calculate rates and discounts
    let nightlyRate = prop.pricePerNight;
    if (nights >= 30) {
      nightlyRate = Math.round(nightlyRate * (1 - prop.monthlyDiscountPercent / 100));
    } else if (nights >= 7) {
      nightlyRate = Math.round(nightlyRate * (1 - prop.weeklyDiscountPercent / 100));
    }

    const accommodationSubtotal = nightlyRate * nights;
    let addOns = 0;
    if (bookingData.airportPickup) addOns += 35000;
    if (bookingData.chefService) addOns += 50000;

    const totalAmount = accommodationSubtotal + prop.cleaningFee + prop.securityDeposit + addOns;
    const bookingId = 'NIG-STAY-' + Math.floor(1000 + Math.random() * 9000);

    const newBooking: ShortStayBooking = {
      id: bookingId,
      propertyId: prop.id,
      propertyTitle: prop.title,
      propertyImage: prop.heroImage,
      clientName: bookingData.clientName.trim(),
      email: bookingData.email.trim(),
      phone: bookingData.phone.trim(),
      checkInDate: bookingData.checkInDate,
      checkOutDate: bookingData.checkOutDate,
      nights,
      guestsCount: bookingData.guestsCount,
      nightlyRate,
      totalAccommodation: accommodationSubtotal,
      cleaningFee: prop.cleaningFee,
      securityDeposit: prop.securityDeposit,
      totalAmount,
      specialRequests: bookingData.specialRequests?.trim(),
      airportPickup: bookingData.airportPickup,
      chefService: bookingData.chefService,
      status: 'Pending Payment',
      paymentMethod: bookingData.paymentMethod || 'Card',
      paymentStatus: 'Pending',
      createdAt: new Date().toISOString()
    };

    // Store in active bookings
    const updated = [newBooking, ...this.bookings()];
    this.bookings.set(updated);
    this.persistBookings(updated);

    // Register into Admin Service Leads for real-time Executive Dashboard tracking!
    this.adminService.addLead({
      category: 'booking-details',
      categoryLabel: 'Booking Details',
      clientName: newBooking.clientName,
      email: newBooking.email,
      phone: newBooking.phone,
      subjectOrProperty: `${prop.title} (${nights} Nights · ₦${totalAmount.toLocaleString()})`,
      details: `Dates: ${bookingData.checkInDate} to ${bookingData.checkOutDate} (${nights} nights). Guests: ${bookingData.guestsCount}. Airport Pickup: ${bookingData.airportPickup ? 'YES' : 'NO'}. Chef: ${bookingData.chefService ? 'YES' : 'NO'}. Special Requests: ${bookingData.specialRequests || 'None'}. Reference: ${bookingId}`,
      status: 'New',
      priority: 'High',
      budgetOrValue: `₦${totalAmount.toLocaleString()}`,
      notes: `Booking ID: ${bookingId}. Nightly rate applied: ₦${nightlyRate.toLocaleString()}. Cleaning fee: ₦${prop.cleaningFee.toLocaleString()}. Deposit: ₦${prop.securityDeposit.toLocaleString()}.`
    });

    return { success: true, booking: newBooking };
  }

  // -------------------------------------------------------------
  // NIGERIAN GATEWAY PAYMENT PROCESSING (Controlled Failure / Retry Handling)
  // -------------------------------------------------------------
  public processBookingPayment(
    bookingId: string, 
    paymentMethod: 'Card' | 'Bank Transfer' | 'USSD' | 'Paystack', 
    simulateFailure: boolean = false
  ): { success: boolean; paymentReference?: string; error?: string } {
    const booking = this.bookings().find(b => b.id === bookingId);
    if (!booking) return { success: false, error: 'Booking reservation not found.' };

    if (simulateFailure) {
      // Simulate controlled payment failure / card decline (Appendix A DoD requirement)
      const updated = this.bookings().map(b => 
        b.id === bookingId ? { ...b, paymentStatus: 'Failed' as const } : b
      );
      this.bookings.set(updated);
      this.persistBookings(updated);

      return {
        success: false,
        error: 'Payment Authorization Declined: Insufficient balance or bank security check. Please retry with a valid card or choose Direct Bank Transfer.'
      };
    }

    // Success transaction
    const paymentRef = 'PAY-NG-' + Math.floor(100000 + Math.random() * 900000);
    const updated = this.bookings().map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'Confirmed' as const,
          paymentMethod,
          paymentReference: paymentRef,
          paymentStatus: 'Paid' as const,
          paidAt: new Date().toISOString()
        };
      }
      return b;
    });

    this.bookings.set(updated);
    this.persistBookings(updated);

    this.propertyService.showToast(
      'Reservation Confirmed!',
      `Transaction ${paymentRef} successful. VIP reservation confirmed for ${booking.propertyTitle}.`,
      'success'
    );

    return { success: true, paymentReference: paymentRef };
  }

  // -------------------------------------------------------------
  // STAFF BOOKING LIFECYCLE MANAGEMENT (Phase 1 Staff Operations)
  // -------------------------------------------------------------
  public updateBookingStatus(id: string, status: ShortStayBooking['status']): void {
    const updated = this.bookings().map(b => b.id === id ? { ...b, status } : b);
    this.bookings.set(updated);
    this.persistBookings(updated);
    this.propertyService.showToast('Booking Updated', `Reservation ${id} status set to ${status}.`, 'info');
  }

  public cancelBooking(id: string, reason: string = 'Client cancellation'): void {
    const updated = this.bookings().map(b => 
      b.id === id ? { ...b, status: 'Cancelled' as const, specialRequests: `${b.specialRequests || ''} [Cancelled: ${reason}]` } : b
    );
    this.bookings.set(updated);
    this.persistBookings(updated);
    this.propertyService.showToast('Reservation Cancelled', `Reservation ${id} released.`, 'info');
  }

  public togglePropertyAvailability(id: string): void {
    const updated = this.shortStays().map(p => 
      p.id === id ? { ...p, available: !p.available } : p
    );
    this.shortStays.set(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(SHORT_STAY_KEY, JSON.stringify(updated));
    }
    const prop = updated.find(p => p.id === id);
    this.propertyService.showToast(
      'Availability Updated', 
      `${prop?.title} is now ${prop?.available ? 'Available' : 'Set to Maintenance Hold'}.`, 
      'info'
    );
  }

  // -------------------------------------------------------------
  // SHORT-STAY INVENTORY MANAGEMENT (ADD / EDIT / DELETE)
  // -------------------------------------------------------------
  public addShortStay(property: Omit<ShortStayProperty, 'id' | 'priceFormatted'> & { id?: string }): ShortStayProperty {
    const newId = property.id || 'stay-' + Date.now().toString().slice(-4);
    const newStay: ShortStayProperty = {
      ...property,
      id: newId,
      slug: property.slug || property.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      available: property.available ?? true,
      rating: property.rating || 5.0,
      reviewCount: property.reviewCount || 1,
      isInstantBook: property.isInstantBook ?? true,
      isSuperhost: property.isSuperhost ?? true,
      priceFormatted: `₦${property.pricePerNight.toLocaleString()}`,
      weeklyDiscountPercent: property.weeklyDiscountPercent ?? 10,
      monthlyDiscountPercent: property.monthlyDiscountPercent ?? 20,
      cleaningFee: property.cleaningFee ?? 25000,
      securityDeposit: property.securityDeposit ?? 50000,
      checkInTime: property.checkInTime || '2:00 PM',
      checkOutTime: property.checkOutTime || '11:00 AM',
      houseRules: property.houseRules?.length ? property.houseRules : [
        'Check-in: 2:00 PM – 10:00 PM',
        'Check-out: 11:00 AM',
        'No smoking indoors (balconies permitted)',
        'Valid Government ID required at check-in'
      ],
      gallery: property.gallery?.length ? property.gallery : [property.heroImage]
    };

    const updated = [newStay, ...this.shortStays()];
    this.shortStays.set(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(SHORT_STAY_KEY, JSON.stringify(updated));
    }
    this.propertyService.showToast(
      'Short-Stay Added!', 
      `"${newStay.title}" has been published to live short-stay inventory.`, 
      'success'
    );
    return newStay;
  }

  public updateShortStay(id: string, updates: Partial<ShortStayProperty>): void {
    const updated = this.shortStays().map(p => {
      if (p.id === id) {
        const merged = { ...p, ...updates };
        if (updates.pricePerNight) {
          merged.priceFormatted = `₦${updates.pricePerNight.toLocaleString()}`;
        }
        return merged;
      }
      return p;
    });
    this.shortStays.set(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(SHORT_STAY_KEY, JSON.stringify(updated));
    }
    this.propertyService.showToast('Short-Stay Updated', `Short-stay details updated successfully.`, 'success');
  }

  public deleteShortStay(id: string): void {
    const prop = this.shortStays().find(p => p.id === id);
    const updated = this.shortStays().filter(p => p.id !== id);
    this.shortStays.set(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(SHORT_STAY_KEY, JSON.stringify(updated));
    }
    this.propertyService.showToast('Short-Stay Removed', `"${prop?.title || id}" removed from active inventory.`, 'info');
  }

  public getWhatsAppBookingLink(booking: ShortStayBooking): string {
    const text = `Hello Nigson Properties Concierge, I have reserved a luxury short stay:
*Property:* ${booking.propertyTitle}
*Booking Ref:* ${booking.id}
*Payment Ref:* ${booking.paymentReference || 'Pending verification'}
*Guest:* ${booking.clientName}
*Dates:* ${booking.checkInDate} to ${booking.checkOutDate} (${booking.nights} Nights)
*Guests:* ${booking.guestsCount}
*Total Paid/Due:* ₦${booking.totalAmount.toLocaleString()}
Please confirm check-in access instructions. Thank you!`;
    return `https://wa.me/2348073467809?text=${encodeURIComponent(text)}`;
  }

  public getWhatsAppDirectInquiryLink(propertyTitle: string): string {
    const text = `Hello Nigson Properties, I am interested in inquiring about the availability of your short stay property: *${propertyTitle}*. Please provide rates, availability calendar, and booking details.`;
    return `https://wa.me/2348073467809?text=${encodeURIComponent(text)}`;
  }
}
