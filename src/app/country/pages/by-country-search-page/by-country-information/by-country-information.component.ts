import { Component, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-information',
  imports: [],
  templateUrl: './by-country-information.component.html',
  styleUrl: './by-country-information.component.css'
})
export class ByCountryInformationComponent {

  public country = input.required<Country>()

}
