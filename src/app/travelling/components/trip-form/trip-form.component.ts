import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css']
})
export class TripFormComponent {

  startTime = {};
  endTime = {};
  showNote;
  showCard;

  constructor() {
  }

  enableNote() {
    this.showNote = true;
  }
  enableCard() {
    this.showCard = true;
  }
}
