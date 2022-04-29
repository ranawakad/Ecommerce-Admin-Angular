import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Page } from 'src/app/models/page';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-all-admins',
  templateUrl: './all-admins.component.html',
  styleUrls: ['./all-admins.component.scss']
})
export class AllAdminsComponent implements OnInit {
  loadingIndicator = true;
  ColumnMode = ColumnMode;
  rows=[]
  page = new Page()
  @ViewChild('deleteSwal') swal:SwalComponent
  SelectionType = SelectionType;
  selected: any[] = [];
  constructor(
            private admin:AdminService,
            private router:Router
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
    this.admin.getAllAdmins(page).subscribe((pagedData:any) => {
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

    this.router.navigate(['/admins/update/'+id])
  }
  select(event:any)
  {
    this.router.navigate(['/admins/details/'+event.selected[0].id])
  }
  deleteRole(id:number)
  {

    this.admin.deleteAdmin(id).subscribe(
      (res:any)=> {
        this.swal.title=res.message
        this.swal.icon='success'
        this.router.navigate(['/admins'])
        this.swal.fire()
        this.setPage({offset:0})
      },

      err=>{
        this.swal.title=err.error.message
        this.swal.icon='error'
        this.swal.fire()
      }
    )
  }

}
