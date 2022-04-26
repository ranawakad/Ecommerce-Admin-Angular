import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Order } from 'src/app/core/models/order';
import { Page } from 'src/app/core/models/page';
import { OrderService } from 'src/app/core/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fulfilled-orders',
  templateUrl: './fulfilled-orders.component.html',
  styleUrls: ['./fulfilled-orders.component.scss']
})
export class FulfilledOrdersComponent implements OnInit {
  page: Page = {} as Page;
  orders:Order[] = []
  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  constructor(
    private orderService:OrderService
  ) {
    this.page.pageNumber = 1;
    this.page.size = 3;
  }

  ngOnInit(): void {
    this.setPage({offset: 0});
    // this.orderService.fulfilled().subscribe(res=>{
    //   this.orders = Object.values(res.data);
    //   console.log(this.orders);
    // })
  }
  setPage(pageInfo: any) {

    this.page.pageNumber = pageInfo.offset + 1;
    this.orderService.fulfilled(pageInfo.offset + 1).subscribe((pagedData: any) => {

      this.page.pageNumber = pagedData.data.current_page - 1;
      this.page.size = pagedData.data.per_page
      this.page.totalElements = pagedData.data.total
      this.page.totalPages = pagedData.data.last_page
      this.rows = pagedData.data.data;
    });
  }

  details(value:number){
    console.log(value);
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
