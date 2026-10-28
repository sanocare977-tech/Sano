import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { AgeFilterBar } from './components/AgeFilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { HospitalBagModal } from './components/HospitalBagModal';
import { HospitalBagSection } from './components/HospitalBagSection';
import { VisitorGiftsSection } from './components/VisitorGiftsSection';
import { PasniCelebrationSection } from './components/PasniCelebrationSection';
import { HealthAndBlogSection } from './components/HealthAndBlogSection';
import { RecentOrdersModal } from './components/RecentOrdersModal';
import { DiaperPage } from './components/DiaperPage';
import { Footer } from './components/Footer';
import { OrderTrackingModal } from './components/OrderTrackingModal';

import { LoyaltyModal } from './components/LoyaltyModal';
import { LoyaltyProfile, INITIAL_LOYALTY_PROFILE } from './types/loyalty';
import { PRODUCTS } from './data/products';
import { DIAPER_PRODUCTS } from './data/diapers';
import { AgeStageId, CategoryId, CartItem, Product, SanoOrder } from './types';
import { SmartSizingEngine, ChildProfile } from './components/SmartSizingEngine';
import { QuickRestockSection } from './components/QuickRestockSection';
import { StoreFinderAndTryAtDoorstep } from './components/StoreFinderAndTryAtDoorstep';
import { CommunityExpertForum } from './components/CommunityExpertForum';
import BabyMascotWithAudio from './components/BabyMascotWithAudio';
import { ShoppingBag, ArrowRight, Sparkles, MapPin, Package, CheckCircle2, Truck } from 'lucide-react';

export default function App() {
  // Navigation view state
  const [currentView, setCurrentView] = useState<'home' | 'diapers'>('home');

  // Tracking state
  const [isTrackingOpen, setIsTrackingOpen] = useState<boolean>(false);
  const [trackingOrderId, setTrackingOrderId] = useState<string>('');

  // Loyalty Program state
  const [loyalty, setLoyalty] = useState<LoyaltyProfile>(() => {
    try {
      const saved = localStorage.getItem('sano_loyalty_profile');
      return saved ? JSON.parse(saved) : INITIAL_LOYALTY_PROFILE;
    } catch {
      return INITIAL_LOYALTY_PROFILE;
    }
  });
  const [isLoyaltyOpen, setIsLoyaltyOpen] = useState<boolean>(false);
  const [appliedDiscountNPR, setAppliedDiscountNPR] = useState<number>(0);
  const [lastEarnedPoints, setLastEarnedPoints] = useState<number>(0);

  // Filters state (for Home catalog)
  const [selectedStage, setSelectedStage] = useState<AgeStageId | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Smart Sizing Child Profile State
  const [activeChildProfile, setActiveChildProfile] = useState<ChildProfile | null>(null);
  const [isChildFilterActive, setIsChildFilterActive] = useState<boolean>(true);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sano_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [selectedProductDetails, setSelectedProductDetails] = useState<Product | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<SanoOrder | null>(null);
  const [isChecklistOpen, setIsChecklistOpen] = useState<boolean>(false);
  const [isRecentOrdersOpen, setIsRecentOrdersOpen] = useState<boolean>(false);

  // Sync cart to local storage
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    try {
      localStorage.setItem('sano_cart', JSON.stringify(items));
    } catch {
      // Ignore storage error
    }
  };

  // Filter products for Home catalog
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Determine effective age stage:
      // If user manually picked an age stage in filter bar, respect it.
      // Otherwise, if smart sizing auto-filter is on and child profile exists, filter by child's stage.
      const effectiveStage = selectedStage !== 'all'
        ? selectedStage
        : (isChildFilterActive && activeChildProfile ? activeChildProfile.stageId : 'all');

      if (effectiveStage !== 'all' && p.ageStage !== effectiveStage) {
        return false;
      }
      // Category match
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Search text match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchDesc = p.shortDescription.toLowerCase().includes(query);
        const matchMat = p.materials.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchMat) {
          return false;
        }
      }
      return true;
    });
  }, [selectedStage, selectedCategory, searchQuery, selectedStage, isChildFilterActive, activeChildProfile]);

  // Cart actions
  const handleAddToCart = (product: Product, variant: string, quantity: number = 1) => {
    const existingIndex = cartItems.findIndex(
      (i) => i.product.id === product.id && i.selectedVariant === variant
    );
    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      saveCart(updated);
    } else {
      saveCart([...cartItems, { product, selectedVariant: variant, quantity }]);
    }
  };

  const handleUpdateQuantity = (productId: string, variant: string, delta: number) => {
    const updated = cartItems
      .map((item) => {
        if (item.product.id === productId && item.selectedVariant === variant) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean) as CartItem[];
    saveCart(updated);
  };

  const handleRemoveItem = (productId: string, variant: string) => {
    const updated = cartItems.filter(
      (i) => !(i.product.id === productId && i.selectedVariant === variant)
    );
    saveCart(updated);
  };

  // Financial calculations
  const subtotalNPR = cartItems.reduce(
    (acc, i) => acc + i.product.priceNPR * i.quantity,
    0
  );
  // Free Kathmandu Valley delivery over Rs. 2,500
  const deliveryFeeNPR = subtotalNPR >= 2500 || subtotalNPR === 0 ? 0 : 100;
  const totalNPR = Math.max(0, subtotalNPR + deliveryFeeNPR - appliedDiscountNPR);
  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  const handleOrderSuccess = (order: SanoOrder, pointsEarned: number) => {
    saveCart([]);
    setIsCheckoutOpen(false);
    setConfirmedOrder(order);
    setLastEarnedPoints(pointsEarned);

    // Award loyalty points to user profile
    const netPoints = pointsEarned - appliedDiscountNPR;
    const newTotal = Math.max(0, loyalty.totalPoints + netPoints);
    const newTier = newTotal >= 500 ? 'Bloom' : newTotal >= 200 ? 'Sprout' : 'Seedling';

    const newHistory = [
      {
        id: `tx-${Date.now()}`,
        date: new Date().toISOString(),
        points: pointsEarned,
        reason: `Earned on Order #${order.orderId}`,
        orderId: order.orderId,
      },
      ...(appliedDiscountNPR > 0
        ? [
            {
              id: `tx-red-${Date.now()}`,
              date: new Date().toISOString(),
              points: -appliedDiscountNPR,
              reason: `Redeemed on Order #${order.orderId}`,
              orderId: order.orderId,
            },
          ]
        : []),
      ...loyalty.history,
    ];

    const updatedProfile: LoyaltyProfile = {
      ...loyalty,
      totalPoints: newTotal,
      tier: newTier,
      history: newHistory,
    };

    setLoyalty(updatedProfile);
    setAppliedDiscountNPR(0);
    try {
      localStorage.setItem('sano_loyalty_profile', JSON.stringify(updatedProfile));
    } catch {
      // Ignore storage error
    }
  };

  const handleRedeemPoints = (pointsToRedeem: number) => {
    setAppliedDiscountNPR(pointsToRedeem);
  };

  const scrollToSection = (id: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToDiapers = () => {
    setCurrentView('diapers');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTracking = (orderId?: string) => {
    setTrackingOrderId(orderId || '');
    setIsTrackingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FFF6E9] text-[#1F2A44] flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenRecentOrders={() => setIsRecentOrdersOpen(true)}
        onOpenOrderTracking={handleOpenTracking}
        onOpenChecklist={() => setIsChecklistOpen(true)}
        onNavigateToSection={scrollToSection}
        onNavigateToDiapers={navigateToDiapers}
        onNavigateToHome={navigateToHome}
        currentView={currentView}
        loyaltyPoints={loyalty.totalPoints}
        onOpenLoyalty={() => setIsLoyaltyOpen(true)}
      />

      {/* 1. SMART SIZING ENGINE & CHILD PROFILE BAR */}
      <SmartSizingEngine
        onProfileFilterChange={(profile, isAutoFilter) => {
          setActiveChildProfile(profile);
          setIsChildFilterActive(isAutoFilter);
        }}
        activeStage={selectedStage}
      />

      <main className="flex-1">
        {currentView === 'diapers' ? (
          /* Dedicated Diapers Page */
          <DiaperPage
            onBackToHome={navigateToHome}
            onAddToCart={handleAddToCart}
            onViewProductDetails={(p) => setSelectedProductDetails(p)}
            onOpenCart={() => setIsCartOpen(true)}
            cartCount={totalCartCount}
          />
        ) : (
          /* Main Homepage Flow */
          <>
            {/* Hero Section */}
            <HeroBanner
              onExploreClick={() => scrollToSection('products-catalog')}
              onOpenChecklist={() => setIsChecklistOpen(true)}
              onNavigateToDiapers={navigateToDiapers}
            />

            {/* DEDICATED DIAPER STATION FEATURED BANNER ON MAIN PAGE */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
              <div 
                onClick={navigateToDiapers}
                className="group relative overflow-hidden rounded-3xl bg-[#1F2A44] text-[#FFF6E9] p-6 sm:p-8 cursor-pointer border border-[#1F2A44] hover:border-[#F5B301] transition-all"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 space-y-3">
                    <div className="inline-flex items-center gap-2 text-xs font-bold text-[#F5B301] uppercase tracking-wider">
                      <Package className="w-4 h-4" />
                      <span>Dedicated Diaper Station · All Brands & Sizes</span>
                    </div>

                    <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                      MamyPoko, Pampers, Huggies, Eco Bamboo & Cloth Diapers
                    </h2>

                    <p className="text-xs sm:text-sm text-[#FFF6E9]/80 leading-relaxed max-w-xl">
                      Complete size stock from Newborn (&lt;5kg) to Youth Bedwetting Pants (up to 14 years / 45kg). Single trial packs and monthly jumbo savers with Kathmandu doorstep delivery.
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-bold text-[#FFF6E9]">
                      <span className="bg-white/10 px-3 py-1 rounded-full">Newborn (NB)</span>
                      <span className="bg-white/10 px-3 py-1 rounded-full">Small (S)</span>
                      <span className="bg-white/10 px-3 py-1 rounded-full">Medium (M)</span>
                      <span className="bg-white/10 px-3 py-1 rounded-full">Large (L)</span>
                      <span className="bg-white/10 px-3 py-1 rounded-full">XL &amp; XXL</span>
                      <span className="bg-white/10 px-3 py-1 rounded-full">Youth 8–14y</span>
                    </div>
                  </div>

                  <div className="md:col-span-4 flex md:justify-end">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToDiapers();
                      }}
                      className="px-6 py-3 text-xs sm:text-sm font-bold bg-[#F5B301] text-[#1F2A44] rounded-full hover:bg-[#F5B301]/90 flex items-center gap-2 cursor-pointer group-hover:scale-105 transition-transform"
                    >
                      <span>Explore Diaper Station</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. "QUICK RESTOCK" RECURRING SUBSCRIPTION ENGINE */}
            <QuickRestockSection
              onAddToCart={(p, v, q) => handleAddToCart(p, v, q)}
              onOpenCart={() => setIsCartOpen(true)}
            />

            {/* 3. VISITOR GIFTS SECTION (उपहार) - Prompt: what about visitor gift section? */}
            <VisitorGiftsSection
              onSelectProduct={(p) => setSelectedProductDetails(p)}
              onAddToCart={(p, v) => handleAddToCart(p, v, 1)}
            />

            {/* 2. HOSPITAL BAG 3-PHASE ESSENTIALS (Before Delivery, For Mother, For Newborn) */}
            <HospitalBagSection
              onAddToCart={(p, v) => handleAddToCart(p, v, 1)}
              onSelectProduct={(p) => setSelectedProductDetails(p)}
            />

            {/* 3. PASNI (RICE FEEDING) CEREMONY & WEANING HUB */}
            <PasniCelebrationSection
              onAddToCart={(p, v, q) => handleAddToCart(p, v, q)}
              onOpenCart={() => setIsCartOpen(true)}
            />

            {/* Primary Filter Bar: Age & Height First, Category Second */}
            <section id="age-stages">
              <AgeFilterBar
                selectedStage={selectedStage}
                onSelectStage={(stage) => setSelectedStage(stage)}
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => setSelectedCategory(cat)}
                searchQuery={searchQuery}
                onSearchChange={(q) => setSearchQuery(q)}
                totalFilteredCount={filteredProducts.length}
              />
            </section>

            {/* Product Catalog Grid */}
            <section id="products-catalog" className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Active Filter Headline */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-2xl sm:text-3xl font-bold text-[#1F2A44]">
                      {selectedStage !== 'all'
                        ? `Products for ${selectedStage.toUpperCase().replace('_', ' ')}`
                        : isChildFilterActive && activeChildProfile
                        ? `Filtered for ${activeChildProfile.name} (${activeChildProfile.heightCm} cm · ${activeChildProfile.heightLabel})`
                        : 'All Products (Pregnancy to 14 Years)'}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F5B301]" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#1F2A44]/70 mt-1">
                    {isChildFilterActive && activeChildProfile && selectedStage === 'all' ? (
                      <span className="text-[#5DAA7A] font-bold">
                        Smart Sizing active: Showing clothes &amp; essentials precisely fitted for {activeChildProfile.heightCm} cm.
                      </span>
                    ) : (
                      `Showing ${filteredProducts.length} verified item${filteredProducts.length === 1 ? '' : 's'} with height-indexed sizing`
                    )}
                  </p>
                </div>

                {(selectedStage !== 'all' || selectedCategory !== 'all' || searchQuery || (isChildFilterActive && activeChildProfile)) && (
                  <button
                    onClick={() => {
                      setSelectedStage('all');
                      setSelectedCategory('all');
                      setSearchQuery('');
                      setIsChildFilterActive(false);
                    }}
                    className="text-xs font-bold text-[#1F2A44] hover:text-[#E8604F] underline cursor-pointer self-start sm:self-auto"
                  >
                    Reset All Filters / Show All Ages
                  </button>
                )}
              </div>

              {/* Empty state per brand guidelines */}
              {filteredProducts.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-[#1F2A44]/15 space-y-4 max-w-md mx-auto my-8">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#FFF6E9] flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#F5B301]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-[#1F2A44]">
                      Nothing here yet.
                    </h3>
                    <p className="text-xs text-[#1F2A44]/70 mt-1">
                      Try another age or height, or check out our Diaper Station.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedStage('all');
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="px-5 py-2 text-xs font-bold bg-[#1F2A44] text-[#FFF6E9] rounded-full hover:bg-[#1F2A44]/90 cursor-pointer"
                  >
                    View All Essentials
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickAdd={(p, variant) => handleAddToCart(p, variant, 1)}
                      onViewDetails={(p) => setSelectedProductDetails(p)}
                    />
                  ))}
                </div>
              )}

              {/* Hospital Bag Quick Banner */}
              <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white border border-[#1F2A44]/15 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <span className="text-xs font-bold text-[#F5B301] uppercase tracking-wider">
                    Maternity &amp; Delivery Preparation
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-[#1F2A44]">
                    Preparing for your baby's arrival at Kathmandu hospitals?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1F2A44]/75 max-w-xl">
                    Check our curated 5-piece hospital bag checklist with kimono wraps, nipple balms, and bamboo wipes.
                  </p>
                </div>

                <button
                  onClick={() => setIsChecklistOpen(true)}
                  className="px-6 py-3 text-xs sm:text-sm font-bold bg-[#1F2A44] text-[#FFF6E9] rounded-full hover:bg-[#1F2A44]/90 flex items-center gap-2 cursor-pointer shrink-0 min-h-[44px]"
                >
                  <Sparkles className="w-4 h-4 text-[#F5B301]" />
                  <span>Open Hospital Bag Checklist</span>
                </button>
              </div>

              {/* Order Tracking Quick Search Section on Homepage */}
              <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-[#1F2A44] text-[#FFF6E9] flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1.5 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#F5B301] uppercase tracking-wider">
                    <Truck className="w-4 h-4" />
                    <span>Live Kathmandu Delivery Dispatch</span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold">
                    Already placed an order? Track its delivery live.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#FFF6E9]/75 max-w-lg">
                    Enter your Order ID (e.g. SANO-8821) to see live packing status, assigned rider contact, and verified GPS pin.
                  </p>
                </div>

                <div className="flex w-full md:w-auto items-center gap-2">
                  <button
                    onClick={() => handleOpenTracking('SANO-8821')}
                    className="w-full md:w-auto px-6 py-3 text-xs sm:text-sm font-bold bg-[#F5B301] text-[#1F2A44] rounded-full hover:bg-[#F5B301]/90 flex items-center justify-center gap-2 cursor-pointer shrink-0 min-h-[44px]"
                  >
                    <span>Track with Order ID</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </section>

            {/* 4. HEALTH & BLOG HUB: "Nurturing Healthy Moms & Smart Kids" */}
            <HealthAndBlogSection
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                scrollToSection('age-stages');
              }}
              onNavigateToSection={scrollToSection}
            />

            {/* 5. VERIFIED PEDIATRICIAN Q&A & COMMUNITY CARE FORUM */}
            <CommunityExpertForum />

            {/* 6. OMNICHANNEL "TRY AT DOORSTEP" & KATHMANDU STORES */}
            <StoreFinderAndTryAtDoorstep />
          </>
        )}
      </main>

      {/* Sticky Mobile Bottom Bar */}
      {totalCartCount > 0 && (
        <aside 
          aria-label="Order summary bar"
          className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#1F2A44]/15 p-3 sm:hidden"
        >
          <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
            <div 
              onClick={() => setIsCartOpen(true)}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-heading text-base font-bold tabular-nums">
                  Rs. {totalNPR.toLocaleString()}
                </span>
                <span className="text-[11px] text-[#1F2A44]/60 font-semibold">
                  ({totalCartCount} item{totalCartCount === 1 ? '' : 's'})
                </span>
              </div>
              <span className="text-[10px] text-[#5DAA7A] font-bold block">
                {deliveryFeeNPR === 0 ? 'FREE Valley Delivery' : '+ Rs. 100 Delivery'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsCheckoutOpen(true)}
              className="px-4 py-2.5 text-xs font-bold bg-[#1F2A44] text-[#FFF6E9] rounded-full hover:bg-[#1F2A44]/90 active:scale-95 flex items-center gap-2 cursor-pointer min-h-[44px]"
            >
              <MapPin className="w-3.5 h-3.5 text-[#F5B301]" />
              <span>Checkout via WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F5B301]" />
            </button>
          </div>
        </aside>
      )}

      {/* Footer */}
      <Footer
        onOpenChecklist={() => setIsChecklistOpen(true)}
        onOpenRecentOrders={() => setIsRecentOrdersOpen(true)}
        onNavigateToDiapers={navigateToDiapers}
        onOpenOrderTracking={handleOpenTracking}
      />

      {/* Modals */}
      <ProductModal
        product={selectedProductDetails}
        onClose={() => setSelectedProductDetails(null)}
        onAddToCart={(p, v, q) => handleAddToCart(p, v, q)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onOpenChecklist={() => setIsChecklistOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        subtotalNPR={subtotalNPR}
        deliveryFeeNPR={deliveryFeeNPR}
        totalNPR={totalNPR}
        onOrderSuccess={handleOrderSuccess}
        loyaltyPoints={loyalty.totalPoints}
        appliedDiscountNPR={appliedDiscountNPR}
        onOpenLoyalty={() => setIsLoyaltyOpen(true)}
      />

      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        pointsEarned={lastEarnedPoints}
        onOpenLoyalty={() => setIsLoyaltyOpen(true)}
        onTrackOrder={(id) => {
          setConfirmedOrder(null);
          handleOpenTracking(id);
        }}
      />

      <LoyaltyModal
        isOpen={isLoyaltyOpen}
        onClose={() => setIsLoyaltyOpen(false)}
        loyalty={loyalty}
        onRedeemPoints={handleRedeemPoints}
        appliedDiscountNPR={appliedDiscountNPR}
      />

      <HospitalBagModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
        onAddProduct={(p, v) => handleAddToCart(p, v, 1)}
      />

      <RecentOrdersModal
        isOpen={isRecentOrdersOpen}
        onClose={() => setIsRecentOrdersOpen(false)}
        onSelectOrder={(o) => {
          setIsRecentOrdersOpen(false);
          setConfirmedOrder(o);
        }}
        onTrackOrder={(id) => {
          setIsRecentOrdersOpen(false);
          handleOpenTracking(id);
        }}
      />

      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        initialOrderId={trackingOrderId}
      />

      {/* 3D Interactive Baby Mascot (Bottom-Right Floating Portal) */}
      <BabyMascotWithAudio
        onApplyCoupon={(discountPercent) => {
          const discount = Math.round(((subtotalNPR > 0 ? subtotalNPR : 1500) * discountPercent) / 100);
          setAppliedDiscountNPR(discount);
          setIsCartOpen(true);
        }}
      />

    </div>
  );
}
