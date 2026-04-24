import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.update({
      title: 'About ShaadiMe — Our Story & Wedding Planning Team',
      description: 'Meet the team behind ShaadiMe. 500+ weddings planned, dedicated to creating unforgettable celebrations across India.',
      url: '/about'
    });
  }
}
