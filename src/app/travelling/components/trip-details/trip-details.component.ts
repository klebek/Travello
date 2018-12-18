import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { TimelineElement } from 'shared/components/horizontal-timeline/timeline-element';
import { CountryService } from 'app/travelling/services/country.service';
import { Trip } from 'app/travelling/model/trip';
import { TripService } from 'app/travelling/services/trip.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit, OnDestroy {

  id;
  appUser: AppUser;
  trip;
  subscriptionTrip: Subscription;
  subscriptionCountry: Subscription;
  subscriptionNotes: Subscription;
  images = [1, 2, 3].map(() => `https://picsum.photos/600/850?random&t=${Math.random()}`);
  timeline: TimelineElement[] = [];
  notes;
  currentJustify = 'fill';
  readMore = false;
  currentRate = 4;
  readonly = true;

  countries$ = [];
  countriess = [];
  countries;
  name = "";

  firstDate;

  constructor(private auth: AuthService, private route: ActivatedRoute, private tripService: TripService, private countryService: CountryService, configRating: NgbRatingConfig) {
    configRating.max = 5;
    configRating.readonly = false;
    this.id = this.route.snapshot.params['id'];
    this.subscriptionNotes = this.tripService.getNotes(this.id).subscribe(n => {
      this.notes = n
      this.getTimeline();
    });
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.subscriptionTrip = this.tripService.getTrip(this.id).subscribe(t => this.trip = t);
    await this.getCountries(this.id);
  }
  getCountries(id) {
    console.log("ID " + this.id);
    this.subscriptionCountry = this.tripService.getCountries(id).subscribe(c => {
      this.countries = c;
      for (let country of this.countries) {
        this.countriess.push(country);
      }
      for (let country of this.countriess) {
        this.name = country;
        this.subscriptionCountry = this.countryService.getCountry(this.name).subscribe(c => this.countries$.push(c));
      }
    });
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
    let date = new Date('2018-12-09 00:00')
    console.log("lol" + date);
    this.firstDate = new Date(this.notes[0].date);
    let firstDateString = this.firstDate.toDateString();
    console.log("firstdate: " + this.firstDate);
    this.timeline.push({ caption: firstDateString, date: this.firstDate, selected: true, title: this.notes[0].title, content: this.notes[0].description, photo: this.notes[0].photo });
    for (let note of this.notes) {
      let date = new Date(note.date);
      let dateString = date.toDateString();
      if (note.type === 'NOTE') {
        this.timeline.push(
          { caption: dateString, date: date, title: note.title, content: note.description, photo: note.photo },
        )
      }
    }
  }
  ngOnDestroy() {
    this.subscriptionTrip.unsubscribe();
    this.subscriptionCountry.unsubscribe();
    this.subscriptionNotes.unsubscribe();
  }

}
