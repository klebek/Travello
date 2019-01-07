import { Component, OnInit } from '@angular/core';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Trip } from 'app/travelling/model/trip';
import { TripService } from 'app/travelling/services/trip.service';
import { CountryService } from 'app/travelling/services/country.service';
import { Router } from '@angular/router';
import { NoteService } from 'app/travelling/services/note.service';
import { Note } from 'app/travelling/model/note';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class TripFormComponent implements OnInit  {

  trip: Trip = <Trip>{};
  startDateApp;
  endDate;
  showNote = false;
  showCard = false;
  alertNote;
  alertCard;
  countriesNames;

  notes = [];
  cards = [];
  note = []
  card = [];
  
  countries = [];

  continents = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  region;
  type;

  // ZMIEN TO ZEBY USTAWIANO W NG ON INIT-> 
  businessUser = true;

  tripValid = false;

  disabledButton = true;
  staticAlertClosed = false;

  idTrip;
  idCard;

  constructor(private tripService: TripService, private countryService: CountryService, private router: Router, private noteService: NoteService) {
  }

  ngOnInit() {
    // setTimeout(() => this.staticAlertClosed = true, 20000);
    this.countryService.getName().subscribe(c => {
      this.countriesNames = c;
    });
    this.idTrip = this.tripService.getTripId();
    this.tripService.getCountries(this.idTrip).subscribe((c: any[]) => {
      this.countries = c;
    });
  }
  addCountry(form, country){
    this.tripValid = form;
    this.countries.push(country);
    this.trip.countries = this.countries;
    this.tripValid = true;
    console.log(form + " " + this.tripValid);
  }
  // addCountry(country: string) {
  //   this.tripService.addCountry(country).subscribe(country =>{});
  //   console.log("Po dodaniu: " + this.countries);
  // }
  addTrip(trip: Trip) {
    this.tripService.addTrip(trip).subscribe(trip => {});
  }
  getTrip(id) {
    this.tripService.getTrip(id).subscribe();
  }

  deleteCountry(form, name: string) {
    this.tripValid = form
    if (!confirm('Are you sure you want to delete this?')) return;
    const index: number = this.countries.indexOf(name);
    // console.log(index)
    if (index !== -1) {
      this.countries.splice(index, 1);
    }
    if(this.countries.length < 1) this.trip.countries = "";
    // console.log(this.countries);
  }

  showContinent(value){
    this.region = value;
  }

  addNote(note: Note) {
    this.noteService.addNote(this.idTrip, note).subscribe(note => {
      this.tripService.getCards(this.idTrip).subscribe((n: any) => {
        // this.notes.push(note);
        this.notes = n;
        this.ngOnInit();
        // console.log(this.notes)
      });
      this.tripService.getNotes(this.idTrip).subscribe((c:any)=> {
        this.cards = c;
        this.ngOnInit();
        // console.log(this.cards)
      })
    });
    this.showNote = false;
    this.showCard = false;
    this.note = [];
    this.card = [];
  }

  deleteNote(id, note: Note) {
    if (!confirm('Are you sure you want to delete this?')) return;
    const index: number = this.notes.indexOf(note);
    // console.log(index)
    if (index !== -1) {
      this.notes.splice(index, 1);
      console.log("id: " + id)
      this.noteService.deleteNote(id).subscribe(res => { });
    }
    // console.log(this.countries);
  }
  deleteCard(id, card) {
    if (!confirm('Are you sure you want to delete this?')) return;
    const index: number = this.cards.indexOf(card);
    // console.log(index)
    if (index !== -1) {
      this.cards.splice(index, 1);
      console.log("id: " + id)
      this.noteService.deleteNote(id).subscribe(res => { });
    }
    // console.log(this.countries);
  }

  enableNote() {
    this.showCard = false;
    this.showNote = true;
    this.type = 1;
  }
  enableCard() {
    this.showNote = false;
    this.showCard = true;
    this.type = 0;
  }
  closeAlertNote() {
    this.alertNote = false;
  }
  closeAlertCard() {
    this.alertCard = false;
  }
  hideNoteForm(){
    this.showNote = false;
  }
  hideCardForm(){
    this.showNote = false;
  }
}
