import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get('https://restcountries.eu/rest/v2/all?fields=name;capital;population;languages');
  }
  getName(): Observable<any> {
    return this.http.get('https://restcountries.eu/rest/v2/all?fields=name');
  }
  getCountry(name): Observable<any> {
    return this.http.get('https://restcountries.eu/rest/v2/name/' + name);
  }
}
