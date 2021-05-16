import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedService } from 'src/app/modules/shared/services/shared.service';

@Component({
  selector: 'app-add-remove-col',
  templateUrl: './add-remove-col.component.html',
  styleUrls: ['./add-remove-col.component.scss']
})
export class AddRemoveColComponent implements OnInit {

  @Input() colConfigData: any;

  @Output() sendCheckedData = new EventEmitter();

  public displayedColumns: string[];
  public filterObj = { "filters": [] }
  public filterColumns
  public filterColumnsV1;
  public checkedColumns: string[] = [];
  public selectedVal: any = [{ name: "select", label: "select" },{name:"position",label:"position"},{name: "name", label: "name"},{name: "email", label: "email"},{name: "roll_number", label: "roll number"},{name: "class_name", label: "class name"},{name: "phone_number", label: "phone number"},{name:"actions",label:"actions"}];
  public pushdata: boolean = false;
  public classNames = [];
  public filteredDataCount: number;
  public roleName: string;
  public selectedValues:any = [];
  public checkedColumnNames = [];
  public primaryColumns;
  public secondaryColumns;
  public primaryColumnsAdded =[]
  public secondaryColumnsAdded =[]
  public primaryColumnsAddedV1 =[]
  public secondaryColumnsAddedV1 =[]
  public internalColumns =  {
    'student':["position","name","id","uuid","active","type","created_date","updated_date","extra_fields","account_id","logo","entity_fields","fcm_token","role_name"],
    'newadmission':["position","name","id","uuid","active","type","created_date","updated_date","extra_fields","account_id","logo","entity_fields","fcm_token","role_name"],
    'user_history': ["position", "name", "id", "uuid", "active", "type", "created_date", "updated_date", "extra_fields", "account_id", "logo", "entity_fields", "fcm_token", "role_name"],
    'teacher':["position","name","id","uuid","active","type","created_date","updated_date","extra_fields","account_id","logo","entity_fields","fcm_token","role_name","class_name","roll_number"]};
  fieldNames = new FormControl();
  public refreshData:boolean = false;
  public entityFields;

  constructor(public sharedService: SharedService) { }

  ngOnInit() {

    console.log('colConfigData', this.colConfigData)
    this.selectedValues = this.colConfigData.displayedColumns.filter(item => item.key !== 'select')
    this.primaryColumns = this.colConfigData.displayedColumns

    this.createFilterObject()

    this.fieldNames.valueChanges.subscribe((data) => {
      this.checkedColumns = data;
      this.sendCheckedData.emit(data)
      // this.checkedColumnNames = []
      // this.checkedColumns.map((item) => {

      //   this.checkedColumnNames.push(item["name"])

      // })

    });

  }


  public createFilterObject(){

    this.primaryColumns.sort((a,b)=>{
      return b.name - a.name
    })


     this.filterColumns = this.colConfigData.initColumns
     this.filterColumnsV1 = [...new Set([...this.filterColumns,...this.colConfigData.allColumns])]
     this.filterColumnsV1 = this.filterColumnsV1.filter(item => item.key !== 'select')
     console.log(this.filterColumnsV1)
    }


  Dowload() {
    this.sharedService.apiDetails.fixed_faql = this.sharedService.filterObj
    // this.sharedService.downloadFile(this.sharedService.apiDetails)
  }
}
