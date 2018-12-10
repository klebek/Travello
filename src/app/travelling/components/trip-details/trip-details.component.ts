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
  content = `lul`;

  constructor(private auth: AuthService, private route: ActivatedRoute, private tripService: TripService, private countryService: CountryService, configRating: NgbRatingConfig) {
    this.id = this.route.snapshot.params['id'];
    configRating.max = 5;
    configRating.readonly = false;
    this.tripService.getCards(this.id).subscribe(c => {
      this.cards = c
      this.getTimeline();
    });
    this.getCountry();
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
  showTab() {
    this.readMore = !this.readMore;
  }
  rateTrip() {
    this.readonly = false;
  }
  showRate() {
    this.readonly = true;
  }

  getTimeline() {
    this.timeline.push({ caption: 'test', date: new Date(2014, 1, 16), selected: true, title: 'Horizontal Timeline', content: this.content });
    for (let card of this.cards) {
      let date = new Date(card.date)
      if (card.type === 'NOTE') {
        this.timeline.push(
          { caption: card.title, date: date, title: card.title, content: card.description, photo: card.photo },
        )
      }
    }
    // this.timeline = [
    //   { caption: '16 Jan', date: new Date(2014, 1, 16), selected: true, title: 'Horizontal Timeline', content: this.content, photo: this.photoURL },
    //   { caption: '28 Feb', date: new Date(2014, 2, 28), title: 'Event title here', content: this.content },
    //   { caption: '20 Mar', date: new Date(2014, 3, 20), title: 'Event title here', content: this.content },
    //   { caption: '20 May', date: new Date(2014, 5, 20), title: 'Event title here', content: this.content },
    //   { caption: '09 Jul', date: new Date(2014, 7, 9), title: 'Event title here', content: this.content },
    //   { caption: '30 Aug', date: new Date(2014, 8, 30), title: 'Event title here', content: this.content },
    //   { caption: '15 Sep', date: new Date(2014, 9, 15), title: 'Event title here', content: this.content },
    //   { caption: '01 Nov', date: new Date(2014, 11, 1), title: 'Event title here', content: this.content },
    //   { caption: '10 Dec', date: new Date(2014, 12, 10), title: 'Event title here', content: this.content },
    //   { caption: '29 Jan', date: new Date(2015, 1, 19), title: 'Event title here', content: this.content },
    //   { caption: '3 Mar', date: new Date(2015, 3, 3), title: 'Event title here', content: this.content },
    // ];
    console.log(this.timeline);
  }

//   load() {
//     this.timeline = [
//       { caption: '16 Jan', date: new Date(2014, 1, 16), selected: true, title: 'Horizontal Timeline', content: this.content },
//       { caption: '28 Feb', date: new Date(2014, 2, 28), title: 'Event title here', content: this.content },
//       { caption: '30 Aug', date: new Date(2014, 8, 30), title: 'Event title here', content: this.content },
//       { caption: '15 Sep', date: new Date(2014, 9, 15), title: 'Event title here', content: this.content },
//       { caption: '01 Nov', date: new Date(2014, 11, 1), title: 'Event title here', content: this.content },
//       { caption: '10 Dec', date: new Date(2014, 12, 10), title: 'Event title here', content: this.content },
//       { caption: '29 Jan', date: new Date(2015, 1, 19), title: 'Event title here', content: this.content },
//       { caption: '3 Mar', date: new Date(2015, 3, 3), title: 'Event title here', content: this.content },
//     ];
// }

  ngOnDestroy() {
    this.subscriptionTrip.unsubscribe();
    this.subscriptionCountry.unsubscribe();
    this.subscriptionCards.unsubscribe();
  }

}
