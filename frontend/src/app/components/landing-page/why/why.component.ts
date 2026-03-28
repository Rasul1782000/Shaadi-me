import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { WhyCard } from '../landing.types';

@Component({
  selector: 'app-why',
  standalone: true,
  imports: [CommonModule, CardModule, DividerModule],
  templateUrl: './why.component.html',
  styleUrl: './why.component.css'
})
export class WhyComponent {
  @Input({ required: true }) cards: WhyCard[] = [];
}
