import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-weddings',
  standalone: false,
  templateUrl: './weddings.component.html',
  styleUrl: './weddings.component.scss'
})
export class WeddingsComponent implements OnInit {
  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.update({
      title: 'Real Weddings & Packages — ShaadiMe Portfolio',
      description: 'Browse ShaadiMe real wedding portfolio and explore our Gold & Platinum planning packages for your celebration.',
      url: '/weddings'
    });
  }
}
