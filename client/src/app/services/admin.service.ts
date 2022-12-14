import { RestaurantModel } from './../models/restaurant-model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _adminUrl = "http://localhost:5000/api/admin"
  constructor(private http: HttpClient, private _router: Router) { }

  getRestaurants(status: any) {
    return this.http.get<RestaurantModel[]>(`${this._adminUrl}/getRestaurants/${status}`)

  }

  getRestaurantDetails(restaurantId: string) {
    return this.http.get<RestaurantModel>(`${this._adminUrl}/restaurantDetails/${restaurantId}`)
  }

  updateOnboardStatus(formId:string,status:string){
    let data={
      formId,
      status,
    }
    return this.http.put<any>(`${this._adminUrl}/updateOnboard`,data)
  }
}
