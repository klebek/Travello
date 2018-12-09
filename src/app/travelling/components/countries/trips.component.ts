import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CountryService } from 'shared/services/country.service';
import { Country } from 'shared/models/country';
import "rxjs/add/operator/switchMap";
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { Trip } from 'app/travelling/model/trip';
import { TripService } from 'app/travelling/services/trip.service';

@Component({
  selector: 'trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  countries: Country[] = [];
  filteredCountries: Country[] = [];
  continent: string;
  appUser: AppUser;
  searchName;

  trips: any = [];

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
    private tripService: TripService,
    private auth: AuthService) { }

  async ngOnInit() {
    // this.populateCountries();
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.tripService.getAll().subscribe(t => this.trips = t);
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