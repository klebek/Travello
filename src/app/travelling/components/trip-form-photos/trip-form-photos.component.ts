import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'trip-form-photos',
  templateUrl: './trip-form-photos.component.html',
  styleUrls: ['./trip-form-photos.component.css']
})
export class TripFormPhotosComponent {

  cardRow = [1];

  description1 = false;
  description2 = false;
  description3 = false;
  description4 = false;

  photo1url;
  descirption1text;

  addCard(number){
    this.removeCard();
    this.cardRow.push(number);
  }
  removeCard(){
    this.cardRow.splice(-1,1);
  }

  showDescription(number){
    if(number === 1) this.description1 = !this.description1;
    else if(number === 2) this.description2 = !this.description2;
    else if(number === 3) this.description3 = !this.description3;
    else if(number === 4) this.description4 = !this.description4;
  }

}
