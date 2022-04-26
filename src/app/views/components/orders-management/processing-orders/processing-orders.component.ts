import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Page } from 'src/app/core/models/page';
import { OrderService } from 'src/app/core/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-processing-orders',
  templateUrl: './processing-orders.component.html',
  styleUrls: ['./processing-orders.component.scss']
})
export class ProcessingOrdersComponent implements OnInit {
  page: Page = {} as Page;
  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  constructor(
    private orderService:OrderService
  ) {

  }

  ngOnInit(): void {
    this.orderService.processingOrders().subscribe(res=>{
      this.orders = res.data;
      console.log(this.orders)
    })
  }

  setOnWay(value:number){

    this.orderService.setOnWay(value).subscribe(res=>{
        console.log(res.message);
        Swal.fire({
          toast: true, position: 'top-end', showConfirmButton: false, timer: 2000, timerProgressBar: true, title: res.message, icon: 'success'
        })
      },err=>{
        Swal.fire({
          toast: true, position: 'top-end', showConfirmButton: false, timer: 2000, timerProgressBar: true, title: err.message, icon: 'error'
        })
      });

  }


}
