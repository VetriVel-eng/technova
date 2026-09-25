export interface Track {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
  teamSize: string;
  prizePool: string;
  venue: string;
  duration: string;
  highlights: string[];
  rules: string[];
}

export interface ScheduleItem {
  id: string;
  time: string;
  duration: string;
  title: string;
  category: string;
  venue: string;
  description: string;
  phase: 'morning' | 'afternoon';
}

export interface Registration {
  id: string;
  passId: string;
  fullName: string;
  regNumber: string;
  department: string;
  yearOfStudy: string;
  email: string;
  mobile: string;
  track: string;
  teamSize: string;
  foodPreference: 'veg' | 'non-veg';
  accommodationNeeded: boolean;
  timestamp: string;
  formattedDate: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
