import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http'; 
import { Trip } from '../model/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  idUser = 0;
  idTrip = Math.floor(Math.random() * (999999 - 1 + 1)) + 1;
  url;

  constructor(private http: HttpClient) {
    this.url = "http://localhost:9000/api/trip/user/"+this.idUser+"/id/"+this.idTrip;
  }

  getTripId(){
    return this.idTrip;
  }

  addTrip(trip: Trip): Observable<Trip> { 
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
    });   
    let options = {
      headers: httpHeaders
    };
    // console.log(trip); 
    return this.http.put<Trip>(this.url, trip, options);
  }
  
  getAccount(){
    return this.http.get('http://localhost:9000/api/account/all');
  }

  getCountries(id) {
    return this.http.get('http://localhost:9000/api/trip/'+id+'/countries');
  }

  getCards(id){
    return this.http.get('http://localhost:9000/api/card/trip/'+id);
  }

  getAll(){
    return this.http.get('http://localhost:9000/api/trip/all');
  }

  getTrip(id){
    return this.http.get('http://localhost:9000/api/trip/'+id);
  }
}
