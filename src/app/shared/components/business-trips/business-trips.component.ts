import { Component, OnInit } from '@angular/core';
import { CountryService } from 'shared/services/country.service';
import { Country } from 'shared/models/country';
import { ActivatedRoute } from '@angular/router';
import { TripService } from 'app/travelling/services/trip.service';

@Component({
  selector: 'business-trips',
  templateUrl: './business-trips.component.html',
  styleUrls: ['./business-trips.component.css']
})
export class BusinessTripsComponent implements OnInit {

  countries: Country[] = [];
  filteredCountries: Country[] = [];
  continent: string;

  trips: any = [];

  constructor(private tripsService: TripService, private route: ActivatedRoute,) { }

  ngOnInit() {
    this.tripsService.getAll().subscribe(t => this.trips = t);
    // this.populateCountries();
  }

  // private populateCountries() {
  //   this.countryService
  //     .getAll()
  //     .switchMap(countries => {
  //       this.countries = countries;
  //       return this.route.queryParamMap;
  //     })
  //     .subscribe(params => {
  //       this.continent = params.get('continent');
  //       this.applyFilter();
  //     });
  // }

  // private applyFilter() {
  //   this.filteredCountries = (this.continent) ?
  //     this.countries.filter(c => c.continent === this.continent) :
  //     this.countries;
  // }

}
