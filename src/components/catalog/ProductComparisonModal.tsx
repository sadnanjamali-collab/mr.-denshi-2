import React from 'react';
import { X, Trash2, Zap, Layers, ShieldCheck, ShoppingCart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/currency';

export const ProductComparisonModal: React.FC = () => {
  const {
    comparedProductIds,
    removeFromComparison,
    clearComparison,
    isComparisonModalOpen,
    setIsComparisonModalOpen,
    products,
    currency,
    locale,
    addToCart,
    currentMarket
  } = useApp();

  if (!isComparisonModalOpen || comparedProductIds.length === 0) return null;

  const comparedProducts = products.filter(p => comparedProductIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-slate-100 flex flex-col p-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">Hardware Specification Matrix</h2>
              <p className="text-xs text-slate-400">Side-by-side technical, voltage, and landed cost comparison.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearComparison}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
            <button
              onClick={() => setIsComparisonModalOpen(false)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="p-3 font-mono text-slate-400 bg-slate-950/40 w-48">Feature / Metric</th>
                {comparedProducts.map((p) => (
                  <th key={p.id} className="p-3 min-w-[220px] align-top">
                    <div className="relative group">
                      <button
                        onClick={() => removeFromComparison(p.id)}
                        className="absolute top-0 right-0 p-1 rounded-md bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white transition-colors"
                        title="Remove"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <img src={p.images[0]} alt={p.title} className="w-24 h-24 object-cover rounded-xl mb-2 bg-slate-950" />
                      <div className="font-mono text-[10px] text-slate-400">{p.brand}</div>
                      <div className="font-bold text-slate-100 text-sm line-clamp-2 mb-2">{p.title}</div>
                      <div className="text-base font-black text-white mb-2">
                        {formatPrice(p.variants[0].priceMinorUnits, currency, locale)}
                      </div>
                      <button
                        onClick={() => addToCart(p, p.variants[0], 1)}
                        className="w-full py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-1 shadow"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
              <tr>
                <td className="p-3 font-semibold text-slate-400 bg-slate-950/40">Rated Voltage</td>
                {comparedProducts.map(p => (
                  <td key={p.id} className="p-3">
                    <span className={`px-2 py-0.5 rounded font-bold ${p.specs.voltageNumber === 100 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}`}>
                      {p.specs.voltage}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-400 bg-slate-950/40">Power Consumption</td>
                {comparedProducts.map(p => (
                  <td key={p.id} className="p-3 font-bold text-slate-200">{p.specs.wattage} Watts</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-400 bg-slate-950/40">Frequency Compatibility</td>
                {comparedProducts.map(p => (
                  <td key={p.id} className="p-3 text-slate-300">{p.specs.frequency}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-400 bg-slate-950/40">Certification & Origin</td>
                {comparedProducts.map(p => (
                  <td key={p.id} className="p-3 text-slate-300">{p.specs.origin} • {p.specs.certifications.join(', ')}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-400 bg-slate-950/40">Dimensions & Weight</td>
                {comparedProducts.map(p => (
                  <td key={p.id} className="p-3 text-slate-300">{p.specs.weightGrams}g ({p.specs.dimensions})</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-400 bg-slate-950/40">Seller Rating</td>
                {comparedProducts.map(p => (
                  <td key={p.id} className="p-3 text-amber-400">★ {p.seller.rating.toFixed(1)} ({p.seller.name})</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
