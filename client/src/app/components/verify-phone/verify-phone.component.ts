import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify-phone',
  templateUrl: './verify-phone.component.html',
  styleUrls: ['./verify-phone.component.scss']
})
export class VerifyPhoneComponent implements OnInit {

  title: string = 'Verify'
  side:string="verifyPhone"
  err!: string; 
  bar:boolean=false
  constructor(private _authService:AuthService, private _router :Router) { }

  ngOnInit(): void {
  }

  verifyNumber(event:any){
    console.log(event);
    this._authService.sentOtp(event)
    .subscribe({
      next:(v)=>{
        localStorage.setItem('token',v.token)
        this._router.navigate(['verifyOtp'])
        console.log(v)
      },
      error:(e)=>{
        console.log(e);
        this.err=e.split(':')[1]
      }
    })
    
  }

}
