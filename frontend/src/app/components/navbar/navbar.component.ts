import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isMenuOpen = false;
  isContactPage = false;
  navItems = [
    { label: 'Cities', fragment: 'cities' },
    { label: 'Decor Styles', fragment: 'decor' },
    { label: 'Themes', fragment: 'themes' },
    { label: 'Venues', fragment: 'venues' },
    { label: 'FAQ', fragment: 'faq' },
  ];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isContactPage = event.urlAfterRedirects === '/contact';
      });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
