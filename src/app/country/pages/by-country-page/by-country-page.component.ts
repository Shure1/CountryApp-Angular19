import { Component, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../../shared/components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent {
  public query = signal('')

  constructor(private readonly countryService: CountryService) {}

  //TODO: Manejo con resource de peticiones, retorna un Observable
  public countryResourceRx = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([])

      return this.countryService.searchByCountries(request.query)
    }
  })

  //TODO: Manejo con resource de peticiones, retorna un Promise
 /*  public countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async ({ request }) => {
      if (!request.query) return []

      return await firstValueFrom(this.countryService.searchByCountries(request.query))
    }
  }) */

}
