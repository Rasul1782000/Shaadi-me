import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-plan',
  standalone: false,
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss'
})
export class PlanPageComponent implements OnInit {
  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.update({
      title: 'Start Planning Your Wedding — ShaadiMe Planning Studio',
      description: 'Begin planning your dream wedding in 5 simple steps. Tell us about your celebration and we will match you with the right team.',
      url: '/plan'
    });
  }
}
