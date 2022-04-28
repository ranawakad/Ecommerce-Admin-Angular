import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { AdminsComponent } from './admins.component';
import { AllAdminsComponent } from './all-admins/all-admins.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ArchwizardModule } from 'angular-archwizard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { AdminDetailsComponent } from './admin-details/admin-details.component';

const routes: Routes = [
  {
    path: '',
    component: AdminsComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'all',
        pathMatch: 'full'
      },
      {
        path: 'all',
        component: AllAdminsComponent
      },
      {
        path: 'create',
        component: CreateAdminComponent
      },
      {
        path: 'update/:id',
        component: EditAdminComponent
      },
      {
        path:'details/:id',
        component:AdminDetailsComponent
      }
    ]
  },
]

@NgModule({
  declarations: [
    AdminsComponent,
    AllAdminsComponent,
    CreateAdminComponent,
    EditAdminComponent,
    AdminDetailsComponent,
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
export class AdminModule { }
