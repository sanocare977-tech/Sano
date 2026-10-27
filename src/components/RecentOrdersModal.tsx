import React from 'react';
import { X, MapPin, ExternalLink, MessageCircle, Clock, ShoppingBag } from 'lucide-react';
import { SanoOrder } from '../types';
import { SANO_WHATSAPP_NUMBER } from '../data/nepalLocations';

interface RecentOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOrder: (order: SanoOrder) => void;
  onTrackOrder?: (orderId: string) => void;
}

export const RecentOrdersModal: React.FC<RecentOrdersModalProps> = ({
  isOpen,
  onClose,
  onSelectOrder,
  onTrackOrder,
}) => {
  if (!isOpen) return null;

  let orders: SanoOrder[] = [];
  try {
    const raw = localStorage.getItem('sano_orders');
    if (raw) orders = JSON.parse(raw);
  } catch {
    orders = [];
  }

  const cleanNumber = SANO_WHATSAPP_NUMBER.replace(/[^0-9]/g, '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1F2A44]/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl border border-[#1F2A44]/15 overflow-hidden text-[#1F2A44] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#1F2A44]/10 bg-[#FFF6E9] flex items-center justify-between">
          <div>
            <h2 className="font-heading text-xl font-bold text-[#1F2A44]">
              Recent Orders on this Device
            </h2>
            <p className="text-xs text-[#1F2A44]/70">
              No sign-in needed · Saved in your browser session
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#1F2A44]/60 hover:text-[#1F2A44] hover:bg-[#1F2A44]/5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3 max-h-[60vh] overflow-y-auto">
          {orders.length === 0 ? (
            <div className="text-center py-8 space-y-2">
              <ShoppingBag className="w-10 h-10 text-[#1F2A44]/30 mx-auto" />
              <p className="text-sm font-bold text-[#1F2A44]">No previous orders recorded</p>
              <p className="text-xs text-[#1F2A44]/60 max-w-xs mx-auto">
                When you check out and dispatch an order to our WhatsApp, it will be listed here with its delivery GPS pin.
              </p>
            </div>
          ) : (
            orders.map((o) => (
              <div
                key={o.orderId}
                className="p-4 rounded-xl border border-[#1F2A44]/12 bg-[#FFF6E9]/30 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-[#1F2A44]">
                      Order #{o.orderId}
                    </span>
                    <span className="text-[11px] text-[#1F2A44]/60 ml-2">
                      {new Date(o.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <span className="font-heading text-sm font-bold text-[#1F2A44] tabular-nums">
                    Rs. {o.totalNPR.toLocaleString()}
                  </span>
                </div>

                <div className="text-[#1F2A44]/75 text-[11px]">
                  <span>{o.items.map((i) => `${i.quantity}× ${i.product.name}`).join(', ')}</span>
                </div>

                <div className="pt-2 border-t border-[#1F2A44]/10 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <span className="flex items-center gap-1 text-[#1F2A44]/80">
                    <MapPin className="w-3.5 h-3.5 text-[#F5B301]" />
                    {o.location.toleOrStreet}, {o.location.cityArea}
                  </span>

                  <div className="flex items-center gap-2">
                    {onTrackOrder && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onTrackOrder(o.orderId);
                        }}
                        className="px-2.5 py-1 rounded-full bg-[#1F2A44] text-[#FFF6E9] font-bold text-[10px] hover:bg-[#1F2A44]/90 cursor-pointer"
                      >
                        Track Status
                      </button>
                    )}

                    <a
                      href={o.location.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#1F2A44] hover:underline flex items-center gap-0.5"
                    >
                      <span>Maps Pin</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <a
                      href={`https://wa.me/${cleanNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#5DAA7A] hover:underline flex items-center gap-0.5"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>WhatsApp Care</span>
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1F2A44]/10 bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-[#1F2A44] bg-[#FFF6E9] rounded-full hover:bg-[#EAE0D0] cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
