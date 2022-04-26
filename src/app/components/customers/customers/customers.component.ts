import { Component, OnInit,TemplateRef } from '@angular/core';
import {environment} from "src/environments/environment";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CustomersService} from 'src/app/services/customers.service';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  page = 1;
  customers:any;
  itemsPerPage = 30;
  totalItems: any;
  imageURL = environment.Images

  constructor(private customersService: CustomersService,private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getPage(this.page);
  }

  getPage(page: any) {
    this.customersService.getAllCustomers(+page).subscribe((res: any) => {
      this.customers = res.data.data;
      this.totalItems = res.data.total;
      this.itemsPerPage = res.data.per_page;
    })
  }

  deleteCustomer(id: number) {
    this.customersService.deleteCustomer(id).subscribe({
      next: (res) => {
        res.data.msg
      },
      error: (err) => {
        console.log(err.error.message)
      }
    })
  }

  customerById(index: number, customer: any) {
    return customer.id ?? undefined;
  }

  openVerticalCenteredModal(content: TemplateRef<any>) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
      if(result.confirm){
        this.customersService.deleteCustomer(result.id).subscribe({
          next:(res)=>{},
          error:(err)=>{}
        })
      }
    }).catch((res) => {});
  }

  openLgModal(content: TemplateRef<any>) {
    this.modalService.open(content, {size: 'lg',scrollable:true})
  }
}
