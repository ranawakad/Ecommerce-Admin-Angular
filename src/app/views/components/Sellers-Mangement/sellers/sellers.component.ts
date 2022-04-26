import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Seller } from 'src/app/core/models/seller';
import { SellerService } from 'src/app/core/services/seller.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.scss']
})
export class SellersComponent implements OnInit {

  sellers: Seller[] = []
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
    this.sellerService.allSellers().subscribe(res=>{
    this.sellers =  res.data
      console.log(res.data);
    })
  }

  activeState(value:number){

    console.log(value);
  }


  openBasicModal(content: TemplateRef<any>, ID:number) {
    this.modalService.open(content, {}).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result

      if (result == 'by: save button'){
        this.sellerService.activeStateUpadte(ID).subscribe(res=>{
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

    }).catch((res) => {});
  }
}
