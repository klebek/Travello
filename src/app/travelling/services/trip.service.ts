import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http'; 
import { Trip } from '../model/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient) {
  }
  
  url = "http://localhost:9000/api/user/2/add"

  addTrip(trip: Trip): Observable<Trip> { 
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
    });   
    let options = {
      headers: httpHeaders
    };
    // console.log(trip); 
    return this.http.post<Trip>(this.url, trip, options);
  }
  
  getAccount(){
    return this.http.get('http://localhost:9000/api/account/all');
  }

  getTrip(){
    return this.http.get('http://localhost:9000/api/trip/user/2');
  }
}
