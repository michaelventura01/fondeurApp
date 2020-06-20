import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { Peliculas } from 'src/models/peliculas';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(
    private database: AngularFirestore
  ) { }

  verPeliculas() {
    let peliculas = new Array<Peliculas>();
    this.database.collection<Peliculas>('peliculas').get().subscribe( (respuesta) => {
      respuesta.forEach((contenido) => {
        let pelicula = contenido.data() as Peliculas;
        pelicula.id = contenido.id;
        pelicula.ref = contenido.ref;
        peliculas.push(pelicula);
      });
    });
    return peliculas;
  }
}
