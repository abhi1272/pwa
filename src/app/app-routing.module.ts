import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ContactComponent } from './components/contact/contact.component'
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './modules/auth/components/login/login.component'
import { RegisterComponent } from './modules/auth/components/register/register.component'
import { ResetPasswordComponent } from './modules/auth/components/reset-password/reset-password.component'

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'product',
    loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
