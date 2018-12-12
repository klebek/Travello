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
import { TripFormPhotosComponent } from './components/trip-form-photos/trip-form-photos.component';
import { TripVisitorsComponent } from './components/trip-visitors/trip-visitors.component';
import { TripFormCardComponent } from './components/trip-form-card/trip-form-card.component';
import { HttpClientModule } from '@angular/common/http';
import { CountryService } from 'shared/services/country.service';
import { NamePipe } from './pipes/name.pipe';

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: 'countries', component: TripsComponent, canActivate: [AuthGuard] },
      { path: 'trip/:id', component: TripDetailsComponent },
      { path: 'my-trips', component: MyTripsComponent, canActivate: [AuthGuard] },
      { path: 'add-trip', component: TripFormComponent, canActivate: [AuthGuard] },
    ])
  ],
  declarations: [
    TripsComponent,
    CountryFilterComponent,
    MyTripsComponent,
    TripDetailsComponent,
    TripFormComponent,
    CountryPhotosComponent,
    TripFormPhotosComponent,
    TripVisitorsComponent,
    TripFormCardComponent,
    NamePipe
  ],
  providers: [ CountryService ]
})
export class TravellingModule { }
