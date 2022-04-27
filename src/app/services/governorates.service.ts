import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class GovernoratesService {

  constructor(private httpClient: HttpClient) {
  }

  getAllGovernorates(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiURL}/governorate`)
  }

  createGovernorate(governorate: object): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiURL}/governorate`, governorate)
  }

  getGovernorate(governorateId: number): Observable<any> {
    return this.httpClient.get(`${environment.apiURL}/governorate/${governorateId}`)
  }

  updateGovernorate(governorateId: number, governorate: object): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiURL}/governorate/${governorateId}`, governorate)
  }

  deleteGovernorate(governorateId: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.apiURL}/governorate/${governorateId}`)
  }
}
