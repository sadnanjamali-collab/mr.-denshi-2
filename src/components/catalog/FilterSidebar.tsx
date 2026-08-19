import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCategory } from '../../types';
import { 
  Zap, 
  ShieldCheck, 
  Tag, 
  SlidersHorizontal, 
  Star, 
  RotateCcw, 
  Check, 
  Flame, 
  Truck, 
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { formatPrice } from '../../utils/currency';

interface FilterSidebarProps {
  className?: string;
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ className = '', onCloseMobile }) => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    voltageFilter,
    setVoltageFilter,
    sidebarWattageFilter,
    setSidebarWattageFilter,
    sidebarCertificationsFilter,
    setSidebarCertificationsFilter,
    sidebarBrandFilter,
    setSidebarBrandFilter,
    sidebarPlugTypeFilter,
    setSidebarPlugTypeFilter,
    sidebarMinPrice,
    setSidebarMinPrice,
    sidebarMaxPrice,
    setSidebarMaxPrice,
    sidebarMinRating,
    setSidebarMinRating,
    sidebarInStockOnly,
    setSidebarInStockOnly,
    sidebarPrimeOnly,
    setSidebarPrimeOnly,
    resetSidebarFilters,
    currency,
    locale
  } = useApp();

  const [tempMinPrice, setTempMinPrice] = useState<string>(sidebarMinPrice !== null ? String(sidebarMinPrice) : '');
  const [tempMaxPrice, setTempMaxPrice] = useState<string>(sidebarMaxPrice !== null ? String(sidebarMaxPrice) : '');

  // Category Taxonomy definitions
  const categories: { id: ProductCategory | 'ALL'; label: string; count: number }[] = [
    { id: 'ALL', label: 'All Departments', count: products.length },
    { id: 'JAPANESE_APPLIANCES', label: '100V JDM Kitchen & Cooking', count: products.filter(p => p.category === 'JAPANESE_APPLIANCES').length },
    { id: 'AUDIO_HIFI', label: 'Audiophile & Hi-Res Audio', count: products.filter(p => p.category === 'AUDIO_HIFI').length },
    { id: 'COMPUTERS_COMPONENTS', label: 'Akihabara PC Hardware & GPUs', count: products.filter(p => p.category === 'COMPUTERS_COMPONENTS').length },
    { id: 'CABLES_POWER_ACCESSORIES', label: 'Step-Down Transformers & Power', count: products.filter(p => p.category === 'CABLES_POWER_ACCESSORIES').length },
    { id: 'CAMERAS_OPTICS', label: 'Japanese Cameras & Lenses', count: products.filter(p => p.category === 'CAMERAS_OPTICS').length },
    { id: 'IOT_SMART_HOME', label: 'Smart Home & Japanese IoT', count: products.filter(p => p.category === 'IOT_SMART_HOME').length }
  ];

  // Distinct Brands
  const availableBrands: string[] = Array.from(new Set<string>(products.map(p => p.brand.split(' ')[0]))).sort();

  // Wattage Ranges
  const wattageRanges = [
    { id: 'UNDER_100W', label: 'Under 100W (Mobile & DACs)', max: 100 },
    { id: '100W_500W', label: '100W - 500W (Monitors & Amps)', min: 100, max: 500 },
    { id: '500W_1000W', label: '500W - 1000W (PC Workstations)', min: 500, max: 1000 },
    { id: 'OVER_1000W', label: '1000W - 1500W+ (IH Rice Cookers)', min: 1000 }
  ];

  // Certifications
  const certifications = [
    { id: 'PSE Diamond', label: '菱形 PSE (High-Risk Certified)' },
    { id: 'PSE Circle', label: '丸形 PSE (General Certified)' },
    { id: 'METI', label: 'METI Japan Export Clear' },
    { id: 'CE', label: 'CE / Global Compliance' },
    { id: 'RoHS', label: 'RoHS Environmental Safe' }
  ];

  // Plug Types
  const plugTypes = [
    { id: 'Type A', label: 'Type A (Japanese 2-Pin)' },
    { id: 'Type B', label: 'Type B (3-Pin Grounded)' },
    { id: 'USB-PD', label: 'USB-C Power Delivery' },
    { id: '4.4mm', label: '4.4mm Pentaconn Balanced' }
  ];

  const handleToggleBrand = (brand: string) => {
    setSidebarBrandFilter(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleToggleWattage = (rangeId: string) => {
    setSidebarWattageFilter(prev => 
      prev.includes(rangeId) ? prev.filter(w => w !== rangeId) : [...prev, rangeId]
    );
  };

  const handleToggleCert = (cert: string) => {
    setSidebarCertificationsFilter(prev => 
      prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert]
    );
  };

  const handleTogglePlug = (plug: string) => {
    setSidebarPlugTypeFilter(prev => 
      prev.includes(plug) ? prev.filter(p => p !== plug) : [...prev, plug]
    );
  };

  const handleApplyPrice = (e: React.FormEvent) => {
    e.preventDefault();
    setSidebarMinPrice(tempMinPrice.trim() ? Number(tempMinPrice) : null);
    setSidebarMaxPrice(tempMaxPrice.trim() ? Number(tempMaxPrice) : null);
  };

  const activeFilterCount = (selectedCategory !== 'ALL' ? 1 : 0) +
    (voltageFilter !== 'ALL' ? 1 : 0) +
    sidebarWattageFilter.length +
    sidebarCertificationsFilter.length +
    sidebarBrandFilter.length +
    sidebarPlugTypeFilter.length +
    (sidebarMinPrice !== null || sidebarMaxPrice !== null ? 1 : 0) +
    (sidebarMinRating !== null ? 1 : 0) +
    (sidebarInStockOnly ? 1 : 0) +
    (sidebarPrimeOnly ? 1 : 0);

  return (
    <aside className={`w-full lg:w-64 shrink-0 text-slate-800 text-xs select-none space-y-6 ${className}`}>
      {/* Top Header & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-700" />
          <span className="font-bold text-sm text-slate-900">Filters</span>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-[#febd69] text-slate-900 font-bold text-[10px]">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={resetSidebarFilters}
            className="text-[11px] font-medium text-[#007185] hover:text-[#c7511f] hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear all</span>
          </button>
        )}
      </div>

      {/* 1. Prime / Denshi Air Delivery Filter */}
      <div className="space-y-2 pb-4 border-b border-slate-200">
        <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Fast Delivery</h4>
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={sidebarPrimeOnly}
            onChange={(e) => setSidebarPrimeOnly(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-[#ff9900] focus:ring-[#ff9900] cursor-pointer"
          />
          <span className="flex items-center gap-1 font-bold text-slate-800">
            <span className="text-[#007185] font-black italic">prime</span>
            <span className="text-slate-600 font-normal">/ Denshi Express</span>
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={sidebarInStockOnly}
            onChange={(e) => setSidebarInStockOnly(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-[#ff9900] focus:ring-[#ff9900] cursor-pointer"
          />
          <span className="text-slate-700 group-hover:text-slate-900">In Stock in Haneda Hub</span>
        </label>
      </div>

      {/* 2. Department Category Taxonomy */}
      <div className="space-y-2 pb-4 border-b border-slate-200">
        <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Department</h4>
        <ul className="space-y-1.5 text-xs">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <li key={cat.id}>
                <button
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left flex items-center justify-between py-1 px-1.5 rounded transition-colors ${
                    isSelected 
                      ? 'font-bold text-slate-900 bg-slate-100' 
                      : 'text-slate-600 hover:text-[#c7511f]'
                  }`}
                >
                  <span className="truncate">{cat.label}</span>
                  <span className="text-[10px] text-slate-400 font-mono">({cat.count})</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 3. Customer Reviews (Amazon Stars) */}
      <div className="space-y-2 pb-4 border-b border-slate-200">
        <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Customer Reviews</h4>
        <div className="space-y-1">
          {[4, 3].map((ratingVal) => (
            <button
              key={ratingVal}
              onClick={() => setSidebarMinRating(sidebarMinRating === ratingVal ? null : ratingVal)}
              className={`w-full flex items-center gap-2 py-1 px-1 rounded transition-colors text-left ${
                sidebarMinRating === ratingVal ? 'bg-amber-50 font-bold' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex text-[#de7921]">
                {'★'.repeat(ratingVal)}
                {'☆'.repeat(5 - ratingVal)}
              </div>
              <span className="text-slate-700 text-xs">& Up</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Voltage Standard Class */}
      <div className="space-y-2 pb-4 border-b border-slate-200">
        <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>Voltage Standard</span>
        </h4>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="voltage"
              checked={voltageFilter === 'ALL'}
              onChange={() => setVoltageFilter('ALL')}
              className="w-3.5 h-3.5 text-[#ff9900] focus:ring-[#ff9900]"
            />
            <span className="text-slate-700">All Voltage Classes</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="voltage"
              checked={voltageFilter === '100V_JDM'}
              onChange={() => setVoltageFilter('100V_JDM')}
              className="w-3.5 h-3.5 text-[#ff9900] focus:ring-[#ff9900]"
            />
            <span className="text-slate-700 flex items-center gap-1">
              <span>100V AC Pure JDM</span>
              <span className="text-[10px] px-1 bg-amber-100 text-amber-800 rounded font-mono font-bold">100V</span>
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="voltage"
              checked={voltageFilter === 'UNIVERSAL_100_240V'}
              onChange={() => setVoltageFilter('UNIVERSAL_100_240V')}
              className="w-3.5 h-3.5 text-[#ff9900] focus:ring-[#ff9900]"
            />
            <span className="text-slate-700 flex items-center gap-1">
              <span>100-240V Universal</span>
              <span className="text-[10px] px-1 bg-emerald-100 text-emerald-800 rounded font-mono font-bold">Auto</span>
            </span>
          </label>
        </div>
      </div>

      {/* 5. Brand Directory */}
      <div className="space-y-2 pb-4 border-b border-slate-200">
        <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Brand</h4>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          {availableBrands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer py-0.5">
              <input
                type="checkbox"
                checked={sidebarBrandFilter.includes(brand)}
                onChange={() => handleToggleBrand(brand)}
                className="w-3.5 h-3.5 rounded border-slate-300 text-[#ff9900] focus:ring-[#ff9900]"
              />
              <span className="text-slate-700 hover:text-slate-900">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 6. Power / Wattage Range */}
      <div className="space-y-2 pb-4 border-b border-slate-200">
        <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Power Wattage</h4>
        <div className="space-y-1">
          {wattageRanges.map((w) => (
            <label key={w.id} className="flex items-center gap-2 cursor-pointer py-0.5">
              <input
                type="checkbox"
                checked={sidebarWattageFilter.includes(w.id)}
                onChange={() => handleToggleWattage(w.id)}
                className="w-3.5 h-3.5 rounded border-slate-300 text-[#ff9900] focus:ring-[#ff9900]"
              />
              <span className="text-slate-700 hover:text-slate-900 text-[11px]">{w.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 7. Japanese Safety Certifications */}
      <div className="space-y-2 pb-4 border-b border-slate-200">
        <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Safety & Compliance</span>
        </h4>
        <div className="space-y-1">
          {certifications.map((cert) => (
            <label key={cert.id} className="flex items-center gap-2 cursor-pointer py-0.5">
              <input
                type="checkbox"
                checked={sidebarCertificationsFilter.includes(cert.id)}
                onChange={() => handleToggleCert(cert.id)}
                className="w-3.5 h-3.5 rounded border-slate-300 text-[#ff9900] focus:ring-[#ff9900]"
              />
              <span className="text-slate-700 hover:text-slate-900 text-[11px]">{cert.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 8. Connectors & Plug Types */}
      <div className="space-y-2 pb-4 border-b border-slate-200">
        <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Connector / Plug</h4>
        <div className="space-y-1">
          {plugTypes.map((plug) => (
            <label key={plug.id} className="flex items-center gap-2 cursor-pointer py-0.5">
              <input
                type="checkbox"
                checked={sidebarPlugTypeFilter.includes(plug.id)}
                onChange={() => handleTogglePlug(plug.id)}
                className="w-3.5 h-3.5 rounded border-slate-300 text-[#ff9900] focus:ring-[#ff9900]"
              />
              <span className="text-slate-700 hover:text-slate-900 text-[11px]">{plug.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 9. Price Filter Form (Amazon style) */}
      <div className="space-y-2">
        <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Price ({currency})</h4>
        <form onSubmit={handleApplyPrice} className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-2 top-1.5 text-slate-400 text-[11px] font-mono">
              {currency === 'JPY' ? '¥' : '$'}
            </span>
            <input
              type="number"
              value={tempMinPrice}
              onChange={(e) => setTempMinPrice(e.target.value)}
              placeholder="Min"
              className="w-full pl-5 pr-1.5 py-1 rounded border border-slate-300 bg-white text-xs font-mono focus:border-[#e77600] focus:outline-none"
            />
          </div>
          <span className="text-slate-400">-</span>
          <div className="relative flex-1">
            <span className="absolute left-2 top-1.5 text-slate-400 text-[11px] font-mono">
              {currency === 'JPY' ? '¥' : '$'}
            </span>
            <input
              type="number"
              value={tempMaxPrice}
              onChange={(e) => setTempMaxPrice(e.target.value)}
              placeholder="Max"
              className="w-full pl-5 pr-1.5 py-1 rounded border border-slate-300 bg-white text-xs font-mono focus:border-[#e77600] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-2.5 py-1 bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 border border-[#fcd200] rounded font-bold text-xs shadow-xs"
          >
            Go
          </button>
        </form>
      </div>
    </aside>
  );
};
