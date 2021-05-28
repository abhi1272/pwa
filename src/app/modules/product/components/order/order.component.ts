import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/modules/auth/services/auth.service'
import { SharedService } from 'src/app/modules/shared/services/shared.service'
import { ProductService } from '../../services/product.service'
import { saveAs } from 'file-saver'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  panelOpenState = false
  userOrderData
  constructor(public authService: AuthService, public sharedService: SharedService,
              public productService: ProductService) { }

  ngOnInit(): void {
    console.log('orders', this.authService.user.orders)
  }

  public showOrderDetails(order): void {
    this.userOrderData = order
    console.log('oder', order)
  }

  public gotoOrders(): void{
    this.userOrderData = undefined
  }

  public downloadBill(order): void{
    console.log(order)
    const orderObj = {
      shipping: {
        name: order.shippingAddress.firstName + order.shippingAddress.lastName,
        address: order.shippingAddress.address,
        city:  order.shippingAddress.city,
        state: order.shippingAddress.state,
        country: 'INDIA',
        postal_code: order.shippingAddress.pinCode
      },
      items: [],
      subtotal: order.amount.netPrice,
      paid: 0,
      invoice_nr: `${order.orderNo}${order.time}`
    }

    order.products.map((prod) => {
      const prodObj = {
        item: prod.product.medicine_name.slice(0, 15),
        description: prod.product.category,
        quantity: prod.quantity,
        amount: prod.product.best_price
      }
      orderObj.items.push(prodObj)
    })

    this.productService.downloadBill(orderObj).subscribe((data) => {
      saveAs(data.body, 'bill.pdf')
    })
  }
}
