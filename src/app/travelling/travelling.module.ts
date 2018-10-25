import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CountriesComponent } from './components/countries/countries.component';
import { CountryFilterComponent } from './../travelling/components/countries/country-filter/country-filter.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';
import { MyTripsComponent } from './components/my-trips/my-trips.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { TripFormComponent } from './components/trip-form/trip-form.component';
import { CountryPhotosComponent } from './components/country-photos/country-photos.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'countries', component: CountriesComponent },
      { path: 'country/trips/:id/1', component: TripDetailsComponent },
      { path: 'my/trips', component: MyTripsComponent },
      { path: 'add-trip', component: TripFormComponent },
    ])
  ],
  declarations: [
    CountriesComponent,
    CountryFilterComponent,
    MyTripsComponent,
    TripDetailsComponent,
    TripFormComponent,
    CountryPhotosComponent
  ]
})
export class TravellingModule { }
