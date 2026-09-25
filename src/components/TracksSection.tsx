import React, { useState } from 'react';
import { ArrowUpRight, Check, Users, MapPin, Clock, Trophy, Info } from 'lucide-react';
import { TRACKS } from '../data/eventData.ts';
import { Track } from '../types.ts';

interface TracksSectionProps {
  onSelectTrack: (trackTitle: string) => void;
}

export const TracksSection: React.FC<TracksSectionProps> = ({ onSelectTrack }) => {
  const [selectedRuleTrack, setSelectedRuleTrack] = useState<Track | null>(null);

  return (
    <section id="tracks" className="py-24 relative z-10 bg-[#06080d]/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-semibold tracking-widest text-emerald-400 uppercase block mb-3">
            FLAGSHIP ARENAS
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Choose your battleground.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            Test computational limits, engineer intelligent agents, and present working prototypes to win cash prizes and merit recognition.
          </p>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {TRACKS.map((track) => (
            <div
              key={track.id}
              className="bg-[#0b0f19] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1.5 shadow-xl group"
            >
              {/* Card Media Header */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                <img
                  src={track.image}
                  alt={track.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/40 to-transparent" />
                
                {/* Number Badge & Category */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono font-bold text-emerald-400">
                    TRACK {track.number}
                  </span>
                  <span className="px-3 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 text-xs font-medium text-slate-300">
                    {track.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                      {track.title}
                    </h3>
                  </div>
                  <div className="text-emerald-400 font-mono font-bold text-sm bg-black/60 px-2.5 py-1 rounded border border-emerald-500/30">
                    {track.prizePool}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-6">
                <div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">
                    {track.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 mb-6">
                    {track.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Track Meta Strip */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-lg bg-black/40 border border-white/5 text-[11px] font-mono text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="truncate">{track.teamSize}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-purple-400" />
                      <span className="truncate">{track.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span className="truncate">{track.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Controls */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => onSelectTrack(track.title)}
                    className="flex-1 py-3 px-4 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs rounded-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,255,136,0.25)] hover:shadow-[0_0_20px_rgba(0,255,136,0.45)] active:scale-95"
                  >
                    <span>SELECT TRACK & REGISTER</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setSelectedRuleTrack(track)}
                    className="p-3 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-lg border border-white/10 transition-colors cursor-pointer"
                    title="View Rules and Guidelines"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Rules & Guidelines Modal */}
        {selectedRuleTrack && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#0b0f19] border border-white/20 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div>
                  <span className="text-xs font-mono text-emerald-400 uppercase">
                    TRACK {selectedRuleTrack.number} RULES
                  </span>
                  <h4 className="text-xl font-display font-bold text-white mt-0.5">
                    {selectedRuleTrack.title}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedRuleTrack(null)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white text-lg cursor-pointer"
                >
                  ×
                </button>
              </div>

              <div className="space-y-3 mb-6">
                {selectedRuleTrack.rules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="font-mono text-emerald-400 text-xs mt-0.5">0{idx + 1}.</span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs text-emerald-300 mb-6 flex items-center gap-2">
                <Trophy className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Prize distribution will occur immediately at 04:15 PM during the Valedictory function.</span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const title = selectedRuleTrack.title;
                    setSelectedRuleTrack(null);
                    onSelectTrack(title);
                  }}
                  className="flex-1 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  REGISTER FOR THIS TRACK ↗
                </button>
                <button
                  onClick={() => setSelectedRuleTrack(null)}
                  className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold rounded-lg border border-white/10 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
