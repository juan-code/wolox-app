import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { environment } from '@env/environment';

import { Country } from './country.entity';

@Injectable()
export class CountryService {
  private listCountries: Country[] = [];
  private readonly apiCountry:string = environment.apiCountry;
  private readonly versionApi:string = 'v2';
  constructor(
    private readonly http: HttpClient,
  ) {}

  public getListCountry(): Observable<Country[]> {
    if(this.listCountries.length) {
      return of(this.listCountries)
    }
    return this.http.get<Country[]>(this.buildUrl('all'));
  }

  private buildUrl(path:string) {
    return `${this.apiCountry}/${this.versionApi}/${path}`
  }
}
