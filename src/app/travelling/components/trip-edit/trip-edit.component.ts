import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from 'app/travelling/services/trip.service';
import { Subscription } from 'rxjs/Subscription';
import { CountryService } from 'app/travelling/services/country.service';
import { Trip } from 'app/travelling/model/trip';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class TripEditComponent implements OnInit, OnDestroy {

  id;
  trip;
  countriesNames;
  countries = [];
  tripCountries;
  tripStatus;

  subscriptionTrip: Subscription;
  subscriptionTripCountries: Subscription;

  constructor(private route: ActivatedRoute, private tripService: TripService, private countryService: CountryService) {
    this.id = this.route.snapshot.params['id'];
    this.subscriptionTrip = this.tripService.getTrip(this.id).subscribe(t => {
      this.trip = t;
      if(this.trip.status == "PUBLIC") { this.tripStatus = 1; }
      else if(this.trip.status == "PRIVATE") { this.tripStatus = 0; }
    });
    this.subscriptionTripCountries = this.tripService.getCountries(this.id).subscribe(c => {
      this.tripCountries = c;
      this.countries = this.tripCountries;
    });
  }

  ngOnInit() {
    this.countryService.getName().subscribe(c => {
      this.countriesNames = c;
    });
  }

  deleteCountry(name: string) {
    const index: number = this.tripCountries.indexOf(name);
    console.log(index)
    if (index !== -1) {
      this.tripCountries.splice(index, 1);
    }
    console.log(this.tripCountries);
  }

  addCountry(country) {
    this.countries.push(country);
    this.tripCountries = this.countries;
    console.log(this.tripCountries);
  }

  addTrip(trip: Trip) {
    this.tripService.addTrip(trip).subscribe(
      trip => {
      }
    );
  }

  ngOnDestroy() {
    this.subscriptionTrip.unsubscribe();
    this.subscriptionTripCountries.unsubscribe();
  }

}
