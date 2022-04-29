import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import {  Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector:Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let auth=this.injector.get(AuthService)
    let router=this.injector.get(Router)
    let options=req.clone({
      setHeaders:{
        Authentication:`Bearer ${auth.getToken}`,
        Accept:'application/json',
      }
    })
    return next.handle(options).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status == 401) {
          localStorage.removeItem('adminToken')
          router.navigate(['/auth/login'])
        }
        if(err.status == 403)
        {
          router.navigate(['/error/403'])
        }
        return throwError(
          () => err)
      })
    )
  }
}
