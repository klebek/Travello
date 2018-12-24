import { CountryService } from './../../../shared/services/country.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { TripService } from 'app/travelling/services/trip.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css']
})
export class MyTripsComponent implements OnDestroy {

  
  filteredTrips;
  subscription: Subscription;
  idUser = 0;
  deleted = false;

  trips = [];

  constructor(private authService: AuthService, private tripService: TripService) {
    this.getTrips();
  }

  filter(query: string) {
    this.filteredTrips = (query) ?
      this.trips.filter(t => t.title.toLowerCase().includes(query.toLowerCase())) :
      this.trips;
  }

  getTrips() {
    this.subscription = this.tripService.getUserTrip(this.idUser).subscribe((t: any[]) => this.filteredTrips = this.trips = t);
  }

  deleteTrip(id, pos) {
    this.filteredTrips.splice(pos, 1);
    this.filteredTrips = [...this.filteredTrips];
    this.tripService.deleteTrip(id).subscribe(trip => { });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
