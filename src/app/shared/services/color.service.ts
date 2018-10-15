import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private db: AngularFireDatabase) { }

  getAll(){
    return this.db.list('/colors', {
      query: {
        orderByChild: 'name'
      }
    });
  }

  getColor(color) {
    return this.db.object('/colors/' + color);
  }
}
