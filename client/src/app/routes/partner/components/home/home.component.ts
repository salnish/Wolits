import { Router } from '@angular/router';
import { PartnerService } from './../../../../services/partner.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  declined:boolean=false
  pending!:boolean;
  constructor(private _partnerService:PartnerService,private _router:Router) { }

  ngOnInit(): void {
    this._partnerService.getRestaurant()
    .subscribe({
      next:(v)=>{
        console.log(v)
        v.status=='approved'?this._router.navigate(['/partner/dashboard']):v.status=='rejected'?this.declined=true:this.pending=true
        console.log(v.approved);
        console.log(v.declined);
        console.log(this.pending);
        console.log(this.declined);
        
        
      },error:(e)=>{
       
        
      }
    })
  
    
  }
}
