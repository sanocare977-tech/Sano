import React from 'react';
import { ShoppingBag, MessageCircle, MapPin, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenRecentOrders: () => void;
  onOpenOrderTracking: (orderId?: string) => void;
  onOpenChecklist: () => void;
  onNavigateToSection: (sectionId: string) => void;
  onNavigateToDiapers: () => void;
  onNavigateToHome: () => void;
  currentView: 'home' | 'diapers';
  loyaltyPoints: number;
  onOpenLoyalty: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  onOpenRecentOrders,
  onOpenOrderTracking,
  onOpenChecklist,
  onNavigateToSection,
  onNavigateToDiapers,
  onNavigateToHome,
  currentView,
  loyaltyPoints,
  onOpenLoyalty,
}) => {
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#FFF6E9]/95 backdrop-blur-md border-b border-[#1F2A44]/10 transition-colors">
      {/* Top micro announcement bar */}
      <div className="bg-[#1F2A44] text-[#FFF6E9] px-4 py-1.5 text-xs font-medium text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between sm:justify-center gap-4 text-[13px]">
          <span className="truncate">
            Delivery across Kathmandu Valley (24–48h) & all Nepal. Free Valley delivery over Rs. 2,500.
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToDiapers}
              className="text-[#F5B301] hover:underline whitespace-nowrap text-xs shrink-0 cursor-pointer font-bold"
            >
              Diaper Station (All Brands & Sizes)
            </button>
            <span className="text-white/40">·</span>
            <button
              onClick={onOpenLoyalty}
              className="text-[#F5B301] hover:underline whitespace-nowrap text-xs shrink-0 cursor-pointer flex items-center gap-1 font-bold"
            >
              <Sparkles className="w-3 h-3 text-[#F5B301]" />
              <span>{loyaltyPoints} Sano Pts</span>
            </button>
            <span className="text-white/40">·</span>
            <button
              onClick={() => onOpenOrderTracking()}
              className="text-[#FFF6E9] hover:text-[#F5B301] hover:underline whitespace-nowrap text-xs shrink-0 cursor-pointer font-bold flex items-center gap-1"
            >
              <span>Track Order ID</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 3-Zone Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Brand Wordmark (Lowercase Fredoka Bold with solid Marigold full stop) */}
          <button
            onClick={() => {
              onNavigateToHome();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-baseline select-none shrink-0 cursor-pointer text-left"
            aria-label="sano. Everything for little ones"
          >
            <span className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#1F2A44] lowercase">
              sano
            </span>
            <span className="inline-block w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#F5B301] ml-0.5 group-hover:scale-110 transition-transform"></span>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5 text-[14px] font-semibold text-[#1F2A44]/80">
            <button
              onClick={() => {
                onNavigateToHome();
                setTimeout(() => onNavigateToSection('age-stages'), 50);
              }}
              className={`hover:text-[#1F2A44] transition-colors whitespace-nowrap cursor-pointer py-1 ${
                currentView === 'home' ? 'text-[#1F2A44]' : ''
              }`}
            >
              Shop by Age
            </button>

            {/* Dedicated Diaper Station Link */}
            <button
              onClick={onNavigateToDiapers}
              className={`hover:text-[#1F2A44] transition-colors whitespace-nowrap cursor-pointer py-1 flex items-center gap-1.5 ${
                currentView === 'diapers'
                  ? 'text-[#1F2A44] font-bold border-b-2 border-[#F5B301]'
                  : 'text-[#1F2A44]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#F5B301]" />
              <span>Diaper Station</span>
            </button>

            {/* Visitor Gifts */}
            <button
              onClick={() => {
                onNavigateToHome();
                setTimeout(() => onNavigateToSection('visitor-gifts'), 50);
              }}
              className="hover:text-[#1F2A44] transition-colors whitespace-nowrap cursor-pointer py-1 flex items-center gap-1"
            >
              <span className="text-[#E8604F]">🎁</span>
              <span>Visitor Gifts (उपहार)</span>
            </button>

            {/* Hospital Bag 3-Stages */}
            <button
              onClick={() => {
                onNavigateToHome();
                setTimeout(() => onNavigateToSection('hospital-bag'), 50);
              }}
              className="hover:text-[#1F2A44] transition-colors whitespace-nowrap cursor-pointer py-1 flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F5B301]" />
              <span>Hospital Bag (3 Stages)</span>
            </button>

            {/* Pasni & Weaning */}
            <button
              onClick={() => {
                onNavigateToHome();
                setTimeout(() => onNavigateToSection('pasni-celebrations'), 50);
              }}
              className="hover:text-[#1F2A44] transition-colors whitespace-nowrap cursor-pointer py-1"
            >
              Pasni &amp; Weaning
            </button>

            {/* Mom & Child Health Blog */}
            <button
              onClick={() => {
                onNavigateToHome();
                setTimeout(() => onNavigateToSection('health-blog'), 50);
              }}
              className="hover:text-[#1F2A44] transition-colors whitespace-nowrap cursor-pointer py-1 flex items-center gap-1 text-[#1F2A44]"
            >
              <span className="text-[#5DAA7A]">🩵</span>
              <span>Mom &amp; Kid Health</span>
            </button>

            <button
              onClick={() => {
                onNavigateToHome();
                setTimeout(() => onNavigateToSection('why-sano'), 50);
              }}
              className="hover:text-[#1F2A44] transition-colors whitespace-nowrap cursor-pointer py-1"
            >
              Store
            </button>
          </nav>

          {/* Zone 3: Sano Points Counter & Bag */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Sano Points Counter Button */}
            <button
              type="button"
              onClick={onOpenLoyalty}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#F5B301] text-[#1F2A44] text-xs font-bold hover:bg-[#F5B301]/10 transition-colors cursor-pointer min-h-[38px] shadow-none"
              title="View Sano Points & Loyalty Pass"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F5B301]" />
              <span className="tabular-nums">{loyaltyPoints}</span>
              <span className="hidden sm:inline">Pts</span>
            </button>

            <button
              onClick={() => onOpenOrderTracking()}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#1F2A44] border border-[#1F2A44]/20 rounded-full hover:bg-[#1F2A44]/5 transition-colors cursor-pointer"
              title="Track order status via Order ID"
            >
              <MapPin className="w-3.5 h-3.5 text-[#1F2A44]" />
              Track Order
            </button>

            <button
              onClick={onOpenCart}
              className="relative inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold bg-[#1F2A44] text-[#FFF6E9] rounded-full hover:bg-[#1F2A44]/90 active:scale-95 transition-all shadow-none cursor-pointer min-h-[44px]"
              aria-label={`Shopping bag with ${totalItemCount} items`}
            >
              <ShoppingBag className="w-4 h-4 text-[#F5B301]" />
              <span className="hidden sm:inline">Bag</span>
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-[#F5B301] text-[#1F2A44] rounded-full tabular-nums">
                {totalItemCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Quick Jump Strip (Visible on mobile & desktop) */}
      <div className="border-t border-[#1F2A44]/5 bg-white/60 overflow-x-auto no-scrollbar py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3 text-xs font-bold whitespace-nowrap">
          <button
            onClick={() => {
              onNavigateToHome();
              setTimeout(() => onNavigateToSection('age-stages'), 50);
            }}
            className="px-3 py-1 rounded-full bg-[#1F2A44]/5 hover:bg-[#1F2A44]/10 text-[#1F2A44] transition-colors cursor-pointer"
          >
            👶 Shop by Age &amp; Height
          </button>
          <button
            onClick={onNavigateToDiapers}
            className={`px-3 py-1 rounded-full transition-colors cursor-pointer flex items-center gap-1 ${
              currentView === 'diapers'
                ? 'bg-[#F5B301] text-[#1F2A44]'
                : 'bg-[#F5B301]/20 hover:bg-[#F5B301]/30 text-[#1F2A44]'
            }`}
          >
            📦 Diaper Station
          </button>
          <button
            onClick={() => {
              onNavigateToHome();
              setTimeout(() => onNavigateToSection('visitor-gifts'), 50);
            }}
            className="px-3 py-1 rounded-full bg-[#E8604F]/15 hover:bg-[#E8604F]/25 text-[#1F2A44] transition-colors cursor-pointer flex items-center gap-1"
          >
            🎁 Visitor Gifts (उपहार)
          </button>
          <button
            onClick={() => {
              onNavigateToHome();
              setTimeout(() => onNavigateToSection('hospital-bag'), 50);
            }}
            className="px-3 py-1 rounded-full bg-[#1F2A44]/5 hover:bg-[#1F2A44]/10 text-[#1F2A44] transition-colors cursor-pointer flex items-center gap-1"
          >
            🏥 Hospital Bag (3 Stages)
          </button>
          <button
            onClick={() => {
              onNavigateToHome();
              setTimeout(() => onNavigateToSection('pasni-celebrations'), 50);
            }}
            className="px-3 py-1 rounded-full bg-[#1F2A44]/5 hover:bg-[#1F2A44]/10 text-[#1F2A44] transition-colors cursor-pointer"
          >
            🍚 Pasni &amp; Weaning
          </button>
          <button
            onClick={() => {
              onNavigateToHome();
              setTimeout(() => onNavigateToSection('health-blog'), 50);
            }}
            className="px-3 py-1 rounded-full bg-[#5DAA7A]/15 hover:bg-[#5DAA7A]/25 text-[#1F2A44] transition-colors cursor-pointer flex items-center gap-1"
          >
            🩵 Mom &amp; Kid Health Hub
          </button>
          <button
            onClick={() => {
              onNavigateToHome();
              setTimeout(() => onNavigateToSection('why-sano'), 50);
            }}
            className="px-3 py-1 rounded-full bg-[#1F2A44]/5 hover:bg-[#1F2A44]/10 text-[#1F2A44] transition-colors cursor-pointer"
          >
            🏬 Kathmandu Store
          </button>
        </div>
      </div>
    </header>
  );
};
