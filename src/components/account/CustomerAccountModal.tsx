import React, { useState } from 'react';
import { 
  X, 
  User, 
  Wallet, 
  Cpu, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  FileText, 
  QrCode, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CURRENT_USER } from '../../data/mockUserData';
import { formatPrice } from '../../utils/currency';

export const CustomerAccountModal: React.FC = () => {
  const {
    isAccountModalOpen,
    setIsAccountModalOpen,
    userSavedDevices,
    addUserDevice,
    removeUserDevice,
    walletBalanceJPY,
    walletLedger,
    currency,
    locale,
    orders
  } = useApp();

  const [activeTab, setActiveTab] = useState<'PROFILE' | 'WALLET' | 'DEVICES' | 'WARRANTIES'>('WALLET');

  // Form state for adding new device
  const [isAddingDevice, setIsAddingDevice] = useState(false);
  const [newDeviceName, setNewDeviceName] = useState('');
  const [newDeviceVoltage, setNewDeviceVoltage] = useState(120);
  const [newDevicePlug, setNewDevicePlug] = useState('Type B (US 3-Pin)');

  if (!isAccountModalOpen) return null;

  const handleSaveDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeviceName.trim()) return;

    addUserDevice({
      id: `dev-${Date.now()}`,
      name: newDeviceName,
      deviceType: 'APPLIANCE_STATION',
      voltage: Number(newDeviceVoltage),
      plugType: newDevicePlug,
      specs: {
        mainsVoltage: Number(newDeviceVoltage),
        frequency: '60Hz'
      },
      notes: 'Custom user registered hardware profile.'
    });

    setNewDeviceName('');
    setIsAddingDevice(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative text-slate-100 flex flex-col p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-800 text-slate-200">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">{CURRENT_USER.name}</h2>
              <p className="text-xs text-slate-400 font-mono">
                {CURRENT_USER.email} • Tier: VIP Platinum Global Trader
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAccountModalOpen(false)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('WALLET')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'WALLET' ? 'bg-red-600/20 text-red-300 font-bold border border-red-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Digital Multi-Currency Wallet
          </button>
          <button
            onClick={() => setActiveTab('DEVICES')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'DEVICES' ? 'bg-red-600/20 text-red-300 font-bold border border-red-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Saved Hardware & Electrical Profiles ({userSavedDevices.length})
          </button>
          <button
            onClick={() => setActiveTab('WARRANTIES')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'WARRANTIES' ? 'bg-red-600/20 text-red-300 font-bold border border-red-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Digital Japanese Warranties & RMA
          </button>
        </div>

        {/* TAB 1: Digital Wallet */}
        {activeTab === 'WALLET' && (
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-mono text-slate-400">STORE CREDIT & REBATE BALANCE</div>
                <div className="text-3xl font-black text-white mt-1">
                  {formatPrice(walletBalanceJPY, currency, locale)}
                </div>
                <div className="text-[11px] text-emerald-400 font-mono mt-1">✓ Instantly usable on all DDP checkouts</div>
              </div>
              <div className="p-4 rounded-2xl bg-red-600/20 text-red-400 border border-red-500/30">
                <Wallet className="w-8 h-8" />
              </div>
            </div>

            {/* Ledger Transactions */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 font-mono uppercase">Ledger Activity:</h4>
              <div className="space-y-1.5">
                {walletLedger.map((tx) => (
                  <div key={tx.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
                    <div>
                      <div className="font-bold text-slate-200">{tx.description}</div>
                      <div className="text-[10px] text-slate-500">{new Date(tx.date).toLocaleString()}</div>
                    </div>
                    <div className={`font-bold ${tx.amountMinorUnits > 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {tx.amountMinorUnits > 0 ? '+' : ''}{formatPrice(tx.amountMinorUnits, currency, locale)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Hardware Profiles */}
        {activeTab === 'DEVICES' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-400">
                Register your home electrical standards, audio gear, and computers for automatic compatibility validation.
              </p>
              <button
                onClick={() => setIsAddingDevice(!isAddingDevice)}
                className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Hardware Profile</span>
              </button>
            </div>

            {isAddingDevice && (
              <form onSubmit={handleSaveDevice} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 font-mono block mb-1">Profile Name (e.g., California Home Kitchen)</label>
                  <input
                    type="text"
                    value={newDeviceName}
                    onChange={(e) => setNewDeviceName(e.target.value)}
                    placeholder="e.g. Master Audio Listening Room"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 font-mono block mb-1">Mains Voltage</label>
                    <select
                      value={newDeviceVoltage}
                      onChange={(e) => setNewDeviceVoltage(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none"
                    >
                      <option value={100}>100V AC (Japan Domestic)</option>
                      <option value={120}>120V AC (North America / Taiwan)</option>
                      <option value={230}>230V AC (Europe / UK / Australia / Middle East)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-400 font-mono block mb-1">Plug Standard</label>
                    <input
                      type="text"
                      value={newDevicePlug}
                      onChange={(e) => setNewDevicePlug(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                >
                  Save Profile
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {userSavedDevices.map((dev) => (
                <div key={dev.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-white text-sm">{dev.name}</div>
                      <div className="text-slate-400 font-mono">{dev.plugType}</div>
                    </div>
                    <button
                      onClick={() => removeUserDevice(dev.id)}
                      className="p-1 rounded text-slate-500 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="pt-2 border-t border-slate-850 flex justify-between font-mono text-[11px]">
                    <span className="text-slate-500">Mains Voltage:</span>
                    <span className="text-amber-400 font-bold">{dev.voltage}V AC</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Digital Warranties & RMA */}
        {activeTab === 'WARRANTIES' && (
          <div className="space-y-3 font-mono text-xs">
            {orders.map((ord) => (
              <div key={ord.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-bold text-white text-sm font-sans">{ord.items[0]?.product.title}</div>
                  <div className="text-slate-400">Order: {ord.orderNumber} • Certificate: {ord.digitalWarrantyCertificateId}</div>
                  <div className="text-emerald-400">✓ Japanese METI & Manufacturer Laser Serial Active</div>
                </div>
                <button
                  onClick={() => alert(`RMA return initiated for Certificate ${ord.digitalWarrantyCertificateId}. Tokyo support will dispatch return label.`)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-sans text-xs font-semibold"
                >
                  Initiate RMA Return
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
