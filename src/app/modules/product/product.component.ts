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
  constructor(private sanitizer: DomSanitizer, public authService: AuthService,
              public productService: ProductService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProductList()
  }

  getProductList(): void {
    this.productService.getProduct().subscribe((data) => {
      this.productList = data.data
    }, (error) => {
      console.log(error)
    })
  }

}
