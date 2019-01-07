import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TripsComponent } from './components/countries/trips.component';
import { CountryFilterComponent } from './../travelling/components/countries/country-filter/country-filter.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';
import { MyTripsComponent } from './components/my-trips/my-trips.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { TripFormComponent } from './components/trip-form/trip-form.component';
import { CountryPhotosComponent } from './components/country-photos/country-photos.component';
import { TripFormCardComponent } from './components/trip-form-card/trip-form-card.component';
import { HttpClientModule } from '@angular/common/http';
import { CountryService } from 'shared/services/country.service';
import { TitlePipe } from './pipes/title.pipe';
import { CountryPipe } from './pipes/country.pipe';
import { TripEditComponent } from './components/trip-edit/trip-edit.component';
import { WarningComponent } from 'app/admin/components/warning/warning.component';

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: 'trips', component: TripsComponent },
      { path: 'countries', component: TripsComponent, canActivate: [AuthGuard] },
      { path: 'trip/:id', component: TripDetailsComponent, pathMatch: 'full' },
      { path: 'my-trips', component: MyTripsComponent, canActivate: [AuthGuard] },
      { path: 'add-trip', component: TripFormComponent, canActivate: [AuthGuard] },
      { path: 'edit-trip/:id', component: TripEditComponent, canActivate: [AuthGuard], pathMatch: 'full' },
    ])
  ],
  declarations: [
    TripsComponent,
    CountryFilterComponent,
    MyTripsComponent,
    TripDetailsComponent,
    TripFormComponent,
    CountryPhotosComponent,
    TripFormCardComponent,
    TitlePipe,
    CountryPipe,
    TripEditComponent
  ],
  providers: [ CountryService ]
})
export class TravellingModule { }
