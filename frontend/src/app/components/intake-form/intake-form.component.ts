import { Component } from '@angular/core';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface CeremonyEvent {
  type: string;
  name: string;
  daysBefore: number;
  included: boolean;
  required: boolean;
}

interface FormState {
  p1name: string;
  p2name: string;
  email: string;
  phone: string;
  community: string;
  city: string;
  weddingDate: string;
  guests: string;
  venueType: string;
  budget: number;
  styles: Set<string>;
  services: Set<string>;
  events: CeremonyEvent[];
  notes: string;
  referral: string;
}

// ─────────────────────────────────────────────
// Community → ceremony event templates
// ─────────────────────────────────────────────

const COMMUNITY_EVENTS: Record<string, CeremonyEvent[]> = {
  Punjabi: [
    { type: 'roka', name: 'Roka', daysBefore: -60, included: true, required: false },
    { type: 'engagement', name: 'Engagement', daysBefore: -30, included: true, required: false },
    { type: 'mehendi', name: 'Mehendi', daysBefore: -2, included: true, required: false },
    { type: 'haldi', name: 'Haldi', daysBefore: -1, included: true, required: false },
    { type: 'sangeet', name: 'Sangeet', daysBefore: -1, included: true, required: false },
    { type: 'wedding', name: 'Wedding', daysBefore: 0, included: true, required: true },
    { type: 'reception', name: 'Reception', daysBefore: 1, included: true, required: false },
  ],
  Telugu: [
    { type: 'engagement', name: 'Nichayathartham', daysBefore: -30, included: true, required: false },
    { type: 'mehendi', name: 'Mehendi', daysBefore: -2, included: true, required: false },
    { type: 'haldi', name: 'Mangala Snanam', daysBefore: -1, included: true, required: false },
    { type: 'nalangu', name: 'Nalangu', daysBefore: -1, included: true, required: false },
    { type: 'wedding', name: 'Wedding', daysBefore: 0, included: true, required: true },
    { type: 'reception', name: 'Reception', daysBefore: 1, included: true, required: false },
  ],
  Tamil: [
    { type: 'engagement', name: 'Nichayathartham', daysBefore: -30, included: true, required: false },
    { type: 'naandi', name: 'Naandi', daysBefore: -1, included: true, required: false },
    { type: 'wedding', name: 'Wedding', daysBefore: 0, included: true, required: true },
    { type: 'reception', name: 'Reception', daysBefore: 1, included: true, required: false },
  ],
  Kannada: [
    { type: 'engagement', name: 'Engagement', daysBefore: -30, included: true, required: false },
    { type: 'mehendi', name: 'Mehendi', daysBefore: -2, included: true, required: false },
    { type: 'haldi', name: 'Haldi', daysBefore: -1, included: true, required: false },
    { type: 'sangeet', name: 'Sangeet', daysBefore: -1, included: true, required: false },
    { type: 'wedding', name: 'Wedding', daysBefore: 0, included: true, required: true },
    { type: 'reception', name: 'Reception', daysBefore: 1, included: true, required: false },
  ],
  Malayali: [
    { type: 'engagement', name: 'Engagement', daysBefore: -30, included: true, required: false },
    { type: 'mehendi', name: 'Mehendi', daysBefore: -1, included: true, required: false },
    { type: 'wedding', name: 'Wedding', daysBefore: 0, included: true, required: true },
    { type: 'reception', name: 'Reception', daysBefore: 1, included: true, required: false },
  ],
  Marathi: [
    { type: 'engagement', name: 'Sakhar Puda', daysBefore: -30, included: true, required: false },
    { type: 'mehendi', name: 'Mehendi', daysBefore: -1, included: true, required: false },
    { type: 'haldi', name: 'Haldi', daysBefore: -1, included: true, required: false },
    { type: 'sangeet', name: 'Sangeet', daysBefore: -1, included: true, required: false },
    { type: 'wedding', name: 'Wedding', daysBefore: 0, included: true, required: true },
    { type: 'reception', name: 'Reception', daysBefore: 1, included: true, required: false },
  ],
  Gujarati: [
    { type: 'engagement', name: 'Engagement', daysBefore: -30, included: true, required: false },
    { type: 'garba', name: 'Garba Night', daysBefore: -1, included: true, required: false },
    { type: 'mehendi', name: 'Mehendi', daysBefore: -1, included: true, required: false },
    { type: 'haldi', name: 'Mandap Mahurat', daysBefore: -1, included: true, required: false },
    { type: 'wedding', name: 'Wedding', daysBefore: 0, included: true, required: true },
    { type: 'reception', name: 'Reception', daysBefore: 1, included: true, required: false },
  ],
  Bengali: [
    { type: 'engagement', name: 'Engagement', daysBefore: -30, included: true, required: false },
    { type: 'aiburobhat', name: 'Aiburobhat', daysBefore: -1, included: true, required: false },
    { type: 'haldi', name: 'Gaye Holud', daysBefore: -1, included: true, required: false },
    { type: 'wedding', name: 'Wedding', daysBefore: 0, included: true, required: true },
    { type: 'reception', name: 'Bou Bhat', daysBefore: 1, included: true, required: false },
  ],
  Rajasthani: [
    { type: 'engagement', name: 'Engagement', daysBefore: -30, included: true, required: false },
    { type: 'mehendi', name: 'Mehendi', daysBefore: -2, included: true, required: false },
    { type: 'haldi', name: 'Haldi', daysBefore: -1, included: true, required: false },
    { type: 'sangeet', name: 'Sangeet', daysBefore: -1, included: true, required: false },
    { type: 'wedding', name: 'Wedding', daysBefore: 0, included: true, required: true },
    { type: 'reception', name: 'Reception', daysBefore: 1, included: true, required: false },
  ],
  Marwari: [
    { type: 'engagement', name: 'Engagement', daysBefore: -30, included: true, required: false },
    { type: 'mehendi', name: 'Mehendi', daysBefore: -2, included: true, required: false },
    { type: 'haldi', name: 'Pithi', daysBefore: -1, included: true, required: false },
    { type: 'sangeet', name: 'Sangeet', daysBefore: -1, included: true, required: false },
    { type: 'wedding', name: 'Wedding', daysBefore: 0, included: true, required: true },
    { type: 'reception', name: 'Reception', daysBefore: 1, included: true, required: false },
  ],
  Muslim: [
    { type: 'mehendi', name: 'Mehndi', daysBefore: -2, included: true, required: false },
    { type: 'haldi', name: 'Manjha', daysBefore: -1, included: true, required: false },
    { type: 'nikah', name: 'Nikah', daysBefore: 0, included: true, required: true },
    { type: 'walima', name: 'Walima', daysBefore: 1, included: true, required: false },
  ],
  Christian: [
    { type: 'engagement', name: 'Engagement', daysBefore: -30, included: true, required: false },
    { type: 'bridal', name: 'Bridal Shower', daysBefore: -7, included: true, required: false },
    { type: 'rehearsal', name: 'Rehearsal Dinner', daysBefore: -1, included: true, required: false },
    { type: 'wedding', name: 'Wedding Mass', daysBefore: 0, included: true, required: true },
    { type: 'reception', name: 'Reception', daysBefore: 1, included: true, required: false },
  ],
  Other: [
    { type: 'wedding', name: 'Wedding', daysBefore: 0, included: true, required: true },
    { type: 'reception', name: 'Reception', daysBefore: 1, included: false, required: false },
  ],
};

// ─────────────────────────────────────────────
// Static option arrays
// ─────────────────────────────────────────────

const TOTAL_STEPS = 5;

const COMMUNITIES = [
  'Telugu', 'Tamil', 'Kannada', 'Malayali', 'Marathi',
  'Punjabi', 'Gujarati', 'Bengali', 'Rajasthani', 'Marwari',
  'Muslim', 'Christian', 'Other',
];

const PLANNING_CITIES = ['Chennai', 'Bengaluru', 'Hyderabad'];

const GUEST_OPTIONS = [
  'Under 50 (intimate)', '50 – 150', '150 – 300',
  '300 – 500', '500 – 1000', '1000+ (grand celebration)',
];

const VENUE_OPTIONS = [
  'Palace or heritage property',
  'Five star hotel',
  'Farmhouse or open lawn',
  'Banquet hall',
  'Beach or waterfront',
  'Destination (outside city)',
  'No preference — show me options',
];

const STYLE_OPTIONS = [
  {
    name: 'Royal Grandeur',
    image: 'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Intimate Garden',
    image: 'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Traditional South Indian',
    image: 'https://images.pexels.com/photos/1444450/pexels-photo-1444450.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Minimalist Modern',
    image: 'https://images.pexels.com/photos/1035665/pexels-photo-1035665.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Floral Extravaganza',
    image: 'https://images.pexels.com/photos/2814831/pexels-photo-2814831.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Destination',
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const SERVICE_OPTIONS = [
  'Venue', 'Photography', 'Videography', 'Decoration & Florals',
  'Catering', 'Bridal Makeup', 'Mehendi', 'Music & DJ',
  'Wedding Invitations', 'Bridal Wear', 'Guest Management', 'Wedding Favours',
];

const REFERRAL_OPTIONS = [
  'Instagram', 'Google search', 'Friend or family',
  'Shaadi.com', 'Wedding expo', 'Other',
];

const STEP_LABELS = [
  { num: '01', label: 'The couple' },
  { num: '02', label: 'The day' },
  { num: '03', label: 'Your vision' },
  { num: '04', label: 'Priorities' },
  { num: '05', label: 'Confirm' },
];

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function formatBudget(v: number): string {
  if (v < 100) return `₹${v} Lakhs`;
  if (v >= 200) return '₹2 Crore+';
  return `₹${(v / 100).toFixed(1)} Crore`;
}

function timingLabel(daysBefore: number): string {
  if (daysBefore === 0) return 'Wedding day';
  if (daysBefore === -1) return 'Day before';
  if (daysBefore === -2) return '2 days before';
  if (daysBefore === 1) return 'Day after';
  if (daysBefore === 2) return '2 days after';
  if (daysBefore <= -30 && daysBefore > -60) return '~1 month before';
  if (daysBefore <= -60) return '~2 months before';
  if (daysBefore < -7) return `${Math.abs(Math.round(daysBefore / 7))} weeks before`;
  return `${Math.abs(daysBefore)} days before`;
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

@Component({
  selector: 'app-intake-form',
  standalone: false,
  templateUrl: './intake-form.component.html',
  styleUrl: './intake-form.component.scss'
})
export class IntakeFormComponent {
  // Expose to template
  readonly TOTAL_STEPS = TOTAL_STEPS;
  readonly communities = COMMUNITIES;
  readonly planningCities = PLANNING_CITIES;
  readonly guestOptions = GUEST_OPTIONS;
  readonly venueOptions = VENUE_OPTIONS;
  readonly styleOptions = STYLE_OPTIONS;
  readonly serviceOptions = SERVICE_OPTIONS;
  readonly referralOptions = REFERRAL_OPTIONS;
  readonly stepLabels = STEP_LABELS;

  step = 0;
  submitted = false;

  form: FormState = {
    p1name: '',
    p2name: '',
    email: '',
    phone: '',
    community: '',
    city: '',
    weddingDate: '',
    guests: '',
    venueType: '',
    budget: 25,
    styles: new Set<string>(),
    services: new Set<string>(),
    events: [],
    notes: '',
    referral: '',
  };

  get minDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  get sortedEvents(): CeremonyEvent[] {
    return [...this.form.events].sort((a, b) => a.daysBefore - b.daysBefore);
  }

  get includedCount(): number {
    return this.form.events.filter(e => e.included).length;
  }

  get budgetDisplay(): string {
    return formatBudget(this.form.budget);
  }

  get budgetTrackFill(): number {
    return ((this.form.budget - 1) / (200 - 1)) * 100;
  }

  get reviewRows(): { label: string; value: string }[] {
    const dateStr = this.form.weddingDate
      ? new Date(this.form.weddingDate).toLocaleDateString('en-IN', {
          day: 'numeric', month: 'long', year: 'numeric',
        })
      : '—';

    const includedEvents = this.form.events
      .filter(e => e.included)
      .map(e => e.name)
      .join(', ');

    return [
      { label: 'The couple', value: `${this.form.p1name || '—'} & ${this.form.p2name || '—'}` },
      { label: 'City', value: this.form.city || '—' },
      { label: 'Wedding tradition', value: this.form.community || '—' },
      { label: 'Wedding date', value: dateStr },
      { label: 'Guests', value: this.form.guests || '—' },
      { label: 'Budget', value: formatBudget(this.form.budget) },
      { label: 'Events', value: includedEvents || '—' },
      { label: 'Styles', value: this.form.styles.size ? [...this.form.styles].join(', ') : '—' },
      { label: 'Priorities', value: this.form.services.size ? [...this.form.services].join(', ') : '—' },
    ];
  }

  get dateDisplay(): string {
    return this.form.weddingDate
      ? new Date(this.form.weddingDate).toLocaleDateString('en-IN', {
          day: 'numeric', month: 'long', year: 'numeric',
        })
      : 'TBD';
  }

  // ─── Event handlers ────────────────────────

  onCommunityChange(): void {
    if (!this.form.community) return;
    const template = COMMUNITY_EVENTS[this.form.community] ?? COMMUNITY_EVENTS['Other'];
    this.form.events = template.map(e => ({ ...e }));
  }

  goToStep(n: number): void {
    this.step = n;
  }

  nextStep(): void {
    if (this.step < TOTAL_STEPS - 1) {
      this.goToStep(this.step + 1);
    } else {
      this.submitForm();
    }
  }

  prevStep(): void {
    if (this.step > 0) {
      this.goToStep(this.step - 1);
    }
  }

  jumpTo(n: number): void {
    if (n <= this.step) {
      this.goToStep(n);
    }
  }

  toggleStyle(name: string): void {
    if (this.form.styles.has(name)) {
      this.form.styles.delete(name);
    } else {
      this.form.styles.add(name);
    }
  }

  toggleService(name: string): void {
    if (this.form.services.has(name)) {
      this.form.services.delete(name);
    } else {
      this.form.services.add(name);
    }
  }

  toggleEvent(type: string): void {
    this.form.events = this.form.events.map(e =>
      e.type === type && !e.required
        ? { ...e, included: !e.included }
        : e
    );
  }

  timingLabel(daysBefore: number): string {
    return timingLabel(daysBefore);
  }

  hasStyle(name: string): boolean {
    return this.form.styles.has(name);
  }

  hasService(name: string): boolean {
    return this.form.services.has(name);
  }

  submitForm(): void {
    const payload = {
      p1name: this.form.p1name,
      p2name: this.form.p2name,
      email: this.form.email,
      phone: this.form.phone,
      community: this.form.community,
      city: this.form.city,
      weddingDate: this.form.weddingDate,
      guests: this.form.guests,
      venueType: this.form.venueType,
      budget: this.form.budget,
      styles: [...this.form.styles],
      services: [...this.form.services],
      events: this.form.events
        .filter(e => e.included)
        .map(({ type, name, daysBefore }) => ({ type, name, daysBefore })),
      notes: this.form.notes,
      referral: this.form.referral,
    };

    console.log('[ShaadiMe] Intake submission:', payload);
    this.submitted = true;
  }
}
