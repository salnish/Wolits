import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  
  title: string = 'Register'
  path: string = 'userRegister'
  side:string="signup"
  err!: string; 
  bar:boolean=false
  constructor(private _authService:AuthService, private _router :Router) { }

  ngOnInit(): void {
  }

  onRegister(event:any){
    console.log(event);
    this._authService.registerUser(event)
    .subscribe({
      next:(v)=>{
        localStorage.setItem('token',v.token)
        localStorage.setItem('user',v.user)
        this._router.navigate(['landing'])
        console.log(v)
      },
      error:(e)=>{
        console.log(e)
      }
    })
    
  }

}
