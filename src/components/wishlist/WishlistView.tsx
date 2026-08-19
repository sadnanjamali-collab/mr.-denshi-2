import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Heart, 
  Trash2, 
  ShoppingCart, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Share2, 
  Check, 
  AlertTriangle,
  Flame,
  ShoppingBag
} from 'lucide-react';
import { formatPrice } from '../../utils/currency';

export const WishlistView: React.FC = () => {
  const {
    wishlist,
    products,
    toggleWishlist,
    addToCart,
    clearWishlist,
    currency,
    locale,
    setSelectedProductForDetail,
    setActiveBuyerTab
  } = useApp();

  const [copiedLink, setCopiedLink] = React.useState(false);

  const savedProducts = products.filter(p => wishlist.includes(p.id));

  const handleShare = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddAllToCart = () => {
    savedProducts.forEach(product => {
      addToCart(product, product.variants[0], 1);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Header Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-red-600" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans">
              Your Saved Items & Wishlist
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs">
              {savedProducts.length} {savedProducts.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Tokyo JDM electronics saved with voltage compatibility logs and price tracking.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {savedProducts.length > 0 && (
            <>
              <button
                onClick={handleShare}
                className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs flex items-center gap-1.5 shadow-xs transition-colors"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link Copied!' : 'Share List'}</span>
              </button>

              <button
                onClick={handleAddAllToCart}
                className="px-4 py-2 rounded-lg bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 font-bold text-xs border border-[#fcd200] flex items-center gap-1.5 shadow-xs transition-all"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Move All to Cart</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Wishlist Content */}
      {savedProducts.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-lg p-12 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Heart className="w-8 h-8" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-lg font-bold text-slate-900">Your Wishlist is Empty</h3>
            <p className="text-xs text-slate-500">
              Explore authentic Japanese electronics, 100V kitchen appliances, and audiophile gear, then click the heart icon to save them here.
            </p>
          </div>
          <button
            onClick={() => setActiveBuyerTab('EXPLORE')}
            className="px-6 py-2.5 rounded-lg bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 font-bold text-xs border border-[#fcd200] shadow-sm inline-flex items-center gap-2"
          >
            <span>Explore Tokyo Electronics Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProducts.map((product) => {
            const variant = product.variants[0];
            const is100V = product.voltageSpecification.includes('100V AC Only');

            return (
              <div
                key={product.id}
                className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
              >
                <div>
                  {/* Image & Badges */}
                  <div className="relative aspect-4/3 bg-slate-50 rounded-md overflow-hidden mb-3 border border-slate-100 flex items-center justify-center p-2">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                      onClick={() => setSelectedProductForDetail(product)}
                    />
                    
                    {/* Voltage Flag */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono shadow-xs ${
                        is100V ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      }`}>
                        {is100V ? '⚡ 100V JDM Only' : '⚡ 100-240V Auto'}
                      </span>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-red-50 text-red-500 border border-slate-200 shadow-xs transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Brand & Title */}
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                    {product.brand}
                  </div>
                  <h3
                    onClick={() => setSelectedProductForDetail(product)}
                    className="text-sm font-bold text-slate-900 hover:text-[#c7511f] line-clamp-2 cursor-pointer mt-0.5 leading-snug"
                  >
                    {product.title}
                  </h3>

                  {/* Ratings */}
                  <div className="flex items-center gap-1.5 mt-1.5 text-xs">
                    <div className="flex text-[#de7921]">
                      {'★'.repeat(Math.round(product.rating))}
                      {'☆'.repeat(5 - Math.round(product.rating))}
                    </div>
                    <span className="text-slate-600 text-[11px]">({product.reviewCount})</span>
                  </div>

                  {/* Voltage note */}
                  {is100V && (
                    <div className="mt-2.5 p-2 rounded bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>Overseas use in US/EU requires 100V Step-Down Transformer.</span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-lg font-black text-slate-900 font-mono">
                      {formatPrice(variant.priceMinorUnits, currency, locale)}
                    </span>
                    <span className="text-xs text-slate-500 font-normal">DDP Customs Included</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => addToCart(product, variant, 1)}
                    className="flex-1 py-2 px-3 rounded-lg bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 font-bold text-xs border border-[#fcd200] shadow-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Move to Cart</span>
                  </button>

                  <button
                    onClick={() => setSelectedProductForDetail(product)}
                    className="py-2 px-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs shadow-xs"
                  >
                    View
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
