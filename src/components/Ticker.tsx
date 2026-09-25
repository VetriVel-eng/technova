import React from 'react';

export const Ticker: React.FC = () => {
  const items = [
    'INNOVATE',
    'CREATE',
    'COMPETE',
    'CONNECT',
    'TECHNOVA 2026',
    'SIR ISSAC NEWTON CET',
    'NAGAPATTINAM',
    '₹50,000 PRIZE POOL',
    'BUILD THE NEXT BIG THING',
  ];

  return (
    <div className="w-full bg-[#0b0f19] border-y border-white/10 py-3.5 overflow-hidden relative z-20">
      <div className="flex w-max animate-ticker">
        {/* First set */}
        <div className="flex items-center gap-8 pr-8 whitespace-nowrap text-sm font-display font-bold tracking-wider text-slate-200 uppercase">
          {items.map((item, idx) => (
            <React.Fragment key={`ticker-1-${idx}`}>
              <span>{item}</span>
              <span className="text-emerald-400 font-mono text-base shadow-[0_0_8px_#00ff88]">✦</span>
            </React.Fragment>
          ))}
        </div>
        {/* Duplicate set for seamless looping */}
        <div className="flex items-center gap-8 pr-8 whitespace-nowrap text-sm font-display font-bold tracking-wider text-slate-200 uppercase">
          {items.map((item, idx) => (
            <React.Fragment key={`ticker-2-${idx}`}>
              <span>{item}</span>
              <span className="text-emerald-400 font-mono text-base shadow-[0_0_8px_#00ff88]">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
