import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-services',
  standalone: false,
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {
  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.update({
      title: 'Wedding Planning Services — Full, Partial & Day-of Coordination | ShaadiMe',
      description: 'Explore ShaadiMe wedding planning packages: full planning, partial planning, day-of coordination, destination weddings, and more.',
      url: '/services'
    });
  }
}
