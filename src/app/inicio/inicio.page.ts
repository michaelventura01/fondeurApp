import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AddBocaoPage } from '../add-bocao/add-bocao.page';
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
    private modalControlador: ModalController,
    private peliculaServicio: PeliculasService,
    private funcionServicio: FuncionesService,
    private toastController: ToastController

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
    const toast = await this.toastController.create({
      header: 'Funcion Seleccionada',
      message: 'Ha seleccionado una funcion a las ' + funcion,
      duration: 1500
    });
    toast.present();
  }
}
