export type PropertyCategory = 'construction' | 'management' | 'sales';

export type PropertyStatus = 
  | 'Completed & Sold Out' 
  | 'Available for Sale' 
  | 'Ongoing Development' 
  | 'Sold Out';

export type PropertyPurpose = 'sale' | 'completed';

export interface Amenity {
  icon: string;
  label: string;
}

export type PropertyType = 
  | 'Duplex' 
  | 'Semi-Detached Duplex' 
  | 'Fully Detached Duplex' 
  | 'Apartment' 
  | 'Penthouse' 
  | 'Terrace' 
  | 'Townhouse' 
  | 'Villa' 
  | 'Mansionette' 
  | 'Mansion' 
  | 'Bungalow' 
  | 'Studio Apartment' 
  | 'Commercial Space' 
  | 'Residential Land'
  | string;

export const AVAILABLE_PROPERTY_TYPES: string[] = [
  'Duplex',
  'Semi-Detached Duplex',
  'Fully Detached Duplex',
  'Apartment',
  'Penthouse',
  'Terrace',
  'Townhouse',
  'Villa',
  'Mansionette',
  'Mansion',
  'Bungalow',
  'Studio Apartment',
  'Commercial Space',
  'Residential Land'
];

export interface Property {
  id: string;
  title: string;
  slug: string;
  location: string;
  neighborhoodArea: string;
  category: PropertyCategory;
  categoryLabel: string;
  status: PropertyStatus;
  purpose: PropertyPurpose;
  price: string;
  numericPrice: number; // For filtering
  priceSubtext?: string;
  units: number;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  size: string;
  featured: boolean;
  heroImage: string;
  gallery: string[];
  description: string;
  features: string[];
  amenities: Amenity[];
  neighborhoodHighlights: string[];
  specifications: Record<string, string>;
  address?: string;
  videoUrl?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  image: string;
  highlights: string[];
  deliverables: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  propertyOrProject: string;
  avatar: string;
  rating: number;
  quote: string;
  clientType: 'Homeowner' | 'Diaspora Investor' | 'Tenant' | 'Property Landlord';
}

export interface TeamMember {
  name: string;
  title: string;
  roleDescription: string;
  image: string;
  credentials?: string;
}

export interface ProjectSummary {
  name: string;
  location: string;
  units: number;
  status: string;
  category: string;
  image: string;
  completionYear: string;
}

export interface InspectionRequest {
  id?: string;
  propertyId: string;
  propertyTitle: string;
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  tourType: 'In-Person' | 'Virtual Video Tour';
  clientRole: 'Buyer' | 'Investor' | 'Tenant' | 'Representative';
  notes?: string;
  createdAt?: Date;
}

export interface PropertyInquiry {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  propertyInterestedIn: string;
  inquiryType: 'Buy' | 'Property Management' | 'Investment' | 'General Inquiry';
  budgetRange?: string;
  preferredInspectionDate?: string;
  message: string;
  createdAt?: Date;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'All' | 'Exterior' | 'Interiors' | 'Living' | 'Kitchen' | 'Amenities';
  image: string;
  description: string;
}

export interface ShortStayProperty {
  id: string;
  title: string;
  slug: string;
  location: string;
  area: 'Lekki Phase 1' | 'Ikoyi' | 'Victoria Island' | 'Banana Island' | 'Ologolo, Lekki';
  propertyType: 'Luxury Penthouse' | 'Waterfront Villa' | 'Executive Suite' | 'Serviced Apartment' | 'Beachfront Maisonette';
  pricePerNight: number;
  priceFormatted: string;
  weeklyDiscountPercent: number;
  monthlyDiscountPercent: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  rating: number;
  reviewCount: number;
  isInstantBook: boolean;
  isSuperhost: boolean;
  heroImage: string;
  gallery: string[];
  description: string;
  amenities: Amenity[];
  houseRules: string[];
  checkInTime: string;
  checkOutTime: string;
  cleaningFee: number;
  securityDeposit: number;
  available: boolean;
}

export interface ShortStayBooking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  clientName: string;
  email: string;
  phone: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  guestsCount: number;
  nightlyRate: number;
  totalAccommodation: number;
  cleaningFee: number;
  securityDeposit: number;
  totalAmount: number;
  specialRequests?: string;
  airportPickup?: boolean;
  chefService?: boolean;
  status: 'Confirmed' | 'Pending Payment' | 'Under Review' | 'Checked-In' | 'Completed' | 'Cancelled';
  paymentMethod?: 'Card' | 'Bank Transfer' | 'USSD' | 'Paystack' | string;
  paymentReference?: string;
  paymentStatus?: 'Paid' | 'Pending' | 'Failed';
  paidAt?: string;
  createdAt: string;
}
