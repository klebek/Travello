import { CountryService } from './../../../shared/services/country.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { TripService } from 'app/travelling/services/trip.service';
import { Subscription } from 'rxjs/Subscription';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WarningComponent } from 'app/admin/components/warning/warning.component';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css']
})
export class MyTripsComponent implements OnDestroy {


  filteredTrips;
  subscription: Subscription;
  idUser: number;
  deleted = false;

  trip;
  traveller;

  businessMail = 0;
  blockMail = 1;
  userMail = 2;

  trips = [];

  constructor(private authService: AuthService, private tripService: TripService, protected localStorage: LocalStorage, private modalService: NgbModal) {
    this.localStorage.getItem('user').subscribe((user) => {
      this.idUser = user.userId;
      // console.log(this.idUser)
      this.subscription = this.tripService.getUserTrip(this.idUser).subscribe((t: any[]) => this.filteredTrips = this.trips = t);
    });
  }

  filter(query: string) {
    this.filteredTrips = (query) ?
      this.trips.filter(t => t.title.toLowerCase().includes(query.toLowerCase())) :
      this.trips;
  }

  deleteTrip(id, pos) {
    if (!confirm('Are you sure you want to delete this trip?')) return;
    this.filteredTrips.splice(pos, 1);
    this.filteredTrips = [...this.filteredTrips];
    this.tripService.deleteTrip(id).subscribe(trip => { });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  share(val: string) {
    let link = "/trip/" + val;
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = link;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  send(id, type) {
    const modalRef = this.modalService.open(WarningComponent);
    // modalRef.componentInstance.name = 'World';
    this.tripService.getTraveller(id).subscribe(t => {
      this.traveller = t;
      modalRef.componentInstance.userEmail = this.traveller.email;
      modalRef.componentInstance.type = type;
      modalRef.componentInstance.userId = this.traveller.id;
      modalRef.componentInstance.tripId = id;
    })
    // console.log(id);
  }

}
