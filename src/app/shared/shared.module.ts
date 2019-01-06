import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { TripCardComponent } from './components/trip-card/trip-card.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CountryService } from 'shared/services/country.service';
import { UserService } from './services/user.service';
import { HorizontalTimelineComponent } from './components/horizontal-timeline/horizontal-timeline.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { TripFormComponent } from 'app/travelling/components/trip-form/trip-form.component';
import {AuthInterceptorService} from "shared/services/auth-interceptor.service";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    RouterModule,
    NgbModule.forRoot()
  ],
  declarations: [TripCardComponent,HorizontalTimelineComponent],
  exports: [
    TripCardComponent,
    HorizontalTimelineComponent,
    CommonModule,
    FormsModule,
    HttpClientModule,
    CustomFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot().ngModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CountryService,
    { provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
  ]
})
export class SharedModule { }
