import { Component } from '@angular/core';
import { PlannerUiService } from '../../services/planner-ui.service';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  navItems = [
    { label: 'Wedding Themes', href: '#themes' },
    { label: 'Types of Venues', href: '#venues' },
    { label: 'Launch Cities', href: '#cities' },
    { label: 'Questions & Answers', href: '#faq' }
  ];

  constructor(private readonly plannerUi: PlannerUiService) {}

  openPlanner() {
    this.plannerUi.open();
  }
}
