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
  @Input() correo;
  bocaos: Array<Bocados> = new Array<Bocados>();
  bocados: Array<Bocados> = new Array<Bocados>();
  totalTickets: Array<number> = new Array<number>();
  funciones: Array<Funciones> = new Array<Funciones>();
  peliculas: Array<Peliculas> = new Array<Peliculas>();
  metodos: Array<MetodoPago> = new Array<MetodoPago>();
  ordenes: Array<any> = new Array<any>();


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
    //localStorage.setItem('bocaos','[{"id":"431384uhcid","Bocado":"gstj1i5U0q26O3qbpzr7","Cantidad":5,"Precio":"450"},{"id":"388611yeucm","Bocado":"9KQnS4xFBYsN7UguugBd","Cantidad":5,"Precio":150},{"id":"716765ycyfl","Bocado":"4k6nCUN7djk6bvaaUrdf","Cantidad":5,"Precio":480}]')
    this.esMetodoPago = true;
    this.tickets = 1;
    if (localStorage.getItem('funcion')){
      this.funcione = localStorage.getItem('funcion');
    }

    if (localStorage.getItem('bocaos')){
      this.bocaos = JSON.parse(localStorage.getItem('bocaos')) ;
    }

    if (localStorage.getItem('correo')){
      this.correo = localStorage.getItem('correo');
    }

    if (this.correo  ){
      this.mensajeBoton = 'Realizar Pago';
    }else{
      this.mensajeBoton = 'Accede para confirmar tu orden';
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
