import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByCountrySearchPageComponent } from './by-country-search-page.component';

describe('ByCountrySearchPageComponent', () => {
  let component: ByCountrySearchPageComponent;
  let fixture: ComponentFixture<ByCountrySearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByCountrySearchPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByCountrySearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
