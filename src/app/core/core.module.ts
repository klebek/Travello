import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'shared/shared.module';
import { CustomFormsModule } from 'ng2-validation';

import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BusinessComponent } from './components/business/business.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';

@NgModule({
  imports: [
    CustomFormsModule,
    SharedModule,
    NgbModule.forRoot(),
    RouterModule.forChild([]),
    RouterModule.forRoot([
      { path: 'profile', component: ProfileComponent },
      { path: 'business', component: BusinessComponent }
    ])
  ],
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BusinessComponent,
    ProfileSettingsComponent
  ],
  exports: [
    BsNavbarComponent
  ]
})
export class CoreModule { }
