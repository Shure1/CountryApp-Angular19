import { Component, computed, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-by-country-information',
  imports: [DecimalPipe],
  templateUrl: './by-country-information.component.html',
  styleUrl: './by-country-information.component.css'
})
export class ByCountryInformationComponent {

  public country = input.required<Country>()

  public currentYear = computed(() => {
    return new Date().getFullYear();
  })

}
