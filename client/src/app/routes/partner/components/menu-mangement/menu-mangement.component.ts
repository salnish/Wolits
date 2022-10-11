import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-mangement',
  templateUrl: './menu-mangement.component.html',
  styleUrls: ['./menu-mangement.component.scss']
})
export class MenuMangementComponent implements OnInit {
pageNo:number=1;
total!:number;
  constructor() { }
  displayedColumns: string[] = ['position','image', 'dishName','action'];
  dataSource=[]

  ngOnInit(): void {
  }

  showDish(X:any){

  }  

  changePage(change:number){
    if(this.pageNo==1&&change==-1||this.pageNo==this.total&&change==+1){
      return
    }
    this.pageNo=this.pageNo+change;
    console.log(this.pageNo)
  }
}
