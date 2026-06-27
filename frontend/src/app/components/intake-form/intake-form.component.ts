import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LeadService, LeadPayload } from '../../services/lead.service';

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
  if (v < 100) return `\u20B9${v} Lakhs`;
  if (v >= 200) return '\u20B92 Crore+';
  return `\u20B9${(v / 100).toFixed(1)} Crore`;
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
  isSubmitting = false;
  errorMessage: string | null = null;
  stepErrors: string[] = [];

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

  constructor(
    private leadService: LeadService,
    @Inject(DOCUMENT) private doc: Document,
  ) {}

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
      : '\u2014';

    const includedEvents = this.form.events
      .filter(e => e.included)
      .map(e => e.name)
      .join(', ');

    return [
      { label: 'The couple', value: `${this.form.p1name || '\u2014'} & ${this.form.p2name || '\u2014'}` },
      { label: 'City', value: this.form.city || '\u2014' },
      { label: 'Wedding tradition', value: this.form.community || '\u2014' },
      { label: 'Wedding date', value: dateStr },
      { label: 'Guests', value: this.form.guests || '\u2014' },
      { label: 'Budget', value: formatBudget(this.form.budget) },
      { label: 'Events', value: includedEvents || '\u2014' },
      { label: 'Styles', value: this.form.styles.size ? [...this.form.styles].join(', ') : '\u2014' },
      { label: 'Priorities', value: this.form.services.size ? [...this.form.services].join(', ') : '\u2014' },
    ];
  }

  get dateDisplay(): string {
    return this.form.weddingDate
      ? new Date(this.form.weddingDate).toLocaleDateString('en-IN', {
          day: 'numeric', month: 'long', year: 'numeric',
        })
      : 'TBD';
  }

  // ─── Validation ──────────────────────────

  validateCurrentStep(): boolean {
    this.stepErrors = [];

    if (this.step === 0) {
      if (!this.form.p1name.trim()) {
        this.stepErrors.push('Bride name is required');
      }
      if (!this.form.p2name.trim()) {
        this.stepErrors.push('Groom name is required');
      }
      if (!this.form.email.trim()) {
        this.stepErrors.push('Email is required');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
        this.stepErrors.push('Please enter a valid email address');
      }
      if (!this.form.phone.trim()) {
        this.stepErrors.push('Phone number is required');
      } else if (!/^[\+]?[0-9\s\-\(\)]{7,20}$/.test(this.form.phone)) {
        this.stepErrors.push('Please enter a valid phone number');
      }
    }

    return this.stepErrors.length === 0;
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
    if (!this.validateCurrentStep()) return;

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
    this.isSubmitting = true;
    this.errorMessage = null;

    const payload: LeadPayload = {
      bride_name: this.form.p1name.trim(),
      groom_name: this.form.p2name.trim(),
      email: this.form.email.trim(),
      phone: this.form.phone.trim(),
      community: this.form.community || undefined,
      city: this.form.city || undefined,
      wedding_date: this.form.weddingDate || undefined,
      guests: this.form.guests || undefined,
      venue_type: this.form.venueType || undefined,
      budget: this.form.budget,
      styles: this.form.styles.size ? [...this.form.styles] : undefined,
      services: this.form.services.size ? [...this.form.services] : undefined,
      events: this.form.events.filter(e => e.included).map(({ type, name, daysBefore }) => ({ type, name, daysBefore })),
      notes: this.form.notes || undefined,
      referral: this.form.referral || undefined,
    };

    this.leadService.submitLead(payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitted = true;
        this.doc.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: (err) => {
        this.isSubmitting = false;
        if (err.status === 429) {
          this.errorMessage = 'Too many submissions. Please try again in a minute.';
        } else if (err.error?.errors) {
          const firstError = Object.values(err.error.errors)[0];
          this.errorMessage = Array.isArray(firstError) ? firstError[0] as string : 'Validation failed. Please check your inputs.';
        } else {
          this.errorMessage = err.error?.message || 'Something went wrong. Please try again.';
        }
      }
    });
  }
}
