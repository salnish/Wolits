import { PartnerOtpVerifyComponent } from './components/partner-otp-verify/partner-otp-verify.component';
import { PartnerRegisterComponent } from './components/partner-register/partner-register.component';
import { PartnerLoginComponent } from './components/partner-login/partner-login.component';
import { PartnerVerifyPhoneComponent } from './components/partner-verify-phone/partner-verify-phone.component';
import { OtpVerifyComponent } from './components/otp-verify/otp-verify.component';
import { VerifyPhoneComponent } from './components/verify-phone/verify-phone.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LandingComponent } from './components/landing/landing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'/landing',pathMatch:'full'},
  {path:'landing',component:LandingComponent},
  {path:'verifyPhone',component:VerifyPhoneComponent},
  {path:'verifyOtp',component:OtpVerifyComponent},
  {path:'userRegister',component:UserRegisterComponent},
  {path:'userLogin',component:UserLoginComponent},
  //partner
  {path:'partnerVerify',component:PartnerVerifyPhoneComponent},
  {path:'partnerOtp',component:PartnerOtpVerifyComponent},
  {path:'partnerRegister',component:PartnerRegisterComponent},
  {path:'partnerLogin',component:PartnerLoginComponent},
  {
    path:'partner',
    loadChildren: ()=> 
    import('./routes/partner/partner.module').then((m)=> m.PartnerModule)
  },

  
 

  //not found
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
