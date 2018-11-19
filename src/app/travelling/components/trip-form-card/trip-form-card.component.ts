import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'trip-form-card',
  templateUrl: './trip-form-card.component.html',
  styleUrls: ['./trip-form-card.component.css']
})
export class TripFormCardComponent implements OnInit {

  @Input('noteCard') noteCard;

  @Input() showNote;
  @Input() showCard;

  @Output() showNoteChange = new EventEmitter();
  changeOne() {
    this.showNote = false;
    this.showNoteChange.emit(false);
  }

  @Output() showCardChange = new EventEmitter();
  changeTwo() {
    this.showCard = false;
    this.showCardChange.emit(false);
  }

  constructor() { }

  ngOnInit() {
  }

  disableNote(){
    this.showNote = false;
  }

  disableCard() {
    this.showCard = false;
  }

}
