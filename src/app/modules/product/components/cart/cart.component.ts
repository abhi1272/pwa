import { Component, OnInit } from '@angular/core';
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
  constructor(public sharedService: SharedService) { }

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
  }

}
