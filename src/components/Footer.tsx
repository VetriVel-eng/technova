import React from 'react';
import { ArrowUp } from 'lucide-react';
import { EVENT_DETAILS } from '../data/eventData.ts';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Tracks', href: '#tracks' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Register', href: '#register' },
    { label: 'Venue', href: '#venue' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <footer className="border-t border-white/10 bg-[#040609] py-14 relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Top Footer */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
                T
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                TECHNOVA <span className="text-emerald-400 font-mono text-sm">2026</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2 max-w-sm">
              National Level Inter-College Technology Conclave & Prototype Symposium.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-emerald-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs border border-white/10 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            © 2026 TechNova. Department of CSE & AI.
          </div>
          <div>
            {EVENT_DETAILS.institution}, Nagapattinam
          </div>
        </div>

      </div>
    </footer>
  );
};
