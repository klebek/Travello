import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';
import { CustomFormsModule } from 'ng2-validation';

import { AdminTripsComponent } from './components/admin-trips/admin-trips.component';
import { AdminCountriesComponent } from './components/admin-countries/admin-countries.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { OrderFormComponent } from './components/order-form/order-form.component';

@NgModule({
  imports: [
    SharedModule,
    CustomFormsModule,
    RouterModule.forChild([
      {
        path: 'admin/trips',
        component: AdminTripsComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
<<<<<<< HEAD
        path: 'admin/countries',
        component: AdminCountriesComponent,
=======
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/orders/:id',
        component: OrderFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
>>>>>>> fd075b2d41e95f3c6713ab29824117b723367dfa
        canActivate: [AuthGuard, AdminAuthGuard]
      },
    ])
  ],
  declarations: [
<<<<<<< HEAD
    AdminTripsComponent,
    AdminCountriesComponent
=======
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    OrderFormComponent,
>>>>>>> fd075b2d41e95f3c6713ab29824117b723367dfa
  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }
