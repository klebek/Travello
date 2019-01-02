import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import { AppUser } from 'shared/models/app-user';
import { UserService } from 'shared/services/user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly root = 'http://localhost:9000/api';

  errorLogin;
  errorRegister;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private route: ActivatedRoute) {}

  authenticateUser(username, password) {
    const data = 'username=' + username + '&password=' + password + '&grant_type=password';
    const header =
      new HttpHeaders({ 'Content-Type' : 'application/x-www-form-urlencoded'});

    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    return this.http.post( 'http://localhost:9000/oauth/token', data, {headers : header}).subscribe((data : any)=>{
        localStorage.setItem('token', data.access_token);
        this.setCurrentUser();
      },
      (err : HttpErrorResponse)=>{
        console.log(err)
      });
  }
  setCurrentUser() {
    const header = new HttpHeaders({ 'Content-Type' : 'application/json'});

    this.http.get('http://localhost:9000/principal', {headers : header}).subscribe((data : any)=>{
      localStorage.setItem('user', JSON.stringify(data.principal)) ;
    });
  }

  registerUsernamePassword(formRegister) {
    let data = {
      "username": formRegister.value.username,
      "password": formRegister.value.password,
      "email": formRegister.value.email,
      "business": false,
      "admin": false
    };
    let body = JSON.stringify(data);

    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    const header =
      new HttpHeaders({ 'Content-Type' : 'application/json'});


    return this.http.post(this.root + '/account/register', body, {headers : header} ).subscribe(data =>{
      console.log('registered')
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getAllUsers() {
    return this.http.get(this.root + '/account/all');
}

  isLoggedIn(){
    return localStorage.getItem('user') !== null;
  };

}
