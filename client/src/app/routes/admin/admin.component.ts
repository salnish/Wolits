import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  side:boolean= false;
  side1:boolean= false;
  title:string= 'Admin Dashboard'
  constructor(public _authService:AuthService) { }

  ngOnInit(): void {
  }

  
}
