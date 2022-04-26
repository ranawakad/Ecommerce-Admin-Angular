import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgOption, NgSelectComponent } from '@ng-select/ng-select';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import { AdminService } from 'src/app/services/admin.service';
import { RoleService } from 'src/app/services/role.service';
@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss']
})
export class CreateAdminComponent implements OnInit {

  validationForm1: FormGroup;
  validationForm2: FormGroup;

  isForm1Submitted: Boolean;
  isForm2Submitted: Boolean;
  roles: any[]
  errors: any
  editRole: any
  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;
  @ViewChild('addeSwal') swal: SwalComponent
  @ViewChild('select') select: NgSelectComponent
  options: NgOption[]
  governates: any
  cities: any
  constructor(public formBuilder: FormBuilder,
    private role: RoleService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private admin: AdminService) {
    this.admin.getGovernorates().subscribe(
      res => this.governates = res
    )
  }

  ngOnInit(): void {
    this.role.getRoles().subscribe(
      (res: any) => this.roles = res.data
    )

    this.activatedRoute.paramMap.subscribe(paramMap => {

      let id = paramMap.get('id') ? Number(this.activatedRoute.snapshot.paramMap.get('id')) : 0
      if (id) {
        this.role.getRole(id).subscribe(
          (res: any) => {
            this.editRole = res.data
          }
          ,
          err => this.router.navigate(['/error/404'])
        )
      }

    })
    this.validationForm1 = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      city_id: ['', Validators.required],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    });
    this.validationForm2 = this.formBuilder.group({
      roles: ['', [Validators.required]],

    });

    this.isForm1Submitted = false;
    this.isForm2Submitted = false;
  }
  setCities(event: any) {
    this.cities = event.cities
  }
  get form1() {
    return this.validationForm1.controls;
  }
  get form2() {
    return this.validationForm2.controls;
  }
  finishFunction() {
    let data = this.validationForm1.value
    data['roles']=this.form2.roles.value
    
    this.admin.addAdmin(data).subscribe(
      (res: any) => {
        this.router.navigate(['/admins/all'])
        this.swal.title = res.message
        this.swal.icon='success'
        this.swal.showConfirmButton = false
        this.swal.timer = 1500
        this.swal.fire()
      },
      err => {

        this.errors = err.error.errors
        this.wizardForm.goToStep(0)
        this.swal.title = err.error.message
        this.swal.icon = 'error'
        this.swal.showConfirmButton = false
        this.swal.timer = 1500
        this.swal.fire()
      }
    )
  }
  form1Submit() {
    if (this.validationForm1.valid) {
      this.wizardForm.goToNextStep();
    }

    this.isForm1Submitted = true;
  }
  form2Submit() {
    if (this.validationForm2.valid) {
      this.wizardForm.goToNextStep();
    }
    this.isForm2Submitted = true;
  }

}
