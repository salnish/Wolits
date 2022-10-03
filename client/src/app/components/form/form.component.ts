import { Router } from '@angular/router';
import {ConfirmPasswordValidator} from './confirmPassword.Validator'
import { Component, OnInit ,Input ,Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  hide: boolean = true;
  confirmHide:boolean =true;

  @Input() title:string='' 
  @Input() side!:string
  @Input() errorMsg:string=''
  @Input() bar:boolean= false;
  @Output() form:EventEmitter<any> = new EventEmitter()


  constructor(private fb: FormBuilder,private _router:Router) { }

  ngOnInit(): void { 
  }
 




 phoneForm:FormGroup=  this.fb.group({
    phone: ['', [Validators.required,Validators.pattern("[0-9 ]{10}")]]
  })
  loginForm:FormGroup=this.fb.group({
    phone: ['', [Validators.required,Validators.pattern("[0-9 ]{10}")]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  otpForm:FormGroup= this.fb.group({
    otp:['',[Validators.required,Validators.minLength(6)]]
  })

  signupForm:FormGroup=this.fb.group({
    name:['',[Validators.required,Validators.minLength(3)]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]],
    confirm:['',[Validators.required,Validators.minLength(6)]]
  },
  {
    validator:ConfirmPasswordValidator('password','confirm')
  }
  )




  phoneSubmit() {
    if (!this.phoneForm.valid) {
      console.log(this.phoneForm.value)
      return;
    }
    this.form.emit(this.phoneForm.value)
    console.log(this.phoneForm.value);
  }


  otpSubmit(){
    if (!this.otpForm.valid) {
      console.log(this.otpForm.value)
      return;
    }
    this.form.emit(this.otpForm.value)
    console.log(this.otpForm.value);
  }

  loginSubmit(){
    if (!this.loginForm.valid) {
      console.log(this.loginForm.value)
      return;
    }
    this.form.emit(this.loginForm.value)
    console.log(this.loginForm.value);
  
  }

  signupSubmit(){
    if(
      this.signupForm.controls['password'].value!==this.signupForm.controls['confirm'].value &&
      !this.signupForm.valid
    ){
      console.log(this.signupForm.value)
      return;
    }
    this.form.emit(this.signupForm.value)
    console.log(this.signupForm.value)
    
  }

}
