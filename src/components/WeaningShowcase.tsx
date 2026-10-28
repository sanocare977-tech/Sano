import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Check, ShoppingBag, Heart, RefreshCw, Baby, Utensils } from 'lucide-react';
import { Product } from '../types';

interface WeaningProduct {
  id: string;
  title: string;
  subtitle: string;
  category: 'highchair' | 'silicone' | 'bottles' | 'bibs';
  price: number;
  mrp: number;
  image: string;
  ageBracket: string;
  heightLabel: string;
  badge: string;
  safetySpecs: string[];
}

const WEANING_PRODUCTS: WeaningProduct[] = [
  {
    id: 'weaning-1',
    title: 'sano care. Grow-With-Me Convertible Wooden High Chair',
    subtitle: '3-in-1 High Chair, Booster Seat, and Toddler Chair with 5-point safety harness',
    category: 'highchair',
    price: 6850,
    mrp: 8500,
    image: '/src/assets/images/category_toddler_play_1793079670777.jpg',
    ageBracket: '6M – 6Y',
    heightLabel: 'Up to 30 kg',
    badge: '5-Point Safety Harness',
    safetySpecs: ['BPA-Free Removable Tray', 'Waterproof Wipeable Cushion', 'Anti-Slip Solid Beechwood Legs'],
  },
  {
    id: 'weaning-2',
    title: 'Food-Grade Silicone Suction Bowl, Plate & Spoon Set',
    subtitle: 'Mess-proof suction base locks to tray; prevents tipping and spills during baby-led weaning',
    category: 'silicone',
    price: 1450,
    mrp: 1950,
    image: '/src/assets/images/product_silicone_bowl_feeding_1793082161750.jpg',
    ageBracket: '5M – 3Y',
    heightLabel: '100% Platinum Silicone',
    badge: 'Strong Table-Lock Suction',
    safetySpecs: ['Dishwasher & Microwave Safe (-40°C to 220°C)', 'Soft Gum-Friendly Teething Spoon', 'Non-Toxic, Lead & Phthalate Free'],
  },
  {
    id: 'weaning-3',
    title: 'Wipeable Food Catcher Waterproof Bib Trio (3-Pack)',
    subtitle: 'Deep front spill pocket catches dropped rice, dal, and fruit puree. Rolls compactly for travel',
    category: 'bibs',
    price: 950,
    mrp: 1250,
    image: '/assets/aistudio/94_fd502493.png',
    ageBracket: '4M – 3Y',
    heightLabel: 'Adjustable Neck 22–32cm',
    badge: 'Deep Crumb Pocket',
    safetySpecs: ['Wipes clean in 5 seconds with wet cloth', 'Reinforced button-hole neckline', 'Hypoallergenic lightweight silicone'],
  },
  {
    id: 'weaning-4',
    title: 'Anti-Colic Borosilicate Glass Baby Bottle (240ml)',
    subtitle: 'Dual-vent anti-colic air valve reduces hiccups, gas, and reflux during milk and broth feeds',
    category: 'bottles',
    price: 1250,
    mrp: 1550,
    image: '/src/assets/images/category_baby_care_1793079670129.jpg',
    ageBracket: '0M – 2Y',
    heightLabel: 'Pharmaceutical Glass',
    badge: 'Medical Borosilicate Glass',
    safetySpecs: ['Thermal shock-proof from boiling to freezing', 'Naturally odor and stain resistant', 'Ergonomic shape for infant grip'],
  },
];

interface WeaningShowcaseProps {
  onAddToCart: (product: Product, variant: string, quantity: number) => void;
  onOpenProductModal?: (product: Product) => void;
}

export const WeaningShowcase: React.FC<WeaningShowcaseProps> = ({
  onAddToCart,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'highchair' | 'silicone' | 'bottles' | 'bibs'>('all');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const filteredItems = WEANING_PRODUCTS.filter((item) => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  const handleAdd = (item: WeaningProduct) => {
    const mockProd: Product = {
      id: item.id,
      name: item.title,
      category: 'feeding',
      ageStage: 'infant',
      priceNPR: item.price,
      originalPriceNPR: item.mrp,
      image: item.image,
      fallbackGradient: 'from-[#FFF6E9] to-[#DFD6C6]',
      shortDescription: item.subtitle,
      materials: item.safetySpecs.join(', '),
      washCare: 'Food safe. Sterilizer safe.',
      deliveryTime: 'Arrives in 24–48h across Kathmandu Valley.',
      variants: [{ size: item.heightLabel, inStock: true, stockCount: 15 }],
      highlights: item.safetySpecs,
    };

    onAddToCart(mockProd, item.heightLabel, 1);
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#1F2A44]/15 p-6 sm:p-8 lg:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1F2A44]/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5DAA7A]/15 text-[#1F2A44] text-xs font-bold mb-2">
            <Utensils className="w-3.5 h-3.5 text-[#5DAA7A]" />
            <span>Pediatric Weaning & Self-Feeding Stage (5M – 3Y)</span>
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#1F2A44]">
            First Solid Foods & Weaning Showcase
          </h3>
          <p className="text-xs sm:text-sm text-[#1F2A44]/75 mt-1">
            Engineered for easy transition to Nepali dal, jaulo, and fruit puree with zero mess and maximum safety.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar shrink-0">
          {[
            { id: 'all', label: 'All Weaning Essentials' },
            { id: 'highchair', label: 'High Chairs' },
            { id: 'silicone', label: 'Silicone Sets' },
            { id: 'bibs', label: 'Catch Bibs' },
            { id: 'bottles', label: 'Bottles' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-bold rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#1F2A44] text-[#FFF6E9]'
                  : 'bg-[#FFF6E9] text-[#1F2A44]/80 hover:bg-[#1F2A44]/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
        {filteredItems.map((prod) => (
          <div
            key={prod.id}
            className="rounded-2xl border border-[#1F2A44]/15 p-4 flex flex-col justify-between hover:border-[#F5B301] transition-all bg-[#FFF6E9]/20"
          >
            <div>
              {/* Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#1F2A44] text-[#FFF6E9]">
                  {prod.ageBracket}
                </span>
                <span className="text-[10px] font-semibold text-[#5DAA7A] bg-[#5DAA7A]/15 px-2 py-0.5 rounded-full">
                  {prod.badge}
                </span>
              </div>

              <h4 className="font-heading text-base font-bold text-[#1F2A44] line-clamp-2 mb-1.5">
                {prod.title}
              </h4>
              <p className="text-xs text-[#1F2A44]/70 line-clamp-2 mb-3">
                {prod.subtitle}
              </p>

              {/* Specs */}
              <div className="space-y-1 mb-4">
                {prod.safetySpecs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#1F2A44]/75">
                    <Check className="w-3 h-3 text-[#5DAA7A] shrink-0" />
                    <span className="truncate">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom price and add */}
            <div className="pt-3 border-t border-[#1F2A44]/10 flex items-center justify-between">
              <div>
                <span className="font-heading text-base font-bold text-[#1F2A44]">
                  Rs. {prod.price.toLocaleString()}
                </span>
                <span className="text-[11px] text-[#1F2A44]/50 line-through ml-1.5">
                  Rs. {prod.mrp.toLocaleString()}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleAdd(prod)}
                className="p-2.5 rounded-full bg-[#1F2A44] text-[#FFF6E9] hover:bg-[#F5B301] hover:text-[#1F2A44] transition-colors cursor-pointer"
                title="Add to Cart"
              >
                {addedIds[prod.id] ? <Check className="w-4 h-4 text-[#5DAA7A]" /> : <ShoppingBag className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
