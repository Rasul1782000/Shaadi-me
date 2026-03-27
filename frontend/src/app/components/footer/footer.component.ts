import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlannerUiService } from '../../services/planner-ui.service';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, ButtonModule, DividerModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  navItems = [
    { label: 'Wedding Themes', href: '#themes' },
    { label: 'Types of Venues', href: '#venues' },
    { label: 'Why ShaadiMe', href: '#why' },
    { label: 'Launch Cities', href: '#cities' },
    { label: 'Questions & Answers', href: '#faq' }
  ];

  constructor(private readonly plannerUi: PlannerUiService) {}

  openPlanner() {
    this.plannerUi.open();
  }
}
