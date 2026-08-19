import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Store, 
  FileText, 
  Smartphone, 
  Lock, 
  Check, 
  Truck, 
  AlertCircle, 
  Building2,
  Calendar,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { CURRENT_USER } from '../../data/mockUserData';
import { formatPrice } from '../../utils/currency';
import { calculateLandedCost } from '../../utils/taxAndDuties';
import { PaymentMethodInfo } from '../../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    currentMarket,
    currency,
    locale,
    b2bMode,
    createOrderFromCart,
    setIsOrderTrackerOpen
  } = useApp();

  if (!isCheckoutOpen || cart.length === 0) return null;

  const [selectedAddressId, setSelectedAddressId] = useState<string>(CURRENT_USER.savedAddresses[0].id);
  const [selectedCarrierIndex, setSelectedCarrierIndex] = useState<number>(0);
  const [selectedPaymentType, setSelectedPaymentType] = useState<PaymentMethodInfo['type']>('CREDIT_CARD');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 8842');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('789');
  const [b2bPONumber, setB2bPONumber] = useState('PO-DENSHI-2026-902');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState<string>('');

  const landedCost = calculateLandedCost({
    items: cart,
    destinationMarket: currentMarket,
    currency,
    incoterm: 'DDP',
    isB2B: b2bMode
  });

  const selectedAddress = CURRENT_USER.savedAddresses.find(a => a.id === selectedAddressId) || CURRENT_USER.savedAddresses[0];
  const selectedCarrier = currentMarket.availableCarriers[selectedCarrierIndex] || currentMarket.availableCarriers[0];

  const handleCompleteOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      let paymentLabel = 'Visa Platinum (Tokyo Cross-Border)';
      let paymentDetails = '**** 8842';

      if (selectedPaymentType === 'KONBINI_JAPAN') {
        paymentLabel = 'Japanese Convenience Store Voucher (7-Eleven / Lawson)';
        paymentDetails = 'Voucher #711-890-4412';
      } else if (selectedPaymentType === 'B2B_INVOICE_NET30') {
        paymentLabel = `B2B Corporate Net-30 Terms (${b2bPONumber})`;
        paymentDetails = 'Corporate Ledger Invoice Attached';
      } else if (selectedPaymentType === 'PAIDY_BNPL') {
        paymentLabel = 'Paidy Buy Now Pay Later (Japan 3x Split)';
        paymentDetails = '3 Installments of JPY 18,400';
      }

      const newOrder = createOrderFromCart(
        {
          type: selectedPaymentType,
          label: paymentLabel,
          details: paymentDetails
        },
        selectedAddress.id,
        b2bMode
      );

      setIsProcessing(false);
      setOrderComplete(true);
      setConfirmedOrderNumber(newOrder.orderNumber);

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback if canvas is not initialized
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative text-slate-100 flex flex-col p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-600/20 text-red-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">Global DDP Checkout</h2>
              <p className="text-xs text-slate-400 font-mono">
                Delivered Duty Paid to {currentMarket.name} • 100% Guaranteed Zero Surprise Fees
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderComplete ? (
          /* Order Confirmation View */
          <div className="text-center py-10 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
              <Check className="w-8 h-8" />
            </div>
            <div>
              <div className="text-xs font-mono text-emerald-400 font-bold mb-1">PAYMENT & DDP CLEARANCE CONFIRMED</div>
              <h3 className="text-2xl font-black text-white">Order {confirmedOrderNumber} Placed</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-2">
                Your authentic Japanese electronics are being packaged in anti-static materials at the Tokyo Haneda Bonded Logistics Center.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 max-w-md mx-auto text-xs font-mono text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Destination:</span>
                <span className="text-slate-200">{selectedAddress.city}, {selectedAddress.country}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Carrier:</span>
                <span className="text-slate-200">{selectedCarrier.name} Express</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Landed Amount:</span>
                <span className="text-white font-bold">{formatPrice(landedCost.totalLandedCost, currency, locale)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-4">
              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setIsOrderTrackerOpen(true);
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all"
              >
                <Truck className="w-4 h-4" />
                <span>Track Tokyo Air Cargo Flight</span>
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Steps Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Address, Carrier & Payment */}
            <div className="lg:col-span-7 space-y-6">
              {/* Shipping Address Selection */}
              <div>
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-slate-400" />
                  <span>1. Delivery Destination</span>
                </h3>
                <div className="space-y-2">
                  {CURRENT_USER.savedAddresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        selectedAddressId === addr.id
                          ? 'bg-slate-950 border-red-500/80 ring-1 ring-red-500/40 shadow'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-200 mb-1">
                        <span>{addr.recipientName} ({addr.companyName || 'Residential'})</span>
                        {addr.isDefault && <span className="text-[10px] text-amber-400 font-mono">DEFAULT</span>}
                      </div>
                      <div className="text-xs text-slate-400">
                        {addr.streetAddress1}, {addr.city}, {addr.prefectureOrState} {addr.postalCode}, {addr.country}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carrier Selection */}
              <div>
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-slate-400" />
                  <span>2. Select Air Cargo Logistics Carrier</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentMarket.availableCarriers.map((carrier, idx) => (
                    <div
                      key={carrier.id}
                      onClick={() => setSelectedCarrierIndex(idx)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                        selectedCarrierIndex === idx
                          ? 'bg-slate-950 border-red-500/80 ring-1 ring-red-500/40 shadow'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-slate-200 mb-1">
                        <span>{carrier.name}</span>
                        <span className="text-[10px] text-emerald-400 font-mono font-bold">DDP</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        Transit: {carrier.baseTransitDaysMin}-{carrier.baseTransitDaysMax} Business Days
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Multi-Currency Payment Method */}
              <div>
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-slate-400" />
                  <span>3. Multi-Currency Payment Method</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentType('CREDIT_CARD')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                      selectedPaymentType === 'CREDIT_CARD'
                        ? 'bg-slate-950 border-red-500 text-white font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPaymentType('KONBINI_JAPAN')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                      selectedPaymentType === 'KONBINI_JAPAN'
                        ? 'bg-slate-950 border-red-500 text-white font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    <span>コンビニ (Konbini)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPaymentType('PAIDY_BNPL')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                      selectedPaymentType === 'PAIDY_BNPL'
                        ? 'bg-slate-950 border-red-500 text-white font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Paidy 3x Split</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPaymentType('B2B_INVOICE_NET30')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                      selectedPaymentType === 'B2B_INVOICE_NET30'
                        ? 'bg-slate-950 border-red-500 text-white font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>B2B Net-30</span>
                  </button>
                </div>

                {/* Conditional Payment Details */}
                {selectedPaymentType === 'CREDIT_CARD' && (
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                    <div>
                      <label className="text-[10px] text-slate-400 font-mono block mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-slate-400 font-mono block mb-1">Expiry</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 font-mono block mb-1">CVC / CVV</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedPaymentType === 'KONBINI_JAPAN' && (
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                    <div className="font-bold text-slate-200">Japanese Convenience Store Payment:</div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      A payment barcode voucher will be generated for cash settlement at 7-Eleven, Lawson, FamilyMart, or Ministop terminals across Japan.
                    </p>
                  </div>
                )}

                {selectedPaymentType === 'B2B_INVOICE_NET30' && (
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                    <label className="text-[10px] text-slate-400 font-mono block">Corporate Purchase Order (PO) Number</label>
                    <input
                      type="text"
                      value={b2bPONumber}
                      onChange={(e) => setB2bPONumber(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono focus:outline-none"
                    />
                    <span className="text-[10px] text-emerald-400 font-mono block">
                      ✓ Credit Line Verified: JPY 15,000,000 available
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Order Summary & Instant Authorize */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-2">
                  Order Breakdown ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
                </h3>

                {/* Items preview */}
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.variant.id} className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 truncate max-w-[180px]">
                        {item.quantity}x {item.product.title}
                      </span>
                      <span className="text-slate-200 font-mono">
                        {formatPrice(item.variant.priceMinorUnits * item.quantity, currency, locale)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Financial Summary */}
                <div className="space-y-1.5 text-xs font-mono text-slate-400 border-t border-slate-800 pt-3">
                  <div className="flex justify-between">
                    <span>Items Subtotal:</span>
                    <span className="text-slate-200">{formatPrice(landedCost.itemsSubtotal, currency, locale)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Air Express Freight:</span>
                    <span className="text-slate-200">{formatPrice(landedCost.shippingTotal, currency, locale)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{landedCost.taxName}:</span>
                    <span className="text-slate-200">{formatPrice(landedCost.taxAmount, currency, locale)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pre-Paid Customs Duty:</span>
                    <span className="text-slate-200">{formatPrice(landedCost.customsDutyAmount, currency, locale)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                    <span>TOTAL LANDED (DDP):</span>
                    <span>{formatPrice(landedCost.totalLandedCost, currency, locale)}</span>
                  </div>
                </div>

                {/* DDP Guarantee Pill */}
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>DDP Protection: Zero additional customs charges on delivery.</span>
                </div>

                {/* Authorize Button */}
                <button
                  disabled={isProcessing}
                  onClick={handleCompleteOrder}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-red-600/30 transition-all disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isProcessing ? 'Authorizing DDP Payment...' : 'Authorize Order & Clear Customs'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
