import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-why-shaadime',
  standalone: false,
  templateUrl: './why-shaadime.component.html',
  styleUrl: './why-shaadime.component.scss'
})
export class WhyShaadiMeComponent {
  @Input() stats: { number: string; label: string }[] = [];
  @Input() points: { icon: string; title: string; description: string }[] = [];
}
