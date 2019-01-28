import { Injectable } from '@angular/core';
import { AppUser } from 'shared/models/app-user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs/Rx";
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, protected localStorage: LocalStorage) { }


  get(id:number) : Observable<any>{
    return this.http.get('/api/account/'+id);
  }

}
