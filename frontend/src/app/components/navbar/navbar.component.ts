import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlannerUiService } from '../../services/planner-ui.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMenuOpen = false;
  navItems = [
    { label: 'Themes', href: '#themes' },
    { label: 'Venues', href: '#venues' },
    { label: 'Why ShaadiMe', href: '/about' },
    { label: 'Cities', href: '#cities' },
    { label: 'FAQ', href: '#faq' }
  ];

  constructor(private readonly plannerUi: PlannerUiService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  openPlanner() {
    this.plannerUi.open();
    this.closeMenu();
  }
}
