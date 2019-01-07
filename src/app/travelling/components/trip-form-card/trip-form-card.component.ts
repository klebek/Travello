import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Note } from 'app/travelling/model/note';
import { NoteService } from 'app/travelling/services/note.service';
import { Trip } from 'app/travelling/model/trip';
import { TripService } from 'app/travelling/services/trip.service';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'trip-form-card',
  templateUrl: './trip-form-card.component.html',
  styleUrls: ['./trip-form-card.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class TripFormCardComponent implements OnInit {

  date: Date;
  note = [];
  card = [];
  trip = [];

  idCard;

  noteId;

  notes = [];
  cards = [];

  tripNotes = [];

  // notes = [];
  // cards = [];

  @Input('noteCard') noteCard;
  @Input('idTrip') idTrip;
  @Input('type') type;

  @Input() showNote;
  @Input() showCard;
  @Input() alertNote;
  @Input() alertCard;
  @Input() disabledButton;

  @Output() showNoteChange = new EventEmitter();
  changeShowNote() {
    this.showNote = false;
    this.showNoteChange.emit(false);
  }

  @Output() showCardChange = new EventEmitter();
  changeShowCard() {
    this.showCard = false;
    this.showCardChange.emit(false);
  }

  @Output() disabledButtonChange = new EventEmitter();
  changeDisabledButton() {
    this.disabledButton = false;
    this.disabledButtonChange.emit(false);
  }

  // ALERTS

  @Output() alertNoteChange = new EventEmitter();
  changeAlertNote() {
    this.changeShowNote();
    this.alertNote = true;
    this.alertNoteChange.emit(true);
  }

  @Output() alertCardChange = new EventEmitter();
  changeAlertCard() {
    this.changeShowCard();
    this.alertCard = true;
    this.alertCardChange.emit(true);
  }

  // END ALERTS

  constructor(private noteService: NoteService, private tripService: TripService) {
    this.idCard = Math.floor(Math.random() * (999999 - 1 + 1)) + 1;
  }

  ngOnInit() {
  }

  addNote(note: Note) {
    this.noteService.addNote(this.idTrip, note).subscribe(note => {
      this.tripService.getCards(this.idTrip).subscribe((n: any) => {
        // this.notes.push(note);
        this.notes = n;
        console.log(this.notes)
      });
      this.tripService.getNotes(this.idTrip).subscribe((c: any) => {
        this.cards = c;
        console.log(this.cards)
      })
    });
    this.showNote = false;
    this.showCard = false;
    this.note = [];
    this.card = [];
  }

  deleteNote(id, note: Note) {
    if (!confirm('Are you sure you want to delete this trip?')) return;
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
    const index: number = this.cards.indexOf(card);
    // console.log(index)
    if (index !== -1) {
      this.cards.splice(index, 1);
      console.log("id: " + id)
      this.noteService.deleteNote(id).subscribe(res => { });
    }
    // console.log(this.countries);
  }

}
