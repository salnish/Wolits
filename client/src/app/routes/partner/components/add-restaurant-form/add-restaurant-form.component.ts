import { RestaurantModel } from './../../../../models/restaurant-model';
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
  bar: boolean = false;
  constructor(private fb: FormBuilder, private _router: Router, private _partnerService: PartnerService) { }

  ngOnInit(): void {
  }

  onboardingForm: FormGroup = this.fb.group({
    restaurantName: ['', [Validators.required]],
    restaurantLocality: ['', [Validators.required]],
    locationLongitude: ['', [Validators.required]],
    locationLatitude: ['', [Validators.required]],
    contactNumber: ['', [Validators.required]],
    address: ['', [Validators.required]],
    ownerName: ['', [Validators.required]],
    ownerEmail: ['', [Validators.required, Validators.email]],
    restaurantType: ['', [Validators.required]],
    cuisineType: ['', [Validators.required]],
    openingTime: ['09:00', [Validators.required]],
    closingTime: ['22:00', [Validators.required]],
    gstNo: ['', [Validators.required]],
    bankAccountNo: ['', [Validators.required]],
    fssaiFile: ['', [Validators.required]],
    pancardFile: ['', [Validators.required]],
    passbookFile: ['', [Validators.required]],
    iconFile: ['', [Validators.required]],
  })

  detect() {
    navigator.geolocation.getCurrentPosition((x) => {
      this.onboardingForm.controls['locationLongitude'].setValue(x.coords.longitude)
      this.onboardingForm.controls['locationLatitude'].setValue(x.coords.latitude)
    })
  }

  submitForm() {
    this.bar=!this.bar;
    const formData = new FormData();
    for (const property in this.onboardingForm.value) {
      formData.append(`${property}`, this.onboardingForm.value[property])
    }

    this._partnerService.applyForRestaurant(formData)
      .subscribe({
        next: (v) => {
          this.bar=!this.bar;
          console.log(v)
          this._router.navigate(['partner'])
        },
        error: (e) => {
          this.bar=!this.bar;
          console.log(e)
        }
      })

  }

  getFile(e: any) {
    console.log(e)
    this.onboardingForm.controls[e.target.id].setValue(e.target.files[0])
  }
}
