import { CountryService } from 'shared/services/country.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  countries$;
  id;
  currentJustify = 'fill';
  readMore = false;

  constructor(private route: ActivatedRoute, private countryService: CountryService) {
    this.id = this.route.snapshot.params['id'];
   }

  async ngOnInit() {
    this.countries$ = await this.countryService.get(this.id);
  }

  showTab(){
    this.readMore = !this.readMore;
  }
}
