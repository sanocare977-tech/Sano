import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  Plus, 
  ShoppingBag, 
  HeartHandshake, 
  Baby, 
  Activity, 
  ShieldCheck, 
  ArrowRight,
  Info
} from 'lucide-react';
import { Product } from '../types';

export interface HospitalBagItem {
  id: string;
  name: string;
  categoryPhase: 'before_delivery' | 'after_delivery' | 'for_newborn';
  priceNPR: number;
  originalPriceNPR?: number;
  image: string;
  shortDescription: string;
  whyEssential: string;
  specTag: string;
  nurseTip: string;
  defaultSize: string;
}

export const HOSPITAL_BAG_ESSENTIALS: HospitalBagItem[] = [
  // 1. Before Delivery (Labour)
  {
    id: 'hb-bd-01',
    name: 'Labour & Delivery Bamboo Snap Hospital Gown',
    categoryPhase: 'before_delivery',
    priceNPR: 2250,
    originalPriceNPR: 2650,
    image: '/src/assets/images/category_pregnancy_maternity_1793079669962.jpg',
    shortDescription: 'Silky-soft bamboo gown with full snap-down back for epidural and shoulder snaps for immediate skin-to-skin bonding.',
    whyEssential: 'Preserves dignity while giving nurses and obstetricians instant medical access.',
    specTag: '95% Bamboo Rayon · Full Snap Back',
    nurseTip: 'Hospital-provided gowns are stiff and open in back; this keeps you comfortable during long labor walks.',
    defaultSize: 'M/L (Free Size)'
  },
  {
    id: 'hb-bd-02',
    name: 'Labour Grippy Acupressure Non-Skid Warm Socks & Squeeze Ball',
    categoryPhase: 'before_delivery',
    priceNPR: 650,
    originalPriceNPR: 800,
    image: '/src/assets/images/category_baby_care_1793079670129.jpg',
    shortDescription: 'Cushioned terry cotton socks with anti-slip silicone floor treads plus ergonomic foam contraction stress ball.',
    whyEssential: 'Hospital ward floor tiles are cold and slippery; squeeze ball helps manage peak contraction intensity.',
    specTag: 'Silicone Non-Skid Treads · Thermal Terry',
    nurseTip: 'Wear during labor pacing in the ward to prevent slipping and keep feet toasty.',
    defaultSize: 'Free Size'
  },
  {
    id: 'hb-bd-03',
    name: 'Pure Organic Himalayan Rosewater & Lip Hydration Labor Mist',
    categoryPhase: 'before_delivery',
    priceNPR: 850,
    originalPriceNPR: 950,
    image: '/src/assets/images/category_baby_care_1793079670129.jpg',
    shortDescription: '100% Steam-distilled rosewater face cooling spray paired with organic beeswax honey lip balm.',
    whyEssential: 'Delivery room oxygen and air-conditioning severely dry out lips and face during pushing.',
    specTag: '100% Natural Steam Distilled · No Perfume',
    nurseTip: 'Have your birth partner spritz your face and neck between intense contractions.',
    defaultSize: '100ml Mist + 15g Balm'
  },

  // 2. For Mother (After Delivery)
  {
    id: 'hb-ad-01',
    name: 'Postpartum Seamless High-Waist Recovery Briefs (5-Pack)',
    categoryPhase: 'after_delivery',
    priceNPR: 1250,
    originalPriceNPR: 1500,
    image: '/src/assets/images/category_pregnancy_maternity_1793079669962.jpg',
    shortDescription: 'Ultra-stretchy, breathable microfiber postpartum briefs designed to hold heavy pads securely without pressing on C-section scars.',
    whyEssential: 'Normal underwear rubs directly on surgical incisions or tender perineal stitches.',
    specTag: 'Latex-Free · High-Waist C-Section Safe',
    nurseTip: 'High-waist band sits 2 inches above the pubic bone so it never snags incision staples.',
    defaultSize: 'L/XL (75–110 cm waist)'
  },
  {
    id: 'hb-ad-02',
    name: 'Ergonomic Angled Peri Wash Bottle & Soothing Wipes Set',
    categoryPhase: 'after_delivery',
    priceNPR: 1450,
    originalPriceNPR: 1750,
    image: '/src/assets/images/category_baby_care_1793079670129.jpg',
    shortDescription: 'Upside-down angled nozzle delivers a gentle, continuous warm water stream to cleanse tender perineal tears without wiping.',
    whyEssential: 'Eliminates painful stinging when urinating post-delivery.',
    specTag: '350ml Ergonomic Reservoir · Retractable Spout',
    nurseTip: 'Fill with lukewarm water and spray while urinating to dilute acidity and avoid pain.',
    defaultSize: '350ml + 30 Soothing Wipes'
  },
  {
    id: 'hb-ad-03',
    name: 'Pure Herbal Nipple & Postpartum Recovery Balm (50g)',
    categoryPhase: 'after_delivery',
    priceNPR: 950,
    originalPriceNPR: 1100,
    image: '/src/assets/images/category_baby_care_1793079670129.jpg',
    shortDescription: '100% Edible-grade plant oils. Immediately relieves cracked, sore nipples from newborn latch learning.',
    whyEssential: 'Safe for newborn to ingest; zero wash-off needed before nursing.',
    specTag: 'Edible-Grade · Lanolin & Fragrance Free',
    nurseTip: 'Apply a pea-sized amount immediately after every nursing session from Day 1.',
    defaultSize: '50g Glass Jar'
  },
  {
    id: 'hb-ad-04',
    name: 'Organic Bamboo Washable Nursing Breast Pads (4 Pairs)',
    categoryPhase: 'after_delivery',
    priceNPR: 1100,
    originalPriceNPR: 1300,
    image: '/src/assets/images/hero_sano_parent_child_1793079669923.jpg',
    shortDescription: 'Ultra-absorbent 3-layer organic bamboo fleece with waterproof leak-proof backing. Mesh laundry wash bag included.',
    whyEssential: 'Catches sudden milk let-down reflex and prevents painful bra friction.',
    specTag: '3-Layer Organic Bamboo · Wash Bag Included',
    nurseTip: 'Much softer than disposable paper nursing pads which stick to cracked skin.',
    defaultSize: 'Pack of 8 (4 Pairs)'
  },

  // 3. For Newborn
  {
    id: 'hb-nb-01',
    name: 'First-Day Organic Wrap Kimono & Footed Pant Layette',
    categoryPhase: 'for_newborn',
    priceNPR: 1650,
    originalPriceNPR: 1950,
    image: '/assets/aistudio/185_97683f83.png',
    shortDescription: 'Front-wrap kimono top with snaps that avoids pulling over the soft fontanelle, plus pants with umbilical cord cutout clearance.',
    whyEssential: 'Pediatricians prefer front-wrap clothing to safeguard the healing umbilical stump.',
    specTag: '100% GOTS Organic Cotton · Fold-Over Mitts',
    nurseTip: 'Newborns hate clothes pulled over their face; kimono wrap keeps them calm and warm.',
    defaultSize: 'Newborn (50–56 cm)'
  },
  {
    id: 'hb-nb-02',
    name: 'Bamboo Muslin Breathable Receiving Swaddles (2-Pack)',
    categoryPhase: 'for_newborn',
    priceNPR: 1850,
    originalPriceNPR: 2200,
    image: '/src/assets/images/hero_sano_parent_child_1793079669923.jpg',
    shortDescription: 'Silky open-weave 120 x 120 cm bamboo muslin duo. Regulates newborn temperature and prevents startle reflex.',
    whyEssential: 'Recreates the cozy, snug security of the womb to promote longer newborn sleep.',
    specTag: '120 x 120 cm · 70% Bamboo / 30% Cotton',
    nurseTip: 'Pre-washed and breathable so baby stays warm without overheating in hospital wards.',
    defaultSize: '120 x 120 cm (2-Pack)'
  },
  {
    id: 'hb-nb-03',
    name: 'Adjustable Knot Beanie Cap & No-Scratch Mittens Duo',
    categoryPhase: 'for_newborn',
    priceNPR: 750,
    originalPriceNPR: 900,
    image: '/assets/aistudio/83_67b10a01.png',
    shortDescription: 'Soft organic rib beanie to prevent head heat loss post-delivery, paired with stay-on wrist scratch mittens.',
    whyEssential: 'Newborns lose up to 30% of body heat through their head during the first 48 hours.',
    specTag: '100% Organic Rib Cotton · Adjustable Knot',
    nurseTip: 'Newborn fingernails are razor sharp; mittens prevent accidental corneal scratches.',
    defaultSize: '0–3M (Hospital Newborn)'
  },
  {
    id: 'hb-nb-04',
    name: 'Hospital Diaper Caddy & 99% Pure Water Wipes Starter Set',
    categoryPhase: 'for_newborn',
    priceNPR: 1350,
    originalPriceNPR: 1600,
    image: '/src/assets/images/product_diapers_wipes_1793082162681.jpg',
    shortDescription: 'Felt organizer caddy filled with 24 Newborn tape diapers, 2 packs of 99% pure water wipes, and zinc barrier rash balm.',
    whyEssential: 'Cleans sticky newborn meconium stools gently without perfume or alcohol stinging.',
    specTag: '24 NB Diapers + 160 Water Wipes + Zinc Balm',
    nurseTip: 'Keep this right on the hospital bed bedside table for quick 2 AM changes.',
    defaultSize: 'Newborn Kit (<5 kg)'
  }
];

interface HospitalBagSectionProps {
  onAddToCart: (product: Product, variant: string) => void;
  onSelectProduct?: (product: Product) => void;
}

export const HospitalBagSection: React.FC<HospitalBagSectionProps> = ({
  onAddToCart,
  onSelectProduct,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'before_delivery' | 'after_delivery' | 'for_newborn'>('before_delivery');
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const categories = [
    { 
      id: 'before_delivery', 
      label: 'Before Delivery (Labour)', 
      icon: Activity,
      count: HOSPITAL_BAG_ESSENTIALS.filter(i => i.categoryPhase === 'before_delivery').length,
      desc: 'Comfort gown, non-skid socks & hydration mist for delivery room comfort.'
    },
    { 
      id: 'after_delivery', 
      label: 'For Mother (After Delivery)', 
      icon: HeartHandshake,
      count: HOSPITAL_BAG_ESSENTIALS.filter(i => i.categoryPhase === 'after_delivery').length,
      desc: 'Recovery briefs, peri wash bottle, nursing balm & pads for postpartum healing.'
    },
    { 
      id: 'for_newborn', 
      label: 'For Newborn', 
      icon: Baby,
      count: HOSPITAL_BAG_ESSENTIALS.filter(i => i.categoryPhase === 'for_newborn').length,
      desc: 'Wrap kimono, muslin swaddles, knot hat & water wipes for baby’s first 72 hours.'
    },
  ];

  const currentItems = activeCategory === 'all'
    ? HOSPITAL_BAG_ESSENTIALS
    : HOSPITAL_BAG_ESSENTIALS.filter((item) => item.categoryPhase === activeCategory);

  const handleAdd = (item: HospitalBagItem) => {
    // Convert to Product structure for cart
    const prod: Product = {
      id: item.id,
      name: item.name,
      category: 'hospital_bag',
      ageStage: item.categoryPhase === 'for_newborn' ? 'newborn' : 'pregnancy',
      priceNPR: item.priceNPR,
      originalPriceNPR: item.originalPriceNPR,
      image: item.image,
      fallbackGradient: 'from-[#FFF6E9] to-[#EAE0D0]',
      shortDescription: item.shortDescription,
      materials: item.specTag,
      washCare: item.nurseTip,
      deliveryTime: 'Arrives in 24 hours in the Valley.',
      variants: [{ size: item.defaultSize, inStock: true, stockCount: 20 }],
      highlights: [item.whyEssential, item.nurseTip]
    };
    onAddToCart(prod, item.defaultSize);

    setAddedItems(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  const handleAddAllPhase = () => {
    currentItems.forEach((item) => {
      const prod: Product = {
        id: item.id,
        name: item.name,
        category: 'hospital_bag',
        ageStage: item.categoryPhase === 'for_newborn' ? 'newborn' : 'pregnancy',
        priceNPR: item.priceNPR,
        originalPriceNPR: item.originalPriceNPR,
        image: item.image,
        fallbackGradient: 'from-[#FFF6E9] to-[#EAE0D0]',
        shortDescription: item.shortDescription,
        materials: item.specTag,
        washCare: item.nurseTip,
        deliveryTime: 'Arrives in 24 hours in the Valley.',
        variants: [{ size: item.defaultSize, inStock: true, stockCount: 20 }],
        highlights: [item.whyEssential, item.nurseTip]
      };
      onAddToCart(prod, item.defaultSize);
    });
  };

  return (
    <section id="hospital-bag" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1F2A44]/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5B301]/20 text-[#1F2A44] text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F5B301]" />
            <span>Maternity & Delivery Ward Checklist</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#1F2A44]">
            Hospital Bag Essentials (अस्पताल झोला)
          </h2>
          <p className="text-sm sm:text-base text-[#1F2A44]/75 max-w-2xl mt-1">
            Organized into 3 distinct phases so you pack exactly what is needed for each step — tested by maternity nurses and mothers across Kathmandu hospitals (Norvic, Grande, Teaching, Patan, Mediciti).
          </p>
        </div>

        {/* Action: Add all in this category */}
        <button
          onClick={handleAddAllPhase}
          className="self-start md:self-auto px-5 py-2.5 text-xs sm:text-sm font-bold bg-[#1F2A44] text-[#FFF6E9] rounded-full hover:bg-[#1F2A44]/85 transition-colors flex items-center gap-2 cursor-pointer shrink-0"
        >
          <ShoppingBag className="w-4 h-4 text-[#F5B301]" />
          <span>Add Complete {categories.find(c => c.id === activeCategory)?.label || 'Phase'} to Bag</span>
        </button>
      </div>

      {/* 3 Distinct Category Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-[#1F2A44] text-[#FFF6E9] border-[#1F2A44]'
                  : 'bg-white text-[#1F2A44] border-[#1F2A44]/15 hover:border-[#1F2A44]/35 hover:bg-[#FFF6E9]/40'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-[#FFF6E9]/20 text-[#F5B301]' : 'bg-[#FFF6E9] text-[#1F2A44]'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <strong className="text-sm sm:text-base font-bold">
                    {cat.label}
                  </strong>
                </div>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-[#F5B301] text-[#1F2A44]' : 'bg-[#1F2A44]/10 text-[#1F2A44]'
                }`}>
                  {cat.count} Items
                </span>
              </div>
              <p className={`text-xs line-clamp-2 leading-relaxed ${
                isActive ? 'text-[#FFF6E9]/80' : 'text-[#1F2A44]/70'
              }`}>
                {cat.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Product Recommendations Grid for Current Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {currentItems.map((item) => {
          const isAdded = !!addedItems[item.id];
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#1F2A44]/15 overflow-hidden flex flex-col justify-between hover:border-[#1F2A44]/40 transition-colors"
            >
              {/* Image & Tag */}
              <div className="relative aspect-4/3 bg-[#FFF6E9] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#1F2A44] text-[#FFF6E9]">
                    {item.specTag}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-base sm:text-lg font-bold text-[#1F2A44] leading-snug mb-1.5">
                    {item.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-base sm:text-lg font-bold text-[#1F2A44]">
                      Rs. {item.priceNPR.toLocaleString()}
                    </span>
                    {item.originalPriceNPR && (
                      <span className="text-xs text-[#1F2A44]/45 line-through">
                        Rs. {item.originalPriceNPR.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#1F2A44]/75 mb-3 leading-relaxed">
                    {item.shortDescription}
                  </p>

                  {/* Why Essential & Nurse Tip Box */}
                  <div className="space-y-2 mb-4 bg-[#FFF6E9]/70 p-3 rounded-xl border border-[#1F2A44]/8 text-xs">
                    <div className="flex items-start gap-1.5 text-[#1F2A44]/85">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#5DAA7A] shrink-0 mt-0.5" />
                      <span><strong>Why you need it:</strong> {item.whyEssential}</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-[#1F2A44]/70 italic text-[11px]">
                      <Info className="w-3 h-3 text-[#F5B301] shrink-0 mt-0.5" />
                      <span><strong>Nurse tip:</strong> {item.nurseTip}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Add to Bag */}
                <div className="pt-3 border-t border-[#1F2A44]/10 flex items-center justify-between gap-2">
                  <span className="text-xs text-[#5DAA7A] font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>In Stock · Size {item.defaultSize}</span>
                  </span>

                  <button
                    onClick={() => handleAdd(item)}
                    className={`px-4 py-2 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                      isAdded
                        ? 'bg-[#5DAA7A] text-white'
                        : 'bg-[#1F2A44] text-[#FFF6E9] hover:bg-[#1F2A44]/85'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 text-[#F5B301]" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hospital Delivery Notice */}
      <div className="mt-8 p-4 rounded-2xl bg-[#FFF6E9] border border-[#1F2A44]/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#1F2A44]/80">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#F5B301] shrink-0" />
          <span>
            <strong>Need emergency same-day delivery to hospital?</strong> Orders placed before 1:00 PM are dispatched within 3 hours directly to Kathmandu maternity wards.
          </span>
        </div>
        <button
          onClick={() => {
            const url = `https://wa.me/9779801234567?text=${encodeURIComponent(
              'Hello Sano Support, I need emergency hospital bag items delivered to maternity ward today.'
            )}`;
            window.open(url, '_blank');
          }}
          className="text-xs font-bold text-[#1F2A44] hover:underline whitespace-nowrap cursor-pointer"
        >
          WhatsApp Hospital Dispatch →
        </button>
      </div>
    </section>
  );
};
