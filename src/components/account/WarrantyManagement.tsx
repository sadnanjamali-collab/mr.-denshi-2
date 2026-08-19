import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WarrantyRecord } from '../../types';
import { 
  ShieldCheck, 
  Clock, 
  FileCheck, 
  AlertCircle, 
  Plus, 
  QrCode, 
  Download, 
  CheckCircle2, 
  Wrench, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Calendar
} from 'lucide-react';

export const WarrantyManagement: React.FC = () => {
  const { warrantyRecords, registerWarrantyRecord, submitWarrantyClaim, products } = useApp();

  const [selectedWarranty, setSelectedWarranty] = useState<WarrantyRecord | null>(warrantyRecords[0] || null);
  const [isRegisteringNew, setIsRegisteringNew] = useState(false);
  const [newProductId, setNewProductId] = useState(products[0]?.id || '');
  const [newSerial, setNewSerial] = useState('');
  const [newDuration, setNewDuration] = useState(24);
  const [claimIssueText, setClaimIssueText] = useState('');
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);

  const calculateRemainingDays = (purchaseDate: string, durationMonths: number) => {
    const purchase = new Date(purchaseDate);
    const expireDate = new Date(purchase);
    expireDate.setMonth(expireDate.getMonth() + durationMonths);
    const now = new Date();
    const diffTime = expireDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSerial.trim()) return;

    const matchedProd = products.find(p => p.id === newProductId);
    if (!matchedProd) return;

    registerWarrantyRecord({
      orderId: `ORD-2026-JP-${Math.floor(10000 + Math.random() * 90000)}`,
      productId: matchedProd.id,
      productTitle: matchedProd.title,
      productImage: matchedProd.images[0],
      serialNumber: newSerial.trim().toUpperCase(),
      purchaseDate: new Date().toISOString(),
      warrantyDurationMonths: Number(newDuration),
      metiPseCertificateNumber: `METI-PSE-DIGITAL-${Math.floor(100000 + Math.random() * 900000)}`,
      serviceCenter: 'MR. DENSHI Tokyo Haneda International Certified Repair Lab'
    });

    setNewSerial('');
    setIsRegisteringNew(false);
  };

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWarranty || !claimIssueText.trim()) return;

    submitWarrantyClaim(selectedWarranty.id, claimIssueText);
    setClaimIssueText('');
    setClaimSuccess(true);
    setTimeout(() => {
      setClaimSuccess(false);
      setIsClaimModalOpen(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header & Quick Action */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Tokyo Global Warranty & METI PSE Ledger</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                  OFFICIAL COVERAGE
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Automated remaining coverage calculator & Tokyo Haneda certified repair guarantee.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsRegisteringNew(true)}
          className="px-4 py-2 rounded-xl bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 font-black text-xs flex items-center gap-1.5 shadow-md border border-[#fcd200] transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Register New Device Serial</span>
        </button>
      </div>

      {/* Register New Modal */}
      {isRegisteringNew && (
        <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="font-bold text-sm text-emerald-400 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4" />
              <span>Register Japanese Electronic Serial Number</span>
            </h4>
            <button
              onClick={() => setIsRegisteringNew(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleRegister} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Select Hardware Device</label>
              <select
                value={newProductId}
                onChange={(e) => setNewProductId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.brand} - {p.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Hardware Serial Number (Laser Barcode)</label>
              <input
                type="text"
                value={newSerial}
                onChange={(e) => setNewSerial(e.target.value)}
                placeholder="e.g. SN-ZOJ-2026-889102"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Warranty Plan</label>
              <select
                value={newDuration}
                onChange={(e) => setNewDuration(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value={12}>12 Months (Standard Japan)</option>
                <option value={24}>24 Months (Tokyo Extended Prime)</option>
                <option value={36}>36 Months (Audiophile & Transformer Pro)</option>
              </select>
            </div>

            <div className="sm:col-span-3 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg"
              >
                Verify & Activate Coverage
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Warranties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {warrantyRecords.map((rec) => {
          const remainingDays = calculateRemainingDays(rec.purchaseDate, rec.warrantyDurationMonths);
          const totalDays = rec.warrantyDurationMonths * 30.5;
          const percentage = Math.min(100, Math.max(0, (remainingDays / totalDays) * 100));

          return (
            <div
              key={rec.id}
              onClick={() => setSelectedWarranty(rec)}
              className={`bg-slate-900 border rounded-2xl p-5 cursor-pointer transition-all space-y-4 shadow-md ${
                selectedWarranty?.id === rec.id
                  ? 'border-emerald-500 ring-1 ring-emerald-500/50'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Top Details */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={rec.productImage}
                    alt={rec.productTitle}
                    className="w-14 h-14 rounded-xl object-contain bg-slate-950 p-1.5 border border-slate-800 shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-white line-clamp-1">
                      {rec.productTitle}
                    </h4>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      Serial: {rec.serialNumber}
                    </div>
                    <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{rec.metiPseCertificateNumber}</span>
                    </div>
                  </div>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                  remainingDays > 60
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : remainingDays > 0
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-red-500/20 text-red-300 border border-red-500/40'
                }`}>
                  {remainingDays > 0 ? 'ACTIVE' : 'EXPIRED'}
                </span>
              </div>

              {/* Progress Gauge */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Coverage Duration: {rec.warrantyDurationMonths} Months</span>
                  <span className="font-bold text-emerald-400">{remainingDays} Days Remaining</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    style={{ width: `${percentage}%` }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                  />
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedWarranty(rec);
                    setShowCertificateModal(true);
                  }}
                  className="text-slate-300 hover:text-emerald-400 flex items-center gap-1 font-mono text-[11px]"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>View Certificate</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedWarranty(rec);
                    setIsClaimModalOpen(true);
                  }}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[11px] flex items-center gap-1 border border-slate-700"
                >
                  <Wrench className="w-3 h-3 text-amber-400" />
                  <span>File Repair Ticket</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* METI Digital Certificate Modal */}
      {showCertificateModal && selectedWarranty && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-emerald-500 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowCertificateModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            {/* Official Header */}
            <div className="text-center space-y-1 border-b border-slate-800 pb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40">
                <ShieldCheck className="w-4 h-4" />
                <span>METI JAPAN OFFICIAL COMPLIANCE CERTIFICATE</span>
              </div>
              <h3 className="text-lg font-black text-white pt-2 font-mono">
                電気用品安全法 (DENAN) PSE DIGITAL WARRANTY
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Issued by Tokyo Haneda International Export Quality Control Lab
              </p>
            </div>

            {/* Certificate Body */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Device Model:</span>
                <span className="font-bold text-white">{selectedWarranty.productTitle}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Serial Barcode:</span>
                <span className="font-bold text-emerald-400">{selectedWarranty.serialNumber}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Certificate Reg #:</span>
                <span className="text-white">{selectedWarranty.metiPseCertificateNumber}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Purchase Date:</span>
                <span className="text-white">{new Date(selectedWarranty.purchaseDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Authorized Repair Hub:</span>
                <span className="text-right text-slate-200">{selectedWarranty.serviceCenter}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center">
                  <QrCode className="w-10 h-10 text-slate-950" />
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  Cryptographic Hash: <br />
                  <span className="text-emerald-400">0x889A...TOKYO_VALID</span>
                </div>
              </div>

              <button
                onClick={() => setShowCertificateModal(false)}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Claim Modal */}
      {isClaimModalOpen && selectedWarranty && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full text-white space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsClaimModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">File Tokyo Repair Claim</h3>
                <p className="text-xs text-slate-400 font-mono">Serial: {selectedWarranty.serialNumber}</p>
              </div>
            </div>

            {claimSuccess ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="font-bold text-sm text-white">Repair Ticket #TK-9941 Generated!</h4>
                <p className="text-xs text-slate-300">
                  Haneda prepaid air return label dispatched to your registered email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleClaimSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Describe Issue or Error Code</label>
                  <textarea
                    rows={3}
                    value={claimIssueText}
                    onChange={(e) => setClaimIssueText(e.target.value)}
                    placeholder="e.g. Error code H01 triggered, thermal breaker tripped, or left channel audio drop..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsClaimModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 font-bold text-xs"
                  >
                    Submit Repair Ticket
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
