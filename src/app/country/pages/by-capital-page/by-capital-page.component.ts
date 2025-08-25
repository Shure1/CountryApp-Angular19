import { Component, computed, effect, inject, linkedSignal, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop'
import { SearchInputComponent } from "../../../shared/components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  public isLoading = signal(false)
  public isError = signal(null)
  public countries = signal<Country[]>([])

  public activatedRoute = inject(ActivatedRoute)

  
  public queryParam: string = this.activatedRoute.snapshot.queryParamMap.get('query') ?? ''
  public query = linkedSignal(() => this.queryParam)

  constructor(
    private countryService: CountryService,
    private router: Router
  ) {
  }

  //TODO: Manejo con resource de peticiones, retorna un Observable
  public countryResourceRx = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([])
      this.router.navigate(['/country/by-capital'], { queryParams:{ query: request.query }})
       
      return this.countryService.searchByCapital(request.query)
    }
  })

  //TODO: Manejo con resource de peticiones, retorna un Promise
  public countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async ({ request }) => {
      if (!request.query) return []

      return await firstValueFrom(this.countryService.searchByCapital(request.query))
    }
  })

  public errorResource = computed(() => { this.countryResource.error() })

  private errEff = effect(() => {
    if(this.countryResource.error()) {
      this.hanldeError()
    }
  })


  //TODO: Manejo tradicional de peticiones 
  public onSearch(value: string) {
    if (this.isLoading()) return

    this.isLoading.set(true)
    this.isError.set(null)
    console.log({ value })

    this.countryService.searchByCapital(value)
      .subscribe({
        next: (countries) => {
          this.isLoading.set(false)
          this.countries.set(countries)
        },
        error: (err) => {
          console.log(err)
          this.isLoading.set(false)
          this.countries.set([])
          this.isError.set(err)
        },
      })
  }

  private hanldeError() {
    console.log('entra al handleError')
  }
}
