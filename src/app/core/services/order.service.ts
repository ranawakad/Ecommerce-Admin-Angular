import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private httpOptions = {};
  constructor(
    private httpClient:HttpClient
    ) {
      this.httpOptions =  {headers: new HttpHeaders({
        'Content-Type': 'application/json','Accept':' */*'
        ,'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        })};
     }

     unfulfilled(page: number = 1):Observable<any>{
      return this.httpClient.get(`${environment.apiAdminURL}/orders/unfulfilled?page=${page}`,this.httpOptions)
     }

     fulfilled(page: number = 1):Observable<any>{
      return this.httpClient.get(`${environment.apiAdminURL}/orders/fulfilled?page=${page}`,this.httpOptions)
     }

     onway(page: number = 1):Observable<any>{
      return this.httpClient.get(`${environment.apiAdminURL}/orders/onwayorders?page=${page}`,this.httpOptions)
     }

     processingOrders(page: number = 1):Observable<any>{
      return this.httpClient.get(`${environment.apiAdminURL}/orders/processing?page=${page}`,this.httpOptions)
     }

     orderDetails(ID:number,page: number = 1):Observable<any>{
      return this.httpClient.get(`${environment.apiAdminURL}/orders/${ID}?page=${page}`,this.httpOptions)
     }

     setOnWay(ID:number):Observable<any>{
      return this.httpClient.get(`${environment.apiAdminURL}/orders/setonway/${ID}`,this.httpOptions)
     }

     setDone(ID:number):Observable<any>{
      return this.httpClient.get(`${environment.apiAdminURL}/orders/setdone/${ID}`,this.httpOptions)
     }
}
