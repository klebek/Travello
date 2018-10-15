import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CountryService } from 'shared/services/country.service';
import { Country } from 'shared/models/country';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/switchMap";

@Component({
  selector: 'countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries: Country[] = [];
  filteredCountries: Country[] = [];
  continent: string;

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService) { }

  async ngOnInit() {
    this.populateCountries();
  }

  private populateCountries() {
    this.countryService
      .getAll()
      .switchMap(countries => {
        this.countries = countries;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.continent = params.get('continent');
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredCountries = (this.continent) ?
      this.countries.filter(c => c.continent === this.continent) :
      this.countries;
  }
}