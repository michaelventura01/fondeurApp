import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBocaoPageRoutingModule } from './add-bocao-routing.module';

import { AddBocaoPage } from './add-bocao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddBocaoPageRoutingModule
  ],
  declarations: [AddBocaoPage]
})
export class AddBocaoPageModule {}
