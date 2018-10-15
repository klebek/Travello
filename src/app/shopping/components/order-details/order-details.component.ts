import { OrderService } from 'shared/services/order.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {

  id;
  orders;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private orderService: OrderService) {
    this.id = this.route.snapshot.params['id'];
  }


  async ngOnInit() {
    this.subscription = this.orderService.getOrder(this.id).subscribe(orders => {
      this.orders = orders;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
}
