import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AllGovernoratesComponent} from './all-governorates/all-governorates.component';
import {EditGovernorateComponent} from './edit-governorate/edit-governorate.component';
import {FeahterIconModule} from "../../../core/feather-icon/feather-icon.module";
import {NgSelectModule} from "@ng-select/ng-select";
import {ReactiveFormsModule} from "@angular/forms";
import {LocationsSharedModule} from "../locations-shared.module";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AllGovernoratesComponent
  },
  {
    path: ':id/edit',
    component: EditGovernorateComponent
  },
  {
    path: 'create',
    component: EditGovernorateComponent
  },
]

@NgModule({
  declarations: [
    AllGovernoratesComponent,
    EditGovernorateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeahterIconModule,
    NgSelectModule,
    ReactiveFormsModule,
    LocationsSharedModule
  ]
})
export class GovernoratesModule {
}
