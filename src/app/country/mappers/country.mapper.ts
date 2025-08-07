import type { Country } from "../interfaces/country.interface";
import type { RestCountry } from "../interfaces/res-countries.interfaces";

export class CountryMapper {
  // static RestCountry => Country
  static mapRestCountryToCountry(restCountry: RestCountry): Country{
    return {
      capital: restCountry.capital.join(','),
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No spanish name',
      population: restCountry.population
    }
  }

  //static RestCountry[] => Country[]
  static mapRestCountryArrayToCountryArray(restCountries: RestCountry[]): Country[] {
    return restCountries.map((country) => this.mapRestCountryToCountry(country))
  }
}