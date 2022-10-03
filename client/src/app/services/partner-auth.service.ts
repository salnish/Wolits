import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PartnerAuthService {

  private _authUrl = "http://localhost:5000/api/partner"
  constructor(private http:HttpClient,private _router:Router) { }

  sentOtp(phone:any){
    return this.http.post<any>(`${this._authUrl}/verifyNumber`,phone)
  }

}
