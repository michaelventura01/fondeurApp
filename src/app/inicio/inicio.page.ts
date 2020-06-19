import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AddBocaoPage } from '../add-bocao/add-bocao.page';
import {OrdenPage} from '../orden/orden.page'
import { Funciones } from 'src/models/funciones';
import { Peliculas } from 'src/models/peliculas';
import { FuncionesService } from 'src/services/funciones.service';
import { PeliculasService } from 'src/services/peliculas.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  funciones: Array<Funciones> = new Array<Funciones>();
  peliculas: Array<Peliculas> = new Array<Peliculas>();


  ngOnInit() {
    this.funciones = this.funcionServicio.verFunciones();
    this.peliculas = this.peliculaServicio.verPeliculas();
  }


  constructor(
    private actionSheetController: ActionSheetController,
    private modalControlador: ModalController,
    private peliculaServicio: PeliculasService,
    private funcionServicio: FuncionesService

    ) {}

    elejirFuncion(funcion){
      if (localStorage.getItem('funcion')){
        localStorage.removeItem('funcion');
      }
      localStorage.setItem('funcion', funcion.id);
      this.existente(funcion.Inicio);
    }

  async agregarBocao(tipo){
    const modal = await this.modalControlador.create({
      component: AddBocaoPage,
      cssClass : 'shortModal',
      componentProps: {
        bocaoTipo: tipo
      }
    });

    await modal.present();
  }

  async existente(funcion) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Funcion Seleccionada',
      buttons: [{
        text: 'Ha seleccionado una funcion a las ' + funcion,
        icon: 'checkmark-done'
      }]
    });
    await actionSheet.present();
    setTimeout(() => {
      this.actionSheetController.dismiss();
    }, 1500);
  }

  

}
