import { Injectable } from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule, AngularFirestore} from '@angular/fire/firestore';
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
