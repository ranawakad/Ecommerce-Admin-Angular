import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Seller } from 'src/app/core/models/seller';
import { SellerService } from 'src/app/core/services/seller.service';
import { Page } from 'src/app/models/page';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.scss']
})
export class SellersComponent implements OnInit {
  page: Page = {} as Page;
  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  basicModalCloseResult: string = '';
  seller:Seller = {} as Seller;

  constructor(
    private sellerService:SellerService,
    private modalService: NgbModal,) {

  }

  ngOnInit(): void {
    this.setPage({offset: 0});
    // this.sellerService.allSellers().subscribe(res=>{
    // this.sellers =  res.data
    //   console.log(res.data);
    // })
  }

  setPage(pageInfo: any) {

    this.page.pageNumber = pageInfo.offset + 1;
    this.sellerService.allSellers(pageInfo.offset + 1).subscribe((pagedData: any) => {

      this.page.pageNumber = pagedData.data.current_page - 1;
      this.page.size = pagedData.data.per_page
      this.page.totalElements = pagedData.data.total
      this.page.totalPages = pagedData.data.last_page
      this.rows = pagedData.data.data;
      console.log(this.rows)
    });
  }

  openBasicModal(content: TemplateRef<any>, ID:number) {
    this.modalService.open(content, {}).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result

      if (result == 'by: save button'){
        this.sellerService.activeStateUpadte(ID).subscribe(res=>{
          Swal.fire({
            toast: true, position: 'top-end', showConfirmButton: false, timer: 2000, timerProgressBar: true, title: res.message, icon: 'success'
          })
          this.setPage(this.page)

        },err=>{
          Swal.fire({
            toast: true, position: 'top-end', showConfirmButton: false, timer: 2000, timerProgressBar: true, title: err.message, icon: 'error'
          })
        })
      }

    }).catch((res) => {});
  }
}
