import { Component, Input, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/modules/auth/components/login/login.component';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { SharedService } from 'src/app/modules/shared/services/shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartDataValue
  totalPrice = 0
  totalDiscount = 0
  @Input() page
  constructor(public sharedService: SharedService, public authService: AuthService) { }

  ngOnInit(): void {
    this.cartDataValue = this.sharedService.getCartData()
    this.calculateTotal()
  }

  addCart(val, product): void {
    const cartObj = {
      product,
      uuid: product.uuid,
      quantity: val
    }
    if (+val === 0) {
      this.removeProduct(product)
    } else {
      this.sharedService.addInCart(cartObj)
      this.cartDataValue = this.sharedService.getCartData()
      this.calculateTotal()
    }
  }

  public removeProduct(product): void{
    this.sharedService.removeFromCart(product)
    this.cartDataValue = this.sharedService.getCartData()
    this.calculateTotal()
  }

  public calculateTotal(): void{
    this.totalPrice = 0
    this.totalDiscount = 0
    this.cartDataValue.map((item) => {
      this.totalPrice += item.product.MRP * +item.quantity
      this.totalDiscount += (item.product.MRP - +item.product.best_price) * +item.quantity
    })
    this.totalPrice = Math.round(this.totalPrice)
    this.totalDiscount = Math.round(this.totalDiscount)
  }

  public openLoginPage(): void {
    this.sharedService.openDialog({}, LoginComponent, '')
  }

}
