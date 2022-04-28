import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {GovernoratesService} from "src/app/services/governorates.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-governorate',
  templateUrl: './edit-governorate.component.html',
  styleUrls: ['./edit-governorate.component.scss']
})
export class EditGovernorateComponent implements OnInit {
  pageTitle: string;
  governorateForm: FormGroup
  errors: any
  selectedGovernorate: number
  isSubmitted=false
  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder,
              private governoratesService: GovernoratesService,
              private router: Router) {
  }


  ngOnInit(): void {
    this.governorateForm = this.fb.group({
      name: ['',
        [
          Validators.required,
          Validators.minLength(4)
        ]
      ],
    });

    this.activatedRoute.paramMap.subscribe(paramMap => {
      let governorateId = paramMap.get('id') ? Number(this.activatedRoute.snapshot.paramMap.get('id')) : 0
      if (governorateId) {
        this.pageTitle = 'Edit'
        this.selectedGovernorate = governorateId
        this.getGovernorate()
      } else {
        this.pageTitle = 'Create'
      }
    })
  }

  //forms
  onSubmit() {
    if(this.governorateForm.valid)
    {
      if (this.pageTitle == 'Create') {
        this.createGovernorate()
      } else if (this.pageTitle == 'Edit') {
        this.updateGovernorate()
      }
    }
    this.isSubmitted=true
  }

  get form() {
    return this.governorateForm.controls;
  }

  //services calling
  getGovernorate() {
    this.governoratesService.getGovernorate(this.selectedGovernorate).subscribe({
      next: (res) => {
        console.log(res.data[0])
        this.governorateForm.setValue({name: res.data[0].name})
      },
      error: (err) => {
        if (err.status == 404) {
          this.router.navigate(['/error/404'])
        }
      }
    })
  }

  updateGovernorate() {
    this.governoratesService.updateGovernorate(this.selectedGovernorate, this.governorateForm.value).subscribe({
      next: (res) => {
        this.sweetalert('success', res.message)
        this.router.navigate(['/governorates'])
      },
      error: (err) => {
        this.sweetalert('error', err.error.message)
        this.errors = err.error.errors
      }
    })
  }

  createGovernorate() {
    this.governoratesService.createGovernorate(this.governorateForm.value).subscribe({
      next: (res) => {
        this.sweetalert('success', res.message)
        this.governorateForm.reset()
      },
      error: (err) => {
        this.errors = err.error.errors
        this.sweetalert('error', err.error.message)
      }
    })
  }

  //helpers
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
}
