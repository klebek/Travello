import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Trip } from '../model/trip';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  idUser;
  idTrip = Math.floor(Math.random() * (999999 - 1 + 1)) + 1;
  url;
  editUrl;
  countriesUrl;

  userid;

  constructor(private http: HttpClient, protected localStorage: LocalStorage) {
    if(localStorage.getItem('user') != null){
      // this.idUser = JSON.parse(localStorage.getItem('user')).userId;
      this.localStorage.getItem('user').subscribe((user) => this.idUser = user.userId);
    }
    this.localStorage.getItem('user').subscribe((user) => {
      this.userid= user.userId
      this.url = "http://localhost:9000/api/trip/user/"+this.userid+"/id/"+this.idTrip;
      this.editUrl = "http://localhost:9000/api/trip/user/"+this.userid+"/id/";
    });
    // this.countriesUrl = "http://localhost:9000/api/trip/"+this.idTrip+"/country/add";
  }

  getTripId(){
    return this.idTrip;
  }

  rateTrip(id, token, rate){
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization': token
    });
    let options = {
      headers: httpHeaders
    };
    // console.log(rate);
    // console.log(id);
    return this.http.put<Trip>('http://localhost:9000/api/trip/'+id+'/rate/'+rate, options);
  }

  getRate(id){
    return this.http.get('http://localhost:9000/api/trip/'+id+'/rating');
  }

  getCanVote(id){
    return this.http.get('http://localhost:9000/api/trip/'+id+'/canVote');
  }

  addTrip(idUser, trip: Trip): Observable<Trip> {
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
    });
    let options = {
      headers: httpHeaders
    };
    // console.log(trip);
    return this.http.put<Trip>('http://localhost:9000/api/trip/user/'+idUser+'/id/'+this.idTrip, trip, options);
  }

  editTrip(id, trip: Trip) {
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
    });
    let options = {
      headers: httpHeaders
    };
    return this.http.put(this.editUrl+id, trip, options)
  }


  getAccount(){
    return this.http.get('http://localhost:9000/api/account/all');
  }

  getTraveller(id){
    return this.http.get('http://localhost:9000/api/trip/'+id+'/owner');
  }

  getUserTrip(id){
    return this.http.get('http://localhost:9000/api/trip/user/'+id);
  }

  deleteTrip(id) {
    return this.http.delete('http://localhost:9000/api/trip/'+id);
  }

  getCountries(id) {
    return this.http.get('http://localhost:9000/api/trip/'+id+'/countries');
  }

  // addCountry(country) {
  //   let httpHeaders = new HttpHeaders({
  //     'Content-Type' : 'application/json',
  //     'Cache-Control': 'no-cache'
  //   });
  //   let options = {
  //     headers: httpHeaders
  //   };
  //   return this.http.put(this.countriesUrl, country, options);
  // }

  getCards(id){
    return this.http.get('http://localhost:9000/api/card/trip/'+id+'/cards');
  }

  getNotes(id) {
    return this.http.get('http://localhost:9000/api/card/trip/'+id+'/notes');
  }

  getAll(){
    return this.http.get('http://localhost:9000/api/trip/all');
  }

  changeStatus(id, status) {
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
    });
    let options = {
      headers: httpHeaders
    };
    // console.log("serwis ID: " + id + " , " + status);
    return this.http.put("http://localhost:9000/api/trip/"+id+"/status/"+status, options);
  }

  getTrip(id){
    return this.http.get('http://localhost:9000/api/trip/'+id);
  }
}
