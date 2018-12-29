import { Injectable } from '@angular/core';
import { AppUser } from 'shared/models/app-user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/Rx";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // save(user: firebase.User) {
  //   this.db.object('/users/' + user.uid).update({
  //     name: user.displayName,
  //     email: user.email
  //   });
  // }
  //
  // get(name: string): Observable<AppUser> {
  //   return null;
  // }

}
