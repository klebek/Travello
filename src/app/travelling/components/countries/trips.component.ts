import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CountryService } from 'shared/services/country.service';
import { Country } from 'shared/models/country';
import "rxjs/add/operator/switchMap";
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { Trip } from 'app/travelling/model/trip';
import { TripService } from 'app/travelling/services/trip.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
})
export class TripsComponent implements OnInit, OnDestroy {

  countries: Country[] = [];
  filteredCountries: Country[] = [];
  countriess;
  appUser: AppUser;
  searchText;
  i;
  searchCountry;
  filteredTrips;
  subscription: Subscription;

  trips: any = [];

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
    private tripService: TripService,
    private auth: AuthService) { }

  async ngOnInit() {
    // this.populateCountries();
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.subscription = this.tripService.getAll().subscribe(t => this.filteredTrips = this.trips = t);
  }

  filter(query: string) {
    this.filteredTrips = (query) ?
      this.trips.filter(t => {
        for (let c of t.countries) {
          let i = 0;
          c[i].toLowerCase().includes(query.toLowerCase())
          i++;
        }
      }) :
      this.trips;
    console.log(query);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // private populateCountries() {
  //   this.tripService
  //     .getAll()
  //     .switchMap(trips => {
  //       this.trips = trips;
  //       return this.route.queryParamMap;
  //     })
  //     .subscribe(params => {
  //       this.countriess = params;
  //       console.log("from populateSubscirbe " + this.countriess);
  //       this.applyFilter();
  //     });
  // }

  // private applyFilter() {
  //   this.filteredCountries = (this.trips) ?
  //     this.countries.filter(c => c.name === this.trips) :
  //     this.countries;
  //     console.log("from applyFilter " + this.countries);
  // }
}