import React from 'react';
import { 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Plane, 
  Flame, 
  Clock, 
  ShoppingCart, 
  Radio, 
  CheckCircle2, 
  Layers,
  Heart,
  Truck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/currency';

export const HeroBanner: React.FC = () => {
  const { 
    currentMarket, 
    currency, 
    locale, 
    setIsCompatibilityStudioOpen, 
    setIsAIAssistantOpen,
    setIsLiveCommerceOpen,
    setSelectedProductForDetail,
    addToCart,
    products,
    setSelectedCategory,
    setActiveBuyerTab
  } = useApp();

  const featuredProduct = products[0]; // Zojirushi

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#232f3e] to-[#131921] text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Amazon-style Department Category Pill Strip */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { label: '⚡ Today\'s Deals', cat: 'ALL', icon: '🔥', highlight: true },
            { label: '🍚 100V JDM Kitchen', cat: 'JAPANESE_APPLIANCES', icon: '🇯🇵' },
            { label: '🎧 Hi-Res Audiophile Gear', cat: 'AUDIO_HIFI', icon: '🎵' },
            { label: '💻 Akihabara PC & GPUs', cat: 'COMPUTERS_COMPONENTS', icon: '⚡' },
            { label: '🔌 1500W Toroidal Transformers', cat: 'CABLES_POWER_ACCESSORIES', icon: '🛡️' },
            { label: '📸 Japanese Optics & Glass', cat: 'CAMERAS_OPTICS', icon: '📷' }
          ].map((bubble) => (
            <button
              key={bubble.label}
              onClick={() => setSelectedCategory(bubble.cat as any)}
              className={`px-3.5 py-1.5 rounded-full border text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                bubble.highlight
                  ? 'bg-[#ffd814] text-slate-900 border-[#fcd200] shadow-sm font-black'
                  : 'bg-[#131921]/80 hover:bg-[#232f3e] border-slate-700 text-slate-200 hover:text-[#ff9900]'
              }`}
            >
              <span>{bubble.icon}</span>
              <span>{bubble.label}</span>
            </button>
          ))}
        </div>

        {/* Main Hero Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: Value Prop & Actions */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131921] border border-slate-700 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[#ff9900] animate-ping"></span>
              <span className="text-[#ff9900] font-black">🇯🇵 TOKYO DIRECT AIR DISPATCH</span>
              <span className="text-slate-500">•</span>
              <span>DDP PRE-CLEARED TO {currentMarket.name.toUpperCase()}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight font-sans">
              Japanese Precision Electronics & 100V JDM Masters, Shipped Worldwide.
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
              Authentic Japanese 100V culinary appliances, artisanal Oita-crafted Hi-Res audio, and Akihabara creator workstations. Guaranteed DDP duty clearance with intelligent voltage transformer matching.
            </p>

            {/* 3 Amazon Value Trust Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-2.5 rounded-lg bg-[#131921] border border-slate-700 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#ff9900] shrink-0 border border-amber-500/20">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-white">100% Genuine JDM</div>
                  <div className="text-[10px] text-slate-400">METI PSE Certified</div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#131921] border border-slate-700 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#ff9900] shrink-0 border border-amber-500/20">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-white">Voltage AI Safety</div>
                  <div className="text-[10px] text-slate-400">100V Transformer Safe</div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#131921] border border-slate-700 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#ff9900] shrink-0 border border-amber-500/20">
                  <Truck className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-white">DDP Pre-Paid Duty</div>
                  <div className="text-[10px] text-slate-400">Haneda Air Express</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#catalog"
                className="px-5 py-2.5 rounded-full bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 font-bold text-xs border border-[#fcd200] shadow-sm flex items-center gap-1.5 transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Full Catalog</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </a>

              <button
                onClick={() => {
                  setActiveBuyerTab('LIVE');
                }}
                className="px-4 py-2.5 rounded-full bg-[#232f3e] hover:bg-[#131921] text-white font-bold text-xs border border-slate-600 flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Radio className="w-4 h-4 text-[#ff9900] animate-pulse" />
                <span>Akihabara Live Stage</span>
              </button>

              <button
                onClick={() => setIsAIAssistantOpen(true)}
                className="px-4 py-2.5 rounded-full bg-[#131921] hover:bg-[#232f3e] text-slate-200 hover:text-white font-medium text-xs border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>AI Voltage Concierge</span>
              </button>
            </div>
          </div>

          {/* Right Column: Amazon Deal of the Day Spotlight Card */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-900 rounded-xl p-4 shadow-2xl border border-slate-200 relative group overflow-hidden">
              {/* Deal Ribbon */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-[#cc0c39] text-white font-black text-[10px] uppercase font-mono">
                    Deal of the Day
                  </span>
                  <span className="text-[11px] font-bold text-[#cc0c39]">Limited Time Deal</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">Tokyo Haneda Stock</span>
              </div>

              {/* Product Visual */}
              <div className="relative aspect-16/10 bg-slate-50 rounded-lg overflow-hidden my-3 p-2 flex items-center justify-center cursor-pointer"
                   onClick={() => setSelectedProductForDetail(featuredProduct)}>
                <img
                  src={featuredProduct.images[0]}
                  alt={featuredProduct.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-bold font-mono text-[9px]">
                  ⚡ 100V JDM Flagship
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {featuredProduct.brand} • {featuredProduct.modelNumber}
                </div>
                <h3
                  onClick={() => setSelectedProductForDetail(featuredProduct)}
                  className="text-xs sm:text-sm font-bold text-slate-900 hover:text-[#c7511f] line-clamp-1 cursor-pointer leading-snug"
                >
                  {featuredProduct.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1.5 text-xs">
                  <div className="flex text-[#de7921]">
                    {'★'.repeat(5)}
                  </div>
                  <span className="text-[#007185] text-xs font-medium">({featuredProduct.reviewCount})</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-xl font-bold text-slate-900 font-sans">
                    {formatPrice(featuredProduct.variants[0].priceMinorUnits, currency, locale)}
                  </span>
                  <span className="text-xs text-slate-500 line-through">
                    {formatPrice(Math.round(featuredProduct.variants[0].priceMinorUnits * 1.15), currency, locale)}
                  </span>
                  <span className="text-xs font-bold text-[#cc0c39]">Save 15%</span>
                </div>
              </div>

              {/* 1-Click Buy / Add CTA */}
              <div className="pt-3 mt-2 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => addToCart(featuredProduct, featuredProduct.variants[0], 1)}
                  className="flex-1 py-2 px-3 rounded-full bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 font-bold text-xs border border-[#fcd200] shadow-xs flex items-center justify-center gap-1.5"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => setSelectedProductForDetail(featuredProduct)}
                  className="py-2 px-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs border border-slate-300"
                >
                  Inspect
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
