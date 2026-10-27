import React from 'react';
import { MessageCircle, Mail, MapPin, Phone, ShieldCheck, Heart } from 'lucide-react';
import { SANO_WHATSAPP_NUMBER, SANO_CONTACT_PHONE, SANO_STORE_LOCATION } from '../data/nepalLocations';

interface FooterProps {
  onOpenChecklist: () => void;
  onOpenRecentOrders: () => void;
  onNavigateToDiapers?: () => void;
  onOpenOrderTracking?: (orderId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenChecklist,
  onOpenRecentOrders,
  onNavigateToDiapers,
  onOpenOrderTracking,
}) => {
  const cleanNumber = SANO_WHATSAPP_NUMBER.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-[#1F2A44] text-[#FFF6E9] border-t border-[#1F2A44] pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand Wordmark & Story */}
          <div className="space-y-4">
            <div className="flex items-baseline select-none">
              <span className="font-heading text-4xl font-bold tracking-tight text-[#FFF6E9] lowercase">
                sano
              </span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#F5B301] ml-0.5" />
            </div>

            <p className="font-heading text-lg text-[#FFF6E9]/90">
              Everything for little ones.
            </p>
            <p className="text-sm text-[#FFF6E9]/70 leading-relaxed">
              Small people. Big joy. Built for busy parents shopping on their phones across Nepal.
            </p>

            <div className="text-xs text-[#F5B301] font-semibold">
              Nepal · Online first · Physical store coming
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading text-base font-bold text-[#FFF6E9]">
              Care & Essentials
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#FFF6E9]/75">
              {onNavigateToDiapers && (
                <li>
                  <button
                    onClick={onNavigateToDiapers}
                    className="hover:text-[#F5B301] transition-colors cursor-pointer text-left font-bold text-[#F5B301]"
                  >
                    Diaper Station (All Brands & Sizes)
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={onOpenChecklist}
                  className="hover:text-[#F5B301] transition-colors cursor-pointer text-left"
                >
                  Hospital Bag Checklist (Pre-delivery)
                </button>
              </li>
              <li>
                <a href="#age-stages" className="hover:text-[#F5B301] transition-colors">
                  Shop by Age & Height (0–14y)
                </a>
              </li>
              <li>
                <a href="#why-sano" className="hover:text-[#F5B301] transition-colors">
                  Our Kathmandu Store Roadmap
                </a>
              </li>
              <li>
                <button
                  onClick={() => (onOpenOrderTracking ? onOpenOrderTracking() : onOpenRecentOrders())}
                  className="hover:text-[#F5B301] transition-colors cursor-pointer text-left font-bold"
                >
                  Track Order ID (Live Dispatch Status)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenRecentOrders}
                  className="hover:text-[#F5B301] transition-colors cursor-pointer text-left"
                >
                  View Local Order History
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Delivery & Honest Policy */}
          <div className="space-y-3">
            <h4 className="font-heading text-base font-bold text-[#FFF6E9]">
              Honest Guarantees
            </h4>
            <div className="space-y-2 text-xs text-[#FFF6E9]/75 leading-relaxed">
              <p>
                <strong className="text-[#FFF6E9]">14-Day Fit Guarantee:</strong> If it doesn't fit your child, send it back within 14 days without drama.
              </p>
              <p>
                <strong className="text-[#FFF6E9]">Valley Delivery:</strong> 24–48 hours to your doorstep with exact GPS coordinate tracking.
              </p>
              <p>
                <strong className="text-[#FFF6E9]">All Nepal:</strong> Express couriers to Pokhara, Chitwan, Butwal, Biratnagar, Dharan, and across all 77 districts.
              </p>
            </div>
          </div>

          {/* Col 4: Direct WhatsApp & Contact */}
          <div className="space-y-3">
            <h4 className="font-heading text-base font-bold text-[#FFF6E9]">
              Connect with sano. care
            </h4>
            <div className="space-y-2.5 text-xs text-[#FFF6E9]/80">
              <a
                href={`https://wa.me/${cleanNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-[#FFF6E9] transition-colors w-full cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366] shrink-0" />
                <span>WhatsApp: {SANO_CONTACT_PHONE}</span>
              </a>

              <div className="flex items-center gap-2 text-xs">
                <Mail className="w-4 h-4 text-[#F5B301] shrink-0" />
                <a href="mailto:sanocare977@gmail.com" className="hover:underline">
                  sanocare977@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-2 text-xs">
                <MapPin className="w-4 h-4 text-[#F5B301] shrink-0 mt-0.5" />
                <span>{SANO_STORE_LOCATION}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Quiet Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF6E9]/60">
          <p>© 2026 sano. and sano care. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with love for little ones in Nepal</span>
            <Heart className="w-3.5 h-3.5 text-[#E8604F] fill-[#E8604F]" />
          </p>
        </div>

      </div>
    </footer>
  );
};
