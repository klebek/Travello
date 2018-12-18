import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { SharedModule } from 'shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

import { environment } from './../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { CoreModule } from './core/core.module';
import { TripsComponent } from './travelling/components/countries/trips.component';
import { TravellingModule } from './travelling/travelling.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { TitlePipe } from './pipes/title.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {UserService} from "shared/services/user.service";
import {AuthGuard} from "shared/services/auth-guard.service";
import {AuthInterceptor} from "shared/services/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    TitlePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    AdminModule,
    NgbModule,
    TravellingModule,
    CoreModule,
    FormsModule,
    CustomFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: TripsComponent },
      { path: 'login', component: LoginComponent }
    ])
  ],
  providers: [UserService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  exports: [NgbModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
