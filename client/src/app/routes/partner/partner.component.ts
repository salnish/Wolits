import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})
export class PartnerComponent implements OnInit {

  side:boolean= false;
  side1:boolean= false;

  constructor() { }

  ngOnInit(): void {
  }

}
