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
  idUser: number;
  deleted = false;

  trips = [];

  constructor(private authService: AuthService, private tripService: TripService) {
    this.idUser = JSON.parse(localStorage.getItem('user')).userId;
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
    if (!confirm('Are you sure you want to delete this trip?')) return;
    this.filteredTrips.splice(pos, 1);
    this.filteredTrips = [...this.filteredTrips];
    this.tripService.deleteTrip(id).subscribe(trip => { });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  share(val: string){
    let link = "http://localhost:4200/trip/"+val;
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = link;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
