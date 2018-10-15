import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { DatabaseReference } from 'angularfire2/interfaces';
import { Country } from 'shared/models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  ref: DatabaseReference;

  constructor(private db: AngularFireDatabase) { }

  create(country) {
    return this.db.list('/countries').push(country);
  }

  getAll():Observable<Country[]> {
    return this.db.list('/countries/');
    }

  get(countryId) {
    return this.db.object('/countries/' + countryId);
  }

  update(countryId, country) {
    return this.db.object('/countries/' + countryId).update(country);
  }

  delete(countryId) {
    return this.db.object('/countries/' + countryId).remove();
  }
  
}
