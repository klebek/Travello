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
  startDateApp;
  endDateApp;

  addNote = false;
  addCard = false;

  notes;
  cards;

  noteDates = [];

  editCards = false;
  editNotes = false;
  editTripp = true;

  subscriptionTrip: Subscription;
  subscriptionTripCountries: Subscription;

  constructor(private route: ActivatedRoute, private tripService: TripService, private countryService: CountryService) {
    this.id = this.route.snapshot.params['id'];
    this.subscriptionTripCountries = this.tripService.getCountries(this.id).subscribe(c => {
      this.tripCountries = c;
      this.countries = this.tripCountries;
    });
  }

  ngOnInit() {
    this.subscriptionTrip = this.tripService.getTrip(this.id).subscribe(t => {
      this.trip = t;
      if(this.trip.status == "PUBLIC") { this.tripStatus = 1; this.trip.status = 1}
      else if(this.trip.status == "PRIVATE") { this.tripStatus = 0; this.trip.status = 0}
      this.startDateApp = new Date(this.trip.startDate);
      this.endDateApp = new Date(this.trip.endDate);
    });
    this.tripService.getCards(this.id).subscribe(n => this.cards = n);
    this.tripService.getNotes(this.id).subscribe(n => {
      this.notes = n
      for(let note of this.notes) {
        note.date = new Date(note.date);
      }
    });
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
      trip => {}
    );
  }

  editTrip(id, trip: Trip) {
    // console.log(id + " " + trip.title);
    this.tripService.editTrip(id, trip).subscribe(
      trip => {}
    )
  }

  ngOnDestroy() {
    this.subscriptionTrip.unsubscribe();
    this.subscriptionTripCountries.unsubscribe();
  }

  showAddNote(){
    this.addNote = true;
  }
  showAddCard(){
    this.addCard = true;
  }

  enableEditTrip() {
    this.editTripp = true;
    this.editNotes = false;
    this.editCards = false;
  }
  enableEditNotes() {
    this.editNotes = true;
    this.editTripp = false;
    this.editCards = false;
  }
  enableEditCards() {
    this.editCards = true;
    this.editTripp = false;
    this.editNotes = false;
  }

}
