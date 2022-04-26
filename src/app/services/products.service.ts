import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) {
  }

  getAllProducts(page: number = 1): Observable<any> {
    return this.httpClient.get(`${environment.apiURL}/products?page=${page}`)
  }

  getProductsByCategory(id: number): Observable<any> {
    return this.httpClient.get(`${environment.apiURL}/products/category/${id}`)

  }

  getProduct(id: number): Observable<any> {
    return this.httpClient.get(`${environment.apiURL}/products/${id}`)
  }

  updateProduct(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${environment.apiURL}/products/${id}`, data)
  }

  deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiURL}/products/${id}`)
  }
}
