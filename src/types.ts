export interface LeadData {
  brideName: string;
  groomName: string;
  phoneNumber: string;
  weddingDate: string;
  budget: string;
  weddingType: 'Arranged' | 'Love';
  guestCount: string;
  planningPreference: string;
  city: string;
  inspirationFiles?: FileList;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface VenueCategory {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface DecorationStyle {
  id: string;
  name: string;
  image: string;
}
