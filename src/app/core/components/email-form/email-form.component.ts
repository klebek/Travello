
import { Component } from '@angular/core';
import { MailService } from 'app/core/services/mail.service';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';

@Component({
  selector: 'contact',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent{
  
  mail = [];
  showForm = true;

  clientError;
  serverError;
  emailSent;

  type = 3;

  constructor(private mailService: MailService, private http: HttpClient){}

  sendMail(mail) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {
      headers: httpHeaders
    };
    this.http.put<any>('http://localhost:9000/api/mail/send', mail, options)
    .subscribe( res => {
      console.log(res)
      this.emailSent =  "Message successfuly sent"
      this.showForm = false;
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) this.clientError = "Client-side error occured.";
        else this.serverError = "Server-side error occurred.";
      });
      console.log(mail);
  }
  
}
