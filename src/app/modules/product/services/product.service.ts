import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

// import {ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public baseUrl = 'http://localhost:4000/api/v1'
  // public baseUrl = 'https://omexbackend.herokuapp.com/api/v1'
  storedProductList = [
    { id: 1, name: 'Dettol', MRP: '50', image: '../../../assets/img/products/dettol.jpg' },
    { id: 2, name: 'Complan', MRP: '250', image: '../../../assets/img/products/complan.jpg' },
    { id: 3, name: 'Chyawanprash', MRP: '200', image: '../../../assets/img/products/chyawanprash.jpg' },
    { id: 4, name: 'D3-Drop', MRP: '30', image: '../../../assets/img/products/d3_drop.jpg' },
    {
      id: 5, name: 'Dettol', MRP: '50', company: 'Reckitt', Rating: "4", image: '../../../assets/img/products/Dettol_big.jpg'
      // tslint:disable-next-line:max-line-length
      , Description: 'Dettol Disinfectant Multipurpose Liquid cleaner provides protection to you and your family against illness causing germs. This disinfectant liquid sanitizes your home and also helps maintain your personal hygiene. It can be used in bath, laundry, floor and surface cleaning, leaving everything clean and fresh. This multipurpose disinfenctant cleaner for home is recommended by Indian Medical Association.*Protects from 100 illness causing germs and Coronavirus causing COVID19 virus. Proven to be >99.9% effective at inactivating SARS-CoV-2, the virus that causes COVID19, when used at 1:12 dilutions with 5 minutes contact time when tested under dirty conditions; As per standard testing protocol.'
    },
    { id: 6, name: 'Ensure', MRP: '300', image: '../../../assets/img/products/ensure.jpg' },
    { id: 7, name: 'Horlicks', MRP: '225', image: '../../../assets/img/products/horlicks.jpg' },
    { id: 8, name: 'Mask', MRP: '50', image: '../../../assets/img/products/mask.jpg' },
    { id: 9, name: 'Revitel', MRP: '50', image: '../../../assets/img/products/revitel.jpg' },
    { id: 10, name: 'Sanitiser', MRP: '50', image: '../../../assets/img/products/sanitiser.jpg' },
    { id: 12, name: 'Dettol', MRP: '50', image: '../../../assets/img/products/dettol.jpg' },
    { id: 12, name: 'Complan', MRP: '250', image: '../../../assets/img/products/complan.jpg' },
    { id: 13, name: 'Chyawanprash', MRP: '200', image: '../../../assets/img/products/chyawanprash.jpg' },
    { id: 14, name: 'D3-Drop', MRP: '30', image: '../../../assets/img/products/d3_drop.jpg' },
    // tslint:disable-next-line:max-line-length
    { id: 15, name: 'Dettol', MRP: '50', company: 'Reckitt', Rating: "4", image: '../../../assets/img/products/Dettol_big.jpg', Description: 'Dettol Disinfectant Multipurpose Liquid cleaner provides protection to you and your family against illness causing germs. This disinfectant liquid sanitizes your home and also helps maintain your personal hygiene. It can be used in bath, laundry, floor and surface cleaning, leaving everything clean and fresh. This multipurpose disinfenctant cleaner for home is recommended by Indian Medical Association.*Protects from 100 illness causing germs and Coronavirus causing COVID19 virus. Proven to be >99.9% effective at inactivating SARS-CoV-2, the virus that causes COVID19, when used at 1:12 dilutions with 5 minutes contact time when tested under dirty conditions; As per standard testing protocol.' },
    { id: 16, name: 'Ensure', MRP: '300', image: '../../../assets/img/products/ensure.jpg' },
    { id: 17, name: 'Horlicks', MRP: '225', image: '../../../assets/img/products/horlicks.jpg' },
    { id: 18, name: 'Mask', MRP: '50', image: '../../../assets/img/products/mask.jpg' },
    { id: 19, name: 'Revitel', MRP: '50', image: '../../../assets/img/products/revitel.jpg' },
    { id: 20, name: 'Sanitiser', MRP: '50', image: '../../../assets/img/products/sanitiser.jpg' },
    { id: 21, name: 'Rantac', MRP: '10', image: '../../../assets/img/products/sanitiser.jpg' }
  ];



  constructor(public _http: HttpClient) { }


  // public createProduct(productData): any {

  //   console.log('create product service call')
  //   let myResponse = this._http.post(this.baseUrl + '/product/upload', productData)
  //   console.log(productData)
  //   return myResponse
  // }

  public getProduct() {
    let myResponse = this._http.get(this.baseUrl + '/product')
    return myResponse
  }

  // public getPharamProduct(id){
  //   return this._http.get(`https://pharmeasy.in/api/categoryDetails/fetchCategoryDetails/${id}`)
  // }

  // public sendEmail(emailBody) {
  //   console.log('send email api called')
  //   let myResponse = this._http.post(this.baseUrl + '/products/mail', emailBody, {
  //     headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  //   })
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     );
  //   return myResponse
  // }

  // public handleError(error: HttpErrorResponse) {
  //   let errorMessage = '';

  //   if (error.error instanceof ErrorEvent) {
  //     // client-side error
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;


  //   }
  //   // this.Toastr.error('currectly not able to onnect to server: will be back soon');
  //   //window.alert('currectly not able to onnect to server: will be back soon');
  //   return throwError(errorMessage);
  // }

  public addPrescription(data): Observable<any>{
    return this._http.post(this.baseUrl + '/product/prescription', data)
  }

}
