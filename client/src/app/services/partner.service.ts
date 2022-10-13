import { RestaurantModel } from './../models/restaurant-model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders ,} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  private _partnerUrl = "http://localhost:5000/api/partner"
  constructor(private http:HttpClient,private _router:Router) { }

  applyForRestaurant(form:any){
 
    return this.http.post<any>(`${this._partnerUrl}/applyForm`,form)
  }

  getRestaurant(){
    return this.http.get<any>(`${this._partnerUrl}/getForm`)
  }

  addDishToMenu(dishData:any){
    return this.http.post<any>(`${this._partnerUrl}/addDish`,dishData)
  }

  getDishes(page:number,limit:number){
    return this.http.get<any>(`${this._partnerUrl}/getDishes/${page}/${limit}`)
  }

  getDish(dishId:string){
    return this.http.get<any>(`${this._partnerUrl}/getDish/${dishId}`)
  }
}
