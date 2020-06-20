import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
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
import { OrdenesService } from 'src/services/ordenes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.page.html',
  styleUrls: ['./orden.page.scss'],
})
export class OrdenPage implements OnInit {

  tickets: number;
  funcione: string;
  metodoPago: string;
  mensajeBoton: string;
  esMetodoPago: boolean;
  @Input() correo: string;
  @Input() orden: Array<any>;
  @Input() estado: number;

  bocaos: Array<Bocados> = new Array<Bocados>();
  bocados: Array<Bocados> = new Array<Bocados>();
  totalTickets: Array<number> = new Array<number>();
  funciones: Array<Funciones> = new Array<Funciones>();
  peliculas: Array<Peliculas> = new Array<Peliculas>();
  metodos: Array<MetodoPago> = new Array<MetodoPago>();
  ordenes: Array<Ordenes> = new Array<Ordenes>();


  constructor(
    private modalControlador: ModalController,
    private funcionServicio: FuncionesService,
    private peliculaServicio: PeliculasService,
    private metodoServicio: MetodoPagoService,
    private bocadoServicio: BocadoService,
    private ordenServicio: OrdenesService,
    private actionSheetController: ActionSheetController,
    private router: Router
  ) { }

  ngOnInit() {
    this.esMetodoPago = true;
    this.tickets = 1;

    if ( this.estado === 1){
      if (localStorage.getItem('funcion')){
        this.funcione = localStorage.getItem('funcion');
      }

      if (localStorage.getItem('bocaos')){
        this.bocaos = JSON.parse(localStorage.getItem('bocaos')) ;
      }
    } else if (this.estado === 2){
      this.ordenProcesada();
    }


    if (localStorage.getItem('correo')){
      this.correo = localStorage.getItem('correo');
    }

    if ( this.estado === 1 ){
      if (this.correo  ){
        this.mensajeBoton = 'Realizar Pago';
      }else{
        this.mensajeBoton = 'Accede para confirmar tu orden';
      }
    } else if (this.estado === 2) {
      this.mensajeBoton = 'Cancelar Ticket';
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


  ordenProcesada(){
    // error en el tipado, funciona al momento en el cliente
    let orden: Ordenes;
    orden = this.orden;
    this.funcione = orden.Funcion;
    this.bocaos = orden.Detalle;
    this.tickets = orden.Tickets;
    this.metodoPago = orden.MetodoPago;

    return orden;
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
    this.modalControlador.dismiss();
    const modal = await this.modalControlador.create({
      component: LoginPage,
      componentProps: {
      }
    });

    await modal.present();
  }

  procesarOrden(funcion){
    let hoy = new Date();
    let orden: any;
    let order: any = this.orden;

    if ( this.estado === 1 ){
      if (this.correo){
        if (this.metodoPago){
          orden = {
            Correo: this.correo,
            Detalle: this.bocaos,
            Estado: 1,
            Fecha: hoy,
            Funcion: funcion.id,
            Taquilla:  funcion.Taquilla,
            Tickets: this.tickets,
            MetodoPago: this.metodoPago
          };
          this.esMetodoPago = true;

          if (!this.ordenServicio.registrarOrden(orden)){
            this.ordenes.push(orden);
            localStorage.setItem('ordenes', JSON.stringify(this.ordenes));
            this.creado();
            localStorage.removeItem('bocaos');
            this.modalControlador.dismiss();
            this.router.navigate(['/tabs/tickets']);
          }else{
            this.noCreado();
          }
        }else{
          this.esMetodoPago = false;
        }
      }else {
        this.login();
      }
    } else if (this.estado === 2) {
      orden = {
        Correo: order.Correo,
        Detalle: order.Detalle,
        Estado: 0,
        Fecha: order.Fecha,
        Funcion: order.Funcion,
        MetodoPago: order.MetodoPago,
        Taquilla: order.Taquilla,
        Tickets: order.Tickets,
        id: order.id
      };

      if (this.eliminarTicket(orden)){
        this.noCreado();
      }else{
        this.eliminado();
      }
    }
  }

  eliminarTicket(orden){
    return this.ordenServicio.modificarOrden(orden);
  }

  async creado() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Registrado',
      buttons: [{
        text: 'Su orden fue registrada con exito',
        icon: 'checkmark-done',
      }]
    });
    await actionSheet.present();
    setTimeout(() => {
      this.actionSheetController.dismiss();
    }, 1500);
    location.reload();
  }

  async eliminado() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Cancelado',
      buttons: [{
        text: 'Su orden fue cancelada con exito',
        icon: 'checkmark-done',
      }]
    });
    await actionSheet.present();
    setTimeout(() => {
      this.actionSheetController.dismiss();
      this.modalControlador.dismiss();
    }, 1500);
    location.reload();
  }

  async noCreado() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Error',
      buttons: [{
        text: 'Su orden no pudo ser procesada',
        icon: 'alert'
      }]
    });
    await actionSheet.present();
    setTimeout(() => {
      this.actionSheetController.dismiss();
    }, 1500);
  }

  salirOrden(){
    this.modalControlador.dismiss();
  }
}
