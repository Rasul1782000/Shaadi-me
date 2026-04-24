import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.update({
      title: 'Contact ShaadiMe — Get in Touch for Wedding Planning',
      description: 'Ready to plan your dream wedding? Contact ShaadiMe in Bengaluru, Hyderabad, and Chennai. Call, email, or send us a message.',
      url: '/contact'
    });
  }
}
