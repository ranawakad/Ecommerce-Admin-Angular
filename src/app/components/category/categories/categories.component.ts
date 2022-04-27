import { Component, OnInit,TemplateRef } from '@angular/core';
import {environment} from "src/environments/environment";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CategoriesService} from 'src/app/services/categories.service';
import Swal from 'sweetalert2';

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

  deleteCategory(id: number) {
    this.categoriesService.deleteCategory(id).subscribe({
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

