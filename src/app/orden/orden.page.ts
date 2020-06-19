import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FuncionesService } from 'src/services/funciones.service';
import { PeliculasService } from 'src/services/peliculas.service';
import { Funciones } from 'src/models/funciones';
import { Peliculas } from 'src/models/peliculas';
import { MetodoPago } from 'src/models/metodo-pago';
import { MetodoPagoService } from 'src/services/metodo-pago.service';
import { Ordenes } from 'src/models/ordenes';
import { Bocados } from 'src/models/bocados';
import { BocadoService } from 'src/services/bocado.service';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.page.html',
  styleUrls: ['./orden.page.scss'],
})
export class OrdenPage implements OnInit {

  tickets: number;
  funcione: string;
  metodoPago: string;
  bocaos: Array<Bocados> = new Array<Bocados>();
  bocados: Array<Bocados> = new Array<Bocados>();
  totalTickets: Array<number> = new Array<number>();
  funciones: Array<Funciones> = new Array<Funciones>();
  peliculas: Array<Peliculas> = new Array<Peliculas>();
  metodos: Array<MetodoPago> = new Array<MetodoPago>();


  constructor(
    private modalControlador: ModalController,
    private funcionServicio: FuncionesService,
    private peliculaServicio: PeliculasService,
    private metodoServicio: MetodoPagoService,
    private bocadoServicio: BocadoService
  ) { }

  ngOnInit() {
    this.tickets = 1;
    if (localStorage.getItem('funcion')){
      this.funcione = localStorage.getItem('funcion');
    }

    if (localStorage.getItem('bocaos')){
      this.bocaos = JSON.parse(localStorage.getItem('bocaos')) ;
    }

    this.funciones = this.funcionServicio.verFunciones();
    this.peliculas = this.peliculaServicio.verPeliculas();
    this.metodos = this.metodoServicio.verMetodosPago();
    this.bocados = this.bocadoServicio.verBocados('0');
    
    let inicio = 0;
    while ( inicio < 30){
      inicio++;
      this.totalTickets.push(inicio);
    }

  }

  totalBocados(){
    let total = 0;
    this.bocaos.forEach(bocao => {
      total += bocao.Precio * bocao.Cantidad;
    });
    return total;
  }

  tenerFuncion(){
    let evento: Array<any>;
    this.funciones.forEach(funcion => {
      evento.push(funcion);
    });
    return evento;
  }

  pagarOrden(){
    localStorage.setItem('usuario', 'mani');
    localStorage.getItem('usuario');
  }
  async login(){
    const modal = await this.modalControlador.create({
      component: LoginPage,
      componentProps: {
      }
    });

    await modal.present();
  }

  procesarOrden(){

    this.login();

  }



  salirOrden(){
    this.modalControlador.dismiss();
  }

}
