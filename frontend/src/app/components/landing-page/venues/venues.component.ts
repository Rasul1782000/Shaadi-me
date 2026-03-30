import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { VenueCard } from '../landing.types';

@Component({
  selector: 'app-venues',
  standalone: false,
  templateUrl: './venues.component.html',
  styleUrl: './venues.component.css'
})
export class VenuesComponent {
  @Input({ required: true }) venues: VenueCard[] = [];
}
