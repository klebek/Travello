import { AngularFireAuth } from 'angularfire2/auth';
import {EventEmitter, Injectable, Output} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from 'shared/models/app-user';
import { UserService } from 'shared/services/user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {BsNavbarComponent} from "../../core/components/bs-navbar/bs-navbar.component";
import {BehaviorSubject} from "rxjs/Rx";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly root = 'http://localhost:9000/api';
  public loggedIn = new BehaviorSubject<boolean>(false);


  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }


  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  authenticateUser(username, password) {
    const data = 'username=' + username + '&password=' + password + '&grant_type=password';
    const header =
      new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    return this.http.post( 'http://localhost:9000/oauth/token', data, {headers : header}).subscribe((data : any)=>{
        localStorage.setItem('token', data.access_token);
        this.setCurrentUser();
        this.loggedIn.next(true);
      },
      (err : HttpErrorResponse)=>{
        console.log(err)
      });


  }
  setCurrentUser() {
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.get('http://localhost:9000/principal', { headers: header }).subscribe((data: any) => {
      localStorage.setItem('user', JSON.stringify(data.principal));
    });
  }

  // registerTraveller(formRegister) {
  //   let data = {
  //     "username": formRegister.value.username,
  //     "password": formRegister.value.password,
  //     "email": formRegister.value.email,
  //     "business": false,
  //     "admin": false,
  //     "active": true
  //   };
  //   let body = JSON.stringify(data);

  //   let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  //   localStorage.setItem('returnUrl', returnUrl);

  //   const header =
  //     new HttpHeaders({ 'Content-Type' : 'application/json'});

  //   console.log(body);

  //   return this.http.post(this.root + '/account/register', body, {headers : header} ).subscribe(data =>{
  //     console.log(body);
  //     console.log('registered')
  //   });
  // }

  // registerBusinessPartner(formRegister) {
  //   let data = {
  //     "username": formRegister.value.username,
  //     "password": formRegister.value.password,
  //     "email": formRegister.value.email,
  //     "business": true,
  //     "admin": false,
  //     "active": false
  //   };
  //   let body = JSON.stringify(data);

  //   let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  //   localStorage.setItem('returnUrl', returnUrl);

  //   const header =
  //     new HttpHeaders({ 'Content-Type': 'application/json' });


  //   return this.http.post(this.root + '/account/register', body, {headers : header} ).subscribe(data =>{
  //   });
  // }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.router.navigate(['/']);
  }

  getAllUsers() {
    return this.http.get(this.root + '/account/all');
  }

  // isLoggedIn(){
  //   return localStorage.getItem('user') !== null;
  // };

}
