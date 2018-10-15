import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { SharedModule } from 'shared/shared.module';
import { NgxGalleryModule } from 'ngx-gallery';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

import { environment } from './../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { CoreModule } from './core/core.module';
import { CountriesComponent } from './travelling/components/countries/countries.component';
import { TravellingModule } from './travelling/travelling.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgxGalleryModule,
    BrowserModule,
    SharedModule,
    AdminModule,
    NgbModule,
    TravellingModule,
    CoreModule,
    FormsModule,
    CustomFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
<<<<<<< HEAD
      { path: '', component: CountriesComponent },
      { path: 'login', component: LoginComponent }
    ])
=======
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
    ], {useHash: true})
>>>>>>> fd075b2d41e95f3c6713ab29824117b723367dfa
  ],
  exports: [NgbModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
