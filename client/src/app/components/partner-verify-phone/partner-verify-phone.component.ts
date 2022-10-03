import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
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
  bar:boolean=false
  constructor(private _authService:AuthService, private _router :Router) { }

  ngOnInit(): void {
  }

  verifyNumber(event:any){
    console.log(event)
  }

  
}
