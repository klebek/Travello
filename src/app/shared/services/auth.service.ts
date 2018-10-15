import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from 'shared/models/app-user';
import { UserService } from 'shared/services/user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;
  errorLogin;
  errorRegister;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
  }

  loginGoogle() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  loginFb() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
  }

<<<<<<< HEAD
  loginEmailPassword(formLogin, email, password) {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  registerEmailPassword(formRegister, email, password) {
=======
  async loginEmailPassword(formLogin, email, password) {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    await this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .catch(error => {
      this.errorLogin = error.message;
    });
  }

  async registerEmailPassword(formRegister, email, password) {
>>>>>>> fd075b2d41e95f3c6713ab29824117b723367dfa
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    let confirmPassword = formRegister.value.confirmPassword;
    let name = formRegister.value.name;
<<<<<<< HEAD
    this.afAuth.auth.createUserWithEmailAndPassword(email, password);
=======
    await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .catch(error => {
      this.errorRegister = error.message;
    });
>>>>>>> fd075b2d41e95f3c6713ab29824117b723367dfa
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$() : Observable<AppUser> {
    return this.user$
    .switchMap(user => {
      if (user) return this.userService.get(user.uid);

      return Observable.of(null);
    });
  }

}
