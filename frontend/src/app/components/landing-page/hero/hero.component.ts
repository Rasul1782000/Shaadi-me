import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { HeroSlide, HeroStat } from '../landing.types';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, TagModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  @Input({ required: true }) slides: HeroSlide[] = [];
  @Input({ required: true }) stats: HeroStat[] = [];
  @Input() activeIndex = 0;

  @Output() activeIndexChange = new EventEmitter<number>();
  @Output() startPlanning = new EventEmitter<void>();
  @Output() exploreThemes = new EventEmitter<void>();

  selectSlide(index: number) {
    this.activeIndexChange.emit(index);
  }
}
