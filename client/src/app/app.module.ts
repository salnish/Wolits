import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule} from '@angular/flex-layout';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { LandingComponent } from './components/landing/landing.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OtpVerifyComponent } from './components/otp-verify/otp-verify.component';
import { VerifyPhoneComponent } from './components/verify-phone/verify-phone.component';
import { PartnerVerifyPhoneComponent } from './components/partner-verify-phone/partner-verify-phone.component';
import { PartnerOtpVerifyComponent } from './components/partner-otp-verify/partner-otp-verify.component';
import { PartnerRegisterComponent } from './components/partner-register/partner-register.component';
import { PartnerLoginComponent } from './components/partner-login/partner-login.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    LandingComponent,
    UserLoginComponent,
    UserRegisterComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    OtpVerifyComponent,
    VerifyPhoneComponent,
    PartnerVerifyPhoneComponent,
    PartnerOtpVerifyComponent,
    PartnerRegisterComponent,
    PartnerLoginComponent,
  
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,

    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatMenuModule
  ],
  providers: [AuthService,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
