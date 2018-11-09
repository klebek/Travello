import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  register(formRegister) {
    this.auth.registerEmailPassword(formRegister, formRegister.value.email, formRegister.value.password);
  }


}
