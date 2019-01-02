import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  showNavigationArrows = false;
  showNavigationIndicators = false;
  // images = [1, 2, 3].map(() => `https://picsum.photos/900/450?random&t=${Math.random()}`);
  showBusiness = false;
  showContact = false;

  constructor(config: NgbCarouselConfig) {
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
    config.interval = 10000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  businessForm(){
    this.showBusiness = !this.showBusiness;
  }

  contactForm(){
    this.showContact = !this.showContact;
  }

  ngOnInit() {
  }



}
