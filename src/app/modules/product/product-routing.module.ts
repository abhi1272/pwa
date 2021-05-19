import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CartComponent } from './components/cart/cart.component'
import { ProductListComponent } from './components/product-list/product-list.component'
import { ProductViewComponent } from './components/product-view/product-view.component'
import { ProductComponent } from './product.component'

const routes: Routes = [
  {
    path: '',
    component: ProductComponent
  },
  {
    path: 'product-list',
    component: ProductListComponent
  },
  {
    path: 'product/:id',
    component: ProductViewComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
