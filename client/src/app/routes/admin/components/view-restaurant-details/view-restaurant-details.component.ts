import { AdminService } from './../../../../services/admin.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-view-restaurant-details',
  templateUrl: './view-restaurant-details.component.html',
  styleUrls: ['./view-restaurant-details.component.scss']
})
export class ViewRestaurantDetailsComponent implements OnInit {
  title: string = 'Application Details'
  app!: any
  @Input() restaurantId!: string;
  @Output() close: EventEmitter<any> = new EventEmitter()
  constructor(private _adminService:AdminService) { }

  ngOnInit(): void {
    console.log('oninit')
    this._adminService.getRestaurantDetails(this.restaurantId)
    .subscribe({
      next:(v)=>{
        if(v){
          this.app=v;
          console.log(v)
        }
      },
      error:(err)=>{
        this.title=err.error.message
        console.log(err.error.message)
        
      }
    })
  }

  closeDetails(){
    this.close.emit()

  }
  

}
