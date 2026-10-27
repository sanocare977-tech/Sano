import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, MessageCircle, MapPin, ExternalLink, X, Truck, ShieldCheck } from 'lucide-react';
import { SanoOrder } from '../types';
import { SANO_WHATSAPP_NUMBER } from '../data/nepalLocations';

interface OrderConfirmationModalProps {
  order: SanoOrder | null;
  onClose: () => void;
  pointsEarned?: number;
  onOpenLoyalty?: () => void;
  onTrackOrder?: (orderId: string) => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  pointsEarned,
  onOpenLoyalty,
  onTrackOrder,
}) => {
  useEffect(() => {
    if (order) {
      // Gentle celebratory confetti
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F5B301', '#1F2A44', '#5DAA7A', '#FFF6E9'],
      });
    }
  }, [order]);

  if (!order) return null;

  const cleanNumber = SANO_WHATSAPP_NUMBER.replace(/[^0-9]/g, '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1F2A44]/65 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl border border-[#1F2A44]/15 overflow-hidden text-[#1F2A44] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#FFF6E9] text-[#1F2A44] flex items-center justify-center hover:bg-[#EAE0D0] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#5DAA7A]/15 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-[#5DAA7A]" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-[#1F2A44]">
              Order Dispatched to WhatsApp!
            </h2>
            <p className="text-xs sm:text-sm text-[#1F2A44]/75">
              Order Ref: <strong className="font-mono text-[#1F2A44]">#{order.orderId}</strong>
            </p>

            {/* Sano Points Earned Toast */}
            {pointsEarned && pointsEarned > 0 && (
              <div 
                onClick={onOpenLoyalty}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5B301]/20 border border-[#F5B301] text-[#1F2A44] text-xs font-bold cursor-pointer hover:bg-[#F5B301]/30 transition-colors"
              >
                <span>✨ You just earned +{pointsEarned} Sano Points!</span>
                <span className="underline">View Loyalty Pass →</span>
              </div>
            )}
          </div>

          {/* Delivery GPS Pin verified */}
          <div className="p-4 rounded-xl bg-[#FFF6E9] border border-[#1F2A44]/10 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-1.5 text-[#1F2A44]">
                <MapPin className="w-4 h-4 text-[#F5B301]" />
                Delivery GPS Pin Attached
              </span>
              <a
                href={order.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#1F2A44] hover:text-[#E8604F] underline flex items-center gap-1"
              >
                <span>View Pin</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="text-[#1F2A44]/80 space-y-0.5 text-[11px]">
              <p>• Area: {order.location.cityArea}</p>
              <p>• Street / Tole: {order.location.toleOrStreet}</p>
              <p>• Landmark: {order.location.landmark}</p>
              <p className="font-mono text-[#1F2A44]/60">
                • GPS: {order.location.latitude?.toFixed(5)}° N, {order.location.longitude?.toFixed(5)}° E
              </p>
            </div>
          </div>

          {/* Order Details summary */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between font-bold border-b border-[#1F2A44]/10 pb-2">
              <span>{order.items.length} Product(s)</span>
              <span>Total: Rs. {order.totalNPR.toLocaleString()}</span>
            </div>
            <div className="text-[#1F2A44]/70 space-y-1">
              {order.items.map((i) => (
                <div key={`${i.product.id}-${i.selectedVariant}`} className="flex justify-between">
                  <span>{i.quantity}× {i.product.name} ({i.selectedVariant})</span>
                  <span className="tabular-nums">Rs. {(i.quantity * i.product.priceNPR).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What happens next */}
          <div className="p-3.5 rounded-xl bg-white border border-[#1F2A44]/15 space-y-1 text-xs">
            <strong className="block text-[#1F2A44] font-bold">What happens next:</strong>
            <p className="text-[#1F2A44]/75">
              1. Our Kathmandu dispatch team reviews your items and locked GPS pin.
            </p>
            <p className="text-[#1F2A44]/75">
              2. We will send a confirmation reply on your WhatsApp with your delivery rider's dispatch time.
            </p>
            <p className="text-[#1F2A44]/75">
              3. Pay upon arrival with Cash, Fonepay, or eSewa.
            </p>
          </div>

          {/* Re-open WhatsApp button if needed */}
          <div className="space-y-2">
            {onTrackOrder && (
              <button
                type="button"
                onClick={() => onTrackOrder(order.orderId)}
                className="w-full py-3 px-4 text-xs sm:text-sm font-bold bg-[#F5B301] text-[#1F2A44] rounded-full hover:bg-[#F5B301]/90 flex items-center justify-center gap-2 cursor-pointer shadow-none"
              >
                <Truck className="w-4 h-4 text-[#1F2A44]" />
                <span>Track This Order Live (#{order.orderId})</span>
              </button>
            )}

            <a
              href={`https://wa.me/${cleanNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 text-xs sm:text-sm font-bold bg-[#1F2A44] text-[#FFF6E9] rounded-full hover:bg-[#1F2A44]/90 flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
              <span>Chat with Sano Care Desk on WhatsApp</span>
            </a>

            <button
              onClick={onClose}
              className="w-full py-2 px-4 text-xs font-bold text-[#1F2A44] border border-[#1F2A44]/20 rounded-full hover:bg-[#FFF6E9] cursor-pointer"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
