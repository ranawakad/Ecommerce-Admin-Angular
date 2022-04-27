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
    return this.http.get(`${environment.apiAdminURL}/roles`)
  }
  getAllRoles(pageNumber:number)
  {
    return this.http.get(`${environment.apiAdminURL}/roles?page=${pageNumber}`)
  }
  getRole(id:number)
  {
    return this.http.get(`${environment.apiAdminURL}/roles/${id}`)
  }
  addRole(role:AddRole)
  {
    return this.http.post(`${environment.apiAdminURL}/roles`,role)
  }
  deleteRole(id:number)
  {
    return this.http.delete(`${environment.apiAdminURL}/roles/${id}`)
  }
  updateRole(id:number,role:AddRole)
  {
    return this.http.put(`${environment.apiAdminURL}/roles/${id}`,role)
  }
  getAllPermissions()
  {
    return this.http.get(`${environment.apiAdminURL}/permissions`)
  }
}
