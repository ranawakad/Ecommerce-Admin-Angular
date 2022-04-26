import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddRole } from '../models/add-role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:HttpClient) { }
  getRoles()
  {
    return this.http.get(`${environment.apiUrlAdmin}/roles`)
  }
  getAllRoles(pageNumber:number)
  {
    return this.http.get(`${environment.apiUrlAdmin}/roles?page=${pageNumber}`)
  }
  getRole(id:number)
  {
    return this.http.get(`${environment.apiUrlAdmin}/roles/${id}`)
  }
  addRole(role:AddRole)
  {
    return this.http.post(`${environment.apiUrlAdmin}/roles`,role)
  }
  deleteRole(id:number)
  {
    return this.http.delete(`${environment.apiUrlAdmin}/roles/${id}`)
  }
  updateRole(id:number,role:AddRole)
  {
    return this.http.put(`${environment.apiUrlAdmin}/roles/${id}`,role)
  }
  getAllPermissions()
  {
    return this.http.get(`${environment.apiUrlAdmin}/permissions`)
  }
}
