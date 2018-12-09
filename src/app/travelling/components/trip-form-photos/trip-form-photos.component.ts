import { Component, OnInit } from '@angular/core';
import { Trip } from 'app/travelling/model/trip';

@Component({
  selector: 'trip-form-photos',
  templateUrl: './trip-form-photos.component.html',
  styleUrls: ['./trip-form-photos.component.css']
})
export class TripFormPhotosComponent {

  constructor() {
  }

  cardRow = [1];

  trip: Trip;

  description2 = false;
  description3 = false;
  description4 = false;

  addCard(number){
    this.removeCard();
    this.cardRow.push(number);
  }
  removeCard(){
    this.cardRow.splice(-1,1);
  }

  saveCard1(url, text){
    console.log(url + " " + text)
  }

}
