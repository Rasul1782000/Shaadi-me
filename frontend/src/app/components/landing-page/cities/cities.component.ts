import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CityCard } from '../landing.types';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.css'
})
export class CitiesComponent {
  @Input({ required: true }) cities: CityCard[] = [];
}
