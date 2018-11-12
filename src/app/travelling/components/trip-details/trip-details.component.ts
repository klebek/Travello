import { CountryService } from 'shared/services/country.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { TimelineElement } from 'shared/components/horizontal-timeline/timeline-element';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  images = [1, 2, 3].map(() => `https://picsum.photos/600/850?random&t=${Math.random()}`);
  countries$;
  id;
  currentJustify = 'fill';
  readMore = false;
  visitors = false;
  currentRate = 4;
  appUser: AppUser;
  readonly = true;
  countries = [
    {name: "Poland", capital: "Warsaw", language: "Polish", population: 38.44},
    {name: "Germany", capital: "Berlin", language: "German", population: 68.23}
  ]

  constructor(private auth: AuthService, private route: ActivatedRoute, private countryService: CountryService, configRating: NgbRatingConfig) {
    this.id = this.route.snapshot.params['id'];
    configRating.max = 5;
    configRating.readonly = false;
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
  rateTrip(){
    this.readonly = false;
  }
  showRate() {
    this.readonly = true;
  }

  content = "";

  timeline: TimelineElement[] = [
    { caption: '', date: new Date(2014, 1, 16), selected: true, title: 'Horizontal Timeline', content: this.content },
    { caption: '', date: new Date(2015, 6, 28), title: 'Event title here', content: this.content },
];
}
