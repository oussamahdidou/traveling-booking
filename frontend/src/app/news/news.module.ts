import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'create', component: CreateComponent },
      { path: '', component: ListComponent },

    ],
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
    ,
    RouterModule.forChild(routes),]
})
export class NewsModule { }
