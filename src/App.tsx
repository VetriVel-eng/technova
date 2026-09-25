/**
 * @license
 * TECHNOVA 2026 — Master Application Component
 * Inter-College Technology Event | Sir Issac Newton College of Engineering & Technology
 */

import React, { useState, useEffect } from 'react';
import { ParticleBackground } from './components/ParticleBackground.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { Ticker } from './components/Ticker.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { TracksSection } from './components/TracksSection.tsx';
import { ScheduleSection } from './components/ScheduleSection.tsx';
import { RegistrationSection } from './components/RegistrationSection.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { DigitalPassModal } from './components/DigitalPassModal.tsx';
import { AdminDrawer } from './components/AdminDrawer.tsx';
import { Registration } from './types.ts';
import { EVENT_DETAILS, INITIAL_SEED_REGISTRATIONS } from './data/eventData.ts';

export default function App() {
  const [selectedTrack, setSelectedTrack] = useState<string>('');
  const [activePass, setActivePass] = useState<Registration | null>(null);
  const [adminOpen, setAdminOpen] = useState<boolean>(false);
  const [totalRegistered, setTotalRegistered] = useState<number>(EVENT_DETAILS.baseRegisteredCount);

  // Sync count from LocalStorage
  const refreshRegistrationCount = () => {
    try {
      const stored = localStorage.getItem('technovaRegistrations');
      if (stored) {
        const list: Registration[] = JSON.parse(stored);
        setTotalRegistered(EVENT_DETAILS.baseRegisteredCount + list.length);
      } else {
        // Initialize default seed records on first visit
        localStorage.setItem('technovaRegistrations', JSON.stringify(INITIAL_SEED_REGISTRATIONS));
        setTotalRegistered(EVENT_DETAILS.baseRegisteredCount + INITIAL_SEED_REGISTRATIONS.length);
      }
    } catch {
      setTotalRegistered(EVENT_DETAILS.baseRegisteredCount);
    }
  };

  useEffect(() => {
    refreshRegistrationCount();
  }, []);

  const handleRegisterClick = () => {
    const el = document.getElementById('register');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreClick = () => {
    const el = document.getElementById('tracks');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTrack = (trackTitle: string) => {
    setSelectedTrack(trackTitle);
    const el = document.getElementById('register');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegisterSuccess = (newReg: Registration) => {
    setActivePass(newReg);
    refreshRegistrationCount();
  };

  return (
    <div className="min-h-screen bg-[#06080d] text-slate-100 relative selection:bg-emerald-400/20 selection:text-emerald-400">
      {/* Interactive Background Particles & Cyber Grid */}
      <ParticleBackground />

      {/* Main Glass Navigation Bar */}
      <Navbar onRegisterClick={handleRegisterClick} />

      {/* Main Sections Content */}
      <main className="relative z-10">
        <Hero
          onRegisterClick={handleRegisterClick}
          onExploreClick={handleExploreClick}
        />

        <Ticker />

        <AboutSection />

        <TracksSection onSelectTrack={handleSelectTrack} />

        <ScheduleSection />

        <RegistrationSection
          selectedTrack={selectedTrack}
          onRegisterSuccess={handleRegisterSuccess}
          onOpenAdmin={() => setAdminOpen(true)}
          totalRegistered={totalRegistered}
        />

        <FaqSection />

        <ContactSection onRegisterClick={handleRegisterClick} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Digital Pass Modal */}
      <DigitalPassModal
        registration={activePass}
        onClose={() => setActivePass(null)}
      />

      {/* Admin / Stored Registrations Reviewer Drawer */}
      <AdminDrawer
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        onViewPass={(reg) => setActivePass(reg)}
        onDataChange={refreshRegistrationCount}
      />
    </div>
  );
}
