import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {GovernoratesRouterComponent} from './governorates-router/governorates-router.component';
import {AllGovernoratesComponent} from './all-governorates/all-governorates.component';
import {CitiesComponent} from './cities/cities.component';
import {EditCityComponent} from './cities/edit-city/edit-city.component';
import {EditGovernorateComponent} from './all-governorates/edit-governorate/edit-governorate.component';


const routes: Routes = [
  {
    path: '',
    component: GovernoratesRouterComponent,
    children: [

      {
        path: '',
        pathMatch: 'full',
        component: AllGovernoratesComponent
      },
      {
        path: 'edit',
        component: EditGovernorateComponent
      },

    ]

  },
]

@NgModule({
  declarations: [
    GovernoratesRouterComponent,
    AllGovernoratesComponent,
    CitiesComponent,
    EditCityComponent,
    EditGovernorateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class GovernoratesModule {
}
