import { PartnerService } from './../../../../services/partner.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-mangement',
  templateUrl: './menu-mangement.component.html',
  styleUrls: ['./menu-mangement.component.scss']
})
export class MenuMangementComponent implements OnInit {
  pageNo: number = 1;
  limit: number = 3;
  total!: number;
  constructor(private _partnerService: PartnerService) { }
  displayedColumns: string[] = ['position', 'image', 'dishName', 'action'];
  dataSource = []

  ngOnInit(): void {
    this.getDishes()
  }

  getDishes() {
    this._partnerService.getDishes(this.pageNo, this.limit)
      .subscribe({
        next: (v) => {
          console.log(v);
          this.total = Math.ceil(v.total / this.limit)
          this.dataSource = v.dishes;
          console.log(v.total / this.limit)

        }, error: (e) => {
          console.log(e);

        }
      })
  }

  showDish(X: any) {

  }

  changePage(change: number) {
    if (this.pageNo == 1 && change == -1 || this.pageNo == this.total && change == +1) {
      return
    }
    this.pageNo = this.pageNo + change;
    console.log(this.pageNo)
    this.getDishes()
  }
}
