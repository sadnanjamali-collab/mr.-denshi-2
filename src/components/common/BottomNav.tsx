import React from 'react';
import { 
  Home, 
  Grid, 
  Radio, 
  Heart, 
  User, 
  ShoppingCart, 
  Sparkles,
  Zap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BottomNav: React.FC = () => {
  const {
    activePortal,
    setActivePortal,
    activeBuyerTab,
    setActiveBuyerTab,
    wishlist,
    cartCount,
    setIsCartOpen
  } = useApp();

  // If in Admin or Seller portal, show a floating button back to Storefront
  if (activePortal !== 'BUYER') {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setActivePortal('BUYER')}
          className="px-4 py-2 rounded-full bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 font-bold text-xs shadow-xl flex items-center gap-2 border border-[#fcd200]"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Switch to Buyer Storefront</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#131921] border-t border-slate-700 text-slate-300 py-1.5 px-3 shadow-2xl flex items-center justify-around">
      {/* 1. Home Tab */}
      <button
        onClick={() => setActiveBuyerTab('HOME')}
        className={`flex flex-col items-center gap-0.5 p-1 rounded transition-colors ${
          activeBuyerTab === 'HOME' ? 'text-[#ff9900] font-bold' : 'hover:text-white'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px]">Home</span>
      </button>

      {/* 2. Explore / Category Tab */}
      <button
        onClick={() => setActiveBuyerTab('EXPLORE')}
        className={`flex flex-col items-center gap-0.5 p-1 rounded transition-colors ${
          activeBuyerTab === 'EXPLORE' ? 'text-[#ff9900] font-bold' : 'hover:text-white'
        }`}
      >
        <Grid className="w-5 h-5" />
        <span className="text-[10px]">Catalog</span>
      </button>

      {/* 3. Live Stage (Center Bubble) */}
      <button
        onClick={() => setActiveBuyerTab('LIVE')}
        className="flex flex-col items-center gap-0.5 -mt-3.5 p-1"
      >
        <div className="w-11 h-11 rounded-full bg-[#ffd814] text-slate-900 flex items-center justify-center shadow-lg border-2 border-[#131921]">
          <Radio className="w-5 h-5 animate-pulse text-slate-900" />
        </div>
        <span className="text-[9px] font-bold text-[#ff9900]">LIVE</span>
      </button>

      {/* 4. Saved Items / Wishlist Tab */}
      <button
        onClick={() => setActiveBuyerTab('WISHLIST')}
        className={`flex flex-col items-center gap-0.5 p-1 rounded transition-colors relative ${
          activeBuyerTab === 'WISHLIST' ? 'text-[#ff9900] font-bold' : 'hover:text-white'
        }`}
      >
        <div className="relative">
          <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
          {wishlist.length > 0 && (
            <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 rounded-full bg-[#cc0c39] text-white font-black text-[9px] flex items-center justify-center font-mono">
              {wishlist.length}
            </span>
          )}
        </div>
        <span className="text-[10px]">Wishlist</span>
      </button>

      {/* 5. User Account / Profile Tab */}
      <button
        onClick={() => setActiveBuyerTab('PROFILE')}
        className={`flex flex-col items-center gap-0.5 p-1 rounded transition-colors ${
          activeBuyerTab === 'PROFILE' ? 'text-[#ff9900] font-bold' : 'hover:text-white'
        }`}
      >
        <User className="w-5 h-5" />
        <span className="text-[10px]">Account</span>
      </button>
    </div>
  );
};
