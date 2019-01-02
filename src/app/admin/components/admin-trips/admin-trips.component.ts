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
export class AdminTripsComponent implements OnDestroy {

  blocked = false;

  trip;
  privateStatus = 0;
  publicStatus = 1;

  subscription: Subscription

  trips: Trip[];
  filteredTrips: Trip[];

  constructor(config: NgbRatingConfig, private tripService: TripService) {
    config.max = 5;
    config.readonly = true;
    this.getTrips();
  }

  getTrips(){
    this.subscription = this.tripService.getAll()
    .subscribe((t: Trip[]) => this.filteredTrips = this.trips = t);
  }

  filterById(query1: number) {
    let query1str = query1.toString();
    this.filteredTrips = (query1str) ?
      this.trips.filter(t => t.id.toString().toLowerCase().includes(query1str.toLowerCase())) :
      this.trips;
  }

  filterByTitle(query2: string) {
    this.filteredTrips = (query2) ?
      this.trips.filter(t => t.title.toLowerCase().includes(query2.toLowerCase())) :
      this.trips;
  }

  filterByTraveller(query3: string) {
    this.filteredTrips = (query3) ?
      this.trips.filter(t => t.title.toLowerCase().includes(query3.toLowerCase())) :
      this.trips;
  }

  changeStatus(id, status) {
    this.tripService.changeStatus(id, status).subscribe(status => {});
    this.getTrips();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
