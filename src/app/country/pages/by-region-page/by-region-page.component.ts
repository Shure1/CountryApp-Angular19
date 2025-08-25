import { Component, computed, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Location } from '@angular/common';
import { Region } from '../../interfaces/region.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent {
  public selectedRegion = signal<Region | null>(null)
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  constructor(private countryService: CountryService) {}

  public selectRegion(region: Region) {
    this.selectedRegion.set(region)
  }

  public countryResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({ request }) => {
      if(!request.region) return of([])
      return this.countryService.searchByRegion(request.region)
    }
  })
}
