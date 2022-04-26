import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgOption, NgSelectComponent } from '@ng-select/ng-select';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import { AddRole } from 'src/app/models/add-role';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {
  validationForm1: FormGroup;
  validationForm2: FormGroup;

  isForm1Submitted: Boolean;
  isForm2Submitted: Boolean;
  permissions:any[]
  errors:any
  editRole:any
  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;
  @ViewChild('addeSwal') swal:SwalComponent
  @ViewChild('select') select:NgSelectComponent
  options:NgOption[]
  constructor(public formBuilder: FormBuilder,
              private role:RoleService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { 
                
              }

  ngOnInit(): void {
    this.role.getAllPermissions().subscribe(
      (res:any)=>this.permissions=res
    )
    this.activatedRoute.paramMap.subscribe(paramMap=>{

      let id=paramMap.get('id')?Number(this.activatedRoute.snapshot.paramMap.get('id')) : 0
      if(id)
      {
        this.role.getRole(id).subscribe(
          (res:any)=>{this.editRole=res.data
          }
          ,
          err=>this.router.navigate(['/error/404'])
        )
      }
      
    })
      this.validationForm1 = this.formBuilder.group({
        roleName : ['', Validators.required],
      });
      this.validationForm2 = this.formBuilder.group({
        permissins : ['', [Validators.required]],
        
      });
  
      this.isForm1Submitted = false;
      this.isForm2Submitted = false;
  }

  get form1() {
    return this.validationForm1.controls;
  }
  get form2() {
    return this.validationForm2.controls;
  }
  finishFunction()
  {
    
    let data:AddRole={
      name:this.form1.roleName.value,
      permission:this.form2.permissins.value}
      if(this.editRole)
      {
        this.role.updateRole(this.editRole.id,data).subscribe(
          (res:any)=>{this.router.navigate(['/roles/all'])
                this.swal.title=res.message
                this.swal.showConfirmButton=false
                this.swal.timer=1500
               this.swal.fire()},
          err=>{this.errors=err.error.errors
          this.wizardForm.goToStep(0)
          this.swal.title=err.error.errors.name
          this.swal.icon='error'
          this.swal.showConfirmButton=false
          this.swal.timer=1500
         this.swal.fire()}
        
        )
      }else
      {
        this.role.addRole(data).subscribe(
          (res:any)=>{this.router.navigate(['/roles/all'])
                this.swal.title=res.message
                this.swal.showConfirmButton=false
                this.swal.timer=1500
               this.swal.fire()},
          err=>{this.errors=err.error.errors
          this.wizardForm.goToStep(0)
          this.swal.title=err.error.message
          this.swal.icon='error'
          this.swal.showConfirmButton=false
          this.swal.timer=1500
         this.swal.fire()}
        )
      }
    
  }
  form1Submit() {
    if(this.validationForm1.valid) {
      this.wizardForm.goToNextStep();
    }
    if(this.editRole)
    {
      this.editRole.permissions.forEach((element:any) => {
        this.select.select(this.select.itemsList.findItem(element.id))
      });
    }
    
    this.isForm1Submitted = true;
  }
  form2Submit() {
    if(this.validationForm2.valid) {
      this.wizardForm.goToNextStep();
    }
    this.isForm2Submitted = true;
  }
}
