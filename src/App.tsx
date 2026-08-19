import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { BottomNav } from './components/common/BottomNav';
import { HeroBanner } from './components/home/HeroBanner';
import { FlashDeals } from './components/home/FlashDeals';
import { CategoryExplorer } from './components/home/CategoryExplorer';
import { CommunityTrends } from './components/home/CommunityTrends';
import { ProductListingPage } from './components/catalog/ProductListingPage';
import { ProductDetailPage } from './components/catalog/ProductDetailPage';
import { ProductComparisonModal } from './components/catalog/ProductComparisonModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { OrderTrackerModal } from './components/orders/OrderTrackerModal';
import { AIAssistantModal } from './components/ai/AIAssistantModal';
import { VisualSearchModal } from './components/ai/VisualSearchModal';
import { CompatibilityStudio } from './components/compatibility/CompatibilityStudio';
import { LiveCommerceModal } from './components/live/LiveCommerceModal';
import { LiveStageView } from './components/live/LiveStageView';
import { WishlistView } from './components/wishlist/WishlistView';
import { SellerPortal } from './components/seller/SellerPortal';
import { GlobalAdminDashboard } from './components/admin/GlobalAdminDashboard';
import { CustomerAccountModal } from './components/account/CustomerAccountModal';
import { UserProfileView } from './components/account/UserProfileView';
import { NotificationCenter } from './components/common/NotificationCenter';
import { LiveChatDrawer } from './components/chat/LiveChatDrawer';

export function AppContent() {
  const { activePortal, activeBuyerTab } = useApp();

  return (
    <div className="min-h-screen bg-[#eaeded] text-slate-900 flex flex-col font-sans selection:bg-[#febd69] selection:text-slate-900">
      {/* Amazon Header Bar & Sub-navigation */}
      <Header />

      {/* Main Content Router */}
      <main className="flex-1 pb-16 md:pb-0">
        {/* 1. SELLER CENTRAL PORTAL */}
        {activePortal === 'SELLER' && (
          <SellerPortal isModal={false} />
        )}

        {/* 2. GLOBAL ADMIN PORTAL */}
        {activePortal === 'ADMIN' && (
          <GlobalAdminDashboard isModal={false} />
        )}

        {/* 3. BUYER STOREFRONT PORTAL */}
        {activePortal === 'BUYER' && (
          <>
            {/* Buyer Sub-Tab: WISHLIST */}
            {activeBuyerTab === 'WISHLIST' && (
              <WishlistView />
            )}

            {/* Buyer Sub-Tab: LIVE STAGE BROADCAST */}
            {activeBuyerTab === 'LIVE' && (
              <LiveStageView />
            )}

            {/* Buyer Sub-Tab: PROFILE / VIP ACCOUNT */}
            {activeBuyerTab === 'PROFILE' && (
              <UserProfileView />
            )}

            {/* Buyer Sub-Tab: COMMUNITY TRENDS */}
            {activeBuyerTab === 'COMMUNITY' && (
              <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6">
                <CommunityTrends />
              </div>
            )}

            {/* Buyer Sub-Tab: EXPLORE / ALL DEPARTMENTS */}
            {activeBuyerTab === 'EXPLORE' && (
              <div className="py-2">
                <CategoryExplorer />
                <ProductListingPage />
              </div>
            )}

            {/* Buyer Sub-Tab: HOME (Default Amazon Storefront) */}
            {activeBuyerTab === 'HOME' && (
              <>
                <HeroBanner />
                <FlashDeals />
                <CategoryExplorer />
                <ProductListingPage />
                <div className="max-w-7xl mx-auto px-3 sm:px-6 py-8">
                  <CommunityTrends />
                </div>
              </>
            )}
          </>
        )}
      </main>

      {/* Shein & Amazon Mobile Bottom Navigation */}
      <BottomNav />

      {/* Amazon-style Tokyo Global Logistics Footer */}
      <Footer />

      {/* Global Modals & Utilities */}
      <ProductDetailPage />
      <ProductComparisonModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackerModal />
      <AIAssistantModal />
      <VisualSearchModal />
      <CompatibilityStudio />
      <LiveCommerceModal />
      <SellerPortal isModal={true} />
      <GlobalAdminDashboard isModal={true} />
      <CustomerAccountModal />
      <NotificationCenter />
      <LiveChatDrawer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
