import { ContinentService } from './../../../../shared/services/continent.service';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CountryService } from 'app/travelling/services/country.service';
import { ActivatedRoute } from '@angular/router';
import { TripService } from 'app/travelling/services/trip.service';
import { Subscription } from 'rxjs/Subscription';
import { Trip } from 'app/travelling/model/trip';

@Component({
  selector: 'country-filter',
  templateUrl: './country-filter.component.html',
  styleUrls: ['./country-filter.component.css']
})
export class CountryFilterComponent implements OnInit {

  @Input() searchText;
  @Input() searchCountry;

  @Output() searchTextChange = new EventEmitter();
  changeText(newSearchTextChange) {
    this.searchText = newSearchTextChange;
    this.searchTextChange.emit(newSearchTextChange);
  }

  @Output() searchCountryChange = new EventEmitter();
  changeCountry(newSearchCountryChange) {
    this.searchCountry = newSearchCountryChange;
    this.searchCountryChange.emit(newSearchCountryChange);
  }

  continents = ["Africa","Americas","Asia","Europe","Oceania"];

  countriesNames;
  param;

  constructor(private countryService: CountryService, private tripService: TripService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.param = params['continent'];
    });
   }

  async ngOnInit() {
    await this.countryService.getName().subscribe(c => this.countriesNames = c);
  }

}
