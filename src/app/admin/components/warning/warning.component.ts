import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent implements OnInit{

  @Input() name;
  @Input() userEmail;
  @Input() tripId;
  @Input() type;
  @Input() userId;

  mail = [];
  showForm = true;

  clientError;
  serverError;
  emailSent;

  constructor(public activeModal: NgbActiveModal, private http: HttpClient) {
  }

  sendMail(mail) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {
      headers: httpHeaders
    };
    this.http.put<any>('http://localhost:9000/api/mail/send', mail, options)
    .subscribe( res => {
      // console.log(res)
      this.emailSent =  "Message successfuly sent"
      this.showForm = false;
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) this.clientError = "Client-side error occured.";
        else this.serverError = "Server-side error occurred.";
      });
      // console.log(mail);
  }
  ngOnInit(){
  }


}
