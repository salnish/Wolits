import { User } from './../models/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authUrl = "http://localhost:5000/api/user"
  constructor(private http: HttpClient, private _router: Router) { }

  sentOtp(phone: User) {
    return this.http.post<any>(`${this._authUrl}/verifyNumber`, phone)
  }

  verifyNumber(otp: string) {
    return this.http.put<any>(`${this._authUrl}/verifyOtp`, otp)
  }

  registerUser(user: User) {
    return this.http.put<any>(`${this._authUrl}/register`, user)
  }

  authenticateUser(user: User) {
    return this.http.post<any>(`${this._authUrl}`, user)
  }

  updateLocation(location: any) {
    return this.http.put<any>(`${this._authUrl}/updateLocation`, location)
  }



  getToken() {
    return localStorage.getItem('token')
  }

  getRefreshToken() {
    let refreshToken = localStorage.getItem('refreshToken')
    return { refreshToken }
  }

  setTokens(token: string, refresh: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refresh)
  }

  refreshAccess() {
    return this.http.post<any>(`${this._authUrl}/refresh`, this.getRefreshToken())
  }

  getTimeOutToken() {
    return localStorage.getItem('timeOut')
  }



  loggedIn() {
    return !!localStorage.getItem('token')
  }



  getUserName() {
    return localStorage.getItem('user')
  }

  logoutUser() {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    this._router.navigate([''])
  }

  logoutPartner() {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('partner')
    this._router.navigate([''])
  }
  logoutAdmin() {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('id')
    this._router.navigate([''])
  }

}
