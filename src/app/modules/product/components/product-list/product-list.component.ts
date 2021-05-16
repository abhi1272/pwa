import { Component, OnInit } from '@angular/core'
import { SharedService } from 'src/app/modules/shared/services/shared.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(public sharedService: SharedService) { }
  configData

  ngOnInit(): void {
    this.sharedService.roleName = 'Medicine'
    this.getConfigData()
  }

  getConfigData(): void {
    this.sharedService.getTableConfig('medicine').subscribe((data) => {
      console.log(data)
      this.configData = data.data[0]
    }, (error) => {
      console.log(error)
    })
  }

}
