import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'ShaadiMe';
}
