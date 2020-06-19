import { Injectable } from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule, AngularFirestore} from '@angular/fire/firestore';
import { Funciones } from 'src/models/funciones';

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {

  constructor(
    private database: AngularFirestore
  ) { }

  verFunciones() {
    let funciones = new Array<Funciones>();
    this.database.collection<Funciones>('funciones').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {        
        let funcion = contenido.data() as Funciones;
        funcion.id = contenido.id;
        funcion.ref = contenido.ref;
        funciones.push(funcion);
      });
    });
    return funciones;
  }

  tenerFuncion(id) {
    let movie = new Funciones();
    this.database.collection<Funciones>('funciones').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let funcion = contenido.data() as Funciones;
        funcion.id = contenido.id;
        funcion.ref = contenido.ref;
        if ( funcion.id === id ){
          movie = funcion;
        }
      });
    });
    return movie;
  }
}
