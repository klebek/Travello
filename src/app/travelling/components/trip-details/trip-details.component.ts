import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { TimelineElement } from 'shared/components/horizontal-timeline/timeline-element';
import { CountryService } from 'app/travelling/services/country.service';
import { Trip } from 'app/travelling/model/trip';
import { TripService } from 'app/travelling/services/trip.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit, OnDestroy {

  appUser: AppUser;
  trip;
  subscriptionTrip: Subscription;
  subscriptionCountry: Subscription;
  subscriptionCards: Subscription;
  images = [1, 2, 3].map(() => `https://picsum.photos/600/850?random&t=${Math.random()}`);
  id;
  timeline: TimelineElement[] = [];
  cards;
  currentJustify = 'fill';
  readMore = false;
  currentRate = 4;
  readonly = true;

  countries$ = [];
  names = [{ name: "Poland" }, { name: "Germany" }, { name: "Colombia" }]
  name = "";

  tripCountries;

  photoURL = "https://images.pexels.com/photos/1005476/pexels-photo-1005476.jpeg";
  content = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae 
  ipsa, quia velit nulla adipisci? Consequuntur aspernatur at, eaque hic repellendus sit dicta consequatur quae, 
  ut harum ipsam molestias maxime non nisi reiciendis eligendi! Doloremque quia pariatur harum ea amet quibusdam 
  quisquam, quae, temporibus dolores porro doloribus.`;

  constructor(private auth: AuthService, private route: ActivatedRoute, private tripService: TripService, private countryService: CountryService, configRating: NgbRatingConfig) {
    this.id = this.route.snapshot.params['id'];
    configRating.max = 5;
    configRating.readonly = false;
    this.tripService.getCards(this.id).subscribe(c => {
      this.cards = c
      this.getTimeline();
    });
    this.getCountry();
    // this.getTimeline();
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.tripService.getTrip(this.id).subscribe(t => this.trip = t);
  }
  getCountry() {
    for (let name of this.names) {
      this.name = name.name;
      this.countryService.getCountry(this.name).subscribe(c => this.countries$.push(c));
    }
  }
  getTimeline() {
    let date = new Date(2014, 1, 16)
    this.timeline = [{ caption: '16 Jan', date: new Date(2014, 1, 16), selected: true, title: 'Horizontal Timeline', content: this.content, photoURL: this.photoURL },]
    // for (let card of this.cards) {
    //   if (card.type === 'NOTE') {
    //     this.timeline.push(
    //       { caption: card.title, date: date, title: card.title, content: card.description, photoURL: card.photo },
    //     )
    //   }
    // }
    console.log(this.timeline);
  }
  showTab() {
    this.readMore = !this.readMore;
  }
  rateTrip() {
    this.readonly = false;
  }
  showRate() {
    this.readonly = true;
  }

  // timeline: TimelineElement[] = [
  //   { caption: '16 Jan', date: new Date(2014, 1, 16), selected: true, title: 'Horizontal Timeline', content: this.content, photoURL: this.photoURL },
  // ];

  ngOnDestroy() {
    this.subscriptionTrip.unsubscribe();
    this.subscriptionCountry.unsubscribe();
    this.subscriptionCards.unsubscribe();
  }

}
