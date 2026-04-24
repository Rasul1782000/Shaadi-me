import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoConfig {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly defaultImage = '/ShaadiMe_Logo.png';
  private readonly siteName = 'ShaadiMe';
  private readonly baseUrl = 'https://shaadi.me';

  constructor(
    private readonly titleService: Title,
    private readonly meta: Meta,
    @Inject(DOCUMENT) private readonly doc: Document
  ) {}

  update(config: SeoConfig): void {
    // Title
    this.titleService.setTitle(config.title);

    // Meta description
    this.meta.updateTag({ name: 'description', content: config.description });

    // Canonical link
    const canonicalUrl = config.url
      ? `${this.baseUrl}${config.url}`
      : this.baseUrl;
    this.setCanonical(canonicalUrl);

    // Open Graph
    const ogImage = config.image || this.defaultImage;
    const ogType = config.type || 'website';
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:image', content: ogImage });
    this.meta.updateTag({ property: 'og:type', content: ogType });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    this.meta.updateTag({ property: 'og:locale', content: 'en_IN' });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: ogImage });

    // JSON-LD structured data
    if (config.jsonLd) {
      this.setJsonLd(config.jsonLd);
    }
  }

  private setCanonical(url: string): void {
    let link: HTMLLinkElement | null = this.doc.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  setJsonLd(data: Record<string, unknown> | Record<string, unknown>[]): void {
    // Remove any existing JSON-LD injected by this service
    const existing = this.doc.querySelectorAll('script[data-seo-jsonld]');
    existing.forEach(el => el.remove());

    const script = this.doc.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-seo-jsonld', 'true');
    script.textContent = JSON.stringify(data);
    this.doc.head.appendChild(script);
  }
}
