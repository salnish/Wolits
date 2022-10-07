import { AdminService } from './../../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-onboard-panel',
  templateUrl: './onboard-panel.component.html',
  styleUrls: ['./onboard-panel.component.scss']
})
export class OnboardPanelComponent implements OnInit {
  showTable: boolean = true;
  restaurantId!:string;
  constructor(private _adminService:AdminService) { }
  displayedColumns: string[] = ['position', 'restaurantId', 'restaurantName', 'status','action'];
  dataSource=[]

  ngOnInit(): void {
    this.getRestaurants('approved')
  }
  getRestaurants(status:string){
    this._adminService.getRestaurants(status)
    .subscribe({
      next:(v)=>{
        console.log(v)
        this.dataSource=v
      },
      error:(e)=>{
        console.log(e)
      }
    })
  }

  showApplication(restaurantId: string) {
    this.showTable = !this.showTable;
    this.restaurantId = restaurantId;
  }



}
