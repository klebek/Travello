import { CountryService } from './../../../shared/services/country.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css']
})
export class MyTripsComponent {

  countries$;
  
  constructor(
    private authService: AuthService,
    private countryService: CountryService) { 

    this.countries$ = authService.user$.switchMap(u => countryService.getAll());
  }

}
