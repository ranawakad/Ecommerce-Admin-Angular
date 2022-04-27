import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {GovernoratesService} from "src/app/services/governorates.service";
import {CitiesService} from "src/app/services/cities.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.scss']
})
export class EditCityComponent implements OnInit {

  pageTitle: string;
  cityForm: FormGroup

  errors:any

  selectedCity: number

  governorates: {
    id: number,
    name: string,
  }[]

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder,
              private governoratesService: GovernoratesService, private citiesService: CitiesService,
              private router: Router) {
  }


  ngOnInit(): void {
    this.cityForm = this.fb.group({
      name: ['',
        [
          Validators.required,
          Validators.minLength(4)
        ]
      ],
      governorate_id: ['',
        [
          Validators.required,
          Validators.pattern("^[0-9]*$")
        ]
      ],
    });

    this.getGovernorates()
    this.activatedRoute.paramMap.subscribe(paramMap => {
      let cityId = paramMap.get('id') ? Number(this.activatedRoute.snapshot.paramMap.get('id')) : 0
      if (cityId) {
        this.pageTitle = 'Edit'
        this.selectedCity=cityId
        this.getCity()
      } else {
        this.pageTitle = 'Create'
      }
    })
  }

  get name() {
    return this.cityForm.get('name');
  }

  get governorate_id() {
    return this.cityForm.get('governorate_id');
  }

  //forms
  onSubmit() {
    if(this.pageTitle=='Create'){
      this.createCity()
      }
      else if(this.pageTitle=='Edit'){
        this.updateCity()
      }

    console.log(this.cityForm.value);
  }

  //services calling
  getCity() {
  this.citiesService.getCity(this.selectedCity).subscribe({
      next: (res) => {
        this.cityForm.setValue({name:res.data.name,governorate_id:res.data.governorate_id})
      },
      error: (err) => {
        if (err.status == 404) {
          this.router.navigate(['/error/404'])
        }
      }
    })
  }

  updateCity() {
    this.citiesService.updateCity(this.selectedCity,this.cityForm.value).subscribe({
      next:(res)=>{
        this.sweetalert('success', res.message)
        this.router.navigate(['/governorates'])
      },
      error:(err)=>{
        this.sweetalert('error', err.error.message)
        this.errors=err.errors
      }
    })
  }

  createCity() {
    this.citiesService.createCity(this.cityForm.value).subscribe({
      next:(res)=>{
        this.sweetalert('success', res.message)
        this.cityForm.reset()
      },
      error:(err)=>{
        this.errors=err.errors
        this.sweetalert('error', err.error.message)

      }
    })
  }

  getGovernorates() {
    this.governoratesService.getAllGovernorates().subscribe({
      next: (res) => {
        this.governorates = res.data
      }
    })
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
}
