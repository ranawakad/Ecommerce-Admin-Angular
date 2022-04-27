import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/services/role.service';



@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.scss']
})
export class RoleDetailsComponent implements OnInit {
  selectedRole:Role
  constructor(private role:RoleService,
              private activeRouter:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe(paramMap=>{

      let id=paramMap.get('id')?Number(this.activeRouter.snapshot.paramMap.get('id')) : 0
      if(id)
      {
        this.role.getRole(id).subscribe(
          (res:any)=>{this.selectedRole=res.data
          }
          ,
          err=>this.router.navigate(['/error/404'])
        )
      }
    })
  }

}
