import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FaqItem } from '../landing.types';

@Component({
  selector: 'app-faq',
  standalone: false,
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  @Input({ required: true }) items: FaqItem[] = [];
  @Output() startPlanning = new EventEmitter<void>();
  openIndex = 0;

  toggle(index: number) {
    this.openIndex = this.openIndex === index ? -1 : index;
  }
}
