import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/modules/shared/services/shared.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  constructor(public sharedService: SharedService) { }
  configData

  ngOnInit(): void {
    this.sharedService.roleName = 'Role'
    this.getConfigData()
  }

  getConfigData(): void {
    this.sharedService.getTableConfig('role').subscribe((data) => {
      console.log(data)
      this.configData = data.data[0]
    }, (error) => {
      console.log(error)
    })
  }

}
