import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authUrl = "http://localhost:5000/api/user"
  constructor(private http:HttpClient) { }

  sentOtp(phone:any){
    return this.http.post<any>(`${this._authUrl}/verifyNumber`,phone)
  }

  verifyNumber(otp:any){
    return this.http.put<any>(`${this._authUrl}/verifyOtp`,otp)
  }

  registerUser(user:any){
    return this.http.put<any>(`${this._authUrl}/register`,user)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getAdminToken(){
    return localStorage.getItem('admin')
  }
}
