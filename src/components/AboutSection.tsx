import React from 'react';
import { Award, Users, Trophy, Layers, CheckCircle2 } from 'lucide-react';
import campusInnovationImg from '../assets/images/technova_campus_innovation_1790313640871.jpg';

export const AboutSection: React.FC = () => {
  const domains = [
    'Artificial Intelligence',
    'Machine Learning',
    'Competitive Coding',
    'Cybersecurity & CTF',
    'IoT & Embedded Hardware',
    'Full-Stack Web Engineering',
    'Startup Ideation',
  ];

  const stats = [
    {
      value: '08',
      label: 'FLAGSHIP ARENAS',
      sub: 'Competitive sprints & workshops',
      icon: Layers,
      color: 'text-emerald-400',
      border: 'border-emerald-500/20',
    },
    {
      value: '500+',
      label: 'STUDENT DELEGATES',
      sub: 'From 40+ engineering colleges',
      icon: Users,
      color: 'text-cyan-400',
      border: 'border-cyan-500/20',
    },
    {
      value: '20+',
      label: 'INDUSTRY MENTORS',
      sub: 'Tech leads & university professors',
      icon: Award,
      color: 'text-purple-400',
      border: 'border-purple-500/20',
    },
    {
      value: '₹50K',
      label: 'CASH AWARDS',
      sub: 'Cash prizes, trophies & certificates',
      icon: Trophy,
      color: 'text-amber-400',
      border: 'border-amber-500/20',
    },
  ];

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Top Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono font-semibold tracking-widest text-emerald-400 uppercase block mb-3">
            VISION & PURPOSE
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            Where ideas transform into functional engineering prototypes.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4 leading-relaxed">
            <strong className="text-white">TechNova 2026</strong> is the premier national-level technical symposium hosted by the Department of Computer Science & Engineering and Artificial Intelligence at Sir Issac Newton College of Engineering & Technology, Nagapattinam.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Campus Innovation Feature Card with generated image */}
          <div className="lg:col-span-7 bg-[#0b0f19] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-emerald-500/40 transition-all duration-300">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
              <img
                src={campusInnovationImg}
                alt="Sir Issac Newton College of Engineering campus innovation pavilion"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-black/30" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="bg-black/70 backdrop-blur-md px-3 py-1 rounded border border-white/10">
                  INNOVATION PAVILION · SINCET
                </span>
                <span className="text-emerald-400 font-semibold">NAGAPATTINAM, TN</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col gap-4">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                World-Class Infrastructure & Laboratory Facilities
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Equipped with high-performance computing clusters, IoT embedded system kits, gigabit fiber network, and spacious seminar auditoriums to give collegiate participants an unforgettable competition experience.
              </p>

              {/* Engineering domains tag list */}
              <div className="pt-2">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5">
                  COVERED DOMAINS
                </div>
                <div className="flex flex-wrap gap-2">
                  {domains.map((dom) => (
                    <div
                      key={dom}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-medium text-slate-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>{dom}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Key Metric Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {stats.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className={`bg-[#0b0f19] border ${s.border} rounded-2xl p-6 flex items-start gap-5 hover:bg-[#111624] transition-all duration-300 hover:-translate-y-1 shadow-lg`}
                >
                  <div className={`p-3 rounded-xl bg-white/5 ${s.color} shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className={`text-3xl font-display font-extrabold ${s.color} tabular-nums`}>
                      {s.value}
                    </div>
                    <div className="text-xs font-mono font-semibold tracking-wider text-slate-200 uppercase mt-1">
                      {s.label}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {s.sub}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
