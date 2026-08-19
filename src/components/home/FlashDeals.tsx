import React, { useState, useEffect } from 'react';
import { Flame, Clock, Zap, ShieldAlert, ShoppingBag, ArrowRight, ShoppingCart, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/currency';
import { Product } from '../../types';

export const FlashDeals: React.FC = () => {
  const { products, currency, locale, addToCart, setSelectedProductForDetail } = useApp();

  // Filter flash deal products
  const flashProducts = products.filter(p => p.featuredInFlashDeal);
  const [addedIds, setAddedIds] = useState<string[]>([]);

  // Live Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 24, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClaim = (product: Product) => {
    addToCart(product, product.variants[0], 1);
    setAddedIds(prev => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds(prev => prev.filter(id => id !== product.id));
    }, 2000);
  };

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-4">
      {/* Header with Lightning icon & Countdown Timer */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#232f3e] flex items-center justify-center text-[#ff9900]">
            <Zap className="w-5 h-5 fill-[#ff9900] text-[#ff9900]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-sans">
                Today's Lightning Deals
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#cc0c39] text-white font-bold uppercase">
                Up to 25% Off
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Limited-time Akihabara bonded inventory with DDP pre-cleared air express delivery.
            </p>
          </div>
        </div>

        {/* Amazon Countdown Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-700">
          <Clock className="w-4 h-4 text-[#cc0c39]" />
          <span className="text-slate-500 font-medium">Ends in:</span>
          <span className="font-mono font-bold text-slate-900">
            {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {flashProducts.map((product) => {
          const mainVariant = product.variants[0];
          const originalPrice = mainVariant.originalPriceMinorUnits || Math.round(mainVariant.priceMinorUnits * 1.18);
          const percentOff = product.dealDiscountPercent || Math.round(((originalPrice - mainVariant.priceMinorUnits) / originalPrice) * 100);
          const totalStock = mainVariant.stockOnHand + mainVariant.stockReserved;
          const claimedPercent = Math.round((mainVariant.stockReserved / totalStock) * 100) || 72;
          const isAdded = addedIds.includes(product.id);

          return (
            <div
              key={product.id}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-lg p-4 flex flex-col justify-between transition-shadow hover:shadow-md group relative"
            >
              <div>
                {/* Top Badge: Discount & Voltage */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-[#cc0c39] text-white font-bold text-xs">
                    {percentOff}% off
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {product.specs.voltageNumber === 100 ? '⚡ 100V JDM' : '⚡ Universal'}
                  </span>
                </div>

                {/* Product Image */}
                <div
                  onClick={() => setSelectedProductForDetail(product)}
                  className="relative aspect-16/10 bg-slate-50 rounded overflow-hidden cursor-pointer mb-3 p-2 flex items-center justify-center border border-slate-100"
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Title & Brand */}
                <div className="space-y-1 mb-2">
                  <div className="text-[11px] text-slate-500 uppercase font-medium">{product.brand}</div>
                  <h3
                    onClick={() => setSelectedProductForDetail(product)}
                    className="font-medium text-xs sm:text-sm text-slate-900 line-clamp-2 cursor-pointer hover:text-[#c7511f] transition-colors leading-snug"
                  >
                    {product.title}
                  </h3>
                </div>
              </div>

              {/* Price & Claim Progress */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-slate-900 font-sans">
                    {formatPrice(mainVariant.priceMinorUnits, currency, locale)}
                  </span>
                  <span className="text-xs text-slate-500 line-through">
                    {formatPrice(originalPrice, currency, locale)}
                  </span>
                </div>

                {/* Claimed Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-600">
                    <span>{claimedPercent}% claimed</span>
                    <span className="text-[#c7511f] font-medium">{mainVariant.stockOnHand} left in Tokyo</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div
                      className="h-full bg-[#de7921] rounded-full transition-all duration-500"
                      style={{ width: `${claimedPercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleClaim(product)}
                  className="w-full py-1.5 rounded-full bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f2ba00] text-slate-900 font-bold text-xs border border-[#fcd200] shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-slate-900" />
                      <span>Deal Claimed</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Claim Lightning Deal</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
