import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { catchError, observable, Observable, throwError } from 'rxjs';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector, private _router: Router, private _authService :AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authService = this.injector.get(AuthService)
    let route = this._router.url.split("/")[1]
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${route == 'partner' ? authService.getAdminToken() : route == 'landing' ? authService.getToken() : authService.getTimeOutToken()}`
      }
    })
    return next.handle(tokenizedReq)
      .pipe(
        retry(2),
        catchError((error: HttpErrorResponse) => this.errorHandler(error, req, next))
      )
  }

  errorHandler(error: HttpErrorResponse, req: HttpRequest<any>, next: HttpHandler) {
    let authService = this.injector.get(AuthService)
    console.log('entererror', error)
    if (error.error.message == 'jwt expired') {
      console.log('enter if expired');
      this.refreshAccessToken(req,next)
      return throwError(() => error.error);

    }else{
      
      return throwError(() => error.error);
    }
    
  }

  refreshAccessToken( req: HttpRequest<any>, next: HttpHandler){
    this._authService.refreshAccess()
    .subscribe({
      next: (v) => { 
        console.log(v);
        
        localStorage.setItem('token', v.token)
        let route = this._router.url.split("/")[1]
        let tokenizedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${route == 'partner' ? this._authService.getAdminToken() : route == 'landing' ? this._authService.getToken() : this._authService.getTimeOutToken()}`
          }
        })
        return next.handle(tokenizedReq)

     
      }, error: (e:HttpErrorResponse) => {
        console.log('dfjhhsdafjkhsdfhjkddshjkfsdhjkfdsahjk');
        
        return throwError(() => e.error);

      }
    })
  }
}
