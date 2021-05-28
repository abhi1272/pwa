import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { LoginComponent } from './modules/auth/components/login/login.component'
import { AuthService } from './modules/auth/services/auth.service'
import { SharedService } from './modules/shared/services/shared.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ePharmacy'
  user
  isCollapsed
  products = []
  keyword = 'medicine_name'
  constructor(public sharedService: SharedService, public dialog: MatDialog,
              public authService: AuthService, public router: Router){}

  ngOnInit(): void{
    this.authService.user = JSON.parse(localStorage.getItem('user'))
    this.sharedService.getCartData()
  }

  public openLogin(): void {
    this.dialog.open(LoginComponent, {
      data: {}
    })
  }

  public logout(): void{
    localStorage.removeItem('user')
    localStorage.removeItem('cart')
    this.sharedService.getCartData()
    this.router.navigate(['/home'])
    this.authService.user = null
  }

  selectEvent(item): void {
    this.router.navigate([`/product/${item.uuid}`])
    item = ''
    // do something with selected item
  }

  onChangeSearch(val: string): void {
    const api = {
      api_url : '/medicine'
    }
    const filterObj = {
      filters: [
        { name: 'medicine_name', value: val, op: 'like' },
      ],
      pagination: {
        page_size: '20',
        page_num: 1
      }
    }
    this.sharedService.getApiFilteredData(api, JSON.stringify(filterObj)).subscribe((data) => {
      this.products = data.data
    })
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

}
