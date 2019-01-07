import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'app/core/model/user';
import { UserService } from 'app/core/services/user.service';
import { TripService } from 'app/travelling/services/trip.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnDestroy, OnInit {

  activeStatus = true;

  trip;
  privateStatus = 0;
  publicStatus = 1;

  userTrips = [];

  subscription: Subscription

  users: User[];
  filteredUsers: User[];

  constructor(private userService: UserService, private tripService: TripService) {
  }

  ngOnInit() {
    this.subscription = this.userService.getAll()
      .subscribe((u: User[]) => this.filteredUsers = this.users = u);
  }

  filterById(query1: number) {
    let query1str = query1.toString();
    this.filteredUsers = (query1str) ?
      this.users.filter(t => t.id.toString().toLowerCase().includes(query1str.toLowerCase())) :
      this.users;
  }

  filterByUsername(query2: string) {
    this.filteredUsers = (query2) ?
      this.users.filter(u => u.username.toLowerCase().includes(query2.toLowerCase())) :
      this.users;
  }

  filterByEmail(query3: string) {
    this.filteredUsers = (query3) ?
      this.users.filter(u => u.email.toLowerCase().includes(query3.toLowerCase())) :
      this.users;
  }

  activate(id, status) {
    // console.log(id + " " + status);
    this.userService.changeStatus(id, status).subscribe(() => {
      this.userService.getTripsUser(id).subscribe(t => {
        this.userTrips.push(t);
        // console.log(this.userTrips);
        for (let trips of this.userTrips) {
          for (let trip of trips) {
            let id = trip.id;
            let status = 0;
            this.tripService.changeStatus(id, status).subscribe(() => { })
          }
        }
        // console.log(this.userTrips);
      })
      this.ngOnInit()
    });
  }

  block(id, status) {
    // console.log(id + " " + status);
    this.userService.changeStatus(id, status).subscribe(() => {
      this.userService.getTripsUser(id).subscribe(t => {
        this.userTrips.push(t);
        // console.log(this.userTrips);
        for (let trips of this.userTrips) {
          for (let trip of trips) {
            let id = trip.id;
            let status = 2;
            this.tripService.changeStatus(id, status).subscribe(() => { })
          }
        }
        // console.log(this.userTrips);
      })
      this.ngOnInit()
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
