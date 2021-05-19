import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/modules/shared/services/shared.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(public sharedService: SharedService) { }
  configData

  ngOnInit(): void {
    this.sharedService.roleName = 'Category'
    this.getConfigData()
  }

  getConfigData(): void {
    this.sharedService.getTableConfig('category').subscribe((data) => {
      console.log(data)
      this.configData = data.data[0]
    }, (error) => {
      console.log(error)
    })
  }

}
