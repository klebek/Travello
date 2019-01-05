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
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { FooterComponent } from './components/footer/footer.component';
import { EmailFormComponent } from './components/email-form/email-form.component';
import { AuthService } from 'shared/services/auth.service';

@NgModule({
  imports: [
    CustomFormsModule,
    SharedModule,
    NgbModule.forRoot(),
    RouterModule.forChild([]),
    RouterModule.forRoot([
      { path: 'profile/:id', component: ProfileComponent },
      { path: 'business', component: BusinessComponent }
    ])
  ],
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    EmailFormComponent,
    ProfileComponent,
    BusinessComponent,
    ProfileSettingsComponent,
    FooterComponent
  ],
  exports: [
    BsNavbarComponent,
    FooterComponent
  ],
  providers: [LoginComponent, AuthService]
})
export class CoreModule { }
