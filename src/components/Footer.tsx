import React from 'react';
import { MessageCircle, Mail, MapPin, Phone, ShieldCheck, Heart, ChevronRight, ArrowUp, Package, Stethoscope, RefreshCw, Sparkles, ShoppingBag } from 'lucide-react';
import { SANO_WHATSAPP_NUMBER, SANO_CONTACT_PHONE, SANO_STORE_LOCATION } from '../data/nepalLocations';

interface FooterProps {
  onOpenChecklist: () => void;
  onOpenRecentOrders: () => void;
  onNavigateToDiapers?: () => void;
  onOpenOrderTracking?: (orderId?: string) => void;
  onNavigateToSection?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenChecklist,
  onOpenRecentOrders,
  onNavigateToDiapers,
  onOpenOrderTracking,
  onNavigateToSection,
}) => {
  const cleanNumber = SANO_WHATSAPP_NUMBER.replace(/[^0-9]/g, '');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionClick = (sectionId: string) => {
    if (onNavigateToSection) {
      onNavigateToSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#1F2A44] text-[#FFF6E9] border-t border-[#1F2A44] pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand Wordmark & Story */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="group flex items-baseline select-none cursor-pointer text-left min-h-[48px] py-1 active:scale-95 transition-transform"
              aria-label="sano - Scroll back to top"
            >
              <span className="font-heading text-4xl font-bold tracking-tight text-[#FFF6E9] lowercase">
                sano
              </span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#F5B301] ml-0.5 group-hover:scale-125 transition-transform" />
            </button>

            <p className="font-heading text-lg text-[#FFF6E9]/90">
              Everything for little ones.
            </p>
            <p className="text-sm text-[#FFF6E9]/70 leading-relaxed">
              Small people. Big joy. Built specifically for parents across Kathmandu and Nepal with easy mobile ordering.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs text-[#F5B301] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#F5B301]" />
              <span>Kathmandu Valley &amp; All 77 Districts</span>
            </div>

            {/* Quick Scroll to Top button for mobile */}
            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToTop}
                className="w-full sm:w-auto min-h-[48px] px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 active:bg-white/20 text-[#FFF6E9] text-xs font-bold inline-flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <ArrowUp className="w-4 h-4 text-[#F5B301]" />
                <span>Back to Top of Page</span>
              </button>
            </div>
          </div>

          {/* Col 2: Care & Navigation Quick Links (Touch-friendly 48px tap targets) */}
          <div className="space-y-3">
            <h4 className="font-heading text-base font-bold text-[#FFF6E9]">
              Care &amp; Essentials
            </h4>
            <div className="space-y-2">
              {onNavigateToDiapers && (
                <button
                  type="button"
                  onClick={onNavigateToDiapers}
                  className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-left text-xs sm:text-sm font-bold text-[#F5B301] flex items-center justify-between transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">📦</span>
                    <span>Diaper Station (Sizes &amp; Bulk)</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#F5B301]/70 group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}

              <button
                type="button"
                onClick={onOpenChecklist}
                className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-left text-xs sm:text-sm text-[#FFF6E9]/85 flex items-center justify-between transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🏥</span>
                  <span>Hospital Bag Checklist (3 Stages)</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#FFF6E9]/40 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => handleSectionClick('age-stages')}
                className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-left text-xs sm:text-sm text-[#FFF6E9]/85 flex items-center justify-between transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">👶</span>
                  <span>Shop by Age &amp; Height (0–14y)</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#FFF6E9]/40 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => handleSectionClick('quick-restock')}
                className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-left text-xs sm:text-sm text-[#FFF6E9]/85 flex items-center justify-between transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🔄</span>
                  <span>Quick Restock Subscription</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#FFF6E9]/40 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => handleSectionClick('why-sano')}
                className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-left text-xs sm:text-sm text-[#FFF6E9]/85 flex items-center justify-between transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🏬</span>
                  <span>Try at Doorstep &amp; Stores</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#FFF6E9]/40 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => handleSectionClick('expert-forum')}
                className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-left text-xs sm:text-sm text-[#FFF6E9]/85 flex items-center justify-between transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🩺</span>
                  <span>Pediatrician &amp; Expert Q&amp;A</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#FFF6E9]/40 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => (onOpenOrderTracking ? onOpenOrderTracking() : onOpenRecentOrders())}
                className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-left text-xs sm:text-sm font-bold text-[#F5B301] flex items-center justify-between transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#F5B301]" />
                  <span>Track Order ID (Live Dispatch)</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#F5B301]/70 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onOpenRecentOrders}
                className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-left text-xs sm:text-sm text-[#FFF6E9]/85 flex items-center justify-between transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">📜</span>
                  <span>View Local Order History</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#FFF6E9]/40 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Col 3: Delivery & Honest Policy */}
          <div className="space-y-3">
            <h4 className="font-heading text-base font-bold text-[#FFF6E9]">
              Honest Guarantees
            </h4>
            <div className="space-y-3 text-xs text-[#FFF6E9]/75 leading-relaxed">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <strong className="text-[#FFF6E9] block mb-1">14-Day Fit Guarantee:</strong>
                <span>If it doesn't fit your child, exchange or return within 14 days without drama.</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <strong className="text-[#FFF6E9] block mb-1">Valley Delivery:</strong>
                <span>24–48 hours to your doorstep with exact GPS coordinate tracking across Kathmandu, Lalitpur, and Bhaktapur.</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <strong className="text-[#FFF6E9] block mb-1">All Nepal Courier:</strong>
                <span>Express couriers to Pokhara, Chitwan, Butwal, Biratnagar, Dharan, and across all 77 districts.</span>
              </div>
            </div>
          </div>

          {/* Col 4: Direct WhatsApp & Contact (Tap-friendly buttons) */}
          <div className="space-y-3">
            <h4 className="font-heading text-base font-bold text-[#FFF6E9]">
              Connect with sano. care
            </h4>
            <div className="space-y-2.5 text-xs">
              {/* WhatsApp direct tap target */}
              <a
                href={`https://wa.me/${cleanNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[52px] p-3 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#FFF6E9] transition-all w-full cursor-pointer flex items-center gap-3 active:scale-98"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366] shrink-0" />
                <div className="text-left">
                  <div className="text-[11px] text-[#25D366] font-bold uppercase tracking-wider">Instant Chat</div>
                  <div className="text-xs sm:text-sm font-bold text-white">WhatsApp: {SANO_CONTACT_PHONE}</div>
                </div>
              </a>

              {/* Email direct tap target */}
              <a
                href="mailto:sanocare977@gmail.com"
                className="min-h-[48px] px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-[#FFF6E9] transition-all w-full cursor-pointer flex items-center gap-3"
              >
                <Mail className="w-4 h-4 text-[#F5B301] shrink-0" />
                <div className="truncate">
                  <div className="text-[10px] text-[#FFF6E9]/60">Email Support</div>
                  <div className="text-xs font-semibold text-white truncate">sanocare977@gmail.com</div>
                </div>
              </a>

              {/* Store location direct tap card */}
              <button
                type="button"
                onClick={() => handleSectionClick('why-sano')}
                className="min-h-[48px] px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-[#FFF6E9] text-left transition-all w-full cursor-pointer flex items-start gap-3"
              >
                <MapPin className="w-4 h-4 text-[#F5B301] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-[#FFF6E9]/60">Physical Presence</div>
                  <div className="text-xs text-[#FFF6E9]/90">{SANO_STORE_LOCATION}</div>
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Quiet Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF6E9]/60">
          <p>© 2026 sano. and sano care. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Crafted with love for little ones in Nepal</span>
            <Heart className="w-3.5 h-3.5 text-[#E8604F] fill-[#E8604F]" />
          </p>
        </div>

      </div>
    </footer>
  );
};

