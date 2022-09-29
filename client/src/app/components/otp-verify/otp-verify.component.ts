import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.component.html',
  styleUrls: ['./otp-verify.component.scss']
})
export class OtpVerifyComponent implements OnInit {

  title: string = 'Verify OTP '
  path: string = 'verifyOtp'
  side:string="otp"
  err!: string; 
  bar:boolean=false
  constructor(private _authService:AuthService, private _router :Router, private _snackbar:MatSnackBar) { }

  ngOnInit(): void {
  }

  verifyOtp(event:any){
    this._authService.verifyNumber(event)
    .subscribe({
      next:(v)=>{
        console.log(v);
        
        if(v.tokenExpired){
          this._snackbar.open(`OTP Expired , try again`,`OK`)
          this._router.navigate(['verifyPhone'])
        }else{
          localStorage.setItem('token',v.token)
          this._router.navigate(['userRegister'])
        }
      },
      error:(e)=>{
        console.log(e)
      }
    })
  }

}
