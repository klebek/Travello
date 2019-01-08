import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DataTableResource } from 'angular5-data-table';
import { NgbRatingConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TripService } from 'app/travelling/services/trip.service';
import { Trip } from 'app/travelling/model/trip';
import { WarningComponent } from '../warning/warning.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-trips',
  templateUrl: './admin-trips.component.html',
  styleUrls: ['./admin-trips.component.scss']
})
export class AdminTripsComponent implements OnDestroy, OnInit {

  blocked = false;

  trip;
  privateStatus = 0;
  publicStatus = 1;
  blockedStatus = 2;

  businessMail = 0;
  blockMail = 1;
  userMail = 2;

  traveller;

  selected;

  subscription: Subscription

  trips: Trip[];
  filteredTrips: Trip[];

  constructor(config: NgbRatingConfig, private tripService: TripService, private modalService: NgbModal) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(){
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
    this.tripService.changeStatus(id, status).subscribe(status => { this.ngOnInit(); });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  warn(id) {
    const modalRef = this.modalService.open(WarningComponent);
    // modalRef.componentInstance.name = 'World';
    this.tripService.getTraveller(id).subscribe(t => {
      this.traveller = t
      modalRef.componentInstance.name = this.traveller.username;
      modalRef.componentInstance.type = this.blockMail;
      modalRef.componentInstance.userEmail = this.traveller.email;
      modalRef.componentInstance.userId = this.traveller.id;
      modalRef.componentInstance.tripId = id;
    });
    // console.log(id);
  }

  getRate(id) {
    this.tripService.getRate(id).subscribe((rate) => {
      console.log("Got rate: " + rate);
      if(rate != Number) this.selected = 0;
    })
  }

}
