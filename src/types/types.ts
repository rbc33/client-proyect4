export interface Apartment {
  id?: string;
  name?: string;
  images?: string[];
  size?: number;
  price_per_day?: number;
  description?: string;
  capacity?: number;
  bookings?: Booking[];
}

export interface Booking {
  id: string;
  apartment_id: string;
  check_in: Date;
  check_out: Date;
  guest_name: string;
  guests?: number;
}
