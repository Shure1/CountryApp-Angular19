import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByCountryInformationComponent } from './by-country-information.component';

describe('ByCountryInformationComponent', () => {
  let component: ByCountryInformationComponent;
  let fixture: ComponentFixture<ByCountryInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByCountryInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByCountryInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
