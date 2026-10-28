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
  | 'outdoor_safety'
  | 'hospital_bag'
  | 'gift_hampers'
  | 'diapering';

export interface Category {
  id: CategoryId;
  name: string;
  iconName: string;
  description: string;
  brandScope?: 'sano' | 'sano_care' | 'both';
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
  galleryImages?: string[];
  fallbackGradient: string;
  shortDescription: string;
  materials: string;
  washCare: string;
  deliveryTime: string;
  featured?: boolean;
  bestseller?: boolean;
  variants: ProductVariant[];
  highlights: string[];
  brand?: string;
  brandScope?: 'sano' | 'sano_care';
  hospitalBagPhase?: 'labour_delivery' | 'after_delivery' | 'for_baby';
  giftRecipient?: 'grandparents' | 'relatives' | 'friends_colleagues' | 'baby_shower';
}

export interface GrowthEntry {
  id: string;
  date: string; // YYYY-MM-DD
  heightCm: number;
  ageMonths?: number;
  note?: string;
}

export interface ChildProfile {
  id?: string;
  name?: string;
  birthDate?: string;
  dob?: string;
  gender?: 'all' | 'boy' | 'girl';
  heightCm?: number;
  bracketId?: string;
  heightLabel?: string;
  stageId?: AgeStageId;
  growthHistory?: GrowthEntry[];
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
