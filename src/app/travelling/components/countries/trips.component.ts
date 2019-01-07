import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CountryService } from 'shared/services/country.service';
import { Country } from 'shared/models/country';
import "rxjs/add/operator/switchMap";
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { Trip } from 'app/travelling/model/trip';
import { TripService } from 'app/travelling/services/trip.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
})
export class TripsComponent implements OnInit, OnDestroy {

  countries = [];
  continent;
  appUser: any;
  searchText;
  i;
  searchCountry;
  filteredTrips;
  filteredTripsBusiness;
  subscription: Subscription;

  trips: any = [];

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private auth: AuthService) {
    this.populateTrips();
    this.appUser = JSON.parse(localStorage.getItem('user'));
    this.subscription = this.tripService.getAll().subscribe(t => {
      this.filteredTrips = this.trips = t;
      this.filteredTrips = this.filteredTrips.filter(s => s.status != "PRIVATE" && s.status != "BLOCKED" && s.business != true);
      this.filteredTripsBusiness = this.trips.filter(s => s.status != "PRIVATE" && s.status != "BLOCKED" && s.business === true);
    });
  }

  ngOnInit() {

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
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

  }

  private populateTrips() {
    this.tripService
      .getAll()
      .switchMap(trips => {
        this.trips = trips;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.continent = params.get('continent');
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredTrips = (this.continent) ?
      this.trips.filter(t => {
        t.continent === this.continent
      }) :
      this.trips;
  }
}
