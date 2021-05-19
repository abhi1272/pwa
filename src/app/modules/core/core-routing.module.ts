import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CategoryComponent } from './components/category/category.component'
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
  },
  {
    path: 'category-list',
    component: CategoryComponent
  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
