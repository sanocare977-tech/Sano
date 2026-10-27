import React from 'react';
import { MapPin, ShieldCheck, HeartHandshake, RefreshCw, Sparkles, Building2 } from 'lucide-react';
import { SANO_STORE_LOCATION } from '../data/nepalLocations';

export const PhysicalStoreSection: React.FC = () => {
  return (
    <section id="why-sano" className="py-14 sm:py-20 bg-white border-t border-[#1F2A44]/10 text-[#1F2A44]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1F2A44]/60">
            Brand Story & Positioning
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1F2A44]">
            Why we built sano.
          </h2>
          <p className="text-base sm:text-lg text-[#1F2A44]/80 leading-relaxed">
            <strong className="text-[#1F2A44]">Sano</strong> means <em>“small”</em> in Nepali. We chose the name because every single product we stock is made for small people with big lives.
          </p>
        </div>

        {/* 3 Brand Pillars from Guidelines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#FFF6E9] border border-[#1F2A44]/10 space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#1F2A44] flex items-center justify-center">
              <HeartHandshake className="w-5 h-5 text-[#F5B301]" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#1F2A44]">
              Warm & Grounded
            </h3>
            <p className="text-sm text-[#1F2A44]/75 leading-relaxed">
              We speak like a trusted friend who has been through the same sleepless nights. We acknowledge the reality of parenting without drama or patronizing advice.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFF6E9] border border-[#1F2A44]/10 space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#1F2A44] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#F5B301]" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#1F2A44]">
              Height-First Sizing
            </h3>
            <p className="text-sm text-[#1F2A44]/75 leading-relaxed">
              Age tags alone fail because kids grow differently. Every garment and shoe lists height in centimeters alongside age, so it fits right the first time.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFF6E9] border border-[#1F2A44]/10 space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#1F2A44] flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-[#F5B301]" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#1F2A44]">
              Honest & Practical
            </h3>
            <p className="text-sm text-[#1F2A44]/75 leading-relaxed">
              No invented urgency. No fake scarcity count-downs. If a product runs small, we say so. If it doesn’t fit, exchange it within 14 days without receipt drama.
            </p>
          </div>
        </div>

        {/* Physical Store Coming Notice */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#1F2A44] text-[#FFF6E9] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#F5B301] uppercase tracking-wider">
              <Building2 className="w-4 h-4" />
              <span>Kathmandu Retail Store In Progress</span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold">
              Starting online. Flagship store coming to Kathmandu.
            </h3>
            <p className="text-sm text-[#FFF6E9]/80 leading-relaxed">
              We are currently fulfilling home deliveries across Kathmandu Valley (24–48 hours) and countrywide courier. Our physical sensory play & apparel store in {SANO_STORE_LOCATION} is preparing to open late 2026.
            </p>
          </div>

          <div className="shrink-0 space-y-2">
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-xs space-y-1">
              <span className="text-[#F5B301] font-bold block">Click & Collect Readiness</span>
              <span className="text-[#FFF6E9]/80 block">
                Integrated inventory so in-store pickup and doorstep delivery work seamlessly.
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
