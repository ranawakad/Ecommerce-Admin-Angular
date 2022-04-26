import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Page } from 'src/app/models/page';

import { RoleService } from 'src/app/services/role.service';


@Component({
  selector: 'app-all-roles',
  templateUrl: './all-roles.component.html',
  styleUrls: ['./all-roles.component.scss']
})
export class AllRolesComponent implements OnInit {
  loadingIndicator = true;
  ColumnMode = ColumnMode;
  rows=[] 
  page = new Page()
  @ViewChild('deleteSwal') swal:SwalComponent
  SelectionType = SelectionType;
  selected: any[] = [];
  constructor(
    private role:RoleService,
    private route:Router,
    // public swal:SwalComponent
    ) { 
    this.page.pageNumber = 0;
    this.page.size = 3;
    
  }

  ngOnInit(): void {
    this.setPage({offset:0})
  }
  setPage(pageNumber:any) {
    this.loadingIndicator=false
    let page=pageNumber.offset+1
    this.role.getAllRoles(page).subscribe((pagedData:any) => {
      this.loadingIndicator=true
      this.page.pageNumber = pagedData.data.current_page-1;
      this.page.size=pagedData.data.per_page
      this.page.totalElements=pagedData.data.total
      this.page.totalPages=pagedData.data.to
      this.rows = pagedData.data.data;
    });
  }
  update(id:number)
  {
    this.route.navigate(['/roles/update/'+id])
  }
  select(event:any)
  {
    this.route.navigate(['/roles/details/'+event.selected[0].id])
  }
  deleteRole(id:number)
  {
    this.role.deleteRole(id).subscribe(
      (res:any)=> {
        this.swal.title=res.message
        this.swal.icon='success'
        this.route.navigate(['/roles']) 
        this.swal.fire()
        
      },

      err=>{
        this.swal.title=err.error.message
        this.swal.icon='error'
        this.swal.fire()
      }
    )
  }


}
