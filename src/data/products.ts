import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // --- PREGNANCY & MATERNITY ---
  {
    id: 'sano-mat-01',
    name: 'Ergonomic Organic Cotton Maternity Body Pillow',
    category: 'maternity_care',
    ageStage: 'pregnancy',
    priceNPR: 3250,
    originalPriceNPR: 3600,
    image: '/src/assets/images/category_pregnancy_maternity_1793079669962.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#EAE0D0]',
    shortDescription: 'C-shaped contoured full-body support for spine, belly, and hips. Removable washable cover.',
    materials: '100% GOTS organic cotton outer, hypoallergenic micro-poly filling',
    washCare: 'Machine wash outer cover at 30°C. Do not tumble dry.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    featured: true,
    bestseller: true,
    variants: [
      { size: 'Full Length (140 cm)', inStock: true, stockCount: 14 },
      { size: 'Compact Travel (100 cm)', inStock: true, stockCount: 8 }
    ],
    highlights: ['Eases lower back strain', 'Ideal for side sleeping', 'Transitions to nursing support after birth']
  },
  {
    id: 'sano-mat-02',
    name: 'Pure Herbal Nipple & Postpartum Recovery Balm',
    category: 'maternity_care',
    ageStage: 'pregnancy',
    priceNPR: 950,
    image: '/src/assets/images/category_baby_care_1793079670129.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#F1E8DC]',
    shortDescription: '100% edible-grade organic plant oils. Safe for nursing without wiping off before feeding.',
    materials: 'Cold-pressed coconut, organic beeswax, calendula flower extract, shea butter',
    washCare: 'Store in a cool dry place below 25°C.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    bestseller: true,
    variants: [
      { size: '50g Glass Jar', inStock: true, stockCount: 26 },
      { size: '100g Value Pack', inStock: true, stockCount: 12 }
    ],
    highlights: ['Lanolin-free & fragrance-free', 'No wash-off required before nursing', 'Made in small batches']
  },
  {
    id: 'sano-mat-03',
    name: 'Hospital Delivery Bag Essentials Organizer Kit',
    category: 'maternity_care',
    ageStage: 'pregnancy',
    priceNPR: 4800,
    originalPriceNPR: 5200,
    image: '/src/assets/images/category_pregnancy_maternity_1793079669962.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#E3D9C9]',
    shortDescription: 'Curated 9-piece kit for labor, recovery, and baby’s first 48 hours. Labeled pouches included.',
    materials: 'Organic cotton, unbleached kraft labels, medical-grade components',
    washCare: 'Pouches machine washable at 40°C.',
    deliveryTime: 'Arrives next day in Kathmandu Valley.',
    featured: true,
    variants: [
      { size: 'Complete 9-Piece Kit', inStock: true, stockCount: 9 }
    ],
    highlights: ['Includes labor socks, nursing pads, first baby kimono, umbilical wipes, swaddle', 'Clear checklist inside']
  },

  // --- NEWBORN & 0–6 MONTHS ---
  {
    id: 'sano-nb-01',
    name: 'Organic Combed Cotton Kimono Onesie (3-Pack)',
    category: 'apparel',
    ageStage: 'newborn',
    priceNPR: 2150,
    originalPriceNPR: 2450,
    image: '/src/assets/images/product_kimono_onesies_1793082161723.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#DFD6C6]',
    shortDescription: 'Side-snap wrap design so nothing goes over baby’s delicate head. Fold-over scratch mittens.',
    materials: '100% Combed ring-spun organic cotton',
    washCare: 'Machine wash 40°C with gentle baby detergent.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    featured: true,
    bestseller: true,
    variants: [
      { size: '0–3m (56–62 cm)', inStock: true, stockCount: 18 },
      { size: '3–6m (62–68 cm)', inStock: true, stockCount: 15 }
    ],
    highlights: ['Nickel-free YKK snaps', 'No chafing neck labels', 'Pre-washed fabric with zero shrinkage']
  },
  {
    id: 'sano-nb-02',
    name: 'Cold-Pressed Herbal Baby Massage Oil (200ml)',
    category: 'baby_care',
    ageStage: 'newborn',
    priceNPR: 880,
    image: '/src/assets/images/category_baby_care_1793079670129.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#ECE5D9]',
    shortDescription: 'Traditional Nepali baby massage oil formulation with sweet almond, cold-pressed sesame, and chamomile.',
    materials: 'Cold-pressed sweet almond oil, virgin sesame oil, chamomile extract, vitamin E',
    washCare: 'External use only. Patch test recommended.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    bestseller: true,
    variants: [
      { size: '200ml Amber Glass', inStock: true, stockCount: 35 },
      { size: '500ml Family Pump', inStock: true, stockCount: 16 }
    ],
    highlights: ['Nourishes baby skin barrier', 'Strengthens muscle tone during daily massage', 'Zero mineral oil or artificial scent']
  },
  {
    id: 'sano-nb-03',
    name: 'Bamboo Muslin Breathable Swaddle Blankets (Duo)',
    category: 'sleep_nursery',
    ageStage: 'newborn',
    priceNPR: 1850,
    image: '/src/assets/images/hero_sano_parent_child_1793079669923.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#E5DDD0]',
    shortDescription: 'Generous 120 x 120 cm breathable open-weave muslin. Gets softer with every single wash.',
    materials: '70% Bamboo viscose, 30% organic cotton',
    washCare: 'Gentle wash 30°C. Line dry in shade.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: '120 x 120 cm (Pack of 2)', inStock: true, stockCount: 22 }
    ],
    highlights: ['Regulates body temperature', 'Multipurpose: swaddle, nursing cover, pram shade', 'Soft on sensitive eczema-prone skin']
  },

  // --- INFANT 6–12 MONTHS ---
  {
    id: 'sano-inf-01',
    name: 'Food-Grade Silicone Suction Weaning Bowl & Spoon',
    category: 'feeding',
    ageStage: 'infant',
    priceNPR: 1450,
    image: '/src/assets/images/product_silicone_bowl_feeding_1793082161750.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#DFD6C6]',
    shortDescription: 'Strong table-lock suction base prevents high-chair spills. Soft gum-friendly teething spoon included.',
    materials: '100% Platinum food-grade silicone, BPA & PVC free',
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
    id: 'sano-inf-02',
    name: 'Crawl-Guard Reinforced Knee Cotton Romper',
    category: 'apparel',
    ageStage: 'infant',
    priceNPR: 1650,
    image: '/src/assets/images/category_toddler_play_1793079670777.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#E2DAD0]',
    shortDescription: 'Double-layered quilted knee patches protect little knees on hardwood and tiles during crawling milestones.',
    materials: '95% Combed organic cotton, 5% elastane for stretch',
    washCare: 'Machine wash 40°C. Iron on reverse.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: '6–9m (68–74 cm)', inStock: true, stockCount: 19 },
      { size: '9–12m (74–80 cm)', inStock: true, stockCount: 21 }
    ],
    highlights: ['Padded knee protection', 'Two-way diagonal zipper for quick diaper changes', 'No itchy seams']
  },
  {
    id: 'sano-inf-03',
    name: 'Water-Based Bamboo Baby Wipes (6 Packs of 80)',
    category: 'baby_care',
    ageStage: 'infant',
    priceNPR: 1550,
    originalPriceNPR: 1800,
    image: '/src/assets/images/category_baby_care_1793079670129.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#E9E1D4]',
    shortDescription: '99.3% purified Himalayan water with organic aloe. 100% biodegradable unbleached bamboo fibers.',
    materials: 'Organic bamboo fiber, purified reverse-osmosis water, aloe vera extract',
    washCare: 'Reseal flip-top lid after each pull.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    bestseller: true,
    variants: [
      { size: 'Bundle: 6 Packs (480 Wipes)', inStock: true, stockCount: 40 }
    ],
    highlights: ['Zero alcohol, parabens, or added fragrance', 'Extra thick 65 GSM fiber', 'Pediatrician certified']
  },

  // --- TODDLER 1–3 YEARS ---
  {
    id: 'sano-tod-01',
    name: 'Natural Pine Wood Montessori Stacking Rainbow',
    category: 'play_learning',
    ageStage: 'toddler',
    priceNPR: 2450,
    originalPriceNPR: 2800,
    image: '/src/assets/images/category_toddler_play_1793079670777.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#E6DFD4]',
    shortDescription: '8-piece hand-sanded nesting arches. Develops spatial reasoning, balance, and creative open play.',
    materials: 'Solid sustainable pine wood, food-safe waterborne mineral stain',
    washCare: 'Wipe clean with a damp cloth and air dry.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    featured: true,
    bestseller: true,
    variants: [
      { size: '8 Arches (26 cm Base)', inStock: true, stockCount: 16 },
      { size: '12 Arches Maxi (36 cm Base)', inStock: true, stockCount: 7 }
    ],
    highlights: ['Smooth rounded splinter-free edges', 'Zero toxic varnishes', 'Endless imaginative play (bridges, tunnels, caves)']
  },
  {
    id: 'sano-tod-02',
    name: 'Flexible Barefoot First Walking Shoes',
    category: 'apparel',
    ageStage: 'toddler',
    priceNPR: 1850,
    image: '/src/assets/images/product_barefoot_shoes_1793082162872.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#E0D7C9]',
    shortDescription: 'Wide toe box and ultra-flexible 3mm non-slip rubber sole allowing natural foot sensory feedback.',
    materials: 'Breathable organic cotton canvas, natural gum rubber sole',
    washCare: 'Spot clean with mild soap and soft brush.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: '12–18m (Foot 12.0 cm / 80–86 cm)', inStock: true, stockCount: 12 },
      { size: '18–24m (Foot 13.0 cm / 86–92 cm)', inStock: true, stockCount: 15 },
      { size: '2–3y (Foot 14.5 cm / 92–98 cm)', inStock: true, stockCount: 9 }
    ],
    highlights: ['Barefoot concept for natural balance', 'Easy single Velcro strap', 'Zero heel drop']
  },
  {
    id: 'sano-tod-03',
    name: 'Spill-Proof Straw Cup with Weighted Silicone Base',
    category: 'feeding',
    ageStage: 'toddler',
    priceNPR: 1150,
    image: '/src/assets/images/category_toddler_play_1793079670777.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#DFD7CB]',
    shortDescription: 'Weighted flexible straw moves with liquid so toddlers can sip from any angle, even lying down.',
    materials: 'BPA-free Tritan body, food-grade silicone straw and handles',
    washCare: 'Dishwasher safe. Cleaning wire brush included.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: '240ml with Twin Handles', inStock: true, stockCount: 25 }
    ],
    highlights: ['Leak-proof valve system', 'Easy grip handles sized for toddler palms', 'Click-lock lid hygiene cap']
  },

  // --- EARLY CHILDHOOD 4–7 YEARS ---
  {
    id: 'sano-ec-01',
    name: 'Natural Beeswax Crayons & Organic Sketch Kit',
    category: 'play_learning',
    ageStage: 'early_child',
    priceNPR: 1350,
    image: '/src/assets/images/category_school_kids_1793079671395.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#DFD8CE]',
    shortDescription: '12 block and stick beeswax crayons made with natural botanical pigments. Includes 60-page cotton paper pad.',
    materials: 'Pure beeswax, mineral pigments, recycled cotton rag paper',
    washCare: 'Store in cool place away from direct sunlight.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: '12 Colors + A4 Sketchpad Kit', inStock: true, stockCount: 18 }
    ],
    highlights: ['No petrochemical paraffin wax', 'Break-resistant block shape for grip', 'Vibrant light-fast color laydown']
  },
  {
    id: 'sano-ec-02',
    name: 'Organic Cotton Everyday Playset (Top & Bottom)',
    category: 'apparel',
    ageStage: 'early_child',
    priceNPR: 1950,
    image: '/src/assets/images/category_school_kids_1793079671395.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#E5DCD1]',
    shortDescription: 'Stretchy French terry crewneck with adjustable drawstring joggers. Built for playground movement.',
    materials: '100% GOTS organic cotton French terry (260 GSM)',
    washCare: 'Machine wash 30°C. Hang dry.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: '4–5y (104–110 cm)', inStock: true, stockCount: 14 },
      { size: '5–6y (110–116 cm)', inStock: true, stockCount: 16 },
      { size: '6–7y (116–122 cm)', inStock: true, stockCount: 11 }
    ],
    highlights: ['Reinforced pocket bartacks', 'Ribbed cuffs that roll up neatly as child grows', 'Color-fast vegetable dyes']
  },
  {
    id: 'sano-ec-03',
    name: 'Natural Tear-Free Hair & Body Wash (300ml)',
    category: 'baby_care',
    ageStage: 'early_child',
    priceNPR: 920,
    image: '/src/assets/images/category_baby_care_1793079670129.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#ECE3D7]',
    shortDescription: 'Sulfate-free foaming cleanser with oat milk and calendula. Gentle on eyes and sensitive scalps.',
    materials: 'Hydrolyzed oat protein, chamomile water, aloe barbadensis, gentle plant glucosides',
    washCare: 'Store at room temperature.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: '300ml Pump Dispenser', inStock: true, stockCount: 28 },
      { size: '500ml Refill Pouch', inStock: true, stockCount: 15 }
    ],
    highlights: ['Dermatologically ophthalmologist tested', 'No artificial tears anesthetizers', 'pH 5.5 balanced']
  },

  // --- MIDDLE CHILDHOOD 8–11 YEARS ---
  {
    id: 'sano-mc-01',
    name: 'Ergonomic Spine-Support School Pack (18L)',
    category: 'outdoor_safety',
    ageStage: 'middle_child',
    priceNPR: 3650,
    originalPriceNPR: 4100,
    image: '/src/assets/images/product_ergonomic_backpack_1793082163053.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#DFD9CF]',
    shortDescription: 'Padded honeycomb breathable lumbar backpanel and sternum buckle that redistributes textbook weight off spine.',
    materials: '600D recycled water-repellent RPET polyester, YKK zippers, reflective 3M accents',
    washCare: 'Hand clean with mild soap. Do not bleach.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    featured: true,
    variants: [
      { size: '18 Liter (Height 122–146 cm)', inStock: true, stockCount: 17 }
    ],
    highlights: ['Adjustable chest sternum clip', 'Dedicated insulated lunchbox pocket', '360° road safety reflective strips']
  },
  {
    id: 'sano-mc-02',
    name: 'Solar & Mechanical Wooden STEM Construction Lab',
    category: 'play_learning',
    ageStage: 'middle_child',
    priceNPR: 2750,
    image: '/src/assets/images/category_school_kids_1793079671395.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#DFD7CB]',
    shortDescription: 'Build 4 distinct working mechanical models powered by a real mini solar panel and gear train. No glue needed.',
    materials: 'Precision laser-cut birch plywood, mini monocrystalline solar cell, copper gears',
    washCare: 'Keep wooden parts away from excessive moisture.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: 'Complete 186-Piece STEM Kit', inStock: true, stockCount: 13 }
    ],
    highlights: ['Teaches clean energy & gear physics', 'Self-assembly with step-by-step pictorial booklet', 'No batteries required']
  },
  {
    id: 'sano-mc-03',
    name: 'Vacuum Insulated Stainless Steel Flask (500ml)',
    category: 'feeding',
    ageStage: 'middle_child',
    priceNPR: 1450,
    image: '/src/assets/images/hero_sano_parent_child_1793079669923.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#DFD6C7]',
    shortDescription: '18/8 food-grade double-wall vacuum steel. Keeps hot drinks warm 12 hrs, cold water chilled 24 hrs.',
    materials: '18/8 Pro-grade stainless steel, BPA-free silicone bumper cap',
    washCare: 'Hand wash recommended with bottle brush.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: '500ml Sports Cap + Chug Spout', inStock: true, stockCount: 30 }
    ],
    highlights: ['Condensation-free powder coat', 'Includes protective silicone base boot', 'Fits school bag side pouches']
  },

  // --- TEENAGERS 12–14 YEARS ---
  {
    id: 'sano-tn-01',
    name: 'Relaxed Fit Heavyweight Organic Hoodie (340 GSM)',
    category: 'apparel',
    ageStage: 'teen',
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
    id: 'sano-tn-02',
    name: 'Gentle Salicylic + Niacinamide Teen Cleanser (150ml)',
    category: 'baby_care',
    ageStage: 'teen',
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
  },
  {
    id: 'sano-tn-03',
    name: 'Memory Foam Ergonomic Study Posture Cushion',
    category: 'outdoor_safety',
    ageStage: 'teen',
    priceNPR: 2250,
    image: '/src/assets/images/category_school_kids_1793079671395.jpg',
    fallbackGradient: 'from-[#FFF6E9] to-[#E5DDD2]',
    shortDescription: 'U-shaped coccyx relief contour for desks and study chairs during long homework hours.',
    materials: 'High-density slow-rebound memory foam, breathable mesh cover',
    washCare: 'Zippered cover is machine washable at 30°C.',
    deliveryTime: 'Arrives in 24–48 hours in the Valley.',
    variants: [
      { size: 'Standard Desk (45 x 35 x 7 cm)', inStock: true, stockCount: 16 }
    ],
    highlights: ['Relieves tailbone pressure', 'Promotes upright spinal posture', 'Anti-slip rubberized bottom']
  }
];

export const HOSPITAL_BAG_CHECKLIST = [
  { item: 'Organic Kimono Onesies (0-3m, 3 pieces)', reason: 'Doctors prefer front wrap without pull-over heads', includedProductId: 'sano-nb-01' },
  { item: 'Bamboo Muslin Swaddles (2 pieces)', reason: 'Keeps newborn cozy and regulates temperature', includedProductId: 'sano-nb-03' },
  { item: 'Pure Herbal Nipple Balm (50g)', reason: 'Immediate relief during 1st nursing attempts', includedProductId: 'sano-mat-02' },
  { item: 'Biodegradable Bamboo Wipes', reason: 'Gentle on newborn meconium without stinging', includedProductId: 'sano-inf-03' },
  { item: 'Contoured Body Nursing Cushion', reason: 'Comfort while resting on hospital bed', includedProductId: 'sano-mat-01' }
];
