import React, { useState } from 'react';
import { Check, Printer, Copy, X, QrCode, Sparkles } from 'lucide-react';
import { Registration } from '../types.ts';
import { EVENT_DETAILS } from '../data/eventData.ts';

interface DigitalPassModalProps {
  registration: Registration | null;
  onClose: () => void;
}

export const DigitalPassModal: React.FC<DigitalPassModalProps> = ({ registration, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!registration) return null;

  const handleCopyPassId = () => {
    navigator.clipboard.writeText(registration.passId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0a0e17] border border-emerald-500/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-[0_0_50px_rgba(0,255,136,0.15)] relative animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close pass dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Success Header Icon */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto mb-3 shadow-[0_0_20px_rgba(0,255,136,0.3)]">
            <Check className="w-7 h-7" />
          </div>
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
            ✓ REGISTRATION CONFIRMED
          </span>
          <h3 className="text-2xl font-display font-extrabold text-white mt-1">
            You're on the delegate roster.
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Your admission pass has been officially issued for TechNova 2026.
          </p>
        </div>

        {/* Cyber Digital Pass Element (Optimized for Screen & Print) */}
        <div className="print-pass-container bg-[#0f1422] border-2 border-dashed border-emerald-500/40 rounded-2xl p-5 sm:p-6 relative overflow-hidden mb-6 shadow-inner">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

          {/* Pass Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-emerald-400/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
                T
              </div>
              <span className="font-display font-extrabold text-sm tracking-tight text-white">
                TECHNOVA 2026 PASS
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">PASS ID</span>
              <span className="font-mono font-bold text-emerald-400 text-sm tracking-wider">
                {registration.passId}
              </span>
            </div>
          </div>

          {/* Pass Grid Content */}
          <div className="grid grid-cols-3 gap-3.5 mb-4">
            <div className="col-span-2 space-y-3">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block">DELEGATE NAME</span>
                <span className="font-bold text-white text-base leading-tight block">
                  {registration.fullName}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block">REGISTER NUMBER</span>
                <span className="font-mono text-xs text-slate-200 block">
                  {registration.regNumber}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block">SELECTED ARENA</span>
                <span className="text-xs font-semibold text-emerald-400 block">
                  {registration.track}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block">COLLEGE / DEPT</span>
                <span className="text-xs text-slate-300 block line-clamp-1">
                  {registration.department} ({registration.yearOfStudy})
                </span>
              </div>
            </div>

            {/* QR Code & Barcode Mock */}
            <div className="col-span-1 flex flex-col items-center justify-center bg-black/40 border border-white/10 rounded-xl p-3 text-center">
              <QrCode className="w-16 h-16 text-emerald-400" />
              <div className="text-[9px] font-mono text-slate-400 mt-2 tracking-wider">
                SCAN AT ENTRY
              </div>
              <div className="w-full h-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 rounded-full mt-2 opacity-70" />
            </div>
          </div>

          {/* Pass Bottom Strip */}
          <div className="pt-3 border-t border-dashed border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400 flex-wrap gap-2">
            <span>24 APRIL 2026 · 09:00 AM IST</span>
            <span className="text-emerald-400">{EVENT_DETAILS.institutionShort} · NAGAPATTINAM</span>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 py-3 px-4 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,255,136,0.3)]"
          >
            <Printer className="w-4 h-4" />
            <span>PRINT / SAVE PDF PASS</span>
          </button>

          <button
            onClick={handleCopyPassId}
            className="py-3 px-4 bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold rounded-xl border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Copy Pass ID"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-mono">COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>COPY ID</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
          >
            Done and return to symposium website
          </button>
        </div>

      </div>
    </div>
  );
};
