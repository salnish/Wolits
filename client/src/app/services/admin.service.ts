import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _adminUrl = "http://localhost:5000/api/admin"
  constructor(private http:HttpClient,private _router:Router) { }

  getRestaurants(status:any){
    return this.http.get<any>(`${this._adminUrl}/getRestaurants/${status}`)

  }
}
