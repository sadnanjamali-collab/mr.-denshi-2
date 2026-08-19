import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  Zap, 
  ShoppingCart, 
  Layers, 
  Heart, 
  Check, 
  AlertTriangle, 
  Truck,
  Flame,
  ArrowRight
} from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/currency';
import { evaluateProductCompatibility } from '../../utils/compatibility';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    currentMarket,
    currency,
    locale,
    addToCart,
    wishlist,
    toggleWishlist,
    comparedProductIds,
    addToComparison,
    removeFromComparison,
    setSelectedProductForDetail,
    setIsCompatibilityStudioOpen
  } = useApp();

  const [addedAnim, setAddedAnim] = useState(false);
  const variant = product.variants[0];
  const isWishlisted = wishlist.includes(product.id);
  const isCompared = comparedProductIds.includes(product.id);

  // Compatibility evaluation
  const compatibility = evaluateProductCompatibility(product, currentMarket);
  const isJDM = product.isJapaneseDomesticModel || product.specs.voltageNumber === 100;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, variant, 1);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1500);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, variant, 1);
  };

  return (
    <div className="bg-white border border-slate-200 hover:border-slate-300 rounded-lg overflow-hidden flex flex-col justify-between transition-shadow duration-200 hover:shadow-lg group relative select-none">
      {/* Top Image Container */}
      <div className="relative aspect-4/3 bg-slate-50 overflow-hidden cursor-pointer flex items-center justify-center p-3 border-b border-slate-100">
        <img
          src={product.images[0]}
          alt={product.title}
          onClick={() => setSelectedProductForDetail(product)}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />

        {/* Amazon's Choice / Denshi's Choice Badge */}
        {product.rating >= 4.8 && (
          <div className="absolute top-2 left-0 bg-[#232f3e] text-white px-2 py-0.5 text-[10px] font-bold tracking-wide rounded-r shadow-xs">
            <span className="text-[#febd69]">Denshi's</span> Choice
          </div>
        )}

        {/* Top Right Wishlist & Compare Buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-1.5 rounded-full backdrop-blur border transition-all ${
              isWishlisted
                ? 'bg-white border-red-200 text-red-600 shadow-sm'
                : 'bg-white/80 border-slate-200 text-slate-400 hover:text-red-500 hover:bg-white'
            }`}
            title={isWishlisted ? "Saved in Wishlist" : "Save to Wishlist"}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-600' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (isCompared) removeFromComparison(product.id);
              else addToComparison(product.id);
            }}
            className={`p-1.5 rounded-full backdrop-blur border transition-all ${
              isCompared
                ? 'bg-[#232f3e] text-[#febd69] border-slate-700'
                : 'bg-white/80 border-slate-200 text-slate-400 hover:text-slate-900 hover:bg-white'
            }`}
            title="Compare Specifications"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Voltage Tag */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1">
          {isJDM ? (
            <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold font-mono text-[9px] border border-amber-300">
              ⚡ 100V JDM
            </span>
          ) : (
            <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold font-mono text-[9px] border border-emerald-300">
              ⚡ 100-240V Auto
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
        <div className="space-y-1">
          {/* Brand & PSE Certification */}
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="font-bold text-slate-700 uppercase">{product.brand}</span>
            {product.authenticityGuaranteed && (
              <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-0.5">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>PSE Clear</span>
              </span>
            )}
          </div>

          {/* Amazon Product Title */}
          <h3
            onClick={() => setSelectedProductForDetail(product)}
            className="text-xs sm:text-sm font-medium text-slate-900 hover:text-[#c7511f] cursor-pointer line-clamp-2 leading-snug transition-colors"
          >
            {product.title}
          </h3>

          {/* Amazon Customer Rating Stars */}
          <div className="flex items-center gap-1.5 text-xs">
            <div className="flex text-[#de7921]">
              {'★'.repeat(Math.round(product.rating))}
              {'☆'.repeat(5 - Math.round(product.rating))}
            </div>
            <span className="text-[#007185] hover:text-[#c7511f] cursor-pointer text-[11px] font-medium">
              {product.reviewCount}
            </span>
          </div>

          {/* Amazon Prime Delivery Badge */}
          <div className="flex items-center gap-1.5 pt-0.5">
            <span className="text-[#007185] font-black italic text-xs">prime</span>
            <span className="text-[11px] text-slate-600">FREE International Delivery</span>
          </div>

          {/* Price Block */}
          <div className="pt-1">
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-bold text-slate-900 font-sans">
                {formatPrice(variant.priceMinorUnits, currency, locale)}
              </span>
              <span className="text-[11px] text-slate-500 line-through">
                {formatPrice(Math.round(variant.priceMinorUnits * 1.15), currency, locale)}
              </span>
            </div>
            <div className="text-[10px] text-slate-500">
              DDP Prepaid: No extra customs fees on delivery
            </div>
          </div>
        </div>

        {/* Amazon Action CTA Buttons */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <button
            onClick={handleQuickAdd}
            className="w-full py-1.5 px-3 rounded-full bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f2ba00] text-slate-900 font-bold text-xs border border-[#fcd200] shadow-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            {addedAnim ? (
              <>
                <Check className="w-3.5 h-3.5 text-slate-900" />
                <span>Added to Cart</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5 text-slate-900" />
                <span>Add to Cart</span>
              </>
            )}
          </button>

          <button
            onClick={handleBuyNow}
            className="w-full py-1.5 px-3 rounded-full bg-[#ffa41c] hover:bg-[#fa8900] active:bg-[#e87c00] text-slate-900 font-bold text-xs border border-[#ff8f00] shadow-xs flex items-center justify-center gap-1 transition-colors"
          >
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
