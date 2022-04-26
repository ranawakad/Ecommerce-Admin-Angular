import { Component, OnInit,TemplateRef } from '@angular/core';
import {environment} from "src/environments/environment";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CustomersService} from 'src/app/services/customers.service';
import Swal from 'sweetalert2';
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
  sweetalert(type: any, msg: string) {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      title: msg,
      icon: type
    })
  }

  deleteCustomer(id: number) {
    this.customersService.deleteCustomer(id).subscribe({
      next: (res) => {
        res.data.message
        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          title: res.data.message,
          icon: 'success'
        })
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
      if (result.confirm) {
        this.deleteCustomer(result.id);
      }
    });
  }

  openLgModal(content: TemplateRef<any>) {
    this.modalService.open(content, {size: 'lg',scrollable:true})
  }
}
