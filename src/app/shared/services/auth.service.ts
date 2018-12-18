import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import { AppUser } from 'shared/models/app-user';
import { UserService } from 'shared/services/user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly root = 'http://localhost:9000/api';

  user$: Observable<firebase.User>;
  errorLogin;
  errorRegister;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
  }

  // loginGoogle() {
  //   let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  //   localStorage.setItem('returnUrl', returnUrl);
  //   this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  // }
  //
  // loginFb() {
  //   let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  //   localStorage.setItem('returnUrl', returnUrl);
  //   this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
  // }
  userAuthentication(username, password) {
    const data = 'username=' + username + '&password=' + password + '&grant_type=password';
    const header = new HttpHeaders({ 'Content-Type' : 'application/x-www-urlencoded', 'No-Auth': 'True' });

    return this.http.post( this.root + '/oauth/token', data, {headers : header});
  }

  registerEmailPassword(formRegister, email, password) {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    let confirmPassword = formRegister.value.confirmPassword;
    let name = formRegister.value.name;
    this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    localStorage.removeItem('token');
  }

  getAllUsers() {
    return this.http.get(this.root + '/users/all');
  }

  get appUser$() : Observable<AppUser> {
    return this.user$
    .switchMap(user => {
      if (user) return this.userService.get(user.uid);

      return Observable.of(null);
    });
  }

}
