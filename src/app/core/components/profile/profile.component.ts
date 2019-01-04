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
export class ProfileComponent implements OnInit, OnDestroy {

  user: User;
  subscription: Subscription;
  id: number;
  principal: any;
  settings = false;

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.principal = JSON.parse(localStorage.getItem('user'));
    this.id = this.route.snapshot.params['id'];
  }

  async ngOnInit(){
    this.subscription = await this.userService.getUser(this.id).subscribe((u: User) => {
      this.user = u
      if (this.user.photo === null) this.user.photo = "https://i.imgur.com/C15GrGG.png";
      let userEmail = this.user.email;
      let principalEmail = this.principal.username;
      if (userEmail === principalEmail) {
        this.settings = true;
      }
    });
  }

  normal;

  setNormal() {
    this.normal = true;
  }

  setBusiness() {
    this.normal = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
