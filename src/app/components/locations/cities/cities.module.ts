import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {EditCityComponent} from './edit-city/edit-city.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {ReactiveFormsModule} from "@angular/forms";
import {LocationsSharedModule} from "../locations-shared.module";


const routes: Routes = [

      {
        path: ':id/edit',
        component: EditCityComponent
      },
      {
        path: 'create',
        component : EditCityComponent
      },

]

@NgModule({
  declarations: [
    EditCityComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgSelectModule,
    ReactiveFormsModule,
    LocationsSharedModule

  ],
})
export class CitiesModule { }
