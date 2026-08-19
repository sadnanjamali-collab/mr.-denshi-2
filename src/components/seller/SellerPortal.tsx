import React, { useState } from 'react';
import { 
  X, 
  Store, 
  Package, 
  DollarSign, 
  TrendingUp, 
  AlertCircle, 
  Upload, 
  CheckCircle2, 
  FileText,
  Plus,
  RefreshCw,
  Zap,
  Truck,
  Layers,
  ArrowUpRight,
  Video,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OFFICIAL_SELLERS } from '../../data/sellers';
import { formatPrice } from '../../utils/currency';
import { Product, ProductCategory } from '../../types';

interface SellerPortalProps {
  isModal?: boolean;
}

export const SellerPortal: React.FC<SellerPortalProps> = ({ isModal = true }) => {
  const {
    isSellerPortalOpen,
    setIsSellerPortalOpen,
    setActivePortal,
    products,
    addNewProduct,
    productVideos,
    addProductVideo,
    currency,
    locale
  } = useApp();

  const [activeTab, setActiveTab] = useState<'INVENTORY' | 'ADD_PRODUCT' | 'UPLOAD_VIDEO' | 'BULK_IMPORT' | 'FINANCES'>('INVENTORY');
  const [csvUploadSuccess, setCsvUploadSuccess] = useState(false);

  // New Product State
  const [newTitle, setNewTitle] = useState('');
  const [newJapaneseTitle, setNewJapaneseTitle] = useState('');
  const [newBrand, setNewBrand] = useState('SONY');
  const [newCategory, setNewCategory] = useState<ProductCategory>('HI_FI_AUDIO');
  const [newPriceJPY, setNewPriceJPY] = useState(38000);
  const [newVoltage, setNewVoltage] = useState(100);
  const [newWattage, setNewWattage] = useState(65);
  const [newStock, setNewStock] = useState(25);
  const [newImageUrl, setNewImageUrl] = useState('https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80');
  const [productAddedSuccess, setProductAddedSuccess] = useState(false);

  // New Video State
  const [videoTitle, setVideoTitle] = useState('');
  const [videoAuthor, setVideoAuthor] = useState('Tokyo Lab Specialist');
  const [videoCategory, setVideoCategory] = useState<ProductCategory>('HI_FI_AUDIO');
  const [videoDuration, setVideoDuration] = useState('04:15');
  const [videoThumb, setVideoThumb] = useState('https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80');
  const [videoAddedSuccess, setVideoAddedSuccess] = useState(false);

  if (isModal && !isSellerPortalOpen) return null;

  const currentSeller = Object.values(OFFICIAL_SELLERS)[0]; // Akihabara Direct Tech
  const sellerProducts = products.filter(p => p.seller.id === currentSeller.id);

  const handleSimulatedCsvUpload = () => {
    setCsvUploadSuccess(true);
    setTimeout(() => setCsvUploadSuccess(false), 4000);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newVariantId = `var-custom-${Date.now()}`;
    const newProd: Product = {
      id: `custom-jp-${Date.now()}`,
      slug: `custom-jp-${Date.now()}`,
      title: newTitle,
      japaneseTitle: newJapaneseTitle || newTitle,
      brand: newBrand,
      modelNumber: `JP-${Math.floor(1000 + Math.random() * 9000)}`,
      category: newCategory,
      description: `Authentic Japanese craftsmanship imported directly from Akihabara, Tokyo. Strict METI PSE certified with verified export quality standard.`,
      highlightBullets: [
        'Direct Akihabara bonded warehouse stock',
        'Official METI PSE safety compliance verified',
        'Express air cargo fulfillment with pre-cleared customs'
      ],
      images: [newImageUrl],
      rating: 4.9,
      reviewCount: 1,
      seller: currentSeller,
      shipsFrom: 'Tokyo Haneda Air Cargo Bonded Logistics Park, Japan',
      isJapaneseDomesticModel: newVoltage === 100,
      transformerRequiredForUS: newVoltage === 100,
      transformerRequiredForEU: newVoltage === 100,
      recommendedTransformerWattage: newVoltage === 100 ? Number(newWattage) * 1.5 : undefined,
      hsCode: '8516.60.0000',
      authenticityGuaranteed: true,
      tags: ['Akihabara', 'JDM', 'PSE Certified', 'Direct Import'],
      selectedVariantId: newVariantId,
      variants: [
        {
          id: newVariantId,
          sku: `SKU-JP-${Date.now()}`,
          name: 'Standard Tokyo Edition',
          condition: 'BRAND_NEW_SEALED',
          priceMinorUnits: Number(newPriceJPY),
          stockOnHand: Number(newStock),
          stockReserved: 0,
          image: newImageUrl
        }
      ],
      detailedSpecs: [
        {
          key: 'operating_voltage',
          label: 'Operating Voltage',
          value: newVoltage === 100 ? '100V AC Only (Japan Domestic Standard)' : '100V-240V Universal AC',
          category: 'POWER',
          isCrucialForCompatibility: true
        },
        {
          key: 'rated_power',
          label: 'Rated Power Consumption',
          value: `${newWattage} Watts`,
          unit: 'W',
          category: 'POWER',
          isCrucialForCompatibility: true
        }
      ],
      specs: {
        voltage: newVoltage === 100 ? '100V AC 50/60Hz (Japan)' : '100V-240V Universal',
        voltageNumber: Number(newVoltage),
        wattage: Number(newWattage),
        frequency: '50/60Hz Universal Japan',
        plugType: 'Type A (Japanese unpolarized)',
        powerSupplyType: 'INTEGRATED',
        dimensionsMm: { length: 220, width: 180, height: 110 },
        weightGrams: 950,
        certifications: ['PSE Diamond', 'METI Approved'],
        warrantyRegion: 'GLOBAL_1_YEAR',
        warrantyMonths: 24
      },
      b2bBulkDiscountTiers: [
        { minQty: 5, discountPercent: 8 },
        { minQty: 20, discountPercent: 15 }
      ]
    };

    addNewProduct(newProd);
    setProductAddedSuccess(true);
    setTimeout(() => {
      setProductAddedSuccess(false);
      setActiveTab('INVENTORY');
    }, 1500);
  };

  const handleCreateVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoTitle.trim()) return;

    addProductVideo({
      title: videoTitle,
      author: videoAuthor,
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      duration: videoDuration,
      thumbnail: videoThumb,
      category: videoCategory,
      tags: ['#TokyoDirect', '#HardwareReview', '#PSE_Certified']
    });

    setVideoAddedSuccess(true);
    setVideoTitle('');
    setTimeout(() => {
      setVideoAddedSuccess(false);
    }, 2000);
  };

  const containerClasses = isModal
    ? "fixed inset-0 z-50 overflow-y-auto bg-[#0d1117]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    : "max-w-6xl mx-auto px-3 sm:px-6 py-6";

  const cardClasses = isModal
    ? "bg-[#131921] border border-slate-700 rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative text-white flex flex-col p-6 sm:p-8"
    : "bg-[#131921] border border-slate-700 rounded-3xl w-full text-white p-6 sm:p-8 space-y-6";

  return (
    <div className={containerClasses}>
      <div className={cardClasses}>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#ffd814] text-slate-950">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">{currentSeller.name} Central</h2>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-700">
                  VERIFIED TOKYO MERCHANT
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Location: {currentSeller.location} • METI License #JP-99410 • Haneda Bonded Bay #4A
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isModal && (
              <button
                onClick={() => setActivePortal('BUYER')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 hover:text-[#ffd814]"
              >
                Back to Buyer Store
              </button>
            )}

            {isModal && (
              <button
                onClick={() => setIsSellerPortalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* 4 KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400">30-DAY GROSS EXPORT SALES</div>
            <div className="text-xl font-black text-white mt-1">¥18,450,200</div>
            <div className="text-[10px] text-emerald-400 font-mono mt-0.5">↑ +14.2% MoM Global</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400">DISPATCHED AIR SHIPMENTS</div>
            <div className="text-xl font-black text-white mt-1">428 Orders</div>
            <div className="text-[10px] text-emerald-400 font-mono mt-0.5">99.8% On-Time Haneda SLA</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400">ESCROW SETTLEMENT DUE</div>
            <div className="text-xl font-black text-[#febd69] mt-1">¥4,892,100</div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">Next Payout: Friday 00:00 JST</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400">SELLER HEALTH SCORE</div>
            <div className="text-xl font-black text-emerald-400 mt-1">99.4 / 100</div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">METI PSE Compliant</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2 text-xs font-semibold overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('INVENTORY')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'INVENTORY' ? 'bg-[#ffd814] text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Bonded Inventory ({sellerProducts.length})
          </button>

          <button
            onClick={() => setActiveTab('ADD_PRODUCT')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'ADD_PRODUCT' ? 'bg-[#ffd814] text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>List Japanese Electronics</span>
          </button>

          <button
            onClick={() => setActiveTab('UPLOAD_VIDEO')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'UPLOAD_VIDEO' ? 'bg-[#ffd814] text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Upload Demo Video</span>
          </button>

          <button
            onClick={() => setActiveTab('BULK_IMPORT')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'BULK_IMPORT' ? 'bg-[#ffd814] text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            CSV Bulk Feed Ingestion
          </button>

          <button
            onClick={() => setActiveTab('FINANCES')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'FINANCES' ? 'bg-[#ffd814] text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Escrow Ledger
          </button>
        </div>

        {/* TAB 1: Inventory Table */}
        {activeTab === 'INVENTORY' && (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-900">
                    <th className="p-3">Product / SKU</th>
                    <th className="p-3">Voltage Class</th>
                    <th className="p-3">Stock on Hand</th>
                    <th className="p-3">Price (JPY)</th>
                    <th className="p-3">Compliance Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {sellerProducts.map((p) => {
                    const variant = p.variants[0];
                    return (
                      <tr key={p.id} className="hover:bg-slate-900/60">
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <img src={p.images[0]} alt="" className="w-9 h-9 rounded-lg object-contain bg-white p-0.5 shrink-0 border border-slate-700" />
                            <div>
                              <div className="font-bold text-white text-xs font-sans line-clamp-1">{p.title}</div>
                              <div className="text-[10px] text-slate-500">{p.modelNumber}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.specs.voltageNumber === 100 ? 'bg-amber-500/20 text-[#febd69]' : 'bg-emerald-500/20 text-emerald-400'}`}>
                            {p.specs.voltage}
                          </span>
                        </td>
                        <td className="p-3 font-bold text-white">{variant.stockOnHand} Units</td>
                        <td className="p-3 font-bold text-white">¥{variant.priceMinorUnits.toLocaleString()}</td>
                        <td className="p-3 text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>METI PSE OK</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: List Japanese Electronics (Selling System) */}
        {activeTab === 'ADD_PRODUCT' && (
          <div className="space-y-4">
            {productAddedSuccess && (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4" />
                <span>Product listed in Tokyo Haneda Bonded Warehouse Catalog!</span>
              </div>
            )}

            <form onSubmit={handleCreateProduct} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Product Title (English)</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. SONY TA-ZH1ES Premium DAC Amplifier"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#ffd814]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-mono mb-1">Japanese Model Name (Kanji / Katakana)</label>
                  <input
                    type="text"
                    value={newJapaneseTitle}
                    onChange={(e) => setNewJapaneseTitle(e.target.value)}
                    placeholder="e.g. ソニー ハイレゾ対応ヘッドホンアンプ"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#ffd814]"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-mono mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#ffd814]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-mono mb-1">Electronics Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as ProductCategory)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#ffd814]"
                  >
                    <option value="HI_FI_AUDIO">Hi-Fi & Audiophile Audio</option>
                    <option value="JDM_KITCHEN">100V JDM Kitchen Appliances</option>
                    <option value="CAMERA_OPTICS">Camera & Optical Equipment</option>
                    <option value="VOLTAGE_TRANSFORMERS">Voltage Step-Down Transformers</option>
                    <option value="GAMING_PC">Akihabara PC & Gaming Hardware</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-mono mb-1">Export Price (JPY ¥)</label>
                  <input
                    type="number"
                    value={newPriceJPY}
                    onChange={(e) => setNewPriceJPY(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#ffd814]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-mono mb-1">Rated Operating Voltage</label>
                  <select
                    value={newVoltage}
                    onChange={(e) => setNewVoltage(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#ffd814]"
                  >
                    <option value={100}>100V AC 50/60Hz (Strict Japanese Domestic)</option>
                    <option value={240}>100-240V Universal Power Supply</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-mono mb-1">Continuous Wattage (W)</label>
                  <input
                    type="number"
                    value={newWattage}
                    onChange={(e) => setNewWattage(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#ffd814]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-mono mb-1">Initial Stock Units in Tokyo</label>
                  <input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#ffd814]"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#ffd814] hover:bg-[#f7ca00] text-slate-950 font-black text-xs shadow-lg border border-[#fcd200] transition-all"
                >
                  Publish Electronics to Global Store
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: Upload Product Video System */}
        {activeTab === 'UPLOAD_VIDEO' && (
          <div className="space-y-4">
            {videoAddedSuccess && (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Video uploaded and linked to product catalog!</span>
              </div>
            )}

            <form onSubmit={handleCreateVideo} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Video Title</label>
                  <input
                    type="text"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="e.g. 100V Audio Bench Test & THD Measurement"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#ffd814]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-mono mb-1">Author / Channel</label>
                  <input
                    type="text"
                    value={videoAuthor}
                    onChange={(e) => setVideoAuthor(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#ffd814]"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-mono mb-1">Target Category</label>
                  <select
                    value={videoCategory}
                    onChange={(e) => setVideoCategory(e.target.value as ProductCategory)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#ffd814]"
                  >
                    <option value="HI_FI_AUDIO">Hi-Fi & Audiophile Audio</option>
                    <option value="JDM_KITCHEN">100V JDM Kitchen Appliances</option>
                    <option value="CAMERA_OPTICS">Camera & Optical Equipment</option>
                    <option value="VOLTAGE_TRANSFORMERS">Voltage Step-Down Transformers</option>
                    <option value="GAMING_PC">Akihabara PC & Gaming Hardware</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-mono mb-1">Video Duration</label>
                  <input
                    type="text"
                    value={videoDuration}
                    onChange={(e) => setVideoDuration(e.target.value)}
                    placeholder="05:30"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#ffd814]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#ffd814] hover:bg-[#f7ca00] text-slate-950 font-black text-xs shadow-lg border border-[#fcd200] transition-all"
                >
                  Upload & Encode Video
                </button>
              </div>
            </form>

            {/* Current Videos Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {productVideos.map((vid) => (
                <div key={vid.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                  <img src={vid.thumbnail} alt="" className="w-16 h-12 rounded object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-white text-xs truncate">{vid.title}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{vid.author} • {vid.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Bulk CSV Ingestion */}
        {activeTab === 'BULK_IMPORT' && (
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 text-[#ffd814] flex items-center justify-center mx-auto border border-slate-700">
                <Upload className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-sm">Automated Akihabara ERP / CSV Catalog Sync</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Upload your structured CSV containing SKU, Japanese domestic model numbers, rated voltage (100V vs 100-240V), wattage, and Haneda warehouse inventory.
              </p>
              <button
                onClick={handleSimulatedCsvUpload}
                className="px-4 py-2.5 rounded-xl bg-[#ffd814] hover:bg-[#f7ca00] text-slate-950 font-black text-xs font-mono shadow-lg border border-[#fcd200] transition-all"
              >
                Upload akiba_inventory_feed_2026.csv
              </button>
            </div>

            {csvUploadSuccess && (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>CSV Ingested: 148 SKUs updated with voltage & PSE diamond validation pass.</span>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: Double Entry Ledger */}
        {activeTab === 'FINANCES' && (
          <div className="space-y-3 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex justify-between font-bold text-slate-200">
                <span>Account Payout Bank:</span>
                <span className="text-slate-400">Sumitomo Mitsui Banking Corp (SMBC Tokyo) • #***492</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Cleared Volume (YTD):</span>
                <span className="text-white font-bold">¥142,800,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Platform Commission (3.5%):</span>
                <span className="text-slate-400">-¥4,998,000</span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-2 text-emerald-400 font-bold">
                <span>Net Settled To Seller:</span>
                <span>¥137,802,000 JPY</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
