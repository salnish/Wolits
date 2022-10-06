import { PartnerAuthService } from './../../services/partner-auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-partner-verify-phone',
  templateUrl: './partner-verify-phone.component.html',
  styleUrls: ['./partner-verify-phone.component.scss']
})
export class PartnerVerifyPhoneComponent implements OnInit {
  title: string = 'Verify Partner'
  side:string="verifyPhone"
  err!: string; 
  link:string="/partnerLogin"
  bar:boolean=false
  constructor(private _authService:PartnerAuthService, private _router :Router) { }

  ngOnInit(): void {
  }

  verifyNumber(event:any){
    console.log(event)
    this._authService.sentOtp(event)
    .subscribe({
      next:(v)=>{
        localStorage.setItem('timeOut',v.token)
        this._router.navigate(['/partnerOtp'])
        console.log(v)
      },
      error:(e)=>{
        console.log(e);
        
        console.log('djdjdjdjdj')
      }
    })
  }

  
}
