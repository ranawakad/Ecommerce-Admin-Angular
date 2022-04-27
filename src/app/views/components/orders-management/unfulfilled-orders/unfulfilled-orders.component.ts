import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Order } from 'src/app/core/models/order';
import { OrderService } from 'src/app/core/services/order.service';
import { Page } from 'src/app/models/page';


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
    this.orderService.unfulfilled(pageInfo.offset + 1).subscribe((pagedData: any) => {

      this.page.pageNumber = pagedData.data.current_page - 1;
      this.page.size = pagedData.data.per_page
      this.page.totalElements = pagedData.data.total
      this.page.totalPages = pagedData.data.last_page
      this.rows = pagedData.data.data;
      console.log(this.rows)
    });
  }

  setFulfilled(value:number){

    console.log(value);
  }
}

