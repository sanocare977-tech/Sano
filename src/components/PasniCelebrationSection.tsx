import React, { useState } from 'react';
import { Gift, Sparkles, Utensils, Mail, Heart, Calendar } from 'lucide-react';
import { PasniBundleBuilder } from './PasniBundleBuilder';
import { PasniInvitationGenerator } from './PasniInvitationGenerator';
import { WeaningShowcase } from './WeaningShowcase';
import { Product } from '../types';

interface PasniCelebrationSectionProps {
  onAddToCart: (product: Product, variant: string, quantity: number) => void;
  onOpenCart?: () => void;
}

export const PasniCelebrationSection: React.FC<PasniCelebrationSectionProps> = ({
  onAddToCart,
  onOpenCart,
}) => {
  const [activeTab, setActiveTab] = useState<'bundle' | 'invite' | 'weaning'>('bundle');

  return (
    <section id="pasni-celebrations" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1F2A44]/10">
      {/* Super Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8604F]/10 text-[#E8604F] text-xs font-bold mb-3">
          <Gift className="w-3.5 h-3.5" />
          <span>Nepali Traditions & Milestone Rituals</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1F2A44]">
          Pasni (Rice Feeding) & First Solids Hub
        </h2>
        <p className="text-sm sm:text-base text-[#1F2A44]/75 mt-2 leading-relaxed">
          Celebrating your baby's 5th month (girls) or 6th month (boys) milestone? Everything you need from authentic Palpali Dhaka & velvet ceremony attire to pure brass thalis, digital WhatsApp invites, and ergonomic weaning gear.
        </p>

        {/* Navigation Selector */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pt-6 pb-2 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('bundle')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'bundle'
                ? 'bg-[#1F2A44] text-[#FFF6E9] shadow-sm'
                : 'bg-white text-[#1F2A44] border border-[#1F2A44]/20 hover:border-[#F5B301]'
            }`}
          >
            <span>🍚 3-in-1 Ceremony Bundle</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('invite')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'invite'
                ? 'bg-[#1F2A44] text-[#FFF6E9] shadow-sm'
                : 'bg-white text-[#1F2A44] border border-[#1F2A44]/20 hover:border-[#F5B301]'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-[#F5B301]" />
            <span>Digital Card Generator</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('weaning')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'weaning'
                ? 'bg-[#1F2A44] text-[#FFF6E9] shadow-sm'
                : 'bg-white text-[#1F2A44] border border-[#1F2A44]/20 hover:border-[#F5B301]'
            }`}
          >
            <Utensils className="w-3.5 h-3.5 text-[#5DAA7A]" />
            <span>Weaning & High Chairs</span>
          </button>
        </div>
      </div>

      {/* Dynamic Content */}
      <div className="mt-4">
        {activeTab === 'bundle' && (
          <PasniBundleBuilder onAddToCart={onAddToCart} onOpenCart={onOpenCart} />
        )}

        {activeTab === 'invite' && (
          <PasniInvitationGenerator />
        )}

        {activeTab === 'weaning' && (
          <WeaningShowcase onAddToCart={onAddToCart} />
        )}
      </div>
    </section>
  );
};
