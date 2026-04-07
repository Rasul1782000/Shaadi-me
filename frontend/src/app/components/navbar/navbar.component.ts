import { Component, HostListener } from '@angular/core';
import { PlannerUiService } from '../../services/planner-ui.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isMenuOpen = false;
  navItems = [
    { label: 'Cities', href: '#cities' },
    { label: 'Decor Styles', href: '#decoration' },
    { label: 'Themes', href: '#themes' },
    { label: 'Venues', href: '#venues' },
    { label: 'FAQ', href: '#faq' }
  ];

  constructor(private readonly plannerUi: PlannerUiService) { }

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
