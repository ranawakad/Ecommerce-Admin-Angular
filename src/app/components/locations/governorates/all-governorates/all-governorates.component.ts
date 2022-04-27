import {Component, OnInit,OnDestroy, TemplateRef} from '@angular/core';
import {ProductsService} from "src/app/services/products.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GovernoratesService} from "src/app/services/governorates.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-all-governorates',
  templateUrl: './all-governorates.component.html',
  styleUrls: ['./all-governorates.component.scss']
})
export class AllGovernoratesComponent implements OnInit,OnDestroy {

  page = 1;
  governorates: any;
  totalItems: any;

  constructor(private productsService: ProductsService,
              private governoratesService: GovernoratesService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.governoratesService.getAllGovernorates().subscribe((res: any) => {
      this.governorates = res.data;
      this.totalItems = res.data.length;
    })
  }

  sweetalert(type: any, msg: any) {
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

  deleteGovernorate(id: number) {
    this.governoratesService.deleteGovernorate(id).subscribe({
      next: (res) => {
        this.sweetalert('success', res.message)
        this.governorates = this.governorates.filter((element: any) => {
          return element.id != id;
        })
      },
      error: () => {
        this.sweetalert('error', 'Failed')
      }
    })

  }

  trackById(index: number, item: any) {
    return item.id ?? undefined;
  }

  openVerticalCenteredModal(content: TemplateRef<any>) {
    this.modalService.open(content, {centered: true, scrollable: true}).result.then((result) => {
      if (result.confirm) {
        this.deleteGovernorate(result.id);
      }
    });
  }

  openLgModal(content: TemplateRef<any>) {
    this.modalService.open(content, {size: 'lg', scrollable: true})
  }

  removeCity(gov_index: number, $event: any) {
    console.log("city  ",$event.index,"  gov",gov_index)
    this.governorates[gov_index].cities = this.governorates[gov_index].cities.filter((element: any,index:number) => {
      return index != gov_index;
    })
  }

  ngOnDestroy(): void {
    this.modalService.dismissAll();
  }

}
