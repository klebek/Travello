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
    this.url = "http://localhost:9000/api/card/trip/";
    console.log("Z notatki:" + this.idTrip);
  }

  addNote(id: number, note: Note): Observable<Note> {
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
    });
    let options = {
      headers: httpHeaders
    };
    // console.log(trip);
    return this.http.post<Note>(this.url + id + "/add", note, options);
  }

  deleteNote(id) {
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
    });
    let options = {
      headers: httpHeaders
    };
    return this.http.delete<Note>("http://localhost:9000/api/card/" + id, options)
  }

  editNote(id, tripId, note) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = {
      headers: httpHeaders
    };
    return this.http.put<Note>("http://localhost:9000/api/card/trip/" + tripId + "/" + id, note, options)
  }
}
