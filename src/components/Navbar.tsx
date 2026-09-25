import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onRegisterClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRegisterClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Event', href: '#about' },
    { label: 'Tracks', href: '#tracks' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Venue', href: '#venue' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <nav
        className={`w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#06080d]/85 backdrop-blur-md border-white/10 shadow-lg shadow-black/40 py-3.5'
            : 'bg-transparent border-transparent py-5'
        }`}
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            className="flex items-center gap-2.5 text-white font-display text-xl font-bold tracking-tight hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm shadow-[0_0_12px_rgba(0,255,136,0.25)]">
              T
            </div>
            <span>TECHNOVA <span className="text-emerald-400 font-mono text-base font-normal">2026</span></span>
          </a>

          {/* Zone 2: 4–6 nav links, single-line typography */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-emerald-400 transition-colors py-1 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Zone 3: 1–2 primary actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onRegisterClick}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-all duration-200 shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:shadow-[0_0_25px_rgba(0,255,136,0.5)] cursor-pointer whitespace-nowrap active:scale-95"
            >
              <span>REGISTER FOR PASS</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white rounded-md hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-emerald-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a0e17]/95 backdrop-blur-xl border-b border-white/10 px-6 py-5 flex flex-col gap-3 shadow-2xl">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-200 hover:text-emerald-400 text-base font-medium py-2 flex items-center justify-between border-b border-white/5"
              >
                <span>{link.label}</span>
                <span className="text-xs text-slate-500 font-mono">→</span>
              </a>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRegisterClick();
                }}
                className="w-full py-3 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-md flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,136,0.3)] cursor-pointer"
              >
                <span>REGISTER FOR PASS</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
