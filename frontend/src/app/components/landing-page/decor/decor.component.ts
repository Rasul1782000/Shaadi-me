import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DecorStyleCard } from '../landing.types';

@Component({
  selector: 'app-decor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './decor.component.html',
  styleUrl: './decor.component.css'
})
export class DecorComponent {
  @Input({ required: true }) styles: DecorStyleCard[] = [];
}
