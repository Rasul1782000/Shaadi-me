import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-press',
  standalone: false,
  templateUrl: './press.component.html',
  styleUrl: './press.component.scss'
})
export class PressComponent implements OnInit {
  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.update({
      title: 'ShaadiMe in the Press — Featured in Vogue, Harper\'s Bazaar & More',
      description: 'Read about ShaadiMe in top publications. Featured coverage of our innovative wedding planning and design approach.',
      url: '/press'
    });
  }
}
