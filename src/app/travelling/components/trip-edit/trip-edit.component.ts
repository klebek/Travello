import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from 'app/travelling/services/trip.service';
import { Subscription } from 'rxjs/Subscription';
import { CountryService } from 'app/travelling/services/country.service';
import { Trip } from 'app/travelling/model/trip';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Card } from 'app/travelling/model/card';
import { NoteService } from 'app/travelling/services/note.service';
import { Note } from 'app/travelling/model/note';

@Component({
  selector: 'trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
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

  type;

  card = [];
  note = [];

  noteDates = [];

  editCards = false;
  editNotes = false;
  editTripp = true;

  subscriptionTrip: Subscription;
  subscriptionTripCountries: Subscription;

  constructor(private route: ActivatedRoute, private tripService: TripService, private countryService: CountryService, private noteService: NoteService) {
    this.id = this.route.snapshot.params['id'];
    this.subscriptionTripCountries = this.tripService.getCountries(this.id).subscribe(c => {
      this.tripCountries = c;
      this.countries = this.tripCountries;
    });
  }

  ngOnInit() {
    this.subscriptionTrip = this.tripService.getTrip(this.id).subscribe(t => {
      this.trip = t;
      if (this.trip.status == "PUBLIC") { this.tripStatus = 1; this.trip.status = 1 }
      else if (this.trip.status == "PRIVATE") { this.tripStatus = 0; this.trip.status = 0 }
      this.startDateApp = new Date(this.trip.startDate);
      this.endDateApp = new Date(this.trip.endDate);
    });
    this.getCards();
    this.getNotes();
    this.countryService.getName().subscribe(c => {
      this.countriesNames = c;
    });
  }

  getCards() {
    this.tripService.getCards(this.id).subscribe(n => this.cards = n);
  }

  getNotes() {
    this.tripService.getNotes(this.id).subscribe(n => {
      this.notes = n
      for (let note of this.notes) {
        note.date = new Date(note.date);
      }
    });
  }

  addCardFunction(id, note) {
    this.noteService.addNote(id, note).subscribe(
      card => { }
    );
    this.addCard = false;
    this.addNote = false;
    this.getCards();
    this.getNotes();
  }

  deleteCountry(name: string) {
    const index: number = this.tripCountries.indexOf(name);
    // console.log(index)
    if (index !== -1) {
      this.tripCountries.splice(index, 1);
    }
    // console.log(this.tripCountries);
  }

  addCountry(country) {
    this.countries.push(country);
    this.tripCountries = this.countries;
    console.log(this.tripCountries);
  }

  addTrip(trip: Trip) {
    this.tripService.addTrip(trip).subscribe(trip => { });
  }

  editTrip(id, trip: Trip) {
    this.tripService.editTrip(id, trip).subscribe(trip => { });
  }

  editNote(id, note: Note) {
    let tripId = this.id;
    this.noteService.editNote(id, tripId, note).subscribe(note => { });
    this.getCards();
    this.getNotes();
  }

  deleteNote(id) {
    this.noteService.deleteNote(id).subscribe(res => { });
    this.getCards();
    this.getNotes();
  }

  ngOnDestroy() {
    this.subscriptionTrip.unsubscribe();
    this.subscriptionTripCountries.unsubscribe();
  }

  showAddNote() {
    this.addNote = true;
    this.type = 1;
  }
  showAddCard() {
    this.addCard = true;
    this.type = 0;
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
    this.type = 1;
  }
  enableEditCards() {
    this.editCards = true;
    this.editTripp = false;
    this.editNotes = false;
    this.type = 0;
  }

}
