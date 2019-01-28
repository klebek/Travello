import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input('business') business = false;

  errorRegister;
  infoRegister;
  showForm = true;
  readonly root = '/api';

  constructor(private auth: AuthService, private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  register(formRegister) {
    let data = {
      "username": formRegister.value.username,
      "password": formRegister.value.password,
      "email": formRegister.value.email,
      "business": false,
      "admin": false,
      "active": true
    };
    let body = JSON.stringify(data);

    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.root + '/account/register', body, { headers: header }).subscribe(data => {
      // this.router.navigateByUrl('/')
      this.infoRegister = "You account has been created. You can sign in now";
      this.showForm = false;
    },
      (err: HttpErrorResponse) => {
        this.errorRegister = err.error;
        console.log("Z serwisu: " + this.errorRegister);
      }
    );
  }
  registerBusinessPartner(formRegister) {
    let data = {
      "username": formRegister.value.username,
      "password": formRegister.value.password,
      "email": formRegister.value.email,
      "business": true,
      "admin": false,
      "active": false
    };
    let body = JSON.stringify(data);
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.root + '/account/register', body, {headers : header} ).subscribe(data =>{
      // this.router.navigateByUrl('/');
      this.infoRegister = "You account has been created but is still inactive and need to be activated by the administrator";
      this.showForm = false;
    },
    (err: HttpErrorResponse) => {
      this.errorRegister = err.error;
      console.log("Z serwisu: " + this.errorRegister);
    });
  }

}
