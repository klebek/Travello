import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  editUrl = 'http://localhost:9000/api/account/edit/';

  constructor(private http: HttpClient) {}

  getUser(id:number){
    return this.http.get('http://localhost:9000/api/account/'+id);
  }

  editUser(id:number, user: User){
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
    });   
    let options = {
      headers: httpHeaders
    };
    return this.http.put(this.editUrl+id, user, options).subscribe(
      user => {}
    );
  }
}
