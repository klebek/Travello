
import { Component } from '@angular/core';
import { MailService } from 'app/core/services/mail.service';

@Component({
  selector: 'contact',
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
