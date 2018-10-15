import { ContinentService } from './../../../../shared/services/continent.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'country-filter',
  templateUrl: './country-filter.component.html',
  styleUrls: ['./country-filter.component.css']
})
export class CountryFilterComponent implements OnInit {

  continents$;
  @Input('continent') continent;

  constructor(continentService: ContinentService) {
    this.continents$ = continentService.getAll(); 
   }

  ngOnInit() {
  }

}
