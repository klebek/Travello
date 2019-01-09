import { Component, OnInit, Input } from '@angular/core';
import { TripCardComponent } from 'shared/components/trip-card/trip-card.component';
import { TripService } from 'app/travelling/services/trip.service';
import 'hammerjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PhotoModalComponent } from '../photo-modal/photo-modal.component';

@Component({
  selector: 'country-photos',
  templateUrl: './country-photos.component.html',
  styleUrls: ['./country-photos.component.css']
})
export class CountryPhotosComponent implements OnInit {

  @Input('trip') trip;

  cards;

  constructor(private tripService: TripService, private modalService: NgbModal) { }

  ngOnInit() {
    this.tripService.getCards(this.trip.id).subscribe(c => {
      this.cards = c
    });
  }

  zoomImage(photo, title){
    const modalRef = this.modalService.open(PhotoModalComponent);
    modalRef.componentInstance.photo = photo;
    modalRef.componentInstance.title = title;
  }

}
