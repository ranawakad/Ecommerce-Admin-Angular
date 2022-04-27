import {Component, OnInit, TemplateRef} from '@angular/core';
import {environment} from "src/environments/environment";
import {ProductsService} from "src/app/services/products.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  page = 1;
  product: any;
  orderItems: any
  itemsPerPage = 100;
  totalItems: any;
  imageURL = environment.images

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private productsService: ProductsService, private modalService: NgbModal) {

  }

  ngOnInit(): void {

    // @ts-ignore
    this.activatedRoute.paramMap.subscribe(paramMap => {

      let id = paramMap.get('id') ? Number(this.activatedRoute.snapshot.paramMap.get('id')) : 0
      if (id) {
        console.log(id);
        this.getPage(id)
      }

    })
  }

  getPage(page: any) {
    this.productsService.getProductOrders(page).subscribe((res: any) => {
        console.log(res.data.product)
        console.log(res.data.orderItems)
        this.product = res.data.product;
        this.orderItems = res.data.orderItems;
        this.totalItems = res.data.orderItems.length;
      },
      (err) => {
        this.router.navigate(['/error/404'])
      }
    )
  }

  deleteProduct(id: number) {
    this.productsService.deleteProduct(id).subscribe({
      next: (res) => {
        this.sweetalert('success', res.message);
        this.router.navigate(['/products']);
      },
      error: () => {
        this.sweetalert('error', 'Failed')
      }
    })

  }

  orderItemById(index: number, orderItem: any) {
    return orderItem.id ?? undefined;
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

  openVerticalCenteredModal(content: TemplateRef<any>) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
      if (result.confirm) {
        this.deleteProduct(result.id);
      }
    });
  }

}

