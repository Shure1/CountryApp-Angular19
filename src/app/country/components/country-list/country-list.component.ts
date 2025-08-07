import { Component, input } from '@angular/core';
import { RestCountry } from '../../interfaces/res-countries.interfaces';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.css'
})
export class CountryListComponent {

  public countries = input.required<Country[]>()
  public errorMessage = input<string | unknown>()
  public isLoading = input<boolean>(false)
  public isEmpty = input<boolean>(false)

}
