import { Component, OnInit } from '@angular/core';
import { CountryService } from 'shared/services/country.service';
import { Country } from 'shared/models/country';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'business-trips',
  templateUrl: './business-trips.component.html',
  styleUrls: ['./business-trips.component.css']
})
export class BusinessTripsComponent implements OnInit {

  countries: Country[] = [];
  filteredCountries: Country[] = [];
  continent: string;

  constructor(private countryService: CountryService, private route: ActivatedRoute,) { }

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
