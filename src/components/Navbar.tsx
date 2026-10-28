import React, { useState, useEffect } from 'react';
import { ShoppingBag, MessageCircle, MapPin, Sparkles, Menu, X, ChevronRight, Package, Stethoscope, Gift, Sparkle, Heart, RefreshCw, Calendar } from 'lucide-react';
import { CartItem } from '../types';
import { SANO_WHATSAPP_NUMBER, SANO_CONTACT_PHONE } from '../data/nepalLocations';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cleanNumber = SANO_WHATSAPP_NUMBER.replace(/[^0-9]/g, '');

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMobileNavClick = (action: () => void) => {
    setIsMobileMenuOpen(false);
    action();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFF6E9]/95 backdrop-blur-md border-b border-[#1F2A44]/10 transition-colors">
      {/* Top micro announcement bar with touch-friendly layout */}
      <div className="bg-[#1F2A44] text-[#FFF6E9] px-3 sm:px-4 py-1.5 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 text-[11px] sm:text-[13px]">
          <span className="truncate max-w-full text-white/90 text-center sm:text-left flex-1 sm:flex-initial">
            Kathmandu Valley delivery (24–48h) · Free over Rs. 2,500
          </span>
          <div className="hidden sm:flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={onNavigateToDiapers}
              className="text-[#F5B301] hover:underline whitespace-nowrap text-xs cursor-pointer font-bold px-2 py-1 inline-flex items-center active:scale-95 transition-transform"
            >
              Diaper Station
            </button>
            <span className="text-white/40" aria-hidden="true">·</span>
            <button
              type="button"
              onClick={onOpenLoyalty}
              className="text-[#F5B301] hover:underline whitespace-nowrap text-xs cursor-pointer inline-flex items-center gap-1 font-bold px-2 py-1 active:scale-95 transition-transform"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F5B301]" />
              <span>{loyaltyPoints} Pts</span>
            </button>
            <span className="text-white/40" aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => onOpenOrderTracking()}
              className="text-[#FFF6E9] hover:text-[#F5B301] hover:underline whitespace-nowrap text-xs cursor-pointer font-bold inline-flex items-center gap-1 px-2 py-1 active:scale-95 transition-transform"
            >
              <MapPin className="w-3.5 h-3.5 text-[#F5B301]" />
              <span>Track</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 sm:gap-8 h-18">
          
          {/* Left: Mobile Hamburger Toggle + Brand Wordmark */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Menu Hamburger Button - Large 48x48px target */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="xl:hidden inline-flex items-center justify-center min-h-[48px] min-w-[48px] p-2.5 rounded-full border border-[#1F2A44]/15 bg-white/80 text-[#1F2A44] hover:bg-[#1F2A44]/10 active:scale-95 transition-all cursor-pointer shadow-2xs"
              aria-label="Open mobile navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="w-5 h-5 text-[#1F2A44]" />
            </button>

            {/* Brand Wordmark (Expanded touch area) */}
            <button
              type="button"
              onClick={() => {
                onNavigateToHome();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center select-none shrink-0 cursor-pointer text-left min-h-[48px] min-w-[48px] py-1 px-1 rounded-xl active:scale-95 transition-transform"
              aria-label="sano. Everything for little ones"
            >
              <span className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#1F2A44] lowercase">
                sano
              </span>
              <span className="inline-block w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#F5B301] ml-0.5 group-hover:scale-110 transition-transform"></span>
            </button>
          </div>

          {/* Desktop Navigation Links (Zone 2) */}
          <nav className="hidden xl:flex items-center gap-1.5 text-[14px] font-semibold text-[#1F2A44]/80">
            <button
              type="button"
              onClick={() => {
                onNavigateToHome();
                setTimeout(() => onNavigateToSection('age-stages'), 50);
              }}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl hover:text-[#1F2A44] hover:bg-[#1F2A44]/5 transition-all whitespace-nowrap cursor-pointer ${
                currentView === 'home' ? 'text-[#1F2A44] font-bold' : ''
              }`}
            >
              Shop by Age
            </button>

            {/* Dedicated Diaper Station Link */}
            <button
              type="button"
              onClick={onNavigateToDiapers}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                currentView === 'diapers'
                  ? 'text-[#1F2A44] font-bold bg-[#F5B301]/25 border-b-2 border-[#F5B301]'
                  : 'text-[#1F2A44] hover:bg-[#1F2A44]/5'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#F5B301]" />
              <span>Diaper Station</span>
            </button>

            {/* Visitor Gifts */}
            <button
              type="button"
              onClick={() => {
                onNavigateToHome();
                setTimeout(() => onNavigateToSection('visitor-gifts'), 50);
              }}
              className="min-h-[44px] px-3.5 py-2 rounded-xl hover:text-[#1F2A44] hover:bg-[#1F2A44]/5 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5"
            >
              <span>🎁</span>
              <span>Visitor Gifts</span>
            </button>

            {/* Hospital Bag 3-Stages */}
            <button
              type="button"
              onClick={() => {
                onNavigateToHome();
                setTimeout(() => onNavigateToSection('hospital-bag'), 50);
              }}
              className="min-h-[44px] px-3.5 py-2 rounded-xl hover:text-[#1F2A44] hover:bg-[#1F2A44]/5 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F5B301]" />
              <span>Hospital Bag</span>
            </button>

            {/* Pasni & Weaning */}
            <button
              type="button"
              onClick={() => {
                onNavigateToHome();
                setTimeout(() => onNavigateToSection('pasni-celebrations'), 50);
              }}
              className="min-h-[44px] px-3.5 py-2 rounded-xl hover:text-[#1F2A44] hover:bg-[#1F2A44]/5 transition-all whitespace-nowrap cursor-pointer"
            >
              Pasni &amp; Weaning
            </button>

            {/* Mom & Child Health Blog */}
            <button
              type="button"
              onClick={() => {
                onNavigateToHome();
                setTimeout(() => onNavigateToSection('health-blog'), 50);
              }}
              className="min-h-[44px] px-3.5 py-2 rounded-xl hover:text-[#1F2A44] hover:bg-[#1F2A44]/5 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5"
            >
              <span>🩵</span>
              <span>Health Hub</span>
            </button>

            {/* Quick Restock Recurring */}
            <button
              type="button"
              onClick={() => {
                onNavigateToHome();
                setTimeout(() => onNavigateToSection('quick-restock'), 50);
              }}
              className="min-h-[44px] px-3.5 py-2 rounded-xl hover:text-[#1F2A44] hover:bg-[#1F2A44]/5 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5"
            >
              <span>🔄</span>
              <span>Quick Restock</span>
            </button>

            {/* Try at Doorstep */}
            <button
              type="button"
              onClick={() => {
                onNavigateToHome();
                setTimeout(() => onNavigateToSection('why-sano'), 50);
              }}
              className="min-h-[44px] px-3.5 py-2 rounded-xl hover:text-[#1F2A44] hover:bg-[#1F2A44]/5 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5"
            >
              <span>🏬 Try at Doorstep</span>
            </button>

            {/* Pediatric Q&A Forum */}
            <button
              type="button"
              onClick={() => {
                onNavigateToHome();
                setTimeout(() => onNavigateToSection('expert-forum'), 50);
              }}
              className="min-h-[44px] px-3.5 py-2 rounded-xl hover:text-[#1F2A44] hover:bg-[#1F2A44]/5 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5"
            >
              <span>🩺</span>
              <span>Pediatric Q&amp;A</span>
            </button>
          </nav>

          {/* Right Action Buttons (Zone 3) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Sano Points Counter Button - min 48px touch target */}
            <button
              type="button"
              onClick={onOpenLoyalty}
              className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-2.5 rounded-full bg-white border border-[#F5B301] text-[#1F2A44] text-xs font-bold hover:bg-[#F5B301]/10 active:scale-95 transition-all cursor-pointer min-h-[48px] min-w-[48px] shadow-2xs"
              title="View Sano Points & Loyalty Pass"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F5B301] shrink-0" />
              <span className="tabular-nums">{loyaltyPoints}</span>
              <span className="hidden sm:inline">Pts</span>
            </button>

            {/* Track Order Button on tablet/desktop */}
            <button
              type="button"
              onClick={() => onOpenOrderTracking()}
              className="hidden md:inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-[#1F2A44] border border-[#1F2A44]/20 rounded-full hover:bg-[#1F2A44]/5 active:scale-95 transition-all cursor-pointer min-h-[48px] min-w-[48px]"
              title="Track order status via Order ID"
            >
              <MapPin className="w-3.5 h-3.5 text-[#1F2A44] shrink-0" />
              <span>Track Order</span>
            </button>

            {/* Bag Button - min 48px touch target */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative inline-flex items-center justify-center gap-2 px-3.5 sm:px-4.5 py-2.5 text-sm font-bold bg-[#1F2A44] text-[#FFF6E9] rounded-full hover:bg-[#1F2A44]/90 active:scale-95 transition-all shadow-xs cursor-pointer min-h-[48px] min-w-[48px]"
              aria-label={`Shopping bag with ${totalItemCount} items`}
            >
              <ShoppingBag className="w-4 h-4 text-[#F5B301] shrink-0" />
              <span className="hidden sm:inline">Bag</span>
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-[#F5B301] text-[#1F2A44] rounded-full tabular-nums shrink-0">
                {totalItemCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Quick Jump Strip (Touch-friendly 48px pill heights for mobile thumbs) */}
      <div className="border-t border-[#1F2A44]/8 bg-white/75 backdrop-blur-xs overflow-x-auto no-scrollbar py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-2.5 text-xs font-bold whitespace-nowrap">
          <button
            type="button"
            onClick={() => {
              onNavigateToHome();
              setTimeout(() => onNavigateToSection('age-stages'), 50);
            }}
            className="min-h-[48px] min-w-[48px] px-4 py-2.5 rounded-full bg-[#1F2A44]/5 hover:bg-[#1F2A44]/10 active:scale-95 text-[#1F2A44] transition-all cursor-pointer inline-flex items-center justify-center shrink-0 border border-[#1F2A44]/10"
          >
            👶 Shop by Age &amp; Height
          </button>
          <button
            type="button"
            onClick={onNavigateToDiapers}
            className={`min-h-[48px] min-w-[48px] px-4 py-2.5 rounded-full transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 shrink-0 active:scale-95 border ${
              currentView === 'diapers'
                ? 'bg-[#F5B301] text-[#1F2A44] border-[#F5B301] shadow-2xs'
                : 'bg-[#F5B301]/20 hover:bg-[#F5B301]/30 text-[#1F2A44] border-[#F5B301]/30'
            }`}
          >
            📦 Diaper Station
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigateToHome();
              setTimeout(() => onNavigateToSection('visitor-gifts'), 50);
            }}
            className="min-h-[48px] min-w-[48px] px-4 py-2.5 rounded-full bg-[#E8604F]/15 hover:bg-[#E8604F]/25 text-[#1F2A44] transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 shrink-0 active:scale-95 border border-[#E8604F]/25"
          >
            🎁 Visitor Gifts (उपहार)
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigateToHome();
              setTimeout(() => onNavigateToSection('hospital-bag'), 50);
            }}
            className="min-h-[48px] min-w-[48px] px-4 py-2.5 rounded-full bg-[#1F2A44]/5 hover:bg-[#1F2A44]/10 text-[#1F2A44] transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 shrink-0 active:scale-95 border border-[#1F2A44]/10"
          >
            🏥 Hospital Bag (3 Stages)
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigateToHome();
              setTimeout(() => onNavigateToSection('pasni-celebrations'), 50);
            }}
            className="min-h-[48px] min-w-[48px] px-4 py-2.5 rounded-full bg-[#1F2A44]/5 hover:bg-[#1F2A44]/10 text-[#1F2A44] transition-all cursor-pointer inline-flex items-center justify-center shrink-0 active:scale-95 border border-[#1F2A44]/10"
          >
            🍚 Pasni &amp; Weaning
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigateToHome();
              setTimeout(() => onNavigateToSection('health-blog'), 50);
            }}
            className="min-h-[48px] min-w-[48px] px-4 py-2.5 rounded-full bg-[#5DAA7A]/15 hover:bg-[#5DAA7A]/25 text-[#1F2A44] transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 shrink-0 active:scale-95 border border-[#5DAA7A]/30"
          >
            🩵 Mom &amp; Kid Health
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigateToHome();
              setTimeout(() => onNavigateToSection('quick-restock'), 50);
            }}
            className="min-h-[48px] min-w-[48px] px-4 py-2.5 rounded-full bg-[#5DAA7A]/15 hover:bg-[#5DAA7A]/25 text-[#1F2A44] transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 shrink-0 active:scale-95 border border-[#5DAA7A]/30"
          >
            🔄 Quick Restock
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigateToHome();
              setTimeout(() => onNavigateToSection('why-sano'), 50);
            }}
            className="min-h-[48px] min-w-[48px] px-4 py-2.5 rounded-full bg-[#1F2A44]/5 hover:bg-[#1F2A44]/10 text-[#1F2A44] transition-all cursor-pointer inline-flex items-center justify-center shrink-0 active:scale-95 border border-[#1F2A44]/10"
          >
            🏬 Try at Doorstep &amp; Stores
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigateToHome();
              setTimeout(() => onNavigateToSection('expert-forum'), 50);
            }}
            className="min-h-[48px] min-w-[48px] px-4 py-2.5 rounded-full bg-[#1F2A44]/5 hover:bg-[#1F2A44]/10 text-[#1F2A44] transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 shrink-0 active:scale-95 border border-[#1F2A44]/10"
          >
            🩺 Pediatric Q&amp;A
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#1F2A44]/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-[#FFF6E9] shadow-2xl flex flex-col z-10 overflow-hidden animate-in slide-in-from-left duration-250">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#1F2A44]/10 bg-white/50">
              <div className="flex items-center gap-2">
                <span className="font-heading text-2xl font-bold tracking-tight text-[#1F2A44] lowercase">
                  sano
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#F5B301]" />
                <span className="text-xs text-[#1F2A44]/60 font-semibold ml-1">Navigation</span>
              </div>

              {/* Close Button - min 48x48px */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="min-h-[48px] min-w-[48px] p-2.5 rounded-full bg-[#1F2A44]/5 hover:bg-[#1F2A44]/10 active:scale-95 text-[#1F2A44] inline-flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5 text-[#1F2A44]" />
              </button>
            </div>

            {/* Quick Status Bar inside drawer */}
            <div className="p-3 bg-[#1F2A44]/5 border-b border-[#1F2A44]/10 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleMobileNavClick(onOpenLoyalty)}
                className="min-h-[48px] p-2.5 rounded-xl bg-white border border-[#F5B301] text-left flex items-center gap-2 hover:bg-[#F5B301]/10 active:scale-98 transition-all cursor-pointer shadow-2xs"
              >
                <Sparkles className="w-4 h-4 text-[#F5B301] shrink-0" />
                <div className="leading-tight">
                  <div className="text-[11px] text-[#1F2A44]/70 font-medium">Sano Points</div>
                  <div className="text-xs font-bold text-[#1F2A44]">{loyaltyPoints} Pts</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleMobileNavClick(() => onOpenOrderTracking())}
                className="min-h-[48px] p-2.5 rounded-xl bg-white border border-[#1F2A44]/20 text-left flex items-center gap-2 hover:bg-[#1F2A44]/5 active:scale-98 transition-all cursor-pointer shadow-2xs"
              >
                <MapPin className="w-4 h-4 text-[#1F2A44] shrink-0" />
                <div className="leading-tight">
                  <div className="text-[11px] text-[#1F2A44]/70 font-medium">Track Order</div>
                  <div className="text-xs font-bold text-[#1F2A44]">Live Status</div>
                </div>
              </button>
            </div>

            {/* Navigation Items List (Scrollable, Generous Tap Heights) */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#1F2A44]/50 px-2 pt-1 pb-1">
                Explore Categories &amp; Care
              </div>

              {/* Diaper Station */}
              <button
                type="button"
                onClick={() => handleMobileNavClick(onNavigateToDiapers)}
                className={`w-full min-h-[52px] p-3 rounded-2xl flex items-center justify-between transition-all cursor-pointer active:scale-98 border ${
                  currentView === 'diapers'
                    ? 'bg-[#F5B301] text-[#1F2A44] border-[#F5B301] font-bold shadow-xs'
                    : 'bg-white hover:bg-[#F5B301]/10 border-[#1F2A44]/10 text-[#1F2A44]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">📦</span>
                  <div className="text-left">
                    <div className="text-sm font-bold">Diaper Station</div>
                    <div className="text-xs opacity-75">All sizes, eco brands &amp; bulk packs</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 shrink-0 opacity-60" />
              </button>

              {/* Shop by Age & Height */}
              <button
                type="button"
                onClick={() =>
                  handleMobileNavClick(() => {
                    onNavigateToHome();
                    setTimeout(() => onNavigateToSection('age-stages'), 50);
                  })
                }
                className="w-full min-h-[52px] p-3 rounded-2xl bg-white hover:bg-[#1F2A44]/5 border border-[#1F2A44]/10 text-[#1F2A44] flex items-center justify-between transition-all cursor-pointer active:scale-98"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">👶</span>
                  <div className="text-left">
                    <div className="text-sm font-bold">Shop by Age &amp; Height</div>
                    <div className="text-xs text-[#1F2A44]/70">Centimeter-exact sizing (0–14y)</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 shrink-0 text-[#1F2A44]/40" />
              </button>

              {/* Quick Restock Recurring */}
              <button
                type="button"
                onClick={() =>
                  handleMobileNavClick(() => {
                    onNavigateToHome();
                    setTimeout(() => onNavigateToSection('quick-restock'), 50);
                  })
                }
                className="w-full min-h-[52px] p-3 rounded-2xl bg-white hover:bg-[#5DAA7A]/10 border border-[#5DAA7A]/30 text-[#1F2A44] flex items-center justify-between transition-all cursor-pointer active:scale-98"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🔄</span>
                  <div className="text-left">
                    <div className="text-sm font-bold flex items-center gap-1.5">
                      <span>Quick Restock</span>
                      <span className="text-[10px] bg-[#5DAA7A]/20 text-[#2E7D32] px-1.5 py-0.5 rounded-full font-bold">Auto</span>
                    </div>
                    <div className="text-xs text-[#1F2A44]/70">Monthly WhatsApp restock reminders</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 shrink-0 text-[#1F2A44]/40" />
              </button>

              {/* Try at Doorstep */}
              <button
                type="button"
                onClick={() =>
                  handleMobileNavClick(() => {
                    onNavigateToHome();
                    setTimeout(() => onNavigateToSection('why-sano'), 50);
                  })
                }
                className="w-full min-h-[52px] p-3 rounded-2xl bg-white hover:bg-[#1F2A44]/5 border border-[#1F2A44]/10 text-[#1F2A44] flex items-center justify-between transition-all cursor-pointer active:scale-98"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🏬</span>
                  <div className="text-left">
                    <div className="text-sm font-bold">Try at Doorstep &amp; Stores</div>
                    <div className="text-xs text-[#1F2A44]/70">Kathmandu store finder &amp; home trial</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 shrink-0 text-[#1F2A44]/40" />
              </button>

              {/* Pediatric Q&A Forum */}
              <button
                type="button"
                onClick={() =>
                  handleMobileNavClick(() => {
                    onNavigateToHome();
                    setTimeout(() => onNavigateToSection('expert-forum'), 50);
                  })
                }
                className="w-full min-h-[52px] p-3 rounded-2xl bg-white hover:bg-[#1F2A44]/5 border border-[#1F2A44]/10 text-[#1F2A44] flex items-center justify-between transition-all cursor-pointer active:scale-98"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🩺</span>
                  <div className="text-left">
                    <div className="text-sm font-bold flex items-center gap-1.5">
                      <span>Pediatric Q&amp;A Forum</span>
                      <span className="text-[10px] bg-[#5DAA7A]/20 text-[#2E7D32] px-1.5 py-0.5 rounded-full font-bold">Verified</span>
                    </div>
                    <div className="text-xs text-[#1F2A44]/70">Ask health &amp; weaning specialists</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 shrink-0 text-[#1F2A44]/40" />
              </button>

              {/* Visitor Gifts */}
              <button
                type="button"
                onClick={() =>
                  handleMobileNavClick(() => {
                    onNavigateToHome();
                    setTimeout(() => onNavigateToSection('visitor-gifts'), 50);
                  })
                }
                className="w-full min-h-[52px] p-3 rounded-2xl bg-white hover:bg-[#E8604F]/10 border border-[#E8604F]/20 text-[#1F2A44] flex items-center justify-between transition-all cursor-pointer active:scale-98"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🎁</span>
                  <div className="text-left">
                    <div className="text-sm font-bold">Visitor Gifts (उपहार)</div>
                    <div className="text-xs text-[#1F2A44]/70">Curated baby hampers &amp; gift sets</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 shrink-0 text-[#1F2A44]/40" />
              </button>

              {/* Hospital Bag Checklist */}
              <button
                type="button"
                onClick={() =>
                  handleMobileNavClick(() => {
                    onOpenChecklist();
                  })
                }
                className="w-full min-h-[52px] p-3 rounded-2xl bg-white hover:bg-[#1F2A44]/5 border border-[#1F2A44]/10 text-[#1F2A44] flex items-center justify-between transition-all cursor-pointer active:scale-98"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🏥</span>
                  <div className="text-left">
                    <div className="text-sm font-bold">Hospital Bag Checklist</div>
                    <div className="text-xs text-[#1F2A44]/70">Pre-delivery 3-stage interactive guide</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 shrink-0 text-[#1F2A44]/40" />
              </button>

              {/* Pasni & Weaning */}
              <button
                type="button"
                onClick={() =>
                  handleMobileNavClick(() => {
                    onNavigateToHome();
                    setTimeout(() => onNavigateToSection('pasni-celebrations'), 50);
                  })
                }
                className="w-full min-h-[52px] p-3 rounded-2xl bg-white hover:bg-[#1F2A44]/5 border border-[#1F2A44]/10 text-[#1F2A44] flex items-center justify-between transition-all cursor-pointer active:scale-98"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🍚</span>
                  <div className="text-left">
                    <div className="text-sm font-bold">Pasni &amp; Weaning Celebrations</div>
                    <div className="text-xs text-[#1F2A44]/70">Traditional wear, feeding bowls &amp; gifts</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 shrink-0 text-[#1F2A44]/40" />
              </button>

              {/* Mom & Kid Health */}
              <button
                type="button"
                onClick={() =>
                  handleMobileNavClick(() => {
                    onNavigateToHome();
                    setTimeout(() => onNavigateToSection('health-blog'), 50);
                  })
                }
                className="w-full min-h-[52px] p-3 rounded-2xl bg-white hover:bg-[#1F2A44]/5 border border-[#1F2A44]/10 text-[#1F2A44] flex items-center justify-between transition-all cursor-pointer active:scale-98"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🩵</span>
                  <div className="text-left">
                    <div className="text-sm font-bold">Mom &amp; Kid Health Hub</div>
                    <div className="text-xs text-[#1F2A44]/70">Doctor-verified wellness tips &amp; guides</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 shrink-0 text-[#1F2A44]/40" />
              </button>

              {/* Recent Orders */}
              <button
                type="button"
                onClick={() => handleMobileNavClick(onOpenRecentOrders)}
                className="w-full min-h-[52px] p-3 rounded-2xl bg-white hover:bg-[#1F2A44]/5 border border-[#1F2A44]/10 text-[#1F2A44] flex items-center justify-between transition-all cursor-pointer active:scale-98"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">📜</span>
                  <div className="text-left">
                    <div className="text-sm font-bold">Recent Order History</div>
                    <div className="text-xs text-[#1F2A44]/70">View past local orders and invoices</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 shrink-0 text-[#1F2A44]/40" />
              </button>
            </nav>

            {/* Bottom Actions inside drawer */}
            <div className="p-4 border-t border-[#1F2A44]/10 bg-white/70 space-y-2">
              <a
                href={`https://wa.me/${cleanNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-[#25D366] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#20ba5a] active:scale-98 transition-all cursor-pointer shadow-xs text-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Helpline: {SANO_CONTACT_PHONE}</span>
              </a>

              <button
                type="button"
                onClick={() => handleMobileNavClick(onOpenCart)}
                className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-[#1F2A44] text-[#FFF6E9] font-bold flex items-center justify-center gap-2 hover:bg-[#1F2A44]/90 active:scale-98 transition-all cursor-pointer shadow-xs text-sm"
              >
                <ShoppingBag className="w-4 h-4 text-[#F5B301]" />
                <span>View Shopping Bag ({totalItemCount} items)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

