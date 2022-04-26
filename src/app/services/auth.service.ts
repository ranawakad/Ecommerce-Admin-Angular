import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Credentials } from '../models/credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient
  ) { }


  login(credentails:Credentials)
  {
    return this.http.post(`${environment.apiUrl}/login`,credentails);
  }
  logout()
  {
    return this.http.get(`${environment.apiUrl}`)
  }
  get getToken()
  {
    return localStorage.getItem('adminToken')??''
  }
  get isLogedIn()
  {
   return localStorage.getItem('adminToken')?true:false
  }
}
