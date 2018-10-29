import { CountryService } from 'shared/services/country.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

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
  visitors = false;
  currentRate;

  constructor(private route: ActivatedRoute, private countryService: CountryService, config: NgbRatingConfig) {
    this.id = this.route.snapshot.params['id'];
    config.max = 5;
    config.readonly = false;
   }

  async ngOnInit() {
    this.countries$ = await this.countryService.get(this.id);
  }
  showVisitors(){
    this.visitors = !this.visitors;
  }
  showTab(){
    this.readMore = !this.readMore;
  }
}
