import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { PharmacistComponent } from './components/pharmacist/pharmacist.component'
import { RolesComponent } from './components/roles/roles.component'
import { UsersComponent } from './components/users/users.component'

const routes: Routes = [
  {
    path: 'pharmacist-list',
    component: PharmacistComponent
  },
  {
    path: 'user-list',
    component: UsersComponent
  },
  {
    path: 'role-list',
    component: RolesComponent
  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
