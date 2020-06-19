import { DocumentReference } from '@angular/fire/firestore';
import { Detalles } from './detalles';

export class Ordenes {
  id: string;
  ref: DocumentReference;
  Fecha: Date;
  Pelicula: string;
  Tickets: number;
  Detalle: Array<Detalles>;
  Estado: number;
  Funcion: string;
  MetodoPago: string;
  Taquilla: number;
  Correo: string;
}
