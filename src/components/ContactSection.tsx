import React from 'react';
import { MapPin, Mail, Phone, Calendar, ArrowUpRight, Navigation } from 'lucide-react';
import { EVENT_DETAILS } from '../data/eventData.ts';

interface ContactSectionProps {
  onRegisterClick: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onRegisterClick }) => {
  return (
    <section id="venue" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Contact Layout */}
        <div className="bg-[#0b0f19] border border-white/10 rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Venue & Contact Info */}
            <div className="lg:col-span-7">
              <span className="text-xs font-mono font-semibold tracking-widest text-emerald-400 uppercase block mb-3">
                CAMPUS & COORDINATION
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                Connect with the TechNova team.
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
                Reach out to the staff conveners and student organizing committee for campus route assistance, accommodation requests, or participation queries.
              </p>

              <div className="mt-8 space-y-5">
                {/* Venue Item */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-emerald-400 uppercase font-semibold">VENUE</div>
                    <div className="text-sm sm:text-base font-semibold text-white mt-0.5">
                      {EVENT_DETAILS.institution}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {EVENT_DETAILS.location}
                    </div>
                  </div>
                </div>

                {/* Email Item */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-cyan-400 uppercase font-semibold">OFFICIAL EMAIL</div>
                    <a
                      href={`mailto:${EVENT_DETAILS.email}`}
                      className="text-sm sm:text-base font-semibold text-white hover:text-cyan-400 transition-colors block mt-0.5"
                    >
                      {EVENT_DETAILS.email}
                    </a>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Responses provided within 6 business hours
                    </div>
                  </div>
                </div>

                {/* Date & Helpline Item */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-purple-400 uppercase font-semibold">STUDENT HELPDESK & CONVENERS</div>
                    <div className="text-sm sm:text-base font-semibold text-white mt-0.5">
                      {EVENT_DETAILS.phone}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Active 08:30 AM – 06:00 PM IST
                    </div>
                  </div>
                </div>
              </div>

              {/* Transit Note */}
              <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                <Navigation className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white">Transit Access:</strong> Situated directly on Nagapattinam ECR Highway. Regular college transit buses will operate from Nagapattinam Junction Railway Station and Central Bus Stand on event morning.
                </p>
              </div>
            </div>

            {/* Right Column: CTA Panel */}
            <div className="lg:col-span-5 bg-gradient-to-br from-emerald-500/10 via-[#0a0e17] to-cyan-500/10 border border-white/10 rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(0,255,136,0.3)]">
                <Calendar className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest font-semibold">
                REGISTRATIONS CLOSING SOON
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-2">
                Ready to compete with top minds?
              </h3>
              <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed">
                Confirm your participation slot today and download your instant digital entry badge.
              </p>

              <button
                onClick={onRegisterClick}
                className="mt-6 w-full py-3.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-[0_0_20px_rgba(0,255,136,0.3)] cursor-pointer active:scale-95"
              >
                <span>GET DELEGATE PASS NOW</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
