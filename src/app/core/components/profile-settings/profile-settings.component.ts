import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { User } from 'app/core/model/user';
import { UserService } from 'app/core/services/user.service';
import { TripService } from 'app/travelling/services/trip.service';
import { Trip } from 'app/travelling/model/trip';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnDestroy {

  @Input('user') user: User;
  @Input('normal') normal;
  @Input('myprofile') myprofile;


  imageUrl;
  idUser = 0;
  trips = [];
  subscription: Subscription;

  constructor(private userService: UserService, private tripService: TripService) {
    this.imageUrl = "https://i.imgur.com/C15GrGG.png";
    this.getTrips();
  }

  previewProfile() {
    this.myprofile = !this.myprofile;
  }

  saveUser(user){
    this.userService.editUser(this.idUser, user);
  }

  getTrips(){
    this.subscription = this.tripService.getUserTrip(this.idUser).subscribe((t:any[]) => this.trips = t);
  }

  saveProfile(imageUrl) {
    this.imageUrl = imageUrl;
  }

  deleteTrip(id, pos) {
    this.trips.splice(pos, 1);
    this.trips = [...this.trips];
    this.tripService.deleteTrip(id).subscribe(trip => { });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
