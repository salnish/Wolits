import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { PartnerAuthService } from './../../services/partner-auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-partner-login',
  templateUrl: './partner-login.component.html',
  styleUrls: ['./partner-login.component.scss']
})
export class PartnerLoginComponent implements OnInit {

  title: string = 'Login'
  side: string = "login"
  err!: string;
  bar: boolean = false
  constructor(private _auth:AuthService,private _authService: PartnerAuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  onLogin(event: any) {
    console.log(event);
    this._authService.authenticatePartner(event)
      .subscribe({
        next: (v) => {
          localStorage.setItem('partner',v.id)
          this._auth.setTokens(v.token,v.refreshToken)
          v.isAdmin ?localStorage.setItem('id',v.id):localStorage.setItem('partner',v.name)//store the user name
          v.isAdmin ? this._router.navigate(['admin']) : this._router.navigate(['partner'])//navigate the partner to partner route
          console.log(v)
        },
        error: (e) => {
          console.log(e)
          this.err=e.split(':')[1]
        }
      })

  }
}
