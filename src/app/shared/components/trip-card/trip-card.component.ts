import { ContinentService } from 'shared/services/continent.service';
import { CountryService } from 'shared/services/country.service';
import { Country } from 'shared/models/country';
import { Component, OnInit, Input } from '@angular/core';
import { Continent } from 'shared/models/continent';

@Component({
  selector: 'trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {

  @Input('country') country: Country;
  @Input('continent') continent: Continent;
  @Input('businessTrip') businessTrip = false;

  continent$;
  countries$;

  constructor(private countryService: CountryService, private continentService: ContinentService,) { }

  async ngOnInit() {
    this.continent$ = await this.continentService.getContinent(this.country.continent);
    this.countries$ = await this.countryService.getAll();
  }

}
