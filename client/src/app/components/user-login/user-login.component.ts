import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  title: string = 'Login'
  side:string="login"
  err!: string; 
  bar:boolean=false
  constructor(private _authService:AuthService,private _router:Router) { }

  ngOnInit(): void {
  }

  onLogin(event:any){
    console.log(event);
    this._authService.authenticateUser(event)
    .subscribe({
      next:(v)=>{
        this._authService.setTokens(v.token,v.refreshToken)
        localStorage.setItem('user',v.name)//store the user name
        this._router.navigate(['landing'])//navigate the user to landing page
        console.log(v)
      },
      error:(e)=>{
        console.log(e)
        this.err=e;
      }
    })
    
  }

}
