import http from 'k6/http';
import { check, group, sleep } from 'k6';

const FRONTEND_BASE_URL = __ENV.FRONTEND_BASE_URL || 'http://127.0.0.1:3000';
const API_BASE_URL = __ENV.API_BASE_URL || FRONTEND_BASE_URL;

const COMMUNITIES = ['Punjabi', 'Telugu', 'Tamil', 'Gujarati', 'Christian'];
const CITIES = ['Chennai', 'Bengaluru', 'Hyderabad'];
const GUEST_OPTIONS = [
  'Under 50 (intimate)',
  '50 – 150',
  '150 – 300',
  '300 – 500',
];
const VENUE_OPTIONS = [
  'Palace or heritage property',
  'Five star hotel',
  'Farmhouse or open lawn',
  'Banquet hall',
];
const STYLE_OPTIONS = [
  'Royal Grandeur',
  'Intimate Garden',
  'Traditional South Indian',
  'Minimalist Modern',
];
const SERVICE_OPTIONS = [
  'Venue',
  'Photography',
  'Decoration & Florals',
  'Catering',
];
const REFERRAL_OPTIONS = [
  'Instagram',
  'Google search',
  'Friend or family',
];

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.02'],
    http_req_duration: ['p(95)<1500', 'p(99)<3000'],
  },
  scenarios: {
    website_load: {
      executor: 'ramping-vus',
      stages: [
        { duration: '2m', target: 25 },
        { duration: '3m', target: 100 },
        { duration: '5m', target: 100 },
        { duration: '2m', target: 0 },
      ],
      gracefulRampDown: '30s',
    },
  },
};

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function futureDate(daysAhead) {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return date.toISOString().split('T')[0];
}

function buildLeadPayload() {
  const vu = __VU;
  const iteration = __ITER;
  const community = pick(COMMUNITIES);
  const eventName = community === 'Christian' ? 'Wedding Mass' : 'Wedding';

  return {
    brideName: `Load Bride ${vu}-${iteration}`,
    groomName: `Load Groom ${vu}-${iteration}`,
    email: `loadtest+${vu}-${iteration}@shaadime.test`,
    phone: `99999${String(10000 + ((vu * 97 + iteration) % 89999))}`,
    community,
    city: pick(CITIES),
    weddingDate: futureDate(120 + ((vu + iteration) % 180)),
    guests: pick(GUEST_OPTIONS),
    venueType: pick(VENUE_OPTIONS),
    budget: 25 + ((vu + iteration) % 75),
    styles: [pick(STYLE_OPTIONS)],
    services: [pick(SERVICE_OPTIONS)],
    events: [
      { type: 'wedding', name: eventName, daysBefore: 0 },
    ],
    notes: 'Automated k6 load test submission',
    referral: pick(REFERRAL_OPTIONS),
  };
}

export default function () {
  group('landing page', () => {
    const homeResponse = http.get(`${FRONTEND_BASE_URL}/`, {
      tags: { name: 'home' },
    });

    check(homeResponse, {
      'home returns 200': (res) => res.status === 200,
      'home includes app shell': (res) => res.body.includes('app-root'),
    });
  });

  group('venues api', () => {
    const venuesResponse = http.get(`${API_BASE_URL}/api/venues`, {
      headers: { Accept: 'application/json' },
      tags: { name: 'venues' },
    });

    check(venuesResponse, {
      'venues returns 200': (res) => res.status === 200,
    });
  });

  group('lead submission', () => {
    const payload = JSON.stringify(buildLeadPayload());
    const leadResponse = http.post(`${API_BASE_URL}/api/leads`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      tags: { name: 'lead_submit' },
    });

    check(leadResponse, {
      'lead returns 201': (res) => res.status === 201,
      'lead reports success': (res) => {
        try {
          return res.json('success') === true;
        } catch (_) {
          return false;
        }
      },
    });
  });

  sleep(1);
}
