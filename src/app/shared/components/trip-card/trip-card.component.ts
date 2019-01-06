import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Trip } from 'app/travelling/model/trip';
import { TripService } from 'app/travelling/services/trip.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit, OnDestroy {

  @Input('trip') trip: Trip;

  notes;
  cards;
  countries = [];
  deleted = false;

  photo;

  subscriptionNotes: Subscription;
  subscriptionCards: Subscription;
  subscriptionTrips: Subscription;

  constructor(private tripService: TripService) {
  }

  async ngOnInit() {
    await this.getNotes(this.trip.id);
    await this.getCountries(this.trip.id);
    await this.getCards(this.trip.id);
  }

  getNotes(id){
    this.subscriptionNotes = this.tripService.getNotes(id).subscribe(n => {
      this.notes = n
      // this.photo = this.notes[0].photo;
    });
  }

  getCards(id){
    this.subscriptionCards = this.tripService.getCards(id).subscribe(c => this.cards = c);
  }

  getCountries(id){
    this.subscriptionTrips = this.tripService.getCountries(id).subscribe((c:any[]) => this.countries = c);
  }

  ngOnDestroy(){
    this.subscriptionNotes.unsubscribe();
    this.subscriptionCards.unsubscribe();
    this.subscriptionTrips.unsubscribe();
  }

}
