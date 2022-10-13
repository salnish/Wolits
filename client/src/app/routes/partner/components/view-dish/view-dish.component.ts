import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PartnerService } from './../../../../services/partner.service';
import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-dish',
  templateUrl: './view-dish.component.html',
  styleUrls: ['./view-dish.component.scss']
})
export class ViewDishComponent implements OnInit {

  bar: boolean = false;
  dishId!: string;
  dishData!: any;
  constructor(private _activatedRoute: ActivatedRoute, private _partnerService: PartnerService, private fb: FormBuilder, private _router: Router) { }

  ngOnInit(): void {
    const { id } = this._activatedRoute.snapshot.params;
    this.dishId = id;
    if (this.dishId) {
      this._partnerService.getDish(this.dishId)
        .subscribe({
          next: (v) => {
            console.log(v);
            this.dishData=v;
          }, error: (e) => {
            console.log(e);

          }
        })
    }

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
    if (!this.dishForm.valid) {
      console.log(this.dishForm.value);

      return;
    }
    const formData = new FormData();
    for (const property in this.dishForm.value) {
      formData.append(`${property}`, this.dishForm.value[property])
    }
    this._partnerService.addDishToMenu(formData)
      .subscribe({
        next: (v) => {
          this.bar = !this.bar;
          console.log(v);

          this._router.navigate(['/partner/menuManage'])
        }, error: (e) => {
          console.log(e);

        }
      })

  }

  getFile(e: any) {
    console.log(e)
    this.dishForm.controls[e.target.id].setValue(e.target.files[0])
  }



}
