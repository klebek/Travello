import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'app/core/model/user';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from 'app/core/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnDestroy {

  user: User;
  subscription: Subscription;
  id;

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
    this.subscription = this.userService.getUser(this.id).subscribe((u:User) => this.user = u);
  }

  normal;

  setNormal() {
    this.normal = true;
  }

  setBusiness() {
    this.normal = false;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
