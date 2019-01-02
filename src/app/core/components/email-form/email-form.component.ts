
import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpErrorResponse} from '@angular/common/http';
import {Note} from "../../../travelling/model/note";
import { MailService } from 'app/core/services/mail.service';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent{
  
  mail = [];

  constructor(private mailService: MailService){}

  save(mail){
    this.mailService.sendMail(mail);
  }
  
}
