import { Component, OnInit } from '@angular/core';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Trip } from 'app/travelling/model/trip';
import { TripService } from 'app/travelling/services/trip.service';
import { CountryService } from 'app/travelling/services/country.service';

@Component({
  selector: 'trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class TripFormComponent implements OnInit  {

  trip: Trip = <Trip>{};
  startDate = {};
  endDate = {};
  showNote = false;
  showCard = false;
  alertNote;
  alertCard;
  countriesNames;
  countries = [];

  type;

  idTrip;
  idCard;

  constructor(private tripService: TripService, private countryService: CountryService) {}

  ngOnInit() {
    this.countryService.getName().subscribe(c => {
      this.countriesNames = c;
    });
    this.idTrip = this.tripService.getTripId();
  }
  addCountry(country){
    this.countries.push(country);
    this.trip.countries = this.countries;
  }
  addTrip(trip: Trip) {
    this.tripService.addTrip(trip).subscribe(
      trip => {
      }
    );
  }
  getTrip(id) {
    this.tripService.getTrip(id).subscribe();
  }

  enableNote() {
    this.showNote = true;
    this.type = 1;
  }
  enableCard() {
    this.showCard = true;
    this.type = 0;
  }
  closeAlertNote() {
    this.alertNote = false;
  }
  closeAlertCard() {
    this.alertCard = false;
  }
}
