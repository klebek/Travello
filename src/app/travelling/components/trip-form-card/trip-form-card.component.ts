import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Alert } from 'selenium-webdriver';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Note } from 'app/travelling/model/note';
import { NoteService } from 'app/travelling/services/note.service';

@Component({
  selector: 'trip-form-card',
  templateUrl: './trip-form-card.component.html',
  styleUrls: ['./trip-form-card.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class TripFormCardComponent implements OnInit {

  date: Date;
  note: Note[] = [];

  @Input('noteCard') noteCard;

  @Input() showNote;
  @Input() showCard;
  @Input() alertNote;
  @Input() alertCard;

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

  constructor(private noteService: NoteService) { }

  ngOnInit() {
  }

  addNote(note: Note) {
    this.noteService.addNote(note).subscribe(
      note => {
        // console.log(trip);
      }
    );
  }

}
