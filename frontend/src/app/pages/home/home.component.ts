import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IntakeFormComponent } from '../../components/intake-form/intake-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, IntakeFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showForm = false;
  openFaq: number | null = null;

  themes = [
    { id: 'royal', name: 'Royal', desc: 'Grandeur and opulence fit for royalty.', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800' },
    { id: 'intimate', name: 'Intimate Garden', desc: 'Soft, romantic, and surrounded by nature.', img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800' },
    { id: 'south-indian', name: 'Traditional South Indian', desc: 'Authentic rituals and vibrant colors.', img: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&q=80&w=800' },
    { id: 'destination', name: 'Destination', desc: 'Exotic locations for a unique experience.', img: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=800' },
    { id: 'minimalist', name: 'Minimalist Modern', desc: 'Sleek, clean, and contemporary.', img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800' },
    { id: 'fusion', name: 'Fusion', desc: 'A perfect blend of cultures and traditions.', img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800' }
  ];

  decorStyles = [
    { name: 'Floral Extravaganza', desc: 'Abundant, lush floral arrangements.', img: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=800' },
    { name: 'Drape and Lights', desc: 'Elegant drapes with ambient lighting.', img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800' },
    { name: 'Marigold Traditional', desc: 'Classic Indian marigold decor.', img: 'https://images.unsplash.com/photo-1595908129746-57ca1a63dd4d?auto=format&fit=crop&q=80&w=800' },
    { name: 'Minimal Luxe', desc: 'Understated elegance.', img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800' },
    { name: 'Royal Baroque', desc: 'Rich, dramatic, and ornate.', img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=800' }
  ];

  faqs = [
    { q: "What does ShaadiMe actually do?", a: "ShaadiMe is a full-service wedding planning partner. We manage your entire wedding journey from vision to execution." },
    { q: "How much does it cost?", a: "Our pricing is tailored to your specific needs, guest count, and vision." },
    { q: "Which cities are you available in?", a: "We are currently serving Bengaluru, Chennai, and Hyderabad." },
    { q: "How soon should I get in touch?", a: "We recommend reaching out at least 6-12 months before your wedding date." }
  ];

  toggleFaq(index: number) {
    this.openFaq = this.openFaq === index ? null : index;
  }
}
