import { Component, Input } from '@angular/core';
import { ThemeCard } from '../landing.types';

@Component({
  selector: 'app-themes',
  standalone: false,
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.scss'
})
export class ThemesComponent {
  @Input({ required: true }) themes: ThemeCard[] = [];
}
