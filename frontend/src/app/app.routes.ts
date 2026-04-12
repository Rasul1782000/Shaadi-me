import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PageVenuesComponent } from './pages/venues/PageVenuesComponent';
import { WeddingsComponent } from './pages/weddings/weddings.component';
import { ServicesComponent } from './pages/services/services.component';
import { DestinationsComponent } from './pages/destinations/destinations.component';
import { PressComponent } from './pages/press/press.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'venues', component: PageVenuesComponent },
  { path: 'weddings', component: WeddingsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'destinations', component: DestinationsComponent },
  { path: 'press', component: PressComponent },
  { path: '**', redirectTo: '' }
];
