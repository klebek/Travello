import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingFormComponent } from './components/shopping-form/shopping-form.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';
import { TitlePipe } from './components/products/pipes/title.pipe';
import { ColorPipe } from './components/products/pipes/color.pipe';
import { ProductDetailsComponent } from 'shared/components/product-details/product-details.component';
import { SalePipe } from './components/products/pipes/sale.pipe';
import { MarketingComponent } from 'shared/components/marketing/marketing.component';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'products', component: ProductsComponent },
      { path: 'product/:id', component: ProductDetailsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
      { path: 'my/orders/:id', component: OrderDetailsComponent, canActivate: [AuthGuard] },
    ])
  ],
  exports: [
    ProductFilterComponent
  ],
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    MarketingComponent,
    ShoppingCartSummaryComponent,
    ShoppingFormComponent,
    OrderDetailsComponent,
    TitlePipe,
    ColorPipe,
    SalePipe,
    ProductDetailsComponent
  ]
})
export class ShoppingModule { }
