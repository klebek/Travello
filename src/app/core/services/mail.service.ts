import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  sendMail(mail) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {
      headers: httpHeaders
    };
    this.http.put<any>('http://localhost:9000/api/mail/send', mail, options)
    .subscribe( res => { console.log(res) },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) console.log("Client-side error occured.");
        else console.log("Server-side error occurred.");
      });
      console.log(mail);
  }
}
