import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';
import { CustomFormsModule } from 'ng2-validation';

import { AdminTripsComponent } from './components/admin-trips/admin-trips.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { WarningComponent } from './components/warning/warning.component';

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
        path: 'admin/users',
        component: AdminUsersComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      }
    ])
  ],
  entryComponents: [WarningComponent],
  declarations: [
    AdminTripsComponent,
    AdminUsersComponent,
    WarningComponent
  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }
