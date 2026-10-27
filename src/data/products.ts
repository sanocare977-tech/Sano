import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // ==========================================
  // --- REAL UPLOADED PRODUCTS (CLOTHING & SETS) ---
  // ==========================================
  {
    id: 'sano-polo-01',
    name: 'Little Gentleman Piqué Polo Romper with French Ribbon',
    category: 'apparel',
    ageStage: 'newborn',
    brand: 'sano.',
    brandScope: 'sano',
    priceNPR: 1450,
    originalPriceNPR: 1750,
    image: '/assets/aistudio/3_732fb940.jpg',
    galleryImages: [
      '/assets/aistudio/3_732fb940.jpg',
      '/assets/aistudio/4_1d1aaa4f.jpg',
      '/assets/aistudio/2_5bf02e1e.jpg',
      '/assets/aistudio/1_2ccf1db3.jpg'
    ],
    fallbackGradient: 'from-[#FFF6E9] to-[#EAE0D0]',
    shortDescription: 'Classic crisp white piqué cotton shortie romper with tailored polo collar, athletic striped cuffs, and button front.',
    materials: '100% Breathable Piqué Cotton, hypoallergenic snaps',
    washCare: 'Machine wash warm 40°C. Gentle spin. Iron on low.',
    deliveryTime: 'Arrives in 24–48 hours across Kathmandu Valley.',
    featured: true,
    bestseller: true,
    variants: [
      { size: '0–3m (56–62 cm)', inStock: true, stockCount: 16 },
      { size: '3–6m (62–68 cm)', inStock: true, stockCount: 22 },
      { size: '6–12m (68–80 cm)', inStock: true, stockCount: 14 }
    ],
    highlights: ['Soft rib collar that never curls', 'Full bottom snaps for fast diaper checks', 'Chest pocket with grosgrain ribbon accent']
  },
  {
    id: 'sano-polo-02',
    name: 'Heritage Check Collar Polo Shortall Romper',
    category: 'apparel',
    ageStage: 'newborn',
    brand: 'sano.',
    brandScope: 'sano',
    priceNPR: 1550,
    originalPriceNPR: 1850,
    image: '/assets/aistudio/2_5bf02e1e.jpg',
    galleryImages: [
      '/assets/aistudio/2_5bf02e1e.jpg',
      '/assets/aistudio/4_1d1aaa4f.jpg',
      '/assets/aistudio/1_2ccf1db3.jpg'
    ],
    fallbackGradient: 'from-[#FFF6E9] to-[#E3D8C8]',
    shortDescription: 'Timeless tailored romper featuring Scottish plaid woven collar and matching breast pocket.',
    materials: '100% Combed ring-spun cotton jersey',
    washCare: 'Machine wash 30°C. Line dry in shade.',
    deliveryTime: 'Arrives in 24–48 hours across Kathmandu Valley.',
    featured: false,
    bestseller: true,
    variants: [
      { size: '3–6m (62–68 cm)', inStock: true, stockCount: 15 },
      { size: '6–12m (68–80 cm)', inStock: true, stockCount: 19 },
      { size: '12–18m (80–86 cm)', inStock: true, stockCount: 11 }
    ],
    highlights: ['Woven check contrast detailing', 'Nickel-free crotch snap fasteners', 'Pre-washed against shrinkage']
  },
  {
    id: 'sano-set-01',
    name: 'Gentleman Bowtie Shirt & Crimson Suspender Shorts Set',
    category: 'apparel',
    ageStage: 'toddler',
    brand: 'sano.',
    brandScope: 'sano',
    priceNPR: 1950,
    originalPriceNPR: 2350,
    image: '/assets/aistudio/101_610b9107.jpg',
    galleryImages: [
      '/assets/aistudio/101_610b9107.jpg',
      '/assets/aistudio/102_720576d4.jpg',
      '/assets/aistudio/103_54c8f164.jpg',
      '/assets/aistudio/104_c2f0c105.jpg'
    ],
    fallbackGradient: 'from-[#FFF6E9] to-[#DCE3EB]',
    shortDescription: '2-Piece celebratory outfit: Short-sleeve collared shirt with detachable bowtie paired with crimson adjustable suspender shorts.',
    materials: '95% Pure Cotton, 5% Elastane comfort stretch',
    washCare: 'Hand wash or delicate machine wash 30°C. Remove bowtie before washing.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    featured: true,
    bestseller: true,
    variants: [
      { size: '12–18m (80–86 cm)', inStock: true, stockCount: 12 },
      { size: '18–24m (86–92 cm)', inStock: true, stockCount: 14 },
      { size: '2–3y (92–98 cm)', inStock: true, stockCount: 18 }
    ],
    highlights: ['Adjustable Y-back elasticated suspenders', 'Ideal for Pasni (Rice Feeding), birthdays, and family weddings', 'Soft internal waistband']
  },
  {
    id: 'sano-street-01',
    name: '"Chicago" Varsity Baseball Shirt & Lounge Shorts Set',
    category: 'apparel',
    ageStage: 'toddler',
    brand: 'sano.',
    brandScope: 'sano',
    priceNPR: 1750,
    originalPriceNPR: 2100,
    image: '/assets/aistudio/105_1fef977f.jpg',
    galleryImages: [
      '/assets/aistudio/105_1fef977f.jpg',
      '/assets/aistudio/106_d8f8cfa8.jpg',
      '/assets/aistudio/107_f2640184.jpg'
    ],
    fallbackGradient: 'from-[#FFF6E9] to-[#DDE0D5]',
    shortDescription: 'Streetwear baseball button-down jersey in olive green with faux-layer white undershirt and elastic waist shorts.',
    materials: '100% Breathable cotton twill blend',
    washCare: 'Cold wash inside out. Tumble dry low.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: '1–2y (80–92 cm)', inStock: true, stockCount: 14 },
      { size: '2–3y (92–98 cm)', inStock: true, stockCount: 16 },
      { size: '3–4y (98–104 cm)', inStock: true, stockCount: 12 }
    ],
    highlights: ['Vintage script typography', 'Elasticized comfort waistband', 'Drop-shoulder casual silhouette']
  },
  {
    id: 'sano-dino-01',
    name: 'Organic Cotton "Sunny Dino & Taxi" Graphic Tee & Shorts Set',
    category: 'apparel',
    ageStage: 'toddler',
    brand: 'sano.',
    brandScope: 'sano',
    priceNPR: 1280,
    originalPriceNPR: 1550,
    image: '/assets/aistudio/108_971dfaab.jpg',
    galleryImages: [
      '/assets/aistudio/108_971dfaab.jpg',
      '/assets/aistudio/109_6c567bd7.jpg',
      '/assets/aistudio/110_5578a12e.jpg',
      '/assets/aistudio/111_f0342e3e.jpg',
      '/assets/aistudio/112_e743d4ec.jpg'
    ],
    fallbackGradient: 'from-[#FFF6E9] to-[#EAE4D7]',
    shortDescription: 'Soft everyday playwear set with screen-printed playful dinosaur and city taxi motifs. Non-toxic dyes.',
    materials: '100% GOTS Organic Cotton Jersey',
    washCare: 'Machine wash 40°C with similar colors.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: '6–12m (68–80 cm)', inStock: true, stockCount: 18 },
      { size: '1–2y (80–92 cm)', inStock: true, stockCount: 20 },
      { size: '2–3y (92–98 cm)', inStock: true, stockCount: 15 }
    ],
    highlights: ['Water-based eco inks', 'Shoulder poppers for easy over-the-head dressing', 'Generous diaper room in shorts']
  },
  {
    id: 'sano-romp-02',
    name: 'Breeze Cotton Snap Romper with Cute Characters',
    category: 'apparel',
    ageStage: 'newborn',
    brand: 'sano.',
    brandScope: 'sano',
    priceNPR: 1150,
    image: '/assets/aistudio/113_b65e7c50.jpg',
    galleryImages: [
      '/assets/aistudio/113_b65e7c50.jpg',
      '/assets/aistudio/114_003c53f0.jpg',
      '/assets/aistudio/115_bceefc9f.jpg',
      '/assets/aistudio/116_3f7ff8b5.jpg',
      '/assets/aistudio/117_31019aea.jpg'
    ],
    fallbackGradient: 'from-[#FFF6E9] to-[#E9E1D2]',
    shortDescription: 'Ultra-lightweight summer onesie with front snap placket and soft neck ribbing.',
    materials: '100% Combed Slub Cotton',
    washCare: 'Machine wash 30°C.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: '0–3m (56–62 cm)', inStock: true, stockCount: 16 },
      { size: '3–6m (62–68 cm)', inStock: true, stockCount: 20 },
      { size: '6–12m (68–80 cm)', inStock: true, stockCount: 15 }
    ],
    highlights: ['Breathable slub texture for Kathmandu summers', 'Flat-lock seams prevent chafing', 'Full inseam poppers']
  },
  {
    id: 'sano-girl-01',
    name: 'Sky Blue Floral Lace Tutu Romper with Matching Headband',
    category: 'apparel',
    ageStage: 'infant',
    brand: 'sano.',
    brandScope: 'sano',
    priceNPR: 1850,
    originalPriceNPR: 2200,
    image: '/assets/aistudio/118_1e3f2868.jpg',
    galleryImages: [
      '/assets/aistudio/118_1e3f2868.jpg',
      '/assets/aistudio/119_297a9708.jpg',
      '/assets/aistudio/120_b71926f3.jpg',
      '/assets/aistudio/121_a168ce62.jpg'
    ],
    fallbackGradient: 'from-[#FFF6E9] to-[#D5EBF5]',
    shortDescription: 'Charming vintage floral lace bodice with flutter cap sleeves, soft tiered tulle skirt, and matching bow headband.',
    materials: '100% Cotton lining, soft nylon lace & tulle',
    washCare: 'Gentle hand wash cold. Lay flat to dry.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    featured: true,
    bestseller: true,
    variants: [
      { size: '3–6m (62–68 cm)', inStock: true, stockCount: 14 },
      { size: '6–12m (68–80 cm)', inStock: true, stockCount: 18 },
      { size: '12–18m (80–86 cm)', inStock: true, stockCount: 12 }
    ],
    highlights: ['100% Cotton soft underlay against baby skin', 'Matching elasticized headband included', 'Picture-perfect for milestone photos']
  },
  {
    id: 'sano-girl-02',
    name: '"Got It From My Mama" Ribbed Flutter Bodysuit & Bloomer Set',
    category: 'apparel',
    ageStage: 'infant',
    brand: 'sano.',
    brandScope: 'sano',
    priceNPR: 1780,
    originalPriceNPR: 2100,
    image: '/assets/aistudio/123_b7a6e3d2.jpg',
    galleryImages: [
      '/assets/aistudio/123_b7a6e3d2.jpg',
      '/assets/aistudio/124_a452864c.jpg',
      '/assets/aistudio/125_2264a54b.jpg',
      '/assets/aistudio/126_a6579d63.jpg',
      '/assets/aistudio/127_1131efe4.jpg'
    ],
    fallbackGradient: 'from-[#FFF6E9] to-[#F2DFDE]',
    shortDescription: 'Burgundy ribbed long-sleeve bodysuit with ruffled shoulders paired with floral bloomer shorts and matching hair tie.',
    materials: '95% Ribbed cotton, 5% spandex for stretch',
    washCare: 'Machine wash 30°C.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: '0–3m (56–62 cm)', inStock: true, stockCount: 12 },
      { size: '3–6m (62–68 cm)', inStock: true, stockCount: 15 },
      { size: '6–12m (68–80 cm)', inStock: true, stockCount: 17 },
      { size: '12–18m (80–86 cm)', inStock: true, stockCount: 10 }
    ],
    highlights: ['Ruffle shoulder detail', 'Expandable envelope neckline', 'Super stretch soft rib knit']
  },
  {
    id: 'sano-sleep-01',
    name: 'Whimsical Woodland Forest Fawn 2-Way Zip Sleepsuit',
    category: 'sleep_nursery',
    ageStage: 'newborn',
    brand: 'sano.',
    brandScope: 'sano',
    priceNPR: 1650,
    originalPriceNPR: 1950,
    image: '/assets/aistudio/128_b543b43d.jpg',
    galleryImages: [
      '/assets/aistudio/128_b543b43d.jpg',
      '/assets/aistudio/129_ad07af21.jpg',
      '/assets/aistudio/130_2264a54b.jpg',
      '/assets/aistudio/131_932d42e6.jpg',
      '/assets/aistudio/132_04c23f1d.jpg'
    ],
    fallbackGradient: 'from-[#FFF6E9] to-[#E3DFD5]',
    shortDescription: 'Gentle woodland animals and fawn illustrations on buttery soft bamboo modal. Full two-way zip for effortless night changes.',
    materials: '95% Bamboo Rayon, 5% Spandex',
    washCare: 'Gentle cycle 30°C. Do not tumble dry.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    featured: true,
    bestseller: true,
    variants: [
      { size: '0–3m (56–62 cm)', inStock: true, stockCount: 22 },
      { size: '3–6m (62–68 cm)', inStock: true, stockCount: 18 },
      { size: '6–12m (68–80 cm)', inStock: true, stockCount: 14 }
    ],
    highlights: ['Convertible fold-over mitts and footies', 'Internal zipper guard prevents pinching', 'Regulates sleep temperature']
  },
  {
    id: 'sano-swim-01',
    name: 'UPF50+ Quick-Dry Baby Tropical Sunsuit & Swim Romper',
    category: 'outdoor_safety',
    ageStage: 'infant',
    brand: 'sano.',
    brandScope: 'sano',
    priceNPR: 1590,
    image: '/assets/aistudio/133_16af8535.jpg',
    galleryImages: [
      '/assets/aistudio/133_16af8535.jpg',
      '/assets/aistudio/134_26137a43.jpg',
      '/assets/aistudio/135_352e434b.jpg',
      '/assets/aistudio/136_6df933f0.jpg'
    ],
    fallbackGradient: 'from-[#FFF6E9] to-[#E0EBF2]',
    shortDescription: 'Certified UPF 50+ sun protection swimsuit with front zipper and quick-drying 4-way stretch fabric.',
    materials: '82% Recycled Polyester, 18% Elastane, Chlorine resistant',
    washCare: 'Rinse in cold fresh water after use. Drip dry in shade.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: '6–12m (68–80 cm)', inStock: true, stockCount: 12 },
      { size: '1–2y (80–92 cm)', inStock: true, stockCount: 15 },
      { size: '2–3y (92–98 cm)', inStock: true, stockCount: 10 }
    ],
    highlights: ['Certified UPF50+ UV protection', 'Easy front zipper with neck tab', 'Flat seams prevent chafing']
  },
  {
    id: 'sano-dress-01',
    name: 'Sage Botanical Muslin Smocked Sundress Romper & Headband',
    category: 'apparel',
    ageStage: 'infant',
    brand: 'sano.',
    brandScope: 'sano',
    priceNPR: 1680,
    originalPriceNPR: 1980,
    image: '/assets/aistudio/137_9ced7b56.jpg',
    galleryImages: [
      '/assets/aistudio/137_9ced7b56.jpg',
      '/assets/aistudio/138_b202444f.jpg',
      '/assets/aistudio/139_b94db28b.jpg'
    ],
    fallbackGradient: 'from-[#FFF6E9] to-[#DCE6DE]',
    shortDescription: 'Airy double-gauze organic muslin romper with smocked elastic chest, shoulder ribbon ties, and diaper snaps.',
    materials: '100% GOTS Organic Cotton Muslin',
    washCare: 'Machine wash delicate 30°C.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: '3–6m (62–68 cm)', inStock: true, stockCount: 14 },
      { size: '6–12m (68–80 cm)', inStock: true, stockCount: 16 },
      { size: '12–18m (80–86 cm)', inStock: true, stockCount: 11 }
    ],
    highlights: ['Double gauze crinkle cotton breathes in heat', 'Adjustable shoulder ties', 'Gentle elasticated leg cuffs']
  },
  {
    id: 'sano-bamboo-01',
    name: 'Moon Phase Bamboo Viscose Convertible Footie Sleeper',
    category: 'sleep_nursery',
    ageStage: 'newborn',
    brand: 'sano.',
    brandScope: 'sano',
    priceNPR: 1750,
    image: '/assets/aistudio/140_437e3c30.png',
    galleryImages: [
      '/assets/aistudio/140_437e3c30.png',
      '/assets/aistudio/141_a5e0ed29.jpg',
      '/assets/aistudio/142_472c92fc.jpg',
      '/assets/aistudio/143_a3bf9e6f.jpg'
    ],
    fallbackGradient: 'from-[#FFF6E9] to-[#E4E4E6]',
    shortDescription: 'Cloud-soft celestial dot print sleepsuit made with thermo-regulating bamboo viscose. Gentle on eczema-prone skin.',
    materials: '95% Bamboo Viscose, 5% Spandex',
    washCare: 'Cold wash with like colors. Do not bleach.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    bestseller: true,
    variants: [
      { size: '0–3m (56–62 cm)', inStock: true, stockCount: 18 },
      { size: '3–6m (62–68 cm)', inStock: true, stockCount: 22 },
      { size: '6–12m (68–80 cm)', inStock: true, stockCount: 16 }
    ],
    highlights: ['2-Way inverted YKK zipper', 'Fold-over mitts protect from scratches', 'Naturally antibacterial bamboo']
  },
  {
    id: 'sano-knit-01',
    name: 'Pastel Floral Knit Vest & Soft Denim Shorts 2-Piece Ensemble',
    category: 'apparel',
    ageStage: 'toddler',
    brand: 'sano.',
    brandScope: 'sano',
    priceNPR: 2150,
    originalPriceNPR: 2500,
    image: '/assets/aistudio/144_2030a9a8.jpg',
    galleryImages: [
      '/assets/aistudio/144_2030a9a8.jpg',
      '/assets/aistudio/145_3d50ba5b.jpg',
      '/assets/aistudio/146_fa1b8737.jpg',
      '/assets/aistudio/147_97b39df4.jpg',
      '/assets/aistudio/148_28176144.jpg'
    ],
    fallbackGradient: 'from-[#FFF6E9] to-[#E6E8E2]',
    shortDescription: 'Hand-crochet look cotton knit sleeveless sweater vest with daisy accents over flexible, washed baby denim shorts.',
    materials: 'Vest: 100% Combed Cotton Knit. Shorts: 98% Cotton Denim, 2% Stretch',
    washCare: 'Gentle machine wash 30°C.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: '1–2y (80–92 cm)', inStock: true, stockCount: 12 },
      { size: '2–3y (92–98 cm)', inStock: true, stockCount: 15 },
      { size: '3–4y (98–104 cm)', inStock: true, stockCount: 9 }
    ],
    highlights: ['Breathable open-work knit', 'Super soft enzyme-washed denim', 'Functional side pockets']
  },
  {
    id: 'sano-fleece-01',
    name: 'Teddy Ears Sherpa Fleece Warm Snowsuit / Bunting',
    category: 'apparel',
    ageStage: 'newborn',
    brand: 'sano.',
    brandScope: 'sano',
    priceNPR: 2450,
    originalPriceNPR: 2850,
    image: '/assets/aistudio/157_42c2342e.jpg',
    galleryImages: [
      '/assets/aistudio/157_42c2342e.jpg',
      '/assets/aistudio/158_dd6d2889.jpg',
      '/assets/aistudio/159_dad16aaa.jpg',
      '/assets/aistudio/160_8dc70180.jpg'
    ],
    fallbackGradient: 'from-[#FFF6E9] to-[#E3D9C9]',
    shortDescription: 'Plush double-faced sherpa fleece pramsuit with cute 3D bear ears on hood. Keeps baby toasty in cold morning air.',
    materials: 'Outer: 100% Sherpa Fleece, Lining: 100% Organic Jersey Cotton',
    washCare: 'Machine wash cold gentle. Line dry.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    featured: true,
    bestseller: true,
    variants: [
      { size: '0–3m (56–62 cm)', inStock: true, stockCount: 14 },
      { size: '3–6m (62–68 cm)', inStock: true, stockCount: 18 },
      { size: '6–12m (68–80 cm)', inStock: true, stockCount: 12 }
    ],
    highlights: ['Fully lined with 100% organic cotton', '3D sculpted bear ears on hood', 'Full front snap opening for car seat safety']
  },
  {
    id: 'sano-dungaree-01',
    name: 'Vintage Ribbed Dungaree Romper & Headband Set',
    category: 'apparel',
    ageStage: 'infant',
    brand: 'sano.',
    brandScope: 'sano',
    priceNPR: 1820,
    image: '/assets/aistudio/167_11df0b10.jpg',
    galleryImages: [
      '/assets/aistudio/167_11df0b10.jpg',
      '/assets/aistudio/168_a8bbaaf7.jpg'
    ],
    fallbackGradient: 'from-[#FFF6E9] to-[#E7D6D8]',
    shortDescription: 'Dusty rose ribbed overalls with ruffle strap trim, real wooden buttons, and a matching bow headband.',
    materials: '95% Ribbed cotton jersey, 5% spandex',
    washCare: 'Machine wash cold. Gentle spin.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: '3–6m (62–68 cm)', inStock: true, stockCount: 10 },
      { size: '6–12m (68–80 cm)', inStock: true, stockCount: 14 },
      { size: '12–18m (80–86 cm)', inStock: true, stockCount: 8 }
    ],
    highlights: ['Adjustable cross-back straps with 2 button levels', 'Full crotch snap opening', 'Unisex vintage aesthetic']
  },
  {
    id: 'sano-pajama-01',
    name: 'Cozy Ribbed Long-Sleeve Thermal Pajama Set',
    category: 'apparel',
    ageStage: 'toddler',
    brand: 'sano.',
    brandScope: 'sano',
    priceNPR: 1480,
    image: '/assets/aistudio/169_0e2f9eb4.png',
    galleryImages: [
      '/assets/aistudio/169_0e2f9eb4.png',
      '/assets/aistudio/170_a98a5af5.png',
      '/assets/aistudio/171_af007ecc.png'
    ],
    fallbackGradient: 'from-[#FFF6E9] to-[#E0DED9]',
    shortDescription: '2-Piece buttery ribbed sleep and lounge set with henley wood-style buttons and ribbed ankle cuffs.',
    materials: '100% Breathable Combed Rib Cotton',
    washCare: 'Machine wash 40°C. Tumble dry low.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: '1–2y (80–92 cm)', inStock: true, stockCount: 16 },
      { size: '2–3y (92–98 cm)', inStock: true, stockCount: 20 },
      { size: '3–4y (98–104 cm)', inStock: true, stockCount: 14 }
    ],
    highlights: ['Tagless comfort neck label', 'Stretchy ribbed cuffs prevent riding up', 'Breathable for all seasons']
  },
  {
    id: 'sano-dino-tee-01',
    name: 'Boys Urban Colorblock Dinosaur Tee & Pocket Shorts Set',
    category: 'apparel',
    ageStage: 'toddler',
    brand: 'sano.',
    brandScope: 'sano',
    priceNPR: 1550,
    image: '/assets/aistudio/172_9b4bc06e.jpg',
    galleryImages: [
      '/assets/aistudio/172_9b4bc06e.jpg',
      '/assets/aistudio/173_6cb112a0.jpg',
      '/assets/aistudio/174_bf17c98e.jpg',
      '/assets/aistudio/175_ab312a1e.jpg',
      '/assets/aistudio/176_22eb908c.jpg',
      '/assets/aistudio/177_f56f7e19.jpg'
    ],
    fallbackGradient: 'from-[#FFF6E9] to-[#D5E1E6]',
    shortDescription: 'Modern color-block t-shirt with cheerful dinosaur print and contrasting cargo pocket lounge shorts.',
    materials: '100% Cotton French Terry & Jersey',
    washCare: 'Machine wash 40°C.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: '1–2y (80–92 cm)', inStock: true, stockCount: 15 },
      { size: '2–3y (92–98 cm)', inStock: true, stockCount: 18 },
      { size: '3–4y (98–104 cm)', inStock: true, stockCount: 12 }
    ],
    highlights: ['Reinforced crewneck', 'Elastic drawstring shorts with side pocket', 'Resistant to repeated play & wash']
  },
  {
    id: 'sano-welcome-01',
    name: 'Newborn 6-Piece Organic Welcome Layette Gift Set',
    category: 'apparel',
    ageStage: 'newborn',
    brand: 'sano.',
    brandScope: 'sano',
    priceNPR: 2650,
    originalPriceNPR: 3100,
    image: '/assets/aistudio/185_97683f83.png',
    galleryImages: [
      '/assets/aistudio/185_97683f83.png',
      '/assets/aistudio/186_97683f83.png',
      '/assets/aistudio/187_1f2cfa20.png',
      '/assets/aistudio/82_8a261b8d.png',
      '/assets/aistudio/83_67b10a01.png',
      '/assets/aistudio/84_66a7bf83.png'
    ],
    fallbackGradient: 'from-[#FFF6E9] to-[#F7EACD]',
    shortDescription: 'Complete 6-piece hospital starter kit: Kimono bodysuit, footed trousers, adjustable knot hat, bandana bib, scratch mittens & booties.',
    materials: '100% GOTS Certified Organic Combed Cotton',
    washCare: 'Machine wash 40°C with gentle detergent.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    featured: true,
    bestseller: true,
    variants: [
      { size: '0–3m (50–62 cm)', inStock: true, stockCount: 25 },
      { size: '3–6m (62–68 cm)', inStock: true, stockCount: 18 }
    ],
    highlights: ['Packaged in recycled kraft gift box', 'Doctor-recommended wrap-over kimono design', 'Zero synthetic dyes']
  },
  {
    id: 'sano-dino-romp-01',
    name: 'Playful Summer Dinosaur Printed Cotton Bodysuit',
    category: 'apparel',
    ageStage: 'newborn',
    brand: 'sano.',
    brandScope: 'sano',
    priceNPR: 980,
    image: '/assets/aistudio/94_fd502493.png',
    galleryImages: [
      '/assets/aistudio/94_fd502493.png',
      '/assets/aistudio/95_1fe1b8a0.png',
      '/assets/aistudio/96_d6611a6d.png',
      '/assets/aistudio/97_802a1e59.png',
      '/assets/aistudio/98_f238443c.png',
      '/assets/aistudio/99_6cdd4c3e.png'
    ],
    fallbackGradient: 'from-[#FFF6E9] to-[#E2EBE5]',
    shortDescription: 'Breathable short-sleeve bodysuit with sweet cartoon dino graphics and smooth flat-lock collar.',
    materials: '100% Interlock Cotton',
    washCare: 'Machine wash 40°C.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: '0–3m (56–62 cm)', inStock: true, stockCount: 20 },
      { size: '3–6m (62–68 cm)', inStock: true, stockCount: 24 },
      { size: '6–12m (68–80 cm)', inStock: true, stockCount: 16 }
    ],
    highlights: ['Nickel-free snaps', 'Envelope shoulders for downward removal during diaper messes', 'Durable wash after wash']
  },

  // ==========================================
  // --- HOSPITAL BAG: 3 DEDICATED CATEGORIES ---
  // ==========================================

  // --- Category 1: In Labour (Before Delivery) ---
  {
    id: 'sano-hb-lab-01',
    name: 'Labour & Delivery Bamboo Snap Hospital Gown',
    category: 'hospital_bag',
    ageStage: 'pregnancy',
    brand: 'sano care.',
    brandScope: 'sano_care',
    hospitalBagPhase: 'labour_delivery',
    priceNPR: 2250,
    originalPriceNPR: 2650,
    image: '/src/assets/images/category_pregnancy_maternity_1793079669962.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#E6DFD4]',
    shortDescription: 'Nurse-approved labor gown with full back velcro/snap access for epidural, and shoulder snaps for immediate skin-to-skin.',
    materials: '95% Bamboo Rayon, 5% Spandex (ultra-breathable, silky soft)',
    washCare: 'Machine wash 40°C. Quick dry.',
    deliveryTime: 'Same-day or next-day delivery in Kathmandu Valley.',
    featured: true,
    variants: [
      { size: 'S/M (Pre-pregnancy 45–65 kg)', inStock: true, stockCount: 18 },
      { size: 'L/XL (Pre-pregnancy 65–85 kg)', inStock: true, stockCount: 14 }
    ],
    highlights: ['Complete medical team access without exposing dignity', 'Immediate snap-down chest for first breastfeeding', 'Deep side pockets for phone and lip balm']
  },
  {
    id: 'sano-hb-lab-02',
    name: 'Labour Grippy Acupressure Non-Skid Warm Socks & Stress Ball',
    category: 'hospital_bag',
    ageStage: 'pregnancy',
    brand: 'sano care.',
    brandScope: 'sano_care',
    hospitalBagPhase: 'labour_delivery',
    priceNPR: 650,
    image: '/src/assets/images/category_baby_care_1793079670129.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#ECE5D9]',
    shortDescription: 'Cushioned terry socks with silicone non-slip grip treads for cold delivery room tiles, paired with ergonomic contraction squeeze ball.',
    materials: '80% Combed Cotton, 17% Poly, 3% Elastane with non-slip silicone pads',
    washCare: 'Machine wash warm.',
    deliveryTime: 'Arrives in 24 hours in the Valley.',
    variants: [
      { size: 'One Size Elastic (Free Size)', inStock: true, stockCount: 30 }
    ],
    highlights: ['Prevents slips while walking during early labor', 'Squeeze ball stimulates motor gate reflex during contractions', 'Keeps feet toasty in air-conditioned OT']
  },
  {
    id: 'sano-hb-lab-03',
    name: 'Pure Organic Rosewater & Lip Hydration Labor Mist',
    category: 'hospital_bag',
    ageStage: 'pregnancy',
    brand: 'sano care.',
    brandScope: 'sano_care',
    hospitalBagPhase: 'labour_delivery',
    priceNPR: 850,
    image: '/src/assets/images/category_baby_care_1793079670129.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#F1E7DD]',
    shortDescription: '100% Steam-distilled Himalayan rosewater cooling facial mist and shea-honey lip salve to combat dry hospital room air.',
    materials: 'Steam distilled Rosa damascena water, organic beeswax, organic shea butter',
    washCare: 'Store in cool place. Spray on face & neck during labor breathing.',
    deliveryTime: 'Arrives in 24 hours in the Valley.',
    variants: [
      { size: '100ml Mist + 15g Lip Salve Duo', inStock: true, stockCount: 22 }
    ],
    highlights: ['Zero artificial perfume', 'Instant sensory cooling between contractions', 'Safe for mother & baby']
  },

  // --- Category 2: For Mother After Delivery ---
  {
    id: 'sano-hb-aft-01',
    name: 'Postpartum Seamless Recovery High-Waist Briefs (5-Pack)',
    category: 'hospital_bag',
    ageStage: 'pregnancy',
    brand: 'sano care.',
    brandScope: 'sano_care',
    hospitalBagPhase: 'after_delivery',
    priceNPR: 1250,
    originalPriceNPR: 1500,
    image: '/src/assets/images/category_pregnancy_maternity_1793079669962.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#E3DCD1]',
    shortDescription: 'Ultra-stretchy, breathable microfiber postpartum briefs designed to hold heavy pads securely without pressing on C-section incisions.',
    materials: '88% Breathable Microfiber, 12% Spandex, latex-free',
    washCare: 'Hand or machine wash delicate. Fast drying.',
    deliveryTime: 'Arrives in 24 hours in the Valley.',
    bestseller: true,
    variants: [
      { size: 'M/L (Waist 70–95 cm)', inStock: true, stockCount: 25 },
      { size: 'XL/XXL (Waist 95–125 cm)', inStock: true, stockCount: 20 }
    ],
    highlights: ['Sits comfortably above C-section incision line', 'Gentle core support without painful compression', 'Holds maternity pads firmly in place']
  },
  {
    id: 'sano-hb-aft-02',
    name: 'Ergonomic Angled Peri Wash Bottle & Witch Hazel Wipes',
    category: 'hospital_bag',
    ageStage: 'pregnancy',
    brand: 'sano care.',
    brandScope: 'sano_care',
    hospitalBagPhase: 'after_delivery',
    priceNPR: 1450,
    image: '/src/assets/images/category_baby_care_1793079670129.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#ECE5D9]',
    shortDescription: 'Upside-down ergonomic spout cleanses sensitive perineal tears comfortably with warm water without harsh wiping. Includes 30 soothing wipes.',
    materials: 'Medical-grade BPA-free squeeze bottle (350ml), organic witch hazel & aloe wipes',
    washCare: 'Wash bottle with warm soapy water after each use.',
    deliveryTime: 'Arrives in 24 hours in the Valley.',
    bestseller: true,
    variants: [
      { size: '350ml Peri Bottle + 30 Soothing Wipes', inStock: true, stockCount: 28 }
    ],
    highlights: ['Upside-down ergonomic nozzle reaches comfortably', 'Gentle soothing stream eliminates stinging while urinating', 'Crucial hospital bag must-have']
  },
  {
    id: 'sano-hb-aft-03',
    name: 'Pure Herbal Nipple & Postpartum Recovery Balm (50g)',
    category: 'hospital_bag',
    ageStage: 'pregnancy',
    brand: 'sano care.',
    brandScope: 'sano_care',
    hospitalBagPhase: 'after_delivery',
    priceNPR: 950,
    image: '/src/assets/images/category_baby_care_1793079670129.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#F1E8DC]',
    shortDescription: '100% edible-grade organic plant oils. Relieves cracked, tender nipples. Safe for nursing without wiping off before feeding.',
    materials: 'Cold-pressed coconut, organic beeswax, calendula flower extract, shea butter',
    washCare: 'Store in a cool dry place below 25°C.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    bestseller: true,
    variants: [
      { size: '50g Glass Jar', inStock: true, stockCount: 26 },
      { size: '100g Value Pack', inStock: true, stockCount: 12 }
    ],
    highlights: ['Lanolin-free & fragrance-free', 'No wash-off required before nursing', 'Made in small batches in Nepal']
  },
  {
    id: 'sano-hb-aft-04',
    name: 'Organic Bamboo Washable Nursing Breast Pads (4 Pairs)',
    category: 'hospital_bag',
    ageStage: 'pregnancy',
    brand: 'sano care.',
    brandScope: 'sano_care',
    hospitalBagPhase: 'after_delivery',
    priceNPR: 1100,
    image: '/src/assets/images/hero_sano_parent_child_1793079669923.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#E7DFD4]',
    shortDescription: 'Super-absorbent triple-layer bamboo fleece pads with waterproof leak-lock backing. Washable mesh laundry bag included.',
    materials: 'Outer: Waterproof PUL, Core: Ultra-absorbent Microfiber, Inner: 100% Organic Bamboo Fleece',
    washCare: 'Machine wash 40°C in wash bag.',
    deliveryTime: 'Arrives in 24 hours in the Valley.',
    variants: [
      { size: '12 cm Diameter (Pack of 8 with Wash Bag)', inStock: true, stockCount: 20 }
    ],
    highlights: ['Silky soft against sore nipples', 'Zero chafing or sticking to skin', 'Eco-friendly replacement for disposables']
  },

  // --- Category 3: For Newborn Baby ---
  {
    id: 'sano-hb-bb-01',
    name: 'First-Day Organic Wrap Kimono & Footed Pant Set',
    category: 'hospital_bag',
    ageStage: 'newborn',
    brand: 'sano.',
    brandScope: 'sano',
    hospitalBagPhase: 'for_baby',
    priceNPR: 1650,
    originalPriceNPR: 1950,
    image: '/assets/aistudio/185_97683f83.png',
    galleryImages: [
      '/assets/aistudio/185_97683f83.png',
      '/assets/aistudio/82_8a261b8d.png'
    ],
    fallbackGradient: 'from-[#FFF6E9] to-[#DFD6C6]',
    shortDescription: 'Pediatrician-preferred side-wrap kimono top that protects the healing umbilical stump, plus warm elasticized footed trousers.',
    materials: '100% Combed ring-spun GOTS organic cotton',
    washCare: 'Machine wash 40°C with gentle detergent.',
    deliveryTime: 'Arrives in 24 hours in the Valley.',
    featured: true,
    variants: [
      { size: 'Newborn (50–56 cm, up to 4.2 kg)', inStock: true, stockCount: 24 },
      { size: '0–3m (56–62 cm)', inStock: true, stockCount: 18 }
    ],
    highlights: ['No pulling over baby head', 'Umbilical cord cutout clearance', 'Fold-over scratch mitts on sleeves']
  },
  {
    id: 'sano-hb-bb-02',
    name: 'Bamboo Muslin Breathable Receiving Swaddles (2-Pack)',
    category: 'hospital_bag',
    ageStage: 'newborn',
    brand: 'sano.',
    brandScope: 'sano',
    hospitalBagPhase: 'for_baby',
    priceNPR: 1850,
    image: '/src/assets/images/hero_sano_parent_child_1793079669923.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#E5DDD0]',
    shortDescription: 'Generous 120 x 120 cm breathable open-weave swaddle duo. Regulates newborn body temperature and prevents overheating.',
    materials: '70% Bamboo Viscose, 30% Organic Cotton',
    washCare: 'Gentle wash 30°C. Line dry in shade.',
    deliveryTime: 'Arrives in 24 hours in the Valley.',
    bestseller: true,
    variants: [
      { size: '120 x 120 cm (Pack of 2)', inStock: true, stockCount: 26 }
    ],
    highlights: ['Recreates womb security', 'Ultra-breathable against sudden temperature drops', 'Multipurpose burp cloth & stroller cover']
  },
  {
    id: 'sano-hb-bb-03',
    name: 'Knot Beanie Cap & No-Scratch Mittens Hospital Duo',
    category: 'hospital_bag',
    ageStage: 'newborn',
    brand: 'sano.',
    brandScope: 'sano',
    hospitalBagPhase: 'for_baby',
    priceNPR: 750,
    image: '/assets/aistudio/83_67b10a01.png',
    galleryImages: [
      '/assets/aistudio/83_67b10a01.png',
      '/assets/aistudio/87_1e25ead4.png'
    ],
    fallbackGradient: 'from-[#FFF6E9] to-[#F2E8D7]',
    shortDescription: 'Adjustable top-knot hat designed to preserve newborn head warmth right after delivery, paired with stay-on wrist mittens.',
    materials: '100% GOTS Organic Cotton Rib',
    washCare: 'Machine wash warm 40°C.',
    deliveryTime: 'Arrives in 24 hours in the Valley.',
    variants: [
      { size: 'Hospital Newborn (0–3M)', inStock: true, stockCount: 35 }
    ],
    highlights: ['Adjustable knot grows with baby', 'Gentle stretch elastic on mitts never leaves red marks', 'Essential for birth room temperature adjustment']
  },
  {
    id: 'sano-hb-bb-04',
    name: 'Hospital Diaper Caddy & 99% Pure Water Wipes Starter Set',
    category: 'hospital_bag',
    ageStage: 'newborn',
    brand: 'sano care.',
    brandScope: 'sano_care',
    hospitalBagPhase: 'for_baby',
    priceNPR: 1350,
    image: '/src/assets/images/product_diapers_wipes_1793082162681.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#DFD6C6]',
    shortDescription: 'Compact nursery organizer pouch packed with 24 Newborn tape diapers, 2 packs of 99% pure water wipes, and zinc barrier diaper cream.',
    materials: 'Unbleached plant fibers, 99.2% purified water, zinc oxide',
    washCare: 'Store in cool place. Reseal wipe lid firmly.',
    deliveryTime: 'Arrives in 24 hours in the Valley.',
    bestseller: true,
    variants: [
      { size: 'Newborn Kit (<5 kg / 24 diapers + 2 wipe packs)', inStock: true, stockCount: 30 }
    ],
    highlights: ['Wetness indicator strip turns blue when wet', 'Safe for sensitive newborn meconium cleanups', 'Everything organized in one ready-to-grab caddy']
  },

  // ==========================================
  // --- VISITOR'S GIFT GUIDE / CURATED HAMPERS (उपहार) ---
  // ==========================================
  {
    id: 'sano-gift-01',
    name: '"Mitho Aashirwad" (Sweet Blessings) Welcome Baby Hamper',
    category: 'gift_hampers',
    ageStage: 'newborn',
    brand: 'sano.',
    brandScope: 'sano',
    giftRecipient: 'relatives',
    priceNPR: 3850,
    originalPriceNPR: 4500,
    image: '/assets/aistudio/185_97683f83.png',
    galleryImages: [
      '/assets/aistudio/185_97683f83.png',
      '/assets/aistudio/187_1f2cfa20.png',
      '/assets/aistudio/82_8a261b8d.png'
    ],
    fallbackGradient: 'from-[#FFF6E9] to-[#F6ECCF]',
    shortDescription: 'The most beloved gift for Aunties, Uncles & Cousins visiting the hospital. Includes 6-piece organic layette set, beechwood teething rattle, bamboo swaddle, letterpress blessing card, and Marigold ribbon gift box.',
    materials: '100% GOTS Organic Cotton, Natural unfinished beechwood, Kraft recyclable box',
    washCare: 'Care instructions enclosed in gift card.',
    deliveryTime: 'Arrives in 24–48 hours across Kathmandu Valley.',
    featured: true,
    bestseller: true,
    variants: [
      { size: 'Full Luxury Hamper in Keepsake Box', inStock: true, stockCount: 16 }
    ],
    highlights: [
      'Tailored specifically for visiting relatives who want a memorable, premium gift',
      'Includes complimentary personalized handwritten blessing card',
      'Packaged in an elegant Sano cream & ink rigid gift box with marigold ribbon'
    ]
  },
  {
    id: 'sano-gift-02',
    name: '"Aama Ko Sahayatri" (Mother’s Companion) Postpartum Luxury Box',
    category: 'gift_hampers',
    ageStage: 'pregnancy',
    brand: 'sano care.',
    brandScope: 'sano_care',
    giftRecipient: 'friends_colleagues',
    priceNPR: 3450,
    originalPriceNPR: 3950,
    image: '/src/assets/images/category_pregnancy_maternity_1793079669962.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#ECE1D4]',
    shortDescription: 'Everyone brings gifts for the baby; this box honors and pampers the new mother. Includes Herbal Nipple Recovery Balm, Organic Nursing Tea, Thermal Bamboo Bed Socks, Himalayan Lavender Room Mist & Silk Sleep Mask.',
    materials: 'Organic herbs, cold-pressed oils, pure bamboo viscose, mulberry silk',
    washCare: 'Store cosmetics below 25°C.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    featured: true,
    bestseller: true,
    variants: [
      { size: 'New Mom Pampering Deluxe Box', inStock: true, stockCount: 14 }
    ],
    highlights: [
      'Top choice for friends, office colleagues & sisterhood circles',
      'Brings deep emotional comfort to the healing mother in hospital or home',
      'Includes letterpress "You are doing wonderful, Mama" card'
    ]
  },
  {
    id: 'sano-gift-03',
    name: '"Subhakhyana" Grandparents’ Blessing Heirloom Box',
    category: 'gift_hampers',
    ageStage: 'newborn',
    brand: 'sano.',
    brandScope: 'sano',
    giftRecipient: 'grandparents',
    priceNPR: 5200,
    originalPriceNPR: 5900,
    image: '/assets/aistudio/128_b543b43d.jpg',
    galleryImages: [
      '/assets/aistudio/128_b543b43d.jpg',
      '/assets/aistudio/140_437e3c30.png'
    ],
    fallbackGradient: 'from-[#FFF6E9] to-[#DFD7CC]',
    shortDescription: 'The prestigious blessing gift from Nana-Nani & Daja-Daji. Pure Bamboo Viscose 2-Way Zip Sleepsuit, Cashmere-Touch Cellular Blanket, Traditional Nepali Silver-plated First Curl Keepsake Tin, and Cold-Pressed Sweet Almond Massage Oil.',
    materials: '95% Bamboo Rayon, 100% Cotton cellular weave, Silver plated brass keepsake tin, Pure sweet almond oil',
    washCare: 'Blanket & sleepsuit machine washable delicate 30°C.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    featured: true,
    variants: [
      { size: 'Heirloom Keepsake Wooden Chest', inStock: true, stockCount: 8 }
    ],
    highlights: [
      'Specially designed for Grandparents presenting their blessings (Aashirwad)',
      'Lasting keepsake that families preserve for generations',
      'Free customized brass name tag engraving available on request via WhatsApp'
    ]
  },
  {
    id: 'sano-gift-04',
    name: '"Pahilo Maya" (First Love) Relatives & Office Colleagues Gift Basket',
    category: 'gift_hampers',
    ageStage: 'newborn',
    brand: 'sano.',
    brandScope: 'sano',
    giftRecipient: 'friends_colleagues',
    priceNPR: 2950,
    originalPriceNPR: 3400,
    image: '/assets/aistudio/94_fd502493.png',
    galleryImages: [
      '/assets/aistudio/94_fd502493.png',
      '/assets/aistudio/96_d6611a6d.png'
    ],
    fallbackGradient: 'from-[#FFF6E9] to-[#E3EBE4]',
    shortDescription: 'A cheerful, gender-neutral gifting solution for coworkers, neighbors, and casual hospital visitors. Contains Organic Dino Bodysuit Duo, Food-grade Silicone Teething Star, Bamboo Drool Bibs (3-Pack), and gift packaging.',
    materials: '100% Organic Interlock Cotton, Food-grade platinum silicone',
    washCare: 'Machine wash 40°C.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: 'Gender Neutral Gift Basket', inStock: true, stockCount: 20 }
    ],
    highlights: [
      'Takes the guesswork out of sizing and color preferences',
      'Useful from Day 1 to 6 months',
      'Comes ready-to-hand in an artisanal cream basket'
    ]
  },
  {
    id: 'sano-gift-05',
    name: '"Bichar-Purna" Practical Essentials Baby Shower Box',
    category: 'gift_hampers',
    ageStage: 'newborn',
    brand: 'sano care.',
    brandScope: 'sano_care',
    giftRecipient: 'baby_shower',
    priceNPR: 3250,
    originalPriceNPR: 3750,
    image: '/src/assets/images/product_diapers_wipes_1793082162681.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#E5DFD4]',
    shortDescription: 'The "zero-waste, most appreciated" practical box praised by Kathmandu pediatricians. Mega pack of Sano Care Newborn Diapers, 3 packs of 99% Water Wipes, Calendula Barrier Cream, and Soft Washcloth Trio.',
    materials: 'Biodegradable bamboo fibers, pure water, calendula, zinc oxide',
    washCare: 'Disposables and cosmetics for daily hygienic care.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    bestseller: true,
    variants: [
      { size: 'Baby Shower Practical Box (1 Month Supply)', inStock: true, stockCount: 18 }
    ],
    highlights: [
      'Solves the "duplicate cute clothes" dilemma by giving what parents truly use every single day',
      'Saves the new parents Rs. 500+ compared to buying individual items',
      'Includes diaper size upgrade guarantee if baby outgrows NB size'
    ]
  },

  // ==========================================
  // --- DIAPERS & ESSENTIAL CARE ---
  // ==========================================
  {
    id: 'sano-dia-01',
    name: 'Sano Care Cloud-Soft Breathable Pant Diapers',
    category: 'diapering',
    ageStage: 'infant',
    brand: 'sano care.',
    brandScope: 'sano_care',
    priceNPR: 1650,
    originalPriceNPR: 1850,
    image: '/src/assets/images/product_diapers_wipes_1793082162681.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#DFD6C6]',
    shortDescription: '12-Hour leak-lock protection with 360° bubble waistband. Zero fragrance, chlorine, or optical brighteners.',
    materials: 'FSC-certified wood pulp, SAP absorbent core, breathable micro-embossed backsheet',
    washCare: 'Single-use hygienic diaper. Roll and tape before disposal.',
    deliveryTime: 'Arrives in 24–48 hours across Kathmandu Valley.',
    featured: true,
    bestseller: true,
    variants: [
      { size: 'Size S (4–8 kg, 54 count)', inStock: true, stockCount: 42 },
      { size: 'Size M (6–11 kg, 48 count)', inStock: true, stockCount: 38 },
      { size: 'Size L (9–14 kg, 42 count)', inStock: true, stockCount: 35 },
      { size: 'Size XL (12–17 kg, 36 count)', inStock: true, stockCount: 20 }
    ],
    highlights: ['Wetness indicator turns from yellow to blue', 'Bubble elastic waistband leaves zero red marks', 'Super absorbent core locks moisture in 3 seconds']
  },
  {
    id: 'sano-dia-02',
    name: '99% Pure Water Bamboo Biodegradable Baby Wipes (3-Pack)',
    category: 'diapering',
    ageStage: 'newborn',
    brand: 'sano care.',
    brandScope: 'sano_care',
    priceNPR: 750,
    image: '/src/assets/images/product_diapers_wipes_1793082162681.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#DFD6C6]',
    shortDescription: 'Extra-thick embossed bamboo viscose wipes saturated with 99% purified water and aloe vera extract.',
    materials: '100% Biodegradable Bamboo viscose, 99.2% Purified Water, Aloe leaf extract',
    washCare: 'Store in cool dry place. Keep plastic flip lid snapped shut.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    bestseller: true,
    variants: [
      { size: 'Triple Pack (3 x 80 Wipes = 240 Wipes)', inStock: true, stockCount: 50 },
      { size: 'Single Travel Pack (80 Wipes)', inStock: true, stockCount: 65 }
    ],
    highlights: ['Alcohol, fragrance, and paraben free', 'Hypoallergenic on sensitive eczema-prone newborn skin', '100% Biodegradable plant cloth']
  },
  {
    id: 'sano-dia-03',
    name: 'Calendula & Zinc Oxide Diaper Barrier Cream (100g)',
    category: 'baby_care',
    ageStage: 'newborn',
    brand: 'sano care.',
    brandScope: 'sano_care',
    priceNPR: 680,
    image: '/src/assets/images/category_baby_care_1793079670129.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#ECE5D9]',
    shortDescription: 'Forms a breathable protective moisture shield against wetness and acidity. Calms redness overnight.',
    materials: '12% Non-nano zinc oxide, organic calendula officinalis, sweet almond oil, shea butter',
    washCare: 'Apply a thin layer at every diaper change after cleaning.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: '100g Squeeze Tube', inStock: true, stockCount: 40 }
    ],
    highlights: ['Non-nano zinc oxide safe for daily use', 'Soothes diaper irritation in 12 hours', 'Clean wipe-off without scrubbing']
  },

  // ==========================================
  // --- FEEDING & NURSERY ---
  // ==========================================
  {
    id: 'sano-feed-01',
    name: 'Food-Grade Silicone Suction Weaning Bowl & Teething Spoon',
    category: 'feeding',
    ageStage: 'infant',
    brand: 'sano care.',
    brandScope: 'sano_care',
    priceNPR: 1450,
    image: '/src/assets/images/product_silicone_bowl_feeding_1793082161750.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#DFD6C6]',
    shortDescription: 'Strong table-lock suction base prevents high-chair spills. Soft gum-friendly teething spoon included.',
    materials: '100% Platinum food-grade silicone, BPA, BPS & PVC free',
    washCare: 'Dishwasher, sterilizer, and microwave safe up to 220°C.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    bestseller: true,
    variants: [
      { size: 'Standard 350ml Bowl + Spoon', inStock: true, stockCount: 20 },
      { size: 'Divided 3-Compartment Plate + Spoon', inStock: true, stockCount: 14 }
    ],
    highlights: ['Unbreakable drop-proof', 'Ergonomic shape for self-feeding', 'Stain-resistant with dal and carrot puree']
  },
  {
    id: 'sano-feed-02',
    name: 'Anti-Colic Borosilicate Glass Baby Bottle with Natural Latch Nipple',
    category: 'feeding',
    ageStage: 'newborn',
    brand: 'sano care.',
    brandScope: 'sano_care',
    priceNPR: 1250,
    image: '/src/assets/images/category_baby_care_1793079670129.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#ECE5D9]',
    shortDescription: 'Medical grade thermal shock-resistant borosilicate glass with breast-like silicone nipple and anti-colic air valve.',
    materials: 'Pharmaceutical borosilicate glass, food-grade silicone',
    washCare: 'Boil or steam sterilize before first use.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: '150ml (Slow Flow 0–3M)', inStock: true, stockCount: 18 },
      { size: '240ml (Medium Flow 3M+)', inStock: true, stockCount: 22 }
    ],
    highlights: ['Thermal shock proof — goes from fridge to warm water bath safely', 'Reduces swallowed air and colic hiccups', 'Easy-to-read milliliter markings']
  },

  // ==========================================
  // --- TOYS, LEARNING & OLDER KIDS (TO 14 YEARS) ---
  // ==========================================
  {
    id: 'sano-toy-01',
    name: 'Natural Beechwood Sensory Activity Cube (5-in-1)',
    category: 'play_learning',
    ageStage: 'toddler',
    brand: 'sano.',
    brandScope: 'sano',
    priceNPR: 2850,
    originalPriceNPR: 3300,
    image: '/src/assets/images/product_wooden_puzzle_montessori_1793082162657.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#DFD6C6]',
    shortDescription: 'Bead maze, shape sorter, spinning gears, animal sliders, and counting abacus. Smooth rounded solid beechwood.',
    materials: 'Sustainably sourced beechwood, non-toxic water-based paints',
    washCare: 'Wipe with damp cloth. Do not soak in water.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    featured: true,
    variants: [
      { size: 'Compact 20x20 cm Cube', inStock: true, stockCount: 14 }
    ],
    highlights: ['Enhances fine motor coordination and spatial logic', 'No sharp corners or splintering edges', 'Reversible maze lid stores inside cube for compact space']
  },
  {
    id: 'sano-kid-01',
    name: 'Pre-Schooler Lightweight Packable Windbreaker Rain Jacket',
    category: 'apparel',
    ageStage: 'early_child',
    brand: 'sano.',
    brandScope: 'sano',
    priceNPR: 2350,
    image: '/src/assets/images/category_toddler_play_1793079670777.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#D5E3EB]',
    shortDescription: 'Water-resistant coated ripstop shell with breathable cotton lining and high-visibility 3M reflective tape for walks.',
    materials: 'Shell: 100% Recycled Poly, Lining: 100% Combed Cotton',
    washCare: 'Machine wash 30°C gentle. Do not iron.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: '4–5y (104–110 cm)', inStock: true, stockCount: 15 },
      { size: '5–6y (110–116 cm)', inStock: true, stockCount: 12 },
      { size: '6–7y (116–122 cm)', inStock: true, stockCount: 10 }
    ],
    highlights: ['Packs into its own internal pocket pouch', 'Water-shedding Bionic Finish ECO coating', 'Comfort chin guard over zipper']
  },
  {
    id: 'sano-mid-01',
    name: 'Spine-Support Ergonomic Student Backpack (20L)',
    category: 'outdoor_safety',
    ageStage: 'middle_child',
    brand: 'sano.',
    brandScope: 'sano',
    priceNPR: 3450,
    originalPriceNPR: 3900,
    image: '/src/assets/images/category_school_kids_1793079671395.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#E2D9CC]',
    shortDescription: 'Anatomically molded padded back panel with chest stabilizer strap. Redistributes heavy book weight safely away from lumbar spine.',
    materials: '600D Cordura water-repellent fabric, YKK zippers, high-density EVA back pads',
    washCare: 'Spot clean with mild soapy water. Air dry.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    featured: true,
    variants: [
      { size: '20L Capacity (Ages 8–11)', inStock: true, stockCount: 18 }
    ],
    highlights: ['Endorsed by pediatric orthopedic specialists', 'Dedicated padded tablet & homework folder sleeve', 'Water bottle mesh pockets on both sides']
  },
  {
    id: 'sano-teen-01',
    name: 'Relaxed Fit Heavyweight Organic Hoodie (340 GSM)',
    category: 'apparel',
    ageStage: 'teen',
    brand: 'sano.',
    brandScope: 'sano',
    priceNPR: 2850,
    originalPriceNPR: 3200,
    image: '/src/assets/images/product_teen_hoodie_1793082162707.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#E3D9CC]',
    shortDescription: 'Substantial brushed organic fleece with drop shoulders and double-layered hood. Built for Kathmandu winters.',
    materials: '100% GOTS certified organic combed cotton (340 GSM)',
    washCare: 'Cold wash inside out. Tumble dry low.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    featured: true,
    variants: [
      { size: '12–13y (146–154 cm)', inStock: true, stockCount: 14 },
      { size: '13–14y (154–164 cm)', inStock: true, stockCount: 12 }
    ],
    highlights: ['Warm dense loopback fleece', 'No front logo blast; minimal clean aesthetic', 'Pre-shrunk fabric']
  },
  {
    id: 'sano-teen-02',
    name: 'Gentle Salicylic + Niacinamide Teen Cleanser (150ml)',
    category: 'baby_care',
    ageStage: 'teen',
    brand: 'sano care.',
    brandScope: 'sano_care',
    priceNPR: 1100,
    image: '/src/assets/images/category_baby_care_1793079670129.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#ECE5D8]',
    shortDescription: 'Specially formulated for changing adolescent skin. Clears congested pores without stripping natural oils.',
    materials: '0.5% encapsulated salicylic acid, 2% niacinamide, green tea extract, ceramides',
    washCare: 'Use morning and evening followed by moisturizer.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: '150ml Pump Bottle', inStock: true, stockCount: 24 }
    ],
    highlights: ['Non-comedogenic & fragrance free', 'Maintains healthy acid mantle', 'Does not cause flaking or redness']
  }
];

export const HOSPITAL_BAG_CHECKLIST = [
  // 1. In Labour Before Delivery
  { 
    phase: 'labour_delivery',
    phaseLabel: '1. In Labour (Before Delivery)',
    item: 'Labour & Delivery Bamboo Snap Gown', 
    reason: 'Nurse & doctor access for epidural + immediate skin-to-skin chest snaps', 
    includedProductId: 'sano-hb-lab-01' 
  },
  { 
    phase: 'labour_delivery',
    phaseLabel: '1. In Labour (Before Delivery)',
    item: 'Grippy Acupressure Non-Skid Warm Socks & Squeeze Ball', 
    reason: 'Prevents slips on cold hospital tiles and eases contraction pain', 
    includedProductId: 'sano-hb-lab-02' 
  },
  { 
    phase: 'labour_delivery',
    phaseLabel: '1. In Labour (Before Delivery)',
    item: 'Rosewater Cooling Mist & Hydration Lip Salve', 
    reason: 'Combats dry delivery ward air and refreshes face during pushing', 
    includedProductId: 'sano-hb-lab-03' 
  },

  // 2. For Mother After Delivery
  { 
    phase: 'after_delivery',
    phaseLabel: '2. For Mother After Delivery',
    item: 'Postpartum Seamless Recovery Briefs (5-Pack)', 
    reason: 'High waist sits gently above C-section incision lines without pressing', 
    includedProductId: 'sano-hb-aft-01' 
  },
  { 
    phase: 'after_delivery',
    phaseLabel: '2. For Mother After Delivery',
    item: 'Ergonomic Angled Peri Wash Bottle & Soothing Wipes', 
    reason: 'Painless warm water hygiene without painful friction or stinging', 
    includedProductId: 'sano-hb-aft-02' 
  },
  { 
    phase: 'after_delivery',
    phaseLabel: '2. For Mother After Delivery',
    item: 'Pure Herbal Nipple & Postpartum Recovery Balm (50g)', 
    reason: 'Immediate soothing relief during 1st nursing attempts; 100% edible-grade', 
    includedProductId: 'sano-hb-aft-03' 
  },
  { 
    phase: 'after_delivery',
    phaseLabel: '2. For Mother After Delivery',
    item: 'Organic Bamboo Washable Nursing Breast Pads', 
    reason: 'Absorbs let-down milk leaks without sticking to delicate skin', 
    includedProductId: 'sano-hb-aft-04' 
  },

  // 3. For Newborn Baby
  { 
    phase: 'for_baby',
    phaseLabel: '3. For Newborn Baby',
    item: 'First-Day Organic Wrap Kimono & Footed Pant Set', 
    reason: 'Protects tender umbilical cord stump without tight waistband chafing', 
    includedProductId: 'sano-hb-bb-01' 
  },
  { 
    phase: 'for_baby',
    phaseLabel: '3. For Newborn Baby',
    item: 'Bamboo Muslin Receiving Swaddles (2-Pack)', 
    reason: 'Regulates newborn body temperature and prevents sudden startle reflex', 
    includedProductId: 'sano-hb-bb-02' 
  },
  { 
    phase: 'for_baby',
    phaseLabel: '3. For Newborn Baby',
    item: 'Knot Beanie Cap & No-Scratch Mittens Duo', 
    reason: 'Prevents vital head heat loss and fingernail scratches in first 72 hours', 
    includedProductId: 'sano-hb-bb-03' 
  },
  { 
    phase: 'for_baby',
    phaseLabel: '3. For Newborn Baby',
    item: 'Hospital Diaper Caddy & 99% Water Wipes Starter Set', 
    reason: 'Clean meconium gently with zero alcohol or perfume stinging', 
    includedProductId: 'sano-hb-bb-04' 
  }
];
