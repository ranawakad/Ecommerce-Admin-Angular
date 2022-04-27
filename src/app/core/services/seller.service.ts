import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private httpOptions = {};
  constructor(
    private httpClient:HttpClient
    ) {
      this.httpOptions =  {headers: new HttpHeaders({
        'Content-Type': 'application/json','Accept':' */*'
        ,'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        })};
     }

     sellerDetails(ID:number):Observable<any>{
      return this.httpClient.get(`${environment.apiAdminURL}/sellers/${ID}`,this.httpOptions)
     }

     activeStateUpadte(ID:number):Observable<any>{
      return this.httpClient.get(`${environment.apiAdminURL}/sellers/stateUpdate/${ID}`,this.httpOptions)
     }

     allSellers(page: number = 1):Observable<any>{
      return this.httpClient.get(`${environment.apiAdminURL}/sellers?page=${page}`,this.httpOptions)
     }
}
