import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartDataValue
  totalPrice = 0
  totalDiscount = 0
  addressForm: FormGroup
  selectAddressFlag = false
  addNewAddressFlag = false
  orderPlaced = false
  constructor(public sharedService: SharedService, public productService: ProductService,
              public authService: AuthService, public toast: ToastrService) { }

  ngOnInit(): void {
    this.cartDataValue = this.sharedService.getCartData()
    this.calculateTotal()
    this.addressForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      pinCode: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
    })
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

  public addAddress(): void{
    if (this.authService.user) {
      this.authService.user.address = []
    }
    this.authService.user.address.push(this.addressForm.value)
    const userObj = {
      loggedInUser: this.authService.user,
    }
    this.productService.updateUser(userObj).subscribe((data) => {
      this.toast.success('Address added successfully')
      this.productService.getUser(userObj).subscribe((user) => {
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(user))
        this.addNewAddressFlag = false
      })
    }, (error) => {
      console.log(error)
      this.toast.success('Some error occurred')
    })
  }

  // public selectAddress(val): void{
  //   if (val === 'on') {
  //     this.selectAddressFlag = true
  //   }
  //   console.log(val)
  // }

  public addNewAddress(): void{
    this.addNewAddressFlag = true
  }

  public placeOrder(): void{
    if (!this.authService.user.orders) {
      this.authService.user.orders = []
    }
    const orderObj = {
      orderNo: this.authService.user.orders.length + 1,
      products: this.sharedService.getCartData(),
      amount: {
        price: this.totalPrice,
        discount: this.totalDiscount,
        netPrice: this.totalPrice - this.totalDiscount
      },
      time: Math.floor (new Date().getTime() / 1000),
      shippingAddress: this.authService.user.address[0]
    }
    this.authService.user.orders.push(orderObj)
    const userObj = {
      loggedInUser: this.authService.user,
    }
    this.productService.updateUser(userObj).subscribe((data) => {
      this.toast.success('Order Done successfully')
      this.productService.getUser(userObj).subscribe((user) => {
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(user))
      })
    }, (error) => {
      console.log(error)
      this.toast.success('Some error occurred')
    })
    localStorage.removeItem('cart')
    this.sharedService.cartCount = 0
    this.orderPlaced = true
  }

  public goBackToAddress(): void{
    this.addNewAddressFlag = false
    this.selectAddressFlag = false
  }

  public editAddress(): void{
    console.log(this.authService.user.address)
    this.addressForm.patchValue({
      ...this.authService.user.address[0]
    })
    this.addNewAddressFlag = true
  }

}
