import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { RestCountry } from '../interfaces/res-countries.interfaces';
import { catchError, delay, map, Observable, tap, throwError } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  public isLoading = signal(false)
  public isError = signal

  constructor(private http: HttpClient) { }

  public searchByCapital(query: string): Observable<Country[]> {
    const queryLowerCase = query.toLowerCase()
    return this.http.get<RestCountry[]>(`${API_URL}/capital/${queryLowerCase}`)
    .pipe(
      map(restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
      catchError((error) => {
        return throwError(() => new Error('No se pudo encontrar paises con esta query'))
      })
    )
  }

  public  searchByCountries(query: string): Observable<Country[]> {
    const queryLowerCase = query.toLowerCase()
    return this.http.get<RestCountry[]>(`${API_URL}/name/${queryLowerCase}`).pipe(
      delay(1500),
      tap(res => console.log(res)),
      map(resCountries => CountryMapper.mapRestCountryArrayToCountryArray(resCountries)),
      catchError((error) => {
        return throwError(() => new Error('No se pudo encontrar paises con esta query'))
      }
    ))
  }

  public searchByCode(code: string): Observable<Country> {
    return this.http.get<RestCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      delay(1500),
      tap(res => console.log(res)),
      map(resCountries => CountryMapper.mapRestCountryArrayToCountryArray(resCountries)),
      map(countries => countries[0]),
      catchError((error) => {
        return throwError(() => new Error(`No se pudo encontrar paises con este codigo: ${code}`))
      }
    ))
  }
}
