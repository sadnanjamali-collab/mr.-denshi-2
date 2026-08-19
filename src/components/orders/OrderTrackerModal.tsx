import React from 'react';
import { X, Truck, Plane, CheckCircle2, Clock, MapPin, ShieldCheck, QrCode, FileText, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/currency';

export const OrderTrackerModal: React.FC = () => {
  const {
    isOrderTrackerOpen,
    setIsOrderTrackerOpen,
    orders,
    activeOrderToTrack,
    setActiveOrderToTrack,
    currency,
    locale
  } = useApp();

  if (!isOrderTrackerOpen) return null;

  const currentOrder = activeOrderToTrack || orders[0];
  const shipment = currentOrder?.shipments[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-slate-100 flex flex-col p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">Tokyo Air Cargo Live Tracking</h2>
              <p className="text-xs text-slate-400 font-mono">
                Order #{currentOrder?.orderNumber} • Carrier: {shipment?.carrier.name} ({shipment?.trackingNumber})
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOrderTrackerOpen(false)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Selector Tab list if multiple orders */}
        {orders.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4">
            {orders.map((ord) => (
              <button
                key={ord.id}
                onClick={() => setActiveOrderToTrack(ord)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono border whitespace-nowrap transition-all ${
                  ord.id === currentOrder?.id
                    ? 'bg-red-600/20 border-red-500 text-red-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {ord.orderNumber} ({ord.status})
              </button>
            ))}
          </div>
        )}

        {/* Real-Time Air Cargo Status Card */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-slate-500">CURRENT TELEMETRY STATUS</div>
            <div className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>{shipment?.status.replace(/_/g, ' ')}</span>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>Location: {shipment?.currentLocationName}</span>
            </div>
          </div>

          <div className="text-right font-mono text-xs">
            <div className="text-[10px] text-slate-500">CUSTOMS DECLARATION</div>
            <div className="text-slate-200 font-bold">{shipment?.customsDeclarationNumber}</div>
            <div className="text-emerald-400 text-[10px]">DDP PRE-CLEARED (NACCS)</div>
          </div>
        </div>

        {/* Visual Timeline Stepper */}
        <div className="space-y-4 mb-6">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Logistics & Customs Timeline</h3>
          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
            {shipment?.trackingTimeline.map((step, idx) => (
              <div key={step.id} className="relative">
                {/* Dot */}
                <div className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full flex items-center justify-center ${
                  step.completed
                    ? 'bg-emerald-500 text-slate-950'
                    : idx === 3
                    ? 'bg-amber-400 animate-pulse text-slate-950'
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  {step.completed && <CheckCircle2 className="w-3 h-3" />}
                </div>

                {/* Content */}
                <div className="text-xs space-y-0.5">
                  <div className="flex items-center justify-between font-mono">
                    <span className={`font-bold ${step.completed ? 'text-slate-100' : 'text-slate-400'}`}>
                      {step.status.replace(/_/g, ' ')}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {new Date(step.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-slate-400 text-[11px]">{step.location}</div>
                  <p className="text-slate-300 text-xs">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Warranty Certificate Link */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/40 via-slate-950 to-slate-950 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-600/20 text-red-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs text-white">Digital Japanese Warranty Certificate</div>
              <div className="text-[10px] font-mono text-slate-400">
                ID: {currentOrder?.digitalWarrantyCertificateId} • Valid for 24 Months
              </div>
            </div>
          </div>

          <button
            onClick={() => alert(`Certificate ${currentOrder?.digitalWarrantyCertificateId} verified in Tokyo database.`)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold"
          >
            View Certificate QR
          </button>
        </div>
      </div>
    </div>
  );
};
