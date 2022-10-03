import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private fb:FormBuilder, private _authService:AuthService) { }

  locationForm:FormGroup= this.fb.group({
    location:['',[Validators.required]]
  })
  ngOnInit(): void {
  }

  OnSubmit(){
    console.log(this.locationForm.value);
    if(!this.locationForm.valid)return;
    if(this._authService.loggedIn()){
      this._authService.updateLocation(this.locationForm.value)
      .subscribe({
       next:(v)=>{
         console.log(v);
         
       },error:(e)=>{
         console.log(e);
         
       }
      })
    }else{
      console.log(this.locationForm.value);
      
      localStorage.setItem('location',this.locationForm.controls['location'].value)
    }
  }

  detectLocation(){
    navigator.geolocation.getCurrentPosition((x)=>{
      let latitude= x.coords.latitude;
      let longitude=x.coords.longitude;
      console.log(x);
      
      localStorage.setItem("location",latitude+","+longitude)
    })
  }

}
