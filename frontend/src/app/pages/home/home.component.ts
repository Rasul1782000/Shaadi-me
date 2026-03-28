import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntakeFormComponent } from '../../components/intake-form/intake-form.component';
import { PlannerUiService } from '../../services/planner-ui.service';
import { HeroComponent } from '../../components/landing-page/hero/hero.component';
import { CitiesComponent } from '../../components/landing-page/cities/cities.component';
import { DecorComponent } from '../../components/landing-page/decor/decor.component';
import { ThemesComponent } from '../../components/landing-page/themes/themes.component';
import { VenuesComponent } from '../../components/landing-page/venues/venues.component';
import { FaqComponent } from '../../components/landing-page/faq/faq.component';
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
  standalone: true,
  imports: [
    CommonModule,
    IntakeFormComponent,
    HeroComponent,
    CitiesComponent,
    DecorComponent,
    ThemesComponent,
    VenuesComponent,
    FaqComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  heroSlides: HeroSlide[] = [
    { id: '01', label: 'Royal Grandeur', meta: 'Hyderabad • ShaadiMe Edit', video: '/landing-videos/landing-1.mp4' },
    { id: '02', label: 'Garden Wedding', meta: 'Bengaluru • Open Air', video: '/landing-videos/landing-2.mp4' },
    { id: '03', label: 'Traditional South Indian', meta: 'Chennai • Ceremony Flow', video: '/landing-videos/landing-3.mp4' },
    { id: '04', label: 'Modern Destination', meta: 'ShaadiMe • Signature Planning', video: '/landing-videos/landing-4.mp4' }
  ];

  cities: CityCard[] = [
    { name: 'Hyderabad', tagline: 'We are here ✦', image: '/hyderabad.jpeg', objectPosition: 'center 50%' },
    { name: 'Bengaluru', tagline: 'We are here ✦', image: 'https://images.pexels.com/photos/1007427/pexels-photo-1007427.jpeg?auto=compress&cs=tinysrgb&w=800', objectPosition: 'center 50%' },
    { name: 'Chennai', tagline: 'We are here ✦', image: 'https://images.pexels.com/photos/2362002/pexels-photo-2362002.jpeg?auto=compress&cs=tinysrgb&w=800', objectPosition: 'center 50%' }
  ];

  decorStyles: DecorStyleCard[] = [
    { name: 'Floral Extravaganza', image: 'https://images.pexels.com/photos/3872610/pexels-photo-3872610.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 62%' },
    { name: 'Drape & Lights', image: 'https://images.pexels.com/photos/24023407/pexels-photo-24023407.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 40%' },
    { name: 'Marigold Traditional', image: 'https://images.pexels.com/photos/6443947/pexels-photo-6443947.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 55%', large: true },
    { name: 'Minimal Luxe', image: 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 50%' },
    { name: 'Royal Baroque', image: 'https://images.pexels.com/photos/948185/pexels-photo-948185.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 38%' }
  ];

  themes: ThemeCard[] = [
    { name: 'Royal Grandeur', description: 'Grand entrances, regal details, and a sense of occasion in every frame.', image: 'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 35%', featured: true },
    { name: 'Intimate Garden', description: 'Soft florals, easy light, and a celebration that feels close to home.', image: 'https://images.pexels.com/photos/35985252/pexels-photo-35985252.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 52%' },
    { name: 'Traditional South Indian', description: 'Sacred rituals, marigold warmth, and timeless South Indian elegance.', image: 'https://images.pexels.com/photos/7669989/pexels-photo-7669989.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 56%' },
    { name: 'Destination', description: 'A wedding that feels like a getaway, without the planning chaos.', image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 54%' },
    { name: 'Minimalist Modern', description: 'Refined palettes, considered details, and understated luxury.', image: 'https://images.pexels.com/photos/1035665/pexels-photo-1035665.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 50%' }
  ];

  venues: VenueCard[] = [
    { name: 'Palace & Heritage', description: 'Historic character, dramatic architecture, and unmistakable grandeur.', tag: 'Heritage Venue', image: 'https://images.pexels.com/photos/2042109/pexels-photo-2042109.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 58%' },
    { name: 'Five Star Hotel', description: 'Polished hospitality and the comfort of a venue built for scale.', tag: 'Luxury Hotel', image: 'https://images.pexels.com/photos/30866709/pexels-photo-30866709.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 40%' },
    { name: 'Farmhouse & Open Air', description: 'Fresh air, open lawns, and space for a relaxed celebration.', tag: 'Open Air Venue', image: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 56%' },
    { name: 'Banquet Hall', description: 'A reliable setting for large gatherings done with elegance.', tag: 'Indoor Celebration', image: 'https://images.pexels.com/photos/24023407/pexels-photo-24023407.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 56%' },
    { name: 'Beach', description: 'Sea breeze, sunset light, and a wedding with a destination feel.', tag: 'Destination Setting', image: 'https://images.pexels.com/photos/169211/pexels-photo-169211.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 58%' }
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

  constructor(public readonly plannerUi: PlannerUiService) {}
}
