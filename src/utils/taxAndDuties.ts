import { CartItem, LandedCostBreakdown, Market, CurrencyCode } from '../types';
import { convertFromJPY, convertToJPY } from './currency';

export interface CalculateLandedCostParams {
  items: CartItem[];
  destinationMarket: Market;
  currency: CurrencyCode;
  incoterm?: 'DDP' | 'DAP';
  isB2B?: boolean;
  couponDiscountPercent?: number;
}

/**
 * Enterprise Landed Cost Calculation Engine
 * Calculates item subtotal, cross-border air shipping, consumption/sales tax/VAT,
 * international customs duty based on HS codes and de minimis thresholds, and insurance.
 */
export function calculateLandedCost({
  items,
  destinationMarket,
  currency,
  incoterm = 'DDP',
  isB2B = false,
  couponDiscountPercent = 0
}: CalculateLandedCostParams): LandedCostBreakdown {
  // 1. Items Subtotal in JPY
  const itemsSubtotalJPY = items.reduce((acc, item) => {
    return acc + item.variant.priceMinorUnits * item.quantity;
  }, 0);

  // 2. Discount in JPY
  const discountAmountJPY = couponDiscountPercent > 0 
    ? Math.round(itemsSubtotalJPY * (couponDiscountPercent / 100))
    : 0;

  const discountedItemsSubtotalJPY = itemsSubtotalJPY - discountAmountJPY;

  // 3. Shipping Calculation in JPY based on weight and destination
  const totalWeightGrams = items.reduce((acc, item) => {
    return acc + (item.product.specs.weightGrams || 1000) * item.quantity;
  }, 0);

  const selectedCarrier = destinationMarket.availableCarriers[0];
  const baseRateUSD = selectedCarrier?.baseRateUSD || 25;
  const baseRateJPY = convertToJPY(baseRateUSD, 'USD');
  const weightTierFactor = Math.max(1, totalWeightGrams / 1500);
  const shippingTotalJPY = destinationMarket.id === 'JP' 
    ? Math.min(1200, Math.round(baseRateJPY * 0.8))
    : Math.round(baseRateJPY * weightTierFactor);

  // 4. Customs Duty Calculation
  // Converted to USD to evaluate de minimis threshold
  const subtotalUSD = convertFromJPY(discountedItemsSubtotalJPY, 'USD');
  let customsDutyAmountJPY = 0;
  let customsProcessingFeeJPY = 0;

  if (destinationMarket.id !== 'JP') {
    // If value exceeds destination de minimis threshold, compute duty
    if (subtotalUSD > destinationMarket.customsDeMinimisUSD) {
      // Average HS Code duty rate for electronics (ranges from 0% to 5%)
      const dutyRate = destinationMarket.dutyRateAverage || 0.03;
      customsDutyAmountJPY = Math.round(discountedItemsSubtotalJPY * dutyRate);
      customsProcessingFeeJPY = convertToJPY(12, 'USD'); // $12 customs electronic filing fee
    }
  }

  // 5. Tax Calculation (JCT / VAT / Sales Tax)
  // Under DDP, import taxes are calculated on CIF (Cost, Insurance, Freight)
  let taxRate = destinationMarket.defaultTaxRate;
  if (isB2B && destinationMarket.id !== 'JP') {
    // B2B Reverse-Charge / Cross-border exemption with valid VAT ID
    taxRate = 0.0;
  }

  const taxableBaseJPY = discountedItemsSubtotalJPY + shippingTotalJPY + customsDutyAmountJPY;
  const taxAmountJPY = Math.round(taxableBaseJPY * taxRate);

  // 6. Transit Insurance Fee (0.5% of item value for guaranteed replacement)
  const insuranceFeeJPY = Math.round(discountedItemsSubtotalJPY * 0.005);

  // 7. Total Landed Cost in JPY
  const totalLandedCostJPY = incoterm === 'DDP'
    ? discountedItemsSubtotalJPY + shippingTotalJPY + taxAmountJPY + customsDutyAmountJPY + customsProcessingFeeJPY + insuranceFeeJPY
    : discountedItemsSubtotalJPY + shippingTotalJPY + insuranceFeeJPY; // Under DAP, buyer pays duty & tax on arrival

  return {
    itemsSubtotal: itemsSubtotalJPY,
    shippingTotal: shippingTotalJPY,
    taxAmount: taxAmountJPY,
    taxName: isB2B && taxRate === 0 ? 'B2B Reverse-Charge (0% Exempt)' : destinationMarket.taxName,
    taxRate: taxRate,
    customsDutyAmount: customsDutyAmountJPY,
    customsProcessingFee: customsProcessingFeeJPY,
    insuranceFee: insuranceFeeJPY,
    discountAmount: discountAmountJPY,
    totalLandedCost: totalLandedCostJPY,
    currency: 'JPY',
    incoterm: incoterm
  };
}
