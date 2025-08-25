import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { RestCountry } from '../interfaces/res-countries.interfaces';
import { catchError, count, delay, map, Observable, of, tap, throwError } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Region } from '../interfaces/region.interface';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  public isLoading = signal(false)
  public isError = signal
  private queryCacheCapital = new Map<string, Country[]>()
  private queryCacheCountry = new Map<string, Country[]>()
  private queryCacheRegion = new Map<string, Country[]>()

  constructor(private http: HttpClient) { }

  public searchByCapital(query: string): Observable<Country[]> {
    const queryLowerCase = query.toLowerCase()
    console.log("se le pide al service")
    return this.searchCache(this.queryCacheCapital, query) ?? this.http.get<RestCountry[]>(`${API_URL}/capital/${queryLowerCase}`)
      .pipe(
        map(restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        tap(countries => this.queryCacheCapital.set(query, countries)),
        catchError((error) => {
          return throwError(() => new Error('No se pudo encontrar paises con esta query'))
        })
      )
  }

  public searchByCountries(query: string): Observable<Country[]> {
    const queryLowerCase = query.toLowerCase()
    return this.searchCache(this.queryCacheCountry, query) ?? this.http.get<RestCountry[]>(`${API_URL}/name/${queryLowerCase}`).pipe(
      delay(1500),
      map(resCountries => CountryMapper.mapRestCountryArrayToCountryArray(resCountries)),
      tap(countries => this.queryCacheCountry.set(query, countries)),
      catchError((error) => {
        return throwError(() => new Error('No se pudo encontrar paises con esta query'))
      }
      ))
  }

  public searchByRegion(region: Region): Observable<Country[]> {
    return this.searchCache(this.queryCacheRegion, region) ?? this.http.get<RestCountry[]>(`${API_URL}/region/${region}`)
      .pipe(
        map(restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        tap(countries => this.queryCacheRegion.set(region, countries)),
        catchError((error) => {
          return throwError(() => new Error('No se pudo encontrar paises con esta query'))
        })
      )
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

  private searchCache(map: Map<string, Country[]>, query: string): Observable<Country[]> | undefined {
    return map.has(query) ? of(map.get(query) ?? []) : undefined
  }
}
