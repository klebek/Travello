import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorLogin;
  errorRegister;

  constructor(private auth: AuthService) {}

  loginGoogle() {
    this.auth.loginGoogle();
  }

  loginFb() {
    this.auth.loginFb();
  }

  async loginEmailPassword(formLogin) {
    await this.auth.loginEmailPassword(formLogin, formLogin.value.email, formLogin.value.password);
    this.errorLogin = await this.auth.errorLogin;
  }

<<<<<<< HEAD
  showRegister;

  showRegisterForm() {
    this.showRegister = !this.showRegister;
  }

  loginGoogle() {
    this.auth.loginGoogle();
  }

  loginFb() {
    this.auth.loginFb();
  }

  loginEmailPassword(formLogin) {
    this.auth.loginEmailPassword(formLogin, formLogin.value.email, formLogin.value.password);
=======
  async register(formRegister) {
    await this.auth.registerEmailPassword(formRegister, formRegister.value.email, formRegister.value.password);
    this.errorRegister = await this.auth.errorRegister;  
>>>>>>> fd075b2d41e95f3c6713ab29824117b723367dfa
  }

}
