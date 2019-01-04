import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/Rx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  showRegister = false;
  loggedIn = new BehaviorSubject<boolean>(false);
  errorLogin;

  constructor(private auth: AuthService, private route: ActivatedRoute, private http: HttpClient) {}

  showRegisterForm() {
    this.showRegister = !this.showRegister;
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
  loginEmailPassword(formLogin) {
    let username = formLogin.value.email;
    let password = formLogin.value.password;
    const data = 'username=' + username + '&password=' + password + '&grant_type=password';
    const header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    console.log(data);
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    return this.http.post( 'http://localhost:9000/oauth/token', data, {headers : header}).subscribe((data : any)=>{
        localStorage.setItem('token', data.access_token);
        this.setCurrentUser();
        this.loggedIn.next(true);
        this.errorLogin = undefined;
      },
      (err : HttpErrorResponse)=>{
        this.errorLogin = "Incorrect username and/or password";
      });


  }
  setCurrentUser() {
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.get('http://localhost:9000/principal', { headers: header }).subscribe((data: any) => {
      localStorage.setItem('user', JSON.stringify(data.principal));
    });
  }

}
