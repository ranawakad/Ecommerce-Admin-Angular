import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UnfulfilledOrdersComponent } from './unfulfilled-orders/unfulfilled-orders.component';
import { FulfilledOrdersComponent } from './fulfilled-orders/fulfilled-orders.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AllFulfilledOrdersComponent } from './all-fulfilled-orders/all-fulfilled-orders.component';
import { AllUnfulfilledOrdersComponent } from './all-unfulfilled-orders/all-unfulfilled-orders.component';

const routes: Routes =[
  {path:'unfulfilled/:sellerID', component: UnfulfilledOrdersComponent},
  {path:'fulfilled/:sellerID', component: FulfilledOrdersComponent},
  {path:'allfulfilled', component: AllFulfilledOrdersComponent},
  {path:'allunfulfilled', component: AllUnfulfilledOrdersComponent},
]

@NgModule({
  declarations: [UnfulfilledOrdersComponent, FulfilledOrdersComponent, AllFulfilledOrdersComponent, AllUnfulfilledOrdersComponent,],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDatatableModule,
    SweetAlert2Module.forRoot(),
  ]
})
export class PaymentModule { }
