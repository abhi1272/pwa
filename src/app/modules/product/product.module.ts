import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProductComponent } from './product.component'
import { ProductRoutingModule } from './product-routing.module'
import { RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { SharedModule } from '../shared/shared.module';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './components/order/order.component';
import { AngularMaterialModule } from '../material/angular-material.module';
import { OrderDetailsComponent } from './components/order/order-details/order-details.component';



@NgModule({
  declarations: [
    ProductComponent,
    CartComponent,
    ProductListComponent,
    ProductViewComponent,
    ProductEditComponent,
    CheckoutComponent,
    OrderComponent,
    OrderDetailsComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    RouterModule,
    SharedModule,
    FormsModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
