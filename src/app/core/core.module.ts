import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'shared/shared.module';
import { CustomFormsModule } from 'ng2-validation';

import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
<<<<<<< HEAD
import { RegisterComponent } from './components/register/register.component';
=======
import { DropdownMenusComponent } from './components/dropdown-menus/dropdown-menus.component';
import { ShoppingModule } from 'app/shopping/shopping.module';
>>>>>>> fd075b2d41e95f3c6713ab29824117b723367dfa

@NgModule({
  imports: [
    CustomFormsModule,
    SharedModule,
    NgbModule.forRoot(),
    ShoppingModule,
    RouterModule.forChild([])
  ],
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,
<<<<<<< HEAD
    RegisterComponent
=======
    DropdownMenusComponent
>>>>>>> fd075b2d41e95f3c6713ab29824117b723367dfa
  ],
  exports: [
    BsNavbarComponent
  ]
})
export class CoreModule { }
