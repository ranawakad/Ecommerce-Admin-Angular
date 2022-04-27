import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllRolesComponent } from './all-roles/all-roles.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { RolesComponent } from './roles.component';
import { Routes,RouterModule } from '@angular/router';
import { RoleDetailsComponent } from './role-details/role-details.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ArchwizardModule } from 'angular-archwizard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

const routes: Routes = [
  {
    path: '',
    component: RolesComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'all',
        pathMatch: 'full'
      },
      {
        path: 'all',
        component: AllRolesComponent
      },
      {
        path: 'create',
        component: CreateRoleComponent
      },
      {
        path: 'update/:id',
        component: CreateRoleComponent
      },
      {
        path:'details/:id',
        component:RoleDetailsComponent
      }
    ]
  },
]

@NgModule({
  declarations: [
    AllRolesComponent,
    CreateRoleComponent,
    RoleDetailsComponent,
    RolesComponent 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    ArchwizardModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SweetAlert2Module.forRoot()
  ]
})
export class RoleModule { }
