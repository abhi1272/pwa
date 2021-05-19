import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../auth/services/auth.service';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productList
  caterGoryList = []
  constructor(private sanitizer: DomSanitizer,public authService:AuthService,
    public productService:ProductService,public dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.productService.storedProductList)
    this.getProductList()
    // this.getPharmaProduct()
  }

  getProductList() {
    this.productService.getProduct().subscribe((data) => {
      console.log('----data----', data)
      this.productList = data['data']
    }, (error) => {
      console.log(error)
    })
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(InputFormComponent, {
  //     maxWidth: '100vw',
  //     width: '500px',
  //     maxHeight: '600px',
  //     data: {page_key: 'product', animal: "tiger"}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.getProductList()
  //   });
  // }

  selectCompany(name){
    this.productService.storedProductList = this.productList.filter(item => item.company === name)
  }
}
