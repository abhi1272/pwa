import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AngularMaterialModule } from '../material/angular-material.module'
import { AddRemoveColComponent } from './components/json-table/add-remove-col/add-remove-col.component'
import { ColFilterComponent } from './components/json-table/col-filter/col-filter.component'
import { JsonTableCreationComponent } from './components/json-table/json-table-creation/json-table-creation.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CreateComponent } from './modals/create/create.component'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'



@NgModule({
  declarations: [
    JsonTableCreationComponent,
    ColFilterComponent,
    AddRemoveColComponent,
    CreateComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [JsonTableCreationComponent, ColFilterComponent, AddRemoveColComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: MatDialogRef, useValue: {} },
  { provide: MAT_DIALOG_DATA, useValue: [] }]
})
export class SharedModule { }
