import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { TimelineElement } from 'shared/components/horizontal-timeline/timeline-element';
import { CountryService } from 'app/travelling/services/country.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  appUser: AppUser;
  images = [1, 2, 3].map(() => `https://picsum.photos/600/850?random&t=${Math.random()}`);
  id;
  currentJustify = 'fill';
  readMore = false;
  currentRate = 4;
  readonly = true;
  countries$ = [];
  names = [{ name: "Poland" },{ name: "Germany" }]
  name = "";

  photoURL = "https://images.pexels.com/photos/1005476/pexels-photo-1005476.jpeg";
  content = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae 
  ipsa, quia velit nulla adipisci? Consequuntur aspernatur at, eaque hic repellendus sit dicta consequatur quae, 
  ut harum ipsam molestias maxime non nisi reiciendis eligendi! Doloremque quia pariatur harum ea amet quibusdam 
  quisquam, quae, temporibus dolores porro doloribus.`;

  constructor(private auth: AuthService, private route: ActivatedRoute, private countryService: CountryService, configRating: NgbRatingConfig) {
    this.id = this.route.snapshot.params['id'];
    configRating.max = 5;
    configRating.readonly = false;
   }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    await this.getCountry();
    // this.countryService.getCountry(this.name).subscribe(c => this.country = c);
  }
  getCountry() {
    for (let name of this.names) {
      this.name = name.name;
      this.countryService.getCountry(this.name).subscribe(c => this.countries$.push(c));
      console.log(this.countries$);
    }
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

  timeline: TimelineElement[] = [
    { caption: '16 Jan', date: new Date(2014, 1, 16), selected: true, title: 'Horizontal Timeline', content: this.content, photoURL: this.photoURL },
    { caption: '28 Feb', date: new Date(2014, 2, 28), title: 'Event title here', content: this.content },
    { caption: '20 Mar', date: new Date(2014, 3, 20), title: 'Event title here', content: this.content },
    { caption: '20 May', date: new Date(2014, 5, 20), title: 'Event title here', content: this.content },
    { caption: '09 Jul', date: new Date(2014, 7, 9), title: 'Event title here', content: this.content },
    { caption: '30 Aug', date: new Date(2014, 8, 30), title: 'Event title here', content: this.content },
    { caption: '15 Sep', date: new Date(2014, 9, 15), title: 'Event title here', content: this.content },
    { caption: '01 Nov', date: new Date(2014, 11, 1), title: 'Event title here', content: this.content },
    { caption: '10 Dec', date: new Date(2014, 12, 10), title: 'Event title here', content: this.content },
    { caption: '29 Jan', date: new Date(2015, 1, 19), title: 'Event title here', content: this.content },
    { caption: '3 Mar', date: new Date(2015, 3, 3), title: 'Event title here', content: this.content },
  ];

}
