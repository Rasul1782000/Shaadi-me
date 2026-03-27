import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntakeFormComponent } from '../../components/intake-form/intake-form.component';
import { PlannerUiService } from '../../services/planner-ui.service';
import { HeroComponent } from '../../components/landing-page/hero/hero.component';
import { CitiesComponent } from '../../components/landing-page/cities/cities.component';
import { DecorComponent } from '../../components/landing-page/decor/decor.component';
import { ThemesComponent } from '../../components/landing-page/themes/themes.component';
import { WhyComponent } from '../../components/landing-page/why/why.component';
import { VenuesComponent } from '../../components/landing-page/venues/venues.component';
import { FaqComponent } from '../../components/landing-page/faq/faq.component';
import {
  CityCard,
  DecorStyleCard,
  FaqItem,
  HeroSlide,
  HeroStat,
  ThemeCard,
  VenueCard,
  WhyCard
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
    WhyComponent,
    VenuesComponent,
    FaqComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  activeHeroIndex = 0;
  private heroTimer: number | undefined;

  heroSlides: HeroSlide[] = [
    { id: '01', label: 'Royal Grandeur', meta: 'Hyderabad • ShaadiMe Edit', video: 'landing-videos/landing-1.mp4' },
    { id: '02', label: 'Garden Wedding', meta: 'Bengaluru • Open Air', video: 'landing-videos/landing-2.mp4' },
    { id: '03', label: 'Traditional South Indian', meta: 'Chennai • Ceremony Flow', video: 'landing-videos/landing-3.mp4' },
    { id: '04', label: 'Modern Destination', meta: 'ShaadiMe • Signature Planning', video: 'landing-videos/landing-4.mp4' }
  ];

  heroStats: HeroStat[] = [
    { value: '3', label: 'launch cities' },
    { value: '1', label: 'dedicated planner' },
    { value: 'Full', label: 'planning support' }
  ];

  cities: CityCard[] = [
    { name: 'Hyderabad', tagline: 'We are here ✦', image: 'hyderabad.jpeg', objectPosition: 'center 50%' },
    { name: 'Bengaluru', tagline: 'We are here ✦', image: 'https://images.pexels.com/photos/1007427/pexels-photo-1007427.jpeg?auto=compress&cs=tinysrgb&w=800', objectPosition: 'center 50%' },
    { name: 'Chennai', tagline: 'We are here ✦', image: 'https://images.pexels.com/photos/2362002/pexels-photo-2362002.jpeg?auto=compress&cs=tinysrgb&w=800', objectPosition: 'center 50%' }
  ];

  decorStyles: DecorStyleCard[] = [
    { name: 'Floral Extravaganza', image: 'https://images.pexels.com/photos/3872610/pexels-photo-3872610.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 62%' },
    { name: 'Drape & Lights', image: 'https://images.pexels.com/photos/24023407/pexels-photo-24023407.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 40%' },
    { name: 'Marigold Traditional', image: 'https://images.pexels.com/photos/6443947/pexels-photo-6443947.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 55%' },
    { name: 'Minimal Luxe', image: 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 50%' },
    { name: 'Royal Baroque', image: 'https://images.pexels.com/photos/948185/pexels-photo-948185.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 38%' }
  ];

  themes: ThemeCard[] = [
    { name: 'Royal Grandeur', description: 'Grand entrances, regal details, and a sense of occasion in every frame.', image: 'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 35%', featured: true },
    { name: 'Intimate Garden', description: 'Soft florals, easy light, and a celebration that feels close to home.', image: 'https://images.pexels.com/photos/35985252/pexels-photo-35985252.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 52%' },
    { name: 'Traditional South Indian', description: 'Sacred rituals, marigold warmth, and timeless South Indian elegance.', image: 'https://images.pexels.com/photos/7669989/pexels-photo-7669989.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 56%' },
    { name: 'Destination', description: 'A wedding that feels like a getaway, without the planning chaos.', image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 54%' }
  ];

  venues: VenueCard[] = [
    { name: 'Palace & Heritage', description: 'Historic character, dramatic architecture, and unmistakable grandeur.', tag: 'Heritage Venue', image: 'https://images.pexels.com/photos/2042109/pexels-photo-2042109.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 58%' },
    { name: 'Five Star Hotel', description: 'Polished hospitality and the comfort of a venue built for scale.', tag: 'Luxury Hotel', image: 'https://images.pexels.com/photos/30866709/pexels-photo-30866709.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 40%' },
    { name: 'Farmhouse & Open Air', description: 'Fresh air, open lawns, and space for a relaxed celebration.', tag: 'Open Air Venue', image: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 56%' },
    { name: 'Beach', description: 'Sea breeze, sunset light, and a wedding with a destination feel.', tag: 'Destination Setting', image: 'https://images.pexels.com/photos/169211/pexels-photo-169211.jpeg?auto=compress&cs=tinysrgb&w=1200', objectPosition: 'center 58%' }
  ];

  whyCards: WhyCard[] = [
    { number: '01', title: 'You plan once. We handle the rest.', description: 'Share the wedding you want once. We coordinate the moving pieces, follow through with vendors, and keep the day from turning into a checklist.' },
    { number: '02', title: 'Intimate ceremony or grand celebration.', description: 'Whether you are planning for 80 guests or 800, the experience is shaped around your family, rituals, pace, and taste.' },
    { number: '03', title: 'One planner. One number.', description: 'You should not have to manage fifteen parallel conversations. One ShaadiMe planner keeps the context, the decisions, and the follow-through in one place.' },
    { number: '04', title: 'We speak Indian wedding fluently.', description: 'From family expectations to ceremony flow, we understand the scale and emotion of Indian weddings and plan with that reality in mind.' }
  ];

  faqs: FaqItem[] = [
    { q: 'What does ShaadiMe actually do? Is it a vendor marketplace or a planning service?', a: 'ShaadiMe is a planning partner, not a vendor marketplace. We understand your wedding, assign a planner, coordinate the work, and guide the process end to end.' },
    { q: 'How much does it cost to plan with ShaadiMe?', a: 'The final cost depends on the scale, city, and complexity of your wedding. Once we understand what you are planning, we walk you through a transparent recommendation instead of pushing a generic package.' },
    { q: 'Which cities is ShaadiMe available in right now?', a: 'ShaadiMe is currently serving Hyderabad, Bengaluru, and Chennai. These are our launch cities, and we will expand from here.' },
    { q: 'How early should I get in touch before my wedding?', a: 'Earlier is always better, especially for larger celebrations. Six months gives enough room to plan calmly, but if your timeline is shorter we can still tell you what is realistic.' }
  ];

  constructor(public readonly plannerUi: PlannerUiService) {}

  ngOnInit() {
    this.heroTimer = window.setInterval(() => {
      this.activeHeroIndex = (this.activeHeroIndex + 1) % this.heroSlides.length;
    }, 7000);
  }

  ngOnDestroy() {
    if (this.heroTimer) {
      window.clearInterval(this.heroTimer);
    }
  }

  setActiveHero(index: number) {
    this.activeHeroIndex = index;
  }

  scrollToThemes() {
    document.getElementById('themes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
