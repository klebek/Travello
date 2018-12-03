import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'trip-form-card',
  templateUrl: './trip-form-card.component.html',
  styleUrls: ['./trip-form-card.component.css']
})
export class TripFormCardComponent implements OnInit {

  @Input('noteCard') noteCard;

  @Input() showNote;
  @Input() showCard;
  @Input() alertNote;
  @Input() alertCard;

  date: any;

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

  constructor() { }

  ngOnInit() {
  }

}
