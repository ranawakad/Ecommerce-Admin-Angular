import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GovernoratesService {

  constructor(private httpClient: HttpClient) {
  }

  getAllGovernorates(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiURL}/governorates/${governorateID}`)
  }
s
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
    return this.httpClient.delete<City[]>(`${environment.apiURL}/city/${cityId}`)
  }
