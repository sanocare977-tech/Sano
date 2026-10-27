import React from 'react';
import { ArrowDown, MessageCircle, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroBannerProps {
  onExploreClick: () => void;
  onOpenChecklist: () => void;
  onNavigateToDiapers: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreClick,
  onOpenChecklist,
  onNavigateToDiapers,
}) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 bg-[#FFF6E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Message & Direct Order Value */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Editorial kicker */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1F2A44]/80">
              <span className="w-2 h-2 rounded-full bg-[#F5B301]" />
              <span>Nepal’s Dedicated Maternal & Childhood Store</span>
              <span className="text-[#1F2A44]/40">·</span>
              <span className="text-[#5DAA7A]">Pregnancy to 14 Years</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1F2A44] leading-[1.08] tracking-tight">
              Everything for <span className="text-[#E8604F]">little ones</span>.
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl opacity-90">Small people. Big joy.</span>
            </h1>

            {/* Practical voice body copy per guidelines */}
            <p className="text-base sm:text-lg text-[#1F2A44]/80 leading-relaxed max-w-xl">
              Every body sells products, but how you buy for your child matters most. No password fatigue or sign-up walls. Simply select what your child needs, lock your exact GPS delivery pin on our map, and your order dispatches straight from your WhatsApp to ours.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onExploreClick}
                className="px-6 py-3.5 text-sm sm:text-base font-bold bg-[#1F2A44] text-[#FFF6E9] rounded-full hover:bg-[#1F2A44]/90 active:scale-95 transition-all flex items-center gap-2 cursor-pointer min-h-[48px]"
              >
                <span>Shop by Age & Height</span>
                <ArrowDown className="w-4 h-4 text-[#F5B301]" />
              </button>

              <button
                type="button"
                onClick={onNavigateToDiapers}
                className="px-5 py-3.5 text-sm font-bold text-[#1F2A44] bg-[#F5B301] rounded-full hover:bg-[#F5B301]/90 active:scale-95 transition-all flex items-center gap-2 cursor-pointer min-h-[48px]"
              >
                <span>Diaper Station (All Brands)</span>
                <span className="text-xs bg-[#1F2A44] text-[#FFF6E9] px-2 py-0.5 rounded-full font-bold">New</span>
              </button>

              <button
                type="button"
                onClick={onOpenChecklist}
                className="px-4 py-3.5 text-sm font-bold text-[#1F2A44] bg-white border border-[#1F2A44]/20 rounded-full hover:bg-[#FFF6E9] active:scale-95 transition-all flex items-center gap-2 cursor-pointer min-h-[48px]"
              >
                <Sparkles className="w-4 h-4 text-[#F5B301]" />
                <span>Hospital Bag</span>
              </button>
            </div>

            {/* 3 Core Trust Guarantees */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[#1F2A44]/10 text-xs text-[#1F2A44]">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5DAA7A] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Zero Sign-Up Required</strong>
                  <span className="text-[#1F2A44]/70">Pure guest ordering via WhatsApp</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F5B301] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Compulsory GPS Pin</strong>
                  <span className="text-[#1F2A44]/70">Exact map link so riders find your gate</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MessageCircle className="w-4 h-4 text-[#5DAA7A] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Pay Upon Arrival</strong>
                  <span className="text-[#1F2A44]/70">Cash, Fonepay QR, or eSewa</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Image with warm natural lighting */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-[#1F2A44]/15 bg-white aspect-[4/3] lg:aspect-auto lg:h-[460px]">
              <img
                src="/src/assets/images/hero_sano_parent_child_1793079669923.jpg"
                alt="Mother and toddler happily playing in natural light in Kathmandu home"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              {/* Subtle badge on bottom corner */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-[#1F2A44]/10 flex items-center justify-between text-xs text-[#1F2A44]">
                <div>
                  <span className="font-heading font-bold text-sm block">sano. care</span>
                  <span className="text-[11px] text-[#1F2A44]/70">Natural materials · Height-indexed fit</span>
                </div>
                <span className="text-xs font-bold text-[#5DAA7A] bg-[#5DAA7A]/15 px-2.5 py-1 rounded-full">
                  Kathmandu Valley 24h
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
