import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from './ProductCard';
import { FilterSidebar } from './FilterSidebar';
import { 
  SlidersHorizontal, 
  ArrowUpDown, 
  Filter, 
  Sparkles, 
  AlertCircle, 
  Zap, 
  Check, 
  X, 
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { ProductCategory } from '../../types';

export const ProductListingPage: React.FC = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    voltageFilter, 
    setVoltageFilter,
    sidebarWattageFilter,
    sidebarCertificationsFilter,
    sidebarBrandFilter,
    sidebarPlugTypeFilter,
    sidebarMinPrice,
    sidebarMaxPrice,
    sidebarMinRating,
    sidebarInStockOnly,
    sidebarPrimeOnly,
    resetSidebarFilters
  } = useApp();

  const [sortBy, setSortBy] = useState<'POPULARITY' | 'PRICE_ASC' | 'PRICE_DESC' | 'RATING'>('POPULARITY');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter products across all Amazon facets
  const filtered = products.filter(product => {
    // 1. Department Category Filter
    if (selectedCategory !== 'ALL' && product.category !== selectedCategory) {
      return false;
    }

    // 2. Voltage Filter
    if (voltageFilter === '100V_JDM') {
      if (!product.isJapaneseDomesticModel && product.specs.voltageNumber !== 100) return false;
    } else if (voltageFilter === 'UNIVERSAL_100_240V') {
      if (product.specs.voltageNumber === 100 && product.isJapaneseDomesticModel) return false;
    }

    // 3. Wattage Filter
    if (sidebarWattageFilter.length > 0) {
      const w = product.specs.powerWattage;
      const matchesWattage = sidebarWattageFilter.some(filterId => {
        if (filterId === 'UNDER_100W') return w <= 100;
        if (filterId === '100W_500W') return w > 100 && w <= 500;
        if (filterId === '500W_1000W') return w > 500 && w <= 1000;
        if (filterId === 'OVER_1000W') return w > 1000;
        return false;
      });
      if (!matchesWattage) return false;
    }

    // 4. Certifications Filter
    if (sidebarCertificationsFilter.length > 0) {
      const certText = (product.safetyCertifications || []).join(' ') + ' ' + product.specs.safetyCompliance;
      const matchesCert = sidebarCertificationsFilter.some(cert => 
        certText.toLowerCase().includes(cert.toLowerCase())
      );
      if (!matchesCert) return false;
    }

    // 5. Brand Filter
    if (sidebarBrandFilter.length > 0) {
      const matchesBrand = sidebarBrandFilter.some(b => product.brand.toLowerCase().includes(b.toLowerCase()));
      if (!matchesBrand) return false;
    }

    // 6. Plug Type Filter
    if (sidebarPlugTypeFilter.length > 0) {
      const plugText = product.specs.plugType + ' ' + (product.tags || []).join(' ');
      const matchesPlug = sidebarPlugTypeFilter.some(p => plugText.toLowerCase().includes(p.toLowerCase()));
      if (!matchesPlug) return false;
    }

    // 7. Price Filter
    const price = product.variants[0].priceMinorUnits;
    if (sidebarMinPrice !== null && price < sidebarMinPrice) return false;
    if (sidebarMaxPrice !== null && price > sidebarMaxPrice) return false;

    // 8. Rating Filter
    if (sidebarMinRating !== null && product.rating < sidebarMinRating) return false;

    // 9. Fast / Prime Delivery
    if (sidebarPrimeOnly && !product.authenticityGuaranteed) return false;

    // 10. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = product.title.toLowerCase().includes(q);
      const matchJpTitle = product.japaneseTitle?.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      const matchModel = product.modelNumber.toLowerCase().includes(q);
      const matchTags = product.tags?.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchJpTitle && !matchBrand && !matchModel && !matchTags) {
        return false;
      }
    }

    return true;
  });

  // Sort products
  filtered.sort((a, b) => {
    if (sortBy === 'PRICE_ASC') return a.variants[0].priceMinorUnits - b.variants[0].priceMinorUnits;
    if (sortBy === 'PRICE_DESC') return b.variants[0].priceMinorUnits - a.variants[0].priceMinorUnits;
    if (sortBy === 'RATING') return b.rating - a.rating;
    return b.reviewCount - a.reviewCount; // Popularity default
  });

  return (
    <div id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Amazon Breadcrumbs & Result Count Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-1.5 font-medium">
          <span className="text-slate-900 font-bold">Electronics</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-700">
            {selectedCategory === 'ALL' ? 'All Japanese Hardware & JDM' : selectedCategory.replace(/_/g, ' ')}
          </span>
          <span className="text-slate-400 ml-2">
            (Showing <strong>{filtered.length}</strong> of <strong>{products.length}</strong> items)
          </span>
        </div>

        {/* Right Sort & Mobile Filter Trigger */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded border border-slate-300 font-bold text-xs flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          {/* Amazon Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 px-2.5 py-1 rounded">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-500 text-[11px]">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-slate-900 text-xs font-bold focus:outline-none cursor-pointer"
            >
              <option value="POPULARITY">Featured</option>
              <option value="PRICE_ASC">Price: Low to High</option>
              <option value="PRICE_DESC">Price: High to Low</option>
              <option value="RATING">Avg. Customer Review</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout (Left Filter Sidebar + Right Product Grid) */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Desktop Left Filter Sidebar */}
        <div className="hidden lg:block w-64 shrink-0 bg-white border border-slate-200 rounded-lg p-4 shadow-xs sticky top-24">
          <FilterSidebar />
        </div>

        {/* Mobile Filter Drawer */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-start lg:hidden">
            <div className="w-80 max-w-[85vw] bg-white h-full overflow-y-auto p-4 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                  <h3 className="font-bold text-sm text-slate-900">Filter Electronics</h3>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 rounded-full hover:bg-slate-100 text-slate-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterSidebar onCloseMobile={() => setIsMobileFilterOpen(false)} />
              </div>
              <div className="pt-4 border-t border-slate-200 mt-6">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-2.5 rounded-lg bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 font-bold text-xs border border-[#fcd200] shadow-xs"
                >
                  View {filtered.length} Results
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Right Product Grid */}
        <div className="flex-1 space-y-4 min-w-0">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-lg p-12 text-center space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1 max-w-sm mx-auto">
                <h3 className="text-base font-bold text-slate-900">No Electronics Found</h3>
                <p className="text-xs text-slate-500">
                  Try adjusting voltage filters, expanding wattage ranges, or clearing search keywords.
                </p>
              </div>
              <button
                onClick={resetSidebarFilters}
                className="px-4 py-2 rounded-lg bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 font-bold text-xs border border-[#fcd200] shadow-xs inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
