import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  getAllAdmins(page:number)
  {
    return this.http.get(`${environment.apiUrlAdmin}/admin?page=${page}`)
  }
  getAdmin(id:number)
  {
    return this.http.get(`${environment.apiUrlAdmin}/admin/${id}`)
  }
  addAdmin(admin:any)
  {
    return this.http.post(`${environment.apiUrlAdmin}/admin`,admin)
  }
  deleteAdmin(id:number)
  {
    return this.http.delete(`${environment.apiUrlAdmin}/admin/${id}`)
  }
  editAdmin(id:number,admin:any)
  {
    return this.http.patch(`${environment.apiUrlAdmin}/admin/${id}`,admin)
  }
  getGovernorates()
  {
    return this.http.get('http://localhost:8000/api/governorate')
  }
}
