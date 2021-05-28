import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs'
import { MatDialog } from '@angular/material/dialog'


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public filterObj = { filters: [] }
  cartCount = 0
  quantityCount = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  public downlodObj =
    { export_to_excel: true }
  public roleName
  public roleAttributes
  public filterDataCountDisplay
  public helpRoleName
  public previousUrlData = {
    url: '',
    gadgetTitle: ''
  }
  public apiUrl = environment.url
  apiDetails
  previousFilter
  timeTableEditData
  checkedColumns = []

  constructor(public http: HttpClient, public dialog: MatDialog) { }

  getTableConfig(key): Observable<any> {
    return this.http.get(`${this.apiUrl}/design?page_key=${key}`)
  }

  getTableData(api, filter): Observable<any> {
    return this.http.get(`${this.apiUrl}${api.api_url}?paql=${filter}`)
  }

  getApiFilteredData(api, filter): Observable<any> {
    return this.http.get(`${this.apiUrl}${api.api_url}?paql=${filter}`)
  }

  getDataById(model, uuid): Observable<any> {
    return this.http.get(`${this.apiUrl}/${model}/${uuid}`)
  }

  public openDialog(data = {}, componentName, width = '500px'): any{
    const dialogRef = this.dialog.open(componentName, {
      width,
      data
    })
    return dialogRef
  }

  public getCartData(): any{
    const cartData = localStorage.getItem('cart')
    const parsedCartData = cartData ? JSON.parse(localStorage.getItem('cart')) : []
    this.cartCount = this.getCartCount(parsedCartData)
    return parsedCartData
  }

  public addInCart(productObj): void {
    const currentCartData = this.getCartData()
    const currentCartDataUuid = currentCartData.map(item => item.uuid)
    if (currentCartDataUuid.includes(productObj.uuid)) {
      currentCartData.find(item => item.uuid === productObj.uuid).quantity = productObj.quantity
    } else {
      currentCartData.push(productObj)
    }
    // currentCartData.forEach((product) => {
    //   if (product.uuid !== productObj.uuid) {
    //     currentCartData.push(productObj)
    //   }else{
    //     product.quantity =  +productObj.quantity
    //   }
    // })
    // if (currentCartData && currentCartData.length === 0) {
    //   currentCartData.push(productObj)
    // }
    localStorage.setItem('cart', JSON.stringify(currentCartData))
    this.cartCount = this.getCartData()
  }

  public removeFromCart(productObj): void {
    console.log('remove from acrt')
    const currentCartData = this.getCartData()
    const index = currentCartData.findIndex(item => item.uuid === productObj.uuid)
    currentCartData.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(currentCartData))
    this.cartCount = this.getCartData()
  }

  public getCartCount(currentCartData): any {
    console.log('get count', currentCartData)
    if (currentCartData) {
      return currentCartData.reduce((acc, product) => {
        return acc + +product.quantity
      }, 0)
    } else {
      return 0
    }
  }
  // getTableMetaConfig(options) {
  //   return this.http.get('../../assets/sample.json')
  // }

  // getApiFilteredData(api_details, filter) {
  //   // return this.http.get(`
  //   // ${this.config.apiUrl}${api_details.api_url}?faql=${filter}`,this.httpOptions);
  //   return this.http.get('../../assets/sample-data.json')
  // }

  // getDataFromConfig(api_details, filter) {
  //   // return this.http.get(`
  //   // ${this.config.apiUrl}${api_details.api_url}?faql=${filter}`,this.httpOptions);
  //   return this.http.get('../../assets/sample-data.json')
  // }
}
