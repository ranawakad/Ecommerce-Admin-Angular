import {Component, OnInit, OnDestroy, TemplateRef} from '@angular/core';
import {ProductsService} from 'src/app/services/products.service';
import {environment} from "src/environments/environment";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from "sweetalert2";

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit, OnDestroy {
  page = 1;
  products: any;
  itemsPerPage = 30;
  totalItems: any;
  imageURL = environment.images

  constructor(private productsService: ProductsService, private modalService: NgbModal) {
  }


  ngOnInit(): void {
    this.getPage(this.page);
  }

  ngOnDestroy(): void {
    this.modalService.dismissAll();
  }

  getPage(page: any) {
    this.productsService.getAllProducts(+page).subscribe((res: any) => {
      this.products = res.data.data;
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

  deleteProduct(id: number) {
    this.productsService.deleteProduct(id).subscribe({
      next: (res) => {
        this.sweetalert('success', res.message)
        this.products = this.products.filter((element: any) => {
          return element.id != id;
        })
      },
      error: () => {
        this.sweetalert('error', 'Failed')
      }
    })

  }

  productById(index: number, product: any) {
    return product.id ?? undefined;
  }

  openVerticalCenteredModal(content: TemplateRef<any>) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
      if (result.confirm) {
        this.deleteProduct(result.id);
      }
    });
  }

  openLgModal(content: TemplateRef<any>) {
    this.modalService.open(content, {size: 'lg', scrollable: true})
  }

}
