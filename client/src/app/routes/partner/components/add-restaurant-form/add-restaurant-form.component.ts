import { PartnerService } from './../../../../services/partner.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-restaurant-form',
  templateUrl: './add-restaurant-form.component.html',
  styleUrls: ['./add-restaurant-form.component.scss']
})
export class AddRestaurantFormComponent implements OnInit {
file!:string
  constructor(private fb: FormBuilder, private _router: Router,private _partnerService:PartnerService) { }

  ngOnInit(): void {
  }

  onboardingForm:FormGroup= this.fb.group({
    restaurantName:['',[Validators.required]],
    restaurantaLocality:['',[Validators.required]],
    locationLongitude:['',[Validators.required]],
    locationLatitude:['',[Validators.required]],
    contactNumber:['',[Validators.required]],
    address:['',[Validators.required]],
    ownerName:['',[Validators.required]],
    ownerEmail:['',[Validators.required]],
    restaurantType:['',[Validators.required]],
    cuisineType:['',[Validators.required]],
    openingTime:['',[Validators.required]],
    closingTime:['',[Validators.required]],
    gstNo:['',[Validators.required]],
    bankAccountNo:['',[Validators.required]],
    fssaiFile:['',[Validators.required]],
    pancardFile:['',[Validators.required]],
    passbookFile:['',[Validators.required]],
    iconFile:['',[Validators.required]],
  })

  submitForm(){
    console.log(this.onboardingForm.controls['fssaiFile'].value)
    this.file=this.onboardingForm.controls['fssaiFile'].value
    this._partnerService.applyForRestaurant(this.onboardingForm.value)
    .subscribe({
      next:(v)=>{
        console.log(v)
      },
      error:(e)=>{
        console.log(e)
      }
    })

  }

  getFile(e: any) {
    console.log(e)
    this.onboardingForm.controls[e.target.id].setValue(e.target.files[0])
  }
}
