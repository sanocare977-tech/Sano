import React, { useState, useEffect } from 'react';
import { 
  RotateCw, 
  MessageSquare, 
  Clock, 
  Check, 
  Calendar, 
  ShieldCheck, 
  Truck, 
  ShoppingBag, 
  Sparkles, 
  AlertCircle,
  Package,
  Plus,
  Minus
} from 'lucide-react';
import { Product } from '../types';

interface RestockItem {
  id: string;
  name: string;
  category: 'diapers' | 'wipes' | 'skincare' | 'feeding';
  priceNPR: number;
  originalPriceNPR: number;
  image: string;
  quantityUnit: string;
  cycleDays: number;
  highlight: string;
  description: string;
}

const RESTOCK_CATALOG: RestockItem[] = [
  {
    id: 'restock-diaper-jumbo',
    name: 'MamyPoko / Pampers Pants Monthly Saver Pack (96 Count)',
    category: 'diapers',
    priceNPR: 2850,
    originalPriceNPR: 3350,
    image: '/src/assets/images/product_diapers_wipes_1793082162681.jpg',
    quantityUnit: '96 Pants (Sizes NB to XXL)',
    cycleDays: 25,
    highlight: 'Lasts ~25 days (4 pants/day)',
    description: '12-Hour leak lock absorption core with soft criss-cross waistband for active crawlers.',
  },
  {
    id: 'restock-wipes-carton',
    name: '99% Pure New Zealand Water Wipes Bulk Box (8 Packs / 640 Sheets)',
    category: 'wipes',
    priceNPR: 1450,
    originalPriceNPR: 1850,
    image: '/src/assets/images/product_diapers_wipes_1793082162681.jpg',
    quantityUnit: '640 Extra-Thick Wipes',
    cycleDays: 30,
    highlight: 'Fragrance-free & Hypoallergenic',
    description: '0% alcohol, parabens, or chemical fragrance. Pure medical water safe for hands, face, and newborn skin.',
  },
  {
    id: 'restock-oil-wash-duo',
    name: 'Cold-Pressed Mustard Massage Oil + Calendula Head-to-Toe Wash',
    category: 'skincare',
    priceNPR: 1250,
    originalPriceNPR: 1600,
    image: '/src/assets/images/category_baby_care_1793079670129.jpg',
    quantityUnit: '200ml Oil + 250ml Wash',
    cycleDays: 30,
    highlight: 'Traditional Himalayan Herbals',
    description: 'Warm soothing massage oil infused with fenugreek and wild thyme, plus tear-free organic bath wash.',
  },
  {
    id: 'restock-teats-nipples',
    name: 'Anti-Colic Silicone Bottle Teats (Pack of 4) & Sterilizer Wash',
    category: 'feeding',
    priceNPR: 950,
    originalPriceNPR: 1250,
    image: '/src/assets/images/product_silicone_bowl_feeding_1793082161750.jpg',
    quantityUnit: '4 Teats + 300ml Foam Cleanse',
    cycleDays: 30,
    highlight: 'BPA-Free Medical Silicone',
    description: 'Pediatrician-recommended spiral flow teats prevent air swallowing and colic during night feeds.',
  },
  {
    id: 'restock-rash-barrier',
    name: 'Zinc Oxide 15% Barrier Rash Protective Balm (100g Tub)',
    category: 'skincare',
    priceNPR: 750,
    originalPriceNPR: 950,
    image: '/src/assets/images/category_baby_care_1793079670129.jpg',
    quantityUnit: '100g Clinical Barrier Cream',
    cycleDays: 45,
    highlight: 'Fast Calming within 6 Hours',
    description: 'Protects delicate baby skin from acidic stool irritation with organic beeswax and panthenol.',
  },
];

interface QuickRestockSectionProps {
  onAddToCart: (product: Product, variant: string, quantity: number) => void;
  onOpenCart?: () => void;
}

export const QuickRestockSection: React.FC<QuickRestockSectionProps> = ({
  onAddToCart,
  onOpenCart,
}) => {
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({
    'restock-diaper-jumbo': 1,
    'restock-wipes-carton': 1,
  });

  const [cadenceDays, setCadenceDays] = useState<number>(25);
  const [phoneNumber, setPhoneNumber] = useState<string>('+977 9841234567');
  const [deliveryArea, setDeliveryArea] = useState<string>('Jhamsikhel / Sanepa, Lalitpur');
  const [isReminderSaved, setIsReminderSaved] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'catalog' | 'schedule'>('catalog');

  // Load saved restock preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sano_restock_subscription');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.phoneNumber) setPhoneNumber(parsed.phoneNumber);
        if (parsed.deliveryArea) setDeliveryArea(parsed.deliveryArea);
        if (parsed.cadenceDays) setCadenceDays(parsed.cadenceDays);
        setIsReminderSaved(true);
      }
    } catch {
      // Ignore storage error
    }
  }, []);

  const toggleItemCount = (id: string, delta: number) => {
    setSelectedItems((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const selectedCount = Object.values(selectedItems).reduce((sum, count) => sum + count, 0);

  const calculateSubtotal = () => {
    return RESTOCK_CATALOG.reduce((sum, item) => {
      const qty = selectedItems[item.id] || 0;
      return sum + item.priceNPR * qty;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  // Subscribe & Save 10% instant discount
  const restockDiscount = Math.round(subtotal * 0.1);
  const finalTotal = subtotal - restockDiscount;

  // Next reminder date calculation
  const getNextRestockDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + cadenceDays);
    return d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleSaveReminder = (e: React.FormEvent) => {
    e.preventDefault();
    const config = {
      phoneNumber,
      deliveryArea,
      cadenceDays,
      savedAt: new Date().toISOString(),
      nextDeliveryDate: getNextRestockDate(),
    };
    try {
      localStorage.setItem('sano_restock_subscription', JSON.stringify(config));
    } catch {
      // Ignore
    }
    setIsReminderSaved(true);
    setTimeout(() => {
      alert(`✅ Automated WhatsApp Restock Reminder scheduled every ${cadenceDays} days for ${phoneNumber}. You'll receive a prompt to reorder with a single "REORDER" reply!`);
    }, 100);
  };

  const handleAddAllToCart = () => {
    RESTOCK_CATALOG.forEach((item) => {
      const qty = selectedItems[item.id] || 0;
      if (qty > 0) {
        const prod: Product = {
          id: item.id,
          name: item.name,
          category: 'diapering',
          ageStage: 'infant',
          priceNPR: Math.round(item.priceNPR * 0.9), // with 10% subscribe discount
          originalPriceNPR: item.originalPriceNPR,
          image: item.image,
          fallbackGradient: 'from-[#FFF6E9] to-[#E5E0D5]',
          shortDescription: item.description,
          materials: item.quantityUnit,
          washCare: item.highlight,
          deliveryTime: 'Arrives in 24h (Recurring Doorstep Restock)',
          variants: [{ size: item.quantityUnit, inStock: true, stockCount: 50 }],
          highlights: [item.highlight, `Recurring Restock: Every ${cadenceDays} Days`],
        };
        onAddToCart(prod, item.quantityUnit, qty);
      }
    });

    if (onOpenCart) {
      setTimeout(() => onOpenCart(), 400);
    }
  };

  // WhatsApp 1-tap reorder URL
  const selectedItemListText = RESTOCK_CATALOG.filter((i) => (selectedItems[i.id] || 0) > 0)
    .map((i) => `• ${i.name} (Qty: ${selectedItems[i.id]})`)
    .join('\n');

  const whatsappMessage = `🔄 *sano. Quick Restock Order Request*\n\nNamaste! Please restock my recurring baby essentials with the 10% recurring discount:\n\n${selectedItemListText}\n\n📍 *Delivery Location*: ${deliveryArea}\n⏰ *Restock Cadence*: Every ${cadenceDays} days\n💰 *Total Payable*: Rs. ${finalTotal.toLocaleString()} (COD / Fonepay QR)\n\nReply "REORDER" to confirm this delivery dispatch!`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section id="quick-restock" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1F2A44]/10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1F2A44]/10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5DAA7A]/15 text-[#1F2A44] text-xs font-bold mb-3">
            <RotateCw className="w-3.5 h-3.5 text-[#5DAA7A] animate-spin" />
            <span>Never Run Out of Diapers &amp; Care Essentials</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1F2A44]">
            "Quick Restock" Recurring Subscription Engine
          </h2>
          <p className="text-xs sm:text-sm text-[#1F2A44]/75 mt-2 leading-relaxed">
            Parents shouldn't have to scramble for diapers at 10 PM. Set your monthly essentials schedule once; receive automated WhatsApp reminders every 25–30 days and reorder with a single "REORDER" reply.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2 bg-[#FFF6E9] p-1.5 rounded-full border border-[#1F2A44]/15 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all ${
              activeTab === 'catalog'
                ? 'bg-[#1F2A44] text-[#FFF6E9] shadow-sm'
                : 'text-[#1F2A44] hover:bg-black/5'
            }`}
          >
            1. Daily Care Packs
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
              activeTab === 'schedule'
                ? 'bg-[#1F2A44] text-[#FFF6E9] shadow-sm'
                : 'text-[#1F2A44] hover:bg-black/5'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-[#F5B301]" />
            <span>2. Automated WhatsApp Cadence</span>
          </button>
        </div>
      </div>

      {activeTab === 'catalog' ? (
        /* Restock Product Catalog Grid */
        <div className="my-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESTOCK_CATALOG.map((item) => {
              const count = selectedItems[item.id] || 0;
              const isSelected = count > 0;

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border-2 p-5 flex flex-col justify-between transition-all ${
                    isSelected
                      ? 'border-[#1F2A44] bg-white shadow-md'
                      : 'border-[#1F2A44]/15 bg-white/70'
                  }`}
                >
                  <div>
                    {/* Top Tag & Savings */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FFF6E9] border border-[#1F2A44]/15 text-[#1F2A44]">
                        {item.quantityUnit}
                      </span>
                      <span className="text-[10px] font-bold text-[#5DAA7A] bg-[#5DAA7A]/15 px-2 py-0.5 rounded-full">
                        Save Rs. {(item.originalPriceNPR - item.priceNPR).toLocaleString()}
                      </span>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-[#1F2A44] leading-snug mb-1">
                      {item.name}
                    </h3>
                    
                    <p className="text-xs text-[#1F2A44]/70 mb-3 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="text-[11px] font-semibold text-[#1F2A44]/80 flex items-center gap-1.5 mb-4 bg-[#FFF6E9]/60 p-2 rounded-xl">
                      <Sparkles className="w-3.5 h-3.5 text-[#F5B301] shrink-0" />
                      <span>{item.highlight}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between pt-3 border-t border-[#1F2A44]/10 mb-4">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-[#1F2A44]">
                            Rs. {item.priceNPR.toLocaleString()}
                          </span>
                          <span className="text-xs text-[#1F2A44]/45 line-through">
                            Rs. {item.originalPriceNPR.toLocaleString()}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#5DAA7A] font-bold block">
                          Extra 10% off with Recurring Restock
                        </span>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 bg-[#FFF6E9] border border-[#1F2A44]/20 rounded-full px-2 py-1">
                        <button
                          type="button"
                          onClick={() => toggleItemCount(item.id, -1)}
                          className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#1F2A44] hover:bg-black/10 cursor-pointer text-xs"
                          title="Reduce"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center tabular-nums">
                          {count}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleItemCount(item.id, 1)}
                          className="w-6 h-6 rounded-full bg-[#1F2A44] flex items-center justify-center text-white hover:bg-[#1F2A44]/80 cursor-pointer text-xs"
                          title="Add more"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Restock Actions Bar */}
          <div className="p-6 rounded-3xl bg-[#1F2A44] text-[#FFF6E9] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#F5B301] uppercase tracking-wider">
                <Package className="w-4 h-4" />
                <span>Selected {selectedCount} Monthly Essential{selectedCount === 1 ? '' : 's'}</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-heading text-2xl sm:text-3xl font-bold text-[#FFF6E9]">
                  Rs. {finalTotal.toLocaleString()}
                </span>
                <span className="text-xs text-[#F5B301] font-bold">
                  (Includes 10% Subscribe Saver Discount of Rs. {restockDiscount.toLocaleString()})
                </span>
              </div>
              <p className="text-xs text-white/70">
                Doorstep delivery across Kathmandu Valley with cash or Fonepay on arrival.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <button
                type="button"
                disabled={selectedCount === 0}
                onClick={handleAddAllToCart}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#F5B301] text-[#1F2A44] font-bold text-xs sm:text-sm hover:bg-[#F5B301]/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Restock Pack to Bag</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#5DAA7A] text-white font-bold text-xs sm:text-sm hover:bg-[#5DAA7A]/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md text-center"
              >
                <MessageSquare className="w-4 h-4" />
                <span>1-Tap Reorder via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* Automated WhatsApp Restock Reminder Setup */
        <div className="my-8 max-w-3xl mx-auto bg-white rounded-3xl border border-[#1F2A44]/15 p-6 sm:p-10 shadow-sm">
          <div className="space-y-2 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5DAA7A] flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>Automated WhatsApp Restock Cadence</span>
            </span>
            <h3 className="font-heading text-2xl font-bold text-[#1F2A44]">
              Schedule Your Monthly Essentials Reminder
            </h3>
            <p className="text-xs sm:text-sm text-[#1F2A44]/75 leading-relaxed">
              Every 25–30 days, we'll send a friendly WhatsApp reminder with your preferred diaper size and wipes. Reply "REORDER" and rider will deliver to your doorstep within 24 hours. No hidden contracts, pause or cancel anytime.
            </p>
          </div>

          <form onSubmit={handleSaveReminder} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-[#1F2A44] uppercase tracking-wider mb-2">
                Choose Delivery Cadence:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { days: 15, label: 'Every 15 Days', desc: 'Active toddlers & twin parents' },
                  { days: 25, label: 'Every 25 Days', desc: 'Recommended (1 Infant)' },
                  { days: 30, label: 'Every 30 Days', desc: 'Monthly bulk pantry restock' },
                ].map((option) => (
                  <div
                    key={option.days}
                    onClick={() => setCadenceDays(option.days)}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      cadenceDays === option.days
                        ? 'border-[#1F2A44] bg-[#FFF6E9]'
                        : 'border-[#1F2A44]/15 bg-white hover:border-[#1F2A44]/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-[#1F2A44]">{option.label}</span>
                      {cadenceDays === option.days && <Check className="w-3.5 h-3.5 text-[#5DAA7A]" />}
                    </div>
                    <span className="text-[11px] text-[#1F2A44]/65 block">{option.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1F2A44] uppercase tracking-wider mb-1.5">
                  WhatsApp Contact Phone:
                </label>
                <input
                  type="text"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+977 98XXXXXXXX"
                  className="w-full rounded-xl border border-[#1F2A44]/20 bg-[#FFF6E9]/30 px-4 py-2.5 text-xs font-semibold text-[#1F2A44] focus:outline-none focus:border-[#F5B301]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1F2A44] uppercase tracking-wider mb-1.5">
                  Delivery Tole / Area:
                </label>
                <input
                  type="text"
                  required
                  value={deliveryArea}
                  onChange={(e) => setDeliveryArea(e.target.value)}
                  placeholder="e.g. Jhamsikhel, Lalitpur"
                  className="w-full rounded-xl border border-[#1F2A44]/20 bg-[#FFF6E9]/30 px-4 py-2.5 text-xs font-semibold text-[#1F2A44] focus:outline-none focus:border-[#F5B301]"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#5DAA7A]/10 border border-[#5DAA7A]/20 flex items-start gap-3 text-xs text-[#1F2A44]">
              <Calendar className="w-5 h-5 text-[#5DAA7A] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Next Scheduled WhatsApp Check-In:</span>
                <span className="text-[#1F2A44]/80">
                  {getNextRestockDate()} (In {cadenceDays} Days)
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-full bg-[#1F2A44] text-[#FFF6E9] font-bold text-xs sm:text-sm hover:bg-[#1F2A44]/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Check className="w-4 h-4 text-[#F5B301]" />
              <span>Activate Automated WhatsApp Restock Reminder</span>
            </button>
          </form>
        </div>
      )}
    </section>
  );
};
