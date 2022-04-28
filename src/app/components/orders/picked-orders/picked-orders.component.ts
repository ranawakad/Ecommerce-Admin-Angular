import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Page } from 'src/app/core/models/page';
import { OrderService } from 'src/app/core/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-picked-orders',
  templateUrl: './picked-orders.component.html',
  styleUrls: ['./picked-orders.component.scss']
})
export class PickedOrdersComponent implements OnInit {
  page: Page = {} as Page;
  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  constructor(
    private orderService:OrderService
  ) {

    this.page.pageNumber = 1;
    this.page.size = 3
  }

  ngOnInit(): void {
    this.setPage({offset: 0});
  }


  setPage(pageInfo: any) {

    this.page.pageNumber = pageInfo.offset + 1;
    this.orderService.pickedOrders(pageInfo.offset + 1).subscribe((pagedData: any) => {

      this.page.pageNumber = pagedData.data.current_page - 1;
      this.page.size = pagedData.data.per_page
      this.page.totalElements = pagedData.data.total
      this.page.totalPages = pagedData.data.last_page
      this.rows = pagedData.data.data;
      console.log(this.rows)
    });
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

      this.setPage({offset: 0});
  }

}
