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
    expect(element.querySelector('app-why')).toBeTruthy();
    expect(element.querySelector('app-venues')).toBeTruthy();
    expect(element.querySelector('app-faq')).toBeTruthy();
  });

  it('changes the active hero when requested', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.componentInstance;

    component.setActiveHero(2);

    expect(component.activeHeroIndex).toBe(2);
  });

  it('cleans up the hero timer on destroy', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.componentInstance;
    const clearIntervalSpy = spyOn(window, 'clearInterval');

    component.ngOnInit();
    component.ngOnDestroy();

    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});
