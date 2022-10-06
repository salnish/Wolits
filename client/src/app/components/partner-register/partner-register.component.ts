import { Router } from '@angular/router';
import { PartnerAuthService } from './../../services/partner-auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-partner-register',
  templateUrl: './partner-register.component.html',
  styleUrls: ['./partner-register.component.scss']
})
export class PartnerRegisterComponent implements OnInit {

  title: string = 'Register'//tittle for form
  side:string="signup"//mention the side  for formGroup
  err!: string; //Error message to display on form
  bar:boolean=false //progress bar state
  constructor(private _authService:PartnerAuthService, private _router :Router) { }

  ngOnInit(): void {
  }

  onRegister(event:any){
    console.log(event);
    this._authService.registerPartner(event)
    .subscribe({
      next:(v)=>{
        localStorage.removeItem('timeOut')
        localStorage.setItem('token',v.token)//store the the token
        localStorage.setItem('user',v.name)//store the user name
        this._router.navigate(['partner'])//navigate the user to landing page
        console.log(v)
      },
      error:(e)=>{
        console.log(e)
      }
    })
    
  }
}
