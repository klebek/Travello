import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent {

  @Input('normal') normal;
  @Input('myprofile') myprofile;

  imageUrl;
  about;
  username;
  password;

  constructor() {
    this.imageUrl = "https://i.imgur.com/C15GrGG.png";
    this.about = "Example of description";
    this.username = "Example username";
    this.password = "123456";
  }

  previewProfile() {
    this.myprofile = !this.myprofile;
  }

  saveProfile(about, imageUrl, username, password) {
    this.about = about;
    this.username = username;
    this.imageUrl = imageUrl;
    this.password = password;
  }

}
