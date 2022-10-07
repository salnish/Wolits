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
    ownerEmail:['',[Validators.required,Validators.email]],
    restaurantType:['',[Validators.required]],
    cuisineType:['',[Validators.required]],
    openingTime:['09:00',[Validators.required]],
    closingTime:['22:00',[Validators.required]],
    gstNo:['',[Validators.required]],
    bankAccountNo:['',[Validators.required]],
    fssaiFile:['',[Validators.required]],
    pancardFile:['',[Validators.required]],
    passbookFile:['',[Validators.required]],
    iconFile:['',[Validators.required]],
  })

  submitForm(){


    
    const formData = new FormData();
    for (const property in this.onboardingForm.value) {
      formData.append(`${property}`,this.onboardingForm.value[property])
    }

    console.log(this.onboardingForm.value)
    this.file=this.onboardingForm.controls['fssaiFile'].value
    this._partnerService.applyForRestaurant(formData)
    .subscribe({
      next:(v)=>{
        console.log(v)
        this._router.navigate(['partner'])
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
