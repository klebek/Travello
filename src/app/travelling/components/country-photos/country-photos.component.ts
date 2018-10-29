import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'country-photos',
  templateUrl: './country-photos.component.html',
  styleUrls: ['./country-photos.component.css']
})
export class CountryPhotosComponent implements OnInit {

  @Input('card1') card1 = 1;
  @Input('card2') card2 = 2;
  @Input('card3') card3 = 3;
  @Input('card4') card4 = 4;
  @Input('card5') card5 = 5;
  @Input('card6') card6 = 6;

  // @Input('photo1url') photo1url = "https://i.imgur.com/KLi0eip.jpg";
  // @Input('description1text') description1text = "Example card text";

  @Input('photo1url') photo1url = "https://i.imgur.com/gU3Jpjv.png"
  @Input('description1text') description1text = "Opis"
  @Input('title1') title1 = "Tytuł";

  constructor() { }

  ngOnInit() {
  }

}
