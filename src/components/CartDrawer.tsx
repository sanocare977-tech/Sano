import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, Truck, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, variant: string, delta: number) => void;
  onRemoveItem: (productId: string, variant: string) => void;
  onProceedToCheckout: () => void;
  onOpenChecklist: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onOpenChecklist,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.priceNPR * item.quantity,
    0
  );
  const freeThreshold = 2500;
  const progressPercent = Math.min(100, Math.round((subtotal / freeThreshold) * 100));
  const amountToFree = Math.max(0, freeThreshold - subtotal);
  const isFreeValleyDelivery = subtotal >= freeThreshold;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1F2A44]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-[#FFF6E9] border-l border-[#1F2A44]/15 flex flex-col text-[#1F2A44] shadow-2xl">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#1F2A44]/10 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#F5B301]" />
              <h2 className="font-heading text-xl font-bold text-[#1F2A44]">
                Your Shopping Bag
              </h2>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#1F2A44] text-[#FFF6E9] tabular-nums">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center text-[#1F2A44]/70 hover:text-[#1F2A44] hover:bg-[#1F2A44]/5 active:scale-95 transition-all cursor-pointer"
              aria-label="Close shopping bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Valley Free Delivery progress */}
          <div className="px-5 py-3 bg-white border-b border-[#1F2A44]/8 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-bold text-[#1F2A44]">
                <Truck className="w-3.5 h-3.5 text-[#5DAA7A]" />
                {isFreeValleyDelivery ? (
                  <span className="text-[#5DAA7A]">You qualified for FREE Valley Delivery!</span>
                ) : (
                  <span>Add Rs. {amountToFree.toLocaleString()} more for FREE delivery</span>
                )}
              </span>
              <span className="font-mono text-[11px] text-[#1F2A44]/60 tabular-nums">
                Rs. {subtotal.toLocaleString()} / Rs. 2,500
              </span>
            </div>

            <div className="w-full bg-[#EAE0D0] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#5DAA7A] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border border-[#1F2A44]/15">
                  <ShoppingBag className="w-8 h-8 text-[#1F2A44]/40" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#1F2A44]">
                    Your bag is empty
                  </h3>
                  <p className="text-xs text-[#1F2A44]/70 mt-1 max-w-xs leading-relaxed">
                    Nothing here yet. Try choosing an age stage or browse essentials from pregnancy to 14 years.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenChecklist();
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold bg-[#1F2A44] text-[#FFF6E9] rounded-full cursor-pointer hover:bg-[#1F2A44]/90 min-h-[48px] min-w-[48px] active:scale-95 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F5B301]" />
                  <span>View Hospital Bag Checklist</span>
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedVariant}`}
                  className="p-3.5 rounded-xl bg-white border border-[#1F2A44]/10 flex gap-3 text-xs shadow-2xs"
                >
                  {/* Thumbnail */}
                  <div className="w-18 h-18 rounded-lg bg-[#FFF6E9] overflow-hidden shrink-0 border border-[#1F2A44]/10">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-[#1F2A44] text-xs sm:text-sm leading-snug line-clamp-1">
                          {item.product.name}
                        </h4>
                        {/* Remove trash button with min 48px tap target */}
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id, item.selectedVariant)}
                          className="w-12 h-12 min-w-[48px] min-h-[48px] -mr-3 -mt-3 rounded-full flex items-center justify-center text-[#1F2A44]/40 hover:text-[#E8604F] hover:bg-red-50/80 active:scale-90 transition-all cursor-pointer"
                          aria-label={`Remove ${item.product.name} size ${item.selectedVariant} from bag`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="inline-block mt-0.5 text-[11px] font-semibold text-[#1F2A44]/70 bg-[#FFF6E9] px-2.5 py-0.5 rounded-full border border-[#1F2A44]/10">
                        {item.selectedVariant}
                      </span>
                    </div>

                    {/* Quantity steppers (generous 48px touch areas) and price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#1F2A44]/20 rounded-full bg-[#FFF6E9] p-0.5 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedVariant, -1)}
                          className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center font-bold text-base text-[#1F2A44] hover:bg-[#EAE0D0] active:scale-90 transition-transform cursor-pointer"
                          aria-label={`Decrease quantity of ${item.product.name}`}
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-bold text-xs sm:text-sm tabular-nums text-[#1F2A44]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedVariant, 1)}
                          className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center font-bold text-base text-[#1F2A44] hover:bg-[#EAE0D0] active:scale-90 transition-transform cursor-pointer"
                          aria-label={`Increase quantity of ${item.product.name}`}
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-heading text-sm sm:text-base font-bold text-[#1F2A44] tabular-nums">
                          Rs. {(item.product.priceNPR * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout action with safe-area padding for mobile */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] bg-white border-t border-[#1F2A44]/10 space-y-3 shadow-lg">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#1F2A44]/70">
                  <span>Subtotal:</span>
                  <span className="font-bold tabular-nums">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#1F2A44]/70">
                  <span>Valley Delivery:</span>
                  <span className="font-bold text-[#5DAA7A]">
                    {isFreeValleyDelivery ? 'FREE' : 'Rs. 100'}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#1F2A44] pt-1.5 border-t border-[#1F2A44]/10">
                  <span>Estimated Total:</span>
                  <span className="font-heading text-xl font-bold tabular-nums">
                    Rs. {(subtotal + (isFreeValleyDelivery ? 0 : 100)).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-6 text-sm sm:text-base font-bold bg-[#1F2A44] text-[#FFF6E9] rounded-full hover:bg-[#1F2A44]/90 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[50px] shadow-sm"
              >
                <span>Proceed to WhatsApp Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#F5B301]" />
              </button>

              <p className="text-[11px] text-center text-[#1F2A44]/60">
                Compulsory precise GPS pin captured on next step · No account needed
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
