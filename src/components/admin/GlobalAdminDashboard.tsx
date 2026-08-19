import React, { useState } from 'react';
import { 
  X, 
  LayoutDashboard, 
  Globe, 
  ShieldAlert, 
  DollarSign, 
  Activity, 
  Sliders, 
  Database,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  ShieldCheck,
  Server
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GLOBAL_MARKETS } from '../../data/markets';

interface GlobalAdminDashboardProps {
  isModal?: boolean;
}

export const GlobalAdminDashboard: React.FC<GlobalAdminDashboardProps> = ({ isModal = true }) => {
  const {
    isAdminDashboardOpen,
    setIsAdminDashboardOpen,
    setActivePortal,
    currentUserRole
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'OVERVIEW' | 'TARIFFS' | 'FRAUD' | 'SYSTEM'>('OVERVIEW');

  if (isModal && !isAdminDashboardOpen) return null;

  const containerClasses = isModal
    ? "fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    : "max-w-6xl mx-auto px-3 sm:px-6 py-6";

  const cardClasses = isModal
    ? "bg-zinc-950 border border-zinc-800 rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative text-zinc-100 flex flex-col p-6 sm:p-8"
    : "bg-zinc-950 border border-zinc-800 rounded-3xl w-full text-zinc-100 p-6 sm:p-8 space-y-6";

  return (
    <div className={containerClasses}>
      <div className={cardClasses}>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-850 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white tracking-tight">Global Governance & Operations Control</h2>
                <span className="px-2 py-0.5 rounded bg-[#00FF66]/20 text-[#00FF66] font-mono text-[10px] font-bold border border-[#00FF66]/30">
                  ENTERPRISE ROOT ADMIN
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Multi-Market Tariff Engine • Cross-Border Risk Monitor • Haneda Air Logistics Routing
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isModal && (
              <button
                onClick={() => setActivePortal('BUYER')}
                className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-mono text-zinc-300 hover:text-[#00FF66]"
              >
                Back to Buyer Store
              </button>
            )}

            {isModal && (
              <button
                onClick={() => setIsAdminDashboardOpen(false)}
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Top Metric Strip in Black & Neon Green */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-black border border-zinc-850">
            <div className="text-[10px] text-zinc-400">GLOBAL GMV (24H EXPORT)</div>
            <div className="text-xl font-black text-white mt-1">¥64,280,000</div>
            <div className="text-[10px] text-[#00FF66] mt-0.5">↑ 9 Active Regional Markets</div>
          </div>

          <div className="p-4 rounded-2xl bg-black border border-zinc-850">
            <div className="text-[10px] text-zinc-400">DDP CUSTOMS TAX PRE-COLLECTED</div>
            <div className="text-xl font-black text-[#00FF66] mt-1">¥5,120,400</div>
            <div className="text-[10px] text-zinc-400 mt-0.5">100% Remittance Ready</div>
          </div>

          <div className="p-4 rounded-2xl bg-black border border-zinc-850">
            <div className="text-[10px] text-zinc-400">FRAUD RISK SCORE</div>
            <div className="text-xl font-black text-[#00FF66] mt-1">0.02% Low Risk</div>
            <div className="text-[10px] text-zinc-400 mt-0.5">3DS 2.2 & Token Fingerprint</div>
          </div>

          <div className="p-4 rounded-2xl bg-black border border-zinc-850">
            <div className="text-[10px] text-zinc-400">SYSTEM LATENCY (EDGE)</div>
            <div className="text-xl font-black text-[#00FF66] mt-1">18ms</div>
            <div className="text-[10px] text-zinc-400 mt-0.5">Tokyo - Haneda Primary</div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mb-4 border-b border-zinc-850 pb-2 text-xs font-semibold">
          <button
            onClick={() => setActiveAdminTab('OVERVIEW')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeAdminTab === 'OVERVIEW' ? 'bg-[#00FF66] text-black font-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Regional Market Status
          </button>
          <button
            onClick={() => setActiveAdminTab('TARIFFS')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeAdminTab === 'TARIFFS' ? 'bg-[#00FF66] text-black font-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Tariff & De Minimis Rules
          </button>
          <button
            onClick={() => setActiveAdminTab('FRAUD')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeAdminTab === 'FRAUD' ? 'bg-[#00FF66] text-black font-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Live Risk & Fraud Telemetry
          </button>
          <button
            onClick={() => setActiveAdminTab('SYSTEM')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeAdminTab === 'SYSTEM' ? 'bg-[#00FF66] text-black font-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            SRE Edge Health
          </button>
        </div>

        {/* TAB 1: Regional Market Status */}
        {activeAdminTab === 'OVERVIEW' && (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-mono">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400 bg-black">
                    <th className="p-3">Market / Country</th>
                    <th className="p-3">Voltage Standard</th>
                    <th className="p-3">Primary Tax System</th>
                    <th className="p-3">Carriers Active</th>
                    <th className="p-3">DDP Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-850 text-zinc-300">
                  {Object.values(GLOBAL_MARKETS).map((m) => (
                    <tr key={m.id} className="hover:bg-black/60">
                      <td className="p-3 font-bold text-white flex items-center gap-2">
                        <span>{m.flag}</span>
                        <span>{m.name}</span>
                      </td>
                      <td className="p-3 font-bold text-[#00FF66]">{m.voltageStandard}</td>
                      <td className="p-3 text-zinc-300">{m.taxName} ({(m.defaultTaxRate * 100).toFixed(0)}%)</td>
                      <td className="p-3 text-zinc-400">{m.availableCarriers.map(c => c.name).join(', ')}</td>
                      <td className="p-3 text-[#00FF66] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Pre-Cleared Active</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Tariffs */}
        {activeAdminTab === 'TARIFFS' && (
          <div className="space-y-3 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-black border border-zinc-800 space-y-2">
              <div className="font-bold text-white text-sm">Harmonized System (HS) Electronic Duty Master</div>
              <div className="text-zinc-400">
                HS 8516.60 (Electro-Thermic Rice Cookers & Ovens): 0% Duty (USA / USMCA), 2.7% (EU / UK)
              </div>
              <div className="text-zinc-400">
                HS 8518.30 (Hi-Res Audio Headphones & DAC Amplifiers): 0% Duty (Global ITA Compliant)
              </div>
              <div className="text-zinc-400">
                HS 8504.40 (Static Inverters & Step-Down Toroidal Transformers): 1.5% Standard
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Risk & Fraud */}
        {activeAdminTab === 'FRAUD' && (
          <div className="space-y-3 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-black border border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#00FF66]" />
                <div>
                  <div className="font-bold text-white">Automated Bot & Carding Shield Active</div>
                  <div className="text-zinc-400">0 malicious transactions blocked in last 60 minutes.</div>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#00FF66]/20 text-[#00FF66] font-bold">SHIELD 100%</span>
            </div>
          </div>
        )}

        {/* TAB 4: SRE Edge */}
        {activeAdminTab === 'SYSTEM' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-black border border-zinc-800 space-y-2">
              <div className="font-bold text-white flex items-center gap-2">
                <Server className="w-4 h-4 text-[#00FF66]" />
                <span>Primary Control Node: JP-HND-1</span>
              </div>
              <div className="text-zinc-400">Uptime: 99.998% • Latency: 4.2ms • CPU Load: 12%</div>
            </div>
            <div className="p-4 rounded-2xl bg-black border border-zinc-800 space-y-2">
              <div className="font-bold text-white flex items-center gap-2">
                <Server className="w-4 h-4 text-[#00FF66]" />
                <span>Failover Edge Node: US-SFO-2</span>
              </div>
              <div className="text-zinc-400">Hot Standby • Synchronized Replication OK</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
