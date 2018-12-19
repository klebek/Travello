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

  countries$;

  trips;
  filteredTrips;
  subscription: Subscription;
  idUser = 0;
  
  constructor(
    private authService: AuthService, private countryService: CountryService, private tripService: TripService) { 
      this.countries$ = authService.user$.switchMap(u => countryService.getAll());
      this.subscription = this.tripService.getUserTrip(this.idUser).subscribe(t => this.filteredTrips = this.trips = t);
  }

  filter(query: string) {
    this.filteredTrips = (query) ?
      this.trips.filter(t => t.title.toLowerCase().includes(query.toLowerCase())) : 
      this.trips;
  }

  deleteTrip(id){
    this.tripService.deleteTrip(id);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
