import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { RouterModule, Routes } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
const routes:Routes=[
  {path:'all',component:CategoriesComponent},
  {path:'create',component:EditCategoryComponent},
  {path:'edit/:id',component:EditCategoryComponent}
]

@NgModule({
  declarations: [
    CategoriesComponent,
    EditCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SweetAlert2Module
  ]
})
export class CategoryModule { }
