import { Component, OnInit } from '@angular/core';
import { Trip } from 'app/travelling/model/trip';

@Component({
  selector: 'trip-form-photos',
  templateUrl: './trip-form-photos.component.html',
  styleUrls: ['./trip-form-photos.component.css']
})
export class TripFormPhotosComponent {

  constructor() {
    this.trip = {
      name: "",
      title: "",
      description1: false,
      descriptionTrip: "",
      notes: "",
      photo1url: "",
      description1text: ""
    }
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
    this.trip.photo1url = url;
    this.trip.description1text = text;
    console.log(url + " " + text)
  }

  showDescription(number){
    if(number === 1) {
      this.trip.description1text = "";
      this.trip.description1 = !this.trip.description1;
    }
    else if(number === 2) this.description2 = !this.description2;
    else if(number === 3) this.description3 = !this.description3;
    else if(number === 4) this.description4 = !this.description4;
  }

}
