import { Component, Input } from '@angular/core';

@Component({
  selector: 'marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.css']
})
export class MarketingComponent {

  @Input('bannerOne') bannerOne = false;
  @Input('bannerTwo') bannerTwo = false;

}
