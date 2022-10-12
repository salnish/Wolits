import { PartnerService } from './../../../../services/partner.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.scss']
})
export class AddDishComponent implements OnInit {
  bar: boolean = false;
  constructor(private fb: FormBuilder, private _router: Router, private _partnerService: PartnerService) { }

  ngOnInit(): void {
  }

  dishForm: FormGroup = this.fb.group({
    dishName: ['', [Validators.required]],
    veg: [false, [Validators.required]],
    category: ['', [Validators.required]],
    price: ['', [Validators.required]],
    discription: ['', [Validators.required]],
    image: ['', [Validators.required]],
  })


  submitForm() {
    if(!this.dishForm.valid){
      console.log(this.dishForm.value);
      
      return;
    }
    const formData= new FormData();
    for(const property in this.dishForm.value){
      formData.append(`${property}`,this.dishForm.value[property])
    }
    this._partnerService.addDishToMenu(formData)
    .subscribe({
      next:(v)=>{
        this.bar=!this.bar;
        console.log(v);
        
        this._router.navigate(['/partner/menuManage'])
      },error:(e)=>{
        console.log(e);
        
      }
    })

  }

  getFile(e: any) {
    console.log(e)
    this.dishForm.controls[e.target.id].setValue(e.target.files[0])
  }

}
