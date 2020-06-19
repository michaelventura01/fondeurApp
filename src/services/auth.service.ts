import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { Usuarios } from 'src/models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private database: AngularFirestore
  ) { }

  login(usuario){
    console.log(usuario);
  }

  logout(usuario){
    console.log(usuario);
  }

  verUsuarios() {
    let usuarios = new Array<Usuarios>();
    this.database.collection<Usuarios>('usuarios').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let usuario = contenido.data() as Usuarios;
        usuario.id = contenido.id;
        usuario.ref = contenido.ref;
        usuarios.push(usuario);
      });
    });
    return usuarios;
  }

  register(usuario){
    let result: boolean;
    this.database.collection('usuarios').add(usuario).then(() => {
      result = true;

    }).catch(() => {
      result = false;

    });

    return result;
  }
}
