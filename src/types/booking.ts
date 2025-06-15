
export interface BookingData {
  // Step 1: Location
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;
  citiesToVisit?: string[];
  
  // Step 2: Car Selection
  carType: string;
  
  // Step 3: Additional Services
  hasPhoneLine?: boolean;
  hasTravelInsurance?: boolean;
  
  // Step 4: Personal Info
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  passengers: number;
  specialRequests: string;
  
  // Price calculation
  totalPrice: number;
}

export interface Location {
  id: string;
  name: string;
  nameEn: string;
  factor: number;
  city?: string;
}
