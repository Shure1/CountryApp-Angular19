import { Component, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from '../../../shared/components/not-found/not-found.component';
import { ByCountryInformationComponent } from './by-country-information/by-country-information.component';

@Component({
  selector: 'app-by-country-search-page',
  imports: [NotFoundComponent, ByCountryInformationComponent],
  templateUrl: './by-country-search-page.component.html',
  styleUrl: './by-country-search-page.component.css'
})
export class ByCountrySearchPageComponent {

  public countryCode: string

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService
  ) {
    this.countryCode = this.activatedRoute.snapshot.params['code']
  }

  public countryResource = rxResource({
    request: () => ({ code: this.countryCode }),
    loader: ({ request }) => {
      return this.countryService.searchByCode(request.code)
    }

  })

}
