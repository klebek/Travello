import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'app/core/model/user';
import { UserService } from 'app/core/services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnDestroy {

  businessStatus = true;

  trip;
  privateStatus = 0;
  publicStatus = 1;

  subscription: Subscription

  users: User[];
  filteredUsers: User[];

  constructor(private userService: UserService) {
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

  // changeStatus(id, status) {
  //   this.userService.changeStatus(id, status).subscribe(status => {});
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
