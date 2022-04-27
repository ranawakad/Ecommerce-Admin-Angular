import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { NgSelectComponent } from '@ng-select/ng-select';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.scss']
})
export class EditAdminComponent implements OnInit {
  selectAdmin: any
  
  validationForm: FormGroup;

  isForm1Submitted: Boolean;
  isForm2Submitted: Boolean;
  roles:any[]
  errors:any
  
  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;
  @ViewChild('addeSwal') swal:SwalComponent
  @ViewChild('select') select:NgSelectComponent
  constructor(
    private admin: AdminService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
    private role:RoleService
  ) { }

  ngOnInit(): void {
    this.role.getRoles().subscribe(
      (res: any) => this.roles = res.data
    )
    this.activeRouter.paramMap.subscribe(paramMap=>{

      let id=paramMap.get('id')?Number(this.activeRouter.snapshot.paramMap.get('id')) : 0
      if(id)
      {
        this.admin.getAdmin(id).subscribe(
          (res:any)=>{this.selectAdmin=res.data
          }
          ,
          err=>this.router.navigate(['/error/404'])
        )
      }
      
    })
    this.validationForm = this.formBuilder.group({
      roles : ['', [Validators.required]],
      
    });
    
  }
  get form() {
    return this.validationForm.controls;
  }
  Submit()
  {
    
    if(this.selectAdmin)
    {
      console.log(this.selectAdmin)
      this.selectAdmin.roles.forEach((element:any) => {
        this.select.select(this.select.itemsList.findItem(element.id))
      });
    }
    this.wizardForm.goToNextStep();
    this.isForm1Submitted = true;
  }
  formSubmit()
  {
    if(this.validationForm.valid) {
      this.wizardForm.goToNextStep();
    }
    this.isForm2Submitted = true;
  }
  finishFunction()
  {
    
    this.admin.editAdmin(this.selectAdmin.id,this.validationForm.value).subscribe(
      (res:any)=>{
        this.router.navigate(['/admins/all'])
        this.swal.title = res.message
        this.swal.icon='success'
        this.swal.showConfirmButton = false
        this.swal.timer = 1500
        this.swal.fire()
      },
      err=>{
        this.errors = err.error.errors
        this.wizardForm.goToStep(1)
        this.swal.title = err.error.message
        this.swal.icon = 'error'
        this.swal.showConfirmButton = false
        this.swal.timer = 1500
        this.swal.fire()
      }
    )
  }

}
