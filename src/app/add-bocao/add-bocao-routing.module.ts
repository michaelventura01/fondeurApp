import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBocaoPage } from './add-bocao.page';

const routes: Routes = [
  {
    path: '',
    component: AddBocaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBocaoPageRoutingModule {}
