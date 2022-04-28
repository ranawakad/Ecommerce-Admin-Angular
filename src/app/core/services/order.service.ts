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

    //  Payments-----------------
     unfulfilled(sellerID:number,page: number = 1):Observable<any>{
      return this.httpClient.get(`${environment.apiAdminURL}/payments/unfulfilled/${sellerID}?page=${page}`,this.httpOptions)
     }

     fulfilled(sellerID:number,page: number = 1):Observable<any>{
      return this.httpClient.get(`${environment.apiAdminURL}/payments/fulfilled/${sellerID}?page=${page}`,this.httpOptions)
     }

    //  Orders-------------------

      // Processing &  Not Picked
    processingOrders(page: number = 1):Observable<any>{
      return this.httpClient.get(`${environment.apiAdminURL}/orders/processing?page=${page}`,this.httpOptions)
     }

     // Processing & Picked
    pickedOrders(page: number = 1):Observable<any>{
      return this.httpClient.get(`${environment.apiAdminURL}/orders/picked?page=${page}`,this.httpOptions)
     }

      // On-way & Picked
     onway(page: number = 1):Observable<any>{
      return this.httpClient.get(`${environment.apiAdminURL}/orders/onwayorders?page=${page}`,this.httpOptions)
     }

     orderDetails(ID:number,page: number = 1):Observable<any>{
      return this.httpClient.get(`${environment.apiAdminURL}/orders/${ID}?page=${page}`,this.httpOptions)
     }

    //  functions--------------
     setOnWay(ID:number):Observable<any>{
      return this.httpClient.get(`${environment.apiAdminURL}/orders/setonway/${ID}`,this.httpOptions)
     }

     setDone(ID:number):Observable<any>{
      return this.httpClient.get(`${environment.apiAdminURL}/orders/setdone/${ID}`,this.httpOptions)
     }

     setFulfilled(ID:number):Observable<any>{
      return this.httpClient.get(`${environment.apiAdminURL}/payments/fulfill/${ID}`,this.httpOptions)
     }

     setPicked(ID:number):Observable<any>{
      return this.httpClient.get(`${environment.apiAdminURL}/orders/setpicked/${ID}`,this.httpOptions)
     }
}
