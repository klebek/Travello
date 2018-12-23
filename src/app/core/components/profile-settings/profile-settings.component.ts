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
  id = 0;
  trips: Trip[];
  subscriptionTrips: Subscription;

  constructor(private userService: UserService, private tripService: TripService) {
    this.imageUrl = "https://i.imgur.com/C15GrGG.png";
    this.getTrips(this.id);
  }

  previewProfile() {
    this.myprofile = !this.myprofile;
  }

  saveUser(user){
    this.userService.editUser(this.id, user);
  }

  getTrips(id){
    this.tripService.getUserTrip(id).subscribe((t:Trip[]) => this.trips = t);
  }

  saveProfile(imageUrl) {
    this.imageUrl = imageUrl;
  }

  ngOnDestroy(){
    // this.subscriptionTrips.unsubscribe();
  }

}
