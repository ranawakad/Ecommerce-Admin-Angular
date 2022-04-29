import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Page } from 'src/app/core/models/page';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-unfulfilled-orders',
  templateUrl: './all-unfulfilled-orders.component.html',
  styleUrls: ['./all-unfulfilled-orders.component.scss']
})
export class AllUnfulfilledOrdersComponent implements OnInit {
  page: Page = {} as Page;
  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  sellerID :number = 0
  constructor(
    private orderService:OrderService,
  ) {
    this.page.pageNumber = 1;
    this.page.size = 3;
  }

  ngOnInit(): void {
      this.setPage({offset: 0});

  }
  setPage(pageInfo: any) {

    this.page.pageNumber = pageInfo.offset + 1;
    this.orderService.allunfulfilled(pageInfo.offset + 1).subscribe((pagedData: any) => {

      this.page.pageNumber = pagedData.data.current_page - 1;
      this.page.size = pagedData.data.per_page
      this.page.totalElements = pagedData.data.total
      this.page.totalPages = pagedData.data.last_page
      this.rows = pagedData.data.data;
      console.log(this.rows)
    });
  }

  setFulfilled(value:number){

    this.orderService.setFulfilled(value).subscribe(res=>{
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
    console.log(value);
  }


}
