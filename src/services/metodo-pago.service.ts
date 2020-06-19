import { Injectable } from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule, AngularFirestore} from '@angular/fire/firestore';
import { MetodoPago } from 'src/models/metodo-pago';
@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {

  constructor(
    private database: AngularFirestore
  ) { }

  verMetodosPago() {
    let metodos = new Array<MetodoPago>();
    this.database.collection<MetodoPago>('metodospago').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let metodo = contenido.data() as MetodoPago;
        metodo.id = contenido.id;
        metodo.ref = contenido.ref;
        metodos.push(metodo);
      });
    });
    return metodos;
  }
}
