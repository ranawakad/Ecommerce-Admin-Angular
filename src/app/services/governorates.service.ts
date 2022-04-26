import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GovernoratesService {

  constructor(private httpClient: HttpClient) {
  }

  getAllGovernorates(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiURL}/governorates`)
  }

  createGovernorate(governorate: object): Observable<any[]> {
    return this.httpClient.post<any[]>(`${environment.apiURL}/governorates`, governorate)
  }

  getGovernorate(governorateId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiURL}/governorates/${governorateId}`)
  }

  updateGovernorate(governorateId: number, city: object): Observable<any[]> {
    return this.httpClient.put<any[]>(`${environment.apiURL}/governorates/${governorateId}`, city)
  }

  deleteGovernorate(governorateId: number): Observable<any[]> {
    return this.httpClient.delete<any[]>(`${environment.apiURL}/governorates/${governorateId}`)
  }
}
