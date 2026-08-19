import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  Zap, 
  Truck, 
  Check, 
  AlertTriangle, 
  ChevronRight, 
  Layers, 
  Heart, 
  Share2, 
  Info,
  Building2,
  Lock,
  Box,
  FileCheck,
  RotateCw,
  Video,
  MessageSquare,
  Sparkles,
  QrCode
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductVariant } from '../../types';
import { formatPrice } from '../../utils/currency';
import { evaluateProductCompatibility } from '../../utils/compatibility';
import { calculateLandedCost } from '../../utils/taxAndDuties';
import { Product3DViewer } from './Product3DViewer';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductForDetail: product,
    setSelectedProductForDetail,
    currentMarket,
    currency,
    locale,
    addToCart,
    wishlist,
    toggleWishlist,
    comparedProductIds,
    addToComparison,
    removeFromComparison,
    setIsCompatibilityStudioOpen,
    setIsCheckoutOpen,
    b2bMode,
    productVideos,
    setIsChatOpen
  } = useApp();

  if (!product) return null;

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [voltageWarningAcknowledged, setVoltageWarningAcknowledged] = useState(false);
  const [giftPackaging, setGiftPackaging] = useState(false);
  const [show3DViewer, setShow3DViewer] = useState(false);
  const [activeTab, setActiveTab] = useState<'SPECS' | '3D_VIEWER' | 'VIDEOS' | 'COMPATIBILITY' | 'SELLER'>('SPECS');

  const selectedVariant: ProductVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const isWishlisted = wishlist.includes(product.id);
  const isCompared = comparedProductIds.includes(product.id);
  const isJDM = product.isJapaneseDomesticModel || product.specs.voltageNumber === 100;

  // Matching product videos
  const relatedVideos = productVideos.filter(v => v.productId === product.id || v.category === product.category);

  // Compatibility evaluation
  const compatibility = evaluateProductCompatibility(product, currentMarket);

  // Landed cost calculation preview
  const singleCartItem = {
    product,
    variant: selectedVariant,
    quantity,
    addedAt: new Date().toISOString()
  };

  const landedCost = calculateLandedCost({
    items: [singleCartItem],
    destinationMarket: currentMarket,
    currency,
    incoterm: 'DDP',
    isB2B: b2bMode
  });

  const handleInstantBuy = () => {
    addToCart(product, selectedVariant, quantity, {
      giftPackaging,
      voltageWarningAcknowledged: isJDM ? voltageWarningAcknowledged : true
    });
    setSelectedProductForDetail(null);
    setIsCheckoutOpen(true);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity, {
      giftPackaging,
      voltageWarningAcknowledged: isJDM ? voltageWarningAcknowledged : true
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="bg-[#131921] border border-slate-700 rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative text-white flex flex-col">
        {/* Top Floating Close Button */}
        <button
          onClick={() => setSelectedProductForDetail(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Main Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Image Gallery or 3D Viewer */}
          <div className="lg:col-span-6 space-y-4">
            {show3DViewer ? (
              <div className="space-y-2">
                <Product3DViewer product={product} />
                <button
                  onClick={() => setShow3DViewer(false)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl border border-slate-700"
                >
                  ← Switch back to High-Res Photo Gallery
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Main Stage Image */}
                <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center group">
                  <img
                    src={product.images[selectedImageIndex] || product.images[0]}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {isJDM && (
                      <span className="px-2.5 py-1 rounded-lg bg-[#febd69] text-slate-950 font-black text-xs font-mono shadow">
                        ⚡ 100V Japanese Domestic Model
                      </span>
                    )}
                    {product.specs.pseCertified && (
                      <span className="px-2 py-0.5 rounded-lg bg-emerald-950 text-emerald-300 text-[11px] font-mono font-bold border border-emerald-700">
                        PSE 菱形 Certified (METI)
                      </span>
                    )}
                  </div>

                  {/* 3D Inspector CTA Button */}
                  <button
                    onClick={() => setShow3DViewer(true)}
                    className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-[#ffd814] hover:bg-[#f7ca00] text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg border border-[#fcd200] transition-transform active:scale-95"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Open 3D Inspector (360°)</span>
                  </button>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2.5 overflow-x-auto no-scrollbar">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden bg-slate-950 border-2 transition-all shrink-0 p-1 flex items-center justify-center ${
                        selectedImageIndex === idx ? 'border-[#ffd814] ring-2 ring-[#ffd814]/30' : 'border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions & Japanese Seller Chat */}
            <div className="flex items-center justify-between text-xs pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2 rounded-xl border transition-colors flex items-center gap-1.5 ${
                    isWishlisted
                      ? 'bg-rose-950 border-rose-700 text-rose-300'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-rose-500' : ''}`} />
                  <span>{isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}</span>
                </button>

                <button
                  onClick={() => isCompared ? removeFromComparison(product.id) : addToComparison(product.id)}
                  className={`p-2 rounded-xl border transition-colors flex items-center gap-1.5 ${
                    isCompared
                      ? 'bg-amber-950 border-amber-700 text-[#febd69]'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>{isCompared ? 'Comparing' : 'Compare'}</span>
                </button>
              </div>

              <button
                onClick={() => setIsChatOpen(true)}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-[#ffd814] text-xs font-bold border border-slate-700 flex items-center gap-1.5 shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat with Tokyo Seller</span>
              </button>
            </div>
          </div>

          {/* Right Column: Title, Voltage Warnings, Buy Box */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#febd69] font-mono tracking-wider uppercase">
                {product.brand} • {product.category.replace('_', ' ')}
              </div>

              <h1 className="text-lg sm:text-2xl font-bold text-white leading-snug">
                {product.title}
              </h1>

              {product.japaneseTitle && (
                <div className="text-xs text-slate-400 font-sans">
                  {product.japaneseTitle}
                </div>
              )}

              {/* Rating & Stock */}
              <div className="flex items-center gap-4 text-xs pt-1">
                <div className="flex items-center gap-1">
                  <div className="flex text-[#ff9900]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-700'}`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-white">{product.rating.toFixed(1)}</span>
                  <span className="text-slate-400">({product.reviewCount} verified global reviews)</span>
                </div>

                <div className="text-emerald-400 font-mono flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Tokyo Hub In Stock</span>
                </div>
              </div>

              {/* Variant Selector */}
              {product.variants.length > 1 && (
                <div className="py-2">
                  <div className="text-xs font-bold text-slate-300 mb-1.5">Select Variant:</div>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v, idx) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariantIndex(idx)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                          selectedVariantIndex === idx
                            ? 'bg-[#ffd814] border-[#ffd814] text-slate-950 font-bold shadow-md'
                            : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {v.name} ({formatPrice(v.priceMinorUnits, currency, locale)})
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Electrical Voltage Intelligence Card */}
              <div className="my-3 p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-[#ffd814]" />
                    <span>VOLTAGE INTELLIGENCE FOR {currentMarket.name.toUpperCase()}</span>
                  </span>
                  {compatibility.powerVerdict === 'SAFE_DIRECT_PLUG' ? (
                    <span className="text-emerald-400 font-bold">100% NATIVE COMPATIBLE</span>
                  ) : (
                    <span className="text-amber-400 font-bold">STEP-DOWN TRANSFORMER REQUIRED</span>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {compatibility.explanation}
                </p>

                {compatibility.recommendedHardware?.suggestedProductId && (
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Recommended Transformer:</span>
                    <button
                      onClick={() => setIsCompatibilityStudioOpen(true)}
                      className="text-[#febd69] hover:underline font-mono font-bold flex items-center gap-1"
                    >
                      <span>{compatibility.recommendedHardware.name}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {isJDM && currentMarket.id !== 'JP' && (
                  <div className="pt-2 border-t border-slate-800">
                    <label className="flex items-start gap-2 cursor-pointer text-[11px] text-slate-300">
                      <input
                        type="checkbox"
                        checked={voltageWarningAcknowledged}
                        onChange={(e) => setVoltageWarningAcknowledged(e.target.checked)}
                        className="mt-0.5 rounded border-slate-700 bg-slate-900 text-[#ffd814] focus:ring-[#ffd814]"
                      />
                      <span>
                        I understand this is an authentic 100V Japanese Domestic appliance and will use a suitable step-down transformer in {currentMarket.name}.
                      </span>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Landed Cost Breakdown & Buy Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="space-y-1 text-xs text-slate-400 border-b border-slate-800 pb-3 font-mono">
                <div className="flex justify-between">
                  <span>Item Subtotal ({quantity}x):</span>
                  <span className="text-slate-200">{formatPrice(selectedVariant.priceMinorUnits * quantity, currency, locale)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Haneda Air Cargo Express:</span>
                  <span className="text-slate-200">{formatPrice(landedCost.shippingTotal, currency, locale)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pre-Paid Customs & {landedCost.taxName}:</span>
                  <span className="text-emerald-400 font-bold">
                    {formatPrice(landedCost.taxAmount + landedCost.customsDutyAmount, currency, locale)} (Included)
                  </span>
                </div>
              </div>

              {/* Total Price & Quantity */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-slate-400">TOTAL LANDED DDP PRICE:</div>
                  <div className="text-2xl font-black text-white">
                    {formatPrice(landedCost.totalLandedCost, currency, locale)}
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-mono font-bold text-xs">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={handleAddToCart}
                  className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                >
                  <Box className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleInstantBuy}
                  className="py-3 px-4 rounded-xl bg-[#ffd814] hover:bg-[#f7ca00] text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg border border-[#fcd200] transition-all"
                >
                  <Lock className="w-4 h-4" />
                  <span>Instant Buy (DDP)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Technical Specifications & Product Videos */}
        <div className="p-6 sm:p-8 border-t border-slate-800 bg-slate-950/60 rounded-b-3xl">
          <div className="flex items-center gap-4 border-b border-slate-800 pb-3 mb-4 text-xs font-semibold overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('SPECS')}
              className={`pb-1 transition-colors whitespace-nowrap ${
                activeTab === 'SPECS' ? 'text-[#ffd814] border-b-2 border-[#ffd814] font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Hardware Specifications
            </button>
            <button
              onClick={() => setActiveTab('3D_VIEWER')}
              className={`pb-1 transition-colors whitespace-nowrap ${
                activeTab === '3D_VIEWER' ? 'text-[#ffd814] border-b-2 border-[#ffd814] font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              3D Interactive Inspector
            </button>
            <button
              onClick={() => setActiveTab('VIDEOS')}
              className={`pb-1 transition-colors whitespace-nowrap flex items-center gap-1 ${
                activeTab === 'VIDEOS' ? 'text-[#ffd814] border-b-2 border-[#ffd814] font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Product Videos ({relatedVideos.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('COMPATIBILITY')}
              className={`pb-1 transition-colors whitespace-nowrap ${
                activeTab === 'COMPATIBILITY' ? 'text-[#ffd814] border-b-2 border-[#ffd814] font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Electrical Standards
            </button>
            <button
              onClick={() => setActiveTab('SELLER')}
              className={`pb-1 transition-colors whitespace-nowrap ${
                activeTab === 'SELLER' ? 'text-[#ffd814] border-b-2 border-[#ffd814] font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Authentic Japanese Seller
            </button>
          </div>

          {activeTab === 'SPECS' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Rated Voltage:</span>
                <div className="text-white font-bold mt-0.5">{product.specs.voltage}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Power Consumption:</span>
                <div className="text-[#febd69] font-bold mt-0.5">{product.specs.wattage} Watts</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Frequency:</span>
                <div className="text-white font-bold mt-0.5">{product.specs.frequency}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Weight & Dimensions:</span>
                <div className="text-white font-bold mt-0.5">{product.specs.weightGrams}g ({product.specs.dimensions})</div>
              </div>
            </div>
          )}

          {activeTab === '3D_VIEWER' && (
            <div>
              <Product3DViewer product={product} />
            </div>
          )}

          {activeTab === 'VIDEOS' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedVideos.map((vid) => (
                <div key={vid.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-3 space-y-2">
                  <div className="relative rounded-xl overflow-hidden aspect-video bg-black flex items-center justify-center">
                    <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-[#ffd814] text-slate-950 flex items-center justify-center font-bold pl-0.5 shadow-lg">
                        ▶
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white font-mono text-[10px] rounded">
                      {vid.duration}
                    </span>
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-white line-clamp-1">{vid.title}</h5>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {vid.author} • {vid.views.toLocaleString()} views
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'COMPATIBILITY' && (
            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <h4 className="font-bold text-white mb-2">Technical Compatibility Notes:</h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-400">
                  {compatibility.detailedNotes?.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'SELLER' && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-bold text-white text-sm">{product.seller.name}</div>
                <div className="text-slate-400 font-mono">{product.seller.location}</div>
                <div className="text-slate-400">{product.seller.description}</div>
              </div>
              <div className="text-right font-mono">
                <div className="text-[#febd69] font-bold">★ {product.seller.rating.toFixed(1)} Rating</div>
                <div className="text-slate-400">{product.seller.totalSalesCount} Global Orders</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
