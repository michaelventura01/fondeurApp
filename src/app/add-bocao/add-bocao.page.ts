import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import {OrdenPage} from '../orden/orden.page';
import { Bocados } from 'src/models/bocados';
import { BocadoService } from 'src/services/bocado.service';

@Component({
  selector: 'app-add-bocao',
  templateUrl: './add-bocao.page.html',
  styleUrls: ['./add-bocao.page.scss'],
})
export class AddBocaoPage implements OnInit {
  bocaos: Array<any> = new Array<any>();
  bocao: string;
  cantidad: number;
  precio: number;
  orden: any;
  esOrden: boolean;
  bocados: Array<Bocados> = new Array<Bocados>();
  bocadosAll: Array<Bocados> = new Array<Bocados>();
  tipos: Array<Bocados> = new Array<Bocados>();
  @Input() bocaoTipo;

  constructor(
    private modalControlador: ModalController,
    private bocadoServicio: BocadoService,
    public actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    if (localStorage.getItem('bocaos')){
      this.bocaos = JSON.parse(localStorage.getItem('bocaos')) ;
    }
    this.bocados = this.bocadoServicio.verBocados(this.bocaoTipo.toString());
    this.bocadosAll = this.bocadoServicio.verBocados('0');
    this.tipos = this.bocadoServicio.verTiposBocados();

  }

  salirBocao(){
    this.modalControlador.dismiss();
  }

  agregarBocao(){
    this.bocados.forEach(bocado => {
      if (bocado.id === this.bocao){
        this.precio = bocado.Precio;
      }
    });
    if (this.bocao && this.cantidad) {
      this.bocaos.push({
        id: this.formarId(),
        Bocado: this.bocao,
        Cantidad: this.cantidad,
        Precio: this.precio
      });
    }
    localStorage.setItem('bocaos', JSON.stringify(this.bocaos));
  }

  formarId(){
    const fecha = new Date();
    let mili = fecha.getMilliseconds().toString();
    const rand = Math.floor(Math.random() * 999).toString();
    fecha.getMilliseconds();
    switch (mili.length){
      case(2):
        mili += Math.floor(Math.random() * 9).toString();
        break;
      case(1):
        mili += Math.floor(Math.random() * 99).toString();
        break;
    }

    switch (rand.length){
      case(2):
        mili += Math.floor(Math.random() * 9).toString();
        break;
      case(1):
        mili += Math.floor(Math.random() * 99).toString();
        break;
    }

    const abc = 'abcdefghijklmnopqrstuvwxyz';
    let letras = '';
    let intento = 0;
    do{
      intento++;
      letras += abc[Math.floor(Math.random() * 25)];

    }while (intento < 5);
    return mili + rand + letras;
  }

  eliminarBocao(bocao){
    const lugar = this.bocaos.indexOf(bocao);
    if (lugar > -1) {
      localStorage.removeItem('bocaos');
      this.bocaos.splice(lugar, 1);
      localStorage.setItem('bocaos', JSON.stringify(this.bocaos));
   }
  }
  async procesarOrden(){

    this.salirBocao();
    if (localStorage.getItem('funcion')){
      const modal = await this.modalControlador.create({
        component: OrdenPage,
        componentProps: {
        }
      });
      await modal.present();
    }else{
      this.errorProceso();
    }
  }

  async errorProceso() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Error',
      buttons: [{
        text: 'Debe elejir una funcion para procesar su orden',
        icon: 'alert'
      }]
    });
    await actionSheet.present();
    setTimeout(() => {
      this.actionSheetController.dismiss();
    }, 1500);
  }

}
