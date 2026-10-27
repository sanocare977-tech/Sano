import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  ExternalLink, 
  MessageCircle, 
  ArrowRight,
  Sparkles,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SanoOrder } from '../types';
import { SAMPLE_TRACKING_ORDERS, MOCK_RIDERS, RiderInfo } from '../data/mockOrders';
import { SANO_WHATSAPP_NUMBER } from '../data/nepalLocations';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

type DeliveryStage = 'received' | 'confirmed' | 'packed' | 'dispatched' | 'delivered';

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  initialOrderId = '',
}) => {
  const [searchInput, setSearchInput] = useState<string>(initialOrderId);
  const [activeOrder, setActiveOrder] = useState<SanoOrder | null>(null);
  const [currentStage, setCurrentStage] = useState<DeliveryStage>('dispatched');
  const [rider, setRider] = useState<RiderInfo>(MOCK_RIDERS[0]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Load orders from localStorage or samples
  const getAllAvailableOrders = (): SanoOrder[] => {
    let localOrders: SanoOrder[] = [];
    try {
      const raw = localStorage.getItem('sano_orders');
      if (raw) localOrders = JSON.parse(raw);
    } catch {
      localOrders = [];
    }
    return [...localOrders, ...SAMPLE_TRACKING_ORDERS];
  };

  const findOrder = (id: string): SanoOrder | null => {
    const clean = id.trim().toUpperCase().replace('#', '');
    if (!clean) return null;

    const all = getAllAvailableOrders();
    // Exact or partial match
    const found = all.find((o) => o.orderId.toUpperCase() === clean || o.orderId.toUpperCase().includes(clean));
    if (found) return found;

    // If custom order ID entered by user not found, generate simulated active order
    if (clean.startsWith('SANO-') || clean.length >= 4) {
      return {
        orderId: clean.startsWith('SANO-') ? clean : `SANO-${clean}`,
        createdAt: new Date().toISOString(),
        items: SAMPLE_TRACKING_ORDERS[0].items,
        subtotalNPR: 2850,
        deliveryFeeNPR: 0,
        totalNPR: 2850,
        location: {
          latitude: 27.6915,
          longitude: 85.342,
          accuracyMeters: 10,
          googleMapsUrl: 'https://maps.google.com/?q=27.6915,85.342',
          cityArea: 'Kathmandu Valley Central',
          toleOrStreet: 'Delivery Address',
          landmark: 'GPS Pin Verified',
          provinceOrDistrict: 'Kathmandu',
          isGpsCaptured: true,
        },
        customer: {
          fullName: 'Sano Valued Parent',
          phone: '9841000000',
          paymentMethod: 'cod',
        },
        status: 'dispatched',
      };
    }

    return null;
  };

  const handleSearch = (targetId?: string) => {
    const idToSearch = targetId || searchInput;
    if (!idToSearch.trim()) {
      setSearchError('Please enter an Order ID (e.g. SANO-8821).');
      return;
    }

    const order = findOrder(idToSearch);
    if (order) {
      setActiveOrder(order);
      setSearchError(null);

      // Determine initial stage
      if (order.status === 'delivered') setCurrentStage('delivered');
      else if (order.status === 'dispatched') setCurrentStage('dispatched');
      else if (order.status === 'confirmed') setCurrentStage('confirmed');
      else setCurrentStage('dispatched');

      // Random rider assignment
      setRider(MOCK_RIDERS[Math.floor(Math.random() * MOCK_RIDERS.length)]);
    } else {
      setSearchError(`Order ID "${idToSearch}" was not found. Try SANO-8821 or SANO-7419.`);
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (initialOrderId) {
        setSearchInput(initialOrderId);
        handleSearch(initialOrderId);
      } else {
        // Default to most recent order or sample
        const all = getAllAvailableOrders();
        if (all.length > 0) {
          setActiveOrder(all[0]);
          setSearchInput(all[0].orderId);
          setCurrentStage(all[0].status === 'delivered' ? 'delivered' : 'dispatched');
        }
      }
    }
  }, [isOpen, initialOrderId]);

  if (!isOpen) return null;

  // Advance simulation to next step
  const handleSimulateNextStep = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      if (currentStage === 'received') setCurrentStage('confirmed');
      else if (currentStage === 'confirmed') setCurrentStage('packed');
      else if (currentStage === 'packed') setCurrentStage('dispatched');
      else if (currentStage === 'dispatched') {
        setCurrentStage('delivered');
        confetti({
          particleCount: 50,
          spread: 50,
          colors: ['#5DAA7A', '#F5B301', '#1F2A44'],
        });
      } else {
        setCurrentStage('confirmed'); // loop back
      }
    }, 400);
  };

  const stages: { key: DeliveryStage; title: string; subtitle: string; time: string }[] = [
    {
      key: 'received',
      title: 'Order Received',
      subtitle: 'Dispatched via WhatsApp desk to Kathmandu warehouse',
      time: 'Completed',
    },
    {
      key: 'confirmed',
      title: 'Order Confirmed',
      subtitle: 'Items verified & reserved in inventory',
      time: 'Completed',
    },
    {
      key: 'packed',
      title: 'Carefully Packed',
      subtitle: 'Sealed in recyclable kraft box with 14-day exchange slip',
      time: 'In Progress',
    },
    {
      key: 'dispatched',
      title: 'Out for Delivery',
      subtitle: 'Rider en route with your locked GPS coordinate pin',
      time: 'Estimated Today',
    },
    {
      key: 'delivered',
      title: 'Delivered to Doorstep',
      subtitle: 'Package safely received & payment collected',
      time: 'Final Step',
    },
  ];

  const getStageIndex = (st: DeliveryStage): number => {
    return stages.findIndex((s) => s.key === st);
  };

  const currentStageIndex = getStageIndex(currentStage);

  const cleanNumber = SANO_WHATSAPP_NUMBER.replace(/[^0-9]/g, '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1F2A44]/65 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#1F2A44]/15 overflow-hidden text-[#1F2A44] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#1F2A44]/10 bg-[#FFF6E9] flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-heading text-xl sm:text-2xl font-bold text-[#1F2A44]">
                Track Your Sano Delivery
              </span>
              <span className="w-2 h-2 rounded-full bg-[#F5B301]" />
            </div>
            <p className="text-xs sm:text-sm text-[#1F2A44]/75">
              Live status tracking with rider updates and GPS map coordinate verification across Kathmandu Valley.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#1F2A44]/60 hover:text-[#1F2A44] hover:bg-[#1F2A44]/5 cursor-pointer ml-2 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Search Bar */}
          <div className="space-y-2">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="flex gap-2"
            >
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#1F2A44]/40 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Enter Order Ref ID (e.g. SANO-8821)"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full bg-[#FFF6E9]/50 text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-full border border-[#1F2A44]/15 focus:border-[#F5B301] focus:ring-1 focus:ring-[#F5B301] outline-none uppercase font-mono"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 text-xs sm:text-sm font-bold bg-[#1F2A44] text-[#FFF6E9] rounded-full hover:bg-[#1F2A44]/90 cursor-pointer shrink-0 min-h-[44px]"
              >
                Track Order
              </button>
            </form>

            {/* Quick Demo ID chips */}
            <div className="flex items-center gap-1.5 text-xs text-[#1F2A44]/70 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] font-semibold text-[#1F2A44]/50 shrink-0">Sample Orders:</span>
              {['SANO-8821', 'SANO-7419'].map((demoId) => (
                <button
                  key={demoId}
                  type="button"
                  onClick={() => {
                    setSearchInput(demoId);
                    handleSearch(demoId);
                  }}
                  className="px-2.5 py-1 text-[11px] font-mono font-bold rounded-full bg-[#FFF6E9] border border-[#1F2A44]/15 hover:border-[#1F2A44]/35 text-[#1F2A44] cursor-pointer"
                >
                  #{demoId}
                </button>
              ))}
            </div>

            {searchError && (
              <div className="p-2.5 bg-[#E8604F]/10 border border-[#E8604F]/20 rounded-xl text-xs text-[#E8604F] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{searchError}</span>
              </div>
            )}
          </div>

          {activeOrder && (
            <>
              {/* Order Reference Card */}
              <div className="p-4 rounded-2xl bg-[#1F2A44] text-[#FFF6E9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-lg font-bold text-[#F5B301]">
                      #{activeOrder.orderId}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/15 text-[#FFF6E9]">
                      {currentStage === 'delivered' ? 'Completed' : 'Active Dispatch'}
                    </span>
                  </div>
                  <p className="text-xs text-[#FFF6E9]/70 mt-1">
                    Placed on {new Date(activeOrder.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>

                {/* Simulation Control */}
                <button
                  type="button"
                  onClick={handleSimulateNextStep}
                  disabled={isSimulating}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-[#F5B301] text-[#1F2A44] rounded-full hover:bg-[#F5B301]/90 active:scale-95 transition-all cursor-pointer self-start sm:self-auto shrink-0 shadow-none"
                  title="Simulate dispatch progressing to next stage"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
                  <span>Simulate Next Step</span>
                </button>
              </div>

              {/* 5-Step Visual Progress Timeline */}
              <div className="p-5 rounded-2xl border border-[#1F2A44]/12 bg-[#FFF6E9]/30 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-base font-bold text-[#1F2A44] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#F5B301]" />
                    Delivery Timeline
                  </h3>
                  <span className="text-xs font-semibold text-[#5DAA7A] bg-[#5DAA7A]/10 px-2.5 py-0.5 rounded-full">
                    Stage {currentStageIndex + 1} of {stages.length}
                  </span>
                </div>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#1F2A44]/15">
                  {stages.map((st, index) => {
                    const isDone = index < currentStageIndex;
                    const isCurrent = index === currentStageIndex;

                    return (
                      <div key={st.key} className="relative flex items-start gap-3">
                        {/* Dot indicator */}
                        <div className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center ${
                          isDone 
                            ? 'bg-[#5DAA7A] text-white' 
                            : isCurrent 
                            ? 'bg-[#1F2A44] text-[#F5B301] ring-4 ring-[#F5B301]/30' 
                            : 'bg-white border-2 border-[#1F2A44]/20'
                        }`}>
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : isCurrent ? (
                            <span className="w-2 h-2 rounded-full bg-[#F5B301]" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1F2A44]/20" />
                          )}
                        </div>

                        {/* Text */}
                        <div className="space-y-0.5">
                          <div className="flex items-baseline gap-2">
                            <span className={`text-xs sm:text-sm font-bold ${
                              isCurrent ? 'text-[#1F2A44]' : isDone ? 'text-[#1F2A44]/80' : 'text-[#1F2A44]/40'
                            }`}>
                              {st.title}
                            </span>
                            {isCurrent && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F5B301] text-[#1F2A44]">
                                Current Status
                              </span>
                            )}
                          </div>
                          <p className={`text-xs leading-relaxed ${isCurrent ? 'text-[#1F2A44]/80' : 'text-[#1F2A44]/60'}`}>
                            {st.subtitle}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Rider & Delivery Contact Card */}
              {currentStageIndex >= 2 && currentStage !== 'delivered' && (
                <div className="p-4 rounded-2xl bg-white border border-[#1F2A44]/15 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-[#1F2A44]/60 uppercase tracking-wider">
                    <span>Assigned Sano Delivery Rider</span>
                    <span className="text-[#5DAA7A]">{rider.eta}</span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#1F2A44] text-[#F5B301] flex items-center justify-center font-bold">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <strong className="block text-sm font-bold text-[#1F2A44]">
                          {rider.name}
                        </strong>
                        <span className="text-xs text-[#1F2A44]/70 block">
                          {rider.vehicle} · {rider.currentLocationNote}
                        </span>
                      </div>
                    </div>

                    <a
                      href={`tel:${rider.phone.replace(/[^0-9]/g, '')}`}
                      className="px-3.5 py-1.5 text-xs font-bold bg-[#1F2A44] text-[#FFF6E9] rounded-full hover:bg-[#1F2A44]/90 flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#F5B301]" />
                      <span>Call Rider</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Verified GPS Destination Card */}
              <div className="p-4 rounded-2xl bg-[#FFF6E9] border border-[#1F2A44]/12 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold flex items-center gap-1.5 text-[#1F2A44]">
                    <MapPin className="w-4 h-4 text-[#F5B301]" />
                    Delivery GPS Pin (Rider Coordinates)
                  </span>
                  <a
                    href={activeOrder.location.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#1F2A44] hover:text-[#E8604F] underline flex items-center gap-1"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="text-[#1F2A44]/80 space-y-0.5 text-[11px]">
                  <p>• Area: <strong>{activeOrder.location.cityArea}</strong></p>
                  <p>• Street / Tole: {activeOrder.location.toleOrStreet}</p>
                  <p>• Landmark: {activeOrder.location.landmark}</p>
                  <p className="font-mono text-[#1F2A44]/60">
                    • Exact GPS: {activeOrder.location.latitude?.toFixed(5)}° N, {activeOrder.location.longitude?.toFixed(5)}° E
                  </p>
                </div>
              </div>

              {/* Items in this order */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-[#1F2A44] block">Package Items ({activeOrder.items.length}):</span>
                <div className="space-y-1.5">
                  {activeOrder.items.map((i) => (
                    <div
                      key={`${i.product.id}-${i.selectedVariant}`}
                      className="p-2.5 rounded-xl bg-white border border-[#1F2A44]/10 flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-[#1F2A44] block">{i.product.name}</span>
                        <span className="text-[11px] text-[#1F2A44]/65">
                          Size/Variant: {i.selectedVariant} · Qty: {i.quantity}
                        </span>
                      </div>
                      <span className="font-heading text-sm font-bold tabular-nums">
                        Rs. {(i.quantity * i.product.priceNPR).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-between font-bold text-sm text-[#1F2A44]">
                  <span>Total Amount (COD/Fonepay):</span>
                  <span className="tabular-nums">Rs. {activeOrder.totalNPR.toLocaleString()}</span>
                </div>
              </div>

              {/* Need Help WhatsApp CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#1F2A44]/10 text-xs">
                <span className="text-[#1F2A44]/70">
                  Need to change delivery time or leave gate instructions?
                </span>

                <a
                  href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent(
                    `Hello Sano Care! I am inquiring regarding my delivery status for Order #${activeOrder.orderId}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-bold bg-[#1F2A44] text-[#FFF6E9] rounded-full hover:bg-[#1F2A44]/90 flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};
