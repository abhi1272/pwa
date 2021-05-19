import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { LoginComponent } from './modules/auth/components/login/login.component'
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
  constructor(public sharedService: SharedService, public dialog: MatDialog){}

  ngOnInit(): void{
    this.sharedService.getCartData()
  }

  public openLogin(): void{
    const dialogRef = this.dialog.open(LoginComponent, {
      // width: '1200px',
      data: {}
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
    })
  }
}
