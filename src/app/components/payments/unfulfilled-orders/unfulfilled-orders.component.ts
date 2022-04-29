import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { OrderService } from 'src/app/services/order.service';
import { Page } from 'src/app/core/models/page';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-unfulfilled-orders',
  templateUrl: './unfulfilled-orders.component.html',
  styleUrls: ['./unfulfilled-orders.component.scss']
})
export class UnfulfilledOrdersComponent implements OnInit {
  page: Page = {} as Page;
  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  sellerID :number = 0
  constructor(
    private orderService:OrderService,
    private activatedRoute:ActivatedRoute
  ) {
    this.page.pageNumber = 1;
    this.page.size = 3
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap)=>{
      this.sellerID = (paramMap.get('sellerID'))?Number(this.activatedRoute.snapshot.paramMap.get('sellerID')):0;
      this.setPage({offset: 0});
    });  }

  setPage(pageInfo: any) {

    this.page.pageNumber = pageInfo.offset + 1;
    this.orderService.unfulfilled(this.sellerID,pageInfo.offset + 1).subscribe((pagedData: any) => {

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

