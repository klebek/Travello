import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { AppUser } from 'shared/models/app-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  showRegister = false;
  loggedIn = new BehaviorSubject<boolean>(false);
  errorLogin;

  returnUrlFinal;
  user$: Observable<AppUser>

  logged = false;

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router, private http: HttpClient, protected localStorage: LocalStorage) { }

  showRegisterForm() {
    this.showRegister = !this.showRegister;
  }

  loginEmailPassword(formLogin) {
    let username = formLogin.value.email;
    let password = formLogin.value.password;
    const data = 'username=' + username + '&password=' + password + '&grant_type=password';
    const header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let returnUrl = this.returnUrlFinal = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.localStorage.setItem('returnUrl', returnUrl).subscribe(() => { });

    return this.http.post('/oauth/token', data, { headers: header }).subscribe((data: any) => {
      localStorage.setItem('token', data.access_token);
      this.setCurrentUser();
      this.localStorage.getItem('returnUrl').subscribe(data => {
        this.returnUrlFinal = data;
      });
      this.router.navigateByUrl(this.returnUrlFinal);
      this.loggedIn.next(true);
      this.errorLogin = undefined;
    },
      (err: HttpErrorResponse) => {
        this.errorLogin = "Incorrect username and/or password";
        if(err.error.error_description === "User account is locked") this.errorLogin = "User account is locked";
      });


  }
  setCurrentUser() {
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.get('/principal', { headers: header }).subscribe((data: any) => {
      localStorage.setItem('user', JSON.stringify(data.principal));
      this.user$ = data.principal;
      if(data.principal.username != null) this.logged = true;
      this.auth.onMainEventLogged.emit(this.logged);
      this.auth.onMainEventUser.emit(data.principal);
      this.router.navigateByUrl(this.returnUrlFinal);
    });
  }


  // loginGoogle() {
  //   this.auth.loginGoogle();
  // }

  // loginFb() {
  //   this.auth.loginFb();
  // }

  // loginEmailPassword(formLogin) {
  //   this.auth.authenticateUser(formLogin.value.email, formLogin.value.password)
  // }

}
