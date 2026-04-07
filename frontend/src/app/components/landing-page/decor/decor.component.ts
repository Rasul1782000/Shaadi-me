import { Component, Input } from '@angular/core';
import { DecorStyleCard } from '../landing.types';

@Component({
  selector: 'app-decor',
  standalone: false,
  templateUrl: './decor.component.html',
  styleUrl: './decor.component.scss'
})
export class DecorComponent {
  @Input({ required: true }) styles: DecorStyleCard[] = [];
}
