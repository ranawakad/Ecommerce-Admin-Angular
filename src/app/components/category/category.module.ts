import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { RouterModule, Routes } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
const routes:Routes=[
  {path:'all',component:CategoriesComponent},
  {path:'edit',component:CategoriesComponent}
]

@NgModule({
  declarations: [
    CategoriesComponent,
    EditCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxPaginationModule
  ]
})
export class CategoryModule { }
