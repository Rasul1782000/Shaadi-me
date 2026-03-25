import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WeddingsComponent } from './pages/weddings/weddings.component';
import { VenuesComponent } from './pages/venues/venues.component';
import { ServicesComponent } from './pages/services/services.component';
import { DestinationsComponent } from './pages/destinations/destinations.component';
import { AboutComponent } from './pages/about/about.component';
import { PressComponent } from './pages/press/press.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'weddings', component: WeddingsComponent },
  { path: 'venues', component: VenuesComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'destinations', component: DestinationsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'press', component: PressComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' }
];
