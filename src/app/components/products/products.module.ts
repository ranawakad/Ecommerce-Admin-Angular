import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {AllProductsComponent} from './all-products/all-products.component';
import {ProductsRouterComponent} from './products-router/products-router.component';
import {NgxPaginationModule} from 'ngx-pagination';


const routes: Routes = [
  {
    path: '',
    component: ProductsRouterComponent,
    children: [

      {
        path: '',
        pathMatch: 'full',
        component: AllProductsComponent
      },
      {
        path: 'category?id=:category',
        component: ProductDetailsComponent
      },
      {
        path: '?id=:id',
        component: ProductDetailsComponent
      }
    ]

  },
]

@NgModule({
  declarations: [
    ProductDetailsComponent,
    AllProductsComponent,
    ProductsRouterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxPaginationModule
  ]
})
export class ProductsModule {
}
