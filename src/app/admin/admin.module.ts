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
        path: 'admin/countries',
        component: AdminCountriesComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
    ])
  ],
  declarations: [
    AdminTripsComponent,
    AdminCountriesComponent
  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }
