import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlannerUiService } from '../../services/planner-ui.service';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule, ToolbarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isScrolled = false;
  isMenuOpen = false;
  navItems = [
    { label: 'Themes', href: '#themes' },
    { label: 'Venues', href: '#venues' },
    { label: 'Why ShaadiMe', href: '#why' },
    { label: 'Cities', href: '#cities' },
    { label: 'FAQ', href: '#faq' }
  ];

  constructor(private readonly plannerUi: PlannerUiService) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

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
