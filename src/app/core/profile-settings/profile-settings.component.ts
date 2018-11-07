import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent {

  @Input('normal') normal;

  imageUrl: "https://i.imgur.com/C15GrGG.png";

  constructor() { }

}
