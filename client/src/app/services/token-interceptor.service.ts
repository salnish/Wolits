import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { catchError, observable, Observable, throwError  } from 'rxjs';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector, private _router: Router, private _authService :AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    return next.handle(this.tokenizedReq(req))
      .pipe(
        catchError((error: HttpErrorResponse) => this.errorHandler(error, req, next))
      )
  }

  tokenizedReq(req:HttpRequest<any>){
    let authService = this.injector.get(AuthService)
    let route = this._router.url.split("/")[1]
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${route == 'admin' ? authService.getPartnerToken() : route == 'landing' ? authService.getToken() :route == 'partner' ? authService.getPartnerToken():authService.getTimeOutToken()}`
      }
    })
    return tokenizedReq
  }

  errorHandler(error: HttpErrorResponse, req: HttpRequest<any>, next: HttpHandler) {
    let authService = this.injector.get(AuthService)
    console.log('entererror', error)
    if (error.error.message == 'jwt expired') {
      console.log('enter if expired');
      this.refreshAccessToken(req,next)
      
      console.log(this.tokenizedReq(req))
      return next.handle(this.tokenizedReq(req))

    }else{  
      return throwError(() => error.error.message);
    }
    
  }

  refreshAccessToken( req: HttpRequest<any>, next: HttpHandler){
   return this._authService.refreshAccess()
    .subscribe({
      next: (v) => { 
       this._authService.setTokens(v.token,v.refreshToken)
     
      }, error: (e:HttpErrorResponse) => {
       
        this._authService.logoutUser()
        return throwError(() => e.error);

      }
    })
  }
}
