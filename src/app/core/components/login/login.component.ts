import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth: AuthService, private router: Router) {}

  showRegister = false;

  showRegisterForm() {
    this.showRegister = !this.showRegister;
  }
  //
  // loginGoogle() {
  //   this.auth.loginGoogle();
  // }
  //
  // loginFb() {
  //   this.auth.loginFb();
  // }

  loginEmailPassword(formLogin) {
    this.auth.userAuthentication(formLogin.value.email, formLogin.value.password).subscribe((data: any) => {
      localStorage.setItem('token', data.access_token);
      this.router.navigate(['/home']);
    },
      (err: HttpErrorResponse) => {});
  }

}
