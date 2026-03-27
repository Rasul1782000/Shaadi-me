import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ThemeCard } from '../landing.types';

@Component({
  selector: 'app-themes',
  standalone: true,
  imports: [CommonModule, CardModule, TagModule],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.css'
})
export class ThemesComponent {
  @Input({ required: true }) themes: ThemeCard[] = [];
}
