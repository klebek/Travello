import { ContinentService } from 'shared/services/continent.service';
import { CountryService } from 'shared/services/country.service';
import { Country } from 'shared/models/country';
import { Component, OnInit, Input } from '@angular/core';
import { Continent } from 'shared/models/continent';
import { Trip } from 'app/travelling/model/trip';

@Component({
  selector: 'trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {

  @Input('trip') trip: Trip;

  constructor() { }

  ngOnInit() {  
  }

}
