import { Theme, VenueCategory, DecorationStyle } from './types';

export const THEMES: Theme[] = [
  {
    id: 'royal',
    name: 'Royal Heritage',
    description: 'Palatial grandeur with traditional gold and velvet accents.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'intimate',
    name: 'Intimate Garden',
    description: 'Soft florals and fairy lights in a lush outdoor setting.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'minimalist',
    name: 'Minimalist Modern',
    description: 'Clean lines, monochromatic palettes, and sophisticated elegance.',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'south-indian',
    name: 'Traditional South Indian',
    description: 'Vibrant marigolds, silk drapes, and temple-inspired decor.',
    image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&q=80&w=800'
  }
];

export const VENUES: VenueCategory[] = [
  {
    id: 'palace',
    name: 'Palace & Heritage',
    description: 'Historic venues that tell a story of royalty.',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'five-star',
    name: 'Five Star Hotels',
    description: 'Luxury ballrooms with world-class amenities.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'beach',
    name: 'Beach Resorts',
    description: 'Sunset vows with the sound of crashing waves.',
    image: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=800'
  }
];

export const DECOR_STYLES: DecorationStyle[] = [
  { id: 'floral', name: 'Floral Extravaganza', image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=800' },
  { id: 'lights', name: 'Drape & Lights', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800' },
  { id: 'marigold', name: 'Marigold Traditional', image: 'https://images.unsplash.com/photo-1595908129746-57ca1a63dd4d?auto=format&fit=crop&q=80&w=800' },
  { id: 'luxe', name: 'Minimal Luxe', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800' }
];

export const FAQS = [
  {
    question: "What does ShaadiMe actually do?",
    answer: "ShaadiMe is a full-service wedding planning partner. We don't just list vendors; we manage your entire wedding journey from vision to execution, so you can enjoy your day as a guest."
  },
  {
    question: "How much does it cost to plan with ShaadiMe?",
    answer: "Our pricing is tailored to your specific needs, guest count, and vision. We work across various budget ranges to ensure a premium experience for everyone."
  },
  {
    question: "Which cities is ShaadiMe available in right now?",
    answer: "We are currently serving Bengaluru, Chennai, and Hyderabad, with plans to expand to more cities soon."
  }
];
