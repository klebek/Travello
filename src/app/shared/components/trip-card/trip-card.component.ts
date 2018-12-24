import { ContinentService } from 'shared/services/continent.service';
import { CountryService } from 'shared/services/country.service';
import { Country } from 'shared/models/country';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Continent } from 'shared/models/continent';
import { Trip } from 'app/travelling/model/trip';
import { TripService } from 'app/travelling/services/trip.service';

@Component({
  selector: 'trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {

  @Input('trip') trip: Trip;

  notes;
  countries = [];
  deleted = false;

  constructor(private tripService: TripService) {
  }

  async ngOnInit() {
    await this.getNotes(this.trip.id);
    await this.getCountries(this.trip.id);
  }

  getNotes(id){
    this.tripService.getNotes(id).subscribe(n => this.notes = n);
  }

  getCountries(id){
    this.tripService.getCountries(id).subscribe((c:any[]) => this.countries = c);
  }

}
