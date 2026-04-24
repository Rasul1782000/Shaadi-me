import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-page-venues',
  standalone: false,
  templateUrl: './venues.component.html',
  styleUrl: './venues.component.scss'
})
export class PageVenuesComponent implements OnInit {
  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.update({
      title: 'Wedding Venues — Palaces, Hotels, Beach & Farmhouse | ShaadiMe',
      description: 'Find the perfect wedding venue with ShaadiMe. From heritage palaces to beach resorts and farmhouses across India.',
      url: '/venues'
    });
  }
}
