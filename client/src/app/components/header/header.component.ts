import { AuthService } from './../../services/auth.service';
import { Component, OnInit ,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logoUrl:string='assets/images/Logo-black.png'
  side:boolean=false
 @Input() path!:string;

  constructor(private _router:Router,public _authService:AuthService) { }

  ngOnInit(): void {
    this.path=this._router.url.split("/")[1]
  }

}
