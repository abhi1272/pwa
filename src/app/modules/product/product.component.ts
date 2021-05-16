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
    for (let i = 0; i < 200; i++) {
      this.getPharmaProduct(i)
    }
    // this.getPharmaProduct()
  }

  getPharmaProduct(id) {
    this.productService.getPharamProduct(id).subscribe((data) => {
      if (data['id']) {
        this.caterGoryList.push(data)
      }
      console.log(this.caterGoryList)
    })
  }

  getProductList(){
    this.productService.getProduct().subscribe((data)=>{
      this.productList = data['data']
      this.productList.forEach((item) => {
        item.image = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64,${item.image}`);
      })
      //this.productService.storedProductList = this.productList
      this.selectCompany('Awzing')
    },(error)=>{
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
