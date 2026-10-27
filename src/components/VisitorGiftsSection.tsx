import React, { useState } from 'react';
import { Gift, Heart, Sparkles, Check, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface VisitorGiftsSectionProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, variant: string) => void;
}

export const VisitorGiftsSection: React.FC<VisitorGiftsSectionProps> = ({
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedPersona, setSelectedPersona] = useState<string>('all');

  const giftProducts = PRODUCTS.filter((p) => p.category === 'gift_hampers');

  const personas = [
    { id: 'all', label: 'All Curated Gifts' },
    { id: 'grandparents', label: '👵 For Grandparents (आशीर्वाद)' },
    { id: 'relatives', label: '👨‍👩‍👧 For Aunts, Uncles & Relatives' },
    { id: 'friends_colleagues', label: '💼 For Friends & Coworkers' },
    { id: 'baby_shower', label: '🍼 Baby Shower & Practical Needs' },
  ];

  const filteredGifts = giftProducts.filter((prod) => {
    if (selectedPersona === 'all') return true;
    return prod.giftRecipient === selectedPersona;
  });

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1F2A44]/10 bg-gradient-to-b from-transparent to-[#FFF6E9]">
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8604F]/10 text-[#1F2A44] text-xs font-bold mb-3">
          <Gift className="w-3.5 h-3.5 text-[#E8604F]" />
          <span>Thoughtful Gifting Guide for Hospital Visitors</span>
        </div>
        <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#1F2A44]">
          Hospital Visit & Welcome Baby Gifts (उपहार)
        </h2>
        <p className="text-sm sm:text-base text-[#1F2A44]/75 mt-2 leading-relaxed">
          Visiting the maternity ward or new parents at home? Friends and family often struggle to pick the right gift. These nurse-approved hampers provide what new mothers and newborns truly need.
        </p>

        {/* Visitor Helper Advice Banner */}
        <div className="mt-5 p-3.5 rounded-xl bg-white border border-[#1F2A44]/10 text-xs text-[#1F2A44]/80 flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-[#1F2A44]">
            <HelpCircle className="w-4 h-4 text-[#F5B301]" />
            <span>Confused about what to bring?</span>
          </div>
          <span>Select who you are below to find the package parents appreciate most!</span>
        </div>

        {/* Persona Filter Chips */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pt-5 pb-2 no-scrollbar">
          {personas.map((persona) => (
            <button
              key={persona.id}
              onClick={() => setSelectedPersona(persona.id)}
              className={`px-3.5 py-2 text-xs font-bold rounded-full transition-colors cursor-pointer shrink-0 ${
                selectedPersona === persona.id
                  ? 'bg-[#1F2A44] text-[#FFF6E9]'
                  : 'bg-white border border-[#1F2A44]/15 text-[#1F2A44] hover:bg-[#FFF6E9]'
              }`}
            >
              {persona.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gifts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGifts.map((gift) => (
          <div
            key={gift.id}
            className="bg-white rounded-2xl border border-[#1F2A44]/15 overflow-hidden flex flex-col justify-between hover:border-[#1F2A44]/40 transition-colors"
          >
            {/* Image & Badges */}
            <div 
              className="relative aspect-4/3 bg-[#FFF6E9] overflow-hidden cursor-pointer group"
              onClick={() => onSelectProduct(gift)}
            >
              <img
                src={gift.image}
                alt={gift.name}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#1F2A44] text-[#FFF6E9]">
                  {gift.giftRecipient === 'grandparents' 
                    ? 'Heirloom Aashirwad' 
                    : gift.giftRecipient === 'relatives' 
                    ? 'Family Favorite' 
                    : gift.giftRecipient === 'baby_shower' 
                    ? 'Practical 1-Month Supply' 
                    : 'Mom & Baby Pampering'}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F5B301] text-[#1F2A44]">
                  Ready Gift Box & Ribbon
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between gap-2 mb-2">
                  <h3 
                    onClick={() => onSelectProduct(gift)}
                    className="font-heading text-lg font-bold text-[#1F2A44] hover:text-[#E8604F] transition-colors cursor-pointer leading-snug"
                  >
                    {gift.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-[#1F2A44]">
                    Rs. {gift.priceNPR.toLocaleString()}
                  </span>
                  {gift.originalPriceNPR && (
                    <span className="text-xs text-[#1F2A44]/45 line-through">
                      Rs. {gift.originalPriceNPR.toLocaleString()}
                    </span>
                  )}
                  <span className="text-[10px] font-bold text-[#5DAA7A] px-2 py-0.5 rounded-full bg-[#5DAA7A]/15">
                    Save Rs. {((gift.originalPriceNPR || gift.priceNPR) - gift.priceNPR).toLocaleString()}
                  </span>
                </div>

                <p className="text-xs text-[#1F2A44]/75 line-clamp-3 mb-4 leading-relaxed">
                  {gift.shortDescription}
                </p>

                {/* Highlights */}
                <div className="space-y-1.5 mb-4 text-xs text-[#1F2A44]/85 bg-[#FFF6E9]/50 p-3 rounded-xl border border-[#1F2A44]/8">
                  {gift.highlights.slice(0, 2).map((hl, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px]">
                      <Check className="w-3.5 h-3.5 text-[#5DAA7A] shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-[#1F2A44]/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectProduct(gift)}
                  className="text-xs font-bold text-[#1F2A44] hover:text-[#E8604F] transition-colors flex items-center gap-1 cursor-pointer py-1"
                >
                  <span>See What's Inside</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onAddToCart(gift, gift.variants[0]?.size || 'Complete Gift Box')}
                  className="px-4 py-2 text-xs font-bold bg-[#1F2A44] text-[#FFF6E9] rounded-full hover:bg-[#1F2A44]/85 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Gift className="w-3.5 h-3.5 text-[#F5B301]" />
                  <span>Send Gift</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hospital Delivery Notice */}
      <div className="mt-8 p-4 rounded-2xl bg-white border border-[#1F2A44]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#1F2A44]/80">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#5DAA7A]/20 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-[#5DAA7A]" />
          </div>
          <div>
            <strong className="block text-sm text-[#1F2A44] font-bold">
              Direct Hospital Maternity Room Delivery in Kathmandu
            </strong>
            <span>
              We deliver directly to hospital rooms (Norvic, Grande, Patan, Mediciti, TU Teaching) with recipient patient bed details via GPS pin.
            </span>
          </div>
        </div>
        <div className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-full bg-[#FFF6E9] border border-[#1F2A44]/15 text-[#1F2A44]">
          Free Handwritten Card Included
        </div>
      </div>
    </section>
  );
};
