import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-destinations',
  standalone: false,
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.scss'
})
export class DestinationsComponent implements OnInit {
  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.update({
      title: 'Destination Weddings — Bali, Goa, Tuscany & More | ShaadiMe',
      description: 'Plan your destination wedding with ShaadiMe. Explore Bali, Goa, Tuscany, Santorini, and more with full logistics support.',
      url: '/destinations'
    });
  }
}
