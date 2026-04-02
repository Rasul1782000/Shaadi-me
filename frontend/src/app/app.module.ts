import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

import { AppComponent } from './app';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { WeddingsComponent } from './pages/weddings/weddings.component';
import { VenuesComponent } from './pages/venues/venues.component';
import { ServicesComponent } from './pages/services/services.component';
import { DestinationsComponent } from './pages/destinations/destinations.component';
import { AboutComponent } from './pages/about/about.component';
import { PressComponent } from './pages/press/press.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PlanPageComponent } from './pages/plan/plan.component';

// Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { IntakeFormComponent } from './components/intake-form/intake-form.component';

// Landing Page Details
import { HeroComponent } from './components/landing-page/hero/hero.component';
import { ThemesComponent } from './components/landing-page/themes/themes.component';
import { CitiesComponent } from './components/landing-page/cities/cities.component';
import { VenuesComponent as LandingVenuesComponent } from './components/landing-page/venues/venues.component';
import { DecorComponent } from './components/landing-page/decor/decor.component';
import { FaqComponent } from './components/landing-page/faq/faq.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomeComponent,
    WeddingsComponent,
    VenuesComponent,
    ServicesComponent,
    DestinationsComponent,
    AboutComponent,
    PressComponent,
    ContactComponent,
    PlanPageComponent,
    NavbarComponent,
    FooterComponent,
    IntakeFormComponent,
    HeroComponent,
    ThemesComponent,
    CitiesComponent,
    LandingVenuesComponent,
    DecorComponent,
    FaqComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    CardModule,
    DividerModule
  ],
  providers: [],
  bootstrap: [AppComponent] // Trigger rebuild
})
export class AppModule { }
