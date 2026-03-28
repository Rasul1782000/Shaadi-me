import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { LeadService } from '../../services/lead.service';

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        {
          provide: LeadService,
          useValue: {
            submitLead: () => of({})
          }
        }
      ]
    }).compileComponents();
  });

  it('renders the landing page sections', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('app-hero')).toBeTruthy();
    expect(element.querySelector('app-cities')).toBeTruthy();
    expect(element.querySelector('app-decor')).toBeTruthy();
    expect(element.querySelector('app-themes')).toBeTruthy();
    expect(element.querySelector('app-why')).toBeFalsy();
    expect(element.querySelector('app-venues')).toBeTruthy();
    expect(element.querySelector('app-faq')).toBeTruthy();
  });

  it('uses the React v0.1 content counts for the cloned sections', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.componentInstance;

    expect(component.heroSlides.length).toBe(4);
    expect(component.cities.length).toBe(3);
    expect(component.decorStyles.length).toBe(5);
    expect(component.themes.length).toBe(5);
    expect(component.venues.length).toBe(5);
  });

  it('keeps the planner modal closed by default', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('app-intake-form')).toBeFalsy();
  });
});
