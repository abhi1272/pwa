import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-pharmacist',
  templateUrl: './pharmacist.component.html',
  styleUrls: ['./pharmacist.component.scss']
})
export class PharmacistComponent implements OnInit {

  constructor(public sharedService: SharedService) { }
  configData

  ngOnInit(): void {
    this.sharedService.roleName = 'Pharmacist'
    this.getConfigData()
  }

  getConfigData(): void {
    this.sharedService.getTableConfig('pharmacist').subscribe((data) => {
      console.log(data)
      this.configData = data.data[0]
    }, (error) => {
      console.log(error)
    })
  }

}
