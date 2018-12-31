
import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpErrorResponse} from '@angular/common/http';
import {Note} from "../../../travelling/model/note";

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit{
  title = 'Email-form';
  public data:any=[]


  constructor(private http: HttpClient){
  }

  save(name, email, subject, message): void {
            this.data['name']= name;
            this.data['email']= email;
            this.data['subject']= subject;
            this.data['message']= message;
    console.log(this.data);

    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
    });
    let options = {
      headers: httpHeaders
    };
    // console.log(trip);

    this.http.put<any>('http://localhost:9000/api/mail/send', this.data, options).subscribe(

        res => {
          console.log(res);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occurred.");
        }
      });
   }
  ngOnInit() {
  }
}
