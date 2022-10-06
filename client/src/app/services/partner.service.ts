import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  private _partnerUrl = "http://localhost:5000/api/partner"
  constructor(private http:HttpClient,private _router:Router) { }

  applyForRestaurant(form:any){
    return this.http.post(`${this._partnerUrl}/applyForm`,form)
  }
}
