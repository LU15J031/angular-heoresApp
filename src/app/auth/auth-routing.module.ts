import { NgModule } from '@angular/core';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'registro',
        component: RegisterComponent
      },
      {
        path: '**',
        redirectTo:'login'
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
