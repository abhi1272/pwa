import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/modules/shared/services/shared.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(public sharedService: SharedService) { }
  configData

  ngOnInit(): void {
    this.sharedService.roleName = 'User'
    this.getConfigData()
  }

  getConfigData(): void {
    this.sharedService.getTableConfig('user').subscribe((data) => {
      console.log(data)
      this.configData = data.data[0]
    }, (error) => {
      console.log(error)
    })
  }

}
