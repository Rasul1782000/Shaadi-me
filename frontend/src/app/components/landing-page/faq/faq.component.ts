import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FaqItem } from '../landing.types';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, AccordionModule, ButtonModule, CardModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  @Input({ required: true }) items: FaqItem[] = [];
  @Output() startPlanning = new EventEmitter<void>();
}
