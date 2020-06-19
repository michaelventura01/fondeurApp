import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';
import { AddBocaoPage } from '../add-bocao/add-bocao.page';
import { OrdenPage } from '../orden/orden.page';
import { AddBocaoPageModule } from '../add-bocao/add-bocao.module';
import { OrdenPageModule } from '../orden/orden.module';

@NgModule({
  entryComponents:[
    AddBocaoPage,
    OrdenPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
    AddBocaoPageModule,
    OrdenPageModule
  ],
  declarations: [InicioPage]
})
export class InicioPageModule {
}
