import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { User } from 'app/core/model/user';
import { UserService } from 'app/core/services/user.service';
import { TripService } from 'app/travelling/services/trip.service';
import { Trip } from 'app/travelling/model/trip';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit, OnDestroy {

  @Input('user') user: User;
  @Input('normal') normal;
  @Input('settings') settings;
  @Input('myprofile') myprofile;

  imageUrl;
  idUser;
  appUser: any;
  trips = [];
  subscription: Subscription;
  saved = false;

  constructor(private userService: UserService, private tripService: TripService, private route: ActivatedRoute) {
    this.appUser = JSON.parse(localStorage.getItem('user'));
  }

  async ngOnInit() {
    this.idUser = this.route.snapshot.params['id'];
    this.getTrips();
    // console.log(this.idUser);
  }

  previewProfile() {
    this.myprofile = !this.myprofile;
  }

  saveUser(user) {
    this.userService.editUser(this.idUser, user);
    this.saved = true;
  }

  getTrips() {
    // console.log("Z funkcji: " + this.idUser)
    this.subscription = this.tripService.getUserTrip(this.idUser).subscribe((t: Trip[]) => this.trips = t);
  }

  deleteTrip(id, pos) {
    if (!confirm('Are you sure you want to delete this trip?')) return;
    this.trips.splice(pos, 1);
    this.trips = [...this.trips];
    this.tripService.deleteTrip(id).subscribe(trip => { });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
