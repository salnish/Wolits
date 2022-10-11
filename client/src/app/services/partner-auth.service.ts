import { PartnerModel } from './../models/partner-model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PartnerAuthService {

  private _authUrl = "http://localhost:5000/api/partner"
  constructor(private http:HttpClient,private _router:Router) { }

  sentOtp(phone:PartnerModel){
    return this.http.post<any>(`${this._authUrl}/verifyNumber`,phone)
  }

  verifyNumber(otp: string) {
    return this.http.put<any>(`${this._authUrl}/verifyOtp`, otp)
  }

  registerPartner(partner: PartnerModel) {
    return this.http.put<any>(`${this._authUrl}/register`, partner)
  }

  authenticatePartner(partner: PartnerModel) {
    return this.http.post<any>(`${this._authUrl}`, partner)
  }

}
