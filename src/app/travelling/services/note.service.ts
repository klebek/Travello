import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Note } from '../model/note';
import { Observable } from 'rxjs/Observable';
import { TripService } from './trip.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  idTrip;
  url;

  constructor(private http: HttpClient, private tripService: TripService) {
    this.idTrip = this.tripService.getTripId();
    this.url = "http://localhost:9000/api/card/trip/"+this.idTrip+"/add";
    console.log("Z notatki:" + this.idTrip);
  }

  addNote(note: Note): Observable<Note> { 
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
    });   
    let options = {
      headers: httpHeaders
    };
    // console.log(trip); 
    return this.http.post<Note>(this.url, note, options);
  }
}
