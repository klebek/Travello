import { Injectable } from '@angular/core';
import { AppUser } from 'shared/models/app-user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/Rx";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  // get(): Observable<AppUser> {
  //   return JSON.parse(localStorage.getItem('user'));
  // }

}
