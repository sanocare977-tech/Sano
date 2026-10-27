import { Product } from '../types';

export interface DiaperProduct extends Product {
  brand: string;
  diaperType: 'pants' | 'tape' | 'cloth' | 'nighttime_older_kids' | 'swim';
  weightRangeKg: string;
  piecesPerPack: number;
  pricePerPieceNPR: number;
  absorptionHours: number;
  suitableAgeRange: string;
  features: string[];
}

export const DIAPER_PRODUCTS: DiaperProduct[] = [
  // --- MAMYPOKO ---
  {
    id: 'diaper-mp-m',
    name: 'MamyPoko Pants Extra Absorb (Medium, 6–11 kg)',
    category: 'baby_care',
    ageStage: 'infant',
    brand: 'MamyPoko',
    diaperType: 'pants',
    weightRangeKg: '6–11 kg',
    piecesPerPack: 72,
    priceNPR: 2150,
    originalPriceNPR: 2400,
    pricePerPieceNPR: 29.8,
    absorptionHours: 12,
    suitableAgeRange: '6–12 Months',
    image: '/src/assets/images/diaper_station_hero_1793081804891.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#E8E0D2]',
    shortDescription: 'Deep absorption crisscross sheet that prevents heaviness and leakage up to 12 hours.',
    materials: 'Breathable non-woven fabric, super absorbent polymer, cottony elastic waist',
    washCare: 'Single use disposable. Dispose responsibly.',
    deliveryTime: 'Arrives in 24–48 hours in Kathmandu Valley.',
    featured: true,
    bestseller: true,
    variants: [
      { size: 'Medium (6–11 kg) · 72 Pants', inStock: true, stockCount: 45 },
      { size: 'Twin Saver Pack (144 Pants)', inStock: true, stockCount: 20 }
    ],
    highlights: ['Crisscross absorbent sheet', 'Soft all-around elastic waistband', 'Wetness lock technology'],
    features: ['12hr Absorption', 'Crisscross Core', 'Comfort Waist']
  },
  {
    id: 'diaper-mp-l',
    name: 'MamyPoko Pants Extra Absorb (Large, 9–14 kg)',
    category: 'baby_care',
    ageStage: 'toddler',
    brand: 'MamyPoko',
    diaperType: 'pants',
    weightRangeKg: '9–14 kg',
    piecesPerPack: 64,
    priceNPR: 2150,
    originalPriceNPR: 2400,
    pricePerPieceNPR: 33.5,
    absorptionHours: 12,
    suitableAgeRange: '1–2 Years',
    image: '/src/assets/images/diaper_station_hero_1793081804891.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#E8E0D2]',
    shortDescription: 'Designed for active toddlers with high liquid intake. Leak-proof leg cuffs and soft stretchy sides.',
    materials: 'Hypoallergenic top layer, Japanese SAP core, stretchable polymers',
    washCare: 'Single use disposable.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    bestseller: true,
    variants: [
      { size: 'Large (9–14 kg) · 64 Pants', inStock: true, stockCount: 38 },
      { size: 'Jumbo Saver (128 Pants)', inStock: true, stockCount: 15 }
    ],
    highlights: ['Thigh leak protection', 'Prevents diaper redness', 'Easy tear-off sides for fast changing'],
    features: ['12hr Leak Guard', 'Anti-Redness Softness', 'Tear-off Sides']
  },
  {
    id: 'diaper-mp-xl',
    name: 'MamyPoko Pants All Night Absorb (XL, 12–17 kg)',
    category: 'baby_care',
    ageStage: 'toddler',
    brand: 'MamyPoko',
    diaperType: 'pants',
    weightRangeKg: '12–17 kg',
    piecesPerPack: 54,
    priceNPR: 2150,
    originalPriceNPR: 2350,
    pricePerPieceNPR: 39.8,
    absorptionHours: 14,
    suitableAgeRange: '2–4 Years',
    image: '/src/assets/images/diaper_station_hero_1793081804891.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#E8E0D2]',
    shortDescription: 'Nighttime specialized pants with 50% extra core absorption for undisturbed overnight sleep.',
    materials: 'Micro-porous breathable backsheet, polyacrylate absorbent gel',
    washCare: 'Single use disposable.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: 'XL (12–17 kg) · 54 Pants', inStock: true, stockCount: 30 }
    ],
    highlights: ['Overnight leak lock', 'Wide back coverage', 'Gentle on skin during cold Kathmandu nights'],
    features: ['14hr Night Lock', 'Wide Back Coverage', 'Cottony Soft']
  },

  // --- PAMPERS ---
  {
    id: 'diaper-pam-nb',
    name: 'Pampers Premium Care Tape (Newborn, < 5 kg)',
    category: 'baby_care',
    ageStage: 'newborn',
    brand: 'Pampers',
    diaperType: 'tape',
    weightRangeKg: '< 5 kg',
    piecesPerPack: 44,
    priceNPR: 1650,
    pricePerPieceNPR: 37.5,
    absorptionHours: 12,
    suitableAgeRange: '0–2 Months',
    image: '/src/assets/images/diaper_station_hero_1793081804891.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#ECE5D8]',
    shortDescription: 'Silky softness with umbilical cord cutout notch to protect newborn belly button healing.',
    materials: 'Dermatologically tested silky cotton fibers, lotion with aloe vera, wetness indicator',
    washCare: 'Single use disposable.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    featured: true,
    variants: [
      { size: 'Newborn (< 5 kg) · 44 Taped Diapers', inStock: true, stockCount: 25 },
      { size: 'Hospital Starter Box (88 Taped Diapers)', inStock: true, stockCount: 12 }
    ],
    highlights: ['Umbilical cord notch protection', 'Color-changing wetness indicator line', 'Breathable air-flow micropores'],
    features: ['Umbilical Notch', 'Wetness Indicator', 'Silky Softness']
  },
  {
    id: 'diaper-pam-s',
    name: 'Pampers Baby Dry Pants (Small, 4–8 kg)',
    category: 'baby_care',
    ageStage: 'newborn',
    brand: 'Pampers',
    diaperType: 'pants',
    weightRangeKg: '4–8 kg',
    piecesPerPack: 70,
    priceNPR: 2200,
    originalPriceNPR: 2450,
    pricePerPieceNPR: 31.4,
    absorptionHours: 12,
    suitableAgeRange: '2–6 Months',
    image: '/src/assets/images/diaper_station_hero_1793081804891.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#E3D9CC]',
    shortDescription: '3 absorbing channels that distribute wetness evenly across the diaper rather than bunching up.',
    materials: 'Micro-pearl gel absorbent layer, breathable outer cover',
    washCare: 'Single use disposable.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: 'Small (4–8 kg) · 70 Pants', inStock: true, stockCount: 32 }
    ],
    highlights: ['3 extra absorbing channels', 'Anti-leak dual leg barriers', 'Baby lotion infused to prevent rash'],
    features: ['3 Air Channels', 'Even Distribution', 'Baby Lotion Coating']
  },
  {
    id: 'diaper-pam-xxl',
    name: 'Pampers Baby Dry Pants (XXL, 15–25 kg)',
    category: 'baby_care',
    ageStage: 'toddler',
    brand: 'Pampers',
    diaperType: 'pants',
    weightRangeKg: '15–25 kg',
    piecesPerPack: 40,
    priceNPR: 2100,
    pricePerPieceNPR: 52.5,
    absorptionHours: 12,
    suitableAgeRange: '3–6 Years',
    image: '/src/assets/images/diaper_station_hero_1793081804891.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#E3D9CC]',
    shortDescription: 'Extra large comfort fit for older toddlers and potty training transitions with high absorbency.',
    materials: 'Elasticated soft side polymers, advanced super absorbent core',
    washCare: 'Single use disposable.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: 'XXL (15–25 kg) · 40 Pants', inStock: true, stockCount: 22 }
    ],
    highlights: ['Potty training transition pants', 'Super flexible 360° waistband', 'No red marks on waist or thighs'],
    features: ['Potty Training Fit', 'Zero Mark Waist', '360° Stretch']
  },

  // --- HUGGIES ---
  {
    id: 'diaper-hug-m',
    name: 'Huggies Wonder Pants with Bubble Bed (Medium, 6–11 kg)',
    category: 'baby_care',
    ageStage: 'infant',
    brand: 'Huggies',
    diaperType: 'pants',
    weightRangeKg: '6–11 kg',
    piecesPerPack: 76,
    priceNPR: 2250,
    originalPriceNPR: 2500,
    pricePerPieceNPR: 29.6,
    absorptionHours: 12,
    suitableAgeRange: '6–12 Months',
    image: '/src/assets/images/diaper_station_hero_1793081804891.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#DFD6C7]',
    shortDescription: 'Patented 3-D bubble-bed inside sheet that traps moisture and keeps baby’s bottom cottony dry.',
    materials: 'Cushiony bubble liner, absorbent core, non-woven polypropylene',
    washCare: 'Single use disposable.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    bestseller: true,
    variants: [
      { size: 'Medium (6–11 kg) · 76 Pants', inStock: true, stockCount: 40 },
      { size: 'Value Twin Pack (152 Pants)', inStock: true, stockCount: 18 }
    ],
    highlights: ['Bubble bed liner feels like a soft pillow', 'Triple leak guard protection', 'Up to 12 hours dryness'],
    features: ['Bubble Bed Layer', 'Zero Back Leakage', 'Feather Soft']
  },
  {
    id: 'diaper-hug-nb',
    name: 'Huggies Nature Care Organic Cotton Taped (NB, < 5 kg)',
    category: 'baby_care',
    ageStage: 'newborn',
    brand: 'Huggies',
    diaperType: 'tape',
    weightRangeKg: '< 5 kg',
    piecesPerPack: 48,
    priceNPR: 1750,
    pricePerPieceNPR: 36.4,
    absorptionHours: 12,
    suitableAgeRange: '0–3 Months',
    image: '/src/assets/images/diaper_station_hero_1793081804891.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#DFD6C7]',
    shortDescription: '100% organic cotton outer cover. Free of elemental chlorine bleaching, parabens, and perfumes.',
    materials: '100% Organic cotton outer, unbleached fluff pulp core',
    washCare: 'Single use disposable.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: 'Newborn (< 5 kg) · 48 Diapers', inStock: true, stockCount: 20 }
    ],
    highlights: ['Organic cotton touch', 'Zero fragrance & elemental chlorine', 'Ideal for ultra-sensitive newborn skin'],
    features: ['100% Organic Cotton', 'Chlorine-Free', 'Pediatrician Approved']
  },

  // --- SANO PURE ECO BAMBOO (HOUSE BRAND) ---
  {
    id: 'diaper-sano-eco-m',
    name: 'sano. Pure Bamboo Eco-Diaper Pants (Medium, 6–11 kg)',
    category: 'baby_care',
    ageStage: 'infant',
    brand: 'Sano Pure Eco',
    diaperType: 'pants',
    weightRangeKg: '6–11 kg',
    piecesPerPack: 60,
    priceNPR: 2450,
    originalPriceNPR: 2750,
    pricePerPieceNPR: 40.8,
    absorptionHours: 12,
    suitableAgeRange: '6–12 Months',
    image: '/src/assets/images/diaper_station_hero_1793081804891.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#E6DFD4]',
    shortDescription: '100% organic unbleached bamboo top-sheet and back-sheet. 85% biodegradable and naturally antibacterial.',
    materials: '100% FSC certified bamboo non-woven fiber, Total Chlorine Free (TCF) core, non-toxic water-based indicator',
    washCare: 'Disposable. Decomposes naturally in compost environments.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    featured: true,
    variants: [
      { size: 'Medium (6–11 kg) · 60 Bamboo Pants', inStock: true, stockCount: 35 },
      { size: 'Monthly Box (120 Bamboo Pants)', inStock: true, stockCount: 16 }
    ],
    highlights: ['Naturally hypoallergenic & breathable', 'Eco-friendly bamboo decomposes in 75 days', 'Zero plastic touching baby skin'],
    features: ['100% Bamboo Top', 'Biodegradable', 'Zero Harsh Chemicals']
  },
  {
    id: 'diaper-sano-eco-l',
    name: 'sano. Pure Bamboo Eco-Diaper Pants (Large, 9–14 kg)',
    category: 'baby_care',
    ageStage: 'toddler',
    brand: 'Sano Pure Eco',
    diaperType: 'pants',
    weightRangeKg: '9–14 kg',
    piecesPerPack: 52,
    priceNPR: 2450,
    originalPriceNPR: 2750,
    pricePerPieceNPR: 47.1,
    absorptionHours: 12,
    suitableAgeRange: '1–3 Years',
    image: '/src/assets/images/diaper_station_hero_1793081804891.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#E6DFD4]',
    shortDescription: 'Pure bamboo fibers keep skin cooler by 1.5°C compared to petroleum plastics, preventing diaper rash.',
    materials: 'FSC bamboo fibers, plant-based SAP, cornstarch breathable film',
    washCare: 'Single use eco disposable.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: 'Large (9–14 kg) · 52 Bamboo Pants', inStock: true, stockCount: 28 }
    ],
    highlights: ['Cooling bamboo fiber technology', 'Naturally odor-resistant', 'Zero parabens, phthalates, or lotion fragrances'],
    features: ['Cooling Bamboo', 'Odor Neutralizing', 'Zero Plastic Contact']
  },

  // --- REUSABLE CLOTH DIAPERS ---
  {
    id: 'diaper-sb-cloth-kit',
    name: 'SuperBottoms Reusable Organic Cotton Cloth Diaper Kit (Pack of 3)',
    category: 'baby_care',
    ageStage: 'infant',
    brand: 'SuperBottoms',
    diaperType: 'cloth',
    weightRangeKg: '5–17 kg',
    piecesPerPack: 3,
    priceNPR: 3450,
    originalPriceNPR: 3900,
    pricePerPieceNPR: 1150.0,
    absorptionHours: 8,
    suitableAgeRange: '3 Months to 3 Years (Adjustable)',
    image: '/src/assets/images/category_baby_care_1793079670129.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#DFD8CE]',
    shortDescription: 'Washable & reusable 300+ times. Waterproof breathable TPU shell with 12-layer organic cotton soakers.',
    materials: '100% GOTS certified organic cotton fleece pads, waterproof PUL shell',
    washCare: 'Machine wash 40°C or sun dry. Washable for 2–3 years of continuous use.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    featured: true,
    variants: [
      { size: 'One-Size Fits All (5–17 kg) · 3 Shells + 3 Soakers', inStock: true, stockCount: 18 }
    ],
    highlights: ['Saves up to Rs. 40,000 across baby diaper years', 'Adjustable multi-snap sizing from 3m to 3y', 'Gentlest on baby skin'],
    features: ['Washable 300+ Times', '100% GOTS Cotton', 'Adjustable Snaps']
  },

  // --- NIGHTTIME BEDWETTING PANTS FOR OLDER KIDS (UP TO 14 YEARS) ---
  {
    id: 'diaper-older-kids-teen',
    name: 'DryNites Overnight Absorbent Youth Pants (8–14 Years, 27–45 kg)',
    category: 'baby_care',
    ageStage: 'teen',
    brand: 'DryNites',
    diaperType: 'nighttime_older_kids',
    weightRangeKg: '27–45 kg',
    piecesPerPack: 16,
    priceNPR: 2650,
    pricePerPieceNPR: 165.6,
    absorptionHours: 12,
    suitableAgeRange: '8–14 Years',
    image: '/src/assets/images/category_school_kids_1793079671395.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#E3D9CC]',
    shortDescription: 'Discreet underwear-like pajama pants for older children and teens experiencing nocturnal enuresis / bedwetting.',
    materials: 'Quiet rustle-free cloth-like fabric, zoned super-absorbent core',
    washCare: 'Single use disposable. Discreet packaging.',
    deliveryTime: 'Arrives in 24–48 hours in discrete plain box.',
    featured: true,
    variants: [
      { size: 'Youth Age 8–14y (27–45 kg) · 16 Pants', inStock: true, stockCount: 19 },
      { size: 'Youth Twin Pack (32 Pants)', inStock: true, stockCount: 9 }
    ],
    highlights: ['Discreet fit looks like real underwear', 'Does not rustle under pajamas', 'Delivered in 100% plain brown box for privacy'],
    features: ['Discreet Underwear Look', 'Rustle-Free Fabric', 'Confidential Delivery']
  },

  // --- BAMBO NATURE HYPOALLERGENIC ---
  {
    id: 'diaper-bambo-l',
    name: 'Bambo Nature Danish Hypoallergenic Pants (Large, 8–15 kg)',
    category: 'baby_care',
    ageStage: 'toddler',
    brand: 'Bambo Nature',
    diaperType: 'pants',
    weightRangeKg: '8–15 kg',
    piecesPerPack: 50,
    priceNPR: 2850,
    originalPriceNPR: 3100,
    pricePerPieceNPR: 57.0,
    absorptionHours: 12,
    suitableAgeRange: '1–3 Years',
    image: '/src/assets/images/diaper_station_hero_1793081804891.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#E8E0D2]',
    shortDescription: 'Nordic Swan Eco-label certified. 0% dyes, 0% chlorine, certified skin-friendly for eczema-prone babies.',
    materials: 'Nordic wood fluff pulp, plant-based non-woven top sheet',
    washCare: 'Single use disposable.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: 'Large (8–15 kg) · 50 Pants', inStock: true, stockCount: 15 }
    ],
    highlights: ['Nordic Eco-label & Asthma Allergy Nordic certified', 'Zero optical brighteners', 'Maximum breathability'],
    features: ['Nordic Eco-Certified', 'Eczema Safe', '0% Chlorine']
  }
];

export const DIAPER_BRANDS = [
  'All Brands',
  'MamyPoko',
  'Pampers',
  'Huggies',
  'Sano Pure Eco',
  'SuperBottoms',
  'DryNites',
  'Bambo Nature'
];

export const DIAPER_TYPES = [
  { id: 'all', label: 'All Diapers' },
  { id: 'pants', label: 'Pant Style' },
  { id: 'tape', label: 'Taped (Newborn)' },
  { id: 'cloth', label: 'Reusable Cloth' },
  { id: 'nighttime_older_kids', label: 'Youth & Bedwetting (8–14y)' }
];

export const DIAPER_SIZES = [
  { id: 'all', label: 'All Sizes', weight: 'All weights' },
  { id: 'nb', label: 'Newborn (NB)', weight: '< 5 kg' },
  { id: 's', label: 'Small (S)', weight: '4–8 kg' },
  { id: 'm', label: 'Medium (M)', weight: '6–11 kg' },
  { id: 'l', label: 'Large (L)', weight: '9–14 kg' },
  { id: 'xl', label: 'Extra Large (XL)', weight: '12–17 kg' },
  { id: 'xxl', label: 'Double XL (XXL)', weight: '15–25 kg' },
  { id: 'youth', label: 'Youth / Teen', weight: '27–45 kg' }
];
