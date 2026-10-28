import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Clock, 
  Check, 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight,
  ArrowRight,
  MessageSquare
} from 'lucide-react';

interface SanoStore {
  id: string;
  name: string;
  area: string;
  fullAddress: string;
  phone: string;
  hours: string;
  stockStatus: string;
  specialty: string;
  googleMapsUrl: string;
  features: string[];
}

const SANO_STORES: SanoStore[] = [
  {
    id: 'store-jhamsikhel',
    name: 'sano. Flagship Experience & Sensory Hub',
    area: 'Jhamsikhel, Lalitpur',
    fullAddress: 'Ward 3, Jhamsikhel Road (near St. Mary’s lane), Lalitpur',
    phone: '+977 1 5521234',
    hours: '10:00 AM – 7:30 PM (Open 7 Days)',
    stockStatus: '100% In-Stock · All Sizes Available',
    specialty: 'Full apparel collection, wooden Montessori play gym & stroller test-track',
    googleMapsUrl: 'https://maps.google.com/?q=Jhamsikhel+Lalitpur',
    features: ['Try-On Changing Room', 'Sensory Play Area', 'Lactation / Nursing Pod', 'Free Parking'],
  },
  {
    id: 'store-durbarmarg',
    name: 'sano care. Maternity & Hospital Prep Boutique',
    area: 'Durbar Marg, Kathmandu',
    fullAddress: 'Durbar Marg Arcade, Level 2, Kathmandu',
    phone: '+977 1 4239876',
    hours: '10:30 AM – 7:30 PM (Mon – Sat)',
    stockStatus: 'Maternity, Newborn & Gift Hampers Ready',
    specialty: 'Curated 3-phase hospital bags, recovery wear & luxury baby shower hampers',
    googleMapsUrl: 'https://maps.google.com/?q=Durbar+Marg+Kathmandu',
    features: ['Hospital Bag Packing Concierge', 'Gift Wrapping Station', 'Certified Doula Guidance'],
  },
  {
    id: 'store-maharajgunj',
    name: 'sano care. Pediatric & Infant Nutrition Hub',
    area: 'Maharajgunj, Kathmandu',
    fullAddress: 'Opposite TU Teaching Hospital / Kanti Children’s Gate, Maharajgunj',
    phone: '+977 1 4415678',
    hours: '9:00 AM – 8:00 PM (Open 7 Days)',
    stockStatus: 'Feeding, Diapers & Preemie Gear In-Stock',
    specialty: 'Medical borosilicate bottles, preemie wraps, sterile breast pumps & anti-colic teats',
    googleMapsUrl: 'https://maps.google.com/?q=Maharajgunj+Kathmandu',
    features: ['Express Hospital Room Delivery', 'Diaper Restock Depot', 'Clinical Baby Scale'],
  },
  {
    id: 'store-bhaktapur',
    name: 'sano. Handwoven Dhaka & Pasni Atelier',
    area: 'Bhaktapur Durbar Square',
    fullAddress: 'Near Taumadhi Square, Bhaktapur Heritage Zone',
    phone: '+977 1 6612345',
    hours: '10:00 AM – 6:30 PM (Open 7 Days)',
    stockStatus: 'Pure Brass Thalis & Dhaka Outfits',
    specialty: 'Palpali handwoven Dhaka frocks, red zari velvet Pasni suits & solid brass thalis',
    googleMapsUrl: 'https://maps.google.com/?q=Bhaktapur+Durbar+Square',
    features: ['Custom Size Tailoring', 'Heirloom Brass Engraving', 'Traditional Ceremony Sets'],
  },
];

const TRY_ON_PRODUCTS = [
  { id: 'try-outfit-velvet', name: 'Embroidered Velvet Pasni Suit (Red & Gold)', sizes: ['50–56 cm (NB)', '56–62 cm (0–3M)', '62–68 cm (3–6M)', '68–74 cm (6–9M)'] },
  { id: 'try-outfit-dhaka', name: 'Handwoven Palpali Dhaka Kurta Suruwal Set', sizes: ['56–62 cm (0–3M)', '62–68 cm (3–6M)', '68–74 cm (6–9M)', '74–80 cm (9–12M)'] },
  { id: 'try-shoes-booties', name: 'Soft-Sole Embroidered Zari Ceremony Booties', sizes: ['Size 1 (0–3M / 10cm)', 'Size 2 (3–6M / 11cm)', 'Size 3 (6–12M / 12cm)'] },
  { id: 'try-shoes-prewalker', name: 'Non-Slip Flexible Rubber Pre-Walker Shoes', sizes: ['EU 18 (11.5cm)', 'EU 19 (12.2cm)', 'EU 20 (13.0cm)', 'EU 21 (13.8cm)'] },
];

export const StoreFinderAndTryAtDoorstep: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'try_on' | 'stores'>('try_on');
  const [selectedStoreId, setSelectedStoreId] = useState<string>('store-jhamsikhel');

  // Try-on Booking Form State
  const [selectedProduct, setSelectedProduct] = useState<string>(TRY_ON_PRODUCTS[0].id);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([
    TRY_ON_PRODUCTS[0].sizes[0],
    TRY_ON_PRODUCTS[0].sizes[1],
  ]);
  const [childName, setChildName] = useState<string>('Aarav');
  const [parentName, setParentName] = useState<string>('Bikram Shrestha');
  const [phone, setPhone] = useState<string>('+977 9841234567');
  const [address, setAddress] = useState<string>('Sanepa, Lalitpur (near British School)');
  const [timeSlot, setTimeSlot] = useState<string>('Afternoon (2:00 PM – 5:00 PM)');
  const [isBooked, setIsBooked] = useState<boolean>(false);

  const currentProd = TRY_ON_PRODUCTS.find((p) => p.id === selectedProduct) || TRY_ON_PRODUCTS[0];

  const handleToggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      if (selectedSizes.length > 1) {
        setSelectedSizes(selectedSizes.filter((s) => s !== size));
      }
    } else {
      if (selectedSizes.length < 3) {
        setSelectedSizes([...selectedSizes, size]);
      }
    }
  };

  const handleBookTryOn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  const activeStore = SANO_STORES.find((s) => s.id === selectedStoreId) || SANO_STORES[0];

  const whatsappTryOnMessage = `🏬 *sano. Doorstep Try-On Booking Request*\n\nNamaste! I would like to book a Doorstep Try-On for my baby in Kathmandu Valley:\n\n👶 *Child*: ${childName}\n🛍️ *Item*: ${currentProd.name}\n📏 *Selected Sizes to Try (Up to 3)*: ${selectedSizes.join(', ')}\n📍 *Address*: ${address}\n⏰ *Preferred Slot*: ${timeSlot}\n📞 *Contact*: ${phone} (${parentName})\n\nLooking forward to having the rider bring the sizes so we can keep the one that fits best!`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappTryOnMessage)}`;

  return (
    <section id="why-sano" className="py-14 sm:py-20 bg-white border-t border-[#1F2A44]/10 text-[#1F2A44]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Super Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#1F2A44]/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5B301]/20 text-[#1F2A44] text-xs font-bold mb-3">
              <Building2 className="w-3.5 h-3.5 text-[#F5B301]" />
              <span>Omnichannel Kathmandu Valley Experience</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1F2A44]">
              "Try at Doorstep" &amp; Physical Store Network
            </h2>
            <p className="text-sm sm:text-base text-[#1F2A44]/75 mt-2 max-w-2xl leading-relaxed">
              Never worry about sizing mistakes again. Select up to 3 sizes to try on at home with our courier, or visit our physical flagship &amp; partner boutiques across Kathmandu, Lalitpur, and Bhaktapur.
            </p>
          </div>

          {/* Switcher Tab */}
          <div className="flex items-center gap-2 bg-[#FFF6E9] p-1.5 rounded-full border border-[#1F2A44]/15 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('try_on')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                activeTab === 'try_on'
                  ? 'bg-[#1F2A44] text-[#FFF6E9] shadow-sm'
                  : 'text-[#1F2A44] hover:bg-black/5'
              }`}
            >
              <Truck className="w-4 h-4 text-[#F5B301]" />
              <span>1. Doorstep Try-On (घरैमा साइज)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('stores')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                activeTab === 'stores'
                  ? 'bg-[#1F2A44] text-[#FFF6E9] shadow-sm'
                  : 'text-[#1F2A44] hover:bg-black/5'
              }`}
            >
              <Building2 className="w-4 h-4 text-[#5DAA7A]" />
              <span>2. Store Locations &amp; Stock</span>
            </button>
          </div>
        </div>

        {activeTab === 'try_on' ? (
          /* Doorstep Try-On Booking Engine */
          <div className="bg-[#FFF6E9] rounded-3xl border border-[#1F2A44]/15 p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Info Column */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E8604F]">
                    Exclusive Valley Benefit
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#1F2A44] mt-1">
                    How Doorstep Try-On Works
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1F2A44]/75 mt-2 leading-relaxed">
                    Babies and toddlers can't wait patiently in crowded trial rooms. We bring up to 3 candidate sizes straight to your living room.
                  </p>
                </div>

                <div className="space-y-4 text-xs font-medium text-[#1F2A44]">
                  <div className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-[#1F2A44]/10">
                    <div className="w-7 h-7 rounded-full bg-[#1F2A44] text-[#FFF6E9] flex items-center justify-center font-bold shrink-0">
                      1
                    </div>
                    <div>
                      <strong className="block text-sm font-bold">Pick Up to 3 Sizes</strong>
                      <span className="text-[#1F2A44]/75">
                        Choose the attire or footwear you love and select 2 to 3 adjacent size brackets.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-[#1F2A44]/10">
                    <div className="w-7 h-7 rounded-full bg-[#F5B301] text-[#1F2A44] flex items-center justify-center font-bold shrink-0">
                      2
                    </div>
                    <div>
                      <strong className="block text-sm font-bold">Rider Waits 15 Minutes</strong>
                      <span className="text-[#1F2A44]/75">
                        Our trusted Sano rider brings all 3 sizes to your doorstep and waits while you try them on your baby.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-[#1F2A44]/10">
                    <div className="w-7 h-7 rounded-full bg-[#5DAA7A] text-white flex items-center justify-center font-bold shrink-0">
                      3
                    </div>
                    <div>
                      <strong className="block text-sm font-bold">Keep What Fits, Hand Back the Rest</strong>
                      <span className="text-[#1F2A44]/75">
                        Pay only for the single piece that fits best (Cash / Fonepay). The rider returns the others with zero hassle.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#1F2A44]/15 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#5DAA7A] shrink-0" />
                  <span className="text-xs font-semibold text-[#1F2A44]">
                    Available across Kathmandu, Lalitpur, and Bhaktapur within Ring Road + 5km.
                  </span>
                </div>
              </div>

              {/* Right Booking Form Column */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-[#1F2A44]/15 p-6 sm:p-8 shadow-sm">
                {isBooked ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-[#5DAA7A]/15 text-[#5DAA7A] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-heading text-2xl font-bold text-[#1F2A44]">
                        Doorstep Try-On Reserved!
                      </h4>
                      <p className="text-xs sm:text-sm text-[#1F2A44]/75 mt-1 max-w-md mx-auto">
                        We've received your request for <strong>{currentProd.name}</strong> in sizes ({selectedSizes.join(', ')}). Our team will dispatch the courier for your slot: <em>{timeSlot}</em>.
                      </p>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#5DAA7A] text-white font-bold text-xs hover:bg-[#5DAA7A]/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md text-center"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Send Booking to WhatsApp Concierge</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setIsBooked(false)}
                        className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#1F2A44]/20 text-[#1F2A44] font-bold text-xs hover:bg-black/5 cursor-pointer"
                      >
                        Book Another Try-On
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleBookTryOn} className="space-y-5">
                    <div className="border-b border-[#1F2A44]/10 pb-3">
                      <h4 className="font-heading text-lg font-bold text-[#1F2A44]">
                        Select Item &amp; Candidate Sizes
                      </h4>
                      <p className="text-xs text-[#1F2A44]/70">
                        Choose which ceremonial outfit or footwear you want to test:
                      </p>
                    </div>

                    {/* Product Selection */}
                    <div>
                      <label className="block text-xs font-bold text-[#1F2A44] uppercase tracking-wider mb-2">
                        Product:
                      </label>
                      <select
                        value={selectedProduct}
                        onChange={(e) => {
                          const newId = e.target.value;
                          setSelectedProduct(newId);
                          const p = TRY_ON_PRODUCTS.find((item) => item.id === newId);
                          if (p) setSelectedSizes([p.sizes[0], p.sizes[1]]);
                        }}
                        className="w-full rounded-xl border border-[#1F2A44]/20 bg-[#FFF6E9]/30 px-3.5 py-2.5 text-xs font-semibold text-[#1F2A44] focus:outline-none focus:border-[#F5B301]"
                      >
                        {TRY_ON_PRODUCTS.map((prod) => (
                          <option key={prod.id} value={prod.id}>
                            {prod.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Size Multi-Selector (Max 3) */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-bold text-[#1F2A44] uppercase tracking-wider">
                          Select 2 to 3 Sizes to Try:
                        </label>
                        <span className="text-[11px] font-bold text-[#E8604F]">
                          {selectedSizes.length} of 3 selected
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {currentProd.sizes.map((size) => {
                          const isSelected = selectedSizes.includes(size);
                          return (
                            <button
                              key={size}
                              type="button"
                              onClick={() => handleToggleSize(size)}
                              className={`p-2.5 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer text-left ${
                                isSelected
                                  ? 'border-[#1F2A44] bg-[#1F2A44] text-[#FFF6E9]'
                                  : 'border-[#1F2A44]/20 bg-white text-[#1F2A44] hover:border-[#F5B301]'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{size}</span>
                                {isSelected && <Check className="w-3.5 h-3.5 text-[#F5B301]" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Delivery & Contact Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-bold text-[#1F2A44] uppercase tracking-wider mb-1">
                          Child's Name:
                        </label>
                        <input
                          type="text"
                          required
                          value={childName}
                          onChange={(e) => setChildName(e.target.value)}
                          placeholder="e.g. Aarav"
                          className="w-full rounded-xl border border-[#1F2A44]/20 bg-[#FFF6E9]/30 px-3.5 py-2 text-xs font-semibold text-[#1F2A44] focus:outline-none focus:border-[#F5B301]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#1F2A44] uppercase tracking-wider mb-1">
                          Parent Contact Phone:
                        </label>
                        <input
                          type="text"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+977 98XXXXXXXX"
                          className="w-full rounded-xl border border-[#1F2A44]/20 bg-[#FFF6E9]/30 px-3.5 py-2 text-xs font-semibold text-[#1F2A44] focus:outline-none focus:border-[#F5B301]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1F2A44] uppercase tracking-wider mb-1">
                        Kathmandu Valley Delivery Address:
                      </label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. Jhamsikhel, Lalitpur (House number / landmark)"
                        className="w-full rounded-xl border border-[#1F2A44]/20 bg-[#FFF6E9]/30 px-3.5 py-2 text-xs font-semibold text-[#1F2A44] focus:outline-none focus:border-[#F5B301]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1F2A44] uppercase tracking-wider mb-1">
                        Preferred Try-On Time Slot:
                      </label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full rounded-xl border border-[#1F2A44]/20 bg-[#FFF6E9]/30 px-3.5 py-2 text-xs font-semibold text-[#1F2A44] focus:outline-none focus:border-[#F5B301]"
                      >
                        <option value="Morning (10:00 AM – 1:00 PM)">Morning (10:00 AM – 1:00 PM)</option>
                        <option value="Afternoon (2:00 PM – 5:00 PM)">Afternoon (2:00 PM – 5:00 PM)</option>
                        <option value="Evening (5:00 PM – 7:30 PM)">Evening (5:00 PM – 7:30 PM)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-full bg-[#1F2A44] text-[#FFF6E9] font-bold text-xs sm:text-sm hover:bg-[#1F2A44]/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <Truck className="w-4 h-4 text-[#F5B301]" />
                      <span>Confirm Doorstep Try-On Booking</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Store Locations Explorer */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Store List */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1F2A44]/70">
                Kathmandu Valley Boutiques:
              </span>

              {SANO_STORES.map((store) => {
                const isSelected = store.id === selectedStoreId;
                return (
                  <div
                    key={store.id}
                    onClick={() => setSelectedStoreId(store.id)}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#1F2A44] bg-[#FFF6E9] shadow-md'
                        : 'border-[#1F2A44]/15 bg-white hover:border-[#F5B301]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-heading font-bold text-base text-[#1F2A44]">
                        {store.name}
                      </span>
                      {isSelected && <ChevronRight className="w-4 h-4 text-[#E8604F]" />}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[#1F2A44]/80 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-[#E8604F] shrink-0" />
                      <span>{store.area}</span>
                    </div>

                    <div className="text-[11px] font-semibold text-[#5DAA7A] bg-[#5DAA7A]/15 px-2.5 py-1 rounded-full inline-block">
                      {store.stockStatus}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Store Detail Panel */}
            <div className="lg:col-span-7 bg-[#FFF6E9] rounded-3xl border border-[#1F2A44]/15 p-6 sm:p-8 space-y-6">
              <div className="border-b border-[#1F2A44]/10 pb-4">
                <span className="text-xs font-bold text-[#E8604F] uppercase tracking-wider">
                  Selected Store Details
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#1F2A44] mt-1">
                  {activeStore.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#1F2A44]/75 mt-1">
                  {activeStore.specialty}
                </p>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#1F2A44]">
                <div className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-[#1F2A44]/10">
                  <MapPin className="w-4 h-4 text-[#E8604F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-bold uppercase text-[#1F2A44]/70">Location:</strong>
                    <span>{activeStore.fullAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-[#1F2A44]/10">
                  <Clock className="w-4 h-4 text-[#F5B301] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-bold uppercase text-[#1F2A44]/70">Opening Hours:</strong>
                    <span>{activeStore.hours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-[#1F2A44]/10">
                  <Phone className="w-4 h-4 text-[#5DAA7A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-bold uppercase text-[#1F2A44]/70">Direct Store Line:</strong>
                    <a href={`tel:${activeStore.phone}`} className="font-bold hover:underline">
                      {activeStore.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Store Amenities */}
              <div>
                <span className="block text-xs font-bold text-[#1F2A44] uppercase tracking-wider mb-2">
                  Store Amenities &amp; Services:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeStore.features.map((feat, i) => (
                    <span
                      key={i}
                      className="text-xs font-bold bg-white px-3 py-1.5 rounded-full border border-[#1F2A44]/15 text-[#1F2A44]"
                    >
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={activeStore.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-5 rounded-full bg-[#1F2A44] text-[#FFF6E9] font-bold text-xs hover:bg-[#1F2A44]/90 flex items-center justify-center gap-2 cursor-pointer shadow-sm text-center"
                >
                  <MapPin className="w-4 h-4 text-[#F5B301]" />
                  <span>Get Google Maps Directions</span>
                </a>

                <a
                  href={`tel:${activeStore.phone}`}
                  className="py-3 px-5 rounded-full border border-[#1F2A44] text-[#1F2A44] font-bold text-xs hover:bg-black/5 flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <Phone className="w-4 h-4 text-[#5DAA7A]" />
                  <span>Call Store</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
