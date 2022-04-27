import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import Swal from "sweetalert2";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CitiesService} from "src/app/services/cities.service";

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})

export class CitiesComponent implements OnInit {
  @Input() governorate:any
  constructor(private modalService: NgbModal,private cityService:CitiesService) { }

  ngOnInit(): void {
  }
  sweetalert(type: any, msg:any) {
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

  deleteCity(id: number) {
    this.cityService.deleteCity(id).subscribe({
      next: (res) => {
        this.sweetalert('success', res.message)
        this.governorate.cities = this.governorate.cities.filter((element: any) => {
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
    this.modalService.open(content, {centered: true,scrollable: true}).result.then((result) => {
      if (result.confirm) {
        this.deleteCity(result.id);
      }
    });
  }

  openLgModal(content: TemplateRef<any>) {
    this.modalService.open(content, {size: 'lg', scrollable: true})
  }
}
