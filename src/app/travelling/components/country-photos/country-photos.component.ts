import { Component, OnInit, Input } from '@angular/core';
import { TripCardComponent } from 'shared/components/trip-card/trip-card.component';
import { TripService } from 'app/travelling/services/trip.service';

@Component({
  selector: 'country-photos',
  templateUrl: './country-photos.component.html',
  styleUrls: ['./country-photos.component.css']
})
export class CountryPhotosComponent implements OnInit {

  @Input('trip') trip;

  cards;

  constructor(private tripService: TripService) { }

  ngOnInit() {
    this.tripService.getCards(this.trip.id).subscribe(c => this.cards = c);
  }

}
