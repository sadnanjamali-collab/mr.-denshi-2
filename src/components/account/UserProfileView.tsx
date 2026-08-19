import React, { useState } from 'react';
import { 
  User, 
  Wallet, 
  Gift, 
  Tag, 
  CreditCard, 
  Package, 
  Truck, 
  RotateCcw, 
  MessageSquare, 
  ShieldCheck, 
  Cpu, 
  MapPin, 
  Settings, 
  ChevronRight, 
  Sparkles, 
  Flame, 
  Clock, 
  CheckCircle2, 
  Plus, 
  Trash2,
  Bell,
  Heart,
  QrCode,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CURRENT_USER } from '../../data/mockUserData';
import { formatPrice } from '../../utils/currency';
import { WarrantyManagement } from './WarrantyManagement';

export const UserProfileView: React.FC = () => {
  const {
    vipPoints,
    addVipPoints,
    dailyCheckedIn,
    handleDailyCheckIn,
    walletBalanceJPY,
    walletLedger,
    userSavedDevices,
    addUserDevice,
    removeUserDevice,
    orders,
    setIsOrderTrackerOpen,
    setActiveOrderToTrack,
    currency,
    locale,
    wishlist,
    setActiveBuyerTab,
    warrantyRecords
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'OVERVIEW' | 'ORDERS' | 'WARRANTY' | 'COUPONS' | 'DEVICES' | 'WALLET'>('OVERVIEW');
  const [isAddingDevice, setIsAddingDevice] = useState(false);
  const [newDevName, setNewDevName] = useState('');
  const [newDevVolt, setNewDevVolt] = useState(120);

  const coupons = [
    { code: 'TOKYO-DDP-FREE', discount: 'Free Air Express DDP', minSpend: 'Orders over ¥30,000', expires: '3 Days left', tag: 'AIR CARGO' },
    { code: 'AKIHABARA-10', discount: '10% OFF Hi-Fi & DACs', minSpend: 'No minimum', expires: '7 Days left', tag: 'AUDIO' },
    { code: 'KAMADO-JDM', discount: '¥3,000 OFF Rice Cookers', minSpend: 'Orders over ¥50,000', expires: '14 Days left', tag: 'JDM APPLIANCE' },
    { code: 'VIP-REWARD-50', discount: '¥5,000 VIP Welcome Bonus', minSpend: 'Valid on all items', expires: '30 Days left', tag: 'VIP EXCLUSIVE' }
  ];

  const handleSaveDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDevName.trim()) return;

    addUserDevice({
      id: `dev-${Date.now()}`,
      name: newDevName,
      deviceType: 'APPLIANCE_STATION',
      voltage: Number(newDevVolt),
      plugType: 'Type B (US Standard)',
      specs: { mainsVoltage: Number(newDevVolt) },
      notes: 'User custom registered device profile.'
    });

    setNewDevName('');
    setIsAddingDevice(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-6 space-y-6 text-zinc-100 font-sans">
      {/* 1. TOP PROFILE BANNER */}
      <div className="rounded-3xl bg-gradient-to-r from-zinc-950 via-black to-zinc-900 border border-zinc-800 p-5 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#ffd814]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={CURRENT_USER.avatar}
                alt={CURRENT_USER.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#ffd814] shadow-lg shadow-[#ffd814]/20"
              />
              <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#ffd814] text-black font-black text-[10px] flex items-center justify-center border-2 border-black">
                ★
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">{CURRENT_USER.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ffd814] text-black font-mono font-black text-[10px] tracking-wide">
                  VIP PLATINUM
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                ID: {CURRENT_USER.id} • Registered Tokyo Cross-Border Member
              </p>
              <div className="flex items-center gap-2 pt-1 text-xs text-zinc-300">
                <span className="flex items-center gap-1 text-[#ffd814]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>DDP Verified Buyer</span>
                </span>
                <span>•</span>
                <span className="text-zinc-400">Default: Tokyo / San Francisco</span>
              </div>
            </div>
          </div>

          {/* Daily Check-in Streak Button */}
          <div className="w-full sm:w-auto flex sm:flex-col items-center justify-between gap-3 bg-zinc-900/90 border border-zinc-750 p-3 sm:p-4 rounded-2xl">
            <div className="text-left sm:text-center">
              <div className="text-[10px] font-mono text-zinc-400">DAILY CHECK-IN STREAK</div>
              <div className="text-sm font-black text-[#ffd814]">Day 14 🔥</div>
            </div>
            <button
              onClick={handleDailyCheckIn}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-lg ${
                dailyCheckedIn
                  ? 'bg-[#ffd814]/20 text-[#ffd814] border border-[#ffd814]/40 cursor-default'
                  : 'bg-[#ffd814] hover:bg-[#f7ca00] text-black shadow-[#ffd814]/30'
              }`}
            >
              <Gift className="w-4 h-4" />
              <span>{dailyCheckedIn ? 'Claimed (+50 Pts)' : 'Claim Daily +50 Pts'}</span>
            </button>
          </div>
        </div>

        {/* 2. 4-PILLAR ASSETS COUNTER */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mt-6 pt-6 border-t border-zinc-850 text-center font-mono">
          <div 
            onClick={() => setActiveSubTab('WARRANTY')}
            className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-[#ffd814] cursor-pointer transition-all"
          >
            <div className="text-xl sm:text-2xl font-black text-emerald-400">{warrantyRecords.length} Active</div>
            <div className="text-xs text-zinc-400 font-sans font-semibold mt-0.5">Warranties</div>
            <div className="text-[10px] text-emerald-300">METI PSE Covered</div>
          </div>

          <div 
            onClick={() => setActiveSubTab('OVERVIEW')}
            className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-[#ffd814] cursor-pointer transition-all"
          >
            <div className="text-xl sm:text-2xl font-black text-white">{vipPoints.toLocaleString()}</div>
            <div className="text-xs text-zinc-400 font-sans font-semibold mt-0.5">VIP Points</div>
            <div className="text-[10px] text-[#ffd814]">= ¥{vipPoints.toLocaleString()} Cash Value</div>
          </div>

          <div 
            onClick={() => setActiveSubTab('WALLET')}
            className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-[#ffd814] cursor-pointer transition-all"
          >
            <div className="text-xl sm:text-2xl font-black text-white">
              {formatPrice(walletBalanceJPY, currency, locale)}
            </div>
            <div className="text-xs text-zinc-400 font-sans font-semibold mt-0.5">Wallet Credit</div>
            <div className="text-[10px] text-zinc-500">3% Cashback active</div>
          </div>

          <div 
            onClick={() => setActiveSubTab('DEVICES')}
            className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-[#ffd814] cursor-pointer transition-all"
          >
            <div className="text-xl sm:text-2xl font-black text-amber-300">{userSavedDevices.length}</div>
            <div className="text-xs text-zinc-400 font-sans font-semibold mt-0.5">Hardware Profiles</div>
            <div className="text-[10px] text-zinc-500">100V Voltage Guard</div>
          </div>
        </div>
      </div>

      {/* 3. MY ORDERS DASHBOARD */}
      <div className="rounded-3xl bg-zinc-950 border border-zinc-800 p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-850 pb-3">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#ffd814]" />
            <h2 className="text-base font-black text-white">My Orders & Air Cargo Logistics</h2>
          </div>
          <button
            onClick={() => setIsOrderTrackerOpen(true)}
            className="text-xs text-[#ffd814] hover:underline font-mono font-bold flex items-center gap-1"
          >
            <span>Live Flight Telemetry</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 5 Order State Icons */}
        <div className="grid grid-cols-5 gap-2 text-center text-xs">
          <div className="p-3 rounded-2xl bg-zinc-900/50 hover:bg-zinc-900 cursor-pointer transition-colors space-y-1">
            <div className="w-9 h-9 rounded-xl bg-zinc-800 text-zinc-300 flex items-center justify-center mx-auto">
              <CreditCard className="w-4 h-4" />
            </div>
            <div className="text-zinc-300 font-medium text-[11px]">Unpaid</div>
            <span className="text-[10px] text-zinc-500 font-mono font-bold">0</span>
          </div>

          <div className="p-3 rounded-2xl bg-zinc-900/50 hover:bg-zinc-900 cursor-pointer transition-colors space-y-1">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mx-auto border border-amber-500/30">
              <Package className="w-4 h-4" />
            </div>
            <div className="text-zinc-200 font-bold text-[11px]">Processing</div>
            <span className="text-[10px] text-amber-400 font-mono font-bold">1</span>
          </div>

          <div 
            onClick={() => setIsOrderTrackerOpen(true)}
            className="p-3 rounded-2xl bg-[#ffd814]/10 hover:bg-[#ffd814]/20 cursor-pointer transition-colors space-y-1 border border-[#ffd814]/30"
          >
            <div className="w-9 h-9 rounded-xl bg-[#ffd814] text-black flex items-center justify-center mx-auto shadow-lg shadow-[#ffd814]/30">
              <Truck className="w-4 h-4" />
            </div>
            <div className="text-[#ffd814] font-extrabold text-[11px]">In-Flight</div>
            <span className="text-[10px] text-black bg-[#ffd814] px-1.5 py-0.2 rounded-full font-mono font-black">1 LIVE</span>
          </div>

          <div className="p-3 rounded-2xl bg-zinc-900/50 hover:bg-zinc-900 cursor-pointer transition-colors space-y-1">
            <div className="w-9 h-9 rounded-xl bg-zinc-800 text-zinc-300 flex items-center justify-center mx-auto">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div className="text-zinc-300 font-medium text-[11px]">Reviews</div>
            <span className="text-[10px] text-zinc-500 font-mono font-bold">2</span>
          </div>

          <div className="p-3 rounded-2xl bg-zinc-900/50 hover:bg-zinc-900 cursor-pointer transition-colors space-y-1">
            <div className="w-9 h-9 rounded-xl bg-zinc-800 text-zinc-300 flex items-center justify-center mx-auto">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div className="text-zinc-300 font-medium text-[11px]">Returns</div>
            <span className="text-[10px] text-zinc-500 font-mono font-bold">0</span>
          </div>
        </div>

        {/* Active Order Card Preview */}
        {orders.length > 0 && (
          <div className="mt-4 p-4 rounded-2xl bg-black border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ffd814] animate-ping"></span>
                <span className="text-white font-bold">{orders[0].orderNumber}</span>
                <span className="px-2 py-0.5 rounded bg-[#ffd814]/20 text-[#ffd814] text-[10px] font-bold">
                  {orders[0].status}
                </span>
              </div>
              <span className="text-zinc-400">
                {new Date(orders[0].createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-3">
                <img
                  src={orders[0].items[0]?.product.images[0]}
                  alt=""
                  className="w-12 h-12 rounded-xl object-cover bg-zinc-900 shrink-0 border border-zinc-800"
                />
                <div>
                  <div className="text-xs font-bold text-white line-clamp-1">{orders[0].items[0]?.product.title}</div>
                  <div className="text-[11px] text-zinc-400 font-mono">
                    {orders[0].items.length} Item(s) • Total: {formatPrice(orders[0].pricing.totalLandedCostMinorUnits, currency, locale)} (DDP)
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveOrderToTrack(orders[0]);
                  setIsOrderTrackerOpen(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-[#ffd814] hover:bg-[#f7ca00] text-black font-bold text-xs font-mono flex items-center gap-1.5 shadow"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Track Flight</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 4. TABBED SERVICES: WARRANTY, COUPONS, HARDWARE PROFILES, WALLET LEDGER */}
      <div className="rounded-3xl bg-zinc-950 border border-zinc-800 p-5 sm:p-6 space-y-5 shadow-xl">
        {/* Sub-tab Navigation */}
        <div className="flex items-center gap-2 border-b border-zinc-850 pb-3 overflow-x-auto text-xs font-bold font-mono no-scrollbar">
          <button
            onClick={() => setActiveSubTab('WARRANTY')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeSubTab === 'WARRANTY'
                ? 'bg-[#ffd814] text-black shadow'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Warranty Management ({warrantyRecords.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('COUPONS')}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeSubTab === 'COUPONS'
                ? 'bg-[#ffd814] text-black shadow'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            Active Coupons ({coupons.length})
          </button>
          <button
            onClick={() => setActiveSubTab('DEVICES')}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeSubTab === 'DEVICES'
                ? 'bg-[#ffd814] text-black shadow'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            Voltage & Rig Profiles ({userSavedDevices.length})
          </button>
          <button
            onClick={() => setActiveSubTab('WALLET')}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeSubTab === 'WALLET'
                ? 'bg-[#ffd814] text-black shadow'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            Digital Double-Entry Ledger
          </button>
        </div>

        {/* TAB 0: Warranty Management */}
        {activeSubTab === 'WARRANTY' && (
          <div>
            <WarrantyManagement />
          </div>
        )}

        {/* TAB 1: Coupons View */}
        {activeSubTab === 'COUPONS' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {coupons.map((c) => (
              <div
                key={c.code}
                className="p-4 rounded-2xl bg-black border border-zinc-800 hover:border-[#ffd814] transition-all flex items-center justify-between gap-3 relative overflow-hidden"
              >
                <div className="space-y-1">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#ffd814]/20 text-[#ffd814] font-mono font-bold">
                    {c.tag}
                  </span>
                  <div className="text-sm font-black text-white">{c.discount}</div>
                  <div className="text-[11px] text-zinc-400">{c.minSpend} • {c.expires}</div>
                  <div className="text-xs font-mono font-bold text-zinc-300">Code: <span className="text-[#ffd814]">{c.code}</span></div>
                </div>

                <button
                  onClick={() => {
                    alert(`Coupon ${c.code} copied and applied to cart!`);
                    setActiveBuyerTab('HOME');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-[#ffd814] text-zinc-300 hover:text-black font-bold text-xs font-mono transition-colors shrink-0"
                >
                  Apply
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: Hardware Profiles View */}
        {activeSubTab === 'DEVICES' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs">
              <p className="text-zinc-400">
                Register your domestic voltage (100V, 120V, 230V) for zero-risk transformer calculations.
              </p>
              <button
                onClick={() => setIsAddingDevice(!isAddingDevice)}
                className="px-3 py-1.5 rounded-xl bg-[#ffd814] text-black font-bold flex items-center gap-1.5 shadow"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Profile</span>
              </button>
            </div>

            {isAddingDevice && (
              <form onSubmit={handleSaveDevice} className="p-4 rounded-2xl bg-black border border-zinc-800 space-y-3 text-xs">
                <div>
                  <label className="text-zinc-400 font-mono block mb-1">Profile Name (e.g. Master Chef Kitchen)</label>
                  <input
                    type="text"
                    value={newDevName}
                    onChange={(e) => setNewDevName(e.target.value)}
                    placeholder="e.g. Studio Hi-Fi Corner"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-[#ffd814]"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 font-mono block mb-1">Mains Voltage</label>
                  <select
                    value={newDevVolt}
                    onChange={(e) => setNewDevVolt(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none"
                  >
                    <option value={100}>100V AC (Japan)</option>
                    <option value={120}>120V AC (USA / Canada)</option>
                    <option value={230}>230V AC (Europe / UK / Australia)</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#ffd814] text-black font-bold"
                >
                  Save Hardware Profile
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {userSavedDevices.map((dev) => (
                <div key={dev.id} className="p-4 rounded-2xl bg-black border border-zinc-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-xs">{dev.name}</h4>
                    <span className="text-[11px] text-amber-300 font-mono">{dev.voltage}V AC • {dev.plugType}</span>
                  </div>
                  <button
                    onClick={() => removeUserDevice(dev.id)}
                    className="text-zinc-500 hover:text-red-400 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Digital Ledger */}
        {activeSubTab === 'WALLET' && (
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-black border border-zinc-800 flex items-center justify-between">
              <div>
                <div className="text-xs text-zinc-400 font-mono">AVAILABLE ESCROW BALANCE</div>
                <div className="text-xl font-bold text-white mt-1">
                  {formatPrice(walletBalanceJPY, currency, locale)}
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">
                AUDITED
              </span>
            </div>

            <div className="space-y-2">
              {walletLedger.map((tx) => (
                <div key={tx.id} className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{tx.description}</div>
                    <div className="text-[10px] text-zinc-400 font-mono">{new Date(tx.timestamp).toLocaleString()}</div>
                  </div>
                  <div className="text-right font-mono font-bold">
                    <span className={tx.type === 'CREDIT' ? 'text-emerald-400' : 'text-zinc-300'}>
                      {tx.type === 'CREDIT' ? '+' : '-'}{formatPrice(tx.amountMinorUnits, currency, locale)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
