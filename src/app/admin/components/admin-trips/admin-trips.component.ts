import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DataTableResource } from 'angular5-data-table';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { TripService } from 'app/travelling/services/trip.service';
import { Trip } from 'app/travelling/model/trip';

@Component({
  selector: 'app-admin-trips',
  templateUrl: './admin-trips.component.html',
  styleUrls: ['./admin-trips.component.css']
})
export class AdminTripsComponent {

  blocked = false;

  trip;

  subscription: Subscription

  trips;
  
  constructor(config: NgbRatingConfig, private tripService: TripService) {
    config.max = 5;
    config.readonly = true;
    this.subscription = this.tripService.getAll().subscribe(t => this.trips = t);
  }

  block(id) {
    this.tripService.getTrip(id).subscribe(t => {
      this.trip = t;
      console.log("przed: " + this.trip.status);
      let privateStatus = 1;
      this.tripService.changeStatus(id, this.trip, privateStatus);
      console.log(this.trip.status);
    });
  }

}
 