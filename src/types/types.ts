export interface Apartment {
  _id?: string;
  name?: string;
  image?: string;
  size?: number;
  pricePerDay?: number;
  description?: string;
  capacity?: number;
  bookings?: Booking[];
}

export interface Booking {
  _id: string;
  apartmentId: string;
  checkIn: Date;
  checkOut: Date;
  in?: Date ;
  out?: Date
  guestName: string;
  guests: number;
}
