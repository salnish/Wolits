import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PartnerAuthService } from './../../services/partner-auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-partner-otp-verify',
  templateUrl: './partner-otp-verify.component.html',
  styleUrls: ['./partner-otp-verify.component.scss']
})
export class PartnerOtpVerifyComponent implements OnInit {

  title: string = 'Verify OTP '
  side:string="otp"
  err!: string; 
  bar:boolean=false
  constructor(private _authService:PartnerAuthService, private _router :Router, private _snackbar:MatSnackBar) { }

  ngOnInit(): void {
  }

  verifyOtp(event:any){
    this._authService.verifyNumber(event)
    .subscribe({
      next:(v)=>{
        console.log(v);
        
        if(v.tokenExpired){
          this._snackbar.open(`OTP Expired , try again`,`OK`)
          this._router.navigate(['partnerVerify'])
        }else{
          localStorage.setItem('timeOut',v.token)
          this._router.navigate(['partnerRegister'])
        }
      },
      error:(e)=>{
        console.log(e)
      }
    })
  }

}
