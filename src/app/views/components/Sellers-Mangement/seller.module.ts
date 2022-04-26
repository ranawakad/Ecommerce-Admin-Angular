import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellersComponent } from './sellers/sellers.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes =[
  {path:'listing', component: SellersComponent},
]

@NgModule({
  declarations: [
    SellersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
    NgxDatatableModule,
    SweetAlert2Module.forRoot(),
  ]
})
export class SellerModule { }
