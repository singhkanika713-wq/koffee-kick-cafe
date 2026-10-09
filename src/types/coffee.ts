export type BrewStep = 'grind' | 'saturate' | 'extract' | 'sip';

export interface BeanProfile {
  id: string;
  name: string;
  origin: string;
  altitude: string;
  process: string;
  roastLevel: string;
  flavorNotes: string[];
  description: string;
  colorHex: string;
  cremaColor: string;
}

export type MenuCategory = 'coldcoffee' | 'hotbrew' | 'burgers' | 'sandwiches' | 'snacks';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number; // in INR (₹)
  description: string;
  beanOrigin?: string;
  notes: string[];
  caffeine?: string;
  volume: string;
  imageUrl: string;
  dietary?: string[];
  isVeg?: boolean;
  popular?: boolean;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  milkChoice?: string;
  sweetness?: string;
  temperature?: 'Hot' | 'Iced';
  extraShot?: boolean;
  notes?: string;
}

export interface ReservationData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: string;
  specialRequests?: string;
  timestamp: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  rating: number;
  comment: string;
  favoriteOrder: string;
  date: string;
  avatarUrl?: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption: string;
}
