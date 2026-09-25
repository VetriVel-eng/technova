import React, { useState, useEffect } from 'react';
import { X, Search, Download, Trash2, RefreshCw, UserCheck, QrCode } from 'lucide-react';
import { Registration } from '../types.ts';
import { INITIAL_SEED_REGISTRATIONS } from '../data/eventData.ts';

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onViewPass: (reg: Registration) => void;
  onDataChange: () => void;
}

export const AdminDrawer: React.FC<AdminDrawerProps> = ({
  isOpen,
  onClose,
  onViewPass,
  onDataChange,
}) => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrackFilter, setSelectedTrackFilter] = useState('all');

  const loadData = () => {
    try {
      const stored = localStorage.getItem('technovaRegistrations');
      if (stored) {
        setRegistrations(JSON.parse(stored));
      } else {
        // If empty, initialize with seed registrations
        localStorage.setItem('technovaRegistrations', JSON.stringify(INITIAL_SEED_REGISTRATIONS));
        setRegistrations(INITIAL_SEED_REGISTRATIONS);
        onDataChange();
      }
    } catch (e) {
      console.error(e);
      setRegistrations([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all locally saved registrations?')) {
      localStorage.removeItem('technovaRegistrations');
      setRegistrations([]);
      onDataChange();
    }
  };

  const handleResetSeed = () => {
    localStorage.setItem('technovaRegistrations', JSON.stringify(INITIAL_SEED_REGISTRATIONS));
    setRegistrations(INITIAL_SEED_REGISTRATIONS);
    onDataChange();
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(registrations, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `technova-2026-registrations-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filteredList = registrations.filter((r) => {
    const matchesSearch =
      r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.regNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.passId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTrack = selectedTrackFilter === 'all' || r.track === selectedTrackFilter;

    return matchesSearch && matchesTrack;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
      <div className="bg-[#0a0e17] border-l border-white/10 w-full max-w-2xl h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xl font-display font-bold text-white">
                Delegate Registrations
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Local database preview ({registrations.length} stored records)
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Controls Bar */}
        <div className="p-4 sm:p-6 bg-black/30 border-b border-white/5 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by name, roll no, or pass ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJson}
              className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Export as JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
            <button
              onClick={handleResetSeed}
              className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset Sample Records"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Seed</span>
            </button>
            <button
              onClick={handleClearAll}
              className="px-3 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-medium border border-rose-500/20 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Clear Database"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Records List Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {filteredList.length === 0 ? (
            <div className="text-center py-16 text-slate-500 text-sm">
              No matching records found.
            </div>
          ) : (
            filteredList.map((item) => (
              <div
                key={item.id}
                className="bg-[#0f1422] border border-white/5 rounded-xl p-4 hover:border-emerald-500/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-bold text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {item.passId}
                    </span>
                    <span className="text-sm font-bold text-white">
                      {item.fullName}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      ({item.regNumber})
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 mt-1">
                    <span className="text-slate-300 font-medium">{item.track}</span>
                    <span className="mx-1.5 text-slate-600">·</span>
                    <span>{item.department} ({item.yearOfStudy})</span>
                  </div>

                  <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                    <span>{item.email}</span>
                    <span>·</span>
                    <span>{item.mobile}</span>
                    <span>·</span>
                    <span className="capitalize">{item.foodPreference}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onViewPass(item);
                    onClose();
                  }}
                  className="px-3 py-1.5 bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-400 rounded-lg text-xs font-semibold border border-emerald-400/30 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>View Pass</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-white/10 bg-black/40 text-center text-xs text-slate-500 font-mono">
          Sir Issac Newton College of Engineering & Technology · TechNova 2026
        </div>

      </div>
    </div>
  );
};
