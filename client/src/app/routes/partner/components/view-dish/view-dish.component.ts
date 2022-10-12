import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-dish',
  templateUrl: './view-dish.component.html',
  styleUrls: ['./view-dish.component.scss']
})
export class ViewDishComponent implements OnInit {

  dishId!:string;
  dishData!:any;

  constructor(private _activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
   const {id} = this._activatedRoute.snapshot.params;
   if(this.dishId){

   }
   
  }

}
