import { SanoOrder } from '../types';
import { PRODUCTS } from './products';

export interface TrackingStep {
  step: 'received' | 'confirmed' | 'packed' | 'dispatched' | 'delivered';
  title: string;
  description: string;
  time: string;
  completed: boolean;
  current: boolean;
}

export interface RiderInfo {
  name: string;
  phone: string;
  vehicle: string;
  currentLocationNote: string;
  eta: string;
}

export const SAMPLE_TRACKING_ORDERS: SanoOrder[] = [
  {
    orderId: 'SANO-8821',
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    items: [
      {
        product: PRODUCTS[0], // Maternity Body Pillow
        selectedVariant: 'Full Length (140 cm)',
        quantity: 1,
      },
      {
        product: PRODUCTS[1], // Nipple Balm
        selectedVariant: '50g Glass Jar',
        quantity: 1,
      }
    ],
    subtotalNPR: 4200,
    deliveryFeeNPR: 0,
    totalNPR: 4200,
    location: {
      latitude: 27.6792,
      longitude: 85.3114,
      accuracyMeters: 8,
      googleMapsUrl: 'https://maps.google.com/?q=27.6792,85.3114',
      cityArea: 'Jhamsikhel / Sanepa, Lalitpur',
      toleOrStreet: 'Near British School, House 24',
      landmark: 'Yellow boundary gate opposite organic cafe',
      provinceOrDistrict: 'Lalitpur',
      isGpsCaptured: true,
    },
    customer: {
      fullName: 'Pratima Shrestha',
      phone: '9841234567',
      paymentMethod: 'cod',
      noteForRider: 'Baby might be sleeping, please ring once or call before knocking.'
    },
    status: 'dispatched'
  },
  {
    orderId: 'SANO-7419',
    createdAt: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
    items: [
      {
        product: PRODUCTS[3], // Kimono Onesies
        selectedVariant: '0–3m (56–62 cm)',
        quantity: 2,
      }
    ],
    subtotalNPR: 4300,
    deliveryFeeNPR: 0,
    totalNPR: 4300,
    location: {
      latitude: 27.6915,
      longitude: 85.342,
      accuracyMeters: 12,
      googleMapsUrl: 'https://maps.google.com/?q=27.6915,85.342',
      cityArea: 'New Baneshwor, Kathmandu',
      toleOrStreet: 'Near Krishna Tower, Gali 3',
      landmark: 'Opposite Everest Bank ATM',
      provinceOrDistrict: 'Kathmandu',
      isGpsCaptured: true,
    },
    customer: {
      fullName: 'Bikash Adhikari',
      phone: '9851098765',
      paymentMethod: 'fonepay_qr',
    },
    status: 'confirmed'
  }
];

export const MOCK_RIDERS: RiderInfo[] = [
  {
    name: 'Ramesh Thapa',
    phone: '+977 980-112-3344',
    vehicle: 'Honda Shine (Ba 95 Pa 4412)',
    currentLocationNote: 'En route near Pulchowk / Kupondole',
    eta: 'Today between 1:30 PM – 3:30 PM'
  },
  {
    name: 'Suman Maharjan',
    phone: '+977 980-223-4455',
    vehicle: 'Hero Splendor (Ba 82 Pa 1198)',
    currentLocationNote: 'Sorting at Kathmandu Central Hub',
    eta: 'Tomorrow morning between 10:00 AM – 1:00 PM'
  }
];
