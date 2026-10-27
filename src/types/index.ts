export type AgeStageId = 
  | 'pregnancy'
  | 'newborn'
  | 'infant'
  | 'toddler'
  | 'early_child'
  | 'middle_child'
  | 'teen';

export interface AgeStage {
  id: AgeStageId;
  label: string;
  ageRange: string;
  heightRange: string;
  description: string;
  badge: string;
}

export type CategoryId = 
  | 'all'
  | 'maternity_care'
  | 'baby_care'
  | 'apparel'
  | 'feeding'
  | 'sleep_nursery'
  | 'play_learning'
  | 'outdoor_safety';

export interface Category {
  id: CategoryId;
  name: string;
  iconName: string;
  description: string;
}

export interface ProductVariant {
  size: string; // e.g. "0–3m (56–62 cm)"
  inStock: boolean;
  stockCount: number;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  ageStage: AgeStageId;
  priceNPR: number;
  originalPriceNPR?: number;
  image: string;
  fallbackGradient: string;
  shortDescription: string;
  materials: string;
  washCare: string;
  deliveryTime: string;
  featured?: boolean;
  bestseller?: boolean;
  variants: ProductVariant[];
  highlights: string[];
}

export interface CartItem {
  product: Product;
  selectedVariant: string;
  quantity: number;
}

export interface PreciseLocation {
  latitude: number | null;
  longitude: number | null;
  accuracyMeters: number | null;
  googleMapsUrl: string;
  cityArea: string;
  toleOrStreet: string;
  landmark: string;
  provinceOrDistrict: string;
  isGpsCaptured: boolean;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  alternatePhone?: string;
  noteForRider?: string;
  isGift?: boolean;
  giftMessage?: string;
  paymentMethod: 'cod' | 'fonepay_qr' | 'esewa';
}

export interface SanoOrder {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  subtotalNPR: number;
  deliveryFeeNPR: number;
  totalNPR: number;
  location: PreciseLocation;
  customer: CustomerDetails;
  status: 'sent_to_whatsapp' | 'confirmed' | 'dispatched' | 'delivered';
}
