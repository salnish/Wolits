import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  title: string = 'OTP'
  path: string = 'userRegister'
  side:string="otp"
  err!: string; 
  bar:boolean=false
  constructor() { }

  ngOnInit(): void {
  }

  onLogin(event:any){
    console.log(event);
    
  }

}
