import React, { useState } from 'react';
import { 
  X, 
  MessageCircle, 
  MapPin, 
  Phone, 
  User, 
  CreditCard, 
  Gift, 
  Copy, 
  Check, 
  ShieldCheck, 
  ArrowRight,
  Truck
} from 'lucide-react';
import { CartItem, CustomerDetails, PreciseLocation, SanoOrder } from '../types';
import { LocationMapPicker } from './LocationMapPicker';
import { MAJOR_NEPAL_CITIES, SANO_WHATSAPP_NUMBER } from '../data/nepalLocations';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  subtotalNPR: number;
  deliveryFeeNPR: number;
  totalNPR: number;
  onOrderSuccess: (order: SanoOrder, pointsEarned: number) => void;
  loyaltyPoints: number;
  appliedDiscountNPR: number;
  onOpenLoyalty: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  subtotalNPR,
  deliveryFeeNPR,
  totalNPR,
  onOrderSuccess,
  loyaltyPoints,
  appliedDiscountNPR,
  onOpenLoyalty,
}) => {
  const pointsToEarn = Math.floor(Math.max(0, totalNPR - appliedDiscountNPR) / 100);
  const finalPayableNPR = Math.max(0, totalNPR - appliedDiscountNPR);
  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    alternatePhone: '',
    noteForRider: '',
    isGift: false,
    giftMessage: '',
    paymentMethod: 'cod',
  });

  const [location, setLocation] = useState<PreciseLocation>({
    latitude: 27.6915,
    longitude: 85.342,
    accuracyMeters: null,
    googleMapsUrl: 'https://maps.google.com/?q=27.6915,85.342',
    cityArea: 'Kathmandu Valley',
    toleOrStreet: '',
    landmark: '',
    provinceOrDistrict: 'Kathmandu',
    isGpsCaptured: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [copied, setCopied] = useState<boolean>(false);
  const [customWhatsAppNumber, setCustomWhatsAppNumber] = useState<string>(SANO_WHATSAPP_NUMBER);
  const [showNumberEdit, setShowNumberEdit] = useState<boolean>(false);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: { [key: string]: string } = {};

    if (!customer.fullName.trim()) {
      errs.fullName = 'Please enter parent / customer full name.';
    }

    const cleanPhone = customer.phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 9) {
      errs.phone = 'Please provide a valid 10-digit Nepal mobile number.';
    }

    if (!location.isGpsCaptured && (!location.latitude || !location.longitude)) {
      errs.location = 'Compulsory GPS location is required. Please tap "Detect Location" or click on the map.';
    }

    if (!location.toleOrStreet.trim()) {
      errs.toleOrStreet = 'Please specify your street, tole, or house number.';
    }

    if (!location.landmark.trim()) {
      errs.landmark = 'Please add a nearby landmark (e.g. Opposite hospital, yellow house).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const generateOrderMessage = (orderId: string): string => {
    const dateStr = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const itemsList = cartItems
      .map(
        (item, index) =>
          `${index + 1}. *${item.product.name}*\n   • Size/Age: ${item.selectedVariant}\n   • Qty: ${item.quantity} × Rs. ${item.product.priceNPR.toLocaleString()} = Rs. ${(item.quantity * item.product.priceNPR).toLocaleString()}`
      )
      .join('\n\n');

    const paymentText =
      customer.paymentMethod === 'cod'
        ? 'Cash on Delivery (COD)'
        : customer.paymentMethod === 'fonepay_qr'
        ? 'FonePay QR on Delivery'
        : 'eSewa on Delivery';

    const deliveryFeeText =
      deliveryFeeNPR === 0 ? 'FREE (Valley threshold reached)' : `Rs. ${deliveryFeeNPR}`;

    const discountLine = appliedDiscountNPR > 0 
      ? `\n*Sano Points Discount:* -Rs. ${appliedDiscountNPR.toLocaleString()} (${appliedDiscountNPR} pts redeemed)`
      : '';

    return `*NEW ORDER · sano.*
━━━━━━━━━━━━━━━━━━━━
*Order Ref:* #${orderId}
*Date:* ${dateStr}

🛍️ *ITEMS:*
${itemsList}

━━━━━━━━━━━━━━━━━━━━
*Subtotal:* Rs. ${subtotalNPR.toLocaleString()}${discountLine}
*Delivery Fee:* ${deliveryFeeText}
*TOTAL AMOUNT:* Rs. ${finalPayableNPR.toLocaleString()}
*Payment Method:* ${paymentText}
*Sano Points to Earn:* +${pointsToEarn} Points (Pass synced)

📍 *COMPULSORY DELIVERY GPS LOCATION:*
• *Google Maps Pin:* ${location.googleMapsUrl}
• *Exact Coordinates:* ${location.latitude?.toFixed(6)}° N, ${location.longitude?.toFixed(6)}° E
• *City / Area:* ${location.cityArea}
• *Tole / Street:* ${location.toleOrStreet}
• *Landmark:* ${location.landmark}

👤 *RECIPIENT DETAILS:*
• *Customer Name:* ${customer.fullName}
• *Phone Number:* ${customer.phone}${customer.alternatePhone ? `\n• *Alternate Phone:* ${customer.alternatePhone}` : ''}${
      customer.noteForRider ? `\n• *Note for Rider:* ${customer.noteForRider}` : ''
    }${
      customer.isGift && customer.giftMessage
        ? `\n\n🎁 *GIFT ORDER MESSAGE:*\n"${customer.giftMessage}"`
        : ''
    }

━━━━━━━━━━━━━━━━━━━━
_Small people. Big joy._
sano. — Everything for little ones.`;
  };

  const handlePlaceOrderWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const orderId = `SANO-${Math.floor(1000 + Math.random() * 9000)}`;
    const msg = generateOrderMessage(orderId);

    const newOrder: SanoOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      items: cartItems,
      subtotalNPR,
      deliveryFeeNPR,
      totalNPR,
      location,
      customer,
      status: 'sent_to_whatsapp',
    };

    // Save to local storage for guest order tracking
    try {
      const existingStr = localStorage.getItem('sano_orders');
      const existing = existingStr ? JSON.parse(existingStr) : [];
      localStorage.setItem('sano_orders', JSON.stringify([newOrder, ...existing]));
    } catch {
      // Ignore storage errors
    }

    // Direct WhatsApp Web / App intent
    const cleanNumber = customWhatsAppNumber.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`;
    
    // Open WhatsApp
    window.open(waUrl, '_blank');

    // Trigger success callback
    onOrderSuccess(newOrder, pointsToEarn);
  };

  const handleCopyOrderText = () => {
    const tempOrderId = `SANO-${Math.floor(1000 + Math.random() * 9000)}`;
    const msg = generateOrderMessage(tempOrderId);
    navigator.clipboard.writeText(msg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1F2A44]/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl my-auto bg-[#FFF6E9] rounded-2xl border border-[#1F2A44]/15 overflow-hidden text-[#1F2A44]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-[#1F2A44]/10 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-heading text-xl sm:text-2xl font-bold text-[#1F2A44]">
              Guest Checkout
            </span>
            <span className="inline-block w-2 h-2 rounded-full bg-[#F5B301]" />
            <span className="text-xs font-semibold text-[#5DAA7A] bg-[#5DAA7A]/10 px-2 py-0.5 rounded-full">
              No Sign-in Needed
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#1F2A44]/60 hover:text-[#1F2A44] hover:bg-[#1F2A44]/5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handlePlaceOrderWhatsApp} className="p-4 sm:p-6 space-y-6 max-h-[78vh] overflow-y-auto">
          
          {/* Order Summary banner */}
          <div className="p-4 rounded-xl bg-white border border-[#1F2A44]/10 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#1F2A44]/60">
              <span>Order Breakdown ({cartItems.length} items)</span>
              <span>Total Payable: Rs. {finalPayableNPR.toLocaleString()}</span>
            </div>
            <div className="text-xs text-[#1F2A44]/80 flex flex-wrap gap-x-4 gap-y-1">
              {cartItems.map((item) => (
                <span key={`${item.product.id}-${item.selectedVariant}`}>
                  {item.quantity}× {item.product.name} ({item.selectedVariant})
                </span>
              ))}
            </div>

            {/* Sano Points Reward Preview & Discount */}
            <div className="pt-2 border-t border-[#1F2A44]/8 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={onOpenLoyalty}
                className="flex items-center gap-1.5 text-[#1F2A44] font-bold hover:underline cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-[#F5B301]" />
                <span>You'll earn +{pointsToEarn} Sano Points</span>
              </button>
              {appliedDiscountNPR > 0 ? (
                <span className="text-[#5DAA7A] font-bold">
                  Points Discount: -Rs. {appliedDiscountNPR.toLocaleString()}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={onOpenLoyalty}
                  className="text-[11px] font-bold text-[#F5B301] hover:underline cursor-pointer"
                >
                  Redeem Points ({loyaltyPoints} available) →
                </button>
              )}
            </div>
          </div>

          {/* SECTION 1: COMPULSORY PRECISE MAP-BASED GPS PICKER */}
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1F2A44] text-[#FFF6E9] text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-heading text-lg font-bold text-[#1F2A44]">
                  Compulsory Delivery GPS Location
                </h3>
              </div>
              <p className="text-xs text-[#1F2A44]/70 mt-0.5">
                Pin your exact home or office. It automatically generates a Google Maps coordinate link for the WhatsApp dispatch.
              </p>
            </div>

            <LocationMapPicker
              location={location}
              onChange={(updated) => {
                setLocation(updated);
                if (errors.location) {
                  setErrors((prev) => ({ ...prev, location: '' }));
                }
              }}
              requiredError={!!errors.location}
            />
            {errors.location && (
              <p className="text-xs text-[#E8604F] font-bold">{errors.location}</p>
            )}

            {/* Address fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-[#1F2A44] mb-1">
                  City / Region <span className="text-[#E8604F]">*</span>
                </label>
                <select
                  value={location.cityArea}
                  onChange={(e) => setLocation({ ...location, cityArea: e.target.value })}
                  className="w-full bg-white text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#1F2A44]/15 focus:border-[#F5B301] focus:ring-1 focus:ring-[#F5B301] outline-none"
                >
                  {MAJOR_NEPAL_CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1F2A44] mb-1">
                  Tole / Street / House No. <span className="text-[#E8604F]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Shankhamul Marga, House #14"
                  value={location.toleOrStreet}
                  onChange={(e) => {
                    setLocation({ ...location, toleOrStreet: e.target.value });
                    if (errors.toleOrStreet) setErrors((prev) => ({ ...prev, toleOrStreet: '' }));
                  }}
                  className={`w-full bg-white text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border ${
                    errors.toleOrStreet ? 'border-[#E8604F]' : 'border-[#1F2A44]/15'
                  } focus:border-[#F5B301] focus:ring-1 focus:ring-[#F5B301] outline-none`}
                />
                {errors.toleOrStreet && (
                  <p className="text-[11px] text-[#E8604F] mt-1">{errors.toleOrStreet}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#1F2A44] mb-1">
                  Nearest Landmark <span className="text-[#E8604F]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 50 meters past Krishna Mandir, yellow boundary gate"
                  value={location.landmark}
                  onChange={(e) => {
                    setLocation({ ...location, landmark: e.target.value });
                    if (errors.landmark) setErrors((prev) => ({ ...prev, landmark: '' }));
                  }}
                  className={`w-full bg-white text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border ${
                    errors.landmark ? 'border-[#E8604F]' : 'border-[#1F2A44]/15'
                  } focus:border-[#F5B301] focus:ring-1 focus:ring-[#F5B301] outline-none`}
                />
                {errors.landmark && (
                  <p className="text-[11px] text-[#E8604F] mt-1">{errors.landmark}</p>
                )}
              </div>
            </div>
          </div>

          {/* SECTION 2: CUSTOMER CONTACT DETAILS */}
          <div className="space-y-3 pt-3 border-t border-[#1F2A44]/10">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#1F2A44] text-[#FFF6E9] text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h3 className="font-heading text-lg font-bold text-[#1F2A44]">
                Customer & Contact Details
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#1F2A44] mb-1">
                  Parent / Customer Full Name <span className="text-[#E8604F]">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#1F2A44]/40 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. Anju Bajracharya"
                    value={customer.fullName}
                    onChange={(e) => {
                      setCustomer({ ...customer, fullName: e.target.value });
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                    }}
                    className={`w-full bg-white text-xs sm:text-sm pl-9 pr-3.5 py-2.5 rounded-xl border ${
                      errors.fullName ? 'border-[#E8604F]' : 'border-[#1F2A44]/15'
                    } focus:border-[#F5B301] focus:ring-1 focus:ring-[#F5B301] outline-none`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-[11px] text-[#E8604F] mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1F2A44] mb-1">
                  Mobile Number (for delivery call & WhatsApp) <span className="text-[#E8604F]">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#1F2A44]/40 absolute left-3 top-3" />
                  <input
                    type="tel"
                    placeholder="e.g. 9841234567"
                    value={customer.phone}
                    onChange={(e) => {
                      setCustomer({ ...customer, phone: e.target.value });
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                    }}
                    className={`w-full bg-white text-xs sm:text-sm pl-9 pr-3.5 py-2.5 rounded-xl border ${
                      errors.phone ? 'border-[#E8604F]' : 'border-[#1F2A44]/15'
                    } focus:border-[#F5B301] focus:ring-1 focus:ring-[#F5B301] outline-none`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-[11px] text-[#E8604F] mt-1">{errors.phone}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#1F2A44] mb-1">
                  Delivery Note for Rider (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Baby might be sleeping, please ring once or call before knocking"
                  value={customer.noteForRider}
                  onChange={(e) => setCustomer({ ...customer, noteForRider: e.target.value })}
                  className="w-full bg-white text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-[#1F2A44]/15 focus:border-[#F5B301] focus:ring-1 focus:ring-[#F5B301] outline-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: PAYMENT & GIFTING OPTIONS */}
          <div className="space-y-3 pt-3 border-t border-[#1F2A44]/10">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#1F2A44] text-[#FFF6E9] text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="font-heading text-lg font-bold text-[#1F2A44]">
                Payment on Arrival
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <label className={`p-3 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                customer.paymentMethod === 'cod'
                  ? 'bg-white border-[#1F2A44] ring-1 ring-[#1F2A44]'
                  : 'bg-white/60 border-[#1F2A44]/15 hover:bg-white'
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={customer.paymentMethod === 'cod'}
                  onChange={() => setCustomer({ ...customer, paymentMethod: 'cod' })}
                  className="accent-[#1F2A44]"
                />
                <div>
                  <span className="block text-xs font-bold text-[#1F2A44]">Cash on Delivery</span>
                  <span className="block text-[11px] text-[#1F2A44]/65">Pay cash to rider</span>
                </div>
              </label>

              <label className={`p-3 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                customer.paymentMethod === 'fonepay_qr'
                  ? 'bg-white border-[#1F2A44] ring-1 ring-[#1F2A44]'
                  : 'bg-white/60 border-[#1F2A44]/15 hover:bg-white'
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="fonepay_qr"
                  checked={customer.paymentMethod === 'fonepay_qr'}
                  onChange={() => setCustomer({ ...customer, paymentMethod: 'fonepay_qr' })}
                  className="accent-[#1F2A44]"
                />
                <div>
                  <span className="block text-xs font-bold text-[#1F2A44]">FonePay QR</span>
                  <span className="block text-[11px] text-[#1F2A44]/65">Scan rider's mobile QR</span>
                </div>
              </label>

              <label className={`p-3 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                customer.paymentMethod === 'esewa'
                  ? 'bg-white border-[#1F2A44] ring-1 ring-[#1F2A44]'
                  : 'bg-white/60 border-[#1F2A44]/15 hover:bg-white'
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="esewa"
                  checked={customer.paymentMethod === 'esewa'}
                  onChange={() => setCustomer({ ...customer, paymentMethod: 'esewa' })}
                  className="accent-[#1F2A44]"
                />
                <div>
                  <span className="block text-xs font-bold text-[#1F2A44]">eSewa / Khalti</span>
                  <span className="block text-[11px] text-[#1F2A44]/65">Digital wallet transfer</span>
                </div>
              </label>
            </div>

            {/* Gifting mode */}
            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={customer.isGift}
                  onChange={(e) => setCustomer({ ...customer, isGift: e.target.checked })}
                  className="w-4 h-4 rounded text-[#1F2A44] accent-[#1F2A44]"
                />
                <span className="text-xs font-bold text-[#1F2A44] flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-[#F5B301]" />
                  Is this a gift for a niece, nephew, or friend's baby?
                </span>
              </label>

              {customer.isGift && (
                <div className="mt-2 pl-6">
                  <textarea
                    rows={2}
                    placeholder="Enter personal gift note to write on Sano cream card (e.g. 'Welcome to the world, little Maya! Love from Uncle Rohan')"
                    value={customer.giftMessage}
                    onChange={(e) => setCustomer({ ...customer, giftMessage: e.target.value })}
                    className="w-full bg-white text-xs p-2.5 rounded-xl border border-[#1F2A44]/15 focus:border-[#F5B301] outline-none"
                  />
                  <p className="text-[11px] text-[#1F2A44]/60 mt-0.5">
                    Includes complimentary kraft paper wrap and 14-day hassle-free size exchange guarantee.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sano WhatsApp Business Configuration Preview */}
          <div className="p-3 bg-white rounded-xl border border-[#1F2A44]/10 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#5DAA7A] shrink-0" />
              <span>
                Order dispatches directly to: <strong className="text-[#1F2A44]">+{customWhatsAppNumber}</strong> (Sano Care Desk)
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowNumberEdit(!showNumberEdit)}
              className="text-[#1F2A44]/60 hover:text-[#1F2A44] underline text-[11px] cursor-pointer"
            >
              {showNumberEdit ? 'Done' : 'Change WhatsApp Number for Testing'}
            </button>
          </div>

          {showNumberEdit && (
            <div className="p-3 bg-[#FFF6E9] border border-[#1F2A44]/15 rounded-xl text-xs space-y-1">
              <label className="font-bold">Dispatch WhatsApp Number (Country Code + Number):</label>
              <input
                type="text"
                value={customWhatsAppNumber}
                onChange={(e) => setCustomWhatsAppNumber(e.target.value)}
                placeholder="e.g. 9779800000000"
                className="w-full bg-white px-3 py-1.5 rounded-lg border border-[#1F2A44]/20 text-xs"
              />
              <p className="text-[11px] text-[#1F2A44]/60">
                You can set your own WhatsApp number here to test receiving the exact message.
              </p>
            </div>
          )}

          {/* Actions & WhatsApp Order Submit Button */}
          <div className="pt-2 space-y-2.5">
            <button
              type="submit"
              className="w-full py-4 px-6 text-base font-bold bg-[#1F2A44] text-[#FFF6E9] rounded-full hover:bg-[#1F2A44]/90 active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer min-h-[52px]"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
              <span>Place Order via WhatsApp (Rs. {totalNPR.toLocaleString()})</span>
              <ArrowRight className="w-4 h-4 text-[#F5B301]" />
            </button>

            <div className="flex items-center justify-between text-xs text-[#1F2A44]/60 px-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5DAA7A]" />
                Zero risk · Pay on delivery
              </span>
              <button
                type="button"
                onClick={handleCopyOrderText}
                className="text-[#1F2A44] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#5DAA7A]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied order text!' : 'Copy order text manually'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
