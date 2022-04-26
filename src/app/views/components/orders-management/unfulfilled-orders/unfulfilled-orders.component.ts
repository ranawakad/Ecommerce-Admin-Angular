import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Order } from 'src/app/core/models/order';
import { OrderService } from 'src/app/core/services/order.service';


@Component({
  selector: 'app-unfulfilled-orders',
  templateUrl: './unfulfilled-orders.component.html',
  styleUrls: ['./unfulfilled-orders.component.scss']
})
export class UnfulfilledOrdersComponent implements OnInit {

  orders: Order[] = []
  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  constructor(
    private orderService:OrderService
  ) {

  }

  ngOnInit(): void {
    this.orderService.unfulfilled().subscribe(res=>{

    this.orders =  Object.values(res.data)

      console.log( Object.values(res.data));
    })
  }

  setFulfilled(value:number){

    console.log(value);
  }
}

