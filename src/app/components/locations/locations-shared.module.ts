import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CitiesComponent} from "./cities/cities/cities.component";
import {FeahterIconModule} from "../../core/feather-icon/feather-icon.module";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    CitiesComponent
  ],
  imports: [
    CommonModule,
    FeahterIconModule,
    RouterModule,

  ],
  exports: [CitiesComponent]

})
export class LocationsSharedModule { }
