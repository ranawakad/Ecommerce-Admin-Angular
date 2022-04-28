import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Order } from 'src/app/core/models/order';
import { Page } from 'src/app/core/models/page';
import { Seller } from 'src/app/core/models/seller';
import { OrderService } from 'src/app/core/services/order.service';
import { SellerService } from 'src/app/core/services/seller.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderID:number = 0;
  orderDetails:Order[] = []

  page: Page = {} as Page;
  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  basicModalCloseResult: string = '';
  seller:Seller = {} as Seller;


  constructor(private orderService:OrderService,
    private sellerService:SellerService,
    private activatedRoute:ActivatedRoute,
    private modalService: NgbModal)
    {
      this.page.pageNumber = 1;
      this.page.size = 3;
    }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((paramMap)=>{
      this.orderID = (paramMap.get('id'))?Number(this.activatedRoute.snapshot.paramMap.get('id')):0;
      this.setPage({offset: 0});
    });

    // console.log(this.orderID);
  }

  setPage(pageInfo: any) {

    this.page.pageNumber = pageInfo.offset + 1;
    this.orderService.orderDetails(this.orderID,pageInfo.offset + 1).subscribe((pagedData: any) => {

      this.page.pageNumber = pagedData.data.current_page - 1;
      this.page.size = pagedData.data.per_page
      this.page.totalElements = pagedData.data.total
      this.page.totalPages = pagedData.data.last_page
      this.rows = pagedData.data.data;
      console.log(this.rows)
    });
  }
  openVerticalCenteredModal(content: TemplateRef<any>, ID:number) {

    // seller Service connection
    this.sellerService.sellerDetails(ID).subscribe(res=>{
      this.seller = res.data;

    });

    // Modal Closing
    this.modalService.open(content, {centered: true}).result.then((result) => {
      if (result == 'by: save button'){
        this.sellerService.activeStateUpadte(this.seller.id).subscribe(res=>{
          console.log(res.message);
          Swal.fire({
            toast: true, position: 'top-end', showConfirmButton: false, timer: 2000, timerProgressBar: true, title: res.message, icon: 'success'
          })
        },err=>{
          Swal.fire({
            toast: true, position: 'top-end', showConfirmButton: false, timer: 2000, timerProgressBar: true, title: err.message, icon: 'error'
          })
        })
      }

         this.seller = {} as Seller
    }).catch((res) => {});
  }

  setDone(id: any) {

  }
}

