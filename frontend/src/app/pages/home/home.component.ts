import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  CityCard,
  DecorStyleCard,
  FaqItem,
  HeroSlide,
  ThemeCard,
  VenueCard
} from '../../components/landing-page/landing.types';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  heroSlides: HeroSlide[] = [
    { id: '01', label: 'Royal Grandeur', meta: 'Hyderabad • ShaadiMe Edit', video: '/landing-videos/landing-1.mp4' },
    { id: '02', label: 'Garden Wedding', meta: 'Bengaluru • Open Air', video: '/landing-videos/landing-2.mp4' },
    { id: '03', label: 'Traditional South Indian', meta: 'Chennai • Ceremony Flow', video: '/landing-videos/landing-3.mp4' },
    { id: '04', label: 'Modern Destination', meta: 'ShaadiMe • Signature Planning', video: '/landing-videos/landing-4.mp4' }
  ];

  cities: CityCard[] = [
    { name: 'Hyderabad', tagline: 'Charminar', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Charminar%2C%20Hyderabad.jpg', objectPosition: 'center 50%' },
    { name: 'Bengaluru', tagline: 'Vidhan Soudha', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vidhan%20Soudha%20-%20Bangalore.jpg', objectPosition: 'center 54%' },
    { name: 'Chennai', tagline: 'Chennai Central', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chennai_Central.jpg', objectPosition: 'center 54%' }
  ];

  decorStyles: DecorStyleCard[] = [
    { name: 'Floral Extravaganza', shortDescription: 'Lush blooms in every direction', image: 'https://images.pexels.com/photos/3872610/pexels-photo-3872610.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 62%' },
    { name: 'Drape & Lights', shortDescription: 'Soft fabric and warm glow', image: 'https://images.pexels.com/photos/24023407/pexels-photo-24023407.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 40%' },
    { name: 'Marigold Traditional', shortDescription: 'Classic Indian warmth', image: 'https://images.pexels.com/photos/6443947/pexels-photo-6443947.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 55%', large: true },
    { name: 'Minimal Luxe', shortDescription: 'Understated elegance', image: 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 50%' }
  ];

  themes: ThemeCard[] = [
    { name: 'Royal Grandeur', description: 'Grand entrances, regal details, and a sense of occasion in every frame.', priceRange: '₹15L–30L', image: 'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 35%', featured: true },
    { name: 'Intimate Garden', description: 'Soft florals, easy light, and a celebration that feels close to home.', priceRange: '₹5L–12L', image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 52%' },
    { name: 'Traditional South Indian', description: 'Sacred rituals, marigold warmth, and timeless South Indian elegance.', priceRange: '₹8L–20L', image: 'https://images.pexels.com/photos/7669989/pexels-photo-7669989.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 56%' },
    { name: 'Destination', description: 'A wedding that feels like a getaway, without the planning chaos.', priceRange: '₹20L–50L', image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 54%' },
    { name: 'Minimalist Modern', description: 'Refined palettes, considered details, and understated luxury.', priceRange: '₹6L–15L', image: 'https://images.pexels.com/photos/1035665/pexels-photo-1035665.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 50%' }
  ];

  venues: VenueCard[] = [
    { name: 'Palace & Heritage', description: 'Historic character, dramatic architecture, and unmistakable grandeur.', tag: 'Heritage Venue', city: 'Hyderabad', capacity: '500+', image: 'https://images.pexels.com/photos/2042109/pexels-photo-2042109.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 58%' },
    { name: 'Five Star Hotel', description: 'Polished hospitality and the comfort of a venue built for scale.', tag: 'Luxury Hotel', city: 'Bengaluru', capacity: '300+', image: 'https://images.pexels.com/photos/30866709/pexels-photo-30866709.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 40%' },
    { name: 'Farmhouse & Open Air', description: 'Fresh air, open lawns, and space for a relaxed celebration.', tag: 'Open Air Venue', city: 'Chennai', capacity: '200+', image: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 56%' },
    { name: 'Banquet Hall', description: 'A reliable setting for large gatherings done with elegance.', tag: 'Indoor Celebration', city: 'All Cities', capacity: '400+', image: 'https://images.pexels.com/photos/24023407/pexels-photo-24023407.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 56%' },
    { name: 'Beach', description: 'Sea breeze, sunset light, and a wedding with a destination feel.', tag: 'Destination Setting', city: 'Destination', capacity: '150+', image: 'https://images.pexels.com/photos/169211/pexels-photo-169211.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 58%' }
  ];

  // Why ShaadiMe data
  whyStats = [
    { number: '3', label: 'Cities Live' },
    { number: '100+', label: 'Vendor Partners' },
    { number: 'End-to-End', label: 'Planning Support' }
  ];

  whyPoints = [
    { icon: '🎯', title: 'One planner, one plan', description: 'Your planner holds the entire context — budget, style, guest count — and coordinates every moving piece.' },
    { icon: '💎', title: 'Curated, not crowded', description: 'We work with vetted vendors only. No endless marketplace scrolling — just the right options for your wedding.' },
    { icon: '🪄', title: 'Less stress, more presence', description: 'We handle the coordination chaos so you can be fully present for the moments that matter most.' }
  ];

  faqs: FaqItem[] = [
    { q: 'What does ShaadiMe actually do? Is it a vendor marketplace or a planning service?', a: 'ShaadiMe is a planning partner, not a vendor marketplace. We understand your wedding, assign a planner, coordinate the work, and guide the process end to end.' },
    { q: 'How much does it cost to plan with ShaadiMe?', a: 'The final cost depends on the scale, city, and complexity of your wedding. Once we understand what you are planning, we walk you through a transparent recommendation instead of pushing a generic package.' },
    { q: 'Which cities is ShaadiMe available in right now?', a: 'ShaadiMe is currently serving Hyderabad, Bengaluru, and Chennai. These are our launch cities, and we will expand from here.' },
    { q: 'How early should I get in touch before my wedding?', a: 'Earlier is always better, especially for larger celebrations. Six months gives enough room to plan calmly, but if your timeline is shorter we can still tell you what is realistic.' },
    { q: 'Can you help if we only need part of the wedding planned?', a: 'Yes. We can support full planning or only the parts where you want extra help, like venue selection, decor, logistics, or guest coordination.' },
    { q: 'Will one person be handling our wedding?', a: 'You will have one primary planner who keeps the context, coordinates the moving pieces, and stays your main point of contact.' },
    { q: 'Can we share inspiration photos and references?', a: 'Absolutely. We use inspiration to understand the mood you want and then turn that into a practical plan that fits your city, budget, and guest count.' },
    { q: 'Do you work with destination weddings?', a: 'Yes, destination-style celebrations are part of the worlds we can help shape, whether they are within India or in a getaway setting.' }
  ];

  constructor(private readonly router: Router) { }

  goToPlan(): void {
    this.router.navigate(['/plan']);
  }
}
