import { ShoppingCart } from 'shared/models/shopping-cart';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/order';
import { UserService } from 'shared/services/user.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'shopping-form',
  templateUrl: './shopping-form.component.html',
  styleUrls: ['./shopping-form.component.css']
})
export class ShoppingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  
  userSubscription: Subscription;
  userId: string;
  user;
  shopping = {};

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private db: AngularFireDatabase,
    private orderService: OrderService) { }

  async ngOnInit() {
    this.userSubscription = await this.authService.user$.subscribe(user => this.userId = user.uid);
    this.userService.get(this.userId).subscribe(user => this.user = user);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shopping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.db.object('/orders/' + result.key + '/shopping/').update({
      email: this.user.email
    })
    this.router.navigate(['/order-success', result.key]);
  }

}
