import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  
  title: string = 'Register'//tittle for form
  side:string="signup"//mention the side  for formGroup
  err!: string; //Error message to display on form
  bar:boolean=false //progress bar state
  constructor(private _authService:AuthService, private _router :Router) { }

  ngOnInit(): void {
  }

  onRegister(event:any){
    console.log(event);
    this._authService.registerUser(event)
    .subscribe({
      next:(v)=>{
        this._authService.setTokens(v.token,v.refreshToken)
        localStorage.setItem('user',v.name)//store the user name
        this._router.navigate(['landing'])//navigate the user to landing page
        console.log(v)
      },
      error:(e)=>{
        console.log(e)
        this.err=e
      }
    })
    
  }

}
