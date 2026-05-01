import { Component, OnInit, OnDestroy } from '@angular/core';
import { SeoService } from '../../services/seo.service';

interface ContactForm {
  name: string;
  phone: string;
  message: string;
}

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit, OnDestroy {
  readonly testimonials: Testimonial[] = [
    {
      name: 'Priya Sharma',
      role: 'Bride, Bengaluru',
      quote:
        'ShaadiMe made our wedding planning effortless. Every detail was handled with care and the coordination was flawless.',
      avatar: 'avatar-priya.png',
    },
    {
      name: 'Rahul Mehta',
      role: 'Groom, Hyderabad',
      quote:
        'From venue selection to day-of coordination, the team went above and beyond. Our families were truly impressed.',
      avatar: 'avatar-rahul.png',
    },
    {
      name: 'Meera Iyer',
      role: 'Mother of the Bride',
      quote:
        'As a parent, I wanted perfection for my daughter\'s wedding. ShaadiMe delivered exactly that — elegant and stress-free.',
      avatar: 'avatar-meera.png',
    },
  ];

  activeTestimonial = 1;

  form: ContactForm = {
    name: '',
    phone: '',
    message: '',
  };

  touched = false;
  submitted = false;
  errors: Partial<Record<keyof ContactForm, string>> = {};

  private autoRotateTimer: ReturnType<typeof setInterval> | null = null;

  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.update({
      title: 'Contact ShaadiMe — Get in Touch for Wedding Planning',
      description:
        'Ready to plan your dream wedding? Contact ShaadiMe in Bengaluru, Hyderabad, and Chennai. Send us a message and we\'ll get back to you promptly.',
      url: '/contact',
    });

    this.startAutoRotate();
  }

  ngOnDestroy(): void {
    this.stopAutoRotate();
  }

  submitContact(): void {
    this.touched = true;
    this.errors = this.validate();

    if (Object.keys(this.errors).length > 0) {
      return;
    }

    const subject = encodeURIComponent('ShaadiMe inquiry');
    const body = encodeURIComponent(
      [
        `Name: ${this.form.name}`,
        `Phone: ${this.form.phone}`,
        '',
        this.form.message,
      ].join('\n'),
    );

    this.submitted = true;
    window.location.href = `mailto:hello@shaadime.com?subject=${subject}&body=${body}`;
  }

  private validate(): Partial<Record<keyof ContactForm, string>> {
    const errors: Partial<Record<keyof ContactForm, string>> = {};

    if (!this.form.name.trim()) errors.name = 'Please share your name.';
    if (!this.form.phone.trim()) {
      errors.phone = 'Please share your phone number.';
    }
    if (!this.form.message.trim()) errors.message = 'Please add a short message.';

    return errors;
  }

  private startAutoRotate(): void {
    this.autoRotateTimer = setInterval(() => {
      this.activeTestimonial = (this.activeTestimonial + 1) % this.testimonials.length;
    }, 5000);
  }

  private stopAutoRotate(): void {
    if (this.autoRotateTimer) {
      clearInterval(this.autoRotateTimer);
      this.autoRotateTimer = null;
    }
  }
}
