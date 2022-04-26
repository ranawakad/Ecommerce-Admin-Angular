import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Order } from 'src/app/core/models/order';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-fulfilled-orders',
  templateUrl: './fulfilled-orders.component.html',
  styleUrls: ['./fulfilled-orders.component.scss']
})
export class FulfilledOrdersComponent implements OnInit {

  orders:Order[] = []
  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  constructor(
    private orderService:OrderService
  ) {

  }

  ngOnInit(): void {
    this.orderService.fulfilled().subscribe(res=>{
      this.orders = Object.values(res.data);
      console.log(this.orders);
    })
  }

  details(value:number){

    console.log(value);
  }
}
