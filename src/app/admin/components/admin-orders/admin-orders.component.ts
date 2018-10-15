import { Order } from 'shared/models/order';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { Subscription } from 'rxjs';
import { DataTableResource } from 'angular5-data-table';
import * as _ from "lodash";

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnDestroy {

  orders: Order[];
  subscription: Subscription;
  tableResource: DataTableResource<Order>;
  items: Order[] = [];
  itemCount: number;
  
  constructor(private orderService: OrderService) {
    this.subscription = this.orderService.getOrders()
    .subscribe(orders => {
      this.orders = _.orderBy(orders,['read','datePlaced'], ['asc','desc']);
      // this.sortedItems =_.sortBy(this.orders,['read']);
      this.initializeTable(this.orders);
    });
  }

  private initializeTable(o: Order[]) {
    this.tableResource = new DataTableResource(o);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params) {

    if(!this.tableResource) return;
    this.tableResource.query(params)
      .then(items => this.items = items);
  }

  filterByEmail(query1: string) {
    let filteredOrders = (query1) ?
      this.orders.filter(o => o.shopping.email.toLowerCase().includes(query1.toLowerCase())) : 
      this.orders;
      this.initializeTable(filteredOrders);
  }

  filterByOrder(query2: string) {
    let filteredOrders = (query2) ?
      this.orders.filter(o => o.orderId.toLowerCase().includes(query2.toLowerCase())) : 
      this.orders;
      this.initializeTable(filteredOrders);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  orderRead(key) {
    this.orderService.orderRead(key);
  }

  orderUnread(key) {
    this.orderService.orderUnread(key);
  }

}
 