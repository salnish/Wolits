import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  logo:string='logo'

  constructor(private _router:Router) { }

  ngOnInit(): void {
    console.log(this._router.url.split("/")[1])
    console.log(this._router.url.split("/")[1].startsWith("partner"))
    if(this._router.url.split("/")[1].startsWith("partner"))this.logo='partnerLogo'
  }


}
