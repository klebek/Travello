import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NgxGalleryModule } from 'ngx-gallery';

import { CountryCardComponent } from './components/country-card/country-card.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CountryService } from 'shared/services/country.service';
import { UserService } from './services/user.service';
import { MarketingComponent } from 'shared/components/marketing/marketing.component';
import { ProductFilterComponent } from 'app/shopping/components/products/product-filter/product-filter.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxGalleryModule,
    NgbModule.forRoot(),
    RouterModule
  ],
  declarations: [CountryCardComponent],
  exports: [
    CountryCardComponent,
    CommonModule,
    FormsModule,
<<<<<<< HEAD
    CustomFormsModule,
=======
    DataTableModule,
>>>>>>> fd075b2d41e95f3c6713ab29824117b723367dfa
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxGalleryModule,
    NgbModule.forRoot().ngModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CountryService
  ]
})
export class SharedModule { }
