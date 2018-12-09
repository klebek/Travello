import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateParserFormatter, NgbDateStruct, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Trip } from 'app/travelling/model/trip';
import { Observable } from 'rxjs/Observable';
import { TripService } from 'app/travelling/services/trip.service';
import { CountryService } from 'app/travelling/services/country.service';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class TripFormComponent {

  trip: Trip = <Trip>{};
  startDate = {};
  endDate = {};
  showNote;
  showCard;
  alertNote;
  alertCard;
  countriesNames;
  countries = [];

  constructor(private tripService: TripService, private countryService: CountryService) {
    this.tripService.getAccount().subscribe(a => console.log(a));
    this.getTrip();
  }

  ngOnInit() {
    this.countryService.getName().subscribe(c => {
      this.countriesNames = c;
    });
  }
  addCountry(country){
    this.countries.push(country);
    this.trip.countries = this.countries;
  }
  addTrip(trip: Trip) {
    this.tripService.addTrip(trip).subscribe(
      trip => {
        // console.log(trip);
      }
    );
  }
  getTrip() {
    this.tripService.getTrip().subscribe(t => console.log(t));
  }

  enableNote() {
    this.showNote = true;
  }
  enableCard() {
    this.showCard = true;
  }
  closeAlertNote() {
    this.alertNote = false;
  }
  closeAlertCard() {
    this.alertCard = false;
  }
}
