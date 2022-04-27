import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private httpClient: HttpClient) { }

  getAllCustomers(page: number = 1): Observable<any> {
    return this.httpClient.get(`${environment.apiURL}/customers?page=${page}`)
  }

  getCustomer(id: number): Observable<any> {
    return this.httpClient.get(`${environment.apiURL}/customers/${id}`)
  }

  updateCustomer(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${environment.apiURL}/customers/${id}`, data)
  }

  deleteCustomer(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiURL}/customers/${id}`)
  }
}
