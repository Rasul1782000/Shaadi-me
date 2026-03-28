import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlannerUiService } from '../../services/planner-ui.service';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-footer',
<<<<<<< HEAD
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent { }
=======
  standalone: true,
  imports: [CommonModule, DividerModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
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
>>>>>>> 6cc1b499a2c302651d6c62e4f328730c6eca8e19
