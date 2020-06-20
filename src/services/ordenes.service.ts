import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { Ordenes } from 'src/models/ordenes';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  constructor(
    private database: AngularFirestore
  ) { }

  registrarOrden(orden){
    let result: boolean;
    this.database.collection('ordenes').add(orden).then(() => {
      result = true;
    }).catch(() => {
      result = false;
    });

    return result;
  }

  modificarOrden(orden){
    let hoy = new Date();
    let fecha = new Date(orden.Fecha.seconds * 1000);
    let result: boolean;
    this.database.doc('ordenes/' + orden.id).update({
      Correo: orden.Correo,
      Detalle: orden.Detalle,
      Estado: orden.Estado,
      Fecha: fecha,
      FechaModificacion: hoy,
      Funcion: orden.Funcion,
      MetodoPago: orden.MetodoPago,
      Taquilla: orden.Taquilla,
      Tickets: orden.Tickets,
    }).then(() => {
     result = true;
    }).catch(() => {
      result = false;
    });

    return result;
  }

  verOrdenes() {
    let ordenes = new Array<Ordenes>();
    this.database.collection<Ordenes>('ordenes').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let orden = contenido.data() as Ordenes;
        orden.id = contenido.id;
        orden.ref = contenido.ref;
        ordenes.push(orden);
      });
    });
    return ordenes;
  }
}
