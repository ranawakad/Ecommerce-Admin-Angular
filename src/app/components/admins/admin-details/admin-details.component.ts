import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.scss']
})
export class AdminDetailsComponent implements OnInit {
  selectedAdmin:any
  constructor(
    private admin:AdminService,
    private activeRouter:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe(paramMap=>{

      let id=paramMap.get('id')?Number(this.activeRouter.snapshot.paramMap.get('id')) : 0
      if(id)
      {
        this.admin.getAdmin(id).subscribe(
          (res:any)=>{this.selectedAdmin=res.data
          }
          ,
          err=>this.router.navigate(['/error/404'])
        )
      }
    })
  }

}
