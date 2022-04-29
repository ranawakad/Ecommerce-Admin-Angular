import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment'


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient: HttpClient) { }

  getAllCategories(page: number = 1): Observable<any> {
    return this.httpClient.get(`${environment.apiURL}/category?page=${page}`)
  }

  getCategory(id: number): Observable<any> {
    return this.httpClient.get(`${environment.apiURL}/category/${id}`)
  }

  updateCategory(id: number, data: any): Observable<any> {
    return this.httpClient.post(`${environment.apiURL}/category/${id}`,data)
  }
  addCategory( data: any): Observable<any> {
    return this.httpClient.post(`${environment.apiURL}/category`, data)
  }

  deleteCategory(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiURL}/category/${id}`)
  }
}

