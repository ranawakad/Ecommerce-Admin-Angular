import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Page } from 'src/app/core/models/page';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-fulfilled-orders',
  templateUrl: './fulfilled-orders.component.html',
  styleUrls: ['./fulfilled-orders.component.scss']
})
export class FulfilledOrdersComponent implements OnInit {
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
    this.page.size = 3;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap)=>{
      this.sellerID = (paramMap.get('sellerID'))?Number(this.activatedRoute.snapshot.paramMap.get('sellerID')):0;
      this.setPage({offset: 0});
    });
  }
  setPage(pageInfo: any) {

    this.page.pageNumber = pageInfo.offset + 1;
    this.orderService.fulfilled( this.sellerID, pageInfo.offset + 1).subscribe((pagedData: any) => {

      this.page.pageNumber = pagedData.data.current_page - 1;
      this.page.size = pagedData.data.per_page
      this.page.totalElements = pagedData.data.total
      this.page.totalPages = pagedData.data.last_page
      this.rows = pagedData.data.data;
      console.log(this.rows)
      console.log(this.sellerID)
    });
  }
}
