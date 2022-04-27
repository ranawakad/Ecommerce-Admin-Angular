import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { CategoriesService } from 'src/app/services/categories.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  formData: FormGroup
  isFormSubmitted = false
  errors: any
  selectedCategory:number
  @ViewChild('swal') swal: SwalComponent
  url = 'https://img.icons8.com/ios/100/000000/contract-job.png';
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.formData = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      image: ['', [Validators.required]],
      imageSource: ['', [Validators.required]],
    })
    this.activatedRoute.paramMap.subscribe(paramMap => {

      let id = paramMap.get('id') ? Number(this.activatedRoute.snapshot.paramMap.get('id')) : 0
      if (id) {
        this.categoryService.getCategory(id).subscribe(
          (res: any) => {
            this.selectedCategory = res.data.id
            this.formData.controls['name'].setValue(res.data.name)
            this.formData.controls['description'].setValue(res.data.description)
            this.formData.get('image')?.clearValidators();
            this.formData.get('imageSource')?.clearValidators();
            this.formData.get('image')?.updateValueAndValidity();
            this.formData.get('imageSource')?.updateValueAndValidity();
            console.log(res.data.image)
            this.url = `${environment.images}/categories/${res.data.image}`;
          }
          ,
          err => this.router.navigate(['/error/404'])
        )
      }

    })
  }
  get form() {
    return this.formData.controls
  }
  onSubmit() {
    console.log(this.formData)
    if (this.formData.valid) {
      const formDetalis = new FormData();
      formDetalis.append('_method', 'patch');
      formDetalis.append('name', this.formData.get('name')?.value);
      formDetalis.append('description', this.formData.get('description')?.value);
      formDetalis.append('image', this.formData.get('imageSource')?.value);
      if (this.selectedCategory) {
        console.log(this.formData.value)
        this.categoryService.updateCategory(this.selectedCategory, formDetalis).subscribe(
          res => {
            this.swal.title = res.message
            this.swal.showConfirmButton = false
            this.swal.timer = 1500
            this.swal.fire()
            this.router.navigate(['/categories/all'])
          },
          err => {
            console.log(err)
            this.errors = err.error.errors
            this.swal.title = err.error.message
            this.swal.showConfirmButton = false
            this.swal.timer = 1500
            this.swal.icon='error'
            this.swal.fire()
           }
        )
      } else {
        this.categoryService.addCategory(formDetalis).subscribe(
          res => {
            this.swal.title = res.message
            this.swal.showConfirmButton = false
            this.swal.timer = 1500
            this.swal.fire()
            this.router.navigate(['/categories/all'])
          },
          err => {
            this.errors = err.errors
            this.swal.title = err.message
            this.swal.showConfirmButton = false
            this.swal.timer = 1500
            this.swal.icon='error'
            this.swal.fire()
           }
        )
    }
  }
    this.isFormSubmitted = true
  }
onSelect(event: any) {
  const file = event.target.files[0];
  let fileType = event.target.files[0].type;
  if (fileType.match(/image\/*/)) {
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.url = event.target.result;
      this.formData.patchValue({
        imageSource: file
      });
    };
  } else {
    window.alert('Please select correct image format');
  }
}

}
