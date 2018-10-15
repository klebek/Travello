import { ContinentService } from './../../services/continent.service';
import { CountryService } from './../../services/country.service';
import { Country } from 'shared/models/country';
import { Component, OnInit, Input } from '@angular/core';
import { Continent } from 'shared/models/continent';

@Component({
  selector: 'country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.css']
})
export class CountryCardComponent implements OnInit {

  @Input('country') country: Country;
  @Input('continent') continent: Continent;

  continent$;
  countries$;

  constructor(private countryService: CountryService, private continentService: ContinentService,) { }

  async ngOnInit() {
    this.continent$ = await this.continentService.getContinent(this.country.continent);
    this.countries$ = await this.countryService.getAll();
  }

}
