import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowDown, Cpu, Terminal, Trophy } from 'lucide-react';
import { EVENT_DETAILS } from '../data/eventData.ts';

interface HeroProps {
  onRegisterClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRegisterClick, onExploreClick }) => {
  // Live Countdown calculation
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = EVENT_DETAILS.targetTimestamp - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  // 3D Tilt Effect on mouse movement
  const visualRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!visualRef.current) return;
    const rect = visualRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const tiltX = (y / (rect.height / 2)) * -10;
    const tiltY = (x / (rect.width / 2)) * 10;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="home" className="relative min-h-[92vh] pt-32 pb-16 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines, Value Prop, Countdown & CTAs */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Kicker with live pulsing dot */}
            <div className="inline-flex items-center gap-2.5 text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#00ff88] animate-ping" />
              <span>INTER-COLLEGE TECHNOLOGY CONCLAVE · 2026</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.05]">
              TECHNOVA{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                2026
              </span>
            </h1>

            {/* Tagline */}
            <div className="text-lg sm:text-xl font-display font-bold text-slate-300 tracking-wide uppercase">
              “{EVENT_DETAILS.tagline}”
            </div>

            {/* Prose description */}
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl">
              A high-voltage inter-college technology summit hosted at{' '}
              <span className="text-slate-200 font-semibold">{EVENT_DETAILS.institution}</span>, Nagapattinam.
              Where 500+ undergraduate and postgraduate engineering minds compete in algorithms, AI architectures,
              hardware prototypes, and cybersecurity.
            </p>

            {/* Live Countdown Timer Bento */}
            <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4 max-w-lg backdrop-blur-sm shadow-inner">
              <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest mb-2 flex items-center justify-between">
                <span>CONCLAVE COMMENCES IN</span>
                <span className="text-slate-400 font-normal">24 APRIL 2026 · 09:00 AM IST</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-black/40 rounded-lg py-2 border border-white/5">
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-white tabular-nums">
                    {String(timeLeft.days).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">DAYS</div>
                </div>
                <div className="bg-black/40 rounded-lg py-2 border border-white/5">
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400 tabular-nums">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">HOURS</div>
                </div>
                <div className="bg-black/40 rounded-lg py-2 border border-white/5">
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-cyan-400 tabular-nums">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">MINS</div>
                </div>
                <div className="bg-black/40 rounded-lg py-2 border border-white/5">
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-purple-400 tabular-nums">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">SECS</div>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex items-center gap-4 flex-wrap pt-2">
              <button
                onClick={onRegisterClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm rounded-lg transition-all duration-200 shadow-[0_0_25px_rgba(0,255,136,0.35)] hover:shadow-[0_0_35px_rgba(0,255,136,0.55)] cursor-pointer active:scale-95"
              >
                <span>REGISTER FOR PASS</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm rounded-lg border border-white/10 transition-all duration-200 backdrop-blur-sm cursor-pointer hover:border-white/20 active:scale-95"
              >
                <span>EXPLORE ARENAS</span>
                <ArrowDown className="w-4 h-4 text-emerald-400" />
              </button>
            </div>

            {/* Unboxed Clean Metadata Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 mt-2 text-xs">
              <div>
                <span className="text-slate-400 font-mono block text-[11px]">DATE</span>
                <span className="font-semibold text-white mt-0.5 block tabular-nums">24 APRIL 2026</span>
              </div>
              <div>
                <span className="text-slate-400 font-mono block text-[11px]">VENUE</span>
                <span className="font-semibold text-white mt-0.5 block">SINCET CAMPUS</span>
              </div>
              <div>
                <span className="text-slate-400 font-mono block text-[11px]">LOCATION</span>
                <span className="font-semibold text-white mt-0.5 block">NAGAPATTINAM</span>
              </div>
              <div>
                <span className="text-slate-400 font-mono block text-[11px]">PRIZE POOL</span>
                <span className="font-semibold text-emerald-400 mt-0.5 block font-mono">₹50,000 CASH</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Interactive Cyber Visual */}
          <div
            ref={visualRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-5 relative w-full aspect-square max-w-[440px] mx-auto flex items-center justify-center perspective-[1000px]"
          >
            <div
              className="relative w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Concentric Orbital Rings */}
              <div className="absolute w-[200px] h-[200px] rounded-full border border-dashed border-emerald-400/40 animate-spin-clockwise">
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_12px_#00ff88]" />
              </div>

              <div className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-cyan-400/30 animate-spin-counter">
                <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#00d9ff]" />
              </div>

              <div className="absolute w-[360px] h-[360px] rounded-full border border-dotted border-purple-400/25 animate-spin-clockwise" />

              {/* Central Glowing Core Orb */}
              <div className="relative w-36 h-36 rounded-full bg-gradient-to-tr from-emerald-500 via-cyan-500 to-purple-600 shadow-[0_0_60px_rgba(0,255,136,0.5),0_0_100px_rgba(0,217,255,0.3)] flex items-center justify-center animate-pulse-glow z-10">
                <div className="text-white font-display font-black text-4xl tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
                  TN
                </div>
              </div>

              {/* Floating Glassmorphism Cards */}
              <div className="absolute top-[8%] -left-[4%] bg-slate-900/85 backdrop-blur-md border border-white/10 border-l-4 border-l-emerald-400 rounded-lg px-3.5 py-2.5 flex items-center gap-2.5 shadow-xl z-20 animate-float-gentle">
                <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-emerald-400 font-semibold">TRACK 01</div>
                  <div className="text-xs font-semibold text-white">AI & Machine Learning</div>
                </div>
              </div>

              <div
                className="absolute bottom-[10%] -right-[4%] bg-slate-900/85 backdrop-blur-md border border-white/10 border-l-4 border-l-cyan-400 rounded-lg px-3.5 py-2.5 flex items-center gap-2.5 shadow-xl z-20"
                style={{ animation: 'float-gentle 6s ease-in-out infinite' }}
              >
                <div className="p-1.5 rounded bg-cyan-500/10 text-cyan-400">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-cyan-400 font-semibold">TRACK 02</div>
                  <div className="text-xs font-semibold text-white">Coding Arena Sprint</div>
                </div>
              </div>

              <div
                className="absolute top-[68%] -left-[10%] bg-slate-900/85 backdrop-blur-md border border-white/10 border-l-4 border-l-purple-400 rounded-lg px-3.5 py-2.5 flex items-center gap-2.5 shadow-xl z-20"
                style={{ animation: 'float-gentle 7s ease-in-out infinite' }}
              >
                <div className="p-1.5 rounded bg-purple-500/10 text-purple-400">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-purple-400 font-semibold">CHAMPIONSHIP</div>
                  <div className="text-xs font-semibold text-white">₹50,000 Cash Pool</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
