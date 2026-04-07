import { Component, Input } from '@angular/core';
import { VenueCard } from '../landing.types';

@Component({
  selector: 'app-venues',
  standalone: false,
  templateUrl: './venues.component.html',
  styleUrl: './venues.component.scss'
})
export class VenuesComponent {
  @Input({ required: true }) venues: VenueCard[] = [];
}
