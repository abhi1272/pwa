import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/modules/shared/services/shared.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  id
  product
  addToCartFlag = false
  quantityCount = []
  discount
  constructor(public route: ActivatedRoute, public sharedService: SharedService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id
      this.getProductData()
  })
    const currentCartData = this.sharedService.getCartData()
    this.quantityCount = this.sharedService.quantityCount
  }

  getProductData(): void {
    this.sharedService.getDataById('medicine', this.id).subscribe((data) => {
      if (data.data) {
        this.product = this.dataCorrection(data.data)
        console.log(this.product)
        this.discount = Math.round((this.product.best_price / this.product.MRP) * 10)
      }
    }, (error) => {
      console.log(error)
    })
  }

  addToCart(): void{
    this.addToCartFlag = true
  }

  getCartValue(val): void {
    const cartObj = {
      product: this.product,
      uuid: this.product.uuid,
      quantity: val
    }
    console.log('val', val)
    if (+val === 0) {
      this.removeProduct(this.product)
    } else {
      this.sharedService.addInCart(cartObj)
      this.sharedService.getCartData()
    }
  }

  public removeProduct(product): void{
    this.sharedService.removeFromCart(product)
    this.sharedService.getCartData()
    this.addToCartFlag = false
  }

  public dataCorrection(product): void{
    product.benefits = product.benefits && product.benefits.split(',')
    product.composition = product.composition && product.composition[0].split(',')
    product.best_price = +product.best_price
    product.MRP = +product.MRP
    return product
  }

}
