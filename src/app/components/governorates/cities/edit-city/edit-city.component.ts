import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "src/app/services/auth.service";
import {GovernoratesService} from "../../../../services/governorates.service";

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.scss']
})
export class EditCityComponent implements OnInit {
  heroForm:FormGroup;
  constructor(private router: Router,

              private fb:FormBuilder,
              private governorateService:GovernoratesService)
  {

  }
  ngOnInit(): void {
    this.heroForm = new FormGroup({
      name: new FormControl(this.heroForm, [
        Validators.required,
        Validators.minLength(4),
      ]),
      alterEgo: new FormControl(this.heroForm.alterEgo),
    });

  }

  get name() { return this.heroForm.get('name'); }

}
