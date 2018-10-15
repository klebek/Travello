import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Order } from 'shared/models/order';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class OrderService {

  items: Order[] = [];

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() { 
    return this.db.list('/orders');
  }

  getOrder(orderId) {
    return this.db.object('/orders/' + orderId);
  }

  orderRead(orderId) {
    this.db.object('/orders/' + orderId).update({
      read: true
    })
  }

  orderUnread(orderId) {
    this.db.object('/orders/' + orderId).update({
      read: false
    })
  }

  private async getOrderId(): Promise<string> {
    let orderId = localStorage.getItem('orderId');
    return orderId;
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', {
      query: {
        orderByChild: 'userId',
        equalTo: userId        
      }
    });
  }
}
