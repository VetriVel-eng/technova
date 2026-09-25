import React, { useState } from 'react';
import { SCHEDULE } from '../data/eventData.ts';

export const ScheduleSection: React.FC = () => {
  const [phaseFilter, setPhaseFilter] = useState<'all' | 'morning' | 'afternoon'>('all');

  const filteredSchedule = SCHEDULE.filter((item) => {
    if (phaseFilter === 'all') return true;
    return item.phase === phaseFilter;
  });

  return (
    <section id="schedule" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono font-semibold tracking-widest text-emerald-400 uppercase block mb-3">
              TIMELINE & SESSIONS
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              One day. Infinite impact.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              From morning algorithmic sprints to afternoon prototype evaluations and valedictory awards.
            </p>
          </div>

          {/* Interactive Phase Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-lg self-start md:self-auto">
            <button
              onClick={() => setPhaseFilter('all')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                phaseFilter === 'all'
                  ? 'bg-emerald-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Sessions
            </button>
            <button
              onClick={() => setPhaseFilter('morning')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                phaseFilter === 'morning'
                  ? 'bg-emerald-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Morning Phase
            </button>
            <button
              onClick={() => setPhaseFilter('afternoon')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                phaseFilter === 'afternoon'
                  ? 'bg-emerald-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Afternoon Phase
            </button>
          </div>
        </div>

        {/* Timeline Sequence */}
        <div className="max-w-4xl mx-auto relative before:absolute before:top-4 before:bottom-4 before:left-4 sm:before:left-[118px] before:w-[2px] before:bg-gradient-to-b before:from-emerald-400 before:via-cyan-400 before:to-purple-500 before:opacity-30">
          <div className="space-y-6">
            {filteredSchedule.map((item) => (
              <div
                key={item.id}
                className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-10 pl-10 sm:pl-0 group"
              >
                {/* Time Display (Desktop) */}
                <div className="sm:w-24 shrink-0 text-left sm:text-right pt-2.5">
                  <div className="text-sm sm:text-base font-mono font-bold text-white tabular-nums">
                    {item.time}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500">
                    {item.duration}
                  </div>
                </div>

                {/* Timeline Dot Indicator */}
                <div className="absolute left-2.5 sm:left-[112px] top-4 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#06080d] border-2 border-emerald-400 shadow-[0_0_10px_#00ff88] group-hover:scale-125 transition-transform" />

                {/* Session Card */}
                <div className="flex-1 bg-[#0b0f19] border border-white/10 rounded-xl p-5 sm:p-6 hover:border-emerald-500/30 transition-all duration-300 hover:bg-[#101625] w-full shadow-lg">
                  <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                    <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-emerald-400">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                      {item.venue}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
