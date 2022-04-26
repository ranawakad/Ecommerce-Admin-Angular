import {Component, OnInit, TemplateRef} from '@angular/core';
import {ProductsService} from 'src/app/services/products.service';
import {environment} from "src/environments/environment";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  page = 1;
  products: any;
  itemsPerPage = 30;
  totalItems: any;
  imageURL = environment.images

  constructor(private productsService: ProductsService,private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getPage(this.page);
  }

  getPage(page: any) {
    this.productsService.getAllProducts(+page).subscribe((res: any) => {
      this.products = res.data.data;
      this.totalItems = res.data.total;
      this.itemsPerPage = res.data.per_page;
    })
  }

  deleteProduct(id: number) {
    this.productsService.deleteProduct(id).subscribe({
      next: (res) => {
        res.data.msg
      },
      error: (err) => {
        console.log(err.error.message)
      }
    })
  }

  productById(index: number, product: any) {
    return product.id ?? undefined;
  }

  openVerticalCenteredModal(content: TemplateRef<any>) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
      if(result.confirm){
        this.productsService.deleteProduct(result.id).subscribe({
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