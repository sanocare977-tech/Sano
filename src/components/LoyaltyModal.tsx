import React, { useState } from 'react';
import { X, Sparkles, Award, ArrowRight, CheckCircle2, History, Gift, Store, ShieldCheck, Tag } from 'lucide-react';
import { LoyaltyProfile } from '../types/loyalty';
import { SANO_STORE_LOCATION } from '../data/nepalLocations';

interface LoyaltyModalProps {
  isOpen: boolean;
  onClose: () => void;
  loyalty: LoyaltyProfile;
  onRedeemPoints: (pointsToRedeem: number) => void;
  appliedDiscountNPR: number;
}

export const LoyaltyModal: React.FC<LoyaltyModalProps> = ({
  isOpen,
  onClose,
  loyalty,
  onRedeemPoints,
  appliedDiscountNPR,
}) => {
  const [redeemSuccess, setRedeemSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const tierProgress = 
    loyalty.totalPoints < 200 
      ? Math.min(100, Math.round((loyalty.totalPoints / 200) * 100))
      : loyalty.totalPoints < 500
      ? Math.min(100, Math.round(((loyalty.totalPoints - 200) / 300) * 100))
      : 100;

  const nextTierName = loyalty.totalPoints < 200 ? 'Sprout (200 pts)' : loyalty.totalPoints < 500 ? 'Bloom (500 pts)' : 'Master Bloom';

  const handleQuickRedeem = (pts: number) => {
    if (loyalty.totalPoints >= pts) {
      onRedeemPoints(pts);
      setRedeemSuccess(`Successfully applied Rs. ${pts} discount to your current order!`);
      setTimeout(() => setRedeemSuccess(null), 3500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1F2A44]/65 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl border border-[#1F2A44]/15 overflow-hidden text-[#1F2A44] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#FFF6E9] text-[#1F2A44] flex items-center justify-center hover:bg-[#EAE0D0] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-5 sm:p-7 space-y-6">
          
          {/* Header */}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading text-2xl font-bold text-[#1F2A44]">
                Sano Points Loyalty Pass
              </span>
              <span className="w-2 h-2 rounded-full bg-[#F5B301]" />
            </div>
            <p className="text-xs sm:text-sm text-[#1F2A44]/75 mt-0.5">
              Earn on every order. Works seamlessly online via WhatsApp and in our upcoming Kathmandu physical store.
            </p>
          </div>

          {/* Digital Sano Pass Card */}
          <div className="relative rounded-2xl bg-[#1F2A44] text-[#FFF6E9] p-5 sm:p-6 space-y-4 border border-[#1F2A44] shadow-none overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline select-none">
                <span className="font-heading text-2xl font-bold tracking-tight text-[#FFF6E9] lowercase">
                  sano
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-[#F5B301] ml-0.5" />
                <span className="text-xs font-semibold text-[#FFF6E9]/70 ml-2 tracking-wide uppercase">
                  Care Pass
                </span>
              </div>

              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#F5B301] text-[#1F2A44]">
                Tier: {loyalty.tier}
              </span>
            </div>

            <div className="pt-2 flex items-baseline justify-between">
              <div>
                <span className="text-[11px] text-[#FFF6E9]/60 uppercase tracking-wider block">
                  Available Points Balance
                </span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-heading text-4xl font-bold text-[#F5B301] tabular-nums">
                    {loyalty.totalPoints}
                  </span>
                  <span className="text-sm font-bold text-[#FFF6E9]/90">
                    Sano Points
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-[#FFF6E9]/60 uppercase tracking-wider block">
                  Store Cash Value
                </span>
                <span className="font-heading text-xl font-bold text-[#FFF6E9] tabular-nums">
                  Rs. {loyalty.totalPoints}
                </span>
              </div>
            </div>

            {/* Progress to next tier */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[11px] text-[#FFF6E9]/70">
                <span>Progress to {nextTierName}</span>
                <span className="tabular-nums font-mono">{tierProgress}%</span>
              </div>
              <div className="w-full bg-white/15 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#F5B301] h-full rounded-full transition-all duration-300"
                  style={{ width: `${tierProgress}%` }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-[#FFF6E9]/60">
              <span className="font-mono">{loyalty.passNumber}</span>
              <span>1 Point = Rs. 1 · No Expiry</span>
            </div>
          </div>

          {/* Quick Redemption Options */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="font-heading text-sm font-bold text-[#1F2A44] flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-[#F5B301]" />
                Redeem on Your Current Order
              </h4>
              {appliedDiscountNPR > 0 && (
                <span className="text-xs font-bold text-[#5DAA7A] bg-[#5DAA7A]/10 px-2 py-0.5 rounded-full">
                  Rs. {appliedDiscountNPR} Discount Active
                </span>
              )}
            </div>

            {redeemSuccess && (
              <div className="p-2.5 bg-[#5DAA7A]/15 text-[#1F2A44] rounded-xl text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5DAA7A] shrink-0" />
                <span>{redeemSuccess}</span>
              </div>
            )}

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickRedeem(50)}
                disabled={loyalty.totalPoints < 50}
                className="p-3 rounded-xl border border-[#1F2A44]/15 hover:border-[#1F2A44]/40 bg-[#FFF6E9]/50 text-left disabled:opacity-40 cursor-pointer transition-all"
              >
                <span className="block text-xs font-bold text-[#1F2A44]">Rs. 50 Off</span>
                <span className="block text-[11px] text-[#1F2A44]/65 mt-0.5">Use 50 points</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickRedeem(100)}
                disabled={loyalty.totalPoints < 100}
                className="p-3 rounded-xl border border-[#1F2A44]/15 hover:border-[#1F2A44]/40 bg-[#FFF6E9]/50 text-left disabled:opacity-40 cursor-pointer transition-all"
              >
                <span className="block text-xs font-bold text-[#1F2A44]">Rs. 100 Off</span>
                <span className="block text-[11px] text-[#1F2A44]/65 mt-0.5">Use 100 points</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickRedeem(200)}
                disabled={loyalty.totalPoints < 200}
                className="p-3 rounded-xl border border-[#1F2A44]/15 hover:border-[#1F2A44]/40 bg-[#FFF6E9]/50 text-left disabled:opacity-40 cursor-pointer transition-all"
              >
                <span className="block text-xs font-bold text-[#1F2A44]">Rs. 200 Off</span>
                <span className="block text-[11px] text-[#1F2A44]/65 mt-0.5">Use 200 points</span>
              </button>
            </div>
          </div>

          {/* How Sano Points Work */}
          <div className="p-3.5 rounded-xl bg-[#FFF6E9] border border-[#1F2A44]/10 space-y-2 text-xs">
            <h5 className="font-bold text-[#1F2A44]">How to earn more Sano Points:</h5>
            <ul className="space-y-1 text-[#1F2A44]/80">
              <li>• <strong>1 Point per Rs. 100:</strong> Earned automatically every time you place an order.</li>
              <li>• <strong>Instant Dispatch:</strong> Points attach straight to your order manifest.</li>
              <li>• <strong>In-Store Continuity:</strong> When our physical store in {SANO_STORE_LOCATION} opens, your pass will sync at the cash counter.</li>
            </ul>
          </div>

          {/* Points History */}
          <div className="space-y-2">
            <h5 className="font-bold text-xs text-[#1F2A44] flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-[#1F2A44]/60" />
              Points Activity Log
            </h5>
            <div className="max-h-32 overflow-y-auto space-y-1 text-xs">
              {loyalty.history.map((tx) => (
                <div key={tx.id} className="p-2 rounded-lg bg-white border border-[#1F2A44]/10 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-[#1F2A44] block">{tx.reason}</span>
                    <span className="text-[10px] text-[#1F2A44]/60">
                      {new Date(tx.date).toLocaleDateString()}
                    </span>
                  </div>
                  <span className={`font-bold font-mono ${tx.points >= 0 ? 'text-[#5DAA7A]' : 'text-[#E8604F]'}`}>
                    {tx.points >= 0 ? `+${tx.points}` : `${tx.points}`} pts
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
