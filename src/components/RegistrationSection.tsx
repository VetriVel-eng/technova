import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ShieldCheck, Database, Loader2 } from 'lucide-react';
import { Registration } from '../types.ts';
import { EVENT_DETAILS, TRACKS } from '../data/eventData.ts';

interface RegistrationSectionProps {
  selectedTrack: string;
  onRegisterSuccess: (reg: Registration) => void;
  onOpenAdmin: () => void;
  totalRegistered: number;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  selectedTrack,
  onRegisterSuccess,
  onOpenAdmin,
  totalRegistered,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    regNumber: '',
    department: '',
    yearOfStudy: '',
    email: '',
    mobile: '',
    track: '',
    teamSize: 'Solo (Individual)',
    foodPreference: 'veg' as 'veg' | 'non-veg',
    accommodationNeeded: false,
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync track when user selects from Tracks section
  useEffect(() => {
    if (selectedTrack) {
      setFormData((prev) => ({ ...prev, track: selectedTrack }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next.track;
        return next;
      });
    }
  }, [selectedTrack]);

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Participant name is required.';
        if (value.trim().length < 2) return 'Name must be at least 2 characters.';
        if (!/^[a-zA-Z\s.]+$/.test(value)) return 'Only letters, spaces, and dots are permitted.';
        return '';
      case 'regNumber':
        if (!value.trim()) return 'Register number / Roll number is required.';
        if (value.trim().length < 3) return 'Enter a valid register number.';
        return '';
      case 'department':
        if (!value.trim()) return 'Department / College name is required.';
        return '';
      case 'yearOfStudy':
        if (!value) return 'Please select your year of study.';
        return '';
      case 'email':
        if (!value.trim()) return 'Email address is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address (e.g. name@college.edu).';
        return '';
      case 'mobile':
        if (!value.trim()) return 'Mobile number is required.';
        if (!/^[6-9]\d{9}$/.test(value.trim())) return 'Enter a valid 10-digit Indian mobile starting with 6-9.';
        return '';
      case 'track':
        if (!value) return 'Please select an event track or workshop.';
        return '';
      case 'agreeTerms':
        if (!value) return 'You must agree to participate in TechNova 2026.';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const val = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));

    const errorMsg = validateField(name, val);
    setErrors((prev) => {
      const next = { ...prev };
      if (errorMsg) {
        next[name] = errorMsg;
      } else {
        delete next[name];
      }
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      const msg = validateField(key, (formData as any)[key]);
      if (msg) newErrors[key] = msg;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Focus first error field
      const firstKey = Object.keys(newErrors)[0];
      const el = document.getElementById(firstKey);
      el?.focus();
      return;
    }

    setIsSubmitting(true);

    // Generate unique pass ID
    const randomHex = Math.floor(Math.random() * 0xffff)
      .toString(16)
      .toUpperCase()
      .padStart(4, '0');
    const passId = `TN26-${randomHex}`;

    const newRegistration: Registration = {
      id: `reg-${Date.now()}`,
      passId,
      fullName: formData.fullName.trim(),
      regNumber: formData.regNumber.trim(),
      department: formData.department.trim(),
      yearOfStudy: formData.yearOfStudy,
      email: formData.email.trim(),
      mobile: formData.mobile.trim(),
      track: formData.track,
      teamSize: formData.teamSize,
      foodPreference: formData.foodPreference,
      accommodationNeeded: formData.accommodationNeeded,
      timestamp: new Date().toISOString(),
      formattedDate: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setTimeout(() => {
      // Save into LocalStorage
      try {
        const stored = localStorage.getItem('technovaRegistrations');
        const list: Registration[] = stored ? JSON.parse(stored) : [];
        list.unshift(newRegistration);
        localStorage.setItem('technovaRegistrations', JSON.stringify(list));
      } catch (err) {
        console.error('Storage error:', err);
      }

      setIsSubmitting(false);
      onRegisterSuccess(newRegistration);

      // Reset form
      setFormData({
        fullName: '',
        regNumber: '',
        department: '',
        yearOfStudy: '',
        email: '',
        mobile: '',
        track: '',
        teamSize: 'Solo (Individual)',
        foodPreference: 'veg',
        accommodationNeeded: false,
        agreeTerms: false,
      });
      setErrors({});
    }, 600);
  };

  return (
    <section id="register" className="py-24 relative z-10">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* Registration Card Wrapper */}
        <div className="bg-[#0b0f19]/90 border border-white/10 rounded-3xl p-6 sm:p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-500" />

          {/* Form Header */}
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono font-semibold tracking-widest text-emerald-400 uppercase block mb-2.5">
              OFFICIAL REGISTRATION PORTAL
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Claim your delegate pass.
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Free participation kit, event ID lanyard, delegate lunch, and Anna University recognized certificates provided to all attendees.
            </p>

            {/* Slots Counter & Admin Trigger */}
            <div className="inline-flex items-center gap-3 mt-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
              <span>
                Slots Claimed:{' '}
                <strong className="text-emerald-400 font-mono font-bold">
                  {totalRegistered}
                </strong>{' '}
                / {EVENT_DETAILS.totalSlots}
              </span>
              <span className="text-slate-600">·</span>
              <button
                type="button"
                onClick={onOpenAdmin}
                className="text-cyan-400 hover:text-cyan-300 underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Database className="w-3 h-3" />
                <span>Admin Records Preview</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            
            {/* Row 1: Full Name & Register Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="fullName" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Participant Full Name <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Vigneshwaran K"
                  className={`w-full px-4 py-3 rounded-lg bg-black/50 border text-white text-sm placeholder:text-slate-600 focus:outline-none transition-colors ${
                    errors.fullName ? 'border-rose-500 focus:border-rose-500' : 'border-white/10 focus:border-emerald-400'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-xs text-rose-400 mt-1 font-mono">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="regNumber" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Register Number / Student ID <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  id="regNumber"
                  name="regNumber"
                  value={formData.regNumber}
                  onChange={handleChange}
                  placeholder="e.g. 814321104057"
                  className={`w-full px-4 py-3 rounded-lg bg-black/50 border text-white text-sm placeholder:text-slate-600 focus:outline-none transition-colors ${
                    errors.regNumber ? 'border-rose-500 focus:border-rose-500' : 'border-white/10 focus:border-emerald-400'
                  }`}
                />
                {errors.regNumber && (
                  <p className="text-xs text-rose-400 mt-1 font-mono">{errors.regNumber}</p>
                )}
              </div>
            </div>

            {/* Row 2: Department & Year of Study */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="department" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Department & College Name <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="e.g. Artificial Intelligence & Data Science"
                  className={`w-full px-4 py-3 rounded-lg bg-black/50 border text-white text-sm placeholder:text-slate-600 focus:outline-none transition-colors ${
                    errors.department ? 'border-rose-500 focus:border-rose-500' : 'border-white/10 focus:border-emerald-400'
                  }`}
                />
                {errors.department && (
                  <p className="text-xs text-rose-400 mt-1 font-mono">{errors.department}</p>
                )}
              </div>

              <div>
                <label htmlFor="yearOfStudy" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Year of Study <span className="text-emerald-400">*</span>
                </label>
                <select
                  id="yearOfStudy"
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-black/50 border text-white text-sm focus:outline-none transition-colors cursor-pointer ${
                    errors.yearOfStudy ? 'border-rose-500 focus:border-rose-500' : 'border-white/10 focus:border-emerald-400'
                  }`}
                >
                  <option value="" className="bg-[#0b0f19]">Select current academic year</option>
                  <option value="1st Year" className="bg-[#0b0f19]">1st Year (Fresher)</option>
                  <option value="2nd Year" className="bg-[#0b0f19]">2nd Year (Sophomore)</option>
                  <option value="3rd Year" className="bg-[#0b0f19]">3rd Year (Pre-Final)</option>
                  <option value="Final Year" className="bg-[#0b0f19]">Final Year (Senior)</option>
                  <option value="Post-Graduate" className="bg-[#0b0f19]">Post-Graduate (M.E. / M.Tech / MCA)</option>
                </select>
                {errors.yearOfStudy && (
                  <p className="text-xs text-rose-400 mt-1 font-mono">{errors.yearOfStudy}</p>
                )}
              </div>
            </div>

            {/* Row 3: Email & Mobile Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@college.edu"
                  className={`w-full px-4 py-3 rounded-lg bg-black/50 border text-white text-sm placeholder:text-slate-600 focus:outline-none transition-colors ${
                    errors.email ? 'border-rose-500 focus:border-rose-500' : 'border-white/10 focus:border-emerald-400'
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-rose-400 mt-1 font-mono">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="mobile" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Mobile Number (10 Digits) <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="9876543210"
                  maxLength={10}
                  className={`w-full px-4 py-3 rounded-lg bg-black/50 border text-white text-sm placeholder:text-slate-600 focus:outline-none transition-colors ${
                    errors.mobile ? 'border-rose-500 focus:border-rose-500' : 'border-white/10 focus:border-emerald-400'
                  }`}
                />
                {errors.mobile && (
                  <p className="text-xs text-rose-400 mt-1 font-mono">{errors.mobile}</p>
                )}
              </div>
            </div>

            {/* Row 4: Event Track Selection & Team Mode */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="track" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Flagship Event Track <span className="text-emerald-400">*</span>
                </label>
                <select
                  id="track"
                  name="track"
                  value={formData.track}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-black/50 border text-white text-sm focus:outline-none transition-colors cursor-pointer ${
                    errors.track ? 'border-rose-500 focus:border-rose-500' : 'border-white/10 focus:border-emerald-400'
                  }`}
                >
                  <option value="" className="bg-[#0b0f19]">Select your primary competition arena</option>
                  {TRACKS.map((t) => (
                    <option key={t.id} value={t.title} className="bg-[#0b0f19]">
                      {t.title} ({t.category})
                    </option>
                  ))}
                </select>
                {errors.track && (
                  <p className="text-xs text-rose-400 mt-1 font-mono">{errors.track}</p>
                )}
              </div>

              <div>
                <label htmlFor="teamSize" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Participation Mode
                </label>
                <select
                  id="teamSize"
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white text-sm focus:border-emerald-400 focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="Solo (Individual)" className="bg-[#0b0f19]">Solo (Individual Participant)</option>
                  <option value="Team of 2" className="bg-[#0b0f19]">Team of 2 Members</option>
                  <option value="Team of 3" className="bg-[#0b0f19]">Team of 3 Members</option>
                  <option value="Team of 4" className="bg-[#0b0f19]">Team of 4 Members</option>
                </select>
              </div>
            </div>

            {/* Row 5: Food preference & Accommodation Checkbox */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div>
                <span className="block text-xs font-semibold text-slate-300 mb-2">
                  Complimentary Delegate Lunch Preference
                </span>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="radio"
                      name="foodPreference"
                      value="veg"
                      checked={formData.foodPreference === 'veg'}
                      onChange={() => setFormData((p) => ({ ...p, foodPreference: 'veg' }))}
                      className="accent-emerald-400"
                    />
                    <span>Vegetarian Buffet</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="radio"
                      name="foodPreference"
                      value="non-veg"
                      checked={formData.foodPreference === 'non-veg'}
                      onChange={() => setFormData((p) => ({ ...p, foodPreference: 'non-veg' }))}
                      className="accent-emerald-400"
                    />
                    <span>Non-Vegetarian Buffet</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center">
                <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    name="accommodationNeeded"
                    checked={formData.accommodationNeeded}
                    onChange={handleChange}
                    className="accent-emerald-400 mt-0.5 rounded"
                  />
                  <span>
                    Request outstation hostel accommodation support (for travel outside Nagapattinam)
                  </span>
                </label>
              </div>
            </div>

            {/* Terms and Confirmation */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="accent-emerald-400 w-4 h-4 rounded mt-0.5 shrink-0"
                />
                <span className="text-xs text-slate-300 leading-relaxed">
                  I confirm that all entered academic information is correct and I agree to abide by the event rules and ethical conduct standards of Sir Issac Newton College of Engineering & Technology.
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-xs text-rose-400 mt-1 font-mono">{errors.agreeTerms}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,255,136,0.35)] hover:shadow-[0_0_35px_rgba(0,255,136,0.55)] cursor-pointer active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>ISSUING OFFICIAL PASS...</span>
                </>
              ) : (
                <>
                  <span>CONFIRM & GENERATE DIGITAL PASS</span>
                  <ArrowUpRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Instant digital pass generation with simulated verification QR code</span>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};
