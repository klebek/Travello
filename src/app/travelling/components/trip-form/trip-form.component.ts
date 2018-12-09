import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { Trip } from 'app/travelling/model/trip';
import { Observable } from 'rxjs/Observable';
import { TripService } from 'app/travelling/services/trip.service';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css']
})
export class TripFormComponent {

  trip: Trip = <Trip>{};
  startDate = {};
  endDate = {};
  showNote;
  showCard;
  alertNote;
  alertCard;

  constructor(private tripService: TripService) {
    this.tripService.getAccount().subscribe(a => console.log(a));
    this.getTrip();
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
