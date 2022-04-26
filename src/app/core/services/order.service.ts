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

     unfulfilled():Observable<any>{
      return this.httpClient.get(`${environment.apiAdminURL}/orders/unfulfilled`,this.httpOptions)
     }

     fulfilled():Observable<any>{
      return this.httpClient.get(`${environment.apiAdminURL}/orders/fulfilled`,this.httpOptions)
     }

     onway(page: number = 1):Observable<any>{
      return this.httpClient.get(`${environment.apiAdminURL}/orders/onwayorders?page=${page}`,this.httpOptions)
     }

     processingOrders():Observable<any>{
      return this.httpClient.get(`${environment.apiAdminURL}/orders/processing`,this.httpOptions)
     }

     orderDetails(ID:number):Observable<any>{
      return this.httpClient.get(`${environment.apiAdminURL}/orders/${ID}`,this.httpOptions)
     }

     setOnWay(ID:number):Observable<any>{
      return this.httpClient.get(`${environment.apiAdminURL}/orders/setonway/${ID}`,this.httpOptions)
     }

     setDone(ID:number):Observable<any>{
      return this.httpClient.get(`${environment.apiAdminURL}/orders/setdone/${ID}`,this.httpOptions)
     }
}
