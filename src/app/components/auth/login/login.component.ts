import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: any;
  credentails:FormGroup
  error=false
  isFormSubmitted: Boolean;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb:FormBuilder,
              private auth:AuthService
              ) { 
    
  }

  ngOnInit(): void {
    this.credentails = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.isFormSubmitted=false
  }
  get form()
  {
    return this.credentails.controls
  }
  formSubmit()
  {
    if(this.credentails.valid)
    {
      this.auth.login(this.credentails.value).subscribe(
        (res:any)=>{
          localStorage.setItem('adminToken',res.data.token)
          this.router.navigate(['/'])
        },
        err=>{
          this.error=true
          setTimeout(() => this.error=false, 2000);
        }
      )
    }
    this.isFormSubmitted=true
  }
  onLoggedin(e: Event) {
    e.preventDefault();
    localStorage.setItem('isLoggedin', 'true');
    if (localStorage.getItem('isLoggedin')) {
      this.router.navigate([this.returnUrl]);
    }
  }

}
