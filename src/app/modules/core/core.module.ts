import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PharmacistComponent } from './components/pharmacist/pharmacist.component'
import { UsersComponent } from './components/users/users.component'
import { RolesComponent } from './components/roles/roles.component'
import { CoreRoutingModule } from './core-routing.module'
import { CategoryComponent } from './components/category/category.component'
import { SharedModule } from '../shared/shared.module'


@NgModule({
  declarations: [PharmacistComponent, UsersComponent, RolesComponent, CategoryComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule
  ]
})
export class CoreModule { }
