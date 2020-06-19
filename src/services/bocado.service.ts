import { Injectable } from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule, AngularFirestore} from '@angular/fire/firestore';
import { Bocados } from 'src/models/bocados';

@Injectable({
  providedIn: 'root'
})
export class BocadoService {

  constructor(
    private database: AngularFirestore
  ) { }

  verBocados(tipo) {
    let bocados = new Array<Bocados>();
    this.database.collection<Bocados>('bocados').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {        
        let bocado = contenido.data() as Bocados;
        bocado.id = contenido.id;
        bocado.ref = contenido.ref;
        if ( tipo === '0' ){
          bocados.push(bocado);
        }else{
          if (tipo === bocado.TipoBocado){
            bocados.push(bocado);
          }
        }
      });
    });
    return bocados;
  }

  verTiposBocados() {
    let tipos = new Array<Bocados>();
    this.database.collection<Bocados>('tipobocados').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let tipo = contenido.data() as Bocados;
        tipo.id = contenido.id;
        tipo.ref = contenido.ref;
        tipos.push(tipo);
      });
    });
    return tipos;
  }
}
