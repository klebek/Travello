import { CountryService } from 'shared/services/country.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';

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
  appUser: AppUser;

  constructor(private auth: AuthService, private route: ActivatedRoute, private countryService: CountryService, config: NgbRatingConfig) {
    this.id = this.route.snapshot.params['id'];
    config.max = 5;
    config.readonly = false;
   }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.countries$ = await this.countryService.get(this.id);
  }
  showVisitors(){
    this.visitors = !this.visitors;
  }
  showTab(){
    this.readMore = !this.readMore;
  }
}
