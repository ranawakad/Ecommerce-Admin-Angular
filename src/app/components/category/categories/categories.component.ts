import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import {environment} from "src/environments/environment";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CategoriesService} from 'src/app/services/categories.service';

import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  page = 1;
  categories:any;
  itemsPerPage = 30;
  totalItems: any;
  imageURL = environment.images
  @ViewChild('swal') swal: SwalComponent
  constructor(private categoriesService: CategoriesService,private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getPage(this.page);
  }

  getPage(page: any) {
    this.categoriesService.getAllCategories(+page).subscribe((res: any) => {
      this.categories = res.data.data;
      this.totalItems = res.data.total;
      this.itemsPerPage = res.data.per_page;
    })
  }

  deleteCategory(id: number) {
    this.categoriesService.deleteCategory(id).subscribe({
      next: (res) => {
        this.getPage(1);
            this.swal.title = res.message
            this.swal.showConfirmButton = false
            this.swal.timer = 1500
            this.swal.fire()
      },
      error: (err) => {
        this.swal.title = err.error.message
            this.swal.showConfirmButton = false
            this.swal.timer = 1500
            this.swal.icon='error'
            this.swal.fire()
      }
    })
  }

  categoryById(index: number, category: any) {
    return category.id ?? undefined;
  }

  openVerticalCenteredModal(content: TemplateRef<any>) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
      if (result.confirm) {
        this.deleteCategory(result.id);
      }
    });
  }

  openLgModal(content: TemplateRef<any>) {
    this.modalService.open(content, {size: 'lg',scrollable:true})
  }
}

