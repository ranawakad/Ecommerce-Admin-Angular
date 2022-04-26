import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private httpClient: HttpClient) {
  }

  getAllCities(): Observable<any[]> {
    return this.httpClient.get<City[]>(`${environment.apiURL}/city/${cityID}`)
  }

  createCity(city: object): Observable<any[]> {
    return this.httpClient.post<any[]>(`${environment.apiURL}/city`, city)
  }

  getCity(cityId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiURL}/city/${cityId}`)
  }

  updateCity(cityId: number, city: object): Observable<any[]> {
    return this.httpClient.put<any[]>(`${environment.apiURL}/city/${cityId}`, city)
  }

  deleteCity(cityId: number): Observable<any[]> {
    return this.httpClient.delete<any[]>(`${environment.apiURL}/city/${cityId}`)
  }

}
