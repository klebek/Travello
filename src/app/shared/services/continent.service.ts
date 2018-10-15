import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ContinentService {

  constructor(private db: AngularFireDatabase) { }

  getAll(){
    return this.db.list('/continents', {
      query: {
        orderByChild: 'name'
      }
    });
  }

  getContinent(continent) {
    return this.db.object('/continents/' + continent);
  }
}
