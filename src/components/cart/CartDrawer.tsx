import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  AlertTriangle, 
  Gift, 
  Truck, 
  Lock,
  Tag,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/currency';
import { calculateLandedCost } from '../../utils/taxAndDuties';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    currentMarket,
    currency,
    locale,
    setIsCheckoutOpen,
    b2bMode,
    setIsCompatibilityStudioOpen
  } = useApp();

  const [couponCode, setCouponCode] = useState('');
  const [couponDiscountPercent, setCouponDiscountPercent] = useState(0);
  const [couponStatus, setCouponStatus] = useState<string | null>(null);

  if (!isCartOpen) return null;

  // Calculate landed cost breakdown
  const landedCost = calculateLandedCost({
    items: cart,
    destinationMarket: currentMarket,
    currency,
    incoterm: 'DDP',
    isB2B: b2bMode,
    couponDiscountPercent
  });

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'TOKYO10' || couponCode.trim().toUpperCase() === 'DENSHI2026' || couponCode.trim().toUpperCase() === 'AKIHABARA-10') {
      setCouponDiscountPercent(10);
      setCouponStatus('Coupon applied: 10% Tokyo Export Discount');
    } else {
      setCouponStatus('Invalid promotional code');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-zinc-950 border-l border-zinc-800 h-full shadow-2xl flex flex-col justify-between text-zinc-100 relative">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-850 flex items-center justify-between bg-black">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-black text-base text-white tracking-tight">Smart Cart ({cart.reduce((s, i) => s + i.quantity, 0)})</h2>
              <p className="text-[10px] font-mono text-zinc-400">Shipping to {currentMarket.name} ({currentMarket.voltageStandard})</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-zinc-500 hover:text-red-400 text-xs transition-colors p-1"
                title="Clear Cart"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-14 h-14 rounded-3xl bg-zinc-900 text-zinc-600 flex items-center justify-center mx-auto border border-zinc-800">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-white text-base">Your Cart is Empty</h3>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                Explore Japanese Kamado rice cookers, high-end Hi-Fi DACs, and Akihabara custom hardware.
              </p>
            </div>
          ) : (
            cart.map((item) => {
              const isJDM = item.product.specs.voltageNumber === 100;
              const itemTotal = item.variant.priceMinorUnits * item.quantity;

              return (
                <div
                  key={item.variant.id}
                  className="p-3.5 rounded-2xl bg-black border border-zinc-800 space-y-2.5"
                >
                  <div className="flex gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-16 h-16 rounded-xl object-cover bg-zinc-900 shrink-0 border border-zinc-800"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-zinc-500 font-mono">{item.product.brand}</div>
                      <h4 className="font-bold text-xs text-white line-clamp-1">{item.product.title}</h4>
                      <div className="text-xs font-mono font-bold text-[#00FF66] mt-1">
                        {formatPrice(item.variant.priceMinorUnits, currency, locale)}
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Delete Controls */}
                  <div className="flex items-center justify-between pt-1 border-t border-zinc-900 text-xs">
                    <div className="flex items-center gap-2 bg-zinc-900 px-2 py-1 rounded-xl border border-zinc-800">
                      <button
                        onClick={() => updateCartQuantity(item.variant.id, item.quantity - 1)}
                        className="w-5 h-5 flex items-center justify-center text-zinc-400 hover:text-white font-mono font-bold"
                      >
                        -
                      </button>
                      <span className="font-mono text-xs font-bold text-white px-1">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.variant.id, item.quantity + 1)}
                        className="w-5 h-5 flex items-center justify-center text-zinc-400 hover:text-white font-mono font-bold"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="font-mono font-black text-white text-xs">
                        {formatPrice(itemTotal, currency, locale)}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.variant.id)}
                        className="text-[10px] text-zinc-500 hover:text-red-400 underline font-mono"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer: DDP Breakdown & Neon Green Checkout Button */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-zinc-850 bg-black space-y-3">
            {/* Coupon input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Promo Code (e.g. TOKYO10)"
                className="flex-1 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-[#00FF66]"
              />
              <button
                onClick={handleApplyCoupon}
                className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-mono font-bold text-zinc-300 hover:text-white transition-colors"
              >
                Apply
              </button>
            </div>

            {couponStatus && (
              <div className="text-[11px] font-mono text-[#00FF66]">{couponStatus}</div>
            )}

            {/* Landed DDP Totals */}
            <div className="space-y-1 text-xs font-mono text-zinc-400 pt-1">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="text-zinc-200">{formatPrice(landedCost.itemsSubtotal, currency, locale)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tokyo Haneda Air Cargo:</span>
                <span className="text-[#00FF66] font-bold">¥3,500 (DDP EXPRESS)</span>
              </div>
              <div className="flex justify-between">
                <span>Pre-Paid Customs Duty & Tax:</span>
                <span className="text-zinc-200">{formatPrice(landedCost.customsDutyAmount + landedCost.taxAmount, currency, locale)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-850">
                <span>Total Landed (DDP):</span>
                <span className="text-[#00FF66] font-black text-base font-mono">
                  {formatPrice(landedCost.totalLandedCost, currency, locale)}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3 rounded-2xl bg-[#00FF66] hover:bg-[#00e65b] text-black font-black text-sm font-mono shadow-xl shadow-[#00FF66]/20 flex items-center justify-center gap-2 transition-all transform active:scale-98"
            >
              <Lock className="w-4 h-4" />
              <span>Proceed to DDP Checkout</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
