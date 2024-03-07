import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { CreatepalceComponent } from './createpalce/createpalce.component';
import { AdminGuard } from '../gaurds/admin.guard';
import { HttpClientModule } from '@angular/common/http';
const routes: Routes = [
  {
    path: '',
    children: [


      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'user', component: UserComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'createplace', component: CreatepalceComponent, /*canActivate: [AdminGuard],*/ }
    ],
  },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
  ]
})
export class AuthModule { }
