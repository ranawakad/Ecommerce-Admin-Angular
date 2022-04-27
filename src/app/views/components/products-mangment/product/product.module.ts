import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { UnfulfilledOrdersComponent } from '../../orders-management/unfulfilled-orders/unfulfilled-orders.component';
import { FulfilledOrdersComponent } from '../../orders-management/fulfilled-orders/fulfilled-orders.component';
import { OnWayOrdersComponent } from '../../orders-management/on-way-orders/on-way-orders.component';

const routes: Routes =[
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ProductModule { }
