import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataTableResource } from 'angular5-data-table';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-trips',
  templateUrl: './admin-trips.component.html',
  styleUrls: ['./admin-trips.component.css']
})
export class AdminTripsComponent {

  blocked = false;
  
  constructor(config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

  block() {
    this.blocked = !this.blocked;
  }

}
 