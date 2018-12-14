import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'country' })

export class CountryPipe implements PipeTransform {

  transform(countries: any, searchCountry: any): any {

    if (searchCountry == null) return countries;
    return countries.filter(function (c) {
      return c.countries.toString().toLowerCase().indexOf(searchCountry.toLowerCase()) > -1
    })
  }
}