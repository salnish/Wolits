import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable,Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector:Injector,private _router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authService = this.injector.get(AuthService)
    let route=this._router.url.split("/")[1]
    let tokenizedReq =req.clone({
      setHeaders:{
        Authorization:`Bearer ${route=='admin'?authService.getAdminToken():authService.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
