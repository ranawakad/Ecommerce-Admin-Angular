import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UnfulfilledOrdersComponent } from './unfulfilled-orders/unfulfilled-orders.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FulfilledOrdersComponent } from './fulfilled-orders/fulfilled-orders.component';
import { OnWayOrdersComponent } from './on-way-orders/on-way-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ProcessingOrdersComponent } from './processing-orders/processing-orders.component';
import { PickedOrdersComponent } from './picked-orders/picked-orders.component';

const routes: Routes =[
  {path:'unfulfilled/:sellerID', component: UnfulfilledOrdersComponent},
  {path:'fulfilled/:sellerID', component: FulfilledOrdersComponent},
  {path:'processing', component: ProcessingOrdersComponent},
  {path:'picked', component: PickedOrdersComponent},
  {path:'onway', component: OnWayOrdersComponent},
  {path:':id', component: OrderDetailsComponent},
]

@NgModule({
  declarations: [UnfulfilledOrdersComponent, FulfilledOrdersComponent, OnWayOrdersComponent, OrderDetailsComponent, ProcessingOrdersComponent, PickedOrdersComponent],
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
export class OrderModule { }
