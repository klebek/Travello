import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  editUrl = 'http://localhost:9000/api/account/edit/';

  constructor(private http: HttpClient) {}

  getAll(){
    return this.http.get('http://localhost:9000/api/account/all');
  }

  getTripsUser(id){
    return this.http.get('http://localhost:9000/api/trip/user/'+id);
  }

  getUser(id:number){
    return this.http.get('http://localhost:9000/api/account/'+id);
  }

  changeStatus(id: number, status: boolean){
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
    });
    let options = {
      headers: httpHeaders
    };
    return this.http.put('http://localhost:9000/api/account/' + id + '/status/' + status, options);
  }

  editUser(id:number, user: User){
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
    });
    let options = {
      headers: httpHeaders
    };
    return this.http.put(this.editUrl+id, user, options).subscribe(
      user => {}
    );
  }
}
