import {Component, EventEmitter, Input, OnInit,OnDestroy, Output, TemplateRef} from '@angular/core';
import Swal from "sweetalert2";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CitiesService} from "src/app/services/cities.service";

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})

export class CitiesComponent implements OnInit,OnDestroy {
  @Output() removeCity = new EventEmitter<any>();
  @Input() cities:any
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

  deleteCity(result:any) {
    this.cityService.deleteCity(result.id).subscribe({
      next: (res) => {
        this.removeCity.emit({index:result.index})
        this.sweetalert('success', res.message)
        this.cities = this.cities.filter((element: any) => {
          return element.id != result.id;
        })
      },
      error: (err) => {
        this.sweetalert('error', err.error.message)
      }
    })

  }

  trackById(index: number, item: any) {
    return item.id ?? undefined;
  }

  openVerticalCenteredModal(content: TemplateRef<any>) {
    this.modalService.open(content, {centered: true,scrollable: true}).result.then((result) => {
      if (result.confirm) {
        this.deleteCity(result);
      }
    });
  }

  openLgModal(content: TemplateRef<any>) {
    this.modalService.open(content, {size: 'lg', scrollable: true})
  }

  ngOnDestroy(): void {
    this.modalService.dismissAll();
  }
}
